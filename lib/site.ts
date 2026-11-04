export const SITE_URL = "https://yugya.com";
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
