// Hero: the post-shutter reveal (the neon name flickers on, the fire catches, the signs drop in),
// the idle loops (tossed ingredients), and a gentle scroll parallax. Sparks and the fire's
// light are CSS, so the scene is lit without any of this.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];

export function initHero({ reduced, preloading, mode }) {
  const hero = q('.hero');
  if (!hero) return { reveal() {} };

  const name = q('[data-name]');
  const tagline = q('[data-tagline]');
  const glow = q('[data-glow]');
  const sparks = qa('[data-sparks]');
  const signs = qa('[data-hang]');
  const flames = qa('.flame');
  const embers = q('.wok__embers');
  const toss = qa('.toss__inner');
  const actions = qa('[data-hero-actions] .btn, .hero__where');

  const animated = !reduced;

  // ── Idle loops: tossed ingredients ────────────────────────────────────────
  const loops = [];
  if (animated) {
    toss.forEach((el, i) => {
      const y0 = Number(el.parentElement.dataset.y) || 100;
      const rise = Math.min(34 + ((i * 37) % 58), Math.max(16, y0 * 0.7));
      const drift = ((i * 53) % 44) - 22;
      const spin = ((i * 71) % 110) - 55;
      const half = 0.62 + (i % 4) * 0.09;
      loops.push(
        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 0.15 + (i % 3) * 0.2,
            delay: (i * 0.23) % 1.6,
            paused: true,
          })
          .to(el, { y: -rise, x: drift, rotation: spin, duration: half, ease: 'power2.out' })
          .to(el, { y: 0, x: 0, rotation: 0, duration: half, ease: 'power2.in' }),
      );
    });

    ScrollTrigger.create({
      trigger: hero,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => loops.forEach((l) => (self.isActive && !preloading ? l.play() : l.pause())),
    });

    // Depth: the wok rises faster than the lettering as the shopfront leaves
    gsap.to('[data-hero-art]', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to(name, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // ── Starting state, set while the shutter still covers everything ────────
  if (animated && preloading) {
    hero.classList.add('is-igniting');
    gsap.set([name, tagline], { opacity: 0 });
    gsap.set(glow, { opacity: 0 });
    gsap.set(sparks, { opacity: 0 });
    gsap.set(flames, { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set(embers, { opacity: 0 });
    gsap.set(signs, { y: -18, opacity: 0 });
    gsap.set(actions, { y: 26, opacity: 0 });
    gsap.set(toss, { opacity: 0 });
  }

  // ── Reveal ─────────────────────────────────────────────────────────────────
  function reveal() {
    if (!animated || !preloading) return;

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        hero.classList.remove('is-igniting');
        loops.forEach((l) => l.play());
        ScrollTrigger.refresh();
      },
    });
    if (mode === 'preload-quick') tl.timeScale(1.5);

    // Tube light: the lettering comes on in stuttering steps, then holds
    const steps = [
      [0.0, 0.0],
      [0.07, 0.6],
      [0.13, 0.04],
      [0.24, 0.78],
      [0.29, 0.1],
      [0.43, 0.92],
      [0.5, 0.2],
      [0.62, 1],
    ];
    steps.forEach(([t, o]) => {
      tl.set(name, { opacity: o }, t);
      tl.set(tagline, { opacity: o }, t + 0.12);
    });

    tl.to(glow, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 0.3)
      .to(flames, { scaleY: 1, duration: 1.05, stagger: 0.08 }, 0.4)
      .to(embers, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 1.1)
      .to(sparks, { opacity: 1, duration: 1.2, ease: 'power1.out' }, 1.0)
      .to(toss, { opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power1.out' }, 1.0)
      .to(signs, { y: 0, opacity: 1, duration: 1.1, stagger: 0.14 }, 0.7)
      .to(actions, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.9);
  }

  return { reveal };
}
