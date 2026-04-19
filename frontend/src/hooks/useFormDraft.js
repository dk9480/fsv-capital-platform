import { useState, useEffect } from 'react';
import { saveDraft, loadDraft, clearDraft, hasDraft } from '../services/localStorageService';

const useFormDraft = (initialData, draftKey = 'fsv_form_draft') => {
  const [formData, setFormData] = useState(initialData);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);

  useEffect(() => {
    const draft = loadDraft(draftKey);
    if (draft) {
      setHasSavedDraft(true);
      setFormData(draft);
    }
  }, [draftKey]);

  const updateFormData = (newData, currentStep) => {
    setFormData(prev => {
      const updated = { ...prev, ...newData };
      saveDraft(updated, currentStep, draftKey);
      return updated;
    });
  };

  const resumeDraft = () => {
    const draft = loadDraft(draftKey);
    if (draft) {
      setFormData(draft);
      setHasSavedDraft(false);
      return draft._currentStep || 1;
    }
    return 1;
  };

  const discardDraft = () => {
    clearDraft(draftKey);
    setHasSavedDraft(false);
    setFormData(initialData);
  };

  return {
    formData,
    updateFormData,
    hasSavedDraft,
    resumeDraft,
    discardDraft,
    setFormData,
  };
};

export default useFormDraft;
