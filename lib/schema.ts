import { FOUNDERS, SITE_EMAIL, SITE_URL } from "./site";

/**
 * Schema.org nodes for the site. Everything described here is stated in the
 * visible page copy — no ratings, review counts, awards, opening hours or
 * social profiles are invented. Nodes are emitted as one JSON-LD @graph from
 * `components/JsonLd.tsx`.
 */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const ORGANIZATION_DESCRIPTION =
  "Independent technology studio in Nepal delivering websites, web applications, software tools, Linux server configurations, and technical maintenance.";

export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Yugya",
    alternateName: "Yugya Technologies",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/brand/yugya-logo.png`,
      width: 670,
      height: 535,
    },
    email: SITE_EMAIL,
    description: ORGANIZATION_DESCRIPTION,
    founder: FOUNDERS.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      email: founder.email,
      url: founder.portfolio,
      worksFor: { "@id": ORGANIZATION_ID },
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kapilvastu / Rupandehi",
      addressRegion: "Lumbini Province",
      addressCountry: "NP",
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    knowsAbout: [
      "Website development",
      "Web application development",
      "Custom software development",
      "Linux server administration",
      "VPS hosting and deployment",
      "Domain name system (DNS)",
      "Business process automation",
      "Website maintenance",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE_EMAIL,
      areaServed: "NP",
      availableLanguage: ["English"],
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Yugya",
    alternateName: "Yugya Technologies",
    description: ORGANIZATION_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

type WebPageOptions = {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";
};

export function webPageNode({
  path,
  name,
  description,
  type = "WebPage",
}: WebPageOptions) {
  const url = `${SITE_URL}${path}`;

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * The five service scopes shown on /services/. Names, descriptions and URLs
 * mirror the visible articles and their section anchors.
 */
export const SERVICE_NODES = [
  {
    "@type": "Service",
    "@id": `${SITE_URL}/services/#web-development`,
    name: "Website & web application development",
    serviceType: "Website and web application development",
    description:
      "Responsive websites and web applications built with semantic HTML, clean styling, and minimal script weight.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${SITE_URL}/services/#web-development`,
  },
  {
    "@type": "Service",
    "@id": `${SITE_URL}/services/#server-infrastructure`,
    name: "Linux server setup, VPS & deployment pipelines",
    serviceType: "Linux server setup and deployment",
    description:
      "Documented Linux VPS baselines, UFW firewall rules, Caddy or Nginx reverse proxies, and Git-based deployment.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${SITE_URL}/services/#server-infrastructure`,
  },
  {
    "@type": "Service",
    "@id": `${SITE_URL}/services/#domain-dns`,
    name: "Domain guidance & DNS architecture",
    serviceType: "Domain registration guidance and DNS configuration",
    description:
      "Nepal .np application paperwork assistance, commercial TLD setup, DNS routing, and email authentication records.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${SITE_URL}/services/#domain-dns`,
  },
  {
    "@type": "Service",
    "@id": `${SITE_URL}/services/#automation`,
    name: "Business automation & custom tooling",
    serviceType: "Business process automation",
    description:
      "Lightweight Python or Node.js scripts that replace repetitive manual data work with documented, logged routines.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${SITE_URL}/services/#automation`,
  },
  {
    "@type": "Service",
    "@id": `${SITE_URL}/services/#maintenance`,
    name: "Ongoing maintenance & technical care",
    serviceType: "Website and server maintenance",
    description:
      "Scheduled OS package upgrades, TLS renewal checks, backup verification, and direct engineer contact.",
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${SITE_URL}/services/#maintenance`,
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * FAQPage node for the visible questions on /contact/. Google limits FAQ rich
 * results to a small set of authoritative sites, so this is emitted for
 * entity/answer understanding, not as a promise of a rich result.
 */
export function faqPageNode({
  path,
  name,
  description,
  items,
}: WebPageOptions & { items: FaqItem[] }) {
  const url = `${SITE_URL}${path}`;

  return {
    "@type": "FAQPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
