import React from 'react';

const Step4_MarketOpportunity = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 4: Market Opportunity</h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="input-label">TAM (Total Addressable Market)</label>
          <input type="text" name="tam" value={formData.tam} onChange={handleChange} className="input-field" placeholder="e.g., $10B" />
        </div>
        <div>
          <label className="input-label">SAM (Serviceable Addressable Market)</label>
          <input type="text" name="sam" value={formData.sam} onChange={handleChange} className="input-field" placeholder="e.g., $1B" />
        </div>
        <div>
          <label className="input-label">SOM (Serviceable Obtainable Market)</label>
          <input type="text" name="som" value={formData.som} onChange={handleChange} className="input-field" placeholder="e.g., $100M" />
        </div>
      </div>
      
      <div>
        <label className="input-label">Customer Segment *</label>
        <input type="text" name="customerSegment" value={formData.customerSegment} onChange={handleChange} className="input-field" required />
      </div>
      
      <div>
        <label className="input-label">Key Competitors</label>
        <input type="text" name="keyCompetitors" value={formData.keyCompetitors} onChange={handleChange} className="input-field" />
      </div>
      
      <div>
        <label className="input-label">Your Competitive Advantage *</label>
        <textarea name="competitiveAdvantage" value={formData.competitiveAdvantage} onChange={handleChange} rows="2" className="input-field" required></textarea>
      </div>
    </div>
  );
};

export default Step4_MarketOpportunity;