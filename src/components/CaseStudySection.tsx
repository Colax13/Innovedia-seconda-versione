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
        initial: { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: noBorder ? "transparent" : (primary ? "#00E5FF" : "rgba(255, 255, 255, 0.2)") },
        hover: { backgroundColor: "#ffffff", borderColor: "#ffffff" }
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`group relative h-10 px-7 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer ${noBorder ? '' : 'border'} shadow-[0_0_20px_rgba(0, 229, 255, 0.1)] w-full sm:w-auto`}
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
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

  // Create a clamped scroll progress that only increases for mobile "one-way" animations
  const clampedProgress = useMotionValue(0);
  useEffect(() => {
    if (!isMobile) return;
    const unsubscribe = scrollYProgress.onChange(v => {
      if (v > clampedProgress.get()) {
        clampedProgress.set(v);
      }
    });
    return () => unsubscribe();
  }, [isMobile, scrollYProgress, clampedProgress]);

  const activeProgress = isMobile ? clampedProgress : scrollYProgress;

  // Image Scroll Animations - Delayed on Mobile
  const img1X = useTransform(
    activeProgress, 
    isMobile ? [0.05, 0.35] : [0, 0.3, 0.7, 1], 
    isMobile ? [200, 0] : [200, 0, 0, 200]
  );
  const img1Opacity = useTransform(
    activeProgress, 
    isMobile ? [0.05, 0.3] : [0, 0.25, 0.75, 1], 
    isMobile ? [0, 1] : [0, 1, 1, 0]
  );
  
  const img2X = useTransform(
    activeProgress, 
    isMobile ? [0.15, 0.45] : [0.1, 0.4, 0.6, 0.9], 
    isMobile ? [150, 0] : [150, 0, 0, 150]
  );
  const img2Opacity = useTransform(
    activeProgress, 
    isMobile ? [0.15, 0.4] : [0.1, 0.35, 0.65, 0.9], 
    isMobile ? [0, 1] : [0, 1, 1, 0]
  );

  const img3X = useTransform(
    activeProgress, 
    isMobile ? [0.1, 0.4] : [0.05, 0.35, 0.65, 0.95], 
    isMobile ? [-150, 0] : [-150, 0, 0, -150]
  );
  const img3Opacity = useTransform(
    activeProgress, 
    isMobile ? [0.1, 0.35] : [0.05, 0.3, 0.7, 0.95], 
    isMobile ? [0, 1] : [0, 1, 1, 0]
  );

  const img4X = useTransform(
    activeProgress, 
    isMobile ? [0.2, 0.5] : [0.15, 0.45, 0.55, 0.85], 
    isMobile ? [150, 0] : [150, 0, 0, 150]
  );
  const img4Opacity = useTransform(
    activeProgress, 
    isMobile ? [0.2, 0.45] : [0.15, 0.4, 0.6, 0.85], 
    isMobile ? [0, 1] : [0, 1, 1, 0]
  );

  const metrics = [
    {
      value: (
        <span>
          +<Counter value={30} delay={0.5} />
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
        <div className="flex items-center justify-center md:justify-start gap-2">
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
      className="relative pt-20 md:pt-32 pb-[72px] md:pb-12 px-8 md:px-[clamp(2rem,8vw,10rem)] bg-transparent border-t border-white/5 overflow-hidden z-30"
      style={{ perspective: '2000px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="grid lg:grid-cols-5 gap-12 md:gap-20 items-start">
          {/* Left Column: Title, Metrics, Text & CTA (3/5) */}
          <div className="lg:col-span-3 space-y-8 md:space-y-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center md:justify-start gap-6 mb-6"
              >
                <span className="font-tech text-[10px] font-medium tracking-[0.4em] uppercase text-pixar-cyan/60 whitespace-nowrap">
                  Caso studio di successo
                </span>
                <div
                  className="flex-1 h-px hidden md:block"
                  style={{ background: 'linear-gradient(90deg, rgba(0, 229, 255, 0.3), transparent)' }}
                />
              </motion.div>

              <div className="max-w-[800px] text-center md:text-left mx-auto md:mx-0">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: isMobile ? 0 : 0.1 }}
                  className="font-display text-[clamp(32px,6vw,64px)] font-bold uppercase tracking-tight leading-[0.95] text-white mb-4"
                >
                  {isMobile ? "PROGETTO RD SALON" : "RD SALON"}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: isMobile ? 0 : 0.2 }}
                  className="font-sans text-[clamp(16px,2vw,18px)] font-light leading-relaxed text-white/60 mb-12 md:mb-0"
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
                      boxShadow: '0 20px 40px rgba(0, 229, 255, 0.15)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      transition: { duration: 0.4, ease: "easeOut" }
                    }
                  }}
                  className="relative p-4 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden group backdrop-blur-sm cursor-default text-center md:text-left"
                >
                  {/* Left Cyan Glow Border - Background Track */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 block" />
                  
                  {/* Draining LED Bar */}
                  <motion.div 
                    variants={{
                      initial: { scaleY: 1 },
                      hover: { scaleY: 0 }
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ originY: 1 }}
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-pixar-cyan shadow-[2px_0_15px_rgba(6,182,212,0.6)] block" 
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
                  
                  <div className="relative z-10 flex flex-col items-center md:items-start">
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

            {/* Desktop CTA - Directly under metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="hidden md:flex flex-col items-start text-left pt-2"
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

          {/* Right Column: Floating Images (2/5) */}
          <div className="lg:col-span-2 relative min-h-0 md:min-h-[750px] flex flex-col pt-4">
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
              className="relative w-[26%] md:w-[30%] z-40 -mt-40 md:-mt-60 ml-auto mr-[-4%]"
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
              className="relative w-[90%] md:w-[85%] z-20 mt-24 md:mt-20 ml-[-5%] mr-auto"
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
              className="relative w-[26%] md:w-[30%] z-30 -mt-52 md:-mt-72 ml-auto mr-[5%]"
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
            
          </div>
        </div>

        {/* Testimonial Quote - Striking & Polished */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[240px] mb-[30px] md:mt-[60px] md:mb-[240px] max-w-4xl mx-auto relative group"
        >
          {/* Subtle Technical Backdrop */}
          <div className="absolute -inset-x-4 -inset-y-8 md:-inset-x-16 md:-inset-y-12 bg-white/[0.01] rounded-[32px] md:rounded-[40px] border border-white/5 overflow-hidden transition-all duration-1000 group-hover:bg-white/[0.02]">
            {/* Minimal Scanline */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '100% 4px'
              }}
            />
            {/* Edge Accents */}
            <div className="absolute top-0 right-1/4 w-px h-8 bg-gradient-to-b from-pixar-cyan/30 to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-px h-8 bg-gradient-to-t from-pixar-cyan/30 to-transparent" />
          </div>

          <div className="relative text-center">
            {/* Background Icon/Watermark - Scaled down */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[110px] md:text-[240px] text-pixar-cyan/5 leading-none select-none pointer-events-none -z-10">
              ”
            </div>

            <blockquote className="font-sans text-[clamp(18px,3.5vw,32px)] font-extralight leading-[1.3] text-white tracking-tight mb-8 md:mb-10 px-6">
              "Prima facevo tutto con il <span className="font-normal text-pixar-cyan/80">passaparola</span>, 
              adesso mi arrivano clienti che hanno visto i video su <span className="relative inline-block">
                <span className="relative z-10 italic">Instagram</span>
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.2 }}
                  className="absolute bottom-2 left-0 right-0 h-[2px] bg-pixar-cyan/40 -z-10 origin-left"
                />
              </span>"
            </blockquote>

            <div className="flex flex-col items-center gap-6">
              {/* Profile Accent - Scaled down for mobile */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-pixar-cyan/20 bg-pixar-cyan/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border border-pixar-cyan/40 animate-pulse" />
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 md:w-[18px] md:h-[18px] text-pixar-cyan/60">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="flex flex-col items-start gap-1">
                  <span className="font-display text-base md:text-lg font-bold tracking-wider text-white uppercase italic">Daniele</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pixar-cyan animate-pulse" />
                    <span className="font-tech text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/30">Proprietario RD Salon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Brackets - Desktop (TL & BR only, aligned with backdrop) */}
          <div className="hidden md:block absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-pixar-cyan rounded-tl-2xl -translate-x-10 -translate-y-8" />
          <div className="hidden md:block absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-pixar-cyan rounded-br-2xl translate-x-10 translate-y-8" />

          {/* Decorative Frame - Mobile (TL & BR only, shrunken and aligned) */}
          <div className="md:hidden">
            {/* Top-Left */}
            <div className="absolute top-0 left-0 w-6 h-6 -translate-x-1 -translate-y-3 border-t-2 border-l-2 border-pixar-cyan rounded-tl-xl" />
            {/* Bottom-Right */}
            <div className="absolute bottom-0 right-0 w-6 h-6 translate-x-1 translate-y-3 border-b-2 border-r-2 border-pixar-cyan rounded-br-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySection;
