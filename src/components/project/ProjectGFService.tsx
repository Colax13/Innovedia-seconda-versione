import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navbar from '../Navbar';
import OptimizedImage from '../OptimizedImage';
import { useForms } from '../../context/FormContext';

const GREEN = "#2d7a4f";
const GREEN_LIGHT = "#3a9e66";
const CYAN = "#06b6d4";
const BG = "#050508";

const IMGS = {
  hero:      "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773855714/Hero_page_uvt2fm.jpg",
  about:     "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773855717/La_nostra_visione_sulla_home_page_hqbwrn.jpg",
  progetti:  "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773857618/Progetto_sulla_home_page_ihioag.jpg",
  servizi:   "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773880115/servizi_sulla_homepage_rkdd4y.jpg",
  catalogo:  "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773857156/Pagina_il_nostro_catalogo_lp1jpi.jpg",
  detCat:    "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773857153/Pagina_dettaglio_catalogo_o1pg6h.jpg",
  det1:      "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773857155/Pagina_dettaglio_progetti_1_xf3tjh.jpg",
  det2:      "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773857153/Pagina_dettagli_progetti_sezione_2_wc6gyq.jpg",
  chiSiamo1: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773855717/pagina_chi_siamo_1_xhfnxe.jpg",
  chiSiamo2: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773855717/pagina_chi_siamo_2_w6bad8.jpg",
  chiSiamo3: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773855719/pagina_chi_siamo_3_ccpws6.jpg",
  contatti:  "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773855759/Pagina_contatti_v2d9ua.jpg",
};

function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [t]);
  return [ref, vis] as const;
}

