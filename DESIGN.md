---
name: Wok Aroma
description: A hand-painted shopfront for an Indo-Chinese kitchen that never closes. Enamel sign paint, a rate list on hung boards, a shutter that goes up and stays up.
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
typography:
  display:
    fontFamily: "Yatra One, Noto Sans Devanagari, Georgia, serif"
    fontSize: "clamp(2.8rem, 1.6rem + 5.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
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

The page is a shopfront painted by hand. Everything on it is a physical object a signwriter would recognise: a corrugated shutter, a fascia board lit by a tube light, enamel boards hung on chains, bill-posters pasted over one another, a drum the shutter winds into. The kitchen is open 24 hours, so the shutter goes up once and the page says so, at the start and again at the end.

Colour is applied the way enamel is: a full coat over a whole region (the yellow facade, the deep-red statement wall, the green rate-list wall, the milk-white visit plate, the soot footer), never as a tint or a gradient. Type is painted, not typeset: one flared display face for names and headings, one condensed board face for everything that is read as a price or a label, and a plain humanist sans for sentences. The page carries the owner's own conventions (green for veg, red for non-veg, their tagline) rather than inventing a brand voice.

Motion carries mechanisms, not decoration. The shutter lifts in two stages with a rattle. The rate list is a lane of boards carried past on a rail and swaying with scroll speed. Combos are posters pasted one over the next. The footer is uncovered as the page lifts away.

**Key Characteristics:**
- Enamel paint colours at full commitment; white is milk enamel, black is soot
- Painted lettering over condensed board type, with a hard ceiling of 6rem on display
- Boards on chains, a few tenths of a degree off true
- Veg and non-veg are always shape, colour and label together
- No photography, gradient text, glows or hard offset shadows

## Colors

Signwriter's enamel: a yellow facade, a chilli-red board, a shutter-green wall, soot ink and milk-white plates. Flame colours exist only on the wok emblem.

