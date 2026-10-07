# Wok Aroma

One-page website for **Wok Aroma**, Ground Floor, Eros Market Place, GF 80, Shakti Khand 2, Indirapuram, Ghaziabad. Built with [Astro](https://astro.build) (static output), [GSAP](https://gsap.com) + ScrollTrigger + SplitText, and [Lenis](https://lenis.darkroom.engineering) smooth scroll. Fonts are self-hosted.

The design is *The Rate Board*: a hand-painted shopfront. A steel shutter preloader lifts and stays up, the menu is a lane of enamel boards on a rail, combos are posters pasted over each other, and the footer is uncovered as the page lifts away. See [`DESIGN.md`](DESIGN.md) for the system and [`PRODUCT.md`](PRODUCT.md) for the product facts it is built on.

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

## Structure

```
src/config/        site.js, menu.js      facts
src/components/    one file per section
src/scripts/       preloader, hero, marquee, statement, lane, combos, curtain, ui
src/styles/        base (tokens), preloader, hero, sections
PRODUCT.md         product truth the design is built on
DESIGN.md          the visual system
.impeccable/       the design direction record and sidecar
```

## Accessibility and resilience

- The page is fully readable and usable with JavaScript off; the shutter is only ever added by script, and an inline timeout removes it after nine seconds in any case.
- `prefers-reduced-motion` gets a plain progress plate, no smooth scroll, no pinned lane (boards stack), static flames and ticker, and no curtain footer.
- Text contrast is AA on every surface (checked in the browser at 1440×900 and 390×844). Focus rings are visible everywhere. Veg and non-veg are marked by shape and label as well as colour.
- Touch devices get native scrolling, a stacked rate list with a sticky jump row, and a fixed Call / Directions / Rate list bar.

## Design tooling

The design direction was set with the [Impeccable](https://github.com/pbakaus/impeccable) skill. To keep using it on this project (`/impeccable polish`, `critique`, `audit` and so on), run `npx impeccable install` in the repo.
