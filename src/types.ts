export type MenuCategory = 'all' | 'ramen' | 'bao' | 'skewers' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  japaneseName?: string;
  category: 'ramen' | 'bao' | 'skewers' | 'drinks';
  price: number;
  description: string;
  ingredients: string[];
  spiceLevel: number; // 0: None, 1: Mild, 2: Heavy, 3: Infernal
  isGlutenFreeOption: boolean;
  isHouseFavorite?: boolean;
  image?: string;
  pairingNote?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  spiceLevel: number;
  customNotes?: string;
  extraAddons: string[];
  totalPrice: number;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'altar' | 'crypt' | 'counter';
  audioPreference: string;
  dietaryNotes: string;
}

export interface VinylTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  duration: string;
  rpm: number;
  keyFreq: number; // For Web Audio synth drone
  distortionGain: number;
}
