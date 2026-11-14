# SEO / GEO implementation report

Date: 2026-11-13
Site: https://www.yugya.com/
Baseline commit: `0c7e2ba`
Working tree: `.commandcode/` was untracked at the start; no user changes were overwritten.

---

## 1. What was wrong

### Critical

1. **Canonical host mismatch.** The apex `https://yugya.com/` permanently redirects (308) to `https://www.yugya.com/`, but every canonical, `og:url`, sitemap URL, robots sitemap line and JSON-LD URL used the apex. The site was telling search engines to index a redirecting URL.
2. **The home title did not describe the business.** "Yugya — Technology built for the work that matters" is a brand line, not a competitive title for "web development company in Nepal".
3. **No page-level structured data.** Only a partial `Organization` node existed. There was no `WebSite`, page type, `Service` or `FAQPage`.
4. **The sitemap used a build timestamp as `lastmod`.** Every deploy claimed every page had changed, which is not a verifiable last significant update.
5. **The highest-intent commercial question was unanswered.** The contact FAQ covered billing, hosting, support and `.com.np` domains, but not how a project is priced.

### Secondary

6. Service/work/about/contact titles were functional but not intent-led.
7. A below-the-fold image (`/aama-pathshala.jpg`) was preloaded on the home page, competing with fonts and the hero.
8. The footer logo loaded eagerly below the fold.
9. The 404 page said the site lives on five pages, which became false when the demos were added.
10. `Organization.foundingDate: "2024"` was not visible or verifiable.
11. There was no repeatable SEO verification command.
12. The Open Graph image lacked an explicit MIME type.

---

## 2. What was already working

- Static export with fully server-rendered HTML; no content depends on client JavaScript.
- One H1 per page and a logical H2/H3 hierarchy.
- Real `<a href>` internal links, `next/link`, trailing-slash consistency.
- Unique titles and descriptions on every page (even if some were not intent-led).
- Canonical tags and Open Graph/Twitter metadata already existed.
- A sitemap and robots.txt already existed and were prerendered correctly.
- `next/font` self-hosted fonts with `display: swap`.
- Explicit image dimensions on all images; WebP sources with fallbacks; founder `srcset`.
- Accessible form labels, skip link, focus states, `aria-current`, mobile drawer behavior.
- Honest, original content: real project notes, documented process, interactive demos with labelled sample data.
- No tracking scripts, no cookies, no backend, no runtime dependencies beyond Next/React.
- Clean security posture: no secrets, no unsafe third-party scripts on first visit, safe external-link `rel` values.
- `noindex` on the 404 page.
- Owner-approved design and copy that should not be changed.

---

## 3. Research that informed the decisions

Full notes: `docs/seo/research-notes.md`.

Primary sources:

- Google SEO Starter Guide
- Google Search Essentials
- Creating helpful, reliable, people-first content
- AI features and your website
- Optimizing for generative AI features on Google Search
- JavaScript SEO basics
- Build and submit a sitemap
- Introduction to robots.txt
- Core Web Vitals
- Spam policies
- Influencing title links
- Introduction to structured data
- Schema.org vocabulary
- web.dev Core Web Vitals

Key decisions that came directly from the research:

- Fix the canonical host rather than adding more pages.
- Rewrite titles around real intent, not keyword density.
- Use JSON-LD for visible, supported information only; remove the unsupported founding date.
- Do not add `llms.txt`, AI-only markup, city pages, fake reviews or a LocalBusiness node without a real address.
- Remove the false sitemap `lastmod`; keep absolute URLs.
- Use `noindex` for error pages, not robots.txt disallow.
- Treat FAQ rich results as unlikely; use FAQPage for clarity, not as a promise.
- Keep the design and visible copy intact; SEO changes belong in metadata, schema, image loading and document structure.

---

## 4. Files changed

### New

| File | Purpose |
| --- | --- |
| `lib/schema.ts` | Organization, WebSite, page, Service and FAQPage schema nodes |
| `components/JsonLd.tsx` | Safe JSON-LD emitter |
| `scripts/seo-check.mjs` | Zero-dependency export validation |
| `docs/seo/research-notes.md` | Source notes and implementation implications |
| `docs/seo/baseline-audit.md` | Pre-change audit |
| `docs/seo/keyword-research.md` | Nepal intent/SERP research (no invented volumes) |
| `docs/seo/keyword-to-url-map.md` | Page-to-intent mapping and cannibalization rules |
| `docs/seo/technical-seo.md` | Technical implementation detail |
| `docs/seo/geo-aeo-strategy.md` | Entity, AI discovery and answer-engine strategy |
| `docs/seo/content-strategy.md` | Editorial audit, principles and article briefs |
| `docs/seo/implementation-report.md` | This report |
| `docs/seo/post-implementation-checklist.md` | Deployment and external verification checklist |

