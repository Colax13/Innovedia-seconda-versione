import React from 'react';

export default function UnifiedBackground() {
  return (
    <>
      <div style={{ position:"fixed", inset:0, zIndex:-1, background:"#050B14", overflow:"hidden" }}>
        
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
