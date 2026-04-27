import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { projects } from '../data/projects';
import OptimizedImage from './OptimizedImage';

const MotionOptimizedImage = motion(OptimizedImage);

// ── DATA ──────────────────────────────────────────────────────────────
const DATA = projects;
const N = DATA.length;

// ── SUB-COMPONENTS ────────────────────────────────────────────────────

const NeonCard = React.memo(({ project, onMouseEnter, onMouseLeave, isActive, isMobile }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [arrowDelayed, setArrowDelayed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const navigate = useNavigate();
  
  const isVisualActive = isActive;

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isActive && !isMobile) {
      startLoop();
    } else {
      stopLoop();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, isMobile]);

  const startLoop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const loop = () => {
      cur.current.x = lerp(cur.current.x, target.current.x, 0.1);
      cur.current.y = lerp(cur.current.y, target.current.y, 0.1);
      setTilt({ ...cur.current });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  const stopLoop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    target.current = { x: 0, y: 0 };
    const ease = () => {
      cur.current.x = lerp(cur.current.x, 0, 0.09);
      cur.current.y = lerp(cur.current.y, 0, 0.09);
      setTilt({ ...cur.current });
      if (Math.abs(cur.current.x) > 0.05 || Math.abs(cur.current.y) > 0.05)
        rafRef.current = requestAnimationFrame(ease);
    };
    rafRef.current = requestAnimationFrame(ease);
  };

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.current = {
      x: ((y - rect.height / 2) / rect.height) * -5,
      y: ((x - rect.width / 2) / rect.width) * 5,
    };
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const c = project.color || "#00E5FF";
  const tags = project.tags ? project.tags.slice(0, 2) : [];

  useEffect(() => {
    if (isMobile && isActive) {
      const t = setTimeout(() => setArrowDelayed(true), 600);
      return () => clearTimeout(t);
    } else {
      setArrowDelayed(false);
    }
  }, [isMobile, isActive]);

  return (
    <div style={{ perspective: 1000, flexShrink: 0, width: "100%", height: "100%" }}>
      <div
        ref={cardRef}
        onMouseEnter={() => {
          setHovered(true);
          if (onMouseEnter) onMouseEnter();
        }}
        onMouseLeave={() => {
          setHovered(false);
          if (onMouseLeave) onMouseLeave();
        }}
        onMouseMove={onMove}
        style={{
          position: "relative",
          width: "100%", height: "100%",
          borderRadius: "1.5rem",
          overflow: "hidden",
          background: "#08080C",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isVisualActive ? 1.02 : 1}) translateY(${entered ? 0 : 40}px)`,
          opacity: entered ? 1 : 0,
          transition: entered
            ? `box-shadow .4s, border-color .4s, ${isVisualActive ? '' : 'transform .6s cubic-bezier(.23,1,.32,1)'}`
            : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease",
          border: `1px solid ${isVisualActive ? c : "rgba(255,255,255,0.15)"}`,
          boxShadow: isVisualActive
            ? `0 0 40px ${c}66, 0 10px 40px rgba(0,0,0,0.85)`
            : "0 10px 30px rgba(0,0,0,0.6)",
          willChange: "transform, opacity",
        }}
      >
        <div style={{
          width: "100%",
          height: "58%",
          position: "relative",
          overflow: "hidden",
        }}>
          <MotionOptimizedImage
            src={project.img}
            alt={project.title}
            animate={{
              scale: hovered ? 1.15 : (isVisualActive ? 1.1 : 1),
              x: hovered ? (glowPos.x - 50) * 0.2 : 0,
              y: hovered ? (glowPos.y - 50) * 0.2 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.5
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: project.id === 5 ? 'right' : 'center',
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, #0a0a0a 100%)",
          }} />
        </div>

        <div style={{
          width: "100%",
          height: "42%",
          padding: isMobile ? "1rem" : "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}>
          <div>
            <span className="font-tech" style={{
              fontSize: isMobile ? "0.55rem" : "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: c,
              display: "block",
              marginBottom: isMobile ? "0.2rem" : "0.4rem",
            }}>
              {project.category}
            </span>
            <h3 className="font-display" style={{
              fontSize: isMobile ? "1.5rem" : "clamp(1.5rem, 2.5vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1,
              color: isVisualActive ? "#fff" : "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: isMobile ? "0.3rem" : "0.5rem",
              transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              transform: isVisualActive ? "translateY(0)" : "translateY(10px)",
            }}>
              {project.title}
            </h3>
            <p className="font-sans" style={{
              fontSize: isMobile ? "0.7rem" : "0.85rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {project.sfida || project.subtitle}
            </p>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "0.1rem" : "0.2rem",
          }}>
            <div style={{ display: "flex", gap: isMobile ? "0.2rem" : "0.4rem" }}>
              {tags.map((tag: string) => (
                <span key={tag} className="font-sans" style={{
                  fontSize: isMobile ? "0.5rem" : "0.6rem",
                  fontWeight: 600,
                  padding: isMobile ? "0.15rem 0.4rem" : "0.2rem 0.6rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <motion.div 
              initial={false}
              animate={{ 
                rotate: isVisualActive ? 315 : 360,
                scale: isVisualActive && (!isMobile || arrowDelayed) ? 1.2 : 1,
                opacity: isVisualActive && isMobile && !arrowDelayed ? 0 : 1,
                y: isVisualActive && isMobile && !arrowDelayed ? 10 : 0
              }}
              whileHover={{ 
                rotate: isVisualActive ? 315 : 360,
                scale: 1.2
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/progetto/${project.id}`);
              }}
              transition={{
                rotate: { duration: 0.4, ease: "circInOut" },
                scale: { duration: 0.2 },
                opacity: { duration: 0.3 },
                y: { duration: 0.3 }
              }}
              style={{
                width: isMobile ? "1.8rem" : "2.2rem",
                height: isMobile ? "1.8rem" : "2.2rem",
                borderRadius: "50%",
                background: isVisualActive ? c : "transparent",
                border: `1px solid ${isVisualActive ? c : "rgba(255,255,255,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isVisualActive ? "#000" : "#fff",
                boxShadow: isVisualActive ? `0 0 20px ${c}66` : "none",
                transform: isVisualActive ? "rotate(-45deg)" : "none",
                willChange: "transform",
                cursor: "pointer",
              }}
            >
              <svg width={isMobile ? "10" : "14"} height={isMobile ? "10" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </div>
        </div>

        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: isVisualActive 
            ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${c}15 0%, transparent 70%)`
            : "none",
          zIndex: 1,
        }} />
      </div>
    </div>
  );
});

