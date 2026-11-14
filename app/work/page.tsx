import Link from "next/link";
import DemoIndex from "@/components/DemoIndex";
import JsonLd from "@/components/JsonLd";
import { LiveProjectEntries } from "@/components/LiveProjects";
import { pageMetadata } from "@/lib/metadata";
import { webPageNode } from "@/lib/schema";
import "@/components/demos/demos.css";

const WORK_TITLE = "Web Development Portfolio & Projects — Yugya";
const WORK_DESCRIPTION =
  "See live client websites and technical implementations by Yugya, including Kohinoor Restaurant, Samajik Abhiyaan, Aama Pathshala, a Linux server baseline, and interactive demos.";

export const metadata = pageMetadata({
  title: WORK_TITLE,
  description: WORK_DESCRIPTION,
  path: "/work/",
  ogDescription:
    "Live client websites, reference architectures, and interactive software demonstrations.",
});

const workJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      path: "/work/",
      name: WORK_TITLE,
      description: WORK_DESCRIPTION,
      type: "CollectionPage",
    }),
  ],
};

const caddyfile = `yugya.com, www.yugya.com {
    root * /var/www/yugya
    file_server
    encode zstd gzip
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}`;

const prototypeOutput = `$ aayushai --status
[SQLite]  Database: ~/.aayushai/memory.db (connected)
[Records] Structured notes and task reminders loaded.
[Execution] Local CLI process running on host machine.`;

