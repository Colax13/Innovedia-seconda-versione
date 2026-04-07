import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface AnalysisFormProps {
  onSuccess: () => void;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome_cognome: '',
    nome_attivita: '',
    settore: '',
    citta: '',
    ha_sito: '',
    attivo_social: '',
    url_sito: '',
    url_instagram: '',
    problema_principale: '',
    obiettivo_6_mesi: '',
    email: '',
    whatsapp: '',
    canale_contatto: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/leads/analisi', {
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
            className="space-y-6"
          >
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Informazioni Base</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input
                    id="nome_cognome"
                    type="text"
                    placeholder="Nome e Cognome"
                    required
                    value={formData.nome_cognome}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    id="nome_attivita"
                    type="text"
                    placeholder="Nome Attività"
                    required
                    value={formData.nome_attivita}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <select
                    id="settore"
                    required
                    value={formData.settore}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-[#0a0a0f]">Seleziona Settore</option>
                    <option value="ristorazione" className="bg-[#0a0a0f]">Ristorazione</option>
                    <option value="beauty" className="bg-[#0a0a0f]">Beauty</option>
                    <option value="moda" className="bg-[#0a0a0f]">Moda</option>
                    <option value="gioielleria" className="bg-[#0a0a0f]">Gioielleria</option>
                    <option value="arredamento" className="bg-[#0a0a0f]">Arredamento</option>
                    <option value="altro" className="bg-[#0a0a0f]">Altro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <input
                    id="citta"
                    type="text"
                    placeholder="Città"
                    required
                    value={formData.citta}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                  />
                </div>
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
            className="space-y-8"
          >
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Presenza Online</label>
              
              <div className="space-y-3">
                <p className="text-sm text-white/70">Hai già un sito web?</p>
                <div className="flex flex-wrap gap-3">
                  {['Sì', 'No', 'Sì ma è vecchio'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleRadioChange('ha_sito', opt)}
                      className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.ha_sito === opt 
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
                <p className="text-sm text-white/70">Sei attivo sui social?</p>
                <div className="flex flex-wrap gap-3">
                  {['Sì sempre', 'A volte', 'Quasi mai'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleRadioChange('attivo_social', opt)}
                      className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.attivo_social === opt 
                        ? 'bg-cyan-500 border-cyan-500 text-black' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <input
                  id="url_sito"
                  type="url"
                  placeholder="URL Sito (opzionale)"
                  value={formData.url_sito}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <input
                  id="url_instagram"
                  type="text"
                  placeholder="URL Instagram (opzionale)"
                  value={formData.url_instagram}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
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
            className="space-y-6"
          >
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Obiettivi e Problemi</label>
              
              <div className="space-y-2">
                <p className="text-sm text-white/70">Qual è il problema principale che riscontri oggi?</p>
                <textarea
                  id="problema_principale"
                  maxLength={300}
                  required
                  placeholder="Es: Non ricevo abbastanza contatti dal sito..."
                  value={formData.problema_principale}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all min-h-[120px] resize-none"
                />
                <p className="text-[10px] text-white/20 text-right">{formData.problema_principale.length}/300</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-white/70">Qual è il tuo obiettivo principale per i prossimi 6 mesi?</p>
                <select
                  id="obiettivo_6_mesi"
                  required
                  value={formData.obiettivo_6_mesi}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none"
                >
                  <option value="" disabled className="bg-[#0a0a0f]">Seleziona Obiettivo</option>
                  <option value="più clienti" className="bg-[#0a0a0f]">Più clienti</option>
                  <option value="più visibilità" className="bg-[#0a0a0f]">Più visibilità</option>
                  <option value="sembrare più professionale" className="bg-[#0a0a0f]">Sembrare più professionale</option>
                  <option value="vendere online" className="bg-[#0a0a0f]">Vendere online</option>
                  <option value="non lo so ancora" className="bg-[#0a0a0f]">Non lo so ancora</option>
                </select>
              </div>
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
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40">Contatti Finali</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  id="email"
                  type="email"
                  placeholder="La tua Email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <input
                  id="whatsapp"
                  type="text"
                  placeholder="WhatsApp (opzionale)"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm text-white/70">Come preferisci essere ricontattato?</p>
                <div className="flex flex-wrap gap-3">
                  {['email', 'WhatsApp', 'chiamata'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleRadioChange('canale_contatto', opt)}
                      className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.canale_contatto === opt 
                        ? 'bg-cyan-500 border-cyan-500 text-black' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {opt}
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
          <h4 className="font-display text-2xl font-bold uppercase tracking-tight text-white">Richiesta Inviata!</h4>
          <p className="text-white/50 font-sans">Riceverai una risposta entro 24 ore lavorative.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Bar */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map(s => (
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

        {step < 4 ? (
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

export default AnalysisForm;
