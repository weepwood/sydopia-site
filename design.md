---
version: "alpha"
name: "Sydopia"
description: "Editorial paper-collage portfolio for an independent brand and web design practice. Warm paper canvas, ink-black serif display type, hand-cut stickers, and gentle physical motion."
mode: "light"

colors:
  primary: "#020201"
  secondary: "#353432"
  accent: "#FF4847"
  background: "#FEFDEC"
  surface: "#FFFFF9"
  textPrimary: "#020201"
  textSecondary: "#353432"
  yellow: "#F7F5A5"
  pink: "#FFB1C5"
  blue: "#4278E0"
  cornflower: "#9CC7FF"
  green: "#36A55A"
  line: "rgba(2, 2, 1, 0.15)"
  shadow: "rgba(2, 2, 1, 0.10)"

typography:
  display:
    fontFamily: "STK Saga, Georgia, serif"
    fontWeight: 300
    fontSize: "60px"
    lineHeight: 1.15
    letterSpacing: "0"
  displayItalic:
    fontFamily: "STK Saga Italic, Georgia, serif"
    fontWeight: 300
    fontSize: "40px"
    lineHeight: 1.5
  heading:
    fontFamily: "STK Saga, Georgia, serif"
    fontWeight: 300
    fontSize: "36px"
    lineHeight: 1.15
  body:
    fontFamily: "neue-haas-grotesk-text, Helvetica Neue, sans-serif"
    fontWeight: 400
    fontSize: "16px"
    lineHeight: 1.75
  label:
    fontFamily: "Termina, neue-haas-grotesk-text, sans-serif"
    fontWeight: 500
    fontSize: "12px"
    lineHeight: 1
    letterSpacing: "0.2em"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "35px"
  section: "100px"
  sectionFluid: "10vw"
  gutter: "3vw"
  navHeight: "75px"

radius:
  none: "0"
  sm: "2px"
  md: "4px"
  lg: "5px"
  pill: "60px"
  circle: "50%"

shadows:
  card: "0 1px 3px rgba(2, 2, 1, 0.10)"

borders:
  hairline: "1px solid #020201"
  dashed: "1px dashed #020201"

components:
  navLink:
    color: "{colors.textPrimary}"
    fontSize: "16px"
    fontWeight: 400
  circleButton:
    width: "225px"
    height: "85px"
    border: "1px solid {colors.textPrimary}"
    backgroundColor: "transparent"
    borderRadius: "50%"
    fontSize: "18px"
  primaryButton:
    backgroundColor: "{colors.textPrimary}"
    textColor: "{colors.surface}"
    fontSize: "12px"
    letterSpacing: "2px"
    padding: "12px 25px"
  testimonialCard:
    backgroundColor: "{colors.yellow}"
    maxWidth: "1000px"
    height: "550px"
    borderRadius: "5px"
    padding: "2vw"
    boxShadow: "0 1px 3px {colors.shadow}"
  projectCard:
    imageAspectRatio: "16 / 9"
    titleFontSize: "36px"
---
# Sydopia Design System

## Overview

Sydopia is the portfolio of an independent brand and web designer. The interface should feel like a **printed editorial spread assembled on a studio desk**: warm off-white paper, dense black ink, hand-cut colored stickers, slightly rotated cards, and dashed rules that read like fold lines.

Three ideas drive every screen:

1. **Paper, not glass.** No gradients, no glassmorphism, no colored glows. Surfaces are flat paper with a faint fiber texture.
2. **Serif voice, sans-serif utility.** Large statements are set in STK Saga Light; navigation, body, and metadata are set in Neue Haas Grotesk Text.
3. **Color as collage.** Saturated yellow, pink, blue, and green appear only as sticker fills, highlight states, or a single full-bleed testimonial card. The structural UI stays ink-on-paper.

The result is warm, literary, playful, and deliberately low-tech. It should never look like a SaaS dashboard.

## Colors

| Token | Value | Role |
| --- | --- | --- |
| `{colors.background}` | #FEFDEC | Page canvas; warm cream paper |
| `{colors.surface}` | #FFFFF9 | Cards, panels, paper-white overlays |
| `{colors.textPrimary}` | #020201 | Body text, headings, icons, hairlines |
| `{colors.textSecondary}` | #353432 | Secondary copy, captions, muted metadata |
| `{colors.accent}` | #FF4847 | Brand red; logo marks and rare emphasis only |
| `{colors.yellow}` | #F7F5A5 | Primary highlight and testimonial card |
| `{colors.pink}` | #FFB1C5 | Sticker and collage fill |
| `{colors.blue}` | #4278E0 | Sticker fill, one circle-button hover |
| `{colors.cornflower}` | #9CC7FF | Soft illustration fill |
| `{colors.green}` | #36A55A | Sticker fill, one circle-button hover |
| `{colors.line}` | rgba(2,2,1,.15) | Subtle rules and dividers |
| `{colors.shadow}` | rgba(2,2,1,.10) | The only shadow tint |

