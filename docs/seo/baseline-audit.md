# Baseline SEO audit

Date: 2026-11-13
Repository: `yugya-main`
Baseline commit: `0c7e2ba` ("Add interactive demo portfolio")
Working tree before work: only `.commandcode/` untracked; no user changes were modified.

This audit describes the site **before** the SEO changes, plus the strengths and risks that had to be preserved.

---

## 1. Stack and rendering

| Concern | Baseline |
| --- | --- |
| Framework | Next.js 16.4.5, App Router, Turbopack build |
| UI runtime | React 19.3.0 |
| Language | TypeScript 5 |
| Output | `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` |
| Rendering | Server components by default; static HTML export |
| Styling | Plain CSS in `app/globals.css` |
| Fonts | `next/font/google` (Newsreader, Figtree, JetBrains Mono), self-hosted |
| Runtime dependencies | `next`, `react`, `react-dom` only |
| Hosting | Live responses served by Vercel; `.github/workflows/static.yml` builds `out/` for GitHub Pages |
| Analytics | None |
| Backend | None; static export only |

The site is fully crawlable without JavaScript. The interactive demos mount only after a user opens the overlay, so they add nothing to the initial HTML of the demo intro pages.

---

## 2. Indexable routes at baseline

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `out/index.html` | Home |
| `/services/` | `out/services/index.html` | Five service scopes |
| `/work/` | `out/work/index.html` | Projects + demos index |
| `/work/savor/` | `out/work/savor/index.html` | Restaurant demo intro |
| `/work/campusflow/` | `out/work/campusflow/index.html` | School tool demo intro |
| `/work/stockwise/` | `out/work/stockwise/index.html` | Shop ledger demo intro |
| `/work/worknest/` | `out/work/worknest/index.html` | Contractor job book demo intro |
| `/work/serverscope/` | `out/work/serverscope/index.html` | Server console demo intro |
| `/about/` | `out/about/index.html` | Studio, principles, founders, location |
| `/contact/` | `out/contact/index.html` | Enquiry form, email guide, FAQ |
| `out/404.html` | — | On-brand 404, `noindex` |
| `out/sitemap.xml` | — | Sitemap |
| `out/robots.txt` | — | Robots |

There is no blog, article archive, RSS feed, tag page, author archive or CMS.

---

## 3. Existing SEO implementation

### Metadata

- Root `metadataBase` was `new URL(SITE_URL)` with `SITE_URL = "https://yugya.com"`.
- Root title: "Yugya — Technology built for the work that matters".
- Root description: "Yugya is an independent technology studio in Nepal building websites, software tools, Linux server configurations, and dependable digital systems."
- `lib/metadata.ts` produced per-page title, description, canonical, Open Graph and Twitter card.
- Every important page had a title, description, canonical and OG image.
- The 404 page had `robots: { index: false, follow: false }`.
- App Router icons (`app/icon.png`, `app/apple-icon.png`) emitted favicon and touch-icon links.
- `formatDetection` disabled telephone/address/email auto-detection.

### Sitemap and robots

- `app/sitemap.ts` listed all ten routes with `lastModified: new Date()`, `priority` and `changeFrequency`.
- `app/robots.ts` allowed all crawlers and pointed at `${SITE_URL}/sitemap.xml`; it also emitted a non-standard `Host` directive.
- Both routes declared `export const dynamic = "force-static"` as required by `output: "export"`.

### Structured data

- One `Organization` JSON-LD block in the root layout.
- Properties: `name`, `url`, `logo`, `email`, `description`, `foundingDate: "2024"`, `founder` (two people), `address` (locality "Kapilvastu / Rupandehi", country NP).
- No `WebSite`, `WebPage`, `Service`, `FAQPage` or breadcrumb markup.
- `foundingDate` was not visible anywhere on the site and could not be verified from the repository.

### Internal linking

- Header nav: Home, Services, Work, About, Contact.
- Footer: five service anchors, about/founders/purpose/principles, work, contact, email.
- Home links to all five service anchors, the work page, the featured project, all demos, founders, about and contact.
- Work page links to demos and contact.
- Demo intro pages link to the other demos, `/work/#demos`, the matching service anchor and a preselected contact form.
- Trailing slashes were consistent with `trailingSlash: true`.

### Images and fonts

- `<picture>` with WebP source + PNG/GIF fallback for brand artwork.
- Founder portraits had `srcset` at 640/960/1200 and `sizes`.
- Width/height were present on all images (good CLS).
- Founder portraits and the Yugs mark were lazy-loaded.
- The home featured-project screenshot (`/aama-pathshala.jpg`) lacked `loading="lazy"` and was being preloaded in the `<head>` even though it sits below the fold.
- The footer logo lacked lazy loading.
- `next/font` self-hosted fonts with `display: swap`.

### Security and trust

- No API routes, cookies, auth, database or forms that post to a server.
- The enquiry form builds a `mailto:` draft or copies text to the clipboard; nothing is transmitted.
- External links used `rel="noreferrer noopener"`.
- Google Translate loaded only after a visitor chooses a non-English language.
- No credentials or private data in public metadata.

