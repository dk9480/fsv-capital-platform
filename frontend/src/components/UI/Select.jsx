import React from 'react';

const Select = ({ label, name, value, onChange, options, required, placeholder, error, className = '' }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fsv-navy focus:border-fsv-navy outline-none transition-all ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;