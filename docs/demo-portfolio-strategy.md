# Yugya Demo Portfolio — Persuasion and Revenue Strategy

Status: implemented. This document records the research behind the demo portfolio
(`/work/savor/`, `/work/campusflow/`, `/work/stockwise/`, `/work/worknest/`,
`/work/serverscope/`), maps each finding to a concrete interface decision, and states the
revenue model. It exists so future edits keep the intent intact.

---

## 1. Why a demo portfolio at all

The site's positioning is "truth in technical descriptions" — no invented metrics, no
client logos, no unverified claims. That constraint removes the usual persuasion tools
(testimonial social proof, performance statistics) and leaves one honest lever:

**Let visitors operate the software.** A claim ("we build inventory tools") is cheap; a
working tool they just typed a product into is not. The demos convert the portfolio from
assertion into evidence.

---

## 2. Research summary

### 2.1 Ethical persuasion levers (applied)

| Principle | Source | How the demo portfolio applies it |
| --- | --- | --- |
| **Reciprocity** | Cialdini, *Influence* | Full, ungated access: no signup, no email wall, every module usable. The visitor receives a complete working product demo before being asked for anything. |
| **Endowment / psychological ownership** | Kahneman, Knetsch & Thaler (1990); mad-college mug experiments | The visitor *operates* the systems — adds a product, records a sale, marks attendance, moves a task. People value what they feel they own; a demo they have personally changed feels like "their system", raising willingness to discuss the real build. |
| **IKEA effect** | Norton, Mochon & Ariely (2011) | Effort invested in a successful interaction increases valuation of the outcome. Every "try it" tour action is small, guaranteed to succeed, and visibly reflected in derived numbers (stock levels, attendance percentages, board columns). |
| **Commitment and consistency** | Cialdini; foot-in-the-door studies | A ladder of small commitments: open the demo → follow one tour step → try an action → finish the tour → read the module list → send an enquiry. Each step is voluntary and small. |
| **Progress motivation** | Zeigarnik-style open loops; standard SaaS onboarding practice ("step X of N") | The tour shows "Step 2 of 6" and a visible completion state. Unfinished sequences are returned to; a labelled end state ("tour complete") closes the loop at the moment of highest engagement. |
| **Anchoring** | Tversky & Kahneman | Anchor on **scope and capability**, never price. The site publishes no prices; the demos anchor the visitor's reference point on the depth of the working system, so the eventual conversation is about scope ("a system like Stockwise for my shop"), not hourly rates. |
| **Authority (honest form)** | Cialdini | Authority is demonstrated, not claimed: real working software, an interaction-honesty table (what is real / simulated / sample), technical notes per demo. Transparency itself signals competence. |
| **Loss aversion (honest form)** | Kahneman & Tversky | Each demo's problem section names the concrete cost of the status quo (notebook stock counts, phone-call reservations, chat-app task coordination) — a factual description of fragmentation, not a fabricated fear. |

### 2.2 Dark patterns considered and deliberately rejected

The brief asked for research into the "dark psychology" of digital marketing. The findings
are used only as a list of things **not** to do. All of the following were rejected because
they conflict with the site's stated principle of truthful description, carry legal
exposure (FTC "dark patterns" enforcement; EU DSA / consumer-protection rules; UK CMA
work), and would poison a trust-first brand:

| Rejected pattern | Why rejected |
| --- | --- |
| Fake urgency / countdown timers, "only 2 slots left" | Fabricated scarcity = fabricated data. Directly contradicts the no-invented-figures rule. |
| Fake activity counters ("47 people are viewing this") | Invented metric. Also a classic FTC-enforced deception. |
| Confirmshaming ("No thanks, I like losing stock records") | Guilt-based opt-out copy. Contradicts honest tone. |
| Drip pricing / hidden fees | The site sells scope, not prices; nothing is priced online at all. |
| Roach motel / hard exits | The demo exit is one labelled button plus Escape; nothing is hidden or sticky. |
| Privacy zuckering / tracking-based retargeting | The site is static, dependency-audited, and adds no analytics or tracking scripts. Nothing about the visitor is recorded. |
| False social proof (invented logos, testimonials) | Explicitly forbidden by the site's principles. |

