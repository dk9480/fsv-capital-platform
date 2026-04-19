import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';  // ← Fixed path

const DpdpCompliance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="card">
          <h1 className="text-3xl font-bold text-fsv-navy mb-4">DPDP Compliance</h1>
          <p className="text-gray-500 mb-8">Digital Personal Data Protection Act, 2023</p>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">What is DPDP?</h2>
              <p className="text-gray-600">The Digital Personal Data Protection Act (DPDP) 2023 is India's data protection law that governs how organizations collect, store, and process personal data.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">Our Compliance</h2>
              <p className="text-gray-600">FSV Capital is committed to protecting your personal data in accordance with DPDP Act 2023 requirements.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">Data Collection</h2>
              <p className="text-gray-600">We collect only necessary startup and founder information for funding evaluation purposes with explicit consent.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">Data Usage</h2>
              <p className="text-gray-600">Your data is used only for:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Funding application evaluation</li>
                <li>Investment committee review</li>
                <li>Communication regarding your application</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">Data Retention</h2>
              <p className="text-gray-600">We retain application data for up to 3 years or as required by law. You may request deletion at any time.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-fsv-navy mb-2">Your Rights</h2>
              <p className="text-gray-600">Under DPDP, you have the right to:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Withdraw consent anytime</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">For DPDP-related queries, contact our Data Protection Officer at: <strong>dpo@fsvcapital.com</strong></p>
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

export default DpdpCompliance;