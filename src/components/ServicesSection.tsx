import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'motion/react';
import OptimizedImage from './OptimizedImage';

interface ServiceCardMobileProps {
    service: any;
    index: number;
    scrollYProgress: any;
    isLast: boolean;
}

const StackingCardMobile: React.FC<{ service: any; index: number }> = ({ service, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    // Subtle scale and opacity reduction as the card gets covered by the next one
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

    return (
        <motion.div
            ref={cardRef}
            style={{ 
                scale, 
                opacity,
                // Each card sticks slightly lower than the previous one for a stacked look
                top: `${60 + (index * 20)}px`,
            }}
            className="sticky w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black mb-10 last:mb-0"
        >
            {/* Background Image Layer - Restored blur and opacity */}
            <div className="absolute inset-0 z-0">
                 <OptimizedImage 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-100 blur-[4px]" 
                 />
            </div>
            
            {/* Restored Muted Overlay */}
            <div 
                className="absolute inset-0 z-10" 
                style={{ 
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 229, 255, 0.4) 100%)' 
                }} 
            />
            
            {/* Content Layer - Restored padding and font sizes */}
            <div className="p-8 flex flex-col h-full relative z-20">
                <div className="flex justify-between items-start mb-4">
                    <span className="font-display text-3xl text-white/60">
                        0{service.id}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-[#00E5FF]/30 text-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_rgba(0, 229, 255, 0.2)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={service.icon}></path>
                        </svg>
                    </div>
                </div>

                <div className="mt-auto">
                    <h3 className="font-display text-3xl uppercase text-white mb-3 tracking-tight">
                        {service.title}
                    </h3>
                    <p className="font-sans text-white text-[14px] leading-relaxed mb-6 font-bold max-w-[280px]">
                        {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, i) => (
                            <span 
                                key={i} 
                                className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-sans font-bold uppercase tracking-widest text-white/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ServicesSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const services = [
        {
            id: 1,
            title: "Sito Web",
            desc: "Non un template con il tuo logo. Un sito costruito per convertire chi ci atterra.",
            tags: ["UX DESIGN", "SVILUPPO", "PERFORMANCE"],
            color: "from-cyan-400/20 to-transparent",
            icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Brand Identity",
            desc: "Non solo un logo. Un'identità visiva completa che ti rende riconoscibile ovunque.",
            tags: ["LOGO", "VISUAL IDENTITY", "TONE OF VOICE"],
            color: "from-cyan-400/20 to-transparent",
            icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
            image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Contenuti & Social",
            desc: "Non post quando ti ricordi. Un piano preciso che sa cosa dire, a chi e quando.",
            tags: ["CONTENT PLAN", "COPYWRITING", "ANALYTICS"],
            color: "from-cyan-400/20 to-transparent",
            icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Automazioni",
            desc: "Non lavoro manuale ogni giorno. Un sistema che porta contatti e li segue per te.",
            tags: ["GESTIONALE", "AUTOMAZIONE", "WORKFLOW"],
            color: "from-cyan-400/20 to-transparent",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
                else setIsVisible(false);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section 
            id="servizi"
            ref={sectionRef} 
            className={`flex flex-col justify-start bg-transparent text-white relative border-t border-white/5 z-30 min-h-screen pt-24 pb-24 px-6 md:px-12`} 
        >
            <div className="max-w-[1400px] mx-auto w-full">
                <div 
                    className={`transform transition-all duration-1000
                        ${!isMobile && isVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : !isMobile ? 'opacity-0 translate-y-[150px] scale-95' : 'opacity-100'} 
                    `} 
                >
                    <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end border-b border-white/10 pb-12">
                        <div>
                            <span className="font-sans text-[#00E5FF] text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">COSA COSTRUISCO PER TE</span>
                            <h2 className="font-display text-6xl md:text-8xl uppercase text-white tracking-tighter">
                                Servizi
                            </h2>
                        </div>
                        <p className="hidden md:block text-gray-400 font-sans max-w-sm text-right text-base leading-relaxed">
                            4 pilastri fondamentali. Un unico obiettivo: far crescere il tuo business online.
                        </p>
                    </div>

                    {/* Desktop Carousel */}
                    {!isMobile && (
                        <div 
                            ref={carouselRef}
                            className="flex flex-row gap-4 h-[550px] overflow-visible"
                        >
                            {services.map((service, index) => {
                                const isActive = activeIndex === index;
                                const staggerDelay = `${index * 150}ms`;

                                return (
                                    <div 
                                        key={service.id}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        style={{ transitionDelay: isVisible ? staggerDelay : '0ms' }}
                                        className={`
                                            service-card
                                            relative rounded-[2.5rem] overflow-hidden cursor-pointer group
                                            flex-shrink-0
                                            ${isActive ? 'md:flex-[3]' : 'md:flex-1'}
                                            border border-white/5 hover:border-white/10
                                            transition-[flex,opacity,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}
                                        `}
                                    >
                                        <div className="absolute inset-0 -z-20 overflow-hidden">
                                             <OptimizedImage 
                                                src={service.image} 
                                                alt={service.title} 
                                                className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-110' : 'scale-100 grayscale'}`} 
                                             />
                                        </div>

                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-700 ${isActive ? 'opacity-30' : ''}`}></div>
                                        <div className={`absolute inset-0 bg-[#030303] transition-opacity duration-500 -z-10 ${isActive ? 'opacity-70' : 'opacity-90'}`}></div>
                                        
                                        <div className="absolute inset-0 p-10 flex flex-col h-full z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`font-display text-4xl transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                    0{service.id}
                                                </span>
                                                <div className={`w-12 h-12 rounded-full border border-white/5 flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-white text-black scale-100 rotate-0' : 'bg-transparent text-gray-700 -rotate-45'}`}>
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={service.icon}></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="mt-auto relative">
                                                <h3 className={`
                                                    font-display text-4xl uppercase leading-none transition-all duration-500 origin-bottom-left
                                                    ${isActive ? 'text-white translate-y-0' : 'text-gray-500 md:-rotate-90 md:absolute md:bottom-0 md:left-0 md:origin-bottom-left md:whitespace-nowrap md:translate-x-10 md:-translate-y-6'}
                                                `}>
                                                    {service.title}
                                                </h3>

                                                <div className={`
                                                    overflow-hidden transition-all duration-700 ease-out
                                                    ${isActive ? 'max-h-[300px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}
                                                `}>
                                                    <p className="font-sans text-gray-300 text-base leading-relaxed mb-8 pl-1 font-medium">
                                                        {service.desc}
                                                    </p>
                                                    
                                                    <div className="flex flex-wrap gap-2.5">
                                                        {service.tags.map((tag, i) => (
                                                            <span 
                                                                key={i} 
                                                                className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-300"
                                                                style={{ transitionDelay: `${i * 100}ms` }}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Mobile Stacking Cards - Vertical Row */}
                    {isMobile && (
                        <div className="flex flex-col w-full">
                            {services.map((service, index) => (
                                <StackingCardMobile 
                                    key={service.id} 
                                    service={service} 
                                    index={index} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
