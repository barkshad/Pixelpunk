
import React from 'react';
import { SiteSettings } from '../types';

const About: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  return (
    <section className="min-h-screen pt-32 md:pt-48 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 lg:gap-32 items-start">
        <div className="lg:col-span-5 fade-in">
          <div className="aspect-[4/6] bg-brand-charcoal overflow-hidden border border-white/10 rounded-sm shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1621333104435-41a38484e97b?auto=format&fit=crop&q=80&w=1200" 
              alt="Shadrack Baraka Vision"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
               <p className="text-[10px] tracking-[0.4em] font-black uppercase text-brand-bone mb-2 italic">Visionary Mindset</p>
               <h4 className="font-serif italic text-2xl">Shadrack Baraka</h4>
            </div>
          </div>
          
          {/* Instagram Info */}
          <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-sm">
             <h4 className="text-[11px] tracking-[0.5em] text-brand-bone/50 uppercase font-black mb-6">Social Context</h4>
             <p className="text-lg md:text-xl font-serif italic text-brand-bone/90 mb-8 leading-snug">
                "{settings.instagramBio}"
             </p>
             <a 
              href={settings.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-[11px] tracking-[0.4em] font-black text-brand-bone uppercase italic border-b-2 border-brand-bone/20 hover:border-brand-bone transition-all pb-2"
             >
                Peep the Daily Motion
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </a>
          </div>

          <div className="mt-8 flex justify-between items-baseline border-b border-white/20 pb-6">
            <p className="text-[12px] tracking-[0.5em] text-brand-bone/70 uppercase font-black">HE'S HIM</p>
            <p className="text-[12px] tracking-[0.5em] text-brand-bone uppercase font-black italic">BARAKA STAMPED</p>
          </div>
        </div>

        <div className="lg:col-span-7 pt-4 lg:pt-16 flex flex-col">
          <div className="mb-8 inline-block w-fit px-4 py-1 bg-red-900 text-brand-bone text-[10px] tracking-[0.4em] font-black uppercase italic shadow-lg shadow-red-900/20">
            FUCK FAST FASHION GNG
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] mb-12 lg:mb-16 tracking-tighter">
            {settings.aboutManifesto}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="space-y-8">
              <div className="border-l-4 border-brand-bone/30 pl-6 lg:pl-10 space-y-6">
                <p className="text-brand-bone text-2xl md:text-3xl leading-tight font-black tracking-tight italic">
                  "{settings.aboutQuote}"
                </p>
                <p className="text-brand-bone/80 text-base md:text-xl leading-relaxed font-bold">
                  {settings.aboutBody1}
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-brand-bone/80 text-base md:text-lg leading-relaxed font-semibold">
                {settings.aboutBody2}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 pt-16 border-t border-white/20">
            <div>
              <h4 className="text-[12px] tracking-[0.4em] uppercase text-brand-bone/50 mb-8 font-black">THE NO-FLY LIST</h4>
              <ul className="space-y-6 text-[12px] tracking-[0.2em] text-brand-bone/80 uppercase font-black">
                <li className="flex items-center gap-4 group">
                  <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" /> 
                  No Mid Fast Fashion
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" /> 
                  No Trend-Chasing Dubs
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" /> 
                  No Brick Fits
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[12px] tracking-[0.4em] uppercase text-brand-bone/50 mb-8 font-black">THE CODE</h4>
              <ul className="space-y-6 text-[12px] tracking-[0.2em] text-brand-bone uppercase font-black">
                <li className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-brand-bone rounded-full" /> 
                  GRAILS ONLY
                </li>
                <li className="flex items-center gap-4 italic underline decoration-brand-bone/40">
                  <span className="w-3 h-3 bg-brand-bone rounded-full" /> 
                  REAL MOTION GNG
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-brand-bone rounded-full" /> 
                  MAIN CHARACTER ENERGY
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
