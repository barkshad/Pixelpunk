
import React, { useState } from 'react';
import { Fit, SiteSettings } from '../types';

interface AdminPanelProps {
  fits: Fit[];
  setFits: React.Dispatch<React.SetStateAction<Fit[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ fits, setFits, settings, setSettings }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form states for adding/editing a fit
  const [newFit, setNewFit] = useState<Partial<Fit>>({
    title: '',
    category: 'streetwear',
    brands: [],
    description: '',
    imageUrl: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('WRONG CODE GNG. TAP IN PROPERLY.');
    }
  };

  const deleteFit = (id: string) => {
    if (confirm('DELETE THIS BRICK FROM THE ARCHIVE? NO CAP?')) {
      setFits(prev => prev.filter(f => f.id !== id));
    }
  };

  const addFit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const brandsArray = typeof newFit.brands === 'string' 
      ? (newFit.brands as string).split(',').map(b => b.trim()) 
      : newFit.brands;

    const fitToAdd = { ...newFit, id, brands: brandsArray } as Fit;
    setFits(prev => [fitToAdd, ...prev]);
    setNewFit({ title: '', category: 'streetwear', brands: [], description: '', imageUrl: '', date: newFit.date });
    alert('NEW GRAIL ADDED TO THE ROTATION TWIN.');
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-obsidian p-6">
        <div className="w-full max-w-md bg-brand-charcoal border border-white/10 p-10 rounded-sm shadow-2xl fade-in">
          <h2 className="text-3xl font-serif italic mb-8 tracking-tighter text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] tracking-[0.4em] uppercase text-brand-bone/50 block mb-3 font-black">Enter Passcode</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-obsidian border border-white/20 p-4 text-brand-bone focus:outline-none focus:border-brand-bone transition-all"
                placeholder="•••••"
              />
            </div>
            {error && <p className="text-red-500 text-[10px] tracking-widest font-black uppercase text-center">{error}</p>}
            <button className="w-full py-4 bg-brand-bone text-brand-obsidian font-black tracking-[0.3em] uppercase hover:bg-white transition-all">
              UNLOCK VAULT
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto fade-in">
      <header className="mb-20 border-b border-white/10 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-[12px] tracking-[0.5em] text-brand-bone/50 uppercase block mb-4 font-black">SYSTEM STATUS: ACTIVE</span>
          <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Advanced CMS</h2>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-[11px] tracking-[0.4em] font-black uppercase text-red-500 border border-red-500/30 px-6 py-3 hover:bg-red-500 hover:text-white transition-all"
        >
          Lock Vault
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Fit Management */}
        <div className="lg:col-span-8 space-y-20">
          <section>
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4">Add New Grail</h3>
            <form onSubmit={addFit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Fit Title</label>
                  <input 
                    type="text" 
                    required
                    value={newFit.title}
                    onChange={e => setNewFit({...newFit, title: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 p-4 focus:border-brand-bone/50 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Image URL</label>
                  <input 
                    type="text" 
                    required
                    value={newFit.imageUrl}
                    onChange={e => setNewFit({...newFit, imageUrl: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 p-4 focus:border-brand-bone/50 outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Category</label>
                  <select 
                    value={newFit.category}
                    onChange={e => setNewFit({...newFit, category: e.target.value as any})}
                    className="w-full bg-brand-charcoal border border-white/10 p-4 focus:border-brand-bone/50 outline-none uppercase tracking-widest text-xs font-bold"
                  >
                    <option value="streetwear">Streetwear</option>
                    <option value="avant-garde">Avant-Garde</option>
                    <option value="tailoring">Tailoring</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Brands (Comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(newFit.brands) ? newFit.brands.join(', ') : newFit.brands}
                    onChange={e => setNewFit({...newFit, brands: e.target.value as any})}
                    className="w-full bg-brand-charcoal border border-white/10 p-4 focus:border-brand-bone/50 outline-none"
                    placeholder="Rick Owens, Nike, LV"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Description (Keep it lit)</label>
                  <textarea 
                    required
                    value={newFit.description}
                    onChange={e => setNewFit({...newFit, description: e.target.value})}
                    className="w-full bg-brand-charcoal border border-white/10 p-4 focus:border-brand-bone/50 outline-none min-h-[114px] resize-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <button className="w-full py-6 bg-brand-bone text-brand-obsidian font-black tracking-[0.4em] uppercase hover:invert transition-all">
                  Publish to Archive
                </button>
              </div>
            </form>
          </section>

          <section>
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4">Manage Rotation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fits.map(fit => (
                <div key={fit.id} className="flex gap-6 p-4 bg-brand-charcoal border border-white/5 group">
                  <div className="w-24 h-24 flex-shrink-0 bg-brand-obsidian overflow-hidden">
                    <img src={fit.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-serif italic text-lg leading-tight mb-1">{fit.title}</h4>
                    <p className="text-[9px] tracking-widest text-brand-bone/40 uppercase font-black mb-3">{fit.category}</p>
                    <button 
                      onClick={() => deleteFit(fit.id)}
                      className="text-[9px] tracking-[0.3em] font-black uppercase text-red-500/60 hover:text-red-500 transition-colors"
                    >
                      Delete Fit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Site Text Settings */}
        <div className="lg:col-span-4 space-y-12">
          <div className="sticky top-40 p-10 bg-brand-bone/5 border border-white/10">
            <h3 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4">Copy Manager</h3>
            <div className="space-y-10">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black">Home Page Headline</label>
                <input 
                  type="text"
                  value={settings.homeHeadline}
                  onChange={e => updateSetting('homeHeadline', e.target.value)}
                  className="w-full bg-brand-obsidian/40 border border-white/10 p-4 focus:border-brand-bone/50 outline-none text-sm font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black">Manifesto Quote</label>
                <textarea 
                  value={settings.aboutManifesto}
                  onChange={e => updateSetting('aboutManifesto', e.target.value)}
                  className="w-full bg-brand-obsidian/40 border border-white/10 p-4 focus:border-brand-bone/50 outline-none text-sm font-bold min-h-[120px] resize-none"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black">Footer Slogan</label>
                <input 
                  type="text"
                  value={settings.footerTagline}
                  onChange={e => updateSetting('footerTagline', e.target.value)}
                  className="w-full bg-brand-obsidian/40 border border-white/10 p-4 focus:border-brand-bone/50 outline-none text-sm font-bold italic"
                />
              </div>
              <p className="text-[9px] tracking-widest text-brand-bone/30 uppercase font-black text-center pt-4">
                "Real motion stays saved, twin."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
