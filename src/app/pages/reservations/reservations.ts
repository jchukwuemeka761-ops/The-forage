import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VENUE_INFO } from '../../core/venue.data';
import { generateReservationCode } from '../../core/booking-rules';
import { ReservationRequest } from '../../core/venue.model';

@Component({
  selector: 'app-reservations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Bar Interior & Seating, clearly visible in rich atmosphere -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.barInterior"
          alt="The Forager's Drop Interior and Seating"
          class="w-full h-full object-cover object-center opacity-55 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/55 via-neutral-950/70 to-neutral-950/90"></div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400 text-neutral-950 mb-4 shadow">
            <mat-icon class="text-sm">event</mat-icon>
            Table &amp; Booth Reservations
          </div>
          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Reserve Your Space
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Whether for a quiet craft pint, a date night over natural wine, or a group trivia feast with pizza from next door.
          </p>
        </div>

        <!-- Seating Areas Preview Cards (Using authentic pictures of the venue) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <button
            type="button"
            (click)="selectArea('Cozy Interior Booth')"
            class="p-4 rounded-2xl glass-panel border cursor-pointer transition-all duration-300 text-center w-full focus:outline-none"
            [class]="reservationForm.value.seatingArea === 'Cozy Interior Booth' ? 'border-amber-400 bg-amber-950/50 shadow-lg' : 'border-stone-800 hover:border-stone-600'">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-2">
              <mat-icon class="text-base">weekend</mat-icon>
            </div>
            <h4 class="font-serif font-bold text-stone-100 text-xs">Cozy Booths</h4>
            <p class="text-[10px] text-stone-400 mt-0.5">Eclectic vintage velvet</p>
          </button>

          <button
            type="button"
            (click)="selectArea('Covered Beer Garden')"
            class="p-4 rounded-2xl glass-panel border cursor-pointer transition-all duration-300 text-center w-full focus:outline-none"
            [class]="reservationForm.value.seatingArea === 'Covered Beer Garden' ? 'border-amber-400 bg-amber-950/50 shadow-lg' : 'border-stone-800 hover:border-stone-600'">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-2">
              <mat-icon class="text-base">deck</mat-icon>
            </div>
            <h4 class="font-serif font-bold text-stone-100 text-xs">Beer Garden</h4>
            <p class="text-[10px] text-stone-400 mt-0.5">Leafy patio courtyard</p>
          </button>

          <button
            type="button"
            (click)="selectArea('Pool Table Lounge')"
            class="p-4 rounded-2xl glass-panel border cursor-pointer transition-all duration-300 text-center w-full focus:outline-none"
            [class]="reservationForm.value.seatingArea === 'Pool Table Lounge' ? 'border-amber-400 bg-amber-950/50 shadow-lg' : 'border-stone-800 hover:border-stone-600'">
            <div class="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center mx-auto mb-2">
              <mat-icon class="text-base">sports_bar</mat-icon>
            </div>
            <h4 class="font-serif font-bold text-stone-100 text-xs">Pool Lounge</h4>
            <p class="text-[10px] text-stone-400 mt-0.5">Next to our slate table</p>
          </button>

          <button
            type="button"
            (click)="selectArea('Main Bar High-Tops')"
            class="p-4 rounded-2xl glass-panel border cursor-pointer transition-all duration-300 text-center w-full focus:outline-none"
            [class]="reservationForm.value.seatingArea === 'Main Bar High-Tops' ? 'border-amber-400 bg-amber-950/50 shadow-lg' : 'border-stone-800 hover:border-stone-600'">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto mb-2">
              <mat-icon class="text-base">table_restaurant</mat-icon>
            </div>
            <h4 class="font-serif font-bold text-stone-100 text-xs">Main Bar Highs</h4>
            <p class="text-[10px] text-stone-400 mt-0.5">Direct line to 20 taps</p>
          </button>
        </div>

        <!-- Reservation Confirmation State -->
        @if (confirmedBooking()) {
          <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-400 text-center space-y-6 max-w-2xl mx-auto shadow-2xl bg-neutral-900/90">
            <div class="w-16 h-16 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center mx-auto shadow-lg">
              <mat-icon class="text-3xl">done_all</mat-icon>
            </div>
            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Reservation Confirmed
              </span>
              <h2 class="text-3xl font-serif font-bold text-stone-100">
                We're Saving Your Spot, {{ confirmedBooking()?.guestName }}!
              </h2>
            </div>

            <div class="p-6 rounded-2xl bg-neutral-950 border border-stone-800 text-left space-y-3 font-mono text-xs">
              <div class="flex justify-between border-b border-stone-800 pb-2">
                <span class="text-stone-400">Reference Code:</span>
                <span class="text-amber-400 font-bold text-sm">{{ confirmationCode() }}</span>
              </div>
              <div class="flex justify-between border-b border-stone-800 pb-2">
                <span class="text-stone-400">Date &amp; Time:</span>
                <span class="text-stone-200">{{ confirmedBooking()?.date }} at {{ confirmedBooking()?.time }}</span>
              </div>
              <div class="flex justify-between border-b border-stone-800 pb-2">
                <span class="text-stone-400">Guests &amp; Area:</span>
                <span class="text-stone-200">{{ confirmedBooking()?.guests }} Guests &bull; {{ confirmedBooking()?.seatingArea }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-400">Venue Address:</span>
                <span class="text-stone-200">499A Whitehorse Rd, Mitcham</span>
              </div>
            </div>

            <p class="text-xs text-stone-400 leading-relaxed max-w-md mx-auto">
              A confirmation has been recorded. Feel free to call us at <strong class="text-amber-300">0415 727 988</strong> if your guest count changes. Remember you can order takeout pizza from Mr & Mrs Pizza next door straight to your table!
            </p>

            <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a routerLink="/location"
                class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-2">
                <mat-icon class="text-sm">near_me</mat-icon>
                Get Driving Directions
              </a>
              <button
                type="button"
                (click)="resetForm()"
                class="px-5 py-3 text-xs font-semibold text-stone-300 border border-stone-700 hover:border-amber-400 rounded-xl transition-all">
                Make Another Booking
              </button>
            </div>
          </div>
        } @else {
          <!-- Booking Form -->
          <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl">
            <form [formGroup]="reservationForm" (ngSubmit)="submitReservation()" class="space-y-6">
              
              <!-- Personal Details -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label for="resGuestName" class="block text-xs font-medium text-stone-300 mb-1">Your Full Name *</label>
                  <input
                    id="resGuestName"
                    type="text"
                    formControlName="guestName"
                    placeholder="e.g. Liam Foster"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="resPhone" class="block text-xs font-medium text-stone-300 mb-1">Mobile Phone *</label>
                  <input
                    id="resPhone"
                    type="tel"
                    formControlName="phone"
                    placeholder="0415 727 988"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="resEmail" class="block text-xs font-medium text-stone-300 mb-1">Email Address *</label>
                  <input
                    id="resEmail"
                    type="email"
                    formControlName="email"
                    placeholder="liam@example.com"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <!-- Reservation Date, Time & Party Size -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label for="resDate" class="block text-xs font-medium text-stone-300 mb-1">Booking Date *</label>
                  <input
                    id="resDate"
                    type="date"
                    formControlName="date"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="resTime" class="block text-xs font-medium text-stone-300 mb-1">Arrival Time *</label>
                  <select
                    id="resTime"
                    formControlName="time"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400">
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM (Happy Hour)</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM (Trivia Seating on Wed)</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
                <div>
                  <label for="resGuests" class="block text-xs font-medium text-stone-300 mb-1">Guests: {{ reservationForm.value.guests }}</label>
                  <input
                    id="resGuests"
                    type="range"
                    min="1"
                    max="30"
                    formControlName="guests"
                    class="w-full accent-amber-400 mt-2"
                  />
                </div>
              </div>

              <!-- Special Requests or Occasion -->
              <div>
                <label for="resSpecialRequests" class="block text-xs font-medium text-stone-300 mb-1">Notes, Occasion or Dietary Preferences</label>
                <textarea
                  id="resSpecialRequests"
                  rows="2"
                  formControlName="specialRequests"
                  placeholder="e.g. Birthday celebration, bringing external pizzas, high-chair requested..."
                  class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="reservationForm.invalid"
                class="w-full py-4 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-xl flex items-center justify-center gap-2">
                <mat-icon class="text-base">event_available</mat-icon>
                Confirm Table Reservation (Instant Confirmation)
              </button>

            </form>
          </div>
        }

      </div>
    </div>
  `
})
export class Reservations {
  venue = VENUE_INFO;
  confirmedBooking = signal<ReservationRequest | null>(null);
  confirmationCode = signal<string>('');

  reservationForm = new FormGroup({
    guestName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    time: new FormControl('18:00', [Validators.required]),
    guests: new FormControl(4, [Validators.required, Validators.min(1)]),
    seatingArea: new FormControl<'Cozy Interior Booth' | 'Covered Beer Garden' | 'Pool Table Lounge' | 'Main Bar High-Tops'>('Cozy Interior Booth', [Validators.required]),
    specialRequests: new FormControl('')
  });

  selectArea(area: 'Cozy Interior Booth' | 'Covered Beer Garden' | 'Pool Table Lounge' | 'Main Bar High-Tops') {
    this.reservationForm.patchValue({ seatingArea: area });
  }

  submitReservation() {
    if (this.reservationForm.valid) {
      const val = this.reservationForm.value as ReservationRequest;
      const code = generateReservationCode(val);
      this.confirmationCode.set(code);
      this.confirmedBooking.set(val);
    }
  }

  resetForm() {
    this.confirmedBooking.set(null);
  }
}
