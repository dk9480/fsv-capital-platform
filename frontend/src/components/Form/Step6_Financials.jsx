import React from 'react';

const Step6_Financials = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 6: Financials</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Funding Raised Till Date</label>
          <input type="text" name="fundingRaised" value={formData.fundingRaised} onChange={handleChange} className="input-field" placeholder="e.g., $500K" />
        </div>
        
        <div>
          <label className="input-label">Investors (if any)</label>
          <input type="text" name="existingInvestors" value={formData.existingInvestors} onChange={handleChange} className="input-field" />
        </div>
        
        <div>
          <label className="input-label">Burn Rate</label>
          <input type="text" name="burnRate" value={formData.burnRate} onChange={handleChange} className="input-field" placeholder="e.g., $50K/month" />
        </div>
        
        <div>
          <label className="input-label">Runway (in months)</label>
          <input type="text" name="runway" value={formData.runway} onChange={handleChange} className="input-field" placeholder="e.g., 12 months" />
        </div>
        
        <div className="md:col-span-2">
          <label className="input-label">Revenue Projections (next 3 years)</label>
          <textarea name="revenueProjections" value={formData.revenueProjections} onChange={handleChange} rows="2" className="input-field" placeholder="Year 1: $1M, Year 2: $5M, Year 3: $20M"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Step6_Financials;