<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-module-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — yugya-next

Project guide for AI agents and new contributors. Read this before changing anything.

---

## 1. What this project is

`yugya-next/` is the Yugya website (`https://yugya.com`) rebuilt on Next.js. It is **a port, not a
redesign**.

The authoritative reference for every page is the legacy hand-written site at the repository root
(`index.html`, `services.html`, `work.html`, `about.html`, `contact.html`, `style.css`,
`script.js`). Those files stay in place and still work. They are the specification.

**The contract:** same words, same markup structure, same visual design, same interactions — running
on Next.js with a clean dependency audit.

If you are unsure whether a change is allowed, ask: *does the legacy page do this?* If not, don't.

---

## 2. Hard rules

| Rule | Why |
| --- | --- |
| Do not redesign, restyle, or "improve" the design | The design is owner-approved and final |
| Do not rewrite copy | Text parity with the legacy pages is verified word-for-word |
| Never invent metrics, client logos, testimonials, uptime figures, or performance claims | The site's positioning is explicitly "truth in technical descriptions" |
| Keep `app/globals.css` selector-for-selector identical to the legacy `style.css` | It *is* that file; only the three font-stack lines differ |
| Do not add runtime dependencies without a stated reason | `npm audit` must stay at **0 vulnerabilities** |
| Do not add a backend | The site is a static export; there is no server, database, or API |
| Prefer server components | Only three components are client-side, each for a concrete reason |

---

## 3. Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js **16.4.5** — App Router, Turbopack build |
| UI runtime | React **19.3.0** |
| Language | TypeScript 5 (`strict: true`) |
| Styling | Plain CSS — the legacy `style.css`, as `app/globals.css` |
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
npm start          # serve the built ./out on http://127.0.0.1:3000
```

- `npm start` runs `scripts/serve.mjs`, a zero-dependency static server. Set `PORT` / `HOST` to
  change the bind address. Do not replace it with the `serve` package — that package pulls in
  vulnerable `compression` versions and breaks the clean audit.
- **`next start` does not work** with `output: "export"`. It will error. Use `npm start`.
- Always run `typecheck`, `lint`, and `audit` before declaring work done, then `build`.

---

## 5. Project layout

```
yugya-next/
├─ app/
│  ├─ layout.tsx            Root layout: fonts, root metadata, viewport, JSON-LD,
│  │                        SiteHeader / SiteFooter / RevealOnScroll, pre-paint `js` script
│  ├─ page.tsx              /            home
│  ├─ services/page.tsx     /services/   service scopes + boundaries table
│  ├─ work/page.tsx         /work/       three project entries
│  ├─ about/page.tsx        /about/      purpose, principles, location
│  ├─ contact/page.tsx      /contact/    enquiry form + FAQ
│  ├─ not-found.tsx         404.html     on-brand 404
│  ├─ globals.css           The design system (legacy style.css)
│  ├─ sitemap.ts            /sitemap.xml
│  ├─ robots.ts             /robots.txt
│  ├─ icon.png              favicon (byte-identical to assets/brand/favicon.png)
│  └─ apple-icon.png        iOS touch icon (assets/brand/apple-touch-icon.png)
├─ components/
│  ├─ SiteHeader.tsx        "use client" — sticky header, mobile drawer, active link
│  ├─ SiteFooter.tsx        server — footer + inline year-refresh script
│  ├─ RevealOnScroll.tsx    "use client" — IntersectionObserver reveal
│  └─ EnquiryForm.tsx       "use client" — mailto/clipboard form
├─ lib/
│  ├─ site.ts               SITE_URL, email, location, nav items, service links
│  └─ metadata.ts           pageMetadata() helper
├─ public/
│  ├─ .nojekyll             keeps GitHub Pages from ignoring /_next
│  ├─ aama-pathshala.jpg    featured project screenshot
│  └─ assets/brand/         logo lockups, mark, animation, OG image, palette
├─ scripts/serve.mjs        static preview server for `npm start`
├─ next.config.ts           static export config
├─ eslint.config.mjs        flat config
└─ AGENTS.md                this file
```

---

## 6. Routing and URLs

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`,
`poweredByHeader: false`.

Legacy → Next mapping:

| Legacy file | Route | Exported file |
| --- | --- | --- |
| `index.html` | `/` | `out/index.html` |
| `services.html` | `/services/` | `out/services/index.html` |
| `work.html` | `/work/` | `out/work/index.html` |
| `about.html` | `/about/` | `out/about/index.html` |
| `contact.html` | `/contact/` | `out/contact/index.html` |

**Link rules**

- Internal navigation: always `next/link` with a trailing slash (`/services/`).
- Cross-page fragments: `Link href="/services/#web-development"`.
- Same-page fragments and `mailto:`: plain `<a>` (a `Link` would trigger a router navigation).
- Do not hardcode `https://yugya.com` in pages — use `SITE_URL` from `lib/site.ts`.

