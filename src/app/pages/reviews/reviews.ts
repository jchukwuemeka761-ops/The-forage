import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VENUE_INFO, TESTIMONIALS } from '../../core/venue.data';
import { ReviewItem } from '../../core/venue.model';

@Component({
  selector: 'app-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Reviews Collage & Bar Atmosphere clearly visible -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.reviewsCollage"
          alt="Reviews Collage"
          class="w-full h-full object-cover object-center opacity-45 filter contrast-115 brightness-95"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Title & Rating Header -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400 text-neutral-950 mb-4 shadow">
            <mat-icon class="text-sm">star</mat-icon>
            4.7 Out of 5.0 Stars &bull; Over 400+ Verified Testimonials
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Reviews, Testimonials &amp; Links
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            What the neighborhood, craft beer geeks, and trivia regulars have to say about The Forager's Drop.
          </p>

          <!-- Social Handles Bar -->
          <div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a [href]="venue.instagramUrl" target="_blank" rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl glass-panel border border-amber-500/30 hover:border-amber-400 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-2">
              <span class="font-bold">IG</span>
              <span>&#64;foragersdrop</span>
              <mat-icon class="text-xs scale-75">open_in_new</mat-icon>
            </a>
            <a [href]="venue.facebookUrl" target="_blank" rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl glass-panel border border-amber-500/30 hover:border-amber-400 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-2">
              <span class="font-bold">FB</span>
              <span>Facebook Official</span>
              <mat-icon class="text-xs scale-75">open_in_new</mat-icon>
            </a>
            <a [href]="venue.googleReviewsUrl" target="_blank" rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl glass-panel border border-amber-500/30 hover:border-amber-400 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-2">
              <span class="text-amber-400 font-bold">4.7★</span>
              <span>Google Business Profile</span>
              <mat-icon class="text-xs scale-75">open_in_new</mat-icon>
            </a>
          </div>
        </div>

        <!-- Authentic Original Review Badges Showcase -->
        <div class="mb-16">
          <h2 class="text-center font-mono text-xs uppercase tracking-widest text-amber-400 font-bold mb-8">
            Badges of Honor from Our Community
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="glass-panel p-4 rounded-2xl border border-stone-800 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition-all">
              <img [src]="venue.images.reviewBadge1" alt="Community Badge 1" class="h-20 w-auto object-contain mb-2" referrerpolicy="no-referrer" />
              <span class="text-[11px] font-mono text-stone-400">Independent Craft</span>
            </div>
            <div class="glass-panel p-4 rounded-2xl border border-stone-800 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition-all">
              <img [src]="venue.images.reviewBadge2" alt="Community Badge 2" class="h-20 w-auto object-contain mb-2" referrerpolicy="no-referrer" />
              <span class="text-[11px] font-mono text-stone-400">Local Hero</span>
            </div>
            <div class="glass-panel p-4 rounded-2xl border border-stone-800 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition-all">
              <img [src]="venue.images.reviewBadge3" alt="Community Badge 3" class="h-20 w-auto object-contain mb-2" referrerpolicy="no-referrer" />
              <span class="text-[11px] font-mono text-stone-400">Top Rated Pub</span>
            </div>
            <div class="glass-panel p-4 rounded-2xl border border-stone-800 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition-all">
              <img [src]="venue.images.reviewBadge4" alt="Community Badge 4" class="h-20 w-auto object-contain mb-2" referrerpolicy="no-referrer" />
              <span class="text-[11px] font-mono text-stone-400">Best Atmosphere</span>
            </div>
            <div class="glass-panel p-4 rounded-2xl border border-stone-800 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition-all">
              <img [src]="venue.images.reviewBadge5" alt="Community Badge 5" class="h-20 w-auto object-contain mb-2" referrerpolicy="no-referrer" />
              <span class="text-[11px] font-mono text-stone-400">Trivia Masters</span>
            </div>
            <div class="glass-panel p-4 rounded-2xl border border-stone-800 text-center flex flex-col items-center justify-center hover:border-amber-500/40 transition-all">
              <img [src]="venue.images.tapBadge" alt="Tap Badge" class="h-20 w-auto object-contain mb-2" referrerpolicy="no-referrer" />
              <span class="text-[11px] font-mono text-stone-400">20 Fresh Lines</span>
            </div>
          </div>
        </div>

        <!-- Filter By Category -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          @for (cat of categories; track cat) {
            <button
              type="button"
              (click)="selectedCategory.set(cat)"
              class="px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all"
              [class]="selectedCategory() === cat ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'bg-stone-900/80 text-stone-300 hover:text-amber-300 hover:bg-stone-800'">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Testimonials Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          @for (item of filteredReviews(); track item.id) {
            <div class="glass-panel p-6 sm:p-7 rounded-3xl border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-1 text-amber-400">
                    @for (_ of [1,2,3,4,5]; track _) {
                      <mat-icon class="text-sm">star</mat-icon>
                    }
                  </div>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
                    {{ item.source }}
                  </span>
                </div>

                <p class="text-xs text-stone-200 leading-relaxed italic mb-6">
                  &ldquo;{{ item.comment }}&rdquo;
                </p>
              </div>

              <div class="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h4 class="font-serif font-bold text-stone-100 text-sm">{{ item.author }}</h4>
                  <span class="text-[10px] text-stone-500">{{ item.date }} &bull; Verified Patron</span>
                </div>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-500/20">
                  {{ item.category }}
                </span>
              </div>
            </div>
          }
        </div>

        <!-- Submit Your Review Section -->
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 max-w-2xl mx-auto text-center">
          <h3 class="text-2xl font-serif font-bold text-stone-100 mb-2">Have You Visited The Forager's Drop?</h3>
          <p class="text-xs text-stone-400 mb-6">
            Share your experience with the community, rate our taps, or tell us your favorite trivia moment!
          </p>

          @if (reviewSubmitted()) {
            <div class="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
              <mat-icon class="text-3xl text-emerald-400 block mb-2 mx-auto">favorite</mat-icon>
              Thank you! Your review has been added to our community board.
            </div>
          } @else {
            <form [formGroup]="reviewForm" (ngSubmit)="submitReview()" class="space-y-4 text-left">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="revAuthor" class="block text-xs font-medium text-stone-300 mb-1">Your Name *</label>
                  <input
                    id="revAuthor"
                    type="text"
                    formControlName="author"
                    placeholder="e.g. Chris B."
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label for="revRating" class="block text-xs font-medium text-stone-300 mb-1">Star Rating (1-5)</label>
                  <select
                    id="revRating"
                    formControlName="rating"
                    class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400">
                    <option [value]="5">5 Stars (Sensational)</option>
                    <option [value]="4">4 Stars (Great)</option>
                    <option [value]="3">3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="revComment" class="block text-xs font-medium text-stone-300 mb-1">Your Review / Comments *</label>
                <textarea
                  id="revComment"
                  rows="3"
                  formControlName="comment"
                  placeholder="Tell us what you enjoyed..."
                  class="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"></textarea>
              </div>

              <button
                type="submit"
                [disabled]="reviewForm.invalid"
                class="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-md">
                Publish Review
              </button>
            </form>
          }
        </div>

      </div>
    </div>
  `
})
export class Reviews {
  venue = VENUE_INFO;
  reviewsList = signal(TESTIMONIALS);
  selectedCategory = signal('All Reviews');
  reviewSubmitted = signal(false);

  categories = ['All Reviews', 'Craft Beer', 'Vibe & Atmosphere', 'Trivia', 'BYO Food', 'Hospitality', 'Events'];

  filteredReviews = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All Reviews') return this.reviewsList();
    return this.reviewsList().filter(r => r.category === cat);
  });

  reviewForm = new FormGroup({
    author: new FormControl('', [Validators.required]),
    rating: new FormControl(5, [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  submitReview() {
    if (this.reviewForm.valid) {
      const newRev: ReviewItem = {
        id: `rev-${Date.now()}`,
        author: this.reviewForm.value.author || 'Anonymous',
        rating: Number(this.reviewForm.value.rating) || 5,
        source: 'Google Reviews',
        date: 'Just now',
        category: 'Hospitality',
        verifiedVisit: true,
        comment: this.reviewForm.value.comment || ''
      };
      this.reviewsList.update(list => [newRev, ...list]);
      this.reviewSubmitted.set(true);
    }
  }
}
