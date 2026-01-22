
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen pt-48 pb-32 px-8 md:px-16 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
        {/* Visual Anchor */}
        <div className="lg:col-span-5 fade-in">
          <div className="aspect-[4/6] bg-brand-charcoal overflow-hidden border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1621333104435-41a38484e97b?auto=format&fit=crop&q=80&w=1200" 
              alt="Portrait Shadrack Baraka"
              className="w-full h-full object-cover filter contrast-[1.1] grayscale"
            />
          </div>
          <div className="mt-10 flex justify-between items-baseline border-b border-white/10 pb-6">
            <p className="text-[10px] tracking-[0.4em] text-brand-bone/40 uppercase font-bold">Creative Director</p>
            <p className="text-[10px] tracking-[0.4em] text-brand-bone uppercase font-bold">Shadrack Baraka</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-7 pt-12 lg:pt-24 flex flex-col">
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-16 tracking-tight">
            Style is not disposable. Clothing is <span className="italic">language.</span> I choose my words <span className="italic border-b border-brand-bone/30">carefully.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24">
            <div className="space-y-10">
              <div className="border-l-2 border-brand-bone/10 pl-8 space-y-6">
                <p className="text-brand-bone text-lg leading-relaxed font-medium">
                  Fast fashion taught people to consume. Style should teach people to see.
                </p>
                <p className="text-brand-bone/60 text-base leading-relaxed font-light">
                  This space is a rejection of disposable design, rushed trends, and algorithmic taste. Every fit here is styled slowly, worn deliberately, and archived with purpose.
                </p>
              </div>
            </div>
            
            <div className="space-y-10">
              <p className="text-brand-bone/60 text-base leading-relaxed font-light">
                Shadrack Baraka is a fashion influencer and stylist working against disposable fashion culture. His work focuses on curated fits, repeated wear, and expressive styling at the intersection of art and apparel.
              </p>
              <p className="text-brand-bone/60 text-base leading-relaxed font-light">
                This is fashion without urgency. Style without waste. Identity without trends.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-white/10">
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/30 mb-8 font-bold">What This Is Not</h4>
              <ul className="space-y-6 text-sm tracking-[0.1em] text-brand-bone/60 uppercase">
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-red-900/40 rounded-full" /> Not fast fashion</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-red-900/40 rounded-full" /> Not trend-chasing</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-red-900/40 rounded-full" /> Not overconsumption</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-red-900/40 rounded-full" /> Not seasonal identity</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/30 mb-8 font-bold">What It Is</h4>
              <ul className="space-y-6 text-sm tracking-[0.1em] text-brand-bone font-medium uppercase">
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-brand-bone rounded-full" /> Intentional styling</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-brand-bone rounded-full" /> Rewearing with purpose</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-brand-bone rounded-full" /> Fashion as expression</li>
                <li className="flex items-center gap-4"><span className="w-1.5 h-1.5 bg-brand-bone rounded-full" /> Fits with memory</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
