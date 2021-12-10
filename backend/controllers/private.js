const SarEntry = require('../models/SAR/SarEntry');
const SAR = require('../models/SAR/SAR');
const ErrorResponse = require('../utils/errorRes');

exports.getPrivateData = (req, res, next) => {
	res.status(200).json({
		success: true,
		data: "You've got access",
	});
};

exports.newSAR = async (req, res, next) => {
	const sar = req.body;
	try {
		const newSar = await SAR.create(sar);
		res.status(200).json({
			success: true,
			data: newSar,
		});
	} catch (err) {
		next(new ErrorResponse(err.message, 400));
	}
};

exports.newSarEntry = async (req, res, next) => {
	const sarEntry = req.body;
	sarEntry.sarId = req.params.sarId;

	try {
		const newSarEntry = await SAR.findByIdAndUpdate(
			sarEntry.sarId,
			{ $push: { entries: sarEntry } },
			{ new: true }
		);
		res.status(200).json({
			success: true,
			data: newSarEntry,
		});
	} catch (err) {
		next(new ErrorResponse(err.message, 400));
	}
};
