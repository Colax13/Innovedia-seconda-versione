import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QualcosaSuDiMe from './components/QualcosaSuDiMe';
import ProjectSection from './components/ProjectSection';
import MarketingSystemSection from './components/MarketingSystemSection';
import ResultsSection from './components/ResultsSection';
import UnifiedBackground from './components/UnifiedBackground';
const ProjectPage = React.lazy(() => import('./components/project/ProjectPage').then(m => ({ default: m.ProjectPage })));
import FinalCTA from './components/FinalCTA';
import CustomCursor from './components/CustomCursor';

function HomePage() {
  const [heroPhase, setHeroPhase] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') === 'true' ? 3 : 0;
    }
    return 0;
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (heroPhase < 3) {
      document.body.style.overflow = 'hidden';
      // Ensure we are at the top of the page when loading
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      // Se è la prima volta che finiamo l'intro, assicuriamoci di essere a zero
      if (sessionStorage.getItem('hasSeenIntro') !== 'true') {
        window.scrollTo(0, 0);
      }
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [heroPhase]);

  return (
    <div className="bg-transparent min-h-screen text-white relative">
      <UnifiedBackground />
      <Navbar show={heroPhase === 3} />
      <Hero onPhaseChange={setHeroPhase} skipAnimation={heroPhase === 3} />
      <MarketingSystemSection />
      <ResultsSection />
      <QualcosaSuDiMe />
      <ProjectSection />
      <FinalCTA />
      <footer className="bg-black/80 backdrop-blur-md py-12 text-center border-t border-white/5 relative z-10">
        <div className="flex justify-center gap-8 mb-8 text-xs font-tech uppercase tracking-widest text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <p className="text-gray-700 text-xs font-sans">© 2026 Ludovico Colasanti. Creato con React.</p>
      </footer>
    </div>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = React.useState(() => {
    return typeof window !== 'undefined' && document.readyState === 'complete';
  });

  React.useEffect(() => {
    if (isLoaded) return;
    
    const handleLoad = () => setIsLoaded(true);
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 4000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, [isLoaded]);

  return (
    <div className="lg:cursor-none min-h-screen relative">
      <CustomCursor />
      
      {!isLoaded && (
        <div className="fixed inset-0 z-[99999] bg-[#050B14] flex flex-col items-center justify-center font-tech text-[#00E5FF] uppercase tracking-widest text-[10px] gap-6 overflow-hidden">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-2 border-[#00E5FF]/20 rounded-full animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-0 border-2 border-transparent border-t-[#00E5FF] rounded-full animate-[spin_1s_ease-in-out_infinite]" />
            <div className="absolute inset-1/4 bg-[#00E5FF]/20 rounded-full animate-pulse blur-sm" />
          </div>
          <div className="flex flex-col items-center gap-2">
             <span className="text-white/80 font-bold tracking-[0.3em]">INIT_SYSTEM</span>
             <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent animate-pulse" />
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[8px] tracking-[0.5em] animate-pulse">
            LUDOVICO COLASANTI
          </div>
        </div>
      )}

      <div style={{ 
        opacity: isLoaded ? 1 : 0, 
        pointerEvents: isLoaded ? 'auto' : 'none', 
        transition: 'opacity 0.8s ease-out' 
      }}>
        <React.Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/progetto/:id" element={<ProjectPage />} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
