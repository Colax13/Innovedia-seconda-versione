import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import OptimizedImage from './OptimizedImage';

const ScrollParagraph = ({ num, children }: { num: number, children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 80%"] 
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

  const ImagesBlock = () => (
    <motion.div 
      style={{ x: photosX, opacity: photosOpacity }}
      className="w-full h-full relative"
    >
      {/* Secondary photo (Bottom Left) */}
      <div 
        className="absolute bottom-[14%] lg:bottom-[0%] left-[0%] w-[55%] md:w-[60%] aspect-[4/5] z-10 -rotate-3 hover:z-40"
      >
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

      {/* Main photo (Top Center/Right) */}
      <div 
        className="absolute top-[8%] lg:top-[0%] right-[0%] w-[65%] md:w-[70%] aspect-[3/4] z-30 rotate-2 hover:z-40"
      >
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
    </motion.div>
  );

  return (
    <section 
      ref={sectionRef} 
      id="qualcosa-su-di-me" 
      className="relative pt-32 pb-24 md:pt-[30vh] md:pb-32 px-8 md:px-[clamp(2rem,8vw,10rem)] bg-transparent z-40 -mt-[10vh] lg:-mt-[15vh] md:snap-start"
    >
      <motion.div style={{ opacity: sectionOpacity }} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
        
        {/* IMAGES LEFT - STICKY (DESKTOP) */}
        <div className="hidden lg:block lg:w-[45%] lg:sticky lg:top-[calc(50vh-250px)] h-[400px] md:h-[500px] z-20 flex-shrink-0">
          <ImagesBlock />
        </div>

        {/* TEXT CONTENT RIGHT */}
        <div className="flex-1 w-full lg:w-[55%] z-20 flex flex-col gap-12 md:gap-16">
          
          <div className="mb-0 md:mb-6 overflow-hidden">
            <motion.div
              style={{ x: titleX, opacity: titleOpacity }}
            >
              <div className="flex items-center gap-3 md:gap-6 mb-4">
                <span className="font-tech text-xs sm:text-sm font-semibold tracking-[0.05em] md:tracking-[0.2em] uppercase text-white/50 whitespace-nowrap">
                  IL TUO PROBLEMA NON È TROVARE CLIENTI.
                </span>
                <div
                  className="flex-1 min-w-[2rem] max-w-[4rem] md:max-w-[6rem] h-px bg-[#00E5FF]/50 hidden min-[375px]:block"
                />
              </div>

              <h2 className="font-display text-[clamp(40px,5vw,60px)] font-bold uppercase tracking-tight leading-[1.1] text-white">
                È SAPERE COSA FARNE<br />
                <span className="text-[#00E5FF]">
                  QUANDO ARRIVANO.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* IMAGES MIDDLE (MOBILE ONLY) */}
          <div className="block lg:hidden w-full h-[400px] z-20 flex-shrink-0">
            <ImagesBlock />
          </div>

          <div className="space-y-16 md:space-y-24">
            
            <ScrollParagraph num={1}>
              <h3 className="text-white font-bold text-[clamp(20px,2vw,28px)] mb-6 uppercase leading-tight tracking-wide">
                TUTTI TI DICONO CHE TI SERVE "COMUNICARE".<br />
                <span className="text-[#00E5FF]">MA NON TI DICONO IL RESTO.</span>
              </h3>
              <p className="mb-4">
                Ho lavorato 5 anni nel marketing, in agenzia e a fianco di grandi aziende. Ho visto cosa funziona e cosa no, <strong className="text-white font-semibold">per imprenditori grandi e piccoli.</strong>
              </p>
              <p className="mb-4">
                E da quell'esperienza ero convinto di una cosa: <strong className="text-white font-semibold">se trovi la chiave di comunicazione giusta, <span className="text-[#00E5FF]">i risultati arrivano.</span></strong>
              </p>
              <p>
                Così mi sono messo in proprio per dimostrarlo.
              </p>
            </ScrollParagraph>

            <ScrollParagraph num={2}>
              <h3 className="text-white font-bold text-[clamp(20px,2vw,28px)] mb-6 uppercase leading-tight tracking-wide">
                COL MIO PRIMO CLIENTE, L'HO PROVATO.<br />
                <span className="text-[#00E5FF]">E FUNZIONAVA DI BRUTTO.</span>
              </h3>
              <p className="mb-4">
                Quando mi ha chiamato RD Salon mi ha chiesto una cosa sola.
              </p>
              <p className="mb-4 text-[#00E5FF] font-semibold text-[clamp(18px,1.5vw,22px)]">
                Clienti nuovi.
              </p>
              <p>
                Così abbiamo costruito insieme una strategia social e dopo i primi successi abbiamo finanziato il sito web. <strong className="text-white font-semibold">In 6 mesi abbiamo raggiunto 409 clienti. Grazie a tutti!</strong> Un risultato al di sopra delle aspettative.
              </p>
            </ScrollParagraph>

            <ScrollParagraph num={3}>
              <h3 className="text-white font-bold text-[clamp(20px,2vw,28px)] mb-6 uppercase leading-tight tracking-wide text-[#00E5FF]">
                MA NIENTE FUNZIONA PER SEMPRE.
              </h3>
              <p className="mb-4">
                I clienti arrivavano, questo sì. <strong className="text-[#00E5FF] font-semibold">Ma non eravamo pronti a gestirli.</strong> Non sapevamo chi tornava e chi spariva, non c'era modo di ricontattarli e gestire il salone era diventato un casino.
              </p>
              <p className="mb-4">
                Mancava tutto quello che viene dopo la comunicazione.
              </p>
              <p className="font-semibold text-white">
                Ed è da lì che ho finalmente capito i problemi di un imprenditore.
              </p>
            </ScrollParagraph>

            <ScrollParagraph num={4}>
              <h3 className="text-white font-bold text-[clamp(24px,2.5vw,36px)] mb-4 uppercase leading-tight tracking-wide">
                COSÌ HO SVILUPPATO IL<br className="hidden md:block" /> METODO DI LAVORO PERFETTO<br />
                <span className="text-[#00E5FF]">PER UNA PICCOLA MEDIA IMPRESA.</span>
              </h3>
            </ScrollParagraph>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
