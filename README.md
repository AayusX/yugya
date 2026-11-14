# Yugya — Next.js rewrite

 The Yugya website rebuilt on the latest Next.js (App Router, TypeScript, Turbopack) with the
original design, content, and styling preserved. The app is a **fully static export**, so it
deploys to the same places the hand-written HTML site did (GitHub Pages, Caddy, Nginx, any
static host).

## Stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16.4.5 (App Router, Turbopack build)                   |
| UI runtime | React 19.3.0                                                   |
| Language   | TypeScript                                                     |
| Styling    | The original `style.css`, unchanged, as `app/globals.css`      |
| Fonts      | `next/font/google` — Newsreader, Figtree, JetBrains Mono       |
| Output     | `output: "export"` → static `out/` directory                   |
| Lint       | ESLint 10 with `eslint-config-next`                            |

No CSS framework, no component library, no client state library. Runtime dependencies are
`next`, `react`, and `react-dom` only.

## Requirements

- Node.js 20.9+ (Node.js 22 LTS recommended)
- npm 10+

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # static export into ./out
npm run seo:check  # validate canonicals, metadata, JSON-LD, sitemap, robots, links
npm start          # preview the built ./out folder (PORT=3000)
```

`npm start` runs `scripts/serve.mjs`, a zero-dependency static file server, so previewing a
build needs no extra packages. Set `PORT` or `HOST` to change the bind address.

## Project layout

```
.
├─ app/
│  ├─ layout.tsx            root layout: fonts, metadata, header/footer, JSON-LD
│  ├─ page.tsx              /            (home)
│  ├─ services/page.tsx     /services/
│  ├─ work/page.tsx         /work/
│  ├─ about/page.tsx        /about/
│  ├─ contact/page.tsx      /contact/
│  ├─ globals.css           the original style.css
│  ├─ sitemap.ts            /sitemap.xml
│  ├─ robots.ts             /robots.txt
│  ├─ icon.png              favicon source
│  └─ apple-icon.png        iOS touch icon source
├─ components/
│  ├─ SiteHeader.tsx        sticky header, mobile drawer, active link
│  ├─ SiteFooter.tsx        footer, build-time year refreshed by an inline script
│  ├─ RevealOnScroll.tsx    IntersectionObserver reveal animation
│  ├─ EnquiryForm.tsx       contact form (mailto + clipboard, no server)
│  ├─ JsonLd.tsx            safe JSON-LD emitter
│  ├─ LiveProjects.tsx      live client entries and compact home rows
│  └─ ServiceVisual.tsx     inline reference diagrams for the service scopes
├─ lib/
│  ├─ site.ts               site URL, email, nav, service links
│  ├─ metadata.ts           per-page metadata helper
│  ├─ schema.ts             Organization, WebSite, page, Service and FAQ schema
│  └─ projects.ts           verified live client data and screenshot paths
├─ public/                  brand art, live-client/demo screenshots, founder portraits
├─ docs/
│  ├─ visual-credibility.md page-by-page imagery audit, research and asset rules
│  ├─ live-projects.md      live URL verification, screenshot provenance and attribution
│  └─ seo/                  research, audit, keyword map, technical/GEO/content docs
├─ scripts/serve.mjs        static preview server for `npm start`
├─ scripts/seo-check.mjs    zero-dependency export SEO checks
└─ next.config.ts           static export configuration
```

## How the original behaviour was preserved

- **URLs.** The old `about.html` links are now `/about/`; `trailingSlash: true` and
  `output: "export"` write `about/index.html`, so both `/about` and `/about/` resolve on any
  static host. Anchor links such as `/services/#web-development` still land on the right section.
- **Styling.** `app/globals.css` is the original stylesheet. The only edits replace the
  Google Fonts `<link>` stack with the CSS variables exposed by `next/font`
  (`--font-newsreader`, `--font-figtree`, `--font-jetbrains-mono`). Every selector, token, and
  breakpoint is otherwise untouched.
- **Progressive enhancement.** The `.js .reveal` rules only hide content when JavaScript is
  available. A synchronous inline script in `<head>` adds the `js` class before first paint, and
  `<html>` carries `suppressHydrationWarning` because that class is added outside React.
- **No hydration mismatch on the year.** The footer year is rendered at build time and refreshed
  by an inline script, so there is no second render pass.
- **Contact form.** It never posts anywhere. `EnquiryForm` reads an uncontrolled form with
  `FormData`, builds a `mailto:` draft, and offers a clipboard copy. The `?service=` query
  parameter is applied directly to the DOM, so no state or extra render is needed.
- **Images.** `<picture>` elements with WebP/PNG fallbacks are kept as-is, which is why
  `@next/next/no-img-element` is disabled in `eslint.config.mjs`.

## Static export notes

- The build writes a complete site to `out/`. That folder is the deployable artifact.
- `next start` does not work with `output: "export"`; use `npm start` (or any static server).
- `sitemap.ts` and `robots.ts` declare `export const dynamic = "force-static"` so they are
  prerendered during the export.
- Asset URLs are root-relative (`/assets/...`, `/_next/...`). Deploying under a sub-path such as
  `https://user.github.io/repo/` requires setting `basePath` and `assetPrefix` in
  `next.config.ts`; deploying at a domain root (the current setup) needs no change.

## Deployment

### Any static host

```bash
npm ci
npm run build
# upload the contents of out/
```

### GitHub Pages

Build with the same commands, then publish `out/` with `actions/upload-pages-artifact` and
`actions/deploy-pages`. Keep `out/.nojekyll` in place (shipped from `public/.nojekyll`) so the
`_next` folder is served.

### Caddy / Nginx

Point the site root at `out/` and let the server resolve directory indexes. `trailingSlash: true`
means every route is a real `index.html`, so no rewrite rules are required.

## Metadata and SEO

- `SITE_URL` in `lib/site.ts` is `https://www.yugya.com` — the live host. The apex domain
  permanently redirects to it, so canonicals and sitemaps must name `www`.
- Canonical URLs, Open Graph, and Twitter cards come from `lib/metadata.ts`.
- `lib/schema.ts` builds the Organization, WebSite, page, Service and FAQPage JSON-LD;
  `components/JsonLd.tsx` emits it safely. The root layout emits the global Organization +
  WebSite graph; each page adds its own page node.
- `app/sitemap.ts` lists all ten indexable routes; `app/robots.ts` allows all crawlers and
  points at the sitemap.
- `app/icon.png` and `app/apple-icon.png` are picked up automatically by the App Router.
- Run `npm run seo:check` after `npm run build` to validate canonicals, metadata, JSON-LD,
  sitemap, robots and internal links. Full SEO documentation is in `docs/seo/`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm audit          # expected: found 0 vulnerabilities
npm run build
npm run seo:check  # runs against ./out
```

`package.json` pins a `minimatch` override (`^11.0.4`) and ESLint `^10.14.0` so the dependency
tree audits clean. Re-run `npm audit` after any dependency change.
