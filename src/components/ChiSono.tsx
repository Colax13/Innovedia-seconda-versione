import React, { useEffect, useRef } from 'react';

const ChiSono: React.FC = () => {
  const driverRef = useRef<HTMLDivElement>(null);
  const pbarRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  
  const ph1Ref = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const driver = driverRef.current;
    const pbar = pbarRef.current;
    const blobA = blobARef.current;
    const blobB = blobBRef.current;
    const panel = ph1Ref.current;
    const img = imgRef.current;
    const imgContainer = imgContainerRef.current;

    if (!driver || !pbar || !blobA || !blobB || !panel || !img || !imgContainer) return;

    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

    const onScroll = () => {
      const rect = driver.getBoundingClientRect();
      const winH = window.innerHeight;
      const isMobile = window.innerWidth <= 768;
      
      // Calculate progress based on section visibility in viewport
      const start = winH;
      const end = -rect.height;
      const prog = clamp((start - rect.top) / (start - end), 0, 1);

      pbar.style.width = (prog * 100) + '%';

      blobA.style.transform = `translateY(${prog * -120}px) translateX(${prog * 60}px)`;
      blobB.style.transform = `translateY(${prog * 100}px) translateX(${prog * -40}px)`;

      // Entrance and Exit for the image
      let imgX = 0;
      let imgOp = 1;

      if (isMobile) {
        // On mobile, trigger animation based on image container visibility
        const imgRect = imgContainer.getBoundingClientRect();
        const imgStart = winH;
        const imgEnd = -imgRect.height;
        const imgProg = clamp((imgStart - imgRect.top) / (imgStart - imgEnd), 0, 1);

        if (imgProg < 0.5) {
          const t = clamp(imgProg / 0.5, 0, 1);
          imgX = lerp(100, 0, ease(t));
          imgOp = ease(t);
        } else if (imgProg > 0.8) {
          const t = clamp((imgProg - 0.8) / 0.2, 0, 1);
          imgX = lerp(0, 150, ease(t));
          imgOp = 1 - ease(t);
        }
      } else {
        // Desktop logic remains the same
        if (prog < 0.4) {
          const t = clamp(prog / 0.4, 0, 1);
          imgX = lerp(150, 0, ease(t));
          imgOp = ease(t);
        } else if (prog > 0.6) {
          const t = clamp((prog - 0.6) / 0.4, 0, 1);
          imgX = lerp(0, 300, ease(t));
          imgOp = 1 - ease(t);
        }
      }

      img.style.transform = `translateX(${imgX}px)`;
      img.style.opacity = imgOp.toString();
      
      // Text fade in
      const textOp = clamp(prog / 0.3, 0, 1);
      panel.style.opacity = textOp.toString();
      panel.style.transform = `translateY(${lerp(30, 0, ease(textOp))}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --teal:  #00c8c8;
          --tdim:  rgba(0,200,200,0.12);
          --white: #e8f0f0;
          --muted: rgba(232,240,240,0.4);
          --line:  rgba(0,200,200,0.14);
        }

        .about-driver {
          min-height: 100vh;
          position: relative;
          background: transparent;
          z-index: 10;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 100px 0;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          filter: blur(80px);
        }
        .blob-a {
          width: 700px; height: 700px;
          top: -200px; left: -150px;
          background: radial-gradient(circle, rgba(0,160,140,0.22), transparent 70%);
        }
        .blob-b {
          width: 500px; height: 500px;
          bottom: -150px; right: -100px;
          background: radial-gradient(circle, rgba(0,60,160,0.2), transparent 70%);
        }

        .progress-bar {
          position: absolute;
          left: 0; top: 0;
          height: 2px;
          background: var(--teal);
          width: 0%;
          transition: width 0.05s linear;
          z-index: 10;
        }

        .panel {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 8vw;
          will-change: opacity, transform;
          position: relative;
          z-index: 5;
        }

        .bio-wrap { 
          max-width: 650px; 
          z-index: 10;
        }
        
        .bio-label {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 28px;
        }
        .bio-text {
          font-size: clamp(18px, 2.2vw, 26px);
          line-height: 1.6;
          font-weight: 300;
          color: rgba(232,240,240,0.7);
        }
        .bio-text strong {
          color: var(--white);
          font-weight: 600;
        }

        .image-container {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          pointer-events: none;
          z-index: 1;
        }

        /* Background glow for the image to blend better */
        .image-glow {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle at center, rgba(0,200,200,0.15), transparent 70%);
          filter: blur(60px);
          z-index: -1;
        }

        .profile-image {
          height: 95%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: bottom right;
          /* Refined blending mask */
          mask-image: linear-gradient(to left, black 30%, transparent 95%), 
                      linear-gradient(to top, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, black 30%, transparent 95%), 
                              linear-gradient(to top, black 70%, transparent 100%);
          mask-composite: intersect;
          -webkit-mask-composite: source-in;
          will-change: transform, opacity;
          opacity: 0;
        }

        @media (max-width: 768px) {
          .about-driver { padding: 60px 0 0; align-items: flex-start; min-height: auto; display: block; }
          .panel { flex-direction: column; padding: 0 6vw; text-align: left; display: block; }
          .bio-wrap { max-width: 100%; margin-bottom: 20px; }
          .bio-text { font-size: 18px; }
          .image-container { position: relative; width: 100%; height: 50vh; margin-top: 0; display: flex; align-items: flex-end; justify-content: center; }
          .profile-image { height: 100%; object-position: bottom center; mask-image: linear-gradient(to top, black 70%, transparent 100%); -webkit-mask-image: linear-gradient(to top, black 70%, transparent 100%); }
          .image-glow { right: 0; bottom: 0; width: 100%; height: 100%; }
        }
      `}</style>

      <div className="about-driver" ref={driverRef} id="chi-sono">
        <div className="progress-bar" ref={pbarRef}></div>
        <div className="blob blob-a" ref={blobARef}></div>
        <div className="blob blob-b" ref={blobBRef}></div>

        <div className="panel p1" ref={ph1Ref}>
          <div className="bio-wrap">
            <div className="bio-label">Chi sono</div>
            <p className="bio-text">
              Ciao mi chiamo Ludovico e ho studiato digital marketing e comunicazione d'impresa, e mi occupo di <strong>web design e comunicazione digitale</strong> per le PMI.<br/><br/>
              Per riassumere ciò che faccio possiamo dire che mi occupo di capire <strong>il tuo busisness</strong> e fare in modo che lo conoscano anche gli altri.<br/><br/>
              Il mio approccio si basa su un principio fondamentale: <strong>fare tante domande</strong> finché non ho chiaro <strong>chi sei, a chi parli e cosa ti distingue.</strong><br/><br/>
              Solo allora costruisco <strong>il sistema visivo</strong> con cui la tua azienda comunica ogni giorno: <strong>identità, sito, contenuti.</strong>
            </p>
          </div>
        </div>

        <div className="image-container" ref={imgContainerRef}>
          <div className="image-glow"></div>
          <img 
            ref={imgRef}
            src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1774028261/Senza_titolo-1_yamovm.png" 
            alt="Ludovico Colasanti" 
            className="profile-image"
          />
        </div>
      </div>
    </>
  );
};

export default ChiSono;
