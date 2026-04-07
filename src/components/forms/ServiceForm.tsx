import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface ServiceFormProps {
  onSuccess: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    tipo_richiedente: '',
    servizi_richiesti: [] as string[],
    descrizione_progetto: '',
    budget: '',
    nome: '',
    email: '',
    whatsapp: '',
    tempistiche: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const current = [...prev.servizi_richiesti];
      if (current.includes(value)) {
        return { ...prev, servizi_richiesti: current.filter(v => v !== value) };
      } else {
        return { ...prev, servizi_richiesti: [...current, value] };
      }
    });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 2));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/leads/servizi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Errore durante l\'invio');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore imprevisto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Dettagli Progetto</label>
              
              <div className="space-y-3">
                <p className="text-sm text-white/70">Chi sei?</p>
                <div className="flex flex-wrap gap-3">
                  {['un privato', 'un\'agenzia', 'un freelancer', 'un\'azienda'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleRadioChange('tipo_richiedente', opt)}
                      className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.tipo_richiedente === opt 
                        ? 'bg-cyan-500 border-cyan-500 text-black' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-white/70">Quali servizi ti interessano?</p>
                <div className="flex flex-wrap gap-3">
                  {['sito web', 'brand identity', 'contenuti social', 'video', 'automazioni', 'collaborazione continuativa', 'altro'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleCheckboxChange(opt)}
                      className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.servizi_richiesti.includes(opt)
                        ? 'bg-white/10 border-cyan-500 text-cyan-500' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-white/70">Descrivi brevemente il progetto</p>
                <textarea
                  id="descrizione_progetto"
                  maxLength={500}
                  required
                  placeholder="Es: Vorrei rifare il sito per la mia attività..."
                  value={formData.descrizione_progetto}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all min-h-[120px] resize-none"
                />
                <p className="text-[10px] text-white/20 text-right">{formData.descrizione_progetto.length}/500</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-white/70">Budget indicativo</p>
                <select
                  id="budget"
                  required
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                >
                  <option value="" disabled className="bg-[#0a0a0f]">Seleziona Budget</option>
                  <option value="sotto €500" className="bg-[#0a0a0f]">Sotto €500</option>
                  <option value="€500-1.500" className="bg-[#0a0a0f]">€500 - 1.500</option>
                  <option value="€1.500-5.000" className="bg-[#0a0a0f]">€1.500 - 5.000</option>
                  <option value="oltre €5.000" className="bg-[#0a0a0f]">Oltre €5.000</option>
                  <option value="da definire insieme" className="bg-[#0a0a0f]">Da definire insieme</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">I tuoi Contatti</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  id="nome"
                  type="text"
                  placeholder="Il tuo Nome"
                  required
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="La tua Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>

              <input
                id="whatsapp"
                type="text"
                placeholder="WhatsApp (opzionale)"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
              />

              <div className="space-y-3">
                <p className="text-sm text-white/70">Tempistiche desiderate</p>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'urgente - entro 2 settimane', label: 'Urgente (entro 2 settimane)' },
                    { id: 'normale - entro un mese', label: 'Normale (entro un mese)' },
                    { id: 'non ho fretta - sto solo esplorando', label: 'Non ho fretta (sto esplorando)' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleRadioChange('tempistiche', opt.id)}
                      className={`px-6 py-4 rounded-xl border text-left text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.tempistiche === opt.id 
                        ? 'bg-cyan-500 border-cyan-500 text-black' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-500"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <div className="space-y-2">
          <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-white">Richiesta Ricevuta!</h4>
          <p className="text-white/50 font-sans">Ti rispondo entro 48 ore.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {[1, 2].map(s => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              s <= step ? 'bg-cyan-500' : 'bg-white/5'
            }`}
          />
        ))}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-white/5">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1 || isSubmitting}
          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Indietro
        </button>

        {step < 2 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
          >
            Continua <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-10 py-4 bg-cyan-500 text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>Invio in corso... <Loader2 className="w-4 h-4 animate-spin" /></>
            ) : (
              <>Invia Richiesta <CheckCircle2 className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default ServiceForm;
