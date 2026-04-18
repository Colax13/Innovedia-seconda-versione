import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { getSupabase } from '../../lib/supabase';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface ServiceFormData {
  tipo_richiedente: string;
  servizi_richiesti: string[];
  descrizione_progetto: string;
  budget: string;
  nome: string;
  email: string;
  whatsapp: string;
  tempistiche: string;
}

const ServiceForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ServiceFormData>();

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await getSupabase()
        .from('leads_servizi')
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
            className="space-y-6"
          >
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Chi sei?</label>
              <div className="flex gap-4">
                {['Azienda', 'Libero Professionista'].map((opt) => (
                  <label key={opt} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      id="tipo_richiedente"
                      value={opt}
                      {...register('tipo_richiedente', { required: true })}
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Di cosa hai bisogno?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Sito Web', 'Social Media', 'Brand Identity', 
                  'SEO', 'Content Creation', 'Altro'
                ].map((servizio) => (
                  <label key={servizio} className="flex items-center gap-3 p-3 border border-white/10 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <input
                      type="checkbox"
                      id="servizi_richiesti"
                      value={servizio}
                      {...register('servizi_richiesti')}
                      className="w-4 h-4 rounded border-white/20 bg-transparent text-[#00E5FF] focus:ring-[#00E5FF]"
                    />
                    <span className="text-sm text-white/80">{servizio}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Descrizione del progetto</label>
              <textarea
                id="descrizione_progetto"
                {...register('descrizione_progetto', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all min-h-[100px]"
                placeholder="Raccontami brevemente la tua idea..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Budget stimato</label>
              <select
                id="budget"
                {...register('budget', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all appearance-none"
              >
                <option value="">Seleziona...</option>
                <option value="< 1000€">&lt; 1.000€</option>
                <option value="1000€ - 3000€">1.000€ - 3.000€</option>
                <option value="3000€ - 5000€">3.000€ - 5.000€</option>
                <option value="> 5000€">&gt; 5.000€</option>
              </select>
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
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nome</label>
              <input
                id="nome"
                {...register('nome', { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none transition-all"
                placeholder="Il tuo nome"
              />
            </div>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Tempistiche</label>
              <div className="flex flex-wrap gap-4">
                {['Il prima possibile', 'Entro 1 mese', 'Entro 3 mesi', 'Solo info'].map((opt) => (
                  <label key={opt} className="flex-1 min-w-[140px] cursor-pointer">
                    <input
                      type="radio"
                      id="tempistiche"
                      value={opt}
                      {...register('tempistiche', { required: true })}
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {[1, 2].map((i) => (
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

        {step < 2 ? (
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
                <span>Invia Progetto</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default ServiceForm;
