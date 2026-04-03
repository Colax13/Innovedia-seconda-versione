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
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(target.toLowerCase().replace(' ', '-'));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 flex justify-center py-6 pointer-events-none transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div 
        className={`
          pointer-events-auto transition-all duration-500 ease-out
          flex justify-between items-center px-6 md:px-10 py-3
          ${scrolled 
              ? 'w-[90%] md:w-auto bg-black/80 backdrop-blur-xl border border-[#06b6d4]/30 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)]' 
              : 'w-full bg-black/40 backdrop-blur-sm border-b border-white/5'}
        `}
      >
        {/* Logo */}
        <Link 
          to="/"
          className="text-white font-display text-xl font-bold tracking-tight cursor-pointer select-none mr-0 md:mr-12 hover:opacity-80 transition-opacity"
        >
          INNOVEDIA
        </Link>

        {/* Links (Desktop) */}
        <div className={`hidden md:flex gap-8 items-center`}>
          {['Chi Sono', 'Metodo', 'Lavori', 'Contatti'].map((item) => (
             <a 
               key={item} 
               href={isHome ? `#${item.toLowerCase().replace(' ', '-')}` : `/#${item.toLowerCase().replace(' ', '-')}`}
               onClick={(e) => handleNavClick(e, item)}
               className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors duration-300"
             >
               {item}
             </a>
          ))}
        </div>
        
        {/* CTA (Desktop) */}
        <div className="hidden md:block ml-12">
            <a 
              href={isHome ? "#contatti" : "/#contatti"} 
              onClick={(e) => handleNavClick(e, 'Contatti')}
              className={`relative px-5 py-2 overflow-hidden rounded-full group bg-white/10 hover:bg-white transition-colors duration-300 border border-[#06b6d4]`}
            >
                <span className="relative z-10 text-[10px] font-sans font-bold uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300">
                    Parliamo
                </span>
            </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden pointer-events-auto"
          >
            {['Chi Sono', 'Metodo', 'Lavori', 'Contatti'].map((item) => (
               <a 
                 key={item} 
                 href={isHome ? `#${item.toLowerCase().replace(' ', '-')}` : `/#${item.toLowerCase().replace(' ', '-')}`}
                 onClick={(e) => handleNavClick(e, item)}
                 className="text-lg font-display font-bold uppercase tracking-widest text-white border-b border-white/5 pb-4"
               >
                 {item}
               </a>
            ))}
            <a 
              href={isHome ? "#contatti" : "/#contatti"} 
              onClick={(e) => handleNavClick(e, 'Contatti')}
              className="mt-4 w-full py-4 bg-white text-black text-center font-bold uppercase tracking-widest rounded-xl"
            >
              Parliamo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
