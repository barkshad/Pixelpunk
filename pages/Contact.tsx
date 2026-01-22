
import React, { useState } from 'react';
import { generateStyleResponse } from '../services/geminiService';

const Contact: React.FC = () => {
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
    <section className="min-h-screen pt-48 pb-32 px-8 md:px-16 max-w-[1600px] mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5">
          <h2 className="text-7xl md:text-9xl font-serif italic mb-20 tracking-tighter">Inquiries</h2>
          
          <div className="space-y-20">
            <div>
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-brand-bone/30 mb-8 font-bold">Direct Correspondence</h4>
              <a 
                href="mailto:inquire@pixelpunk.art" 
                className="text-3xl md:text-5xl font-serif hover:italic hover:pl-4 transition-all duration-500 border-b border-white/10 pb-2 block w-fit"
              >
                studio@pixelpunk.art
              </a>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.4em] uppercase text-brand-bone/30 mb-8 font-bold">Digital Presence</h4>
              <div className="flex flex-col gap-6">
                {['Instagram', 'Twitter (X)', 'WhatsApp Business', 'Are.na'].map((platform) => (
                  <a 
                    key={platform}
                    href="#" 
                    className="text-sm tracking-[0.2em] uppercase text-brand-bone/60 hover:text-brand-bone hover:pl-4 transition-all duration-300 flex items-center gap-4 group"
                  >
                    <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 transition-all" />
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Inquiry Module */}
        <div className="lg:col-span-7 bg-brand-charcoal border border-white/[0.05] p-12 md:p-16 relative">
          <div className="max-w-xl mx-auto">
            <header className="mb-12 border-b border-white/5 pb-8">
              <h3 className="text-2xl font-serif italic mb-4 tracking-tight">Style Consultation System</h3>
              <p className="text-sm text-brand-bone/40 leading-relaxed font-light">
                Utilize the _pixelpunk archival database to receive immediate stylistic analysis for specific garments or conceptual silhouettes.
              </p>
            </header>
            
            <form onSubmit={handleInquiry} className="space-y-8">
              <div className="relative">
                <textarea 
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Inquire about silhouette, brand pairings, or archival theory..."
                  className="w-full bg-brand-obsidian/50 border border-white/10 p-6 text-sm focus:outline-none focus:border-brand-bone/30 transition-all min-h-[160px] resize-none font-light tracking-wide placeholder:text-brand-bone/20"
                />
              </div>
              
              <button 
                disabled={loading}
                className="w-full py-6 bg-brand-bone text-brand-obsidian hover:bg-white transition-all text-[11px] tracking-[0.4em] font-black uppercase disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {loading ? (
                  <>
                    <div className="w-1.5 h-1.5 bg-brand-obsidian rounded-full animate-ping" />
                    ANALYZING DATA
                  </>
                ) : 'SUBMIT INQUIRY'}
              </button>
            </form>

            {response && (
              <div className="mt-16 pt-12 border-t border-white/10 fade-in">
                <span className="text-[9px] tracking-[0.3em] uppercase text-brand-bone/30 block mb-6 font-bold">System Output</span>
                <div className="bg-white/[0.02] p-8 border-l border-white/10">
                  <p className="font-serif text-2xl lg:text-3xl leading-snug italic text-brand-bone/90">
                    "{response}"
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-8 right-8">
            <span className="text-[8px] tracking-[0.4em] text-brand-bone/10 uppercase font-bold">SECURE CHANNEL ALPHA-9</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
