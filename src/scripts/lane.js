// The rate list.
//
// Desktop with motion: the section pins and the boards are carried sideways like
// shopfronts down a lane. They hang on chains and sway with scroll velocity.
// Everywhere else (phones, short screens, reduced motion): boards simply stack,
// and the ruler becomes a sticky row of jump chips.
//
// The veg / non-veg filter dims rows and never removes them, so layout never shifts.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PINNED_QUERY =
  '(min-width: 900px) and (min-height: 640px) and (hover: hover) and (prefers-reduced-motion: no-preference)';
const STACKED_QUERY =
  '(max-width: 899px), (max-height: 639px), (hover: none), (prefers-reduced-motion: reduce)';

export function initLane({ lenis }) {
  const lane = document.querySelector('[data-lane]');
  if (!lane) return;

  const track = lane.querySelector('[data-track]');
  const boards = [...lane.querySelectorAll('[data-board]')];
  const ruler = lane.querySelector('[data-ruler]');
  const chipRow = ruler.querySelector('.lane__ruler-track');
  const chips = [...ruler.querySelectorAll('a')];
  const meter = lane.querySelector('[data-meter]');

  // Filter: shared by both modes
  const filterButtons = [...lane.querySelectorAll('.filter [data-set]')];
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      lane.dataset.filter = btn.dataset.set;
      filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    });
  });
  lane.classList.add('filter-live'); // the buttons are only shown once they work (sections.css)

  const setCurrent = (index) => {
    chips.forEach((chip, i) => {
      if (i === index) chip.setAttribute('aria-current', 'true');
      else chip.removeAttribute('aria-current');
    });
  };

  const mm = gsap.matchMedia();

  // ── Pinned lane ────────────────────────────────────────────────────────────
  mm.add(PINNED_QUERY, () => {
    lane.classList.add('lane--pinned');

    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    let current = -1;

    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: lane,
        start: 'top top',
        end: () => `+=${Math.round(dist() * 0.78)}`,
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(meter, { scaleX: self.progress });
          const x = -self.progress * dist();
          const mid = window.innerWidth / 2;
          let best = 0;
          let bestGap = Infinity;
          boards.forEach((b, i) => {
            const gap = Math.abs(b.offsetLeft + b.offsetWidth / 2 + x - mid);
            if (gap < bestGap) {
              bestGap = gap;
              best = i;
            }
          });
          if (best !== current) {
            current = best;
            setCurrent(best);
          }
        },
      },
    });
    const st = tween.scrollTrigger;

    // Jump chips scroll the lane so the chosen board sits mid-screen
    const jump = (i) => {
      const b = boards[i];
      const wanted = b.offsetLeft + b.offsetWidth / 2 - window.innerWidth / 2;
      const x = gsap.utils.clamp(0, dist(), wanted);
      const y = st.start + (x / (dist() || 1)) * (st.end - st.start);
      if (lenis) lenis.scrollTo(y, { duration: 1.6 });
      else window.scrollTo({ top: y, behavior: 'smooth' });
    };
    const handlers = chips.map((chip, i) => {
      const fn = (e) => {
        e.preventDefault();
        jump(i);
      };
      chip.addEventListener('click', fn);
      return fn;
    });

    // Sway: boards swing a little against the direction of travel
    const swayEls = boards.map((b) => b.querySelector('[data-sway]'));
    const rotateTo = swayEls.map((el) => gsap.quickTo(el, 'rotation', { duration: 0.8, ease: 'power3.out' }));
    const sway = () => {
      const v = lenis ? lenis.velocity : st.getVelocity() / 60;
      const r = gsap.utils.clamp(-2.4, 2.4, v * -0.07);
      rotateTo.forEach((fn) => fn(r));
    };
    gsap.ticker.add(sway);

    return () => {
      gsap.ticker.remove(sway);
      chips.forEach((chip, i) => chip.removeEventListener('click', handlers[i]));
      gsap.set(swayEls, { clearProps: 'rotation' });
      gsap.set(meter, { clearProps: 'transform' });
      lane.classList.remove('lane--pinned');
    };
  });

  // ── Stacked boards ─────────────────────────────────────────────────────────
  mm.add(STACKED_QUERY, () => {
    const offset = () => -(document.querySelector('.nav')?.offsetHeight ?? 52) - ruler.offsetHeight - 12;

    const handlers = chips.map((chip, i) => {
      const fn = (e) => {
        e.preventDefault();
        const b = boards[i];
        if (lenis) lenis.scrollTo(b, { offset: offset(), duration: 1.3 });
        else {
          const y = b.getBoundingClientRect().top + window.scrollY + offset();
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      chip.addEventListener('click', fn);
      return fn;
    });

    // Keep the active chip in view in its own row, without moving the page
    const reveal = (i) => {
      const chip = chips[i];
      chipRow.scrollTo({
        left: chip.offsetLeft - chipRow.clientWidth / 2 + chip.offsetWidth / 2,
        behavior: 'smooth',
      });
    };

    const triggers = boards.map((b, i) =>
      ScrollTrigger.create({
        trigger: b,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            setCurrent(i);
            reveal(i);
          }
        },
      }),
    );

    return () => {
      chips.forEach((chip, i) => chip.removeEventListener('click', handlers[i]));
      triggers.forEach((t) => t.kill());
    };
  });
}
