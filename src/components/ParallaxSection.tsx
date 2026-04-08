import React, { useEffect, useRef, useState } from 'react';
import OptimizedImage from './OptimizedImage';

// type: "photo" | "text"
// text cards: stat (grande), label (piccola sopra), sub (piccola sotto)
const showcaseRows = [
  // ROW 1
  [
    { type: "photo", title: "Ritual Hair Spa", category: "E-commerce", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769513413/Hair_Spa_sofu9v.jpg" },
    { type: "photo", title: "RD Salon", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379623/1765792030088_xvxpzz.jpg" },
    { type: "text", label: "PRESENZA", stat: "ONLINE", sub: "con ogni elemento al posto giusto" },
    { type: "photo", title: "Gentle Boozers", category: "Social Media", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769516773/GB_instagram_pvf2cv.jpg" },
    { type: "photo", title: "Free Time Bar", category: "Branding", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773848189/Logo_su_panino_tpz4ke.jpg" },
  ],
  // ROW 2 — centro alto: testo tra le foto
  [
    { type: "photo", title: "GF Service", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773085029/Screenshot_1_ybfwjn.jpg" },
    { type: "photo", title: "Funeral Home", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773089047/Screenshot_1_ygkfos.jpg" },
    { type: "text", label: "CONTENUTI", stat: "SEO", sub: "che ti fanno trovare sempre" },
    { type: "photo", title: "Garden Planet", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769516352/Garden_Planet_design_nm1hq2.jpg" },
    { type: "photo", title: "Porte di Roma", category: "Fotografia", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769516050/2025-11-23T15_58_07_C0377_y53ubm.jpg" },
  ],
  // ROW 3 — centro basso: testo tra le foto
  [
    { type: "photo", title: "Banana Republic", category: "Social Media", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1769512968/Banana_Republic_wwrxir.jpg" },
    { type: "photo", title: "Vita Attiva", category: "Branding", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773085187/Screenshot_2_rgb9g1.jpg" },
    { type: "text", label: "USER", stat: "EXPERIENCE", sub: "finalizzata alla vendita" },
    { type: "photo", title: "Hair Spa", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084326/Screenshot_2_ohz6ij.jpg" },
    { type: "photo", title: "RD Salon", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084409/Screenshot_6_kscqtg.jpg" },
  ],
  // ROW 4
  [
    { type: "photo", title: "GF Service", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773085031/Screenshot_3_w3ubpb.jpg" },
    { type: "photo", title: "Funeral Home", category: "Web Design", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773089052/Screenshot_8_exvaml.jpg" },
    { type: "text", label: "BRAND", stat: "IDENTITY", sub: "riconoscibile su ogni canale" },
    { type: "photo", title: "Porte di Roma", category: "Fotografia", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1766016460/1765739430363_qaqvc8.jpg" },
    { type: "photo", title: "Free Time Bar", category: "Branding", src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773082284/Brandin_Free_time-04_ixq7ut.jpg" },
  ]
];

// Helper to optimize Cloudinary URLs
const optimizeCloudinary = (url: string) => {
  if (!url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto:eco,w_600/');
};

// Apply optimization to all photo sources
showcaseRows.forEach(row => {
  row.forEach(item => {
    if (item.type === 'photo' && item.src) {
      item.src = optimizeCloudinary(item.src);
    }
  });
});

// =============================================================================
// MOBILE-ONLY ORDER CUSTOMIZATION
// =============================================================================
// This section allows for a different visual rhythm on smaller screens.
// We filter out text cards and ensure specific photo ordering.
const mobileShowcaseRows = showcaseRows.map((row, rowIndex) => {
  // Filter out text cards for mobile - "Voglio solo le foto colorate"
  let currentRow = row.filter(item => item.type === 'photo');
  
  if (rowIndex === 1) {
    // Ensure "Porte di Roma" is in the second position (index 1)
    const pdrIndex = currentRow.findIndex(item => item.title === "Porte di Roma");
    if (pdrIndex !== -1) {
      const pdr = currentRow.splice(pdrIndex, 1)[0];
      currentRow.splice(1, 0, pdr);
    }
  }
  return currentRow;
});

const ACCENT = "#06b6d4"; // Cyan accent

const ParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Intersection Observer to stop animation when not in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let rafId: number;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      // Slightly different smoothing for desktop vs mobile to ensure fluidity
      const lerpFactor = isMobile ? 0.1 : 0.12; 
      currentScroll = lerp(currentScroll, targetScroll, lerpFactor);

      // Force update on first frame or if there's a significant change
      const isFirstFrame = Math.abs(targetScroll - currentScroll) < 0.001;
      
      if (isFirstFrame || Math.abs(targetScroll - currentScroll) > 0.05) {
        const scrollOffset = currentScroll * 0.25;
        const totalCardWidth = 340 + 32; // width + gap

        rowRefs.current.forEach((row, i) => {
          if (!row) return;
          const direction = i % 2 === 0 ? 1 : -1;
          // Stagger rows slightly for visual interest
          const stagger = i % 2 === 0 ? -150 : 150;
          const x = Math.round(stagger + scrollOffset * direction);
          // Use translate3d for hardware acceleration
          row.style.transform = `translate3d(${x}px, 0, 0)`;

          // Gradual blur and active state logic
          const children = row.children;
          const numCards = children.length;
          const centerIndex = (numCards - 1) / 2;

          for (let j = 0; j < numCards; j++) {
            const child = children[j] as HTMLElement;
            // Calculate distance from viewport center
            const distance = Math.abs(x + (j - centerIndex) * totalCardWidth);
            
            // Gradual blur removed as requested
            child.style.filter = 'none';
            
            // Active state logic
            const isText = child.getAttribute('data-type') === 'text';
            const isHovered = child.matches(':hover');
            
            // Text cards activate when centered OR hovered
            // Photo cards activate ONLY when hovered
            // ON MOBILE: All cards are always active (hover effect always on)
            const isActive = isMobile ? true : (isText 
              ? (distance < totalCardWidth / 2.2 || isHovered)
              : isHovered);
            
            if (isActive && !isMobile) {
              if (isText) {
                // Neon effect for text cards (data cards)
                child.style.borderColor = "#06b6d4";
                child.style.boxShadow = `0 0 25px rgba(6,182,212,0.5), 0 0 50px rgba(6,182,212,0.2), inset 0 0 15px rgba(6,182,212,0.3)`;
              } else {
                // Photo cards: clean look, no neon, just standard active/hover style
                child.style.borderColor = "rgba(255,255,255,0.2)";
                child.style.boxShadow = "0 20px 40px rgba(0,0,0,0.8)";
              }
            } else if (isActive && isMobile) {
              // Mobile active state: no neon for text cards
              child.style.borderColor = isText ? "rgba(6,182,212,0.6)" : "rgba(255,255,255,0.2)";
              child.style.boxShadow = isText ? "none" : "0 20px 40px rgba(0,0,0,0.8)";
              
              child.style.transform = "scale(1.05)";
              child.style.zIndex = "10";
              
              const overlay = child.querySelector(".overlay") as HTMLElement;
              const thumb = child.querySelector(".thumb") as HTMLElement;
              // Hide overlay text on mobile as requested: "elimina le scritte sopra le card"
              if (overlay) overlay.style.opacity = "0";
              if (thumb) {
                thumb.style.transform = "scale(1.1)";
                thumb.style.filter = "grayscale(0%) brightness(1.1)";
              }
            } else {
              // Inactive state
              child.style.borderColor = isText ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.05)";
              child.style.boxShadow = isText ? "none" : "0 10px 30px rgba(0,0,0,0.6)";
              child.style.transform = "scale(1)";
              child.style.zIndex = "1";
              
              const overlay = child.querySelector(".overlay") as HTMLElement;
              const thumb = child.querySelector(".thumb") as HTMLElement;
              if (overlay) overlay.style.opacity = "0";
              if (thumb) {
                thumb.style.transform = "scale(1)";
                thumb.style.filter = "grayscale(100%) brightness(0.8)";
              }
            }
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, isMobile]);

  return (
    <section 
      ref={sectionRef}
      style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      background: "rgba(0,0,0,0.85)",
      padding: "192px 0",
      zIndex: 10,
    }}>
      {/* Ambient blobs */}
      <div style={{
        position: "absolute", top: 0, left: "25%",
        width: 600, height: 600, borderRadius: "50%",
        background: `rgba(6,182,212,0.07)`,
        filter: "blur(120px)", pointerEvents: "none",
        contain: "strict",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: "25%",
        width: 400, height: 400, borderRadius: "50%",
        background: `rgba(6,182,212,0.05)`,
        filter: "blur(120px)", pointerEvents: "none",
        contain: "strict",
      }} />

      {/* Background text */}
      {!isMobile && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 0, pointerEvents: "none", overflow: "hidden",
        }}>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: "15vw",
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            whiteSpace: "nowrap",
            transform: "rotate(-6deg) scale(1.1)",
            userSelect: "none",
          }}>
            Capolavori
          </h2>
        </div>
      )}

      {/* Label */}
      {!isMobile && (
        <div style={{
          position: "absolute", top: 32, left: 0, right: 0,
          textAlign: "center", zIndex: 20, pointerEvents: "none",
        }}>
          <span style={{
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.5)",
            color: "rgba(255,255,255,0.5)",
            fontSize: 10,
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Eccellenza Visiva
          </span>
        </div>
      )}

      {/* Rows */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        gap: 32,
        transform: "rotate(-6deg) scale(1.05)",
        transformOrigin: "center",
        padding: "48px 0",
      }}>
        {(isMobile ? mobileShowcaseRows : showcaseRows).map((row, rowIndex) => {
          return (
            <div
              key={rowIndex}
              ref={el => { rowRefs.current[rowIndex] = el; }}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 32,
                width: "100%",
                whiteSpace: "nowrap",
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {[...row, ...row, ...row].map((item, idx) => (
                item.type === "text"
                  ? <TextCard key={`${rowIndex}-${idx}`} item={item} />
                  : <CardItem key={`${rowIndex}-${idx}`} item={item} rowIndex={rowIndex} />
              ))}
            </div>
          );
        })}
      </div>

      {/* Fades */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 96,
        background: "linear-gradient(to bottom, #000, rgba(0,0,0,0.8), transparent)",
        zIndex: 20, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 96,
        background: "linear-gradient(to top, #000, rgba(0,0,0,0.8), transparent)",
        zIndex: 20, pointerEvents: "none",
      }} />
    </section>
  );
}

function TextCard({ item }: { item: any }) {
  return (
    <div 
      data-type="text"
      style={{
      position: "relative",
      width: 340,
      aspectRatio: "16/9",
      flexShrink: 0,
      borderRadius: 12,
      border: "1px solid rgba(6,182,212,0.2)",
      background: "rgba(6,182,212,0.04)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 32px",
      textAlign: "center",
      gap: 6,
      transition: "border-color .4s, box-shadow .4s",
    }}>
      {/* Label sopra */}
      <span style={{
        fontFamily: "'Barlow', sans-serif",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
      }}>
        {item.label}
      </span>

      {/* Numero/stat grande */}
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(52px, 5vw, 72px)",
        lineHeight: 1,
        color: "#06b6d4",
        letterSpacing: "-0.02em",
      }}>
        {item.stat}
      </span>

      {/* Frase sotto */}
      <span style={{
        fontFamily: "'Barlow', sans-serif",
        fontSize: 12,
        fontWeight: 400,
        color: "rgba(255,255,255,0.4)",
        letterSpacing: "0.04em",
        lineHeight: 1.4,
        maxWidth: 200,
      }}>
        {item.sub}
      </span>

      {/* Decorazione angolo */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        width: 16, height: 16,
        borderTop: "1px solid rgba(6,182,212,0.35)",
        borderLeft: "1px solid rgba(6,182,212,0.35)",
      }} />
      <div style={{
        position: "absolute", bottom: 12, right: 12,
        width: 16, height: 16,
        borderBottom: "1px solid rgba(6,182,212,0.35)",
        borderRight: "1px solid rgba(6,182,212,0.35)",
      }} />
    </div>
  );
}

function CardItem({ item, rowIndex }: { item: any, rowIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      data-type="photo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: 340, aspectRatio: "16/9",
        flexShrink: 0,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`,
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.8)" : "0 10px 30px rgba(0,0,0,0.6)",
        background: "#111",
        cursor: "pointer",
        transition: "all .4s cubic-bezier(0.165, 0.84, 0.44, 1)",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      <OptimizedImage
        className="thumb"
        src={item.src}
        alt={item.title}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform .7s cubic-bezier(0.165, 0.84, 0.44, 1), filter .5s ease",
        }}
      />
      <div
        className="overlay"
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity .3s ease",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: 20,
          zIndex: 2,
        }}
      >
        <span style={{
          fontSize: 10, fontWeight: 700,
          fontFamily: "'Barlow', sans-serif",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: ACCENT,
          marginBottom: 4, display: "block",
        }}>
          {item.category}
        </span>
        <h3 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: 20,
          color: "#fff", lineHeight: 1,
          letterSpacing: "0.05em",
        }}>
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default ParallaxSection;
