# Keyword-to-URL map

Date: 2026-11-13

One page should own one primary search intent. This map prevents cannibalization: two pages should not compete for the same primary query unless they serve materially different intents.

---

## 1. Current indexable pages

| URL | Primary intent / keyword | Supporting terms | Intent type | Notes |
| --- | --- | --- | --- | --- |
| `/` | web development company in Nepal | website development company Nepal; technology studio Nepal; web development Nepal; custom web applications Nepal | Commercial | Home is the brand and primary commercial page. Title now names the market and service. |
| `/services/` | web development and software services in Nepal | website development services; web app development; Linux VPS setup; domain and DNS; business automation; website maintenance | Commercial | The page is a collection of five service scopes. Each section has its own anchor. |
| `/services/#web-development` | website and web application development Nepal | custom website development; responsive website; web application development; bilingual website | Commercial | Anchor within `/services/`. Do not create a separate page until there is enough unique content. |
| `/services/#server-infrastructure` | Linux VPS setup and server management Nepal | VPS hosting Nepal; server hardening; Caddy/Nginx; deployment pipeline | Commercial | Anchor within `/services/`. |
| `/services/#domain-dns` | domain registration and DNS guidance Nepal | .com.np domain; .np domain requirements; Cloudflare DNS; SPF DKIM DMARC | Informational + transactional | Anchor within `/services/`. |
| `/services/#automation` | business automation Nepal | custom scripts; Python automation; workflow automation; data processing | Commercial | Anchor within `/services/`. |
| `/services/#maintenance` | website maintenance Nepal | server maintenance; security patching; backup verification | Commercial | Anchor within `/services/`. |
| `/work/` | web development portfolio Nepal / live client websites | website case studies Nepal; live client work; technical implementations; interactive demos | Commercial investigation | Collection page. |
| `/work/#kohinoor-restaurant` | Kohinoor Restaurant website | restaurant website development Nepal; Kohinoor Restaurant Tilottama | Brand + commercial investigation | Anchor on `/work/` for a live client site. Do not create a separate page for the client name. |
| `/work/#samajik-abhiyaan` | Samajik Abhiyaan website | Nepali news website development; Samajik Abhiyaan Kapilvastu | Brand + commercial investigation | Anchor on `/work/` for a live client site. Sorvx is the owner's former brand; the public card presents the work as Yugya. |
| `/work/#aama-pathshala` | Aama Pathshala website | preschool website development Nepal; bilingual school website | Brand + commercial investigation | Anchor on `/work/` for a live client site. Do not create a separate page for the client name. |
| `/work/savor/` | restaurant website development Nepal | restaurant website demo; menu website; table reservation website | Commercial investigation | Long-tail demo intent. Sample data is labelled. |
| `/work/campusflow/` | school management software Nepal | school attendance software; student roster; school notice board | Commercial investigation | Long-tail demo intent. |
| `/work/stockwise/` | inventory management software Nepal | shop stock ledger; stock control; supplier reorder list | Commercial investigation | Long-tail demo intent. |
| `/work/worknest/` | contractor job management software Nepal | job book; dispatch board; invoice tracking for contractors | Commercial investigation | Long-tail demo intent. |
| `/work/serverscope/` | server management dashboard / Linux operations console | server hardening runbook; deployment transcript; incident log | Commercial investigation | Long-tail demo intent. |
| `/about/` | about Yugya / web development studio Nepal | Yugya Technologies; founders; Kapilvastu Rupandehi; engineering principles | Brand / trust | Entity page. |
| `/contact/` | contact web development company Nepal | website development cost Nepal; project enquiry; website quote Nepal | Transactional | Contains the pricing-basis FAQ. |
| `/404.html` | none | — | Error | `noindex`; not a landing page. |

---

## 2. Intent boundaries

### Home vs Services

- `/` answers "who is Yugya and why should I consider them for a website?"
- `/services/` answers "what exactly is delivered, for whom, and what is out of scope?"
- Do not repeat the full service catalogue on the home page beyond the existing capability summary and links.

### Services anchors vs future service pages

