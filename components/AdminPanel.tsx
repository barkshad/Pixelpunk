
import React, { useState, useRef } from 'react';
import { Fit, SiteSettings } from '../types';
import { db } from '../services/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface AdminPanelProps {
  fits: Fit[];
  setFits: React.Dispatch<React.SetStateAction<Fit[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

interface StagedFit extends Partial<Fit> {
  tempId: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ fits, setFits, settings, setSettings }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stagedFits, setStagedFits] = useState<StagedFit[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default config for new fits
  const [batchConfig, setBatchConfig] = useState({
    category: 'streetwear' as Fit['category'],
    brands: '',
    description: 'Archive piece for the rotation. Real motion only.'
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

  const getAutoName = (category: string, index: number) => {
    const prefixes: Record<string, string> = {
      streetwear: 'STREET',
      'avant-garde': 'ARCHIVE',
      tailoring: 'SHARP',
      minimal: 'VOID'
    };
    const prefix = prefixes[category] || 'PIECE';
    const num = 101 + index + Math.floor(Math.random() * 5);
    return `${prefix} ${num}`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedAssets: StagedFit[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'real_unsigned');

        const res = await fetch('https://api.cloudinary.com/v1_1/ds2mbrzcn/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        
        if (data.secure_url) {
          const autoName = getAutoName(batchConfig.category, stagedFits.length + uploadedAssets.length);
          uploadedAssets.push({
            tempId: Math.random().toString(36).substr(2, 9),
            title: autoName,
            imageUrl: data.secure_url,
            category: batchConfig.category,
            brands: batchConfig.brands.split(',').map(b => b.trim()),
            description: batchConfig.description,
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
          });
        }
      }
      setStagedFits(prev => [...prev, ...uploadedAssets]);
    } catch (err) {
      console.error(err);
      alert('BATCH UPLOAD FAILED GNG.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeStaged = (tempId: string) => {
    setStagedFits(prev => prev.filter(f => f.tempId !== tempId));
  };

  const stampAllToVault = async () => {
    if (stagedFits.length === 0) return;
    setSaving(true);
    try {
      const addedFits: Fit[] = [];
      for (const staged of stagedFits) {
        const fitMetadata = {
          title: staged.title,
          description: staged.description,
          imageUrl: staged.imageUrl,
          category: staged.category,
          brands: staged.brands,
          date: staged.date,
          createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, 'fits'), fitMetadata);
        addedFits.push({ ...fitMetadata, id: docRef.id } as Fit);
      }
      setFits(prev => [...addedFits, ...prev]);
      setStagedFits([]);
      alert(`SUCCESS: ${addedFits.length} GRAILS STAMPED TO THE VAULT.`);
    } catch (err) {
      console.error(err);
      alert('FIRESTORE ERROR DURING BATCH STAMP.');
    } finally {
      setSaving(false);
    }
  };

  const deleteFit = async (id: string) => {
    if (confirm('DELETE THIS BRICK FROM THE ARCHIVE? NO CAP?')) {
      try {
        await deleteDoc(doc(db, 'fits', id));
        setFits(prev => prev.filter(f => f.id !== id));
      } catch (err) {
        alert('COULD NOT WIPE THE MOTION.');
      }
    }
  };

  const updateSetting = async (key: keyof SiteSettings, value: string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    try {
      const settingsRef = doc(db, 'settings', 'global');
      await updateDoc(settingsRef, { [key]: value });
    } catch (err) {
      console.error('Settings update failed:', err);
    }
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
          <span className="text-[12px] tracking-[0.5em] text-brand-bone/50 uppercase block mb-4 font-black">SYSTEM STATUS: BATCH MOTION ACTIVE</span>
          <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Advanced CMS</h2>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-[11px] tracking-[0.4em] font-black uppercase text-red-500 border-2 border-red-500/30 px-8 py-4 hover:bg-red-500 hover:text-white transition-all italic"
        >
          Close Vault
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <section className="bg-brand-charcoal/50 p-8 border border-white/5 rounded-sm">
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Drop Batch Heat</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Batch Category</label>
                  <select 
                    value={batchConfig.category}
                    onChange={e => setBatchConfig({...batchConfig, category: e.target.value as any})}
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none uppercase tracking-widest text-xs font-bold"
                  >
                    <option value="streetwear">Streetwear (STREET 10X)</option>
                    <option value="avant-garde">Avant-Garde (ARCHIVE 10X)</option>
                    <option value="tailoring">Tailoring (SHARP 10X)</option>
                    <option value="minimal">Minimal (VOID 10X)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Shared Brands</label>
                  <input 
                    type="text" 
                    value={batchConfig.brands}
                    onChange={e => setBatchConfig({...batchConfig, brands: e.target.value})}
                    placeholder="Rick Owens, Nike, LV"
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black">Shared Description</label>
                <textarea 
                  value={batchConfig.description}
                  onChange={e => setBatchConfig({...batchConfig, description: e.target.value})}
                  placeholder="The vibe for this drop..."
                  className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none h-full min-h-[148px] resize-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full py-12 border-2 border-dashed border-white/20 hover:border-brand-bone transition-all text-[14px] tracking-[0.4em] uppercase font-black flex flex-col items-center gap-4 ${uploading ? 'animate-pulse' : ''}`}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 4V16M12 4L8 8M12 4L16 8M4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {uploading ? 'PUSHING TO CLOUDINARY...' : 'SELECT MULTIPLE PHOTOS GNG'}
                </button>
              </div>

              {stagedFits.length > 0 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <h4 className="text-[10px] tracking-[0.5em] uppercase font-black text-brand-bone/60">STAGING VAULT ({stagedFits.length})</h4>
                    <button onClick={() => setStagedFits([])} className="text-[9px] tracking-[0.3em] uppercase font-black text-red-500 hover:underline">Clear All</button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {stagedFits.map(fit => (
                      <div key={fit.tempId} className="relative aspect-square bg-brand-obsidian border border-white/10 group overflow-hidden">
                        <img src={fit.imageUrl} className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 transition-all" />
                        <div className="absolute inset-0 p-3 flex flex-col justify-between">
                          <button onClick={() => removeStaged(fit.tempId!)} className="self-end text-red-500 bg-black/60 p-1 hover:bg-red-500 hover:text-white transition-all">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                          <p className="text-[9px] tracking-widest font-black uppercase text-brand-bone truncate bg-black/60 p-1">{fit.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={stampAllToVault}
                    disabled={saving}
                    className="w-full py-8 bg-brand-bone text-brand-obsidian font-black tracking-[0.6em] uppercase hover:invert transition-all shadow-xl shadow-brand-bone/5 italic disabled:opacity-50"
                  >
                    {saving ? 'STAMPING TO FIRESTORE...' : `STAMP ${stagedFits.length} GRAILS TO VAULT`}
                  </button>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Rotation Archive</h3>
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

        <div className="lg:col-span-4 space-y-12">
          <div className="sticky top-40 p-10 bg-brand-bone/5 border-2 border-white/10 rounded-sm">
            <h3 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">Vision Manager</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
