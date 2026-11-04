"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV_ITEMS, SITE_EMAIL, SITE_LOCATION } from "@/lib/site";

function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path || "/";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncHeader = () => setScrolled(window.scrollY > 8);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    return () => window.removeEventListener("scroll", syncHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;

    const handlePointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return;
      }
      setNavOpen(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("click", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [navOpen]);

  useEffect(() => {
    const wideViewport = window.matchMedia("(min-width: 901px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setNavOpen(false);
    };
    wideViewport.addEventListener("change", handleChange);
    return () => wideViewport.removeEventListener("change", handleChange);
  }, []);

  const currentPath = normalizePath(pathname);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="Yugya home" onClick={() => setNavOpen(false)}>
          <picture>
            <source type="image/webp" srcSet="/assets/brand/yugya-nav.webp" />
            <img src="/assets/brand/yugya-nav.png" alt="Yugya" width={82} height={58} />
          </picture>
        </Link>

        <nav
          ref={navRef}
          className={`primary-nav${navOpen ? " is-open" : ""}`}
          id="primaryNav"
          aria-label="Primary"
        >
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === normalizePath(item.href);
              return (
                <li key={item.href}>
                  <Link
                    className="nav-link"
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mobile-only mobile-contact">
              <p>Prefer email? Write directly to the studio.</p>
              <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
              <p className="location">{SITE_LOCATION}</p>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link
            className="btn btn-primary btn-small"
            href="/contact/"
            onClick={() => setNavOpen(false)}
          >
            Start a project <span className="arrow" aria-hidden="true">↗</span>
          </Link>
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={navOpen}
            aria-controls="primaryNav"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
