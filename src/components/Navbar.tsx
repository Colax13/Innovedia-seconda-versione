import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  show?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ show = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      e.preventDefault();
      const id = target.toLowerCase().replace(' ', '-');
      // Special case for 'Metodo' which might be 'brand-impact' section
      const targetId = id === 'metodo' ? 'metodo' : id;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = ['Servizi', 'Lavori'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] flex justify-center pointer-events-none ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} transition-all duration-500`}>
        <motion.div 
          initial={false}
          animate={{
            width: scrolled ? (isMobile ? '94%' : 'auto') : '100%',
            paddingTop: scrolled ? (isMobile ? '8px' : '12px') : (isMobile ? '12px' : '20px'),
            paddingBottom: scrolled ? (isMobile ? '8px' : '12px') : (isMobile ? '12px' : '20px'),
            paddingLeft: scrolled ? '24px' : (isMobile ? '32px' : '40px'),
            paddingRight: scrolled ? '24px' : (isMobile ? '32px' : '40px'),
            marginTop: scrolled ? (isMobile ? '10px' : '20px') : '0',
            borderRadius: scrolled ? '9999px' : '0px',
            backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.3)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(8px)',
            borderBottomWidth: '1px',
            borderLeftWidth: scrolled ? '1px' : '0px',
            borderRightWidth: scrolled ? '1px' : '0px',
            borderTopWidth: scrolled ? '1px' : '0px',
            borderColor: scrolled ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)',
            boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.7)' : '0 0 0 rgba(0,0,0,0)'
          }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="pointer-events-auto flex justify-between items-center"
        >
          {/* Logo */}
          <Link 
            to="/"
            className="text-white font-display text-lg md:text-xl font-bold tracking-tight cursor-pointer select-none mr-0 md:mr-12 hover:opacity-80 transition-opacity z-[101]"
            onClick={() => setMobileMenuOpen(false)}
          >
            LUDOVICO COLASANTI
          </Link>

          {/* Links (Desktop) */}
          <div className="hidden md:flex gap-8 items-center">
            {menuItems.map((item) => (
               item === 'Lavori' ? (
                 <Link 
                   key={item} 
                   to="/lavori"
                   className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors duration-300"
                 >
                   {item}
                 </Link>
               ) : (
                 <a 
                   key={item} 
                   href={isHome ? `#${item === 'Metodo' ? 'metodo' : item.toLowerCase().replace(' ', '-')}` : `/#${item === 'Metodo' ? 'metodo' : item.toLowerCase().replace(' ', '-')}`}
                   onClick={(e) => handleNavClick(e, item)}
                   className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors duration-300"
                 >
                   {item}
                 </a>
               )
            ))}
          </div>
          
            <div className="hidden md:block ml-12">
              <a 
                href={isHome ? "#contatti" : "/#contatti"} 
                onClick={(e) => handleNavClick(e, 'Contatti')}
                className="relative px-5 py-2 overflow-hidden rounded-full group bg-white/10 hover:bg-white transition-colors duration-300 border border-[#00E5FF] flex items-center justify-center"
              >
                  <span className="relative z-10 text-[10px] font-sans font-bold uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300 leading-none">
                      Parliamo
                  </span>
              </a>
            </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 z-[101] relative pointer-events-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6">
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full"
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full"
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full"
              />
            </div>
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Cyan Accent Layer */}
            <motion.div
              initial={{ clipPath: 'circle(0% at 90% 5%)' }}
              animate={{ clipPath: 'circle(150% at 90% 5%)' }}
              exit={{ clipPath: 'circle(0% at 90% 5%)' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-[#00E5FF] z-[89] pointer-events-none"
              style={{ willChange: 'clip-path' }}
            />

            {/* Main Black Menu Layer */}
            <motion.div
              initial={{ clipPath: 'circle(0% at 90% 5%)' }}
              animate={{ clipPath: 'circle(150% at 90% 5%)' }}
              exit={{ clipPath: 'circle(0% at 90% 5%)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-black z-[90] flex flex-col justify-center items-center pointer-events-auto overflow-hidden"
              style={{ willChange: 'clip-path' }}
            >
              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[102]" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
              />

              {/* Background Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00E5FF]/20 blur-[120px] rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    x: [0, -50, 0],
                    y: [0, 30, 0]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-[120px] rounded-full" 
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4 w-full px-10" style={{ perspective: '1200px' }}>
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 30, rotateX: -30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, rotateX: 15, scale: 0.95 }}
                    transition={{ 
                      delay: 0.3 + i * 0.06, 
                      type: "spring",
                      stiffness: 120,
                      damping: 18
                    }}
                    className="w-full text-center"
                  >
                    {item === 'Lavori' ? (
                      <Link 
                        to="/lavori"
                        onClick={() => setMobileMenuOpen(false)}
                        className="relative inline-block text-3xl font-display font-black uppercase tracking-tight text-white/50 active:text-white transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    ) : (
                      <a 
                        href={isHome ? `#${item === 'Metodo' ? 'metodo' : item.toLowerCase().replace(' ', '-')}` : `/#${item === 'Metodo' ? 'metodo' : item.toLowerCase().replace(' ', '-')}`}
                        onClick={(e) => handleNavClick(e, item)}
                        className="relative inline-block text-3xl font-display font-black uppercase tracking-tight text-white/50 active:text-white transition-colors duration-300"
                      >
                        {item}
                      </a>
                    )}
                  </motion.div>
                ))}

                <div className="flex flex-col gap-3 w-full max-w-[280px] mt-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <a 
                      href="#contatti"
                      onClick={(e) => handleNavClick(e, 'Contatti')}
                      className="block w-full py-4 bg-white text-black text-center font-display font-black text-xs uppercase tracking-[0.2em] rounded-xl shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                    >
                      Richiedi analisi gratuita
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <a 
                      href="#contatti"
                      onClick={(e) => handleNavClick(e, 'Contatti')}
                      className="block w-full py-4 bg-transparent border border-white/20 text-white text-center font-display font-black text-xs uppercase tracking-[0.2em] rounded-xl backdrop-blur-md"
                    >
                      Parlami del tuo progetto
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Footer info in menu */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute bottom-10 left-0 w-full text-center px-6"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-px bg-white/10" />
                  <p className="text-[9px] font-tech uppercase tracking-[0.4em] text-white/30">
                    Innovazione Digitale & Design
                  </p>
                  <p className="text-[8px] font-sans text-white/10 uppercase tracking-widest mt-1">
                    © 2024 Ludovico Colasanti
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
