const DRAFT_KEY = 'fsv_capital_draft';

export const saveDraft = (formData, currentStep) => {
  const draft = {
    ...formData,
    _currentStep: currentStep,
    _savedAt: new Date().toISOString()
  };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
};

export const loadDraft = () => {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    return JSON.parse(draft);
  }
  return null;
};

export const clearDraft = () => {
  localStorage.removeItem(DRAFT_KEY);
};

export const hasDraft = () => {
  return localStorage.getItem(DRAFT_KEY) !== null;
};