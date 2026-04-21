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
      <div style={{ position:"fixed", inset:0, zIndex:-1, background:"#020205", overflow:"hidden" }}>

        {/* Top-Left Cyan Blob */}
        <div style={{
          position: "absolute",
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          top: "-15%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)",
          filter: "blur(130px)",
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
          transition: "transform 1.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }} />

        {/* Bottom-Right Cyan Blob */}
        <div style={{
          position: "absolute",
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          bottom: "-15%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)",
          filter: "blur(130px)",
          transform: `translate(${mouse.x * -15}px, ${mouse.y * -20}px)`,
          transition: "transform 1.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }} />

        {/* Center Cyan Glow */}
        <div style={{
          position: "absolute",
          width: "100vw",
          height: "100vw",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${mouse.x * 10}px), calc(-50% + ${mouse.y * 10}px))`,
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
          filter: "blur(160px)",
          transition: "transform 2s cubic-bezier(0.23, 1, 0.32, 1)",
        }} />

        {/* Overlay noise/grain per dare texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: "overlay",
        }} />

{/* Vignette luminosa per dare profondità */}
<div style={{
  position: "absolute", inset: 0,
  background: "radial-gradient(ellipse at center, transparent 20%, rgba(10, 11, 30, 0.6) 100%)",
}} />
      </div>
    </>
  );
}
