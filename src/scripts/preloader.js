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
//
// On phones and touch screens (`compact`) the same beats run on a shorter clock, because the people
// holding them are usually after the phone number or the rate list: a shorter counter, a quicker
// two-stage lift, and a ceiling on how long it will wait for the load event. `?preload` forces the
// full sequence on any screen.

import gsap from 'gsap';

const STATUS = [
  [0, 'Lighting the gas'],
  [34, 'Heating the wok'],
  [68, 'Tossing the first order'],
  [96, 'Shutter going up'],
];

export function runPreloader({ mode, compact = false, held = null, onOpen, onReveal, onDone }) {
  const root = document.documentElement;
  const shutter = document.getElementById('shutter');

  const finish = () => {
    held?.releaseAll();
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
  let minMs = compact ? (lite ? 400 : quick ? 450 : 550) : lite ? 700 : quick ? 1100 : 2400;

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

  const fontsReady = Promise.all([
    document.fonts.load('1em "Yatra One"'),
    document.fonts.load('600 1em "Teko Variable"'),
    document.fonts.load('400 1em Hind'),
  ])
    .catch(() => {})
    .then(() => {
      raise(66);
      // the page below the hero (kept out of layout behind the shutter on phones) comes in now
      held?.start();
    });

  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => addEventListener('load', resolve, { once: true }));
  // 100 means the page is loaded and, on phones, every section has been let in
  loaded.then(() => held?.start());
  Promise.all([loaded, held?.done]).then(() => raise(100));
  // Slow connections: a phone is not held behind the shutter for the sake of the last font file
  // or the load event. Once the fonts the hero is lit in have arrived, 2.6 s after the
  // navigation began is the longest it will wait (the rest swaps in behind the lifted shutter).
  if (compact) {
    const cap = () => Promise.resolve(held?.done).then(() => raise(100));
    fontsReady.then(() => setTimeout(cap, Math.max(150, 2600 - performance.now())));
    // ...and if a font request never answers at all, 4.5 s is the longest of all: the shutter lifts and
    // the text sets in whatever face is to hand, then swaps when (if) the font arrives
    setTimeout(() => {
      held?.start();
      cap();
    }, Math.max(150, 4500 - performance.now()));
  }

  // Any key or click skips ahead
  let timeScale = 1;
  const skip = () => {
    minMs = 0;
    timeScale = 3;
    lifting?.timeScale(3);
    held?.releaseAll();
  };
  addEventListener('keydown', skip, { once: true });
  shutter.addEventListener('pointerdown', skip, { once: true });

  // ── Counter loop ───────────────────────────────────────────────────────────
  const t0 = performance.now();
  let shown = 0;
  let statusIdx = -1;
  let lifting = null;
  let done = false;

  let lastN = -1;
  const paint = () => {
    const n = Math.round(shown);
    if (n !== lastN) {
      lastN = n;
      countEl.textContent = String(n);
    }
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
    shown += (cap - shown) * (compact ? 0.28 : 0.16);
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
    held?.releaseAll();
    onOpen?.();

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

    // [pull, catch, roll, how far into the roll the hero is revealed], in seconds
    const [pull, hold, roll, early] = compact ? [0.22, 0.1, 0.6, 0.35] : [0.55, 0.32, 1.45, 0.75];

    if (quick) {
      const dur = compact ? 0.6 : 0.95;
      lifting
        .to(lift, {
          p: 1,
          duration: dur,
          ease: 'power3.inOut',
          onUpdate: () => apply(Math.sin(Math.PI * lift.p) * 1.6),
        })
        .add(() => onReveal?.(), compact ? '>-0.3' : '>-0.45');
    } else {
      lifting
        // stage one: a short pull, then it catches
        .to(lift, {
          p: 0.13,
          duration: pull,
          ease: 'power2.out',
          onUpdate: () => apply(2.4),
        })
        .set(sheet, { x: 0 })
        .to({}, { duration: hold })
        // stage two: the full roll
        .to(lift, {
          p: 1,
          duration: roll,
          ease: 'power3.inOut',
          onUpdate: () => apply(Math.sin(Math.PI * lift.p) * 2.2 + 0.3),
        })
        .add(() => onReveal?.(), `>-${early}`);
    }

    lifting.to(drum, { y: -drumH - 4, duration: compact ? 0.25 : 0.4, ease: 'power2.in' }, '>-0.05');
  }

  function end() {
    finish();
  }
}
