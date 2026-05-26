import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Share2, Globe, ShoppingCart, Users, Zap } from 'lucide-react';

const SystemCard = ({ index, scrollYProgress, isMobile }: any) => {
  const cardTargetY = isMobile ? 1150 : 800; 
  const cardHalf = isMobile ? 90 : 110;

  const mobileOffset = isMobile ? -0.05 : 0;

  // Timings manually tuned for slower entry on specific cards
  const desk_t_props = [
    { start: 0.15, duration: 0.12 }, 
    { start: 0.30, duration: 0.12 }, 
    { start: 0.45, duration: 0.12 }, 
    { start: 0.60, duration: 0.12 }, 
    { start: 0.75, duration: 0.12 }  
  ];

  const mob_t_props = [
    { start: 0.15, duration: 0.12 },
    { start: 0.30, duration: 0.12 }, 
    { start: 0.45, duration: 0.12 }, 
    { start: 0.60, duration: 0.12 }, 
    { start: 0.75, duration: 0.12 }  
  ];

  const t_props = isMobile ? mob_t_props : desk_t_props;

  const t_slide_start = t_props[index].start;
  const t_slide_end = t_slide_start + t_props[index].duration;
  
  const t_next_slide_start = index < 4 ? t_props[index + 1].start : t_slide_start + 0.13;
  const t_next_slide_end = index < 4 ? t_props[index + 1].start + t_props[index + 1].duration : t_next_slide_start + 0.08;

  // Transforms
  let yIn = [0, t_slide_start, t_slide_end, 1];
  let yOut = [1500, 1500, 0, 0];
  if (index === 0) {
    yIn = [0, 1];
    yOut = [0, 0];
  }

  const y = useTransform(scrollYProgress, yIn, yOut);

  // All cards are 100% opaque, 100% scaled, no text slide animations. 
  // They just physically slide into view from below.
  const opacity = 1;
  const scale = 1;
  const textOpacity = 1;
  const textY = 0;

  const titles = [
    "01 — ATTRAI",
    "02 — CONVERTI",
    "03 — RACCOGLI",
    "04 — RICONTATTA",
    "↻ REPEAT"
  ];

  const descriptions = [
    "Attraverso i social media con contenuti mirati.",
    "Attraverso il tuo sito web o il tuo e-commerce.",
    "I contatti nel CRM per tenere traccia dei tuoi clienti.",
    "Con automazioni di email, messaggi e promozioni per riconvertire.",
    "Il sistema ricomincia da zero."
  ];

  return (
    <motion.div
      style={{ top: cardTargetY - cardHalf, y, opacity, scale, zIndex: 30 + index }}
      className={`absolute left-1/2 flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-[#050B14] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)]
      ${isMobile ? "w-[280px] h-[150px] -ml-[140px] px-4" : "w-[500px] h-[220px] -ml-[250px]"}`}
    >
      <motion.h3 
        style={{ opacity: textOpacity, y: textY }}
        className={`text-[#00E5FF] font-bold tracking-widest uppercase mb-4 ${isMobile ? 'text-2xl' : 'text-3xl'}`}
      >
        {titles[index]}
      </motion.h3>
      <motion.p
        style={{ opacity: textOpacity, y: textY }}
        className={`text-white/80 text-center leading-relaxed max-w-[90%] ${isMobile ? 'text-sm' : 'text-base'}`}
      >
        {descriptions[index]}
      </motion.p>
    </motion.div>
  );
};

