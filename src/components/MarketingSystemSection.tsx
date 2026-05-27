import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Share2, Globe, ShoppingCart, Users, Zap } from 'lucide-react';

const SystemCard = ({ index, scrollYProgress, isMobile }: any) => {
  const cardTargetY = isMobile ? 1150 : 800; 
  const cardHalf = isMobile ? 90 : 110;

  const mobileOffset = isMobile ? -0.05 : 0;

  // Timings manually tuned for slower entry on specific cards - reduced by 25% for faster appearance
  const desk_t_props = [
    { start: 0.12, duration: 0.10 }, 
    { start: 0.18, duration: 0.10 }, 
    { start: 0.24, duration: 0.10 }, 
    { start: 0.30, duration: 0.10 }, 
    { start: 0.36, duration: 0.09 }  
  ];

  const mob_t_props = [
    { start: 0.15, duration: 0.12 },
    { start: 0.32, duration: 0.12 }, 
    { start: 0.42, duration: 0.12 }, 
    { start: 0.52, duration: 0.12 }, 
    { start: 0.62, duration: 0.10 }  
  ];

  const t_props = isMobile ? mob_t_props : desk_t_props;

  const t_slide_start = t_props[index].start;
  const t_slide_end = t_slide_start + t_props[index].duration;
  
  const t_next_slide_start = index < 4 ? t_props[index + 1].start : t_slide_start + 0.13;
  const t_next_slide_end = index < 4 ? t_props[index + 1].start + t_props[index + 1].duration : t_next_slide_start + 0.08;

  const y = useTransform(scrollYProgress, (v: any) => {
    let currentY = 0;
    const shiftY = isMobile ? 180 : 250;
    
    // 1. Entry slide
    if (index > 0) {
      if (v < t_slide_start) currentY = shiftY;
      else if (v >= t_slide_end) currentY = 0;
      else {
        // Apply smooth ease-out for the entry but close the gap much less aggressively
        const p = (v - t_slide_start) / t_props[index].duration;
        const easeOut = 1 - Math.pow(1 - p, 2);
        currentY = shiftY * (1 - easeOut);
      }
    }

    // 2. Subsquent cards push this one up
    for (let k = index + 1; k < 5; k++) {
      const kStart = t_props[k].start;
      const kDur = t_props[k].duration;
      const kEnd = kStart + kDur;
      if (v > kStart) {
        if (v >= kEnd) {
          currentY -= shiftY;
        } else {
          const p = (v - kStart) / kDur;
          const easeOut = 1 - Math.pow(1 - p, 2);
          currentY -= shiftY * easeOut;
        }
      }
    }
    return currentY;
  });

  // All cards have text slide animations disabled, but cards fade in
  const opacity = useTransform(scrollYProgress, (v: any) => {
    if (index === 0) return 1;
    if (v < t_slide_start) return 0;
    if (v >= t_slide_start + (t_props[index].duration * 0.5)) return 1;
    const p = (v - t_slide_start) / (t_props[index].duration * 0.5);
    return Math.pow(p, 2);
  });
  
  const scale = 1;
  const textOpacity = 1;
  const textY = 0;

  const titles = [
    "01 — ATTRAI",
    "02 — CONVERTI",
    "03 — RACCOGLI",
    "04 — MONETIZZA",
    "↻ RIPARTI"
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
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map 100% of the new shorter section to be equal to 46% (desktop) or 75% (mobile) of the old animation values.
  // This causes the section to unpin immediately as soon as the last card finishes its animation.
  const mappedYDesk = useTransform(rawScrollYProgress, [0, 1], [0, 0.46]);
  const mappedYMob = useTransform(rawScrollYProgress, [0, 1], [0, 0.75]);
  const scrollYProgress = isMobile ? mappedYMob : mappedYDesk;

  const { scrollYProgress: rawIntroProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"]
  });
  
  // Smooth out the extremely short scroll chunks so opacity tweening is visible
  const introProgress = useSpring(rawIntroProgress, { damping: 25, stiffness: 120 });

  const p1 = "Tranquillo.";
  const p2 = "La direzione è giusta.";
  const p3 = "Ti manca solo un pezzo.";

  const t_intro1 = [0.02, 0.07];
  const t_intro2 = [0.09, 0.14];
  const t_intro3 = [0.16, 0.21];

  const op1 = useTransform(introProgress, t_intro1, [0, 1]);
  const introY1 = useTransform(introProgress, t_intro1, [30, 0]);
  const op2 = useTransform(introProgress, t_intro2, [0, 1]);
  const introY2 = useTransform(introProgress, t_intro2, [30, 0]);
  const op3 = useTransform(introProgress, t_intro3, [0, 1]);
  const introY3 = useTransform(introProgress, t_intro3, [30, 0]);

  // Horizontal spread distance for the initial line layout
  const SPACING = isMobile ? 120 : 240; 
  // Modest radius for the merged pentagon layout
  const R2 = isMobile ? 90 : 70;  

  // Move the animation triggers based on isMobile
  const startMerge = isMobile ? 0.04 : 0.02;
  const endMerge = isMobile ? 0.16 : 0.15;
  
  const drawStart = isMobile ? 0.04 : 0.02;
  const drawEnd = isMobile ? 0.16 : 0.15;

  const yDeskOffset = 800; // amount to move world up
  const yMobOffset = 1150; 
  const worldYDesktop = useTransform(scrollYProgress, [0, 0.10, 0.22, 1], [0, 0, -yDeskOffset, -yDeskOffset]);
  const worldYMobile = useTransform(scrollYProgress, [0, 0.18, 0.32, 1], [0, 0, -yMobOffset, -yMobOffset]);
  const worldY = isMobile ? worldYMobile : worldYDesktop;

  const illuminateStart = isMobile ? 0.14 : 0.08;
  const illuminateEnd = isMobile ? 0.16 : 0.10;

  const lineStartDesk = 0.09;
  const lineEndDesk = 0.23;
  const lineHeightDesktop = useTransform(scrollYProgress, [lineStartDesk, lineEndDesk], [0, 605]); 

  const lineStartMob = 0.16;
  const lineEndMob = 0.28;
  const lineHeightMobile = useTransform(scrollYProgress, [lineStartMob, lineEndMob], [0, 975]); 
  
  const lineHeight = isMobile ? lineHeightMobile : lineHeightDesktop;
  
  const lineOpacityDesktop = useTransform(scrollYProgress, [lineStartDesk, lineStartDesk + 0.02], [0, 1]);
  const lineOpacityMobile = useTransform(scrollYProgress, [lineStartMob, lineStartMob + 0.02], [0, 1]);
  const lineOpacity = isMobile ? lineOpacityMobile : lineOpacityDesktop;

  const lineTextOpacityDesktop = useTransform(scrollYProgress, [lineStartDesk, lineStartDesk + 0.02, lineEndDesk - 0.02, lineEndDesk], [0, 1, 1, 0]);
  const lineTextOpacityMobile = useTransform(scrollYProgress, [lineStartMob, lineStartMob + 0.02, lineEndMob - 0.02, lineEndMob], [0, 1, 1, 0]);
  const lineTextOpacity = isMobile ? lineTextOpacityMobile : lineTextOpacityDesktop;

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
      <div ref={introRef} className={`relative w-full z-0 ${isMobile ? "h-[300vh]" : "h-[380vh]"}`}>
        <div className={`sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4`}>
          <motion.div 
            className={`flex flex-col items-center justify-center space-y-4 md:space-y-6 w-full`}
          >
            <div className={`flex ${isMobile ? "flex-col" : "flex-row flex-wrap"} items-center justify-center space-y-4 md:space-y-0 md:space-x-3 w-full max-w-5xl mx-auto`}>
              <motion.h2 style={{ opacity: op1, y: introY1 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-3xl sm:text-4xl px-2" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
                {p1}
              </motion.h2>
              <motion.h2 style={{ opacity: op2, y: introY2 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-2xl sm:text-3xl px-2 max-w-sm" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
                {p2}
              </motion.h2>
              <motion.h2 style={{ opacity: op3, y: introY3 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-2xl sm:text-3xl px-2 max-w-sm" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
                {p3}
              </motion.h2>
            </div>
          </motion.div>
        </div>
      </div>

      <div className={`relative z-20 w-full bg-[#050B14] -mt-[100vh] pt-32 shadow-[0_-30px_50px_rgba(5,11,20,1)]`}>
        {/* 2. STATIC TITLE & SYSTEM SECTION */}
        <div className="w-full max-w-7xl mx-auto px-4 pb-4 md:mt-12 z-20 relative">
          <div className="w-full text-center flex flex-col justify-center items-center border-b border-white/10 pb-8">
          <span className="font-sans text-cyan-400 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] block mb-3 md:mb-4">
            IL PEZZO MANCANTE
          </span>
          <h2 className="font-barlow font-bold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white mb-6">
            IL SISTEMA R1
          </h2>
          <p className="font-sans text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
            In 5 anni di lavoro ho sviluppato il <strong className="text-[#00E5FF] font-semibold">Sistema Revenue First</strong> che parte da una regola semplice: <br /> <strong className="text-white font-semibold border-b border-[#00E5FF]/40 pb-0.5">prima genero liquidità</strong> nella tua attività, poi costruiamo tutto il resto
          </p>
        </div>
      </div>

      {/* 3. STICKY CANVAS */}
      <div ref={containerRef} className={`relative w-full ${isMobile ? "h-[500vh]" : "h-[450vh]"}`}>
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
                      style={{ pathLength: circleDraw }}
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
                    <motion.div style={{ rotateY: iconRotate }} className="relative z-10 flex items-center justify-center w-full h-full">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#00E5FF]" strokeWidth={1.5} />
                    </motion.div>
                  </div>
                  <motion.span className="uppercase text-[10px] md:text-xs font-semibold tracking-widest text-white/90 text-center px-1 relative z-10">
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
            
            {/* Tracking text on the tip of the line */}
            <motion.div
              style={{ opacity: lineTextOpacity, y: lineHeight }}
              className="absolute z-20 left-1/2 -translate-x-1/2 w-max text-center top-[90px] pt-4 pointer-events-none"
            >
              <span className="text-[#00E5FF] text-[10px] md:text-xs font-semibold tracking-widest uppercase bg-[#050B14]/60 px-2 py-1 rounded-full backdrop-blur-sm border border-[#00E5FF]/20 whitespace-nowrap">
                5 STRUMENTI IN UN UNICO SISTEMA
              </span>
            </motion.div>

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
