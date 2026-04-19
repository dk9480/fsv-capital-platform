import React from 'react';
import { calculateDealScore, getDealScoreLabel } from '../../utils/dealScore';

const DealScorePreview = ({ formData }) => {
  const score = calculateDealScore(formData);
  const { label, color, bg } = getDealScoreLabel(score);
  
  // Only show if at least some data is filled
  const hasData = formData.startupName || formData.industry || formData.currentStage;
  if (!hasData) return null;
  
  return (
    <div className={`mb-6 p-4 rounded-lg ${bg} border`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-700">Real-time Deal Score</p>
          <p className={`text-3xl font-bold ${color}`}>{score}/100</p>
          <p className={`text-sm font-medium ${color}`}>{label}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Based on:</p>
          <ul className="text-xs text-gray-600 mt-1">
            <li>✓ Sector fit</li>
            <li>✓ Revenue stage</li>
            <li>✓ Team quality</li>
            <li>✓ Market size</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DealScorePreview;