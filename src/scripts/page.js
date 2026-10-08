// Everything that scrolls: ScrollTrigger and the modules built on it. This is the second chunk of
// the page's script; main.js starts fetching it straight away and runs it alongside the shutter, so
// the shutter and the hero reveal never wait for (or compete with) the rest.
//
// Order matters: ScrollTriggers are created top-to-bottom so that the pinned rate list has added its
// spacing before anything below it measures itself (triggers refresh in creation order).
// On desktop the modules are created in one go, as they always were. On phones each one gets its own
// idle slot, so no single task is long enough to be felt, and a visitor who scrolls early simply
// meets a page whose scroll effects arrive a moment later (nothing is hidden until its module runs).

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initSmoothScroll } from './smooth.js';
import { initHeroScroll } from './hero-scroll.js';
import { initMarquee } from './marquee.js';
import { initStatement } from './statement.js';
import { initLane } from './lane.js';
import { initCombos } from './combos.js';
import { initCurtain } from './curtain.js';
import { initPlay } from './play.js';
import { initUi } from './ui.js';
import { returnToPlace } from './place.js';

gsap.registerPlugin(ScrollTrigger);
// The address bar sliding away on a phone is not a resize worth measuring the whole page for, and
// load / fonts / shutter-gone all want the same single refresh, which is done below (debounced).
ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: 'visibilitychange,resize' });

const idle = () =>
  new Promise((resolve) => {
    if ('requestIdleCallback' in window) requestIdleCallback(() => resolve(), { timeout: 250 });
    else setTimeout(resolve, 24);
  });

export async function boot({ reduced, compact, preloading, quiet = () => null, shutterUp = () => false }) {
  // (if the smooth-scroll chunk cannot load, the page simply scrolls natively)
  const lenis = await initSmoothScroll({ reduced }).catch(() => null);
  if (preloading) lenis?.stop();

  // One debounced measure for everything that can move the layout (fonts, load, the shutter going).
  let timer = 0;
  let measuring = false;
  const refresh = (delay = 150) => {
    clearTimeout(timer);
    timer = setTimeout(() => measuring && ScrollTrigger.refresh(), delay);
  };
  document.fonts?.ready.then(() => refresh());
  addEventListener('load', () => refresh(), { once: true });

  const steps = [
    () => initHeroScroll({ reduced }),
    () => initMarquee({ reduced }),
    () => initStatement({ reduced }),
    () => initLane({ lenis }),
    () => initCombos({ reduced }),
    () => initCurtain({ reduced }),
    () => initPlay({ reduced }),
    () => initUi({ lenis, reduced }),
  ];
  for (const step of steps) {
    // sections still held back behind the shutter cannot be measured yet (and, on phones, the
    // lift and the reveal get the main thread to themselves)
    for (let wait = quiet(); wait; wait = quiet()) await wait;
    if (compact) await idle();
    try {
      step();
    } catch (error) {
      console.error(error);
    }
  }

  // The browser put a #section link or a reload where it was before the pinned rate list had added
  // its height above it; put the visitor back now that everything is in place, while the shutter
  // still holds the page still (a visitor already scrolling is left alone).
  if (shutterUp()) returnToPlace();

  return {
    lenis,
    // the shutter is gone and every module is in place: start scrolling smoothly and measure once
    settle() {
      lenis?.start();
      measuring = true;
      refresh(0);
    },
  };
}
