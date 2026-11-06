import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono, Newsreader } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import RevealOnScroll from "@/components/RevealOnScroll";
import { FOUNDERS, SITE_URL } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const siteDescription =
  "Yugya is an independent technology studio in Nepal building websites, software tools, Linux server configurations, and dependable digital systems.";

// Runs before first paint: resolves the saved/system theme onto <html> so the
// page never flashes the wrong palette, then marks JS as available for reveals.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("yugya-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0F1512" : "#F7F4EF");
    }
  } catch (error) {}
  document.documentElement.classList.add("js");
})();
`.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yugya — Technology built for the work that matters",
  description: siteDescription,
  applicationName: "Yugya",
  authors: [{ name: "Yugya", url: SITE_URL }],
  creator: "Yugya",
  publisher: "Yugya",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F4EF",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yugya",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/brand/yugya-logo.png`,
  email: "hello@yugya.com",
  description:
    "Independent technology studio delivering websites, software tools, Linux server configurations, and technical maintenance.",
  foundingDate: "2024",
  founder: FOUNDERS.map((founder) => ({
    "@type": "Person",
    name: founder.name,
    email: founder.email,
    url: founder.portfolio,
  })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kapilvastu / Rupandehi",
    addressCountry: "NP",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the theme and the reveal animation are
            resolved without a flash. Must stay synchronous and inline. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <SiteHeader />

        {children}

        <SiteFooter />
        <RevealOnScroll />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