function R({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .9s ${delay}s ease, transform .9s ${delay}s cubic-bezier(.23,1,.32,1)`,
    }}>{children}</div>
  );
}

function Blobs() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
      <style>{`
        @keyframes b1{0%,100%{transform:translate(0,0)scale(1)}40%{transform:translate(70px,-50px)scale(1.1)}70%{transform:translate(-30px,60px)scale(.92)}}
        @keyframes b2{0%,100%{transform:translate(0,0)scale(1)}35%{transform:translate(-60px,70px)scale(1.08)}65%{transform:translate(50px,-30px)scale(.94)}}
        @keyframes b3{0%,100%{transform:translate(0,0)scale(1)}50%{transform:translate(40px,50px)scale(.88)}}
      `}</style>
      <div style={{position:"absolute",width:"70vw",height:"70vw",borderRadius:"50%",top:"-20%",left:"-15%",background:"radial-gradient(circle,rgba(45,122,79,.22) 0%,rgba(45,122,79,.07) 45%,transparent 70%)",filter:"blur(90px)",animation:"b1 22s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:"60vw",height:"60vw",borderRadius:"50%",top:"30%",right:"-18%",background:"radial-gradient(circle,rgba(6,182,212,.12) 0%,rgba(30,64,175,.05) 45%,transparent 70%)",filter:"blur(100px)",animation:"b2 28s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:"50vw",height:"50vw",borderRadius:"50%",bottom:"-10%",left:"20%",background:"radial-gradient(circle,rgba(45,122,79,.15) 0%,transparent 65%)",filter:"blur(80px)",animation:"b3 32s ease-in-out infinite"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 40%,transparent 25%,rgba(5,5,8,.82) 100%)"}}/>
    </div>
  );
}

function FadeImg({ src, alt="", style={} }: { src: string, alt?: string, style?: React.CSSProperties }) {
  return <OptimizedImage src={src} alt={alt} style={style} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily:"'Barlow',sans-serif", fontSize:9, fontWeight:700,
      letterSpacing:".28em", textTransform:"uppercase",
      color:GREEN_LIGHT, display:"block", marginBottom:18,
    }}>{children}</span>
  );
}

function Divider() {
  return <div style={{ height:1, background:"rgba(255,255,255,.07)" }}/>;
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 80); }, []);
  const t = (d: number): React.CSSProperties => ({
    opacity: on?1:0,
    transform: on?"translateY(0)":"translateY(32px)",
    transition:`opacity .9s ${d}s ease, transform .9s ${d}s cubic-bezier(.23,1,.32,1)`,
  });

  return (
    <section style={{ position:"relative", height:"88vh", minHeight:540, overflow:"hidden", background:BG }}>
      <div style={{ position:"absolute", inset:0 }}>
        <OptimizedImage src={IMGS.hero} alt="GF Service Hero" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(.28) saturate(.65)" }}/>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(140deg,${GREEN}15 0%,transparent 50%),linear-gradient(to top,${BG} 0%,rgba(5,5,8,.15) 65%,transparent 100%)` }}/>
      </div>

      {/* Top accent line */}
      <div style={{ position:"absolute", top:0, left:52, right:52, height:1, background:`linear-gradient(90deg,transparent,${GREEN}66,transparent)`, zIndex:2 }}/>

      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 52px 68px", zIndex:5 }} id="hc">
        {/* Meta row */}
        <div style={{ ...t(.1), display:"flex", alignItems:"center", gap:14, marginBottom:22 }} className="hero-meta">
          <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, fontWeight:700, letterSpacing:".28em", textTransform:"uppercase", color:GREEN_LIGHT }}>Web Design · UX/UI · B2B</span>
          <div style={{ width:28, height:1, background:`${GREEN}77` }}/>
          <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,.28)", letterSpacing:".1em" }}>2024</span>
          <div style={{ width:28, height:1, background:"rgba(255,255,255,.12)" }}/>
          <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,.2)" }}>Frosinone, FR</span>
        </div>
 
        {/* Title */}
        <div style={{ overflow:"hidden" }}>
          <h1 style={{ ...t(.2), fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(68px,11vw,140px)", color:"#fff", textTransform:"uppercase", letterSpacing:"-.035em", lineHeight:.86, margin:0 }} className="hero-title">GF Service</h1>
        </div>
        <div style={{ overflow:"hidden" }}>
          <h1 style={{ ...t(.3), fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(68px,11vw,140px)", color:"transparent", WebkitTextStroke:`2px ${GREEN}99`, textTransform:"uppercase", letterSpacing:"-.035em", lineHeight:.86, margin:0 }} className="hero-title">Event & Catering</h1>
        </div>
      </div>

      {/* Corner brackets */}
      <div style={{ position:"absolute", bottom:32, left:52, width:18, height:18, borderBottom:"1px solid rgba(255,255,255,.15)", borderLeft:"1px solid rgba(255,255,255,.15)", zIndex:5 }}/>
      <div style={{ position:"absolute", bottom:32, right:52, width:18, height:18, borderBottom:"1px solid rgba(255,255,255,.15)", borderRight:"1px solid rgba(255,255,255,.15)", zIndex:5 }}/>
    </section>
  );
}

// ── META ─────────────────────────────────────────────────────────────────────
function Meta() {
  const [ref, vis] = useInView(.2);
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px" }} className="inn-container">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid rgba(255,255,255,.07)", margin:"72px 0 88px" }} className="meta-grid">
        {[
          {l:"Cliente", v:"GF Service"},
          {l:"Ruolo",   v:"Web Designer"},
          {l:"Tipo",    v:"Sito Vetrina B2B"},
          {l:"Anno",    v:"2024"},
        ].map((m,i)=>(
          <div key={i} style={{
            padding:"24px 0",
            borderRight:i<3?"1px solid rgba(255,255,255,.07)":"none",
            paddingRight:i<3?28:0, paddingLeft:i>0?28:0,
            opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(18px)",
            transition:`all .7s ${i*.08}s ease`,
          }}>
            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, fontWeight:700, letterSpacing:".24em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:10 }}>{m.l}</p>
            <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:18, color:"#fff" }}>{m.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview() {
  return (
    <div style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px 96px" }} className="overview-container">
      <R><Label>Overview</Label></R>
      <R delay={.08}>
        <p style={{ fontFamily:"'Barlow',sans-serif", fontWeight:300, fontSize:"clamp(18px,2vw,24px)", color:"rgba(255,255,255,.75)", lineHeight:1.7, maxWidth:740 }} className="overview-text">
          GF Service opera nel settore event & catering da anni, costruendo una reputazione solida nel territorio di Frosinone — solo attraverso il passaparola. Zero presenza digitale, nessun sito, nessun profilo curato. Il progetto nasce dall'esigenza di tradurre quella reputazione in qualcosa di visibile e accessibile al mercato B2B.
        </p>
      </R>
    </div>
  );
}

// ── FULL IMG ──────────────────────────────────────────────────────────────────
function FullImg({ src, caption }: { src: string, caption?: string }) {
  const [ref, vis] = useInView(.08);
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:"all .9s cubic-bezier(.23,1,.32,1)" }} className="full-img-container">
      <div style={{ overflow:"hidden", border:"1px solid rgba(255,255,255,.05)" }} className="img-box">
        <OptimizedImage src={src} alt={caption || "GF Service Project Image"} style={{ width:"100%", height:"auto", display:"block" }}/>
      </div>
      {caption && <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, color:"rgba(255,255,255,.2)", letterSpacing:".16em", textTransform:"uppercase", fontWeight:600, marginTop:12, paddingLeft:4 }}>{caption}</p>}
    </div>
  );
}

