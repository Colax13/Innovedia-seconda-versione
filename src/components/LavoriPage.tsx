import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import Navbar from './Navbar';
import UnifiedBackground from './UnifiedBackground';
import OptimizedImage from './OptimizedImage';
import FinalCTA from './FinalCTA';

export default function LavoriPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#020205] min-h-screen text-white relative">
      <UnifiedBackground />
      <Navbar show={true} />
      
      <main className="relative z-10 pt-32 pb-24 px-8 md:px-[clamp(2rem,8vw,10rem)] max-w-7xl mx-auto">
        {/* NEW HERO DESIGN */}
        <section className="min-h-[70vh] flex flex-col justify-end pb-24 md:pb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="absolute -top-12 left-0 w-24 h-px bg-pixar-cyan shadow-[0_0_15px_#00E5FF]" />
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-tech text-pixar-cyan text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] block mb-6 px-1"
            >
              Selected Archives — 2024
            </motion.span>
            
            <h1 className="font-display text-[clamp(60px,12vw,160px)] font-black uppercase tracking-[-0.04em] leading-[0.8] mb-12 flex flex-col">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                Visioni
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-pixar-cyan underline decoration-[0.05em] underline-offset-[0.1em]"
              >
                Tangibili
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-20"
            >
              <p className="font-sans text-white/50 max-w-xl text-lg md:text-xl leading-relaxed font-light">
                Esplora la convergenza tra estetica Pixar e strategia digitale. 
                Ogni progetto è un tassello di un ecosistema progettato per durare.
              </p>
              
              <div className="flex items-center gap-4 text-[10px] font-tech text-white/30 uppercase tracking-widest">
                <div className="w-12 h-px bg-white/20" />
                <span>Scroll to explore index</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <div className="space-y-40 md:space-y-72">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="group cursor-pointer"
              onClick={() => navigate(`/progetto/${project.id}`)}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                {/* Image Container */}
                <div className="w-full lg:w-[60%] aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 relative shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                  <OptimizedImage
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-1000" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-pixar-cyan/15 backdrop-blur-[3px]">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.15 }}
                      className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-black shadow-2xl"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="w-full lg:w-[40%] space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <span 
                        className="font-tech text-xs font-bold uppercase tracking-[0.4em]"
                        style={{ color: project.color || '#00E5FF', textShadow: `0 0 20px ${project.color || '#00E5FF'}66` }}
                      >
                        {project.category}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-white group-hover:text-pixar-cyan transition-colors duration-700 leading-none">
                      {project.title}
                    </h2>
                  </div>

                  <p className="font-sans text-white/50 text-xl leading-relaxed font-light">
                    {project.sfida || project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    {project.tags?.slice(0, 4).map(tag => (
                      <span key={tag} className="font-tech text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/30 group-hover:border-pixar-cyan/40 group-hover:text-pixar-cyan transition-all duration-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-12">
                    <button className="group/btn relative inline-flex items-center gap-8 font-tech text-xs font-bold uppercase tracking-[0.5em] text-white/40 group-hover:text-pixar-cyan transition-all">
                      <span className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-2">Case Study</span>
                      <div className="relative w-16 h-px bg-white/10 group-hover:w-24 group-hover:bg-pixar-cyan transition-all duration-700" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <div className="relative z-10">
        <FinalCTA />
      </div>

      <footer className="bg-black py-16 text-center border-t border-white/5 relative z-10">
        <div className="flex justify-center gap-10 mb-10 text-[10px] font-tech uppercase tracking-[0.3em] text-gray-500">
             <a href="#" className="hover:text-pixar-cyan transition-colors">Instagram</a>
             <a href="#" className="hover:text-pixar-cyan transition-colors">Twitter</a>
             <a href="#" className="hover:text-pixar-cyan transition-colors">LinkedIn</a>
        </div>
        <p className="text-gray-800 text-[10px] font-tech uppercase tracking-[0.2em]">© 2024 Innovedia — Digital Excellence</p>
      </footer>
    </div>
  );
}
