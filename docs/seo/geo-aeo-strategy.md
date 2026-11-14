# GEO / AEO strategy

Date: 2026-11-13
Site: https://www.yugya.com/

## 1. Framing

Google's current guidance is explicit: "AEO" (answer engine optimization) and "GEO" (generative engine optimization) are, from Google Search's perspective, still SEO. AI Overviews and AI Mode use the core Search index, retrieval-augmented generation (RAG) and query fan-out. There are no additional technical requirements and no special schema for AI features.

The practical implications for Yugya:

1. Be crawlable and indexable.
2. Make important information available as textual HTML, not only images or client-side state.
3. Describe the business consistently and accurately.
4. Publish original content that answers real customer questions.
5. Do not chase AI-only files, "chunking" or inauthentic mentions.

This strategy follows those rules.

---

## 2. Entity consistency

The same business identity should be recognizable across the site, structured data and external profiles.

| Attribute | Canonical value | Where it appears |
| --- | --- | --- |
| Brand name | Yugya | Header, footer, titles, Organization schema |
| Alternate name | Yugya Technologies | Yugs byline, Organization/WebSite `alternateName` |
| Category | Independent technology studio / web development company in Nepal | Home, About, Organization description |
| Primary service | Website and web application development | Home capabilities, Services, Service schema |
| Other services | Linux server setup, VPS and deployment; domain and DNS; business automation; website maintenance | Services, footer, Service schema |
| Location | Kapilvastu / Rupandehi, Nepal · UTC +5:45 | Home, About, Contact, footer, Organization address |
| Email | hello@yugya.com | Header drawer, footer, Contact, About, Organization |
| Founders | Aayush Bhandari, Sagar Bhusal | About, Home founders section, Organization `founder` |
| Area served | Nepal | Organization `areaServed`, Service `areaServed` |
| Official product | Yugs (Yugs Bot), https://yugs.yugya.com/ | Home Yugs section |

### Consistency rules

- Use "Yugya" as the primary name and "Yugya Technologies" as the alternate, not as two competing brands.
- Do not describe Yugya as only a hosting company, domain reseller or generic AI agency. The primary position is website/software development.
- Do not publish a second address, phone number or email that contradicts the site.
- If a Google Business Profile or social profile is created, use the same name, description, email and location language, then add the profile URL to `Organization.sameAs`.
- Do not add `sameAs` links to profiles that do not exist or are not controlled by Yugya.

---

## 3. What was implemented

### Crawlable textual content

- All page copy is in the static HTML response.
- The interactive demos mount only after a user opens the overlay; the intro pages contain the problem/solution/module descriptions as text.
- The enquiry form's explanatory copy and FAQ are HTML, not images.
- No important content is hidden behind tabs that are absent from the DOM. The FAQ uses native `<details>`, which keeps answers in the HTML.

### Structured data for entity clarity

- `Organization`: name, alternate name, description, URL, logo, email, founders, address, area served, expertise, contact point.
- `WebSite`: site name, alternate name, language, publisher.
- `Service` nodes for the five service scopes.
- `FAQPage` for the visible contact questions.
- Page types: `WebPage`, `CollectionPage`, `AboutPage`, `FAQPage`.

This does not guarantee AI inclusion. It makes the business and its services easier to interpret consistently.

### Clear headings and answers

- One H1 per page.
- H2/H3 hierarchy that describes the content.
- The contact FAQ answers billing, hosting, support, `.com.np` domains and pricing basis.
- The services page explains what each service is, who it is for, the problem it solves, what is delivered and what happens after delivery.
- The work page labels each entry honestly as a live client website, blueprint, prototype or demo.
- Demo pages label every workflow as real in-browser logic, simulated, or sample data.

### Honest positioning

- No invented statistics, client logos, testimonials, awards, certifications, ratings or uptime claims.
- No "best in Nepal" claims.
- No fake AI expertise. The site states what it actually builds.
- The Yugs product is described as the studio's own AI assistant, not as a generic AI agency service.

### Canonical and crawl access

- Canonical host is `https://www.yugya.com`.
- Robots allows all crawlers; no important resource is blocked.
- Sitemap lists all ten indexable routes.
- The 404 page is `noindex`.
- No `llms.txt` or AI-specific file was added. Google does not use it, and there is no documented requirement from the other systems Yugya targets.

---

## 4. AI crawler access policy

| Crawler type | Examples | Current access | Rationale |
| --- | --- | --- | --- |
| Search indexing | Googlebot, Bingbot | Allowed | Required for Search and AI search grounding. |
| AI search / retrieval | Various | Allowed by `*` | The site is public marketing content; being retrieved can help discovery. |
| AI training | Various | Allowed by `*` | No business reason to block was identified. This can be revisited if the owner sets a content-licensing policy. |
| Google-Extended | Google's AI training/grounding controls | Allowed by default | Google-Extended does not control Search inclusion; blocking it would not remove the site from Search. |

