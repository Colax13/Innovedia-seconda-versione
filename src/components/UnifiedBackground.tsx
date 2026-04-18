import React, { useEffect, useRef, useState } from 'react';

export default function UnifiedBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.07);
      current.current.y = lerp(current.current.y, target.current.y, 0.07);
      setMouse({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    
    const onMove = (e: MouseEvent) => {
        target.current.x = ((e.clientX) / window.innerWidth - 0.5) * 2;
        target.current.y = ((e.clientY) / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMove);
    return () => {
        window.removeEventListener('mousemove', onMove);
        if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .blob-anim {
          animation: orbit 20s linear infinite;
        }
      `}</style>
      <div style={{ position:"fixed", inset:0, zIndex:-1, background:"#020205", overflow:"hidden" }}>

        {/* Blob 1 — Ciano Elettrico */}
        <div 
          className="blob-anim"
          style={{
            position:"absolute", width:"110vw", height:"110vw", borderRadius:"50%",
            top:"-35%", left:"-25%",
            background:"radial-gradient(circle, rgba(0,229,255,0.55) 0%, rgba(0,180,216,0.25) 45%, transparent 70%)",
            filter:"blur(120px)",
            transform:`translate(${mouse.x * 30}px, ${mouse.y * 25}px)`,
            transition:"transform 1.8s cubic-bezier(0.23, 1, 0.32, 1)",
            opacity: 0.8
          }} 
        />

        {/* Blob 2 — Blu Elettrico / Viola Brillante */}
        <div 
          className="blob-anim"
          style={{
            position:"absolute", width:"95vw", height:"95vw", borderRadius:"50%",
            top:"10%", right:"-30%",
            background:"radial-gradient(circle, rgba(37,99,235,0.45) 0%, rgba(161,0,255,0.22) 50%, transparent 75%)",
            filter:"blur(130px)",
            transform:`translate(${mouse.x * -20}px, ${mouse.y * 30}px)`,
            transition:"transform 1.8s cubic-bezier(0.23, 1, 0.32, 1)",
            opacity: 0.7,
            animationDelay: "-5s"
          }} 
        />

        {/* Blob 3 — Verde Fluorescente / Teal */}
        <div 
          className="blob-anim"
          style={{
            position:"absolute", width:"90vw", height:"90vw", borderRadius:"50%",
            bottom:"-25%", left:"15%",
            background:"radial-gradient(circle, rgba(0,255,180,0.35) 0%, rgba(13,148,136,0.2) 50%, transparent 75%)",
            filter:"blur(110px)",
            transform:`translate(${mouse.x * 20}px, ${mouse.y * -20}px)`,
            transition:"transform 1.8s cubic-bezier(0.23, 1, 0.32, 1)",
            opacity: 0.6,
            animationDelay: "-10s"
          }} 
        />

        {/* Blob 4 — Deep Purple Glow (New) */}
        <div style={{
          position:"absolute", width:"90vw", height:"90vw", borderRadius:"50%",
          bottom:"10%", right:"10%",
          background:"radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter:"blur(120px)",
          transform:`translate(${mouse.x * -10}px, ${mouse.y * -10}px)`,
          transition:"transform 2s cubic-bezier(0.23, 1, 0.32, 1)",
        }} />

        {/* Vignette centrale per far risaltare il testo */}
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse at center, transparent 30%, rgba(2,2,5,0.85) 100%)",
        }} />
      </div>
    </>
  );
}
