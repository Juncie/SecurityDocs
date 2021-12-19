const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorRes');
const User = require('../models/User');

exports.authorize = async (req, res, next) => {
	let token = req.headers.authorization.split(' ')[1];
	let secret = process.env.JWT_SECRET;

	if (!token) return next(new ErrorResponse('No Token, access denied', 401));

	jwt.verify(token, secret, async (err, data) => {
		if (err) return next(new ErrorResponse('Invalid token', 401));

		let { id } = data;
		console.log('id', id);
		let user = await User.findById(id);

		if (!user) return next(new ErrorResponse('User not found', 401));

		try {
			res.locals.user = user;
			res.locals.role = user.role;
			next();
		} catch (err) {
			next(new ErrorResponse(`${err.message}`, 500));
		}
	});
};
