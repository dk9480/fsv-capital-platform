import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-fsv-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-400">© 2025 FSV Capital. Fueling DeepTech, Fintech & Future Innovation</p>
          <div className="mt-4 space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-fsv-gold text-sm">
              Privacy Policy (DPDP Compliant)
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-fsv-gold text-sm">
              Terms of Service
            </Link>
            <Link to="/dpdp" className="text-gray-400 hover:text-fsv-gold text-sm">
              DPDP Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
