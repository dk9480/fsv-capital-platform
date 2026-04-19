import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ProgressBar from '../components/Form/ProgressBar';
import DealScorePreview from '../components/Form/DealScorePreview';
import ValidationWarning from '../components/Form/ValidationWarning';
import Step1_BasicInfo from '../components/Form/Step1_BasicInfo';
import Step2_StartupOverview from '../components/Form/Step2_StartupOverview';
import Step3_ProductTech from '../components/Form/Step3_ProductTech';
import Step4_MarketOpportunity from '../components/Form/Step4_MarketOpportunity';
import Step5_TractionMetrics from '../components/Form/Step5_TractionMetrics';
import Step6_Financials from '../components/Form/Step6_Financials';
import Step7_FundingRequirement from '../components/Form/Step7_FundingRequirement';
import Step8_Team from '../components/Form/Step8_Team';
import Step9_StrategicFit from '../components/Form/Step9_StrategicFit';
import Step10_Documents from '../components/Form/Step10_Documents';
import Step11_Compliance from "../components/Form/Step11_Compliance";
import { saveDraft, loadDraft, clearDraft } from '../services/localStorageService';
import { 
  validateStageWithRevenue, 
  validateFundingRange, 
  validateGrowthRate, 
  validateSectorAlignment,
  formValidationRules 
} from '../utils/validation';
import api from '../services/api';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSaved, setLastSaved] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [stepErrors, setStepErrors] = useState({});
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
    companyRegistered: false, legalIssues: '', legalIssuesExplanation: '', consentGiven: false
  });

  useEffect(() => {
    const savedDraft = loadDraft();
    if (savedDraft) {
      if (window.confirm('You have a saved draft. Resume where you left off?')) {
        setFormData(savedDraft);
        if (savedDraft._currentStep) setCurrentStep(savedDraft._currentStep);
        if (savedDraft._savedAt) {
          setLastSaved(new Date(savedDraft._savedAt).toLocaleTimeString());
        }
      }
    }
  }, []);

  // Real-time validation when form data changes
  useEffect(() => {
    // Check stage vs revenue
    const revenueCheck = validateStageWithRevenue(formData.currentStage, formData.currentRevenue);
    
    // Check funding range vs stage
    const fundingCheck = validateFundingRange(formData.amountRaising, formData.fundingStage);
    
    // Check growth rate vs stage
    const growthCheck = validateGrowthRate(formData.currentStage, formData.growthRate);
    
    // Check sector alignment
    const sectorCheck = validateSectorAlignment(formData.industry);
    
    const newWarnings = [];
    if (!revenueCheck.valid) newWarnings.push(revenueCheck.message);
    if (!fundingCheck.valid) newWarnings.push(fundingCheck.message);
    if (!growthCheck.valid) newWarnings.push(growthCheck.message);
    if (!sectorCheck.valid) newWarnings.push(sectorCheck.message);
    
    setWarnings(newWarnings);
    
    // Validate current step fields
    if (currentStep === 1) {
      const errors = formValidationRules.step1(formData);
      setStepErrors(errors);
    } else if (currentStep === 2) {
      const errors = formValidationRules.step2(formData);
      setStepErrors(errors);
    }
  }, [formData, currentStep]);

  const updateFormData = (newData) => {
    setFormData(prev => {
      const updated = { ...prev, ...newData };
      return updated;
    });
  };

  const handleSaveDraft = () => {
    saveDraft(formData, currentStep);
    const now = new Date().toLocaleTimeString();
    setLastSaved(now);
    alert('💾 Draft saved successfully! You can resume later.');
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;
    
    setUploading(true);
    const formDataFile = new FormData();
    formDataFile.append('file', file);
    
    try {
      const response = await api.uploadFile(formDataFile, type);
      if (response.success) {
        const fieldMap = {
          pitchdeck: 'pitchDeckUrl',
          financial: 'financialModelUrl',
          screenshot: 'screenshotsUrl',
          document: 'additionalDocsUrl'
        };
        
        const fieldName = fieldMap[type];
        updateFormData({ [fieldName]: response.fileUrl });
        alert(`✅ ${type} uploaded successfully!`);
        
        // Auto-save after upload
        handleSaveDraft();
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const validateStep = () => {
    // Step 1 validation
    if (currentStep === 1) {
      const errors = formValidationRules.step1(formData);
      if (Object.keys(errors).length > 0) {
        alert(Object.values(errors)[0]);
        return false;
      }
    }
    
    // Step 2 validation
    if (currentStep === 2) {
      const errors = formValidationRules.step2(formData);
      if (Object.keys(errors).length > 0) {
        alert(Object.values(errors)[0]);
        return false;
      }
    }
    
    // Step 5 warnings (not blocking, just warning)
    if (currentStep === 5) {
      const { warnings: step5Warnings, hasWarnings } = formValidationRules.step5(formData);
      if (hasWarnings) {
        if (!window.confirm(`${step5Warnings.join('\n')}\n\nDo you want to continue anyway?`)) {
          return false;
        }
      }
    }
    
    // Step 7 warnings
    if (currentStep === 7) {
      const { warnings: step7Warnings, hasWarnings } = formValidationRules.step7(formData);
      if (hasWarnings) {
        if (!window.confirm(`${step7Warnings.join('\n')}\n\nDo you want to continue anyway?`)) {
          return false;
        }
      }
    }
    
    // Step 11 validation
    if (currentStep === 11) {
      if (!formData.consentGiven) {
        alert('You must agree to the data sharing consent');
        return false;
      }
      
      if (!formData.pitchDeckUrl || formData.pitchDeckUrl === '') {
        alert('Pitch Deck is mandatory. Please upload your pitch deck (PDF) in Step 10');
        return false;
      }
      
      if (formData.legalIssues === 'Yes' && (!formData.legalIssuesExplanation || formData.legalIssuesExplanation.trim() === '')) {
        alert('Please explain the legal issues');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 11));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    const submitData = { ...formData };
    delete submitData._currentStep;
    delete submitData.legalIssuesExplanation;
    
    try {
      const response = await api.submitApplication(submitData);
      if (response.success) {
        clearDraft();
        navigate('/success', { state: { dealScore: response.dealScore, startupName: formData.startupName } });
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const renderStep = () => {
    const props = { formData, updateFormData, handleFileUpload, uploading, stepErrors };
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="card">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-fsv-navy">Startup Funding Application</h1>
            {lastSaved && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                💾 Last saved: {lastSaved}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-6">Complete all sections to apply for funding from FSV Capital</p>
          
          <ProgressBar currentStep={currentStep} totalSteps={11} />
          
          {/* Real-time Deal Score Preview */}
          <DealScorePreview formData={formData} />
          
          {/* Warning Messages */}
          <ValidationWarning warnings={warnings} type="warning" />
          
          <div className="mt-8">
            {renderStep()}
          </div>
          
          <div className="flex justify-between mt-8 pt-6 border-t">
            <div className="flex gap-3">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={handleSaveDraft}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all font-medium"
              >
                💾 Save Draft
              </button>
            </div>
            
            {currentStep < 11 ? (
              <button onClick={nextStep} className="btn-primary">
                Next →
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary bg-green-600 hover:bg-green-700">
                ✓ Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationForm;