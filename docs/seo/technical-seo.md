# Technical SEO implementation

Date: 2026-11-13
Production host: https://www.yugya.com/

This document describes what was implemented, why, and what was deliberately left out. It is the technical companion to `implementation-report.md`.

---

## 1. Canonical host

### Problem

- `https://yugya.com/` returns `308 Permanent Redirect` to `https://www.yugya.com/`.
- Before this work, `SITE_URL` was `https://yugya.com`, so every canonical, `og:url`, sitemap URL, robots `Sitemap` line, `author` link and JSON-LD URL named the redirecting apex host.

### Change

`lib/site.ts`:

```ts
export const SITE_URL = "https://www.yugya.com";
```

This one constant drives:

- `metadataBase` in `app/layout.tsx`;
- canonical URLs in `lib/metadata.ts`;
- Open Graph and Twitter URLs;
- sitemap URLs in `app/sitemap.ts`;
- robots `Sitemap` and `Host` in `app/robots.ts`;
- structured-data URLs in `lib/schema.ts`;
- sitemap URLs used by the verification script.

### Verification

- Every exported page's `<link rel="canonical">` starts with `https://www.yugya.com`.
- `og:url` matches the canonical on every page.
- `sitemap.xml` contains only `https://www.yugya.com/...` URLs.
- `robots.txt` points at `https://www.yugya.com/sitemap.xml`.
- `npm run seo:check` fails if any of the above regress.

---

## 2. Metadata

### Helper

`lib/metadata.ts` now emits:

- unique title and description;
- `alternates.canonical`;
- Open Graph title, description, URL, site name, type and a 1200×630 image with explicit `type: "image/png"` and alt text;
- Twitter `summary_large_image` card with title, description and image.

### Page titles and descriptions

| Route | Title | Primary intent |
| --- | --- | --- |
| `/` | Yugya — Web Development Company in Nepal | web development company in Nepal |
| `/services/` | Web Development & Software Services in Nepal — Yugya | web development and software services Nepal |
| `/work/` | Web Development Portfolio & Projects — Yugya | web development portfolio Nepal |
| `/about/` | About Yugya — Web Development Studio in Nepal | about / studio entity |
| `/contact/` | Contact Yugya — Website Development Enquiry | contact / enquiry |
| `/work/savor/` | Savor — Interactive Restaurant Website Demo — Yugya | restaurant website demo |
| `/work/campusflow/` | CampusFlow — Interactive School Management Demo — Yugya | school management demo |
| `/work/stockwise/` | Stockwise — Interactive Shop Stock Ledger Demo — Yugya | stock ledger demo |
| `/work/worknest/` | Worknest — Interactive Contractor Job Book Demo — Yugya | contractor job book demo |
| `/work/serverscope/` | ServerScope — Interactive Operations Console Demo — Yugya | server operations demo |

Descriptions were rewritten to summarize the page accurately, not to repeat keywords. The demo page metadata already existed and remains accurate.

### What did not change

- Visible H1s and body copy were not rewritten.
- The design system, fonts, colors, spacing and components were not changed.
- No keyword meta tag was added.

---

## 3. Structured data

Implemented with `lib/schema.ts` and `components/JsonLd.tsx`. Each page emits one JSON-LD block. The root layout emits the global `Organization` + `WebSite` graph; each page emits its own page-level graph that references the global `@id`s.

### Organization (`https://www.yugya.com/#organization`)

Properties:

- `name: "Yugya"`, `alternateName: "Yugya Technologies"` (both appear on the site; "Yugya Technologies" appears in the Yugs product byline);
- `url`, `logo` (ImageObject with dimensions), `email`;
- `description`;
- `founder` (two real people with names, roles, emails and portfolio URLs, all visible on `/about/`);
- `address` (locality "Kapilvastu / Rupandehi", region "Lumbini Province", country "NP");
- `areaServed: Nepal`;
- `knowsAbout` (the actual service scopes);
- `contactPoint` (sales, email, Nepal area, English).

Removed from the previous markup:

- `foundingDate: "2024"` — not visible on the site and not verifiable from the repository. Google's structured-data guidance says not to mark up information that is not visible or supported.

Not added:

- `sameAs` — no official social profiles are published.
- `aggregateRating` / `review` — no verified reviews.
- `LocalBusiness` — no street address, phone number or opening hours.
- `award`, `numberOfEmployees` — not verified.

### WebSite (`https://www.yugya.com/#website`)

- `name`, `alternateName`, `url`, `description`, `inLanguage: "en"`, `publisher` → Organization.
- No `potentialAction: SearchAction` because the site has no site search. Marking up a nonexistent search action would be inaccurate.

### Page nodes

