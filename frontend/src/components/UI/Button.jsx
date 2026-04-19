import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled, type = 'button', className = '' }) => {
  const variants = {
    primary: 'bg-fsv-navy text-white hover:bg-fsv-navy/90',
    secondary: 'border border-fsv-navy text-fsv-navy hover:bg-fsv-navy/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;