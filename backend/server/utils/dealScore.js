const calculateDealScore = (data) => {
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

module.exports = { calculateDealScore };
