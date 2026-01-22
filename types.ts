
export interface Fit {
  id: string;
  title: string;
  description: string;
  goatedStory?: string; // The AI-generated lore for why the fit is a grail
  imageUrl: string; 
  videoUrl?: string;
  mediaType: 'image' | 'video';
  section: 'gallery' | 'fit-check';
  category: 'streetwear' | 'avant-garde' | 'tailoring' | 'minimal';
  brands: string[];
  instagramUrl?: string;
  date: string;
  createdAt?: any;
}

export interface SiteSettings {
  homeHeadline: string;
  homeSubheadline: string;
  homeDescription: string;
  aboutManifesto: string;
  aboutQuote: string;
  aboutBody1: string;
  aboutBody2: string;
  contactHeadline: string;
  contactDescription: string;
  footerTagline: string;
  heroVideoUrl?: string;
  instagramUrl: string;
  instagramBio: string;
}

export type ViewState = 'home' | 'fits' | 'about' | 'contact' | 'admin';
