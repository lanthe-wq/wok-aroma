import { defineConfig } from 'astro/config';

// Static output: the build is a folder of plain files any host can serve.
// Set `site` to the real domain before launch (used for canonical + social tags).
export default defineConfig({
  output: 'static',
  site: 'https://wokaroma.example',
  build: { inlineStylesheets: 'auto' },
});
