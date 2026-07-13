export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  imageAlt: string;
  dietaryTags: string[];
  popular: boolean;
  source: string;
  needsConfirmation: boolean;
  sourceDate?: string;
}

export type MenuCategory = 
  | 'bowls' 
  | 'bagels' 
  | 'stullen' 
  | 'french_toast' 
  | 'pancakes' 
  | 'salads' 
  | 'burger' 
  | 'crusty_bread' 
  | 'croffles' 
  | 'desserts' 
  | 'fruit_yoghurt_bowls';

export interface ReservationRequest {
  date: string;
  time: string;
  guests: number;
  name: string;
  note?: string;
}
