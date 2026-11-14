# Visual credibility strategy

Date: 2026-11-14
Scope: imagery, screenshots, project previews and technical diagrams across the Yugya site.

The goal is to make the studio look like what it is: a real, technically capable team with genuine work. The design system, typography, palette and layout were not changed. Every visual added here is either a real Yugya artefact or an explicitly labelled explanatory diagram.

---

## 1. Page-by-page audit

| Page | Existing visuals | Gap | Action |
| --- | --- | --- | --- |
| `/` | Brand animation, Yugs product mark, founder portraits, official logo | Aama Pathshala had a separate featured spotlight, making one project more prominent than the others; the demo index was also text-only | Removed the featured Aama section. Kohinoor, Samajik Abhiyaan and Aama now use the same live-project row layout and thumbnail treatment. Added demo thumbnails. |
| `/services/` | None; five long text scopes | Each technical service was visually indistinguishable | Added a live Aama screenshot to the web scope and four distinct inline diagrams: server/security baseline, DNS/email routing, automation pattern, maintenance routine. |
| `/work/` | Aama screenshot, server Caddy excerpt, AayushAI terminal excerpt, founder-independent project data | Aama sat in build notes while two live clients had a separate section | Moved Aama into the same live-project entries as Kohinoor and Samajik. Build notes now contain only the Linux server baseline and AayushAI prototype. Added demo thumbnails. |
| `/work/savor/` … `/work/serverscope/` | Text, launcher, tour | Visitors could not see the demo before opening it | Added a real screenshot of the actual demo with a "live demo preview · sample data" caption. |
| `/about/` | Official lockup, two real founder portraits, principles | No obvious gap; an office/team stock photo would be misleading | No new imagery. The real people and real principles are stronger than generic office photography. |
| `/contact/` | Form, checklist, FAQ | A map or office photo would require a verified address that the site does not publish | No new imagery. The form is the useful visual surface. |
| `/404/` | On-brand error layout | None | No change. |

---

## 2. Research notes

The following were read for imagery and trust patterns, not copied:

### Orbix Studio — B2B website design best practices (2026)

Source: https://www.orbix.studio/blogs/b2b-website-design

Relevant findings:

- Strong B2B sites show the product or outcome before a feature list.
- Buyers scan; headings, subheadings and visuals must carry the message.
- Product screenshots, code examples and real interface glimpses build more confidence than generic technology imagery.
- Trust signals should sit near the claim or decision they support.
- Accessibility and consistent design are part of credibility.

Applied: real demo screenshots sit directly beside the demo claims; service diagrams sit inside the service scope they explain.

### Better Business Websites — what a professional services website needs to establish trust (2026)

Source: https://betterbusinesswebsites.co.uk/insights/what-a-professional-services-website-needs-to-establish-trust/

Relevant findings:

- Trust is accumulated evidence, not one badge or a polished stock photo.
- Specific expertise, visible people, an understandable process, honest limits and dependable behaviour matter more than superlatives.
- Named people and real examples beat anonymous claims.
- The website's own behaviour (accuracy, accessibility, reliable forms) is part of the evidence.

Applied: no stock people, no fabricated facilities, no invented client logos. The site keeps its real founders, real project screenshot and real demos. The diagrams state their limits ("Reference architecture", "Not a live status report").

### Supabase homepage

Source: https://supabase.com/

Relevant findings:

- The product is shown as a set of concrete modules (database, auth, functions, storage, realtime) rather than a generic "platform" illustration.
- Product UI, code samples and customer stories do the persuasive work.
- The page is dense but scannable because each module is labelled.

Applied: each service gets its own distinct visual rather than one reused "technology" image. The diagrams are labelled by function, not decoration.

### Internal — `docs/demo-portfolio-strategy.md`

The demos already use an honesty architecture:

- **Real** — logic runs in the browser.
- **Simulated** — a workflow that would need a backend, clearly labelled.
- **Sample** — fictional values standing in for live data.

Applied: every demo preview is captioned "Sample data · runs in your browser". The preview is a screenshot of the actual demo, not a mock-up.

---

## 3. Asset inventory

### Genuine Yugya assets used

