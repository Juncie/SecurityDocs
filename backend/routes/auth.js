const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authorize');
const { checkRole } = require('../middleware/checkRole');

const {
	register,
	login,
	forgotPassword,
	resetPassword,
	getUser,
	deleteUser,
	allUsers,
} = require('../controllers/auth.js');

router.get('/', (req, res) => {
	res.send('Welcome to the Auth Route');
});
router.get('/getuser', authorize, getUser);
router.post('/users', authorize, checkRole, allUsers);
router.delete('/deleteuser/:id', authorize, checkRole, deleteUser);
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:resetToken', resetPassword);

module.exports = router;