| Route | `@type` | Notes |
| --- | --- | --- |
| `/` | `WebPage` | References WebSite and Organization |
| `/services/` | `CollectionPage` + 5 `Service` nodes | Services mirror the five visible articles and their anchors |
| `/work/` | `CollectionPage` | Portfolio collection |
| `/about/` | `AboutPage` | Entity/trust page |
| `/contact/` | `FAQPage` | Five visible questions and answers |
| `/work/<demo>/` | `WebPage` | Per-demo page with its own name/description |

### Service nodes

Each `Service` has:

- `name` and `serviceType` matching the visible service;
- a short `description` drawn from visible copy;
- `provider` → Organization;
- `areaServed: Nepal`;
- `url` → the section anchor.

### FAQPage

The five questions are visible on `/contact/`. Answers are plain text derived from the visible paragraphs. Google limits FAQ rich results to a small set of authoritative sites, so this is for answer/entity clarity, not a promise of a rich result.

### Validation status

- JSON syntax and `@type` presence are checked by `npm run seo:check`.
- Cross-node `@id` references are valid JSON-LD.
- Google Rich Results Test and Schema Markup Validator require a deployed URL or manual upload; they are listed in `post-implementation-checklist.md` as external validation.

### Breadcrumbs

No `BreadcrumbList` was added. The site has no visible breadcrumb navigation, and the mission requires structured data to match visible content. URL-only breadcrumbs would be an unsupported enhancement. If visible breadcrumbs are added later, the markup can follow.

---

## 4. Sitemap

`app/sitemap.ts`:

- lists all ten indexable routes;
- uses absolute `https://www.yugya.com/...` URLs;
- keeps `changeFrequency` and `priority` (harmless; Google ignores them);
- **removed `lastModified`** because a build timestamp is not a verified last significant change. Google only uses `<lastmod>` when it is consistently accurate.

No `<lastmod>` is better than an inaccurate one. If the site later gets a real content-updated date per page, it can be reintroduced from that source.

---

## 5. Robots

`app/robots.ts` produces:

```
User-Agent: *
Allow: /

Host: www.yugya.com
Sitemap: https://www.yugya.com/sitemap.xml
```

- All crawlers, including search and AI crawlers, are allowed by default.
- No CSS, JS, image or font path is blocked.
- `Host` is non-standard for Google but is understood by some other engines; it now names the canonical host.
- The 404 page uses `noindex, nofollow` via Next metadata.
- No `Disallow` rules were added. A robots.txt disallow is not a reliable way to keep a page out of the index; `noindex` is used for the error page.

### AI crawler policy

- The site is public marketing content. Allowing `*` is intentional.
- No separate allow/deny rules were added for GPTBot, ClaudeBot, PerplexityBot, Google-Extended or others. There is no documented business reason to block them, and blocking could reduce discovery.
- `llms.txt` was not added. Google says it does not use LLMS.txt and no special file is required. If another AI system documents a use for it later, it can be evaluated then.

---

## 6. Crawlability and indexing

- The site is a static export. Every route is a real `index.html`.
- Content is server-rendered into the initial HTML; client components add behavior, not primary text.
- Internal links are real `<a href>` elements via `next/link`.
- `trailingSlash: true` matches the exported directories and internal links.
- No client-side fragment routing is used for pages.
- No duplicate route variants are generated beyond Next's normal `404.html` / `404/` / `_not-found/` error exports, which are `noindex`.
- The apex-to-www redirect is handled at the host; canonicals now point to the final `www` URL, so the chain is canonical → final, not canonical → redirect.
- Observed live chain (2026-11-14): `http://yugya.com/` → 308 `https://yugya.com/` → 308 `https://www.yugya.com/` → 200. `http://www.yugya.com/` reaches the final URL in one hop. The two-hop HTTP-apex chain is host-level (Vercel domain configuration). Because canonicals, sitemap and internal links now name `https://www.yugya.com` directly, indexed pages do not depend on that chain. A one-hop host redirect would be cleaner but requires host configuration, not a repository change.

### Status codes observed locally

| Path | Status |
| --- | --- |
| `/` | 200 |
| `/services/` | 200 |
| `/work/savor/` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/does-not-exist/` | 404 with the on-brand error page |

These are local static-server results. Production status codes must be re-checked after deployment.

---

## 7. Internal linking

No new navigation was added. Existing links were audited:

- Header and footer links use trailing slashes.
- Service links use `/services/#...` anchors that exist.
- Demo links use `/work/<demo>/` and `/work/#demos`.
- Contact CTAs use `/contact/?service=web|vps|...`, and `EnquiryForm` matches the option values by substring.
- External links use `rel="noreferrer noopener"` with `target="_blank"`.

`npm run seo:check` resolves every internal `href`/`src` in the export and fails if a target file is missing. It checks anchors only structurally (the file exists), not whether the fragment id exists. Fragment ids are maintained manually and documented in `AGENTS.md`.

---

## 8. Images

