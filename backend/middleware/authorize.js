const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorRes');
const User = require('../models/User');

exports.authorize = async (req, res, next) => {
	let token = req.headers.authorization.split(' ')[1];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
			if (!err) {
				User.findById(data.user.id)
					.then(user => {
						if (user) {
							res.locals.user = user;
							next();
						} else {
							next(new ErrorResponse('User not found', 401));
						}
					})
					.catch(err => {
						next(new ErrorResponse(err, 500));
					});
			} else {
				next(new ErrorResponse(err, 401));
			}
		});
	} else {
		next(new ErrorResponse(err.message, 401));
	}
};
