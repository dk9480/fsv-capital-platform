export const INDUSTRIES = [
  { value: 'Fintech', label: 'Fintech' },
  { value: 'AI', label: 'AI / Artificial Intelligence' },
  { value: 'Blockchain', label: 'Blockchain / Web3' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'DeepTech', label: 'DeepTech' },
  { value: 'HealthTech', label: 'HealthTech' },
  { value: 'EdTech', label: 'EdTech' },
  { value: 'ClimateTech', label: 'ClimateTech' },
  { value: 'Other', label: 'Other' },
];

export const BUSINESS_MODELS = [
  { value: 'B2B', label: 'B2B' },
  { value: 'B2C', label: 'B2C' },
  { value: 'B2B2C', label: 'B2B2C' },
  { value: 'Marketplace', label: 'Marketplace' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Other', label: 'Other' },
];

export const STAGES = [
  { value: 'Idea', label: 'Idea' },
  { value: 'MVP', label: 'MVP' },
  { value: 'Early Revenue', label: 'Early Revenue' },
  { value: 'Growth Stage', label: 'Growth Stage' },
  { value: 'Scaling', label: 'Scaling' },
];

export const FUNDING_STAGES = [
  { value: 'Pre-seed', label: 'Pre-seed' },
  { value: 'Seed', label: 'Seed' },
  { value: 'Series A', label: 'Series A' },
  { value: 'Series B', label: 'Series B' },
  { value: 'Series C+', label: 'Series C+' },
];

export const USE_OF_FUNDS = [
  { value: 'Product Development', label: 'Product Development' },
  { value: 'Go-to-Market', label: 'Go-to-Market' },
  { value: 'Hiring', label: 'Hiring' },
  { value: 'Expansion', label: 'Expansion' },
  { value: 'R&D', label: 'R&D' },
  { value: 'Other', label: 'Other' },
];

export const STATUS_OPTIONS = [
  { value: 'New', label: 'New', color: 'blue' },
  { value: 'Reviewing', label: 'Reviewing', color: 'yellow' },
  { value: 'Shortlisted', label: 'Shortlisted', color: 'green' },
  { value: 'Rejected', label: 'Rejected', color: 'red' },
  { value: 'Funded', label: 'Funded', color: 'purple' },
];

export const SECTOR_FILTERS = [
  { value: 'Fintech', label: 'Fintech' },
  { value: 'AI', label: 'AI' },
  { value: 'Blockchain', label: 'Blockchain' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'DeepTech', label: 'DeepTech' },
];

export const API_ENDPOINTS = {
  SUBMIT_APPLICATION: '/api/applications/submit',
  GET_APPLICATIONS: '/api/admin/applications',
  ADMIN_LOGIN: '/api/admin/login',
  UPDATE_STATUS: '/api/admin/applications',
  UPDATE_NOTES: '/api/admin/applications',
  GET_STATS: '/api/admin/stats',
  EXPORT: '/api/admin/export',
  UPLOAD_FILE: '/api/upload',
};

export const FILE_UPLOAD_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
  pitchdeck: { accept: '.pdf', required: true },
  financial: { accept: '.pdf,.xlsx,.xls', required: false },
  screenshot: { accept: '.pdf,.jpg,.png', required: false },
  document: { accept: '.pdf,.doc,.docx', required: false },
};

export const FORM_STEPS = [
  { number: 1, title: 'Basic Information' },
  { number: 2, title: 'Startup Overview' },
  { number: 3, title: 'Product & Technology' },
  { number: 4, title: 'Market Opportunity' },
  { number: 5, title: 'Traction & Metrics' },
  { number: 6, title: 'Financials' },
  { number: 7, title: 'Funding Requirement' },
  { number: 8, title: 'Team' },
  { number: 9, title: 'Strategic Fit' },
  { number: 10, title: 'Documents Upload' },
  { number: 11, title: 'Compliance' },
];

export default {
  INDUSTRIES,
  BUSINESS_MODELS,
  STAGES,
  FUNDING_STAGES,
  USE_OF_FUNDS,
  STATUS_OPTIONS,
  SECTOR_FILTERS,
  API_ENDPOINTS,
  FILE_UPLOAD_CONFIG,
  FORM_STEPS,
};
