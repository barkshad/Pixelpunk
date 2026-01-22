
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
    <nav className="fixed top-0 left-0 w-full z-[100] bg-brand-obsidian/90 backdrop-blur-xl border-b border-white/[0.04] px-8 md:px-16 py-8 flex justify-between items-center transition-all duration-300">
      <div 
        className="text-2xl font-serif tracking-tight cursor-pointer select-none group"
        onClick={() => setView('home')}
      >
        <span className="opacity-100 group-hover:opacity-60 transition-opacity">_pixelpunk</span>
      </div>
      
      <div className="flex gap-10 md:gap-16">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setView(item.value)}
            className={`text-[10px] tracking-[0.25em] font-medium transition-all duration-300 relative uppercase ${
              currentView === item.value 
                ? 'text-brand-bone' 
                : 'text-brand-bone/30 hover:text-brand-bone'
            }`}
          >
            {item.label}
            {currentView === item.value && (
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-brand-bone animate-in slide-in-from-left-2 fade-in duration-300" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
