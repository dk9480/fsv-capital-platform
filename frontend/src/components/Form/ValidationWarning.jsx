import React from 'react';

const ValidationWarning = ({ warnings, type = 'warning' }) => {
  if (!warnings || warnings.length === 0) return null;
  
  const styles = {
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    success: 'bg-green-50 border-green-400 text-green-800',
  };
  
  return (
    <div className={`mb-4 p-3 rounded-lg border-l-4 ${styles[type]}`}>
      {warnings.map((warning, index) => (
        <p key={index} className="text-sm">
          {warning}
        </p>
      ))}
    </div>
  );
};

export default ValidationWarning;