### Modified

| File | Change |
| --- | --- |
| `lib/site.ts` | `SITE_URL` → `https://www.yugya.com` with rationale |
| `lib/metadata.ts` | Added `og:image:type` and `twitter:image:alt`; canonical/OG behavior retained |
| `app/layout.tsx` | Root title/description updated; global Organization + WebSite JSON-LD via `JsonLd` |
| `app/page.tsx` | Intent-led home title/description; WebPage JSON-LD; lazy below-fold images |
| `app/services/page.tsx` | Intent-led title/description; CollectionPage + five Service nodes |
| `app/work/page.tsx` | Intent-led title/description; CollectionPage JSON-LD; lazy project image |
| `app/about/page.tsx` | Intent-led title/description; AboutPage JSON-LD |
| `app/contact/page.tsx` | Intent-led title/description; FAQPage JSON-LD; new pricing-basis FAQ |
| `app/not-found.tsx` | Corrected stale "five pages" sentence |
| `app/robots.ts` | `Host` directive now a hostname (`www.yugya.com`), not a URL |
| `app/sitemap.ts` | Removed false build-time `lastModified` |
| `components/DemoProjectIntro.tsx` | Per-demo WebPage JSON-LD |
| `components/SiteFooter.tsx` | Lazy footer logo |
| `package.json` | Added `seo:check` script (no new dependency) |
| `README.md` | Updated SEO/command documentation |
| `AGENTS.md` | Updated canonical host, project layout and verification commands |

---

## 5. Major SEO improvements

1. **Canonical alignment.** Every canonical, sitemap URL, robots sitemap line, OG URL and JSON-LD URL now uses the final `www` host.
2. **Intent-led metadata.** Home, services, work, about and contact titles/descriptions now describe the page's actual search intent while keeping the visible copy unchanged.
3. **Accurate entity graph.** Organization + WebSite + page nodes + Service nodes + FAQPage, with consistent `@id` references.
4. **Unsupported data removed.** `foundingDate` removed; no reviews, ratings, awards, social profiles or local-business details invented.
5. **Sitemap accuracy.** Absolute URLs retained; false `lastmod` removed.
6. **Crawl hygiene.** 404 remains `noindex`; robots allows all; no important resources blocked.
7. **Image loading.** The misplaced home-page image preload is gone; below-fold images are lazy.
8. **Answer coverage.** Added an honest "How is a project priced?" FAQ without publishing invented prices.
9. **Repeatable validation.** `npm run seo:check` checks metadata, canonical host, JSON-LD syntax, internal links, sitemap and robots.
10. **Documentation.** Research, baseline, keyword map, technical detail, GEO/AEO, content strategy, report and checklist are all in `docs/seo/`.

---

## 6. Structured data inventory

Emitted from the root layout on every page:

- `Organization` (`#organization`): name, alternate name, URL, logo, email, description, real founders, address, `areaServed: Nepal`, `knowsAbout`, contact point.
- `WebSite` (`#website`): name, alternate name, URL, description, language, publisher.

Page-level:

- `/` — `WebPage`
- `/services/` — `CollectionPage` + five `Service` nodes
- `/work/` — `CollectionPage`
- `/about/` — `AboutPage`
- `/contact/` — `FAQPage` with five visible questions
- `/work/<demo>/` — `WebPage`

Not implemented, with reasons:

- `BreadcrumbList` — no visible breadcrumbs.
- `LocalBusiness` / `ProfessionalService` — no verified street address, phone or hours.
- `SearchAction` — no site search.
- `Person` author markup — no articles/authors pages.
- `sameAs` — no official social profiles.
- `aggregateRating` / `review` — no verified reviews.
- `foundingDate` — not visible or verifiable.

---

## 7. Content changes

### Added

- One FAQ item on `/contact/`: "How is a project priced?" It explains scope drivers (pages/screens, complexity, integrations, content, server setup) and the written-quote process. It does not publish a price table.
- Matching FAQPage JSON-LD for all five visible questions.

### Corrected

- `/404/` copy: "Everything on this site lives on five pages" → "The main sections are listed below." The old sentence became false when the demos were added.

### Not changed

- No existing article was deleted, rewritten or replaced.
- No H1, body copy, section, navigation item, image or design token was changed.
- No blog was created.
- No fake case study, testimonial, client logo or metric was added.

---

## 8. Performance comparison

### Measured

