# Post-implementation checklist

Date: 2026-11-13
Site: https://www.yugya.com/

This checklist separates what was verified locally from what requires deployment, external accounts or human review.

---

## A. Pre-deployment (verified locally)

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run seo:check` — 10 indexable pages, 10 unique titles, 0 errors, 0 warnings
- [x] `npm audit` — 0 vulnerabilities
- [x] Every indexable page has one H1
- [x] Every indexable page has a unique title and description
- [x] Every canonical uses `https://www.yugya.com`
- [x] Every `og:url` matches its canonical
- [x] JSON-LD parses and every node has `@type`
- [x] Internal `href`/`src` targets resolve in `out/`
- [x] `sitemap.xml` lists all ten routes on the canonical host
- [x] `robots.txt` allows `/` and points at the canonical sitemap
- [x] 404 page is `noindex`
- [x] Images have alt text and width/height
- [x] No duplicate element ids
- [x] External `target="_blank"` links have safe `rel`
- [x] The misplaced home-page image preload is gone
- [x] Local server returns 200 for `/`, `/services/`, `/work/savor/`, `/sitemap.xml`, `/robots.txt`
- [x] Local unknown URL returns 404 with the on-brand page
- [x] Live vs local body-text parity: `/`, `/services/`, `/work/`, `/about/` identical; `/contact/` differs only by the new pricing FAQ
- [x] Live vs local CSS-class parity: identical on all five pages except one extra `faq-answer` on `/contact/`

---

## B. Deploy

- [ ] Deploy the new build to production.
- [ ] Confirm the deploy used the current `main` (or the intended branch).
- [ ] Purge the CDN/host cache if the host caches HTML.
- [ ] Confirm `https://www.yugya.com/` returns 200.
- [ ] Confirm `https://yugya.com/` still returns 308 to `https://www.yugya.com/`.
- [ ] Confirm HTTPS is valid on both hosts.

---

## C. Production canonical and metadata checks

Run for each route: `/`, `/services/`, `/work/`, `/work/savor/`, `/work/campusflow/`, `/work/stockwise/`, `/work/worknest/`, `/work/serverscope/`, `/about/`, `/contact/`.

- [ ] View source: exactly one `<link rel="canonical">`.
- [ ] Canonical is `https://www.yugya.com` + the route, with trailing slash.
- [ ] `og:url` matches canonical.
- [ ] `og:title`, `og:description` and `og:image` are present.
- [ ] `og:image` is absolute and returns 200.
- [ ] Title and description are unique.
- [ ] One H1 per page.
- [ ] No `noindex` on indexable pages.
- [ ] The 404 page has `noindex, nofollow`.

Suggested commands (replace host if needed):

```bash
curl -sS https://www.yugya.com/ | grep -i 'canonical\|og:url\|og:image\|<title'
curl -sS https://www.yugya.com/services/ | grep -i 'canonical\|og:url'
curl -sSI https://yugya.com/
curl -sS https://www.yugya.com/robots.txt
curl -sS https://www.yugya.com/sitemap.xml
```

---

## D. Crawl and indexing

- [ ] `https://www.yugya.com/robots.txt` returns 200 and contains `Allow: /` and the canonical sitemap.
- [ ] The robots `Host` directive, if present, is a hostname (`www.yugya.com`), not a URL.
- [ ] `https://www.yugya.com/sitemap.xml` returns 200 and valid XML.
- [ ] Every sitemap URL returns 200.
- [ ] `https://www.yugya.com/does-not-exist/` returns 404, not a soft 404.
- [ ] No important CSS/JS/image/font path is blocked.
- [ ] No staging or private routes are exposed.
- [ ] The apex redirect is a single 308/301 hop, not a chain.

---

## E. Google Search Console (requires account access)

- [ ] Add or verify a Domain property for `yugya.com` (covers `www` and apex).
- [ ] If a URL-prefix property is used, verify `https://www.yugya.com/`.
- [ ] Submit `https://www.yugya.com/sitemap.xml`.
- [ ] Check the Sitemaps report for fetch/parse errors.
- [ ] Check Page indexing for the ten routes.
- [ ] Use URL Inspection on `/`, `/services/`, `/contact/` and request indexing.
- [ ] Check the Core Web Vitals report after field data is available.
- [ ] Check the Generative AI performance report where available.
- [ ] Check Enhancements / structured-data reports for errors.
- [ ] Note any manual actions or security issues (expected: none).

---

## F. Bing Webmaster Tools / AI search

- [ ] Verify the site in Bing Webmaster Tools.
- [ ] Submit the sitemap.
- [ ] Check indexing for the ten routes.
- [ ] Optionally check Copilot/Bing search appearance.
- [ ] Do not claim ChatGPT, Perplexity or other AI inclusion without evidence.
- [ ] Do not add `llms.txt` unless a target system documents a use and the owner approves it.

---

## G. Structured data validation (external)

- [ ] Rich Results Test: `https://www.yugya.com/`
- [ ] Rich Results Test: `https://www.yugya.com/services/`
- [ ] Rich Results Test: `https://www.yugya.com/contact/`
- [ ] Schema Markup Validator: same URLs.
- [ ] Confirm the Organization, WebSite, Service and FAQPage nodes are detected.
- [ ] Confirm no errors for missing required properties.
- [ ] Remember: FAQ rich results are unlikely for a commercial site; the markup is for clarity, not a guaranteed enhancement.
- [ ] Confirm `foundingDate` is no longer present.
- [ ] Confirm no reviews, ratings, awards or social profiles were invented.

