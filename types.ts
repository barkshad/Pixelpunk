
export interface Fit {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Used as thumbnail for videos
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
