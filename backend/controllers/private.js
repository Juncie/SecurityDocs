// const SarEntry = require('../models/SAR/SarEntry');
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
		if (!sar) {
			return next(new ErrorResponse(`SAR not found`, 404));
		}
		res.status(200).json({ success: true, sar });
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
	} else if (
		role.toLowerCase() === 'admin' ||
		role.toLowerCase() === 'manager'
	) {
		try {
			let sars = await SAR.find({
				...(userId ? { userId: userId } : {}),
				...(date ? { date: date } : {}),
			});

			if (sars.length === 0) {
				res.status(404).json({
					success: false,
					message: 'No SARs found',
				});
				next();
			}
			res.status(200).json({ success: true, sars });
		} catch (err) {
			next(new ErrorResponse(err.message, 400));
		}
	}
};

exports.newSAR = async (req, res, next) => {
	let sar = new SAR(req.body);
	sar.userId = res.locals.user.userId;
	const newSarDate = new Date();
	sar.date = newSarDate.toDateString();

	try {
		await sar.save();
		res.status(200).json({
			success: true,
			data: sar,
		});
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};

exports.newSarEntry = async (req, res, next) => {
	let { userId, sarId, time, entry } = req.body;
	userId = res.locals.user._id;
	sarId = req.params.sarId;
	day = new Date();

	time = day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();

	try {
		let sar = await SAR.findById(req.params.sarId);
		if (!sar) {
			return next(new ErrorResponse(`SAR not found`, 404));
		}

		sar.entries.push({
			entry,
			time,
			sarId,
			userId,
			entryId: new ObjectId(),
		});
		await sar.save();
		res.status(200).json({
			success: true,
			data: sar,
		});
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};

exports.updateSarEntry = async (req, res, next) => {
	let { userId, sarId, entryId, entry } = req.body;
	userId = res.locals.user.userId;
	sarId = req.params.sarId;
	entryId = req.params.entryId;

	try {
		let sar = await SAR.findById(sarId);

		if (!sar) {
			return next(new ErrorResponse(`SAR not found`, 404));
		}

		sar.entries.id(entryId).entry = entry;
		await sar.save();
		res.status(200).json({ success: true, sar });
	} catch (err) {
		return next(new ErrorResponse(`${err.message}`, 400));
	}
};

exports.submitSar = async (req, res, next) => {
	let { userId, sarId } = req.body;
	userId = res.locals.user._id;
	sarId = req.params.sarId;

	try {
		let sar = await SAR.findById(req.params.sarId);
		if (!sar) {
			return next(new ErrorResponse(`SAR not found`, 404));
		}

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
