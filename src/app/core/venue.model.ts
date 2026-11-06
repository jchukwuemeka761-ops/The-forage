export interface TapBeer {
  id: string;
  tapNumber: number;
  name: string;
  brewery: string;
  location: string;
  style: 'Hazy IPA' | 'West Coast IPA' | 'Pale Ale' | 'Lager' | 'Stout' | 'Sour' | 'Cider' | 'Cask Ale';
  abv: number;
  ibu?: number;
  description: string;
  badgeUrl?: string;
  pricing: {
    pot: number;
    pint: number;
    jug?: number;
  };
  status: 'Pouring Fresh' | 'Low Keg' | 'Next on Deck';
  isLocalVictorian: boolean;
  tastingNotes: string[];
}

export interface WineItem {
  id: string;
  name: string;
  winery: string;
  region: string;
  type: 'Red' | 'White' | 'Rosé' | 'Sparkling' | 'Seasonal Specialty';
  glassPrice: number;
  bottlePrice: number;
  description: string;
  isSeasonalHighlight?: boolean;
}

export interface CocktailItem {
  id: string;
  name: string;
  ingredients: string;
  glassPrice: number;
  description: string;
  spiritBase: string;
  tag?: string;
}

export interface PartnerFood {
  id: string;
  restaurantName: string;
  cuisine: string;
  address: string;
  specialDeal?: string;
  popularDishes: { name: string; price: string; description: string }[];
  phone: string;
  walkingMinutes: number;
  image?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  source: 'Google Reviews' | 'Untappd' | 'Facebook' | 'Restaurant Guru' | 'Local Regular';
  date: string;
  comment: string;
  category: 'Craft Beer' | 'Vibe & Atmosphere' | 'Trivia' | 'Hospitality' | 'BYO Food' | 'Events';
  verifiedVisit: boolean;
  badgeImage?: string;
}

export interface WeeklySpecial {
  day: string;
  dayIndex: number; // 0 = Sun, 1 = Mon...
  title: string;
  badge: string;
  timeWindow: string;
  highlights: string[];
  description: string;
  heroImage: string;
}

export interface ReservationRequest {
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Cozy Interior Booth' | 'Covered Beer Garden' | 'Pool Table Lounge' | 'Main Bar High-Tops';
  eventType?: 'Casual Catchup' | 'Birthday' | 'Pub Trivia Team' | 'Hens/Bucks' | 'Corporate' | 'Other';
  specialRequests?: string;
}

export interface GiftCardOrder {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  amount: number;
  message: string;
  deliveryDate?: string;
}
