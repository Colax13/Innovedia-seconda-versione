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
    <div className="bg-[#050505] min-h-screen text-white relative">
      <UnifiedBackground />
      <Navbar show={true} />
      
      <main className="relative z-10 pt-32 pb-24 px-8 md:px-[clamp(2rem,8vw,10rem)] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 md:mb-32"
        >
          <span className="font-tech text-pixar-cyan text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">
            Portfolio Completo
          </span>
          <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-8">
            Tutti i <span className="text-pixar-cyan">Lavori</span>
          </h1>
          <p className="font-sans text-white/40 max-w-2xl text-lg leading-relaxed">
            Una raccolta dei progetti più significativi, dall'identità visiva allo sviluppo web, 
            progettati per trasformare la presenza digitale in un vantaggio competitivo.
          </p>
        </motion.div>

        <div className="space-y-32 md:space-y-56">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="group cursor-pointer"
              onClick={() => navigate(`/progetto/${project.id}`)}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-20 items-center`}>
                {/* Image Container */}
                <div className="w-full lg:w-[55%] aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 relative shadow-2xl">
                  <OptimizedImage
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-700" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-pixar-cyan/10 backdrop-blur-[2px]">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black shadow-2xl"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="w-full lg:w-[45%] space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span 
                        className="font-tech text-[10px] font-bold uppercase tracking-[0.3em]"
                        style={{ color: project.color || '#06b6d4' }}
                      >
                        {project.category}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white group-hover:text-pixar-cyan transition-colors duration-500">
                      {project.title}
                    </h2>
                  </div>

                  <p className="font-sans text-white/50 text-lg md:text-xl leading-relaxed font-light">
                    {project.sfida || project.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.tags?.slice(0, 5).map(tag => (
                      <span key={tag} className="font-tech text-[9px] uppercase tracking-widest px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/30 group-hover:border-pixar-cyan/30 group-hover:text-pixar-cyan/60 transition-colors duration-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8">
                    <button className="group/btn relative inline-flex items-center gap-6 font-tech text-[11px] font-bold uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-all">
                      <span className="relative z-10">Esplora Progetto</span>
                      <div className="relative w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-pixar-cyan transition-all duration-500" />
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
