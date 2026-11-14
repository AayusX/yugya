import Link from "next/link";
import DemoIndex from "@/components/DemoIndex";
import FounderCards from "@/components/FounderCards";
import JsonLd from "@/components/JsonLd";
import { LiveProjectIndex } from "@/components/LiveProjects";
import { pageMetadata } from "@/lib/metadata";
import { webPageNode } from "@/lib/schema";
import { FOUNDER_NAMES, YUGS_URL } from "@/lib/site";
import "@/components/demos/demos.css";
import "@/components/yugs.css";

const HOME_TITLE = "Yugya — Web Development Company in Nepal";
const HOME_DESCRIPTION =
  "Yugya is a web development company in Nepal building fast, accessible websites, custom web applications, and Linux server infrastructure for organizations that need dependable systems.";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  ogDescription:
    "Websites, web applications, Linux server setup, and technical maintenance from an independent technology studio in Nepal.",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      path: "/",
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
    }),
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <main id="main">
      <section className="home-hero">
        <div className="shell">
          <div className="hero-grid">
            <div className="hero-copy reveal">
              <span className="hero-kicker">Independent technology studio — Nepal</span>
              <h1>
                Technology built for the <em>work that matters.</em>
              </h1>
              <p className="lead hero-lead">
                Yugya builds websites, software tools, and dependable digital systems for
                businesses and individuals who need technology to work properly.
              </p>
              <p className="hero-note">
                We prioritize simplicity, clean implementation, and direct technical handover.
                Every project is scoped around concrete operational requirements.
              </p>

              <div className="hero-actions">
                <Link className="btn btn-primary" href="/services/">
                  Explore services <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-secondary" href="/work/">
                  View project case studies
                </Link>
              </div>
            </div>

            <figure className="brand-sign reveal">
              <div className="brand-sign-screen">
                <picture>
                  <source media="(prefers-reduced-motion: reduce)" srcSet="/assets/brand/yugya-poster.png" />
                  <source type="image/webp" srcSet="/assets/brand/yugya-logo-anim.webp" />
                  <img
                    src="/assets/brand/yugya-logo.gif"
                    alt="Yugya animated wordmark"
                    width={480}
                    height={270}
                  />
                </picture>
              </div>
              <figcaption>
                <span>Official brand animation</span>
                <span>Yugya / studio mark</span>
              </figcaption>
            </figure>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>Core approach</dt>
              <dd>Simplicity &amp; maintainability</dd>
            </div>
            <div>
              <dt>Primary technologies</dt>
              <dd>HTML5, CSS3, JS, Python, Linux, Caddy</dd>
            </div>
            <div>
              <dt>System handover</dt>
              <dd>Direct code &amp; server access</dd>
            </div>
            <div>
              <dt>Inquiry response</dt>
              <dd>Aim to reply in 1–2 business days</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section section-dark yugs-launch" id="yugs" aria-labelledby="yugs-title">
        <div className="shell">
          <div className="yugs-meta">
            <span className="yugs-flag">
              <span className="yugs-flag-dot" aria-hidden="true" />
              New product
            </span>
            <span>Yugs Bot — AI assistant</span>
            <span className="yugs-meta-by">Yugya Technologies</span>
          </div>

          <div className="yugs-stage">
            <figure className="yugs-mark reveal">
              <div className="yugs-mark-frame">
                <img
                  src="/assets/brand/yugs-neon-robot.png"
                  alt="Yugs neon robot product mark"
                  width={1254}
                  height={1254}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>Product mark</span>
                <span>Yugs Bot</span>
              </figcaption>
            </figure>

            <div className="yugs-copy reveal">
              <span className="hero-kicker">Introducing</span>
              <h2 className="yugs-name" id="yugs-title">
                Yugs<span className="yugs-name-dot" aria-hidden="true">.</span>
              </h2>
              <p className="yugs-tagline">
                Chat, create artifacts, and get things done faster.
              </p>
              <p className="yugs-body">
                Yugs is the AI assistant built by Yugya Technologies — our own product, built and
                maintained in-house, and open to anyone with a free account.
              </p>
              <div className="hero-actions">
                <a
                  className="btn btn-primary"
                  href={YUGS_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open Yugs <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <a
                  className="btn btn-secondary"
                  href={`${YUGS_URL}register`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Create an account
                </a>
              </div>
            </div>
          </div>

          <dl className="yugs-facts">
            <div>
              <dt>Product</dt>
              <dd>Yugs Bot</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>AI assistant / web app</dd>
            </div>
            <div>
              <dt>Built by</dt>
              <dd>Yugya Technologies</dd>
            </div>
            <div>
              <dt>Access</dt>
              <dd>Free sign-up</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="capabilities-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">01</span>
            <div>
              <h2 id="capabilities-title">What Yugya builds and maintains.</h2>
              <p>
                We focus on practical technical execution rather than generic consulting. These
                are the core services we deliver directly.
              </p>
            </div>
          </div>

          <div className="capability-list">
            <Link className="capability-row reveal" href="/services/#web-development">
              <span className="num">01</span>
              <h3>Website &amp; web app development</h3>
              <p>
                Responsive websites and web applications built with semantic HTML, clean styling,
                and minimal script weight.
              </p>
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <Link className="capability-row reveal" href="/services/#server-infrastructure">
              <span className="num">02</span>
              <h3>Linux server setup &amp; deployment</h3>
              <p>
                Documented server baselines, UFW firewall rules, Caddy or Nginx reverse proxies,
                and Git-based deployment.
              </p>
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <Link className="capability-row reveal" href="/services/#domain-dns">
              <span className="num">03</span>
              <h3>Domain &amp; DNS guidance</h3>
              <p>
                Nepal <code>.np</code> application paperwork assistance, commercial TLD setup, and
                Cloudflare DNS routing.
              </p>
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <Link className="capability-row reveal" href="/services/#automation">
              <span className="num">04</span>
              <h3>Business automation &amp; tooling</h3>
              <p>
                Lightweight Python or Node.js scripts that replace repetitive manual data work
                with documented, logged routines.
              </p>
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <Link className="capability-row reveal" href="/services/#maintenance">
              <span className="num">05</span>
              <h3>Ongoing maintenance</h3>
              <p>
                Scheduled OS package upgrades, TLS renewal checks, backup verification, and direct
                engineer contact.
              </p>
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="live-work-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">Live client work</span>
              <h2 id="live-work-title">Websites in production.</h2>
            </div>
            <Link className="text-link" href="/work/#live-projects">
              View live projects <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
          <p style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
            Real client websites, live on their own domains. Each project is shown at the same
            scale, with no featured slot.
          </p>
          <LiveProjectIndex />
        </div>
      </section>

      <section className="section" aria-labelledby="demo-index-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">Interactive demonstrations</span>
              <h2 id="demo-index-title">Operate our work in your browser.</h2>
            </div>
            <Link className="text-link" href="/work/#demos">
              All demos <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
          <p style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
            Five demonstration builds run directly in this page: a restaurant website, a
            school tool, an inventory tracker, a team board, and a server console. Each uses
            fictional sample data, includes a skippable guided tour, and labels every workflow
            honestly as real in-browser logic, a simulated workflow, or sample data.
          </p>
          <DemoIndex />
        </div>
      </section>

      <section className="section section-dark manifesto" aria-labelledby="manifesto-title">
        <div className="shell">
          <svg
            className="ribbon-rule"
            viewBox="0 0 1200 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path d="M0 31C150 31 168 9 320 9s170 22 320 22 168-22 320-22 170 22 240 22" />
            <path d="M0 21C150 21 168 0 320 0s170 21 320 21 168-21 320-21 170 21 240 21" opacity=".55" />
          </svg>

          <div className="manifesto-grid">
            <div>
              <h2 id="manifesto-title" className="visually-hidden">How we work</h2>
              <blockquote>
                Clear requirements. <em>Clean code.</em> Direct handover.
              </blockquote>
              <p className="manifesto-note">
                Yugya was started in Nepal to deliver practical digital systems: websites,
                software tools, and server infrastructure built with care and documented for
                long-term use. We work directly with clients through every phase of a project.
              </p>
            </div>

            <div className="principle-list">
              <div className="principle">
                <span className="num">01</span>
                <div>
                  <h3>Clarity before implementation</h3>
                  <p>Goals, constraints, and handover expectations are defined before code is written.</p>
                </div>
              </div>
              <div className="principle">
                <span className="num">02</span>
                <div>
                  <h3>Proven tools over trend chasing</h3>
                  <p>Established, documented tools are preferred over complex stacks that add upkeep.</p>
                </div>
              </div>
              <div className="principle">
                <span className="num">03</span>
                <div>
                  <h3>Transparent system handover</h3>
                  <p>Repositories, domain settings, and server credentials go directly to the client.</p>
                </div>
              </div>
              <div className="principle">
                <span className="num">04</span>
                <div>
                  <h3>Truth in technical descriptions</h3>
                  <p>No invented statistics, unverified client logos, or unsupported performance claims.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">02</span>
            <div>
              <h2 id="process-title">A straightforward, four-stage delivery process.</h2>
              <p>
                Every engagement follows a structured progression from initial requirements
                definition to verified production handover.
              </p>
            </div>
          </div>

          <div className="process-grid">
            <div className="process-step reveal">
              <span className="num" aria-hidden="true">01</span>
              <h3>Discovery &amp; scoping</h3>
              <p>
                We clarify project goals, target audience, technical constraints, and deadlines
                upfront. We discuss what is achievable and what is out of scope.
              </p>
            </div>
            <div className="process-step reveal">
              <span className="num" aria-hidden="true">02</span>
              <h3>Architecture &amp; design</h3>
              <p>
                We define the simplest, most durable architecture. Content hierarchy, wireframes,
                and data structures are agreed upon before code is written.
              </p>
            </div>
            <div className="process-step reveal">
              <span className="num" aria-hidden="true">03</span>
              <h3>Phased build &amp; audits</h3>
              <p>
                Implementation proceeds in clear milestones. Code is checked for accessibility,
                responsive mobile layouts, and clean markup.
              </p>
            </div>
            <div className="process-step reveal">
              <span className="num" aria-hidden="true">04</span>
              <h3>Verification &amp; handover</h3>
              <p>
                Deployment to production. You receive full repository access, server
                documentation, access credentials, and 30 days of post-launch bug fixing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="studio-title">
        <div className="shell">
          <div className="studio-grid">
            <figure className="logo-plate reveal">
              <picture>
                <source type="image/webp" srcSet="/assets/brand/yugya-logo.webp" />
                <img
                  src="/assets/brand/yugya-logo.png"
                  alt="Yugya logo with wordmark and tagline"
                  width={670}
                  height={535}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <figcaption>
                <span>Official lockup</span>
                <span>Static / full tagline</span>
              </figcaption>
            </figure>

            <div className="studio-copy reveal">
              <span className="hero-kicker">The studio</span>
              <h2 id="studio-title">Founded in Nepal. Focused on dependable execution.</h2>
              <p>
                Yugya is an independent technology studio. We build websites, software tools, and
                server setups for organizations that need technology to run reliably.
              </p>
              <p>
                Our focus is on clear requirements, clean code, direct communication, and handover
                of systems that clients can operate independently.
              </p>
              <dl className="studio-list">
                <div>
                  <dt>Based in</dt>
                  <dd>Kapilvastu / Rupandehi, Nepal · UTC +5:45</dd>
                </div>
                <div>
                  <dt>Working with</dt>
                  <dd>Local organizations in Nepal and remote clients</dd>
                </div>
                <div>
                  <dt>Direct contact</dt>
                  <dd><a href="mailto:hello@yugya.com">hello@yugya.com</a></dd>
                </div>
                <div>
                  <dt>Founders</dt>
                  <dd>
                    <Link href="/about/#founders">{FOUNDER_NAMES}</Link>
                  </dd>
                </div>
                <div>
                  <dt>Response aim</dt>
                  <dd>1–2 business days</dd>
                </div>
              </dl>
              <div className="hero-actions">
                <Link className="btn btn-secondary" href="/about/">
                  About the studio <span className="arrow" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="founders" aria-labelledby="home-founders-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">03</span>
            <div>
              <h2 id="home-founders-title">The two people behind the studio.</h2>
              <p>
                Yugya was founded by {FOUNDER_NAMES}. Project enquiries can go to either
                co-founder directly.
              </p>
            </div>
          </div>
          <FounderCards />
        </div>
      </section>

      <section className="section cta" aria-labelledby="cta-title">
        <div className="shell">
          <div className="cta-grid">
            <div>
              <h2 id="cta-title">Have a project or technical requirement in mind?</h2>
              <p>
                Whether you need a website built from scratch, a Linux server configured, or domain
                and DNS guidance, we are ready to discuss your requirements.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact/">
                  Send a project enquiry <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <a className="btn btn-secondary" href="mailto:hello@yugya.com">
                  Email hello@yugya.com
                </a>
              </div>
            </div>
            <dl className="cta-aside">
              <dt>Direct email</dt>
              <dd><a href="mailto:hello@yugya.com">hello@yugya.com</a></dd>
              <dt>Response aim</dt>
              <dd>1–2 business days</dd>
              <dt>Location</dt>
              <dd>Nepal · UTC +5:45</dd>
            </dl>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
