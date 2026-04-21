import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../Navbar';
import OptimizedImage from '../OptimizedImage';
import { useForms } from '../../context/FormContext';

const ProjectFreeTime: React.FC = () => {
  const navigate = useNavigate();
  const { openAnalysisForm, openServiceForm } = useForms();
  const [scrolled, setScrolled] = useState(false);

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
    }, { threshold: 0.08 });

    document.querySelectorAll('.rv').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="project-free-time">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;600;700&display=swap');
          
          .project-free-time {
            --o: #E8671A;
            --c: #E8671A;
            --bg: #050508;
            background: var(--bg);
            color: #fff;
            font-family: 'Barlow', sans-serif;
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
          }

          .project-free-time * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes b1 { 0%, 100% { transform: translate(0,0) } 40% { transform: translate(70px,-50px) } 70% { transform: translate(-30px,60px) } }
        @keyframes b2 { 0%, 100% { transform: translate(0,0) } 35% { transform: translate(-60px,70px) } 65% { transform: translate(50px,-30px) } }
        @keyframes b3 { 0%, 100% { transform: translate(0,0) } 50% { transform: translate(40px,50px) } }
        
        #bl { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .b1 { position: absolute; width: 75vw; height: 75vw; border-radius: 50%; top: -20%; left: -15%; background: radial-gradient(circle,rgba(232,103,26,.2),rgba(232,103,26,.07) 45%,transparent 70%); filter: blur(90px); animation: b1 22s ease-in-out infinite; }
        .b2 { position: absolute; width: 65vw; height: 65vw; border-radius: 50%; top: 30%; right: -18%; background: radial-gradient(circle,rgba(232,103,26,.16),rgba(232,103,26,.06) 45%,transparent 70%); filter: blur(100px); animation: b2 28s ease-in-out infinite; }
        .b3 { position: absolute; width: 50vw; height: 50vw; border-radius: 50%; bottom: -10%; left: 20%; background: radial-gradient(circle,rgba(232,103,26,.12),transparent 65%); filter: blur(80px); animation: b3 32s ease-in-out infinite; }
        .bv { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%,transparent 25%,rgba(5,5,8,.8) 100%); }

        #hero { position: relative; height: 92vh; min-height: 560px; overflow: hidden; }
        #hbg { position: absolute; inset: 0; }
        #hbg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.28) saturate(.6); }
        #hov { position: absolute; inset: 0; background: linear-gradient(140deg,rgba(232,103,26,.1),transparent 50%),linear-gradient(to top,#050508,rgba(5,5,8,.1) 65%,transparent); }
        #hl { position: absolute; top: 60px; left: 48px; right: 48px; height: 1px; background: linear-gradient(90deg,transparent,rgba(232,103,26,.3),transparent); z-index: 2; }
        #hc { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 52px 68px; z-index: 5; }
        .hm { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .hml { font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: var(--o); }
        .hd { width: 28px; height: 1px; background: rgba(232,103,26,.35); }
        .hy { font-family: monospace; font-size: 10px; color: rgba(255,255,255,.28); }
        .hd2 { width: 28px; height: 1px; background: rgba(255,255,255,.12); }
        .hloc { font-family: monospace; font-size: 10px; color: rgba(255,255,255,.2); }
        .hh { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(68px, 11vw, 140px); color: #fff; text-transform: uppercase; letter-spacing: -.035em; line-height: .86; margin: 0; }
        .hho { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(68px, 11vw, 140px); color: transparent; -webkit-text-stroke: 2px rgba(232,103,26,.55); text-transform: uppercase; letter-spacing: -.035em; line-height: .86; margin: 0; }
        .ctl { position: absolute; bottom: 32px; left: 52px; width: 18px; height: 18px; border-bottom: 1px solid rgba(255,255,255,.15); border-left: 1px solid rgba(255,255,255,.15); }
        .ctr { position: absolute; bottom: 32px; right: 52px; width: 18px; height: 18px; border-bottom: 1px solid rgba(255,255,255,.15); border-right: 1px solid rgba(255,255,255,.15); }
        .ha { opacity: 0; transform: translateY(32px); transition: opacity .9s ease, transform .9s cubic-bezier(.23,1,.32,1); }
        .ha.in { opacity: 1; transform: translateY(0); }

        .inn { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; padding: 0 52px; }
        .lbl { font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: var(--o); display: block; margin-bottom: 18px; }
        .dvd { height: 1px; background: rgba(255,255,255,.07); }
        .sp { height: 80px; }
        .rv { opacity: 0; transform: translateY(28px); transition: opacity .9s ease, transform .9s cubic-bezier(.23,1,.32,1); }
        .rv.vi { opacity: 1; transform: translateY(0); }

        .mg { display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1px solid rgba(255,255,255,.07); margin: 72px 0 88px; }
        .mc { padding: 24px 0; }
        .mc:not(:last-child) { border-right: 1px solid rgba(255,255,255,.07); padding-right: 28px; }
        .mc:not(:first-child) { padding-left: 28px; }
        .mla { font-size: 9px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase; color: rgba(255,255,255,.25); margin-bottom: 10px; }
        .mv { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
        .ovt { font-weight: 300; font-size: clamp(18px, 2vw, 24px); color: rgba(255,255,255,.75); line-height: 1.7; max-width: 720px; }

        .fw { border: 1px solid rgba(255,255,255,.05); overflow: hidden; border-radius: 4px; }
        .fw img { width: 100%; display: block; object-fit: cover; }
        .cap { font-size: 9px; color: rgba(255,255,255,.2); letter-spacing: .16em; text-transform: uppercase; font-weight: 600; margin-top: 12px; }

        .sg { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .sh { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(34px, 4vw, 52px); color: #fff; text-transform: uppercase; letter-spacing: -.02em; line-height: .9; margin-bottom: 24px; white-space: pre-line; }
        .sbar { width: 28px; height: 2px; background: var(--o); border-radius: 2px; margin-bottom: 24px; }
        .spt { font-weight: 300; font-size: 15px; color: rgba(255,255,255,.48); line-height: 1.85; }
        .si { border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.06); }
        .si img { width: 100%; display: block; aspect-ratio: 4/3; object-fit: cover; }

        .tc { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ci { border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,.05); aspect-ratio: 4/3; }
        .ci img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .cc { font-size: 9px; color: rgba(255,255,255,.2); letter-spacing: .14em; text-transform: uppercase; font-weight: 600; margin-top: 10px; }

        .thc { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .c3 { border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,.05); aspect-ratio: 1/1; }
        .c3 img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .qw { border-top: 2px solid var(--o); padding-top: 40px; }
        blockquote { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(30px, 4vw, 50px); color: #fff; text-transform: uppercase; letter-spacing: -.02em; line-height: 1.05; }

        .stg { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(255,255,255,.07); border-bottom: 1px solid rgba(255,255,255,.07); padding: 60px 0; }
        .stc { padding-right: 44px; }
        .stc:not(:first-child) { border-left: 1px solid rgba(255,255,255,.07); padding-left: 44px; padding-right: 0; }
        .stv { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 58px; color: #fff; letter-spacing: -.03em; line-height: 1; margin-bottom: 8px; text-shadow: 0 0 40px rgba(232,103,26,.27); }
        .stl { font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.25); }

        .tgs { display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 96px; }
        .tg { font-size: 9px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.4); border: 1px solid rgba(255,255,255,.1); border-radius: 4px; padding: 8px 18px; cursor: default; }

        #cta { position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,.06); text-align: center; padding: 120px 52px 72px; }
        #ctal { position: absolute; top: 0; left: 12%; right: 12%; height: 1px; background: linear-gradient(90deg,transparent,rgba(232,103,26,.33),transparent); }
        .ctlbl { font-size: 9px; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: var(--c); margin-bottom: 22px; }
        .cth { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(60px, 10vw, 128px); color: #fff; text-transform: uppercase; letter-spacing: -.035em; line-height: .86; margin: 0 0 44px; }
        .cts { font-weight: 300; font-size: 15px; color: rgba(255,255,255,.32); line-height: 1.75; max-width: 380px; margin: 0 auto 48px; }
        .ctb { display: inline-flex; align-items: center; gap: 12px; padding: 15px 44px; background: transparent; border: 1.5px solid rgba(255,255,255,.22); border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #fff; text-decoration: none; }
        .ctf { margin-top: 52px; border-top: 1px solid rgba(255,255,255,.05); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; }
        .ctfb { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.18); }
        .ctfc { font-size: 10px; color: rgba(255,255,255,.14); }

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
          .ovt { font-size: 18px; margin-bottom: 64px !important; }
          .sg { grid-template-columns: 1fr; gap: 40px; }
          .sh { font-size: 38px; }
          .tc { grid-template-columns: 1fr; }
          .thc { grid-template-columns: 1fr; }
          .stg { grid-template-columns: 1fr; padding: 40px 0; }
          .stc { padding: 24px 0; border-left: none !important; padding-left: 0 !important; }
          .stc:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,.07); }
          #cta { padding: 80px 24px 48px; }
          .cth { font-size: 48px; }
          .ctf { flex-direction: column; gap: 16px; text-align: center; }
          .ctl, .ctr { left: 24px; right: 24px; bottom: 24px; }
        }
      `}</style>

      <div id="bl">
        <div className="b1"></div><div className="b2"></div><div className="b3"></div>
        <div className="bv"></div>
      </div>

      <button 
        onClick={() => navigate('/#lavori')}
        className="fixed top-8 left-8 md:left-12 z-[100] w-12 h-12 hidden md:flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-full group hover:bg-white hover:border-[#00E5FF] transition-all duration-500 shadow-2xl"
        title="Torna ai lavori"
      >
        <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <section id="hero">
        <div id="hbg">
          <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773848189/Logo_su_panino_tpz4ke.jpg" alt="Free Time" />
          <div id="hov"></div>
        </div>
        <div id="hl"></div>
        <div id="hc">
          <div className="hm ha" id="ha0">
            <span className="hml">Brand Identity</span><div className="hd"></div>
            <span className="hy">2024</span><div className="hd2"></div>
            <span className="hloc">Pastena, FR</span>
          </div>
          <h1 className="hh ha" id="ha1">Free Time</h1>
          <h1 className="hho ha" id="ha2">Bar &amp; Pub</h1>
        </div>
        <div className="ctl"></div><div className="ctr"></div>
      </section>

      <div className="inn">
        <div className="mg">
          <div className="mc rv"><p className="mla">Cliente</p><p className="mv">Free Time Pub</p></div>
          <div className="mc rv" style={{ transitionDelay: '.08s' }}><p className="mla">Ruolo</p><p className="mv">Brand Designer</p></div>
          <div className="mc rv" style={{ transitionDelay: '.16s' }}><p className="mla">Durata</p><p className="mv">3 settimane</p></div>
          <div className="mc rv" style={{ transitionDelay: '.24s' }}><p className="mla">Dove</p><p className="mv">Pastena (FR)</p></div>
        </div>

        <span className="lbl rv">Overview</span>
        <p className="ovt rv" style={{ transitionDelay: '.08s', marginBottom: '96px' }}>Free Time e un bar pub a Pastena, in provincia di Frosinone. Partivamo da zero, nessuna identita, solo un nome e un idea. Il brief era costruire qualcosa di diretto, caldo, riconoscibile. Niente di generico.</p>

        <div className="rv" style={{ marginBottom: '12px' }}>
          <div className="fw" style={{ aspectRatio: '982/552', background: '#1a0e08' }}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773848189/Logo_su_panino_tpz4ke.jpg" alt="Logotipo" style={{ objectFit: 'contain', height: '100%', width: '100%' }} />
          </div>
          <p className="cap">01 - Logotipo versione principale</p>
        </div>
        <div className="sp"></div>

        <div className="sg rv" style={{ marginBottom: '112px' }}>
          <div>
            <span className="lbl">La sfida</span>
            <h2 className="sh">Costruire{"\n"}un identita{"\n"}da zero.</h2>
            <div className="sbar"></div>
            <p className="spt">Il locale non aveva nessuna identita visiva preesistente. La sfida era tradurre un concept semplice in un sistema visivo che funzionasse su tutto: insegna, bicchieri, Instagram, carta dei cocktail.</p>
          </div>
          <div className="rv" style={{ transitionDelay: '.12s' }}>
            <div className="si"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773848189/Colori_pnnbwy.jpg" alt="Brand board colori" /></div>
          </div>
        </div>

        <div className="dvd" style={{ marginBottom: '64px' }}></div>

        <div className="thc rv" style={{ marginBottom: '12px' }}>
          <div>
            <div className="c3"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773703708/Gemini_Generated_Image_ho1v9vho1v9vho1v_sitiyb.png" alt="Mockup negozio" /></div>
            <p className="cc">02 - Mockup negozio</p>
          </div>
          <div>
            <div className="c3"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773853375/Risorsa_18_svrn49.png" alt="Mockup social media" /></div>
            <p className="cc">03 - Mockup social media</p>
          </div>
          <div>
            <div className="c3"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773703708/Gemini_Generated_Image_gdiljxgdiljxgdil_un00pz.png" alt="Mockup packaging" /></div>
            <p className="cc">04 - Mockup packaging</p>
          </div>
        </div>
        <div className="sp"></div>

        <div className="rv" style={{ marginBottom: '112px' }}>
          <div className="qw">
            <blockquote>Un brand che la gente ricorda non urla, ha carattere.</blockquote>
          </div>
        </div>

        <div className="sg rv" style={{ marginBottom: '112px' }}>
          <div className="rv" style={{ transitionDelay: '.12s' }}>
            <div className="si"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773082283/Brandin_Free_time-03_ekwrt3.jpg" alt="Logo principale" /></div>
          </div>
          <div>
            <span className="lbl">La soluzione</span>
            <h2 className="sh">Arancione.{"\n"}Carattere.{"\n"}Sistema.</h2>
            <div className="sbar"></div>
            <p className="spt">Logotipo custom bold e arrotondato. L arancione come filo conduttore: energico, diverso da qualsiasi competitor locale. Mascotte illustrata, pattern decorativo, template social, tutto costruito per funzionare insieme come un unico sistema.</p>
          </div>
        </div>

        <div className="tc rv" style={{ marginBottom: '12px' }}>
          <div>
            <div className="ci"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773703115/Gemini_Generated_Image_7l8w6z7l8w6z7l8w_gec3j0.png" alt="Mockup insegna" /></div>
            <p className="cc">05 - Mockup insegna</p>
          </div>
          <div>
            <div className="ci"><OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773080745/Pattern_mhidws.png" alt="Pattern decorativo" /></div>
            <p className="cc">06 - Pattern decorativo</p>
          </div>
        </div>
        <div className="sp"></div>

        <div className="rv" style={{ marginBottom: '12px' }}>
          <div className="fw" style={{ aspectRatio: '21/9' }}>
            <OptimizedImage src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773703709/Gemini_Generated_Image_w3osfaw3osfaw3os_wmy3jw.png" alt="Mockup carta panino" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
          </div>
          <p className="cap">07 - Mockup carta panino</p>
        </div>
        <div className="sp"></div>

        <div className="stg rv" style={{ marginBottom: '96px' }}>
          <div className="stc"><div className="stv">+340%</div><div className="stl">Reach organica al lancio</div></div>
          <div className="stc"><div className="stv">12+</div><div className="stl">Asset consegnati</div></div>
          <div className="stc"><div className="stv">3 sett.</div><div className="stl">Durata progetto</div></div>
        </div>

        <div className="tgs rv">
          <span className="tg">Brand Identity</span>
          <span className="tg">Logo Design</span>
          <span className="tg">Iconografia</span>
          <span className="tg">Social Media</span>
          <span className="tg">Pattern</span>
          <span className="tg">Print</span>
        </div>
      </div>

      <section id="cta">
        <div id="ctal"></div>
        <div className="rv"><p className="ctlbl">Progetto simile?</p></div>
        <div className="rv"><h2 className="cth">PARLIAMOCI.</h2></div>
        <div className="rv"><p className="cts">Raccontami la tua attivita. Capiremo insieme da dove partire.</p></div>
        <div className="rv" style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button 
            onClick={openAnalysisForm}
            className="ctb" 
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            RICHIEDI ANALISI
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </button>
          <button 
            onClick={openServiceForm}
            className="ctb" 
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
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

export default ProjectFreeTime;
