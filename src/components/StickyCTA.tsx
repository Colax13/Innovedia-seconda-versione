import React, { useState, useEffect } from 'react';

const StickyCTA: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down a bit (e.g., 100px)
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md md:hidden transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            <a 
                href="#contact" 
                className="flex items-center justify-center w-full py-4 bg-white text-black rounded-full shadow-2xl font-display text-xl uppercase tracking-wide hover:bg-gray-100 transition-colors"
            >
                Parliamo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
        </div>
    );
};

export default StickyCTA;
