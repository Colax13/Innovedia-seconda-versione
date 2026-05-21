import React, { useEffect, useState } from 'react';

export default function UnifiedBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(100px,-80px) scale(1.2)} 66%{transform:translate(-50px,80px) scale(0.9)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-80px,100px) scale(1.1)} 66%{transform:translate(60px,-50px) scale(0.95)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,80px) scale(0.9)} 66%{transform:translate(-100px,-40px) scale(1.1)} }
        @keyframes starsAnim { from { transform: translateY(0); } to { transform: translateY(-1000px); } }
      `}</style>
      <div style={{ position:"fixed", inset:0, zIndex:-1, background:"#050B14", overflow:"hidden" }}>
        
        {/* Starry Night Effect (using multiple box shadows for stars) */}
        <div style={{
           position: 'absolute',
           inset: '-1000px -200px',
           backgroundImage: 'radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #ccffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #e6ffff, rgba(0,0,0,0))',
           backgroundRepeat: 'repeat',
           backgroundSize: '200px 200px',
           opacity: 0.3,
           animation: 'starsAnim 120s linear infinite'
        }} />

        {/* Moving Gradient Spheres (Cyan) */}
        <div style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          top: "-20%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "blob1 20s infinite alternate",
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
          transition: "transform 0.5s ease-out",
        }} />

        <div style={{
          position: "absolute",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          bottom: "-20%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "blob2 25s infinite alternate",
          transform: `translate(${mouse.x * -15}px, ${mouse.y * -20}px)`,
          transition: "transform 0.5s ease-out",
        }} />
        
        <div style={{
          position: "absolute",
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          top: "30%",
          left: "20%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(140px)",
          animation: "blob3 22s infinite alternate",
          transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
          transition: "transform 0.5s ease-out",
        }} />

        {/* Unified Vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(3, 7, 15, 0.8) 100%)",
        }} />
        
        {/* Subtle noise */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: "overlay",
        }} />
      </div>
    </>
  );
}
