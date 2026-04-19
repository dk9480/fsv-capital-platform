import React from 'react';

const Step1_BasicInfo = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 1: Basic Information</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Startup Name *</label>
          <input type="text" name="startupName" value={formData.startupName} onChange={handleChange} className="input-field" required />
        </div>
        
        <div>
          <label className="input-label">Website URL *</label>
          <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} className="input-field" required />
        </div>
        
        <div>
          <label className="input-label">Founder Name(s) *</label>
          <input type="text" name="founderNames" value={formData.founderNames} onChange={handleChange} className="input-field" required />
        </div>
        
        <div>
          <label className="input-label">Contact Email *</label>
          <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="input-field" required />
        </div>
        
        <div>
          <label className="input-label">Contact Number *</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="input-field" required />
        </div>
        
        <div>
          <label className="input-label">LinkedIn Profile</label>
          <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} className="input-field" />
        </div>
        
        <div>
          <label className="input-label">Headquarters Location (City, Country) *</label>
          <input type="text" name="headquarters" value={formData.headquarters} onChange={handleChange} className="input-field" required />
        </div>
        
        <div>
          <label className="input-label">Year of Incorporation *</label>
          <input type="number" name="yearIncorporated" value={formData.yearIncorporated} onChange={handleChange} className="input-field" required />
        </div>
      </div>
    </div>
  );
};

export default Step1_BasicInfo;