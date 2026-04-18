import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { getSupabase } from '../../lib/supabase';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface AnalysisFormData {
  nome_cognome: string;
  nome_attivita: string;
  settore: string;
  citta: string;
  ha_sito: string;
  attivo_social: string;
  url_sito: string;
  url_instagram: string;
  problema_principale: string;
  obiettivo_6_mesi: string;
  email: string;
  whatsapp: string;
  canale_contatto: string;
}

const AnalysisForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AnalysisFormData>();

  const onSubmit = async (data: AnalysisFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await getSupabase()
        .from('leads_analisi')
        .insert([data]);

      if (error) throw error;
      
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nome e Cognome</label>
              <input
                id="nome_cognome"
                {...register('nome_cognome', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                placeholder="Mario Rossi"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nome Attività</label>
              <input
                id="nome_attivita"
                {...register('nome_attivita', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                placeholder="La tua azienda"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Settore</label>
                <select
                  id="settore"
                  {...register('settore', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all appearance-none"
                >
                  <option value="">Seleziona...</option>
                  <option value="ristorazione">Ristorazione</option>
                  <option value="beauty">Beauty & Wellness</option>
                  <option value="servizi">Servizi Professionali</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Città</label>
                <input
                  id="citta"
                  {...register('citta', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                  placeholder="Frosinone"
                />
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Hai già un sito web?</label>
              <div className="flex gap-4">
                {['Sì', 'No'].map((opt) => (
                  <label key={opt} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      id="ha_sito"
                      value={opt}
                      {...register('ha_sito', { required: true })}
                      className="hidden peer"
                    />
                    <div className="p-4 text-center border border-white/10 rounded-lg bg-white/5 peer-checked:border-[#00E5FF] peer-checked:bg-[#00E5FF]/10 transition-all">
                      <span className="text-sm font-medium text-white">{opt}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Sei attivo sui social?</label>
              <div className="flex gap-4">
                {['Sì', 'No'].map((opt) => (
                  <label key={opt} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      id="attivo_social"
                      value={opt}
                      {...register('attivo_social', { required: true })}
                      className="hidden peer"
                    />
                    <div className="p-4 text-center border border-white/10 rounded-lg bg-white/5 peer-checked:border-[#00E5FF] peer-checked:bg-[#00E5FF]/10 transition-all">
                      <span className="text-sm font-medium text-white">{opt}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">URL Sito (se presente)</label>
                <input
                  id="url_sito"
                  {...register('url_sito')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">URL Instagram (se presente)</label>
                <input
                  id="url_instagram"
                  {...register('url_instagram')}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                  placeholder="@tuoaccount"
                />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Qual è il tuo problema principale?</label>
              <textarea
                id="problema_principale"
                {...register('problema_principale', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all min-h-[120px]"
                placeholder="Es: Non ricevo abbastanza contatti dal sito..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Obiettivo tra 6 mesi</label>
              <select
                id="obiettivo_6_mesi"
                {...register('obiettivo_6_mesi', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all appearance-none"
              >
                <option value="">Seleziona...</option>
                <option value="aumento_vendite">Aumentare le vendite</option>
                <option value="brand_awareness">Migliorare la visibilità del brand</option>
                <option value="nuovi_clienti">Acquisire nuovi clienti</option>
                <option value="fidelizzazione">Fidelizzare i clienti attuali</option>
              </select>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                placeholder="email@esempio.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">WhatsApp (opzionale)</label>
              <input
                id="whatsapp"
                {...register('whatsapp')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                placeholder="+39 333 1234567"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Come preferisci essere contattato?</label>
              <div className="flex gap-4">
                {['Email', 'WhatsApp'].map((opt) => (
                  <label key={opt} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      id="canale_contatto"
                      value={opt}
                      {...register('canale_contatto', { required: true })}
                      className="hidden peer"
                    />
                    <div className="p-4 text-center border border-white/10 rounded-lg bg-white/5 peer-checked:border-[#00E5FF] peer-checked:bg-[#00E5FF]/10 transition-all">
                      <span className="text-sm font-medium text-white">{opt}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? 'bg-[#00E5FF]' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="flex justify-between pt-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-3 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Indietro</span>
          </button>
        ) : <div />}

        {step < 4 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 bg-[#00E5FF] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0, 229, 255, 0.4)] transition-all"
          >
            <span>Avanti</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-[#00E5FF] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0, 229, 255, 0.45)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Invio in corso...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Invia Richiesta</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default AnalysisForm;
