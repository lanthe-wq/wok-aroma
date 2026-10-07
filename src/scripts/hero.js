// Hero: the post-shutter reveal (tube light, painted name, flame, hung signs),
// the idle loops (tossed ingredients), and a gentle scroll parallax.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];

export function initHero({ reduced, preloading, mode }) {
  const hero = q('.hero');
  if (!hero) return { reveal() {} };

  const tube = q('.fascia__tube');
  const dim = q('[data-dim]');
  const tagline = q('[data-tagline]');
  const signs = qa('[data-hang]');
  const flames = qa('.flame');
  const toss = qa('.toss__inner');
  const actions = qa('[data-hero-actions] .btn, [data-hero-actions] .hero__where');

  const TUBE_DIM = '#8f867c';
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

    // Depth: the wok drifts up faster than the fascia as the shopfront leaves
    gsap.to('[data-hero-art]', {
      yPercent: -9,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.fascia', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // ── Starting state, set while the shutter still covers everything ────────
  let split = null;
  if (animated && preloading) {
    split = SplitText.create('[data-name]', { type: 'chars', charsClass: 'char', aria: 'auto' });
    gsap.set(split.chars, { yPercent: 70, opacity: 0 });
    gsap.set(tagline, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(dim, { opacity: 0.62 });
    gsap.set(tube, { backgroundColor: TUBE_DIM });
    gsap.set(flames, { scaleY: 0, transformOrigin: '50% 100%' });
    gsap.set(signs, { rotation: (i) => (i === 0 ? -10 : 10), y: -16, opacity: 0, transformOrigin: '50% 0' });
    gsap.set(actions, { y: 26, opacity: 0 });
    gsap.set(toss, { opacity: 0 });
  }

  // ── Reveal ─────────────────────────────────────────────────────────────────
  function reveal() {
    if (!animated || !preloading) return;

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => {
        loops.forEach((l) => l.play());
        ScrollTrigger.refresh();
      },
    });
    if (mode === 'preload-quick') tl.timeScale(1.5);

    // Tube-light flicker: the board comes on in stuttering steps
    const steps = [
      [0.0, 0.0],
      [0.07, 0.55],
      [0.13, 0.0],
      [0.24, 0.5],
      [0.29, 0.0],
      [0.43, 0.32],
      [0.5, 0.0],
    ];
    steps.forEach(([t, o]) => {
      tl.set(dim, { opacity: o }, t);
      tl.set(tube, { backgroundColor: o > 0.2 ? TUBE_DIM : '#fbf6e8' }, t);
    });

    tl.to(split.chars, { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.06 }, 0.2)
      .to(tagline, { clipPath: 'inset(0 0% 0 0)', duration: 0.85, ease: 'power3.inOut' }, 0.6)
      .to(flames, { scaleY: 1, duration: 1.05, stagger: 0.08 }, 0.4)
      .to(toss, { opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power1.out' }, 1.0)
      .to(signs, { rotation: 0, y: 0, opacity: 1, duration: 1.3, stagger: 0.14 }, 0.55)
      .to(actions, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.9);
  }

  return { reveal };
}
