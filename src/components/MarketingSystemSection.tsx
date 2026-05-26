import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Share2, Globe, ShoppingCart, Users, Zap } from 'lucide-react';

export default function MarketingSystemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const p1 = "Hai fatto tutto bene.";
  const p2 = "Ti mancava un pezzo.";
  const p3 = "Ti mancava un sistema.";

  const op1Desktop = useTransform(introProgress, [0.05, 0.10], [0, 1]);
  const introY1Desktop = useTransform(introProgress, [0.05, 0.10], [30, 0]);
  const op2Desktop = useTransform(introProgress, [0.15, 0.20], [0, 1]);
  const introY2Desktop = useTransform(introProgress, [0.15, 0.20], [30, 0]);
  const op3Desktop = useTransform(introProgress, [0.22, 0.26], [0, 1]);
  const introY3Desktop = useTransform(introProgress, [0.22, 0.26], [30, 0]);

  // Mobile variables are not used as we make it static, but we keep them to avoid refactoring hooks
  const op1Mobile = useTransform(introProgress, [0.0, 0.02], [0, 1]);
  const introY1Mobile = useTransform(introProgress, [0.0, 0.02], [30, 0]);
  const op2Mobile = useTransform(introProgress, [0.03, 0.05], [0, 1]);
  const introY2Mobile = useTransform(introProgress, [0.03, 0.05], [30, 0]);
  const op3Mobile = useTransform(introProgress, [0.06, 0.08], [0, 1]);
  const introY3Mobile = useTransform(introProgress, [0.06, 0.08], [30, 0]);

  const op1 = isMobile ? 1 : op1Desktop;
  const introY1 = isMobile ? 0 : introY1Desktop;
  const op2 = isMobile ? 1 : op2Desktop;
  const introY2 = isMobile ? 0 : introY2Desktop;
  const op3 = isMobile ? 1 : op3Desktop;
  const introY3 = isMobile ? 0 : introY3Desktop;

  const introOutOpacity = useTransform(introProgress, [0.85, 0.95], [1, 0]);
  const introOutY = useTransform(introProgress, [0.85, 0.95], [0, -100]);
  const introOutFilterDesktop = useTransform(introProgress, [0.85, 0.95], ["blur(0px)", "blur(12px)"]);

  // Horizontal spread distance for the initial line layout
  const SPACING = isMobile ? 85 : 240; 
  // Modest radius for the merged pentagon layout
  const R2 = isMobile ? 70 : 90;  

  // Move the animation triggers based on isMobile
  const startMerge = 0.05;
  const endMerge = 0.4;

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

  // Circles entrance via scrolling
  const circlesOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  const circlesY = useTransform(scrollYProgress, [0, 0.03], [isMobile ? 60 : 40, 0]);

  // Line growing down from the merged intersection
  const lineHeight = useTransform(scrollYProgress, [endMerge, endMerge + 0.15], [0, 180]);
  const lineOpacity = useTransform(scrollYProgress, [endMerge, endMerge + 0.05], [0, 1]);

  // "SISTEMA" text appearing at the end of the line
  const textOpacity = useTransform(scrollYProgress, [endMerge + 0.15, endMerge + 0.25], [0, 1]);
  const textY = useTransform(scrollYProgress, [endMerge + 0.15, endMerge + 0.25], [20, 0]);

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
      <div ref={introRef} className={`relative w-full ${isMobile ? "h-auto py-32" : "h-[400vh]"}`}>
        <div className={`${isMobile ? "relative" : "sticky top-0 h-screen"} w-full flex flex-col items-center justify-center overflow-hidden px-4`}>
          <motion.div 
            style={isMobile ? {} : { opacity: introOutOpacity, y: introOutY, filter: introOutFilterDesktop }}
            className={`flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-3 w-full`}
          >
            <motion.h2 style={{ opacity: op1, y: introY1 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-3xl sm:text-4xl px-2 whitespace-nowrap" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
              {p1}
            </motion.h2>
            <motion.h2 style={{ opacity: op2, y: introY2 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-3xl sm:text-4xl px-2 whitespace-nowrap" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
              {p2}
            </motion.h2>
            <motion.h2 style={{ opacity: op3, y: introY3 }} className={`font-display font-medium text-white/90 text-center ${isMobile ? "text-3xl sm:text-4xl px-2 whitespace-nowrap" : "text-[3vw] sm:text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-3xl whitespace-nowrap"}`}>
              {p3}
            </motion.h2>
          </motion.div>
        </div>
      </div>

      {/* 2. STATIC TITLE & SYSTEM SECTION */}
      <motion.div 
        style={isMobile ? {} : { opacity: circlesOpacity, y: circlesY }}
        className="w-full max-w-7xl mx-auto px-4 pb-4 mt-8 md:mt-24 z-20 relative">
        <div className="w-full text-center flex flex-col justify-center items-center border-b border-white/10 pb-8">
          <span className="font-sans text-cyan-400 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] block mb-3 md:mb-4">
            LA SOLUZIONE
          </span>
          <h2 className="font-barlow font-bold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
            Il sistema
          </h2>
        </div>
      </motion.div>

      {/* 3. STICKY CANVAS */}
      <div ref={containerRef} className="relative w-full h-[300vh]">
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden pt-10 md:pt-0">
          
          {/* Canvas */}
          <div className="relative w-full max-w-5xl h-[280px] sm:h-[450px] md:h-[600px] flex items-center justify-center scale-[0.85] sm:scale-90 md:scale-100 mt-10 md:mt-0">
            
            {circles.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  style={{ x: item.x, y: item.y, opacity: circlesOpacity, translateY: circlesY }}
                  className="absolute z-20 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] rounded-full border border-white/10 flex flex-col items-center justify-center bg-[#050B14]/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,229,255,0.03)] hover:border-[#00E5FF]/40 transition-colors duration-500"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 flex items-center justify-center mb-2 md:mb-4">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#00E5FF]" strokeWidth={1.5} />
                  </div>
                  <span className="uppercase text-[10px] md:text-xs font-semibold tracking-widest text-white/90 text-center px-1">{item.label}</span>
                </motion.div>
              );
            })}

            {/* Line dropping down */}
            <motion.div 
              style={{ opacity: lineOpacity, height: lineHeight }}
              className="absolute z-10 w-[2px] bg-gradient-to-b from-[#00E5FF]/80 to-transparent top-[50%] mt-8 sm:mt-[80px]"
            />

            {/* "SISTEMA" text at bottom */}
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="absolute z-30 top-[50%] mt-[160px] sm:mt-[270px] font-bold uppercase tracking-[0.3em] text-[#00E5FF] text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]"
            >
              SISTEMA
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
