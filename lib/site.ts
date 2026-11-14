// Production serves the site at www; the apex domain permanently redirects to
// it. Canonicals, sitemap URLs and structured data must name the final host.
export const SITE_URL = "https://www.yugya.com";
export const YUGS_URL = "https://yugs.yugya.com/";
export const SITE_EMAIL = "hello@yugya.com";
export const SITE_LOCATION = "Kapilvastu / Rupandehi, Nepal · UTC +5:45";
export const SITE_RESPONSE = "1–2 business days";

export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const SERVICE_LINKS = [
  { href: "/services/#web-development", label: "Web & app development" },
  { href: "/services/#server-infrastructure", label: "Linux VPS & deployment" },
  { href: "/services/#domain-dns", label: "Domain & DNS guidance" },
  { href: "/services/#automation", label: "Business automation" },
  { href: "/services/#maintenance", label: "Ongoing maintenance" },
];

export type Founder = {
  name: string;
  handle?: string;
  role: string;
  email: string;
  portfolio: string;
  portfolioLabel: string;
  imageBase: string;
  alt: string;
};

export const FOUNDERS: Founder[] = [
  {
    name: "Aayush Bhandari",
    handle: "Aayusx",
    role: "Co-founder",
    email: "aayusx@yugya.com",
    portfolio: "https://aayusx.dev",
    portfolioLabel: "aayusx.dev",
    imageBase: "/assets/founders/aayush-bhandari",
    alt: "Portrait of Aayush Bhandari",
  },
  {
    name: "Sagar Bhusal",
    role: "Co-founder",
    email: "sagar@yugya.com",
    portfolio: "https://sagarb.com",
    portfolioLabel: "sagarb.com",
    imageBase: "/assets/founders/sagar-bhusal",
    alt: "Portrait of Sagar Bhusal",
  },
];

export const FOUNDER_NAMES = FOUNDERS.map((founder) => founder.name).join(" & ");
