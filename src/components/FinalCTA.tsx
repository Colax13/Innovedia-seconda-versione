import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    buttonRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = `translate(0px, 0px)`;
  };

  const text = "Pronto a fare il salto?".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)]" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-sans text-cyan-400 text-sm font-bold uppercase tracking-[0.4em] block mb-8">
            IL TUO PROSSIMO PASSO
          </span>
          
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85] mb-10 flex flex-wrap justify-center gap-x-4">
            {text.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className={i >= 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" : ""}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Smetti di accontentarti di un sito mediocre. Iniziamo a costruire un'esperienza digitale che lascia il segno.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a
              ref={buttonRef}
              href="mailto:ludovico@innovedia.it"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-white text-black rounded-full overflow-hidden transition-transform duration-300 ease-out hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
            >
              <span className="relative z-10 font-display text-2xl uppercase tracking-wide mr-4 transition-colors duration-300 group-hover:text-white">
                Iniziamo Ora
              </span>
              <div className="relative z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                <ArrowRight className="w-6 h-6" />
              </div>
              {/* Hover Fill */}
              <div className="absolute inset-0 bg-cyan-500 transform scale-y-0 origin-bottom transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:scale-y-100 rounded-full" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm font-sans uppercase tracking-widest text-gray-500"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Disponibile per nuovi progetti
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
