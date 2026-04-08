import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

// ============================================================
// PARTICLE CANVAS
// ============================================================
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf: number;
    const COUNT = 70;
    const particles: P[] = [];

    class P {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      size!: number;
      alpha!: number;
      phase!: number;
      speed!: number;

      constructor() { this.init(); }
      init() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - .5) * .25; this.vy = (Math.random() - .5) * .25;
        this.size = .8 + Math.random() * 1.5; this.alpha = .08 + Math.random() * .2;
        this.phase = Math.random() * Math.PI * 2; this.speed = .008 + Math.random() * .015;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.phase += this.speed;
        if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) this.init();
      }
      draw() {
        if (!ctx) return;
        const a = this.alpha * (.5 + Math.sin(this.phase) * .5);
        ctx.fillStyle = `rgba(6,182,212,${a})`;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new P());

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(6,182,212,${(1 - d / 110) * .05})`;
            ctx.lineWidth = .5;
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />;
}

// ============================================================
// SCANLINE
// ============================================================
function Scanline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let y = -10, raf: number;
    function move() {
      y += .4; if (y > window.innerHeight) y = -10;
      if (ref.current) ref.current.style.transform = `translateY(${y}px)`;
      raf = requestAnimationFrame(move);
    }
    raf = requestAnimationFrame(move);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 h-px z-[9996] pointer-events-none"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.05), transparent)' }} />
  );
}

// ============================================================
// TEXT SCRAMBLE (scroll-driven)
// ============================================================
const PHRASE_A_LINES = [
  "Offline funzioni e i tuoi",
  "clienti lo sanno..."
];
const PHRASE_B_LINES = [
  "Ma online...",
  "cosa vedono di te?"
];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";

function TextScramble() {
  const elRef = useRef<HTMLDivElement>(null);
  const [posStyle, setPosStyle] = useState({ opacity: 0, top: '110%' });
  const [morphProgress, setMorphProgress] = useState(0);

  const linesA = PHRASE_A_LINES.map(line => line.split(' '));
  const linesB = PHRASE_B_LINES.map(line => line.split(' '));

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const heroEl = document.getElementById('hero');
      const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : vh;

      const transEl = document.getElementById('scramble-zone');
      if (!transEl) return;
      const transTop = transEl.offsetTop;
      const transH = transEl.offsetHeight;

      const problemsEl = document.getElementById('problems-section');
      const problemsTop = problemsEl ? problemsEl.offsetTop : transTop + transH;

      // ── PHASE 1: RISE IN ──
      const riseStart = heroBottom * 0.3;
      const riseEnd = transTop - 100;
      const riseRange = riseEnd - riseStart;

      if (scrollY < riseStart) {
        setPosStyle({ opacity: 0, top: '110%' });
        setMorphProgress(0);
        return;
      }

      // ── PHASE 2: PHRASE A RISING ──
      if (scrollY >= riseStart && scrollY < riseEnd) {
        const p = riseRange > 0 ? (scrollY - riseStart) / riseRange : 1;
        const eased = 1 - Math.pow(1 - p, 3);
        const topPercent = 110 - (eased * 60); // 110% → 50%
        const opacity = Math.min(1, p * 2.5);
        setPosStyle({ opacity: isNaN(opacity) ? 0 : opacity, top: `${topPercent}%` });
        setMorphProgress(0);
        return;
      }

      // ── PHASE 3: SCRAMBLE A → B ──
      const morphDuration = transH * 0.4;
      const unlockThreshold = vh * 0.1;
      const unlockPoint = problemsTop - (vh / 2) - unlockThreshold;

      if (scrollY >= riseEnd && scrollY < unlockPoint) {
        const prog = morphDuration > 0 ? (scrollY - riseEnd) / morphDuration : 1;
        const mp = Math.max(0, Math.min(1, prog));
        setPosStyle({ opacity: 1, top: '50%' });
        setMorphProgress(isNaN(mp) ? 0 : mp);
        return;
      }

      // ── PHASE 4: UNLOCKING ──
      if (scrollY >= unlockPoint) {
        const scrollDelta = scrollY - unlockPoint;
        const topPx = (vh / 2) - scrollDelta;
        const opacity = Math.max(0, 1 - (scrollDelta / (vh * 0.4 || 1)));
        setPosStyle({ opacity: isNaN(opacity) ? 0 : opacity, top: `${topPx}px` });
        setMorphProgress(1);
        return;
      }
    }

    function onScroll() {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const rawAlphaA = morphProgress < 0.6 ? 1 - morphProgress / 0.6 : 0;
  const alphaA = isNaN(rawAlphaA) ? 0 : rawAlphaA;
  
  const rawAlphaB = morphProgress > 0.5 ? Math.min(1, (morphProgress - 0.5) / 0.5) : 0;
  const alphaB = isNaN(rawAlphaB) ? 0 : rawAlphaB;
  const scrambleA = morphProgress;
  const scrambleB = 1 - morphProgress;

  const baseStyle = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 'clamp(24px, 5vw, 64px)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.01em',
  };

  return (
    <div
      ref={elRef}
      className="fixed left-1/2 z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 text-center px-8 w-full max-w-[1100px]"
      style={{ top: posStyle.top, opacity: posStyle.opacity, transition: 'none' }}
    >
      {/* LAYER A */}
      <div style={{ ...baseStyle, position: 'relative', opacity: alphaA, display: alphaA > 0 ? 'block' : 'none' }}>
        {linesA.map((words, i) => (
          <div key={i}>
            <ScrambleWords words={words} scrambleAmount={scrambleA} direction="out" highlightWords={['offline']} />
          </div>
        ))}
      </div>
      {/* LAYER B */}
      <div style={{
        ...baseStyle,
        position: alphaA > 0 ? 'absolute' : 'relative',
        top: alphaA > 0 ? 0 : undefined,
        left: alphaA > 0 ? 0 : undefined,
        right: alphaA > 0 ? 0 : undefined,
        opacity: alphaB,
        display: alphaB > 0 ? 'block' : 'none',
      }}>
        {linesB.map((words, i) => (
          <div key={i}>
            <ScrambleWords words={words} scrambleAmount={scrambleB} direction="in" highlightWords={['online']} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ScrambleWordsProps {
  words: string[];
  scrambleAmount: number;
  direction: 'in' | 'out';
  highlightWords?: string[];
}

// ============================================================
// SCRAMBLE WORDS RENDERER
// ============================================================
function ScrambleWords({ words, scrambleAmount, direction, highlightWords }: ScrambleWordsProps) {
  return (
    <>
      {words.map((word, wi) => {
        const cleanWord = word.replace(/[^a-zA-ZàèéìòùÀÈÉÌÒÙ]/g, '');
        const isHL = highlightWords && highlightWords.some(hw => cleanWord.toLowerCase() === hw.toLowerCase());
        const resolved = direction === 'in' ? 1 - scrambleAmount : scrambleAmount;

        return (
          <span key={wi}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap', position: 'relative' }}>
              {word.split('').map((char, ci) => {
                const idx = ci / Math.max(1, word.length - 1);
                const stagger = direction === 'out' ? idx * 0.2 : (1 - idx) * 0.2;
                const rawLocal = Math.max(0, Math.min(1, (scrambleAmount - stagger) / (1 - stagger + 0.001)));
                const local = isNaN(rawLocal) ? 0 : rawLocal;

                let display = char, color = isHL && local <= 0.05 ? '#06b6d4' : '#fff';
                let ty = 0, blur = 0, scaleY = 1, op = 1;
                let shadow = isHL && local <= 0.05 ? '0 0 20px rgba(6,182,212,0.4)' : 'none';

                if (local > 0.05) {
                  shadow = 'none';
                  if (direction === 'out') {
                    if (local < 0.4) {
                      const d = local / 0.4;
                      display = d > 0.15 ? GLYPHS[~~(Math.random() * GLYPHS.length)] : char;
                      color = `rgba(6,182,212,${0.3 + d * 0.7})`;
                      ty = d * 8; blur = d * 2; scaleY = 1 + d * 0.15;
                    } else {
                      const d = (local - 0.4) / 0.6;
                      display = GLYPHS[~~(Math.random() * GLYPHS.length)];
                      color = `rgba(6,182,212,${0.6 - d * 0.3})`;
                      ty = 8 + d * 4; blur = 2 + d * 3; op = 1 - d * 0.5; scaleY = 1.15 - d * 0.15;
                    }
                  } else {
                    if (local > 0.6) {
                      const d = (local - 0.6) / 0.4;
                      display = GLYPHS[~~(Math.random() * GLYPHS.length)];
                      color = `rgba(6,182,212,${0.3 + d * 0.4})`;
                      ty = -(d * 8); blur = d * 3; op = 0.5 + (1 - d) * 0.3; scaleY = 1 + d * 0.15;
                    } else if (local > 0.15) {
                      const d = (local - 0.15) / 0.45;
                      display = d < 0.7 ? GLYPHS[~~(Math.random() * GLYPHS.length)] : char;
                      color = isHL && d >= 0.7 ? '#06b6d4' : `rgba(6,182,212,${0.7 - d * 0.5})`;
                      ty = -(1 - d) * 5; blur = (1 - d) * 2;
                      shadow = isHL && d >= 0.7 ? '0 0 15px rgba(6,182,212,0.3)' : 'none';
                    } else {
                      display = char;
                      color = isHL ? '#06b6d4' : '#fff';
                      shadow = isHL ? '0 0 20px rgba(6,182,212,0.4)' : 'none';
                    }
                  }
                }

                return (
                  <span key={ci} style={{
                    display: 'inline-block', color, opacity: isNaN(op) ? 0 : op,
                    transform: `translateY(${isNaN(ty) ? 0 : ty}px) scaleY(${isNaN(scaleY) ? 1 : scaleY})`,
                    filter: blur > 0 && !isNaN(blur) ? `blur(${blur}px)` : 'none',
                    willChange: 'transform, opacity', textShadow: shadow,
                  }}>
                    {display}
                  </span>
                );
              })}
              {isHL && (
                <span style={{
                  position: 'absolute', bottom: '-4px', left: 0, height: '2px',
                  width: `${Math.max(0, resolved * 100)}%`,
                  background: 'linear-gradient(90deg, #06b6d4, rgba(6,182,212,0.3))',
                  boxShadow: '0 0 8px rgba(6,182,212,0.4)', borderRadius: '1px',
                }} />
              )}
            </span>
            {wi < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3em' }}>{'\u00A0'}</span>}
          </span>
        );
      })}
    </>
  );
}

interface ProblemCardProps {
  num: string;
  text: string;
  tag: string;
  delay: number;
}

// ============================================================
// PROBLEM CARD
// ============================================================
function ProblemCard({ num, text, tag, delay }: ProblemCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });
  const [entered, setEntered] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      if (scrollDirection === 'down') {
        if (!entered) {
          const timer = setTimeout(() => {
            setEntered(true);
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 80);
          }, delay);
          return () => clearTimeout(timer);
        }
      }
    } else {
      setEntered(false);
      setShowFlash(false);
    }
  }, [isInView, entered, delay, scrollDirection]);

  // Animation variants based on scroll direction
  const variants = {
    initial: { opacity: 0, x: -200, rotate: -5, scale: 1.1, filter: 'blur(8px)' },
    animateDown: {
      opacity: 1,
      x: [null, 25, -15, 8, -3, 0],
      rotate: [null, 2.5, -1.2, 0.5, -0.15, 0],
      scale: [null, 1.04, 0.98, 1.01, 1, 1],
      filter: ['blur(8px)', 'blur(1px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
    },
    animateUp: {
      opacity: isInView ? 1 : 0,
      x: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
    }
  };

  return (
    <>
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            className="fixed inset-0 z-[9997] pointer-events-none"
            style={{ background: 'rgba(6,182,212,0.04)' }}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        initial="initial"
        animate={scrollDirection === 'down' ? (entered ? "animateDown" : "initial") : "animateUp"}
        variants={variants}
        transition={scrollDirection === 'down' 
          ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
          : { opacity: { duration: 0.75, ease: 'linear' }, default: { duration: 0.25 } }
        }
        className="relative my-4"
      >
        <motion.div
          animate={entered && scrollDirection === 'down' ? { x: [0, -4, 3, -2, 1, 0], skewX: [0, -3, 2, -1, 0.5, 0] } : { x: 0, skewX: 0 }}
          transition={{ duration: 0.36, ease: 'linear', delay: 0.05 }}
          className="relative flex items-center gap-4 md:gap-10 py-4 md:py-6 px-4 md:px-8 rounded-[10px] overflow-hidden border border-pixar-cyan/[0.07] group hover:border-pixar-cyan/[0.18] hover:shadow-[0_0_30px_rgba(6,182,212,0.04),inset_0_0_30px_rgba(6,182,212,0.02)] transition-all duration-400"
          style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.04), transparent 60%)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={entered && scrollDirection === 'down' ? { opacity: 1, scaleY: 1 } : { opacity: isInView ? 1 : 0, scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute top-0 left-0 w-[3px] h-full origin-top"
            style={{ background: '#06b6d4', boxShadow: '0 0 15px #06b6d4, 0 0 40px rgba(6,182,212,0.25)' }}
          />
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={entered && scrollDirection === 'down' ? { x: '200%', opacity: [0, 0.8, 0] } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)' }}
          />
          <span className="font-tech text-[10px] md:text-[13px] text-pixar-cyan tracking-wider opacity-60 min-w-[2rem]">{num}</span>
          <span className="font-display text-[32px] md:text-[clamp(32px,6vw,72px)] font-extrabold tracking-wider uppercase text-white leading-none">{text}</span>
          <span className="ml-auto font-tech text-[9px] tracking-widest uppercase text-white/15 hidden md:block">{tag}</span>
        </motion.div>
      </motion.div>
    </>
  );
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

// ============================================================
// SOLUTION BADGE
// ============================================================
function SolutionBadge({ visible }: { visible: boolean }) {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isUp = scrollDirection === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.94 }}
      transition={{ 
        duration: isUp ? 0.3 : 1.2, 
        delay: isUp ? 0 : 0.2, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="mt-5 md:mt-10 relative"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: isUp ? 0.2 : 1, delay: isUp ? 0 : 0.1 }}
        className="mb-6 font-tech text-[10px] tracking-[0.3em] uppercase text-white/60"
      >
        ma non ti preoccupare
      </motion.p>
      <div
        className="inline-flex items-center gap-4 py-5 px-12 rounded-full border border-pixar-cyan/[0.18] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.05), rgba(157,0,255,0.03))', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1, rotate: 360 } : { opacity: 0, rotate: 0 }}
          transition={{ 
            opacity: { duration: isUp ? 0.2 : 1, delay: isUp ? 0 : 1.2 }, 
            rotate: { duration: 5, repeat: Infinity, ease: 'linear' } 
          }}
          className="absolute -inset-[2px] rounded-full -z-10"
          style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(6,182,212,0.2) 25%, transparent 50%, rgba(157,0,255,0.15) 75%, transparent 100%)' }}
        />
        <motion.div
          animate={{ boxShadow: ['0 0 12px #06b6d4, 0 0 30px rgba(6,182,212,0.3)', '0 0 20px #06b6d4, 0 0 50px rgba(6,182,212,0.5)', '0 0 12px #06b6d4, 0 0 30px rgba(6,182,212,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-2 h-2 rounded-full bg-pixar-cyan"
        />
        <span className="font-display text-[clamp(16px,2.5vw,28px)] font-bold tracking-widest uppercase text-white">
          La soluzione <span className="text-pixar-cyan" style={{ textShadow: '0 0 25px rgba(6,182,212,0.35)' }}>esiste</span>
        </span>
      </div>
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: isUp ? 0.3 : 1, delay: isUp ? 0 : 1.5 }}
        className="mt-6 md:mt-12 flex flex-col items-center gap-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <FlipButton 
            text="Richiedi un'analisi gratuita" 
            primary
            onClick={() => {
              const el = document.getElementById('contatti');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        <p className="font-tech text-[10px] tracking-[0.3em] uppercase text-white/40 animate-pulse">
          oppure scopri il nostro metodo ↓
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// MAIN EXPORT
// ============================================================
export default function BrandImpactSection() {
  const finalRef = useRef<HTMLParagraphElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const finalInView = useInView(finalRef, { once: false, amount: 0.2 });
  const bracketsInView = useInView(bracketsRef, { once: false, amount: 0.2 });

  return (
    <>
      <ParticleField />
      <Scanline />
      <TextScramble />

      {/* Scroll space for text scramble A → B */}
      <section id="scramble-zone" className="relative h-[80vh] md:h-[160vh]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div className="absolute left-0 right-0 h-px bg-pixar-cyan" style={{ top: '25%' }} />
          <div className="absolute left-0 right-0 h-px bg-pixar-cyan" style={{ top: '50%' }} />
          <div className="absolute left-0 right-0 h-px bg-pixar-cyan" style={{ top: '75%' }} />
          <div className="absolute top-0 bottom-0 w-px bg-pixar-cyan" style={{ left: '20%' }} />
          <div className="absolute top-0 bottom-0 w-px bg-pixar-cyan" style={{ left: '50%' }} />
          <div className="absolute top-0 bottom-0 w-px bg-pixar-cyan" style={{ left: '80%' }} />
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.06), transparent)' }} />

      {/* Problems */}
      <section id="problems-section" className="relative min-h-[60vh] md:min-h-screen flex flex-col justify-center px-8 md:px-[clamp(2rem,8vw,10rem)] py-4 md:py-12 overflow-hidden">
        <div className="flex items-center gap-8 mb-4 md:mb-16">
          <span className="font-tech text-[10px] tracking-[0.4em] uppercase text-pixar-cyan/50 whitespace-nowrap">Il problema</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.15), transparent)' }} />
        </div>

        <ProblemCard num="01" text="Sito confuso" tag="— nessuna direzione" delay={0} />
        <ProblemCard num="02" text="Social casuali" tag="— zero strategia" delay={150} />
        <ProblemCard num="03" text="Immagine debole" tag="— brand invisibile" delay={300} />
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.06), transparent)' }} />

      {/* Final */}
      <section className="relative min-h-[80vh] md:min-h-screen flex flex-col justify-center items-center px-8 py-5 md:py-16 text-center overflow-hidden">
        {/* Corner brackets */}
        <motion.div
          ref={bracketsRef}
          initial={{ opacity: 0 }}
          animate={bracketsInView ? { opacity: 0.06 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-[12%] left-[6%] w-[60px] h-[60px] border border-pixar-cyan border-r-0 border-b-0" />
          <div className="absolute top-[12%] right-[6%] w-[60px] h-[60px] border border-pixar-cyan border-l-0 border-b-0" />
          <div className="absolute bottom-[12%] left-[6%] w-[60px] h-[60px] border border-pixar-cyan border-r-0 border-t-0" />
          <div className="absolute bottom-[12%] right-[6%] w-[60px] h-[60px] border border-pixar-cyan border-l-0 border-t-0" />
        </motion.div>

        <motion.p
          ref={finalRef}
          initial={{ opacity: 0, y: 50 }}
          animate={finalInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-sans text-[clamp(18px,3vw,36px)] font-light leading-relaxed text-white/60 max-w-[750px] mt-6 md:mt-12"
        >
          Se non sei <span className="text-pixar-cyan" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>credibile</span> online,<br />
          perdi <strong className="font-semibold text-white">fiducia</strong> prima ancora<br />
          di parlare con il cliente.
        </motion.p>

        <SolutionBadge visible={finalInView} />
      </section>

      <div className="h-[4vh]" />
    </>
  );
}
