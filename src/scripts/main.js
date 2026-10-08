// Orchestrator. The shutter and the hero reveal only need GSAP's core, so they are the first chunk of
// script. Everything that scrolls (ScrollTrigger, the lane, the ticker, the curtain...) is a second
// chunk, fetched at once and set up alongside the shutter in page.js; see the note at the top of
// that file about creation order.

import { runPreloader } from './preloader.js';
import { initHero } from './hero.js';
import { holdBelow } from './held.js';
import { rememberPlace } from './place.js';

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mode = root.getAttribute('data-preload') || '';
const preloading = root.classList.contains('preload');

rememberPlace();

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

let revealed = false;
const reveal = () => {
  if (revealed) return;
  revealed = true;
  hero.reveal();
};

const shutterGone = new Promise((resolve) => {
  if (!preloading) return resolve();

  let gone = false;
  const goneNow = () => {
    if (gone) return;
    gone = true;
    shutterUp = false;
    lifting = false;
    liftDone();
    hero.live();
    resolve();
  };

  // The inline failsafe in the page head takes the shutter away after nine seconds whatever happens
  // (a font request that never answers, say). The page must then be lit and scrollable, not left
  // with an invisible hero and smooth scrolling still switched off.
  const watch = new MutationObserver(() => {
    if (root.classList.contains('preload')) return;
    watch.disconnect();
    reveal();
    goneNow();
  });
  watch.observe(root, { attributes: true, attributeFilter: ['class'] });

  runPreloader({
    mode,
    compact,
    held,
    onOpen: () => (lifting = true),
    onReveal: reveal,
    onDone: goneNow,
  });
});

// Smooth scrolling starts and the page is measured once the shutter is up and the modules are in place
Promise.all([page, shutterGone]).then(([p]) => p?.settle());
