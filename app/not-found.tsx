import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — Yugya",
  description: "The page you were looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="hero-kicker">Error 404 — page not found</span>
              <h1>This page does not exist.</h1>
              <p className="lead">
                The address you followed may be mistyped, outdated, or the page may have been
                moved.
              </p>
              <p className="page-note">
                The main sections are listed below. You can start from the home page, or go
                directly to services, work, about, or contact.
              </p>

              <div className="hero-actions">
                <Link className="btn btn-primary" href="/">
                  Back to home <span className="arrow" aria-hidden="true">↗</span>
                </Link>
                <Link className="btn btn-secondary" href="/contact/">
                  Contact the studio
                </Link>
              </div>
            </div>

            <div className="page-aside">
              <h2>Site sections</h2>
              <ul>
                <li><span className="num">01</span><Link href="/">Home</Link></li>
                <li><span className="num">02</span><Link href="/services/">Services &amp; scopes</Link></li>
                <li><span className="num">03</span><Link href="/work/">Projects &amp; builds</Link></li>
                <li><span className="num">04</span><Link href="/about/">About the studio</Link></li>
                <li><span className="num">05</span><Link href="/contact/">Contact &amp; enquiry</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
