import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO } from '../../core/venue.data';

@Component({
  selector: 'app-trivia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Trivia Night Atmosphere clearly visible -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.barAtmosphere"
          alt="Trivia Event Rustic Bar Counter"
          class="w-full h-full object-cover object-center opacity-50 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Title & Header -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400 text-neutral-950 mb-4 shadow">
            <mat-icon class="text-sm">quiz</mat-icon>
            Every Wednesday Night &bull; 7:00 PM Seating
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Wednesday Pub Trivia
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Hands down Melbourne's most entertaining, irreverent trivia night. Free team entry, massive bar tabs for the champions, and zero dry corporate boredom.
          </p>
        </div>

        <!-- Two Featured Original Flyers Side-by-Side (TRIVIA.jpg & R-Rating Rules) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <!-- Original Trivia Poster -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col items-center text-center">
            <div class="w-full h-80 rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-stone-800 shadow-xl flex items-center justify-center">
              <img
                [src]="venue.images.triviaFlyer"
                alt="Official Pub Trivia Event Poster"
                class="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                referrerpolicy="no-referrer"
              />
            </div>
            <h3 class="text-2xl font-serif font-bold text-stone-100 mb-2">Pub Trivia Nights</h3>
            <p class="text-xs text-stone-300 leading-relaxed max-w-md mb-4">
              Gather your sharpest mates, order a few pints and pizzas, and prepare for battle across pop culture, soundbites, history, and savage tiebreakers.
            </p>
            <div class="inline-flex items-center gap-2 text-xs text-amber-300 font-mono">
              <mat-icon class="text-sm">military_tech</mat-icon>
              1st Prize: $100 Bar Tab &bull; 2nd: Craft Beer Pack &bull; Best Team Name Prize
            </div>
          </div>

          <!-- Original R-Rating Restrictions Poster -->
          <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col items-center text-center">
            <div class="w-full h-80 rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-stone-800 shadow-xl flex items-center justify-center">
              <img
                [src]="venue.images.triviaRules"
                alt="Original R-Rated Trivia Restrictions Notice"
                class="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                referrerpolicy="no-referrer"
              />
            </div>
            <h3 class="text-2xl font-serif font-bold text-stone-100 mb-2">Notice: Adult Themed Banter</h3>
            <p class="text-xs text-stone-300 leading-relaxed max-w-md mb-4">
              As prominently posted on our venue doors: our trivia host doesn't hold back. Adult humor, coarse language, and hysterical banter are all part of the tradition!
            </p>
            <div class="inline-flex items-center gap-2 text-xs text-amber-300 font-mono">
              <mat-icon class="text-sm">explicit</mat-icon>
              18+ Event Recommended &bull; Good Times Guaranteed
            </div>
          </div>

        </div>

        <!-- Upcoming Trivia Schedule & Dates -->
        <div class="glass-panel p-8 rounded-3xl border border-stone-800 mb-16">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
            <div>
              <h2 class="text-2xl font-serif font-bold text-stone-100">
                Upcoming Trivia Dates & Themes
              </h2>
              <p class="text-xs text-stone-400 mt-1">
                Booths fill up every single Wednesday. Advance table bookings are strongly advised.
              </p>
            </div>
            <a routerLink="/reservations"
              class="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md">
              Book a Trivia Booth
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-5 rounded-2xl bg-neutral-900/80 border border-amber-500/30 relative">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-neutral-950 uppercase font-mono mb-2 inline-block">Next Wed</span>
              <h4 class="font-serif font-bold text-stone-100 text-base">Classic General Knowledge & 90s Music</h4>
              <p class="text-xs text-stone-400 mt-1">Wednesday, 7:00 PM Seating</p>
              <p class="text-[11px] text-amber-300 mt-2 font-mono">Limited Booths Remaining</p>
            </div>

            <div class="p-5 rounded-2xl bg-neutral-900/80 border border-stone-800 relative">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 uppercase font-mono mb-2 inline-block">Following Wed</span>
              <h4 class="font-serif font-bold text-stone-100 text-base">Cult TV & Movie Blockbusters</h4>
              <p class="text-xs text-stone-400 mt-1">Wednesday, 7:00 PM Seating</p>
              <p class="text-[11px] text-stone-500 mt-2 font-mono">Registration Open</p>
            </div>

            <div class="p-5 rounded-2xl bg-neutral-900/80 border border-stone-800 relative">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 uppercase font-mono mb-2 inline-block">Following Wed</span>
              <h4 class="font-serif font-bold text-stone-100 text-base">Music Trivia & Album Art Match</h4>
              <p class="text-xs text-stone-400 mt-1">Wednesday, 7:00 PM Seating</p>
              <p class="text-[11px] text-stone-500 mt-2 font-mono">Registration Open</p>
            </div>

            <div class="p-5 rounded-2xl bg-neutral-900/80 border border-stone-800 relative">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 uppercase font-mono mb-2 inline-block">Following Wed</span>
              <h4 class="font-serif font-bold text-stone-100 text-base">Australiana & True Crime Trivia</h4>
              <p class="text-xs text-stone-400 mt-1">Wednesday, 7:00 PM Seating</p>
              <p class="text-[11px] text-stone-500 mt-2 font-mono">Registration Open</p>
            </div>
          </div>
        </div>

        <!-- Trivia Booking CTA -->
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center max-w-2xl mx-auto">
          <div class="w-14 h-14 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/40">
            <mat-icon class="text-2xl">groups</mat-icon>
          </div>
          <h3 class="text-2xl font-serif font-bold text-stone-100 mb-2">Lock in Your Trivia Team Table</h3>
          <p class="text-xs text-stone-300 mb-6 leading-relaxed">
            Tell us your team name, approximate squad size (2 to 12 players), and we will hold the best booth with prime audio and viewing.
          </p>
          <a routerLink="/reservations"
            class="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-xl inline-flex items-center gap-2">
            <mat-icon class="text-base">event</mat-icon>
            Reserve Trivia Table
          </a>
        </div>

      </div>
    </div>
  `
})
export class Trivia {
  venue = VENUE_INFO;
}
