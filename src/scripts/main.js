// Orchestrator. The shutter and the hero reveal only need GSAP's core, so they are the first chunk of
// script. Everything that scrolls (ScrollTrigger, the lane, the ticker, the curtain...) is a second
// chunk, fetched at once and set up alongside the shutter in page.js; see the note at the top of
// that file about creation order.

import { runPreloader } from './preloader.js';
import { initHero } from './hero.js';
import { holdBelow } from './held.js';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mode = root.getAttribute('data-preload') || '';
const preloading = root.classList.contains('preload');

// Phones and touch screens get the shorter shutter and the lighter set-up; `?preload` is the
// way to see the full desktop sequence anywhere.
const forced = /[?&]preload/.test(location.search);
const compact = !forced && matchMedia('(hover: none), (max-width: 899px)').matches;

// While the shutter is being lifted the rest of the page waits its turn, so the lift and the reveal
// have the main thread to themselves.
let lifting = false;
let liftDone = () => {};
const afterLift = new Promise((resolve) => (liftDone = resolve));

// On phones the sections below the hero are held out of layout until the shutter is ready to lift
const held = preloading ? holdBelow() : null;
const quiet = () => (held && !held.isDone ? held.done : compact && lifting ? afterLift : null);
let shutterUp = preloading;

// Start fetching the rest now; it never blocks the shutter. If it fails to load the page is still
// complete (nothing is hidden until its module runs).
const page = import('./page.js')
  .then((m) => m.boot({ reduced, compact, preloading, quiet, shutterUp: () => shutterUp }))
  .catch((error) => {
    console.error(error);
    return null;
  });

const hero = initHero({ reduced, preloading, mode, compact });

const shutterGone = new Promise((resolve) => {
  if (!preloading) return resolve();
  runPreloader({
    mode,
    compact,
    held,
    onOpen: () => (lifting = true),
    onReveal: () => hero.reveal(),
    onDone: () => {
      shutterUp = false;
      lifting = false;
      liftDone();
      hero.live();
      resolve();
    },
  });
});

// Smooth scrolling starts and the page is measured once the shutter is up and the modules are in place
Promise.all([page, shutterGone]).then(([p]) => p?.settle());
