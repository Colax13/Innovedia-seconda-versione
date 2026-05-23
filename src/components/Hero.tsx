import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

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

const CARD_W = 154; // reduced by 30% from 220
const CARD_H = 96;  // reduced by 30% from 138
const RING_R = 280;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const easeInOut = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

const GLITCH_CHARS = '01#%@&?*+_=-[]{}';
const scrambleString = (str: string, p: number): string => {
  if (p >= 1) return str;
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === ' ' || char === '\n') {
      res += char;
      continue;
    }
    const charProgress = i / str.length;
    if (p > charProgress) {
      res += char;
    } else {
      res += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
  }
  return res;
};

interface HeroProps {
  onPhaseChange: (phase: number) => void;
  skipAnimation?: boolean;
}

export default function Hero({ onPhaseChange, skipAnimation }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(skipAnimation ? 3 : 0);
  const [loaded, setLoaded] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  
  // Custom scroll mapping for hero fade-out (moves up out of frame)
  const heroContentY = useTransform(scrollY, [0, 800], [0, -300]);
  const heroContentScale = useTransform(scrollY, [0, 800], [1, 0.90]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [1, 0.1, 0.05, 0]);
  const heroContentBlur = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(10px)"]);
  const bgImageOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  const [isPostHeroActive, setIsPostHeroActive] = useState(false);
  const postHeroFinished = useRef(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // We no longer lock the scroll. We just check if the hero is active based on scroll and elapsed time
      if (window.scrollY > 30 && loopState.current.elapsed > 3500) {
        if (!sequenceTriggered.current) {
          sequenceTriggered.current = true;
          setIsPostHeroActive(true);
        }
      } else if (window.scrollY <= 30 && sequenceTriggered.current) {
        sequenceTriggered.current = false;
        setIsPostHeroActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const dotPlaceholderRef = useRef<HTMLSpanElement>(null);
  const mobileDotPlaceholderRef = useRef<HTMLSpanElement>(null);
  const targetPos = useRef<{x: number, y: number, r: number} | null>(null);
  const trail = useRef<{x: number, y: number, r: number, op?: number, age?: number}[]>([]);
  const particles = useRef<{x: number, y: number, vx: number, vy: number, size: number, op: number, life: number}[]>([]);
  const disintegrated = useRef(false);
  
  // Custom scroll refs
  const targetSp = useRef(0);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const phrase3Ref = useRef<HTMLDivElement>(null);
  const punch1Ref = useRef<HTMLDivElement>(null);
  const punch2Ref = useRef<HTMLDivElement>(null);
  const sequenceTriggered = useRef(false);
  const animTime = useRef(0);
  const splash1Triggered = useRef(false);
  const splash2Triggered = useRef(false);
  const waves = useRef([
    { active: false, x: 0, y: 0, width: 0, opacity: 1, age: 0 },
    { active: false, x: 0, y: 0, width: 0, opacity: 1, age: 0 }
  ]);

  const loopState = useRef({
    elapsed: skipAnimation ? 10000 : 0,
    lastT: 0,
    lastPhase: 0,
    smoothStep: skipAnimation ? 5 : 0,
    lastSmoothSp: skipAnimation ? 1.0 : 0
  });
  const stars = useRef(Array.from({ length: 150 }).map(() => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    z: Math.random() * 5,
    size: 0.5 + Math.random() * 1.5
  })));
  const randomOffsets = useRef(SRCS.map(() => ({
    x: 4 + Math.random() * 2, // entering from the side (right)
    y: (Math.random() - 0.5) * 2, 
    z: 3 + Math.random() * 6,
    rx: Math.random() * 180 - 90,
    ry: Math.random() * 180 - 90,
    rz: Math.random() * 90 - 45,
    scale: 0.1 + Math.random() * 0.2
  })));

  useEffect(() => {
    if (skipAnimation) {
      setPhase(3);
      onPhaseChange(3);
    }
  }, [skipAnimation, onPhaseChange]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('no-snap');
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight || 1;
      const opacity = Math.max(0, 1 - window.scrollY / (vh * 0.5));
      setScrollOpacity(isNaN(opacity) ? 0 : opacity);
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

    const isMobile = window.innerWidth < 768;

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

    const drawCard = (img: HTMLImageElement, x: number, y: number, rot: number, scaleX: number, scaleY: number, op: number, blur: number = 0) => {
      if (op <= 0) return;
      ctx.save();
      ctx.globalAlpha = op;
      if (blur > 0.1) {
        ctx.filter = `blur(${blur}px)`;
      } else {
        ctx.filter = 'none';
      }
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
      grad.addColorStop(1, 'rgba(0,229,255,.12)');
      ctx.fillStyle = grad;
      ctx.fillRect(-w / 2, -h / 2, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,.25)';
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
        ctx.fillStyle = `rgba(0, 229, 255, ${op * 0.6})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(0, 229, 255, ${op * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#00E5FF');
        grad.addColorStop(1, '#00B4D8');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0, 229, 255, 0.9)';
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawSphere = (x: number, y: number, r: number, glow: number, morphT: number = 0, squash: number = 1, dirAngle: number = -Math.PI / 2, opacity: number = 1, stretchX: number = 1) => {
      if (r <= 0) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      
      if (squash !== 1 || stretchX !== 1) {
        // Rotate so squash applies along the correct axis
        ctx.rotate(dirAngle);
        ctx.scale((1 / Math.sqrt(squash)) * stretchX, squash);
        ctx.rotate(-dirAngle);
      }
      
      ctx.rotate(dirAngle);
      
      // Now the "front" of movement is facing RIGHT (angle 0)
      if (morphT < 0.8) {
        for (let i = 2; i >= 0; i--) {
          const gr = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r * (1.2 + i * 0.4));
          gr.addColorStop(0, `rgba(0, 229, 255, ${glow * 0.3 / (i + 1) * (1 - morphT)})`);
          gr.addColorStop(1, 'transparent');
          ctx.fillStyle = gr;
          ctx.beginPath(); 
          ctx.ellipse(0, 0, Math.max(1, r * (1.2 + i * 0.4)), Math.max(1, r * (1.2 + i * 0.4)), 0, 0, Math.PI * 2); 
          ctx.fill();
        }
      }
      if (morphT < 1) {
        // The highlight is shifted to the right (r * 0.15, 0)
        const sg = ctx.createRadialGradient(r * 0.2, 0, r * 0.05, 0, 0, r);
        sg.addColorStop(0, `rgba(180, 245, 255, ${1 - morphT})`);
        sg.addColorStop(0.35, `rgba(0, 229, 255, ${0.98 * (1 - morphT)})`);
        sg.addColorStop(0.7, `rgba(0, 150, 255, ${0.95 * (1 - morphT)})`);
        sg.addColorStop(1, `rgba(2, 8, 20, ${0.98 * (1 - morphT)})`);
        ctx.fillStyle = sg;
        ctx.beginPath(); 
        ctx.arc(0, 0, Math.max(1, r), 0, Math.PI * 2); 
        ctx.fill();
      }
      
      ctx.restore();
      
      // Fixed dot in center ignores rotation
      if (morphT > 0) {
        drawDot(x, y, r, clamp(morphT * 2, 0, 1) * opacity);
      }
    };

    const evaluateBezier = (p0: {x:number, y:number}, p1: {x:number, y:number}, p2: {x:number, y:number}, p3: {x:number, y:number}, t: number) => {
      const u = 1 - t;
      const x = u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x;
      const y = u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y;
      
      const dx = 3*u*u*(p1.x - p0.x) + 6*u*t*(p2.x - p1.x) + 3*t*t*(p3.x - p2.x);
      const dy = 3*u*u*(p1.y - p0.y) + 6*u*t*(p2.y - p1.y) + 3*t*t*(p3.y - p2.y);
      return { x, y, vx: dx, vy: dy };
    };

    const loop = (ts: number) => {
      if (!loopState.current.lastT) loopState.current.lastT = ts;
      const dt = ts - loopState.current.lastT; 
      loopState.current.lastT = ts;
      loopState.current.elapsed += dt;

      ctx.clearRect(0, 0, W, H);

      const ENTRY_START = 0;
      const ENTRY_DUR = 1800;
      
      const GROUP_START = 2200; 
      const GROUP_DUR = 1000;

      const EXIT_START = 3600;
      const EXIT_DUR = 800;

      const BOUNCE_START = 4200; 
      const PARABOLA_DUR = 1700;

      const pEntry = clamp((loopState.current.elapsed - ENTRY_START) / ENTRY_DUR, 0, 1);
      const pGroup = clamp((loopState.current.elapsed - GROUP_START) / GROUP_DUR, 0, 1);
      const pExit = clamp((loopState.current.elapsed - EXIT_START) / EXIT_DUR, 0, 1);
      const pParabola = clamp((loopState.current.elapsed - BOUNCE_START) / PARABOLA_DUR, 0, 1);

      const scrollY = window.scrollY;
      let targetStep = 0;
      if (isMobile) {
          if (scrollY < H * 0.5) targetStep = 0;
          else if (scrollY < H * 1.5) targetStep = 1;
          else if (scrollY < H * 2.5) targetStep = 2;
          else if (scrollY < H * 3.5) targetStep = 3;
          else if (scrollY < H * 4.5) targetStep = 4;
          else targetStep = 5;

          // Unlock scrolling on mobile when the last phrase enters (targetStep >= 4, which is scrollY >= H * 3.5)
          if (scrollY >= H * 3.5) {
              document.documentElement.classList.add('no-snap');
          } else {
              document.documentElement.classList.remove('no-snap');
          }
      } else {
          // Always normal scrolling on desktop
          document.documentElement.classList.add('no-snap');
          if (scrollY < H * 0.15) {
              targetStep = 0;
          } else if (scrollY < H * 0.6) {
              targetStep = 1;
          } else if (scrollY < H * 1.05) {
              targetStep = 2;
          } else if (scrollY < H * 1.5) {
              targetStep = 3;
          } else if (scrollY < H * 1.95) {
              targetStep = 4;
          } else {
              targetStep = 5;
          }
      }

      loopState.current.smoothStep = lerp(loopState.current.smoothStep, targetStep, 0.12);
      let smoothSp = loopState.current.smoothStep / 5;
      
      // If reversible, sequence trigger shouldn't force animTime.
      // Wait, let's just make the secondary animation entirely tied to scrollY, so it's fully reversible.
      // E.g., user said "It gets blocked. It's not reversible"
      // If we use smoothSp (which goes 0 to 1 based on scroll), we can control S directly.

      if (scrollY < 50 && pParabola < 1) disintegrated.current = false; 

      let currentPhase = 0;
      if (pParabola >= 1) currentPhase = 3;
      else if (pGroup > 0.1) currentPhase = 1;
      
      if (currentPhase !== loopState.current.lastPhase) {
        loopState.current.lastPhase = currentPhase;
        onPhaseChange(currentPhase);
      }

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
        
        // Staggered local progression
        const delay = i * 150; // generous stagger for staggered entry
        const localEntry = clamp((loopState.current.elapsed - delay) / 1400, 0, 1);
        const et = easeOut(localEntry);
        
        const localGroup = clamp((loopState.current.elapsed - GROUP_START - delay * 0.1) / GROUP_DUR, 0, 1);
        const gt = Math.pow(localGroup, 2); // Gather tighter in the group phase
        
        const localExit = clamp((loopState.current.elapsed - EXIT_START - i * 40) / EXIT_DUR, 0, 1);
        const ext = Math.pow(localExit, 3); // Accelerate upwards

        const currentZ = lerp(off.z, 0, et);
        const perspective = 1 / (currentZ + 1);
        
        // Enter from right side exactly horizontally
        const startX = CX() + W * 1.2; 
        const startY = CY(); 

        // Target: Initial relaxed spread
        const initialSpread = Math.min(W * 0.4, 400);
        const initialTargetX = CX() + (i - (SRCS.length - 1) / 2) * (initialSpread / SRCS.length); 
        const initialTargetY = CY();

        // 1. Enter from side
        let x = lerp(startX, initialTargetX, et);
        let y = lerp(startY, initialTargetY, et);

        // Group Center Target: align in the center, bring lightly together
        const gatherSpread = Math.min(W * 0.25, 200); 
        const groupTargetX = CX() + (i - (SRCS.length - 1) / 2) * (gatherSpread / SRCS.length); 
        const groupTargetY = CY();

        // 2. Gather closer
        x = lerp(x, groupTargetX, gt);
        y = lerp(y, groupTargetY, gt);

        // 3. Exit upwards
        y -= ext * H * 1.5; 

        const px = CX() + (x - CX()) * perspective;
        const py = CY() + (y - CY()) * perspective;

        // Rotation logic: just a slight random tilt on entry, converging to 0 tilt on gather
        const tiltX = lerp(off.rx * 0.2, 0, et); // Gentle tilt based on random
        const tiltY = lerp(off.ry * 0.2, 0, et); 
        const tiltZ = lerp(off.rz * 0.1, 0, gt); // Card Z rotation flattens completely at group

        // Scale: shrink the cards in group phase
        const scaleBase = lerp(off.scale, 1, et) * perspective;
        const groupScale = lerp(1, 0.45, gt); // Shrink slightly
        const finalScale = scaleBase * groupScale;

        const scaleX = Math.cos(tiltY * Math.PI / 180) * finalScale;
        const scaleY = Math.cos(tiltX * Math.PI / 180) * finalScale;
        
        // Opacity
        let op = clamp(localEntry * 4, 0, 1);
        
        // Blur
        const blur = ext * 35; 

        drawCard(img, px, py, tiltZ, scaleX, scaleY, op, blur);
      });

      let p0 = targetPos.current;
      if (!p0) {
        const el = mobileDotPlaceholderRef.current || dotPlaceholderRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          p0 = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, r: 12 };
        } else {
          p0 = { x: CX(), y: H * 0.45, r: 12 };
        }
      }

      let sphereX = CX();
      let sphereY = CY();
      let sphereR = 0;
      let sphereGlow = 0;
      let dirAngle = -Math.PI / 2;
      let morphT = 0; 
      let squash = 1;
      let sphereOp = 1;
      let stretchX = 1;

      if (pParabola < 1) {
        if (loopState.current.elapsed < GROUP_START) {
          sphereR = easeInOut(pEntry) * 60;
        } else {
          sphereR = 60 + easeInOut(pGroup) * 30;
        }
        sphereGlow = clamp(pEntry * 1.5, 0, 1) * (1 - pParabola * 0.5);

        if (pParabola > 0 && !isMobile) {
            const targetElement = mobileDotPlaceholderRef.current || dotPlaceholderRef.current; 
            if (targetElement) {
              const rect = targetElement.getBoundingClientRect();
              const fontSize = Math.max(60, Math.min(window.innerWidth * 0.1, 140));
              targetPos.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                r: fontSize * 0.08 + 2
              };
              p0 = targetPos.current;
            }
            const { x: targetX, y: targetY, r: targetR } = p0;
            const et = easeOut(pParabola); 
            sphereX = lerp(CX(), targetX, et);
            const baseLine = lerp(CY(), targetY, et);
            // Draw a moderate arc. Adjust H * 0.15 to look good.
            const arc = Math.sin(pParabola * Math.PI) * (H * 0.15); 
            sphereY = baseLine - arc;
            sphereR = lerp(90, targetR, et);
            morphT = 0;
            squash = 1;
        }
      } else {
        // --- NEW POST-HERO ANIMATION (SCROLL-BASED & REVERSIBLE) ---
        // Hide dot placeholders when scrolling heavily
        if (scrollY > H * 0.1) {
            if (mobileDotPlaceholderRef.current) mobileDotPlaceholderRef.current.style.opacity = '0';
            if (dotPlaceholderRef.current) dotPlaceholderRef.current.style.opacity = '0';
        } else {
            if (mobileDotPlaceholderRef.current) mobileDotPlaceholderRef.current.style.opacity = '1';
            if (dotPlaceholderRef.current) dotPlaceholderRef.current.style.opacity = '1';
        }

        let floorY = H * 0.45;
        let R = Math.min(W * 0.015, 12);
        
        sphereGlow = 1;
        
        const S = smoothSp;

        // Cascade targets mapped exactly to progress steps
        const S_HITS = [0.20, 0.40, 0.60, 0.80];
        const easeIn = (t: number) => t * t;
        // Calculate progressive staircase positions
        const getBoxX = (index: number) => {
            if (isMobile) return W * (0.1 + index * 0.1) + 40;
            return W * (0.15 + index * 0.1) + 80; // Rough center-left alignment on card
        };

        const targets = [
            { x: p0.x, y: p0.y }, // Start
            { x: getBoxX(0), y: H * 0.80 }, 
            { x: getBoxX(1), y: H * 0.80 }, 
            { x: getBoxX(2), y: H * 0.80 }, 
            { x: getBoxX(3), y: H * 0.80 }  
        ];

        if (S < S_HITS[0]) {
            // Drop 1 (Stationary for the first 70% of Step 1, then drops)
            if (S < 0.14) {
                sphereX = targets[0].x;
                sphereY = targets[0].y;
                sphereR = p0.r;
                sphereOp = 1;
                dirAngle = 0;
                squash = 1;
            } else {
                let p = clamp((S - 0.14) / 0.06, 0, 1);
                sphereR = p0.r;
                sphereOp = 1;
                sphereX = lerp(targets[0].x, targets[1].x, p);
                sphereY = lerp(targets[0].y, targets[1].y, easeIn(p));
                dirAngle = 0;
                squash = 1; 
            }
        } else {
            // Keep identical initial ball size and style
            sphereR = p0.r;
            morphT = 0;
            sphereOp = 1;
            
            // Dynamic arc and text spacing calculation
            const PARABOLA = H * 0.15;
            const TEXT_OFFSET = H * 0.2; // Texts drift up by this much when the next one enters

            if (S < S_HITS[1]) {
                // Bounce T1 -> T2
                let p = (S - S_HITS[0]) / (S_HITS[1] - S_HITS[0]);
                sphereX = lerp(targets[1].x, targets[2].x, p);
                let startY = targets[1].y - TEXT_OFFSET * p;
                let endY = targets[2].y;
                sphereY = lerp(startY, endY, p) - Math.sin(p * Math.PI) * PARABOLA;
                squash = 1;
                dirAngle = Math.atan2(endY - startY, targets[2].x - targets[1].x);
            } else if (S < S_HITS[2]) {
                // Bounce T2 -> T3
                let p = (S - S_HITS[1]) / (S_HITS[2] - S_HITS[1]);
                sphereX = lerp(targets[2].x, targets[3].x, p);
                let startY = targets[2].y - TEXT_OFFSET * p;
                let endY = targets[3].y;
                sphereY = lerp(startY, endY, p) - Math.sin(p * Math.PI) * PARABOLA;
                squash = 1;
                dirAngle = Math.atan2(endY - startY, targets[3].x - targets[2].x);
            } else if (S < S_HITS[3]) {
                // Bounce T3 -> T4
                let p = (S - S_HITS[2]) / (S_HITS[3] - S_HITS[2]);
                sphereX = lerp(targets[3].x, targets[4].x, p);
                let startY = targets[3].y - TEXT_OFFSET * p;
                let endY = targets[4].y;
                sphereY = lerp(startY, endY, p) - Math.sin(p * Math.PI) * PARABOLA;
                squash = 1;
                dirAngle = Math.atan2(endY - startY, targets[4].x - targets[3].x);
            } else if (S < 0.95) {
                // Explosion / scale out on desktop, just slide up on mobile
                let p = (S - S_HITS[3]) / (0.95 - S_HITS[3]);
                sphereX = targets[4].x;
                sphereY = targets[4].y - (S - S_HITS[3]) * H; // Track the text moving up
                squash = 1;
                stretchX = 1;
                sphereR = p0.r;
                sphereOp = isMobile ? 1 : 1 - p;
                dirAngle = 0;
            } else {
                sphereOp = isMobile ? 1 : 0;
                sphereX = targets[4].x;
                sphereY = targets[4].y - (S - S_HITS[3]) * H;
                sphereR = isMobile ? p0.r : 0;
            }

            // Particles on hit
            let hit = false;
            let lastS = loopState.current.lastSmoothSp ?? 0;
            if (lastS < 0.20 && S >= 0.20) hit = true;
            if (lastS < 0.40 && S >= 0.40) hit = true;
            if (lastS < 0.60 && S >= 0.60) hit = true;
            if (lastS < 0.80 && S >= 0.80) hit = true;
            loopState.current.lastSmoothSp = S;
            
            if (hit && !isMobile) {
                let px = sphereX;
                let py = sphereY;
                for(let i=0; i< (S >= 0.80 ? 40 : 15); i++) {
                    particles.current.push({
                        x: px, y: py,
                        vx: (Math.random() - 0.5) * (S >= 0.80 ? 30 : 15),
                        vy: (Math.random() - 0.5) * (S >= 0.80 ? 30 : 15) - 2,
                        size: 1 + Math.random() * (S >= 0.80 ? 4 : 2),
                        op: 1, life: 1 + Math.random() * 0.5
                    });
                }
            }
        }

        const safeStyle = (ref: React.RefObject<HTMLElement | null>, props: any) => {
            if (ref.current) Object.assign(ref.current.style, props);
        };
        
         // Dynamic rising text layout precisely aligned to user's requested heights
        const updatePhrase = (ref: React.RefObject<HTMLDivElement | null>, s_hit: number, extraOffset: number = 0, isFirst: boolean = false) => {
            if (!ref.current) return;
            const startS = isFirst ? 0 : s_hit - 0.06;
            let currentX = 0;
            let currentY = 1.2 * H;
            let op = 0;
            let p_scramble = 0;
            if (S >= startS) {
                if (S < s_hit) {
                    const p = (S - startS) / (s_hit - startS);
                    if (isFirst) {
                        currentX = lerp(W * 0.5, 0, easeOut(p));
                        currentY = 0.8 * H;
                        op = p;
                        p_scramble = p;
                    } else {
                        currentX = 0;
                        currentY = lerp(1.1 * H, 0.8 * H, p);
                        op = p;
                        p_scramble = p;
                    }
                } else {
                    const dS = S - s_hit;
                    currentY = 0.8 * H - dS * H;
                    currentX = 0;
                    op = 1;
                    p_scramble = 1;
                    if (currentY < -0.05 * H) {
                        op = clamp((currentY + 0.15 * H) / (0.1 * H), 0, 1);
                    }
                    if (S > 0.99) {
                        op = clamp(1, 0, 1);
                    }
                }
            } else {
                p_scramble = 0;
                if (isFirst) {
                    currentX = W * 0.5;
                    currentY = 0.8 * H;
                }
            }
            currentY += extraOffset;
            
            // Programmatically scramble text nodes recursively
            const scrambleTextNodes = (el: HTMLElement, progress: number) => {
                el.childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        if (!(child as any).__originalText) {
                            (child as any).__originalText = child.textContent || '';
                        }
                        const orig = (child as any).__originalText;
                        child.textContent = scrambleString(orig, progress);
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        scrambleTextNodes(child as HTMLElement, progress);
                    }
                });
            };
            scrambleTextNodes(ref.current, p_scramble);
            
            safeStyle(ref, {
                transform: `translateX(${currentX}px) translateY(${currentY}px)`,
                opacity: op.toString(),
                filter: 'blur(0px)'
            });
        };

        updatePhrase(phrase1Ref, S_HITS[0], 0, true);
        updatePhrase(phrase2Ref, S_HITS[1]);
        updatePhrase(phrase3Ref, S_HITS[2]);
        updatePhrase(punch1Ref, S_HITS[3]);
        updatePhrase(punch2Ref, S_HITS[3], isMobile ? 40 : 60);
      }

      if (!isMobile) {
        // Age the trail
        trail.current.forEach(t => {
            t.age = (t.age || 0) + dt;
        });
        trail.current = trail.current.filter(t => t.age! < 1000); // 1000ms lifetime

        // Continuous trail recording with small delta check to prevent buildup when idle
        if (trail.current.length > 0) {
            const dx = trail.current[trail.current.length-1].x - sphereX;
            const dy = trail.current[trail.current.length-1].y - sphereY;
            const dist = Math.hypot(dx, dy);
            if (dist > 150) {
                // Clear trail if teleported
                trail.current = [];
            }
        }

        if (trail.current.length === 0 || Math.hypot(trail.current[trail.current.length-1].x - sphereX, trail.current[trail.current.length-1].y - sphereY) > 5) {
          trail.current.push({x: sphereX, y: sphereY, r: sphereR, op: sphereOp, age: 0});
        }

        // Draw Waves
        waves.current.forEach((w) => {
          if (w.active) {
            w.age += 0.016;
            w.width = Math.sin(Math.min(w.age * 2.5, Math.PI)) * (W * 0.35);
            w.opacity = clamp(1 - (w.age / 1.5), 0, 1);
            if (w.age > 1.5) w.active = false;

            if (w.width > 0 && w.opacity > 0) {
              ctx.save();
              ctx.globalAlpha = w.opacity;
              const grad = ctx.createLinearGradient(w.x - w.width, w.y, w.x + w.width, w.y);
              grad.addColorStop(0, 'transparent');
              grad.addColorStop(0.5, '#00E5FF');
              grad.addColorStop(1, 'transparent');
              ctx.fillStyle = grad;
              ctx.fillRect(w.x - w.width, w.y - 2, w.width * 2, 4);
              ctx.shadowBlur = 20;
              ctx.shadowColor = '#00E5FF';
              ctx.fillRect(w.x - w.width, w.y - 1, w.width * 2, 2);
              ctx.restore();
            }
          }
        });

        // Draw continuous trail strip
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00E5FF';
        for (let i = 1; i < trail.current.length; i++) {
            const p1 = trail.current[i - 1];
            const p2 = trail.current[i];
            let ageOp = 1 - ((p2.age || 0) / 1000);
            if (ageOp < 0) ageOp = 0;
            const trailOp = ageOp * 0.6 * (p2.op ?? 1);
            if (trailOp > 0) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(0, 229, 255, ${trailOp})`;
                ctx.lineWidth = Math.max(0.1, p2.r * 1.5 * ageOp);
                ctx.stroke();
            }
        }
        ctx.restore();

        if (sphereR > 1 && sphereOp > 0) {
          // Add spinning effect that accumulates over distance
          const spinAngle = pParabola >= 1 ? (smoothSp * Math.PI * 8) % (Math.PI * 2) : 0;
          drawSphere(sphereX, sphereY, sphereR, sphereGlow, morphT, squash, dirAngle + spinAngle, sphereOp, stretchX);
        }

        // Draw particles
        particles.current.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // gravity
          p.life -= 0.015;
          p.op = clamp(p.life, 0, 1);
          
          ctx.save();
          ctx.globalAlpha = p.op;
          ctx.fillStyle = '#00E5FF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = ctx.fillStyle as string;
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          ctx.restore();
        });
        particles.current = particles.current.filter(p => p.life > 0);
      }

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
    <section ref={sectionRef} id="hero" className={`relative w-full ${isMobile ? 'h-[600dvh] snap-start' : 'h-[270vh]'}`}>
      {isMobile && (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none flex flex-col">
          <div className="h-[100dvh] w-full snap-start shrink-0" />
          <div className="h-[100dvh] w-full snap-start shrink-0" />
          <div className="h-[100dvh] w-full snap-start shrink-0" />
          <div className="h-[100dvh] w-full snap-start shrink-0" />
          <div className="h-[100dvh] w-full snap-start shrink-0" />
          <div className="h-[100dvh] w-full snap-start shrink-0" />
        </div>
      )}
      {/* Background Image Container */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          >
            <motion.div 
              className="w-full h-full" 
              style={{ opacity: heroContentOpacity }}
            >
              <picture className="w-full h-full block">
                <source
                  media="(min-width: 768px)"
                  srcSet="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1779229305/22047c79-f69d-4dd2-8716-63361481a40f_ww9k5d.png"
                />
                <img
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1779229305/mobile_hero_smqsm2.png"
                  alt="Hero Background"
                  className="w-full h-full object-cover object-top md:object-center transform translate-y-8 md:translate-y-0 scale-110 md:scale-100"
                />
              </picture>
              <div className="absolute inset-0 bg-transparent mix-blend-multiply opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Skip/Replay Button */}
        {phase < 3 && (
          <button 
            onClick={handleSkip}
            className="absolute top-8 right-8 z-[110] text-[10px] font-tech uppercase tracking-widest text-white/40 hover:text-white transition-colors px-4 py-2 border border-white/10 rounded-full bg-black/20 backdrop-blur-sm pointer-events-auto"
          >
            Skip Intro
          </button>
        )}
  
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

        {/* Scroll Phrases */}
        <div className="absolute inset-0 z-40 pointer-events-none font-tech uppercase w-full">
            <div ref={phrase1Ref} className="absolute text-left left-4 md:left-[10vw] lg:left-[15vw] w-auto max-w-[85vw] sm:max-w-[70vw] p-4 sm:p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-[#00E5FF]/20 text-white" style={{ opacity: 0, top: 0, transform: 'translateY(120vh)' }}>
                <span className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold tracking-widest leading-relaxed block">
                    <span className="text-[#00E5FF]">TI HANNO CHIESTO 10.000€</span> PER ANDARE ONLINE.
                </span>
            </div>
            <div ref={phrase2Ref} className="absolute text-left left-4 md:left-[20vw] lg:left-[25vw] w-auto max-w-[85vw] sm:max-w-[70vw] p-4 sm:p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-[#00E5FF]/20 text-white" style={{ opacity: 0, top: 0, transform: 'translateY(120vh)' }}>
                <span className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold tracking-widest leading-relaxed block">
                    HAI PROVATO I VIDEO <span className="text-[#00E5FF]">MA NON È CAMBIATO NIENTE.</span>
                </span>
            </div>
            <div ref={phrase3Ref} className="absolute text-left left-4 md:left-[30vw] lg:left-[35vw] w-auto max-w-[85vw] sm:max-w-[70vw] p-4 sm:p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-[#00E5FF]/20 text-white" style={{ opacity: 0, top: 0, transform: 'translateY(120vh)' }}>
                <span className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold tracking-widest leading-relaxed block">
                    <span className="text-[#00E5FF]">I CLIENTI NON SAI COME</span> E DA DOVE ARRIVANO
                </span>
            </div>
            <div ref={punch1Ref} className="absolute text-left left-4 md:left-[40vw] lg:left-[45vw] w-auto max-w-[85vw] sm:max-w-[70vw]" style={{ opacity: 0, top: 0, transform: 'translateY(120vh)' }}>
                <img 
                  src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1779493812/meme_sito_scontornato_nzl2uz.png"
                  alt="Meme"
                  className="absolute -top-20 sm:-top-28 -right-4 sm:-right-8 w-20 sm:w-28 object-contain rotate-[20deg] opacity-90 -z-10"
                  style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 85%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 85%)' }}
                  referrerPolicy="no-referrer"
                />
                <div className="relative w-full h-full p-4 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-[#00E5FF]/20 text-white z-10">
                  <span className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-bold tracking-widest leading-[1.4] block relative z-10">
                      E IO LO SO BENE... <span className="text-[#00E5FF]">È CAPITATO ANCHE A ME!</span>
                  </span>
                  <span className="text-[9px] sm:text-[11px] md:text-[13px] mt-3 md:mt-4 block font-normal text-white/50 italic tracking-widest text-right relative z-10">
                      E adesso capirai il perché
                  </span>
                </div>
            </div>
            <div ref={punch2Ref} className="hidden"></div>
        </div>
  
        {/* Hero Content */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div 
              style={{ y: heroContentY, scale: heroContentScale, opacity: heroContentOpacity, filter: heroContentBlur }}
              className="absolute inset-0 z-30 flex flex-col items-start justify-start md:justify-center pt-[18vh] sm:pt-[22vh] md:pt-0 pl-[8%] md:pl-[6%] lg:pl-[10%] pointer-events-none"
            >
              <div className="flex flex-col items-start w-full md:w-auto">
                {/* Keywords + Headline Row */}
                <div className="flex flex-col items-start">
                  {/* Top Text / Keywords */}
                  <div className="flex mb-3 md:mb-5 overflow-hidden pointer-events-auto">
                    {"Studio, creo e implemento".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "100%", rotateX: -90 }}
                        animate={phase === 3 ? { y: 0, rotateX: 0 } : { y: "100%", rotateX: -90 }}
                        style={{ opacity: scrollOpacity }}
                        transition={phase === 3 ? {
                          type: "spring",
                          stiffness: 450,
                          damping: 10
                        } : { 
                          delay: 0.8 + i * 0.02, 
                          duration: 0.8, 
                          ease: [0.22, 1, 0.36, 1] 
                        }}
                        className="inline-block text-[9px] md:text-[clamp(9px,0.9vw,11px)] font-tech font-bold uppercase tracking-[0.3em] text-[#00E5FF] cursor-default select-none pointer-events-auto"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
     
                  <motion.div
                    style={{ opacity: scrollOpacity }}
                    className="font-display font-black text-[clamp(52px,13vw,100px)] md:text-[clamp(42px,7.5vw,100px)] tracking-tight leading-[0.85] md:leading-[0.85] flex flex-col md:flex-row items-start md:items-baseline gap-0 md:gap-[0.3em] text-white pointer-events-auto"
                  >
                    <div className="flex items-baseline uppercase pointer-events-auto">
                      {"Soluzion".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 40, rotateX: -60 }}
                          animate={phase === 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -60 }}
                          transition={phase === 3 ? {
                            type: "spring",
                            stiffness: 450,
                            damping: 10
                          } : {
                            delay: 0.1 + i * 0.04,
                            duration: 0.8,
                            ease: [0.215, 0.610, 0.355, 1.000],
                          }}
                          className="inline-block origin-bottom cursor-default select-none pointer-events-auto"
                        >
                          {char}
                        </motion.span>
                      ))}
                      <motion.span
                        initial={{ opacity: 0, y: 40, rotateX: -60 }}
                        animate={phase === 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -60 }}
                        transition={phase === 3 ? {
                          type: "spring",
                          stiffness: 450,
                          damping: 10
                        } : {
                          delay: 0.1 + 8 * 0.04,
                          duration: 0.8,
                          ease: [0.215, 0.610, 0.355, 1.000],
                        }}
                        className="relative inline-block origin-bottom cursor-default select-none pointer-events-auto"
                      >
                        ı
                        {!isMobile && <span ref={mobileDotPlaceholderRef} className="absolute top-[-0.15em] left-1/2 -translate-x-1/2 w-1 h-1" />}
                      </motion.span>
                    </div>
                    <div className="relative flex items-baseline uppercase whitespace-nowrap pointer-events-auto">
                      {"digital".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 40, rotateX: -60 }}
                          animate={phase === 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -60 }}
                          transition={phase === 3 ? {
                            type: "spring",
                            stiffness: 450,
                            damping: 10
                          } : {
                            delay: 0.3 + i * 0.04, // Stagger offset for the second word
                            duration: 0.8,
                            ease: [0.215, 0.610, 0.355, 1.000],
                          }}
                          className="inline-block origin-bottom cursor-default select-none pointer-events-auto"
                        >
                          {char}
                        </motion.span>
                      ))}
                      <motion.span
                        initial={{ opacity: 0, y: 40, rotateX: -60 }}
                        animate={phase === 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -60 }}
                        transition={phase === 3 ? {
                          type: "spring",
                          stiffness: 450,
                          damping: 10
                        } : {
                          delay: 0.3 + 7 * 0.04,
                          duration: 0.8,
                          ease: [0.215, 0.610, 0.355, 1.000],
                        }}
                        className="relative inline-block origin-bottom cursor-default select-none pointer-events-auto"
                      >
                        ı
                        {!isMobile && <span ref={dotPlaceholderRef} className="absolute top-[-0.15em] left-1/2 -translate-x-1/2 w-1 h-1" />}
                      </motion.span>
                      
                      {/* Scribble Strikethrough & Gratis */}
                      <motion.div 
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={phase === 3 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                        transition={phase === 3 ? { delay: 0.6, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
                        className="absolute top-1/2 left-[-2%] w-[104%] h-[4px] md:h-[12px] bg-[#00E5FF] origin-left rounded-full z-10 mix-blend-screen"
                        style={{ transform: "rotate(-5deg) translateY(-50%)" }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                        animate={phase === 3 ? { opacity: 1, scale: 1, rotate: -8 } : { opacity: 0, scale: 0.5, rotate: -15 }}
                        transition={phase === 3 ? { delay: 0.9, duration: 0.5, type: "spring", stiffness: 300, damping: 15 } : { duration: 0 }}
                        className="absolute top-1/2 -translate-y-1/2 -right-[4.2em] md:translate-y-0 md:-top-[1.4em] md:-right-[0.2em] text-[0.3em] md:text-[0.35em] font-black text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.8)] z-20"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        GRATIS
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={phase === 3 ? { opacity: 1 } : { opacity: 0 }}
                          transition={phase === 3 ? { delay: 1.8, duration: 0.8 } : { duration: 0 }}
                          className="absolute -bottom-[1.2em] right-0 text-[0.4em] font-tech font-medium tracking-wide text-white/70 uppercase"
                        >
                          (forse)
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
  
              <motion.div
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
                className="text-[11px] md:text-[clamp(11px,1.2vw,15px)] font-tech font-medium tracking-wide md:tracking-[0.02em] uppercase text-white/70 mt-5 md:mt-6 text-left leading-[1.4] md:leading-normal whitespace-normal max-w-[240px] md:max-w-[460px]"
              >
                Ti faccio guadagnare prima<br className="md:hidden" /> di farti investire.
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={phase === 3 ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="mt-2 text-[9px] md:text-[11px] font-sans text-white/40 italic normal-case"
                >
                  (Aspetta! Non è una fregatura!<br className="md:hidden" /> Fammi spiegare meglio)
                </motion.div>
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={phase === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                style={{ opacity: scrollOpacity }}
                transition={{ 
                  delay: 0.6, 
                  duration: 1,
                  type: "spring",
                  stiffness: 50,
                  damping: 20
                }}
                className="flex flex-row gap-3 md:gap-4 mt-8 md:mt-12 pointer-events-auto items-center md:items-start"
              >
                <motion.button 
                  initial="initial"
                  whileHover="hover"
                  variants={{
                    initial: { backgroundColor: "rgba(255, 255, 255, 0.12)", borderColor: "#00E5FF" },
                    hover: { backgroundColor: "#ffffff", borderColor: "#ffffff" }
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => scrollTo('lavori')}
                  className="hidden md:flex group relative h-12 px-10 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer border shadow-[0_0_20px_rgba(0,229,255,0.2)] w-full sm:w-auto"
                >
                  <div className="relative z-10 flex h-full items-center justify-center">
                    {"I miei lavori".split("").map((char, i) => (
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
                    hover: { backgroundColor: "rgba(0, 229, 255, 0.2)", borderColor: "#00E5FF" }
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => {
                    const el = document.getElementById('contatti');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative h-[40px] md:h-12 px-5 md:px-10 border rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer w-[110px] md:w-auto"
                >
                  <div className="relative z-10 flex h-full items-center justify-center">
                    {"Parliamo".split("").map((char, i) => (
                      <span key={i} className="relative inline-block overflow-hidden">
                        <motion.span
                          variants={{
                            initial: { y: 0, rotateX: 0, color: "rgba(255, 255, 255, 0.8)" },
                            hover: { y: "-100%", rotateX: 90, color: "#00E5FF" }
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
                            initial: { y: "100%", rotateX: -90, color: "#00E5FF" },
                            hover: { y: 0, rotateX: 0, color: "#00E5FF" }
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
              </motion.div>
            </motion.div>
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
      </div>

      {/* Loading State */}
      {loaded < SRCS.length && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050508]">
          <div className="w-12 h-12 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
}
