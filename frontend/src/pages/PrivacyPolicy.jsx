import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="card">
          <h1 className="text-3xl font-bold text-fsv-navy mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">1. Information We Collect</h2>
              <p className="text-gray-600">We collect startup information including company details, founder information, financial data, and uploaded documents for funding evaluation purposes.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">2. How We Use Your Information</h2>
              <p className="text-gray-600">Your information is used solely for evaluating funding applications, communicating with applicants, and managing the investment pipeline. We do not sell your data to third parties.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">3. Data Sharing (DPDP Compliant)</h2>
              <p className="text-gray-600">We share application data only with FSV Capital partners and investment committee members for evaluation purposes. You consent to this by checking the consent box.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">4. Data Security</h2>
              <p className="text-gray-600">We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">5. Your Rights</h2>
              <p className="text-gray-600">You have the right to access, correct, or delete your data. Contact us at privacy@fsvcapital.com for any requests.</p>
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

export default PrivacyPolicy;