interface CardProps {
  item: any;
  index: number;
  offsetSpring: any;
  isActive: boolean;
  isMobile: boolean;
  key?: React.Key;
}

const Card = React.memo(({ item, index, offsetSpring, isActive, isMobile }: CardProps) => {
  const p = useTransform(offsetSpring, (off: number) => {
    let rawP = index - off;
    return rawP - N * Math.round(rawP / N);
  });

  const x = useTransform(p, (val: number) => {
    const abs = Math.abs(val);
    const sign = val < 0 ? -1 : 1;
    
    // Responsive spacing
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 390;
    const baseSpacing = isMobile ? (screenW - 40) : 480;
    const secondarySpacing = isMobile ? (screenW * 0.6) : 360;
    const outerSpacing = isMobile ? (screenW * 0.5) : 300;

    if (abs <= 1) return val * baseSpacing;
    if (abs <= 2) return sign * (baseSpacing + (abs - 1) * secondarySpacing);
    return sign * (baseSpacing + secondarySpacing + (abs - 2) * outerSpacing);
  });

  const rotY = useTransform(p, (val: number) => {
    const abs = Math.abs(val);
    const sign = val < 0 ? -1 : 1;
    // Progressive rotation: stay flat in the center, tilt sharply at the edges
    if (abs <= 0.5) return 0;
    if (abs <= 1.5) return -(sign * (abs - 0.5) * 25);
    if (abs <= 2.5) return -(sign * (25 + (abs - 1.5) * 45));
    return -(sign * (70 + (abs - 2.5) * 20));
  });

  const z = useTransform(p, (val: number) => -(Math.abs(val) * 250));
  const scale = useTransform(p, (val: number) => 1 - Math.abs(val) * 0.12);
  
  // LIMIT TO 7 CARDS: Only show cards within a distance of 3.5 from center
  const opacity = useTransform(p, (val: number) => {
    const abs = Math.abs(val);
    if (abs > 3.5) return 0; // Hide completely beyond 3.5
    if (abs > 3) return (3.5 - abs) * 2; // Smooth fade out between 3 and 3.5
    return 1 - abs * 0.12; // Normal visibility for the 7 main cards
  });

  const zIndex = useTransform(p, (val: number) => Math.round(500 - Math.abs(val) * 100));
  const pointerEvents = useTransform(p, (val: number) => Math.abs(val) > 3.2 ? 'none' : 'auto');

  return (
    <motion.div
      className="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        width: isMobile ? "calc(100vw - 80px)" : "380px",
        height: isMobile ? "420px" : "500px",
        x,
        z,
        rotateY: rotY,
        scale,
        opacity,
        zIndex,
        pointerEvents,
      }}
    >
      <NeonCard 
        project={item} 
        isActive={isActive}
        isMobile={isMobile}
      />
    </motion.div>
  );
});

// ── MAIN EXPORT ───────────────────────────────────────────────────────

