import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fsv-navy via-fsv-navy to-fsv-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              FSV Capital
              <span className="block text-fsv-gold text-2xl md:text-3xl mt-2">
                Fueling DeepTech, Fintech & Future Innovation
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We partner with visionary founders building the next generation of transformative companies.
            </p>
            <button
              onClick={() => navigate('/apply')}
              className="bg-fsv-gold text-fsv-navy px-8 py-3 rounded-lg font-semibold text-lg hover:bg-fsv-gold/90 transition-all transform hover:scale-105 shadow-lg"
            >
              🚀 Apply for Funding
            </button>
          </div>
        </div>
      </section>

      {/* Why Apply Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-fsv-navy mb-12">
            Why Apply to FSV Capital?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-fsv-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Deep Expertise</h3>
              <p className="text-gray-600">Specialized in DeepTech, AI, Blockchain, and Fintech investments</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-fsv-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Value Beyond Capital</h3>
              <p className="text-gray-600">Mentorship, network access, and strategic guidance</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-fsv-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Network</h3>
              <p className="text-gray-600">Connect with industry leaders and fellow founders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-fsv-navy mb-8">Trusted by Leading Innovators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-gray-400 text-xl font-semibold">DeepTech Fund</div>
            <div className="text-gray-400 text-xl font-semibold">AI Alliance</div>
            <div className="text-gray-400 text-xl font-semibold">Blockchain Hub</div>
            <div className="text-gray-400 text-xl font-semibold">Fintech Forum</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-fsv-navy to-fsv-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fuel Your Growth?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the most innovative startups that have partnered with FSV Capital.
          </p>
          <button
            onClick={() => navigate('/apply')}
            className="bg-fsv-gold text-fsv-navy px-8 py-3 rounded-lg font-semibold text-lg hover:bg-fsv-gold/90 transition-all"
          >
            Start Your Application
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;