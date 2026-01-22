
import React, { useState, useRef } from 'react';
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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'real_unsigned');

    try {
      // Cloudinary upload logic as per Master Instructions
      const res = await fetch('https://api.cloudinary.com/v1_1/ds2mbrzcn/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setNewFit(prev => ({ ...prev, imageUrl: data.secure_url }));
        alert('IMAGE UPLOADED TO THE CLOUD, ON GOD.');
      }
    } catch (err) {
      console.error(err);
      alert('UPLOAD FAILED GNG. TRY AGAIN.');
    } finally {
      setUploading(false);
    }
  };

  const deleteFit = (id: string) => {
    if (confirm('DELETE THIS BRICK FROM THE ARCHIVE? NO CAP?')) {
      setFits(prev => prev.filter(f => f.id !== id));
    }
  };

  const addFit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFit.imageUrl) return alert('UPLOAD SOME HEAT FIRST TWIN.');
    
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
          <div className="mb-8 flex justify-center">
             <div className="px-4 py-1 bg-brand-bone text-brand-obsidian text-[10px] tracking-[0.4em] font-black uppercase italic">
                ADMIN VAULT
             </div>
          </div>
          <h2 className="text-3xl font-serif italic mb-8 tracking-tighter text-center">Wassup Gng. Tap In.</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] tracking-[0.4em] uppercase text-brand-bone/50 block mb-3 font-black">THE PASSCODE</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-obsidian border border-white/20 p-4 text-brand-bone focus:outline-none focus:border-brand-bone transition-all font-black tracking-widest"
                placeholder="•••••"
              />
            </div>
            {error && <p className="text-red-500 text-[10px] tracking-widest font-black uppercase text-center animate-pulse">{error}</p>}
            <button className="w-full py-4 bg-brand-bone text-brand-obsidian font-black tracking-[0.3em] uppercase hover:bg-white transition-all shadow-lg shadow-white/5">
              UNLOCK THE MOTION
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto fade-in">
      <header className="mb-20 border-b-2 border-white/10 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="text-[12px] tracking-[0.5em] text-brand-bone/50 uppercase block mb-4 font-black">SYSTEM STATUS: FULL MOTION</span>
          <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Advanced CMS</h2>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-[11px] tracking-[0.4em] font-black uppercase text-red-500 border-2 border-red-500/30 px-8 py-4 hover:bg-red-500 hover:text-white transition-all italic"
        >
          Close the Vault
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Fit Management */}
        <div className="lg:col-span-8 space-y-20">
          <section className="bg-brand-charcoal/50 p-8 border border-white/5 rounded-sm">
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Upload New Heat</h3>
            <form onSubmit={addFit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Grail Title</label>
                  <input 
                    type="text" 
                    required
                    value={newFit.title}
                    onChange={e => setNewFit({...newFit, title: e.target.value})}
                    placeholder="E.g. Void Motion V2"
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Media Asset</label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full py-4 border-2 border-dashed border-white/20 hover:border-brand-bone transition-all text-[11px] tracking-[0.2em] uppercase font-black ${uploading ? 'animate-pulse text-brand-bone/50' : ''}`}
                    >
                      {uploading ? 'UPLOADING TO CLOUDINARY...' : newFit.imageUrl ? 'SWAP THE PHOTO' : 'SELECT PHOTO GNG'}
                    </button>
                    {newFit.imageUrl && (
                      <div className="aspect-square bg-brand-obsidian border border-white/10 overflow-hidden relative group">
                        <img src={newFit.imageUrl} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] tracking-widest font-black uppercase italic">Previewing the Heat</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Category</label>
                  <select 
                    value={newFit.category}
                    onChange={e => setNewFit({...newFit, category: e.target.value as any})}
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none uppercase tracking-widest text-xs font-bold"
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
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none font-bold"
                    placeholder="Rick Owens, Nike, Chrome Hearts"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Description (Keep it real)</label>
                  <textarea 
                    required
                    value={newFit.description}
                    onChange={e => setNewFit({...newFit, description: e.target.value})}
                    placeholder="Tell 'em why it's a grail twin..."
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none min-h-[160px] resize-none font-bold"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <button className="w-full py-8 bg-brand-bone text-brand-obsidian font-black tracking-[0.6em] uppercase hover:invert transition-all shadow-xl shadow-brand-bone/5 italic">
                  Drop to the Streets
                </button>
              </div>
            </form>
          </section>

          <section>
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Wipe the Bricks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {fits.map(fit => (
                <div key={fit.id} className="relative aspect-[4/5] bg-brand-charcoal border border-white/5 group overflow-hidden rounded-sm">
                  <img src={fit.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h4 className="font-serif italic text-lg leading-tight mb-1">{fit.title}</h4>
                    <p className="text-[8px] tracking-widest text-brand-bone/40 uppercase font-black mb-3 italic">{fit.category}</p>
                    <button 
                      onClick={() => deleteFit(fit.id)}
                      className="text-[9px] tracking-[0.3em] font-black uppercase text-red-500 bg-black/40 px-3 py-2 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all w-full"
                    >
                      Delete Piece
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Site Text Settings */}
        <div className="lg:col-span-4 space-y-12">
          <div className="sticky top-40 p-10 bg-brand-bone/5 border-2 border-white/10 rounded-sm">
            <h3 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">The Vision Manager</h3>
            <div className="space-y-10">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Home Page Slogan</label>
                <input 
                  type="text"
                  value={settings.homeHeadline}
                  onChange={e => updateSetting('homeHeadline', e.target.value)}
                  className="w-full bg-brand-obsidian/40 border-b border-white/10 p-4 focus:border-brand-bone/50 outline-none text-sm font-black italic"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Manifesto Drop</label>
                <textarea 
                  value={settings.aboutManifesto}
                  onChange={e => updateSetting('aboutManifesto', e.target.value)}
                  className="w-full bg-brand-obsidian/40 border-b border-white/10 p-4 focus:border-brand-bone/50 outline-none text-sm font-black min-h-[140px] resize-none leading-relaxed"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Footer Punchline</label>
                <input 
                  type="text"
                  value={settings.footerTagline}
                  onChange={e => updateSetting('footerTagline', e.target.value)}
                  className="w-full bg-brand-obsidian/40 border-b border-white/10 p-4 focus:border-brand-bone/50 outline-none text-sm font-black italic"
                />
              </div>
              <div className="pt-8 text-center">
                 <div className="px-4 py-3 bg-white/5 border border-white/10 inline-block">
                    <p className="text-[9px] tracking-widest text-brand-bone/60 uppercase font-black">
                      STAY SELECTIVE TWIN. ALWAYS.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
