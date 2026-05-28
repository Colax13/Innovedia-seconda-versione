import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { projects } from '../data/projects';
import OptimizedImage from './OptimizedImage';

const MotionOptimizedImage = motion(OptimizedImage);

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
  const isVideo = project.category === "Video";
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [isMuted, setIsMuted] = useState(true);

  // Cloudinary video optimization (avif/webm + q_auto)
  const optVideoSrc = project.videoSrc 
    ? project.videoSrc.replace('/video/upload/', '/video/upload/f_auto,q_auto/') 
    : project.videoSrc;

  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isVideo]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

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
          background: "rgba(5, 11, 20, 0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
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
        {isVideo ? (
          <div style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer"
          }} className="group" onClick={togglePlay}>
            <motion.video
              ref={videoRef}
              src={optVideoSrc ? `${optVideoSrc}#t=0.001` : (project.img || project.coverImage)}
              poster={project.img || project.coverImage}
              preload="metadata"
              muted={isMuted}
              loop
              playsInline
              animate={{
                scale: hovered ? 1.05 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1]
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Play mask for playing/pausing overlay */}
            {(!isPlaying || !isActive) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                 <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                   <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-white ml-1"></div>
                 </div>
              </div>
            )}
            
            {/* Volume Toggle */}
            {isActive && (
              <button
                onClick={toggleMute}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}
            
            {/* Decorative category label */}
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 z-10 pointer-events-none">
              <span className="font-tech text-[0.55rem] font-bold tracking-[0.15em] text-white uppercase">{project.detail?.client || 'VIDEO'}</span>
            </div>
          </div>
        ) : (
          <>
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
            background: "linear-gradient(to bottom, transparent 40%, rgba(5,11,20,0.6) 80%, rgba(5,11,20,0.95) 100%)",
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
        </>
        )}

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
  totalCards: number;
  key?: React.Key;
}

