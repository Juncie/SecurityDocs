const sendToken = (user, statusCode, res, message) => {
	const token = user.getSignedJWT();
	res.status(statusCode).json({ success: true, token, message, user });
};

module.exports = sendToken;
