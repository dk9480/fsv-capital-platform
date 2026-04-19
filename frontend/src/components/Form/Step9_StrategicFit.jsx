import React from 'react';

const Step9_StrategicFit = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 9: Strategic Fit with FSV Capital</h2>
      
      <div>
        <label className="input-label">Why do you want to partner with FSV Capital? *</label>
        <textarea name="whyFsv" value={formData.whyFsv} onChange={handleChange} rows="3" className="input-field" required></textarea>
      </div>
      
      <div>
        <label className="input-label">How can FSV Capital add value beyond funding?</label>
        <textarea name="valueBeyondFunding" value={formData.valueBeyondFunding} onChange={handleChange} rows="3" className="input-field" placeholder="e.g., Network, Mentorship, Strategic guidance"></textarea>
      </div>
      
      <div>
        <label className="input-label">Are you open to mentorship / cohort programs? *</label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="mentorshipInterest" value="Yes" checked={formData.mentorshipInterest === 'Yes'} onChange={handleChange} /> Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="mentorshipInterest" value="No" checked={formData.mentorshipInterest === 'No'} onChange={handleChange} /> No
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step9_StrategicFit;