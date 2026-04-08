import React, { createContext, useContext, useState } from 'react';
import FormModal from '../components/forms/FormModal';
import AnalysisForm from '../components/forms/AnalysisForm';
import ServiceForm from '../components/forms/ServiceForm';

interface FormContextType {
  openAnalysisForm: () => void;
  openServiceForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const openAnalysisForm = () => setIsAnalysisOpen(true);
  const openServiceForm = () => setIsServiceOpen(true);

  return (
    <FormContext.Provider value={{ openAnalysisForm, openServiceForm }}>
      {children}
      
      <FormModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        title="Richiesta Analisi Gratuita"
      >
        <AnalysisForm onSuccess={() => setIsAnalysisOpen(false)} />
      </FormModal>

      <FormModal
        isOpen={isServiceOpen}
        onClose={() => setIsServiceOpen(false)}
        title="Parlami del tuo Progetto"
      >
        <ServiceForm onSuccess={() => setIsServiceOpen(false)} />
      </FormModal>
    </FormContext.Provider>
  );
};

export const useForms = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForms must be used within a FormProvider');
  }
  return context;
};