Implemented:

- `loading="lazy"` + `decoding="async"` on below-the-fold project screenshots, including the live-client desktop/mobile captures and the demo previews;
- `loading="lazy"` + `decoding="async"` on the home studio logo and footer logo;
- existing lazy loading on founder portraits and the Yugs mark was preserved;
- all images keep explicit `width`/`height` (CLS protection);
- founder portraits keep `srcset`/`sizes`;
- `<picture>` WebP sources remain.

Effect: the home page does not preload below-the-fold project screenshots. The only preloads left are the four self-hosted font files and a low-priority script preload.

Not changed:

- No image was recompressed or cropped.
- No brand asset was recolored or regenerated.
- `next/image` was not introduced; the site's `<picture>` fallbacks require plain `<img>`.

---

## 9. Fonts

- `next/font/google` self-hosts Newsreader, Figtree and JetBrains Mono.
- `display: "swap"` is preserved.
- Four WOFF2 files are preloaded (Newsreader normal/italic, Figtree, JetBrains Mono).
- No third-party font request is made on first visit.

---

## 10. Performance

Baseline issue: the home page preloaded a below-the-fold project screenshot. This was caused by the image being eager-loaded, not by a deliberate SEO change.

Implemented:

- lazy-load the screenshot and below-the-fold logos;
- no new runtime dependencies;
- no new client JavaScript;
- structured data adds roughly 2–3 KB of HTML per page, which is negligible;
- JSON-LD is static and server-rendered.

Performance targets remain:

- LCP ≤ 2.5 s;
- INP ≤ 200 ms;
- CLS ≤ 0.1.

No field data was available in this environment. PageSpeed Insights and Search Console Core Web Vitals must be checked after deployment. Do not claim a Core Web Vitals pass without field data.

---

## 11. Security and trust

- No secrets, credentials or private data were added.
- Structured data uses only public emails already shown on the site.
- The enquiry form still does not transmit data to a server.
- No analytics or tracking script was added.
- External links retain safe `rel` values.
- Google Translate still loads only after a visitor selects a non-English language.
- No staging or private routes are exposed.
- No security headers were changed. Host-level headers (HSTS, etc.) remain the host's responsibility. The Caddy example on `/work/` already documents recommended headers.

---

## 12. Verification tooling

Added `scripts/seo-check.mjs` and `npm run seo:check`.

It checks:

- every indexable HTML page has a title, description, canonical and exactly one H1;
- canonical matches the expected `https://www.yugya.com` URL for the route;
- `og:url` matches the canonical;
- `og:image` is absolute on the canonical host;
- JSON-LD parses and has `@context` and `@type`;
- internal `href`/`src` targets exist in `out/`;
- `sitemap.xml` exists, uses the canonical host and lists only existing pages;
- `robots.txt` exists, allows `/`, and points at the canonical sitemap;
- titles and descriptions are unique across pages;
- pages are listed in the sitemap.

Error pages (`/404/`, `/_not-found/`) are intentionally skipped: they are `noindex` and share copy.

---

## 13. Deliberately not done

| Item | Reason |
| --- | --- |
| Redesign or layout changes | The design is owner-approved and final. |
| Visible copy rewrite | The site's copy is part of the brand and was not changed beyond one new FAQ item and one stale 404 sentence. |
| `meta keywords` | Ignored by Google. |
| Keyword-density tuning | Not a ranking factor; stuffing is a spam violation. |
| City landing pages | Doorway-abuse risk without real local evidence. |
| Fake reviews, ratings, client logos or metrics | Explicitly forbidden by the site's principles and Google's policies. |
| `LocalBusiness` schema | No verified street address/phone/hours. |
| `BreadcrumbList` | No visible breadcrumbs. |
| SearchAction | No site search exists. |
| `llms.txt` | Google ignores it; no documented requirement. |
| AI-only markup | No such requirement; foundational SEO is the requirement. |
| Analytics / tracking | Deliberate privacy choice; not requested. |
| New dependencies | The site's clean audit and small runtime footprint are intentional. |
| New blog articles | The site has no blog; publishing thin articles would be worse than none. The content strategy is documented instead. |
| Mobile app / AI agency claims | Not supported by current pages or proof. |

---

## 14. Remaining technical risks

1. The production host may still serve the old build until deployment. All canonical and schema fixes apply only after deploy.
2. The apex-to-www redirect must remain in place; if the host changes, the canonical host decision must be revisited.
3. Google Rich Results Test and Search Console validation require external access.
4. Field Core Web Vitals cannot be measured locally.
5. The preview server (`scripts/serve.mjs`) is for local inspection only; production headers and caching are host-specific.
6. No automated visual regression or accessibility test exists. The design changes were limited to metadata/schema/image attributes plus one FAQ item using existing styles, but a human visual check is still recommended.
