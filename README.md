# Yugya — Official Website Repository

Public codebase for **Yugya** (https://yugya.com), a technology and digital services company delivering websites, software systems, and server infrastructure.

## Positioning & Philosophy

Yugya builds practical technology for businesses, schools, and teams that need things to run reliably. We prioritize simplicity, maintainability, clean semantic code, and complete client ownership. We do not use template clichés, manufactured marketing metrics, or artificial vendor lock-in.

## Architecture & Technology Stack

- **Markup:** Semantic HTML5 with WCAG AA accessibility compliance, Schema.org JSON-LD structured data, and OpenGraph metadata.
- **Styling:** Custom CSS3 with CSS variables, fluid typography, responsive grid and flexbox compositions, and reduced-motion support.
- **Scripting:** Zero-dependency vanilla JavaScript for mobile navigation drawer, intersection-observer reveals, active link tracking, and accessible contact form handling.
- **Hosting & CI/CD:** Static deployment pipeline automated via GitHub Actions in `.github/workflows/static.yml` for GitHub Pages.

## Site Structure

- `index.html` — Homepage, core positioning, verified services overview, architectural workflow diagram, featured case studies, and four-stage delivery process.
- `services.html` — Detailed scopes for Web Development, Linux VPS & Deployment, Domain & DNS Guidance, Business Automation, and Ongoing Maintenance, plus an honest scope comparison table.
- `work.html` — Transparent case studies for Aama Pathshala bilingual web platform, Linux Production Server Hardening standard, and AayushAI Core local memory prototype.
- `about.html` — Founding story, operating principles, and grounded profiles for the founding team (Aayush Bhandari, Aayush B.K, Sagar Bhusal).
- `contact.html` — Direct communication channels, preparation checklist, interactive enquiry form with clipboard copying helper, and FAQ.
- `style.css` — Design system, editorial typography, responsive grid, focus styles, and component styling.
- `script.js` — Client interactions, form formatting, and accessibility enhancements.

## Local Preview

To preview the website locally:

```bash
# Using Python 3 built-in HTTP server:
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.
