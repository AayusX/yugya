import Link from "next/link";
import GoogleTranslate from "@/components/GoogleTranslate";
import { SERVICE_LINKS, SITE_EMAIL, SITE_LOCATION } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <picture>
              <source type="image/webp" srcSet="/assets/brand/yugya-logo.webp" />
              <img
                src="/assets/brand/yugya-logo.png"
                alt="Yugya"
                width={150}
                height={120}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <p>
              Independent technology studio delivering websites, software tools, and server
              configurations that organizations can rely on.
            </p>
            <p className="footer-location">{SITE_LOCATION}</p>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {SERVICE_LINKS.map((service) => (
                <li key={service.href}>
                  <Link href={service.href}>{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Studio</h3>
            <ul>
              <li><Link href="/about/">About Yugya</Link></li>
              <li><Link href="/about/#founders">Founders</Link></li>
              <li><Link href="/about/#approach">Company purpose</Link></li>
              <li><Link href="/about/#principles">Core principles</Link></li>
              <li><Link href="/work/">Projects &amp; builds</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Direct inquiries</h3>
            <ul>
              <li><a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a></li>
              <li><Link href="/contact/">Project enquiry form</Link></li>
              <li><span>Aim to reply within 1–2 business days</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; <span id="year">{year}</span> Yugya. All rights reserved. Built with
            semantic HTML, CSS &amp; JavaScript.
          </p>
          <div className="footer-bottom-right">
            <GoogleTranslate />
            <div className="footer-bottom-links">
              <Link href="/services/">Services scope</Link>
              <Link href="/work/">Project case studies</Link>
              <Link href="/contact/">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh the build-time year on the client without a hydration pass. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            '(function(){var y=document.getElementById("year");if(y)y.textContent=String(new Date().getFullYear())})()',
        }}
      />
    </footer>
  );
}
