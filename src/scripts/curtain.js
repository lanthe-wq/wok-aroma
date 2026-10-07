// Footer curtain: on roomy desktops the footer is fixed behind the page, and the
// page lifts away like a shutter to uncover it. The footer text rises as it is revealed.
// Anywhere it would not fit, the footer is an ordinary block.

import gsap from 'gsap';

export function initCurtain({ reduced }) {
  const footer = document.querySelector('[data-footer]');
  const inner = document.querySelector('[data-footer-inner]');
  const curtain = document.querySelector('[data-curtain]');
  if (!footer || !curtain) return;

  const root = document.documentElement;
  const roomy = matchMedia('(min-width: 900px) and (min-height: 640px)');

  const measure = () => {
    root.classList.remove('has-curtain');
    root.style.removeProperty('--footer-h');
    if (!roomy.matches || reduced) return;
    const h = footer.offsetHeight;
    if (h > window.innerHeight * 0.92) return;
    root.style.setProperty('--footer-h', `${h}px`);
    root.classList.add('has-curtain');
  };

  measure();
  document.fonts.ready.then(measure);
  let t;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(measure, 150);
  });

  if (reduced) return;

  gsap.fromTo(
    inner,
    { yPercent: -28, opacity: 0.2 },
    {
      yPercent: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: curtain,
        start: 'bottom bottom',
        end: () => `bottom bottom-=${footer.offsetHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}
