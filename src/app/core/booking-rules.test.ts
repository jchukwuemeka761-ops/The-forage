import test from 'node:test';
import assert from 'node:assert/strict';
import {
  recommendSpaceForGuests,
  isVenueOpenAt,
  generateReservationCode,
  generateGiftCardCode,
  calculateDistanceKm
} from './booking-rules';

test('recommendSpaceForGuests recommends correct zones', () => {
  const small = recommendSpaceForGuests(4);
  assert.equal(small.isFeasible, true);
  assert.equal(small.recommendedSpace, 'Cozy Interior Booth');
  assert.equal(small.depositRequired, false);

  const trivia = recommendSpaceForGuests(10, 'Pub Trivia Team');
  assert.equal(trivia.recommendedSpace, 'Reserved Trivia Center Stage');

  const party = recommendSpaceForGuests(50);
  assert.equal(party.recommendedSpace, 'The Pool Lounge & Beer Garden Semi-Private Wing');
  assert.equal(party.depositRequired, true);

  const buyout = recommendSpaceForGuests(110);
  assert.equal(buyout.recommendedSpace, 'Full Venue Exclusive Buyout');

  const overflow = recommendSpaceForGuests(200);
  assert.equal(overflow.isFeasible, false);

  const invalid = recommendSpaceForGuests(0);
  assert.equal(invalid.isFeasible, false);
});

test('isVenueOpenAt accurately evaluates venue hours across standard and late nights', () => {
  // Monday: 16:00 to 22:00
  const monOpen = isVenueOpenAt('Monday', '17:30');
  assert.equal(monOpen.isOpen, true);

  const monClosedEarly = isVenueOpenAt('Monday', '12:00');
  assert.equal(monClosedEarly.isOpen, false);

  const monClosedLate = isVenueOpenAt('Monday', '23:00');
  assert.equal(monClosedLate.isOpen, false);

  // Friday: 12:00 to 01:00 (next day)
  const friMidday = isVenueOpenAt('Friday', '13:00');
  assert.equal(friMidday.isOpen, true);

  const friMidnight = isVenueOpenAt('Friday', '00:30');
  assert.equal(friMidnight.isOpen, true);

  // Sunday: 14:00 to 22:00
  const sunAfternoon = isVenueOpenAt('Sunday', '15:30');
  assert.equal(sunAfternoon.isOpen, true);

  const sunMorning = isVenueOpenAt('Sunday', '11:00');
  assert.equal(sunMorning.isOpen, false);
});

test('generateReservationCode produces clean valid reference string', () => {
  const code = generateReservationCode({
    guestName: 'Alex Smith',
    email: 'alex@example.com',
    phone: '0415727988',
    date: '2026-11-20',
    time: '19:00',
    guests: 4,
    seatingArea: 'Cozy Interior Booth'
  });
  assert.match(code, /^FD-1120-988-\d{3}$/);
});

test('generateGiftCardCode creates formatted voucher code with amount', () => {
  const voucher = generateGiftCardCode({
    senderName: 'Elena',
    recipientName: 'Sam',
    recipientEmail: 'sam@example.com',
    amount: 100,
    message: 'Enjoy the pints on me!'
  });
  assert.match(voucher, /^FORAGER-GIFT-\$100-[A-Z0-9]{4}$/);
});

test('calculateDistanceKm computes distance to venue accurately', () => {
  // Coordinates close to Mitcham station
  const dist = calculateDistanceKm(-37.8174, 145.1932);
  assert.equal(dist, 0);

  // Melbourne CBD approx (-37.8136, 144.9631) is ~20km west
  const melbDist = calculateDistanceKm(-37.8136, 144.9631);
  assert.ok(melbDist > 18 && melbDist < 25, `Expected between 18 and 25km, got ${melbDist}`);
});
