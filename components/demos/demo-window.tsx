"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { DEMO_DISCLAIMER, type DemoInfo } from "@/lib/demos/registry";
import type { TourStep } from "@/lib/demos/tour";
import { DemoWindowContext } from "./demo-shared";
import GuidedTour from "./guided-tour";

type DemoWindowProps = {
  demo: DemoInfo;
  steps: TourStep[];
  onClose: () => void;
  children: ReactNode;
};

/**
 * Full-screen overlay that hosts a demo application: the Yugya demo chrome
 * (disclaimer, tour, reset, exit) on top, the application below, and the
 * guided tour above everything.
 *
 * Tour state and the active view live here, above the keyed application
 * subtree, so "Reset demo" remounts the application pristine without losing
 * the visitor's place. All state changes happen in event handlers.
 */
export default function DemoWindow({ demo, steps, onClose, children }: DemoWindowProps) {
  const [resetKey, setResetKey] = useState(0);
  const [activeView, setActiveView] = useState(demo.defaultView);
  const [tourActive, setTourActive] = useState(true);
  const [tourStep, setTourStep] = useState(0);
  const exitRef = useRef<HTMLButtonElement>(null);

  // Lock the page scroll behind the overlay and land focus on the chrome.
  // DOM writes only.
  useEffect(() => {
    document.body.classList.add("demo-open");
    exitRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.classList.remove("demo-open");
    };
  }, []);

  const setView = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, steps.length));
      const step = steps[clamped];
      // Switch the application view before the step is measured, from this
      // event handler — never inside an effect.
      if (step && step.view) {
        setActiveView(step.view);
      }
      setTourStep(clamped);
    },
    [steps]
  );

  const endTour = useCallback(() => {
    setTourActive(false);
  }, []);

  const startTour = useCallback(() => {
    setTourActive(true);
    setTourStep(0);
  }, []);

  const resetDemo = useCallback(() => {
    setResetKey((key) => key + 1);
    setActiveView(demo.defaultView);
  }, [demo.defaultView]);

  const toggleTour = useCallback(() => {
    if (tourActive) {
      endTour();
    } else {
      startTour();
    }
  }, [tourActive, endTour, startTour]);

  // Escape closes the window. While the tour is running, the tour's own
  // capture-phase Escape handler intercepts the key and ends only the tour.
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <DemoWindowContext.Provider value={{ demo, activeView, setView, resetKey }}>
      <div
        className="demo-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`${demo.name} — interactive demo by Yugya`}
      >
        <header className="demo-chrome">
          <div className="demo-chrome-row">
            <p className="demo-chrome-title">
              <span className="demo-chrome-dot" aria-hidden="true" />
              <strong>{demo.name}</strong>
              <span className="demo-chrome-kind">{demo.kind}</span>
            </p>
            <div className="demo-chrome-actions">
              <button type="button" className="demo-chrome-btn" onClick={toggleTour}>
                {tourActive ? "End tour" : "Start tour"}
              </button>
              <button type="button" className="demo-chrome-btn" onClick={resetDemo}>
                <span aria-hidden="true">↺</span> Reset demo
              </button>
              <button
                type="button"
                className="demo-chrome-btn demo-chrome-exit"
                ref={exitRef}
                onClick={onClose}
              >
                Exit <span aria-hidden="true">✕</span>
              </button>
            </div>
          </div>
          <p className="demo-chrome-note">{DEMO_DISCLAIMER}</p>
        </header>

        {/* The key remounts the whole application subtree on reset. */}
        <div className="demo-viewport" key={resetKey}>
          <div className="demo-stage" data-app={demo.id}>
            {children}
          </div>
        </div>

        <GuidedTour
          demo={demo}
          steps={steps}
          active={tourActive}
          stepIndex={tourStep}
          resetKey={resetKey}
          onGoTo={goToStep}
          onEnd={endTour}
        />
      </div>
    </DemoWindowContext.Provider>
  );
}
