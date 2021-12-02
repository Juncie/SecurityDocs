const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controllers/private');
const { authorize } = require('../middleware/authorize');

router.route('/').get(authorize, getPrivateData);

module.exports = router;
