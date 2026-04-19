import React from 'react';

const Step3_ProductTech = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 3: Product & Technology</h2>
      
      <div>
        <label className="input-label">Core Product Description *</label>
        <textarea name="coreProductDescription" value={formData.coreProductDescription} onChange={handleChange} rows="3" className="input-field" required></textarea>
      </div>
      
      <div>
        <label className="input-label">Technology Stack (AI, Blockchain, Cloud, APIs, etc.)</label>
        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} className="input-field" />
      </div>
      
      <div>
        <label className="input-label">Unique Value Proposition (USP) *</label>
        <textarea name="usp" value={formData.usp} onChange={handleChange} rows="2" className="input-field" required></textarea>
      </div>
      
      <div>
        <label className="input-label">IP / Patents (if any)</label>
        <input type="text" name="ipPatents" value={formData.ipPatents} onChange={handleChange} className="input-field" />
      </div>
      
      <div>
        <label className="input-label">Demo Link / Product Video</label>
        <input type="url" name="demoLink" value={formData.demoLink} onChange={handleChange} className="input-field" />
      </div>
    </div>
  );
};

export default Step3_ProductTech;