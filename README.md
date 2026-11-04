# Yugya — Official Website Repository

Public codebase for **Yugya** (https://yugya.com), a technology and digital services company based in Nepal delivering websites, software systems, and server configurations.

## Positioning & Approach

Yugya builds practical technology for businesses, educational institutions, and teams that need dependable execution. We prioritize simplicity, maintainability, clean semantic code, and transparent handover. We do not use template clichés, manufactured marketing metrics, or artificial vendor lock-in.

## Architecture & Technology Stack

- **Markup:** Semantic HTML5 with accessible landmark structure, Schema.org JSON-LD structured data, and OpenGraph metadata.
- **Styling:** Custom CSS3 with CSS variables, fluid typography, responsive grid and flexbox compositions, and reduced-motion support.
- **Scripting:** Zero-dependency vanilla JavaScript for mobile navigation drawer, intersection-observer reveals, active link tracking, and accessible contact form handling.
- **Hosting & CI/CD:** Static deployment pipeline automated via GitHub Actions in `.github/workflows/static.yml` for GitHub Pages.

## Site Structure

- `index.html` — Homepage, core positioning, verified services overview, featured case study, studio introduction, and four-stage delivery process.
- `services.html` — Itemized scopes for Web Development, Linux VPS & Deployment, Domain & DNS Guidance, Business Automation, and Ongoing Maintenance, plus a service scope and boundaries table.
- `work.html` — Transparent case studies for Aama Pathshala bilingual preschool website, Linux Production Server Hardening baseline, and AayushAI Core local memory prototype.
- `about.html` — Company purpose, technical focus, operating principles, and remote collaboration standards.
- `contact.html` — Direct email channel, preparation guide, interactive enquiry form with clipboard copying helper, and engagement FAQ.
- `style.css` — Design system, editorial typography, responsive grid, focus styles, and component styling.
- `script.js` — Client interactions, form formatting, and accessibility enhancements.

## Brand System

The site uses the owner-supplied Yugya palette and logo assets without recolouring or distortion.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-sage` | `#859E8B` | Rules, accents, quiet emphasis |
| `--color-accent` | `#5D866A` | Interactive accents and focus rings |
| `--color-secondary` | `#365549` | Links, labels, secondary type |
| `--color-primary` | `#1F4639` | Dark sections and primary surfaces |
| `--color-background` | `#F7F4EF` | Page background |
| `--color-text` | `#16231E` | Body copy |
| `--color-muted` | `#52655B` | Secondary copy |
| `--color-surface` | `#FBF9F5` | Raised panels |
| `--color-border` | `#D7DED7` | Hairlines and dividers |

Typography: **Newsreader** for display, **Figtree** for interface and body text, **JetBrains Mono** for labels and technical detail.

Brand assets live in `assets/brand/`:

- `yugya-nav.webp` / `yugya-nav.png` — navigation lockup (82 × 58 display)
- `yugya-logo.webp` / `yugya-logo.png` — full lockup with tagline
- `yugya-mark.webp` / `yugya-mark.png` — compact mark
- `yugya-logo-anim.webp` — animated WebP brand moment (186 KB)
- `yugya-logo.gif` — optimized GIF fallback (480 × 270, 710 KB)
- `yugya-poster.png` — static poster for `prefers-reduced-motion`
- `favicon.png`, `apple-touch-icon.png`, `yugya-og.png` — platform and social assets

## Local Preview

To preview the website locally:

```bash
# Using Python 3 built-in HTTP server:
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
