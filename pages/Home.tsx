
import React from 'react';
import { SiteSettings } from '../types';

const Home: React.FC<{ setView: (v: any) => void, settings: SiteSettings }> = ({ setView, settings }) => {
  const words = settings.homeHeadline.split(' ');
  const mainText = words.slice(0, -1).join(' ');
  const lastWord = words[words.length - 1];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-obsidian px-6">
      <div className="absolute inset-0 z-0">
        {settings.heroVideoUrl ? (
          <video 
            src={settings.heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            className="w-full h-full object-cover grayscale opacity-30 scale-[1.05]"
          />
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1514333130115-3407c93e267d?auto=format&fit=crop&q=80&w=2000" 
            alt="Street Culture"
            className="w-full h-full object-cover grayscale opacity-30 scale-[1.05]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-brand-obsidian" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl fade-in text-center">
        <div className="mb-6 py-2 px-4 border border-white/20 bg-white/5 backdrop-blur-md">
          <span className="text-[10px] md:text-[12px] tracking-[0.5em] font-black text-brand-bone uppercase italic">Tap in Twin • Real Motion Only</span>
        </div>
        
        <h1 className="hero-text font-serif mb-10 tracking-tighter select-none opacity-100 drop-shadow-2xl">
          {mainText} <span className="italic">{lastWord}</span>
        </h1>
        
        <div className="flex flex-col items-center gap-12 md:gap-16 w-full">
          <div className="space-y-6 px-4">
            <p className="text-brand-bone tracking-[0.5em] uppercase text-sm md:text-2xl font-black drop-shadow-md italic">
              "{settings.homeSubheadline}"
            </p>
            <p className="text-brand-bone/90 tracking-[0.2em] uppercase text-[12px] md:text-lg max-w-xl mx-auto leading-relaxed font-bold drop-shadow-md">
              {settings.homeDescription}
            </p>
          </div>
          
          <button 
            onClick={() => setView('fits')}
            className="group relative px-12 md:px-28 py-6 md:py-9 border border-white/40 hover:border-brand-bone transition-all duration-700 overflow-hidden bg-brand-obsidian/20 backdrop-blur-sm"
          >
            <span className="relative z-10 text-[12px] md:text-[15px] tracking-[0.6em] font-black text-brand-bone uppercase">PEEP THE ROTATION</span>
            <div className="absolute inset-0 bg-brand-bone translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="absolute inset-0 flex items-center justify-center text-brand-obsidian text-[12px] md:text-[15px] tracking-[0.6em] font-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 pointer-events-none uppercase">
              PEEP THE ROTATION
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-10">
        <div className="w-[1px] h-20 bg-white/40" />
        <div className="flex flex-col gap-2">
          <p className="text-[11px] tracking-[0.4em] text-brand-bone uppercase font-black">STAMPED BY BARAKA</p>
          <p className="text-[11px] tracking-[0.4em] text-brand-bone/70 uppercase font-bold italic">VOL. 01 • ON GOD</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
