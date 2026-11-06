import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VENUE_INFO, FUNCTION_PACKAGES } from '../../core/venue.data';
import { recommendSpaceForGuests } from '../../core/booking-rules';

@Component({
  selector: 'app-catering-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Bar Interior & Atmosphere clearly visible -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.barInterior"
          alt="Functions Venue Atmosphere"
          class="w-full h-full object-cover object-center opacity-50 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Title & Header -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-4">
            <mat-icon class="text-sm">celebration</mat-icon>
            Zero Room Hire Fee &bull; Self-Catered or Catered
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Functions &amp; Private Gatherings
          </h1>

          <div class="p-6 rounded-2xl glass-panel border border-amber-500/30 max-w-2xl mx-auto text-center mt-4">
            <p class="text-sm sm:text-base text-stone-200 font-serif italic">
              &ldquo;We would love to host your event. We take all the stress out of a 21st, 30th, 40th, 50th Birthday, Work Break-up, Hens, Bucks, or any other gathering. <strong>No venue hire charge</strong> — self-catered and catered options.&rdquo;
            </p>
            <div class="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-amber-300">
              <mat-icon class="text-sm">call</mat-icon>
              <span>Direct Event Line: 0415 727 988</span>
            </div>
          </div>
        </div>

        <!-- Original Floor Plan Graphic Banner -->
        <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-800 mb-16 max-w-4xl mx-auto text-center">
          <h2 class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
            Venue Layout &amp; Event Spaces
          </h2>
          <div class="rounded-2xl overflow-hidden bg-neutral-900 border border-stone-800 p-2 shadow-2xl flex items-center justify-center">
            <img
              [src]="venue.images.floorPlan"
              alt="The Forager's Drop Venue Floor Plan & Easy Menus"
              class="max-h-96 w-auto object-contain mx-auto rounded-xl"
              referrerpolicy="no-referrer"
            />
          </div>
          <p class="text-xs text-stone-400 mt-4 max-w-xl mx-auto">
            From the intimate front lounge booths to the covered outdoor beer garden courtyard and our dedicated pool room, our layout flexibly configures for parties from 10 to 120 guests.
          </p>
        </div>

        <!-- 3 Function Package Tiers -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          @for (pkg of packages; track pkg.title) {
            <div class="glass-panel p-8 rounded-3xl border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between relative group">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-amber-400 mb-3">
                  <span>{{ pkg.capacity }}</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                    {{ pkg.hireFee }}
                  </span>
                </div>
                <h3 class="text-2xl font-serif font-bold text-stone-100 mb-2">
                  {{ pkg.title }}
                </h3>
                <p class="text-xs text-amber-300 font-mono mb-4">{{ pkg.space }}</p>
                <p class="text-xs text-stone-300 leading-relaxed mb-6">
                  {{ pkg.description }}
                </p>

                <h4 class="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-3 font-mono">
                  What's Included:
                </h4>
                <ul class="space-y-2 mb-6">
                  @for (feat of pkg.features; track feat) {
                    <li class="flex items-start gap-2 text-xs text-stone-300">
                      <mat-icon class="text-amber-400 text-sm flex-shrink-0 mt-0.5">check_circle</mat-icon>
                      <span>{{ feat }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="pt-6 border-t border-stone-800/80">
                <button
                  type="button"
                  (click)="prefillPackage(pkg.title)"
                  class="w-full py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md">
                  Inquire For This Package
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Event Inquiry & Space Recommendation Tool -->
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 max-w-3xl mx-auto shadow-2xl">
          <div class="text-center mb-8">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Instant Function Inquiry Form
            </h2>
            <p class="text-xs text-stone-400 mt-1">
              Zero booking fees. Our venue coordinator will review and reply within 24 hours.
            </p>
          </div>

          @if (inquirySubmitted()) {
            <div class="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
              <mat-icon class="text-4xl text-emerald-400">task_alt</mat-icon>
              <h3 class="text-2xl font-serif font-bold text-stone-100">Inquiry Received!</h3>
              <p class="text-xs text-stone-300 max-w-md mx-auto">
                Thank you! We have logged your event request for <strong>{{ inquiryForm.value.guests }} guests</strong> on <strong>{{ inquiryForm.value.date }}</strong>. Our team will contact you at <strong>{{ inquiryForm.value.phone }}</strong>.
              </p>
              <button
                type="button"
                (click)="resetInquiry()"
                class="px-5 py-2 text-xs font-semibold text-stone-300 border border-stone-700 rounded-xl hover:text-white">
                Submit Another Request
              </button>
            </div>
          } @else {
            <form [formGroup]="inquiryForm" (ngSubmit)="submitInquiry()" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="organizerName" class="block text-xs font-medium text-stone-300 mb-1">Organizer Full Name *</label>
                  <input
                    id="organizerName"
                    type="text"
                    formControlName="organizerName"
                    placeholder="e.g. Sam Taylor"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-xs font-medium text-stone-300 mb-1">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    formControlName="phone"
                    placeholder="0415 000 000"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="block text-xs font-medium text-stone-300 mb-1">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    placeholder="sam@example.com"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="eventType" class="block text-xs font-medium text-stone-300 mb-1">Event Type *</label>
                  <select
                    id="eventType"
                    formControlName="eventType"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400">
                    <option value="Birthday Milestone">Birthday Milestone (21st, 30th, 40th, etc.)</option>
                    <option value="Hens or Bucks Gathering">Hens or Bucks Gathering</option>
                    <option value="Work Breakup / Corporate">Work Breakup / Corporate Gathering</option>
                    <option value="Casual Group Catchup">Casual Group Catchup (15+)</option>
                    <option value="Full Venue Buyout">Full Venue Buyout</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="guests" class="block text-xs font-medium text-stone-300 mb-1">Estimated Guests (10 to 120) *</label>
                  <input
                    id="guests"
                    type="number"
                    formControlName="guests"
                    min="10"
                    max="130"
                    (input)="onGuestsChange()"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="date" class="block text-xs font-medium text-stone-300 mb-1">Preferred Date *</label>
                  <input
                    id="date"
                    type="date"
                    formControlName="date"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <!-- Live Space Recommendation Preview -->
              @if (recommendation()) {
                <div class="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs flex items-start gap-3">
                  <mat-icon class="text-amber-400 text-sm mt-0.5">info</mat-icon>
                  <div>
                    <span class="font-bold text-amber-300">Recommended Space:</span>
                    <strong class="text-stone-100 ml-1">{{ recommendation()?.recommendedSpace }}</strong>
                    <p class="text-stone-300 mt-1">{{ recommendation()?.notes }}</p>
                  </div>
                </div>
              }

              <div>
                <label for="notes" class="block text-xs font-medium text-stone-300 mb-1">Event Notes, Food Preferences, or Special Requests</label>
                <textarea
                  id="notes"
                  rows="3"
                  formControlName="notes"
                  placeholder="e.g. Planning to order 10 pizzas from next door, want a $500 bar tab, need speech mic..."
                  class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"></textarea>
              </div>

              <button
                type="submit"
                [disabled]="inquiryForm.invalid"
                class="w-full py-4 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-xl">
                Submit Function Inquiry ($0 Venue Hire)
              </button>
            </form>
          }
        </div>

      </div>
    </div>
  `
})
export class CateringEvents {
  venue = VENUE_INFO;
  packages = FUNCTION_PACKAGES;
  inquirySubmitted = signal(false);
  recommendation = signal<ReturnType<typeof recommendSpaceForGuests> | null>(null);

  inquiryForm = new FormGroup({
    organizerName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    eventType: new FormControl('Birthday Milestone', [Validators.required]),
    guests: new FormControl(30, [Validators.required, Validators.min(10)]),
    date: new FormControl('', [Validators.required]),
    notes: new FormControl('')
  });

  constructor() {
    this.onGuestsChange();
  }

  onGuestsChange() {
    const guests = this.inquiryForm.value.guests || 30;
    const rec = recommendSpaceForGuests(guests, this.inquiryForm.value.eventType || '');
    this.recommendation.set(rec);
  }

  prefillPackage(packageTitle: string) {
    if (packageTitle.includes('Casual')) {
      this.inquiryForm.patchValue({ eventType: 'Casual Group Catchup', guests: 20 });
    } else if (packageTitle.includes('Milestone')) {
      this.inquiryForm.patchValue({ eventType: 'Birthday Milestone', guests: 45 });
    } else {
      this.inquiryForm.patchValue({ eventType: 'Full Venue Buyout', guests: 100 });
    }
    this.onGuestsChange();
    // Smooth scroll down to inquiry form
    window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
  }

  submitInquiry() {
    if (this.inquiryForm.valid) {
      this.inquirySubmitted.set(true);
    }
  }

  resetInquiry() {
    this.inquiryForm.reset({
      organizerName: '',
      phone: '',
      email: '',
      eventType: 'Birthday Milestone',
      guests: 30,
      date: '',
      notes: ''
    });
    this.inquirySubmitted.set(false);
    this.onGuestsChange();
  }
}
