# SEO / GEO research notes

Date: 2026-11-13
Site: https://www.yugya.com/
Scope: technical SEO, content discovery, generative-AI search (GEO), answer engines (AEO), Nepal market.

This document records what was read, what it means for Yugya, and which common recommendations were deliberately not followed. It is a summary in my own words, not a copy of the sources.

---

## 1. Primary sources read

### Google Search Central — SEO Starter Guide

Source: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

Relevant findings:

- Google primarily discovers pages through links. A sitemap helps but is not a substitute for crawlable internal links.
- Titles should be unique, descriptive, concise and accurate. Google may rewrite a title link when it is vague, boilerplate or does not match the page.
- Meta descriptions are not a ranking factor, but they influence whether a qualified visitor clicks. They should summarize the page, not repeat keywords.
- Useful content matters more than any single technical trick. Google explicitly says there are no secrets that automatically rank a site first.
- Duplicate content is inefficient, not a penalty. A canonical or redirect is the right fix.
- Structured data makes a page eligible for enhanced appearances; it does not guarantee them.
- Google ignores the `keywords` meta tag.
- Keyword stuffing is a spam-policy violation.
- Keywords in the domain or URL path have little effect beyond breadcrumbs.
- There is no minimum or maximum content length. Word-count targets are not a ranking rule.
- Heading order is good for accessibility, but Google does not require perfect semantic order to understand a page.
- E-E-A-T is not a direct ranking factor, but the quality-rater framing is useful for self-assessment.

Implication for Yugya: the existing design already has strong, original page copy. The highest-value work is accurate titles/descriptions, canonical correctness, entity clarity and crawlable structure — not more keywords.

### Google Search Central — Search Essentials

Source: https://developers.google.com/search/docs/essentials

Relevant findings:

- Eligibility rests on three things: technical requirements, spam policies, and key best practices.
- Key practices: helpful people-first content; use the words people search for in prominent places (title, main heading, alt text, link text); make links crawlable; tell people about the site; follow format-specific guidance for images, video, structured data and JavaScript.
- Meeting the requirements does not guarantee crawling, indexing or serving.

Implication: no amount of schema can compensate for a page Google cannot crawl or does not consider useful. The site is already server-rendered and crawlable; the work should stay grounded in real service content.

### Google Search Central — Creating helpful, reliable, people-first content

Source: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

Relevant findings:

- Original information, first-hand experience and a clear point of view are rewarded.
- "Who, How, Why" is a useful test: who created the content, how it was produced (including AI assistance), and why it exists.
- Fabricated authors, credentials or AI-generated headshots are deceptive.
- AI-generated content is not automatically spam, but using automation to produce many pages primarily for rankings is scaled-content abuse.
- Trust is the most important part of E-E-A-T.
- Main content includes interactive tools when the tool is the reason the page exists. Yugya's demo pages are legitimate main content, not decoration.

Implication: the demo portfolio is an asset. Future articles should be written from the studio's actual delivery experience, with real constraints and no invented statistics.

### Google Search Central — AI features and your website

Source: https://developers.google.com/search/docs/appearance/ai-features

Relevant findings:

- There are no additional requirements for AI Overviews or AI Mode. Foundational SEO is the requirement.
- AI Overviews and AI Mode may use query fan-out, issuing related searches and surfacing a wider set of supporting links.
- To be eligible as a supporting link, a page must be indexed and eligible for a snippet.
- Google's robots.txt controls for Googlebot are the primary access control for Search, including AI features. `nosnippet`, `data-nosnippet`, `max-snippet` and `noindex` control what is shown.
- Google-Extended controls AI training/grounding in some other Google systems, not Search inclusion.

Implication: do not build a separate "AI version" of the site or chase AI-only markup. Keep the site crawlable, fast, textual and accurate.

### Google Search Central — Optimizing for generative AI features on Google Search

Source: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Relevant findings:

- SEO remains the foundation: RAG and query fan-out use the core Search index and ranking systems.
- Unique, non-commodity content and a unique point of view matter more than volume.
- Technical clarity matters: crawlable content, good page experience, semantic HTML for humans, JavaScript SEO basics, reduced duplicate content.
- Local business and ecommerce details can appear in generative responses; Business Profile and Merchant Center are relevant where applicable.
- Google explicitly says you do **not** need: LLMS.txt files or other special markup, content "chunking", content rewritten specifically for AI, or inauthentic mentions.
- Structured data is optional for generative AI search but still useful for rich results.
- Search Console has a Generative AI performance report; third-party tools do not have access to Google's internal ranking systems.

