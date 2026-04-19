import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Step1_BasicInfo from './Step1_BasicInfo';
import Step2_StartupOverview from './Step2_StartupOverview';
import Step3_ProductTech from './Step3_ProductTech';
import Step4_MarketOpportunity from './Step4_MarketOpportunity';
import Step5_TractionMetrics from './Step5_TractionMetrics';
import Step6_Financials from './Step6_Financials';
import Step7_FundingRequirement from './Step7_FundingRequirement';
import Step8_Team from './Step8_Team';
import Step9_StrategicFit from './Step9_StrategicFit';
import Step10_Documents from './Step10_Documents';
import Step11_Compliance from './';
import { saveDraft, loadDraft, clearDraft } from '../../services/localStorageService';
import api from '../../services/api';

const MultiStepForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    startupName: '', websiteUrl: '', founderNames: '', contactEmail: '',
    contactNumber: '', linkedinProfile: '', headquarters: '', yearIncorporated: '',
    problemStatement: '', solutionOverview: '', industry: '', businessModel: '', currentStage: '',
    coreProductDescription: '', techStack: '', usp: '', ipPatents: '', demoLink: '',
    tam: '', sam: '', som: '', customerSegment: '', keyCompetitors: '', competitiveAdvantage: '',
    currentRevenue: '', growthRate: '', customerCount: '', keyPartnerships: '', achievements: '',
    fundingRaised: '', existingInvestors: '', burnRate: '', runway: '', revenueProjections: '',
    amountRaising: '', fundingStage: '', equityOffered: '', useOfFunds: '',
    founderBackground: '', coreTeam: '', advisors: '',
    whyFsv: '', valueBeyondFunding: '', mentorshipInterest: '',
    pitchDeckUrl: '', financialModelUrl: '', screenshotsUrl: '', additionalDocsUrl: '',
    companyRegistered: false, legalIssues: '', consentGiven: false
  });

  useEffect(() => {
    const savedDraft = loadDraft();
    if (savedDraft) {
      if (window.confirm('You have a saved draft. Resume?')) {
        setFormData(savedDraft);
        if (savedDraft._currentStep) setCurrentStep(savedDraft._currentStep);
      }
    }
  }, []);

  const updateFormData = (newData) => {
    setFormData(prev => {
      const updated = { ...prev, ...newData };
      saveDraft(updated, currentStep);
      return updated;
    });
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;
    setUploading(true);
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    
    try {
      const response = await api.uploadFile(formDataFile, type);
      if (response.success) {
        const urlField = `${type}Url`;
        updateFormData({ [urlField]: response.fileUrl });
        alert(`${type} uploaded successfully!`);
      }
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const validateStep = () => {
    if (currentStep === 1 && (!formData.startupName || !formData.contactEmail)) return false;
    if (currentStep === 11 && !formData.consentGiven) return false;
    return true;
  };

  const nextStep = () => validateStep() && setCurrentStep(prev => Math.min(prev + 1, 11));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    const submitData = { ...formData };
    delete submitData._currentStep;
    const response = await api.submitApplication(submitData);
    if (response.success) {
      clearDraft();
      onSubmit(response);
    }
  };

  const renderStep = () => {
    const props = { formData, updateFormData, handleFileUpload, uploading };
    switch(currentStep) {
      case 1: return <Step1_BasicInfo {...props} />;
      case 2: return <Step2_StartupOverview {...props} />;
      case 3: return <Step3_ProductTech {...props} />;
      case 4: return <Step4_MarketOpportunity {...props} />;
      case 5: return <Step5_TractionMetrics {...props} />;
      case 6: return <Step6_Financials {...props} />;
      case 7: return <Step7_FundingRequirement {...props} />;
      case 8: return <Step8_Team {...props} />;
      case 9: return <Step9_StrategicFit {...props} />;
      case 10: return <Step10_Documents {...props} />;
      case 11: return <Step11_Compliance {...props} />;
      default: return null;
    }
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold text-fsv-navy">Startup Funding Application</h1>
      <ProgressBar currentStep={currentStep} totalSteps={11} />
      <div className="mt-8">{renderStep()}</div>
      <div className="flex justify-between mt-8 pt-6 border-t">
        <button onClick={prevStep} disabled={currentStep === 1} className="btn-secondary disabled:opacity-50">Previous</button>
        {currentStep < 11 ? (
          <button onClick={nextStep} className="btn-primary">Next</button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary bg-green-600">Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;