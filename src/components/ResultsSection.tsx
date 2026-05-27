import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useForms } from '../context/FormContext';
import { FlipButton } from './CaseStudySection';

const DragCarousel = ({ children, className, innerClassName }: { children: React.ReactNode, className?: string, innerClassName?: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    setStartX(pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // Find centered item
    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;
    
    const items = Array.from(container.querySelectorAll('.snap-center')) as HTMLDivElement[];
    if (items.length === 0) return;
    
    let closestItem: HTMLDivElement | null = null;
    let minDistance = Infinity;
    
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(itemCenterX - containerCenterX);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });
    
    items.forEach((item) => {
      const video = item.querySelector('video');
      const isCentered = item === closestItem;
      
      if (video) {
        if (isCentered) {
          if (video.paused) {
            video.play().catch(() => {});
          }
          video.style.opacity = '1';
          item.style.borderColor = 'rgba(0, 229, 255, 0.4)';
          item.style.transform = 'scale(1.02)';
        } else {
          if (!video.paused) {
            video.pause();
          }
          video.style.opacity = '0.4';
          item.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          item.style.transform = 'scale(0.95)';
        }
        item.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s ease';
        video.style.transition = 'opacity 0.5s ease';
      }
    });
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    const x = pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
    handleScroll();
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    // Initial check
    const initialTimer = setTimeout(() => {
      handleScroll();
    }, 300);
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      clearTimeout(initialTimer);
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`w-full flex overflow-x-auto snap-x snap-mandatory pb-8 select-none cursor-grab active:cursor-grabbing ${className || ""}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      onMouseDown={startDrag}
      onMouseLeave={stopDrag}
      onMouseUp={stopDrag}
      onMouseMove={onDrag}
      onTouchStart={startDrag}
      onTouchEnd={stopDrag}
      onTouchMove={onDrag}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className={`flex gap-4 md:gap-8 w-max hide-scrollbar ${innerClassName || ""}`}>
        {children}
      </div>
    </div>
  );
};

function Counter({ value, duration = 2, delay = 0, format = false }: { value: number, duration?: number, delay?: number, format?: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const val = Math.round(latest);
    return format ? val.toLocaleString('it-IT') : String(val);
  });
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        delay,
        ease: "easeOut"
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [isInView, value, duration, delay, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const ResultsSection: React.FC = () => {
  const { openAnalysisForm } = useForms();
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const metrics = [
    {
      value: <><span className="text-[#00E5FF]">+</span><Counter value={31} delay={isMobile ? 0 : 0.2} /><span className="text-[#00E5FF]">%</span></>,
      label: "di fatturato"
    },
    {
      value: <><span className="text-[#00E5FF]">+</span><Counter value={415} delay={isMobile ? 0 : 0.4} /></>,
      label: "clienti"
    },
    {
      value: <><Counter value={158} delay={isMobile ? 0 : 0.6} /><span className="text-[#00E5FF]">k</span></>,
      label: "visualizzazioni medie ogni mese"
    }
  ];

  return (
    <section className="relative py-32 md:py-48 px-4 md:px-8 bg-[#050B14] z-30 overflow-hidden border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] -mt-[100vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#00E5FF]/[0.02] to-black/20 pointer-events-none" />
      
      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.5 }}
           transition={{ duration: 0.8 }}
           className="flex flex-col items-center justify-center text-center mb-16 md:mb-24"
        >
          <span className="font-tech text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-[#00E5FF] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
            I risultati del mio sistema
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] font-bold uppercase tracking-tight leading-[0.95] text-white mb-6 md:mb-8">
            Il caso studio RD Salon
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Partita da zero sviluppando prima i social e poi il sito e-commerce, ha raggiunto questi numeri in 6 mesi
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-5xl mx-auto">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={isMobile ? undefined : { once: false, amount: 0.5 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: idx * 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 w-full max-w-[320px] flex flex-col items-center justify-center text-center py-6 md:p-8 rounded-2xl border border-white/10 bg-[#050B14] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] relative group h-auto md:h-[220px]"
            >
              <div className="absolute inset-0 bg-[#00E5FF]/0 group-hover:bg-[#00E5FF]/[0.02] transition-colors duration-500 pointer-events-none rounded-2xl" />
              <div className="font-display text-[28px] md:text-[54px] leading-[1] font-bold text-white mb-2 md:mb-3 tracking-tighter drop-shadow-2xl">
                {metric.value}
              </div>
              <div className="font-tech text-[9px] md:text-[11px] font-medium text-white/50 uppercase tracking-[0.2em] max-w-[180px] mx-auto leading-relaxed">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- VISUAL STEPS --- */}
        <div className="mt-32 md:mt-48 w-full max-w-[1400px] mx-auto flex flex-col gap-32 md:gap-48 relative z-20">
          
          {/* STEP 1: SOCIAL MEDIA */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* TEXT */}
            <motion.div 
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.5 }}
               transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
               className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <span className="font-tech text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-white/40 mb-4 inline-block">
                01. Strategy
              </span>
              <h3 className="font-display text-[32px] md:text-[48px] lg:text-[54px] leading-[1.05] font-bold text-white mb-6 md:mb-8 drop-shadow-xl uppercase tracking-tighter">
                Primi passi <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
                  social media
                </span>
              </h3>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Partendo dalla figura di Daniele, abbiamo sviluppato una strategia social che andasse a valorizzare il suo lavoro come parrucchiere, sfruttandolo como frontman dell'azienda.
              </p>
            </motion.div>

            {/* VISUAL CAROUSEL */}
            <motion.div 
               initial={{ opacity: 0, x: 60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
               className="w-full lg:w-1/2 relative"
            >
               <DragCarousel className="hide-scrollbar" innerClassName="px-[calc(50%-90px)] md:px-[calc(50%-180px)]">
                      {/* Video Mockup 1: Consulenza colore */}
                      <div className="snap-center shrink-0 w-[180px] h-[320px] md:w-[360px] md:h-[640px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
                        <video src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845155/0318_tflaqt.mov" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"></video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center border border-[#00E5FF]/50 backdrop-blur-md">
                               <div className="w-0 h-0 border-t-4 border-l-6 border-b-4 border-transparent border-l-white ml-1"></div>
                            </div>
                            <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest">Consulenza Colore</span>
                          </div>
                        </div>
                      </div>
                      {/* Video Mockup 2: Storia del brand */}
                      <div className="snap-center shrink-0 w-[180px] h-[320px] md:w-[360px] md:h-[640px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
                        <video src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845362/lv_0_20260318153958_r4ecdo.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"></video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center border border-[#00E5FF]/50 backdrop-blur-md">
                               <div className="w-0 h-0 border-t-4 border-l-6 border-b-4 border-transparent border-l-white ml-1"></div>
                            </div>
                            <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest">La Storia del Brand</span>
                          </div>
                        </div>
                      </div>
                      {/* Video Mockup 3: Taglio */}
                      <div className="snap-center shrink-0 w-[180px] h-[320px] md:w-[360px] md:h-[640px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
                        <video src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1776813461/0422_u3cqlq.mov" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"></video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center border border-[#00E5FF]/50 backdrop-blur-md">
                               <div className="w-0 h-0 border-t-4 border-l-6 border-b-4 border-transparent border-l-white ml-1"></div>
                            </div>
                            <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest">Video Taglio</span>
                          </div>
                        </div>
                      </div>
                      {/* Video Mockup 4: Placeholder */}
                      <div className="snap-center shrink-0 w-[180px] h-[320px] md:w-[360px] md:h-[640px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
                        <video src="https://res.cloudinary.com/dcmd1ukvx/video/upload/v1773845362/lv_0_20260318153958_r4ecdo.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none grayscale"></video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 flex items-center justify-center border border-[#00E5FF]/30 backdrop-blur-md">
                               <div className="w-0 h-0 border-t-4 border-l-6 border-b-4 border-transparent border-l-white ml-1 opacity-60"></div>
                            </div>
                            <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest">Quarto Video</span>
                          </div>
                        </div>
                      </div>
               </DragCarousel>
               
               {/* Fade edges */}
               <div className="absolute top-0 bottom-0 left-0 w-[60px] md:w-[150px] bg-gradient-to-r from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none z-10"></div>
               <div className="absolute top-0 bottom-0 right-0 w-[60px] md:w-[150px] bg-gradient-to-l from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none z-10"></div>
            </motion.div>
          </div>

          {/* STEP 2: E-COMMERCE */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            {/* TEXT */}
            <motion.div 
               initial={{ opacity: 0, x: 60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.5 }}
               transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
               className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-end lg:text-right"
            >
              <span className="font-tech text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-white/40 mb-4 inline-block">
                02. Piattaforma
              </span>
              <h3 className="font-display text-[32px] md:text-[48px] lg:text-[54px] leading-[1.05] font-bold text-white mb-6 md:mb-8 drop-shadow-xl uppercase tracking-tighter">
                Sito vetrina <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
                  ed E-commerce
                </span>
              </h3>
              <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Come secondo step, abbiamo costruito un sito vetrina e un e-commerce per vendere online i buoni salone, i buoni regalo e i buoni per la spa.
              </p>
            </motion.div>

            {/* VISUAL CAROUSEL */}
            <motion.div 
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
               className="w-full lg:w-1/2 relative"
            >
                <DragCarousel className="hide-scrollbar md:flex max-md:hidden" innerClassName="md:px-[calc(50%-240px)]">
                  {/* Web Image Hair Spa */}
                  <div className="snap-center shrink-0 w-[280px] md:w-[480px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group pointer-events-none">
                    <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084327/Screenshot_5_pursfi.jpg" alt="Hair Spa" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out object-top pointer-events-none" draggable={false} />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                  </div>
                  {/* Web Image 1 */}
                  <div className="snap-center shrink-0 w-[280px] md:w-[480px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group pointer-events-none">
                    <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084408/Screenshot_1_bvb6od.jpg" alt="Website UI" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out object-top pointer-events-none" draggable={false} />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                  </div>
                  {/* Web Image 2 */}
                  <div className="snap-center shrink-0 w-[280px] md:w-[480px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group pointer-events-none">
                    <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839205/Buoni_e-commerce_u3fsgi.jpg" alt="Checkout UI" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out object-top pointer-events-none" draggable={false} />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                  </div>
               </DragCarousel>

               {/* Mobile stacked layout instead of carousel */}
               <div className="flex flex-col gap-6 md:hidden">
                  {/* Web Image Hair Spa */}
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative pointer-events-none">
                    <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084327/Screenshot_5_pursfi.jpg" alt="Hair Spa" className="w-full h-full object-cover opacity-80 object-top pointer-events-none" draggable={false} />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                  </div>
                  {/* Web Image 1 */}
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative pointer-events-none">
                    <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084408/Screenshot_1_bvb6od.jpg" alt="Website UI" className="w-full h-full object-cover opacity-80 object-top pointer-events-none" draggable={false} />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                  </div>
                  {/* Web Image 2 */}
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative pointer-events-none">
                    <img src="https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839205/Buoni_e-commerce_u3fsgi.jpg" alt="Checkout UI" className="w-full h-full object-cover opacity-80 object-top pointer-events-none" draggable={false} />
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                  </div>
               </div>
               
               {/* Fade edges */}
               <div className="absolute top-0 bottom-0 left-0 w-[60px] md:w-[150px] bg-gradient-to-r from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none z-10 hidden md:block"></div>
               <div className="absolute top-0 bottom-0 right-0 w-[60px] md:w-[150px] bg-gradient-to-l from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none z-10 hidden md:block"></div>
            </motion.div>
          </div>
          
        </div>

        {/* CTA AL TERMINE DEI RISULTATI */}
        <div className="w-full mt-32 md:mt-48 mb-16 md:mb-24 flex flex-col items-center justify-center px-4 relative z-20">
          <motion.div
             initial={{ opacity: 0, y: 80 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.5 }}
             transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
             className="flex flex-col items-center justify-center max-w-3xl mx-auto w-full relative group"
          >
            {/* Subtle glow background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-[#00E5FF]/10 blur-[100px] w-full h-[300px] rounded-full -z-10 group-hover:bg-[#00E5FF]/20 transition-colors duration-1000"></div>

            {/* Badge */}
            <div className="mb-6 md:mb-8 flex items-center gap-3 px-5 py-2.5 rounded-full border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.05)] backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_10px_#00E5FF]"></div>
              <span className="font-tech text-[9px] md:text-[11px] font-bold tracking-[0.25em] text-[#00E5FF] uppercase">
                Facciamo il primo passo
              </span>
            </div>

            <h3 className="font-display text-[32px] md:text-[48px] leading-[1.1] font-bold text-white text-center mb-10 md:mb-12 drop-shadow-lg uppercase">
              Scopri come posso applicarlo al <br className="hidden sm:block" />
              <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00E5FF]">tuo business</span>
            </h3>

            <FlipButton 
              text="Richiedi un'analisi gratuita" 
              primary
              onClick={openAnalysisForm}
              className="!w-auto !min-w-[260px] md:!min-w-[320px] h-12 md:h-14 md:text-[12px] shadow-[0_0_40px_rgba(0,229,255,0.15)] hover:shadow-[0_0_60px_rgba(0,229,255,0.3)] transition-shadow duration-500"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ResultsSection;
