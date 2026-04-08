import React from 'react';
import { motion } from 'motion/react';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] text-white py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
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
          
          <span className="font-sans text-[#06b6d4] text-[10px] font-bold uppercase tracking-[0.4em] block mb-12">
            PROSSIMO PASSO
          </span>
          
          <h2 className="font-display text-[clamp(40px,8vw,100px)] font-extrabold uppercase tracking-tighter leading-[0.9] mb-10 max-w-4xl">
            SCOPRI COSA <br />
            MANCA AL <span className="text-[#06b6d4]">TUO BRAND</span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Un'analisi gratuita della tua presenza online. Nessun impegno, nessuna vendita forzata — solo un quadro chiaro di dove sei e dove puoi arrivare.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-[#06b6d4] text-black font-display font-bold text-sm uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 text-center"
            >
              RICHIEDI L'ANALISI GRATUITA
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-transparent border border-white/10 text-white font-display font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 text-center"
            >
              PARLAMI DEL TUO PROGETTO
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center justify-center gap-4 text-[10px] font-sans uppercase tracking-[0.2em] text-white/20"
          >
            <span>Risposta entro 24h</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>Nessun contratto</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>Zero rischi</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