| Asset | Source | Use |
| --- | --- | --- |
| `public/assets/projects/aama-desktop.webp` | Screenshot of the live Aama Pathshala site, 2026-11-14 | Live project entry, thumbnail source, web-development service visual |
| `public/assets/projects/aama-mobile.webp` | Mobile screenshot of the live Aama Pathshala site, 2026-11-14 | Live project entry |
| `public/assets/projects/aama-thumb.webp` | 360 × 225 Aama thumbnail from the live site | Home live-project row |
| `public/assets/demos/savor.webp` | Screenshot of the actual Savor demo | Demo intro preview |
| `public/assets/demos/campusflow.webp` | Screenshot of the actual CampusFlow demo | Demo intro preview |
| `public/assets/demos/stockwise.webp` | Screenshot of the actual Stockwise demo | Demo intro preview |
| `public/assets/demos/worknest.webp` | Screenshot of the actual Worknest demo | Demo intro preview |
| `public/assets/demos/serverscope.webp` | Screenshot of the actual ServerScope demo | Demo intro preview |
| `public/assets/founders/*.jpg` | Real founder portraits | Home and About founder cards |
| `public/assets/brand/*` | Official brand artwork supplied by the owner | Header, footer, hero animation, Yugs product mark, OG image |
| `public/assets/projects/kohinoor-desktop.webp` | Screenshot of the live Kohinoor Restaurant site, 2026-11-14 | Live client project entry and thumbnail |
| `public/assets/projects/kohinoor-mobile.webp` | Mobile screenshot of the live Kohinoor Restaurant site, 2026-11-14 | Live client project entry |
| `public/assets/projects/samajik-desktop.webp` | Screenshot of the live Samajik Abhiyaan site, 2026-11-14 | Live client project entry and thumbnail |
| `public/assets/projects/samajik-mobile.webp` | Mobile screenshot of the live Samajik Abhiyaan site, 2026-11-14 | Live client project entry |

The demo screenshots were checked against the demo source data: for example, CampusFlow shows the same Grade 5 / Sunita Adhikari record as `lib/demos/campusflow.ts`, Stockwise shows the same bill records (B-0141 to B-0143) used in `lib/demos/stockwise.ts`, and Worknest shows the Gandaki Electrical Works job book from `lib/demos/worknest.ts`. They are screenshots, not invented dashboards.

### New derivative assets

- `public/assets/demos/<demo>-360.webp` — five 360 × 206 thumbnails generated from the genuine screenshots for the demo index. They are used at 120–150 CSS px, so they remain sharp on 2× displays without downloading the 720 px file five times.

### Created explanatory diagrams

`components/ServiceVisual.tsx` renders four inline SVGs:

1. **Server / security baseline** — Git repository → deploy hook → Caddy/Nginx with TLS → systemd app, plus SSH keys, UFW, Fail2ban and TLS renewal. Labelled "Reference architecture" and "Not a live status report".
2. **DNS and email routing** — domain holder → registry → authoritative DNS, branching to A/AAAA, MX and TXT (SPF, DKIM, DMARC). Labelled "Records documented at handover".
3. **Automation pattern** — input → script → validate + log → output, with an optional human review gate and cron/retry/error-alert notes.
4. **Maintenance routine** — patch OS → TLS/DNS → backups → link check → report, with a repeat-monthly cycle.

They use only the site's design tokens, hairline strokes and mono labels. They are not screenshots and do not pretend to be live data.

### Savor food photography

The Savor demo contains openly licensed food photographs, credited inside the demo. The preview is a screenshot of that demo, captioned as sample data. It is not presented as a Yugya client restaurant or as Yugya's own photography.

---

## 4. What was deliberately not used

| Not used | Reason |
| --- | --- |
| Stock photography of people, offices or "teams" | It would imply employees, facilities or clients that the site cannot verify. The real founder portraits are stronger. |
| Generic server-room, cyber-lock or AI-brain stock images | They communicate nothing specific and would make the site look like a template. Custom diagrams communicate the actual scope. |
| Fabricated dashboards or fake infrastructure readings | Forbidden by the site's truth-in-technical-descriptions principle. The diagrams are explanatory, not status reports. |
| A screenshot of the Yugs product UI | The public Yugs URL redirects to a sign-in page. A login screenshot would not show the product, and a fabricated UI would be dishonest. The supplied Yugs product mark remains the genuine AI product visual. |
| Client logos, testimonials, awards or ratings | None are verified or available. |
| A map or office photo on `/contact/` | No verified street address is published. |
| Decorative images on every section | The brief explicitly asks not to overload pages. Each visual earns its place. |
| Generated images of "Nepali customers" or "our team" | Fabricated people are a trust violation and would conflict with Google's guidance on deceptive authorship and content. |

