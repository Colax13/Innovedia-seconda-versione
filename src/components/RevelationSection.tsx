import { motion } from 'motion/react';
import { useRef } from 'react';
import { FlipButton } from './CaseStudySection';

export default function RevelationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="revelation" className="relative pt-24 md:pt-40 pb-32 md:pb-60 overflow-hidden bg-transparent">
      <div ref={containerRef} className="container mx-auto px-6 md:px-[6%] lg:px-[10%]">
        
        {/* Mobile Header: Eyebrow + Title */}
        <div className="md:hidden mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-tech font-bold uppercase tracking-[0.3em] text-[#00E5FF] block mb-5"
          >
            Ti hanno detto di stare online.
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-4xl leading-[0.95] text-white uppercase"
          >
            Ma nessuno ti ha detto <br /> <span className="text-[#00E5FF]">come dovresti farlo.</span>
          </motion.h2>
        </div>

        {/* Main Content Row: Image Sticky + Text Scrolling */}
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 lg:gap-32">
          
          {/* Image Container: Sticky on Desktop */}
          <div className="w-full md:w-[45%] lg:w-[42%] md:sticky md:top-1/2 md:-translate-y-1/2 h-fit mb-24 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative group max-w-[85%] mx-auto md:max-w-none"
            >
              {/* Image Styling */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#08080C]">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1779236620/io_che_parlo_rcrvap.png" 
                  alt="Ludovico Colasanti"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-all duration-700"
                />
                
                {/* Visual Anchors */}
                <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-[#00E5FF]/30" />
                <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-[#00E5FF]/30" />
              </div>
              
              {/* Ambient Glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
            </motion.div>
          </div>

          <div className="w-full md:w-[55%] lg:w-[58%]">
            {/* Desktop Header */}
            <div className="hidden md:block mb-24">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[11px] font-tech font-bold uppercase tracking-[0.4em] text-[#00E5FF] block mb-8"
              >
                Ti hanno detto di stare online.
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="font-display font-black text-5xl lg:text-6xl leading-[0.85] text-white uppercase tracking-tighter"
              >
                Ma nessuno ti ha detto <br /> 
                <span className="text-[#00E5FF] inline-block mt-2">come dovresti farlo.</span>
              </motion.h2>
            </div>

            {/* Paragraphs with Restored Flow */}
            <div className="space-y-12 font-sans text-white/50 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed max-w-xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1 }}
              >
                Il tuo problema non è che non pubblichi abbastanza; è che <span className="text-white font-bold">online non si capisce perché dovrebbero scegliere te.</span>
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                Questa è la cosa che ho imparato negli ultimi 3 anni di lavoro nel digital marketing: in un mercato pieno di voci, <span className="text-white font-bold">se non chiarisci chi sei davvero, il tuo valore si perde nella concorrenza.</span>
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Per questo il mio lavoro è dare forma a una presenza digitale che mostri chi sei veramente attraverso <span className="text-white font-bold">l'identità, i contenuti e i sistemi automatizzati.</span>
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="text-white font-black uppercase tracking-tight">
                  L'obiettivo non è stare online, ma rendere chiaro il motivo per cui una persona dovrebbe fidarsi di te e sceglierti.
                </span>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
