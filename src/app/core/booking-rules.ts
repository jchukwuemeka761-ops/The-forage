import { VENUE_INFO, WEEKLY_SPECIALS } from './venue.data';
import { ReservationRequest, GiftCardOrder, WeeklySpecial } from './venue.model';

export interface SpaceRecommendation {
  recommendedSpace: string;
  isFeasible: boolean;
  notes: string;
  depositRequired: boolean;
}

export function recommendSpaceForGuests(guests: number, eventType?: string): SpaceRecommendation {
  if (guests <= 0) {
    return {
      recommendedSpace: 'Invalid guest count',
      isFeasible: false,
      notes: 'Please enter at least 1 guest.',
      depositRequired: false
    };
  }

  if (guests <= 6) {
    return {
      recommendedSpace: 'Cozy Interior Booth',
      isFeasible: true,
      notes: 'Perfect for an intimate catchup or craft tasting session.',
      depositRequired: false
    };
  }

  if (guests <= 16) {
    return {
      recommendedSpace: eventType === 'Pub Trivia Team' ? 'Reserved Trivia Center Stage' : 'Main Bar High-Tops or Covered Beer Garden',
      isFeasible: true,
      notes: 'Generous communal table setting with direct line of sight to taps or trivia screens.',
      depositRequired: false
    };
  }

  if (guests <= 35) {
    return {
      recommendedSpace: 'Covered Beer Garden & Courtyard Wing',
      isFeasible: true,
      notes: 'Indoor-outdoor flow, heating/cooling, and ample space for platters or takeaway pizza boxes.',
      depositRequired: false
    };
  }

  if (guests <= 75) {
    return {
      recommendedSpace: 'The Pool Lounge & Beer Garden Semi-Private Wing',
      isFeasible: true,
      notes: 'Combines the pool room with the adjoining outdoor courtyard. Free pool play included.',
      depositRequired: true
    };
  }

  if (guests <= 130) {
    return {
      recommendedSpace: 'Full Venue Exclusive Buyout',
      isFeasible: true,
      notes: 'Private takeover of the entire bar, courtyard, and taps. Zero hire fee with modest minimum bar spend.',
      depositRequired: true
    };
  }

  return {
    recommendedSpace: 'Custom Multi-Session Event',
    isFeasible: false,
    notes: 'Max venue capacity is approx 130 guests. Please contact management directly on 0415 727 988 for custom arrangements.',
    depositRequired: true
  };
}

export function isVenueOpenAt(dayName: string, time24h: string): { isOpen: boolean; reason: string } {
  const schedule = VENUE_INFO.hours.find(h => h.day.toLowerCase() === dayName.toLowerCase());
  if (!schedule) {
    return { isOpen: false, reason: 'Invalid day specified' };
  }

  const [inputH, inputM] = time24h.split(':').map(Number);
  const inputMinutes = inputH * 60 + (inputM || 0);

  const [openH, openM] = schedule.open.split(':').map(Number);
  const openMinutes = openH * 60 + openM;

  const [closeH, closeM] = schedule.close.split(':').map(Number);
  // If close hour is past midnight (e.g. 01:00 AM)
  const closeMinutes = closeH < openH ? (closeH + 24) * 60 + closeM : closeH * 60 + closeM;

  // If input is after midnight (e.g. 00:30 AM)
  const normalizedInput = inputH < openH && closeH < openH ? (inputH + 24) * 60 + (inputM || 0) : inputMinutes;

  if (normalizedInput >= openMinutes && normalizedInput < closeMinutes) {
    return { isOpen: true, reason: `Open! Hours today: ${schedule.display}` };
  }

  return {
    isOpen: false,
    reason: `Closed at ${time24h}. Open on ${schedule.day} from ${schedule.display}.`
  };
}

export function generateReservationCode(req: ReservationRequest): string {
  const cleanDate = (req.date || '').replace(/[^0-9]/g, '').slice(-4);
  const cleanPhone = (req.phone || '').replace(/[^0-9]/g, '').slice(-3);
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `FD-${cleanDate || 'RES'}-${cleanPhone || '988'}-${randomSuffix}`;
}

export function generateGiftCardCode(order: GiftCardOrder): string {
  const hash = Math.random().toString(36).substring(2, 6).toUpperCase();
  const amountStr = Math.round(order.amount);
  return `FORAGER-GIFT-$${amountStr}-${hash}`;
}

export function calculateDistanceKm(lat1: number, lon1: number, lat2 = VENUE_INFO.coordinates.lat, lon2 = VENUE_INFO.coordinates.lng): number {
  const R = 6371; // Radius of earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

export function getTodaySpecial(date = new Date()): WeeklySpecial | undefined {
  const dayIndex = date.getDay(); // 0 = Sun, 1 = Mon ...
  return WEEKLY_SPECIALS.find(s => s.dayIndex === dayIndex);
}
