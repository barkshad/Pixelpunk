
import React, { useState, useMemo } from 'react';
import FitCard from '../components/FitCard';
import FitModal from '../components/FitModal';
import { Fit } from '../types';

interface FitsProps {
  fits: Fit[];
}

const Fits: React.FC<FitsProps> = ({ fits }) => {
  const [selectedFit, setSelectedFit] = useState<Fit | null>(null);
  const [activeSection, setActiveSection] = useState<'gallery' | 'fit-check'>('gallery');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredFits = useMemo(() => {
    return fits.filter(f => {
      const sectionMatch = f.section === activeSection;
      const categoryMatch = activeCategory === 'ALL' || f.category.toUpperCase() === activeCategory;
      return sectionMatch && categoryMatch;
    });
  }, [fits, activeSection, activeCategory]);

  const categories = ['ALL', 'STREETWEAR', 'AVANT-GARDE', 'TAILORING', 'MINIMAL'];

  return (
    <section className="min-h-screen pt-36 md:pt-48 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <header className="mb-20 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-4xl">
          <div className="flex gap-8 mb-8 border-b border-white/10">
            <button 
              onClick={() => setActiveSection('gallery')}
              className={`pb-4 text-[12px] tracking-[0.5em] uppercase font-black transition-all ${activeSection === 'gallery' ? 'text-brand-bone border-b-2 border-brand-bone' : 'text-brand-bone/30 hover:text-brand-bone'}`}
            >
              Archive Gallery
            </button>
            <button 
              onClick={() => setActiveSection('fit-check')}
              className={`pb-4 text-[12px] tracking-[0.5em] uppercase font-black transition-all ${activeSection === 'fit-check' ? 'text-brand-bone border-b-2 border-brand-bone' : 'text-brand-bone/30 hover:text-brand-bone'}`}
            >
              Fit Checks (Video)
            </button>
          </div>
          
          <h2 className="text-7xl md:text-9xl font-serif italic leading-none mb-10 tracking-tight">
            {activeSection === 'gallery' ? 'The Vault' : 'Fit Checks'}
          </h2>
          
          <div className="space-y-6 max-w-2xl">
            <p className="text-brand-bone text-2xl md:text-5xl leading-tight font-black tracking-tighter uppercase italic">
              {activeSection === 'gallery' ? 'Real grails only.' : 'Motion in 4K gng.'}
            </p>
            <p className="text-brand-bone/70 text-base md:text-xl leading-relaxed tracking-wide font-bold">
              {activeSection === 'gallery' 
                ? 'A curated selection of archival pieces that defined my vision. No fast fashion bricks, strictly premium energy.'
                : 'Raw clips from the street. Real rotation highlights and main character energy. Peep the flow twin.'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-3 border-b border-white/20 pb-8">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[0.2em] uppercase font-black px-5 py-3 transition-all ${
                activeCategory === cat
                  ? 'text-brand-obsidian bg-brand-bone' 
                  : 'text-brand-bone/50 border border-white/10 hover:border-brand-bone hover:text-brand-bone'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 md:gap-x-16 lg:gap-x-20 gap-y-16">
        {filteredFits.length > 0 ? filteredFits.map((fit) => (
          <FitCard 
            key={fit.id} 
            fit={fit} 
            onClick={setSelectedFit} 
          />
        )) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5">
            <p className="text-2xl font-serif italic text-brand-bone/20 tracking-widest uppercase">No {activeSection === 'gallery' ? 'Grails' : 'Clips'} in this category gng.</p>
          </div>
        )}
      </div>

      <FitModal 
        fit={selectedFit} 
        onClose={() => setSelectedFit(null)} 
      />
      
      <div className="mt-24 md:mt-40 pt-16 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-8">
        <span className="text-[11px] tracking-[0.5em] text-brand-bone/40 uppercase font-black">Viewing {filteredFits.length} of {fits.length} total motion assets</span>
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="text-[13px] tracking-[0.6em] text-brand-bone font-black uppercase border-b-4 border-brand-bone/40 pb-3 hover:border-brand-bone transition-all italic"
        >
          Back to Top
        </button>
      </div>
    </section>
  );
};

export default Fits;
