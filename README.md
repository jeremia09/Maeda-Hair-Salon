# Maeda Hair Salon — Site (Trial Design)

A single-page marketing site for **Maeda Hair Salon (漂亮人生)**, a walk-in hair salon on Avenue U in Brooklyn, NY. Built as a static HTML/CSS/JS page — no build step, no framework, no dependencies to install.

> **Status:** Trial design, for internal review only. Business details (address, phone, hours) were pulled from public listings and should be verified before this goes live.

## Live Preview

Just open `index.html` in a browser — no server or build process required. For the best experience (and to avoid any local file-path quirks), serve it with a simple local server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Project Structure

```
maeda-site/
├── index.html          # All page markup and content (single page, anchor-linked sections)
├── css/
│   └── styles.css       # All styling — CSS custom properties, layout, components
├── js/
│   └── main.js           # Open/closed status logic, AOS init, hero parallax effect
├── images/
│   ├── hero-balayage.jpg
│   ├── blonde-balayage.jpg
│   ├── extension-install.jpg
│   ├── salon-wall.jpg
│   └── product-wall.jpg
└── README.md
```

## Tech Stack

- **HTML5** — semantic sections, no templating engine
- **CSS3** — hand-written, custom properties (`:root` variables) for theming, no preprocessor or framework
- **Vanilla JavaScript** (`js/main.js`) — no dependencies, IIFE-based
- **[AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)** `v2.3.4` — loaded via CDN for scroll-reveal animations
- **Google Fonts** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (headings), [Space Mono](https://fonts.google.com/specimen/Space+Mono) (labels/mono accents), [Work Sans](https://fonts.google.com/specimen/Work+Sans) (body)
- **Google Maps embed** — iframe on the Find Us section

No `package.json`, no build tooling, no bundler — this is intentionally a plain static site.

## Page Sections

The page is a single scrollable document with anchor-linked nav:

| Section | Anchor | Content |
|---|---|---|
| Hero | — | "Ticket stub" hero with live open/closed status, call & directions CTAs |
| Info strip | — | Walk-in, accessibility, organic products, payment icons |
| The Chairs | `#menu` | Six core services (cut, curly styling, extensions, lashes, nails/waxing, scalp massage) |
| Pricing | `#pricing` | Receipt-styled price list |
| The Corner | `#corner` | Brand/neighborhood story |
| Gallery | `#gallery` | Bento-grid photo gallery of salon work |
| Products | `#products` | Olaplex / K18 product callout |
| Notes | `#notes` | Client testimonial cards |
| FAQ | `#faq` | Collapsible `<details>` FAQ list |
| Find Us | `#location` | Address, phone, hours, Instagram, embedded map |

## Notable Functionality (`js/main.js`)

- **Live open/closed indicator** — compares the current time against 9:30am–7:00pm and updates the status dot/text in the hero on page load.
- **AOS scroll animations** — initialized with `prefers-reduced-motion` respected (animations are disabled for users who request reduced motion).
- **Hero parallax** — a small (max 22px), scroll-bound parallax effect on the hero ticket-stub image, also disabled under `prefers-reduced-motion`.

## Design Notes

- Visual theme is a "ticket stub" / admission-ticket motif (dashed perforation dividers, stub-style hero card, receipt-styled pricing section).
- Color palette and radii are defined as CSS custom properties at the top of `styles.css` (`--cream`, `--sand`, `--rose`, `--espresso`, `--radius`, etc.) — update these to re-theme the site globally.
- Layout is responsive with a single main breakpoint around `800–820px` for nav and hero collapsing to stacked/mobile layouts.

## Editing Content

Since there's no CMS or templating, content changes are made directly in `index.html`:
- **Services & pricing:** `#menu` and `#pricing` sections
- **Hours/contact:** update in the hero ticket stub, the info strip, the CTA band, `#location`, and the footer — hours also need to match the logic in `js/main.js` (`9*60+30` to `19*60`, i.e. 9:30am–7:00pm)
- **Photos:** drop new images into `images/` and update the `src`/`alt` attributes in the `#gallery` and `#products` sections

## Attribution / Licensing

- Fonts served via Google Fonts CDN.
- AOS library © Michał Sajnóg, MIT License, loaded via unpkg CDN.
- Salon photography and business details belong to Maeda Hair Salon; verify usage rights before publishing publicly.