**Anchor ids that must not be renamed** (linked from nav, footer, home page, and service CTAs):

| Page | Ids |
| --- | --- |
| `/services/` | `web-development`, `server-infrastructure`, `domain-dns`, `automation`, `maintenance` |
| `/work/` | `aama-pathshala`, `server-infrastructure`, `aayushai-core` |
| `/about/` | `approach`, `principles` |

**Query parameters:** `/contact/?service=` accepts `web`, `vps`, `dns`, `automation`,
`maintenance`. `EnquiryForm` matches them by substring against the option values.

---

## 7. Rendering model

Server components by default. Three client components, each justified:

| Component | Client because |
| --- | --- |
| `SiteHeader` | `usePathname`, open/closed drawer state, scroll listener, `body.nav-open` |
| `RevealOnScroll` | `IntersectionObserver` + `usePathname` (re-observe after navigation) |
| `EnquiryForm` | Form input handling, clipboard, `window.location` |

`SiteFooter` is a server component on purpose: the copyright year is rendered at build time and
refreshed by an inline script, so there is no second render pass and no hydration mismatch.

---

## 8. Design system

`app/globals.css` is the legacy stylesheet verbatim. The **only** permitted deviation is the three
font-stack declarations, which now reference `next/font` variables:

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
- `threshold: 0.12`, `rootMargin: "0px 0px -40px 0px"` — identical to the legacy script.
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

---

## 10. Metadata, SEO, icons

- `lib/site.ts` → `SITE_URL`, `SITE_EMAIL`, `SITE_LOCATION`, `NAV_ITEMS`, `SERVICE_LINKS`. Single
  source of truth.
- `lib/metadata.ts` → `pageMetadata({ title, description, path, ogTitle?, ogDescription? })`
  produces canonical URL, Open Graph, and Twitter card. `path` must start **and** end with `/`.
- Root `metadata` + `viewport` (`themeColor: #F7F4EF`) live in `app/layout.tsx`, together with
  Organization JSON-LD.
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
- `output: "export"` forbids: API routes, `headers()`, `cookies()`, `redirects`, `rewrites`,
  `next/image` optimisation, and any `dynamic = "force-dynamic"` route.
- Asset URLs are root-relative. Hosting under a sub-path needs `basePath` **and** `assetPrefix`.
- `public/.nojekyll` must exist for GitHub Pages to serve `/_next`.
- `next dev` rewrites the managed block at the top of this file. Leave it in place.

---

## 12. Verification

```bash
npm run typecheck
npm run lint
npm audit        # must print "found 0 vulnerabilities"
npm run build
```

Then confirm the export:

- `out/index.html`, `out/services/index.html`, `out/work/index.html`, `out/about/index.html`,
  `out/contact/index.html`, `out/404.html`, `out/sitemap.xml`, `out/robots.txt`, `out/.nojekyll`.
- Every internal `href`/`src` resolves to a file in `out/`.
- Every fragment link (`/services/#automation`, `/work/#aama-pathshala`, …) matches an element id
  on the target page.

**Parity check.** To prove the port still matches the legacy site, compare the exported page
against the original HTML: strip tags and scripts, decode entities, and compare the normalised
visible text word-for-word; then compare the multiset of `class` names. Both should be identical.
The only legitimate structural difference is one extra inert `<div hidden>` that React emits as a
streaming placeholder.

**Manual smoke test** (`npm start`): mobile drawer opens/closes; header gains `.is-scrolled` on
scroll; reveals fire; character counter updates; form validation path shows the error; a bad URL
renders the on-brand 404.

---

## 13. Deployment

The deployable artifact is `out/`. Nothing else is needed at runtime.

**GitHub Pages** — the repo workflow `.github/workflows/static.yml` currently uploads the repository
root, which deploys the *legacy* site. To ship this rewrite it must build first and upload
`yugya-next/out`:

```yaml
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm, cache-dependency-path: yugya-next/package-lock.json }
      - run: npm ci && npm run build
        working-directory: yugya-next
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: yugya-next/out }
      - uses: actions/deploy-pages@v4
        id: deployment
```

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
| `/` | hero + brand animation, hero meta, capabilities (5), featured project, manifesto + 4 principles, 4-stage process, studio, CTA |
| `/services/` | page hero + in-page index, 5 service articles (what/who, problem, deliverables, after delivery, CTA), scopes & boundaries table, CTA |
| `/work/` | 3 entries (Aama Pathshala, Linux server baseline, AayushAI Core) each with terminal/ledger, transparency section, CTA |
| `/about/` | page hero + lockup, company purpose, 4 principles, location & collaboration, CTA |
| `/contact/` | page hero + details, email guide + checklist, enquiry form panel, FAQ (4 items) |

Every page ends with the shared footer. Every page starts with the shared header and the
"Skip to main content" link targeting `#main` — keep `id="main"` on each page's `<main>`.
