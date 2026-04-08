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
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.1)} 66%{transform:translate(-30px,50px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,60px) scale(1.08)} 66%{transform:translate(40px,-30px) scale(0.97)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,50px) scale(0.92)} 66%{transform:translate(-60px,-20px) scale(1.06)} }
        @keyframes blob4 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-40px,-50px) scale(1.05)} 66%{transform:translate(50px,30px) scale(0.94)} }
      `}</style>
      <div style={{ position:"fixed", inset:0, zIndex:-1, background:"#050508", overflow:"hidden" }}>

        {/* Blob 1 — Ciano/Turchese */}
        <div style={{
          position:"absolute", width:"70vw", height:"70vw", borderRadius:"50%",
          top:"-15%", left:"-10%",
          background:"radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(8,145,178,0.1) 50%, transparent 75%)",
          filter:"blur(80px)",
          transform:`translate(${mouse.x * 18}px, ${mouse.y * 14}px)`,
          transition:"transform 1.2s ease-out",
        }} />

        {/* Blob 2 — Blu profondo/Viola */}
        <div style={{
          position:"absolute", width:"60vw", height:"60vw", borderRadius:"50%",
          top:"20%", right:"-15%",
          background:"radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(30,64,175,0.1) 50%, transparent 75%)",
          filter:"blur(90px)",
          transform:`translate(${mouse.x * -12}px, ${mouse.y * 16}px)`,
          transition:"transform 1.2s ease-out",
        }} />

        {/* Blob 3 — Verde acqua/Smeraldo */}
        <div style={{
          position:"absolute", width:"55vw", height:"55vw", borderRadius:"50%",
          bottom:"-10%", left:"20%",
          background:"radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(6,95,70,0.08) 50%, transparent 75%)",
          filter:"blur(85px)",
          transform:`translate(${mouse.x * 10}px, ${mouse.y * -12}px)`,
          transition:"transform 1.2s ease-out",
        }} />

        {/* Overlay noise/grain per dare texture */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: "overlay",
        }} />

        {/* Vignette centrale per far risaltare il testo */}
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse at center, transparent 20%, rgba(5,5,8,0.65) 100%)",
        }} />
      </div>
    </>
  );
}