No bot-specific rules were added. This is a deliberate default, not an oversight. If the business later decides to restrict AI training while remaining in Search, the change should be made with legal/business review and documented here.

---

## 5. Answer-engine content plan

The site already answers several high-intent questions. Future content should answer the rest without inventing facts.

### Already answered on the site

- What does Yugya build? (Home, Services)
- Who is behind Yugya? (About, founders)
- Where is Yugya based? (About, Contact)
- How is work billed? (Contact FAQ)
- Where are websites hosted? (Contact FAQ)
- What post-launch support is included? (Contact FAQ)
- Do you assist with `.com.np` domains? (Contact FAQ)
- How is a project priced? (Contact FAQ, new)
- What is included in each service? (Services)
- What is a demo and what is sample data? (Demo pages)

### Recommended future answers

Each should be a genuine section in a page or a well-researched article, not a keyword-stuffed FAQ block.

1. How much does a website cost in Nepal? — explain cost drivers and why a fixed public price is misleading; no invented ranges.
2. How long does a website take? — explain discovery, design, build, review and handover; give ranges only if the studio can stand behind them.
3. What do I need before starting a website? — domain, content, brand assets, decision-maker, hosting ownership.
4. Do I need hosting and a domain separately? — explain the difference and who should own each account.
5. Can Yugya maintain an existing website? — explain the audit/inspection requirement; do not promise takeover without seeing the codebase.
6. What is included in a Linux server handover? — SSH access, runbook, firewall, TLS, backups, deployment.
7. Should I choose custom software or ready-made software? — decision criteria, not a sales pitch.
8. What can be automated in a small Nepali business? — concrete examples with human review.
9. What is a `.com.np` domain and who qualifies? — cite register.com.np.
10. How do I choose a web development company in Nepal? — code ownership, handover, maintenance, communication, references.

### Answer style

- Lead with a direct answer, then context.
- Use concrete numbers only when the studio can verify them.
- Use tables and lists where they genuinely help.
- Link to the relevant service page or demo.
- Keep the visible page useful to a human; do not write "for AI" copy.

---

## 6. Measurement

### Available after deployment

- Google Search Console: Performance report, Pages/Indexing, Core Web Vitals, and the Generative AI performance report where available.
- Bing Webmaster Tools: search performance and indexing.
- Server/Vercel aggregate logs: requests to `/work/<demo>/` and `/contact/` (privacy-preserving; the site has no client-side analytics).
- Enquiry quality: ask which page or demo prompted the contact.

### Not available / not claimed

- No AI Overviews or AI Mode inclusion is claimed.
- No ChatGPT, Copilot, Perplexity or other AI citation is claimed.
- No ranking improvement is claimed without Search Console data.
- No third-party tool has access to Google's internal ranking systems; do not treat vendor "AI visibility scores" as ground truth.

### What to watch

- Impressions and CTR for the ten routes.
- Queries containing "cost", "price", "Butwal", "Rupandehi", ".com.np", "school software", "stock", "contractor".
- Which demo pages attract enquiries.
- Whether the pricing FAQ page earns impressions for cost queries (it may take time).
- Whether Google selects the new titles or rewrites them (title links are automated).

---

## 7. External consistency tasks (human action)

These cannot be completed from the repository:

1. Verify the site in Google Search Console (domain property covering `www` and apex).
2. Submit `https://www.yugya.com/sitemap.xml`.
3. Verify in Bing Webmaster Tools.
4. Decide whether Yugya is eligible for a Google Business Profile. If yes, use the real business name, category, address/service area, hours, phone, photos and website. Do not create a profile with a fabricated address.
5. Create or claim official social profiles only if the studio will maintain them; then add them to `Organization.sameAs` and the footer.
6. Ensure any directory listing (Clutch, GoodFirms, local directories) uses the same name, email, location and service description.
7. If the studio publishes articles, use a real author byline and a real author page. Do not invent credentials.
8. If a `.com.np` guide is published, verify current requirements with register.com.np and cite it.
9. If the business confirms mobile app development or AI integration as standalone services, add real service content and proof before adding metadata/schema claims.

---

## 8. Guardrails

- No fake reviews, ratings, awards, certifications, employee counts or founding dates.
- No hidden text or keyword-stuffed blocks.
- No city pages with swapped names.
- No machine-translated pages without human review.
- No AI-generated articles without first-hand input, editing and fact-checking.
- No `llms.txt` or special AI file unless a target system documents a use.
- No claims of AI visibility or rankings without evidence.
- Keep the disclaimer sentence on every demo page verbatim.
- Keep sample data fictional and labelled.
- Keep the design system unchanged.
