
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

export type ViewState = 'home' | 'fits' | 'about' | 'contact';
