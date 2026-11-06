import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO } from '../../core/venue.data';
import { getTodaySpecial } from '../../core/booking-rules';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <!-- Hero Section with original high-res atmospheric interior photo -->
    <section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <!-- Background Image from Original Site -->
      <div class="absolute inset-0 z-0">
        <img
          [src]="venue.images.barInterior"
          alt="The Forager's Drop Bar Interior and Craft Taps"
          class="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          referrerpolicy="no-referrer"
        />
        <!-- Multi-Layer Gradient Overlays: lighter so bar interior & craft taps are clearly visible -->
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/35"></div>
        <div class="absolute inset-0 bg-radial from-transparent via-neutral-950/30 to-neutral-950/70"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        <!-- Official Logo Emblem -->
        <div class="mb-6 p-3 rounded-full bg-neutral-900/80 border border-amber-500/30 shadow-2xl backdrop-blur-md">
          <img
            [src]="venue.images.logo"
            alt="The Forager's Drop Official Logo"
            class="h-20 w-auto object-contain drop-shadow-md"
            referrerpolicy="no-referrer"
          />
        </div>

        <!-- Badges Pill -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-inner tracking-wide uppercase">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          20 Independent Craft Taps &bull; 4.7★ Rating &bull; $0 Venue Hire
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.1] mb-6">
          The Forager's Drop
        </h1>

        <!-- Subheadline / Authentic Quote from Original Website -->
        <p class="text-lg sm:text-xl text-stone-300 font-serif italic max-w-3xl mb-8 leading-relaxed">
          &ldquo;Mulled wine in winter, Sangria in Summer, a pool table, a leafy beer garden area, eclectic seating to suit any group or a quiet spot for watching the world pass by... best shared with others.&rdquo;
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a routerLink="/reservations"
            class="px-8 py-4 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-2xl shadow-xl shadow-amber-950/50 hover:shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
            <mat-icon class="text-base">event</mat-icon>
            Reserve Table or Booth
          </a>
          <a routerLink="/tap-list"
            class="px-8 py-4 text-sm font-semibold tracking-wide text-stone-100 hover:text-amber-300 bg-neutral-900/80 hover:bg-neutral-800/90 border border-amber-500/30 hover:border-amber-400 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2">
            <mat-icon class="text-amber-400 text-base">sports_bar</mat-icon>
            Explore 20 Live Taps
          </a>
          <a routerLink="/location"
            class="px-6 py-4 text-sm font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl backdrop-blur-md transition-all flex items-center gap-2">
            <mat-icon class="text-amber-400 text-base">near_me</mat-icon>
            Find & Directions
          </a>
        </div>

        <!-- Quick Stats Grid -->
        <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div class="glass-panel p-4 rounded-2xl border border-amber-500/20">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-amber-300">20 Taps</div>
            <div class="text-xs text-stone-400 mt-1">100% Independent Craft Breweries</div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-amber-500/20">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-amber-300">4.7 / 5.0</div>
            <div class="text-xs text-stone-400 mt-1">Over 400+ Verified Testimonials</div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-amber-500/20">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-amber-300">$0 Hire</div>
            <div class="text-xs text-stone-400 mt-1">Zero Fee Functions & Gatherings</div>
          </div>
          <div class="glass-panel p-4 rounded-2xl border border-amber-500/20">
            <div class="text-2xl sm:text-3xl font-serif font-bold text-amber-300">BYO Food</div>
            <div class="text-xs text-stone-400 mt-1">Order Neighbor Pizza, Dumplings & Burgers</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Today's Live Special Spotlight -->
    @if (todaySpecial) {
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/70 via-stone-900/90 to-amber-950/70 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <mat-icon class="text-3xl">local_fire_department</mat-icon>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Today's Live Feature ({{ todaySpecial.day }})
                </span>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] uppercase">
                  {{ todaySpecial.badge }}
                </span>
              </div>
              <h2 class="text-2xl font-serif font-bold text-stone-100 mt-0.5">{{ todaySpecial.title }}</h2>
              <p class="text-xs text-stone-300 mt-1 max-w-xl">{{ todaySpecial.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto">
            <a routerLink="/specials"
              class="px-5 py-2.5 text-xs font-semibold text-amber-300 hover:text-white border border-amber-500/40 hover:bg-amber-900/50 rounded-xl transition-all w-full md:w-auto text-center">
              View All Specials
            </a>
            <a routerLink="/reservations"
              class="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all w-full md:w-auto text-center flex-shrink-0">
              Claim Tonight
            </a>
          </div>
        </div>
      </section>
    }

    <!-- The 7 Wings of The Forager's Drop -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
          Explore Every Experience
        </span>
        <h2 class="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mt-2 mb-4">
          Every Chapter on Its Own Stage
        </h2>
        <p class="text-sm text-stone-400 leading-relaxed">
          We pride ourselves in providing only the best Independent Beers, Wines, and Spirits. Our model is to support local craft over mainstream swill.
        </p>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Card 1: Tap List -->
        <a routerLink="/tap-list" class="group glass-panel rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div class="h-56 relative overflow-hidden">
            <img [src]="venue.images.beerCellar" alt="The Tap List & Cellar" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95" referrerpolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-neutral-950 uppercase tracking-wider">
                20 Craft Lines
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
              The Craft Tap List
              <mat-icon class="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </h3>
            <p class="text-xs text-stone-400 mt-2 leading-relaxed">
              Unfiltered Hazy IPAs, barrel-aged imperial stouts, crisp Victorian lagers, real cider, and traditional handpump English cask ale.
            </p>
          </div>
        </a>

        <!-- Card 2: Wine Cellar & Mulled Wine -->
        <a routerLink="/cellar" class="group glass-panel rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div class="h-56 relative overflow-hidden">
            <img [src]="venue.images.cocktails" alt="Wine Cellar and Cocktails" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95" referrerpolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-900 text-purple-200 border border-purple-500/40 uppercase tracking-wider">
                Cellar & Mulled Wine
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
              Wine Cellar & Spirits
              <mat-icon class="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </h3>
            <p class="text-xs text-stone-400 mt-2 leading-relaxed">
              Our famous winter mulled wine ('to die for!'), courtyard sangria, Yarra Valley Pinot Noir, and bespoke Australian gin & single malt cocktails.
            </p>
          </div>
        </a>

        <!-- Card 3: Food Options & BYO -->
        <a routerLink="/food" class="group glass-panel rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div class="h-56 relative overflow-hidden">
            <img [src]="venue.images.pizzaPartner" alt="Mr and Mrs Pizza and Food Options" class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 bg-neutral-900/60" referrerpolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-900 text-emerald-200 border border-emerald-500/40 uppercase tracking-wider">
                BYO Food Culture
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
              In-Bar Food & Partners
              <mat-icon class="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </h3>
            <p class="text-xs text-stone-400 mt-2 leading-relaxed">
              Order fresh pizza from Mr & Mrs Pizza next door, dumplings, or smash burgers right to your table. Plus artisan bar pretzels & Mount Zero olives.
            </p>
          </div>
        </a>

        <!-- Card 4: Pub Trivia -->
        <a routerLink="/trivia" class="group glass-panel rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div class="h-56 relative overflow-hidden">
            <img [src]="venue.images.triviaFlyer" alt="Wednesday Pub Trivia" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95" referrerpolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-neutral-950 uppercase tracking-wider">
                Wednesday 7 PM
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
              Wednesday Pub Trivia
              <mat-icon class="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </h3>
            <p class="text-xs text-stone-400 mt-2 leading-relaxed">
              Melbourne's cheekiest trivia night! Free entry, high-stakes tiebreakers, boozy prizes, and reserved booths for competitive squads.
            </p>
          </div>
        </a>

        <!-- Card 5: Functions & Events -->
        <a routerLink="/catering-events" class="group glass-panel rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div class="h-56 relative overflow-hidden">
            <img [src]="venue.images.floorPlan" alt="Events and Catering Floor Plan" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95" referrerpolicy="no-referrer" />
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-900 text-cyan-200 border border-cyan-500/40 uppercase tracking-wider">
                $0 Venue Hire
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
              Functions & Events
              <mat-icon class="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </h3>
            <p class="text-xs text-stone-400 mt-2 leading-relaxed">
              Hens, bucks, 21sts, 30ths, 40ths, work breakups, and casual gatherings. Self-catered or catered with zero room hire fees.
            </p>
          </div>
        </a>

        <!-- Card 6: Interactive Directions & Map -->
        <a routerLink="/location" class="group glass-panel rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div class="h-56 relative overflow-hidden bg-neutral-900 flex items-center justify-center p-6">
            <div class="text-center">
              <div class="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <mat-icon class="text-3xl">map</mat-icon>
              </div>
              <span class="text-xs font-mono text-stone-300">499A Whitehorse Road, Mitcham</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none"></div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-900 text-rose-200 border border-rose-500/40 uppercase tracking-wider">
                Google Maps & Drive
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors flex items-center justify-between">
              Interactive Map & Directions
              <mat-icon class="text-amber-400 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </h3>
            <p class="text-xs text-stone-400 mt-2 leading-relaxed">
              Step-by-step turn guidance, instant drive time calculation, train station walking path, and parking map directly to our front door.
            </p>
          </div>
        </a>

      </div>
    </section>

    <!-- Social Proof / Reviews Collage Strip -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/20 relative overflow-hidden">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="space-y-3 text-center lg:text-left">
            <div class="flex items-center justify-center lg:justify-start gap-1 text-amber-400">
              <mat-icon class="text-lg">star</mat-icon>
              <mat-icon class="text-lg">star</mat-icon>
              <mat-icon class="text-lg">star</mat-icon>
              <mat-icon class="text-lg">star</mat-icon>
              <mat-icon class="text-lg">star</mat-icon>
              <span class="ml-2 font-mono font-bold text-stone-100 text-sm">4.7 / 5.0 (400+ Reviews)</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Voted #1 Craft Beer & Gathering Spot in Mitcham
            </h3>
            <p class="text-xs text-stone-400 max-w-xl">
              &ldquo;The best craft beer venue in the Eastern Suburbs! 20 taps of independent breweries you cannot find in standard commercial pubs. Cozy, friendly, and unpretentious.&rdquo;
            </p>
          </div>
          <div class="flex items-center gap-4 flex-shrink-0">
            <a routerLink="/reviews"
              class="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md">
              Read 400+ Reviews
            </a>
            <a [href]="venue.googleReviewsUrl" target="_blank" rel="noopener noreferrer"
              class="px-5 py-3.5 text-xs font-semibold text-stone-300 hover:text-white border border-stone-700 rounded-xl hover:border-amber-400 transition-all flex items-center gap-1.5">
              <span>Google Page</span>
              <mat-icon class="text-xs scale-75">open_in_new</mat-icon>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Home {
  venue = VENUE_INFO;
  todaySpecial = getTodaySpecial();
}
