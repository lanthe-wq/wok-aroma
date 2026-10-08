// The statement is read as you scroll: each word is "painted in" in turn.
// Words stay readable at their resting opacity; without JS they are simply full colour.
//
// The words are wrapped by a few lines of our own rather than by a text-splitting plugin: the
// plugin is the size of this whole module several times over, and splitting words is all it did here.

import gsap from 'gsap';

// Wrap every word of `root` (also inside <em> and the like) in <span class="word">, keeping the
// spaces between them as plain text so lines still break where they always did and screen readers
// still read an ordinary sentence.
function splitWords(root) {
  const words = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);

  texts.forEach((node) => {
    const parts = node.nodeValue.split(/(\s+)/);
    if (parts.length < 2 && !parts[0].trim()) return;
    const frag = document.createDocumentFragment();
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const span = document.createElement('span');
      span.className = 'word';
      span.style.cssText = 'position:relative;display:inline-block';
      span.textContent = part;
      words.push(span);
      frag.appendChild(span);
    });
    node.replaceWith(frag);
  });
  return words;
}

export function initStatement({ reduced }) {
  const el = document.querySelector('[data-statement]');
  if (!el || reduced) return;

  const words = splitWords(el);

  gsap.fromTo(
    words,
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
