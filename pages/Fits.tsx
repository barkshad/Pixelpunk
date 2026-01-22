
import React, { useState } from 'react';
import FitCard from '../components/FitCard';
import FitModal from '../components/FitModal';
import { FITS_DATA } from '../constants';
import { Fit } from '../types';

const Fits: React.FC = () => {
  const [selectedFit, setSelectedFit] = useState<Fit | null>(null);

  return (
    <section className="min-h-screen pt-36 md:pt-48 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <header className="mb-20 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-4xl">
          <span className="text-[12px] tracking-[0.5em] text-brand-bone/70 uppercase block mb-4 font-black">THE VAULT</span>
          <h2 className="text-7xl md:text-9xl font-serif italic leading-none mb-10 tracking-tight">The Rotation</h2>
          <div className="space-y-6 max-w-2xl">
            <p className="text-brand-bone text-2xl md:text-5xl leading-tight font-black tracking-tighter uppercase italic">
              No brick fits. No mid energy.
            </p>
            <p className="text-brand-bone/90 text-base md:text-xl leading-relaxed tracking-wide font-bold">
              We only mess with straight heat. Real grails that hit different in the street. This is motion only, no cap twin.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 md:gap-4 border-b border-white/20 pb-8">
          {['ALL HEAT', 'STREET MOTION', 'DARK ENERGY', 'BOSS TALK', 'LOWKEY'].map((cat, i) => (
            <button 
              key={cat}
              className={`text-[11px] tracking-[0.25em] uppercase font-black px-6 md:px-8 py-3 md:py-4 transition-all ${
                i === 0 
                  ? 'text-brand-obsidian bg-brand-bone scale-105' 
                  : 'text-brand-bone/70 border border-white/20 hover:border-brand-bone hover:text-brand-bone'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 md:gap-x-16 lg:gap-x-20 gap-y-16">
        {FITS_DATA.map((fit) => (
          <FitCard 
            key={fit.id} 
            fit={fit} 
            onClick={setSelectedFit} 
          />
        ))}
      </div>

      <FitModal 
        fit={selectedFit} 
        onClose={() => setSelectedFit(null)} 
      />
      
      <div className="mt-24 md:mt-40 pt-16 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-8">
        <span className="text-[12px] tracking-[0.5em] text-brand-bone/70 uppercase font-black">Peeping 06 of 06 Grails</span>
        <button className="text-[13px] tracking-[0.6em] text-brand-bone font-black uppercase border-b-4 border-brand-bone/40 pb-3 hover:border-brand-bone transition-all italic">
          VIEW PAST MOTION
        </button>
      </div>
    </section>
  );
};

export default Fits;
