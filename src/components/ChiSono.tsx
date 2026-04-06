import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// ============================================================
// V-STEP COMPONENT
// ============================================================
interface VStepProps {
  num: string;
  title: string;
  description: string;
  isFirst?: boolean;
  progress: any; // scrollYProgress from parent
  index: number; // to stagger
  isMobile: boolean;
}

function VStep({ num, title, description, isFirst, progress, index, isMobile }: VStepProps) {
  // Stagger offsets
  const baseDelay = isMobile ? 0.05 : 0.22; // Much earlier on mobile
  const startOffset = baseDelay + (index * (isMobile ? 0.04 : 0.07));
  const endOffset = index * 0.03;

  // Entrance: delayed start
  // Exit: 0.9 to 1.0 (staggered) - Delayed on desktop
  const exitStart = isMobile ? 0.8 : 0.92;
  const x = useTransform(
    progress, 
    [0 + startOffset, 0.28 + startOffset, exitStart - endOffset, 1 - endOffset], 
    [-400, 0, 0, -400]
  );
  
  const opacity = useTransform(
    progress, 
    [0 + startOffset, 0.22 + startOffset, exitStart + 0.05 - endOffset, 1 - endOffset], 
    [0, 1, 1, 0]
  );

  const dividerScale = useTransform(
    progress, 
    [0 + startOffset, 0.28 + startOffset, exitStart - endOffset, 1 - endOffset], 
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ x, opacity }}
      className={`relative py-6 ${isFirst ? 'pt-0' : ''}`}
    >
      {/* Divider */}
      {!isFirst && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px origin-left"
          style={{
            background: 'linear-gradient(90deg, rgba(0,255,255,0.15), transparent 80%)',
            scaleX: dividerScale
          }}
        />
      )}

      <div className="flex items-baseline gap-5">
        {/* Number */}
        <span className="font-tech text-[10px] text-pixar-cyan/40 tracking-wider pt-[0.2em] shrink-0">
          {num}
        </span>

        {/* V letter */}
        <span
          className="font-display text-[clamp(32px,4vw,48px)] font-extrabold leading-none text-pixar-cyan shrink-0"
          style={{ textShadow: '0 0 20px rgba(0,255,255,0.3)' }}
        >
          V
        </span>

        {/* Title inline with V */}
        <span className="font-display text-[clamp(20px,2.5vw,28px)] font-bold uppercase tracking-wider text-white leading-none">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-[clamp(13px,1.4vw,15px)] font-light leading-relaxed text-white/40 max-w-[420px] mt-3 pl-0 sm:pl-[calc(10px+1.25rem+clamp(32px,4vw,48px)+1.25rem)]">
        {description}
      </p>
    </motion.div>
  );
}

