import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VENUE_INFO, WEEKLY_SPECIALS } from '../../core/venue.data';
import { getTodaySpecial } from '../../core/booking-rules';

@Component({
  selector: 'app-specials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Bar Atmosphere clearly visible -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.barAtmosphere"
          alt="Bar Counter Atmosphere"
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
            <mat-icon class="text-sm">local_activity</mat-icon>
            Weekly Lineup &amp; House Deals
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Regular Weekly Specials
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Every night has its own flavor at The Forager's Drop. From $6 shots to pub trivia battles and Sunday line-clean pots.
          </p>
        </div>

        <!-- Weekly Specials Cards -->
        <div class="space-y-8 mb-16">
          @for (special of specials; track special.day) {
            <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
              [class.border-amber-400]="isToday(special.dayIndex)">
              
              @if (isToday(special.dayIndex)) {
                <div class="absolute top-0 right-0 bg-amber-400 text-neutral-950 font-bold font-mono text-[10px] uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow">
                  Happening Today!
                </div>
              }

              <!-- Left Info -->
              <div class="space-y-3 w-full md:w-2/3">
                <div class="flex items-center gap-3">
                  <span class="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                    {{ special.day }}
                  </span>
                  <span class="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-500/30">
                    {{ special.badge }}
                  </span>
                </div>
                <h3 class="text-2xl font-serif font-bold text-stone-100">{{ special.title }}</h3>
                <p class="text-xs font-mono text-stone-400">Hours: {{ special.timeWindow }}</p>
                <p class="text-xs text-stone-300 leading-relaxed max-w-2xl">{{ special.description }}</p>
                
                <div class="flex flex-wrap gap-2 pt-2">
                  @for (hl of special.highlights; track hl) {
                    <span class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300 flex items-center gap-1.5">
                      <mat-icon class="text-amber-400 text-xs">check</mat-icon>
                      {{ hl }}
                    </span>
                  }
                </div>
              </div>

              <!-- Right Action -->
              <div class="flex flex-col sm:flex-row md:flex-col items-center gap-3 w-full md:w-auto flex-shrink-0">
                <a routerLink="/reservations"
                  class="w-full md:w-44 py-3 text-center text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md">
                  Book For {{ special.day }}
                </a>
                <a routerLink="/tap-list"
                  class="w-full md:w-44 py-2.5 text-center text-xs font-semibold text-stone-300 hover:text-white border border-stone-700 hover:border-amber-400 rounded-xl transition-all">
                  See Tap List
                </a>
              </div>

            </div>
          }
        </div>

        <!-- Operating Hours Schedule Table -->
        <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-stone-800 mb-16 max-w-3xl mx-auto">
          <h2 class="text-2xl font-serif font-bold text-stone-100 mb-6 text-center">
            Standard Trading Hours
          </h2>
          <div class="space-y-3">
            @for (h of venue.hours; track h.day) {
              <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800/80 pb-3 gap-1">
                <span class="font-serif font-bold text-stone-200 text-sm">{{ h.day }}</span>
                <span class="font-mono text-amber-300 text-xs font-medium">{{ h.display }}</span>
                <span class="text-[11px] text-stone-400 italic">{{ h.notes }}</span>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class Specials {
  venue = VENUE_INFO;
  specials = WEEKLY_SPECIALS;
  todaySpecial = getTodaySpecial();

  isToday(dayIndex: number): boolean {
    return new Date().getDay() === dayIndex;
  }
}
