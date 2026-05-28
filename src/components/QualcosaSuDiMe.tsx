import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

export default function QualcosaSuDiMe() {
  const ImagesBlock = () => (
    <div className="w-full h-full relative">
      {/* Secondary photo */}
      <div className="absolute bottom-[0%] lg:bottom-[0%] left-[0%] w-[55%] md:w-[60%] aspect-[4/5] z-10 -rotate-3 hover:z-40">
         <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#1A1A1C] p-1.5 transition-transform duration-500 hover:rotate-0">
             <div className="w-full h-full rounded-lg overflow-hidden relative">
                <OptimizedImage 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1774028261/Senza_titolo-1_yamovm.png" 
                  alt="Ludovico" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
             </div>
         </div>
      </div>
      {/* Main photo */}
      <div className="absolute top-[0%] lg:top-[0%] right-[0%] w-[65%] md:w-[70%] aspect-[3/4] z-30 rotate-2 hover:z-40">
         <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#1A1A1C] p-2 transition-transform duration-500 hover:rotate-0">
             <div className="w-full h-full rounded-lg overflow-hidden relative">
                <OptimizedImage 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1779236620/io_che_parlo_rcrvap.png" 
                  alt="Ludovico Portrait" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
             </div>
         </div>
      </div>
    </div>
  );

  const StepNumber = ({ num }: { num: number }) => (
    <div 
      className="font-display text-[80px] md:text-[120px] font-black leading-none pt-2 select-none flex-shrink-0"
      style={{ 
        color: 'transparent',
        WebkitTextStroke: '2px rgba(0, 229, 255, 0.5)',
        textShadow: '0 0 40px rgba(0, 229, 255, 0.15)'
      }}
    >
      0{num}
    </div>
  );

  return (
    <div id="chi-sono">
      {/* =========================================
          DESKTOP VIEW (Standard flow with sticky images)
          ========================================= */}
      <section 
        id="qualcosa-su-di-me-desktop" 
        className="hidden lg:block relative w-full z-40 bg-[#050B14] -mt-[100vh] border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] pb-32"
      >
        <div className="max-w-7xl mx-auto flex relative px-8">
          
          {/* IMAGES LEFT - STICKY */}
          <div className="w-1/2 relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center pr-8 lg:pr-16">
              <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="w-full h-[500px]"
              >
                <ImagesBlock />
              </motion.div>
            </div>
          </div>

          {/* TEXT CONTENT RIGHT - NORMAL SCROLLING FLOW */}
          <div className="w-1/2 relative z-30 pt-[30vh] pb-[30vh] flex flex-col gap-40 pl-8 lg:pl-16">
            
            {/* Layer 0 / Title */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-6 mb-4">
                <span className="font-tech text-sm font-semibold tracking-[0.2em] uppercase text-white/50 whitespace-nowrap">
                  NON DEVI FIDARTI DI ME.
                </span>
                <div className="flex-1 max-w-[6rem] h-px bg-[#00E5FF]/50" />
              </div>
              <h2 className="font-display text-[60px] font-bold uppercase tracking-tight leading-[1.1] text-white">
                FIDATI DELLA MIA<br />
                <span className="text-[#00E5FF]">ESPERIENZA.</span>
              </h2>
            </motion.div>

            {/* Layer 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 md:flex-row items-start"
            >
              <StepNumber num={1} />
              <div className="flex-1 pt-6">
                <h3 className="text-white font-bold text-[28px] mb-6 uppercase leading-tight tracking-wide">
                  CINQUE ANNI IN AGENZIA.<br />
                  <span className="text-[#00E5FF]">UNA SOLA CERTEZZA.</span>
                </h3>
                <div className="font-sans text-[18px] font-light leading-relaxed text-white/70 space-y-4">
                  <p>
                    Ho lavorato 5 anni nel marketing, in agenzia e a fianco di grandi aziende.
                  </p>
                  <p>
                    Da quell'esperienza ero convinto di una cosa: se trovi la chiave di comunicazione giusta, i risultati arrivano.
                  </p>
                  <p>
                    Così mi sono messo in proprio per dimostrarlo.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Layer 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 md:flex-row items-start"
            >
              <StepNumber num={2} />
              <div className="flex-1 pt-6">
                <h3 className="text-white font-bold text-[28px] mb-6 uppercase leading-tight tracking-wide">
                  COL MIO PRIMO CLIENTE,<br />
                  <span className="text-[#00E5FF]">L'HO DIMOSTRATO.</span>
                </h3>
                <div className="font-sans text-[18px] font-light leading-relaxed text-white/70 space-y-4">
                  <p>
                    Quando mi ha chiamato RD Salon mi ha chiesto una cosa sola: clienti nuovi.
                  </p>
                  <p>
                    Abbiamo costruito insieme una strategia social e, dopo i primi risultati, abbiamo finanziato il sito web.
                  </p>
                  <p>
                    In 6 mesi abbiamo raggiunto 415 clienti.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Layer 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 md:flex-row items-start"
            >
              <StepNumber num={3} />
              <div className="flex-1 pt-6">
                <h3 className="text-white font-bold text-[28px] mb-6 uppercase leading-tight tracking-wide text-[#00E5FF]">
                  MA NIENTE FUNZIONA PER SEMPRE.
                </h3>
                <div className="font-sans text-[18px] font-light leading-relaxed text-white/70 space-y-4">
                  <p>
                    I clienti arrivavano. Ma non eravamo pronti a gestirli.
                  </p>
                  <p>
                    Non sapevamo chi tornava e chi spariva, non c'era modo di ricontattarli e il salone era diventato un caos.
                  </p>
                  <p>
                    Ed è da lì che ho capito cosa manca davvero a un imprenditore.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Layer 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 md:flex-row items-start"
            >
              <StepNumber num={4} />
              <div className="flex-1 pt-6">
                <h3 className="text-white font-bold text-[36px] uppercase leading-tight tracking-wide">
                  COSÌ HO COSTRUITO<br />
                  <span className="text-[#00E5FF]">IL SISTEMA.</span>
                </h3>
                <div className="font-sans text-[18px] font-light leading-relaxed text-white/70 space-y-4 mt-6">
                  <p>
                    Ho rimesso tutto in discussione.
                  </p>
                  <p>
                    Ho costruito un approccio che non si ferma alla comunicazione: parte dalla strategia, costruisce il sistema digitale e automatizza quello che viene dopo.
                  </p>
                  <p>
                    Oggi lo applico a ogni progetto che seguo.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          MOBILE VIEW (Layered / Overlapping)
          ========================================= */}
      <section 
        id="qualcosa-su-di-me" 
        className="block lg:hidden relative w-full z-20 -mt-[100vh]"
      >
        {/* Layer 0: Titolo e Foto */}
        <div className="sticky top-0 w-full h-screen bg-[#050B14] flex flex-col justify-center overflow-hidden border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] z-20">
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 mt-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-tech text-[10px] font-semibold tracking-[0.1em] uppercase text-white/50 whitespace-nowrap">
                  NON DEVI FIDARTI DI ME.
                </span>
                <div className="flex-1 min-w-[2rem] h-px bg-[#00E5FF]/50 hidden min-[375px]:block" />
              </div>
              <h2 className="font-display text-[clamp(28px,6vw,40px)] font-bold uppercase tracking-tight leading-[1.1] text-white">
                FIDATI DELLA MIA<br />
                <span className="text-[#00E5FF]">ESPERIENZA.</span>
              </h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-[300px] sm:h-[350px] mt-8 flex-shrink-0 relative max-w-sm mx-auto"
            >
              <ImagesBlock />
            </motion.div>
          </div>
        </div>

        {/* Layer 1 */}
        <div className="sticky top-0 w-full h-screen bg-[#050B14] flex flex-col justify-center overflow-hidden border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] z-30">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
          <div className="w-full mx-auto px-6 sm:px-8 flex flex-col justify-center">
            <div className="flex flex-col gap-2">
              <StepNumber num={1} />
              <div className="flex-1 mt-2">
                <h3 className="text-white font-bold text-[clamp(18px,4.5vw,24px)] mb-4 uppercase leading-tight tracking-wide">
                  CINQUE ANNI IN AGENZIA.<br />
                  <span className="text-[#00E5FF]">UNA SOLA CERTEZZA.</span>
                </h3>
                <div className="font-sans text-[clamp(14px,3.5vw,16px)] font-light leading-relaxed text-white/70 space-y-3">
                  <p>
                    Ho lavorato 5 anni nel marketing, in agenzia e a fianco di grandi aziende.
                  </p>
                  <p>
                    Da quell'esperienza ero convinto di una cosa: se trovi la chiave di comunicazione giusta, i risultati arrivano.
                  </p>
                  <p>
                    Così mi sono messo in proprio per dimostrarlo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="sticky top-0 w-full h-screen bg-[#050B14] flex flex-col justify-center overflow-hidden border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] z-40">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
          <div className="w-full mx-auto px-6 sm:px-8 flex flex-col justify-center">
            <div className="flex flex-col gap-2">
              <StepNumber num={2} />
              <div className="flex-1 mt-2">
                <h3 className="text-white font-bold text-[clamp(18px,4.5vw,24px)] mb-4 uppercase leading-tight tracking-wide">
                  COL MIO PRIMO CLIENTE,<br />
                  <span className="text-[#00E5FF]">L'HO DIMOSTRATO.</span>
                </h3>
                <div className="font-sans text-[clamp(14px,3.5vw,16px)] font-light leading-relaxed text-white/70 space-y-3">
                  <p>
                    Quando mi ha chiamato RD Salon mi ha chiesto una cosa sola: clienti nuovi.
                  </p>
                  <p>
                    Abbiamo costruito insieme una strategia social e, dopo i primi risultati, abbiamo finanziato il sito web.
                  </p>
                  <p>
                    In 6 mesi abbiamo raggiunto 415 clienti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="sticky top-0 w-full h-screen bg-[#050B14] flex flex-col justify-center overflow-hidden border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] z-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
          <div className="w-full mx-auto px-6 sm:px-8 flex flex-col justify-center">
            <div className="flex flex-col gap-2">
              <StepNumber num={3} />
              <div className="flex-1 mt-2">
                <h3 className="text-white font-bold text-[clamp(18px,4.5vw,24px)] mb-4 uppercase leading-tight tracking-wide text-[#00E5FF]">
                  MA NIENTE FUNZIONA PER SEMPRE.
                </h3>
                <div className="font-sans text-[clamp(14px,3.5vw,16px)] font-light leading-relaxed text-white/70 space-y-3">
                  <p>
                    I clienti arrivavano. Ma non eravamo pronti a gestirli.
                  </p>
                  <p>
                    Non sapevamo chi tornava e chi spariva, non c'era modo di ricontattarli e il salone era diventato un caos.
                  </p>
                  <p>
                    Ed è da lì che ho capito cosa manca davvero a un imprenditore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4 */}
        <div className="sticky top-0 w-full h-screen bg-[#050B14] flex flex-col justify-center overflow-hidden border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] z-[60]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
          <div className="w-full mx-auto px-6 sm:px-8 flex flex-col justify-center">
            <div className="flex flex-col gap-2">
              <StepNumber num={4} />
              <div className="flex-1 mt-2">
                <h3 className="text-white font-bold text-[clamp(24px,6vw,32px)] uppercase leading-tight tracking-wide">
                  COSÌ HO COSTRUITO<br />
                  <span className="text-[#00E5FF]">IL SISTEMA.</span>
                </h3>
                <div className="font-sans text-[clamp(14px,3.5vw,16px)] font-light leading-relaxed text-white/70 space-y-3 mt-4">
                  <p>
                    Ho rimesso tutto in discussione.
                  </p>
                  <p>
                    Ho costruito un approccio che non si ferma alla comunicazione: parte dalla strategia, costruisce il sistema digitale e automatizza quello che viene dopo.
                  </p>
                  <p>
                    Oggi lo applico a ogni progetto che seguo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


