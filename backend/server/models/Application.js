const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Section 1: Basic Information
  startupName: { type: String, required: true },
  websiteUrl: { type: String, default: '' },
  founderNames: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactNumber: { type: String, default: '' },
  linkedinProfile: { type: String, default: '' },
  headquarters: { type: String, default: '' },
  yearIncorporated: { type: String, default: '' },

  // Section 2: Startup Overview
  problemStatement: { type: String, default: '' },
  solutionOverview: { type: String, default: '' },
  industry: { type: String, default: '' },
  businessModel: { type: String, default: '' },
  currentStage: { type: String, default: '' },

  // Section 3: Product & Technology
  coreProductDescription: { type: String, default: '' },
  techStack: { type: String, default: '' },
  usp: { type: String, default: '' },
  ipPatents: { type: String, default: '' },
  demoLink: { type: String, default: '' },

  // Section 4: Market Opportunity
  tam: { type: String, default: '' },
  sam: { type: String, default: '' },
  som: { type: String, default: '' },
  customerSegment: { type: String, default: '' },
  keyCompetitors: { type: String, default: '' },
  competitiveAdvantage: { type: String, default: '' },

  // Section 5: Traction & Metrics
  currentRevenue: { type: String, default: '' },
  growthRate: { type: String, default: '' },
  customerCount: { type: String, default: '' },
  keyPartnerships: { type: String, default: '' },
  achievements: { type: String, default: '' },

  // Section 6: Financials
  fundingRaised: { type: String, default: '' },
  existingInvestors: { type: String, default: '' },
  burnRate: { type: String, default: '' },
  runway: { type: String, default: '' },
  revenueProjections: { type: String, default: '' },

  // Section 7: Funding Requirement
  amountRaising: { type: String, default: '' },
  fundingStage: { type: String, default: '' },
  equityOffered: { type: String, default: '' },
  useOfFunds: { type: String, default: '' },

  // Section 8: Team
  founderBackground: { type: String, default: '' },
  coreTeam: { type: String, default: '' },
  advisors: { type: String, default: '' },

  // Section 9: Strategic Fit
  whyFsv: { type: String, default: '' },
  valueBeyondFunding: { type: String, default: '' },
  mentorshipInterest: { type: String, default: '' },

  // Section 10: Documents
  pitchDeckUrl: { type: String, default: '' },
  financialModelUrl: { type: String, default: '' },
  screenshotsUrl: { type: String, default: '' },
  additionalDocsUrl: { type: String, default: '' },

  // Section 11: Compliance
  companyRegistered: { type: Boolean, default: false },
  legalIssues: { type: String, default: '' },
  consentGiven: { type: Boolean, default: false },

  // Admin fields
  dealScore: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['New', 'Reviewing', 'Shortlisted', 'Rejected', 'Funded'],
    default: 'New'
  },
  adminNotes: { type: String, default: '' },

  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);