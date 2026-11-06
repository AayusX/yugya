import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { FOUNDER_NAMES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Yugya — Technology built for the work that matters",
  description:
    "Yugya is an independent technology studio in Nepal building websites, software tools, Linux server configurations, and dependable digital systems.",
  path: "/",
  ogDescription:
    "Websites, software tools, Linux server configuration, and technical maintenance from an independent studio in Nepal.",
});

export default function HomePage() {
  return (
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

      <section className="section section-soft" aria-labelledby="featured-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">Selected work / 01</span>
              <h2 id="featured-title">A completed build, shown plainly.</h2>
            </div>
            <Link className="text-link" href="/work/">
              All projects <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="featured-project">
            <Link className="work-plate reveal" href="/work/#aama-pathshala">
              <div className="work-plate-frame">
                <img
                  src="/aama-pathshala.jpg"
                  alt="Aama Pathshala preschool website interface showing facilities and contact points"
                  width={1160}
                  height={652}
                />
              </div>
              <div className="work-plate-caption">
                <span>Aama Pathshala / website</span>
                <span>Completed web build</span>
              </div>
            </Link>

            <div className="project-copy reveal">
              <p className="project-meta">Education / bilingual interface</p>
              <h3>Aama Pathshala — a bilingual preschool website.</h3>
              <p>
                A responsive website built for a preschool in Nepal. The site provides school
                facility details, bus route information, and contact links in both English and
                Nepali.
              </p>
              <ul className="project-facts">
                <li><span>Project type</span><span>Educational website build</span></li>
                <li><span>Stack</span><span>HTML5, CSS3, vanilla JS</span></li>
                <li><span>Key feature</span><span>In-page EN / NP toggle</span></li>
                <li><span>Status</span><span>Completed build</span></li>
              </ul>
              <Link className="text-link" href="/work/#aama-pathshala">
                Read project notes <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
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
  );
}
