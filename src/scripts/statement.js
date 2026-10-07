// The statement is read as you scroll: each word is "painted in" in turn.
// Words stay readable at their resting opacity; without JS they are simply full colour.

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

export function initStatement({ reduced }) {
  const el = document.querySelector('[data-statement]');
  if (!el || reduced) return;

  const split = SplitText.create(el, { type: 'words', wordsClass: 'word', aria: 'auto' });

  gsap.fromTo(
    split.words,
    { opacity: 0.22 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: 'top 78%',
        end: 'bottom 55%',
        scrub: true,
      },
    },
  );
}
