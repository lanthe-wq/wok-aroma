// Small interface behaviour: nav state, section highlighting, anchor scrolling.

import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initUi({ lenis, reduced }) {
  const nav = document.querySelector('[data-nav]');
  const hero = document.querySelector('.hero');

  // Nav wordmark appears once the painted name has scrolled away
  if (nav && hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom 70%',
      onEnter: () => nav.classList.add('is-scrolled'),
      onLeaveBack: () => nav.classList.remove('is-scrolled'),
    });
  }

  // Highlight the section being read
  const links = [...document.querySelectorAll('.nav__links a')];
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      },
    });
  });

  // In-page links glide (Lenis) or jump (reduced motion / touch)
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return; // e.g. the rate-list jump chips handle themselves
    const a = event.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash.length < 2) return;
    const target = hash === '#top' ? 0 : document.querySelector(hash);
    if (target === null) return;
    event.preventDefault();

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5 });
    } else {
      const y = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    }
    history.replaceState(null, '', hash === '#top' ? location.pathname : hash);
    // Keep keyboard focus where the visitor went
    if (target !== 0) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
}
