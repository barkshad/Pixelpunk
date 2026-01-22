
import React, { useState, useRef, useEffect } from 'react';
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
  const [savingFits, setSavingFits] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [heroUploading, setHeroUploading] = useState(false);
  const [stagedFits, setStagedFits] = useState<StagedFit[]>([]);
  
  // Local state for settings to allow typing without lag
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroVideoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const [batchConfig, setBatchConfig] = useState({
    category: 'streetwear' as Fit['category'],
    section: 'gallery' as Fit['section'],
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

  const handleSettingsUpdate = (field: keyof SiteSettings, value: string) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveGlobalSettings = async () => {
    setSavingSettings(true);
    try {
      const settingsRef = doc(db, 'settings', 'global');
      await updateDoc(settingsRef, { ...localSettings });
      setSettings(localSettings);
      alert('VISION UPDATED TWIN. THE CODE IS ENFORCED.');
    } catch (err) {
      console.error(err);
      alert('FAILED TO UPDATE VISION. TRY AGAIN GNG.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleHeroVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHeroUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'real_unsigned');

      const res = await fetch(`https://api.cloudinary.com/v1_1/ds2mbrzcn/video/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        handleSettingsUpdate('heroVideoUrl', data.secure_url);
        await updateDoc(doc(db, 'settings', 'global'), { heroVideoUrl: data.secure_url });
        setSettings(prev => ({ ...prev, heroVideoUrl: data.secure_url }));
        alert('HERO VIDEO UPDATED TWIN. THE MOTION IS LETHAL.');
      }
    } catch (err) {
      console.error(err);
      alert('HERO VIDEO UPLOAD FAILED GNG.');
    } finally {
      setHeroUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedAssets: StagedFit[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isVideo = file.type.startsWith('video/');
        const resourceType = isVideo ? 'video' : 'image';
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'real_unsigned');

        const res = await fetch(`https://api.cloudinary.com/v1_1/ds2mbrzcn/${resourceType}/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        
        if (data.secure_url) {
          uploadedAssets.push({
            tempId: Math.random().toString(36).substr(2, 9),
            title: `STAMPED ${resourceType.toUpperCase()}`,
            imageUrl: isVideo ? data.thumbnail_url || data.secure_url.replace(/\.[^/.]+$/, ".jpg") : data.secure_url,
            videoUrl: isVideo ? data.secure_url : undefined,
            mediaType: isVideo ? 'video' : 'image',
            section: batchConfig.section,
            category: batchConfig.category,
            brands: batchConfig.brands.split(',').map(b => b.trim()).filter(b => b !== ''),
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

  const stampAllToVault = async () => {
    if (stagedFits.length === 0) return;
    setSavingFits(true);
    try {
      const addedFits: Fit[] = [];
      for (const staged of stagedFits) {
        const fitMetadata = {
          title: staged.title,
          description: staged.description,
          imageUrl: staged.imageUrl,
          videoUrl: staged.videoUrl || null,
          mediaType: staged.mediaType,
          section: staged.section,
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
      alert(`SUCCESS: ${addedFits.length} ASSETS STAMPED TO THE VAULT.`);
    } catch (err) {
      console.error(err);
      alert('FIRESTORE ERROR DURING BATCH STAMP.');
    } finally {
      setSavingFits(false);
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
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-obsidian border border-white/20 p-4 text-brand-bone focus:outline-none focus:border-brand-bone transition-all font-black tracking-widest"
              placeholder="PASSCODE"
            />
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
          <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Site Content CMS</h2>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[11px] tracking-[0.4em] font-black uppercase text-red-500 border-2 border-red-500/30 px-8 py-4 hover:bg-red-500 transition-all italic">Close Vault</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-20">
          <section className="bg-brand-charcoal/50 p-8 border border-white/5 rounded-sm">
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Drop New Grails</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black italic">Target Section</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setBatchConfig({...batchConfig, section: 'gallery'})}
                      className={`flex-1 py-3 text-[10px] tracking-[0.2em] uppercase font-black border transition-all ${batchConfig.section === 'gallery' ? 'bg-brand-bone text-brand-obsidian border-brand-bone' : 'border-white/10 text-brand-bone/40'}`}
                    >
                      Archive Gallery
                    </button>
                    <button 
                      onClick={() => setBatchConfig({...batchConfig, section: 'fit-check'})}
                      className={`flex-1 py-3 text-[10px] tracking-[0.2em] uppercase font-black border transition-all ${batchConfig.section === 'fit-check' ? 'bg-brand-bone text-brand-obsidian border-brand-bone' : 'border-white/10 text-brand-bone/40'}`}
                    >
                      Fit Checks
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black italic">Category</label>
                  <select 
                    value={batchConfig.category}
                    onChange={e => setBatchConfig({...batchConfig, category: e.target.value as any})}
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
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-2 font-black italic">Shared Description</label>
                  <textarea 
                    value={batchConfig.description}
                    onChange={e => setBatchConfig({...batchConfig, description: e.target.value})}
                    placeholder="Shared vibe..."
                    className="w-full bg-brand-obsidian border border-white/10 p-4 focus:border-brand-bone/50 outline-none h-[140px] resize-none font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <input type="file" accept="image/*,video/*" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-16 border-2 border-dashed border-white/20 hover:border-brand-bone transition-all text-[14px] tracking-[0.4em] uppercase font-black flex flex-col items-center gap-4 ${uploading ? 'animate-pulse' : ''}`}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {uploading ? 'PUSHING TO THE CLOUD...' : 'DROP PHOTOS & VIDEOS TWIN'}
              </button>

              {stagedFits.length > 0 && (
                <div className="space-y-8 p-6 bg-brand-obsidian border border-white/5">
                  <h4 className="text-[10px] tracking-[0.5em] uppercase font-black text-brand-bone/60">STAGING VAULT</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stagedFits.map(fit => (
                      <div key={fit.tempId} className="relative aspect-square bg-brand-charcoal overflow-hidden group">
                        <img src={fit.imageUrl} className="w-full h-full object-cover grayscale brightness-50" />
                        <button onClick={() => setStagedFits(prev => prev.filter(f => f.tempId !== fit.tempId))} className="absolute top-2 right-2 text-red-500 bg-black/60 p-1">X</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={stampAllToVault} disabled={savingFits} className="w-full py-6 bg-brand-bone text-brand-obsidian font-black tracking-[0.6em] uppercase hover:invert transition-all">
                    {savingFits ? 'STAMPING...' : `STAMP ${stagedFits.length} TO VAULT`}
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="bg-brand-charcoal/50 p-8 border border-white/5 rounded-sm">
             <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Global Site Copy</h3>
             <div className="space-y-12">
               {/* Home Section */}
               <div className="space-y-6">
                 <h4 className="text-[11px] tracking-[0.4em] font-black text-brand-bone/30 uppercase italic">Home Hero</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Main Headline</label>
                      <input type="text" value={localSettings.homeHeadline} onChange={e => handleSettingsUpdate('homeHeadline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Sub Headline</label>
                      <input type="text" value={localSettings.homeSubheadline} onChange={e => handleSettingsUpdate('homeSubheadline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Hero Description</label>
                    <textarea value={localSettings.homeDescription} onChange={e => handleSettingsUpdate('homeDescription', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[100px] resize-none" />
                 </div>
               </div>

               {/* About Section */}
               <div className="space-y-6 pt-10 border-t border-white/10">
                 <h4 className="text-[11px] tracking-[0.4em] font-black text-brand-bone/30 uppercase italic">About Page</h4>
                 <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Main Manifesto (Large Text)</label>
                    <textarea value={localSettings.aboutManifesto} onChange={e => handleSettingsUpdate('aboutManifesto', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[120px] resize-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Style Quote</label>
                    <input type="text" value={localSettings.aboutQuote} onChange={e => handleSettingsUpdate('aboutQuote', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Body Text Column 1</label>
                      <textarea value={localSettings.aboutBody1} onChange={e => handleSettingsUpdate('aboutBody1', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[150px] resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Body Text Column 2</label>
                      <textarea value={localSettings.aboutBody2} onChange={e => handleSettingsUpdate('aboutBody2', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[150px] resize-none" />
                    </div>
                 </div>
               </div>

               {/* Contact Section */}
               <div className="space-y-6 pt-10 border-t border-white/10">
                 <h4 className="text-[11px] tracking-[0.4em] font-black text-brand-bone/30 uppercase italic">Contact Page</h4>
                 <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Headline</label>
                    <input type="text" value={localSettings.contactHeadline} onChange={e => handleSettingsUpdate('contactHeadline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">AI System Description</label>
                    <textarea value={localSettings.contactDescription} onChange={e => handleSettingsUpdate('contactDescription', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[100px] resize-none" />
                 </div>
               </div>

               {/* Footer Section */}
               <div className="space-y-6 pt-10 border-t border-white/10">
                 <h4 className="text-[11px] tracking-[0.4em] font-black text-brand-bone/30 uppercase italic">Footer</h4>
                 <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black">Footer Tagline</label>
                    <input type="text" value={localSettings.footerTagline} onChange={e => handleSettingsUpdate('footerTagline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none" />
                 </div>
               </div>

               <button 
                onClick={saveGlobalSettings} 
                disabled={savingSettings}
                className="w-full py-8 bg-brand-bone text-brand-obsidian font-black tracking-[0.5em] uppercase hover:invert transition-all mt-10"
               >
                 {savingSettings ? 'SYNCING TO VAULT...' : 'ENFORCE VISION (SAVE ALL)'}
               </button>
             </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-12">
          <div className="sticky top-40 space-y-12">
            <div className="p-10 bg-brand-bone/5 border border-white/10 rounded-sm">
              <h3 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">Hero Visuals</h3>
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Hero Background Video</label>
                  <div className="space-y-4">
                    <input type="file" accept="video/*" ref={heroVideoRef} onChange={handleHeroVideoUpload} className="hidden" />
                    <button 
                      onClick={() => heroVideoRef.current?.click()}
                      className={`w-full py-6 border border-brand-bone/40 hover:border-brand-bone text-[10px] tracking-[0.3em] uppercase font-black transition-all ${heroUploading ? 'animate-pulse' : ''}`}
                    >
                      {heroUploading ? 'UPGRADING VISION...' : 'UPDATE HERO VIDEO'}
                    </button>
                    {localSettings.heroVideoUrl && (
                      <div className="aspect-video bg-black/40 rounded-sm overflow-hidden border border-white/10">
                         <video src={localSettings.heroVideoUrl} muted autoPlay loop className="w-full h-full object-cover grayscale opacity-50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 bg-brand-bone/5 border border-white/10 rounded-sm">
              <h3 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">Vault Maintenance</h3>
              <div className="max-h-[500px] overflow-y-auto no-scrollbar space-y-4">
                {fits.map(fit => (
                  <div key={fit.id} className="flex items-center gap-4 bg-brand-obsidian/40 p-3 border border-white/5 group">
                    <img src={fit.imageUrl} className="w-12 h-12 object-cover grayscale" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase text-brand-bone truncate italic">{fit.title}</p>
                      <p className="text-[8px] text-brand-bone/40 uppercase tracking-widest">{fit.category} • {fit.section}</p>
                    </div>
                    <button onClick={() => {
                      if(confirm('DELETE THIS BRICK?')) {
                        deleteDoc(doc(db, 'fits', fit.id));
                        setFits(prev => prev.filter(f => f.id !== fit.id));
                      }
                    }} className="opacity-0 group-hover:opacity-100 text-red-500 transition-all">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