---

## 4. Findings

### High severity

1. **Canonical host mismatch.** The live site's apex domain returned `308 Permanent Redirect` to `https://www.yugya.com/`, but every canonical, `og:url`, sitemap URL, robots `Sitemap` line, `author` link and structured-data URL named `https://yugya.com`. Search engines were being pointed at a redirecting URL. This was the single clearest technical defect.
2. **Home title had no service or market term.** "Yugya — Technology built for the work that matters" is a brand statement, not a description of what the page offers. This is a competitive disadvantage for "web development company in Nepal" intent.
3. **No page-level structured data.** Organization was present, but there was no `WebSite` node, no page type, no service entities and no FAQ entity. The site's services and FAQs were readable by humans but not explicitly described.
4. **Sitemap `lastmod` was a build timestamp.** Every deploy claimed every page had changed at build time, which is not a verifiable last significant change. Google may ignore or distrust it.
5. **No answer to the commercial cost question.** The contact FAQ covered billing milestones, hosting, support and `.com.np` domains, but not how a project is priced. The highest-intent query cluster in Nepal is cost-related.

### Medium severity

6. **Service, work, about and contact titles were functional but not intent-led.** "Services & Scopes — Yugya" and "Projects & Technical Implementations — Yugya" describe the page internally but do not reflect how people search.
7. **A below-the-fold image was preloaded on the home page.** `/aama-pathshala.jpg` was emitted as `<link rel="preload" as="image">` by the framework because it was not lazy-loaded. This competed with the hero and fonts. Lazy-loading it removes the preload.
8. **Footer logo loaded eagerly** below the fold.
9. **404 copy was stale.** It said "Everything on this site lives on five pages", which stopped being true when the five demos were added.
10. **No repeatable SEO check.** Metadata, canonical URLs and structured data were only checked by reading source files or manual inspection.
11. **Open Graph image lacked an explicit MIME type.**

### Low severity / intentional gaps

12. `foundingDate: "2024"` was not visible or verifiable. It was removed rather than asserted.
13. No `LocalBusiness` or `ProfessionalService` markup. The site publishes email and a district-level location, not a street address, phone number or opening hours. Marking up a local business without those details would be inaccurate.
14. No `BreadcrumbList`. The site has no visible breadcrumb navigation; adding URL-only breadcrumbs would not match visible content.
15. No `Person` author markup for articles. There are no articles.
16. No social `sameAs` links. The site does not publish official social profiles.
17. No `llms.txt`. Google says it does not use it; no other documented requirement justifies it.
18. No Google Business Profile, Search Console, Bing Webmaster Tools or analytics integration in the repository. These require external accounts and human verification.
19. No `.com.np` or other domain-specific landing page. The domain/DNS service is an anchor on `/services/`.
20. No mobile app development or AI agency page. The site does not currently claim those as standalone services; metadata was not changed to overclaim them.

---

## 5. Strengths to preserve

- Owner-approved visual design and copy; no redesign was needed.
- Server-rendered static HTML with real `<a href>` links.
- One H1 per page and a logical H2/H3 hierarchy.
- Descriptive alt text on all images.
- Explicit image dimensions (low CLS risk).
- Self-hosted fonts with `display: swap`.
- Accessible form labels, skip link, focus states, `aria-current`, mobile drawer behavior.
- Honest, original content: real project notes, documented processes, interactive demos with labelled sample data.
- No tracking scripts, no cookies, no runtime dependencies beyond Next/React.
- Clean security posture: no server, no secrets, no unsafe third-party loading on first visit.
- Correct `noindex` on the 404 page.
- `trailingSlash: true` matches the static export and internal links.

---

## 6. Baseline evidence

Live response before changes:

```
$ curl -sSI https://yugya.com/
HTTP/1.1 308 Permanent Redirect
Location: https://www.yugya.com/

$ curl -sSI https://www.yugya.com/
HTTP/1.1 200 OK
```

Live home HTML before changes:

```html
<link rel="canonical" href="https://yugya.com/"/>
<meta property="og:url" content="https://yugya.com/"/>
<meta property="og:image" content="https://yugya.com/assets/brand/yugya-og.png"/>
```

This is the mismatch that the implementation corrects.

---

## 7. Recommended priorities (baseline)

1. Fix the canonical host to `https://www.yugya.com` everywhere.
2. Rewrite titles/descriptions around real page intent without changing visible copy.
3. Add accurate `WebSite`, page, `Service` and `FAQPage` nodes; remove unsupported founding date.
4. Remove the false sitemap `lastmod`; keep absolute URLs.
5. Remove the below-the-fold preload and lazy-load off-screen images.
6. Add a repeatable `seo:check` command.
7. Add one honest pricing-basis FAQ; do not invent prices.
8. Document local SEO, content and external verification as human tasks rather than fabricating pages or profiles.
