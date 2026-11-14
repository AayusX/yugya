<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Yugya website

Project guide for AI agents and new contributors. Read this before changing anything.

---

## 1. What this project is

The Yugya website (`https://www.yugya.com`) built on Next.js at the repository root. It is a
**faithful port of the previous hand-written site**, not a redesign.

The legacy HTML pages (`index.html`, `services.html`, `work.html`, `about.html`, `contact.html`,
`style.css`, `script.js`) were removed when the Next.js app moved from `yugya-next/` to the root.
They remain in git history — `4a82432` is the last commit that contains them in full, and
`2ed72df` holds an older design variant. Use those commits as the specification when you need to
confirm what a page or interaction originally did.

**The contract:** same words, same markup structure, same visual design, same interactions — with a
clean dependency audit.

If you are unsure whether a change is allowed, ask: *does the historical page do this?* If not,
don't.

**Addition:** the interactive demo portfolio (`/work/savor/` … `/work/serverscope/`) is new work
sitting beside the ported pages. It follows the same rules — no invented claims, fictional sample
data labelled honestly, and additions only (existing page copy is untouched). The strategy behind
it is documented in `docs/demo-portfolio-strategy.md`.

---

## 2. Hard rules

| Rule | Why |
| --- | --- |
| Do not redesign, restyle, or "improve" the design | The design is owner-approved and final |
| Do not rewrite copy | Text parity with the previous pages is verified word-for-word |
| Never invent metrics, client logos, testimonials, uptime figures, or performance claims | The positioning is explicitly "truth in technical descriptions" |
| Treat `app/globals.css` as the design system | It is the official brand-identity stylesheet; only the font-stack lines differ from the original |
| Do not add runtime dependencies without a stated reason | `npm audit` must stay at **0 vulnerabilities** |
| Do not add a backend | The site is a static export; there is no server, database, or API |
| Keep demo sample data fictional and labelled | The demos are demonstrations, not product claims; never present sample numbers as real outcomes |
| Prefer server components | A small fixed set of components are client-side, each for a concrete reason |

---

## 3. Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js **16.4.5** — App Router, Turbopack build |
| UI runtime | React **19.3.0** |
| Language | TypeScript 5 (`strict: true`) |
| Styling | Plain CSS in `app/globals.css` |
| Fonts | `next/font/google`: Newsreader, Figtree, JetBrains Mono |
| Output | `output: "export"` → static `out/` |
| Lint | ESLint **10** + `eslint-config-next` (core-web-vitals + typescript) |
| Node | **>= 20.9.0** (Next 16 engine requirement) |

Runtime dependencies are exactly three: `next`, `react`, `react-dom`. There is no CSS framework, no
component library, no state library, no icon package.

Path alias: `@/*` → project root (`@/components/...`, `@/lib/...`).

---

## 4. Commands

```bash
npm install        # install (respects package-lock.json)
npm run dev        # dev server, http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config)
npm run build      # static export into ./out
npm run seo:check  # validate canonicals, metadata, JSON-LD, sitemap, robots, links
npm start          # serve the built ./out on http://127.0.0.1:3000
```

- `npm start` runs `scripts/serve.mjs`, a zero-dependency static server. Set `PORT` / `HOST` to
  change the bind address. Do not replace it with the `serve` package — that package pulls in
  vulnerable `compression` versions and breaks the clean audit.
- **`next start` does not work** with `output: "export"`. It will error. Use `npm start`.
- Always run `typecheck`, `lint`, and `audit` before declaring work done, then `build` and
  `seo:check`.

---

## 5. Project layout

