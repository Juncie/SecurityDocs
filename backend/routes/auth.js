const express = require('express')
const router = express.Router();

const {register, login, forgotPassword, resetPassword} = require('../controllers/auth.js')

router.get('/register')
router.get('/getuser')
router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword/:resetToken', resetPassword)

module.exports = router;

