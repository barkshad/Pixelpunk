
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
        className="fixed top-6 right-6 md:top-12 md:right-12 text-brand-bone/60 hover:text-brand-bone transition-all group z-[250] bg-brand-obsidian/40 backdrop-blur-sm p-3 rounded-full border border-white/10"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      <div className="w-full h-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 overflow-y-auto no-scrollbar py-12 px-2 md:px-0">
        {/* Photo */}
        <div className="lg:col-span-7">
          <div className="w-full bg-brand-charcoal overflow-hidden border border-white/10 rounded-sm">
            <img 
              src={fit.imageUrl} 
              alt={fit.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:justify-center py-4">
          <div className="max-w-xl">
            <span className="text-[11px] tracking-[0.4em] uppercase text-brand-bone/60 block mb-6 font-bold">
              Archive • {fit.category}
            </span>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-8 leading-[1.1] tracking-tight">
              {fit.title}
            </h2>

            <div className="space-y-10">
              <div className="border-l-2 border-white/30 pl-6">
                <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-bone/60 mb-3 font-bold">About this Look</h4>
                <p className="text-brand-bone/90 text-base md:text-lg leading-relaxed font-normal">
                  {fit.description}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-bone/60 mb-5 font-bold">Brands Used</h4>
                <div className="flex flex-wrap gap-2.5">
                  {fit.brands.map((brand, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] md:text-[11px] tracking-widest text-brand-bone uppercase font-bold">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-bone/70 mb-5 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-bone rounded-full" />
                  Stylist Insight
                </h4>
                <div className="min-h-[80px]">
                  {loading ? (
                    <p className="text-brand-bone/50 text-sm animate-pulse tracking-widest uppercase">Thinking...</p>
                  ) : (
                    <p className="text-xl md:text-3xl font-serif italic text-brand-bone/90 leading-snug">
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
                  className="inline-flex items-center gap-4 text-[12px] tracking-[0.3em] font-black text-brand-bone border-b-2 border-brand-bone/40 pb-2 hover:border-brand-bone transition-all group uppercase"
                >
                  View Original Post
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
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
