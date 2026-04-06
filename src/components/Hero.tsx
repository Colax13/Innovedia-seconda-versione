import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SRCS = [
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839205/Buoni_e-commerce_u3fsgi.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769514522/GfSERVICE_SITE_q76eod.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773848189/Logo_su_panino_tpz4ke.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773085193/Screenshot_8_u2ex4b.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769513413/Hair_Spa_sofu9v.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773089052/Screenshot_8_exvaml.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839517/social_qm63bp.jpg',
  'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839203/collegamento_ritual_hair_spa_do4mec.jpg',
];

const CARD_W = 220;
const CARD_H = 138;
const RING_R = 280;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const easeInOut = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

interface HeroProps {
  onPhaseChange: (phase: number) => void;
  skipAnimation?: boolean;
}

export default function Hero({ onPhaseChange, skipAnimation }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(skipAnimation ? 3 : 0);
  const [loaded, setLoaded] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const dotPlaceholderRef = useRef<HTMLSpanElement>(null);
  const targetPos = useRef<{x: number, y: number, r: number} | null>(null);
  const trail = useRef<{x: number, y: number, r: number}[]>([]);
  const particles = useRef<{x: number, y: number, vx: number, vy: number, size: number, op: number, life: number}[]>([]);
  const disintegrated = useRef(false);
  const loopState = useRef({
    elapsed: skipAnimation ? 10000 : 0,
    lastT: 0,
    lastPhase: 0
  });
  const stars = useRef(Array.from({ length: 150 }).map(() => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 5,
    size: 0.5 + Math.random() * 1.5
  })));
  const randomOffsets = useRef(SRCS.map(() => ({
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4,
    z: 3 + Math.random() * 6,
    rx: Math.random() * 720,
    ry: Math.random() * 720,
    rz: Math.random() * 360,
    scale: 0.1 + Math.random() * 0.2
  })));

  useEffect(() => {
    if (skipAnimation) {
      setPhase(3);
      onPhaseChange(3);
    }
  }, [skipAnimation, onPhaseChange]);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.5));
      setScrollOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (skipAnimation) {
      setLoaded(SRCS.length);
      return;
    }
    const timer = setTimeout(() => {
      setLoaded(prev => Math.max(prev, SRCS.length));
    }, 6000);

    imagesRef.current = [];
    let count = 0;
    SRCS.forEach((src) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        count++;
        setLoaded(count);
      };
      img.onerror = () => {
        count++;
        setLoaded(count);
      };
      img.src = src;
      imagesRef.current.push(img);
    });
    return () => clearTimeout(timer);
  }, [skipAnimation]);

  useEffect(() => {
    if (loaded < SRCS.length && !skipAnimation) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const CX = () => W / 2;
    const CY = () => H / 2;

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    if (skipAnimation) {
      loopState.current.elapsed = 10000;
    }

    const drawCard = (img: HTMLImageElement, x: number, y: number, rot: number, scaleX: number, scaleY: number, op: number) => {
      if (op <= 0) return;
      ctx.save();
      ctx.globalAlpha = op;
      ctx.translate(x, y);
      ctx.rotate(rot * Math.PI / 180);
      ctx.scale(scaleX, scaleY);

      const w = CARD_W, h = CARD_H;
      const r = 12;

      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2); ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      ctx.lineTo(w / 2, h / 2 - r); ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      ctx.lineTo(-w / 2 + r, h / 2); ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      ctx.lineTo(-w / 2, -h / 2 + r); ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      ctx.closePath();
      ctx.clip();

      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
      } else {
        ctx.fillStyle = '#0a0c14';
        ctx.fillRect(-w / 2, -h / 2, w, h);
      }

      const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      grad.addColorStop(0, 'rgba(255,255,255,.12)');
      grad.addColorStop(.5, 'transparent');
      grad.addColorStop(1, 'rgba(6,182,212,.08)');
      ctx.fillStyle = grad;
      ctx.fillRect(-w / 2, -h / 2, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawDot = (x: number, y: number, r: number, op: number, isTrail: boolean = false) => {
      ctx.save();
      ctx.globalAlpha = op;
      const size = r * 1.8;
      const round = size * 0.2;
      ctx.beginPath();
      ctx.moveTo(x - size / 2 + round, y - size / 2);
      ctx.lineTo(x + size / 2 - round, y - size / 2);
      ctx.quadraticCurveTo(x + size / 2, y - size / 2, x + size / 2, y - size / 2 + round);
      ctx.lineTo(x + size / 2, y + size / 2 - round);
      ctx.quadraticCurveTo(x + size / 2, y + size / 2, x + size / 2 - round, y + size / 2);
      ctx.lineTo(x - size / 2 + round, y + size / 2);
      ctx.quadraticCurveTo(x - size / 2, y + size / 2, x - size / 2, y + size / 2 - round);
      ctx.lineTo(x - size / 2, y - size / 2 + round);
      ctx.quadraticCurveTo(x - size / 2, y - size / 2, x - size / 2 + round, y - size / 2);
      if (isTrail) {
        ctx.fillStyle = `rgba(6, 182, 212, ${op * 0.5})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(6, 182, 212, ${op * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#06b6d4');
        grad.addColorStop(1, '#0284c7');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawSphere = (x: number, y: number, r: number, glow: number, morphT: number = 0, squash: number = 1) => {
      if (r <= 0) return;
      ctx.save();
      if (squash !== 1) {
        ctx.translate(x, y);
        ctx.scale(1 / Math.sqrt(squash), squash);
        ctx.translate(-x, -y);
      }
      if (morphT < 0.8) {
        for (let i = 2; i >= 0; i--) {
          const gr = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * (1.2 + i * 0.4));
          gr.addColorStop(0, `rgba(6,182,212,${glow * 0.2 / (i + 1) * (1 - morphT)})`);
          gr.addColorStop(1, 'transparent');
          ctx.fillStyle = gr;
          ctx.beginPath(); 
          ctx.ellipse(x, y, Math.max(1, r * (1.2 + i * 0.4)), Math.max(1, r * (1.2 + i * 0.4)), 0, 0, Math.PI * 2); 
          ctx.fill();
        }
      }
      if (morphT < 1) {
        const sg = ctx.createRadialGradient(x - r * 0.15, y - r * 0.15, r * 0.05, x, y, r);
        sg.addColorStop(0, `rgba(6,220,240,${1 - morphT})`);
        sg.addColorStop(0.35, `rgba(6,182,212,${0.95 * (1 - morphT)})`);
        sg.addColorStop(0.7, `rgba(2,84,180,${0.9 * (1 - morphT)})`);
        sg.addColorStop(1, `rgba(4,12,28,${0.95 * (1 - morphT)})`);
        ctx.fillStyle = sg;
        ctx.beginPath(); 
        ctx.arc(x, y, Math.max(1, r), 0, Math.PI * 2); 
        ctx.fill();
      }
      if (morphT > 0) {
        drawDot(x, y, r, clamp(morphT * 2, 0, 1));
      }
      ctx.restore();
    };

    let lastPhase = 0;

    const loop = (ts: number) => {
      if (!loopState.current.lastT) loopState.current.lastT = ts;
      const dt = ts - loopState.current.lastT; 
      loopState.current.lastT = ts;
      loopState.current.elapsed += dt;

      ctx.clearRect(0, 0, W, H);

      const ENTRY_START = 0;
      const ENTRY_DUR = 1800;
      const SUCK_START = 1800; 
      const SUCK_DUR = 1500;
      const BOUNCE_START = 3400; 
      const FALL_DUR = 250;
      const PARABOLA_DUR = 1400;

      const pEntry = clamp((loopState.current.elapsed - ENTRY_START) / ENTRY_DUR, 0, 1);
      const pSuck = clamp((loopState.current.elapsed - SUCK_START) / SUCK_DUR, 0, 1);
      const pFall = clamp((loopState.current.elapsed - BOUNCE_START) / FALL_DUR, 0, 1);
      const pParabola = clamp((loopState.current.elapsed - BOUNCE_START - FALL_DUR) / PARABOLA_DUR, 0, 1);

      const scrollY = window.scrollY;
      if (scrollY < 50) disintegrated.current = false; // Reset when back at top
      
      const getStickyY = (baseY: number, r: number) => {
        if (pParabola < 1) return baseY;
        const targetY = baseY + scrollY * 1.5; // Move down faster than scroll
        const limit = H - r - 5; 
        if (targetY >= limit) {
          // Update global impact point for the next section
          if (typeof window !== 'undefined') {
            (window as any).lastSphereX = targetPos.current?.x || CX();
          }
          if (!disintegrated.current) {
            disintegrated.current = true;
            // Initial burst
            for (let i = 0; i < 40; i++) {
              particles.current.push({
                x: (targetPos.current?.x || CX()) + (Math.random() - 0.5) * 20,
                y: limit,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 1) * 10,
                size: 1.5 + Math.random() * 3,
                op: 1,
                life: 1 + Math.random() * 0.5
              });
            }
          }
          // Continuous "leak" while at the limit - directed downwards
          if (Math.random() > 0.6) {
            particles.current.push({
              x: (targetPos.current?.x || CX()) + (Math.random() - 0.5) * 40,
              y: limit,
              vx: (Math.random() - 0.5) * 6,
              vy: 4 + Math.random() * 12, // Faster falling down
              size: 1 + Math.random() * 2.5,
              op: 0.9,
              life: 0.8 + Math.random() * 0.4
            });
          }
        }
        return Math.min(targetY, limit);
      };

      let currentPhase = 0;
      if (pParabola >= 1) currentPhase = 3;
      else if (pFall > 0) currentPhase = 2;
      else if (pSuck > 0.1) currentPhase = 1;
      
      if (currentPhase !== loopState.current.lastPhase) {
        loopState.current.lastPhase = currentPhase;
        onPhaseChange(currentPhase);
      }

      // Internal UI phase for text and video (starts at 60% of parabola)
      const uiPhase = (pParabola > 0.6) ? 3 : currentPhase;
      if (uiPhase !== phase) {
        setPhase(uiPhase);
      }

      stars.current.forEach(s => {
        const sz = (s.z - (loopState.current.elapsed * 0.0005)) % 5;
        const z = sz < 0 ? sz + 5 : sz;
        const perspective = 1 / (z + 0.1);
        const px = CX() + s.x * W * perspective;
        const py = CY() + s.y * H * perspective;
        const size = s.size * perspective;
        if (px > 0 && px < W && py > 0 && py < H) {
          const starFade = clamp(1 - pParabola * 1.5, 0, 1);
          ctx.fillStyle = `rgba(255, 255, 255, ${clamp(1 - z/5, 0, 1) * starFade})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      imagesRef.current.forEach((img, i) => {
        const off = randomOffsets.current[i];
        const delay = i * 35;
        const localEntry = clamp((loopState.current.elapsed - delay) / 2200, 0, 1);
        const localSuck = clamp((loopState.current.elapsed - SUCK_START - delay * 0.3) / 1200, 0, 1);
        const et = easeInOut(localEntry);
        const st = Math.pow(localSuck, 3); 
        const currentZ = lerp(off.z, 0, et);
        const perspective = 1 / (currentZ + 1);
        const startX = CX() + off.x * W * 1.4;
        const startY = CY() + off.y * H * 1.4;
        const orbitRadius = RING_R * (1.1 - et * 0.1) * (1 - st);
        const orbitSpeed = 0.0003 * loopState.current.elapsed + st * 0.004;
        const orbitAng = (2 * Math.PI / SRCS.length) * i + orbitSpeed;
        const targetX = CX() + Math.cos(orbitAng) * orbitRadius;
        const targetY = CY() + Math.sin(orbitAng) * orbitRadius;
        const x = lerp(startX, targetX, et);
        const y = lerp(startY, targetY, et);
        const px = CX() + (x - CX()) * perspective;
        const py = CY() + (y - CY()) * perspective;
        const rotX = lerp(off.rx, 0, et) + loopState.current.elapsed * 0.015;
        const rotY = lerp(off.ry, 0, et) + loopState.current.elapsed * 0.02;
        const rotZ = lerp(off.rz, orbitAng * 180 / Math.PI, et) + st * 720;
        const scaleBase = lerp(off.scale, 1, et) * perspective * (1 - st);
        const scaleX = Math.cos(rotY * Math.PI / 180) * scaleBase;
        const scaleY = Math.cos(rotX * Math.PI / 180) * scaleBase;
        const op = clamp(localEntry * 4, 0, 1) * (1 - st);
        drawCard(img, px, py, rotZ, scaleX, scaleY, op);
      });

      let sphereX = CX();
      let sphereY = CY();
      let sphereR = 0;
      if (loopState.current.elapsed < SUCK_START) {
        sphereR = easeInOut(pEntry) * 60;
      } else {
        sphereR = 60 + easeInOut(pSuck) * 30;
      }
      let sphereGlow = clamp(pEntry * 1.5, 0, 1) * (1 - pFall * 0.5);
      let morphT = 0; 
      let squash = 1;

      if (pFall > 0) {
        const floorY = H * 0.85;
        if (pParabola <= 0) {
          sphereY = lerp(CY(), floorY, pFall * pFall);
          squash = 1 + pFall * 0.5;
        } else {
          if (!targetPos.current && dotPlaceholderRef.current) {
            const rect = dotPlaceholderRef.current.getBoundingClientRect();
            const fontSize = Math.max(80, Math.min(window.innerWidth * 0.13, 180));
            targetPos.current = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
              r: fontSize * 0.08
            };
          }
          const { x: targetX, y: targetY, r: targetR } = targetPos.current || { x: CX(), y: CY(), r: 10 };
          const et = easeOut(pParabola); 
          sphereX = lerp(CX(), targetX, et);
          const baseLine = lerp(floorY, targetY, et);
          const arc = Math.sin(pParabola * Math.PI) * (H * 0.35); 
          sphereY = baseLine - arc;
          sphereR = lerp(90, targetR, et);
          morphT = clamp((pParabola - 0.3) * 2, 0, 1);
          if (pParabola < 0.15) {
            const s = pParabola / 0.15;
            squash = lerp(0.5, 1.2, s);
          } else {
            const s = (pParabola - 0.15) / 0.85;
            const vel = Math.cos(s * Math.PI * 0.5);
            squash = 1 + vel * 0.1;
          }
        }
        if (pParabola < 1) {
          trail.current.push({x: sphereX, y: sphereY, r: sphereR});
          if (trail.current.length > 25) trail.current.shift();
        }
      }

      const finalSphereY = getStickyY(sphereY, sphereR);

      trail.current.forEach((t, i) => {
        const op = (i / trail.current.length) * 0.4;
        const stickyTY = getStickyY(t.y, t.r);
        drawDot(t.x, stickyTY, t.r * 0.9, op, true);
      });

      if (sphereR > 1) {
        drawSphere(sphereX, finalSphereY, sphereR, sphereGlow, morphT, squash);
      }

      // Draw particles
      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= 0.02;
        p.op = clamp(p.life, 0, 1);
        
        ctx.save();
        ctx.globalAlpha = p.op;
        ctx.fillStyle = '#06b6d4';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';
        // Draw square "pixels"
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.life <= 0) {
          particles.current.splice(i, 1);
        }
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, onPhaseChange, skipAnimation]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSkip = () => {
    loopState.current.elapsed = 10000;
    setPhase(3);
    onPhaseChange(3);
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Skip Button */}
      {phase < 3 && (
        <button 
          onClick={handleSkip}
          className="absolute top-8 right-8 z-[110] text-[10px] font-tech uppercase tracking-widest text-white/40 hover:text-white transition-colors px-4 py-2 border border-white/10 rounded-full bg-black/20 backdrop-blur-sm"
        >
          Skip Intro
        </button>
      )}
      {/* Background Video */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1774396128/Web-Intro-Video-Final-Compressed_q7rkoc.mp4" type="video/mp4" />
            </video>
            {/* Subtle overlay to blend with the dark theme */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

      {/* Hero Content */}
      <AnimatePresence>
        {phase >= 2 && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={phase === 3 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
              style={{ opacity: scrollOpacity }}
              transition={{ 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-display font-black text-[clamp(80px,13vw,180px)] tracking-tight leading-none flex items-baseline text-white drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]"
            >
              <span>Innoved</span>
              <span className="relative inline-block">
                ı
                <span ref={dotPlaceholderRef} className="absolute top-[-0.15em] left-1/2 -translate-x-1/2 w-1 h-1" />
              </span>
              <span>a</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={phase === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              style={{ opacity: scrollOpacity }}
              transition={{ 
                delay: 0.6, 
                duration: 1,
                type: "spring",
                stiffness: 50,
                damping: 20
              }}
              className="text-[10px] md:text-[clamp(8px,1.2vw,14px)] font-tech font-medium tracking-[0.2em] md:tracking-[0.4em] uppercase text-white/60 mt-6 text-center leading-relaxed md:leading-normal whitespace-normal px-6 md:px-4 max-w-[300px] md:max-w-none"
            >
              Trasformo aziende in brand che vendono
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              style={{ opacity: scrollOpacity }}
              transition={{ 
                delay: 0.6, // Synchronized with "Trasformo aziende..."
                duration: 1,
                type: "spring",
                stiffness: 50,
                damping: 20
              }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-10 md:mt-12 pointer-events-auto w-full sm:w-auto px-16 sm:px-0"
            >
              <motion.button 
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "#06b6d4" },
                  hover: { backgroundColor: "#ffffff", borderColor: "#ffffff" }
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => scrollTo('lavori')}
                className="group relative h-[41px] md:h-12 px-6 md:px-10 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer border shadow-[0_0_20px_rgba(6,182,212,0.1)] w-full sm:w-auto"
              >
                <div className="relative z-10 flex h-full items-center justify-center">
                  {"Vedi i lavori".split("").map((char, i) => (
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

              <motion.button 
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: { backgroundColor: "transparent", borderColor: "rgba(255, 255, 255, 0.2)" },
                  hover: { backgroundColor: "rgba(6, 182, 212, 0.15)", borderColor: "#06b6d4" }
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => scrollTo('contatti')}
                className="group relative h-[41px] md:h-12 px-6 md:px-10 border rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer w-full sm:w-auto"
              >
                <div className="relative z-10 flex h-full items-center justify-center">
                  {"Parliamo".split("").map((char, i) => (
                    <span key={i} className="relative inline-block overflow-hidden">
                      <motion.span
                        variants={{
                          initial: { y: 0, rotateX: 0, color: "rgba(255, 255, 255, 0.6)" },
                          hover: { y: "-100%", rotateX: 90, color: "#06b6d4" }
                        }}
                        transition={{ 
                          delay: i * 0.015, 
                          duration: 0.5, 
                          ease: [0.23, 1, 0.32, 1] 
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                      <motion.span
                        variants={{
                          initial: { y: "100%", rotateX: -90, color: "#06b6d4" },
                          hover: { y: 0, rotateX: 0, color: "#06b6d4" }
                        }}
                        transition={{ 
                          delay: i * 0.015, 
                          duration: 0.5, 
                          ease: [0.23, 1, 0.32, 1] 
                        }}
                        className="absolute inset-0 inline-block"
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </div>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Hint */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          >
            <span className="text-[8px] font-semibold tracking-[0.25em] uppercase text-white/20">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 to-transparent animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loaded < SRCS.length && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050508]">
          <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
}
