import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono, Newsreader } from "next/font/google";
import IntroSequence from "@/components/IntroSequence";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import RevealOnScroll from "@/components/RevealOnScroll";
import { organizationNode, websiteNode } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "@/components/intro.css";

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
  "Yugya is an independent web development company in Nepal building fast, accessible websites, custom web applications, and Linux server infrastructure.";

// Runs before first paint: resolves the saved/system theme onto <html> so the
// page never flashes the wrong palette, then marks JS as available for reveals.
// It also decides whether the brand entry sequence plays at all.
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
  var root = document.documentElement;
  root.classList.add("js");

  // Entry sequence: full page loads only, never on back/forward, deep links or
  // reduced motion. Rendering it is CSS-only; this just turns it on in time.
  try {
    var nav = performance.getEntriesByType
      ? performance.getEntriesByType("navigation")[0]
      : null;
    var returning = nav && nav.type === "back_forward";
    var deepLink = location.hash !== "" || location.search !== "";
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (returning || deepLink || calm) return;

    root.dataset.intro = "on";

    // Hold the wordmark until Newsreader is ready (or 400ms) so the masked
    // rise never plays in the fallback face and swaps mid-animation. The arm
    // time is recorded on <html> so the component can time the exit from the
    // moment the rise actually starts.
    var arm = function () {
      var intro = document.getElementById("intro");
      if (!intro || intro.classList.contains("is-fonted")) return;
      intro.classList.add("is-fonted");
      root.dataset.introArm = String(Math.round(performance.now()));
      try {
        window.dispatchEvent(new CustomEvent("yugya:intro-armed"));
      } catch (error) {}
    };
    var armWhenReady = function () {
      try {
        if (document.fonts && document.fonts.load) {
          document.fonts.load('400 1em "Newsreader"').then(arm, arm);
        } else {
          arm();
        }
      } catch (error) {
        arm();
      }
      window.setTimeout(arm, 400);
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", armWhenReady);
    } else {
      armWhenReady();
    }

    // Last-resort release: if the app never hydrates, never trap the page.
    window.setTimeout(function () {
      var intro = document.getElementById("intro");
      if (!intro || root.dataset.intro !== "on") return;
      intro.classList.add("is-out", "is-fast");
      window.setTimeout(function () {
        root.removeAttribute("data-intro");
        root.classList.remove("intro-exit", "intro-fast");
        delete root.dataset.introArm;
      }, 500);
    }, 7000);
  } catch (error) {}
})();
`.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yugya — Web Development Company in Nepal",
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

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationNode(), websiteNode()],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the theme and the reveal animation are
            resolved without a flash. Must stay synchronous and inline. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <IntroSequence />

        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <SiteHeader />

        {children}

        <SiteFooter />
        <RevealOnScroll />

        <JsonLd data={globalJsonLd} />
      </body>
    </html>
  );
}
