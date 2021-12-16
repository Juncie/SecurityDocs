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
} = require('../controllers/private');

router.get('/', authorize, getPrivateData);

// SAR
router.get('/getsar/:sarId', authorize, getSAR);
router.post('/findallsars', authorize, findAllSARs);
router.post('/newsar', authorize, newSAR);
router.post('/newsarentry/:sarId', authorize, newSarEntry);
router.post('/updatesarentry/:id/:entryId', authorize, updateSarEntry); //updateType: 'update' or 'delete'
router.post('/submitsar/:sarId', authorize, submitSar);

module.exports = router;
