// The shutter preloader.
//
// Progress is real: it rises with fonts and the window load event, but never
// faster than a floor so the sequence always reads. When it hits 100 the shutter
// lifts in two stages (lift, catch, lift, with a rattle), the hero is revealed
// during the second stage, and the shutter stays up.
//
// Variants (chosen by the inline script in Base.astro):
//   preload        first visit this session: full sequence
//   preload-quick  repeat visit this session: short version
//   preload-lite   reduced motion: a plain progress plate, no movement

import gsap from 'gsap';

const STATUS = [
  [0, 'Lighting the gas'],
  [34, 'Heating the wok'],
  [68, 'Tossing the first order'],
  [96, 'Shutter going up'],
];

export function runPreloader({ mode, onReveal, onDone }) {
  const root = document.documentElement;
  const shutter = document.getElementById('shutter');

  const finish = () => {
    root.classList.remove('preload', 'preload-quick', 'preload-lite');
    shutter?.remove();
    onDone?.();
  };
  if (!shutter) return finish();

  const sheet = shutter.querySelector('[data-sheet]');
  const drum = shutter.querySelector('.shutter__drum');
  const countEl = shutter.querySelector('[data-count]');
  const statusEl = shutter.querySelector('[data-status]');

  const lite = mode === 'preload-lite';
  const quick = mode === 'preload-quick';
  let minMs = lite ? 700 : quick ? 1100 : 2400;

  try {
    sessionStorage.setItem('wa-seen', '1');
  } catch (e) {
    /* storage can be blocked; the sequence still works */
  }

  // ── Real progress sources ──────────────────────────────────────────────────
  let target = 12;
  const raise = (v) => {
    target = Math.max(target, v);
  };

  Promise.all([
    document.fonts.load('1em "Yatra One"'),
    document.fonts.load('600 1em "Teko Variable"'),
    document.fonts.load('400 1em Hind'),
  ])
    .catch(() => {})
    .then(() => raise(66));

  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => addEventListener('load', resolve, { once: true }));
  loaded.then(() => raise(100));

  // Any key or click skips ahead
  let timeScale = 1;
  const skip = () => {
    minMs = 0;
    timeScale = 3;
    lifting?.timeScale(3);
  };
  addEventListener('keydown', skip, { once: true });
  shutter.addEventListener('pointerdown', skip, { once: true });

  // ── Counter loop ───────────────────────────────────────────────────────────
  const t0 = performance.now();
  let shown = 0;
  let statusIdx = -1;
  let lifting = null;
  let done = false;

  const paint = () => {
    const n = Math.round(shown);
    countEl.textContent = String(n);
    let idx = 0;
    STATUS.forEach(([from], i) => {
      if (n >= from) idx = i;
    });
    if (idx !== statusIdx) {
      statusIdx = idx;
      statusEl.textContent = STATUS[idx][1];
    }
  };

  const tick = () => {
    if (done) return;
    const elapsed = (performance.now() - t0) * timeScale;
    const cap = Math.min(target, minMs ? (elapsed / minMs) * 100 : 100);
    shown += (cap - shown) * 0.16;
    if (cap >= 100 && 100 - shown < 0.6) shown = 100;
    paint();
    if (shown >= 100) {
      done = true;
      gsap.ticker.remove(tick);
      open();
    }
  };
  gsap.ticker.add(tick);
  paint();

  // ── Opening ────────────────────────────────────────────────────────────────
  function open() {
    removeEventListener('keydown', skip);

    if (lite) {
      gsap.to(shutter, {
        opacity: 0,
        duration: 0.35,
        ease: 'power1.out',
        onComplete: finish,
      });
      return;
    }

    const H = sheet.offsetHeight;
    const drumH = drum.offsetHeight;
    const lift = { p: 0 };
    // Rattle: slats shake sideways while the shutter moves
    const apply = (amp) =>
      gsap.set(sheet, { y: -lift.p * H, x: (Math.random() - 0.5) * 2 * amp });

    lifting = gsap.timeline({ onComplete: end });
    lifting.timeScale(timeScale);

    if (quick) {
      lifting
        .to(lift, {
          p: 1,
          duration: 0.95,
          ease: 'power3.inOut',
          onUpdate: () => apply(Math.sin(Math.PI * lift.p) * 1.6),
        })
        .add(() => onReveal?.(), '>-0.45');
    } else {
      lifting
        // stage one: a short pull, then it catches
        .to(lift, {
          p: 0.13,
          duration: 0.55,
          ease: 'power2.out',
          onUpdate: () => apply(2.4),
        })
        .set(sheet, { x: 0 })
        .to({}, { duration: 0.32 })
        // stage two: the full roll
        .to(lift, {
          p: 1,
          duration: 1.45,
          ease: 'power3.inOut',
          onUpdate: () => apply(Math.sin(Math.PI * lift.p) * 2.2 + 0.3),
        })
        .add(() => onReveal?.(), '>-0.75');
    }

    lifting.to(drum, { y: -drumH - 4, duration: 0.4, ease: 'power2.in' }, '>-0.05');
  }

  function end() {
    finish();
  }
}
