
import React, { useState } from 'react';
import FitCard from '../components/FitCard';
import FitModal from '../components/FitModal';
import { FITS_DATA } from '../constants';
import { Fit } from '../types';

const Fits: React.FC = () => {
  const [selectedFit, setSelectedFit] = useState<Fit | null>(null);

  return (
    <section className="min-h-screen pt-48 pb-32 px-8 md:px-16 max-w-[1800px] mx-auto">
      <header className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-16">
        <div className="max-w-3xl">
          <span className="text-[10px] tracking-[0.4em] text-brand-bone/30 uppercase block mb-6 font-bold">The Fits</span>
          <h2 className="text-7xl md:text-9xl font-serif italic leading-none mb-10 tracking-tight">The Archive</h2>
          <div className="space-y-4 max-w-xl">
            <p className="text-brand-bone/70 text-lg leading-relaxed font-light">
              No hauls. No trend cycles. No throwaway silhouettes.
            </p>
            <p className="text-brand-bone/40 text-sm leading-relaxed tracking-wide font-light">
              These are styled looks built from texture, proportion, and feeling — not what dropped last week. Fashion, slowed down.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-4">
          {['All Archives', 'Streetwear', 'Avant-Garde', 'Tailoring', 'Minimal'].map((cat, i) => (
            <button 
              key={cat}
              className={`text-[9px] tracking-[0.3em] uppercase font-bold px-6 py-2 transition-all ${
                i === 0 ? 'text-brand-bone border border-white/20' : 'text-brand-bone/20 hover:text-brand-bone'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-12">
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
      
      <div className="mt-40 pt-16 border-t border-white/10 flex justify-between items-center">
        <span className="text-[10px] tracking-[0.3em] text-brand-bone/30 uppercase">Showing 06 of 06 entries</span>
        <button className="text-[10px] tracking-[0.4em] text-brand-bone font-bold uppercase border-b border-brand-bone/20 pb-2 hover:border-brand-bone transition-all">
          View Past Seasons
        </button>
      </div>
    </section>
  );
};

export default Fits;
