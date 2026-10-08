// Orchestrator. Order matters: ScrollTriggers are created top-to-bottom so that the
// pinned rate list has added its spacing before anything below it measures itself.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

import { initSmoothScroll } from './smooth.js';
import { runPreloader } from './preloader.js';
import { initHero } from './hero.js';
import { initMarquee } from './marquee.js';
import { initStatement } from './statement.js';
import { initLane } from './lane.js';
import { initCombos } from './combos.js';
import { initCurtain } from './curtain.js';
import { initPlay } from './play.js';
import { initUi } from './ui.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mode = root.getAttribute('data-preload') || '';
const preloading = root.classList.contains('preload');

const lenis = initSmoothScroll({ reduced });
if (preloading) lenis?.stop();

const hero = initHero({ reduced, preloading, mode });
initMarquee({ reduced });
initStatement({ reduced });
initLane({ lenis });
initCombos({ reduced });
initCurtain({ reduced });
initPlay({ reduced });
initUi({ lenis, reduced });

const settle = () => {
  lenis?.start();
  ScrollTrigger.refresh();
};

if (preloading) {
  runPreloader({
    mode,
    onReveal: () => hero.reveal(),
    onDone: settle,
  });
} else {
  settle();
}

// Layout moves when fonts arrive; measure again
document.fonts.ready.then(() => ScrollTrigger.refresh());
addEventListener('load', () => ScrollTrigger.refresh());
