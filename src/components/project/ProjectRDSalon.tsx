import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar';
import OptimizedImage from '../OptimizedImage';

const ProjectRDSalon: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    // Hero entrance animations
    const timer = setTimeout(() => {
      ['ha0', 'ha1', 'ha2'].forEach((id, i) => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.classList.add('in');
        }, i * 100);
      });
    }, 80);

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vi');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });

    document.querySelectorAll('.rv').forEach(el => observer.observe(el));

    // Video thumb preview
    document.querySelectorAll<HTMLVideoElement>('.vthumb').forEach(v => {
      v.addEventListener('loadedmetadata', () => {
        v.currentTime = 0.5;
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const openV = (n: number) => {
    setActiveVideo(n);
    // Use a small timeout to ensure the element is rendered and active class is applied
    setTimeout(() => {
      const video = document.querySelector<HTMLVideoElement>(`#vp${n} video`);
      if (video) {
        video.play().catch(err => console.error("Video play failed:", err));
      }
    }, 50);
  };

  const closeV = (e: React.MouseEvent, n: number) => {
    e.stopPropagation();
    const video = document.querySelector<HTMLVideoElement>(`#vp${n} video`);
    if (video) video.pause();
    setActiveVideo(null);
  };

  const openLB = (url: string) => {
    setLightboxUrl(url);
  };

  const closeLB = () => {
    setLightboxUrl(null);
  };

  return (
    <>
      <Navbar />
      <div className="project-rd-salon">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;600;700&display=swap');
        
        .project-rd-salon {
          --a: #C084FC;
          --a2: #9B6FD4;
          --cyan: #06b6d4;
          --bg: #050508;
          background: var(--bg);
          color: #fff;
          font-family: 'Barlow', sans-serif;
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
        }

        .project-rd-salon ::selection { background: rgba(192,132,252,.25); }

        /* blobs */
        @keyframes b1 { 0%, 100% { transform: translate(0,0) } 40% { transform: translate(60px,-40px) } 70% { transform: translate(-25px,50px) } }
        @keyframes b2 { 0%, 100% { transform: translate(0,0) } 35% { transform: translate(-50px,60px) } 65% { transform: translate(40px,-25px) } }
        @keyframes b3 { 0%, 100% { transform: translate(0,0) } 50% { transform: translate(30px,40px) } }
        
        #blobs { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .b1 { position: absolute; width: 70vw; height: 70vw; border-radius: 50%; top: -18%; left: -14%; background: radial-gradient(circle,rgba(155,111,212,.2),rgba(109,40,217,.07) 45%,transparent 70%); filter: blur(88px); animation: b1 22s ease-in-out infinite; }
        .b2 { position: absolute; width: 60vw; height: 60vw; border-radius: 50%; top: 25%; right: -16%; background: radial-gradient(circle,rgba(192,132,252,.14),rgba(139,92,246,.05) 45%,transparent 70%); filter: blur(100px); animation: b2 28s ease-in-out infinite; }
        .b3 { position: absolute; width: 48vw; height: 48vw; border-radius: 50%; bottom: -10%; left: 20%; background: radial-gradient(circle,rgba(155,111,212,.1),transparent 65%); filter: blur(80px); animation: b3 32s ease-in-out infinite; }
        .bv { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%,transparent 22%,rgba(5,5,8,.8) 100%); }

        /* hero */
        #hero { position: relative; height: 92vh; min-height: 560px; overflow: hidden; }
        #hbg { position: absolute; inset: 0; }
        #hbg img { width: 100%; height: 100%; object-fit: cover; object-position: top; filter: brightness(.28) saturate(.55); }
        #hov { position: absolute; inset: 0; background: linear-gradient(140deg,rgba(155,111,212,.12) 0%,transparent 50%),linear-gradient(to top,#050508,rgba(5,5,8,.1) 65%,transparent); }
        #hline { position: absolute; top: 60px; left: 48px; right: 48px; height: 1px; background: linear-gradient(90deg,transparent,rgba(192,132,252,.4),transparent); z-index: 2; }
        #hc { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 52px 68px; z-index: 5; }
        .hm { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .hml { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: var(--a); }
        .hmd { width: 28px; height: 1px; background: rgba(192,132,252,.45); }
        .hmy { font-family: monospace; font-size: 10px; color: rgba(255,255,255,.28); letter-spacing: .1em; }
        .hmd2 { width: 28px; height: 1px; background: rgba(255,255,255,.12); }
        .hmloc { font-family: monospace; font-size: 10px; color: rgba(255,255,255,.2); letter-spacing: .08em; }
        .hh { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(68px, 11vw, 140px); color: #fff; text-transform: uppercase; letter-spacing: -.035em; line-height: .86; margin: 0; }
        .hho { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(68px, 11vw, 140px); color: transparent; -webkit-text-stroke: 2px rgba(192,132,252,.6); text-transform: uppercase; letter-spacing: -.035em; line-height: .86; margin: 0; }
        .ctlb { position: absolute; bottom: 32px; left: 52px; width: 18px; height: 18px; border-bottom: 1px solid rgba(255,255,255,.15); border-left: 1px solid rgba(255,255,255,.15); }
        .ctrb { position: absolute; bottom: 32px; right: 52px; width: 18px; height: 18px; border-bottom: 1px solid rgba(255,255,255,.15); border-right: 1px solid rgba(255,255,255,.15); }
        .ha { opacity: 0; transform: translateY(32px); transition: opacity .9s ease, transform .9s cubic-bezier(.23,1,.32,1); }
        .ha.in { opacity: 1; transform: translateY(0); }

        /* layout */
        .inn { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 0 52px; }
        .lbl { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: var(--a); display: block; margin-bottom: 18px; }
        .dvd { height: 1px; background: rgba(255,255,255,.07); }
        .sp { height: 80px; }

        /* reveal */
        .rv { opacity: 0; transform: translateY(28px); transition: opacity .9s ease, transform .9s cubic-bezier(.23,1,.32,1); }
        .rv.vi { opacity: 1; transform: translateY(0); }

        /* meta */
        .mg { display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1px solid rgba(255,255,255,.07); margin: 72px 0 88px; }
        .mc { padding: 24px 0; }
        .mc:not(:last-child) { border-right: 1px solid rgba(255,255,255,.07); padding-right: 28px; }
        .mc:not(:first-child) { padding-left: 28px; }
        .ml { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.25); margin-bottom: 10px; }
        .mv { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }

        /* overview */
        .ovt { font-family: 'Barlow', sans-serif; font-weight: 300; font-size: clamp(18px, 2vw, 24px); color: rgba(255,255,255,.75); line-height: 1.7; max-width: 720px; }

        /* full img */
        .fiw { border: 1px solid rgba(255,255,255,.05); overflow: hidden; border-radius: 4px; }
        .fiw img { width: 100%; display: block; object-fit: cover; }
        .ic { font-family: 'Barlow', sans-serif; font-size: 9px; color: rgba(255,255,255,.2); letter-spacing: .16em; text-transform: uppercase; font-weight: 600; margin-top: 12px; }

        /* split */
        .sg { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .sh { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(34px, 4vw, 52px); color: #fff; text-transform: uppercase; letter-spacing: -.02em; line-height: .9; margin-bottom: 24px; white-space: pre-line; }
        .sb { width: 28px; height: 2px; background: var(--a2); border-radius: 2px; margin-bottom: 24px; }
        .sp2 { font-family: 'Barlow', sans-serif; font-weight: 300; font-size: 15px; color: rgba(255,255,255,.48); line-height: 1.85; }
        .si { border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); }
        .si img { width: 100%; display: block; aspect-ratio: 1919/921; object-fit: cover; object-position: top; }

        /* 2 cols */
        .tc { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ci { border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,.05); }
        .ci img { width: 100%; display: block; object-fit: cover; object-position: top; }
        .cc { font-family: 'Barlow', sans-serif; font-size: 9px; color: rgba(255,255,255,.2); letter-spacing: .14em; text-transform: uppercase; font-weight: 600; margin-top: 10px; }

        /* section break */
        .skb { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 80px 52px 64px; }
        .ski { display: flex; align-items: center; gap: 24px; }
        .skn { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(80px, 10vw, 120px); color: transparent; -webkit-text-stroke: 1px rgba(192,132,252,.22); line-height: 1; flex-shrink: 0; }
        .skt { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(38px, 5vw, 68px); color: #fff; text-transform: uppercase; letter-spacing: -.03em; line-height: .88; }
        .skd { font-family: 'Barlow', sans-serif; font-weight: 300; font-size: 14px; color: rgba(255,255,255,.38); line-height: 1.7; margin-top: 14px; max-width: 480px; }
        .sklbl { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: var(--a); margin-bottom: 10px; }

        /* video grid — 3 cols vertical */
        .vg { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .vc { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(192,132,252,.2); cursor: pointer; background: #0a080f; aspect-ratio: 9/16; }
        .vthumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .vov { position: absolute; inset: 0; background: linear-gradient(to top,rgba(5,5,8,.75),rgba(5,5,8,.1) 60%); transition: background .3s; }
        .vc:hover .vov { background: linear-gradient(to top,rgba(5,5,8,.55),rgba(5,5,8,.05) 60%); }
        .vplay { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,.12); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.25); display: flex; align-items: center; justify-content: center; transition: all .3s; }
        .vc:hover .vplay { background: rgba(192,132,252,.45); border-color: var(--a); transform: translate(-50%,-50%) scale(1.08); }
        .vplay svg { margin-left: 3px; }
        .vlbl { position: absolute; bottom: 16px; left: 16px; right: 16px; }
        .vtag { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--a); display: block; margin-bottom: 6px; }
        .vtit { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; color: #fff; text-transform: uppercase; letter-spacing: -.01em; }
        .vplayer { display: none; position: absolute; inset: 0; z-index: 10; background: #000; }
        .vplayer.active { display: block; }
        .vplayer video { width: 100%; height: 100%; object-fit: contain; }
        .vcls { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,.6); border: 1px solid rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-size: 14px; z-index: 11; transition: all .2s; }
        .vcls:hover { background: rgba(192,132,252,.6); }

        /* foto grid */
        .fg { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
        .fc { border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,.04); cursor: zoom-in; position: relative; }
        .fc img { width: 100%; display: block; object-fit: cover; transition: transform .5s ease; }
        .fc:hover img { transform: scale(1.04); }
        .fw { grid-column: span 2; }

        /* lightbox */
        #lb { position: fixed; inset: 0; z-index: 1000; background: rgba(5,5,8,.95); backdrop-filter: blur(16px); display: none; align-items: center; justify-content: center; cursor: zoom-out; }
        #lb.open { display: flex; }
        #lb img { max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 4px; }
        #lbc { position: absolute; top: 24px; right: 24px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-size: 18px; transition: all .2s; }
        #lbc:hover { background: rgba(192,132,252,.4); }

        /* quote */
        .qw { border-top: 2px solid var(--a2); padding-top: 40px; }
        blockquote { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(28px, 3.6vw, 48px); color: #fff; text-transform: uppercase; letter-spacing: -.02em; line-height: 1.05; }

        /* stats */
        .stg { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(255,255,255,.07); border-bottom: 1px solid rgba(255,255,255,.07); padding: 60px 0; }
        .stc { padding-right: 44px; }
        .stc:not(:first-child) { border-left: 1px solid rgba(255,255,255,.07); padding-left: 44px; padding-right: 0; }
        .stv { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 58px; color: #fff; letter-spacing: -.03em; line-height: 1; margin-bottom: 8px; text-shadow: 0 0 40px rgba(192,132,252,0.35); }
        .stl { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.25); }

        /* tags */
        .tgs { display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 96px; }
        .tg { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.4); border: 1px solid rgba(255,255,255,.1); border-radius: 4px; padding: 8px 18px; cursor: default; transition: all .2s; }
        .tg:hover { color: var(--a); border-color: rgba(192,132,252,.4); background: rgba(192,132,252,.06); }

        /* cta */
        #cta { position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,.06); text-align: center; padding: 120px 52px 72px; }
        #ctal { position: absolute; top: 0; left: 12%; right: 12%; height: 1px; background: linear-gradient(90deg,transparent,rgba(6,182,212,.33),transparent); }
        .ctlbl { font-family: 'Barlow', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: var(--cyan); margin-bottom: 22px; }
        .cth { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(60px, 10vw, 128px); color: #fff; text-transform: uppercase; letter-spacing: -.035em; line-height: .86; margin: 0 0 44px; }
        .cts { font-family: 'Barlow', sans-serif; font-weight: 300; font-size: 15px; color: rgba(255,255,255,.32); line-height: 1.75; max-width: 380px; margin: 0 auto 48px; }
        .ctb { display: inline-flex; align-items: center; gap: 12px; padding: 15px 44px; background: transparent; border: 1.5px solid rgba(255,255,255,.22); border-radius: 999px; font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #fff; text-decoration: none; transition: all .3s cubic-bezier(.23,1,.32,1); }
        .ctb:hover { background: var(--cyan); border-color: var(--cyan); color: #050508; }
        .ctf { margin-top: 52px; border-top: 1px solid rgba(255,255,255,.05); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
        .ctfb { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.18); }
        .ctfc { font-family: 'Barlow', sans-serif; font-size: 10px; color: rgba(255,255,255,.14); }

        /* ecomm */
        .ec { border: 1px solid rgba(192,132,252,.18); border-radius: 16px; overflow: hidden; background: rgba(10,6,18,.6); position: relative; }
        .ec::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(to right,transparent,var(--a),transparent); }
        .ec img { width: 100%; display: block; object-fit: cover; object-position: top; }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
          #hero { height: 70vh; min-height: 400px; }
          #hc { padding: 0 24px 48px; }
          .hm { flex-wrap: wrap; gap: 8px; }
          .hh, .hho { font-size: 52px; }
          .inn { padding: 0 24px; }
          .mg { grid-template-columns: 1fr 1fr; margin: 48px 0; }
          .mc { padding: 16px 0; }
          .mc:nth-child(even) { border-right: none; padding-right: 0; padding-left: 16px; }
          .mc:nth-child(odd) { padding-right: 16px; padding-left: 0; }
          .mc:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,.07); }
          .sg { grid-template-columns: 1fr; gap: 40px; }
          .sh { font-size: 38px; }
          .tc { grid-template-columns: 1fr; }
          .vg { grid-template-columns: 1fr; }
          .fg { grid-template-columns: 1fr 1fr; }
          .fw { grid-column: span 2; }
          .stg { grid-template-columns: 1fr; padding: 40px 0; }
          .stc { padding: 24px 0; border-left: none !important; padding-left: 0 !important; }
          .stc:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,.07); }
          .skb { padding: 60px 24px 40px; }
          .ski { flex-direction: column; align-items: flex-start; gap: 12px; }
          .skn { font-size: 60px; }
          .skt { font-size: 32px; }
          .sg-item-1 { order: 1; }
          .sg-item-2 { order: 2; }
          .vg { 
            display: flex; 
            overflow-x: auto; 
            scroll-snap-type: x mandatory; 
            gap: 16px; 
            padding-bottom: 20px;
            margin: 0 -24px;
            padding-left: 24px;
            padding-right: 24px;
            -webkit-overflow-scrolling: touch;
          }
          .vg::-webkit-scrollbar { display: none; }
          .vc { 
            flex: 0 0 85%; 
            scroll-snap-align: center; 
          }
          #cta { padding: 80px 24px 48px; }
          .cth { font-size: 48px; }
          .ctf { flex-direction: column; gap: 16px; text-align: center; }
          .ctlb, .ctrb { left: 24px; right: 24px; bottom: 24px; }
        }
      `}</style>

      <div id="blobs">
        <div className="b1"></div><div className="b2"></div><div className="b3"></div>
        <div className="bv"></div>
      </div>

      {/* LIGHTBOX */}
      {lightboxUrl && (
        <div id="lb" className="open" onClick={closeLB}>
          <div id="lbc" onClick={closeLB}>✕</div>
          <OptimizedImage id="lbi" src={lightboxUrl} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <button 
        onClick={() => navigate('/#lavori')}
        className="fixed top-8 left-8 md:left-12 z-[100] w-12 h-12 hidden md:flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-full group hover:bg-white hover:border-[#06b6d4] transition-all duration-500 shadow-2xl"
        title="Torna ai lavori"
      >
        <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* HERO */}
      <section id="hero">
        <div id="hbg">
          <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379623/1765792030088_xvxpzz.jpg" alt="RD Salon" />
          <div id="hov"></div>
        </div>
        <div id="hline"></div>
        <div id="hc">
          <div className="hm ha" id="ha0">
            <span className="hml">Web · Social · Foto</span>
            <div className="hmd"></div>
            <span className="hmy">2024</span>
            <div className="hmd2"></div>
            <span className="hmloc">Ceccano · Frosinone</span>
          </div>
          <h1 className="hh ha" id="ha1">RD Salon</h1>
          <h1 className="hho ha" id="ha2">Minimal Luxury Hair</h1>
        </div>
        <div className="ctlb"></div><div className="ctrb"></div>
      </section>

      {/* META */}
      <div className="inn">
        <div className="mg">
          <div className="mc rv"><p className="ml">Cliente</p><p className="mv">RD Salon</p></div>
          <div className="mc rv" style={{ transitionDelay: '.07s' }}><p className="ml">Ruolo</p><p className="mv">Web · Social · Foto</p></div>
          <div className="mc rv" style={{ transitionDelay: '.14s' }}><p className="ml">Partenza</p><p className="mv">Da zero</p></div>
          <div className="mc rv" style={{ transitionDelay: '.21s' }}><p className="ml">Esito</p><p className="mv">+70 app. / 3 mesi</p></div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="inn" style={{ paddingBottom: '96px' }}>
        <span className="lbl rv">Overview</span>
        <p className="ovt rv" style={{ transitionDelay: '.08s' }}>RD Salon partiva da zero su tutti i fronti — nessun sito, nessun profilo curato, nessuna foto professionale. Ho costruito l'intera presenza digitale: un sito minimal luxury, una gestione social con produzione contenuti in-house e un servizio fotografico dedicato agli spazi del salone. In tre mesi, +70 nuovi appuntamenti direttamente attribuibili alla presenza online.</p>
      </div>

      {/* ══ 01 SITO ══ */}
      <div className="skb rv">
        <div className="ski">
          <div className="skn">01</div>
          <div>
            <div className="sklbl">Capitolo primo</div>
            <div className="skt">Sito Web<br /><span style={{ WebkitTextStroke: '1.5px rgba(192,132,252,.45)', color: 'transparent' }}>Minimal Luxury</span></div>
            <p className="skd">Un sito che trasmette la stessa cura riservata ai clienti in salone — nero, viola, essenzialità. Ogni pixel pensato per attrarre il cliente giusto.</p>
          </div>
        </div>
      </div>

      <div className="inn" style={{ paddingBottom: '12px' }}>
        <div className="rv">
          <div className="fiw" style={{ aspectRatio: '1919/921' }}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084408/Screenshot_1_bvb6od.jpg" alt="Homepage" style={{ height: '100%', objectPosition: 'top' }} />
          </div>
          <p className="ic">01 — Homepage above the fold</p>
        </div>
      </div>
      <div className="sp"></div>

      <div className="inn" style={{ paddingBottom: '112px' }}>
        <div className="sg">
          <div className="rv">
            <span className="lbl">La sfida</span>
            <h2 className="sh">Sembrare{"\n"}premium{"\n"}senza{"\n"}dirlo.</h2>
            <div className="sb"></div>
            <p className="sp2">Nero profondo, viola come accento, tipografia bold — un sistema visivo che comunica lusso prima ancora che l'utente legga una parola. La sfida era costruire un'estetica riconoscibile al primo sguardo, coerente su sito, social e stampa.</p>
          </div>
          <div className="rv" style={{ transitionDelay: '.12s' }}>
            <div className="si"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084408/Screenshot_2_cpkr0t.jpg" alt="Servizi" /></div>
          </div>
        </div>
      </div>

      <div className="inn" style={{ marginBottom: '64px' }}><div className="dvd"></div></div>
      <div style={{ height: '40px' }}></div>

      <div className="inn" style={{ paddingBottom: '12px' }}>
        <div className="tc">
          <div className="rv">
            <div className="ci" style={{ aspectRatio: '1919/921' }}><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084408/Screenshot_3_wqhnxk.jpg" alt="Lavori" style={{ height: '100%' }} /></div>
            <p className="cc">02 — Sezione Lavori</p>
          </div>
          <div className="rv" style={{ transitionDelay: '.1s' }}>
            <div className="ci" style={{ aspectRatio: '1919/921' }}><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084409/Screenshot_6_kscqtg.jpg" alt="Storia" style={{ height: '100%' }} /></div>
            <p className="cc">03 — Sezione Storia</p>
          </div>
        </div>
      </div>
      <div className="sp"></div>

      <div className="inn" style={{ paddingBottom: '112px' }}>
        <div className="sg">
          <div className="rv sg-item-2" style={{ transitionDelay: '.1s' }}>
            <div className="ec">
              <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084327/Screenshot_5_pursfi.jpg" alt="Landing Page Hair Spa" style={{ aspectRatio: '1919/921' }} />
            </div>
            <p className="ic">04 — landing page hair spa</p>
          </div>
          <div className="rv sg-item-1">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(192,132,252,.3)', borderRadius: '100px', padding: '7px 16px', fontFamily: "'Barlow',sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--a)', background: 'rgba(192,132,252,.07)', marginBottom: '20px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--a)', display: 'block' }}></span>
              Cross-selling integrato
            </div>
            <h2 className="sh">landing page hair spa</h2>
            <div className="sb"></div>
            <p className="sp2">Il sito dialoga con l'Hair Spa — sezione dedicata che porta il cliente da un'esperienza all'altra, aumentando il valore medio senza aumentare i costi.</p>
            <div style={{ marginTop: '24px' }}>
              <div className="ec"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839203/collegamento_ritual_hair_spa_do4mec.jpg" alt="Hair Spa" style={{ aspectRatio: '1919/921', objectPosition: 'top' }} /></div>
              <p className="ic">05 — Collegamento Ritual Hair Spa</p>
            </div>
          </div>
        </div>
      </div>

      <div className="inn" style={{ paddingBottom: '112px' }}>
        <div className="rv">
          <div className="qw">
            <blockquote dangerouslySetInnerHTML={{ __html: '"Un salone di qualità<br>merita una presenza digitale<br>alla sua altezza."' }} />
          </div>
        </div>
      </div>

      {/* ══ 02 SOCIAL ══ */}
      <div className="skb rv">
        <div className="ski">
          <div className="skn">02</div>
          <div>
            <div className="sklbl">Capitolo secondo</div>
            <div className="skt">Social Media<br /><span style={{ WebkitTextStroke: '1.5px rgba(192,132,252,.45)', color: 'transparent' }}>Content Production</span></div>
            <p className="skd">Feed Instagram curato, Reels e Stories prodotti in-house. Tre format diversi — mood, consulenza, brand story — per costruire una presenza che cresce nel tempo.</p>
          </div>
        </div>
      </div>

      {/* Mobile-only feed photo move */}
      <div className="inn block md:hidden mb-10 rv">
          <div className="si"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839517/social_qm63bp.jpg" alt="Social feed" /></div>
      </div>

      <div className="inn" style={{ paddingBottom: '80px' }}>
        <div className="sg">
          <div className="rv">
            <span className="lbl">Il feed</span>
            <h2 className="sh">Tre format.{"\n"}Un'unica{"\n"}voce.</h2>
            <div className="sb"></div>
            <p className="sp2">Ogni tipo di contenuto serve uno scopo preciso: il mood video cattura l'attenzione, la consulenza dimostra la competenza, la brand story crea fiducia. Insieme costruiscono un profilo che vende senza sembrare che stia vendendo.</p>
          </div>
          <div className="rv hidden md:block" style={{ transitionDelay: '.12s' }}>
            <div className="si"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839517/social_qm63bp.jpg" alt="Social feed" /></div>
          </div>
        </div>
      </div>

      {/* 3 VIDEO REELS */}
      <div className="inn" style={{ paddingBottom: '16px' }}>
        <span className="lbl rv">Reels — clicca per guardare</span>
        <div className="vg rv" style={{ transitionDelay: '.08s' }}>

          {/* MOOD */}
          <div className="vc" id="vc1" onClick={() => openV(1)}>
            <video className="vthumb" src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1770651786/Ginevra_t229x1.mov" muted playsInline preload="metadata"></video>
            <div className="vov"></div>
            <div className="vplay"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            <div className="vlbl">
              <span className="vtag">Mood · Reel</span>
              <div className="vtit">Video Taglio</div>
            </div>
            <div className={`vplayer ${activeVideo === 1 ? 'active' : ''}`} id="vp1">
              <div className="vcls" onClick={(e) => closeV(e, 1)}>✕</div>
              <video controls playsInline muted preload="auto" style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                <source src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1770651786/Ginevra_t229x1.mov" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* CONSULENZA */}
          <div className="vc" id="vc2" onClick={() => openV(2)}>
            <video className="vthumb" src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845155/0318_tflaqt.mov" muted playsInline preload="metadata"></video>
            <div className="vov"></div>
            <div className="vplay"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            <div className="vlbl">
              <span className="vtag">Consulenza · Reel</span>
              <div className="vtit">Consulenza Colore</div>
            </div>
            <div className={`vplayer ${activeVideo === 2 ? 'active' : ''}`} id="vp2">
              <div className="vcls" onClick={(e) => closeV(e, 2)}>✕</div>
              <video controls playsInline muted preload="auto" style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                <source src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845155/0318_tflaqt.mov" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* BRAND STORY */}
          <div className="vc" id="vc3" onClick={() => openV(3)}>
            <video className="vthumb" src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845362/lv_0_20260318153958_r4ecdo.mp4" muted playsInline preload="metadata"></video>
            <div className="vov"></div>
            <div className="vplay"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            <div className="vlbl">
              <span className="vtag">Brand Story · Reel</span>
              <div className="vtit">La Storia del Brand</div>
            </div>
            <div className={`vplayer ${activeVideo === 3 ? 'active' : ''}`} id="vp3">
              <div className="vcls" onClick={(e) => closeV(e, 3)}>✕</div>
              <video controls playsInline muted preload="auto" style={{ width: '100%', height: '100%', objectFit: 'contain' }}>
                <source src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845362/lv_0_20260318153958_r4ecdo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </div>
      <div className="sp"></div>

      {/* ══ 03 FOTO ══ */}
      <div className="skb rv">
        <div className="ski">
          <div className="skn">03</div>
          <div>
            <div className="sklbl">Capitolo terzo</div>
            <div className="skt">Fotografia<br /><span style={{ WebkitTextStroke: '1.5px rgba(192,132,252,.45)', color: 'transparent' }}>del Salone</span></div>
            <p className="skd">Un solo shooting strutturato per alimentare sito, social e stampa. Luce naturale, spazi, dettagli — tutto quello che fa dire "voglio venire qui".</p>
          </div>
        </div>
      </div>

      <div className="inn" style={{ paddingBottom: '80px' }}>
        <div className="sg">
          <div className="rv" style={{ transitionDelay: '.1s' }}>
            <div className="si" style={{ borderRadius: '12px' }}><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379623/1765792030088_xvxpzz.jpg" alt="Salone vista natura" style={{ aspectRatio: '4/5', objectFit: 'cover' }} /></div>
          </div>
          <div className="rv hidden md:block">
            <span className="lbl">Il servizio fotografico</span>
            <h2 className="sh">Spazi che{"\n"}parlano{"\n"}da soli.</h2>
            <div className="sb"></div>
            <p className="sp2">Le foto non erano solo per il sito — sono il materiale che alimenta il feed Instagram, le Stories, le campagne. Un singolo shooting per produrre contenuto su tutti i canali. Luce naturale, dettagli, atmosfera.</p>
            <div style={{ marginTop: '32px', display: 'flex', gap: '32px' }}>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: '32px', color: '#fff', textShadow: '0 0 20px rgba(192,132,252,.3)' }}>1</div>
                <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginTop: '4px' }}>Shooting</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: '32px', color: '#fff', textShadow: '0 0 20px rgba(192,132,252,.3)' }}>3</div>
                <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginTop: '4px' }}>Canali alimentati</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: '32px', color: '#fff', textShadow: '0 0 20px rgba(192,132,252,.3)' }}>6</div>
                <div style={{ fontFamily: "'Barlow',sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.25)', marginTop: '4px' }}>Foto consegnate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* foto gallery */}
      <div className="inn" style={{ paddingBottom: '12px' }}>
        <span className="lbl rv">Galleria — clicca per ingrandire</span>
        <div className="fg rv" style={{ transitionDelay: '.08s' }}>
          <div className="fc fw" style={{ aspectRatio: '2/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379698/1765792005078_pabsbi.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379698/1765792005078_pabsbi.jpg" alt="Lavaggi vista natura" style={{ height: '100%' }} />
          </div>
          <div className="fc" style={{ aspectRatio: '1/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379650/1765792022641_xwemu6.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379650/1765792022641_xwemu6.jpg" alt="Logo" style={{ objectFit: 'contain', background: '#0a0610', padding: '20px', height: '100%' }} />
          </div>
          <div className="fc" style={{ aspectRatio: '1/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379687/1765791978731_yhe4jd.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379687/1765791978731_yhe4jd.jpg" alt="Salone interno" style={{ height: '100%' }} />
          </div>
          <div className="fc" style={{ aspectRatio: '1/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379657/_DSC6220_azzc67.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379657/_DSC6220_azzc67.jpg" alt="Dettaglio sedute" style={{ height: '100%' }} />
          </div>
          <div className="fc" style={{ aspectRatio: '1/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379620/1765792026288_k9gsoc.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379620/1765792026288_k9gsoc.jpg" alt="Salone dettaglio" style={{ height: '100%' }} />
          </div>
          <div className="fc fw" style={{ aspectRatio: '2/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379623/1765792030088_xvxpzz.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379623/1765792030088_xvxpzz.jpg" alt="Salone vista natura" style={{ height: '100%' }} />
          </div>
          <div className="fc hidden md:block" style={{ aspectRatio: '1/1' }} onClick={(e) => openLB('https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379651/_DSC6210_w1l1lm.jpg')}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1767379651/_DSC6210_w1l1lm.jpg" alt="Salone" style={{ height: '100%' }} />
          </div>
        </div>
      </div>
      <div className="sp"></div>

      {/* STATS */}
      <div className="inn" style={{ paddingBottom: '112px' }}>
        <div className="stg rv">
          <div className="stc"><div className="stv">+70</div><div className="stl">Nuovi appuntamenti in 3 mesi</div></div>
          <div className="stc"><div className="stv">3</div><div className="stl">Canali costruiti da zero</div></div>
          <div className="stc"><div className="stv">2</div><div className="stl">Brand collegati in cross-selling</div></div>
        </div>
      </div>

      {/* TAGS */}
      <div className="inn rv">
        <div className="tgs">
          <span className="tg">Web Design</span><span className="tg">UX/UI</span><span className="tg">Minimal Luxury</span>
          <span className="tg">E-commerce</span><span className="tg">Cross-selling</span><span className="tg">Social Media</span>
          <span className="tg">Instagram</span><span className="tg">Reels & Stories</span><span className="tg">Fotografia</span>
          <span className="tg">Da zero</span><span className="tg">Local Business</span>
        </div>
      </div>

      {/* CTA */}
      <section id="cta">
        <div id="ctal"></div>
        <div className="rv"><p className="ctlbl">Progetto simile?</p></div>
        <div className="rv"><h2 className="cth">PARLIAMOCI.</h2></div>
        <div className="rv"><p className="cts">Raccontami la tua attività. Capiremo insieme da dove partire.</p></div>
        <div className="rv" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button className="ctb" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            RICHIEDI ANALISI
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </button>
          <button className="ctb" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
            PARLAMI DEL TUO PROGETTO
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </button>
        </div>
        <div className="rv ctf">
          <span className="ctfb">Innovedia</span>
          <span className="ctfc">© 2025 Ludovico Colasanti</span>
        </div>
      </section>
    </div>
    </>
  );
};

export default ProjectRDSalon;