const Card = React.memo(({ item, index, offsetSpring, isActive, isMobile, totalCards }: CardProps) => {
  const p = useTransform(offsetSpring, (off: number) => {
    let rawP = index - off;
    return rawP - totalCards * Math.round(rawP / totalCards);
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

function ProjectCarousel({
  id,
  subtitle,
  title,
  data,
  showFilter = false,
  categories = [],
  descriptionRight
}: {
  id: string;
  subtitle: string;
  title: string;
  data: any[];
  showFilter?: boolean;
  categories?: string[];
  descriptionRight?: string;
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeFilter, setActiveFilter] = useState(categories[0] || "Tutti");

  const filteredData = data.filter(p => {
    if (!showFilter) return true;
    if (activeFilter === "Tutti") return true;
    return (
      (p.category && p.category.toLowerCase().includes(activeFilter.toLowerCase())) || 
      (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(activeFilter.toLowerCase())))
    );
  });

  const N = filteredData.length || 1; // Fallback to avoid div by zero

  useEffect(() => {
    setOffset(0);
  }, [activeFilter]);

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
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[110vh] overflow-hidden bg-transparent flex flex-col items-center pt-5 md:pt-12 pb-16 md:pb-24 px-4 select-none mb-6 md:mb-12"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-7xl mx-auto mb-5 md:mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end border-b border-white/10 pb-4 md:pb-6"
      >
        <div>
          <span className="font-sans text-[#00E5FF] text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">
            {subtitle}
          </span>
          <h2 className="font-display font-bold text-[2.5rem] leading-tight md:text-5xl uppercase tracking-tighter text-white max-w-2xl">
            {title}
          </h2>
        </div>
        {descriptionRight && (
          <div className="hidden md:block max-w-md text-right text-gray-400 font-sans text-sm font-light leading-relaxed relative z-20">
            {descriptionRight}
          </div>
        )}
        {showFilter && categories.length > 0 && (
          <div className="hidden md:flex flex-col items-end gap-3 z-20 relative">
            <p className="text-gray-400 font-sans text-right text-xs uppercase tracking-widest mb-1">
              Filtra per categoria:
            </p>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeFilter === cat 
                      ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'bg-white/5 text-white hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
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
          {filteredData.length === 0 ? (
            <div className="text-white/50 font-sans text-sm tracking-widest uppercase">Nessun progetto trovato.</div>
          ) : (
            filteredData.map((item, i) => {
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
                  totalCards={N}
                />
              );
            })
          )}
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

      <div className="mt-24 md:mt-12 flex flex-col items-center gap-8 md:gap-10">
        <div className="flex items-center gap-3">
          {filteredData.map((_, i) => (
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
      </div>
    </motion.section>
  );
}

export default function ProjectSection() {
  const webProjects = projects.filter(p => p.id < 100);
  const videoProjects = projects.filter(p => p.id >= 100);

  return (
    <>
      {/* Visual Divider / Stacco */}
      <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center bg-[#050B14] z-20 shadow-[0_30px_60px_rgba(5,11,20,1)] border-b border-white/5">
         <div className="w-px h-24 md:h-32 bg-gradient-to-b from-[#00E5FF]/0 via-[#00E5FF] to-[#00E5FF]/0 animate-pulse"></div>
         <div className="my-6 md:my-8 flex items-center gap-4 text-[#00E5FF]/50 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] font-tech font-bold text-center px-4">
            <div className="w-8 md:w-12 h-px bg-[#00E5FF]/30"></div>
            ESPLORA LE MIE CREAZIONI
            <div className="w-8 md:w-12 h-px bg-[#00E5FF]/30"></div>
         </div>
      </div>

      {/* Portfolio Progetti Section */}
      <div className="w-full flex flex-col relative z-20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="sticky top-0 w-full h-screen">
             <picture className="w-full h-full block">
                <source
                  media="(min-width: 768px)"
                  srcSet="https://res.cloudinary.com/dcmd1ukvx/image/upload/f_auto,q_auto,w_1920/v1779229305/22047c79-f69d-4dd2-8716-63361481a40f_ww9k5d.png"
                />
                <img
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/f_auto,q_auto,w_800/v1779915062/1ee18e70-7e9b-4ed4-8348-b35ec129788b_szqcwm.png"
                  alt="Portfolio Progetti Background"
                  className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale object-top"
                />
             </picture>
            {/* Dark opacity overlay to blend with the app */}
            <div className="absolute inset-0 bg-[#050B14]/85 backdrop-blur-[2px]"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#050B14] to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050B14] to-transparent"></div>
          </div>
        </div>

        <div className="w-full flex flex-col relative z-10">
          <ProjectCarousel 
            id="lavori"
            subtitle="LAVORI DI CUI VADO FIERO"
            title="Portfolio Progetti"
            data={webProjects}
            showFilter={true}
            categories={["Tutti", "Web Design", "Brand Identity"]}
          />
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-30"></div>

      {/* Portfolio Video Section */}
      <div className="w-full flex flex-col relative z-20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="sticky top-0 w-full h-screen">
             <picture className="w-full h-full block">
                <source
                  media="(min-width: 768px)"
                  srcSet="https://res.cloudinary.com/dcmd1ukvx/image/upload/f_auto,q_auto,w_1920/v1779914776/eae9364b-4b3b-4702-9f3c-e874ae494c83_dk0wzw.png"
                />
                <img
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/f_auto,q_auto,w_800/v1779915049/a701991e-50ab-4e84-9099-2f7f9528a485_zrhx13.png"
                  alt="Portfolio Video Background"
                  className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale object-top"
                />
             </picture>
            <div className="absolute inset-0 bg-[#050B14]/85 backdrop-blur-[2px]"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#050B14] to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050B14] to-transparent"></div>
          </div>
        </div>

        <div className="w-full flex flex-col relative z-10 pt-10">
          <ProjectCarousel 
            id="video"
            subtitle="I MIEI MIGLIORI VIDEO"
            title="Portfolio Video"
            data={videoProjects}
            showFilter={false}
            descriptionRight="Alcuni dei miei migliori video che mostrano le capacità di ripresa ed editing realizzati per alcuni dei miei clienti"
          />
        </div>
      </div>
    </>
  );
}
