import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO, WINE_LIST, COCKTAIL_LIST } from '../../core/venue.data';

@Component({
  selector: 'app-cellar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Authentic Wine Cellar clearly visible in atmospheric detail -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.barAtmosphere"
          alt="Rustic Timber Bar Counter & Spirits"
          class="w-full h-full object-cover object-center opacity-50 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Page Title & Philosophy -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-purple-950/80 text-purple-300 border border-purple-500/30 mb-4">
            <mat-icon class="text-sm">wine_bar</mat-icon>
            Artisanal Cellar & Spirits
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            The Wine Cellar & Crafted Spirits
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            From our legendary winter house mulled wine and sunlit courtyard sangrias to cool-climate Yarra Valley Pinot Noirs and Melbourne single malts.
          </p>
        </div>

        <!-- Seasonal Highlights Feature Banner (Mulled Wine & Sangria) -->
        <div class="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- House Mulled Wine -->
          <div class="glass-panel p-8 rounded-3xl border border-rose-900/40 relative overflow-hidden bg-gradient-to-br from-rose-950/40 via-stone-900/60 to-neutral-950 shadow-2xl">
            <div class="flex items-start justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Winter Signature &bull; Cult Favorite
              </span>
              <span class="text-lg font-serif font-bold text-amber-300">$14 Glass / $48 Carafe</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mb-2">
              Forager's House Mulled Wine
            </h3>
            <p class="text-xs text-amber-200 font-serif italic mb-3">
              &ldquo;Mulled Wine is to die for! Slow-simmered all day to warm your soul.&rdquo;
            </p>
            <p class="text-xs text-stone-300 leading-relaxed mb-4">
              Steeped with Yarra Valley Shiraz, freshly carved whole orange wheels, cinnamon quills, star anise, cloves, and finished with a rich pour of Victorian small-batch brandy. Served steaming in heavy glassware.
            </p>
            <div class="pt-4 border-t border-rose-900/40 flex items-center justify-between text-xs text-stone-400">
              <span class="font-mono text-rose-300">Available: Winter Months & Specials</span>
              <a routerLink="/reservations" class="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                Reserve a Fireside Booth &rarr;
              </a>
            </div>
          </div>

          <!-- Courtyard Sangria -->
          <div class="glass-panel p-8 rounded-3xl border border-amber-900/40 relative overflow-hidden bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-neutral-950 shadow-2xl">
            <div class="flex items-start justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Summer Patio Edition
              </span>
              <span class="text-lg font-serif font-bold text-amber-300">$13 Glass / $44 Jug</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mb-2">
              Courtyard Berry & Citrus Sangria
            </h3>
            <p class="text-xs text-amber-200 font-serif italic mb-3">
              &ldquo;Sangria in Summer in our leafy beer garden... best shared with friends.&rdquo;
            </p>
            <p class="text-xs text-stone-300 leading-relaxed mb-4">
              Macerated seasonal strawberries, Valencia orange slices, triple sec, craft sweet vermouth, and crisp ginger beer spritz over ice. Crisp, refreshing, and dangerously drinkable on warm evenings.
            </p>
            <div class="pt-4 border-t border-amber-900/40 flex items-center justify-between text-xs text-stone-400">
              <span class="font-mono text-amber-300">Sunday Special: 2-for-1 from 3 PM</span>
              <a routerLink="/reservations" class="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                Book Garden Table &rarr;
              </a>
            </div>
          </div>
        </div>

        <!-- Curated Victorian Wines List -->
        <div class="mb-20">
          <div class="flex items-center justify-between mb-8 pb-3 border-b border-stone-800">
            <div>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Victorian Natural & Estate Wines
              </h2>
              <p class="text-xs text-stone-400 mt-1">
                Hand-selected bottles from low-intervention Yarra Valley, King Valley, and Macedon Ranges winemakers.
              </p>
            </div>
            <span class="text-xs font-mono text-amber-400 font-semibold hidden sm:inline">
              Glass / Bottle Pricing
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (wine of wines; track wine.id) {
              <div class="glass-panel p-6 rounded-2xl border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                        {{ wine.winery }} &bull; {{ wine.region }}
                      </span>
                      <h4 class="text-lg font-serif font-bold text-stone-100 mt-0.5">
                        {{ wine.name }}
                      </h4>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <div class="text-amber-300 font-mono font-bold text-sm">
                        &#36;{{ wine.glassPrice.toFixed(2) }} <span class="text-xs text-stone-500">gls</span>
                      </div>
                      <div class="text-stone-400 font-mono text-xs">
                        &#36;{{ wine.bottlePrice.toFixed(2) }} <span class="text-[10px] text-stone-600">btl</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-stone-300 leading-relaxed mb-4">
                    {{ wine.description }}
                  </p>
                </div>
                <div class="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span class="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                    {{ wine.type }}
                  </span>
                  <span>Chilled to optimal temperature</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Artisanal Cocktails & Craft Spirits -->
        <div class="mb-16">
          <div class="flex items-center justify-between mb-8 pb-3 border-b border-stone-800">
            <div>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Craft Cocktails & Distilled Spirits
              </h2>
              <p class="text-xs text-stone-400 mt-1">
                Featuring Starward Melbourne Whisky, Four Pillars Yarra Valley Gin, and small-batch Australian liqueurs.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (cocktail of cocktails; track cocktail.id) {
              <div class="glass-panel p-6 rounded-2xl border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <h4 class="text-lg font-serif font-bold text-stone-100">
                      {{ cocktail.name }}
                    </h4>
                    <span class="text-amber-300 font-mono font-bold text-sm flex-shrink-0">
                      &#36;{{ cocktail.glassPrice.toFixed(2) }}
                    </span>
                  </div>
                  <p class="text-[11px] font-mono text-amber-400/90 mb-3">
                    {{ cocktail.ingredients }}
                  </p>
                  <p class="text-xs text-stone-300 leading-relaxed mb-4">
                    {{ cocktail.description }}
                  </p>
                </div>
                <div class="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span class="text-stone-400">Base: {{ cocktail.spiritBase }}</span>
                  @if (cocktail.tag) {
                    <span class="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold uppercase">
                      {{ cocktail.tag }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Cellar Bottom Portal -->
        <div class="glass-panel p-8 rounded-3xl border border-amber-500/30 text-center">
          <h3 class="text-2xl font-serif font-bold text-stone-100 mb-2">Join Us for a Wine & Spirit Session</h3>
          <p class="text-xs text-stone-400 max-w-xl mx-auto mb-6">
            Whether for a quiet glass after work or an anniversary celebration, our team is ready to pour.
          </p>
          <div class="flex items-center justify-center gap-4">
            <a routerLink="/reservations"
              class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md">
              Reserve Your Table
            </a>
            <a routerLink="/food"
              class="px-6 py-3 text-xs font-semibold text-stone-300 hover:text-white border border-stone-700 rounded-xl hover:border-amber-400 transition-all">
              Explore Food Options &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
  `
})
export class Cellar {
  venue = VENUE_INFO;
  wines = WINE_LIST;
  cocktails = COCKTAIL_LIST;
}
