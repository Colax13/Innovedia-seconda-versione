import React from 'react';
import { motion } from 'motion/react';
import { useForms } from '../context/FormContext';

const FinalCTA: React.FC = () => {
  const { openAnalysisForm, openServiceForm } = useForms();

  return (
    <section id="contatti" className="relative min-h-screen flex items-center justify-center overflow-hidden text-white py-32 z-20">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-px bg-cyan-500/30 mb-8" />
          
          <span className="font-sans text-[#00E5FF] text-[10px] font-bold uppercase tracking-[0.4em] block mb-12">
            IL PROSSIMO PASSO
          </span>
          
          <h2 className="font-display text-[clamp(40px,8vw,100px)] font-extrabold uppercase tracking-tighter leading-[0.9] mb-10 max-w-4xl">
            SCOPRI COSA TI RENDE <br />
            <span className="text-[#00E5FF]">DAVVERO DIVERSO.</span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Una conversazione sulla tua attività. Capisci dove sei, dove puoi arrivare e cosa serve per arrivarci.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openServiceForm}
              className="px-10 py-5 bg-[#00E5FF] text-black font-display font-bold text-sm uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(0, 229, 255, 0.45)] transition-all duration-300 text-center"
            >
              PARLIAMI DEL TUO PROGETTO
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={openAnalysisForm}
              className="px-10 py-5 bg-transparent border border-white/10 text-white font-display font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 text-center"
            >
              RICHIEDI UNA COLLABORAZIONE
            </motion.button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
