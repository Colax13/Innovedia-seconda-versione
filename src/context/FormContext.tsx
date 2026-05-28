import React, { createContext, useContext, useState } from 'react';

const FormModal = React.lazy(() => import('../components/forms/FormModal'));
const AnalysisForm = React.lazy(() => import('../components/forms/AnalysisForm'));
const ServiceForm = React.lazy(() => import('../components/forms/ServiceForm'));

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
      
      {isAnalysisOpen && (
        <React.Suspense fallback={null}>
          <FormModal
            isOpen={isAnalysisOpen}
            onClose={() => setIsAnalysisOpen(false)}
            title="Richiedi una Collaborazione"
          >
            <ServiceForm onSuccess={() => setIsAnalysisOpen(false)} />
          </FormModal>
        </React.Suspense>
      )}

      {isServiceOpen && (
        <React.Suspense fallback={null}>
          <FormModal
            isOpen={isServiceOpen}
            onClose={() => setIsServiceOpen(false)}
            title="Parlami del tuo Progetto"
          >
            <AnalysisForm onSuccess={() => setIsServiceOpen(false)} />
          </FormModal>
        </React.Suspense>
      )}
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