One grey-area technique was adapted rather than adopted: **scarcity framing**. The honest
substitute is factual capacity language already used on the site ("response aim 1–2
business days", "direct engineer contact") — real constraints, stated plainly.

### 2.3 Honesty architecture (Type A / B / C interactions)

Every interactive surface is labelled with one of three interaction types, stated on each
intro page and inside the demo chrome:

- **Type A — real in-browser logic.** State actually changes in the visitor's browser:
  adding a product, recording a sale, marking attendance, moving a task, applying a
  hardening checklist item. Derived numbers (inventory value, attendance percentage) are
  genuinely computed from the visitor's actions.
- **Type B — simulated workflows.** Flows that would need a real backend (reservation
  confirmation, deployment logs, invoice generation) are simulated with clearly labelled
  canned sequences. Each is marked "simulated" at the point of use.
- **Type C — sample data.** Values that represent live-system reality (server metrics,
  alert history, staff rosters) are static fictional sample data, labelled as such.

The fixed disclaimer sentence appears on every intro page and in the demo chrome:

> This is an interactive demonstration by Yugya. It uses sample data and simulated
> workflows. It is not connected to a live business system.

---

## 3. Research → interface mapping

| Interface element | Lever served |
| --- | --- |
| Ungated launch button ("Runs in your browser · sample data · no signup") | Reciprocity, competence signal |
| Guided tour auto-starts with a welcome step, "Step X of N" progress, skippable and restartable | Progress motivation, commitment ladder |
| Every tour step invites a small successful action ("Try it: record a sale") | IKEA effect, endowment, self-efficacy |
| Derived numbers update immediately after each action (stock, totals, percentages) | Feedback → perceived control → ownership |
| Tour completion panel appears at peak engagement with a scoped CTA | Commitment consistency, foot-in-the-door |
| Contextual CTA wording per demo ("Discuss a system like Stockwise") | Anchoring on scope; concrete mental model |
| Interaction-honesty tags and disclaimer everywhere | Authority via transparency; risk reversal |
| Problem sections describing fragmented manual status quo | Honest loss aversion |
| Reset button restoring pristine sample data | Endowment (safe to experiment — ownership without risk) |
| No prices anywhere; all CTAs lead to `/contact/?service=…` preselection | Value-first, enquiry-led anchoring |

## 4. Funnel design

```
Visitor
  └─ Home "Explore the demos" section / Work page "Interactive demos" section
       └─ Demo intro page (what/who/problem/solution/modules/disclaimer)
            └─ Launch demo (Type A interactions + guided tour)
                 └─ Tour completion panel
                      └─ Contextual CTA → /contact/?service=web|vps (preselected service)
                           └─ Enquiry email / mailto flow
                                └─ Scoping conversation (scope anchor, then price)
```

Every stage is skippable and reversible (browsers' back button, Exit button, Escape).
Nothing is gated, timed, or tracked.

**Measurement (honest, no tracking scripts):** the site records nothing about visitors.
Effectiveness is measured the way the studio already works — count and quality of enquiries
and ask, in the reply, which demo prompted the contact. If self-hosted with Caddy, aggregate
request counts for `/work/<demo>/` vs `/contact/` from server logs are a sufficient, also
private, signal. (Illustrative only — these numbers are assumptions, not claims: if 5% of
demo launchers reached the contact form and half of those became scoped conversations, the
demos would already outperform a static case-study page; the point of measurement is to
replace "if" with observation.)

## 5. Revenue model

The demos are lead generators for the existing service lines, not products themselves:

1. **Project work (primary).** Each demo maps to a scoped build: Savor → restaurant/
   hospitality websites; CampusFlow → school management tools; Stockwise → inventory
   systems; Worknest → team operations tools; ServerScope → Linux server setup and
   hardening (`?service=vps`). Pricing is discussed in person after scoping — the site
   deliberately anchors on capability, not rate cards.
2. **Maintenance retainers (secondary).** Every demo communicates that systems need
   upkeep (backups, upgrades, hardening); the ServerScope demo makes this explicit and
   links to the VPS service line.
3. **Adjacent services (tertiary).** Domain/DNS and automation needs surface naturally
   during scoping conversations started by a demo.

No prices are published on the site; no revenue figures are claimed anywhere. Anything
numeric in this document is explicitly marked illustrative.

## 6. Guardrails for future edits

- The disclaimer sentence is fixed copy — do not paraphrase it.
- Interaction-type labels must stay accurate: if a flow becomes real, change its label.
- No analytics, cookies, or new runtime dependencies may be added to the demos.
- Sample data stays fictional and isolated in `lib/demos/*.ts` — never inline it into
  components.
- Tours must remain skippable, restartable, keyboard-accessible, and non-blocking.
