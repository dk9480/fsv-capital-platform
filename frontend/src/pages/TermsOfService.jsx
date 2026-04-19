import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="card">
          <h1 className="text-3xl font-bold text-fsv-navy mb-4">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">1. Acceptance of Terms</h2>
              <p className="text-gray-600">By accessing and using FSV Capital's platform, you agree to be bound by these Terms of Service.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">2. Eligibility</h2>
              <p className="text-gray-600">You must be a legal representative of a registered startup to apply for funding through our platform.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">3. Application Process</h2>
              <p className="text-gray-600">All applications are reviewed by our investment committee. Submission does not guarantee funding.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">4. Data Accuracy</h2>
              <p className="text-gray-600">You are responsible for providing accurate and complete information in your application.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">5. Confidentiality</h2>
              <p className="text-gray-600">We treat your application information as confidential and share only with investment committee members.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">6. Contact</h2>
              <p className="text-gray-600">For questions about these terms, contact us at legal@fsvcapital.com</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <Link to="/" className="text-fsv-navy hover:underline">← Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;