---

## 5. Implementation

### Real screenshots before interaction

`components/DemoProjectIntro.tsx` now renders a framed screenshot of the actual demo immediately after the hero:

- 720 × 411 WebP, `loading="lazy"`, `decoding="async"`, explicit dimensions.
- Caption: "[Demo] — live demo preview" and "Sample data · runs in your browser".
- The preview sits in its own block before the problem/solution section, so the page reads: what it is → what it looks like → the problem → the modules.

### Demo index thumbnails

`components/DemoIndex.tsx` now includes a 360 × 206 thumbnail for each demo:

- `loading="lazy"`, explicit dimensions, descriptive alt text.
- The thumbnail is a supporting visual; the name, kind, tagline and module count remain the primary information.
- Hidden below 900 px to keep the mobile rows scannable; the demo pages themselves show the full preview.

### Service diagrams

`app/services/page.tsx` places one visual inside each service scope:

- Web development: the live Aama screenshot, captioned "Live build — Aama Pathshala · Desktop screenshot · Nov 2026".
- Server infrastructure: the server/security diagram.
- Domain & DNS: the DNS/email diagram.
- Automation: the automation diagram with the human-review gate.
- Maintenance: the monthly routine diagram.

The diagrams are inline SVG, so they inherit the light/dark theme tokens, stay crisp at any size, add no image requests, and expose `<title>`/`<desc>` to assistive technology. On narrow screens the diagram scrolls inside its frame with a visible "Scroll the diagram sideways" hint; the page itself does not overflow.

### Visual treatment

All new figures reuse the existing frame language:

- `background: var(--color-surface-soft)`
- `border: 1px solid var(--color-border)`
- inner hairline border on the image/SVG
- mono caption row with a left description and a right qualifier
- 2 px radius, no shadows, no gradients, no new colours, no new fonts

This keeps the new imagery inside the owner-approved design system rather than creating a parallel visual language.

---

## 6. Performance and accessibility

- New images use WebP; thumbnails are 3.5–9 KB each.
- Full demo previews are 14–36 KB each and lazy-loaded.
- The Aama image was already part of the site; the service figure reuses it with explicit dimensions and lazy loading.
- Inline SVG diagrams add no network requests and no client JavaScript.
- Every new `<img>` has descriptive alt text and explicit `width`/`height`.
- Every diagram has an accessible `<title>` and `<desc>`, `role="img"` and `aria-labelledby`.
- No new runtime dependencies.
- No new animations. The existing reveal-on-scroll class is used, and reduced-motion users see the figures immediately.
- Mobile: the demo thumbnails are hidden below 900 px; the service diagrams scroll inside their frame with a hint; page-level horizontal overflow was found and fixed by constraining the service grid column (`min-width: 0`).

---

## 7. Verification

- `npm run typecheck` — pass
- `npm run lint` — pass
- `npm run build` — pass
- `npm run seo:check` — 10 pages, 10 unique titles, 0 errors, 0 warnings
- Headless Chrome, light theme, desktop: services web/server/DNS/automation/maintenance, demo preview, work demo index
- Headless Chrome, light theme, mobile 390 px: services server diagram and work demo index
- Dark theme checked via the exported page in headless Chrome
- Image audit: all new images have alt text and dimensions
- Mobile overflow check: page content now stays inside the viewport; the diagram scrolls within its own frame

The visual QA screenshots are temporary and are not committed. The implementation is verified by build, markup audit and the screenshots described above.

---

## 8. Future visual assets worth collecting

These would strengthen credibility further, but require real material or permission:

1. **Real workspace or team photographs** — only if the studio has a presentable workspace and the people consent.
2. **Additional client project screenshots** — the Kohinoor, Samajik and Aama captures are now live; future client captures should have written permission and a short, verified context line, with no invented outcome metrics.
3. **Yugs product screenshots** — after signing in, with owner approval; show a real interface, not a mock-up.
4. **Workshop, training or community photographs** — if Yugya runs or attends real events.
5. **A short screen recording of a demo** — optional, but only if it improves understanding and does not hurt load time.
6. **Client logos or testimonials** — only with written permission and only if they are genuine.

Do not fill these slots with stock imagery or generated people. An empty slot is better than a false one.