Rules:

- Body text is always `{colors.textPrimary}` on `{colors.background}`. Never set long copy in a brand color.
- Color is applied as a **filled block behind black text** (yellow highlight, sticker fill), never as colored type.
- One full-bleed colored surface per view is acceptable; more than one competes with the paper canvas.
- The page background carries a 200×200px paper-fiber texture, fixed attachment. Keep it at low contrast; it should be felt, not seen.

## Typography

Two families, one accent face:

- **STK Saga Light (300)** — display, section headings, project titles, footer statement. Fallback `Georgia, serif`.
- **STK Saga Italic (300)** — pull quotes and testimonial headlines only.
- **Neue Haas Grotesk Text (400 / 500 / 700)** — navigation, body, buttons, metadata.
- **Termina (500 / 600)** — small uppercase labels and tags. Always paired with wide tracking.

Scale:

| Role | Size | Weight | Line height | Notes |
| --- | --- | --- | --- | --- |
| Display | 60px | 300 | 1.15 | Hero statement, `text-indent: 200px` on wide screens |
| H2 | 48px | 300 | 1.2 | Section openers |
| H3 | 36px | 300 | 1.15 | Project titles, sub-sections |
| Quote | 40px | 300 italic | 1.5 | Testimonial headline |
| Lead | 24px | 400 | 1.35 | Footer statement, intro paragraphs |
| Body | 16px | 400 | 1.75 | Default reading size |
| Small | 14px | 400 | 1.5 | Helper text |
| Label | 12px | 500 | 1 | Uppercase, `letter-spacing: .2em` |
| Caption | 11px | 400 | 1.4 | Image credits, legal |

Rules:

- Paragraphs use a **50px first-line indent** and no bottom margin beyond the spacing scale. It is a book convention, not a blog convention.
- Display type is never bold. Weight 300 is the brand voice; 500 is the maximum for serif.
- Uppercase labels always carry `letter-spacing` between `.2em` and `.25em`.
- Do not substitute Inter, Roboto, or a geometric sans for STK Saga. If the serif is unavailable, Georgia is the only acceptable fallback.

## Spacing and layout

Base rhythm: **4px**, with a practical scale of 4 / 8 / 16 / 24 / 35 / 50 / 100.

- Page gutter: `{spacing.gutter}` (3vw) on both sides.
- Standard section: `{spacing.section}` (100px) top and bottom.
- Feature section: `{spacing.sectionFluid}` (10vw) to create magazine pacing.
- Navigation: fixed, `{spacing.navHeight}` (75px) tall; page content starts below it.
- Hero: `100vh`, centered single column, 35px gap between statement and supporting content.
- Text measure: 650px maximum for centered statements; 80% width for long copy.
- Testimonial stage: 1000px maximum.
- Grid gaps: 35px. Project marquee uses a continuous horizontal track, not a grid.

Layout should feel **full-bleed and airy**. Avoid boxed 1200px containers with visible edges; let sections breathe edge to edge.

## Depth, borders, and shape

The system is almost flat.

- Default card shadow: `{shadows.card}` — a 1px ambient lift, nothing more.
- Structural borders: `{borders.hairline}` for circle buttons and image frames.
- Dividers and secondary controls: `{borders.dashed}` — a dashed 1px line reads as a cut or fold.
- Radius: 0 for most surfaces; 4–5px for paper cards; `{radius.pill}` for menu controls; `{radius.circle}` for the elliptical CTA.
- Never exceed 12px radius on a content card. Large soft radii destroy the print feel.

Rotation is part of the depth language: cards sit at −1° to −6.85°, and stickers are pinned at arbitrary angles. Rotation should look hand-placed, not animated.

## Components

### Navigation link

- Neue Haas 16px / 400, `{colors.textPrimary}`.
- Underline exists but is transparent by default; on hover the `text-decoration-color` becomes `{colors.textPrimary}`.
- 5px vertical padding, no background.
- Current page keeps the underline visible.
- Mobile menu expands to full-screen serif links at 48px, stacked with generous vertical padding.

### Circle CTA

- 225×85px ellipse, 1px solid `{colors.textPrimary}`, transparent fill, 18px label.
- Text centered optically, not geometrically.
- Hover fills a single flat color: `{colors.green}`, `{colors.blue}`, `{colors.yellow}`, or `{colors.cornflower}` depending on the section. Never gradient.
- Transition: `background-color .2s`.

### Primary button (forms)

