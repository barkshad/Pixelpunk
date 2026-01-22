
import React from 'react';
import { Fit } from '../types';

interface FitCardProps {
  fit: Fit;
  onClick: (fit: Fit) => void;
}

const FitCard: React.FC<FitCardProps> = ({ fit, onClick }) => {
  return (
    <div 
      className="group cursor-pointer mb-16 fade-in"
      onClick={() => onClick(fit)}
    >
      <div className="relative overflow-hidden bg-brand-charcoal aspect-[4/5] mb-6">
        <img 
          src={fit.imageUrl} 
          alt={fit.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="text-[8px] tracking-[0.2em] font-bold uppercase text-brand-bone/90 bg-brand-obsidian/60 px-2 py-1.5 border border-white/5 backdrop-blur-sm">
            {fit.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col border-l border-white/10 pl-6 py-1">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-serif text-2xl group-hover:italic transition-all duration-300">
            {fit.title}
          </h3>
          <span className="text-[9px] tracking-[0.3em] text-brand-bone/30 uppercase font-medium">
            {fit.date}
          </span>
        </div>
        <p className="text-xs text-brand-bone/40 leading-relaxed max-w-sm line-clamp-1 group-hover:text-brand-bone/60 transition-colors">
          {fit.description}
        </p>
      </div>
    </div>
  );
};

export default FitCard;
