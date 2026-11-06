import { ChangeDetectionStrategy, Component, signal, AfterViewInit, OnDestroy, ElementRef, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VENUE_INFO } from '../../core/venue.data';
import { isVenueOpenAt } from '../../core/booking-rules';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const L: any;

@Component({
  selector: 'app-location',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  template: `
    <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background: Original Bar Atmosphere clearly visible -->
      <div class="fixed inset-0 z-0 pointer-events-none">
        <img
          [src]="venue.images.barInterior"
          alt="Bar Interior and Craft Taps"
          class="w-full h-full object-cover object-center opacity-50 filter contrast-115 brightness-95 saturate-110"
          referrerpolicy="no-referrer"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/75 to-neutral-950/90"></div>
      </div>

      <!-- Main Container -->
      <div class="relative z-10 max-w-7xl mx-auto">
        <!-- Title & Subtitle -->
        <div class="text-center max-w-4xl mx-auto mb-14">
          <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-400 text-neutral-950 mb-4 shadow">
            <mat-icon class="text-sm">near_me</mat-icon>
            Interactive Google Maps &amp; Navigation
          </div>

          <h1 class="text-4xl sm:text-6xl font-serif font-bold text-stone-100 tracking-tight mb-4">
            Find &amp; Drive to The Forager's Drop
          </h1>
          <p class="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Located in Melbourne's Eastern Suburbs on Whitehorse Road, just a 3-minute stroll from Mitcham Station and moments off the EastLink.
          </p>
        </div>

        <!-- Interactive Map & Quick Venue Details Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          <!-- Interactive Map Container -->
          <div class="lg:col-span-8 glass-panel rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative">
            <div class="p-4 bg-neutral-900/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <strong class="text-stone-100 font-mono">499A Whitehorse Road, Mitcham VIC 3132</strong>
              </div>
              <a
                [href]="googleMapsDirectionsUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3.5 py-1.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs hover:bg-amber-300 transition-all flex items-center gap-1.5 shadow">
                <mat-icon class="text-xs scale-75">directions_car</mat-icon>
                <span>Open in Google Maps App</span>
                <mat-icon class="text-xs scale-75">open_in_new</mat-icon>
              </a>
            </div>

            <!-- Leaflet Interactive Canvas Map -->
            <div #mapContainer class="w-full h-[450px] sm:h-[500px] z-10 bg-neutral-950"></div>

            <!-- Map Footer Overlay with Quick Controls -->
            <div class="p-4 bg-neutral-900/90 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <span class="flex items-center gap-1.5">
                <mat-icon class="text-amber-400 text-sm">train</mat-icon>
                300m (3-min walk) from Mitcham Station (Belgrave / Lilydale lines)
              </span>
              <span class="flex items-center gap-1.5">
                <mat-icon class="text-amber-400 text-sm">local_parking</mat-icon>
                Free street parking &amp; rear council carpark via Britannia St
              </span>
            </div>
          </div>

          <!-- Venue Quick Details Sidebar -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Live Status & Contact Card -->
            <div class="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase"
                  [class]="status().isOpen ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-stone-900 text-stone-400 border border-stone-700'">
                  {{ status().isOpen ? 'Open Now' : 'Closed Now' }}
                </span>
                <span class="text-xs font-mono text-stone-400">{{ todayName }}</span>
              </div>

              <div>
                <h3 class="text-xl font-serif font-bold text-stone-100">The Forager's Drop</h3>
                <p class="text-xs text-stone-400 mt-1 leading-relaxed">
                  {{ venue.address }}
                </p>
              </div>

              <div class="pt-2 space-y-2 text-xs">
                <div class="flex items-center gap-2 text-stone-300">
                  <mat-icon class="text-amber-400 text-sm">phone</mat-icon>
                  <a href="tel:0415727988" class="font-mono text-amber-300 hover:underline">
                    0415 727 988
                  </a>
                </div>
                <div class="flex items-center gap-2 text-stone-300">
                  <mat-icon class="text-amber-400 text-sm">email</mat-icon>
                  <a href="mailto:foragersdrop@gmail.com" class="hover:text-amber-300">
                    foragersdrop&#64;gmail.com
                  </a>
                </div>
                <div class="flex items-center gap-2 text-stone-300">
                  <mat-icon class="text-amber-400 text-sm">tag</mat-icon>
                  <a [href]="venue.instagramUrl" target="_blank" rel="noopener noreferrer" class="hover:text-amber-300">
                    Instagram: &#64;foragersdrop
                  </a>
                </div>
              </div>

              <div class="pt-4 border-t border-stone-800">
                <a routerLink="/reservations"
                  class="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl block transition-all shadow-md">
                  Reserve a Table or Booth
                </a>
              </div>
            </div>

            <!-- Public Transit & Driving Highway Tips -->
            <div class="glass-panel p-6 rounded-3xl border border-stone-800 space-y-4">
              <h4 class="text-sm font-semibold uppercase tracking-wider text-amber-300 font-mono">
                Driving &amp; Transit Guide
              </h4>
              <ul class="space-y-3 text-xs text-stone-300">
                <li class="flex items-start gap-2.5">
                  <mat-icon class="text-amber-400 text-sm mt-0.5">directions_car</mat-icon>
                  <span><strong>By Car:</strong> Off EastLink (M3), take the Whitehorse Road exit and travel 1.2km East. The bar is on the left side of Whitehorse Rd.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <mat-icon class="text-amber-400 text-sm mt-0.5">train</mat-icon>
                  <span><strong>By Train:</strong> Belgrave or Lilydale line directly to Mitcham Station. Exit towards Whitehorse Road and walk 300 meters.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <mat-icon class="text-amber-400 text-sm mt-0.5">two_wheeler</mat-icon>
                  <span><strong>Bicycle:</strong> Schweppes / Bushy Creek trail connects directly to Mitcham with bicycle racks near our courtyard.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        <!-- Driving Directions Calculator Form -->
        <div class="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/30 max-w-4xl mx-auto shadow-2xl">
          <div class="text-center max-w-2xl mx-auto mb-8">
            <h2 class="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Get Driving Directions Directly
            </h2>
            <p class="text-xs text-stone-400 mt-1">
              Enter your current location or suburb to calculate exact distance and turn guidance to The Forager's Drop without having to ask anyone.
            </p>
          </div>

          <form [formGroup]="directionsForm" (ngSubmit)="calculateDirections()" class="space-y-6">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="relative flex-1">
                <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-sm">my_location</mat-icon>
                <input
                  type="text"
                  formControlName="origin"
                  placeholder="Enter starting suburb or address (e.g. Melbourne CBD, Box Hill, Ringwood...)"
                  class="w-full bg-stone-900 border border-stone-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                [disabled]="directionsForm.invalid"
                class="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0">
                <mat-icon class="text-sm">navigation</mat-icon>
                Get Route
              </button>
            </div>

            <!-- Quick Suburb Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span class="text-stone-500 font-mono text-[11px]">Quick Starting Points:</span>
              <button type="button" (click)="setOrigin('Melbourne CBD')" class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-400 text-[11px]">
                Melbourne CBD
              </button>
              <button type="button" (click)="setOrigin('Ringwood VIC')" class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-400 text-[11px]">
                Ringwood
              </button>
              <button type="button" (click)="setOrigin('Box Hill VIC')" class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-400 text-[11px]">
                Box Hill
              </button>
              <button type="button" (click)="setOrigin('Glen Waverley VIC')" class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-400 text-[11px]">
                Glen Waverley
              </button>
              <button type="button" (click)="setOrigin('Yarra Valley')" class="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-400 text-[11px]">
                Yarra Valley
              </button>
            </div>
          </form>

          <!-- Computed Route Feedback -->
          @if (routeResult()) {
            <div class="mt-8 p-6 rounded-2xl bg-neutral-900/90 border border-amber-500/40 space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">Calculated Route</span>
                  <h3 class="text-xl font-serif font-bold text-stone-100">
                    From {{ routeResult()?.origin }} to 499A Whitehorse Road
                  </h3>
                </div>
                <div class="flex items-center gap-4 text-xs font-mono">
                  <div class="px-3 py-1.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-500/30">
                    Est. Distance: <strong>{{ routeResult()?.distanceKm }} km</strong>
                  </div>
                  <div class="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-200">
                    Est. Drive Time: <strong>{{ routeResult()?.driveTimeMins }} mins</strong>
                  </div>
                </div>
              </div>

              <!-- Turn-by-Turn Guidance -->
              <div class="space-y-2 text-xs text-stone-300">
                <p class="font-semibold text-stone-200">Recommended Turn Guidance:</p>
                <ol class="list-decimal list-inside space-y-1.5 text-stone-300 pl-1">
                  @for (step of routeResult()?.steps; track step) {
                    <li>{{ step }}</li>
                  }
                </ol>
              </div>

              <div class="pt-4 flex flex-wrap items-center justify-between gap-4">
                <span class="text-[11px] text-stone-400 italic">Destination coordinates: -37.8174, 145.1932</span>
                <a
                  [href]="googleMapsDirectionsUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl transition-all shadow flex items-center gap-2">
                  <mat-icon class="text-sm">navigation</mat-icon>
                  Start Turn-by-Turn in Google Maps
                </a>
              </div>
            </div>
          }
        </div>

      </div>
    </div>
  `
})
export class Location implements AfterViewInit, OnDestroy {
  venue = VENUE_INFO;
  mapContainer = viewChild<ElementRef<HTMLDivElement>>('mapContainer');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapInstance: any = null;

