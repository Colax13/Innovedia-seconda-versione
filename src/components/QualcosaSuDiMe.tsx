import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ScrollParagraph = ({ num, children }: { num: number, children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"] 
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div 
      ref={ref}
      style={{ x, opacity }}
      className="flex flex-col md:flex-row gap-6 md:gap-10 items-start"
    >
      <div 
        className="font-display text-[70px] md:text-[100px] font-black leading-none pt-2 select-none"
        style={{ 
          color: 'transparent',
          WebkitTextStroke: '2px rgba(0, 229, 255, 0.5)',
          textShadow: '0 0 40px rgba(0, 229, 255, 0.15)'
        }}
      >
        0{num}
      </div>
      <div className="font-sans text-[clamp(16px,1.2vw,18px)] font-light leading-relaxed text-white/70 flex-1 pt-4">
        {children}
      </div>
    </motion.div>
  );
};

export default function QualcosaSuDiMe() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Per l'entrata laterale delle immagini.
  const { scrollYProgress: photoEnterProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 50%"]
  });
  
  const photosX = useTransform(photoEnterProgress, [0, 1], [-200, 0]);
  const photosOpacity = useTransform(photoEnterProgress, [0, 1], [0, 1]);

  // Per l'entrata del titolo.
  const { scrollYProgress: titleEnterProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 40%"]
  });
  const titleX = useTransform(titleEnterProgress, [0, 1], [100, 0]);
  const titleOpacity = useTransform(titleEnterProgress, [0, 1], [0, 1]);

  // Per l'entrata dell'intera sezione
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "start 30%"]
  });
  const sectionOpacity = useTransform(sectionProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={sectionRef} 
      id="qualcosa-su-di-me" 
      className="relative pt-32 pb-24 md:pt-[30vh] md:pb-32 px-8 md:px-[clamp(2rem,8vw,10rem)] bg-transparent z-40 -mt-[10vh] lg:-mt-[15vh]"
    >
      <motion.div style={{ opacity: sectionOpacity }} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
        
        {/* IMAGES LEFT - STICKY */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-[calc(50vh-250px)] h-[400px] md:h-[500px] z-20 flex-shrink-0">
          <motion.div 
            style={{ x: photosX, opacity: photosOpacity }}
            className="w-full h-full relative"
          >
            {/* Secondary photo (Bottom Left) */}
            <div 
              className="absolute bottom-[0%] left-[0%] w-[55%] md:w-[60%] aspect-[4/5] z-10 -rotate-3 hover:z-40"
            >
               <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#1A1A1C] p-1.5 transition-transform duration-500 hover:rotate-0">
                   <div className="w-full h-full rounded-lg overflow-hidden relative">
                      <img 
                        src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1774028261/Senza_titolo-1_yamovm.png" 
                        alt="Ludovico" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                   </div>
               </div>
            </div>

            {/* Main photo (Top Center/Right) */}
            <div 
              className="absolute top-[0%] right-[0%] w-[65%] md:w-[70%] aspect-[3/4] z-30 rotate-2 hover:z-40"
            >
               <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#1A1A1C] p-2 transition-transform duration-500 hover:rotate-0">
                   <div className="w-full h-full rounded-lg overflow-hidden relative">
                      <img 
                        src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1779236620/io_che_parlo_rcrvap.png" 
                        alt="Ludovico Portrait" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                   </div>
               </div>
            </div>
          </motion.div>
        </div>


        {/* TEXT CONTENT RIGHT */}
        <div className="flex-1 w-full lg:w-[55%] z-20 flex flex-col gap-12 md:gap-16">
          
          <div className="mb-8 md:mb-6 overflow-hidden">
            <motion.div
              style={{ x: titleX, opacity: titleOpacity }}
            >
              <div className="flex items-center gap-6 mb-4">
                <span className="font-tech text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#00E5FF] whitespace-nowrap">
                  Mi hanno detto di stare online
                </span>
                <div
                  className="w-16 h-px"
                  style={{ background: '#00E5FF', opacity: 0.5 }}
                />
              </div>

              <h2 className="font-display text-[clamp(40px,5vw,60px)] font-bold uppercase tracking-tight leading-[1] text-white">
                Ma nessuno mi ha<br />
                <span className="text-[#00E5FF]">
                  detto come.
                </span>
              </h2>
            </motion.div>
          </div>

          <div className="space-y-16 md:space-y-24">
            
            <ScrollParagraph num={1}>
              <p>
                Lavoro da più di cinque anni nel marketing digitale, e per molto tempo la cosa più difficile non è stata capire come comunicare per gli altri.
              </p>
              <p className="mt-4 text-white font-semibold text-[clamp(18px,1.5vw,20px)] leading-tight">
                È stato capire come farlo per me.
              </p>
            </ScrollParagraph>

            <ScrollParagraph num={2}>
              <p>
                E questa per me è stata una <strong className="text-white font-semibold">lezione importante</strong>. Perché se ho fatto fatica io, che nel digitale ci vivo ogni giorno, immagina quanto può essere complicato per chi nel frattempo deve anche mandare avanti un’attività, seguire i clienti e trovare il tempo per capire come raccontarsi online nel modo giusto.
              </p>
            </ScrollParagraph>

            <ScrollParagraph num={3}>
              <p>
                Per anni ho visto imprenditori seguire il manuale alla lettera: fare il sito, pubblicare contenuti, cercare di essere presenti online. E più vedevo che provavano a fare tutto bene, più mi accorgevo che non bastava. 
              </p>
              <p className="mt-6 text-[#00E5FF] font-semibold text-[clamp(18px,1.5vw,22px)] leading-snug">
                Sotto mancava quasi sempre la cosa più importante: una direzione chiara.
              </p>
            </ScrollParagraph>

            <ScrollParagraph num={4}>
              <p>
                Oggi è proprio da lì che parte il mio lavoro: <strong className="text-white font-semibold">aiutare imprenditori e professionisti a costruire una comunicazione più chiara, più vera e più utile</strong>, che non serva solo a essere presenti online, ma a far capire meglio chi sono e perché dovrebbero essere scelti.
              </p>
            </ScrollParagraph>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
