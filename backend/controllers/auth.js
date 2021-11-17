const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorRes');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
	const { first, last, email, userId, role, location, password } = req.body;
	try {
		const user = await User.create({ first, last, email, userId, role, location, password,  });
		sendToken(user, 201, res, 'User Successfully Created!');
		console.log(`User has been registered!`, user)
	} catch (error) {
		console.log(`error`, {error})
		return next(new ErrorResponse(`${error.message}`, 500));
	}
};

exports.login = async (req, res, next) => {
	const { userId, password } = req.body;

	if (!userId || !password) {
		return next(new ErrorResponse('Please provide a User ID & Password', 400));
	}
	try {
		const user = await User.findOne({ userId }).select('+password');

		if (!user) {
			return next(new ErrorResponse('Invalid User', 404));
		}

		const isMatch = await user.matchPassword(password);

		if (!isMatch) {
			return next(new ErrorResponse('Invalid Password', 404));
		}
		sendToken(user, 200, res);
	} catch (error) {

		next(new ErrorResponse(`${error.message}`, 500));
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: `Invalid User: ${error.message}`,
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

			return res.status(500).json({
				success: false,
				message: `Email not sent: ${error.message}`,
			});
		}
	} catch (error) {
		next(error);
	}
};

exports.resetPassword = async (req, res, next) => {
	const resetToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

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

exports.getUser = async (req, res, next) => {
	try {
		let user = await User.findById(res.locals.user._id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: 'User not found' });
	}
};

const sendToken = (user, statusCode, res, message) => {
	const token = user.getSignedJWT();
	res.status(statusCode).json({ success: true, token, message: message });
};
