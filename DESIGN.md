---
name: Wok Aroma
description: A hand-painted shopfront for an Indo-Chinese kitchen that never closes, seen after dark. The wok is the only light on the street, the rate list hangs on enamel boards, the shutter goes up and stays up.
colors:
  turmeric: "#f4b400"
  turmeric-deep: "#c78f00"
  chilli: "#c82218"
  chilli-deep: "#931710"
  shutter-green: "#0e4a3a"
  shutter-deep: "#083027"
  soot: "#1b1310"
  soot-2: "#2c201b"
  steel-high: "#6d5c54"
  steel-mid: "#5c4d46"
  steel-low: "#382b25"
  shutter-hover: "#17604b"
  enamel: "#fbf6e8"
  ink-soft: "#4d3b33"
  veg: "#167a38"
  nonveg: "#c21807"
  flame-red: "#e8341c"
  flame-orange: "#ff7a1a"
  flame-yellow: "#ffc61f"
  gas-blue: "#5b9bff"
  night: "#0d0807"
  night-wall: "#28120a"
  night-green: "#06261e"
  fire-wash: "#4d200f"
  neon-cream: "#fff3d4"
  neon-red: "#ff6a55"
typography:
  display:
    fontFamily: "Yatra One, Noto Sans Devanagari, Georgia, serif"
    fontSize: "clamp(2.8rem, 1.6rem + 5.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
  hero-name:
    fontFamily: "Yatra One, Noto Sans Devanagari, Georgia, serif"
    fontSize: "190 design px on a 1440px stage (104px on a 390px stage), scaled with the viewport"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Yatra One, Noto Sans Devanagari, Georgia, serif"
    fontSize: "clamp(2.1rem, 1.5rem + 2.6vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Yatra One, Noto Sans Devanagari, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Hind, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  board:
    fontFamily: "Teko Variable, Teko, Arial Narrow, sans-serif"
    fontSize: "1.5em"
    fontWeight: 500
    lineHeight: 1.12
  label:
    fontFamily: "Teko Variable, Teko, Arial Narrow, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "3px"
  md: "8px"
  lg: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "72px"
components:
  button-call:
    backgroundColor: "{colors.chilli}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.md}"
    padding: "10px 24px"
  button-call-hover:
    backgroundColor: "{colors.chilli-deep}"
  button-ink:
    backgroundColor: "{colors.soot}"
    textColor: "{colors.turmeric}"
    rounded: "{rounded.md}"
    padding: "0 24px"
  button-paper:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.soot}"
    rounded: "{rounded.md}"
    padding: "0 24px"
  board:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.soot}"
    rounded: "{rounded.md}"
    padding: "22px 24px"
  ribbon-veg:
    backgroundColor: "{colors.veg}"
    textColor: "{colors.enamel}"
    padding: "3px 18px"
  ribbon-nonveg:
    backgroundColor: "{colors.nonveg}"
    textColor: "{colors.enamel}"
    padding: "3px 18px"
  slab:
    backgroundColor: "{colors.chilli}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.lg}"
    padding: "48px"
---

# Design System: Wok Aroma

## Overview

**Creative North Star: "The Shutter That Stays Up"**

The page is a shopfront painted by hand, and it is open at 3 a.m. Everything on it is a physical object a signwriter would recognise: a corrugated shutter, tube-light lettering, enamel boards hung on chains, bill-posters pasted over one another, a drum the shutter winds into. The kitchen is open 24 hours, so the shutter goes up once and the page says so, at the start and again at the end.

After dark, light is the structure. The walls are warm black with the shutter slats showing faintly, and the only light on the street comes from the wok's fire and from tube-light signs. The fire throws a warm wash on the wall behind it. The name and the OPEN sign are lit tubes. Enamel plates (the rate boards, the facts board, the price plate) stay milk-white and catch the light on their faces, so everything that has to be read in a hurry is still dark ink on enamel. One bright strip, the turmeric ticker, runs across the page like a lit light-box.

Colour is applied the way enamel is: a full coat over a whole region (the night walls, the turmeric ticker, the milk-white boards, the shutter-green shop plate), never as a tint. Light is the one exception, and it is rationed by two rules below. Type is painted, not typeset: one flared display face for names and headings, one condensed board face for everything that is read as a price or a label, and a plain humanist sans for sentences. The page carries the owner's own conventions (green for veg, red for non-veg, their tagline) rather than inventing a brand voice.

