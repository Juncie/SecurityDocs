exports.checkRole = async (req, res, next) => {
	const role = res.locals.role;
	if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'manager') {
		next();
	} else {
		return res.status(401).json({
			status: 'error',
			message: 'Unauthorized Access',
		});
	}
};
