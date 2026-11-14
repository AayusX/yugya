import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import {
  DEMO_DISCLAIMER,
  DEMOS,
  INTERACTION_LABELS,
  type DemoInfo,
} from "@/lib/demos/registry";
import { webPageNode } from "@/lib/schema";
import { SITE_EMAIL } from "@/lib/site";

type DemoProjectIntroProps = {
  demo: DemoInfo;
  /** The demo launcher (client) rendered in the hero. */
  children: ReactNode;
};

/**
 * Shared intro-page template for the five demo applications. Server
 * component — the interactive launcher arrives as children from the page.
 */
export default function DemoProjectIntro({ demo, children }: DemoProjectIntroProps) {
  const others = DEMOS.filter((entry) => entry.id !== demo.id);
  const servicePath =
    demo.serviceParam === "vps" ? "/services/#server-infrastructure" : "/services/#web-development";

  const demoJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        path: demo.path,
        name: `${demo.name} — ${demo.kind} demo`,
        description: demo.metaDescription,
      }),
    ],
  };

  return (
    <>
      <JsonLd data={demoJsonLd} />
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="hero-kicker">Interactive demo · {demo.kind}</span>
              <h1>{demo.name}.</h1>
              <p className="lead">{demo.tagline}</p>
              <p className="page-note">
                <strong>Who it is for —</strong> {demo.audience}
              </p>
              {children}
            </div>

            <aside className="page-aside">
              <h2>This demo</h2>
              <ul>
                <li><span className="num">01</span>Runs in your browser — no signup</li>
                <li><span className="num">02</span>Fictional sample data throughout</li>
                <li><span className="num">03</span>Guided tour — skippable and restartable</li>
                <li><span className="num">04</span>Reset button restores the sample data</li>
                <li><span className="num">05</span>Every workflow labelled real, simulated, or sample</li>
              </ul>
              <p className="demo-hero-more">
                <Link href="/work/#demos">More interactive demos <span className="arrow" aria-hidden="true">↗</span></Link>
              </p>
            </aside>
          </div>
        </div>
      </section>

      <div className="shell demo-preview-wrap">
        <figure className="demo-preview reveal">
          <div className="demo-preview-frame">
            <img
              src={demo.preview}
              alt={demo.previewAlt}
              width={720}
              height={411}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            <span>{demo.name} — live demo preview</span>
            <span>Sample data · runs in your browser</span>
          </figcaption>
        </figure>
      </div>

      <section className="section" aria-labelledby="demo-problem-title">
        <div className="shell">
          <div className="project-detail-grid" id="problem">
            <div>
              <h3 id="demo-problem-title">The problem it addresses</h3>
              {demo.problem.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div>
              <h3>What the build delivers</h3>
              {demo.solution.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="demo-modules-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">01</span>
            <div>
              <h2 id="demo-modules-title">What you can operate.</h2>
              <p>
                Every module below is live in the demo. Each is labelled for what it honestly is —
                real logic running in your browser, a simulated workflow, or sample data.
              </p>
            </div>
          </div>

          <div className="demo-features">
            {demo.features.map((feature, index) => (
              <article className="demo-feature reveal" key={feature.name}>
                <div className="demo-feature-head">
                  <span className="num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`demo-feature-tag kind-${feature.kind}`}>
                    {INTERACTION_LABELS[feature.kind]}
                  </span>
                </div>
                <h3>{feature.name}</h3>
                <p>{feature.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="demo-how-title">
        <div className="shell">
          <div className="section-head">
            <span className="section-index" aria-hidden="true">02</span>
            <div>
              <h2 id="demo-how-title">How this demo works.</h2>
              <p>
                The demonstrations run entirely in this page. The approach is documented here so
                you know exactly what you are looking at.
              </p>
            </div>
          </div>

          <div className="demo-features">
            <article className="demo-feature reveal">
              <div className="demo-feature-head">
                <span className="num" aria-hidden="true">01</span>
              </div>
              <h3>It runs in your browser</h3>
              <p>
                The demo is a self-contained application — no account, no server round-trips, and
                nothing you type leaves this page. A production build adds real storage,
                notifications, and your actual data behind the same interfaces.
              </p>
            </article>
            <article className="demo-feature reveal">
              <div className="demo-feature-head">
                <span className="num" aria-hidden="true">02</span>
              </div>
              <h3>Interactions are labelled honestly</h3>
              <p>
                Three labels appear throughout: <strong>real</strong> — the logic genuinely runs in
                your browser; <strong>simulated</strong> — a workflow that would need a backend,
                replayed with canned steps and marked as such; <strong>sample</strong> — fictional
                values standing in for live-system data.
              </p>
            </article>
            <article className="demo-feature reveal">
              <div className="demo-feature-head">
                <span className="num" aria-hidden="true">03</span>
              </div>
              <h3>Sample data is isolated and resettable</h3>
              <p>
                Every record — names, prices, stock, servers — is invented and kept in separate data
                files, separate from the interface code. The Reset button in the demo chrome returns
                everything to its pristine state at any time.
              </p>
            </article>
            <article className="demo-feature reveal">
              <div className="demo-feature-head">
                <span className="num" aria-hidden="true">04</span>
              </div>
              <h3>The tour is optional</h3>
              <p>
                A guided tour walks the core screens and invites a small action at each step. It can
                be skipped, restarted from the demo chrome, and navigated with arrow keys.
              </p>
            </article>
          </div>

          <div className="demo-disclaimer-panel reveal" style={{ marginTop: "1.5rem" }}>
            <p>{DEMO_DISCLAIMER}</p>
            <p>
              In {demo.name}, the parts marked <em>real</em> are genuinely computed in your browser.
              The parts marked <em>simulated</em> replay a scripted sequence and say so on screen.
              The parts marked <em>sample</em> are fictional values that stand in for live data.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="demo-others-title">
        <div className="shell">
          <div className="section-head-split">
            <div>
              <span className="hero-kicker">More demonstrations</span>
              <h2 id="demo-others-title">Explore the other demos.</h2>
            </div>
            <Link className="text-link" href="/work/#demos">
              All demos <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
          <ul className="demo-others">
            {others.map((other) => (
              <li key={other.id} className="reveal">
                <Link href={other.path}>
                  <span>
                    <strong>{other.name}</strong>
                    <span className="demo-others-kind">{other.kind}</span>
                  </span>
                  <span className="arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta" aria-labelledby="demo-cta-title">
        <div className="shell">
          <div className="cta-grid">
            <div>
              <h2 id="demo-cta-title">{demo.ctaTitle}</h2>
              <p>{demo.ctaBody}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href={`/contact/?service=${demo.serviceParam}`}>
                  {demo.ctaLabel} <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-secondary" href={servicePath}>
                  Review the service scope
                </Link>
              </div>
              <p className="demo-cta-note">
                The enquiry form opens with the matching service preselected.
              </p>
            </div>
            <dl className="cta-aside">
              <dt>Direct email</dt>
              <dd><a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a></dd>
              <dt>Response aim</dt>
              <dd>1–2 business days</dd>
              <dt>Location</dt>
              <dd>Nepal · UTC +5:45</dd>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
