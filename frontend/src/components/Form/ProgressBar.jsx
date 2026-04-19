import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-fsv-navy h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(step => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
              ${step < currentStep ? 'bg-green-500 text-white' : ''}
              ${step === currentStep ? 'bg-fsv-navy text-white' : ''}
              ${step > currentStep ? 'bg-gray-200 text-gray-500' : ''}
            `}
          >
            {step < currentStep ? '✓' : step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;