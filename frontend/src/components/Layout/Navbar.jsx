import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-fsv-navy">
              FSV <span className="text-fsv-gold">Capital</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-fsv-navy">Home</Link>
            <Link to="/apply" className="text-gray-700 hover:text-fsv-navy">Apply</Link>
            <button
              onClick={() => navigate('/admin/login')}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;