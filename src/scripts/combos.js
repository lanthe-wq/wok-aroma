// Combos: posters pasted one over the next. Each slab is sticky; as the next one
// arrives, the one beneath settles back (smaller, darker), the way bills layer on a wall.

import gsap from 'gsap';

export function initCombos({ reduced }) {
  if (reduced) return;
  const slabs = gsap.utils.toArray('[data-slab]');

  slabs.forEach((slab, i) => {
    const next = slabs[i + 1];
    if (!next) return;
    const shade = slab.querySelector('[data-shade]');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: next,
          start: 'top 88%',
          end: 'top 22%',
          scrub: true,
        },
      })
      .to(slab, { scale: 0.94, ease: 'none' }, 0)
      .to(shade, { opacity: 0.5, ease: 'none' }, 0);
  });
}
