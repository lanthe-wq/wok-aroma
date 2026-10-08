// Putting a visitor back where they were: at the scroll position they left after a reload or a trip
// to the map app and back, or else at the #section a link came in with.
//
// The browser does both at load, but by then the page is not its final height: on phones the
// sections below the hero are still held back behind the shutter (held.js), and on desktop the pinned
// rate list has not yet added its height (page.js). So the position is saved as the page is left and
// restored once everything is in place, while the shutter still holds the page still.
//
// A saved position wins over the #hash: ui.js writes the section being visited into the address, so
// a reload or Back with a hash in the URL means "where I was", not "the top of that section".

// Has the visitor taken hold of the page yet? Scroll position cannot say: ScrollTrigger moves it
// itself while it measures. Only their own wheel, touch, keys or scrollbar drag count.
export const visitor = { moved: false };

export function rememberPlace() {
  const root = document.documentElement;
  const moved = () => (visitor.moved = true);
  ['wheel', 'touchmove', 'keydown', 'mousedown'].forEach((type) =>
    addEventListener(type, moved, { once: true, passive: true }),
  );
  addEventListener('pagehide', () => {
    try {
      if (root.classList.contains('preload')) {
        // still behind the shutter: nothing worth keeping, and an old position must not outlive this visit
        sessionStorage.removeItem('wa-y');
        return;
      }
      sessionStorage.setItem('wa-y', String(Math.round(scrollY)));
    } catch (e) {
      /* storage can be blocked; the page just opens at the top */
    }
  });
}

export function returnToPlace() {
  const type = performance.getEntriesByType?.('navigation')[0]?.type;
  if (type === 'reload' || type === 'back_forward') {
    try {
      const y = Number(sessionStorage.getItem('wa-y'));
      if (y > 0) {
        scrollTo(0, y);
        return;
      }
    } catch (e) {
      /* nothing saved */
    }
  }
  if (location.hash.length > 1) {
    try {
      document.querySelector(location.hash)?.scrollIntoView();
    } catch (e) {
      /* not a selector (e.g. #1abc): nothing to follow */
    }
  }
}