export default function ProjectSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [offset, setOffset] = useState(0);
  const offsetSpring = useSpring(0, { stiffness: 120, damping: 20 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    offsetSpring.set(offset);
  }, [offset, offsetSpring]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startOffset.current = offset;
    lastX.current = e.clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const x = e.clientX;
    const now = Date.now();
    const dt = now - lastTime.current || 1;
    velocity.current = (x - lastX.current) / dt;
    
    const dx = x - startX.current;
    const dragFactor = isMobile ? 120 : 220;
    setOffset(startOffset.current - dx / dragFactor);
    
    lastX.current = x;
    lastTime.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    
    const target = Math.round(offset - velocity.current * 12 / 180);
    setOffset(target);
  };

  const goTo = (index: number) => {
    const currentBase = Math.round(offset / N) * N;
    let best = index + currentBase;
    let minD = Math.abs(best - offset);
    
    for (let k = -1; k <= 1; k++) {
      const candidate = index + (Math.round(offset / N) + k) * N;
      const d = Math.abs(candidate - offset);
      if (d < minD) {
        minD = d;
        best = candidate;
      }
    }
    setOffset(best);
  };

  const prev = () => {
    setOffset(Math.round(offset) - 1);
  };

  const next = () => {
    setOffset(Math.round(offset) + 1);
  };

  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime.current < 400) return;
        
        if (Math.abs(e.deltaY) > 10) {
          lastScrollTime.current = now;
          if (e.deltaY > 0) {
            next();
          } else {
            prev();
          }
        }
      }
    };

    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => window.removeEventListener('wheel', handleWheel);
  }, [offset, isMobile]);

  const currentIndex = ((Math.round(offset) % N) + N) % N;

  return (
      <motion.section 
      id="lavori"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[125vh] md:min-h-[115vh] overflow-hidden bg-[#020205] flex flex-col items-center pt-24 pb-16 md:pb-24 px-4 select-none"
    >
      {/* Cinematic Background Lighting - Site Style */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-400/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-400/10 blur-[160px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-7xl mx-auto mb-24 md:mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end border-b border-white/10 pb-8"
      >
        <div>
          <span className="font-sans text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">
            PORTFOLIO
          </span>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter text-white">
            Progetti
          </h2>
        </div>
        <p className="hidden md:block text-gray-400 font-sans max-w-sm text-right text-sm leading-relaxed">
          Una selezione di lavori che raccontano la mia visione e il mio impegno per l'eccellenza digitale.
        </p>
      </motion.div>

      <div className="relative w-full flex-1 flex items-center justify-center min-h-[450px] md:min-h-[550px]">
        {/* Left Arrow */}
        <div className="hidden md:block absolute left-4 lg:left-12 z-50">
          <motion.button 
            onClick={prev}
            whileHover={{ rotate: -360, scale: 1.2 }}
            transition={{ rotate: { duration: 0.4, ease: "circInOut" }, scale: { duration: 0.2 } }}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-transparent border border-[#00E5FF]/60 hover:bg-[#00E5FF] hover:text-black text-[#00E5FF] transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </motion.button>
        </div>

        <div 
          className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-visible flex items-center justify-center"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%', touchAction: 'pan-y' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {DATA.map((item, i) => {
            // Only render cards that are within a reasonable distance from the current offset
            // to improve performance (virtualization-like behavior)
            const diff = Math.abs(i - (offset % N + N) % N);
            const isNear = diff <= 3 || diff >= N - 3;
            if (!isNear) return null;

            return (
              <Card 
                key={item.id} 
                item={item} 
                index={i} 
                offsetSpring={offsetSpring} 
                isActive={currentIndex === i}
                isMobile={isMobile}
              />
            );
          })}
        </div>

        {/* Right Arrow */}
        <div className="hidden md:block absolute right-4 lg:right-12 z-50">
          <motion.button 
            onClick={next}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ rotate: { duration: 0.4, ease: "circInOut" }, scale: { duration: 0.2 } }}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-transparent border border-[#00E5FF]/60 hover:bg-[#00E5FF] hover:text-black text-[#00E5FF] transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      <div className="mt-24 md:mt-12 mb-8 md:mb-12 flex flex-col items-center gap-8 md:gap-10">
        <div className="flex items-center gap-3">
          {DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`cursor-pointer rounded-full transition-all duration-500 ease-out ${
                i === currentIndex 
                  ? 'w-10 h-2 bg-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.9)]' 
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Tutti i lavori button - Hero Style */}
        <motion.button 
          initial="initial"
          whileHover="hover"
          variants={{
            initial: { backgroundColor: "rgba(255, 255, 255, 0.12)", borderColor: "#00E5FF" },
            hover: { backgroundColor: "#ffffff", borderColor: "#ffffff" }
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          onClick={() => navigate('/lavori')} 
          className="group relative h-[41px] md:h-12 px-8 md:px-12 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer border shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        >
          <div className="relative z-10 flex h-full items-center justify-center">
            {"Tutti i lavori".split("").map((char, i) => (
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
      </div>
    </motion.section>
  );
}