| Metric | Baseline | After | Note |
| --- | --- | --- | --- |
| Home HTML (live before / local after) | 80,201 bytes | 83,015 bytes | +2.8 KB, almost entirely JSON-LD and metadata; no new JS |
| Home image preloads | 4 fonts + `/aama-pathshala.jpg` | 4 fonts only | The 71,506-byte below-fold screenshot is no longer preloaded |
| Runtime dependencies | 3 (`next`, `react`, `react-dom`) | 3 | No dependency added |
| JS asset pool | unchanged | 759,361 bytes across 17 files | Build chunk set; not a per-page figure |
| CSS asset pool | unchanged | 155,536 bytes across 8 files | Build chunk set; not a per-page figure |
| WOFF2 asset pool | unchanged | 339,296 bytes across 14 files | Self-hosted fonts |
| `npm audit` | 0 vulnerabilities | 0 vulnerabilities | No new packages |
| Build | — | 2.5 s compile, 1.1 s static generation | Next 16 Turbopack |

### What improved

- Removed the unnecessary preload of a below-the-fold image. This frees network priority for the hero, fonts and the intro.
- Below-fold images are lazy-loaded.
- No new client JavaScript, no new CSS, no new dependency.
- JSON-LD is static HTML, so it adds bytes but no runtime cost.

### What was not measured

- Field LCP, INP and CLS. These require real-user data in Search Console or PageSpeed Insights after deployment.
- Lighthouse lab scores. No Lighthouse run was performed; a synthetic score is not a substitute for field data.
- Pixel screenshot comparison. A body-text and CSS-class-multiset comparison against the live site was performed instead: `/`, `/services/`, `/work/` and `/about/` have identical body text and class counts; `/contact/` differs only by the new pricing FAQ and one extra `faq-answer` element. A human visual check is still recommended after deployment.

Do not claim a Core Web Vitals pass until field data confirms it.

---

## 9. Test results

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | Pass |
| ESLint | `npm run lint` | Pass |
| Production build | `npm run build` | Pass (16 static pages/routes generated) |
| SEO export check | `npm run seo:check` | Pass: 10 indexable pages, 10 unique titles, 0 errors, 0 warnings |
| Dependency audit | `npm audit` | `found 0 vulnerabilities` |
| Local `/` | `node scripts/serve.mjs` | 200 `text/html` |
| Local `/services/` | — | 200 `text/html` |
| Local `/work/savor/` | — | 200 `text/html` |
| Local `/sitemap.xml` | — | 200 `application/xml` |
| Local `/robots.txt` | — | 200 `text/plain` |
| Local unknown URL | — | 404 with the on-brand 404 page |
| Internal links | `npm run seo:check` | All internal `href`/`src` targets resolve in `out/` |
| Canonical host | `npm run seo:check` | All canonicals on `https://www.yugya.com` |
| OG URL match | `npm run seo:check` | All `og:url` values match canonicals |
| JSON-LD syntax | `npm run seo:check` | All blocks parse; all nodes have `@type` |
| Sitemap URLs | `npm run seo:check` | All on canonical host; all resolve |
| Robots | `npm run seo:check` | `User-Agent: *`, `Allow: /`, canonical sitemap |
| Image alt/dimensions | Manual export audit | No missing alt or width/height on indexable pages |
| Duplicate IDs | Manual export audit | None |
| `target="_blank"` rel | Manual export audit | All have `noreferrer`/`noopener` |
| Visible body text parity | Live vs local comparison (body only) | `/`, `/services/`, `/work/`, `/about/` identical; `/contact/` differs only by the new pricing FAQ |
| CSS class multiset parity | Live vs local class counts | Identical on all five pages; `/contact/` has one extra `faq-answer` |

### External validation not performed

- Google Rich Results Test: requires the deployed URL.
- Schema Markup Validator: requires the deployed URL or manual upload.
- Google Search Console: no account access.
- Bing Webmaster Tools: no account access.
- PageSpeed Insights field data: requires the deployed URL and real traffic.
- Mobile device/browser smoke test: no browser automation session was used in this task.

These are listed in `post-implementation-checklist.md`.

---

## 10. Remaining problems

