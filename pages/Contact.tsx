
import React, { useState } from 'react';
import { generateStyleResponse } from '../services/geminiService';
import { SiteSettings } from '../types';

const Contact: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const [msg, setMsg] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setLoading(true);
    const res = await generateStyleResponse(msg);
    setResponse(res);
    setLoading(false);
  };

  return (
    <section className="min-h-screen pt-36 md:pt-48 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
        <div className="lg:col-span-5">
          <div className="mb-8 inline-block w-fit px-4 py-1 bg-brand-bone text-brand-obsidian text-[10px] tracking-[0.4em] font-black uppercase italic">
            WASSUP GNG
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-serif italic mb-16 tracking-tighter">
            {settings.contactHeadline}
          </h2>
          
          <div className="space-y-16">
            <div>
              <h4 className="text-[12px] tracking-[0.5em] uppercase text-brand-bone/50 mb-6 font-black">THE LINE</h4>
              <a 
                href="mailto:studio@pixelpunk.art" 
                className="text-3xl md:text-5xl lg:text-6xl font-serif hover:italic hover:pl-6 transition-all duration-500 border-b-2 border-white/10 pb-2 block w-fit"
              >
                studio@pixelpunk.art
              </a>
              <p className="text-[11px] tracking-[0.3em] text-brand-bone/70 uppercase mt-6 font-black italic">
                Visionary brands only. No mid energy over here, on god.
              </p>
            </div>

            <div>
              <h4 className="text-[12px] tracking-[0.5em] uppercase text-brand-bone/50 mb-6 font-black">THE SOCIALS</h4>
              <div className="flex flex-col gap-8">
                {['Instagram', 'Twitter (X)', 'WhatsApp', 'Are.na'].map((platform) => (
                  <a 
                    key={platform}
                    href="#" 
                    className="text-sm md:text-lg tracking-[0.3em] uppercase text-brand-bone/70 hover:text-brand-bone hover:pl-6 transition-all duration-300 flex items-center gap-6 group font-black"
                  >
                    <span className="w-10 h-[1.5px] bg-white/10 group-hover:w-16 group-hover:bg-brand-bone transition-all" />
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-brand-charcoal border-2 border-white/[0.1] p-10 md:p-16 relative rounded-sm shadow-2xl">
          <div className="max-w-xl mx-auto">
            <header className="mb-10 border-b border-white/10 pb-10">
              <h3 className="text-3xl font-serif italic mb-4 tracking-tighter">THE STYLE CONSULT</h3>
              <p className="text-base md:text-lg text-brand-bone/70 leading-relaxed font-bold italic">
                {settings.contactDescription}
              </p>
            </header>
            
            <form onSubmit={handleInquiry} className="space-y-8">
              <div className="relative">
                <textarea 
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Ask for the heat twin..."
                  className="w-full bg-brand-obsidian/60 border-2 border-white/20 p-8 text-base md:text-lg focus:outline-none focus:border-brand-bone/60 transition-all min-h-[200px] resize-none font-bold tracking-tight placeholder:text-brand-bone/30 rounded-sm"
                />
              </div>
              
              <button 
                disabled={loading}
                className="w-full py-6 md:py-8 bg-brand-bone text-brand-obsidian hover:bg-white transition-all text-[14px] md:text-[16px] tracking-[0.5em] font-black uppercase disabled:opacity-50 flex items-center justify-center gap-6 rounded-sm shadow-lg shadow-white/5"
              >
                {loading ? 'Processing the Motion...' : 'COP THE VERDICT'}
              </button>
            </form>

            {response && (
              <div className="mt-16 pt-12 border-t border-white/20 fade-in">
                <span className="text-[11px] tracking-[0.4em] uppercase text-brand-bone/50 block mb-6 font-black italic">BARAKA'S VERDICT</span>
                <div className="bg-white/[0.05] p-10 border-l-4 border-brand-bone shadow-inner">
                  <p className="font-serif text-2xl md:text-4xl leading-tight italic text-brand-bone tracking-tight">
                    "{response}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
