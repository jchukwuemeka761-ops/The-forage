import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: "The Forager's Drop | Home & Experience"
  },
  {
    path: 'tap-list',
    loadComponent: () => import('./pages/tap-list/tap-list').then(m => m.TapList),
    title: "Craft Tap List (20 Lines) | The Forager's Drop"
  },
  {
    path: 'cellar',
    loadComponent: () => import('./pages/cellar/cellar').then(m => m.Cellar),
    title: "Wine Cellar, Mulled Wine & Spirits | The Forager's Drop"
  },
  {
    path: 'food',
    loadComponent: () => import('./pages/food/food').then(m => m.Food),
    title: "In-Bar Food & BYO Partners | The Forager's Drop"
  },
  {
    path: 'trivia',
    loadComponent: () => import('./pages/trivia/trivia').then(m => m.Trivia),
    title: "Wednesday Pub Trivia | The Forager's Drop"
  },
  {
    path: 'catering-events',
    loadComponent: () => import('./pages/catering-events/catering-events').then(m => m.CateringEvents),
    title: "Functions & Private Events ($0 Hire) | The Forager's Drop"
  },
  {
    path: 'reservations',
    loadComponent: () => import('./pages/reservations/reservations').then(m => m.Reservations),
    title: "Table & Booth Reservations | The Forager's Drop"
  },
  {
    path: 'gift-cards',
    loadComponent: () => import('./pages/gift-cards/gift-cards').then(m => m.GiftCards),
    title: "Gift Vouchers | The Forager's Drop"
  },
  {
    path: 'reviews',
    loadComponent: () => import('./pages/reviews/reviews').then(m => m.Reviews),
    title: "Reviews, Badges & Testimonials | The Forager's Drop"
  },
  {
    path: 'specials',
    loadComponent: () => import('./pages/specials/specials').then(m => m.Specials),
    title: "Regular Weekly Specials & Hours | The Forager's Drop"
  },
  {
    path: 'location',
    loadComponent: () => import('./pages/location/location').then(m => m.Location),
    title: "Interactive Google Map & Driving Directions | The Forager's Drop"
  },
  // Seamless aliases for old Wix URLs so bookmarks never fail
  { path: 'items-2', redirectTo: 'tap-list', pathMatch: 'full' },
  { path: 'tap-list-all', redirectTo: 'tap-list', pathMatch: 'full' },
  { path: 'general-8', redirectTo: 'catering-events', pathMatch: 'full' },
  { path: 'general-8-1', redirectTo: 'food', pathMatch: 'full' },
  { path: 'triviadates', redirectTo: 'trivia', pathMatch: 'full' },
  { path: 'reviews-links', redirectTo: 'reviews', pathMatch: 'full' },
  { path: 'about-us', redirectTo: '', pathMatch: 'full' },
  { path: 'contact-details', redirectTo: 'location', pathMatch: 'full' },
  { path: 'contact', redirectTo: 'location', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

