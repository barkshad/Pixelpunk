
import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems: { label: string; value: ViewState }[] = [
    { label: 'HOME', value: 'home' },
    { label: 'FITS', value: 'fits' },
    { label: 'ABOUT', value: 'about' },
    { label: 'CONTACT', value: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-brand-obsidian/95 backdrop-blur-md border-b border-white/[0.1] px-6 md:px-12 py-5 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 transition-all duration-500">
      <div 
        className="text-2xl md:text-3xl font-serif tracking-tight cursor-pointer select-none group"
        onClick={() => setView('home')}
      >
        <span className="opacity-100 group-hover:opacity-60 transition-opacity">_pixelpunk</span>
      </div>
      
      <div className="flex gap-8 md:gap-14 items-center">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setView(item.value)}
            className={`text-[11px] md:text-[12px] tracking-[0.25em] font-semibold transition-all duration-300 relative uppercase py-1 ${
              currentView === item.value 
                ? 'text-brand-bone' 
                : 'text-brand-bone/60 hover:text-brand-bone'
            }`}
          >
            {item.label}
            {currentView === item.value && (
              <span className="absolute bottom-[-4px] left-0 w-full h-[1.5px] bg-brand-bone animate-in fade-in duration-300" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