Implication: no `llms.txt` was added. The effort went into canonical correctness, structured data for human/entity understanding, and genuine service/demo content.

### Google Search Central — JavaScript SEO basics

Source: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

Relevant findings:

- Google crawls, renders and indexes; server-side rendering or pre-rendering is still recommended because it is faster and not all bots run JavaScript.
- Canonicals should be in the original HTML. If JavaScript injects one, it must match the HTML and be the only canonical.
- Use meaningful HTTP status codes; avoid soft 404s.
- Use real `<a href>` links and the History API, not fragment routing, for discoverable pages.
- Do not block CSS/JS resources that Google needs to render a page.
- Lazy-loading is fine when implemented in a crawlable way.

Implication: the Next.js static export already ships fully server-rendered HTML and real links. No client-side rendering work was needed.

### Google Search Central — Build and submit a sitemap

Source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Relevant findings:

- Sitemaps must use fully qualified absolute URLs and UTF-8.
- A single sitemap is limited to 50 MB or 50,000 URLs.
- Google ignores `<priority>` and `<changefreq>`.
- Google uses `<lastmod>` only when it is consistently and verifiably accurate. A build timestamp on every deploy is not a reliable last-significant-change date.
- Submitting a sitemap is a hint, not a guarantee.

Implication: the sitemap still lists all ten routes, but the false build-time `lastmod` was removed.

### Google Search Central — Introduction to robots.txt

Source: https://developers.google.com/search/docs/crawling-indexing/robots/intro

Relevant findings:

- robots.txt manages crawler traffic; it is not a reliable way to keep a page out of the index.
- A disallowed URL can still be indexed if other pages link to it, often without a description.
- Blocking CSS/JS can prevent Google from understanding a page.
- Use `noindex` or password protection to remove a page from Search.

Implication: the site keeps `Allow: /` and uses `noindex` on the 404 page. Nothing important is blocked.

### Google Search Central — Core Web Vitals

Source: https://developers.google.com/search/docs/appearance/core-web-vitals

Relevant findings:

- LCP target: 2.5 seconds or less.
- INP target: 200 ms or less.
- CLS target: 0.1 or less.
- Field data in Search Console is the source of truth; lab tools are diagnostic.

Implication: the site's existing LCP/CLS posture is good (server HTML, font `display: swap`, explicit image dimensions, static assets). The one clear regression risk found was an unnecessary preload of a below-the-fold project screenshot; it was removed by lazy-loading that image.

### Google Search Central — Spam policies

Source: https://developers.google.com/search/docs/essentials/spam-policies

Relevant findings:

- Doorway abuse includes multiple pages targeted at specific regions or cities that funnel users to one page, and substantially similar pages with swapped location names.
- Hidden text, keyword stuffing, cloaking, scraped content, scaled content abuse and link spam are violations.
- Legitimate accordion/tab content and screen-reader-only text are not hidden-text abuse.

Implication: no city landing pages were created. The site has one honest location statement (Kapilvastu / Rupandehi) and an `areaServed: Nepal` entity signal. Future location pages require real location-specific value.

### Google Search Central — Influencing title links

Source: https://developers.google.com/search/docs/appearance/title-link

Relevant findings:

- Every page needs a descriptive, concise, unique `<title>`.
- Avoid vague titles, keyword stuffing, boilerplate titles and titles that do not match the page.
- The main visual title and the first prominent `<h1>` help Google understand the page.
- Titles should use the same language and writing system as the primary content.

Implication: titles were rewritten around the page's actual intent while keeping the visible H1s untouched. The site remains English, so titles remain English.

### Google Search Central — Introduction to structured data

Source: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

Relevant findings:

- JSON-LD is the recommended format.
- Structured data should describe the page's visible content; do not mark up invisible or unsupported information.
- Required properties must be complete and accurate. Fewer complete properties are better than many inaccurate ones.
- Rich Results Test is the validation tool.

Implication: Organization, WebSite, Service and FAQ nodes were added only for information the site visibly states. The existing unsupported `foundingDate` was removed.

### Other sources consulted

- Schema.org vocabulary: https://schema.org/ — used to confirm `Organization`, `WebSite`, `WebPage`, `AboutPage`, `CollectionPage`, `Service`, `FAQPage`, `Question`, `Answer`, `Person`, `PostalAddress`.
- web.dev Core Web Vitals guidance: https://web.dev/articles/vitals — confirms the 2.5 s / 200 ms / 0.1 targets and the field-vs-lab distinction.
- Google Rich Results Test: https://search.google.com/test/rich-results — external validation still required after deployment.
- PageSpeed Insights: https://pagespeed.web.dev/ — external field/lab validation still required after deployment.
- Google Search Console: https://search.google.com/search-console — no account access in this environment; verification and sitemap submission remain manual.
- Ahrefs / Semrush general SEO resources — used only for orientation on keyword-cluster thinking, not for invented volume data.

