import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoTogglePlayerProps {
  src: string;
  title: string;
  containerClassName?: string;
  variant?: 'centered' | 'bottom-left' | 'mobile';
}

export const VideoTogglePlayer: React.FC<VideoTogglePlayerProps> = ({ 
  src, 
  title, 
  containerClassName = "",
  variant = 'centered' 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className={`relative group focus-within:ring-2 ring-[#00E5FF] ${containerClassName}`}>
      <video 
         ref={videoRef} 
         src={src} 
         autoPlay 
         loop 
         muted={isMuted} 
         playsInline 
         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t pointer-events-none from-black/80 via-transparent to-transparent"></div>
      
      {/* Audio Toggle Button */}
      <button 
         onClick={toggleMute}
         className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto shadow-lg"
         title={isMuted ? "Attiva audio" : "Disattiva audio"}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* Meta Bar */}
      {variant === 'centered' && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center pointer-events-none">
          <span className="font-tech text-center text-[10px] text-white/80 uppercase tracking-widest leading-tight">{title}</span>
        </div>
      )}

      {variant === 'bottom-left' && (
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-md bg-[#00E5FF]/20 border-[#00E5FF]/50">
              <div className="w-0 h-0 border-t-4 border-l-6 border-b-4 border-transparent border-l-white ml-1"></div>
            </div>
            <span className="font-tech text-[10px] text-white/80 uppercase tracking-widest">{title}</span>
          </div>
        </div>
      )}

      {variant === 'mobile' && (
        <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 w-full">
            <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center border backdrop-blur-md bg-[#00E5FF]/20 border-[#00E5FF]/50">
              <div className="w-0 h-0 border-t-[3px] border-l-[5px] border-b-[3px] border-transparent border-l-white ml-1"></div>
            </div>
            <span className="font-tech text-[8px] text-white/80 uppercase tracking-widest truncate max-w-[100px] leading-tight flex-1">{title}</span>
          </div>
        </div>
      )}
    </div>
  );
};
