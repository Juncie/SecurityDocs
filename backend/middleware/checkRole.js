exports.checkRole = async (req, res, next) => {
	const role = res.locals.role;

	role === 'admin' || role === 'manager'
		? next()
		: res.status(401).json({ status: 401, message: 'Permission Denied' });
};
