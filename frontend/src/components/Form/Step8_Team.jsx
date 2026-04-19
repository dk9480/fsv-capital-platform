import React from 'react';

const Step8_Team = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 8: Team</h2>
      
      <div>
        <label className="input-label">Founder Background (Education, Experience) *</label>
        <textarea name="founderBackground" value={formData.founderBackground} onChange={handleChange} rows="4" className="input-field" required placeholder="e.g., IIT Bombay, Ex-Google, 2x Founder"></textarea>
      </div>
      
      <div>
        <label className="input-label">Core Team Members</label>
        <textarea name="coreTeam" value={formData.coreTeam} onChange={handleChange} rows="3" className="input-field" placeholder="List key team members and their roles"></textarea>
      </div>
      
      <div>
        <label className="input-label">Advisors / Mentors</label>
        <textarea name="advisors" value={formData.advisors} onChange={handleChange} rows="2" className="input-field" placeholder="Notable advisors if any"></textarea>
      </div>
    </div>
  );
};

export default Step8_Team;