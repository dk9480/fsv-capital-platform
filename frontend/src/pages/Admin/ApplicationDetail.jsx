import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await api.getApplications(token);
      const app = response.applications.find(a => a._id === id);
      if (app) {
        setApplication(app);
        setNotes(app.adminNotes || '');
      }
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      await api.updateNotes(token, id, notes);
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!application) return <div className="text-center py-8">Application not found</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/admin')} className="text-fsv-navy hover:underline mb-4">
        ← Back to Dashboard
      </button>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-fsv-navy mb-2">{application.startupName}</h1>
        <p className="text-gray-500 mb-4">Submitted on {new Date(application.submittedAt).toLocaleDateString()}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Section 1 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Basic Information</h3>
            <p><strong>Founder:</strong> {application.founderNames}</p>
            <p><strong>Email:</strong> {application.contactEmail}</p>
            <p><strong>Phone:</strong> {application.contactNumber}</p>
            <p><strong>Location:</strong> {application.headquarters}</p>
            <p><strong>Website:</strong> <a href={application.websiteUrl} target="_blank" className="text-fsv-navy">{application.websiteUrl}</a></p>
          </div>
          
          {/* Section 2 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Overview</h3>
            <p><strong>Industry:</strong> {application.industry}</p>
            <p><strong>Stage:</strong> {application.currentStage}</p>
            <p><strong>Business Model:</strong> {application.businessModel}</p>
            <p><strong>Problem:</strong> {application.problemStatement}</p>
            <p><strong>Solution:</strong> {application.solutionOverview}</p>
          </div>
          
          {/* Section 3 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Product & Technology</h3>
            <p><strong>Product:</strong> {application.coreProductDescription}</p>
            <p><strong>USP:</strong> {application.usp}</p>
            <p><strong>Tech Stack:</strong> {application.techStack}</p>
            <p><strong>IP/Patents:</strong> {application.ipPatents || 'None'}</p>
            {application.demoLink && <p><strong>Demo:</strong> <a href={application.demoLink} target="_blank" className="text-fsv-navy">Watch Demo</a></p>}
          </div>
          
          {/* Section 4 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Market Opportunity</h3>
            <p><strong>TAM/SAM/SOM:</strong> {application.tam} / {application.sam} / {application.som}</p>
            <p><strong>Customer Segment:</strong> {application.customerSegment}</p>
            <p><strong>Competitive Advantage:</strong> {application.competitiveAdvantage}</p>
          </div>
          
          {/* Section 5 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Traction & Metrics</h3>
            <p><strong>Revenue:</strong> {application.currentRevenue || 'N/A'}</p>
            <p><strong>Growth Rate:</strong> {application.growthRate || 'N/A'}</p>
            <p><strong>Customers:</strong> {application.customerCount || 'N/A'}</p>
            <p><strong>Achievements:</strong> {application.achievements || 'N/A'}</p>
          </div>
          
          {/* Section 6 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Financials</h3>
            <p><strong>Funding Raised:</strong> {application.fundingRaised || 'N/A'}</p>
            <p><strong>Burn Rate:</strong> {application.burnRate || 'N/A'}</p>
            <p><strong>Runway:</strong> {application.runway || 'N/A'}</p>
            <p><strong>Projections:</strong> {application.revenueProjections || 'N/A'}</p>
          </div>
          
          {/* Section 7 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Funding Requirement</h3>
            <p><strong>Amount:</strong> {application.amountRaising}</p>
            <p><strong>Stage:</strong> {application.fundingStage}</p>
            <p><strong>Equity:</strong> {application.equityOffered || 'N/A'}</p>
            <p><strong>Use of Funds:</strong> {application.useOfFunds}</p>
          </div>
          
          {/* Section 8 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Team</h3>
            <p><strong>Founder Background:</strong> {application.founderBackground}</p>
            <p><strong>Core Team:</strong> {application.coreTeam || 'N/A'}</p>
            <p><strong>Advisors:</strong> {application.advisors || 'N/A'}</p>
          </div>
          
          {/* Section 9 */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Strategic Fit</h3>
            <p><strong>Why FSV?</strong> {application.whyFsv}</p>
            <p><strong>Value Beyond Funding:</strong> {application.valueBeyondFunding || 'N/A'}</p>
            <p><strong>Mentorship Interest:</strong> {application.mentorshipInterest}</p>
          </div>
          
          {/* Documents */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-fsv-navy mb-2">Documents</h3>
            {application.pitchDeckUrl && <p><strong>Pitch Deck:</strong> <a href={application.pitchDeckUrl} target="_blank" className="text-fsv-navy">Download PDF</a></p>}
            {application.financialModelUrl && <p><strong>Financial Model:</strong> <a href={application.financialModelUrl} target="_blank">Download</a></p>}
          </div>
        </div>
        
        {/* Admin Notes */}
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="font-semibold text-fsv-navy mb-2">Admin Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="input-field mb-2"
            placeholder="Add internal notes about this application..."
          />
          <button onClick={handleSaveNotes} className="btn-primary">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;