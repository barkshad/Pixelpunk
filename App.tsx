
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

      <footer className="py-32 px-8 md:px-16 border-t border-white/[0.08] bg-brand-obsidian">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
          <div className="flex flex-col gap-6">
            <h4 className="text-3xl font-serif tracking-tighter italic">_pixelpunk</h4>
            <div className="space-y-4">
              <p className="text-[14px] tracking-[0.5em] text-brand-bone uppercase font-black italic border-b border-brand-bone/20 pb-2 w-fit">
                FUCK FAST FASHION TWIN.
              </p>
              <p className="text-[10px] tracking-[0.5em] text-brand-bone/30 uppercase font-black">
                ©2024 REAL MOTION ONLY • STAMPED BY BARAKA • ON GOD
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-8">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.4em] text-brand-bone/40 uppercase font-black">NAV</span>
              <button onClick={() => setView('fits')} className="text-[11px] tracking-[0.3em] text-brand-bone/70 hover:text-brand-bone text-left uppercase font-bold">THE ROTATION</button>
              <button onClick={() => setView('about')} className="text-[11px] tracking-[0.3em] text-brand-bone/70 hover:text-brand-bone text-left uppercase font-bold">THE CODE</button>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.4em] text-brand-bone/40 uppercase font-black">SOCIALS</span>
              <a href="#" className="text-[11px] tracking-[0.3em] text-brand-bone/70 hover:text-brand-bone uppercase font-bold">INSTA</a>
              <a href="#" className="text-[11px] tracking-[0.3em] text-brand-bone/70 hover:text-brand-bone uppercase font-bold">TWITTER (X)</a>
            </div>
            <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
              <span className="text-[10px] tracking-[0.4em] text-brand-bone/40 uppercase font-black">MISC</span>
              <a href="#" className="text-[11px] tracking-[0.3em] text-brand-bone/70 hover:text-brand-bone uppercase font-bold">PRIVACY</a>
              <a href="#" className="text-[11px] tracking-[0.3em] text-brand-bone/70 hover:text-brand-bone uppercase font-bold">TERMS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
