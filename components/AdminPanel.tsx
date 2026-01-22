
import React, { useState, useRef, useEffect } from 'react';
import { Fit, SiteSettings } from '../types';
import { db } from '../services/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { analyzeFitMetadata, generateGoatedStory } from '../services/geminiService';

interface AdminPanelProps {
  fits: Fit[];
  setFits: React.Dispatch<React.SetStateAction<Fit[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

interface StagedFit extends Partial<Fit> {
  tempId: string;
}

type AdminTab = 'home' | 'about' | 'contact' | 'footer' | 'vault';

const AdminPanel: React.FC<AdminPanelProps> = ({ fits, setFits, settings, setSettings }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('home');
  
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [savingFits, setSavingFits] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [heroUploading, setHeroUploading] = useState(false);
  const [stagedFits, setStagedFits] = useState<StagedFit[]>([]);
  
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
      alert('FAILED TO UPDATE VISION. TRY AGAIN GNG.');
    } finally {
      setSavingSettings(false);
    }
  };

  const autoAnalyzeStaged = async () => {
    if (stagedFits.length === 0) return;
    setAnalyzing(true);
    try {
      const updated = await Promise.all(stagedFits.map(async (fit) => {
        const analysis = await analyzeFitMetadata(batchConfig.description);
        if (!analysis) return fit;
        
        const story = await generateGoatedStory(analysis.suggestedTitle, analysis.suggestedBrands, analysis.suggestedCategory);

        return {
          ...fit,
          title: analysis.suggestedTitle,
          category: analysis.suggestedCategory as any,
          brands: analysis.suggestedBrands,
          description: analysis.goatedManifesto,
          goatedStory: story
        };
      }));
      setStagedFits(updated);
      alert('AI ANALYSIS COMPLETE. THE VISION IS AUTOMATED TWIN.');
    } catch (err) {
      alert('AI ENGINE FAILED TO SYNC. TRY AGAIN GNG.');
    } finally {
      setAnalyzing(false);
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
      const res = await fetch(`https://api.cloudinary.com/v1_1/ds2mbrzcn/video/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.secure_url) {
        handleSettingsUpdate('heroVideoUrl', data.secure_url);
        await updateDoc(doc(db, 'settings', 'global'), { heroVideoUrl: data.secure_url });
        setSettings(prev => ({ ...prev, heroVideoUrl: data.secure_url }));
        alert('HERO VIDEO UPDATED TWIN.');
      }
    } catch (err) {
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
        const res = await fetch(`https://api.cloudinary.com/v1_1/ds2mbrzcn/${resourceType}/upload`, { method: 'POST', body: formData });
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
          goatedStory: staged.goatedStory || "",
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
             <div className="px-4 py-1 bg-brand-bone text-brand-obsidian text-[10px] tracking-[0.4em] font-black uppercase italic">ADMIN VAULT</div>
          </div>
          <h2 className="text-3xl font-serif italic mb-8 tracking-tighter text-center">Wassup Gng. Tap In.</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-brand-obsidian border border-white/20 p-4 text-brand-bone focus:outline-none focus:border-brand-bone transition-all font-black tracking-widest" placeholder="PASSCODE" />
            {error && <p className="text-red-500 text-[10px] tracking-widest font-black uppercase text-center animate-pulse">{error}</p>}
            <button className="w-full py-4 bg-brand-bone text-brand-obsidian font-black tracking-[0.3em] uppercase hover:bg-white transition-all shadow-lg shadow-white/5">UNLOCK THE MOTION</button>
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

      <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        {(['home', 'about', 'contact', 'footer', 'vault'] as AdminTab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 text-[10px] tracking-[0.4em] font-black uppercase transition-all ${activeTab === tab ? 'bg-brand-bone text-brand-obsidian' : 'text-brand-bone/40 hover:text-brand-bone'}`}>
            {tab === 'vault' ? 'Media Vault' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Page`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          {activeTab === 'home' && (
            <div className="space-y-12 fade-in">
              <section className="bg-brand-charcoal/50 p-10 border border-white/5 rounded-sm">
                <h3 className="text-3xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Home Page Config</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Hero Headline</label>
                      <input type="text" value={localSettings.homeHeadline} onChange={e => handleSettingsUpdate('homeHeadline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Hero Sub Headline</label>
                      <input type="text" value={localSettings.homeSubheadline} onChange={e => handleSettingsUpdate('homeSubheadline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Hero Description</label>
                    <textarea value={localSettings.homeDescription} onChange={e => handleSettingsUpdate('homeDescription', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[120px] resize-none font-bold" />
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-4 font-black italic">Background Video Visuals</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                        <input type="file" accept="video/*" ref={heroVideoRef} onChange={handleHeroVideoUpload} className="hidden" />
                        <button onClick={() => heroVideoRef.current?.click()} className={`w-full py-8 border-2 border-dashed border-white/20 hover:border-brand-bone text-[11px] tracking-[0.3em] uppercase font-black transition-all ${heroUploading ? 'animate-pulse' : ''}`}>
                          {heroUploading ? 'UPLOADING...' : 'UPLOAD NEW HERO VIDEO'}
                        </button>
                       </div>
                       {localSettings.heroVideoUrl && (
                        <div className="aspect-video bg-black/40 border border-white/10 overflow-hidden relative group">
                          <video src={localSettings.heroVideoUrl} muted autoPlay loop playsInline webkit-playsinline="true" preload="auto" className="w-full h-full object-cover grayscale opacity-50" />
                        </div>
                       )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-12 fade-in">
              <section className="bg-brand-charcoal/50 p-10 border border-white/5 rounded-sm">
                <h3 className="text-3xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">About Page Config</h3>
                <div className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Main Manifesto (Headline)</label>
                    <textarea value={localSettings.aboutManifesto} onChange={e => handleSettingsUpdate('aboutManifesto', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[120px] resize-none font-bold" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Instagram URL</label>
                      <input type="text" value={localSettings.instagramUrl} onChange={e => handleSettingsUpdate('instagramUrl', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Instagram Bio Text</label>
                      <input type="text" value={localSettings.instagramBio} onChange={e => handleSettingsUpdate('instagramBio', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Style Quote</label>
                    <input type="text" value={localSettings.aboutQuote} onChange={e => handleSettingsUpdate('aboutQuote', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold italic" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Column 1 Content</label>
                      <textarea value={localSettings.aboutBody1} onChange={e => handleSettingsUpdate('aboutBody1', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[180px] resize-none font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Column 2 Content</label>
                      <textarea value={localSettings.aboutBody2} onChange={e => handleSettingsUpdate('aboutBody2', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[180px] resize-none font-bold" />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-12 fade-in">
              <section className="bg-brand-charcoal/50 p-10 border border-white/5 rounded-sm">
                <h3 className="text-3xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Contact Page Config</h3>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Main Headline</label>
                    <input type="text" value={localSettings.contactHeadline} onChange={e => handleSettingsUpdate('contactHeadline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Stylist System Description</label>
                    <textarea value={localSettings.contactDescription} onChange={e => handleSettingsUpdate('contactDescription', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none h-[150px] resize-none font-bold" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-12 fade-in">
              <section className="bg-brand-charcoal/50 p-10 border border-white/5 rounded-sm">
                <h3 className="text-3xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Footer Config</h3>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 font-black italic">Footer Global Tagline</label>
                    <input type="text" value={localSettings.footerTagline} onChange={e => handleSettingsUpdate('footerTagline', e.target.value)} className="w-full bg-brand-obsidian p-4 border border-white/10 focus:border-brand-bone/50 outline-none font-bold" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'vault' && (
            <div className="space-y-16 fade-in">
              <section className="bg-brand-charcoal/50 p-10 border border-white/5 rounded-sm">
                <h3 className="text-3xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Media Vault Manager</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Section Routing</label>
                      <div className="flex gap-4">
                        <button onClick={() => setBatchConfig({...batchConfig, section: 'gallery'})} className={`flex-1 py-4 text-[10px] tracking-[0.3em] font-black uppercase border transition-all ${batchConfig.section === 'gallery' ? 'bg-brand-bone text-brand-obsidian border-brand-bone' : 'border-white/10 text-brand-bone/40'}`}>Archive Gallery</button>
                        <button onClick={() => setBatchConfig({...batchConfig, section: 'fit-check'})} className={`flex-1 py-4 text-[10px] tracking-[0.3em] font-black uppercase border transition-all ${batchConfig.section === 'fit-check' ? 'bg-brand-bone text-brand-obsidian border-brand-bone' : 'border-white/10 text-brand-bone/40'}`}>Fit Checks</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] tracking-[0.3em] uppercase text-brand-bone/40 block mb-3 font-black italic">Initial Description (For AI Context)</label>
                    <textarea value={batchConfig.description} onChange={e => setBatchConfig({...batchConfig, description: e.target.value})} className="w-full bg-brand-obsidian border border-white/10 p-4 h-[130px] resize-none font-bold outline-none focus:border-brand-bone/50 transition-all" />
                  </div>
                </div>

                <div className="space-y-10">
                  <input type="file" accept="image/*,video/*" multiple ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <button onClick={() => fileInputRef.current?.click()} className={`w-full py-20 border-2 border-dashed border-white/20 hover:border-brand-bone transition-all text-[14px] tracking-[0.5em] font-black uppercase flex flex-col items-center gap-6 ${uploading ? 'animate-pulse' : ''}`}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    {uploading ? 'INGESTING TO VAULT...' : 'DROP GRAILS HERE (IMAGE/VIDEO)'}
                  </button>

                  {stagedFits.length > 0 && (
                    <div className="bg-brand-obsidian p-8 border border-white/10 space-y-10 rounded-sm shadow-2xl">
                       <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <h4 className="text-[12px] tracking-[0.6em] font-black uppercase text-brand-bone/60">Staging Environment</h4>
                          <button 
                            onClick={autoAnalyzeStaged} 
                            disabled={analyzing}
                            className="bg-brand-bone text-brand-obsidian px-6 py-2 text-[9px] tracking-[0.4em] font-black uppercase italic hover:invert transition-all"
                          >
                             {analyzing ? 'AI ANALYZING...' : 'AI AUTO-CATEGORIZE & TELL STORY'}
                          </button>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                         {stagedFits.map(fit => (
                           <div key={fit.tempId} className="bg-brand-charcoal border border-white/5 p-4 rounded-sm space-y-4">
                             <div className="relative aspect-square overflow-hidden rounded-sm">
                                <img src={fit.imageUrl} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 flex gap-2">
                                   <button onClick={() => setStagedFits(prev => prev.filter(f => f.tempId !== fit.tempId))} className="bg-red-600 text-white p-2 text-[10px] font-black uppercase">Wipe</button>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <input type="text" value={fit.title} onChange={e => {
                                  const newVal = e.target.value;
                                  setStagedFits(prev => prev.map(f => f.tempId === fit.tempId ? {...f, title: newVal} : f));
                                }} className="w-full bg-brand-obsidian border border-white/10 p-2 text-[11px] font-black uppercase tracking-widest text-brand-bone" placeholder="Title" />
                                <select value={fit.category} onChange={e => {
                                  const newVal = e.target.value;
                                  setStagedFits(prev => prev.map(f => f.tempId === fit.tempId ? {...f, category: newVal as any} : f));
                                }} className="w-full bg-brand-obsidian border border-white/10 p-2 text-[10px] font-bold uppercase text-brand-bone/60">
                                   <option value="streetwear">Streetwear</option>
                                   <option value="avant-garde">Avant-Garde</option>
                                   <option value="tailoring">Tailoring</option>
                                   <option value="minimal">Minimal</option>
                                </select>
                                <textarea value={fit.description} onChange={e => {
                                  const newVal = e.target.value;
                                  setStagedFits(prev => prev.map(f => f.tempId === fit.tempId ? {...f, description: newVal} : f));
                                }} className="w-full bg-brand-obsidian border border-white/10 p-2 text-[10px] h-[60px] resize-none text-brand-bone/80" placeholder="Manifesto" />
                                <textarea value={fit.goatedStory} onChange={e => {
                                  const newVal = e.target.value;
                                  setStagedFits(prev => prev.map(f => f.tempId === fit.tempId ? {...f, goatedStory: newVal} : f));
                                }} className="w-full bg-brand-bone/5 border border-white/10 p-2 text-[10px] h-[100px] resize-none text-brand-bone/60 italic" placeholder="AI Goated Story..." />
                             </div>
                           </div>
                         ))}
                       </div>
                       <button onClick={stampAllToVault} disabled={savingFits} className="w-full py-8 bg-brand-bone text-brand-obsidian font-black tracking-[0.8em] uppercase hover:invert transition-all text-sm">
                         {savingFits ? 'STAMPING...' : `STAMP ${stagedFits.length} ITEMS TO VAULT`}
                       </button>
                    </div>
                  )}
                </div>
              </section>

              <section className="bg-brand-charcoal/50 p-10 border border-white/5 rounded-sm">
                 <h3 className="text-3xl font-serif italic mb-10 border-b border-white/10 pb-4 uppercase tracking-tighter">Archive Maintenance</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[800px] overflow-y-auto no-scrollbar pr-2">
                   {fits.map(fit => (
                     <div key={fit.id} className="relative aspect-[4/5] bg-brand-obsidian border border-white/5 group overflow-hidden">
                        <img src={fit.imageUrl} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all">
                           <button onClick={() => { if(confirm('WIPE THIS MOTION?')) { deleteDoc(doc(db, 'fits', fit.id)); setFits(f => f.filter(i => i.id !== fit.id)); } }} className="w-full py-2 bg-red-600/20 border border-red-600/40 text-[8px] font-black uppercase text-red-500 hover:bg-red-600 hover:text-white transition-all">Wipe Piece</button>
                        </div>
                     </div>
                   ))}
                 </div>
              </section>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-40 space-y-8">
            {activeTab !== 'vault' && (
              <div className="bg-brand-bone/5 border border-white/10 p-10 rounded-sm">
                <h4 className="text-[12px] tracking-[0.5em] font-black uppercase text-brand-bone/60 mb-6 border-b border-white/10 pb-4">Global Sync</h4>
                <button onClick={saveGlobalSettings} disabled={savingSettings} className="w-full py-8 bg-brand-bone text-brand-obsidian font-black tracking-[0.6em] uppercase hover:invert transition-all rounded-sm shadow-2xl">
                  {savingSettings ? 'ENFORCING...' : 'SAVE CHANGES'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