1. **The live site still serves the old build until deployment.** All fixes are in the repository, not yet on production.
2. **No Search Console verification/submission.** Indexing, query data and Core Web Vitals cannot be confirmed.
3. **No Google Business Profile.** Local visibility for Butwal/Rupandehi is limited. Do not create a profile without a real address/service area.
4. **No official social profiles.** `Organization.sameAs` is intentionally empty.
5. **No field Core Web Vitals.** The code-level improvements are sound, but field performance is unverified.
6. **No blog or article content.** The content strategy is documented; no thin articles were published.
7. **No standalone mobile app, AI integration, hosting or domain pages.** The current site does not support those claims with content/proof.
8. **No visible breadcrumbs**, so no BreadcrumbList.
9. **No verified street address or phone**, so no LocalBusiness schema.
10. **The 404 output has two robots meta tags** (Next's default `noindex` plus the page's `noindex, nofollow`). Harmless, but redundant.
11. **The sitemap still includes `priority`/`changefreq`**, which Google ignores. Harmless.
12. **The 727 KB GIF fallback** remains for browsers without WebP. Modern browsers use the WebP source. It was not recompressed because it is a brand asset.
13. **The preview server is not production.** Status codes and headers must be re-checked on the host.
14. **No pixel screenshot or automated accessibility test.** A body-text and CSS-class parity check against the live site passed; pixel-level visual regression and automated a11y testing were not performed.
15. **Host-level HTTP-apex redirect is two hops** (`http://yugya.com` → `https://yugya.com` → `https://www.yugya.com`). Canonicals now point directly at the final URL, so indexed pages do not depend on the chain, but a one-hop host rule would be cleaner. This is a Vercel domain configuration change, not a repository change.

---

## 11. External tasks requiring manual access

| Task | Owner | Why |
| --- | --- | --- |
| Deploy the new build | Owner / CI | The fixes are not live yet |
| Verify the domain in Google Search Console (www + apex) | Owner | Needed for indexing, queries, CWV and Generative AI report |
| Submit `https://www.yugya.com/sitemap.xml` | Owner | Faster discovery of the ten routes |
| Verify in Bing Webmaster Tools | Owner | Bing/Copilot discovery |
| Run Rich Results Test on `/`, `/services/`, `/contact/` | Owner/engineer | External schema validation |
| Run PageSpeed Insights on `/` and `/services/` | Owner/engineer | Lab + field performance |
| Check Google Business Profile eligibility | Owner | Local visibility; requires real business details |
| Ensure NAP/email consistency across directories | Owner | Entity consistency |
| Create/maintain official social profiles | Owner | Only if they will be maintained; then add `sameAs` |
| Decide on mobile app / AI service positioning | Owner | Metadata/schema must not claim unverified services |
| Verify `.com.np` requirements before any guide | Owner/editor | Registry rules change |
| Human visual and mobile smoke test | Owner/engineer | Confirm no design regression after deploy |

---

## 12. Recommendations for the next 90 days

### Days 1–7: deploy and verify

1. Deploy the build.
2. Confirm `https://www.yugya.com/` returns 200 and the apex still redirects to it.
3. Confirm canonical, `og:url`, sitemap and robots all use `www`.
4. Verify Search Console and Bing, submit the sitemap, request indexing for the ten routes.
5. Run Rich Results Test and PageSpeed Insights on `/`, `/services/`, `/contact/`.
6. Do a mobile smoke test of the header drawer, reveals, contact form, demo launcher and 404.
7. Check for any new indexing or structured-data errors after 48–72 hours.

### Days 8–30: entity and local foundations

1. Decide whether a Google Business Profile is eligible. If yes, use the real name, category, address/service area, hours, phone, photos and website.
2. Make the name, email, location and service description consistent across the site, GBP and any directories.
3. Create or claim official social profiles only if they will be maintained; then add `sameAs` to Organization.
4. Review Search Console queries for the new titles and the pricing FAQ.
5. Fix any crawl/indexing issues reported.

### Days 31–60: content

1. Publish the cost article ("What changes the cost of a website in Nepal") with no invented price table. Link it to `/contact/`.
2. Publish the "How to choose a web development company in Nepal" checklist.
3. Use existing components; do not introduce a generic blog template.
4. Add real author bylines and, if needed, a real author page.
5. Run `seo:check`, mobile checks and internal-link checks.

### Days 61–90: depth and measurement

1. Publish the `.com.np` guide after verifying current registry requirements.
2. Publish the maintenance checklist and one demo-led article (school software or stock ledger).
3. Review which demos generate enquiries; ask enquirers which page prompted them.
4. Consider standalone service pages only if they can be substantially deeper than the `/services/` anchors.
5. Consider a Butwal/Rupandehi page only if there is real local evidence (office, local clients with permission, local logistics).
6. Review 90 days of Search Console data before making further title or content changes.
7. Keep the monthly maintenance routine: build, `seo:check`, audit, link check, content review.

### Do not do in the next 90 days

- Do not create dozens of city pages.
- Do not publish AI-generated articles without first-hand input and human review.
- Do not add fake reviews, logos, awards or performance claims.
- Do not add `llms.txt` as a "GEO requirement".
- Do not claim rankings or AI visibility without evidence.
- Do not change the design system to chase an SEO trend.
