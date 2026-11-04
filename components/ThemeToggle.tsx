"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { MouseEvent } from "react";

const STORAGE_KEY = "yugya-theme";
const THEME_EVENT = "yugya:theme";
const LIGHT_THEME_COLOR = "#F7F4EF";
const DARK_THEME_COLOR = "#0F1512";

type Theme = "light" | "dark";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

// Private mode can reject localStorage writes. Remember the choice for the
// session so the store, the label and the applied theme stay in agreement.
let memoryTheme: Theme | null = null;
let storageWorks = true;

function readStoredTheme(): Theme | null {
  if (storageWorks) {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return isTheme(value) ? value : null;
    } catch {
      storageWorks = false;
    }
  }
  return memoryTheme;
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function currentTheme(): Theme {
  return readStoredTheme() ?? systemTheme();
}

function getServerTheme(): Theme {
  return "light";
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
  }
}

function subscribe(onChange: () => void): () => void {
  const system = window.matchMedia("(prefers-color-scheme: dark)");

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };

  // With no saved choice the theme follows the system, so a live system
  // change must update the page too.
  const handleSystem = () => {
    if (!readStoredTheme()) onChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_EVENT, onChange);
  system.addEventListener("change", handleSystem);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_EVENT, onChange);
    system.removeEventListener("change", handleSystem);
  };
}

function persistTheme(theme: Theme): void {
  memoryTheme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
    storageWorks = true;
  } catch {
    // Storage can be unavailable (private mode). The session fallback above
    // still keeps the page and the toggle in sync.
    storageWorks = false;
  }
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, getServerTheme);
  const busy = useRef(false);
  const isDark = theme === "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    if (busy.current) return;

    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    persistTheme(next);

    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A hidden tab can defer the transition's update callback indefinitely, so
    // skip the animation there and switch immediately instead.
    const supportsViewTransition =
      typeof document.startViewTransition === "function" &&
      document.visibilityState === "visible";

    if (reduceMotion || !supportsViewTransition) {
      applyTheme(next);
      window.dispatchEvent(new Event(THEME_EVENT));
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.style.setProperty("--theme-ripple-x", `${x}px`);
    root.style.setProperty("--theme-ripple-y", `${y}px`);
    root.style.setProperty("--theme-ripple-r", `${radius}px`);
    root.classList.add("theme-transition");
    busy.current = true;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      busy.current = false;
      root.classList.remove("theme-transition");
      root.style.removeProperty("--theme-ripple-x");
      root.style.removeProperty("--theme-ripple-y");
      root.style.removeProperty("--theme-ripple-r");
    };

    const commit = () => {
      applyTheme(next);
      window.dispatchEvent(new Event(THEME_EVENT));
    };

    // Safety net: if the update callback is delayed by the browser, apply the
    // theme anyway and release the guard so the toggle never sticks.
    const failsafe = window.setTimeout(() => {
      commit();
      finish();
    }, 400);

    const transition = document.startViewTransition(() => {
      window.clearTimeout(failsafe);
      commit();
    });

    transition.finished.finally(finish);
  }, []);

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <svg
        className="theme-toggle-icon theme-toggle-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
      </svg>
      <svg
        className="theme-toggle-icon theme-toggle-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
