// Hero: the post-shutter reveal (the neon name flickers on, the fire catches, the signs drop in)
// and the switch that lets the hero's loops run. Sparks, flames, steam and the tossed pieces are all
// CSS, so the scene is lit without any of this; the loops are held (hero.css) while the shutter
// covers them and while the hero is off screen, and GSAP only plays the one-off entrance.
// The scroll parallax lives in hero-scroll.js, which needs ScrollTrigger and loads later.

import gsap from 'gsap';

const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];

export function initHero({ reduced, preloading, mode, compact }) {
  const hero = q('.hero');
  if (!hero) return { reveal() {}, live() {} };

  const name = q('[data-name]');
  const tagline = q('[data-tagline]');
  const glow = q('[data-glow]');
  const sparks = qa('[data-sparks]');
  const signs = qa('[data-hang]');
  const flames = qa('.flame');
  const embers = q('.wok__embers');
  const toss = q('.wok__toss');
  const actions = qa('[data-hero-actions] .btn, .hero__where');

  const animated = !reduced;

  // Off screen the loops stand still (see hero.css)
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        hero.classList.toggle('is-off', !e.isIntersecting);
      },
      { threshold: 0 },
    ).observe(hero);
  }

  // Loops are held until the shutter lets go of the hero (a visit with no shutter lights up at once)
  const live = () => hero.classList.add('is-live');
  if (!preloading) live();

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
    live();
    if (!animated || !preloading) return;

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => hero.classList.remove('is-igniting'),
    });
    // phones get the same beats, a little faster
    if (mode === 'preload-quick') tl.timeScale(compact ? 2 : 1.5);
    else if (compact) tl.timeScale(1.45);

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
      .to(toss, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 1.0)
      .to(signs, { y: 0, opacity: 1, duration: 1.1, stagger: 0.14 }, 0.7)
      .to(actions, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.9);
  }

  return { reveal, live };
}
