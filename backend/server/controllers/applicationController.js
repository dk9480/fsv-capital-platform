const Application = require('../models/Application');
const { calculateDealScore } = require('../utils/dealScore');
const { sendApplicationReceivedEmail, sendAdminAlertEmail } = require('../services/emailService');

// Submit new application - INSTANT submission
const submitApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    
    // Calculate deal score
    const dealScore = calculateDealScore(applicationData);
    applicationData.dealScore = dealScore;
    
    // Save to database (INSTANT)
    const application = new Application(applicationData);
    await application.save();
    
    // Send response IMMEDIATELY (don't wait for emails)
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application._id,
      dealScore: dealScore
    });
    
    // Send emails in BACKGROUND (doesn't block response)
    // This runs after user already sees success page
    Promise.all([
      sendApplicationReceivedEmail(applicationData.contactEmail, applicationData.startupName),
      sendAdminAlertEmail(applicationData.startupName, applicationData.industry, dealScore)
    ]).catch(err => console.error('Background email error:', err));
    
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// Get all applications (for admin)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
};

// Get single application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching application' });
  }
};

module.exports = { submitApplication, getAllApplications, getApplicationById };