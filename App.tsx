
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Fits from './pages/Fits';
import About from './pages/About';
import Contact from './pages/Contact';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home': return <Home setView={setView} />;
      case 'fits': return <Fits />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-obsidian text-brand-bone selection:bg-brand-bone selection:text-brand-obsidian antialiased overflow-x-hidden">
      <Navbar currentView={view} setView={setView} />
      
      <main key={view} className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
        {renderView()}
      </main>

      <footer className="py-24 px-8 md:px-16 border-t border-white/[0.04] bg-brand-obsidian">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-serif tracking-tighter">_pixelpunk</h4>
            <div className="space-y-2">
              <p className="text-[12px] tracking-[0.4em] text-brand-bone uppercase font-bold italic">
                Fuck fast fashion. Long live style.
              </p>
              <p className="text-[9px] tracking-[0.4em] text-brand-bone/20 uppercase font-bold">
                ©2024 ARCHIVE RECORD • VOL 01-SHB
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-4">
            <div className="flex flex-col gap-4">
              <span className="text-[9px] tracking-[0.3em] text-brand-bone/30 uppercase font-bold">Navigation</span>
              <button onClick={() => setView('fits')} className="text-[10px] tracking-[0.2em] text-brand-bone/60 hover:text-brand-bone text-left uppercase">The Archive</button>
              <button onClick={() => setView('about')} className="text-[10px] tracking-[0.2em] text-brand-bone/60 hover:text-brand-bone text-left uppercase">Style Theory</button>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[9px] tracking-[0.3em] text-brand-bone/30 uppercase font-bold">Social</span>
              <a href="#" className="text-[10px] tracking-[0.2em] text-brand-bone/60 hover:text-brand-bone uppercase">Instagram</a>
              <a href="#" className="text-[10px] tracking-[0.2em] text-brand-bone/60 hover:text-brand-bone uppercase">Twitter (X)</a>
            </div>
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <span className="text-[9px] tracking-[0.3em] text-brand-bone/30 uppercase font-bold">Legal</span>
              <a href="#" className="text-[10px] tracking-[0.2em] text-brand-bone/60 hover:text-brand-bone uppercase">Privacy Protocol</a>
              <a href="#" className="text-[10px] tracking-[0.2em] text-brand-bone/60 hover:text-brand-bone uppercase">Terms of Access</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
