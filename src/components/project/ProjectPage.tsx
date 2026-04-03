import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { ProjectDetailLayout } from './ProjectDetailLayout';
import ProjectRDSalon from './ProjectRDSalon';
import ProjectGFService from './ProjectGFService';
import ProjectFreeTime from './ProjectFreeTime';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import UnifiedBackground from '../UnifiedBackground';

export const ProjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === Number(id));
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <UnifiedBackground />
                <Navbar />
                <h1 className="text-4xl font-display mb-4">Progetto non trovato</h1>
                <Link to="/" className="text-[#06b6d4] hover:underline">Torna alla home</Link>
            </div>
        );
    }

    // Custom designs for specific projects
    if (project.id === 4) return <ProjectRDSalon />;
    if (project.id === 3) return <ProjectGFService />;
    if (project.id === 1) return <ProjectFreeTime />;

    // If the project has detailed data, use the new layout
    if (project.detail) {
        return (
            <div className="relative">
                <ProjectDetailLayout project={project} />
            </div>
        );
    }

    // Fallback to the old layout for projects without detailed data
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
                <UnifiedBackground />
            
            <button 
                onClick={() => navigate('/#lavori')}
                className="fixed top-8 left-8 md:left-12 z-[100] w-12 h-12 hidden md:flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-full group hover:bg-white hover:border-[#06b6d4] transition-all duration-500 shadow-2xl"
                title="Torna ai lavori"
            >
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            {/* Hero Section */}
            <div className="w-full h-[70vh] relative">
                <img src={project.img} className="w-full h-full object-cover" alt={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-24 max-w-7xl mx-auto">
                     <div 
                        className="inline-block px-3 py-1 rounded-full border border-white/20 backdrop-blur-md mb-6 animate-[fadeInUp_0.5s_ease-out_forwards]"
                    >
                         <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white">{project.subtitle}</span>
                     </div>
                     <h2 
                        className="font-display text-6xl md:text-9xl text-white uppercase leading-none animate-[fadeInUp_0.7s_ease-out_forwards]"
                        style={{ color: project.color }}
                     >
                         {project.title}
                     </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-6 py-24">
                
                {project.acquisizione && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                        <div className="md:col-span-4">
                            <h3 className="text-white font-display text-2xl uppercase mb-6 border-t border-white/20 pt-6">Acquisizione</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-gray-300 font-sans text-xl leading-relaxed font-light">
                                {project.acquisizione}
                            </p>
                        </div>
                    </div>
                )}

                {project.partenza && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                        <div className="md:col-span-4">
                            <h3 className="text-white font-display text-2xl uppercase mb-6 border-t border-white/20 pt-6">Partenza</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-gray-300 font-sans text-xl leading-relaxed font-light">
                                {project.partenza}
                            </p>
                        </div>
                    </div>
                )}

                {project.brief && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                        <div className="md:col-span-4">
                            <h3 className="text-white font-display text-2xl uppercase mb-6 border-t border-white/20 pt-6">Brief</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-gray-300 font-sans text-xl leading-relaxed font-light">
                                {project.brief}
                            </p>
                        </div>
                    </div>
                )}

                {project.sfida && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                        <div className="md:col-span-4">
                            <h3 className="text-white font-display text-3xl uppercase mb-6 border-t border-white/20 pt-6">La Sfida</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-gray-300 font-sans text-xl leading-relaxed font-light">
                                {project.sfida}
                            </p>
                        </div>
                    </div>
                )}

                {/* Foto Section */}
                <div className="mb-24 w-full rounded-3xl overflow-hidden shadow-2xl bg-zinc-900">
                    <img src={project.middleImage || project.carouselImages?.[0]?.url || project.img} alt="Project detail" className="w-full h-auto md:h-[70vh] object-contain md:object-cover" />
                </div>

                {project.soluzione && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                         <div className="md:col-span-4">
                            <h3 className="text-white font-display text-3xl uppercase mb-6 border-t border-white/20 pt-6">La Soluzione</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-gray-300 font-sans text-xl leading-relaxed mb-10 font-light">
                                {project.soluzione}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-sans font-bold uppercase tracking-wider text-gray-300 hover:bg-white hover:text-black transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {project.esito && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                        <div className="md:col-span-4">
                            <h3 className="text-white font-display text-2xl uppercase mb-6 border-t border-white/20 pt-6">Esito</h3>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-gray-300 font-sans text-xl leading-relaxed font-light">
                                {project.esito}
                            </p>
                        </div>
                    </div>
                )}

                {/* Image Gallery */}
                {project.carouselImages && project.carouselImages.length > 0 && (
                    <div className="mb-24 relative w-full max-w-7xl mx-auto px-4 md:px-0">
                        <h3 className="text-white font-display text-3xl uppercase mb-12 text-center">Galleria Progetto</h3>
                        
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {project.carouselImages.map((imgObj, idx) => (
                                <div 
                                    key={idx}
                                    className="relative w-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 group break-inside-avoid"
                                >
                                    <img src={imgObj.url} className="w-full h-auto object-cover" alt={`Gallery ${idx + 1}`} />
                                    
                                    {/* Caption overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <p className="text-white font-sans font-bold uppercase tracking-widest text-xs md:text-sm">
                                            {imgObj.caption}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Link Button */}
                {project.link && (
                    <div className="flex justify-center mb-24">
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-white hover:text-[#06b6d4] transition-colors border-b border-transparent hover:border-[#06b6d4] pb-1"
                        >
                            <span className="font-sans font-bold uppercase tracking-widest text-xs">Vedi Link Completo</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                )}
            </div>
            
            {/* CTA - Matching the site as requested */}
            <section className="relative z-10 border-t border-white/10 text-center py-32 px-6 overflow-hidden bg-[#050508]">
                <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-500 mb-5.5">Progetto simile?</p>
                <h2 className="font-display font-extrabold text-[clamp(60px,10vw,128px)] leading-[0.86] uppercase tracking-tighter mb-11">PARLIAMOCI.</h2>
                <p className="font-light text-sm text-white/30 leading-relaxed max-w-[380px] mx-auto mb-12">
                    Raccontami la tua attività. Capiremo insieme da dove partire.
                </p>
                <a 
                    href="mailto:ludovico@innovedia.it" 
                    className="inline-flex items-center gap-3 px-11 py-3.5 bg-transparent border-[1.5px] border-white/20 rounded-full font-bold text-[11px] uppercase tracking-widest text-white transition-all duration-300 hover:bg-cyan-500 hover:border-cyan-500 hover:text-[#050508]"
                >
                    Scrivimi
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
                
                <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center max-w-[1080px] mx-auto">
                    <span className="font-display font-extrabold text-[13px] tracking-widest text-white/20 uppercase">Innovedia</span>
                    <span className="text-[10px] text-white/15">© 2025 Ludovico Colasanti</span>
                </div>
            </section>
        </div>
        </>
    );
};
