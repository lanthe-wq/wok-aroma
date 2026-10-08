# Wok Aroma

One-page website for **Wok Aroma**, Ground Floor, Eros Market Place, GF 80, Shakti Khand 2, Indirapuram, Ghaziabad. Built with [Astro](https://astro.build) (static output), [GSAP](https://gsap.com) + ScrollTrigger, and [Lenis](https://lenis.darkroom.engineering) smooth scroll. Fonts are self-hosted.

The design is *The Rate Board*: a hand-painted shopfront, seen after dark. A steel shutter preloader lifts and stays up on a night kitchen where the wok is the only light, the menu is a lane of enamel boards on a rail, combos are posters pasted over each other, and the footer is uncovered as the page lifts away. See [`DESIGN.md`](DESIGN.md) for the system and [`PRODUCT.md`](PRODUCT.md) for the product facts it is built on.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build
```

Needs Node 22.12 or newer. `dist/` is plain files: upload it to Netlify, Cloudflare Pages, GitHub Pages or any web host.

Add `?preload` to the address to replay the full shutter sequence. By default a repeat visit in the same tab gets a short version, and people who prefer reduced motion get a plain progress plate.

## Change a fact

Everything the business can change lives in two files. Layout and copy read from them.

| File | What it holds |
| --- | --- |
| `src/config/site.js` | Name, tagline, address, phone, hours, price guide, delivery terms, links |
| `src/config/menu.js` | Every dish and price, the momo grid, the four combos |

A link set to `null` (Instagram, Swiggy, Zomato) is simply not shown. Paste the real URL and the button appears.

## Please check before launch

These came from the Google Maps panel and a photograph of the printed menu. Nothing was invented, but a transcription from a photo can slip.

- **Prices.** Re-read `src/config/menu.js` against the current menu. Combo 2 (Veg Momos 2 pcs + Paneer Momos 2 pcs + Cold Drink) is printed as ₹119.
- **Dish names** were tidied from the print ("Spl." became "Special", "Lolipop" became "Lollipop"; "Child Spl. Items" became "Child Specials").
- **Hours.** "Open 24 hours" is what Google Maps shows. Maps also offers "see more hours", so confirm there is no day with different timings.
- **Hindi lines.** "24 घंटे खुला" appears on the shutter and the OPEN sign. Have someone at the shop read it.
- **Delivery.** "Up to 3 km, minimum ₹500, also on Swiggy and Zomato" is from the printed menu. The printed badge misspells the name as "WOW AROMA"; the site does not repeat it.
- **Typical spend** (₹200–400) is Google's figure, reported by 35 people, and is labelled as such.

## Still needed from the owner

- The logo file (the flame over a wok). The wok on the page is a flat vector stand-in; the logo can replace it in `src/components/WokArt.astro`.
- Real photographs of the dishes. The design is built to work without any; photos can be added to the rate list or combo slabs.
- The Instagram handle and the Swiggy and Zomato store links, in `src/config/site.js`.
- The live domain: set `site` in `astro.config.mjs`. It feeds the canonical URL and the share image URL (`public/og.png`, 1200×630).
- The share image is a render of the hero, not a separate design. If the hero changes, re-render it: open `/` at 1440×900 once the page is lit, hide the drum and the action buttons, capture the stage under the nav (1440×848), scale it to 630px tall and centre it on a 1200×630 canvas of the wall colour (`#0e0907`). Then compress it (see "Head, icons and share image" below).

## Structure

```
src/config/        site.js, menu.js      facts
src/components/    one file per section
src/scripts/       main (shutter + hero first), page (everything else, loaded second), held, place,
                   preloader, hero, marquee, statement, lane, combos, curtain, play, ui
src/styles/        base (tokens), preloader, hero, sections, play
scripts/           build-fonts.py (rebuilds public/fonts from the Fontsource packages)
public/            fonts (subsets), icons, share image, manifest, _headers, robots.txt
PRODUCT.md         product truth the design is built on
DESIGN.md          the visual system
.impeccable/       the design direction record and sidecar
```

## Loading speed and hosting

Measured in Chromium at 390×844 with a 4× slower CPU and a 1.6 Mbps, 150 ms round-trip link, served with brotli like Netlify or Cloudflare Pages do:

| | Before | After |
| --- | --- | --- |
| Transferred | 242 KB | 137 KB |
| Requests | 12 | 9 |
| First paint | 1.19 s | 1.03 s |
| Page load event | 2.0 s | 1.55 s |

Without compression (what `npm run preview` serves) it is 431 KB to 327 KB and first paint falls from 1.46 s to 0.76 s. Where the saving comes from:

- **Fonts: 165 KB to 62 KB.** See below.
- **The stylesheet is inlined in the page** (`build.inlineStylesheets: 'always'` in `astro.config.mjs`). The 39 KB file was render-blocking, so first paint waited for a second round trip. Inlined, the page is one file of 24 KB compressed (it was 14 KB plus a 10 KB stylesheet), and a repeat visit revalidates it and gets a 304. Measured on its own, this switch took first paint from 1.45 s to 0.77 s uncompressed and from 1.16 s to 0.98 s with brotli.
- **`compressHTML` is set to `'jsx'`, which is Astro 7's default. Leave it.** Setting it to `true` keeps whitespace that the default drops, and the rate table headers render a few pixels wider.

### Fonts

Fonts are self-hosted subsets in `public/fonts/`, declared in `src/layouts/Base.astro` (not in a CSS file). They are subsets of the Fontsource files, so the three Fontsource packages in `package.json` are only the source for rebuilding them; nothing imports them.

| File | Size | Used for |
| --- | --- | --- |
| `yatra-one-latin.woff2` | 8.4 KB | Headings, the shop name, the ₹ in the combo slabs |
| `yatra-one-devanagari.woff2` | 28 KB | The Hindi lines (shutter and OPEN sign) |
| `teko-latin.woff2` | 12 KB | Everything priced or labelled (variable weight 300–700) |
| `teko-rupee.woff2` | 1 KB | The ₹ in prices |
| `hind-400.woff2`, `hind-600.woff2` | 6.7 KB each | Addresses and body copy (below the fold) |

What changed from the stock Fontsource files, and why:

- **Yatra One's Devanagari file was 72 KB** and was fetched on every visit for eight letters. The new one is the whole Devanagari block (every letter, matra, virama, nukta, danda, digit, ZWJ and ZWNJ), so editing the Hindi copy will not produce missing glyphs. Of the 378 stacked-conjunct ligatures only the ones used by common words and conjuncts are kept (135); any other conjunct still renders, with half forms. It is checked against the full font on 212 words and conjuncts: identical shaping.
- **Hinting removed** (phones ignore it; it was half of each Latin file). **Latin-ext dropped**: the only thing the site used from it was ₹, which is now merged into the Yatra One and Hind files (it used to fall back to the system font inside Hind text) and shipped as its own 1 KB face for Teko. Latin covers Basic Latin, accented letters (é, ñ …), curly quotes, dashes, ellipsis, ©, · and ₹.
- **Teko's Devanagari file (64 KB) is gone.** Nothing sets Hindi in Teko. If someone does, the Hindi falls back to the system font.
- **Hind 700 is gone.** Exactly one element asks for it (the footer phone number); the 600 file answers for 600 to 700, which is a barely visible difference there. To get true bold back, add a `hind-700.woff2` (`scripts/build-fonts.py` makes one if you add 700 to its loop) and a face for it in `Base.astro`.
- Each face has a `unicode-range`, so Devanagari is only fetched when the page has Hindi in it, and `font-display: swap` so text is never invisible (checked with JavaScript off and fonts delayed by six seconds). The Yatra One, Teko and Devanagari files are preloaded; they are what the shutter paints.
- Font URLs end in `?v=<hash of the file>`, computed at build time, so the one-year cache in `public/_headers` can never serve a stale font. Editing a file in `public/fonts` is all it takes.

Tried and dropped: size-matched fallback faces (`size-adjust` and friends) shrink the layout shift when a font swaps, but the swap happens behind the shutter (the page's load event waits for the fonts) and measured 0.0005 CLS there with the old fonts held back for five seconds, so they would only add a hack (they would also need the font stacks in `base.css` changed); limiting Teko's weight axis to 400–700 made the file 56 bytes larger; deferring the Hind files until after the load event cannot help, because in the resource timeline they finish about 0.25 s before it (the page script gates it); preloading the Devanagari file brought the load event about 0.1 s earlier and first paint no worse, so it stays.

To rebuild the fonts (needs `npm install` first, for the Fontsource sources):

```bash
python3 -m venv /tmp/fonts && /tmp/fonts/bin/pip install fonttools brotli uharfbuzz
/tmp/fonts/bin/python scripts/build-fonts.py . public/fonts
```

To add Hindi characters or words you want to be certain are stacked, add them to `SAMPLES` in `scripts/build-fonts.py`. Output is byte-for-byte repeatable.

### Head, icons and share image

- `public/manifest.webmanifest` and the icons make "Add to home screen" work (standalone window, dark splash). It repeats the business name, so change it there too if the name ever changes.
- `<meta name="color-scheme" content="dark">` declares the page dark, so browsers use dark scrollbars and form controls and leave it out of automatic page darkening. A screenshot of the whole page at 390 and 1440 wide is pixel-identical with and without it.
- No `rel="preconnect"` anywhere: nothing is loaded from another origin. No sitemap and no `Sitemap:` line in `robots.txt` until the real domain is set in `astro.config.mjs`.
- Icons are rendered from `public/favicon.svg` with sharp (`apple-touch-icon.png` is square and full-bleed; the maskable icon keeps the art inside the safe zone). If the favicon changes, rerun:

  ```bash
  node -e "
  const sharp = require('sharp'), fs = require('fs');
  const svg = fs.readFileSync('public/favicon.svg', 'utf8');
  const art = svg.replace(/^[\s\S]*?<rect[^>]*\/>/, '').replace('</svg>', '');
  const square = svg.replace(' rx=\"12\"', '');
  const maskable = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\"><rect width=\"64\" height=\"64\" fill=\"#f4b400\"/><g transform=\"translate(32 32) scale(0.7) translate(-32 -32)\">' + art + '</g></svg>';
  for (const [f, s, n] of [['apple-touch-icon', square, 180], ['icon-192', svg, 192], ['icon-512', svg, 512], ['icon-maskable-512', maskable, 512]])
    sharp(Buffer.from(s), { density: 72 * n / 64 }).resize(n, n).png({ palette: true, colours: 32, effort: 10 }).toFile('public/' + f + '.png');
  "
  ```

- `public/og.png` was 338 KB and is now 116 KB at the same 1200×630: a 256-colour palette with dithering (`sharp(file).png({ palette: true, quality: 90, colours: 256, dither: 1, effort: 10 })`). Do the same after re-rendering it.

### Caching

`public/_headers` is copied into `dist/` and read by Netlify and Cloudflare Pages: `/_astro/*` and `/fonts/*` are cached for a year as immutable, the page always revalidates, and the share image and icons keep for a day or a week. On other hosts set the same rules in the host's own config (for nginx, `location /_astro/ { add_header Cache-Control "public, max-age=31536000, immutable"; }`, the same for `/fonts/`, and `Cache-Control: no-cache` for `index.html`), and make sure text files (HTML, JS, the manifest) are served with brotli or gzip; the woff2 files are already compressed.

## Accessibility and resilience

- The page is fully readable and usable with JavaScript off; the shutter is only ever added by script, and an inline timeout removes it after nine seconds in any case.
- `prefers-reduced-motion` gets a plain progress plate, no smooth scroll, no pinned lane (boards stack), static flames and ticker, no sparks or name flicker (the night scene is simply lit and still), and no curtain footer.
- Text contrast is AA on every surface (checked in the browser at 1440×900 and 390×844). Focus rings are visible everywhere. Veg and non-veg are marked by shape and label as well as colour.
- Touch devices get native scrolling, a stacked rate list with a sticky jump row, and a fixed Call / Directions / Rate list bar.

## Design tooling

The design direction was set with the [Impeccable](https://github.com/pbakaus/impeccable) skill. To keep using it on this project (`/impeccable polish`, `critique`, `audit` and so on), run `npx impeccable install` in the repo.
