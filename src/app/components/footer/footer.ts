import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO } from '../../core/venue.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <footer class="bg-neutral-950 border-t border-amber-950/60 relative overflow-hidden text-stone-400">
      <!-- Ambient glow -->
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <!-- Column 1: Brand & Bio -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <img
                [src]="venue.images.logo"
                alt="The Forager's Drop"
                class="h-12 w-auto object-contain"
                referrerpolicy="no-referrer"
              />
              <span class="font-serif text-2xl font-bold text-stone-100">The Forager's Drop</span>
            </div>
            <p class="text-xs text-stone-400 leading-relaxed">
              Melbourne's Eastern Suburbs premier independent craft beverage destination. 20 taps of local, unpasteurized, independent craft beers, seasonal mulled wines, curated Victorian varietals, and community-driven BYO food culture.
            </p>
            <div class="pt-2 flex items-center gap-3">
              <a [href]="venue.instagramUrl" target="_blank" rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-stone-900 border border-amber-500/20 hover:border-amber-400 text-stone-300 hover:text-amber-300 flex items-center justify-center transition-all"
                aria-label="Instagram">
                <span class="font-bold text-xs">IG</span>
              </a>
              <a [href]="venue.facebookUrl" target="_blank" rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-stone-900 border border-amber-500/20 hover:border-amber-400 text-stone-300 hover:text-amber-300 flex items-center justify-center transition-all"
                aria-label="Facebook">
                <span class="font-bold text-xs">FB</span>
              </a>
              <a [href]="venue.googleReviewsUrl" target="_blank" rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-stone-900 border border-amber-500/20 hover:border-amber-400 text-stone-300 hover:text-amber-300 flex items-center justify-center transition-all"
                aria-label="Google Reviews">
                <span class="font-bold text-xs">4.7★</span>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation Links -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-4 font-mono">
              Venue Wings
            </h4>
            <ul class="space-y-2.5 text-xs">
              <li><a routerLink="/" class="hover:text-amber-300 transition-colors">Home & Atmosphere</a></li>
              <li><a routerLink="/tap-list" class="hover:text-amber-300 transition-colors">Live Tap List (20 Lines)</a></li>
              <li><a routerLink="/cellar" class="hover:text-amber-300 transition-colors">Wine Cellar & Spirits</a></li>
              <li><a routerLink="/food" class="hover:text-amber-300 transition-colors">In-Bar Food & BYO Partners</a></li>
              <li><a routerLink="/specials" class="hover:text-amber-300 transition-colors">Weekly Specials & Line Drops</a></li>
              <li><a routerLink="/trivia" class="hover:text-amber-300 transition-colors">Wednesday Pub Trivia</a></li>
              <li><a routerLink="/catering-events" class="hover:text-amber-300 transition-colors">Functions ($0 Venue Hire)</a></li>
              <li><a routerLink="/reviews" class="hover:text-amber-300 transition-colors">Reviews & Testimonials</a></li>
              <li><a routerLink="/gift-cards" class="hover:text-amber-300 transition-colors">Artisanal Gift Vouchers</a></li>
            </ul>
          </div>

          <!-- Column 3: Hours of Operation -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-4 font-mono">
              Hours of Operation
            </h4>
            <ul class="space-y-2 text-xs">
              @for (h of venue.hours; track h.day) {
                <li class="flex items-center justify-between border-b border-stone-800/60 pb-1.5">
                  <span class="text-stone-300 font-medium">{{ h.day }}</span>
                  <span class="font-mono text-stone-400">{{ h.display }}</span>
                </li>
              }
            </ul>
            <p class="text-[11px] text-amber-500/80 mt-3 italic">
              * Group bookings available outside hours by advance arrangement.
            </p>
          </div>

          <!-- Column 4: Location & Contact -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-amber-300 mb-4 font-mono">
              Find & Contact Us
            </h4>
            <div class="space-y-3 text-xs">
              <div class="flex items-start gap-2.5">
                <mat-icon class="text-amber-400 text-sm mt-0.5">location_on</mat-icon>
                <div>
                  <p class="text-stone-200 font-medium">499A Whitehorse Road</p>
                  <p class="text-stone-400">Mitcham VIC 3132, Australia</p>
                  <p class="text-[11px] text-stone-500 mt-0.5">3-minute walk from Mitcham Railway Station</p>
                </div>
              </div>

              <div class="flex items-center gap-2.5">
                <mat-icon class="text-amber-400 text-sm">phone</mat-icon>
                <a href="tel:0415727988" class="text-stone-200 hover:text-amber-300 font-mono">
                  0415 727 988
                </a>
              </div>

              <div class="flex items-center gap-2.5">
                <mat-icon class="text-amber-400 text-sm">email</mat-icon>
                <a href="mailto:foragersdrop@gmail.com" class="text-stone-200 hover:text-amber-300">
                  foragersdrop&#64;gmail.com
                </a>
              </div>

              <div class="pt-3">
                <a routerLink="/location"
                  class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-600/30 rounded-xl hover:bg-amber-900/60 transition-colors w-full justify-center">
                  <mat-icon class="text-sm">directions</mat-icon>
                  Get Driving Directions
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="mt-14 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>&copy; 2026 The Forager's Drop. All Rights Reserved. Responsibly serving independent craft drinks.</p>
          <div class="flex items-center gap-6">
            <span class="text-amber-500 font-mono">Tag us #foragersdrop</span>
            <a routerLink="/location" class="hover:text-stone-300">Privacy & Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class Footer {
  venue = VENUE_INFO;
}
