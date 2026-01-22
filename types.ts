
export interface Fit {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'streetwear' | 'avant-garde' | 'tailoring' | 'minimal';
  brands: string[];
  instagramUrl?: string;
  date: string;
}

export interface SiteSettings {
  homeHeadline: string;
  aboutManifesto: string;
  footerTagline: string;
}

export type ViewState = 'home' | 'fits' | 'about' | 'contact' | 'admin';
