// Putting a visitor back where they were: at the #section a link came in with, or, after a reload or
// a trip to the map app and back, at the scroll position they left.
//
// The browser does both at load, but by then the page is not its final height: on phones the
// sections below the hero are still held back behind the shutter (held.js), and on desktop the pinned
// rate list has not yet added its height (page.js). So the position is saved as the page is left and
// restored once everything is in place, while the shutter still holds the page still.

export function rememberPlace() {
  const root = document.documentElement;
  addEventListener('pagehide', () => {
    if (root.classList.contains('preload')) return; // still behind the shutter: nothing worth keeping
    try {
      sessionStorage.setItem('wa-y', String(Math.round(scrollY)));
    } catch (e) {
      /* storage can be blocked; the page just opens at the top */
    }
  });
}

export function returnToPlace() {
  if (location.hash.length > 1) {
    try {
      document.querySelector(location.hash)?.scrollIntoView();
    } catch (e) {
      /* not a selector (e.g. #1abc): nothing to follow */
    }
    return;
  }
  const type = performance.getEntriesByType?.('navigation')[0]?.type;
  if (type !== 'reload' && type !== 'back_forward') return;
  try {
    const y = Number(sessionStorage.getItem('wa-y'));
    if (y > 0) scrollTo(0, y);
  } catch (e) {
    /* nothing saved */
  }
}
