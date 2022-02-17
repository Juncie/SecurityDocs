const SAR = require('../models/SAR/SAR');
const ErrorResponse = require('../utils/errorRes');
const ObjectId = require('mongodb').ObjectId;

exports.getPrivateData = (req, res, next) => {
	res.status(200).json({ success: true, data: 'This is private data' });
};

exports.getSAR = async (req, res, next) => {
	let { id } = req.params;
	try {
		let sar = await SAR.findById(req.params.id);
		sar
			? res.status(200).json({ success: true, sar })
			: next(new ErrorResponse(`Document not found`, 404));
	} catch (err) {
		return next(new ErrorResponse(`Could not Get SAR: ${err.message}`, 400));
	}
};

exports.findAllSARs = async (req, res, next) => {
	const { userID, date } = req.body;
	let role = res.locals.role;

	if (role.toLowerCase() === 'user') {
		try {
			let sar = await SAR.find({ userID: res.locals.user.userID });
			sar
				? res.status(200).json({ success: true, sar })
				: next(new ErrorResponse(`SAR not found`, 404));
		} catch (err) {
			return next(new ErrorResponse(`Error Getting User SAR: ${err.message}`, 400));
		}
	} else if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'manager') {
		try {
			let sars = await SAR.find({
				...(userID ? { userID: userID } : {}),
				...(date ? { date: date } : {}),
			});
			sars.length === 0
				? res.status(404).json({ success: false, message: 'No SARs found' })
				: res.status(200).json({ success: true, sars });
		} catch (err) {
			next(new ErrorResponse('Error Finding All SARs:', err.message, 400));
		}
	}
};

exports.newSAR = async (req, res, next) => {
	const { position, hours } = req.body;
	let name = `${res.locals.user.last}, ${res.locals.user.first}`;
	let userID = res.locals.user.userID;
	let location = res.locals.user.location;

	try {
		let sar = await SAR.create({
			name,
			position,
			hours,
			userID,
			location,
		});
		res.status(201).json({ success: true, sar });
	} catch (err) {
		next(new ErrorResponse('New SAR Error:', err.message, 400));
	}
};

exports.newSarEntry = async (req, res, next) => {
	let { id } = req.params;
	let { entry, entryId } = req.body;
	const day = new Date();
	let time = day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();

	try {
		let sar = await SAR.findById({ _id: id });

		if (!sar) return next(new ErrorResponse(`SAR not found`, 404));

		if (sar.status.toLowerCase() === 'submitted')
			return next(new ErrorResponse(`SAR already submitted`, 400));

		if (sar.userID !== res.locals.user.userID)
			return next(new ErrorResponse(`Unauthorized`, 401));

		sar.entries.push({
			entry,
			time,
			entryId: new ObjectId(),
		});
		await sar.save();
		res.status(200).json({ success: true, sar });
	} catch (err) {
		return next(
			new ErrorResponse(`Error Creating New SAR Entry: ${err.message}`, 400)
		);
	}
};

exports.updateSarEntry = async (req, res, next) => {
	let { id, entryId } = req.params;
	let { value, updateType } = req.body;

	const sar = await SAR.findOne({ _id: id });

	if (sar.status === 'Submitted')
		return next(new ErrorResponse(`SAR already submitted`, 400));

	if (!updateType) {
		try {
			sar.markModified('entries');
			sar.entries.map(entry => {
				if (entry.entryId == entryId) {
					entry.entry = value;
				}
			});
			await sar.save();
			res.status(200).json({ success: true, sar });
		} catch (err) {
			return next(new ErrorResponse(`Error with Entry Update: ${err.message}`, 400));
		}
	}

	if (updateType === 'delete') {
		try {
			sar.markModified('entries');
			sar.entries.map(entry => {
				if (entry.entryId == entryId) {
					sar.entries.splice(sar.entries.indexOf(entry), 1);
				}
			});
			await sar.save();
			res.status(200).json({ success: true, sar });
		} catch (err) {
			return next(
				new ErrorResponse(`Error Updating SAR Entry: ${err.message}`, 400)
			);
		}
	}
};

exports.submitSar = async (req, res, next) => {
	let { id } = req.params;
	userID = res.locals.user._id;

	try {
		let sar = await SAR.findById(id);
		if (!sar) return next(new ErrorResponse(`SAR not found`, 404));
		sar.status = 'Submitted';
		await sar.save();
		res.status(200).json({ success: true, sar });
	} catch (err) {
		return next(new ErrorResponse('Error Submitting SAR', err, 400));
	}
};

exports.deleteSAR = async (req, res, next) => {
	let { id } = req.params;

	try {
		let sar = await SAR.findByIdAndDelete(id);
		if (!sar) return next(new ErrorResponse(`SAR not found`, 404));
		res.status(200).json({ success: true, message: 'SAR deleted' });
	} catch (err) {
		return next(new ErrorResponse('Error deleting SAR:', err, 400));
	}
};
