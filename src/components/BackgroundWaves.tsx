import React from 'react';

const BackgroundWaves: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030303]">
      
      {/* Top Left - Cyan Flow */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-pixar-cyan/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob opacity-60"></div>
      
      {/* Bottom Right - Purple Flow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-pixar-purple/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob-reverse opacity-60"></div>
      
      {/* Center - Deep Blue Pulse */}
      <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow opacity-50"></div>

      {/* Detail Accent - Pink */}
      <div className="absolute top-[60%] left-[10%] w-[30vw] h-[30vw] bg-pink-500/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000 opacity-40"></div>

      {/* Global Grain/Noise Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

export default BackgroundWaves;