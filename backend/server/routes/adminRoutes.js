const express = require('express');
const router = express.Router();
const { adminLogin, getAllApplications, updateApplicationStatus, updateAdminNotes, getDashboardStats, exportApplications,getChartData } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.get('/applications', protect, getAllApplications);
router.put('/applications/:id/status', protect, updateApplicationStatus);
router.put('/applications/:id/notes', protect, updateAdminNotes);
router.get('/stats', protect, getDashboardStats);
router.get('/export', protect, exportApplications);
router.get('/chart-data', protect, getChartData);

module.exports = router;
