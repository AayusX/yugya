"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { DemoInfo } from "@/lib/demos/registry";
import type { TourStep } from "@/lib/demos/tour";

type GuidedTourProps = {
  demo: DemoInfo;
  steps: TourStep[];
  active: boolean;
  /** Current step; when equal to `steps.length` the tour is complete. */
  stepIndex: number;
  /** Changes when the demo application is reset, so targets re-measure. */
  resetKey: number;
  onGoTo: (index: number) => void;
  onEnd: () => void;
};

const PAD = 12;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * The guided tour overlay: a highlight ring around the current target, a
 * tooltip card with progress and controls, and keyboard navigation.
 *
 * All state changes happen in event handlers (props from the demo window);
 * this component only performs DOM measurements and writes inside effects,
 * which keeps it compatible with `react-hooks/set-state-in-effect`.
 */
export default function GuidedTour({
  demo,
  steps,
  active,
  stepIndex,
  resetKey,
  onGoTo,
  onEnd,
}: GuidedTourProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const step = steps[stepIndex];
  const isComplete = active && stepIndex >= steps.length;
  const highlightCount = steps.length - 1;
  const progressLabel =
    stepIndex === 0
      ? "Welcome"
      : `Step ${stepIndex} of ${highlightCount}`;

  // Attach the tooltip to the current target: scroll it into view, size the
  // highlight ring, and place the card. Runs after render so the target
  // exists, and re-runs when the demo is reset underneath the tour.
  useEffect(() => {
    if (!active) return;

    const card = cardRef.current;
    const ring = ringRef.current;
    if (!card || !ring) return;

    const place = () => {
      const view = document.querySelector<HTMLElement>(".demo-overlay");
      const targetEl =
        step && step.target
          ? view?.querySelector<HTMLElement>(`[data-tour="${CSS.escape(step.target)}"]`)
          : null;

      card.style.left = "";
      card.style.top = "";

      if (!targetEl) {
        // Centered step (welcome / completion): no target to outline.
        ring.style.opacity = "0";
        ring.style.width = "0";
        ring.style.height = "0";
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        card.style.left = `${clamp(vw / 2 - card.offsetWidth / 2, PAD, vw - card.offsetWidth - PAD)}px`;
        card.style.top = `${clamp(vh * 0.36 - card.offsetHeight / 2, PAD, vh - card.offsetHeight - PAD)}px`;
        return;
      }

      const rect = targetEl.getBoundingClientRect();
      ring.style.opacity = "1";
      ring.style.left = `${rect.left - 6}px`;
      ring.style.top = `${rect.top - 6}px`;
      ring.style.width = `${rect.width + 12}px`;
      ring.style.height = `${rect.height + 12}px`;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;

      if (vw < 720) {
        // Bottom sheet on small screens.
        card.style.left = `${PAD}px`;
        card.style.top = `${vh - cardHeight - PAD}px`;
        return;
      }

      let top = rect.bottom + 14;
      if (top + cardHeight > vh - PAD) {
        top = rect.top - cardHeight - 14;
      }
      card.style.top = `${clamp(top, PAD, vh - cardHeight - PAD)}px`;
      card.style.left = `${clamp(
        rect.left + rect.width / 2 - cardWidth / 2,
        PAD,
        vw - cardWidth - PAD
      )}px`;
    };

    const schedule = () => {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(place);
    };

    if (step?.target) {
      const targetEl = document
        .querySelector(".demo-overlay")
        ?.querySelector<HTMLElement>(`[data-tour="${CSS.escape(step.target)}"]`);
      targetEl?.scrollIntoView({ block: "center" });
    }
    schedule();

    // Keep the card attached while the visitor scrolls or resizes.
    window.addEventListener("resize", schedule);
    document.addEventListener("scroll", schedule, { passive: true, capture: true });
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("scroll", schedule, true);
    };
  }, [active, stepIndex, resetKey, step, steps]);

  // Move focus to the tour card so keyboard visitors land inside it. DOM
  // write only — focus placement, not state.
  useEffect(() => {
    if (active) {
      cardRef.current?.focus({ preventScroll: true });
    }
  }, [active, stepIndex]);

  // Keyboard navigation. Capture phase so Escape ends the tour before the
  // demo window's own Escape handler can close the whole window.
  useEffect(() => {
    if (!active) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onEnd();
        return;
      }
      if (event.key === "ArrowRight") {
        if (stepIndex < steps.length) {
          onGoTo(stepIndex + 1);
        }
      }
      if (event.key === "ArrowLeft") {
        if (stepIndex > 0) {
          onGoTo(stepIndex - 1);
        }
      }
    };

    document.addEventListener("keydown", handleKey, true);
    return () => document.removeEventListener("keydown", handleKey, true);
  }, [active, stepIndex, steps.length, onEnd, onGoTo]);

  if (!active) return null;

  return (
    <div className="tour-layer" aria-hidden="false">
      <div className="tour-backdrop" />
      <div className="tour-ring" ref={ringRef} aria-hidden="true" />
      {isComplete ? (
        <div
          className="tour-card tour-complete"
          ref={cardRef}
          role="dialog"
          aria-label="Guided tour complete"
          tabIndex={-1}
        >
          <p className="tour-progress">Tour complete</p>
          <h3>You have operated {demo.name}.</h3>
          <p>
            Every change you made happened in your own browser. In a production
            build the same interfaces connect to real storage, notifications,
            and your actual data.
          </p>
          <div className="tour-complete-actions">
            <Link className="btn btn-primary" href={`/contact/?service=${demo.serviceParam}`}>
              {demo.ctaLabel} <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <button type="button" className="tour-btn tour-btn-ghost" onClick={() => onGoTo(0)}>
              Restart tour
            </button>
            <button type="button" className="tour-btn tour-btn-ghost" onClick={onEnd}>
              Keep exploring
            </button>
          </div>
          <p className="tour-note">
            The enquiry form opens with the matching service preselected.
          </p>
        </div>
      ) : (
        <div
          className="tour-card"
          ref={cardRef}
          role="dialog"
          aria-label={`Guided tour: ${step.title}`}
          tabIndex={-1}
        >
          <p className="tour-progress">{progressLabel}</p>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
          {step.action ? <p className="tour-action">{step.action}</p> : null}
          <div className="tour-controls">
            {stepIndex > 0 ? (
              <button type="button" className="tour-btn" onClick={() => onGoTo(stepIndex - 1)}>
                Back
              </button>
            ) : null}
            <span className="tour-dots" aria-hidden="true">
              {steps.slice(1).map((highlight, index) => (
                <span
                  key={highlight.id}
                  className={index + 1 === stepIndex ? "is-on" : undefined}
                />
              ))}
            </span>
            <button
              type="button"
              className="tour-btn tour-btn-primary"
              onClick={() => onGoTo(stepIndex + 1)}
            >
              {stepIndex >= steps.length - 1 ? "Finish tour" : "Next"}
            </button>
            <button type="button" className="tour-btn tour-btn-ghost" onClick={onEnd}>
              Skip tour
            </button>
          </div>
          <p className="tour-note">Arrow keys navigate · Escape ends the tour</p>
        </div>
      )}
    </div>
  );
}
