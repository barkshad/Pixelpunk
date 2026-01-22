
import React from 'react';
import { SiteSettings } from '../types';

const About: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  return (
    <section className="min-h-screen pt-32 md:pt-48 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 lg:gap-32 items-start">
        {/* Visual Anchor */}
        <div className="lg:col-span-5 fade-in">
          <div className="aspect-[4/6] bg-brand-charcoal overflow-hidden border border-white/10 rounded-sm shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1621333104435-41a38484e97b?auto=format&fit=crop&q=80&w=1200" 
              alt="Shadrack Baraka Vision"
              className="w-full h-full object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-700"
            />
          </div>
          <div className="mt-8 flex justify-between items-baseline border-b border-white/20 pb-6">
            <p className="text-[12px] tracking-[0.5em] text-brand-bone/70 uppercase font-black">HE'S HIM</p>
            <p className="text-[12px] tracking-[0.5em] text-brand-bone uppercase font-black">BARAKA STAMPED</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-7 pt-4 lg:pt-16 flex flex-col">
          <div className="mb-8 inline-block w-fit px-4 py-1 bg-red-900 text-brand-bone text-[10px] tracking-[0.4em] font-black uppercase italic shadow-lg shadow-red-900/20">
            FUCK FAST FASHION GNG
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-12 lg:mb-16 tracking-tighter">
            {settings.aboutManifesto}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="space-y-8">
              <div className="border-l-4 border-brand-bone/30 pl-6 lg:pl-10 space-y-6">
                <p className="text-brand-bone text-2xl md:text-3xl leading-tight font-black tracking-tight italic">
                  "They buying hype, we buying grails. On god."
                </p>
                <p className="text-brand-bone/80 text-base md:text-xl leading-relaxed font-bold">
                  This space is a hard rejection of mid fits and brick energy. Every piece here is picked with the vision, worn with purpose, and archived because it's a grail. Real motion only, no cap.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-brand-bone/80 text-base md:text-lg leading-relaxed font-semibold">
                Shadrack Baraka is really outside, fighting against the throwaway culture. He only messes with looks that hit different every single time you step out.
              </p>
              <p className="text-brand-bone/80 text-base md:text-lg leading-relaxed font-semibold">
                This is fashion without the rush. Style without the mid energy. Motion without the trends. We stay movin' different gng.
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
