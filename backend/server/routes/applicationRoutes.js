const express = require('express');
const router = express.Router();
const { submitApplication, getAllApplications, getApplicationById } = require('../controllers/applicationController');

router.post('/submit', submitApplication);
router.get('/', getAllApplications);
router.get('/:id', getApplicationById);

module.exports = router;