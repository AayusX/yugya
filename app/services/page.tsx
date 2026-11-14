import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { ServiceDiagramFigure } from "@/components/ServiceVisual";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_NODES, webPageNode } from "@/lib/schema";

const SERVICES_TITLE = "Web Development & Software Services in Nepal — Yugya";
const SERVICES_DESCRIPTION =
  "Explore Yugya's service scopes: website and web app development, Linux VPS setup, .np domain and DNS guidance, business automation, and ongoing maintenance in Nepal.";

export const metadata = pageMetadata({
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  path: "/services/",
  ogDescription:
    "Itemized technology services with defined deliverables, honest constraints, and clear handover terms.",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      path: "/services/",
      name: SERVICES_TITLE,
      description: SERVICES_DESCRIPTION,
      type: "CollectionPage",
    }),
    ...SERVICE_NODES,
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="hero-kicker">Service offerings &amp; scopes</span>
              <h1>Defined capabilities, itemized deliverables.</h1>
              <p className="lead">
                Every Yugya engagement is structured around an explicit operational requirement, a
                concrete deliverable, and documented handover.
              </p>
              <p className="page-note">
                Below is a breakdown of what we build, who it is for, what the deliverable
                includes, and what happens once the project is shipped.
              </p>
            </div>

            <div className="page-aside">
              <h2>On this page</h2>
              <ul>
                <li><span className="num">01</span><a href="#web-development">Website &amp; web app development</a></li>
                <li><span className="num">02</span><a href="#server-infrastructure">Linux server setup &amp; deployment</a></li>
                <li><span className="num">03</span><a href="#domain-dns">Domain guidance &amp; DNS</a></li>
                <li><span className="num">04</span><a href="#automation">Business automation &amp; tooling</a></li>
                <li><span className="num">05</span><a href="#maintenance">Ongoing maintenance</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="service-layout">
            <aside className="service-rail" aria-label="Service sections">
              <p className="rail-label">Services</p>
              <ul>
                <li><a href="#web-development"><span className="num">01</span>Web development</a></li>
                <li><a href="#server-infrastructure"><span className="num">02</span>Server infrastructure</a></li>
                <li><a href="#domain-dns"><span className="num">03</span>Domain &amp; DNS</a></li>
                <li><a href="#automation"><span className="num">04</span>Automation</a></li>
                <li><a href="#maintenance"><span className="num">05</span>Maintenance</a></li>
              </ul>
              <p className="service-note" style={{ display: "block", border: 0, paddingTop: "1.25rem" }}>
                <Link className="text-link" href="/contact/">
                  Discuss a scope <span className="arrow" aria-hidden="true">↗</span>
                </Link>
              </p>
            </aside>

            <div>
              <article className="service reveal" id="web-development">
                <div className="service-head">
                  <span className="num" aria-hidden="true">01</span>
                  <div>
                    <h2>Website &amp; web application development</h2>
                    <span className="service-status">Available offering</span>
                  </div>
                </div>
                <figure className="service-visual reveal">
                  <div className="service-visual-frame">
                    <img
                      src="/assets/projects/aama-desktop.webp"
                      alt="Aama Pathshala bilingual preschool website home page showing the school hero, logo and admissions buttons"
                      width={1440}
                      height={900}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <span>Live build — Aama Pathshala</span>
                    <span>Desktop screenshot · Nov 2026</span>
                  </figcaption>
                </figure>
                <div className="service-body">
                  <div>
                    <h3>What it is &amp; who needs it</h3>
                    <p>
                      Custom web development for businesses, schools, and organizations that need a
                      clear digital front door or interactive web tool. Suited for teams needing a
                      website that is straightforward to navigate, loads reliably on mobile
                      screens, and does not require complex proprietary hosting.
                    </p>
                    <h3>The problem it solves</h3>
                    <p>
                      Many websites become bloated with unnecessary third-party plugins, scripts,
                      and heavy frameworks that slow down browsing and make future edits
                      difficult. We build clean, lightweight sites that prioritize readability,
                      fast loading, and direct contact options.
                    </p>
                  </div>
                  <div>
                    <h3>What the deliverable includes</h3>
                    <ul className="deliverables">
                      <li>Semantic HTML5, CSS3, and JavaScript codebase without unnecessary dependencies</li>
                      <li>Responsive layouts tested across mobile, tablet, laptop, and desktop viewports</li>
                      <li>Bilingual architecture support (e.g. English + Nepali toggles) where required</li>
                      <li>Accessible structure: logical heading hierarchy, form labels, and visible keyboard focus states</li>
                      <li>Technical metadata setup: canonical URLs, OpenGraph tags, and Schema.org JSON-LD</li>
                      <li>Complete Git repository and asset files handed over to your team</li>
                    </ul>
                  </div>
                </div>
                <div className="service-note">
                  <p>
                    <strong>After delivery:</strong> We assist with deployment to your production
                    server or static hosting platform, provide a written guide on how to update
                    content, and include 30 calendar days of bug fixing support.
                  </p>
                  <Link className="text-link" href="/contact/?service=web">
                    Enquire about web development <span className="arrow" aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>

              <article className="service reveal" id="server-infrastructure">
                <div className="service-head">
                  <span className="num" aria-hidden="true">02</span>
                  <div>
                    <h2>Linux server setup, VPS &amp; deployment pipelines</h2>
                    <span className="service-status">Available offering</span>
                  </div>
                </div>
                <ServiceDiagramFigure
                  variant="server"
                  caption="Reference architecture — documented VPS baseline"
                  note="Not a live status report"
                />
                <div className="service-body">
                  <div>
                    <h3>What it is &amp; who needs it</h3>
                    <p>
                      Configuring and securing Linux virtual private servers (VPS) on cloud
                      providers such as DigitalOcean, Linode, Hetzner, or AWS. Ideal for teams
                      moving away from shared hosting who need dedicated resources, stability, and
                      control.
                    </p>
                    <h3>The problem it solves</h3>
                    <p>
                      Default cloud server installations typically leave root password
                      authentication enabled and firewalls disabled. We set up a documented,
                      secure Linux environment with proper access controls and automated deployment
                      hooks.
                    </p>
                  </div>
                  <div>
                    <h3>What the deliverable includes</h3>
                    <ul className="deliverables">
                      <li>OS provisioning (Ubuntu LTS or Debian) with dedicated non-root user and SSH key authentication</li>
                      <li>UFW firewall configuration and Fail2ban intrusion prevention rules</li>
                      <li>Reverse proxy (Caddy or Nginx) with automated Let&apos;s Encrypt TLS/SSL certificates</li>
                      <li>Automated deployment pipeline using Git hooks or GitHub Actions CI/CD</li>
                      <li>Systemd service configuration for automated process management and crash restarts</li>
                      <li>Documented server runbook and backup routine instructions</li>
                    </ul>
                  </div>
                </div>
                <div className="service-note">
                  <p>
                    <strong>After delivery:</strong> All SSH keys, server passwords, and cloud
                    dashboard accesses remain under your direct control. We deliver a Markdown
                    runbook explaining how to restart services, view system logs, and inspect
                    status.
                  </p>
                  <Link className="text-link" href="/contact/?service=vps">
                    Enquire about server infrastructure <span className="arrow" aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>

              <article className="service reveal" id="domain-dns">
                <div className="service-head">
                  <span className="num" aria-hidden="true">03</span>
                  <div>
                    <h2>Domain guidance &amp; DNS architecture</h2>
                    <span className="service-status">Available offering</span>
                  </div>
                </div>
                <ServiceDiagramFigure
                  variant="dns"
                  caption="DNS and email routing overview"
                  note="Records documented at handover"
                />
                <div className="service-body">
                  <div>
                    <h3>What it is &amp; who needs it</h3>
                    <p>
                      Assistance with preparing national ccTLD documentation (specifically Nepal&apos;s
                      official <code>.np</code> domains), purchasing commercial domains (
                      <code>.com</code>, <code>.org</code>), and setting up reliable DNS routing.
                    </p>
                    <h3>The problem it solves</h3>
                    <p>
                      In Nepal, registering a free <code>.com.np</code> domain requires specific
                      company registration paperwork and formal cover letters that are often
                      delayed or rejected if formatted incorrectly. In addition, missing or
                      misconfigured email records (SPF, DKIM, DMARC) cause legitimate emails to end
                      up in spam.
                    </p>
                  </div>
                  <div>
                    <h3>What the deliverable includes</h3>
                    <ul className="deliverables">
                      <li>Official Nepal <code>.np</code> application paperwork audit and cover letter preparation</li>
                      <li>DNS routing configuration on Cloudflare or provider of choice with DNSSEC support</li>
                      <li>Email authentication records: MX, SPF, DKIM, and DMARC for Google Workspace, Zoho, or private mail</li>
                      <li>Subdomain mapping for web applications, staging environments, and APIs</li>
                      <li>Documentation of all active DNS records for future reference</li>
                    </ul>
                  </div>
                </div>
                <div className="service-note">
                  <p>
                    <strong>After delivery:</strong> Your domain account remains in your legal
                    ownership. We deliver an export of all configured DNS records and configuration
                    steps so any developer can maintain them.
                  </p>
                  <Link className="text-link" href="/contact/?service=dns">
                    Enquire about domain &amp; DNS <span className="arrow" aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>

              <article className="service reveal" id="automation">
                <div className="service-head">
                  <span className="num" aria-hidden="true">04</span>
                  <div>
                    <h2>Business automation &amp; custom tooling</h2>
                    <span className="service-status">Scoped engagement</span>
                  </div>
                </div>
                <ServiceDiagramFigure
                  variant="automation"
                  caption="Documented automation pattern"
                  note="Human review where the outcome matters"
                />
                <div className="service-body">
                  <div>
                    <h3>What it is &amp; who needs it</h3>
                    <p>
                      Lightweight scripts, automated data processing routines, and utility tools
                      written in Python or Node.js. For teams that spend time manually re-entering
                      or copying data across spreadsheets, forms, or messaging channels.
                    </p>
                    <h3>The problem it solves</h3>
                    <p>
                      Repetitive manual data entry is slow and prone to typographical errors. We
                      write straightforward, well-documented scripts to automate these tasks with
                      clear logging.
                    </p>
                  </div>
                  <div>
                    <h3>What the deliverable includes</h3>
                    <ul className="deliverables">
                      <li>Workflow discovery: documenting inputs, transformation rules, and output requirements</li>
                      <li>Standalone Python or Node.js script with error handling and logging</li>
                      <li>Local SQLite or CSV export pipeline for structured storage</li>
                      <li>Automated alert mechanism (webhook or email notification) upon error or completion</li>
                      <li>Clear instruction manual and cron schedule instructions for running the script</li>
                    </ul>
                  </div>
                </div>
                <div className="service-note">
                  <p>
                    <strong>After delivery:</strong> We verify sample runs together with your team,
                    demonstrate how error handling works, and document how to update parameters as
                    business requirements change.
                  </p>
                  <Link className="text-link" href="/contact/?service=automation">
                    Enquire about custom automation <span className="arrow" aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>

              <article className="service reveal" id="maintenance">
                <div className="service-head">
                  <span className="num" aria-hidden="true">05</span>
                  <div>
                    <h2>Ongoing maintenance &amp; technical care</h2>
                    <span className="service-status">Available offering</span>
                  </div>
                </div>
                <ServiceDiagramFigure
                  variant="maintenance"
                  caption="Monthly maintenance routine"
                  note="Findings documented each cycle"
                />
                <div className="service-body">
                  <div>
                    <h3>What it is &amp; who needs it</h3>
                    <p>
                      Monthly operational checkups and maintenance for deployed websites and
                      servers. For organizations without full-time in-house engineering staff that
                      need someone dependable to keep their systems updated.
                    </p>
                    <h3>The problem it solves</h3>
                    <p>
                      Deployed websites require occasional updates: security package upgrades, SSL
                      certificate checks, and routine backups. We provide scheduled upkeep so
                      systems remain operational.
                    </p>
                  </div>
                  <div>
                    <h3>What the deliverable includes</h3>
                    <ul className="deliverables">
                      <li>Monthly server OS security patching and package updates</li>
                      <li>SSL certificate status verification and DNS monitoring</li>
                      <li>Database and asset backup verification</li>
                      <li>Minor text updates and broken link fixes</li>
                      <li>Direct email contact with an engineer for technical issues</li>
                    </ul>
                  </div>
                </div>
                <div className="service-note">
                  <p>
                    <strong>After delivery:</strong> At the end of each billing cycle, you receive a
                    concise summary report outlining maintenance actions taken and system health
                    status.
                  </p>
                  <Link className="text-link" href="/contact/?service=maintenance">
                    Enquire about monthly maintenance <span className="arrow" aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="boundaries-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">06</span>
            <div>
              <h2 id="boundaries-title">Clear scopes: confirmed, custom, and out-of-scope.</h2>
              <p>
                Below is a transparent distinction between services we actively deliver, custom
                engagements that require scoping, and services that are outside our scope.
              </p>
            </div>
          </div>

          <p className="table-hint">
            Swipe the table sideways to see every column <span aria-hidden="true">→</span>
          </p>

          <div
            className="table-wrap reveal"
            role="region"
            aria-label="Service scopes table"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "28%" }}>Service offering</th>
                  <th scope="col" style={{ width: "22%" }}>Status</th>
                  <th scope="col">Delivery scope</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Custom website development</strong></td>
                  <td><span className="status">Available</span></td>
                  <td>Semantic HTML/CSS/JS, bilingual language toggle, responsive layout, performance optimization.</td>
                </tr>
                <tr>
                  <td><strong>Linux server setup &amp; VPS hardening</strong></td>
                  <td><span className="status">Available</span></td>
                  <td>Ubuntu/Debian VPS, UFW firewall, SSH key auth, Caddy/Nginx proxy, Let&apos;s Encrypt TLS, CI/CD deploys.</td>
                </tr>
                <tr>
                  <td><strong>Nepal .np &amp; commercial DNS setup</strong></td>
                  <td><span className="status">Available</span></td>
                  <td>Paperwork dossier prep, Cloudflare routing, SPF/DKIM/DMARC mail records, DNSSEC configuration.</td>
                </tr>
                <tr>
                  <td><strong>Scheduled technical maintenance</strong></td>
                  <td><span className="status">Available</span></td>
                  <td>Monthly security patches, backup verification, link checks, minor content adjustments.</td>
                </tr>
                <tr>
                  <td><strong>Custom automation &amp; scripts</strong></td>
                  <td><span className="status status-scoped">Scoped engagement</span></td>
                  <td>Requires discovery review to assess input data sources, API constraints, and error scenarios.</td>
                </tr>
                <tr>
                  <td><strong>Shared cPanel hosting reselling</strong></td>
                  <td><span className="status status-out">Out of scope</span></td>
                  <td>We do not resell shared web hosting. We configure dedicated cloud VPS instances that you own directly.</td>
                </tr>
                <tr>
                  <td><strong>24/7 telephone call centers</strong></td>
                  <td><span className="status status-out">Out of scope</span></td>
                  <td>We provide direct email and messaging communication during business hours, not an automated call center.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section cta" aria-labelledby="services-cta-title">
        <div className="shell">
          <div className="cta-grid">
            <div>
              <h2 id="services-cta-title">Need help defining your project scope?</h2>
              <p>
                Tell us about what you want to build and your current setup. We will recommend a
                practical, realistic approach.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact/">
                  Start a project enquiry <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-secondary" href="/work/">
                  Review project case studies
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
