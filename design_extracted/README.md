# Heads Up — About Page UI Kit

A high-fidelity, interactive recreation of the **Heads Up About page** ([headsupclubs.org/about](https://www.headsupclubs.org/about)), built on the shared foundations (`../../colors_and_type.css`) in the club/scrapbook style. Open `index.html`.

## Structure (mirrors the real About page)
- **Nav** — Heads Up wordmark + real nav (About active, Initiatives, Mentor Program, Team, Partners, Merch) + a Donate CTA. Condenses (gains a 2px ink underline) on scroll; mobile burger menu.
- **Hero** — "About Us" sticker, hand-lettered "est. 2020 · Deerfield Academy", big headline with a highlighter mark, intro, sticker row, and a tilted **polaroid collage** of the real Deerfield + classroom photos.
- **Our first club** — the Deerfield story: a 2020 study found ~5 hrs/day online → ~8 hrs during the pandemic (shown in a 2px-outlined stat strip), with a founder card for **Diana Bishopp**.
- **Our mission** — the real mission statement in a cobalt block with a watermark logo + a classroom polaroid.
- **Youth for youth.** — big closing statement with a hand-lettered aside and CTAs.
- **Footer** — Heads Up, blurb, Instagram + LinkedIn, real link columns.

## Club / scrapbook ingredients
`Sticker` (tilted, outlined, offset shadow), `Polaroid` (taped photo + hand-lettered caption, with real-image src + graceful fallback), highlighter `.hl` marks, chunky `0 4px 0` buttons, and a faint dotted corkboard background.

## Real photos
The hero collage and section polaroids hotlink the two real Squarespace-hosted photos from the About page. They load over the network; if they ever fail, the polaroid shows a captioned fallback. For production/offline, download them into `assets/` and point the `IMG_*` constants in `Hero.jsx` at the local copies.

## Files
| File | Role |
|---|---|
| `index.html` | Entry point — React 18 + Babel, then the component scripts (cache-busted with `?v=`). |
| `site.css` | All kit styling (layers on the token CSS). |
| `icons.jsx` | `<Icon name>` — Lucide path data inlined. |
| `primitives.jsx` | `Button`, `Eyebrow`, `Pill`, `Photo`, `Sticker`, `Polaroid`, `Reveal`. |
| `NavBar.jsx` | Sticky condensing nav + mobile menu. |
| `Hero.jsx` | About hero + polaroid collage (defines the real `IMG_*` URLs). |
| `Sections.jsx` | `FirstClub`, `Mission`, `YouthBand`. |
| `Footer.jsx` | Site footer. |
| `App.jsx` | Composition + mount. |

## Conventions
- Components export to `window` (each `<script type="text/babel">` shares the global lexical scope; exporting keeps it explicit).
- Bump the `?v=` query on the script/CSS links when editing, to dodge the preview's aggressive caching.
- Icons are inlined Lucide — add new ones to the `P` map in `icons.jsx`.
