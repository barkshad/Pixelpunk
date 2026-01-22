
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

  const getAutoName = (category: string, isVideo: boolean, index: number) => {
    const prefixes: Record<string, string> = {
      streetwear: 'STREET',
      'avant-garde': 'ARCHIVE',
      tailoring: 'SHARP',
      minimal: 'VOID'
    };
    const prefix = prefixes[category] || 'PIECE';
    const mediaSuffix = isVideo ? 'CLIP' : 'GRAIL';
    const num = 101 + index + Math.floor(Math.random() * 10);
    return `${prefix} ${mediaSuffix} ${num}`;
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
          const autoName = getAutoName(batchConfig.category, isVideo, stagedFits.length + uploadedAssets.length);
          uploadedAssets.push({
            tempId: Math.random().toString(36).substr(2, 9),
            title: autoName,
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
    setSaving(true);
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
      setSaving(false);
    }
  };

  const deleteFit = async (id: string) => {
    if (confirm('DELETE THIS BRICK? NO CAP?')) {
      try {
        await deleteDoc(doc(db, 'fits', id));
        setFits(prev => prev.filter(f => f.id !== id));
      } catch (err) {
        alert('COULD NOT WIPE THE MOTION.');
      }
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
          <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Advanced CMS</h2>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-[11px] tracking-[0.4em] font-black uppercase text-red-500 border-2 border-red-500/30 px-8 py-4 hover:bg-red-500 transition-all italic">Close Vault</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <section className="bg-brand-charcoal/50 p-8 border border-white/5 rounded-sm">
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Drop Batch Assets</h3>
            
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
                {uploading ? 'PUSHING TO CLOUDINARY...' : 'DROP PHOTOS & VIDEOS TWIN'}
              </button>

              {stagedFits.length > 0 && (
                <div className="space-y-8 p-6 bg-brand-obsidian border border-white/5">
                  <h4 className="text-[10px] tracking-[0.5em] uppercase font-black text-brand-bone/60">STAGING VAULT</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stagedFits.map(fit => (
                      <div key={fit.tempId} className="relative aspect-square bg-brand-charcoal overflow-hidden group">
                        <img src={fit.imageUrl} className="w-full h-full object-cover grayscale brightness-50" />
                        {fit.mediaType === 'video' && (
                          <div className="absolute top-2 left-2 bg-brand-bone text-brand-obsidian p-1 rounded-sm">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        )}
                        <button onClick={() => setStagedFits(prev => prev.filter(f => f.tempId !== fit.tempId))} className="absolute top-2 right-2 text-red-500 bg-black/60 p-1">X</button>
                        <p className="absolute bottom-1 left-1 text-[8px] font-black uppercase text-brand-bone bg-black/60 px-1 truncate w-[90%]">{fit.title}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={stampAllToVault} disabled={saving} className="w-full py-6 bg-brand-bone text-brand-obsidian font-black tracking-[0.6em] uppercase hover:invert transition-all">
                    {saving ? 'STAMPING...' : `STAMP ${stagedFits.length} ASSETS`}
                  </button>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Current Archive</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fits.map(fit => (
                <div key={fit.id} className="relative aspect-[4/5] bg-brand-charcoal border border-white/5 group overflow-hidden">
                  <img src={fit.imageUrl} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <h4 className="font-serif italic text-sm">{fit.title}</h4>
                    <p className="text-[8px] tracking-widest text-brand-bone/50 uppercase mb-2">{fit.section}</p>
                    <button onClick={() => deleteFit(fit.id)} className="text-[9px] font-black text-red-500 bg-black/60 py-1 border border-red-500/20">Wipe Piece</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-12">
          <div className="sticky top-40 p-10 bg-brand-bone/5 border border-white/10">
            <h3 className="text-2xl font-serif italic mb-8 border-b border-white/10 pb-4 uppercase tracking-tighter">Vision Config</h3>
            <div className="space-y-8">
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Headline</label>
                <input type="text" value={settings.homeHeadline} onChange={e => updateDoc(doc(db, 'settings', 'global'), {homeHeadline: e.target.value})} className="w-full bg-brand-obsidian/40 border-b border-white/10 p-3 text-sm font-black italic outline-none" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Manifesto</label>
                <textarea value={settings.aboutManifesto} onChange={e => updateDoc(doc(db, 'settings', 'global'), {aboutManifesto: e.target.value})} className="w-full bg-brand-obsidian/40 border-b border-white/10 p-3 text-sm font-black min-h-[120px] outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
