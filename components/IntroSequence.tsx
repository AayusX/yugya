"use client";

import { useEffect, useRef } from "react";

/**
 * How long the finished title card holds after the wordmark is armed (i.e.
 * after Newsreader is ready and the masked rise begins). The choreography
 * itself ends 1450ms after that point, so this leaves roughly a 300ms beat
 * before the curtain.
 */
const HOLD = 1750;
/**
 * Hard cap measured from navigation start. A slow font must never turn the
 * title card into a wait, so the exit fires at this point regardless.
 */
const EXIT_LATEST = 3600;
/** Flash (130) + lift delay (160) + lift (700) + the 900ms page settle. */
const EXIT_SETTLE = 1220;
/** Fast path: flash (70) + delay (60) + lift (320) + the 420ms settle. */
const FAST_SETTLE = 520;

/**
 * The brand entry sequence. The markup is server-rendered and hidden by CSS
 * unless the pre-paint script in `app/layout.tsx` put `data-intro="on"` on
 * <html>, so it never plays with JS off, under reduced motion, on back/forward
 * navigation, or on deep links. It plays once per full page load; in-site
 * client navigation does not replay it.
 *
 * The effect only touches the DOM (no state), which keeps the server render and
 * the hydrated tree identical. The timeline itself is CSS — the script just
 * starts the exit, closes the curtain and handles the skip gesture.
 */
export default function IntroSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!el || root.dataset.intro !== "on") return;

    let closed = false;
    let scheduled = false;
    let exitTimer = 0;
    let closeTimer = 0;
    let armFallbackTimer = 0;

    const close = () => {
      if (closed) return;
      closed = true;
      root.removeAttribute("data-intro");
      delete root.dataset.introArm;
      root.classList.remove("intro-exit", "intro-fast");
    };

    const exit = (fast: boolean) => {
      if (closed || el.classList.contains("is-out")) return;
      el.classList.add("is-out");
      if (fast) {
        el.classList.add("is-fast");
        root.classList.add("intro-fast");
      }
      root.classList.add("intro-exit");
      closeTimer = window.setTimeout(close, fast ? FAST_SETTLE : EXIT_SETTLE);
    };

    // The pre-paint script records when the wordmark was armed, because that is
    // when the masked rise starts. Anchoring there keeps the hold identical on
    // a warm cache and a cold font load. Fall back to first paint if the app
    // hydrates before the script has armed (or the attribute is missing).
    const schedule = () => {
      if (closed || scheduled) return;
      scheduled = true;

      const arm = Number(root.dataset.introArm);
      const fcp = performance
        .getEntriesByType("paint")
        .find((entry) => entry.name === "first-contentful-paint");
      const anchor = arm > 0 ? arm : fcp ? fcp.startTime : 0;
      const due = Math.min(anchor + HOLD, EXIT_LATEST);

      exitTimer = window.setTimeout(() => exit(false), Math.max(0, due - performance.now()));
    };

    if (root.dataset.introArm) {
      schedule();
    } else {
      window.addEventListener("yugya:intro-armed", schedule, { once: true });
      armFallbackTimer = window.setTimeout(schedule, 600);
    }

    const skip = () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(armFallbackTimer);
      exit(true);
    };
    skipRef.current = skip;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        skip();
      }
    };

    window.addEventListener("pointerdown", skip, { passive: true });
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(closeTimer);
      window.clearTimeout(armFallbackTimer);
      window.removeEventListener("yugya:intro-armed", schedule);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="intro" id="intro" ref={ref}>
      <div className="intro-scene">
        <p className="intro-row intro-row-top">
          <span className="intro-brand">Yugya Technologies</span>
          <span className="intro-aside">Independent technology studio — Nepal</span>
        </p>

        <div className="intro-center">
          <span className="intro-word-mask">
            <span className="intro-word">Yugya</span>
          </span>
          <span className="intro-rule" aria-hidden="true" />
          <span className="intro-sub">Technology built for the work that matters.</span>
        </div>

        <div className="intro-row intro-row-bottom">
          <span className="intro-place">Kapilvastu / Rupandehi · UTC +5:45</span>
          <button className="intro-skip" type="button" onClick={() => skipRef.current()}>
            Skip intro
          </button>
        </div>
      </div>

      <span className="intro-panel intro-panel-top" aria-hidden="true" />
      <span className="intro-panel intro-panel-bottom" aria-hidden="true" />
    </div>
  );
}
