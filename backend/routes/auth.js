const express = require('express')
const router = express.Router();

const {register, login, forgotPassword, resetPassword} = require('../controllers/auth.js')

router.get('/register')
router.post('/register', register)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

module.exports = router;