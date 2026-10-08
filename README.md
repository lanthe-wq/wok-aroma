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
src/styles/        base (tokens), preloader, hero, sections
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
- **Hind 700 is gone.** Exactly one element asks for it (the footer phone number); the 600 file answers for 600 to 700, which is a barely visible difference there. To get true bold back, add a `hind-700.woff2` (the script below makes one if you add 700 to its loop) and a face for it in `Base.astro`.
- Each face has a `unicode-range`, so Devanagari is only fetched when the page has Hindi in it, and `font-display: swap` so text is never invisible (checked with JavaScript off and fonts delayed by six seconds). The Yatra One, Teko and Devanagari files are preloaded; they are what the shutter paints.
- Font URLs end in `?v=<hash of the file>`, computed at build time, so the one-year cache in `public/_headers` can never serve a stale font. Editing a file in `public/fonts` is all it takes.

Tried and dropped: size-matched fallback faces (`size-adjust` and friends) shrink the layout shift when a font swaps, but the swap happens behind the shutter (the page's load event waits for the fonts) and measured 0.0005 CLS there with the old fonts held back for five seconds, so they would only add a hack (they would also need the font stacks in `base.css` changed); limiting Teko's weight axis to 400–700 made the file 56 bytes larger; deferring the Hind files until after the load event cannot help, because in the resource timeline they finish about 0.25 s before it (the page script gates it); preloading the Devanagari file brought the load event about 0.1 s earlier and first paint no worse, so it stays.

To rebuild the fonts (needs `npm install` first, for the Fontsource sources):

```bash
python3 -m venv /tmp/fonts && /tmp/fonts/bin/pip install fonttools brotli uharfbuzz
/tmp/fonts/bin/python build-fonts.py . public/fonts   # the script below, saved as build-fonts.py
```

<details>
<summary>build-fonts.py</summary>

```python
#!/usr/bin/env python3
"""Build public/fonts/*.woff2 from the Fontsource packages in node_modules.

    python3 -m venv /tmp/fonts && /tmp/fonts/bin/pip install fonttools brotli uharfbuzz
    /tmp/fonts/bin/python build-fonts.py . public/fonts
"""
import io
import os
import sys

import uharfbuzz as hb
from fontTools import subset
from fontTools.ttLib import TTFont


def load(source):
    # keep head.modified fixed, so a rebuild gives byte-identical files
    return TTFont(source, recalcTimestamp=False)


ROOT, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
NM = os.path.join(ROOT, 'node_modules')
YATRA = NM + '/@fontsource/yatra-one/files/yatra-one-%s-400-normal.woff2'
HIND = NM + '/@fontsource/hind/files/hind-%s-%s-normal.woff2'
TEKO = NM + '/@fontsource-variable/teko/files/teko-%s-wght-normal.woff2'

# Basic Latin, accented letters, NBSP, (c), middle dot, dashes, curly quotes, bullet, ellipsis
LATIN = (
    list(range(0x20, 0x7F))
    + [c for c in range(0xC0, 0x100) if c not in (0xD7, 0xF7)]
    + [0xA0, 0xA9, 0xB7, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026]
)
RUPEE = 0x20B9


def run_subset(font, unicodes):
    o = subset.Options()
    o.flavor, o.hinting, o.layout_features = 'woff2', False, ['*']
    o.notdef_outline, o.glyph_names, o.legacy_kern = True, False, False
    o.name_IDs, o.name_languages = [0, 1, 2, 3, 4, 5, 6, 13, 14], [0x409]  # keep copyright + licence
    s = subset.Subsetter(o)
    s.populate(unicodes=unicodes)
    s.subset(font)
    return font


def write(font, name):
    font.flavor = 'woff2'
    path = os.path.join(OUT, name)
    font.save(path)
    print(f'{name:28} {os.path.getsize(path):6} bytes')
    return path


def ttf_bytes(font):
    b = io.BytesIO()
    font.flavor = None
    font.save(b)
    return b.getvalue()


def with_rupee(latin_path, ext_path):
    """Latin subset plus the rupee glyph copied in from the latin-ext file."""
    dst = run_subset(load(latin_path), LATIN)
    dst.flavor = None
    src = run_subset(load(ext_path), [RUPEE])
    src.flavor = None
    name = src.getBestCmap()[RUPEE]
    order = dst.getGlyphOrder() + [name]
    dst.setGlyphOrder(order)
    dst['glyf'].glyphOrder = order
    dst['glyf'].glyphs[name] = src['glyf'][name]  # a single plain outline
    dst['hmtx'].metrics[name] = src['hmtx'].metrics[name]
    for t in dst['cmap'].tables:
        if t.isUnicode():
            t.cmap[RUPEE] = name
    dst['maxp'].numGlyphs = len(order)
    return load(io.BytesIO(ttf_bytes(dst)))  # round-trip to rebuild the tables


# Latin faces (the rupee comes from latin-ext; Teko's variable rupee stays a separate face)
write(with_rupee(YATRA % 'latin', YATRA % 'latin-ext'), 'yatra-one-latin.woff2')
for w in (400, 600):
    write(with_rupee(HIND % ('latin', w), HIND % ('latin-ext', w)), f'hind-{w}.woff2')
write(run_subset(load(TEKO % 'latin'), LATIN), 'teko-latin.woff2')
write(run_subset(load(TEKO % 'latin-ext'), [RUPEE]), 'teko-rupee.woff2')

# Yatra One Devanagari: the whole block (letters, matras, virama, nukta, danda, digits),
# ZWJ/ZWNJ, with half forms, reph and below-base forms. Of the 378 stacked-conjunct
# ligatures (GSUB `pres`) keep only those used by common Hindi words and conjuncts;
# any other conjunct still shapes, with half forms.
SAMPLES = """
क्क क्त क्र क्ल क्व क्स क्य क्ष ख्य ग्न ग्र ग्ल ग्य ग्व घ्न घ्र ङ्क ङ्ग च्च च्छ च्य ज्ज ज्य ज्र ज्व ज्ञ ञ्च ञ्ज
ट्ट ट्ठ ट्य ट्र ड्ड ड्ढ ड्य ड्र ढ्र ण्ट ण्ठ ण्ड ण्ण ण्य त्क त्त त्न त्प त्म त्य त्र त्व त्स थ्य
द्ग द्घ द्द द्ध द्न द्ब द्भ द्म द्य द्र द्व ध्न ध्म ध्य ध्र ध्व न्क न्त न्द न्ध न्न न्प न्म न्य न्र न्व न्स न्ह
प्त प्न प्प प्य प्र प्ल प्स ब्ज ब्द ब्ध ब्न ब्ब ब्य ब्र ब्व भ्य भ्र म्न म्प म्ब म्भ म्म म्य म्र म्ल म्व
य्य ल्क ल्प ल्ल ल्य ल्व व्य व्र व्व श्च श्न श्म श्य श्र श्ल श्व ष्क ष्ट ष्ठ ष्ण ष्प ष्म ष्य
स्क स्ख स्त स्न स्थ स्प स्फ स्म स्य स्र स्व स्स ह्म ह्य ह्र ह्ल ह्व ह्न ह्ण स्त्र न्त्र न्द्र ष्ट्र क्ष्म क्ष्य त्त्व क्त्र
24 घंटे खुला चौबीस घंटे खुला विद्यार्थी द्वार ट्रेन ब्रेड ड्राइव क्रीम ग्रेवी प्रसाद स्वादिष्ट स्वागत
गरमागरम ताज़ा पनीर मोमो नूडल्स मंचूरियन आइसक्रीम सैंडविच शेक रोल कॉफ़ी ऑर्डर डिलीवरी होम डिलीवरी
ख़ाना ज़रूर फ़्राइड राइस चाऊमीन चिल्ली पोटैटो रेस्टोरेंट इंदिरापुरम गाज़ियाबाद उत्तर प्रदेश
१२३४५६७८९० ।॥ हिन्दी संस्कृति कृपया पुनः मुँह नमस्ते शुक्रिया धन्यवाद आपका स्वागत है
""".split()


def shape(data, text):
    font = hb.Font(hb.Face(hb.Blob(data)))
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {})
    return [font.glyph_to_string(i.codepoint) for i in buf.glyph_infos], sum(p.x_advance for p in buf.glyph_positions)


full = load(YATRA % 'devanagari')
full_bytes = ttf_bytes(full)
pres = full['GSUB'].table.LookupList.Lookup[14]  # the conjunct ligatures
all_pres = {lg.LigGlyph for st in pres.SubTable for ligs in st.ligatures.values() for lg in ligs}
keep = {g for text in SAMPLES for g in shape(full_bytes, text)[0] if g in all_pres}
print(f'stacked conjuncts kept: {len(keep)} of {len(all_pres)}')

t = load(io.BytesIO(full_bytes))
st = t['GSUB'].table.LookupList.Lookup[14].SubTable[0]
for first, ligs in list(st.ligatures.items()):
    kept = [lg for lg in ligs if lg.LigGlyph in keep]
    if kept:
        st.ligatures[first] = kept
    else:
        del st.ligatures[first]
cps = [c for c in full.getBestCmap() if 0x900 <= c <= 0x97F] + [0x20, 0xA0, 0x200C, 0x200D, 0x25CC]
path = write(run_subset(t, cps), 'yatra-one-devanagari.woff2')

# Check: every sample shapes exactly like the full font
sub_bytes = ttf_bytes(load(path))
bad = [s for s in SAMPLES if shape(full_bytes, s)[1] != shape(sub_bytes, s)[1]]
print('samples shaping differently from the full font:', len(bad), bad[:5])
```

</details>

To add Hindi characters or words you want to be certain are stacked, add them to `SAMPLES`. Output is byte-for-byte repeatable.

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
