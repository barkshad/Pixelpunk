
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
          <h2 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-16 tracking-tight">
            Curating the <span className="italic">unspoken</span> language of <span className="italic border-b border-brand-bone/30">proportion</span>.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-10">
              <p className="text-brand-bone/70 text-lg leading-relaxed font-light">
                Shadrack Baraka, recognized digitally as <span className="text-brand-bone font-medium">_pixelpunk</span>, operates at the intersection of architectural form and modern streetwear. His methodology is rooted in the "reductive process"—eliminating the superfluous to amplify the essential silhouette.
              </p>
              <p className="text-brand-bone/70 text-lg leading-relaxed font-light">
                Based between Nairobi and London, Baraka's styling work explores the narrative potential of technical fabrics and archival garments, prioritizing texture over trend.
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="border-t border-white/10 pt-8">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 mb-6 font-bold">Expertise</h4>
                <ul className="space-y-4 text-sm tracking-wide text-brand-bone/60">
                  <li className="flex justify-between border-b border-white/[0.03] pb-2"><span>Editorial Styling</span> <span>01</span></li>
                  <li className="flex justify-between border-b border-white/[0.03] pb-2"><span>Creative Direction</span> <span>02</span></li>
                  <li className="flex justify-between border-b border-white/[0.03] pb-2"><span>Archive Consulting</span> <span>03</span></li>
                  <li className="flex justify-between border-b border-white/[0.03] pb-2"><span>Silhouette Theory</span> <span>04</span></li>
                </ul>
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 mb-6 font-bold">Philosophy</h4>
                <p className="italic font-serif text-2xl text-brand-bone/90 leading-snug">
                  "Fashion is a three-dimensional dialogue between the garment and the void."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
