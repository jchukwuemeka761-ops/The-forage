import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TAP_LIST, VENUE_INFO } from '../../core/venue.data';
import { TapBeer } from '../../core/venue.model';

@Component({
  selector: 'app-tap-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Brewing Hops Cones, clearly visible in rich natural detail -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.hops"
          alt="Fresh Craft Brewing Hops"
          class="w-full h-full object-cover object-center opacity-50 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Content Container -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Header Banner with Original Now Tapped Badges -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-3 mb-4">
            <img
              [src]="venue.images.nowTappedBanner"
              alt="Now Tapped Badge"
              class="h-10 sm:h-12 w-auto object-contain"
              referrerpolicy="no-referrer"
            />
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400 text-neutral-950">
              Live Tap Board &bull; 20 Independent Lines
            </span>
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            The Craft Tap List
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            We pour strictly 100% independent craft breweries, supporting local Australian artisans over commercial swill. Constantly rotating, unpasteurized, and served in style-appropriate glassware.
          </p>

          <!-- Interactive Tasting Paddle Builder Summary -->
          <div class="mt-8 glass-panel p-4 rounded-2xl border border-amber-500/30 inline-flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
            <span class="font-semibold text-amber-300 flex items-center gap-1.5">
              <mat-icon class="text-sm">liquor</mat-icon>
              Forager's Tasting Paddle:
            </span>
            <span>Any 4 Taps &bull; 200ml Pours &bull; $22.00</span>
            <span class="text-stone-500 hidden sm:inline">|</span>
            <span class="text-stone-400">Selected paddle beers: <strong class="text-amber-400">{{ selectedPaddle().length }}/4</strong></span>
            @if (selectedPaddle().length > 0) {
              <button
                type="button"
                (click)="clearPaddle()"
                class="text-rose-400 hover:text-rose-300 underline text-[11px] ml-2">
                Clear Paddle
              </button>
            }
          </div>
        </div>

        <!-- Filter & Search Controls -->
        <div class="glass-panel p-4 rounded-2xl border border-amber-500/20 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Style Badges -->
          <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            @for (style of styles; track style) {
              <button
                type="button"
                (click)="activeStyle.set(style)"
                class="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all"
                [class]="activeStyle() === style ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'bg-stone-900/80 text-stone-300 hover:text-amber-300 hover:bg-stone-800'">
                {{ style }}
              </button>
            }
          </div>

          <!-- Search Input -->
          <div class="relative w-full md:w-72">
            <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">search</mat-icon>
            <input
              type="text"
              placeholder="Search brewery, beer, hops..."
              [value]="searchQuery()"
              (input)="updateSearch($event)"
              class="w-full bg-stone-900/90 text-stone-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-stone-800 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <!-- Tap Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          @for (beer of filteredBeers(); track beer.id) {
            <div class="glass-panel p-6 rounded-3xl border border-stone-800 hover:border-amber-500/40 transition-all duration-300 relative group overflow-hidden">
              
              <!-- Tap Number Pill & Status -->
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
                    #{{ beer.tapNumber }}
                  </div>
                  <div>
                    <span class="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                      {{ beer.brewery }} &bull; {{ beer.location }}
                    </span>
                    <h3 class="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                      {{ beer.name }}
                    </h3>
                  </div>
                </div>

                <div class="flex flex-col items-end flex-shrink-0">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    [class]="beer.status === 'Pouring Fresh' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'">
                    {{ beer.status }}
                  </span>
                  @if (beer.isLocalVictorian) {
                    <span class="text-[10px] text-stone-400 mt-1 flex items-center gap-0.5">
                      <mat-icon class="text-[11px] text-amber-400 scale-75">verified</mat-icon>
                      Victorian Craft
                    </span>
                  }
                </div>
              </div>

              <!-- Description -->
              <p class="text-xs text-stone-300 leading-relaxed mb-4">
                {{ beer.description }}
              </p>

              <!-- Tasting notes tags -->
              <div class="flex flex-wrap items-center gap-1.5 mb-5">
                <span class="text-[10px] text-stone-500 font-mono">Notes:</span>
                @for (note of beer.tastingNotes; track note) {
                  <span class="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-stone-300">
                    {{ note }}
                  </span>
                }
              </div>

              <!-- Specs & Pricing Bottom Bar -->
              <div class="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <!-- ABV & IBU -->
                <div class="flex items-center gap-3 font-mono text-stone-400">
                  <span><strong>{{ beer.abv }}%</strong> ABV</span>
                  @if (beer.ibu) {
                    <span>&bull;</span>
                    <span><strong>{{ beer.ibu }}</strong> IBU</span>
                  }
                </div>

                <!-- Pricing Pours -->
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-800 text-stone-200">
                    Pot: <strong class="text-amber-400">&#36;{{ beer.pricing.pot.toFixed(2) }}</strong>
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-800 text-stone-200">
                    Pint: <strong class="text-amber-400">&#36;{{ beer.pricing.pint.toFixed(2) }}</strong>
                  </span>
                  @if (beer.pricing.jug) {
                    <span class="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-800 text-stone-200 hidden sm:inline">
                      Jug: <strong class="text-amber-400">&#36;{{ beer.pricing.jug.toFixed(2) }}</strong>
                    </span>
                  }
                  
                  <!-- Add to paddle button -->
                  <button
                    type="button"
                    (click)="togglePaddle(beer)"
                    class="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border"
                    [class]="isBeerInPaddle(beer.id) ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold' : 'bg-transparent text-amber-300 border-amber-500/30 hover:border-amber-400 hover:bg-amber-950/40'">
                    {{ isBeerInPaddle(beer.id) ? 'In Paddle' : '+ Paddle' }}
                  </button>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Bottom CTA Strip -->
        <div class="mt-16 text-center glass-panel p-8 rounded-3xl border border-amber-500/30">
          <h2 class="text-2xl font-serif font-bold text-stone-100 mb-2">Want to Book a Table for a Tasting?</h2>
          <p class="text-xs text-stone-400 max-w-xl mx-auto mb-6">
            Reserve a cozy booth with friends, order pizza from next door, and taste your way through all 20 lines.
          </p>
          <div class="flex items-center justify-center gap-4">
            <a routerLink="/reservations"
              class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md">
              Book a Booth
            </a>
            <a routerLink="/cellar"
              class="px-6 py-3 text-xs font-semibold text-stone-200 hover:text-amber-300 border border-stone-700 hover:border-amber-400 rounded-xl transition-all">
              See Wine Cellar & Spirits &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
  `
})
export class TapList {
  venue = VENUE_INFO;
  beers = signal(TAP_LIST);
  activeStyle = signal('All');
  searchQuery = signal('');
  selectedPaddle = signal<string[]>([]);

  styles = ['All', 'Hazy IPA', 'West Coast IPA', 'Pale Ale', 'Lager', 'Stout', 'Sour', 'Cider', 'Cask Ale'];

  filteredBeers = computed(() => {
    const style = this.activeStyle();
    const query = this.searchQuery().toLowerCase().trim();

    return this.beers().filter(b => {
      const matchesStyle = style === 'All' || b.style === style;
      const matchesQuery = !query ||
        b.name.toLowerCase().includes(query) ||
        b.brewery.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.tastingNotes.some(n => n.toLowerCase().includes(query));
      return matchesStyle && matchesQuery;
    });
  });

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  togglePaddle(beer: TapBeer) {
    const current = this.selectedPaddle();
    if (current.includes(beer.id)) {
      this.selectedPaddle.set(current.filter(id => id !== beer.id));
    } else {
      if (current.length >= 4) {
        alert('Your tasting paddle already has 4 craft beers selected! Remove one to add this.');
        return;
      }
      this.selectedPaddle.set([...current, beer.id]);
    }
  }

  isBeerInPaddle(beerId: string): boolean {
    return this.selectedPaddle().includes(beerId);
  }

  clearPaddle() {
    this.selectedPaddle.set([]);
  }
}
