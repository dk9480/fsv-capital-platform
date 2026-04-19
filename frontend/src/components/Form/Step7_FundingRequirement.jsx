import React from 'react';

const Step7_FundingRequirement = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const fundingStages = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+'];
  const useOfFundsOptions = ['Product Development', 'Go-to-Market', 'Hiring', 'Expansion', 'R&D', 'Other'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 7: Funding Requirement</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Amount Raising (USD / INR) *</label>
          <input type="text" name="amountRaising" value={formData.amountRaising} onChange={handleChange} className="input-field" required placeholder="e.g., $1M USD" />
        </div>
        
        <div>
          <label className="input-label">Funding Stage *</label>
          <select name="fundingStage" value={formData.fundingStage} onChange={handleChange} className="input-field" required>
            <option value="">Select Stage</option>
            {fundingStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </div>
        
        <div>
          <label className="input-label">Equity Offered (%)</label>
          <input type="text" name="equityOffered" value={formData.equityOffered} onChange={handleChange} className="input-field" placeholder="e.g., 10%" />
        </div>
        
        <div>
          <label className="input-label">Use of Funds *</label>
          <select name="useOfFunds" value={formData.useOfFunds} onChange={handleChange} className="input-field" required>
            <option value="">Select Primary Use</option>
            {useOfFundsOptions.map(use => <option key={use} value={use}>{use}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step7_FundingRequirement;