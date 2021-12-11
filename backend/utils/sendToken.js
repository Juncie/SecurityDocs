const sendToken = (user, statusCode, res, message) => {
	const token = user.getSignedJWT();
	console.log(`Token`, token);
	console.log(`user`, user);
	res.status(statusCode).json({ success: true, token, message, user });
};

module.exports = sendToken;
