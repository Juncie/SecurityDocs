const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authorize');

const {
	register,
	login,
	forgotPassword,
	resetPassword,
	getUser,
} = require('../controllers/auth.js');

router.get('/register');
router.get('/getuser', authorize, getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:resetToken', resetPassword);

module.exports = router;
