import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandImpactSection from './components/BrandImpactSection';
import ChiSono from './components/ChiSono';
import ServicesSection from './components/ServicesSection';
import ParallaxSection from './components/ParallaxSection';
import CaseStudySection from './components/CaseStudySection';
import ProjectSection from './components/ProjectSection';
import UnifiedBackground from './components/UnifiedBackground';
import { ProjectPage } from './components/project/ProjectPage';
import LavoriPage from './components/LavoriPage';
import FinalCTA from './components/FinalCTA';

function HomePage() {
  const [heroPhase, setHeroPhase] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasSeenIntro') === 'true' ? 3 : 0;
    }
    return 0;
  });

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
      <BrandImpactSection />
      <ChiSono />
      <ServicesSection />
      <ParallaxSection />
      <CaseStudySection />
      <ProjectSection />
      <FinalCTA />
      <footer className="bg-black/80 backdrop-blur-md py-12 text-center border-t border-white/5 relative z-10">
        <div className="flex justify-center gap-8 mb-8 text-xs font-tech uppercase tracking-widest text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <p className="text-gray-700 text-xs font-sans">© 2024 Innovedia. Creato con React.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lavori" element={<LavoriPage />} />
      <Route path="/progetto/:id" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
