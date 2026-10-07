// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Not created for reduced motion or touch devices: native momentum is better there.

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSmoothScroll({ reduced }) {
  const touch = matchMedia('(hover: none)').matches;
  if (reduced || touch) return null;

  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 0.95,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
