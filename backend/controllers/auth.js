const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorRes');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/sendToken');

exports.getUser = async (req, res, next) => {
	const filter = res.locals.user._id;
	const user = await User.findById(filter);
	const message = `User ${user.first} ${user.last} has been found!`;
	try {
		sendToken(user, 200, res, message);
	} catch (err) {
		next(new ErrorResponse(`Error fetching user: ${err}`, 500));
	}
};

exports.allUsers = async (req, res, next) => {
	const { userID, location, role } = req.body;

	try {
		let users = await User.find({
			...(userID ? { userID } : {}),
			...(location ? { location } : {}),
			...(role ? { role } : {}),
		});
		users.length === 0
			? res.status(404).json({ success: false, message: 'No users found' })
			: res.status(200).json({ success: true, users });
	} catch (err) {
		next(new ErrorResponse('Error Getting Users:', err.message, 400));
	}
};

exports.deleteUser = async (req, res, next) => {
	const { id } = req.params;

	try {
		await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: 'User has been deleted' });
	} catch (err) {
		next(new ErrorResponse(`Error deleting user: ${err}`, 500));
	}
};

exports.register = async (req, res, next) => {
	try {
		let user = await User.create(req.body);
		res.status(201).json({ success: true, user });
		console.log(`User has been registered!`, user);
	} catch (error) {
		console.log(`error`, { error });
		return next(
			new ErrorResponse(
				`There was a problem registering the user: ${error.message}`,
				500
			)
		);
	}
};

exports.login = async (req, res, next) => {
	const { userID, password } = req.body;

	if (!userID || !password) {
		return next(new ErrorResponse('Please provide a User ID & Password', 400));
	}

	try {
		const user = await User.findOne({ userID }).select('+password');

		if (!user) {
			return next(new ErrorResponse('Invalid User', 400));
		}
		const isMatch = await user.matchPassword(password);

		if (!isMatch) {
			return next(new ErrorResponse('User not found', 401));
		}
		sendToken(user, 200, res);
	} catch (error) {
		next(new ErrorResponse(`Login Error: ${error.message}`, 500));
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: `Invalid User`,
			});
		}
		const resetToken = user.getResetToken();
		await user.save();
		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		const message = `
    <h1>You have requested a password reset </h1>
    <p> Please use this link to reset your password </p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
		try {
			await sendEmail({
				to: user.email,
				subject: 'Password Reset Request',
				text: message,
			});

			res.status(200).json({
				success: true,
				data: 'Your Email has been sent!',
			});
		} catch (error) {
			user.resetToken = undefined;
			user.resetPasswordExpire = undefined;
			await user.save();
			return next(new ErrorResponse('Email could not be sent.', 500));
		}
	} catch (error) {
		next(error);
	}
};

exports.resetPassword = async (req, res, next) => {
	const resetToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex');

	try {
		const user = await User.findOne({
			resetToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: `Invalid Reset Token: ${error.message}`,
			});
		}

		user.password = req.body.password;
		user.resetToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(201).json({
			success: true,
			data: 'Your password has been changed!',
		});
	} catch (error) {
		next(error);
	}
};
