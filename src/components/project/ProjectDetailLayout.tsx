import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../Navbar';
import OptimizedImage from '../OptimizedImage';
import { useForms } from '../../context/FormContext';

interface Stat {
  value: string;
  label: string;
}

interface ImageSection {
  type: string; // Use string to avoid literal type mismatch with projects.ts
  images: { url: string; caption?: string }[];
  title?: string;
  subtitle?: string;
  text?: string;
  reverse?: boolean;
}

export interface ProjectDetailData {
  year: string;
  location: string;
  client: string;
  role: string;
  duration: string;
  where: string;
  overview: string;
  heroImage: string;
  sections: ImageSection[];
  quote?: string;
  stats: Stat[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  accentColor?: string;
  tags: string[];
  detail?: ProjectDetailData;
}

export const ProjectDetailLayout: React.FC<{ project: Project }> = ({ project }) => {
  const navigate = useNavigate();
  const { openAnalysisForm, openServiceForm } = useForms();
  const detail = project.detail!;

  return (
    <>
      <Navbar />
      <div className="bg-[#050508] text-white font-sans selection:bg-orange-500/30">

      <button 
        onClick={() => navigate('/#lavori')}
        className="fixed top-8 left-8 md:left-12 z-[100] w-12 h-12 hidden md:flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-full group hover:bg-white hover:border-[#00E5FF] transition-all duration-500 shadow-2xl"
        title="Torna ai lavori"
      >
        <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* HERO */}
      <section className="relative h-[92vh] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={detail.heroImage} 
            alt={project.title} 
            className="w-full h-full object-cover brightness-[0.3] saturate-[0.6] animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" style={{ backgroundImage: `linear-gradient(140deg, ${project.accentColor || project.color}18 0%, transparent 50%), linear-gradient(to top, #050508 0%, rgba(5,5,8,0.15) 65%, transparent 100%)` }} />
        </div>
        <div className="absolute top-[70px] left-6 md:left-12 right-6 md:right-12 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent z-[2]" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${project.accentColor || project.color}45, transparent)` }} />
        
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-16 md:pb-24 z-[5]">
          <div className="flex items-center gap-3.5 mb-5 animate-in slide-in-from-bottom-8 duration-700">
            <span className="text-[9px] font-bold uppercase tracking-[0.28em]" style={{ color: project.accentColor || project.color }}>{project.category}</span>
            <div className="w-7 h-px bg-white/20" style={{ backgroundColor: `${project.accentColor || project.color}55` }} />
            <span className="font-mono text-[10px] text-white/30 tracking-widest">{detail.year}</span>
            <div className="w-7 h-px bg-white/10" />
            <span className="font-mono text-[10px] text-white/20 tracking-wider">{detail.location}</span>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(48px,11vw,140px)] leading-[0.86] uppercase tracking-tighter mb-0 animate-in slide-in-from-bottom-12 duration-900 delay-100">
            {project.title.split(' ').slice(0, 2).join(' ')}
          </h1>
          <h1 className="font-display font-extrabold text-[clamp(48px,11vw,140px)] leading-[0.86] uppercase tracking-tighter mb-0 text-transparent animate-in slide-in-from-bottom-16 duration-1000 delay-200" style={{ WebkitTextStroke: `2px ${project.accentColor || project.color}88` }}>
            {project.title.split(' ').slice(2).join(' ') || project.subtitle}
          </h1>
        </div>
        <div className="absolute bottom-8 left-6 md:left-12 w-4.5 h-4.5 border-b border-l border-white/15" />
        <div className="absolute bottom-8 right-6 md:right-12 w-4.5 h-4.5 border-b border-r border-white/15" />
      </section>

      {/* CONTENT */}
      <main className="relative z-10 max-w-[1080px] mx-auto px-6 md:px-12">
        {/* META GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 my-16 md:my-24">
          <div className="py-6 md:border-r border-white/10 pr-7">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2.5">Cliente</p>
            <p className="font-display font-bold text-lg">{detail.client}</p>
          </div>
          <div className="py-6 md:border-r border-white/10 md:pl-7 pr-7">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2.5">Ruolo</p>
            <p className="font-display font-bold text-lg">{detail.role}</p>
          </div>
          <div className="py-6 border-t md:border-t-0 md:border-r border-white/10 md:pl-7 pr-7">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2.5">Durata</p>
            <p className="font-display font-bold text-lg">{detail.duration}</p>
          </div>
          <div className="py-6 border-t md:border-t-0 md:pl-7">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-2.5">Dove</p>
            <p className="font-display font-bold text-lg">{detail.where}</p>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="pb-24">
          <span className="text-[9px] font-bold uppercase tracking-[0.28em] block mb-4.5" style={{ color: project.accentColor || project.color }}>Overview</span>
          <p className="font-light text-[clamp(18px,2vw,24px)] leading-relaxed text-white/75 max-w-[720px]">
            {detail.overview}
          </p>
        </div>

        {/* SECTIONS */}
        {detail.sections.map((section, idx) => (
          <div key={idx} className="pb-28">
            {section.type === 'full' && (
              <div>
                <div className="border border-white/5 overflow-hidden bg-white/5">
                  <OptimizedImage src={section.images[0].url} alt={section.images[0].caption} className="w-full h-auto block" />
                </div>
                {section.images[0].caption && (
                  <p className="text-[9px] text-white/20 uppercase tracking-widest font-semibold mt-3 pl-1">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} — {section.images[0].caption}
                  </p>
                )}
              </div>
            )}

            {section.type === 'split' && (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center ${section.reverse ? 'md:flex-row-reverse' : ''}`}>
                <div className={section.reverse ? 'md:order-2' : ''}>
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em] block mb-4.5" style={{ color: project.accentColor || project.color }}>{section.subtitle}</span>
                  <h2 className="font-display font-extrabold text-[clamp(34px,4vw,52px)] leading-[0.9] uppercase tracking-tight mb-6 whitespace-pre-line">
                    {section.title}
                  </h2>
                  <div className="w-7 h-0.5 rounded-sm mb-6" style={{ backgroundColor: project.accentColor || project.color }} />
                  <p className="font-light text-sm leading-relaxed text-white/50">
                    {section.text}
                  </p>
                </div>
                <div className={`rounded-xl overflow-hidden border border-white/10 ${section.reverse ? 'md:order-1' : ''}`}>
                  <OptimizedImage src={section.images[0].url} alt={section.images[0].caption} className="w-full h-auto block" />
                </div>
              </div>
            )}

            {section.type === 'two-cols' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {section.images.map((img, i) => (
                  <div key={i}>
                    <div className="rounded-lg overflow-hidden border border-white/5">
                      <OptimizedImage src={img.url} alt={img.caption} className="w-full h-auto block" />
                    </div>
                    {img.caption && (
                      <p className="text-[9px] text-white/20 uppercase tracking-widest font-semibold mt-2.5">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === 'three-cols' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {section.images.map((img, i) => (
                  <div key={i}>
                    <div className="rounded-lg overflow-hidden border border-white/5">
                      <OptimizedImage src={img.url} alt={img.caption} className="w-full h-auto block" />
                    </div>
                    {img.caption && (
                      <p className="text-[9px] text-white/20 uppercase tracking-widest font-semibold mt-2.5">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* QUOTE */}
        {detail.quote && (
          <div className="pb-28">
            <div className="border-t-2 pt-10" style={{ borderColor: project.accentColor || project.color }}>
              <blockquote className="font-display font-extrabold text-[clamp(30px,4vw,50px)] leading-[1.05] uppercase tracking-tight">
                "{detail.quote.split('<br>').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < detail.quote!.split('<br>').length - 1 && <br />}
                  </React.Fragment>
                ))}"
              </blockquote>
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 py-16 mb-24">
          {detail.stats.map((stat, i) => (
            <div key={i} className={`py-8 md:py-0 ${i > 0 ? 'md:border-l border-white/10 md:pl-11' : 'pr-11'} ${i < 2 ? 'border-b md:border-b-0 border-white/10' : ''}`}>
              <div className="font-display font-extrabold text-6xl leading-none mb-2 drop-shadow-[0_0_40px_rgba(232,103,26,0.27)]" style={{ color: '#fff', textShadow: `0 0 40px ${project.accentColor || project.color}44` }}>
                {stat.value}
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/25">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 pb-24">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[9px] font-bold uppercase tracking-widest text-white/40 border border-white/10 rounded px-4.5 py-2 hover:text-orange-500 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all cursor-default"
              style={{ 
                '--hover-color': project.accentColor || project.color,
                '--hover-bg': `${project.accentColor || project.color}0d`,
                '--hover-border': `${project.accentColor || project.color}55`
              } as any}
            >
              {tag}
            </span>
          ))}
        </div>
      </main>

      {/* CTA - Matching the site as requested */}
      <section className="relative z-10 border-t border-white/10 text-center py-32 px-6 overflow-hidden bg-[#030303]">
        <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-sans text-[#00E5FF] text-[10px] font-bold uppercase tracking-[0.4em] block mb-12">
            PROSSIMO PASSO
          </span>
          
          <h2 className="font-display text-[clamp(40px,7vw,90px)] font-extrabold uppercase tracking-tighter leading-[0.9] mb-10">
            SCOPRI COSA <br />
            MANCA AL <span className="text-[#00E5FF]">TUO BRAND</span>
          </h2>
          
          <p className="font-sans text-lg text-white/50 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Un'analisi gratuita della tua presenza online. Nessun impegno, nessuna vendita forzata — solo un quadro chiaro di dove sei e dove puoi arrivare.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={openAnalysisForm}
              className="px-10 py-5 bg-[#00E5FF] text-black font-display font-bold text-sm uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(0, 229, 255, 0.45)] transition-all duration-300 text-center"
            >
              RICHIEDI L'ANALISI GRATUITA
            </button>
            
            <button
              onClick={openServiceForm}
              className="px-10 py-5 bg-transparent border border-white/10 text-white font-display font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 text-center"
            >
              PARLAMI DEL TUO PROGETTO
            </button>
          </div>
        </div>
        
        <div className="mt-24 pt-6 border-t border-white/5 flex justify-between items-center max-w-[1080px] mx-auto">
          <span className="font-display font-extrabold text-[13px] tracking-widest text-white/20 uppercase">Ludovico Colasanti</span>
          <span className="text-[10px] text-white/15">© 2025 Ludovico Colasanti</span>
        </div>
      </section>
    </div>
    </>
  );
};
