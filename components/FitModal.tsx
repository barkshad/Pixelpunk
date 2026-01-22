
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
      document.body.style.overflow = 'hidden';
    } else {
      setInsight('');
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [fit]);

  if (!fit) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 lg:p-16 bg-brand-obsidian animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 md:top-12 md:right-12 text-brand-bone/60 hover:text-brand-bone transition-all group z-[250] bg-brand-obsidian/40 backdrop-blur-sm p-2"
        aria-label="Close modal"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
        </svg>
      </button>

      <div className="w-full h-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 overflow-y-auto no-scrollbar py-12 px-2 md:px-0">
        {/* Visual Column */}
        <div className="lg:col-span-7">
          <div className="w-full bg-brand-charcoal overflow-hidden border border-white/10 rounded-sm">
            <img 
              src={fit.imageUrl} 
              alt={fit.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:justify-center py-4">
          <div className="max-w-xl">
            <span className="text-[11px] tracking-[0.4em] uppercase text-brand-bone/60 block mb-6 font-bold">
              Archive Entry • {fit.category}
            </span>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-8 leading-[1.1]">
              {fit.title}
            </h2>

            <div className="space-y-10">
              <div className="border-l border-white/30 pl-6">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/50 mb-3 font-bold">Analysis</h4>
                <p className="text-brand-bone/90 text-base md:text-lg leading-relaxed font-light">
                  {fit.description}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/50 mb-5 font-bold">Brand Index</h4>
                <div className="flex flex-wrap gap-2.5">
                  {fit.brands.map((brand, i) => (
                    <span key={i} className="px-3.5 py-2 bg-white/5 border border-white/10 text-[10px] tracking-widest text-brand-bone uppercase font-medium">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/60 mb-5 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-bone rounded-full" />
                  Editorial Insight
                </h4>
                <div className="min-h-[80px]">
                  {loading ? (
                    <p className="text-brand-bone/40 text-sm animate-pulse tracking-widest uppercase">Processing aesthetic data...</p>
                  ) : (
                    <p className="text-xl md:text-2xl font-serif italic text-brand-bone leading-snug">
                      "{insight}"
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 pb-12">
                <a 
                  href={fit.instagramUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] font-bold text-brand-bone border-b border-brand-bone/40 pb-2 hover:border-brand-bone transition-all group"
                >
                  SOURCE ARCHIVE
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
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
