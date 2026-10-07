// ─────────────────────────────────────────────────────────────────────────────
// Wok Aroma: the one place business facts live.
// Edit values here; layout and copy elsewhere read from this file.
//
// Source of every value below: the owner's Google Maps panel and printed menu.
// A `null` link means "not supplied yet": the button is hidden, never faked.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Wok Aroma',
  tagline: 'Authentic Crazy Chinese Food', // the owner's own printed tagline
  logoLine: 'Savor the Flavors', // the owner's own logo line
  locale: 'en-IN',

  address: {
    shop: 'GF-80',
    building: 'Eros Market Place',
    lines: [
      'Ground Floor, Eros Market Place',
      'GF 80, Shakti Khand 2',
      'Indirapuram, Ghaziabad',
      'Uttar Pradesh 201014',
    ],
    locality: 'Indirapuram',
    city: 'Ghaziabad',
    region: 'Uttar Pradesh',
    postalCode: '201014',
    plusCode: 'J9WG+J8',
  },

  phone: {
    display: '98712 72744',
    tel: '+919871272744',
  },

  hours: {
    summary: 'Open 24 hours', // Google Maps shows "Open 24 hours"
    source: 'Google Maps',
  },

  priceGuide: {
    label: '₹200–400 per person',
    source: 'Google Maps, reported by 35 people',
  },

  delivery: {
    freeWithinKm: 3,
    minimumOrder: 500, // ₹
    platforms: ['Swiggy', 'Zomato'], // named on the printed menu
  },

  links: {
    // The owner's exact Maps listing.
    maps: 'https://www.google.com/maps/place/Wok+Aroma/data=!4m2!3m1!1s0x0:0x5afb6b4696ccf73',
    // Not supplied yet. Paste the real URL and the button appears.
    instagram: null,
    swiggy: null,
    zomato: null,
  },
};

export const telHref = `tel:${site.phone.tel}`;