### Primary
- **Turmeric Enamel** (#f4b400): the facade, the combo field, active states, emphasis on dark grounds. Soot text only; never white on it.
- **Chilli Enamel** (#c82218): the fascia board, every call action, price roundels, non-veg. Cream text only; turmeric on it is for large display (3.1:1).

### Secondary
- **Shutter Green** (#0e4a3a): the rate-list wall, the OPEN sign, the shop-number plate, the preloader shutter. Text on it is cream or turmeric.

### Tertiary
- **Deep Chilli** (#931710): the statement wall and every printed price on a board. Turmeric on it clears 4.5:1.

### Neutral
- **Kitchen Soot** (#1b1310): ink, nav, footer, frames. A warm black; never #000.
- **Milk Enamel** (#fbf6e8): board and plate white, button paper, the visit section. Never pure white.
- **Soot Brown** (#4d3b33): secondary text on milk enamel (8:1).
- **Turmeric Deep** (#c78f00): the counter ledge under the hero and pinstripes on boards.
- **Shutter Steel** (#6d5c54, #5c4d46, #382b25): the highlights and shadows on the shutter drum, the lane rail and the footer drum. Steel is a material, so it is the one place a gradient is allowed.

### Interaction
- **Shutter Hover** (#17604b): the hover fill of the diet filter on the green wall.

### Semantic
- **Veg Green** (#167a38) and **Non-veg Red** (#c21807): ribbons and marks only.

### Named Rules
**The Enamel Rule.** Colour is a full coat on a whole region. No gradients on text or surfaces, no tints; the only gradient on the page is steel shading on the shutter slats, because that is a material.

**The One Dish Rule.** Veg and non-veg are never colour alone. Every ribbon carries the square-and-dot mark and a visually hidden label.

## Typography

**Display Font:** Yatra One (with Noto Sans Devanagari, Georgia)
**Board Font:** Teko Variable (with Teko, Arial Narrow)
**Body Font:** Hind (with system-ui)

**Character:** Yatra One is a hand-lettered Indian poster face with flared strokes, carrying Devanagari and ₹ natively, so the bilingual sign line and prices sit in one voice. Teko is a condensed painted-signage sans for anything priced or labelled. Hind keeps sentences calm.

### Hierarchy
- **Display** (400, clamp(2.8rem, 1.6rem + 5.4vw, 6rem), 1.1): the fascia name and section titles. Outlined (soot, paint-order stroke) only on the fascia and shop plate.
- **Headline** (400, clamp(2.1rem, 1.5rem + 2.6vw, 3.6rem), 1.1): combo names, delivery heading.
- **Title** (400, clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem), 1.1): board titles, sign titles.
- **Body** (Hind 400, 1.0625rem, 1.55): addresses, delivery copy. Measure ≤ 36ch in running copy.
- **Board** (Teko 500, 1.38em on boards, 1.12): item names; prices at 700 in Deep Chilli with tabular numerals.
- **Label** (Teko 700, 1.2rem, 0.1em, uppercase): ribbons, buttons, nav, ruler chips. Uppercase is kept to short labels; sublines are sentence case. Label, plate and button sizes are set per component in rem (1.15rem to 3.4rem) rather than as one global ramp; the six roles above are the system, and a future pass could collapse the component sizes into named steps.

### Named Rules
**The Six-Rem Rule.** Display never exceeds 6rem. Scale comes from composition (a full-width fascia, a roundel, a wall of colour), not from bigger type.

**The Real Rupee Rule.** Prices are set in Teko 700 with the ₹ glyph, grouped in the Indian style, and always come from `src/config/menu.js`.

## Layout

A single scrolling street. Each section is one full-width coat of colour with its own composition: a three-part facade (hung sign, wok, hung sign) over a counter ledge; a ticker band; a centred statement; a pinned lane of boards; sticky stacked slabs; a two-column visit plate; a footer revealed by a curtain.

Spacing is a 4px scale (4, 8, 12, 16, 24, 32, 48, 72px, plus a clamped section step of 4.5–8rem). Gutters clamp from 1rem to 3rem. Sections get more space above their headings than below.

Responsive behaviour changes composition, not content. At 900px and above with hover, motion allowed and at least 640px of height, the rate list pins and travels sideways; everywhere else the boards stack in columns (3, 2 or 1), the ruler becomes a sticky chip row, and the momo grid turns on its side so five price columns never squeeze into a phone. Phones add a fixed Call / Directions / Rate list bar.

## Elevation & Depth

Depth is physical, not atmospheric. Boards and signs hang: they carry one soft drop shadow (`0 16px 22px -14px rgb(0 0 0 / .6)`) and a soot frame. Everything else is flat enamel separated by frames and colour changes. The footer is real depth: it sits behind the page and is uncovered.

### Named Rules
**The Hung Rule.** Elevation means something hangs from something. If nothing is holding it up, it gets a frame, not a shadow.

## Shapes

Painted plates: soot frames of 6–8px, an inner turmeric or enamel pinstripe, 8px corners (14px on posters). Ribbons are flag-ended banners (six-point clip, never more). Price roundels are circles. Rivets sit in poster corners; the hero's hung signs and fascia carry steel studs in theirs, the signs hang on soot chain links, and the tube light sits in end caps and clips. The veg mark is a rounded square with a centred dot. Dividers are dotted leaders or gaps, never single-side accent borders.

## Components

### Buttons
- **Shape:** 8px corners, 3px soot border, 52px minimum height.
- **Call (primary):** Chilli Enamel plate, two lines: small tracked label over the phone number at 32px Teko 700. Hover deepens to Deep Chilli and lifts 2px.
- **Ink:** soot plate, turmeric label. **Paper:** milk plate, soot label; turmeric on hover.
- **Focus:** 3px outline in the surface's contrast colour (soot on light grounds, turmeric on dark), 3px offset.

### Rate Board
Milk-enamel plate, 6px soot frame, 2px turmeric-deep pinstripe, Yatra One title in Chilli over a soot rule, flag-ended ribbons per diet, rows with dotted leaders and Deep Chilli prices. Boards hang on dashed-border chains from a rail and sway with scroll velocity (±2.4°). The momo board is a real table in two orientations.

### Diet Filter
Segmented control, 48px high, 3px frame; the 3px dividers are gaps showing the frame colour. Dims, never removes, so layout and pin never shift.

### Combo Slab
Sticky poster with a 6px soot frame, 14px corners, four rivets and a rotated turmeric price roundel. As the next slab arrives the one beneath scales to 0.94 and darkens (a shade layer, not a filter).

### Navigation
A 52px soot bar with the wordmark appearing after the facade scrolls away, three section links with turmeric underline for the current one, and a Chilli call chip. On phones it appears only after the hero.

### Preloader (signature)
A corrugated shutter in Shutter Green with the shop number and a Hindi line painted on it and a Chilli plate counting real load progress with plain status lines. On completion it lifts in two stages, with a rattle, revealing the facade while the tube-light flickers on.

## Do's and Don'ts

### Do:
- **Do** keep colour as full coats on whole regions: yellow facade, deep-red statement, green wall, milk visit plate, soot footer.
- **Do** read every fact from `src/config/site.js` and `src/config/menu.js`; hide a link until it exists.
- **Do** pair every animation with a reduced-motion path, and keep content visible without JavaScript.
- **Do** keep targets at 44px or more and the focus ring visible on every surface.
- **Do** mark diet with shape, colour and label together.

### Don't:
- **Don't** add photography stand-ins, gradient text, glows, or hard offset shadows.
- **Don't** put a kicker, eyebrow or section number above a heading.
- **Don't** set display type above 6rem.
- **Don't** use identical cards: boards differ in width and structure, slabs in colour and tilt.
- **Don't** bounce or spring anything; arrivals use exponential ease-out.
- **Don't** invent claims: no ratings, awards, history or discounts that the owner has not supplied.
