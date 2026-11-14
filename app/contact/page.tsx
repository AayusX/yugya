import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { faqPageNode, type FaqItem } from "@/lib/schema";

const CONTACT_TITLE = "Contact Yugya — Website Development Enquiry";
const CONTACT_DESCRIPTION =
  "Contact Yugya to discuss a website, web app, Linux server, domain, or automation project in Nepal. Direct email, clear scoping, and replies within 1–2 business days.";

export const metadata = pageMetadata({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: "/contact/",
  ogDescription:
    "Send your project requirements to Yugya. Transparent scoping and direct communication.",
});

const CONTACT_FAQS: FaqItem[] = [
  {
    question: "How is work billed?",
    answer:
      "Engagements are typically billed in milestones: an initial deposit upon project kick-off, a progress milestone after architecture and design approval, and the balance upon deployment and system handover.",
  },
  {
    question: "Where are websites hosted?",
    answer:
      "We configure hosting under accounts owned directly by you (such as Cloudflare Pages, DigitalOcean, or Linode). You maintain direct control over your infrastructure provider and billing.",
  },
  {
    question: "What post-launch support is included?",
    answer:
      "Projects include 30 calendar days of bug fixing support following deployment. For continuous feature additions or regular server patching, we offer scheduled monthly maintenance.",
  },
  {
    question: "Do you assist with .com.np domain registration?",
    answer:
      "Yes. In Nepal, official .np domains are administered by Mercantile Communication. We help prepare the required cover letters and registration documentation.",
  },
  {
    question: "How is a project priced?",
    answer:
      "Pricing is based on the scope we agree together: the number of pages or screens, the complexity of the interface, integrations, content work, and the server setup required. We do not publish fixed packages because two projects with the same page count can need very different engineering. After a short requirements review we provide an itemized scope and a written quote.",
  },
];

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    faqPageNode({
      path: "/contact/",
      name: CONTACT_TITLE,
      description: CONTACT_DESCRIPTION,
      items: CONTACT_FAQS,
    }),
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <main id="main">
      <section className="page-hero">
        <div className="shell">
          <div className="page-hero-grid">
            <div>
              <span className="hero-kicker">Direct contact</span>
              <h1>Let’s discuss your technical requirements.</h1>
              <p className="lead">
                Whether you need a website built, a Linux server configured, or domain and DNS
                guidance, share your project details below.
              </p>
              <p className="page-note">
                We review project requirements and provide a practical assessment of scope,
                timeline, and architecture.
              </p>
            </div>

            <div className="page-aside">
              <h2>Direct details</h2>
              <ul>
                <li><span className="num">01</span><a href="mailto:hello@yugya.com">hello@yugya.com</a></li>
                <li><span className="num">02</span><span>Kapilvastu / Rupandehi, Nepal · UTC +5:45</span></li>
                <li><span className="num">03</span><span>Aim to reply within 1–2 business days</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="contact-grid">
            <div className="contact-guide">
              <span className="hero-kicker">Direct email</span>
              <h2>Prefer to write from your own email client?</h2>
              <p>
                Send your brief directly to the studio. Include the context below so the first
                reply can be useful.
              </p>
              <a className="direct-email" href="mailto:hello@yugya.com">
                hello@yugya.com <span aria-hidden="true">↗</span>
              </a>
              <p className="contact-note">
                <strong>Response aim:</strong> We review incoming messages and aim to reply within
                1–2 business days.
              </p>

              <ol className="checklist">
                <li>
                  <span className="num" aria-hidden="true">01</span>
                  <span>
                    <strong>Project overview:</strong> What does your organization do, and what
                    problem are you solving?
                  </span>
                </li>
                <li>
                  <span className="num" aria-hidden="true">02</span>
                  <span>
                    <strong>Current setup:</strong> Do you already have a domain, server, or
                    existing website in place?
                  </span>
                </li>
                <li>
                  <span className="num" aria-hidden="true">03</span>
                  <span>
                    <strong>Target timeline:</strong> Are you working toward a specific date or
                    exploring options?
                  </span>
                </li>
                <li>
                  <span className="num" aria-hidden="true">04</span>
                  <span>
                    <strong>Engagement scope:</strong> Are you looking for initial development,
                    server setup, or ongoing maintenance?
                  </span>
                </li>
              </ol>
            </div>

            <div className="form-panel">
              <h2>Project enquiry form</h2>
              <p>
                Fill in your details below. This form prepares your enquiry and opens your email
                application, or copies the text to your clipboard.
              </p>

              <div className="form-note">
                <strong>How this form works:</strong> This form does not transmit data to an
                external server. Clicking “Open in email client” formats your enquiry into an email
                draft addressed to <code>hello@yugya.com</code>. You must click Send in your email
                application. You can also copy the formatted enquiry directly to your clipboard.
              </div>

              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="faq-title">
        <div className="shell">
          <div className="page-hero-grid" style={{ alignItems: "start" }}>
            <div>
              <span className="hero-kicker">Frequently asked questions</span>
              <h2 id="faq-title">Common questions regarding engagements.</h2>
              <p>
                Short answers to the practical questions that come up before a project begins.
              </p>
            </div>

            <div className="faq">
              <details>
                <summary>How is work billed?</summary>
                <div className="faq-answer">
                  <p>
                    Engagements are typically billed in milestones: an initial deposit upon project
                    kick-off, a progress milestone after architecture and design approval, and the
                    balance upon deployment and system handover.
                  </p>
                </div>
              </details>
              <details>
                <summary>Where are websites hosted?</summary>
                <div className="faq-answer">
                  <p>
                    We configure hosting under accounts owned directly by you (such as Cloudflare
                    Pages, DigitalOcean, or Linode). You maintain direct control over your
                    infrastructure provider and billing.
                  </p>
                </div>
              </details>
              <details>
                <summary>What post-launch support is included?</summary>
                <div className="faq-answer">
                  <p>
                    Projects include 30 calendar days of bug fixing support following deployment.
                    For continuous feature additions or regular server patching, we offer scheduled
                    monthly maintenance.
                  </p>
                </div>
              </details>
              <details>
                <summary>Do you assist with .com.np domain registration?</summary>
                <div className="faq-answer">
                  <p>
                    Yes. In Nepal, official <code>.np</code> domains are administered by Mercantile
                    Communication. We help prepare the required cover letters and registration
                    documentation.
                  </p>
                </div>
              </details>
              <details>
                <summary>How is a project priced?</summary>
                <div className="faq-answer">
                  <p>
                    Pricing is based on the scope we agree together: the number of pages or
                    screens, the complexity of the interface, integrations, content work, and the
                    server setup required. We do not publish fixed packages because two projects
                    with the same page count can need very different engineering. After a short
                    requirements review we provide an itemized scope and a written quote.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
