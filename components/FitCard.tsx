
import React from 'react';
import { Fit } from '../types';

interface FitCardProps {
  fit: Fit;
  onClick: (fit: Fit) => void;
}

const FitCard: React.FC<FitCardProps> = ({ fit, onClick }) => {
  return (
    <div 
      className="group cursor-pointer mb-12 md:mb-20 fade-in"
      onClick={() => onClick(fit)}
    >
      <div className="relative overflow-hidden bg-brand-charcoal aspect-[4/5] mb-6 rounded-sm shadow-2xl">
        <img 
          src={fit.imageUrl} 
          alt={fit.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05] opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        
        {fit.mediaType === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-bone group-hover:text-brand-obsidian transition-all duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-2">
          <span className="text-[9px] tracking-[0.2em] font-black uppercase text-brand-bone bg-brand-obsidian/90 px-3 py-1.5 border border-white/10 backdrop-blur-md italic">
            {fit.section === 'fit-check' ? 'VIBE CHECK' : 'ARCHIVE'}
          </span>
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-brand-bone/60 bg-brand-obsidian/90 px-3 py-1.5 border border-white/10 backdrop-blur-md">
            {fit.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col border-l-2 border-white/20 pl-6 py-1">
        <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2">
          <h3 className="font-serif text-2xl md:text-3xl group-hover:italic transition-all duration-300 tracking-tight">
            {fit.title}
          </h3>
          <span className="text-[11px] tracking-[0.3em] text-brand-bone/70 uppercase font-bold">
            {fit.date}
          </span>
        </div>
        <p className="text-sm md:text-base text-brand-bone/80 leading-relaxed max-w-sm line-clamp-2 group-hover:text-brand-bone transition-colors">
          {fit.description}
        </p>
      </div>
    </div>
  );
};

export default FitCard;
