import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dealScore, startupName } = location.state || { dealScore: 0, startupName: 'Your Startup' };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-fsv-navy mb-4">Application Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you, {startupName}, for applying to FSV Capital.</p>
          
          <div className="bg-gradient-to-r from-fsv-navy to-fsv-dark text-white rounded-lg p-6 mb-6">
            <p className="text-sm opacity-80">Your Deal Score</p>
            <p className="text-5xl font-bold">{dealScore}/100</p>
            <p className="text-sm mt-2">
              {dealScore >= 70 ? '🔥 Strong application! Our team will contact you soon.' :
               dealScore >= 50 ? '📈 Good application. Under review.' :
               '📝 Application received. We will review and get back to you.'}
            </p>
          </div>
          
          <p className="text-gray-500 mb-6">
            We have sent a confirmation email to your registered email address.<br />
            Our investment team will review your application within 5-7 business days.
          </p>
          
          <button onClick={() => navigate('/')} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;