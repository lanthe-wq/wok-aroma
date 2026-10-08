// Hero depth on scroll: the wok rises faster than the lettering as the shopfront leaves.
// Needs ScrollTrigger, so it loads with the rest of the page, not with the shutter.

import gsap from 'gsap';

export function initHeroScroll({ reduced }) {
  const hero = document.querySelector('.hero');
  if (!hero || reduced) return;

  const scrollTrigger = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero-art]', { yPercent: -8, ease: 'none', scrollTrigger });
  gsap.to('[data-name]', { yPercent: 12, ease: 'none', scrollTrigger: { ...scrollTrigger } });
}