// ── SPLIT ─────────────────────────────────────────────────────────────────────
function Split({ label, title, body, src, reverse=false }: { label: string, title: string, body: string, src: string, reverse?: boolean }) {
  const [ref, vis] = useInView(.1);
  const tS: React.CSSProperties = { opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:"all .9s .05s cubic-bezier(.23,1,.32,1)" };
  const iS: React.CSSProperties = { opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(36px)", transition:"all .9s .14s cubic-bezier(.23,1,.32,1)" };
  const left = (
    <div style={tS}>
      <Label>{label}</Label>
      <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(34px,4.5vw,54px)", color:"#fff", textTransform:"uppercase", letterSpacing:"-.02em", lineHeight:.9, marginBottom:24, whiteSpace:"pre-line" }}>{title}</h2>
      <div style={{ width:28, height:2, background:GREEN_LIGHT, borderRadius:2, marginBottom:24 }}/>
      <p style={{ fontFamily:"'Barlow',sans-serif", fontWeight:300, fontSize:15, color:"rgba(255,255,255,.48)", lineHeight:1.85 }}>{body}</p>
    </div>
  );
  const right = (
    <div style={iS}>
      <div style={{ borderRadius:10, overflow:"hidden", border:"1px solid rgba(255,255,255,.06)" }} className="img-box">
        <OptimizedImage src={src} alt={title} style={{ width:"100%", height:"auto", display:"block" }}/>
      </div>
    </div>
  );
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px 112px" }} className="split-container">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }} className={`split-grid ${reverse ? 'reverse' : ''}`}>
        {reverse ? <>{right}{left}</> : <>{left}{right}</>}
      </div>
    </div>
  );
}

// ── TWO COLS ──────────────────────────────────────────────────────────────────
function TwoCols({ items }: { items: { src: string, cap?: string }[] }) {
  const [ref, vis] = useInView(.1);
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }} className="two-cols-grid">
      {items.map((item,i)=>(
        <div key={i} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`all .85s ${i*.1}s cubic-bezier(.23,1,.32,1)` }}>
          <div style={{ borderRadius:8, overflow:"hidden", border:"1px solid rgba(255,255,255,.05)" }} className="img-box">
            <OptimizedImage src={item.src} alt={item.cap || "GF Service Project Image"} style={{ width:"100%", height:"auto", display:"block" }}/>
          </div>
          {item.cap && <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, color:"rgba(255,255,255,.2)", letterSpacing:".14em", textTransform:"uppercase", fontWeight:600, marginTop:10 }}>{item.cap}</p>}
        </div>
      ))}
    </div>
  );
}

// ── THREE COLS ────────────────────────────────────────────────────────────────
function ThreeCols({ items }: { items: { src: string, cap?: string }[] }) {
  const [ref, vis] = useInView(.08);
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }} className="three-cols-grid">
      {items.map((item,i)=>(
        <div key={i} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:`all .85s ${i*.08}s cubic-bezier(.23,1,.32,1)` }}>
          <div style={{ borderRadius:8, overflow:"hidden", border:"1px solid rgba(255,255,255,.05)" }} className="img-box">
            <OptimizedImage src={item.src} alt={item.cap || "GF Service Project Image"} style={{ width:"100%", height:"auto", display:"block" }}/>
          </div>
          {item.cap && <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, color:"rgba(255,255,255,.2)", letterSpacing:".14em", textTransform:"uppercase", fontWeight:600, marginTop:10 }}>{item.cap}</p>}
        </div>
      ))}
    </div>
  );
}