export default function WorkPage() {
  return (
    <>
      <JsonLd data={workJsonLd} />
      <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="hero-kicker">Live client work, builds &amp; prototypes</span>
              <h1>Live client work and demonstrated builds.</h1>
              <p className="lead">
                Below is an honest view of our work: live client websites, an internal
                infrastructure blueprint, a local prototype and interactive demos. Each entry
                states what it is.
              </p>
              <p className="page-note">
                We describe the practical requirements, visible features and engineering decisions
                behind each project without exaggerating outcomes or publishing unverified
                statistics.
              </p>
            </div>

            <div className="page-aside">
              <h2>Entries</h2>
              <ul>
                <li><span className="num">01</span><a href="#kohinoor-restaurant">Kohinoor Restaurant — live client website</a></li>
                <li><span className="num">02</span><a href="#samajik-abhiyaan">Samajik Abhiyaan — live client website</a></li>
                <li><span className="num">03</span><a href="#aama-pathshala">Aama Pathshala — live client website</a></li>
                <li><span className="num">04</span><a href="#server-infrastructure">Linux server baseline — blueprint</a></li>
                <li><span className="num">05</span><a href="#aayushai-core">AayushAI Core — prototype</a></li>
                <li><span className="num">06</span><a href="#demos">Interactive demos — operate them yourself</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="live-projects" aria-labelledby="live-projects-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">Live client work</span>
              <h2 id="live-projects-title">Websites in production.</h2>
            </div>
            <p style={{ maxWidth: "30rem" }}>
              Three real client websites, live on their own domains. Each project is shown at the
              same scale, with its own desktop and mobile view.
            </p>
          </div>
          <LiveProjectEntries />
        </div>
      </section>

      <section className="section" aria-labelledby="build-notes-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">Build notes &amp; prototypes</span>
              <h2 id="build-notes-title">Blueprints and experiments.</h2>
            </div>
            <p style={{ maxWidth: "30rem" }}>
              These entries are not live client sites: a reference server baseline and a local
              prototype.
            </p>
          </div>

          <article className="project-entry reveal" id="server-infrastructure">
            <div className="project-entry-head">
              <span className="num" aria-hidden="true">04</span>
              <h2>Linux server baseline &amp; automated deployment pipeline</h2>
              <span className="project-kind">
                Infrastructure blueprint<br />Linux / Ubuntu
              </span>
            </div>

            <div
              className="terminal"
              role="region"
              aria-label="Reference Caddy configuration excerpt"
              tabIndex={0}
            >
              <div className="terminal-label">
                <span>Reference Caddyfile</span>
                <span>Blueprint / not a live status report</span>
              </div>
              <pre><code>{caddyfile}</code></pre>
            </div>

            <p className="lead" style={{ marginTop: "2rem" }}>
              A standardized reference configuration for deploying web applications on Ubuntu Linux
              virtual private servers, featuring firewall rules, reverse proxying, and automated
              Git-based deployment.
            </p>

            <div className="project-detail-grid" style={{ marginTop: "1.75rem" }}>
              <div>
                <h3>The operational goal</h3>
                <p>
                  When deploying web projects to cloud VPS providers (such as DigitalOcean or
                  Linode), default server setups often leave root password authentication enabled
                  and firewall rules unconfigured. Manual file uploads via FTP also create risk of
                  incomplete transfers. This blueprint establishes a clean, repeatable deployment
                  baseline.
                </p>
              </div>
              <div>
                <h3>What was configured</h3>
                <ul>
                  <li>Documented server setup on Ubuntu LTS.</li>
                  <li>Enforced SSH public-key authentication with root password login disabled.</li>
                  <li>Uncomplicated Firewall (UFW) allowing only HTTP (80), HTTPS (443), and designated SSH traffic.</li>
                  <li>Caddy reverse proxy providing automated TLS certificate issuance and renewal via Let&apos;s Encrypt.</li>
                  <li>Automated GitHub Actions deployment pipeline that syncs repository updates cleanly on merge.</li>
                </ul>
              </div>
            </div>

            <div className="project-detail-grid" style={{ marginTop: "1.75rem" }}>
              <div>
                <h3>Technical implementation decisions</h3>
                <ul>
                  <li>
                    <strong>Caddy reverse proxy:</strong> Selected Caddy for its reliable automated
                    Let&apos;s Encrypt certificate lifecycle management and clean, concise
                    configuration format.
                  </li>
                  <li>
                    <strong>Standard security headers:</strong> Configured HSTS, nosniff, and frame
                    restrictions in the proxy configuration to defend against MIME-type sniffing and
                    framing.
                  </li>
                  <li>
                    <strong>Git-based publishing:</strong> Configured automated deployment via
                    GitHub Actions, replacing manual file transfers with atomic, repeatable updates.
                  </li>
                </ul>
              </div>
              <div>
                <h3>Scope note</h3>
                <p>
                  This is a reference baseline, not a claim of guaranteed uptime or a managed
                  hosting product. Server accounts, billing, and access remain under the
                  client&apos;s ownership.
                </p>
              </div>
            </div>

            <dl className="ledger">
              <div><dt>System type</dt><dd>Server baseline &amp; blueprint</dd></div>
              <div><dt>Operating system</dt><dd>Ubuntu Linux LTS</dd></div>
              <div><dt>Proxy &amp; TLS</dt><dd>Caddy / Nginx, Let&apos;s Encrypt</dd></div>
              <div><dt>Status</dt><dd>Active reference setup</dd></div>
            </dl>
          </article>

          <article className="project-entry reveal" id="aayushai-core">
            <div className="project-entry-head">
              <span className="num" aria-hidden="true">05</span>
              <h2>AayushAI Core — terminal assistant with SQLite memory</h2>
              <span className="project-kind">
                Personal prototype<br />Python / SQLite
              </span>
            </div>

            <div
              className="terminal"
              role="region"
              aria-label="Prototype command-line status excerpt"
              tabIndex={0}
            >
              <div className="terminal-label">
                <span>Prototype output</span>
                <span>Local CLI / illustrative excerpt</span>
              </div>
              <pre><code>{prototypeOutput}</code></pre>
            </div>

            <p className="lead" style={{ marginTop: "2rem" }}>
              A personal research prototype exploring persistent, structured memory for
              command-line developer utilities using a local SQLite database.
            </p>

            <div className="project-detail-grid" style={{ marginTop: "1.75rem" }}>
              <div>
                <h3>The exploration</h3>
                <p>
                  Most interactive command-line helpers and chat interfaces lose context as soon as
                  the terminal window is closed. This experiment investigated whether using
                  standard relational database tables on local disk can provide a clean, queryable
                  persistence layer for notes, reminders, and ongoing project tasks without cloud
                  dependencies.
                </p>
                <h3 style={{ marginTop: "1.25rem" }}>What was built</h3>
                <p>
                  A standalone Python CLI application backed by a structured SQLite database file.
                  Users can add reminders, save developer journal notes, and search past context
                  directly from the terminal.
                </p>
              </div>
              <div>
                <h3>Technical implementation decisions</h3>
                <ul>
                  <li>
                    <strong>Local database schema:</strong> Structured data tables in SQLite allow
                    indexing and standard SQL queries across sessions rather than relying on
                    unindexed flat text files.
                  </li>
                  <li>
                    <strong>Zero cloud requirement:</strong> The database file lives locally on the
                    user&apos;s computer, keeping notes private and fully inspectable.
                  </li>
                  <li>
                    <strong>Standard library focus:</strong> Built using Python standard libraries
                    (sqlite3, argparse) to ensure ease of execution on Linux and macOS environments.
                  </li>
                </ul>
              </div>
            </div>

            <dl className="ledger">
              <div><dt>Category</dt><dd>Personal prototype / tool</dd></div>
              <div><dt>Languages</dt><dd>Python 3, SQL</dd></div>
              <div><dt>Storage</dt><dd>Local SQLite3 database</dd></div>
              <div><dt>Status</dt><dd>Functional experiment</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className="section" id="demos" aria-labelledby="demos-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">Interactive demonstrations</span>
              <h2 id="demos-title">Five demos you can operate yourself.</h2>
            </div>
            <Link className="text-link" href="/contact/">
              Discuss a build <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
          <p style={{ maxWidth: "46rem", marginBottom: "2rem" }}>
            Each demonstration below runs in your browser with fictional sample data — no
            signup, nothing installed, and a reset button that restores the original records.
            Every module is labelled for what it honestly is: real in-browser logic, a simulated
            workflow, or sample data.
          </p>
          <DemoIndex />
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="transparency-title">
        <div className="shell">
          <div className="about-grid">
            <div>
              <span className="hero-kicker">Portfolio transparency</span>
              <h2 id="transparency-title" className="about-statement">
                Clear representation of our work.
              </h2>
            </div>
            <div>
              <p>
                This page presents projects, infrastructure reference setups, and personal
                prototypes that have been built and verified by our team.
              </p>
              <p>
                We do not publish unverified client logos, unconfirmed partnerships, or invented
                outcome metrics. Where work involves private client systems or confidential
                requirements, we discuss technical architecture and approaches directly during
                scoping conversations.
              </p>
              <p>
                <strong>
                  If you would like to review code repositories, technical configurations, or
                  discuss relevance to your project, we welcome a direct conversation.
                </strong>
              </p>
              <div className="hero-actions">
                <Link className="btn btn-secondary" href="/contact/">
                  Discuss a project <span className="arrow" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta" aria-labelledby="work-cta-title">
        <div className="shell">
          <div className="cta-grid">
            <div>
              <h2 id="work-cta-title">Have a project requirement to discuss?</h2>
              <p>
                Tell us about your website, server setup, or technical requirement. We will review
                your goals and provide an honest assessment of scope and architecture.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact/">
                  Discuss your project <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-secondary" href="/services/">
                  Review service deliverables
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