---

## H. Performance

- [ ] PageSpeed Insights mobile and desktop: `https://www.yugya.com/`
- [ ] PageSpeed Insights: `https://www.yugya.com/services/`
- [ ] Record LCP, INP and CLS. Targets: ≤ 2.5 s, ≤ 200 ms, ≤ 0.1.
- [ ] Confirm the home page does not preload below-the-fold project screenshots.
- [ ] Confirm fonts are served from the same origin and have `display: swap`.
- [ ] Confirm no new console errors.
- [ ] Confirm no layout shift from images or the intro.
- [ ] Do not chase a perfect Lighthouse score by removing meaningful interactions.

---

## I. Manual user-experience smoke test

Test on a real phone and a desktop browser.

- [ ] Intro sequence plays on a full load; skip works; reduced-motion skips it.
- [ ] Header mobile drawer opens/closes; Escape and outside click work.
- [ ] Header gains `.is-scrolled` on scroll.
- [ ] Theme toggle works and persists.
- [ ] Reveal-on-scroll content appears.
- [ ] All nav and footer links work.
- [ ] All service anchors land on the correct section.
- [ ] Demo index links open the five demo pages.
- [ ] Demo launcher opens, tour works, reset works, exit works.
- [ ] Contact form validation works.
- [ ] Contact form opens a mailto draft or copies the enquiry.
- [ ] `?service=web`, `?service=vps`, `?service=dns`, `?service=automation`, `?service=maintenance` preselect the matching option.
- [ ] Language selector loads Google Translate only after a non-English choice.
- [ ] 404 page renders and its links work.
- [ ] No horizontal scroll at 320 px, 375 px, 768 px, 1024 px and 1440 px.
- [ ] Contact FAQ opens/closes; the new pricing question is visible.
- [ ] No visual regression in the existing design.

---

## J. Local SEO and entity consistency

- [ ] Decide whether Yugya is eligible for a Google Business Profile.
- [ ] If yes, use the real business name, category, address/service area, hours, phone, photos and website.
- [ ] Do not use a fabricated address or virtual office that the business does not control.
- [ ] Keep the email, location and service description consistent across the site, GBP and directories.
- [ ] Check existing directory listings for outdated information.
- [ ] Create/claim social profiles only if they will be maintained.
- [ ] If social profiles are added, add their URLs to `Organization.sameAs` and the footer.
- [ ] Do not create city pages without real local evidence.

---

## K. Content

- [ ] No existing article was deleted or rewritten.
- [ ] No fake author, credential, testimonial or client logo was added.
- [ ] The demo disclaimer sentence is still verbatim on every demo page.
- [ ] Sample data is still labelled fictional.
- [ ] The new pricing FAQ does not state a fixed price.
- [ ] Future articles follow `docs/seo/content-strategy.md`.
- [ ] Any `.np` guide is verified against register.com.np on the publication date.
- [ ] Any AI-assisted draft has a named human editor and fact-check.

---

## L. Monitoring (first 30 days)

- [ ] Check Search Console Page indexing at 48–72 hours and again at 7 days.
- [ ] Check Sitemaps processing.
- [ ] Check for structured-data errors.
- [ ] Check Core Web Vitals once field data exists.
- [ ] Check queries/impressions/CTR for the ten routes.
- [ ] Check whether Google uses the new titles or rewrites them.
- [ ] Check for 404s from links that changed (none are expected; titles/metadata changed, not routes).
- [ ] Check enquiry quality and ask which page/demo prompted the contact.

---

## M. Rollback

If a regression appears:

1. Revert the offending change, not the whole SEO layer.
2. Re-run `npm run typecheck`, `npm run lint`, `npm run build`, `npm run seo:check`.
3. Re-deploy and re-check canonical/OG/sitemap/robots.
4. Do not restore the apex canonical: the `www` host is the live final URL.

---

## N. Definition of done mapping

| Requirement | Status |
| --- | --- |
| Research documentation | `docs/seo/research-notes.md` |
| Baseline audit | `docs/seo/baseline-audit.md` |
| Keyword research and mapping | `docs/seo/keyword-research.md`, `keyword-to-url-map.md` |
| Accurate metadata on important pages | Implemented and checked |
| Crawlability/indexing audited | `technical-seo.md`; production re-check pending |
| Sitemap and robots validated | Local export validated; production re-check pending |
| Canonical URLs correct | Fixed to `www`; production re-check pending |
| Structured data implemented | Organization, WebSite, WebPage, CollectionPage, AboutPage, Service, FAQPage |
| Important content crawlable | Static HTML; confirmed |
| GEO/AEO recommendations implemented | Entity graph, FAQ, honest answers, docs |
| Existing blog audited | No blog exists; documented |
| Internal links logical | Checked; no broken links in export |
| Performance not regressed | Misplaced preload removed; lazy loading added; field data pending |
| Design and interactions intact | Visible changes limited to one FAQ item and one 404 sentence; human visual check pending |
| Production build succeeds | Yes |
| Tests pass | typecheck, lint, build, seo:check, audit all pass |
| Documentation complete | This directory |