```
.
├─ app/
│  ├─ layout.tsx            Root layout: fonts, root metadata, viewport, JSON-LD,
│  │                        SiteHeader / SiteFooter / RevealOnScroll, IntroSequence,
│  │                        pre-paint theme + intro gating script
│  ├─ page.tsx              /            home
│  ├─ services/page.tsx     /services/   service scopes + boundaries table
│  ├─ work/page.tsx         /work/       three project entries + interactive demos index
│  ├─ work/<demo>/page.tsx  /work/<demo>/ demo intro pages ×5 (savor, campusflow,
│  │                        stockwise, worknest, serverscope)
│  ├─ about/page.tsx        /about/      purpose, principles, location
│  ├─ contact/page.tsx      /contact/    enquiry form + FAQ
│  ├─ not-found.tsx         404.html     on-brand 404
│  ├─ globals.css           The design system (official brand-identity stylesheet)
│  ├─ sitemap.ts            /sitemap.xml
│  ├─ robots.ts             /robots.txt
│  ├─ icon.png              favicon (byte-identical to public/assets/brand/favicon.png)
│  └─ apple-icon.png        iOS touch icon (public/assets/brand/apple-touch-icon.png)
├─ components/
│  ├─ SiteHeader.tsx        "use client" — sticky header, mobile drawer, active link
│  ├─ SiteFooter.tsx        server — footer + inline year-refresh script
│  ├─ RevealOnScroll.tsx    "use client" — IntersectionObserver reveal
│  ├─ EnquiryForm.tsx       "use client" — mailto/clipboard form
│  ├─ JsonLd.tsx            server — safe JSON-LD emitter
│  ├─ ThemeToggle.tsx       "use client" — light/dark theme switch
│  ├─ GoogleTranslate.tsx   "use client" — footer language widget
│  ├─ DemoProjectIntro.tsx  server — shared demo intro-page template
│  ├─ DemoIndex.tsx         server — demo index rows used by home + work
│  ├─ LiveProjects.tsx      server — live client entries + compact home rows
│  ├─ FounderCards.tsx      server — founder portrait cards used by home + about
│  ├─ ServiceVisual.tsx     server — inline reference diagrams for the service scopes
│  ├─ IntroSequence.tsx     "use client" — brand entry title card (timing, skip)
│  ├─ intro.css             intro title card, flash, split curtain, scroll lock
│  ├─ yugs.css              Yugs launch panel styles (imported by app/page.tsx)
│  └─ demos/                demo portfolio: demo-launcher, demo-window, guided-tour,
│                           demo-shared (window context), five demo apps + per-app CSS,
│                           demos.css (shared chrome / tour / index styles)
├─ lib/
│  ├─ site.ts               SITE_URL, YUGS_URL, email, location, nav items, service links,
│  │                        FOUNDERS
│  ├─ metadata.ts           pageMetadata() helper
│  ├─ schema.ts             Organization / WebSite / page / Service / FAQ schema nodes
│  ├─ projects.ts           verified live client project data and screenshot paths
│  └─ demos/                registry.ts (all demo copy, DEMO_DISCLAIMER), tour.ts
│                           (TourStep type), five <demo>.ts files (fictional sample
│                           data + tour steps)
├─ public/
│  ├─ .nojekyll             keeps GitHub Pages from ignoring /_next
│  ├─ assets/brand/         logo lockups, mark, animation, OG image, palette,
│  │                        yugs-neon-robot.png (Yugs product mark, as supplied)
│  ├─ assets/demos/         genuine demo screenshots (720 px) + 360 px index thumbnails
│  ├─ assets/founders/      founder portraits (640/960/1200 JPEG, used by FounderCards)
│  └─ assets/projects/      live client screenshots (desktop/mobile) + index thumbnails
├─ docs/
│  ├─ demo-portfolio-strategy.md   research → interface mapping for the demos
│  ├─ visual-credibility.md        page-by-page imagery audit, research and asset rules
│  ├─ live-projects.md             URL verification, screenshot provenance, attribution
│  └─ seo/                  research, baseline audit, keyword map, technical/GEO/content
│                           strategy, implementation report, post-launch checklist
├─ scripts/serve.mjs        static preview server for `npm start`
├─ scripts/seo-check.mjs    zero-dependency export SEO checks (`npm run seo:check`)
├─ .github/workflows/static.yml   builds and deploys `out/` to GitHub Pages
├─ next.config.ts           static export config
├─ eslint.config.mjs        flat config
└─ AGENTS.md                this file
```

---

