import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const CollabVideo = ({ vid }: { vid: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    const handleGlobalPlay = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      if (target !== video && target.hasAttribute('data-exclusive-play') && !video.paused) {
        video.pause();
      }
    };
    
    document.addEventListener('play', handleGlobalPlay, true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(video);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      document.removeEventListener('play', handleGlobalPlay, true);
      observer.disconnect();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative shrink-0">
      <video ref={videoRef} src={vid.src} loop playsInline data-exclusive-play="true" className="w-full h-full object-cover"></video>
      <div className="absolute inset-0 bg-gradient-to-t pointer-events-none from-black/80 via-transparent to-transparent"></div>
      
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
        <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest truncate mr-2">{vid.title}</span>
        <button onClick={togglePlay} className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center border backdrop-blur-md bg-[#00E5FF]/20 border-[#00E5FF]/50 pointer-events-auto hover:bg-[#00E5FF]/40 transition-colors shadow-lg" title={isPlaying ? "Pausa" : "Play"}>
           {isPlaying ? <Pause size={14} className="text-white" fill="currentColor" /> : <div className="w-0 h-0 border-t-[5px] border-l-[7px] border-b-[5px] border-transparent border-l-white ml-1"></div>}
        </button>
      </div>
    </div>
  );
};

const OtherCollaborationsSection: React.FC = () => {

  const brands = [
    { name: 'Acqua Orsini', logo: 'https://res.cloudinary.com/dcmd1ukvx/image/upload/v1780069411/LOGO-NUOVO-ACQUA-ORSINI-_BIANCO-e1772549784234_bjx1gu.png' },
    { name: 'LET EXPO', logo: 'https://www.letexpo.it/wp-content/uploads/2024/11/letexpo-120x79.png' },
    { name: 'Restaldi Biliardi', logo: 'https://www.biliardi.com/wp-content/uploads/2023/02/logo-restaldi-v2.png' }
  ];

  const orsiniVideos = [
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065854/Vin%C3%B2forum_fatynv.mp4", title: "Vinòforum" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065764/Barshow_mood_dvscoz.mp4", title: "Barshow Mood" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065934/Film_Festival_fwts0r.mp4", title: "Film Festival" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065757/Barshow_jvq2go.mp4", title: "Barshow" }
  ];

  const letExpoVideos = [
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065948/Mood_Itssi_uztsq5.mp4", title: "Event Mood" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065941/L_zf9r3z.mp4", title: "Intervista" }
  ];

  const restaldiVideos = [
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780068832/Spike_Heel_ftmzab.mp4", title: "Spike" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065613/Storia_aoguby.mp4", title: "Storia" },
    { src: "https://res.cloudinary.com/dcmd1ukvx/video/upload/v1780065606/Numeri_Seriali_sukbdg.mp4", title: "Numeri Seriali" }
  ];

  return (
    <div id="altre-collaborazioni" className="relative z-30 bg-[#050B14] py-32 border-t border-white/5">
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
           className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20"
        >
          <span className="font-tech text-[11px] font-bold tracking-[0.4em] uppercase text-[#00E5FF] mb-6 inline-flex border border-[#00E5FF]/30 px-3 py-1 rounded-full bg-[#00E5FF]/5">
            HIGH TIER
          </span>
          <h2 className="font-display text-[40px] md:text-[60px] leading-[1.05] font-bold text-white mb-8 drop-shadow-xl uppercase tracking-tighter">
            Altre <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-blue-500">
              Collaborazioni
            </span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 leading-relaxed">
            Ho gestito in prima linea collaborazioni di alto livello, curando personalmente la copertura di eventi, le interviste e le riprese. Dietro ogni progetto d'eccellenza, ho portato la mia visione dal comando creativo al montaggio finale, garantendo risultati impareggiabili.
          </p>
        </motion.div>

        {/* LOGOS CARDS */}
        <div className="flex flex-col items-center mb-32">
          <h3 className="font-tech text-xs tracking-[0.3em] uppercase text-white/40 mb-8">Brand con cui ho collaborato</h3>
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
             className="flex flex-wrap justify-center gap-6"
          >
            {brands.map((brand, i) => (
              <div key={i} className="w-[200px] h-[100px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center filter grayscale lg:hover:grayscale-0 transition-all duration-500 lg:hover:bg-white/10 overflow-hidden relative group p-6">
                 <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ORSINI SODA / SODA KITTENS */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/3 flex flex-col gap-6"
            >
               <h3 className="font-display text-[32px] md:text-[40px] text-white font-bold leading-tight uppercase tracking-tight">
                 Acqua Orsini <br/><span className="text-[#00E5FF] text-xl">(e Orsini Soda)</span>
               </h3>
               <div className="w-12 h-[2px] bg-[#00E5FF]"></div>
               <p className="font-sans text-white/60 text-lg leading-relaxed">
                 Per il Brand Orsini (durante la mia collaborazione con Futuroma) mi sono occupato in prima persona della copertura degli eventi e del montaggio video delle interviste. Ho curato l'editing e la selezione dei contenuti migliori per valorizzare il brand.
               </p>
               <p className="font-sans text-white/40 text-sm mt-4 italic">
                 Un ringraziamento a Futuroma per l'opportunità.
               </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {orsiniVideos.map((vid, i) => (
                <CollabVideo key={i} vid={vid} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* LET EXPO */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center lg:items-start">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/3 flex flex-col gap-6"
            >
               <h3 className="font-display text-[32px] md:text-[40px] text-white font-bold leading-tight uppercase tracking-tight">
                 LET EXPO
               </h3>
               <div className="w-12 h-[2px] bg-[#00E5FF]"></div>
               <p className="font-sans text-white/60 text-lg leading-relaxed">
                 Per la redazione Alis, ho realizzato le interviste a figure di altissimo calibro, come i direttori di Trans EU e Telepass. Un lavoro in cui precisione comunicativa e qualità delle riprese si sono fuse per documentare l'importanza dell'evento fieristico.
               </p>
               <p className="font-sans text-white/40 text-sm mt-4 italic">
                 Un ringraziamento a ITSxellence per l'opportunità.
               </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3 grid grid-cols-2 gap-4 lg:pr-12"
            >
              {letExpoVideos.map((vid, i) => (
                <CollabVideo key={i} vid={vid} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* RESTALDI BILIARDI */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/3 flex flex-col gap-6"
            >
               <h3 className="font-display text-[32px] md:text-[40px] text-white font-bold leading-tight uppercase tracking-tight">
                 Restaldi Biliardi
               </h3>
               <div className="w-12 h-[2px] bg-[#00E5FF]"></div>
               <p className="font-sans text-white/60 text-lg leading-relaxed">
                 In occasione del mio Tirocinio presso COMMANDOCREATIVO, ho potuto lavorare a contatto con una realtà come Restaldi Biliardi, occupandomi delle riprese e dell'editing di questi 3 contenuti.
               </p>
               <p className="font-sans text-white/40 text-sm mt-4 italic">
                 Un ringraziamento a COMMANDO CREATIVO per l'opportunità.
               </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {restaldiVideos.map((vid, i) => (
                <CollabVideo key={i} vid={vid} />
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OtherCollaborationsSection;

