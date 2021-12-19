const express = require('express');
const router = express.Router();

const { authorize } = require('../middleware/authorize');
const { checkRole } = require('../middleware/checkRole');
const {
	getPrivateData,
	newSAR,
	newSarEntry,
	submitSar,
	getSAR,
	findAllSARs,
	updateSarEntry,
	deleteSAR,
} = require('../controllers/private');

router.get('/', authorize, getPrivateData);

// SAR
router.get('/getsar/:id', authorize, getSAR);
router.post('/findallsars', authorize, checkRole, findAllSARs);
router.post('/newsar', authorize, newSAR);
router.post('/newsarentry/:id', authorize, newSarEntry);
router.post('/updatesarentry/:id/:entryid', authorize, updateSarEntry);
router.post('/submitsar/:id', authorize, submitSar);
router.delete('/deletesar/:id', authorize, checkRole, deleteSAR);

module.exports = router;
