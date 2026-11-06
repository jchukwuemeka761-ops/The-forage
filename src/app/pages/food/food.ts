import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO, PARTNER_FOOD, IN_BAR_SNACKS } from '../../core/venue.data';

@Component({
  selector: 'app-food',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Bar Atmosphere & Food Map clearly visible in ambient warmth -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.foodMap"
          alt="Neighborhood Food Map"
          class="w-full h-full object-cover object-center opacity-50 filter contrast-115 brightness-90 saturate-105"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Content Container -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Title & The Unique Philosophy -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 mb-4">
            <mat-icon class="text-sm">restaurant</mat-icon>
            The Ultimate BYO Dining Culture
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            In-Bar Food &amp; Neighbor Menus
          </h1>

          <div class="p-6 rounded-2xl glass-panel border border-amber-500/30 max-w-3xl mx-auto text-left mt-6">
            <p class="text-xs sm:text-sm text-stone-200 leading-relaxed italic font-serif">
              &ldquo;We are completely surrounded by all the food you can imagine! Rather than work against our neighbours, we believe in getting everybody together and focusing on our own individual skill sets: <strong>they do the Food, We do atmosphere and Booze</strong>. We encourage meals from any provider to be brought in and consumed on site. This makes our menu the largest, most tailored dining experience anywhere.&rdquo;
            </p>
          </div>
        </div>

        <!-- 4 Easy Steps Workflow from Original Website -->
        <div class="mb-16">
          <h2 class="text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-bold mb-8">
            How It Works &bull; As Easy As 1-2-3-4
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="glass-panel p-6 rounded-2xl border border-stone-800 text-center relative">
              <div class="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 font-bold font-mono text-base flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h3 class="font-serif font-bold text-stone-100 text-base mb-1">Step 1: Order Drinks</h3>
              <p class="text-xs text-stone-400">Head to the bar, grab a pint of craft beer on tap, a glass of Yarra Valley wine, or order a cocktail.</p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border border-stone-800 text-center relative">
              <div class="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 font-bold font-mono text-base flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h3 class="font-serif font-bold text-stone-100 text-base mb-1">Step 2: Ring & Order Food</h3>
              <p class="text-xs text-stone-400">Scan or call any of our surrounding restaurant partners—woodfired pizza, Asian dumplings, noodles, or burgers.</p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border border-stone-800 text-center relative">
              <div class="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 font-bold font-mono text-base flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h3 class="font-serif font-bold text-stone-100 text-base mb-1">Step 3: Collect or Delivered</h3>
              <p class="text-xs text-stone-400">Take a 60-second stroll to pick it up hot, or have it delivered directly to your booth table inside the bar.</p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border border-stone-800 text-center relative">
              <div class="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 font-bold font-mono text-base flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h3 class="font-serif font-bold text-stone-100 text-base mb-1">Step 4: Feast & Enjoy</h3>
              <p class="text-xs text-stone-400">Eat the delicious hot food, drink the cold craft drinks, play pool, and relax with friends.</p>
            </div>
          </div>
        </div>

        <!-- Featured Partner Special: Mr & Mrs Pizza (Original Image & Deal) -->
        <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/40 mb-16 bg-gradient-to-r from-amber-950/50 via-stone-900/80 to-amber-950/50 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-5 flex justify-center">
              <img
                [src]="venue.images.pizzaPartner"
                alt="Mr and Mrs Pizza and Foragers Friday Deal"
                class="rounded-2xl max-h-72 w-auto object-contain shadow-2xl border border-amber-500/30"
                referrerpolicy="no-referrer"
              />
            </div>
            <div class="lg:col-span-7 space-y-4">
              <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wide">
                Official Neighborhood Partner Deal
              </div>
              <h2 class="text-3xl font-serif font-bold text-stone-100">
                Mr & Mrs Pizza / Foragers Friday Deal
              </h2>
              <p class="text-amber-300 font-mono text-sm font-semibold">
                Any Pizza at Foragers between Noon &amp; 4:00 PM on any Friday = $10 Pint of Lager or Pale Ale!
              </p>
              <p class="text-xs text-stone-300 leading-relaxed">
                Located right next door at 501 Whitehorse Road. Step into Forager's, order a hot artisan Margherita, Truffle Mushroom, or spicy Calabrese pizza, show your receipt, and enjoy fresh independent Victorian pints for just $10.
              </p>
              <div class="pt-2 flex flex-wrap items-center gap-4">
                <a href="tel:0398741234"
                  class="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2">
                  <mat-icon class="text-sm">call</mat-icon>
                  Call Mr & Mrs Pizza: (03) 9874 1234
                </a>
                <a routerLink="/reservations"
                  class="px-5 py-2.5 text-xs font-semibold text-stone-200 border border-stone-700 hover:border-amber-400 rounded-xl transition-all">
                  Book Friday Lunch Table
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Neighborhood Partners Directory -->
        <div class="mb-16">
          <div class="flex items-center justify-between mb-8 pb-3 border-b border-stone-800">
            <div>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                Local Whitehorse Road Food Directory
              </h2>
              <p class="text-xs text-stone-400 mt-1">
                All located within 1-2 minutes walk. Order takeout directly to your table at The Forager's Drop.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (partner of partners; track partner.id) {
              <div class="glass-panel p-6 rounded-2xl border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-2">
                    <span>{{ partner.cuisine }}</span>
                    <span>{{ partner.walkingMinutes }} min walk</span>
                  </div>
                  <h3 class="text-xl font-serif font-bold text-stone-100 mb-1">
                    {{ partner.restaurantName }}
                  </h3>
                  <p class="text-xs text-stone-400 mb-4">{{ partner.address }}</p>

                  <h4 class="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">Popular Dishes:</h4>
                  <ul class="space-y-2 mb-4">
                    @for (dish of partner.popularDishes; track dish.name) {
                      <li class="border-b border-stone-900 pb-1.5 text-xs">
                        <div class="flex justify-between font-medium text-stone-200">
                          <span>{{ dish.name }}</span>
                          <span class="text-amber-300 font-mono">{{ dish.price }}</span>
                        </div>
                        <p class="text-[11px] text-stone-500 mt-0.5">{{ dish.description }}</p>
                      </li>
                    }
                  </ul>
                </div>

                <div class="pt-4 border-t border-stone-800/80">
                  <a [href]="'tel:' + partner.phone.replace(/[^0-9]/g, '')"
                    class="w-full py-2 text-xs font-semibold text-center text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-xl hover:bg-amber-900/50 transition-all block">
                    Order via Phone: {{ partner.phone }}
                  </a>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- In-House Artisan Bar Snacks & Nibbles -->
        <div class="glass-panel p-8 rounded-3xl border border-stone-800 mb-16">
          <div class="text-center max-w-xl mx-auto mb-8">
            <h2 class="text-2xl font-serif font-bold text-stone-100">
              In-House Artisan Bar Snacks &amp; Nibbles
            </h2>
            <p class="text-xs text-stone-400 mt-1">
              &ldquo;We do provide snacks and nibbles and would appreciate outside snacks not being brought in.&rdquo;
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (snack of inBarSnacks; track snack.name) {
              <div class="p-5 rounded-2xl bg-neutral-900/90 border border-stone-800/80">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-serif font-bold text-stone-100 text-sm">{{ snack.name }}</h3>
                  <span class="text-amber-400 font-mono font-bold text-sm">{{ snack.price }}</span>
                </div>
                <p class="text-xs text-stone-400 leading-relaxed">{{ snack.description }}</p>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class Food {
  venue = VENUE_INFO;
  partners = PARTNER_FOOD;
  inBarSnacks = IN_BAR_SNACKS;
}
