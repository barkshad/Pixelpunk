
import React, { useState, useEffect } from 'react';
import { Fit } from '../types';

interface FitModalProps {
  fit: Fit | null;
  onClose: () => void;
}

const FitModal: React.FC<FitModalProps> = ({ fit, onClose }) => {
  useEffect(() => {
    if (fit) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [fit]);

  if (!fit) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-brand-obsidian animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto no-scrollbar">
      {/* Dynamic Header */}
      <nav className="sticky top-0 w-full z-[210] flex justify-between items-center px-6 md:px-12 py-8 bg-gradient-to-b from-brand-obsidian to-transparent">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.4em] font-black text-brand-bone/40 uppercase italic">Archive Entry #{fit.id.slice(-4)}</span>
          <span className="text-[10px] tracking-[0.4em] font-black text-brand-bone uppercase">{fit.date} • {fit.category}</span>
        </div>
        <button 
          onClick={onClose}
          className="bg-brand-bone text-brand-obsidian px-8 py-3 text-[10px] tracking-[0.4em] font-black uppercase italic hover:invert transition-all shadow-2xl"
        >
          Close Vision
        </button>
      </nav>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Visual - Fixed for Mobile */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-brand-charcoal overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(255,255,255,0.05)] rounded-sm">
              {fit.mediaType === 'video' ? (
                <video 
                  src={fit.videoUrl} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  webkit-playsinline="true"
                  crossOrigin="anonymous"
                  preload="auto"
                  className="w-full h-full object-cover"
                  poster={fit.imageUrl}
                />
              ) : (
                <img src={fit.imageUrl} alt={fit.title} className="w-full h-full object-cover" />
              )}
              
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                 <div className="flex flex-col gap-2">
                    {fit.brands.map((b, i) => (
                      <span key={i} className="text-[10px] md:text-[12px] tracking-[0.3em] font-black uppercase text-brand-bone bg-brand-obsidian/80 px-4 py-2 border border-white/10 backdrop-blur-md w-fit">
                        {b}
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-12">
               <div className="inline-block px-4 py-1 bg-red-900 text-brand-bone text-[10px] tracking-[0.4em] font-black uppercase italic mb-8">
                  REAL MOTION ONLY
               </div>
               <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif italic mb-10 tracking-tighter leading-none">
                  {fit.title}
               </h2>
               
               <div className="space-y-12">
                  <div className="border-l-4 border-brand-bone/30 pl-10">
                     <h4 className="text-[12px] tracking-[0.5em] text-brand-bone/40 uppercase font-black mb-6 italic underline decoration-brand-bone/10 underline-offset-8">The Manifesto</h4>
                     <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight text-brand-bone italic tracking-tight">
                        "{fit.description}"
                     </p>
                  </div>

                  <div className="p-10 bg-white/[0.03] border border-white/5 relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-4">
                        <span className="text-[8px] tracking-[0.5em] text-brand-bone/20 font-black uppercase italic">AI VERDICT ENGINE v2.5</span>
                     </div>
                     <h4 className="text-[12px] tracking-[0.5em] text-brand-bone uppercase font-black mb-8 flex items-center gap-4 italic">
                        <span className="w-3 h-3 bg-brand-bone rounded-full animate-pulse" />
                        Why It's Goated
                     </h4>
                     <p className="text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-brand-bone/90 tracking-tight">
                        {fit.goatedStory || "The lore for this piece is still being archived. Check back when the motion is fully indexed twin."}
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
                     <div>
                        <span className="text-[10px] tracking-[0.4em] text-brand-bone/30 uppercase font-black block mb-4">Rarity</span>
                        <p className="text-lg font-serif italic uppercase tracking-widest">Archival Grail</p>
                     </div>
                     <div>
                        <span className="text-[10px] tracking-[0.4em] text-brand-bone/30 uppercase font-black block mb-4">Vision</span>
                        <p className="text-lg font-serif italic uppercase tracking-widest">Main Character</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitModal;