## 6. Routing and URLs

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`,
`poweredByHeader: false`.

| Route | Exported file |
| --- | --- |
| `/` | `out/index.html` |
| `/services/` | `out/services/index.html` |
| `/work/` | `out/work/index.html` |
| `/work/savor/` | `out/work/savor/index.html` |
| `/work/campusflow/` | `out/work/campusflow/index.html` |
| `/work/stockwise/` | `out/work/stockwise/index.html` |
| `/work/worknest/` | `out/work/worknest/index.html` |
| `/work/serverscope/` | `out/work/serverscope/index.html` |
| `/about/` | `out/about/index.html` |
| `/contact/` | `out/contact/index.html` |

**Link rules**

- Internal navigation: always `next/link` with a trailing slash (`/services/`).
- Cross-page fragments: `Link href="/services/#web-development"`.
- Same-page fragments and `mailto:`: plain `<a>` (a `Link` would trigger a router navigation).
- Do not hardcode `https://www.yugya.com` in pages — use `SITE_URL` from `lib/site.ts`. The apex
  domain permanently redirects to `www`, so canonicals and sitemaps must name `www`.

**Anchor ids that must not be renamed** (linked from nav, footer, home page, and service CTAs):

| Page | Ids |
| --- | --- |
| `/` | `yugs`, `founders` |
| `/services/` | `web-development`, `server-infrastructure`, `domain-dns`, `automation`, `maintenance` |
| `/work/` | `live-projects`, `kohinoor-restaurant`, `samajik-abhiyaan`, `aama-pathshala`, `server-infrastructure`, `aayushai-core`, `demos` |
| `/about/` | `approach`, `principles`, `founders` |

**Query parameters:** `/contact/?service=` accepts `web`, `vps`, `dns`, `automation`,
`maintenance`. `EnquiryForm` matches them by substring against the option values.

---

## 7. Rendering model

Server components by default. Client components, each justified:

| Component | Client because |
| --- | --- |
| `SiteHeader` | `usePathname`, open/closed drawer state, scroll listener, `body.nav-open` |
| `RevealOnScroll` | `IntersectionObserver` + `usePathname` (re-observe after navigation) |
| `EnquiryForm` | Form input handling, clipboard, `window.location` |
| `ThemeToggle` | theme state and writes to `document.documentElement` |
| `GoogleTranslate` | external script loading and widget state |
| `DemoLauncher` | overlay open state — `{open && …}` keeps demo apps out of the server render |
| `DemoWindow`, `GuidedTour` | tour/view/reset state, DOM measurement and positioning |
| `IntroSequence` | starts the CSS exit, times it from the font arm, handles skip gestures |
| Five demo apps | in-browser interaction state (see §9) |

`SiteFooter` is a server component on purpose: the copyright year is rendered at build time and
refreshed by an inline script, so there is no second render pass and no hydration mismatch.

---

## 8. Design system

`app/globals.css` is the official Yugya brand-identity stylesheet. The **only** permitted deviation
from the original is the three font-stack declarations, which reference `next/font` variables:

```css
--font-display: var(--font-newsreader), Georgia, "Times New Roman", serif;
--font-sans:    var(--font-figtree), system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono:    var(--font-jetbrains-mono), "SFMono-Regular", Consolas, monospace;
```

Tokens (do not change values):

| Token | Hex | Role |
| --- | --- | --- |
| `--color-sage` | `#859E8B` | rules, quiet emphasis |
| `--color-accent` | `#5D866A` | interactive accents, focus rings |
| `--color-secondary` | `#365549` | links, labels, secondary type |
| `--color-primary` | `#1F4639` | dark sections, primary surfaces |
| `--color-background` | `#F7F4EF` | page background |
| `--color-text` | `#16231E` | body copy |
| `--color-muted` | `#52655B` | secondary copy |
| `--color-surface` | `#FBF9F5` | raised panels |
| `--color-border` | `#D7DED7` | hairlines, dividers |

Typography: Newsreader (display), Figtree (UI/body), JetBrains Mono (labels, technical detail).

**Brand assets** live in `public/assets/brand/` and are used exactly as supplied — never recolour,
crop, or regenerate them.

