
import React from 'react';

const Home: React.FC<{ setView: (v: any) => void }> = ({ setView }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-obsidian px-6">
      {/* Visual Context */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514333130115-3407c93e267d?auto=format&fit=crop&q=80&w=2000" 
          alt="Atmospheric Portrait"
          className="w-full h-full object-cover grayscale opacity-30 scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-brand-obsidian" />
      </div>

      {/* Core Typography */}
      <div className="relative z-10 flex flex-col items-center max-w-6xl fade-in text-center">
        <h1 className="hero-text font-serif mb-10 tracking-tighter select-none opacity-100 drop-shadow-2xl">
          Fuck Fast <span className="italic">Fashion.</span>
        </h1>
        
        <div className="flex flex-col items-center gap-12 md:gap-16 w-full">
          <div className="space-y-6">
            <p className="text-brand-bone tracking-[0.6em] uppercase text-sm md:text-lg font-bold drop-shadow-md">
              Style is not disposable.
            </p>
            <p className="text-brand-bone/90 tracking-[0.3em] uppercase text-[11px] md:text-sm max-w-xl mx-auto leading-relaxed font-semibold drop-shadow-md">
              Fits curated with intention, not trends. 
              Archive of Shadrack Baraka — stylist & visionary.
            </p>
          </div>
          
          <button 
            onClick={() => setView('fits')}
            className="group relative px-14 md:px-24 py-6 md:py-8 border border-white/40 hover:border-brand-bone transition-all duration-700 overflow-hidden bg-brand-obsidian/20 backdrop-blur-sm"
          >
            <span className="relative z-10 text-[12px] md:text-[13px] tracking-[0.5em] font-black text-brand-bone">ACCESS ARCHIVE</span>
            <div className="absolute inset-0 bg-brand-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="absolute inset-0 flex items-center justify-center text-brand-obsidian text-[12px] md:text-[13px] tracking-[0.5em] font-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 pointer-events-none">
              ACCESS ARCHIVE
            </span>
          </button>
        </div>
      </div>

      {/* Grounded Metadata - Desktop Only */}
      <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-10">
        <div className="w-[1px] h-20 bg-white/40" />
        <div className="flex flex-col gap-2">
          <p className="text-[11px] tracking-[0.4em] text-brand-bone uppercase font-bold">PORTFOLIO VOL. 01</p>
          <p className="text-[11px] tracking-[0.4em] text-brand-bone/80 uppercase font-semibold">SHADRACK BARAKA ©2024</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