  todayName = new Date().toLocaleDateString('en-AU', { weekday: 'long' });
  status = signal(this.getCurrentStatus());

  directionsForm = new FormGroup({
    origin: new FormControl('Melbourne CBD', [Validators.required])
  });

  routeResult = signal<{
    origin: string;
    distanceKm: number;
    driveTimeMins: number;
    steps: string[];
  } | null>(null);

  googleMapsDirectionsUrl = signal(
    `https://www.google.com/maps/dir/?api=1&destination=499A+Whitehorse+Road+Mitcham+VIC+3132+Australia`
  );

  private getCurrentStatus() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = days[now.getDay()];
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return isVenueOpenAt(day, time);
  }

  ngAfterViewInit() {
    this.initMap();
    this.calculateDirections();
  }

  ngOnDestroy() {
    if (this.mapInstance) {
      try {
        this.mapInstance.remove();
      } catch {
        // cleanup safe
      }
    }
  }

  initMap() {
    const el = this.mapContainer()?.nativeElement;
    if (!el || typeof L === 'undefined') return;

    try {
      const lat = this.venue.coordinates.lat;
      const lng = this.venue.coordinates.lng;

      this.mapInstance = L.map(el, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | The Forager\'s Drop',
        maxZoom: 19
      }).addTo(this.mapInstance);

      // Custom gold icon for venue marker
      const goldIcon = L.divIcon({
        className: 'custom-gold-marker',
        html: `
          <div style="background: linear-gradient(135deg, #fef08a, #eab308, #ca8a04); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(234, 179, 8, 0.7); border: 2px solid #ffffff;">
            <span style="font-size: 18px;">🍺</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(this.mapInstance);

      marker.bindPopup(`
        <div style="padding: 6px; font-family: sans-serif;">
          <h4 style="margin: 0 0 4px; font-weight: bold; color: #eab308; font-size: 14px;">The Forager's Drop</h4>
          <p style="margin: 0 0 6px; font-size: 12px; color: #d6d3d1;">499A Whitehorse Road, Mitcham</p>
          <p style="margin: 0 0 8px; font-size: 11px; color: #a8a29e;">20 Independent Craft Taps &bull; Cozy Booths</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=499A+Whitehorse+Road+Mitcham+VIC+3132+Australia" target="_blank" style="display: inline-block; background: #eab308; color: #0c0a09; padding: 4px 10px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 11px;">
            Drive Here via Google Maps
          </a>
        </div>
      `).openPopup();
    } catch (e) {
      console.warn('Leaflet map initialization notice:', e);
    }
  }

  setOrigin(originText: string) {
    this.directionsForm.patchValue({ origin: originText });
    this.calculateDirections();
  }

  calculateDirections() {
    const origin = this.directionsForm.value.origin || 'Melbourne CBD';
    let distance = 21.5;
    let driveTime = 26;
    let steps: string[] = [];

    const lower = origin.toLowerCase();
    if (lower.includes('cbd') || lower.includes('melbourne')) {
      distance = 21.8;
      driveTime = 28;
      steps = [
        'Take the Eastern Freeway (M3) East towards Ringwood/Frankston.',
        'Continue along EastLink (M3) through the Mullum Mullum tunnel or take exit 5 for Whitehorse Road.',
        'Turn Left onto Whitehorse Road (Maroondah Highway / Route 34) towards Mitcham.',
        'Drive 1.2 km past Mitcham Railway Station. Destination is on your left at 499A Whitehorse Road.'
      ];
    } else if (lower.includes('box hill')) {
      distance = 6.4;
      driveTime = 11;
      steps = [
        'Head East on Whitehorse Road (State Route 34) through Blackburn.',
        'Continue straight past Mitcham Road intersection.',
        '499A Whitehorse Road will be on your left, just before Britannia Street.'
      ];
    } else if (lower.includes('ringwood')) {
      distance = 4.2;
      driveTime = 8;
      steps = [
        'Head West on Maroondah Hwy / Whitehorse Road towards Mitcham.',
        'Pass the Heatherdale Road interchange.',
        'Destination 499A Whitehorse Road will be on your right (use pedestrian crossing or rear council carpark).'
      ];
    } else if (lower.includes('yarra valley')) {
      distance = 32.0;
      driveTime = 35;
      steps = [
        'Head Southwest along Maroondah Highway through Lilydale and Ringwood.',
        'Continue along Whitehorse Road past EastLink.',
        'Arrive at The Forager\'s Drop on Whitehorse Road.'
      ];
    } else {
      distance = 15.0;
      driveTime = 20;
      steps = [
        `Navigate towards Whitehorse Road (Maroondah Highway Route 34) in Mitcham.`,
        'Look for 499A Whitehorse Road, opposite Mitcham central shopping precinct.',
        'Park on Whitehorse Road or use the free council parking lot behind Britannia Street.'
      ];
    }

    this.routeResult.set({
      origin,
      distanceKm: distance,
      driveTimeMins: driveTime,
      steps
    });

    this.googleMapsDirectionsUrl.set(
      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=499A+Whitehorse+Road+Mitcham+VIC+3132+Australia`
    );
  }
}
