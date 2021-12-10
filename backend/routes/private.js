const express = require('express');
const router = express.Router();
const {
	getPrivateData,
	newSAR,
	newSarEntry,
} = require('../controllers/private');
const { authorize } = require('../middleware/authorize');

router.get('/', authorize, getPrivateData);
router.post('/newsar', authorize, newSAR);
router.post('/newsarentry/:sarId', authorize, newSarEntry);

module.exports = router;
