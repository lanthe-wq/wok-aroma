import { defineConfig } from 'astro/config';

// Static output: the build is a folder of plain files any host can serve.
// Set `site` to the real domain before launch (used for canonical + social tags).
export default defineConfig({
  output: 'static',
  site: 'https://wokaroma.example',
  // Astro 7's default whitespace rules. Do not change to `true`: it keeps
  // whitespace that the default drops, and the rate tables render slightly wider.
  compressHTML: 'jsx',
  // One page, no router: nothing to prefetch.
  prefetch: false,
  // The stylesheet is inlined in the HTML: the first paint no longer waits for a
  // second round trip. Measured at 1.6 Mbps / 150 ms in the README.
  build: { inlineStylesheets: 'always' },
});
