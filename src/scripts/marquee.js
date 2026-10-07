// Ticker band: runs at a steady pace, speeds up with scroll velocity,
// and reverses when the visitor scrolls back up.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMarquee({ reduced }) {
  const el = document.querySelector('[data-marquee]');
  const track = el?.querySelector('[data-marquee-track]');
  if (!el || !track || reduced) return;

  document.documentElement.classList.add('js-marquee');

  const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 46, repeat: -1 });
  loop.pause();

  let inView = false;
  let dir = 1;
  let boost = 0;
  let smooth = 0;

  ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => {
      inView = self.isActive;
      inView ? loop.play() : loop.pause();
    },
  });

  ScrollTrigger.create({
    onUpdate: (self) => {
      dir = self.direction || dir;
      boost = Math.min(Math.abs(self.getVelocity()) / 240, 6);
    },
  });

  gsap.ticker.add(() => {
    if (!inView) return;
    boost *= 0.93;
    smooth += (boost - smooth) * 0.14;
    loop.timeScale(dir * (1 + smooth));
  });
}
