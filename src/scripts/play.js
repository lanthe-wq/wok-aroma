// Small delights, each one a mechanism of the shopfront rather than decoration:
//   the wok answers a tap (everything in it is thrown up and caught),
//   a price roundel is stamped onto each combo poster as it is pasted,
//   and the delivery order rides its dotted road from the shop to your door.
// The rate-list marker is pure CSS (play.css). Nothing here is needed to read the page:
// the "before" state is only set once we know the animation will run, and arrivals
// use exponential ease-out (no springs, no bounce).

import gsap from 'gsap';

const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];

export function initPlay({ reduced }) {
  if (reduced) return;
  initWok();
  initStamps();
  initRoute();
}

// ── The wok: tap it and the flames rear up and everything in it goes airborne ──
function initWok() {
  const art = q('[data-hero-art]');
  const hero = q('.hero');
  if (!art || !hero) return;

  const flames = qa('.flame', art);
  const food = q('.wok__food', art);
  if (!food || !flames.length) return;

  const root = document.documentElement;
  art.classList.add('is-tossable');

  // The timeline is built on the first tap, not at load: it is a few dozen tweens that nobody
  // needs until someone touches the wok.
  let toss = null;
  const build = () => {
    // pieces hidden on small screens (hero.css / WokArt) are left out
    const bits = qa('.toss', art).filter((el) => el.getClientRects().length);

    // Each piece has its own height, drift and spin; fixed, so every toss is the same toss.
    // The group only travels (the idle loops own the inner group), and the spin is applied to
    // the drawn shape itself so it turns about its own middle. The second leg exactly undoes the first.
    const shapes = bits.map((el) => q('.toss__inner > *', el));
    const rise = bits.map((el, i) => {
      const y0 = Number(el.dataset.y) || 100;
      return Math.min(70 + ((i * 41) % 64), y0 + 60);
    });
    const drift = bits.map((_, i) => (((i * 53) % 40) - 20) * 0.6 + (i % 2 ? 6 : -6));
    const spin = bits.map((_, i) => ((i * 71) % 300) - 150);
    const stagger = 0.012;

    const tl = gsap.timeline({ paused: true });
    tl
      // the burner roars: flames stretch up from the middle outwards, then settle
      .to(
        flames,
        {
          scaleY: 1.3,
          transformOrigin: '50% 100%',
          duration: 0.2,
          ease: 'power2.out',
          stagger: { each: 0.028, from: 'center' },
        },
        0,
      )
      .to(
        flames,
        { scaleY: 1, duration: 0.9, ease: 'expo.out', stagger: { each: 0.028, from: 'center' } },
        0.2,
      )
      // the heap in the bowl is flipped
      .to(food, { y: -12, duration: 0.2, ease: 'power2.out' }, 0)
      .to(food, { y: 0, duration: 0.55, ease: 'expo.out' }, 0.2)
      // up and over...
      .to(
        bits,
        {
          y: (i) => `-=${rise[i]}`,
          x: (i) => `+=${drift[i]}`,
          duration: 0.5,
          ease: 'power2.out',
          stagger,
        },
        0.04,
      )
      .to(shapes, { rotation: (i) => spin[i], duration: 0.5, ease: 'power2.out', stagger }, 0.04)
      // ...and back down into the wok
      .to(
        bits,
        {
          y: (i) => `+=${rise[i]}`,
          x: (i) => `-=${drift[i]}`,
          duration: 0.5,
          ease: 'power2.in',
          stagger,
        },
        0.56,
      )
      .to(shapes, { rotation: 0, duration: 0.5, ease: 'power2.in', stagger }, 0.56);
    return tl;
  };

  // `click` rather than pointerdown: a finger dragging the page across the wok is not a tap
  art.addEventListener('click', () => {
    if (root.classList.contains('preload') || hero.classList.contains('is-igniting')) return;
    if (!toss) toss = build();
    if (toss.isActive()) return;
    toss.restart();
  });
}

// ── Combo posters: the price roundel is stamped on as each one is pasted ─────
function initStamps() {
  gsap.utils.toArray('[data-slab]').forEach((slab) => {
    const price = q('.slab__price', slab);
    if (!price) return;

    gsap.from(price, {
      scale: 2.3,
      opacity: 0,
      rotation: -16,
      duration: 0.75,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: price,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // the ring flares as the stamp meets the paper
          gsap.delayedCall(0.2, () => price.classList.add('is-stamped'));
        },
      },
    });
  });
}

// ── Delivery: the order rides the dotted road, shop to door ──────────────────
function initRoute() {
  const route = q('[data-route]');
  if (!route) return;
  const road = q('[data-route-road]', route);
  const line = q('[data-route-line]', route);
  const runner = q('[data-route-runner]', route);
  const door = q('[data-route-door]', route);
  if (!road || !line || !runner || !door) return;

  // Starts when the road comes into view, then plays through on its own clock
  // (it is a trip, not a scrubber). Before that: the order is at the shop and the road is unpainted.
  gsap
    .timeline({
      scrollTrigger: { trigger: route, start: 'top 85%', once: true, invalidateOnRefresh: true },
    })
    .fromTo(
      runner,
      { x: () => -(road.clientWidth - runner.offsetWidth) },
      { x: 0, duration: 2.1, ease: 'power2.inOut' },
      0,
    )
    .fromTo(line, { xPercent: -100 }, { xPercent: 0, duration: 2.1, ease: 'power2.inOut' }, 0)
    // it arrives: the door plate is knocked, once
    .fromTo(
      door,
      { scale: 1.12 },
      { scale: 1, duration: 0.7, ease: 'expo.out', immediateRender: false },
      '>-0.05',
    );
}
