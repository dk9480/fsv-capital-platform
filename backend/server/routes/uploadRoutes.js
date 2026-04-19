const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const { uploadMiddleware } = require('../middleware/uploadMiddleware');

router.post('/:type', uploadMiddleware, uploadFile);

module.exports = router;