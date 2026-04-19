import React from 'react';

const Card = ({ children, title, className = '', padding = true }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${padding ? 'p-6' : ''} ${className}`}>
      {title && <h3 className="text-lg font-semibold text-fsv-navy mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;