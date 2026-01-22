
import React, { useState, useEffect } from 'react';
import { Fit } from '../types';
import { generateStylingInsight } from '../services/geminiService';

interface FitModalProps {
  fit: Fit | null;
  onClose: () => void;
}

const FitModal: React.FC<FitModalProps> = ({ fit, onClose }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fit) {
      setLoading(true);
      generateStylingInsight(fit.title, fit.brands).then(res => {
        setInsight(res);
        setLoading(false);
      });
    } else {
      setInsight('');
    }
  }, [fit]);

  if (!fit) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 lg:p-24 bg-brand-obsidian/98 animate-in fade-in duration-500">
      <button 
        onClick={onClose}
        className="absolute top-12 right-12 text-brand-bone/40 hover:text-brand-bone transition-all group z-[210]"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:rotate-90 transition-transform duration-500">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
        </svg>
      </button>

      <div className="w-full h-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 overflow-y-auto no-scrollbar py-12">
        {/* Visual Column */}
        <div className="lg:col-span-7 h-full">
          <div className="sticky top-0 w-full aspect-[4/5] bg-brand-charcoal overflow-hidden border border-white/5">
            <img 
              src={fit.imageUrl} 
              alt={fit.title} 
              className="w-full h-full object-cover animate-in zoom-in-95 duration-1000 ease-out"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-5 flex flex-col justify-center py-8">
          <div className="max-w-md">
            <span className="text-[10px] tracking-[0.4em] uppercase text-brand-bone/30 block mb-6">
              Archive Entry • {fit.category}
            </span>
            
            <h2 className="text-6xl lg:text-8xl font-serif italic mb-10 leading-none">
              {fit.title}
            </h2>

            <div className="space-y-12">
              <div className="border-l-2 border-white/10 pl-8">
                <h4 className="text-[9px] tracking-[0.3em] uppercase text-brand-bone/30 mb-4 font-bold">Analysis</h4>
                <p className="text-brand-bone/70 text-lg leading-relaxed font-light">
                  {fit.description}
                </p>
              </div>

              <div>
                <h4 className="text-[9px] tracking-[0.3em] uppercase text-brand-bone/30 mb-6 font-bold">Brand Index</h4>
                <div className="flex flex-wrap gap-3">
                  {fit.brands.map((brand, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 text-[10px] tracking-widest text-brand-bone/60 uppercase">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-white/[0.05]">
                <h4 className="text-[9px] tracking-[0.3em] uppercase text-brand-bone/40 mb-6 font-bold flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-bone rounded-full" />
                  Editorial Insight
                </h4>
                <div className="min-h-[100px] flex items-center">
                  {loading ? (
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-brand-bone/20 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-bone/20 rounded-full animate-bounce delay-75" />
                      <div className="w-1.5 h-1.5 bg-brand-bone/20 rounded-full animate-bounce delay-150" />
                    </div>
                  ) : (
                    <p className="text-2xl lg:text-3xl font-serif italic text-brand-bone/90 leading-tight">
                      "{insight}"
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href={fit.instagramUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold text-brand-bone border-b border-brand-bone/20 pb-2 hover:border-brand-bone transition-all group"
                >
                  LINK TO SOURCE
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitModal;
