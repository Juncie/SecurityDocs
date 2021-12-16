const SarEntry = require('../models/SAR/SarEntry');
const SAR = require('../models/SAR/SAR');
const ErrorResponse = require('../utils/errorRes');
const ObjectId = require('mongodb').ObjectId;
const sendToken = require('../utils/sendToken');

exports.getPrivateData = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "You've got access",
	});
};

exports.getSAR = async (req, res, next) => {
	try {
		let sar = await SAR.findById(req.params.sarId);
		sar
			? res.status(200).json({ success: true, sar })
			: next(new ErrorResponse(`Document not found`, 404));
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};

exports.findAllSARs = async (req, res, next) => {
	const { userId, date } = req.body;
	let role = res.locals.role;

	if (role.toLowerCase() === 'user') {
		try {
			let sar = await SAR.find({ userId: res.locals.user.userId });
			sar
				? res.status(200).json({ success: true, sar })
				: next(new ErrorResponse(`SAR not found`, 404));
		} catch (err) {
			return next(new ErrorResponse(`${err.message}`, 400));
		}
	} else if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'manager') {
		try {
			let sars = await SAR.find({
				...(userId ? { userId: userId } : {}),
				...(date ? { date: date } : {}),
			});
			sars.length === 0
				? res.status(404).json({ success: false, message: 'No SARs found' })
				: res.status(200).json({ success: true, sars });
		} catch (err) {
			next(new ErrorResponse(err.message, 400));
		}
	}
};

exports.newSAR = async (req, res, next) => {
	let sar = new SAR(req.body);
	let newSarDate = new Date();
	sar.userId = res.locals.user.userId;
	sar.date = newSarDate.toDateString();

	try {
		await sar.save();
		res.status(200).json({ success: true, sar });
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};

exports.newSarEntry = async (req, res, next) => {
	let { sarId } = req.params;
	let { entry, time, entryId } = req.body;
	const day = new Date();
	time = day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();

	try {
		let sar = await SAR.findById({ _id: sarId });

		if (!sar) return next(new ErrorResponse(`SAR not found`, 404));

		if (sar.status.toLowerCase() === 'submitted')
			return next(new ErrorResponse(`SAR already submitted`, 400));

		if (sar.userId !== res.locals.user.userId)
			return next(new ErrorResponse(`Unauthorized`, 401));

		sar.entries.push({
			entry,
			time,
			entryId,
		});
		await sar.save();
		res.status(200).json({ success: true, sar });
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};

exports.updateSarEntry = async (req, res, next) => {
	let { id, entryId } = req.params;
	let { value, updateType } = req.body;
	console.log(`updateSarEntry`, id, entryId, value, updateType);

	if (updateType === 'edit' || !updateType) {
		try {
			const sar = await SAR.findOne({ _id: id });
			sar.markModified('entries');
			sar.entries.map(entry => {
				if (entry.entryId == entryId) {
					entry.entry = value;
				}
			});
			await sar.save();
			res.status(200).json({ success: true, sar });
		} catch (err) {
			return next(new ErrorResponse(`${err.message}`, 400));
		}
	}

	if (updateType === 'delete') {
		try {
			let sar = SAR.findOneAndUpdate(
				{ _id: id },
				{ $pull: { entries: { entryId } } },
				{ new: true }
			);
			res.status(200).json({ success: true, sar });
		} catch (err) {
			return next(new ErrorResponse(`${err.message}`, 400));
		}
	}
};

exports.submitSar = async (req, res, next) => {
	let { userId, sarId } = req.body;
	userId = res.locals.user._id;
	sarId = req.params.sarId;

	try {
		let sar = await SAR.findById(req.params.sarId);
		if (!sar) return next(new ErrorResponse(`SAR not found`, 404));

		sar.status = 'Submitted';
		await sar.save();
		res.status(200).json({
			success: true,
			data: sar,
		});
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};
