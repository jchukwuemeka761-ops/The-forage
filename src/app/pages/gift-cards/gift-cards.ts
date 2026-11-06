import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VENUE_INFO } from '../../core/venue.data';
import { generateGiftCardCode } from '../../core/booking-rules';

@Component({
  selector: 'app-gift-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Manglova Cocktail Drinks Photo, clearly visible in celebratory glow -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.cocktails"
          alt="Celebratory Cocktails and Drinks"
          class="w-full h-full object-cover object-center opacity-55 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/55 via-neutral-950/70 to-neutral-950/90"></div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 max-w-6xl mx-auto">
        <!-- Title & Intro -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400 text-neutral-950 mb-4 shadow">
            <mat-icon class="text-sm">card_giftcard</mat-icon>
            Digital &amp; Physical Vouchers
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Give The Gift of Craft
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Treat a mate, partner, or colleague to 20 rotating craft taps, winter mulled wines, artisan cocktails, or a pizza feast in Mitcham.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Column 1: Live Interactive Luxury Voucher Card Preview -->
          <div class="lg:col-span-5 space-y-6">
            <div class="relative p-8 rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl bg-gradient-to-br from-stone-900 via-neutral-950 to-stone-900 text-stone-100">
              <!-- Ambient gold shimmer -->
              <div class="absolute -top-20 -right-20 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

              <!-- Voucher Header -->
              <div class="flex items-start justify-between mb-8 relative z-10">
                <div class="flex items-center gap-3">
                  <img
                    [src]="venue.images.logo"
                    alt="Logo"
                    class="h-10 w-auto object-contain"
                    referrerpolicy="no-referrer"
                  />
                  <div>
                    <h3 class="font-serif font-bold text-base tracking-wide text-stone-100">The Forager's Drop</h3>
                    <p class="text-[10px] text-amber-400 font-mono">499A Whitehorse Rd, Mitcham</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-mono uppercase tracking-widest text-stone-400 block">Voucher Value</span>
                  <span class="text-3xl font-serif font-bold text-amber-300">
                    &#36;{{ cardForm.value.amount || 50 }}
                  </span>
                </div>
              </div>

              <!-- Recipient & Message -->
              <div class="space-y-3 mb-8 relative z-10">
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-stone-500 font-mono">Presented To:</span>
                  <p class="text-lg font-serif font-bold text-stone-100">
                    {{ cardForm.value.recipientName || 'Your Recipient' }}
                  </p>
                </div>

                @if (cardForm.value.message) {
                  <div class="p-3 rounded-xl bg-neutral-950/70 border border-stone-800 text-xs text-stone-300 italic font-serif">
                    &ldquo;{{ cardForm.value.message }}&rdquo;
                  </div>
                }

                <div class="flex items-center justify-between text-xs text-stone-400 pt-1">
                  <span>From: <strong class="text-stone-200">{{ cardForm.value.senderName || 'You' }}</strong></span>
                  <span class="font-mono text-amber-400/80">Valid for 3 Years</span>
                </div>
              </div>

              <!-- Footer with Code & Barcode style -->
              <div class="pt-4 border-t border-amber-500/20 flex items-center justify-between relative z-10 text-[11px] font-mono text-stone-400">
                <span>Code: <strong class="text-amber-400">{{ previewCode() }}</strong></span>
                <span class="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px]">
                  All Taps &bull; Food &bull; Wine
                </span>
              </div>
            </div>

            <div class="p-4 rounded-2xl glass-panel border border-stone-800 text-xs text-stone-400 flex items-center gap-3">
              <mat-icon class="text-amber-400 text-base">verified</mat-icon>
              <span>Instant digital voucher delivered with custom QR code for redemption at the bar.</span>
            </div>
          </div>

          <!-- Column 2: Order & Customizer Form -->
          <div class="lg:col-span-7">
            <div class="glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl">
              
              @if (orderCompleted()) {
                <div class="text-center py-8 space-y-4">
                  <div class="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <mat-icon class="text-3xl">done</mat-icon>
                  </div>
                  <h3 class="text-2xl font-serif font-bold text-stone-100">Voucher Issued Successfully!</h3>
                  <p class="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                    A digital voucher for <strong>&#36;{{ cardForm.value.amount }}</strong> has been created with code <strong class="text-amber-400 font-mono">{{ issuedCode() }}</strong>. A confirmation pass has been scheduled for <strong>{{ cardForm.value.recipientEmail }}</strong>.
                  </p>
                  <div class="pt-4 flex justify-center gap-4">
                    <button
                      type="button"
                      (click)="resetOrder()"
                      class="px-5 py-2.5 text-xs font-semibold text-stone-300 border border-stone-700 rounded-xl hover:text-white">
                      Create Another Gift Card
                    </button>
                    <a routerLink="/"
                      class="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 rounded-xl">
                      Return to Home
                    </a>
                  </div>
                </div>
              } @else {
                <form [formGroup]="cardForm" (ngSubmit)="submitGiftCard()" class="space-y-6">
                  
                  <!-- Preset Amounts -->
                  <div>
                    <span class="block text-xs font-medium text-stone-300 mb-2">Select Voucher Value *</span>
                    <div class="grid grid-cols-4 gap-3 mb-3">
                      @for (amt of presetAmounts; track amt) {
                        <button
                          type="button"
                          (click)="setAmount(amt)"
                          class="py-3 rounded-xl border text-sm font-serif font-bold transition-all"
                          [class]="cardForm.value.amount === amt ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md' : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-400/40'">
                          &#36;{{ amt }}
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Personal details -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="gcRecipientName" class="block text-xs font-medium text-stone-300 mb-1">Recipient Name *</label>
                      <input
                        id="gcRecipientName"
                        type="text"
                        formControlName="recipientName"
                        placeholder="e.g. Maya Chen"
                        class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label for="gcRecipientEmail" class="block text-xs font-medium text-stone-300 mb-1">Recipient Email *</label>
                      <input
                        id="gcRecipientEmail"
                        type="email"
                        formControlName="recipientEmail"
                        placeholder="maya@example.com"
                        class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label for="gcSenderName" class="block text-xs font-medium text-stone-300 mb-1">Your Name (Sender) *</label>
                      <input
                        id="gcSenderName"
                        type="text"
                        formControlName="senderName"
                        placeholder="e.g. Jordan"
                        class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label for="gcDeliveryTiming" class="block text-xs font-medium text-stone-300 mb-1">Delivery Timing</label>
                      <select
                        id="gcDeliveryTiming"
                        formControlName="deliveryTiming"
                        class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400">
                        <option value="immediate">Deliver Immediately</option>
                        <option value="scheduled">Schedule for Birthday / Special Date</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label for="gcMessage" class="block text-xs font-medium text-stone-300 mb-1">Custom Message / Greeting</label>
                    <textarea
                      id="gcMessage"
                      rows="3"
                      formControlName="message"
                      placeholder="e.g. Happy 30th Birthday! Enjoy some incredible craft pints on me."
                      class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"></textarea>
                  </div>

                  <button
                    type="submit"
                    [disabled]="cardForm.invalid"
                    class="w-full py-4 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-xl flex items-center justify-center gap-2">
                    <mat-icon class="text-base">credit_card</mat-icon>
                    Issue &#36;{{ cardForm.value.amount || 50 }} Gift Voucher
                  </button>
                </form>
              }

            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class GiftCards {
  venue = VENUE_INFO;
  presetAmounts = [25, 50, 100, 150];
  orderCompleted = signal(false);
  issuedCode = signal('');

  cardForm = new FormGroup({
    amount: new FormControl(50, [Validators.required, Validators.min(10)]),
    recipientName: new FormControl('', [Validators.required]),
    recipientEmail: new FormControl('', [Validators.required, Validators.email]),
    senderName: new FormControl('', [Validators.required]),
    deliveryTiming: new FormControl('immediate'),
    message: new FormControl('Pints and good times on me at The Forager’s Drop!')
  });

  previewCode = signal('FORAGER-GIFT-$50-PREV');

  setAmount(amt: number) {
    this.cardForm.patchValue({ amount: amt });
    this.previewCode.set(`FORAGER-GIFT-$${amt}-PREV`);
  }

  submitGiftCard() {
    if (this.cardForm.valid) {
      const order = {
        amount: Number(this.cardForm.value.amount) || 50,
        recipientName: this.cardForm.value.recipientName || '',
        recipientEmail: this.cardForm.value.recipientEmail || '',
        senderName: this.cardForm.value.senderName || '',
        message: this.cardForm.value.message || ''
      };
      const code = generateGiftCardCode(order);
      this.issuedCode.set(code);
      this.orderCompleted.set(true);
    }
  }

  resetOrder() {
    this.cardForm.reset({
      amount: 50,
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      deliveryTiming: 'immediate',
      message: 'Pints and good times on me at The Forager’s Drop!'
    });
    this.orderCompleted.set(false);
  }
}