// ── QUOTE ─────────────────────────────────────────────────────────────────────
function Quote() {
  const [ref, vis] = useInView(.2);
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px 112px" }} className="quote-container">
      <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"all .9s cubic-bezier(.23,1,.32,1)", borderTop:`2px solid ${GREEN}`, paddingTop:40 }}>
        <blockquote style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(28px,3.8vw,48px)", color:"#fff", textTransform:"uppercase", letterSpacing:"-.02em", lineHeight:1.05, margin:0 }}>
          "La sfida non era tecnica.<br/>Era aiutarli a raccontarsi per la prima volta."
        </blockquote>
      </div>
    </div>
  );
}

// ── QUALITATIVE STATS ─────────────────────────────────────────────────────────
function Stats() {
  const [ref, vis] = useInView(.2);
  return (
    <div ref={ref} style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px 112px" }} className="inn-container">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:"1px solid rgba(255,255,255,.07)", borderBottom:"1px solid rgba(255,255,255,.07)", padding:"60px 0" }} className="stats-grid">
        {[{v:"B2B",l:"Target sito"},{v:"Da zero",l:"Presenza digitale"},{v:"100%",l:"Foto reali"}].map((s,i)=>(
          <div key={i} className="stc" style={{
            borderRight:i<2?"1px solid rgba(255,255,255,.07)":"none",
            paddingRight:i<2?44:0, paddingLeft:i>0?44:0,
            opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(18px)",
            transition:`all .7s ${i*.1}s ease`,
          }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:58, color:"#fff", letterSpacing:"-.03em", lineHeight:1, marginBottom:8, textShadow:`0 0 40px ${GREEN}55` }}>{s.v}</div>
            <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.28)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TAGS ──────────────────────────────────────────────────────────────────────
function Tags() {
  return (
    <R>
      <div style={{ position:"relative", zIndex:1, maxWidth:1080, margin:"0 auto", padding:"0 52px 96px", display:"flex", flexWrap:"wrap", gap:8 }} className="tags-container">
        {["Web Design","UX/UI","B2B","Da zero","Sito vetrina","Event & Catering"].map(t=>(
          <span key={t} style={{
            fontFamily:"'Barlow',sans-serif", fontSize:9, fontWeight:700,
            letterSpacing:".2em", textTransform:"uppercase",
            color:"rgba(255,255,255,.4)", border:"1px solid rgba(255,255,255,.1)",
            borderRadius:4, padding:"8px 18px", transition:"all .2s", cursor:"default",
          }}
            onMouseEnter={e=>{ e.currentTarget.style.color=GREEN_LIGHT; e.currentTarget.style.borderColor=GREEN+"55"; e.currentTarget.style.background=GREEN+"12"; }}
            onMouseLeave={e=>{ e.currentTarget.style.color="rgba(255,255,255,.4)"; e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.background="transparent"; }}
          >{t}</span>
        ))}
      </div>
    </R>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  const navigate = useNavigate();
  const { openAnalysisForm, openServiceForm } = useForms();
  const [ref, vis] = useInView(.15);
  const r = (d=0): React.CSSProperties => ({ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(22px)", transition:`all .8s ${d}s cubic-bezier(.23,1,.32,1)` });
  
  return (
    <section ref={ref} style={{ position:"relative", zIndex:1, borderTop:"1px solid rgba(255,255,255,.06)", textAlign:"center", padding:"120px 52px 72px", overflow:"hidden", background:"#030303" }}>
      <div style={{ position:"absolute", top:0, left:"12%", right:"12%", height:1, background:`linear-gradient(90deg,transparent,${CYAN}55,transparent)` }}/>
      
      <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <span style={{ ...r(0), fontFamily:"'Barlow',sans-serif", fontSize:10, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:CYAN, marginBottom:48 }}>
          PROSSIMO PASSO
        </span>
        
        <h2 style={{ ...r(.1), fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:"clamp(40px,7vw,90px)", color:"#fff", textTransform:"uppercase", letterSpacing:"-.035em", lineHeight:.9, marginBottom:40 }}>
          SCOPRI COSA <br />
          MANCA AL <span style={{ color:CYAN }}>TUO BRAND</span>
        </h2>
        
        <p style={{ ...r(.18), fontFamily:"'Barlow',sans-serif", fontWeight:300, fontSize:18, color:"rgba(255,255,255,.5)", lineHeight:1.6, maxWidth:640, margin:"0 auto 64px" }}>
          Un'analisi gratuita della tua presenza online. Nessun impegno, nessuna vendita forzata — solo un quadro chiaro di dove sei e dove puoi arrivare.
        </p>

        <div style={{ ...r(.25), display:"flex", gap:16, width:"100%", justifyContent:"center" }} className="cta-buttons">
          <button
            onClick={openAnalysisForm}
            style={{
              padding:"20px 40px",
              background:CYAN,
              color:"#000",
              fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700,
              fontSize:14,
              textTransform:"uppercase",
              letterSpacing:".15em",
              borderRadius:100,
              textDecoration:"none",
              transition:"all .3s ease",
              textAlign:"center",
              cursor:"pointer",
              border:"none"
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${CYAN}66`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            RICHIEDI L'ANALISI GRATUITA
          </button>
          
          <button
            onClick={openServiceForm}
            style={{
              padding:"20px 40px",
              background:"transparent",
              border:"1px solid rgba(255,255,255,.1)",
              color:"#fff",
              fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700,
              fontSize:14,
              textTransform:"uppercase",
              letterSpacing:".15em",
              borderRadius:100,
              cursor:"pointer",
              transition:"all .3s ease",
              textAlign:"center"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"}
          >
            PARLAMI DEL TUO PROGETTO
          </button>
        </div>
      </div>
      
      <div style={{ marginTop:96, paddingTop:24, borderTop:"1px solid rgba(255,255,255,.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:13, letterSpacing:".15em", color:"rgba(255,255,255,.2)", textTransform:"uppercase" }}>Innovedia</span>
        <span style={{ fontSize:10, color:"rgba(255,255,255,.15)" }}>© 2025 Ludovico Colasanti</span>
      </div>
    </section>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
const ProjectGFService: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <button 
        onClick={() => navigate('/#lavori')}
        className="fixed top-8 left-8 md:left-12 z-[100] w-12 h-12 hidden md:flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-full group hover:bg-white hover:border-[#06b6d4] transition-all duration-500 shadow-2xl"
        title="Torna ai lavori"
      >
        <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="gf-project-container" style={{ background:BG, color:"#fff", position:"relative" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400;500;600&display=swap');
          .gf-project-container ::selection{background:${GREEN}33;}
          /* Scope the resets to the project container to avoid affecting the Navbar */
          .gf-project-container {
            box-sizing: border-box;
          }
          .gf-project-container * {
            box-sizing: border-box;
          }

          /* MOBILE OPTIMIZATION */
          @media (max-width: 768px) {
            #hero { height: 70vh !important; min-height: 400px !important; }
            #hc { padding: 0 24px 48px !important; }
            .hero-meta { flex-wrap: wrap !important; gap: 8px !important; }
            .hero-title { font-size: 52px !important; }
            .inn-container { padding: 0 24px !important; }
            .meta-grid { grid-template-columns: 1fr 1fr !important; margin: 48px 0 !important; }
            .mc { padding: 16px 0 !important; }
            .mc:nth-child(even) { border-right: none !important; padding-right: 0 !important; padding-left: 16px !important; }
            .mc:nth-child(odd) { padding-right: 16px !important; padding-left: 0 !important; }
            .mc:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,.07) !important; }
            .overview-container { padding: 0 24px 64px !important; }
            .overview-text { font-size: 18px !important; }
            .full-img-container { padding: 0 24px 12px !important; }
            .split-container { padding: 0 24px 80px !important; }
            .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .split-grid > div:first-child { order: 2; }
            .split-grid > div:last-child { order: 1; }
            .split-grid.reverse > div:first-child { order: 1; }
            .split-grid.reverse > div:last-child { order: 2; }
            .sh { font-size: 38px !important; }
            .divider-container { padding: 0 24px !important; margin-bottom: 64px !important; }
            .quote-container { padding: 0 24px 80px !important; }
            .two-cols-grid { grid-template-columns: 1fr !important; padding: 0 24px !important; }
            .three-cols-grid { grid-template-columns: 1fr !important; padding: 0 24px !important; }
            .stats-grid { grid-template-columns: 1fr !important; padding: 40px 0 !important; }
            .stc { padding: 24px 0 !important; border-left: none !important; border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; text-align: center !important; }
            .stc:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,.07) !important; }
            .tags-container { padding: 0 24px 64px !important; }
            #cta { padding: 80px 24px 48px !important; }
            .cth { font-size: 48px !important; }
            .cta-buttons { flex-direction: column !important; }
          }
        `}</style>

        <Blobs/>

        <Hero/>
        <Meta/>
        <Overview/>

        {/* 01 — Homepage hero */}
        <div style={{ position:"relative", zIndex:1, padding:"0 52px 12px", maxWidth:1080, margin:"0 auto" }} className="full-img-container">
          <FullImg src={IMGS.hero} caption="01 — Homepage · Hero section"/>
        </div>
        <div style={{ height:80 }}/>

        {/* La sfida */}
        <Split
          label="La sfida"
          title={"Non sapevano\ncome\nraccontarsi."}
          body="GF Service aveva anni di attività e una reputazione solida — ma solo nel passaparola. Zero presenza digitale. La sfida non era tecnica: era strategica. Ho dovuto guidare il cliente su tutto, dai testi alla struttura, dal tono di voce alle foto da usare. Le revisioni sono state lunghe non per mancanza di qualità, ma perché stavamo costruendo un'identità digitale da zero."
          src={IMGS.about}
        />
 
        <div style={{ position:"relative", zIndex:1, padding:"0 52px", maxWidth:1080, margin:"0 auto 80px" }} className="divider-container"><Divider/></div>
 
        <Quote/>

        {/* Servizi + progetti */}
        <TwoCols items={[
          { src:IMGS.servizi,  cap:"02 — Sezione servizi · Homepage" },
          { src:IMGS.progetti, cap:"03 — Sezione progetti · Homepage" },
        ]}/>
        <div style={{ height:80 }}/>

        {/* La soluzione */}
        <Split
          label="La soluzione"
          title={"Sito B2B.\nFoto reali.\nPercorso chiaro."}
          body="Struttura pensata per il target aziendale: nessuno stock, solo foto reali degli eventi. Ogni pagina guida l'utente verso la richiesta di preventivo. L'accent verde — estratto direttamente dalle fotografie — crea coerenza visiva tra il sito e il lavoro reale di GF Service."
          src={IMGS.catalogo}
          reverse
        />

        {/* Tre schermate */}
        <ThreeCols items={[
          { src:IMGS.det1,   cap:"04 — Dettaglio progetto" },
          { src:IMGS.det2,   cap:"05 — Sezione progetto 2" },
          { src:IMGS.detCat, cap:"06 — Dettaglio catalogo" },
        ]}/>
        <div style={{ height:80 }}/>

        {/* About page */}
        <div style={{ position:"relative", zIndex:1, padding:"0 52px 12px", maxWidth:1080, margin:"0 auto" }} className="full-img-container">
          <FullImg src={IMGS.chiSiamo1} caption="07 — Pagina chi siamo"/>
        </div>
        <div style={{ height:12 }}/>
        <TwoCols items={[
          { src:IMGS.chiSiamo2, cap:"08 — Chi siamo · Sezione 2" },
          { src:IMGS.chiSiamo3, cap:"09 — Chi siamo · Sezione 3" },
        ]}/>
        <div style={{ height:80 }}/>

        {/* Contatti */}
        <div style={{ position:"relative", zIndex:1, padding:"0 52px 12px", maxWidth:1080, margin:"0 auto" }} className="full-img-container">
          <FullImg src={IMGS.contatti} caption="10 — Pagina contatti · Form preventivo"/>
        </div>
        <div style={{ height:80 }}/>

        <Stats/>
        <Tags/>
        <CTA/>
      </div>
    </>
  );
}

export default ProjectGFService;