**Imagery rules.** Use only genuine Yugya artefacts (project screenshots, founder portraits,
official marks, actual demo screenshots) or clearly labelled explanatory diagrams. Never use stock
people, offices or facilities as if they were Yugya's. Never fabricate dashboards, infrastructure
readings, client logos, reviews or testimonials. Demo screenshots are sample data and keep the
"Sample data · runs in your browser" caption. Technical diagrams state their limits ("Reference
architecture", "Not a live status report"). New figures reuse the existing frame tokens
(`--color-surface-soft`, hairline border, mono caption); do not introduce a parallel visual language.
Full audit and asset rules: `docs/visual-credibility.md`.

The entry sequence and the Yugs launch panel introduce no new colours: both are built from these
tokens. The intro uses the inverse tokens, so it looks identical in light and dark themes; the
launch panel is a normal `.section-dark` band.

---

## 9. Component behaviour (match these exactly)

### `SiteHeader`
- `.is-scrolled` when `window.scrollY > 8`; re-synced on mount (matters for deep links).
- Mobile drawer at `max-width: 900px`; closes on link click, outside click, `Escape` (focus returns
  to the toggle), and when the viewport crosses `min-width: 901px`.
- `body.nav-open` locks page scroll while the drawer is open.
- Active link: `aria-current="page"`, which CSS turns into the underline via `::after`. It is
  rendered statically per page, so it works before hydration.

### `RevealOnScroll`
- Observes every `.reveal`, adds `.is-visible`, unobserves.
- `threshold: 0.12`, `rootMargin: "0px 0px -40px 0px"` — identical to the original script.
- `prefers-reduced-motion` or no `IntersectionObserver` → reveal everything immediately.
- Depends on `.js` being on `<html>`; without it, `.js .reveal` never applies and content is visible.

### `EnquiryForm`
- Fields are **uncontrolled**; values are read with `FormData`. Only the textarea is stateful
  because the live character counter reads it.
- Submit → `reportValidity()` → min 25 chars → build `mailto:` → show status → `window.location`.
- "Copy formatted enquiry" → clipboard, with an `execCommand` textarea fallback.
- `?service=` preselect mutates the `<select>` directly in an effect. This is deliberate — see §11.
- Nothing is ever sent to a server. Never add a fetch/POST here.

### `SiteFooter`
- Year rendered at build time, corrected by an inline script placed **after** `#year` in the DOM.
- The script is guarded (`if (y) …`).

### `IntroSequence`
- The brand title card: forest field → "Yugya" rising through a mask → hairline → promise line →
  cream flash → split curtain → page. It plays on **full page loads only** (including reload);
  `back_forward`, `location.hash`, `location.search` and `prefers-reduced-motion` skip it, and JS
  off never sees it. In-site client navigation does not replay it because the layout persists.
- Gating lives in the pre-paint script in `app/layout.tsx`, which sets `html[data-intro="on"]`.
  The markup is server-rendered but `display: none` without that attribute.
- The choreography is pure CSS. The component only starts the exit (`.is-out`), adds
  `.intro-fast` for skips, and removes `data-intro` when the curtain is done. It never sets state.
- Timing is anchored on the wordmark arm, not navigation start: the inline script records
  `data-intro-arm` (ms) when Newsreader is ready and adds `#intro.is-fonted`, which starts the
  masked rise. The exit is `arm + 1750ms`, capped at `3600ms` from navigation start, so a slow
  font can never turn the card into a wait. The fast path is `520ms` to fully clear.
- Skip: any pointer/wheel/touch, `Escape`, `Enter`, `Space`, or the "Skip intro" button. The
  curtain still plays (fast: 70ms flash, 60ms delay, 320ms lift) instead of snapping.
- Scroll lock is `html[data-intro="on"] { overflow: hidden; scrollbar-gutter: stable; }`. The
  reserved gutter is what keeps the page width identical at unlock; there is no JS gutter math.
- The forest field clears at the end of the flash (`intro-clear`), so the split panels reveal the
  page itself rather than the field again.
- After closing, the `#intro` node stays in the DOM hidden (`display: none`) — `data-intro` is
  removed, so React still owns the same tree. Do not remove it.
- The mask owns the font-size (`clamp(4.5rem, 15vw, 13rem)`) so its em padding scales with the
  word; the negative margins keep the flex layout measuring only the line box. `--intro-word-shift`
  (135%) is the rest offset and must stay large enough that no ink is visible before the rise.

### `DemoWindow` / `GuidedTour` (demo portfolio)
- Demo apps mount only while the overlay is open (`{open && …}` in `DemoLauncher`), so they are
  never server-rendered and add nothing to the initial page markup.
- Tour state (`tourActive`, `tourStep`), the active app view, and `resetKey` live in
  `DemoWindow`, above the keyed demo subtree, so "Reset demo" remounts the app with pristine
  sample data without losing tour progress. View switches happen in event handlers only — never
  in effects — to keep `react-hooks/set-state-in-effect` clean.
- `GuidedTour` effects only perform DOM work (measure, position, scroll, focus); steps are data
  in `lib/demos/<demo>.ts`, and every step `target` must exist as a `data-tour` attribute in the
  matching demo component.
- `DEMO_DISCLAIMER` (`lib/demos/registry.ts`) is the fixed disclaimer sentence and must stay
  verbatim on every demo intro page.

---

## 10. Metadata, SEO, icons

- `lib/site.ts` → `SITE_URL`, `SITE_EMAIL`, `SITE_LOCATION`, `NAV_ITEMS`, `SERVICE_LINKS`,
  `FOUNDERS`. Single source of truth.
- `lib/metadata.ts` → `pageMetadata({ title, description, path, ogTitle?, ogDescription? })`
  produces canonical URL, Open Graph, and Twitter card. `path` must start **and** end with `/`.
- `lib/schema.ts` → `organizationNode()`, `websiteNode()`, `webPageNode()`, `SERVICE_NODES`,
  `faqPageNode()`. `components/JsonLd.tsx` emits each graph safely.
- Root `metadata` + `viewport` (`themeColor: #F7F4EF`) live in `app/layout.tsx`, together with the
  global Organization + WebSite JSON-LD. Each page adds its own page-level node.
- `npm run seo:check` validates canonicals, metadata, JSON-LD, sitemap, robots and internal links
  against `out/`. Run it after `npm run build`. Full SEO documentation is in `docs/seo/`.
- `app/sitemap.ts` and `app/robots.ts` both declare `export const dynamic = "force-static"`. This is
  **required** — without it the build fails under `output: "export"`.
- Icons come from `app/icon.png` and `app/apple-icon.png`; the App Router emits the `<link>` tags.
  Do not add duplicate `<link rel="icon">` tags.

---

## 11. Gotchas — things that will break the build or the parity check

**Lint rules that shaped this code (keep it that way):**

1. `react-hooks/set-state-in-effect` — never call `setState` synchronously in an effect body. This
   is why the header closes the drawer via link `onClick` instead of a `pathname` effect, and why
   the form preselect touches the DOM instead of state. Do not "fix" these by suppressing the rule.
2. `react/no-unescaped-entities` — apostrophes and quotes in JSX text must be `&apos;`-style
   entities or curly characters (`’`, `“`, `”`). The contact page uses curly quotes for this.
3. `@next/next/no-img-element` is **disabled on purpose** in `eslint.config.mjs`. Brand artwork is
   delivered through `<picture>` with WebP + PNG fallbacks, which `next/image` cannot express. Do
   not convert these to `next/image`.

**Other traps:**

- `<html>` carries `suppressHydrationWarning` because the inline `<head>` script adds the `js`
  class before React hydrates. Removing it reintroduces a hydration warning.
- That `<head>` script must stay **synchronous and inline**. If it is deferred, the first paint
  shows fully-visible content that then flashes out.
- The same script owns the intro gate (`data-intro`) and the font arm (`is-fonted`,
  `data-intro-arm`). Do not move that decision into an effect: the intro would paint over the site
  and then hide itself, and the first frame would be wrong. The 7s last-resort release exists so a
  failed hydration can never trap the page.
- Never replace the intro scroll lock with JS measurement. `scrollbar-gutter: stable` is what keeps
  CLS at 0 when `overflow: hidden` is lifted.
- The intro wordmark is hidden at rest. If `--intro-word-shift` is reduced without re-checking the
  mask padding, the tops of the letters peek through before the rise.
- `<html>` carries `data-scroll-behavior="smooth"`. Next 16 no longer overrides the stylesheet's
  `scroll-behavior: smooth` during route transitions, so without the attribute every page change
  animates the scroll to the top instead of jumping. Same-page anchors stay smooth either way.
- `output: "export"` forbids: API routes, `headers()`, `cookies()`, `redirects`, `rewrites`,
  `next/image` optimisation, and any `dynamic = "force-dynamic"` route.
- Asset URLs are root-relative. Hosting under a sub-path needs `basePath` **and** `assetPrefix`.
- `public/.nojekyll` must exist for GitHub Pages to serve `/_next`.
- Demo stylesheets are global CSS imported **from the page files inside `app/`** (Next only
  allows global CSS imports from within `app/`); the demo components themselves import no CSS.
- `next dev` rewrites the managed block at the top of this file. Leave it in place.

---

## 12. Verification

```bash
npm run typecheck
npm run lint
npm audit        # must print "found 0 vulnerabilities"
npm run build
npm run seo:check
```

Then confirm the export:

- `out/index.html`, `out/services/index.html`, `out/work/index.html`, `out/about/index.html`,
  `out/contact/index.html`, `out/404.html`, `out/sitemap.xml`, `out/robots.txt`, `out/.nojekyll`.
- Every internal `href`/`src` resolves to a file in `out/`.
- Every fragment link (`/services/#automation`, `/work/#aama-pathshala`, …) matches an element id
  on the target page.
- The exported CSS contains the brand tokens and **no** conflict markers.

**Parity check.** To prove the port still matches the previous site, compare an exported page
against the same page at commit `4a82432`: strip tags and scripts, decode entities, and compare the
normalised visible text word-for-word; then compare the multiset of `class` names. Both should be
identical. The only legitimate structural difference is one extra inert `<div hidden>` that React
emits as a streaming placeholder.

**Manual smoke test** (`npm start`): mobile drawer opens/closes; header gains `.is-scrolled` on
scroll; reveals fire; character counter updates; form validation path shows the error; a bad URL
renders the on-brand 404.

---

## 13. Deployment

The deployable artifact is `out/`. Nothing else is needed at runtime.

**GitHub Pages** — `.github/workflows/static.yml` checks out the repo, installs with `npm ci`,
runs `npm run build`, and uploads `out/` as the Pages artifact. Node 22 is used with npm caching
keyed on `package-lock.json`. Do not point `upload-pages-artifact` at the repository root; that
would publish source files instead of the built site.

**Caddy / Nginx** — set the site root to `out/`. Because `trailingSlash: true` makes every route a
real `index.html`, no rewrite rules are needed.

---

## 14. Dependency policy

- Versions are pinned exactly for `next`, `react`, `react-dom`, and `eslint-config-next` (they must
  stay in lockstep with Next).
- `overrides: { "minimatch": "^11.0.4" }` exists purely to clear an advisory in the ESLint tree.
  Do not remove it without re-running `npm audit`.
- `eslint` is `^10.14.0` for the same reason.
- Adding any package means: install → `npm audit` → confirm **0 vulnerabilities** → `npm run build`.
  If it introduces an advisory, drop the package or find a non-vulnerable alternative; do not
  accept a dirty audit.

---

## 15. Content inventory (for reference)

| Route | Sections |
| --- | --- |
| `/` | hero + brand animation, hero meta, Yugs launch panel (`#yugs`), capabilities (5), live client work (3), demo index (5), manifesto + 4 principles, 4-stage process, studio, founders (`#founders`), CTA |
| `/services/` | page hero + in-page index, 5 service articles (what/who, problem, deliverables, after delivery, CTA) each with a genuine project visual or reference diagram, scopes & boundaries table, CTA |
| `/work/` | live client projects (`#live-projects`: Kohinoor Restaurant, Samajik Abhiyaan, Aama Pathshala), build notes & prototypes (Linux server baseline, AayushAI Core), interactive demos index (`#demos`), transparency section, CTA |
| `/work/<demo>/` ×5 | page hero + launcher, genuine demo screenshot preview, problem/solution, modules with interaction labels, how-it-works + disclaimer, other demos, contextual CTA |
| `/about/` | page hero + lockup, company purpose, 4 principles, founders, location & collaboration, CTA |
| `/contact/` | page hero + details, email guide + checklist, enquiry form panel, FAQ (5 items) |

Every page ends with the shared footer. Every page starts with the shared header and the
"Skip to main content" link targeting `#main` — keep `id="main"` on each page's `<main>`.
