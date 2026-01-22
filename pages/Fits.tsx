
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
          <span className="text-[12px] tracking-[0.5em] text-brand-bone/70 uppercase block mb-4 font-bold">The Fits</span>
          <h2 className="text-7xl md:text-9xl font-serif italic leading-none mb-10 tracking-tight">The Archive</h2>
          <div className="space-y-6 max-w-2xl">
            <p className="text-brand-bone text-2xl md:text-4xl leading-tight font-bold tracking-tight">
              No hauls. No trend cycles. No throwaway silhouettes.
            </p>
            <p className="text-brand-bone/90 text-base md:text-lg leading-relaxed tracking-wide font-medium">
              These are styled looks built from texture, proportion, and feeling — not what dropped last week. Fashion, slowed down.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 border-b border-white/20 pb-8">
          {['All Archives', 'Streetwear', 'Avant-Garde', 'Tailoring', 'Minimal'].map((cat, i) => (
            <button 
              key={cat}
              className={`text-[11px] tracking-[0.35em] uppercase font-bold px-6 py-3 transition-all ${
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
        <span className="text-[12px] tracking-[0.4em] text-brand-bone/70 uppercase font-bold">Showing 06 of 06 entries</span>
        <button className="text-[12px] tracking-[0.5em] text-brand-bone font-black uppercase border-b-2 border-brand-bone/40 pb-3 hover:border-brand-bone transition-all">
          View Past Seasons
        </button>
      </div>
    </section>
  );
};

export default Fits;
