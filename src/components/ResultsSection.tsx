import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useForms } from '../context/FormContext';
import OptimizedImage from './OptimizedImage';
import { VideoTogglePlayer } from './VideoTogglePlayer';
import { Volume2, VolumeX } from 'lucide-react';

const StrategyVideo = ({ vid, index, type }: { vid: any, index: number, type: 'desktop' | 'desktop2' | 'mobile' }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  if (type === 'desktop') {
    return (
      <div className="w-full aspect-[9/16] rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group">
        <video ref={videoRef} src={vid.src} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"></video>
        <div className="absolute inset-0 bg-gradient-to-t pointer-events-none from-black/80 via-transparent to-transparent"></div>
        <button onClick={toggleMute} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto shadow-lg" title={isMuted ? "Attiva audio" : "Disattiva audio"}>
           {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center pointer-events-none">
           <span className="font-tech text-center text-[10px] text-white/80 uppercase tracking-widest leading-tight">{vid.title}</span>
        </div>
      </div>
    );
  }

  if (type === 'desktop2') {
    return (
       <div className="w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
         <video ref={videoRef} src={vid.src} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"></video>
         <div className="absolute inset-0 bg-gradient-to-t pointer-events-none from-black/80 via-transparent to-transparent"></div>
         <button onClick={toggleMute} className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto shadow-lg" title={isMuted ? "Attiva audio" : "Disattiva audio"}>
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
         </button>
         <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-md bg-[#00E5FF]/20 border-[#00E5FF]/50">
               <div className="w-0 h-0 border-t-4 border-l-6 border-b-4 border-transparent border-l-white ml-1"></div>
             </div>
             <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest">{vid.title}</span>
           </div>
         </div>
       </div>
    );
  }

  return (
      <div className="w-[calc(50%-6px)] aspect-[9/16] rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group">
        <video ref={videoRef} src={vid.src} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"></video>
        <div className="absolute inset-0 bg-gradient-to-t pointer-events-none from-black/80 via-transparent to-transparent"></div>
        <button onClick={toggleMute} className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto shadow-lg" title={isMuted ? "Attiva audio" : "Disattiva audio"}>
           {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
        </button>
        <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center border backdrop-blur-md bg-[#00E5FF]/20 border-[#00E5FF]/50">
               <div className="w-0 h-0 border-t-[3px] border-l-[5px] border-b-[3px] border-transparent border-l-white ml-1"></div>
            </div>
            <span className="font-tech text-[8px] text-white/80 uppercase tracking-widest truncate max-w-[100px] leading-tight flex-1">{vid.title}</span>
          </div>
        </div>
      </div>
  );
};

export function FlipButton({ text, onClick, primary = false, noBorder = false, className = '' }: { text: string, onClick?: () => void, primary?: boolean, noBorder?: boolean, className?: string }) {
  return (
    <motion.button 
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        initial: { backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: noBorder ? "transparent" : (primary ? "#00E5FF" : "rgba(255, 255, 255, 0.2)") },
        hover: { backgroundColor: "#ffffff", borderColor: "#ffffff" }
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={onClick}
      className={`group relative h-10 px-7 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase overflow-hidden cursor-pointer ${noBorder ? '' : 'border'} shadow-[0_0_20px_rgba(0, 229, 255, 0.1)] w-full sm:w-auto flex items-center justify-center ${className}`}
    >
      <div className="relative z-10 flex h-full items-center justify-center">
        {text.split("").map((char, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <motion.span
              variants={{
                initial: { y: 0, rotateX: 0, color: "#ffffff" },
                hover: { y: "-100%", rotateX: 90, color: "#000000" }
              }}
              transition={{ 
                delay: i * 0.015, 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
            <motion.span
              variants={{
                initial: { y: "100%", rotateX: -90, color: "#000000" },
                hover: { y: 0, rotateX: 0, color: "#000000" }
              }}
              transition={{ 
                delay: i * 0.015, 
                duration: 0.5, 
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="absolute inset-0 inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </div>
    </motion.button>
  );
}

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

  const videos = [
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/f_auto,q_auto/v1779913352/Compresso_fzavti.mov",
      title: "Tour Salone",
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/f_auto,q_auto/v1773845155/0318_tflaqt.mov",
      title: "Consulenza Colore"
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/f_auto,q_auto/v1776813461/0422_u3cqlq.mov",
      title: "Video Taglio"
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/f_auto,q_auto/v1779909947/spa_compresso_bhvzqr.mp4",
      title: "Hair Spa",
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/f_auto,q_auto/v1773845362/lv_0_20260318153958_r4ecdo.mp4",
      title: "La Storia del Brand"
    }
  ];

  const images = [
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773084327/Screenshot_5_pursfi.jpg",
      alt: "Hair Spa"
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1774624472/Screenshot_3_w8ts30.jpg",
      alt: "Salone UI"
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/v1773839205/Buoni_e-commerce_u3fsgi.jpg",
      alt: "Checkout UI"
    },
    {
      src: "https://res.cloudinary.com/dcmd1ukvx/image/upload/f_auto,q_auto,w_1400,c_limit/v1773084408/Screenshot_3_wqhnxk.jpg",
      alt: "Website UI"
    }
  ];

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
    <div id="casi-studio">
    {/* =========================================
        DESKTOP VIEW (Normal Scrolling + Overlay)
        ========================================= */}
    <section className="hidden lg:block relative w-full z-40 border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] bg-[#050B14] -mt-[100vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#00E5FF]/[0.02] to-black/20 pointer-events-none" />
      
      <div className="w-full max-w-[1600px] mx-auto pt-40 pb-32 px-8 relative z-10 flex flex-col gap-40">
        
        {/* Intro + Metrics */}
        <div className="flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.5 }}
             transition={{ duration: 0.8 }}
             className="flex flex-col items-center justify-center text-center mb-24"
          >
            <span className="font-tech text-[12px] font-bold tracking-[0.4em] uppercase text-[#00E5FF] mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]">
              I risultati del mio sistema
            </span>
            <h2 className="font-display text-[80px] font-bold uppercase tracking-tight leading-[0.95] text-white mb-8">
              Il caso studio <br /> RD Salon
            </h2>
            <p className="font-sans text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Partita da zero sviluppando prima i social e poi il sito e-commerce, ha raggiunto questi numeri in 6 mesi
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-12 w-full max-w-5xl mx-auto">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex-1 w-full max-w-[320px] flex flex-col items-center justify-center text-center py-8 rounded-2xl border border-white/10 bg-[#050B14] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8)] relative group h-auto md:h-[220px]"
              >
                <div className="absolute inset-0 bg-[#00E5FF]/0 group-hover:bg-[#00E5FF]/[0.02] transition-colors duration-500 pointer-events-none rounded-2xl" />
                <div className="font-display text-[54px] leading-[1] font-bold text-white mb-3 tracking-tighter drop-shadow-2xl">
                  {metric.value}
                </div>
                <div className="font-tech text-[11px] font-medium text-white/50 uppercase tracking-[0.2em] max-w-[180px] mx-auto leading-relaxed">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Strategy */}
        <div className="flex flex-col items-center gap-16">
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.5 }}
             transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
             className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <span className="font-tech text-[11px] font-bold tracking-[0.4em] uppercase text-white/40 mb-4 inline-block">
              01. Strategy
            </span>
            <h3 className="font-display text-[54px] leading-[1.05] font-bold text-white mb-8 drop-shadow-xl uppercase tracking-tighter">
              Primi passi <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
                social media
              </span>
            </h3>
            <p className="font-sans text-xl text-white/60 leading-relaxed">
              Partendo dalla figura di Daniele, abbiamo sviluppato una strategia social che andasse a valorizzare il suo lavoro come parrucchiere, sfruttandolo come frontman dell'azienda.
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.3 }}
             transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
             className="w-full max-w-4xl mx-auto"
          >
              <div className="grid grid-cols-5 gap-4 lg:gap-8 w-full">
               {videos.map((vid, i) => (
                 <StrategyVideo
                   key={`desk-vid-${i}`}
                   vid={vid}
                   index={i}
                   type="desktop"
                 />
               ))}
             </div>
          </motion.div>
        </div>

        {/* Piattaforma */}
        <div className="flex flex-col items-center gap-16">
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.5 }}
             transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
             className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <span className="font-tech text-[11px] font-bold tracking-[0.4em] uppercase text-white/40 mb-4 inline-block">
              02. Piattaforma
            </span>
            <h3 className="font-display text-[54px] leading-[1.05] font-bold text-white mb-8 drop-shadow-xl uppercase tracking-tighter">
              Sito vetrina <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
                ed E-commerce
              </span>
            </h3>
            <p className="font-sans text-xl text-white/60 leading-relaxed">
              Come secondo step, abbiamo costruito un sito vetrina e un e-commerce per vendere online i buoni salone, i buoni regalo e i buoni per la spa.
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: false, amount: 0.3 }}
             transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
             className="w-full max-w-5xl mx-auto grid grid-cols-2 gap-6 lg:gap-12"
          >
             {images.map((img, i) => (
                <div key={`desk-img-${i}`} className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group pointer-events-none shadow-2xl">
                  <OptimizedImage src={img.src} alt={img.alt} className="w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none object-contain" draggable={false} />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050B14]/80 to-transparent pointer-events-none"></div>
                </div>
             ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* =========================================
        MOBILE VIEW (Original Normal Scrolling)
        ========================================= */}
    <section className="block lg:hidden relative py-32 md:py-48 px-4 md:px-8 bg-[#050B14] z-30 border-t border-white/5 shadow-[0_-30px_60px_rgba(5,11,20,1)] -mt-[100vh]">
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
            Il caso studio <br /> RD Salon
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
                Partendo dalla figura di Daniele, abbiamo sviluppato una strategia social che andasse a valorizzare il suo lavoro come parrucchiere, sfruttandolo come frontman dell'azienda.
              </p>
            </motion.div>

            {/* VISUAL LAYOUT: Desktop Grid, Mobile Carousel */}
            <motion.div 
               initial={{ opacity: 0, x: 60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
               className="w-full lg:w-1/2 relative"
            >
               {/* DESKTOP GRID */}
               <div className="hidden lg:flex flex-wrap justify-center gap-4 w-full">
                 {videos.map((vid, i) => (
                   <StrategyVideo
                     key={`desk-vid-${i}`}
                     vid={vid}
                     index={i}
                     type="desktop2"
                   />
                 ))}
               </div>

               {/* MOBILE GRID (2x2 + 1 centered) */}
               <div className="lg:hidden flex flex-wrap justify-center gap-3 mt-4">
                 {videos.map((vid, i) => (
                   <StrategyVideo
                     key={`mob-vid-${i}`}
                     vid={vid}
                     index={i}
                     type="mobile"
                   />
                 ))}
               </div>
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

            {/* VISUAL CAROUSEL / GRID */}
            <motion.div 
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: false, amount: 0.3 }}
               transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
               className="w-full lg:w-1/2 relative"
            >
                {/* DESKTOP GRID */}
                <div className="hidden lg:grid grid-cols-2 gap-4 xl:gap-6 w-full justify-items-center">
                  {images.map((img, i) => (
                    <div key={`desk-img-${i}`} className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group pointer-events-none">
                      <OptimizedImage src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out object-top pointer-events-none" draggable={false} />
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                    </div>
                  ))}
                </div>

                {/* TABLET CAROUSEL (3 images initially, but mapping all 4 is fine) */}
                <DragCarousel className="hidden md:flex lg:hidden hide-scrollbar" innerClassName="md:px-[calc(50%-240px)]">
                  {images.map((img, i) => (
                    <div key={`tab-img-${i}`} className="snap-center shrink-0 w-[480px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group pointer-events-none">
                      <OptimizedImage src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out object-top pointer-events-none" draggable={false} />
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                    </div>
                  ))}
                </DragCarousel>

               {/* Mobile stacked layout instead of carousel */}
               <div className="flex flex-col gap-6 md:hidden">
                  {images.map((img, i) => (
                    <div key={`mob-img-${i}`} className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative pointer-events-none">
                      <OptimizedImage src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-80 object-top pointer-events-none" draggable={false} />
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#050B14] to-transparent opacity-80 pointer-events-none"></div>
                    </div>
                  ))}
               </div>
               
               {/* Fade edges */}
               <div className="absolute top-0 bottom-0 left-0 w-[60px] md:w-[150px] bg-gradient-to-r from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none z-10 hidden md:block lg:hidden"></div>
               <div className="absolute top-0 bottom-0 right-0 w-[60px] md:w-[150px] bg-gradient-to-l from-[#050B14] via-[#050B14]/80 to-transparent pointer-events-none z-10 hidden md:block lg:hidden"></div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>

    {/* CTA AL TERMINE DEI RISULTATI (Sticky per sovrapposizione) */}
    <section className="relative w-full h-[200vh] bg-[#050B14] z-10">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 w-full">
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
    </section>
    </div>
  );
};

export default ResultsSection;
