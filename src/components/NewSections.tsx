import React, { useRef, useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';

// --- ABOUT ME SECTION (Replaces Vision) ---
export const AboutMeSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="chi-sono" className="relative py-32 w-full bg-black text-white border-b border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                    
                    {/* Left: Photo */}
                    <div className={`md:col-span-5 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group">
                            <OptimizedImage 
                                src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1772645185/Senza_titolo-2_mqlwm3.png" 
                                alt="Ludovico" 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            
                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                                <span className="font-tech text-xs font-bold uppercase tracking-widest text-cyan-400">Digital Strategist</span>
                            </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-cyan-500/30 rounded-tl-3xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-cyan-500/30 rounded-br-3xl"></div>
                    </div>

                    {/* Right: Bio */}
                    <div className="md:col-span-7">
                        <div className={`transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <span className="font-tech text-cyan-500 text-xs font-bold uppercase tracking-[0.3em] block mb-6">
                                CHI SONO
                            </span>
                            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-white mb-8">
                                Più di un <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">semplice designer.</span>
                            </h2>
                            
                            <div className="space-y-6 text-gray-300 font-sans text-lg font-light leading-relaxed">
                                <p>
                                    Ciao, sono Ludovico. Non mi limito a rendere le cose "belle". Il mio obiettivo è costruire ecosistemi digitali che funzionano.
                                </p>
                                <p>
                                    Negli anni ho capito che un logo o un sito web da soli non bastano. Serve una visione d'insieme. Serve capire chi sei, a chi parli e come vuoi essere percepito.
                                </p>
                                <p>
                                    Lavoro a stretto contatto con i miei clienti per trasformare la loro visione in una realtà tangibile, creando brand che non solo si fanno notare, ma che si fanno ricordare e scegliere.
                                </p>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/10 flex gap-12">
                                <div>
                                    <span className="block font-display text-4xl text-white mb-1">4+</span>
                                    <span className="font-tech text-xs text-gray-500 uppercase tracking-wider">Anni di esperienza</span>
                                </div>
                                <div>
                                    <span className="block font-display text-4xl text-white mb-1">15+</span>
                                    <span className="font-tech text-xs text-gray-500 uppercase tracking-wider">Brand assistiti</span>
                                </div>
                                <div>
                                    <span className="block font-display text-4xl text-white mb-1">100%</span>
                                    <span className="font-tech text-xs text-gray-500 uppercase tracking-wider">Impegno</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// --- TRUST QUOTE SECTION ---
export const TrustQuoteSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 w-full bg-[#050508] text-white border-b border-white/5 overflow-hidden flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <svg className="w-12 h-12 text-cyan-500 mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 15 9.00001 14 9.00001 13C9.00001 12 9.00001 11 9.00001 10C9.00001 9 9.00001 8 9.00001 7C9.00001 5.89543 9.89544 5 11.0001 5H13.0001C13.5524 5 14.0001 4.55228 14.0001 4C14.0001 3.44772 13.5524 3 13.0001 3H11.0001C8.79097 3 7.00001 4.79086 7.00001 7V13C7.00001 14.1046 7.89544 15 9.00001 15V16C9.00001 18.7614 11.2386 21 14.017 21ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16C16 15 16 14 16 13C16 12 16 11 16 10C16 9 16 8 16 7C16 5.89543 16.8954 5 18.0001 5H20.0001C20.5524 5 21.0001 4.55228 21.0001 4C21.0001 3.44772 20.5524 3 20.0001 3H18.0001C15.791 3 14.0001 4.79086 14.0001 7V13C14.0001 14.1046 14.8954 15 16.0001 15V16C16.0001 18.7614 18.2386 21 21.017 21Z" />
                    </svg>
                    
                    <h3 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-gray-100">
                        "Ludovico ha trasformato completamente il modo in cui ci presentiamo online. Non è solo design, è strategia pura."
                    </h3>
                    
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                            <OptimizedImage src="https://picsum.photos/seed/ceo/100/100" alt="CEO" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-white font-sans">Marco Rossi</div>
                            <div className="text-cyan-500 text-xs font-tech uppercase tracking-wider">CEO, TechStart</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- BRAND PHOTO CAROUSEL SECTION ---
export const BrandCarouselSection: React.FC = () => {
    // Using placeholder images for the carousel
    const images = [
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    ];

    return (
        <section className="py-20 bg-black border-b border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                <span className="font-tech text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                    Più di 15 brand assistiti
                </span>
            </div>
            
            <div className="relative w-full overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap items-center">
                    {/* Triple the list for seamless loop */}
                    {[...images, ...images, ...images].map((src, i) => (
                        <div key={i} className="flex-shrink-0 w-64 h-40 md:w-80 md:h-48 rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 border border-white/10">
                             <OptimizedImage 
                                src={src} 
                                alt="Brand Project" 
                                className="w-full h-full object-cover"
                             />
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};
