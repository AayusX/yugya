"use client";

import { useEffect, useRef } from "react";
import type { ChangeEvent } from "react";

const COOKIE_NAME = "googtrans";
const SOURCE_LANGUAGE = "en";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ne", label: "नेपाली" },
  { code: "hi", label: "हिन्दी" },
  { code: "mai", label: "मैथिली" },
  { code: "bho", label: "भोजपुरी" },
  { code: "bn", label: "বাংলা" },
  { code: "ur", label: "اردو" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
] as const;

type GoogleTranslateWindow = Window & {
  googleTranslateElementInit?: () => void;
  google?: {
    translate?: {
      TranslateElement?: new (
        options: { pageLanguage: string; autoDisplay: boolean },
        elementId: string,
      ) => unknown;
    };
  };
};

function readLanguageCookie(): string {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=/[^/]+/([^;]+)`),
  );
  return match ? decodeURIComponent(match[1]) : SOURCE_LANGUAGE;
}

function clearLanguageCookie() {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`];

  for (const domain of domains) {
    const domainPart = domain ? `;domain=${domain}` : "";
    document.cookie = `${COOKIE_NAME}=;${expired};path=/${domainPart}`;
  }
}

function setLanguageCookie(language: string) {
  clearLanguageCookie();

  if (language === SOURCE_LANGUAGE) {
    return;
  }

  document.cookie = `${COOKIE_NAME}=/${SOURCE_LANGUAGE}/${language};path=/;SameSite=Lax`;
}

function initializeWidget() {
  const host = document.getElementById("google_translate_element");
  const TranslateElement = (window as GoogleTranslateWindow).google?.translate
    ?.TranslateElement;

  if (!host || !TranslateElement) {
    return;
  }

  new TranslateElement(
    { pageLanguage: SOURCE_LANGUAGE, autoDisplay: false },
    "google_translate_element",
  );
}

function loadGoogleTranslate() {
  const googleWindow = window as GoogleTranslateWindow;

  if (googleWindow.google?.translate?.TranslateElement) {
    initializeWidget();
    return;
  }

  if (document.getElementById("google-translate-script")) {
    return;
  }

  googleWindow.googleTranslateElementInit = initializeWidget;

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function GoogleTranslate() {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const currentLanguage = readLanguageCookie();

    if (selectRef.current) {
      selectRef.current.value = currentLanguage;
    }

    // Load Google only when the page is already translated. On a first visit
    // nothing third-party is requested until the reader chooses a language.
    if (currentLanguage !== SOURCE_LANGUAGE) {
      loadGoogleTranslate();
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;

    if (language === readLanguageCookie()) {
      return;
    }

    setLanguageCookie(language);
    window.location.reload();
  };

  return (
    <div className="footer-translate">
      <label className="footer-translate-label" htmlFor="site-language">
        Language
      </label>
      <span className="footer-translate-control">
        <select
          id="site-language"
          ref={selectRef}
          defaultValue={SOURCE_LANGUAGE}
          onChange={handleChange}
        >
          {LANGUAGES.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </span>
      <a
        className="footer-translate-credit"
        href="https://translate.google.com/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Google Translate
      </a>

      {/* Google renders its own hidden widget here; the select above is the
          only visible control. */}
      <div id="google_translate_element" className="google-translate-host" aria-hidden="true" />
    </div>
  );
}