export default function MarketingSystemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Track scroll for merge animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"]
  });

  const p1 = "Tranquillo.";
  const p2 = "La direzione è giusta.";
  const p3 = "Ti manca solo un pezzo.";
  const p4 = "Ti manca un sistema.";

  const t_intro1 = isMobile ? [0.005, 0.010] : [0.05, 0.08];
  const t_intro2 = isMobile ? [0.013, 0.018] : [0.14, 0.17];
  const t_intro3 = isMobile ? [0.021, 0.026] : [0.20, 0.23];
  const t_intro4 = isMobile ? [0.029, 0.034] : [0.26, 0.29];

  const op1 = useTransform(introProgress, t_intro1, [0, 1]);
  const introY1 = useTransform(introProgress, t_intro1, [30, 0]);
  const op2 = useTransform(introProgress, t_intro2, [0, 1]);
  const introY2 = useTransform(introProgress, t_intro2, [30, 0]);
  const op3 = useTransform(introProgress, t_intro3, [0, 1]);
  const introY3 = useTransform(introProgress, t_intro3, [30, 0]);
  const op4 = useTransform(introProgress, t_intro4, [0, 1]);
  const introY4 = useTransform(introProgress, t_intro4, [30, 0]);

  // Horizontal spread distance for the initial line layout
  const SPACING = isMobile ? 120 : 240; 
  // Modest radius for the merged pentagon layout
  const R2 = isMobile ? 90 : 70;  

  // Move the animation triggers based on isMobile
  const startMerge = isMobile ? 0.04 : 0.02;
  const endMerge = isMobile ? 0.20 : 0.15;
  
  const drawStart = isMobile ? 0.04 : 0.02;
  const drawEnd = isMobile ? 0.20 : 0.15;

  const yDeskOffset = 800; // amount to move world up
  const yMobOffset = 1150; 
  const worldYDesktop = useTransform(scrollYProgress, [0, 0.10, 0.22, 1], [0, 0, -yDeskOffset, -yDeskOffset]);
  const worldYMobile = useTransform(scrollYProgress, [0, 0.22, 0.35, 1], [0, 0, -yMobOffset, -yMobOffset]);
  const worldY = isMobile ? worldYMobile : worldYDesktop;

  const illuminateStart = isMobile ? 0.18 : 0.08;
  const illuminateEnd = isMobile ? 0.20 : 0.10;

  const lineHeightDesktop = useTransform(scrollYProgress, [0.10, 0.22], [0, 800 - 110 - 85]); 
  const lineHeightMobile = useTransform(scrollYProgress, [0.22, 0.35], [0, 1150 - 90 - 85]); 
  const lineHeight = isMobile ? lineHeightMobile : lineHeightDesktop;
  
  const lineOpacityDesktop = useTransform(scrollYProgress, [0.10, 0.13], [0, 1]);
  const lineOpacityMobile = useTransform(scrollYProgress, [0.22, 0.25], [0, 1]);
  const lineOpacity = isMobile ? lineOpacityMobile : lineOpacityDesktop;

  // 1. Social (Far Left start -> Top Left pentagon)
  const x0 = useTransform(scrollYProgress, [startMerge, endMerge], [-SPACING * 2, -R2 * 0.95]);
  const y0 = useTransform(scrollYProgress, [startMerge, endMerge], [0, -R2 * 0.31]);

  // 2. Sito Web (Mid Left start -> Bottom Left pentagon)
  const x1 = useTransform(scrollYProgress, [startMerge, endMerge], [-SPACING, -R2 * 0.59]);
  const y1 = useTransform(scrollYProgress, [startMerge, endMerge], [0, R2 * 0.81]);

  // 3. E-commerce (Center start -> Top pentagon)
  const x2 = useTransform(scrollYProgress, [startMerge, endMerge], [0, 0]);
  const y2 = useTransform(scrollYProgress, [startMerge, endMerge], [0, -R2 * 1.2]);

  // 4. CRM (Mid Right start -> Bottom Right pentagon)
  const x3 = useTransform(scrollYProgress, [startMerge, endMerge], [SPACING, R2 * 0.59]);
  const y3 = useTransform(scrollYProgress, [startMerge, endMerge], [0, R2 * 0.81]);

  // 5. Automation (Far Right start -> Top Right pentagon)
  const x4 = useTransform(scrollYProgress, [startMerge, endMerge], [SPACING * 2, R2 * 0.95]);
  const y4 = useTransform(scrollYProgress, [startMerge, endMerge], [0, -R2 * 0.31]);

  const circleDraw = useTransform(scrollYProgress, [drawStart, drawEnd], [0, 1]);
  const iconOpacity = useTransform(scrollYProgress, [drawStart, drawEnd], [0, 1]);
  const iconRotate = useTransform(scrollYProgress, [drawStart, drawEnd], [180, 0]);

  const illuminateOpacity = useTransform(scrollYProgress, [illuminateStart, illuminateEnd], [0, 1]);

  const circles = [
    { label: "Social", icon: Share2, x: x0, y: y0 },
    { label: "Sito Web", icon: Globe, x: x1, y: y1 },
    { label: "E-commerce", icon: ShoppingCart, x: x2, y: y2 },
    { label: "CRM", icon: Users, x: x3, y: y3 },
    { label: "Automation", icon: Zap, x: x4, y: y4 }
  ];

  return (
    <section className="relative w-full bg-[#050B14] text-white">
      {/* 1. SCROLLING INTRO OR STATIC ON MOBILE */}
      <div ref={introRef} className={`relative w-full z-0 h-[450vh]`}>
        <div className={`sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4`}>
          <motion.div 
            className={`flex flex-col items-center justify-center space-y-4 md:space-y-6 w-full`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-3 w-full">
              <motion.h2 style={{ opacity: op1, y: introY1 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-3xl sm:text-4xl px-2 mb-2" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
                {p1}
              </motion.h2>
              <motion.h2 style={{ opacity: op2, y: introY2 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-2xl sm:text-3xl px-2 mb-2 max-w-sm" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
                {p2}
              </motion.h2>
              <motion.h2 style={{ opacity: op3, y: introY3 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-2xl sm:text-3xl px-2 mb-4 max-w-sm" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
                {p3}
              </motion.h2>
            </div>
            <motion.h2 style={{ opacity: op4, y: introY4 }} className={`font-display font-medium text-cyan-400 text-center ${isMobile ? "text-3xl sm:text-4xl px-2 mt-4" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap mt-4"}`}>
              {p4}
            </motion.h2>
          </motion.div>
        </div>
      </div>

      <div className={`relative z-20 w-full bg-[#050B14] -mt-[100vh] pt-32 shadow-[0_-30px_50px_rgba(5,11,20,1)]`}>
        {/* 2. STATIC TITLE & SYSTEM SECTION */}
        <div className="w-full max-w-7xl mx-auto px-4 pb-4 md:mt-12 z-20 relative">
          <div className="w-full text-center flex flex-col justify-center items-center border-b border-white/10 pb-8">
          <span className="font-sans text-cyan-400 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] block mb-3 md:mb-4">
            LA SOLUZIONE
          </span>
          <h2 className="font-barlow font-bold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white mb-6">
            IL SISTEMA R1
          </h2>
          <p className="font-sans text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
            In 5 anni di lavoro ho sviluppato il sistema revenue-first che parte da una regola semplice: prima genero liquidità nella tua attività, poi costruiamo tutto il resto
          </p>
        </div>
      </div>

      {/* 3. STICKY CANVAS */}
      <div ref={containerRef} className={`relative w-full h-[450vh]`}>
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Canvas */}
          <motion.div 
            style={{ y: worldY }}
            className={`relative w-full flex justify-center ${isMobile ? "scale-[0.95]" : "scale-[0.60] sm:scale-75 md:scale-100"}`}
          >
            <div className="relative w-0 h-0 flex items-center justify-center">

            {circles.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  style={{ x: item.x, y: item.y }}
                  className="absolute z-20 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] rounded-full flex flex-col items-center justify-center bg-[#050B14]/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,229,255,0.03)] group transition-colors duration-500"
                >
                  {/* Outer circle SVG */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100" overflow="visible">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      className="stroke-white/10 group-hover:stroke-[#00E5FF]/40 transition-colors duration-500"
                      strokeWidth="0.5"
                      style={{ pathLength: circleDraw }}
                    />
                    {/* Cyan Illuminated Outer circle */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      className="stroke-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                      strokeWidth="1"
                      style={{ pathLength: circleDraw, opacity: illuminateOpacity }}
                    />
                  </svg>
                  
                  <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-2 md:mb-4 bg-[#00E5FF]/10 rounded-full">
                    {/* Inner circle SVG */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100" overflow="visible">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        className="stroke-[#00E5FF]/30"
                        strokeWidth="3"
                        style={{ pathLength: circleDraw }}
                      />
                    </svg>
                    <motion.div style={{ rotateY: iconRotate, opacity: iconOpacity }} className="relative z-10 flex items-center justify-center w-full h-full">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#00E5FF]" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                  <motion.span style={{ opacity: iconOpacity }} className="uppercase text-[10px] md:text-xs font-semibold tracking-widest text-white/90 text-center px-1 relative z-10">
                    {item.label}
                  </motion.span>
                </motion.div>
              );
            })}

            {/* Line dropping down */}
            <motion.div 
              style={{ opacity: lineOpacity, height: lineHeight }}
              className="absolute z-10 w-[2px] left-1/2 -ml-[1px] bg-gradient-to-b from-[#00E5FF] via-[#00E5FF]/80 to-transparent top-[85px] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] rounded-full"
            />

            {/* Cards */}
            {[0, 1, 2, 3, 4].map(i => (
              <SystemCard key={`card-${i}`} index={i} scrollYProgress={scrollYProgress} isMobile={isMobile} />
            ))}
            
            </div>
          </motion.div>

        </div>
      </div>
      </div>
    </section>
  );
}
