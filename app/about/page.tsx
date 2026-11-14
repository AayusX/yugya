import Link from "next/link";
import FounderCards from "@/components/FounderCards";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { webPageNode } from "@/lib/schema";
import { FOUNDER_NAMES } from "@/lib/site";

const ABOUT_TITLE = "About Yugya — Web Development Studio in Nepal";
const ABOUT_DESCRIPTION =
  "Learn how Yugya works: an independent web development studio in Kapilvastu / Rupandehi, Nepal, focused on clear scoping, clean code, and documented handover.";

export const metadata = pageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about/",
  ogDescription:
    "Founded in Nepal to deliver dependable websites, software, and server infrastructure.",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      path: "/about/",
      name: ABOUT_TITLE,
      description: ABOUT_DESCRIPTION,
      type: "AboutPage",
    }),
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="hero-kicker">About Yugya</span>
              <h1>Practical engineering for real requirements.</h1>
              <p className="lead">
                Yugya is an independent technology studio founded in Nepal. We build websites,
                software tools, and server setups for organizations that need technology to run
                reliably.
              </p>
              <p className="page-note">
                Our focus is on clear requirements, clean code, direct communication, and handover
                of systems that clients can operate independently.
              </p>
            </div>

            <figure className="logo-plate">
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
          </div>
        </div>
      </section>

      <section className="section" id="approach">
        <div className="shell">
          <div className="about-grid">
            <div>
              <span className="hero-kicker">Company purpose</span>
              <h2 className="about-statement">Technology that serves the task at hand.</h2>
            </div>
            <div>
              <p className="lead">
                Yugya was started in Nepal with a simple direction: to provide dependable technical
                work for businesses, educational institutions, and organizations that need clear
                digital execution.
              </p>
              <p>
                Many organizations struggle with web systems that are overly complicated, difficult
                to maintain, or dependent on expensive ongoing vendor lock-in. We focus on
                practical solutions: static and server-rendered websites with lean code, documented
                Linux servers, and straightforward automation scripts.
              </p>
              <p>
                We work directly with clients through every phase of a project, from clarifying
                requirements to final deployment and handover.
              </p>

              <dl className="ledger-note">
                <div>
                  <dt>Focus</dt>
                  <dd>Websites, tools &amp; server systems</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>Nepal · UTC +5:45</dd>
                </div>
                <div>
                  <dt>Engagement</dt>
                  <dd>Local and remote projects</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="principles">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">01</span>
            <div>
              <h2>Standards that guide our technical delivery.</h2>
              <p>
                These principles determine how we evaluate project requirements, write code,
                configure servers, and support clients after launch.
              </p>
            </div>
          </div>

          <div className="principle-list-large">
            <div className="principle-row reveal">
              <span className="num" aria-hidden="true">01</span>
              <h3>Clarity before implementation</h3>
              <p>
                We define project goals, user requirements, technical constraints, and handover
                expectations before writing code. This prevents misunderstandings and unnecessary
                rework.
              </p>
            </div>
            <div className="principle-row reveal">
              <span className="num" aria-hidden="true">02</span>
              <h3>Proven tools over trend chasing</h3>
              <p>
                We choose tools with established stability and documentation. We avoid complex
                software stacks when simpler, battle-tested solutions meet the operational need.
              </p>
            </div>
            <div className="principle-row reveal">
              <span className="num" aria-hidden="true">03</span>
              <h3>Transparent system handover</h3>
              <p>
                Source code repositories, domain settings, and server credentials are provided
                directly to the client. Systems are documented so any competent developer can
                maintain them.
              </p>
            </div>
            <div className="principle-row reveal">
              <span className="num" aria-hidden="true">04</span>
              <h3>Truth in technical descriptions</h3>
              <p>
                We describe our capabilities, tools, and testing procedures accurately. We do not
                invent statistics, publish unverified client logos, or make unsupported performance
                claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="founders" aria-labelledby="founders-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">02</span>
            <div>
              <h2 id="founders-title">The two people behind the studio.</h2>
              <p>
                Yugya was founded by {FOUNDER_NAMES}. Project enquiries can go to either
                co-founder directly.
              </p>
            </div>
          </div>

          <FounderCards />
        </div>
      </section>

      <section className="section" aria-labelledby="location-title">
        <div className="shell">
          <div className="about-grid">
            <div>
              <span className="hero-kicker">Location &amp; collaboration</span>
              <h2 id="location-title">Where we operate &amp; how we communicate.</h2>
            </div>
            <div>
              <p>
                Yugya is based in Kapilvastu / Rupandehi, Nepal (UTC +5:45). We work with local
                organizations in Nepal as well as remote clients.
              </p>
              <p>
                We collaborate using version-controlled repositories, clear milestones, written
                documentation, and direct email or messaging. Clients communicate directly with the
                engineer working on their project.
              </p>

              <div className="location-panel">
                <div>
                  <span className="label">Primary contact email</span>
                  <p style={{ marginTop: "0.35rem" }}>
                    <a href="mailto:hello@yugya.com">hello@yugya.com</a>
                  </p>
                </div>
                <Link className="btn btn-secondary" href="/contact/">
                  Send an enquiry <span className="arrow" aria-hidden="true">↗</span>
                </Link>
              </div>

              <dl className="ledger-note">
                <div>
                  <dt>Working hours</dt>
                  <dd>Business hours, UTC +5:45</dd>
                </div>
                <div>
                  <dt>Response aim</dt>
                  <dd>1–2 business days</dd>
                </div>
                <div>
                  <dt>Communication</dt>
                  <dd>Direct email &amp; written notes</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta" aria-labelledby="about-cta-title">
        <div className="shell">
          <div className="cta-grid">
            <div>
              <h2 id="about-cta-title">Looking for practical technical execution?</h2>
              <p>
                We are ready to review your project requirements, website plans, or server needs and
                provide an honest assessment of scope and next steps.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact/">
                  Discuss your requirements <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-secondary" href="/work/">
                  View project case studies
                </Link>
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
