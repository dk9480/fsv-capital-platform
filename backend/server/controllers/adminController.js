const Admin = require('../models/Admin');
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt:', email);
    
    // Check if admin exists
    let admin = await Admin.findOne({ email });
    
    // If no admin exists, create default admin
    if (!admin) {
      console.log('📝 Creating default admin...');
      
      // Hash the password manually
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      
      admin = new Admin({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        name: 'FSV Admin'
      });
      
      await admin.save();
      console.log('✅ Default admin created successfully');
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('🔑 Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('✅ Login successful');
    
    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all applications with filters
const getAllApplications = async (req, res) => {
  try {
    const { search, sector, stage, status, minScore, maxScore } = req.query;
    let filter = {};
    
    if (search) {
      filter.$or = [
        { startupName: { $regex: search, $options: 'i' } },
        { founderNames: { $regex: search, $options: 'i' } },
        { contactEmail: { $regex: search, $options: 'i' } }
      ];
    }
    if (sector) filter.industry = { $regex: sector, $options: 'i' };
    if (stage) filter.currentStage = stage;
    if (status) filter.status = status;
    if (minScore || maxScore) {
      filter.dealScore = {};
      if (minScore) filter.dealScore.$gte = parseInt(minScore);
      if (maxScore) filter.dealScore.$lte = parseInt(maxScore);
    }
    
    const applications = await Application.find(filter).sort({ submittedAt: -1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update admin notes
const updateAdminNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      id,
      { adminNotes: notes, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const newCount = await Application.countDocuments({ status: 'New' });
    const reviewing = await Application.countDocuments({ status: 'Reviewing' });
    const shortlisted = await Application.countDocuments({ status: 'Shortlisted' });
    const funded = await Application.countDocuments({ status: 'Funded' });
    const rejected = await Application.countDocuments({ status: 'Rejected' });
    
    const avgScore = await Application.aggregate([
      { $group: { _id: null, avg: { $avg: '$dealScore' } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        reviewing,
        shortlisted,
        funded,
        rejected,
        averageScore: avgScore[0]?.avg.toFixed(0) || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export applications to CSV/Excel format
const exportApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    
    const csvData = applications.map(app => ({
      'Startup Name': app.startupName,
      'Founder': app.founderNames,
      'Email': app.contactEmail,
      'Industry': app.industry,
      'Stage': app.currentStage,
      'Revenue': app.currentRevenue,
      'Funding Ask': app.amountRaising,
      'Deal Score': app.dealScore,
      'Status': app.status,
      'Submitted Date': app.submittedAt.toISOString().split('T')[0]
    }));
    
    res.json({ success: true, data: csvData, count: csvData.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// Get chart data for analytics dashboard
const getChartData = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: 1 });
    
    // 1. Applications per month (last 6 months)
    const monthMap = new Map();
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      monthMap.set(monthName, 0);
    }
    
    applications.forEach(app => {
      const date = new Date(app.submittedAt);
      const monthName = date.toLocaleString('default', { month: 'short' });
      if (monthMap.has(monthName)) {
        monthMap.set(monthName, monthMap.get(monthName) + 1);
      }
    });
    
    const monthlyData = Array.from(monthMap.entries()).map(([month, count]) => ({
      month,
      count
    }));
    
    // 2. Average deal score trend (by month)
    const scoreByMonth = new Map();
    applications.forEach(app => {
      const date = new Date(app.submittedAt);
      const monthName = date.toLocaleString('default', { month: 'short' });
      if (!scoreByMonth.has(monthName)) {
        scoreByMonth.set(monthName, { total: 0, count: 0 });
      }
      const data = scoreByMonth.get(monthName);
      data.total += app.dealScore || 0;
      data.count += 1;
    });
    
    const scoreTrendData = Array.from(scoreByMonth.entries()).map(([month, data]) => ({
      month,
      score: Math.round(data.total / data.count)
    })).slice(-6);
    
    // 3. Sector-wise distribution
    const sectorMap = new Map();
    applications.forEach(app => {
      const sector = app.industry || 'Other';
      sectorMap.set(sector, (sectorMap.get(sector) || 0) + 1);
    });
    
    const sectorData = Array.from(sectorMap.entries()).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value).slice(0, 6);
    
    // 4. Stage-wise funnel
    const stageOrder = ['Idea', 'MVP', 'Early Revenue', 'Growth Stage', 'Scaling'];
    const stageMap = new Map();
    stageOrder.forEach(stage => stageMap.set(stage, 0));
    
    applications.forEach(app => {
      const stage = app.currentStage;
      if (stageMap.has(stage)) {
        stageMap.set(stage, stageMap.get(stage) + 1);
      }
    });
    
    const stageData = stageOrder.map(stage => ({
      stage,
      count: stageMap.get(stage) || 0
    }));
    
    res.json({
      success: true,
      data: {
        monthlyApplications: monthlyData,
        scoreTrend: scoreTrendData,
        sectorDistribution: sectorData,
        stageDistribution: stageData
      }
    });
  } catch (error) {
    console.error('Chart data error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllApplications,
  updateApplicationStatus,
  updateAdminNotes,
  getDashboardStats,
  exportApplications,
  getChartData
};