Motion carries mechanisms, not decoration. The shutter lifts in two stages with a rattle, and the name flickers on like a tube light as the fire catches. The rate list is a lane of boards carried past on a rail and swaying with scroll speed. Combos are posters pasted one over the next. The footer is uncovered as the page lifts away.

**Key Characteristics:**
- Enamel paint colours at full commitment; white is milk enamel, black is soot, the walls are night
- Painted lettering over condensed board type; display stays at 6rem and below everywhere except the hero name
- Light has a source: the wok's fire and the tube-light signs. Nothing else glows.
- Boards on chains, a few tenths of a degree off true
- Veg and non-veg are always shape, colour and label together
- No photography, gradient text or hard offset shadows

## Colors

Signwriter's enamel, seen at night: warm-black walls, a chilli-red call plate, a shutter-green shop plate and rate wall, soot ink and milk-white plates. Flame colours belong to the wok and to the light it throws.

### Primary
- **Turmeric Enamel** (#f4b400): the ticker light-box, the OPEN and shop-plate tube borders, active states, emphasis on dark grounds. Soot text only; never white on it.
- **Chilli Enamel** (#c82218): every call action, rate-plate titles, price roundels, non-veg. Cream text only; turmeric on it is for large display (3.1:1).

### Secondary
- **Shutter Green** (#0e4a3a): the shop-number plate and the preloader shutter. Text on it is cream or turmeric.

### Tertiary
- **Deep Chilli** (#931710): every printed price on a board. Turmeric on it clears 4.5:1.

### Neutral
- **Kitchen Soot** (#1b1310): ink, nav, footer, frames. A warm black; never #000.
- **Milk Enamel** (#fbf6e8): board and plate white, button paper, the visit section. Never pure white.
- **Soot Brown** (#4d3b33): secondary text on milk enamel (8:1).
- **Turmeric Deep** (#c78f00): pinstripes on boards and plates.
- **Shutter Steel** (#6d5c54, #5c4d46, #382b25): the highlights and shadows on the shutter drum, the lane rail and the footer drum. Steel is a material, so it is the one place a gradient is allowed.

### Night
- **Night** (#0d0807): the wall of the hero, statement, combos, visit and footer. Warmer and darker than soot; never #000.
- **Night Wall** (#28120a) and **Fire Wash** (#4d200f): the two steps the wall brightens through toward the wok. They exist only inside radial washes.
- **Night Green** (#06261e): the rate-list wall, a night version of Shutter Green, with a tube-light glow along the top edge.
- **Neon Cream** (#fff3d4): the core of lit lettering. Always carries a warm halo (`--neon`); never used as flat text.
- **Neon Red** (#ff6a55): the word OPEN. Used for that sign only.

### Interaction
- **Shutter Hover** (#17604b): the hover fill of the diet filter on the green wall.

### Semantic
- **Veg Green** (#167a38) and **Non-veg Red** (#c21807): ribbons and marks only.

### Named Rules
**The Enamel Rule.** Colour is a full coat on a whole region. No tints, and no gradients on text or on plates. A gradient is allowed in two places: steel shading on the shutter slats (a material) and a wash of firelight on a dark wall (a light, covered by the next rule).

**The Fire Light Rule.** Light needs a source. The wok's fire washes the wall behind it, the tube-light signs and lettering carry a halo, and an enamel plate may be lit from below by the fire. Everything else is unlit: no glowing buttons, cards or icons, and no wash that does not trace back to the wok, a sign or a rail.

**The One Flicker Rule.** One thing flickers at a time: the hero name, at irregular intervals, never a steady blink. Other tube-light lettering is steady. All flicker stops under reduced motion.

**The One Dish Rule.** Veg and non-veg are never colour alone. Every ribbon carries the square-and-dot mark and a visually hidden label.

## Typography

**Display Font:** Yatra One (with Noto Sans Devanagari, Georgia)
**Board Font:** Teko Variable (with Teko, Arial Narrow)
**Body Font:** Hind (with system-ui)

**Character:** Yatra One is a hand-lettered Indian poster face with flared strokes, carrying Devanagari and ₹ natively, so the bilingual sign line and prices sit in one voice. Teko is a condensed painted-signage sans for anything priced or labelled. Hind keeps sentences calm.

### Hierarchy
- **Display** (400, clamp(2.8rem, 1.6rem + 5.4vw, 6rem), 1.1): section titles and the shop plate. Section titles on dark walls are tube-light lettering (`--neon`). Outlined (soot, paint-order stroke) only on the shop plate.
- **Hero name** (400, 190 design px at 1440, scaled with the stage, 1): the one display setting above 6rem. Neon Cream with a four-layer halo.
- **Headline** (400, clamp(2.1rem, 1.5rem + 2.6vw, 3.6rem), 1.1): combo names, delivery heading.
- **Title** (400, clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem), 1.1): board titles, sign titles.
- **Body** (Hind 400, 1.0625rem, 1.55): addresses, delivery copy. Measure ≤ 36ch in running copy.
- **Board** (Teko 500, 1.38em on boards, 1.12): item names; prices at 700 in Deep Chilli with tabular numerals.
- **Label** (Teko 700, 1.2rem, 0.1em, uppercase): ribbons, buttons, nav, ruler chips. Uppercase is kept to short labels; sublines are sentence case. Label, plate and button sizes are set per component in rem (1.15rem to 3.4rem) rather than as one global ramp; the six roles above are the system, and a future pass could collapse the component sizes into named steps.

### Named Rules
**The Six-Rem Rule.** Display never exceeds 6rem, except the hero name, which is the sign over the shop and is sized as part of the hero stage. Everywhere else scale comes from composition (a roundel, a wall of colour, a lit plate), not from bigger type.

**The Real Rupee Rule.** Prices are set in Teko 700 with the ₹ glyph, grouped in the Indian style, and always come from `src/config/menu.js`.

## Layout

A single scrolling street after dark. Each section is a full-width wall with its own composition: the night kitchen (neon name, the wok standing in front of it, a neon OPEN sign and an enamel rate plate either side, actions at the foot); a turmeric ticker; a centred statement with two lit words; a pinned lane of boards on a night-green wall; sticky stacked slabs; a two-part visit (a lit shop-number plate beside an enamel facts board); a footer revealed by a curtain.

The hero is composed on a fixed stage, 1440 x 848 design pixels on desktop and 390 x 782 on phones, and scaled as one piece with a single unit (`--u`, one design pixel). Width and height both limit the unit, so the whole composition always fits; a floor of 0.78 keeps small laptops legible, and buttons and long text keep their real sizes. Light, sparks and the wall are positioned from the same unit, so they stay on the wok at every size.

Spacing is a 4px scale (4, 8, 12, 16, 24, 32, 48, 72px, plus a clamped section step of 4.5–8rem). Gutters clamp from 1rem to 3rem. Sections get more space above their headings than below.

Responsive behaviour changes composition, not content. At 900px and above with hover, motion allowed and at least 640px of height, the rate list pins and travels sideways; everywhere else the boards stack in columns (3, 2 or 1), the ruler becomes a sticky chip row, and the momo grid turns on its side so five price columns never squeeze into a phone. Below 900px the hero becomes a tall composition (name, wok, then OPEN and rate plates side by side). Phones add a fixed Call / Directions / Rate list bar; tablets between 760 and 899px have no such bar, so the hero carries the actions itself.

## Elevation & Depth

Depth is physical, and after dark it is made by light. Boards and signs hang: on the dark walls they carry a deeper drop shadow (`0 22px 30px -14px rgb(0 0 0 / .85)`) and a hairline of warm light on their edge. The wok stands in front of the name, so flame and tossed food cross the lettering, and the wall brightens toward the fire. Posters pasted over one another throw a little shade up onto the one beneath. The footer is real depth: it sits behind the page and is uncovered.

### Named Rules
**The Hung Rule.** Elevation means something hangs from, stands on or is pasted to something. If nothing is holding it up, it gets a frame, not a shadow.

## Shapes

Painted plates: soot frames of 6–8px, an inner turmeric or enamel pinstripe, 8px corners (14px on posters). Ribbons are flag-ended banners (six-point clip, never more). Price roundels are circles. Rivets sit in poster corners. The OPEN sign, the shop-number plate and the delivery board are tube-light signs: a turmeric tube border with a halo, radius 14 to 22px. Rate boards hang on dashed steel chains from a steel rail. The veg mark is a rounded square with a centred dot. Dividers are dotted leaders or gaps, never single-side accent borders.

## Components

### Buttons
- **Shape:** 8px corners, 3px soot border, 52px minimum height.
- **Call (primary):** Chilli Enamel plate, two lines: small tracked label over the phone number at 32px Teko 700. Hover deepens to Deep Chilli and lifts 2px.
- **Ink:** soot plate, turmeric label (on the dark hero it flips to a turmeric plate with a soot label so it does not vanish). **Paper:** milk plate, soot label; turmeric on hover.
- **Focus:** 3px outline in the surface's contrast colour (soot on light grounds, turmeric on dark), 3px offset.

### Hero: The Night Kitchen (signature)
Layers from the back: night wall with a fire-wash radial centred on the wok's mouth and corrugated slats showing only where the fire reaches; the rolled shutter drum under the nav; a flickering light layer (warm, with a blue gas-flame pool under the burner); sparks behind the wok; the neon name and the neon tagline; the wok; sparks and a few blurred ones in front; the OPEN tube sign and the rate plate on either side; actions and address at the foot. The wok overlaps the name so flame crosses the lettering. The rate plate is milk enamel lit from below by a warm overlay. Prices come from `menu.js`. After the shutter lifts, the name stutters on, the glow rises, the flames catch and the plates drop in. Under reduced motion everything is already lit and still, and sparks are not drawn.

### Neon Lettering
Cream core, four-layer halo in em (`--neon`): used for the hero name, the tagline, section titles on dark walls and the footer line. Steady, except the hero name's occasional stutter.

### Ticker
A turmeric light-box band with soot Teko 700 and chilli flame marks, between the hero and the statement. It is the one bright strip in the night and the seam between the two dark sections.

### Rate Board
Milk-enamel plate, 6px soot frame, 2px turmeric-deep pinstripe, Yatra One title in Chilli over a soot rule, flag-ended ribbons per diet, rows with dotted leaders and Deep Chilli prices. Boards hang on dashed steel chains from a rail on a night-green wall and sway with scroll velocity (±2.4°). The momo board is a real table in two orientations.

### Diet Filter
Segmented control, 48px high, 3px frame; the 3px dividers are gaps showing the frame colour. Dims, never removes, so layout and pin never shift.

### Combo Slab
Sticky poster with a 6px soot frame, 14px corners, four rivets and a rotated turmeric price roundel. As the next slab arrives the one beneath scales to 0.94 and darkens (a shade layer, not a filter).

### Navigation
A 52px soot bar with the wordmark appearing after the hero scrolls away, three section links with turmeric underline for the current one, and a Chilli call chip. On phones it appears only after the hero.

### Preloader (signature)
A corrugated shutter in Shutter Green with the shop number and a Hindi line painted on it and a Chilli plate counting real load progress with plain status lines. On completion it lifts in two stages, with a rattle, revealing the night kitchen while the neon name flickers on.

## Do's and Don'ts

### Do:
- **Do** keep colour as full coats on whole regions: night walls, the turmeric ticker, milk-enamel boards and facts plate, the shutter-green shop plate.
- **Do** give every light a source: the fire, a tube sign, a rail. Enamel plates stay milk-white and are lit on their face.
- **Do** read every fact from `src/config/site.js` and `src/config/menu.js`; hide a link until it exists.
- **Do** pair every animation with a reduced-motion path, and keep content visible without JavaScript.
- **Do** keep targets at 44px or more and the focus ring visible on every surface.
- **Do** mark diet with shape, colour and label together.

### Don't:
- **Don't** add photography stand-ins, gradient text, or hard offset shadows.
- **Don't** glow anything that is not lit: no glowing buttons, cards or icons.
- **Don't** flicker more than one thing at a time.
- **Don't** put a kicker, eyebrow or section number above a heading.
- **Don't** set display type above 6rem, except the hero name.
- **Don't** use identical cards: boards differ in width and structure, slabs in colour and tilt.
- **Don't** bounce or spring anything; arrivals use exponential ease-out.
- **Don't** invent claims: no ratings, awards, history or discounts that the owner has not supplied.