- Background `{colors.textPrimary}`, text `{colors.surface}`.
- 12px uppercase label with 2px letter-spacing.
- Padding 12px 25px, square corners.
- Hover background `#32343A`.

### Project card

- 16:9 image block, no radius on the image itself.
- Title: STK Saga 36px / 300.
- Tags: 12px uppercase Termina with `.2em` tracking, separated by generous spacing.
- Hover: image cross-fades to a rollover frame; the whole card translates up `-3vw`. Transition `.2s`.
- Do not add a border or heavy shadow to the card; the image is the object.

### Testimonial card

- Max 1000×550px, `{colors.yellow}` (variants: pink, green, cornflower, red), 5px radius, `{shadows.card}`, 2vw padding.
- Rotated −1° by default; stacked variants rotate −4.87°, −6.85°, +2.25°.
- Headline in STK Saga Italic 40px; attribution in 16px sans.
- Cards stack in a shuffled pile; clicking brings the top card forward. This is the one place a colored full-bleed surface is allowed.

### Sticker

- Hand-drawn SVG or die-cut PNG, absolutely positioned, rotated.
- Sizes range from 80px to 220px.
- Draggable on pointer devices; each grab raises z-index.
- Stickers may overlap images and text, but must never cover a primary action or navigation link.

### Footer

- Large serif statement (24px / 1.35) with a 50px indent.
- Links are inline text with a yellow highlight on hover.
- Bottom row: uppercase 20px labels with `.2em` tracking, small legal copy at 11px.

## Motion

Motion should feel like paper being handled, not UI animating.

- Color and opacity transitions: `.2s ease`.
- Card lift: `transform: translateY(-3vw)` on hover, `.2s`.
- Image rollover: opacity cross-fade, `.2s`.
- Project marquee: continuous horizontal scroll at roughly **40px/s**, cloned track for seamless looping.
- Sticker drag: direct pointer tracking, no easing, `cursor: grab` / `grabbing`.
- Testimonial shuffle: z-index swap, no spring or bounce.
- Respect `prefers-reduced-motion: reduce`: stop the marquee, disable lift and rotation animation, expose overflow scrolling instead.

## Do and don't

**Do**

- Set the page on warm cream paper with a faint fiber texture.
- Use STK Saga Light at large sizes with tight 1.15 line height.
- Use black hairlines and dashed rules instead of shadows.
- Let stickers, rotation, and collage asymmetry carry the personality.
- Use a single flat color fill for hover states.
- Keep body copy at 16px / 1.75 with a book-like first-line indent.

**Don't**

- Don't use gradients, glassmorphism, blur, neon, or colored glows.
- Don't use large soft radii (16px+) on cards.
- Don't set body copy or navigation in a brand color.
- Don't use bold serif display type.
- Don't use stock drop shadows beyond `{shadows.card}`.
- Don't fill more than one full section with saturated color.
- Don't substitute a geometric sans for the editorial serif.
- Don't make the layout look like a dashboard: no dense sidebars, no data tables, no card grids with equal visual weight.

## Responsive behavior

Breakpoints: **991px**, **767px**, **479px**.

- Display scales 60px → 42px → 36px; line height stays near 1.15–1.35.
- The 200px text indent collapses to 0 below 991px.
- Navigation becomes a full-screen serif menu at 48px.
- Marquee cards become a single-column vertical stack; the auto-scroll stops.
- Testimonial cards keep their rotation but reduce to near-full width and auto height.
- Section spacing compresses from 100px to roughly 10vw.
- Touch targets stay at least 44×44px; circle CTAs shrink but keep the ellipse silhouette.

## Accessibility

- Ink `#020201` on paper `#FEFDEC` exceeds 19:1 contrast; secondary `#353432` still exceeds 10:1.
- Never communicate state with color alone; pair the yellow highlight with an underline or weight change.
- Keep a visible focus ring: 2px `{colors.textPrimary}` offset 2px. Do not remove outlines.
- Draggable stickers are decorative: mark them `aria-hidden` and never place essential content inside.
- Provide a visible pause control or honor reduced motion for the marquee.
- Maintain logical heading order even when visual size is used for composition.

## Agent prompt guide

When generating a new page in this system, use language like:

> Build a case-study page for a packaging brand following DESIGN.md. Use the paper canvas, a 60px STK Saga statement, 16px Neue Haas body with 50px first-line indents, one yellow testimonial card rotated −1°, and two die-cut stickers. No gradients, no large radii, no colored body text.

Quick references:

- Page background: `{colors.background}` with paper texture.
- Primary text and borders: `{colors.textPrimary}`.
- Hover fill: `{colors.yellow}` for text links; `{colors.green}` or `{colors.blue}` for circle CTAs.
- Card lift: `translateY(-3vw)`, `.2s`.
- Label style: 12px, 500, uppercase, `.2em` tracking.
