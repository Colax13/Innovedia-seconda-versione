import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from 'motion/react';

// ============================================================
// COUNTER COMPONENT
// ============================================================
function Counter({ value, duration = 2, delay = 0 }: { value: number, duration?: number, delay?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      });
      return controls.stop;
    } else {
      // Reset when out of view (invisible to user as it's outside viewport)
      count.set(0);
    }
  }, [isInView, value, duration, delay, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// ============================================================
// FLIP BUTTON (Hero Style)
// ============================================================
function FlipButton({ text, onClick, primary = false, noBorder = false }: { text: string, onClick?: () => void, primary?: boolean, noBorder?: boolean }) {
  return (
    <motion.button 
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        initial: { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: noBorder ? "transparent" : (primary ? "#06b6d4" : "rgba(255, 255, 255, 0.2)") },
        hover: { backgroundColor: "#ffffff", borderColor: "#ffffff" }
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`group relative h-10 px-7 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer ${noBorder ? '' : 'border'} shadow-[0_0_20px_rgba(6,182,212,0.1)] w-full sm:w-auto`}
    >
      <div className="relative z-10 flex h-full items-center justify-center">
        {text.split("").map((char, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <motion.span
              variants={{
                initial: { y: 0, rotateX: 0, color: "#ffffff" },
                hover: { y: "-100%", rotateX: 90, color: "#000000" }
              }}
              transition={{ 
                delay: i * 0.015, 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              variants={{
                initial: { y: "100%", rotateX: -90, color: "#000000" },
                hover: { y: 0, rotateX: 0, color: "#000000" }
              }}
              transition={{ 
                delay: i * 0.015, 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="absolute inset-0 inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </div>
    </motion.button>
  );
}

const CaseStudySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Image Scroll Animations - Delayed on Mobile
  const img1X = useTransform(
    scrollYProgress, 
    isMobile ? [0.15, 0.45, 0.85, 1] : [0, 0.3, 0.7, 1], 
    [200, 0, 0, 200]
  );
  const img1Opacity = useTransform(
    scrollYProgress, 
    isMobile ? [0.15, 0.4, 0.9, 1] : [0, 0.25, 0.75, 1], 
    [0, 1, 1, 0]
  );
  
  const img2X = useTransform(
    scrollYProgress, 
    isMobile ? [0.25, 0.55, 0.75, 0.95] : [0.1, 0.4, 0.6, 0.9], 
    [150, 0, 0, 150]
  );
  const img2Opacity = useTransform(
    scrollYProgress, 
    isMobile ? [0.25, 0.5, 0.8, 0.95] : [0.1, 0.35, 0.65, 0.9], 
    [0, 1, 1, 0]
  );

  const img3X = useTransform(
    scrollYProgress, 
    isMobile ? [0.2, 0.5, 0.8, 1] : [0.05, 0.35, 0.65, 0.95], 
    [-150, 0, 0, -150]
  );
  const img3Opacity = useTransform(
    scrollYProgress, 
    isMobile ? [0.2, 0.45, 0.85, 1] : [0.05, 0.3, 0.7, 0.95], 
    [0, 1, 1, 0]
  );

  const img4X = useTransform(
    scrollYProgress, 
    isMobile ? [0.3, 0.6, 0.7, 0.9] : [0.15, 0.45, 0.55, 0.85], 
    [150, 0, 0, 150]
  );
  const img4Opacity = useTransform(
    scrollYProgress, 
    isMobile ? [0.3, 0.55, 0.75, 0.9] : [0.15, 0.4, 0.6, 0.85], 
    [0, 1, 1, 0]
  );

  const metrics = [
    {
      value: (
        <span>
          +<Counter value={20} delay={0.5} />
          <span className="text-pixar-cyan">%</span>
        </span>
      ),
      label: "Fatturato generato dal canale digitale"
    },
    {
      value: (
        <span>
          +<Counter value={400} delay={0.7} />
        </span>
      ),
      label: "Nuove clienti acquisite in 6 mesi"
    },
    {
      value: (
        <div className="flex items-center gap-2">
          <span className="text-white/20">€20</span>
          <span className="text-pixar-cyan text-[0.6em]">→</span>
          <span>€<Counter value={2} delay={0.9} />k</span>
        </div>
      ),
      label: "Campagna natalizia. Una sponsorizzata, 40 buoni venduti."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="caso-studio"
      className="relative pt-20 md:pt-32 pb-5 px-8 md:px-[clamp(2rem,8vw,10rem)] bg-transparent border-t border-white/5 overflow-hidden z-30"
      style={{ perspective: '2000px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Left Column: Title, Metrics, Text & CTA (3/5) */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-6 mb-6"
              >
                <span className="font-tech text-[10px] font-medium tracking-[0.4em] uppercase text-pixar-cyan/60 whitespace-nowrap">
                  lo abbiamo già fatto
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: 'linear-gradient(90deg, rgba(0,255,255,0.2), transparent)' }}
                />
              </motion.div>

              <div className="max-w-[800px]">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-[clamp(32px,6vw,64px)] font-bold uppercase tracking-tight leading-[0.95] text-white mb-4"
                >
                  RD SALON
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-[clamp(16px,2vw,18px)] font-light leading-relaxed text-white/60 mb-8"
                >
                  Da salone locale a brand digitale. Partiti da zero, abbiamo costruito Sito, e-commerce spa, strategia social integrata.
                </motion.p>
              </div>
            </div>

            {/* Metrics Row (Horizontal) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  whileHover="hover"
                  variants={{
                    initial: { opacity: 0, y: 30, boxShadow: '0 0 0px rgba(0,0,0,0)' },
                    animate: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 1, delay: 0.3 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }
                    },
                    hover: { 
                      y: -10, 
                      boxShadow: '0 20px 40px rgba(0, 255, 255, 0.12)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      transition: { duration: 0.4, ease: "easeOut" }
                    }
                  }}
                  className="relative p-4 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden group backdrop-blur-sm cursor-default"
                >
                  {/* Left Cyan Glow Border - Background Track */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5" />
                  
                  {/* Draining LED Bar */}
                  <motion.div 
                    variants={{
                      initial: { scaleY: 1 },
                      hover: { scaleY: 0 }
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ originY: 1 }}
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-pixar-cyan shadow-[2px_0_15px_rgba(0,255,255,0.6)]" 
                  />

                  {/* Water Stain / Leak Animation */}
                  <motion.div
                    variants={{
                      initial: { scale: 0, opacity: 0, y: 0 },
                      hover: { 
                        scale: [0, 1.5, 1.3], 
                        opacity: [0, 0.7, 0.4],
                        y: [0, 10, 15],
                        x: [-10, -12, -10]
                      }
                    }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 w-16 h-16 bg-pixar-cyan/30 blur-2xl rounded-full pointer-events-none"
                  />
                  
                  <div className="relative z-10">
                    <div className="font-display text-[clamp(24px,4vw,42px)] font-bold text-white mb-1 tracking-tight">
                      {metric.value}
                    </div>
                    <div className="font-sans text-[9px] md:text-[10px] text-white/30 leading-relaxed uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-8">
              {/* Subtle CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="pt-4"
              >
                <p className="font-tech text-[10px] tracking-widest text-white/30 uppercase mb-4">
                  Vuoi risultati simili?
                </p>
                <FlipButton 
                  text="Richiedi un'analisi gratuita" 
                  primary
                  onClick={() => {
                    const el = document.getElementById('contatti');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Floating Images (2/5) */}
          <div className="lg:col-span-2 relative min-h-[600px] md:min-h-[900px] flex flex-col pt-4">
            {/* Hero Salone */}
            <motion.div
              style={{ x: img1X, opacity: img1Opacity }}
              className="relative w-[100%] md:w-[95%] z-10"
            >
              <div className="absolute inset-0 bg-pixar-cyan/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-black">
                <img 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1774624472/Screenshot_3_w8ts30.jpg" 
                  alt="Hero Salone"
                  className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Reel Cambio Look */}
            <motion.div
              style={{ x: img2X, opacity: img2Opacity }}
              className="relative w-[35%] md:w-[30%] z-40 -mt-44 md:-mt-60 ml-auto mr-[-10%]"
            >
              <div className="absolute inset-0 bg-pixar-cyan/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-black">
                <img 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1775413522/cambio_look_z7qqxj.png" 
                  alt="Reel Cambio Look"
                  className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Hero Hair Spa */}
            <motion.div
              style={{ x: img3X, opacity: img3Opacity }}
              className="relative w-[90%] md:w-[85%] z-20 mt-12 md:mt-20 ml-[-5%] mr-auto"
            >
              <div className="absolute inset-0 bg-pixar-cyan/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-black">
                <img 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084327/Screenshot_5_pursfi.jpg" 
                  alt="Hero Hair Spa"
                  className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Reel Tonalizzante */}
            <motion.div
              style={{ x: img4X, opacity: img4Opacity }}
              className="relative w-[35%] md:w-[30%] z-30 -mt-56 md:-mt-72 ml-auto mr-[5%]"
            >
              <div className="absolute inset-0 bg-pixar-cyan/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group bg-black">
                <img 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1775413526/tonalizzante_in8vjo.png" 
                  alt="Reel Tonalizzante"
                  className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
            
            {/* Main Background Glow for the whole stack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[100%] bg-pixar-cyan/5 blur-[150px] rounded-full -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
