// Phones lay out the hero first and the rest of the page behind the shutter, one section at a time.
//
// The first thing a browser does with the page is lay all of it out, and on a phone that is the
// longest task there is (the rate list alone is about a third of it). While the shutter is down
// nobody can see below the hero anyway, so preloader.css holds those sections back
// (display: none) and this lets them in one by one in idle time, after the fonts the
// page is set in have arrived (so each section is laid out once, in its final type). The shutter
// does not lift until they are all in, and anything that cannot wait (a tap on the shutter, the
// failsafe) lets them all in at once, and then the visitor is put back where they were (place.js).

import { returnToPlace } from './place.js';

const PHONE = '(hover: none), (max-width: 899px)';

export function holdBelow() {
  if (!matchMedia(PHONE).matches) return null;
  const parts = [...document.querySelectorAll('main > :not(.hero), .footer')];
  if (!parts.length) return null;

  let isDone = false;
  let started = false;
  let finish = () => {};
  const done = new Promise((resolve) => (finish = resolve));

  const release = (el) => el.classList.add('is-ready');
  const later = (fn) =>
    'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 200 }) : setTimeout(fn, 60);

  const complete = () => {
    if (isDone) return;
    isDone = true;
    returnToPlace(); // the browser tried at load, when the sections below the hero had no height
    finish();
  };

  const releaseAll = () => {
    parts.splice(0).forEach(release);
    complete();
  };

  const step = () => {
    const el = parts.shift();
    if (!el) return complete();
    release(el);
    later(step);
  };

  // If the shutter goes by any route other than the preloader finishing (the inline failsafe in the
  // page head removes html.preload after nine seconds), nothing may stay held.
  const root = document.documentElement;
  const watch = new MutationObserver(() => {
    if (root.classList.contains('preload')) return;
    watch.disconnect();
    releaseAll();
  });
  watch.observe(root, { attributes: true, attributeFilter: ['class'] });

  return {
    // let the sections in, one per idle slot
    start() {
      if (started) return;
      started = true;
      step();
    },
    releaseAll,
    done,
    get isDone() {
      return isDone;
    },
  };
}
