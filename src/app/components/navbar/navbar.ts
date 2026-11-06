import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO } from '../../core/venue.data';
import { isVenueOpenAt } from '../../core/booking-rules';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="sticky top-0 z-50 w-full glass-panel border-b border-amber-900/30 transition-all duration-300">
      <!-- Top Announcement Bar -->
      <div class="bg-gradient-to-r from-amber-950/80 via-amber-900/50 to-amber-950/80 px-4 py-1.5 text-xs text-amber-200 border-b border-amber-500/10 flex items-center justify-between">
        <div class="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
              [class]="status().isOpen ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/30' : 'bg-stone-900 text-stone-400 border border-stone-700/40'">
              <span class="w-1.5 h-1.5 rounded-full" [class]="status().isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'"></span>
              {{ status().isOpen ? 'OPEN NOW' : 'CLOSED NOW' }}
            </span>
            <span class="hidden sm:inline text-stone-300">
              499A Whitehorse Rd, Mitcham VIC &bull; 20 Independent Craft Taps
            </span>
          </div>

          <div class="flex items-center gap-4 text-stone-300">
            <a href="tel:0415727988" class="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <mat-icon class="text-xs scale-75">call</mat-icon>
              <span class="font-mono text-[11px]">0415 727 988</span>
            </a>
            <span class="text-stone-700">|</span>
            <a [href]="venue.instagramUrl" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 text-[11px] transition-colors">
              #foragersdrop
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2" aria-label="Main Navigation">
        <!-- Brand Logo -->
        <a routerLink="/" class="flex items-center gap-3 group shrink-0">
          <img
            [src]="venue.images.logo"
            alt="The Forager's Drop Official Logo"
            class="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            referrerpolicy="no-referrer"
          />
          <div class="flex flex-col whitespace-nowrap">
            <span class="font-serif text-lg sm:text-xl font-bold tracking-wide text-stone-100 group-hover:text-amber-300 transition-colors whitespace-nowrap leading-tight">
              The Forager's Drop
            </span>
            <span class="text-[9px] uppercase tracking-widest text-amber-400/90 font-medium whitespace-nowrap">
              Craft Beer &bull; Wine &bull; Spirits
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden xl:flex items-center gap-1 2xl:gap-2">
          <a routerLink="/tap-list" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Tap List
          </a>
          <a routerLink="/cellar" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Wine & Cellar
          </a>
          <a routerLink="/food" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Food Options
          </a>
          <a routerLink="/specials" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Specials
          </a>
          <a routerLink="/trivia" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Trivia
          </a>
          <a routerLink="/catering-events" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Events
          </a>
          <a routerLink="/reviews" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap">
            Reviews
          </a>
          <a routerLink="/location" routerLinkActive="text-amber-400 bg-amber-950/40"
            class="px-2.5 py-1.5 text-xs 2xl:text-sm font-medium text-stone-300 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1 whitespace-nowrap">
            <mat-icon class="text-amber-400 text-sm scale-90">place</mat-icon>
            Map
          </a>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden md:flex items-center gap-2.5 shrink-0">
          <a routerLink="/gift-cards"
            class="px-3 py-2 text-xs font-semibold text-stone-300 hover:text-amber-300 border border-stone-700/60 hover:border-amber-500/50 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap">
            <mat-icon class="text-sm scale-90 text-amber-400">card_giftcard</mat-icon>
            Gift Cards
          </a>
          <a routerLink="/reservations"
            class="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-950/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap">
            <mat-icon class="text-sm scale-90">event</mat-icon>
            <span>Reserve Table</span>
          </a>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex xl:hidden items-center gap-2">
          <a routerLink="/reservations"
            class="px-3 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg">
            Reserve
          </a>
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="p-2 text-stone-300 hover:text-amber-300 hover:bg-white/5 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu">
            <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Navigation -->
      @if (mobileMenuOpen()) {
        <div class="xl:hidden bg-neutral-950/95 border-b border-amber-900/40 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-1">
          <a routerLink="/" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Home
          </a>
          <a routerLink="/tap-list" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Craft Tap List (20 Taps)
          </a>
          <a routerLink="/cellar" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Wine Cellar & Spirits
          </a>
          <a routerLink="/food" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Food Options & BYO Menu
          </a>
          <a routerLink="/specials" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Weekly Specials
          </a>
          <a routerLink="/trivia" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Wednesday Pub Trivia
          </a>
          <a routerLink="/catering-events" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Functions & Events ($0 Hire)
          </a>
          <a routerLink="/reviews" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Reviews & Testimonials
          </a>
          <a routerLink="/gift-cards" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-200 hover:bg-amber-950/40 hover:text-amber-300">
            Gift Cards
          </a>
          <a routerLink="/location" (click)="closeMobileMenu()"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-amber-300 bg-amber-950/30 flex items-center gap-2">
            <mat-icon class="text-sm">directions</mat-icon>
            Interactive Map & Directions
          </a>
          <div class="pt-4 flex flex-col gap-2">
            <a routerLink="/reservations" (click)="closeMobileMenu()"
              class="w-full text-center py-3 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl">
              Book a Table / Booth
            </a>
            <a href="tel:0415727988"
              class="w-full text-center py-2.5 text-xs font-semibold text-stone-300 border border-stone-800 rounded-xl hover:text-amber-300">
              Call Venue: 0415 727 988
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class Navbar {
  venue = VENUE_INFO;
  mobileMenuOpen = signal(false);

  status = signal(this.getCurrentStatus());

  private getCurrentStatus() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = days[now.getDay()];
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return isVenueOpenAt(day, time);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
