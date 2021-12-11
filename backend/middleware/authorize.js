const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorRes');
const User = require('../models/User');

exports.authorize = async (req, res, next) => {
	let token = req.headers.authorization.split(' ')[1];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
			if (!err) {
				User.findById({ _id: data.id })
					.then(user => {
						if (user) {
							res.locals.user = user;
							res.locals.role = user.role;
							next();
						} else {
							next(new ErrorResponse('User not found', 401));
						}
					})
					.catch(err => {
						next(new ErrorResponse(err.message, 500));
					});
			} else {
				next(new ErrorResponse(err.message, 401));
			}
		});
	} else {
		next(new ErrorResponse(err.message, 401));
	}
};
