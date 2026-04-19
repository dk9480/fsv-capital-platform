import React from 'react';

const Step11_Compliance = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    updateFormData({ [e.target.name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-fsv-navy mb-4">Section 11: Compliance & Declaration</h2>
      
      <div>
        <label className="flex items-center gap-3">
          <input type="checkbox" name="companyRegistered" checked={formData.companyRegistered} onChange={handleChange} />
          <span>Company Registered?</span>
        </label>
      </div>
      
      <div>
        <label className="input-label">Any Legal Issues?</label>
        <div className="flex gap-4 mt-1 mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="legalIssues" value="No" checked={formData.legalIssues === 'No'} onChange={handleChange} />
            No
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="legalIssues" value="Yes" checked={formData.legalIssues === 'Yes'} onChange={handleChange} />
            Yes
          </label>
        </div>
        
        {formData.legalIssues === 'Yes' && (
          <textarea
            name="legalIssuesExplanation"
            value={formData.legalIssuesExplanation || ''}
            onChange={handleChange}
            rows="3"
            className="input-field mt-2"
            placeholder="Please explain the legal issues in detail..."
          />
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consentGiven" checked={formData.consentGiven} onChange={handleChange} required />
          <span className="text-sm text-gray-700">
            I consent to share this information with FSV Capital and its partners for evaluation purposes. 
            I confirm that all information provided is accurate and complete to the best of my knowledge.
          </span>
        </label>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        By submitting this application, you agree to our <a href="/privacy" className="text-fsv-navy underline">Privacy Policy</a> (DPDP compliant).
      </p>
    </div>
  );
};

export default Step11_Compliance;