// ============================================================
// MAIN CHI SONO SECTION
// ============================================================
export default function ChiSono() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Photo Animation: Entrance from Right, Exit to Right
  // Synchronized with the first VStep (starts at 0.22 on desktop, later on mobile)
  const photoStart = isMobile ? 0.45 : 0.22;
  const photoExitStart = isMobile ? 1 : 0.9; // Delayed exit on desktop
  const photoX = useTransform(
    scrollYProgress, 
    isMobile ? [photoStart, photoStart + 0.23, 1, 2] : [photoStart, photoStart + 0.23, photoExitStart, 1], 
    isMobile ? [400, 0, 0, 0] : [400, 0, 0, 400]
  );
  const photoOpacity = useTransform(
    scrollYProgress, 
    isMobile ? [photoStart, photoStart + 0.18, 1, 2] : [photoStart, photoStart + 0.18, photoExitStart + 0.05, 1], 
    [0, 1, 1, 0]
  );
  const photoScale = useTransform(
    scrollYProgress, 
    isMobile ? [photoStart, photoStart + 0.23, 1, 2] : [photoStart, photoStart + 0.23, photoExitStart, 1], 
    isMobile ? [0.9, 1, 1, 1] : [0.9, 1, 1, 0.9]
  );
  
  // Title Animation for Mobile (to avoid visible animation on scroll up)
  const titleY = useTransform(scrollYProgress, [0, 0.15], [20, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const title2Opacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  // Parallax effect on the image itself
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section 
      ref={sectionRef} 
      id="chi-sono" 
      className="relative py-24 md:py-40 px-8 md:px-[clamp(2rem,8vw,10rem)] overflow-hidden bg-[#050505] z-10"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start max-w-7xl mx-auto">

        {/* ===== LEFT CONTENT ===== */}
        <div className="flex-1 max-w-[600px] z-20">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-10"
          >
            <span className="font-tech text-[10px] font-medium tracking-[0.4em] uppercase text-pixar-cyan/60 whitespace-nowrap">
              Il metodo
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(90deg, rgba(0,255,255,0.2), transparent)' }}
            />
          </motion.div>

          {/* Title */}
          <div className="mb-12">
            <motion.p
              style={isMobile ? { y: titleY, opacity: titleOpacity } : {}}
              initial={!isMobile ? { opacity: 0, y: 20 } : undefined}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={!isMobile ? { once: false, amount: 0.5 } : undefined}
              transition={!isMobile ? { duration: 0.8, delay: 0.1 } : undefined}
              className={`font-display text-[clamp(24px,4.5vw,48px)] font-bold uppercase tracking-wide leading-[1.05] mb-[0.15em] text-white ${isMobile ? '' : 'opacity-25'}`}
            >
              Non ti serve un sito.
            </motion.p>
            <motion.p
              style={{ 
                textShadow: '0 0 30px rgba(0,255,255,0.25)',
                ...(isMobile ? { y: titleY, opacity: titleOpacity } : {}) 
              }}
              initial={!isMobile ? { opacity: 0, y: 20 } : undefined}
              whileInView={!isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={!isMobile ? { once: false, amount: 0.5 } : undefined}
              transition={!isMobile ? { duration: 0.8, delay: 0.1 } : undefined}
              className="font-display text-[clamp(24px,4.5vw,48px)] font-bold uppercase tracking-wide leading-[1.05] text-pixar-cyan"
            >
              Ti serve un sistema.
            </motion.p>
          </div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-[clamp(14px,1.5vw,17px)] font-light leading-relaxed text-white/50 max-w-[480px] mb-10"
          >
            Ogni progetto segue lo stesso percorso.
            Tre fasi, un unico obiettivo:{' '}
            <strong className="font-medium text-white/80">farti vendere online.</strong>
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-3 py-2 px-5 rounded-full mb-12 bg-pixar-cyan/5 border border-pixar-cyan/10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-pixar-cyan shadow-[0_0_10px_#00FFFF]" />
            <span className="font-tech text-[9px] tracking-[0.3em] uppercase text-pixar-cyan/80">
              Il sistema 3V
            </span>
          </motion.div>

          {/* Steps */}
          <div className="space-y-2">
            <VStep
              num="01"
              title="isione"
              description="Studio il tuo business, il tuo mercato, i tuoi clienti. Finché non ho chiaro chi sei, a chi parli e cosa ti distingue, non tocco nulla."
              progress={scrollYProgress}
              index={0}
              isFirst
              isMobile={isMobile}
            />
            <VStep
              num="02"
              title="alore"
              description="Costruisco il sistema con cui il tuo valore si vede online. Identità, sito, contenuti. Ogni pezzo è coerente e comunica che sei credibile."
              progress={scrollYProgress}
              index={1}
              isMobile={isMobile}
            />
            <VStep
              num="03"
              title="endita"
              description="Il brand va online con una strategia precisa. Social, automazioni, contenuti. Un sistema che lavora ogni giorno per portarti clienti."
              progress={scrollYProgress}
              index={2}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* ===== RIGHT — PHOTO ===== */}
        <div className="relative shrink-0 w-full lg:w-[45%] lg:sticky lg:top-32 z-30">
          <motion.div
            style={{ 
              opacity: photoOpacity,
              scale: photoScale,
              x: photoX,
            }}
            className="relative"
          >
            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-xl bg-pixar-card border border-white/5">
              <motion.img
                src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1774028261/Senza_titolo-1_yamovm.png"
                alt="Ludovico — Innovedia"
                className="w-full h-auto block object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{ y: photoY }}
              />

              {/* Gradient overlays */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, #050505 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.3) 100%), linear-gradient(to right, rgba(0,255,255,0.05) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t border-r border-pixar-cyan/20 rounded-tr-lg" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b border-l border-pixar-cyan/20 rounded-bl-lg" />

            {/* Label */}
            <div className="absolute bottom-10 left-8 z-10">
              <p className="font-tech text-[10px] tracking-[0.4em] uppercase text-white/30 mb-1">
                Founder
              </p>
              <p className="font-display text-[clamp(20px,2.5vw,28px)] font-bold text-white/90 tracking-wider">
                Ludovico
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

