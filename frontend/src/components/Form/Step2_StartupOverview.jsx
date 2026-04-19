import React from 'react';

const Step2_StartupOverview = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const industries = ['Fintech', 'AI / Artificial Intelligence', 'Blockchain', 'SaaS', 'DeepTech', 'HealthTech', 'EdTech', 'Other'];
  const businessModels = ['B2B', 'B2C', 'B2B2C', 'Marketplace', 'SaaS', 'Hardware', 'Other'];
  const stages = ['Idea', 'MVP', 'Early Revenue', 'Growth Stage', 'Scaling'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 2: Startup Overview</h2>
      
      <div>
        <label className="input-label">Problem Statement (What problem are you solving?) *</label>
        <textarea name="problemStatement" value={formData.problemStatement} onChange={handleChange} rows="3" className="input-field" required></textarea>
      </div>
      
      <div>
        <label className="input-label">Solution Overview (Describe your product/service) *</label>
        <textarea name="solutionOverview" value={formData.solutionOverview} onChange={handleChange} rows="3" className="input-field" required></textarea>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Industry / Sector *</label>
          <select name="industry" value={formData.industry} onChange={handleChange} className="input-field" required>
            <option value="">Select Industry</option>
            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>
        </div>
        
        <div>
          <label className="input-label">Business Model *</label>
          <select name="businessModel" value={formData.businessModel} onChange={handleChange} className="input-field" required>
            <option value="">Select Business Model</option>
            {businessModels.map(model => <option key={model} value={model}>{model}</option>)}
          </select>
        </div>
        
        <div>
          <label className="input-label">Current Stage *</label>
          <select name="currentStage" value={formData.currentStage} onChange={handleChange} className="input-field" required>
            <option value="">Select Stage</option>
            {stages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step2_StartupOverview;