- The five service articles currently share `/services/`. This is acceptable because they are substantial and visually distinct.
- A separate page is justified only when it can answer more than the anchor: a full process, deliverables, examples, constraints, FAQs and a distinct search intent. If a new page is created, the anchor should become a short summary linking to it, not a duplicate.
- Until then, internal links should use the anchor URLs (`/services/#domain-dns`) rather than creating thin pages.

### Work vs demo pages

- `/work/` owns the portfolio intent.
- Each `/work/<demo>/` owns one specific business-tool intent and showcases a distinct workflow.
- Demo pages must keep the sample-data disclaimer. They should not claim real client outcomes.

### About vs Contact

- `/about/` owns entity/trust queries: founders, principles, location, how the studio works.
- `/contact/` owns transactional queries: how to start, how pricing works, how to send requirements.
- Do not duplicate the founder biographies on the contact page.

### Contact vs cost article (future)

- `/contact/` owns "how do I contact / how is pricing determined?".
- A future article should own "what changes the cost of a website in Nepal?" with detailed cost drivers, examples and a CTA.
- The article should link to `/contact/`; the contact FAQ should stay short and link to the article if it exists.

---

## 3. Cannibalization rules

1. **One primary keyword per page.** Supporting terms can repeat naturally, but the primary phrase should appear in the title, the first meaningful paragraph and at least one internal link.
2. **No synonym pages.** Do not create separate pages for "web development", "website development" and "website design" unless each has a genuinely different service, process or audience.
3. **No city templates.** Do not create Butwal/Kathmandu/Pokhara/Biratnagar pages with swapped names. Google's doorway-abuse policy covers this. A location page needs real local evidence.
4. **No duplicate FAQs.** The contact FAQ is the canonical FAQ. Future articles can answer a question in depth and link back; they should not copy the same short answer across five pages.
5. **Anchor text should describe the target.** Use "website development services in Nepal" for `/services/#web-development`, not "click here".
6. **Internal links should be contextual.** Link from the home capability rows, footer service list, demo CTAs and article body copy where the reader actually needs the next step.
7. **Canonical host is `https://www.yugya.com`.** All internal absolute URLs must use it. Relative internal links are preferred in the app.

---

## 4. Proposed future URLs (not created)

These are proposals only. Each requires real content, a design that fits the existing system, internal links and a quality review before publication.

| Proposed URL | Primary intent | Why it is not live yet |
| --- | --- | --- |
| `/services/website-development/` | website development Nepal | The `/services/#web-development` section already covers the scope. A separate page needs a fuller process, examples and FAQs. |
| `/services/linux-vps/` | Linux VPS setup Nepal | Same: the anchor is substantial. A dedicated page needs more operational detail and real examples. |
| `/services/domain-dns/` | domain registration and DNS Nepal | A dedicated page could work, but the `.com.np` process must be verified against register.com.np first. |
| `/services/automation/` | business automation Nepal | Needs concrete workflow examples and boundaries. |
| `/services/maintenance/` | website maintenance Nepal | Needs a checklist, response terms and what is excluded. |
| `/blog/` or `/notes/` | editorial hub | No articles exist. Do not create an empty archive. |
| `/blog/website-development-cost-nepal/` | website development cost in Nepal | Needs original cost-driver analysis, no invented prices. |
| `/blog/com-np-domain-registration/` | .com.np domain registration | Needs current registry verification and human review. |
| `/blog/choose-web-developer-nepal/` | how to choose a web developer in Nepal | Needs a genuine checklist based on the studio's handover principles. |
| `/blog/custom-software-vs-ready-made/` | custom software vs ready-made software | Needs real examples from the demos and delivery process. |
| `/blog/ai-automation-nepal/` | practical AI automation for Nepali businesses | Needs accurate, non-hyped workflows and human-review boundaries. |

---

## 5. Internal-link plan for future articles

Every article should include:

- one link to `/services/` or the most relevant service anchor;
- one link to a relevant demo or `/work/`;
- one link to `/contact/` with a clear CTA;
- one link to `/about/` where trust is relevant;
- 1–3 credible external sources for factual claims (for example, register.com.np for `.np` domains, Google Search Central for SEO claims).

Avoid:

- linking every article to every service (link dilution and poor user experience);
- exact-match anchor text repeated unnaturally;
- linking to a page that does not answer the reader's next question.
