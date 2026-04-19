export const calculateDealScore = (data) => {
  let score = 0;

  // 1. Sector fit (max 15)
  const highValueSectors = ['AI', 'Artificial Intelligence', 'Fintech', 'Blockchain', 'DeepTech'];
  if (highValueSectors.some(sector => data.industry?.toLowerCase().includes(sector.toLowerCase()))) {
    score += 15;
  } else if (data.industry === 'SaaS') {
    score += 10;
  } else {
    score += 5;
  }

  // 2. Revenue stage (max 20)
  const stageScores = {
    'Scaling': 20,
    'Growth Stage': 18,
    'Early Revenue': 12,
    'MVP': 6,
    'Idea': 3,
  };
  score += stageScores[data.currentStage] || 5;

  // 3. Growth rate (max 15)
  if (data.growthRate) {
    const growth = parseInt(data.growthRate);
    if (growth >= 50) score += 15;
    else if (growth >= 30) score += 12;
    else if (growth >= 20) score += 9;
    else if (growth >= 10) score += 6;
    else if (growth > 0) score += 3;
  }

  // 4. Team quality (max 15)
  if (data.founderBackground) {
    const founderText = data.founderBackground.toLowerCase();
    if (founderText.includes('iit') || founderText.includes('iim') || 
        founderText.includes('stanford') || founderText.includes('harvard') ||
        founderText.includes('mit') || founderText.includes('ex-') ||
        founderText.includes('previous startup') ||
        founderText.includes('phd') || founderText.includes('mba')) {
      score += 15;
    } else if (founderText.length > 50) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // 5. Market size - TAM (max 10)
  if (data.tam) {
    const tamText = data.tam.toLowerCase();
    if (tamText.includes('billion') || tamText.includes('bn') || tamText.includes('b')) {
      score += 10;
    } else if (tamText.includes('million') || tamText.includes('m')) {
      score += 7;
    } else if (tamText.includes('crore')) {
      score += 5;
    } else if (tamText.includes('lakh') || tamText.includes('thousand')) {
      score += 3;
    } else {
      score += 2;
    }
  }

  // 6. Innovation - IP/Patents or strong USP (max 10)
  if (data.ipPatents && data.ipPatents !== 'None' && data.ipPatents !== 'N/A' && data.ipPatents !== '') {
    score += 10;
  } else if (data.usp && data.usp.length > 30) {
    score += 7;
  } else if (data.usp && data.usp.length > 10) {
    score += 4;
  } else {
    score += 2;
  }

  // 7. Pitch deck uploaded (max 5)
  if (data.pitchDeckUrl && data.pitchDeckUrl !== '') {
    score += 5;
  }

  // 8. Customer traction (max 5)
  if (data.customerCount) {
    const customers = parseInt(data.customerCount);
    if (customers >= 1000) score += 5;
    else if (customers >= 100) score += 3;
    else if (customers >= 10) score += 1;
  }

  // 9. Revenue traction (max 5)
  if (data.currentRevenue) {
    const revenueText = data.currentRevenue.toLowerCase();
    if (revenueText.includes('m') || revenueText.includes('million') || revenueText.includes('cr')) {
      score += 5;
    } else if (revenueText.includes('k') || revenueText.includes('thousand') || revenueText.includes('lakh')) {
      score += 3;
    } else if (parseInt(data.currentRevenue) > 0) {
      score += 1;
    }
  }

  // 10. Completeness of application (max 10)
  let completenessCount = 0;
  const requiredFields = [
    'problemStatement', 'solutionOverview', 'usp', 'competitiveAdvantage',
    'customerSegment', 'useOfFunds', 'whyFsv', 'founderBackground'
  ];
  requiredFields.forEach(field => {
    if (data[field] && data[field].length > 10) completenessCount++;
  });
  score += Math.floor((completenessCount / requiredFields.length) * 10);

  // Ensure score is between 0 and 100
  return Math.min(100, Math.max(0, score));
};

export const getDealScoreLabel = (score) => {
  if (score >= 80) {
    return { 
      label: 'Excellent', 
      color: 'text-green-600', 
      bg: 'bg-green-100',
      border: 'border-green-200',
      icon: '🏆',
      message: 'Top-tier startup! Strong chance of funding.'
    };
  }
  if (score >= 70) {
    return { 
      label: 'Strong', 
      color: 'text-green-500', 
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '⭐',
      message: 'Very promising application. High priority review.'
    };
  }
  if (score >= 60) {
    return { 
      label: 'Good', 
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      border: 'border-blue-200',
      icon: '👍',
      message: 'Solid application. Under standard review.'
    };
  }
  if (score >= 50) {
    return { 
      label: 'Average', 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
      icon: '📊',
      message: 'Needs improvement in key areas.'
    };
  }
  return { 
    label: 'Needs Improvement', 
    color: 'text-red-600', 
    bg: 'bg-red-100',
    border: 'border-red-200',
    icon: '⚠️',
    message: 'Please review and complete all sections.'
  };
};

export const getScoreBreakdown = (data) => {
  const breakdown = [];

  // Sector fit
  const highValueSectors = ['AI', 'Artificial Intelligence', 'Fintech', 'Blockchain', 'DeepTech'];
  if (highValueSectors.some(sector => data.industry?.toLowerCase().includes(sector.toLowerCase()))) {
    breakdown.push({ category: 'Sector Fit', score: 15, max: 15, status: 'excellent' });
  } else if (data.industry === 'SaaS') {
    breakdown.push({ category: 'Sector Fit', score: 10, max: 15, status: 'good' });
  } else {
    breakdown.push({ category: 'Sector Fit', score: 5, max: 15, status: 'needs_improvement' });
  }

  // Revenue stage
  const stageScores = { 'Scaling': 20, 'Growth Stage': 18, 'Early Revenue': 12, 'MVP': 6, 'Idea': 3 };
  const stageScore = stageScores[data.currentStage] || 5;
  let stageStatus = 'needs_improvement';
  if (stageScore >= 18) stageStatus = 'excellent';
  else if (stageScore >= 12) stageStatus = 'good';
  breakdown.push({ category: 'Revenue Stage', score: stageScore, max: 20, status: stageStatus });

  // Team quality
  let teamScore = 5;
  let teamStatus = 'needs_improvement';
  if (data.founderBackground) {
    const founderText = data.founderBackground.toLowerCase();
    if (founderText.includes('iit') || founderText.includes('iim') || 
        founderText.includes('stanford') || founderText.includes('harvard') ||
        founderText.includes('mit') || founderText.includes('ex-') ||
        founderText.includes('previous startup')) {
      teamScore = 15;
      teamStatus = 'excellent';
    } else if (founderText.length > 50) {
      teamScore = 10;
      teamStatus = 'good';
    }
  }
  breakdown.push({ category: 'Team Quality', score: teamScore, max: 15, status: teamStatus });

  // Market size
  let marketScore = 0;
  let marketStatus = 'needs_improvement';
  if (data.tam) {
    const tamText = data.tam.toLowerCase();
    if (tamText.includes('billion') || tamText.includes('bn')) {
      marketScore = 10;
      marketStatus = 'excellent';
    } else if (tamText.includes('million') || tamText.includes('m')) {
      marketScore = 7;
      marketStatus = 'good';
    } else {
      marketScore = 3;
    }
  }
  breakdown.push({ category: 'Market Size', score: marketScore, max: 10, status: marketStatus });

  // Innovation
  let innovationScore = 2;
  let innovationStatus = 'needs_improvement';
  if (data.ipPatents && data.ipPatents !== 'None' && data.ipPatents !== 'N/A') {
    innovationScore = 10;
    innovationStatus = 'excellent';
  } else if (data.usp && data.usp.length > 30) {
    innovationScore = 7;
    innovationStatus = 'good';
  } else if (data.usp && data.usp.length > 10) {
    innovationScore = 4;
  }
  breakdown.push({ category: 'Innovation', score: innovationScore, max: 10, status: innovationStatus });

  return breakdown;
};

export default calculateDealScore;