
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 md:pt-48 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 lg:gap-32 items-start">
        {/* Visual Anchor */}
        <div className="lg:col-span-5 fade-in">
          <div className="aspect-[4/6] bg-brand-charcoal overflow-hidden border border-white/10 rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1621333104435-41a38484e97b?auto=format&fit=crop&q=80&w=1200" 
              alt="Portrait Shadrack Baraka"
              className="w-full h-full object-cover filter contrast-[1.1] grayscale"
            />
          </div>
          <div className="mt-8 flex justify-between items-baseline border-b border-white/20 pb-6">
            <p className="text-[11px] tracking-[0.4em] text-brand-bone/70 uppercase font-bold">Creative Director</p>
            <p className="text-[11px] tracking-[0.4em] text-brand-bone uppercase font-bold">Shadrack Baraka</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-7 pt-4 lg:pt-16 flex flex-col">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.15] mb-12 lg:mb-16 tracking-tight">
            Style is not disposable. Clothing is <span className="italic">language.</span> I choose my words <span className="italic border-b border-brand-bone/40">carefully.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="space-y-8">
              <div className="border-l-2 border-brand-bone/30 pl-6 lg:pl-8 space-y-6">
                <p className="text-brand-bone text-xl md:text-2xl leading-relaxed font-semibold">
                  Fast fashion taught people to consume. Style should teach people to see.
                </p>
                <p className="text-brand-bone/80 text-base md:text-lg leading-relaxed font-normal">
                  This space is a rejection of disposable design, rushed trends, and algorithmic taste. Every fit here is styled slowly, worn deliberately, and archived with purpose.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-brand-bone/80 text-base md:text-lg leading-relaxed font-normal">
                Shadrack Baraka is a fashion influencer and stylist working against disposable fashion culture. His work focuses on curated fits, repeated wear, and expressive styling.
              </p>
              <p className="text-brand-bone/80 text-base md:text-lg leading-relaxed font-normal">
                This is fashion without urgency. Style without waste. Identity without trends.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 pt-16 border-t border-white/10">
            <div>
              <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-bone/60 mb-8 font-bold">Values: Rejection</h4>
              <ul className="space-y-6 text-[11px] tracking-[0.15em] text-brand-bone/80 uppercase font-medium">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-red-900/60 rounded-full" /> 
                  Not fast fashion
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-red-900/60 rounded-full" /> 
                  Not trend-chasing
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-red-900/60 rounded-full" /> 
                  Not overconsumption
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[11px] tracking-[0.3em] uppercase text-brand-bone/60 mb-8 font-bold">Values: Intention</h4>
              <ul className="space-y-6 text-[11px] tracking-[0.15em] text-brand-bone uppercase font-medium">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-brand-bone rounded-full" /> 
                  Intentional styling
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-brand-bone rounded-full" /> 
                  Rewearing with purpose
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-brand-bone rounded-full" /> 
                  Fashion as expression
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
