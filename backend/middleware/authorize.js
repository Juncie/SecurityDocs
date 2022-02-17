const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorRes');
const User = require('../models/User');

//Used to verify the user's token
exports.authorize = async (req, res, next) => {
	console.log(`req.headers:`, req.headers.authorization);

	//Get the token from the header
	let token = req.headers.authorization.split(' ')[1];
	let secret = process.env.JWT_SECRET;

	if (!token) return next(new ErrorResponse('No Token, access denied', 401));

	//Used to verify the token and secret key
	jwt.verify(token, secret, async (err, data) => {
		if (err) return next(new ErrorResponse('Invalid token', 401));

		let { userId } = data;
		let user = await User.findById(userId);

		if (!user) return next(new ErrorResponse('User not found', 401));

		try {
			res.locals.user = user;
			res.locals.role = user.role;
			next();
		} catch (err) {
			next(new ErrorResponse(`Token Error: ${err.message}`, 500));
		}
	});
};