### Nepal SERP observations (2026-11-13)

These are observations of result types, not volume data.

- `web development company in Nepal` and `website design company in Nepal`: agency homepages plus directories (Clutch, DesignRush, GoodFirms). Strong commercial intent; brand and proof matter.
- `website development cost in Nepal`: long-form pricing guides with NPR ranges dominate. High commercial-investigation intent. Yugya has no fixed packages, so the honest response is to explain scope drivers and offer a written quote — not to invent a price table.
- `web development company in Butwal Rupandehi`: local agencies with city pages and client logos (Inovex Media & Tech, Butwal Technologies, Infobytes Nepal, Sigma Nepal, Tech Temple, ABS Soft). Local intent is real, but Yugya has no verified street address or Google Business Profile in this repository, so a city page would be a doorway risk.
- `AI automation services Nepal`: dedicated AI agencies rank. Yugya has business automation and its own Yugs product, but should not rebrand as an AI agency without dedicated, accurate content.
- `.com.np domain registration`: the national registry (register.com.np) and guide articles rank. This is a content opportunity around the existing domain/DNS service, not a new product claim.
- `custom software development Nepal` / `mobile app development Nepal`: mixed local and international results. The query set is broader and noisier; Yugya's current service page does not claim mobile app development, so no metadata was changed to claim it.

---

## 2. Recommendations deliberately not followed

| Common advice | Why it was not applied |
| --- | --- |
| Add `meta keywords` | Google ignores it; it adds no value and can look dated. |
| Target a keyword density or word count | Google explicitly says there is no ideal length and keyword stuffing is spam. |
| Create a page for every city and service combination | Doorway abuse risk; Yugya has no verified local offices and the pages would be near-duplicates. |
| Add `llms.txt` because "AI search requires it" | Google says it does not use LLMS.txt and no special file is required. It may help other systems, but there is no documented requirement; adding it would be speculative. |
| Add special "AI schema" | No such schema exists. Structured data describes entities and content; it does not guarantee AI inclusion. |
| Add FAQ markup expecting rich results | Google limits FAQ rich results to a small set of authoritative sites. The FAQPage node is for answer/entity clarity, not a rich-result promise. |
| Mark up ratings, reviews, awards, founding dates, employee counts or social profiles | None are verified or visible. Structured data must match visible, supported information. |
| Add `LocalBusiness` with a fabricated address or phone | The site publishes email and a district-level location, not a street address or phone. A LocalBusiness node would be inaccurate. |
| Mass-produce articles with AI | Scaled-content abuse. Future articles must be first-hand and editorially reviewed. |
| Add analytics or tracking scripts | The site deliberately has none; adding tracking would change the privacy posture and was not requested. |
| Replace the design with an SEO-template layout | The design is owner-approved and final. All changes were metadata, schema, image loading and one in-design FAQ item. |

---

## 3. Conflicting or outdated guidance observed

- Third-party "GEO" articles often claim special AI files, chunking or keyword variants are mandatory. Google's own guidance says the opposite: foundational SEO, crawlable text and useful content are the requirements.
- Some audits still flag missing `meta keywords` or low keyword density. Both are outdated.
- Some audits treat `<priority>` and `<changefreq>` in sitemaps as important. Google ignores them.
- Some audits recommend FAQ schema for rich results on any commercial site. Google's eligibility is narrow; the markup is still valid but should not be sold as a guaranteed rich result.
- Some SEO advice treats E-E-A-T as a direct ranking factor. Google says it is not a single factor; it is a useful quality framing.
- Some local SEO advice recommends city pages for every service area. Google's doorway-abuse policy explicitly covers pages targeted at specific regions that funnel users to one page.

---

## 4. What this means for Yugya

1. The technical foundation is already better than most small business sites: static HTML, server-rendered content, real links, self-hosted fonts, no heavy framework UI.
2. The biggest immediate defect was not content — it was the canonical host. The live apex domain 308-redirects to `www`, while every canonical and sitemap URL named the apex.
3. The site's strongest differentiators are honest technical detail and the interactive demos. Those should be expanded before generic blog volume.
4. Local SEO should start with a verified Google Business Profile and real location data, not city landing pages.
5. AI discovery will follow the same crawl/index/quality path as Search. The correct investment is accurate entity data, crawlable text and original content.
