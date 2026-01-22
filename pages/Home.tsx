
import React from 'react';

const Home: React.FC<{ setView: (v: any) => void }> = ({ setView }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-obsidian">
      {/* Visual Context */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514333130115-3407c93e267d?auto=format&fit=crop&q=80&w=2000" 
          alt="Atmospheric Fashion Portrait"
          className="w-full h-full object-cover grayscale opacity-30 scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/20 to-brand-obsidian" />
      </div>

      {/* Core Typography */}
      <div className="relative z-10 flex flex-col items-center px-8 max-w-5xl fade-in">
        <h1 className="text-6xl md:text-[10rem] font-serif leading-[0.8] mb-12 tracking-tighter select-none opacity-90 text-center">
          Fuck Fast <span className="italic">Fashion.</span>
        </h1>
        
        <div className="flex flex-col items-center gap-16 w-full">
          <div className="text-center space-y-4">
            <p className="text-brand-bone tracking-[0.4em] uppercase text-xs md:text-sm font-bold">
              Style is not disposable.
            </p>
            <p className="text-brand-bone/40 tracking-[0.3em] uppercase text-[10px] md:text-xs max-w-md mx-auto leading-relaxed">
              Fits curated with intention, not trends. 
              Archive of Shadrack Baraka — stylist & visual visionary.
            </p>
          </div>
          
          <button 
            onClick={() => setView('fits')}
            className="group relative px-16 py-6 border border-white/10 hover:border-brand-bone transition-all duration-700 overflow-hidden"
          >
            <span className="relative z-10 text-[10px] tracking-[0.4em] font-bold text-brand-bone">ACCESS ARCHIVE</span>
            <div className="absolute inset-0 bg-brand-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="absolute inset-0 flex items-center justify-center text-brand-obsidian text-[10px] tracking-[0.4em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 pointer-events-none">
              ACCESS ARCHIVE
            </span>
          </button>
        </div>
      </div>

      {/* Grounded Metadata */}
      <div className="absolute bottom-16 left-16 hidden lg:flex items-center gap-10">
        <div className="w-[1px] h-20 bg-white/10" />
        <div className="flex flex-col gap-2">
          <p className="text-[9px] tracking-[0.3em] text-brand-bone uppercase font-bold">PORTFOLIO VOLUME 01</p>
          <p className="text-[9px] tracking-[0.3em] text-brand-bone/30 uppercase">SHADRACK BARAKA ©2024</p>
        </div>
      </div>
      
      <div className="absolute bottom-16 right-16 hidden lg:block">
        <p className="text-[9px] tracking-[0.4em] text-brand-bone/30 uppercase vertical-text">
          SCROLL TO EXPLORE SILHOUETTE
        </p>
      </div>
      
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default Home;
