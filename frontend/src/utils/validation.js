// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// URL validation
export const validateUrl = (url) => {
  if (!url) return true;
  const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return re.test(url);
};

// Phone validation
export const validatePhone = (phone) => {
  if (!phone) return true;
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
  return re.test(phone);
};

// Year validation
export const validateYear = (year) => {
  if (!year) return true;
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear + 1;
};

// Revenue validation based on stage
export const validateStageWithRevenue = (stage, revenue) => {
  if (stage === 'Idea' && revenue && revenue !== '0' && revenue !== '') {
    return { valid: false, message: '⚠️ Idea stage should not have revenue. Please check your selection.' };
  }
  if ((stage === 'MVP' || stage === 'Early Revenue') && (!revenue || revenue === '')) {
    return { valid: false, message: '⚠️ Revenue is expected at this stage. Please enter your current revenue.' };
  }
  return { valid: true, message: '' };
};

// Funding range validation based on stage
export const validateFundingRange = (amount, stage) => {
  if (!amount) return { valid: true, message: '' };
  
  const numAmount = parseFloat(amount?.replace(/[^0-9.]/g, '') || 0);
  const stageLimits = {
    'Pre-seed': { max: 1000000, message: 'Pre-seed funding typically max $1M' },
    'Seed': { max: 3000000, message: 'Seed funding typically max $3M' },
    'Series A': { max: 15000000, message: 'Series A funding typically max $15M' },
  };
  
  if (stageLimits[stage] && numAmount > stageLimits[stage].max) {
    return { valid: false, message: `⚠️ ${stageLimits[stage].message}. Your ask: $${numAmount.toLocaleString()}` };
  }
  return { valid: true, message: '' };
};

// Growth rate validation based on stage
export const validateGrowthRate = (stage, growthRate) => {
  if (!growthRate) return { valid: true, message: '' };
  
  const growth = parseFloat(growthRate);
  if (stage === 'Scaling' && growth < 20) {
    return { valid: false, message: '⚠️ Scaling stage typically requires >20% growth rate' };
  }
  if (stage === 'Growth Stage' && growth < 10) {
    return { valid: false, message: '⚠️ Growth stage typically requires >10% growth rate' };
  }
  return { valid: true, message: '' };
};

// Sector alignment validation
export const validateSectorAlignment = (industry) => {
  const preferredSectors = ['Fintech', 'AI', 'Artificial Intelligence', 'Blockchain', 'DeepTech', 'SaaS'];
  if (!industry) return { valid: true, message: '' };
  
  if (!preferredSectors.some(s => industry.toLowerCase().includes(s.toLowerCase()))) {
    return { 
      valid: false, 
      message: '⚠️ FSV Capital focuses on Fintech, AI, Blockchain, DeepTech, and SaaS sectors' 
    };
  }
  return { valid: true, message: '' };
};

// Required fields validation
export const validateRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'boolean') return true;
  return value !== null && value !== undefined;
};

export const validateMinLength = (value, min) => {
  return value && value.length >= min;
};

export const validateMaxLength = (value, max) => {
  return value && value.length <= max;
};

export const validateNumber = (value) => {
  return !isNaN(value) && value !== '';
};

// Legal issues conditional validation
export const validateLegalIssues = (hasIssues, explanation) => {
  if (hasIssues === 'Yes' && (!explanation || explanation.trim() === '')) {
    return { valid: false, message: 'Please explain the legal issues' };
  }
  return { valid: true, message: '' };
};

// Form validation rules for each step
export const formValidationRules = {
  step1: (data) => {
    const errors = {};
    if (!validateRequired(data.startupName)) errors.startupName = 'Startup name is required';
    if (!validateRequired(data.contactEmail)) errors.contactEmail = 'Email is required';
    else if (!validateEmail(data.contactEmail)) errors.contactEmail = 'Invalid email format';
    if (!validateRequired(data.founderNames)) errors.founderNames = 'Founder name is required';
    if (data.contactNumber && !validatePhone(data.contactNumber)) errors.contactNumber = 'Invalid phone number';
    if (data.websiteUrl && !validateUrl(data.websiteUrl)) errors.websiteUrl = 'Invalid URL format';
    if (data.yearIncorporated && !validateYear(parseInt(data.yearIncorporated))) {
      errors.yearIncorporated = 'Invalid year';
    }
    return errors;
  },
  
  step2: (data) => {
    const errors = {};
    if (!validateRequired(data.problemStatement)) errors.problemStatement = 'Problem statement is required';
    if (!validateRequired(data.solutionOverview)) errors.solutionOverview = 'Solution overview is required';
    if (!validateRequired(data.industry)) errors.industry = 'Industry is required';
    if (!validateRequired(data.currentStage)) errors.currentStage = 'Current stage is required';
    return errors;
  },
  
  step5: (data) => {
    const warnings = [];
    const revenueWarning = validateStageWithRevenue(data.currentStage, data.currentRevenue);
    if (!revenueWarning.valid) warnings.push(revenueWarning.message);
    
    const growthWarning = validateGrowthRate(data.currentStage, data.growthRate);
    if (!growthWarning.valid) warnings.push(growthWarning.message);
    
    return { warnings, hasWarnings: warnings.length > 0 };
  },
  
  step7: (data) => {
    const warnings = [];
    const fundingWarning = validateFundingRange(data.amountRaising, data.fundingStage);
    if (!fundingWarning.valid) warnings.push(fundingWarning.message);
    return { warnings, hasWarnings: warnings.length > 0 };
  },
  
  step11: (data) => {
    const errors = {};
    if (!data.consentGiven) errors.consentGiven = 'You must consent to data sharing';
    if (!data.pitchDeckUrl) errors.pitchDeckUrl = 'Pitch deck is mandatory';
    
    const legalValidation = validateLegalIssues(data.legalIssues === 'Yes' ? 'Yes' : 'No', data.legalIssuesExplanation);
    if (!legalValidation.valid) errors.legalIssues = legalValidation.message;
    
    return errors;
  },
};

export default {
  validateEmail,
  validateUrl,
  validatePhone,
  validateYear,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumber,
  validateStageWithRevenue,
  validateFundingRange,
  validateGrowthRate,
  validateSectorAlignment,
  validateLegalIssues,
  formValidationRules,
};