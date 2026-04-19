import React from 'react';

const Step5_TractionMetrics = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 5: Traction & Metrics</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Current Revenue (Monthly / Annual)</label>
          <input type="text" name="currentRevenue" value={formData.currentRevenue} onChange={handleChange} className="input-field" placeholder="e.g., $10K MRR" />
        </div>
        
        <div>
          <label className="input-label">Growth Rate (%)</label>
          <input type="text" name="growthRate" value={formData.growthRate} onChange={handleChange} className="input-field" placeholder="e.g., 20% MoM" />
        </div>
        
        <div>
          <label className="input-label">Number of Customers / Users</label>
          <input type="text" name="customerCount" value={formData.customerCount} onChange={handleChange} className="input-field" />
        </div>
        
        <div>
          <label className="input-label">Key Partnerships</label>
          <input type="text" name="keyPartnerships" value={formData.keyPartnerships} onChange={handleChange} className="input-field" />
        </div>
        
        <div className="md:col-span-2">
          <label className="input-label">Notable Achievements / Awards</label>
          <textarea name="achievements" value={formData.achievements} onChange={handleChange} rows="2" className="input-field"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Step5_TractionMetrics;