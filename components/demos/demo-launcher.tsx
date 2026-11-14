"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import type { DemoInfo } from "@/lib/demos/registry";
import type { TourStep } from "@/lib/demos/tour";
import DemoWindow from "./demo-window";

type DemoLauncherProps = {
  demo: DemoInfo;
  steps: TourStep[];
  /** The demo application, passed from the server page. */
  children: ReactNode;
};

/**
 * The launch button on a demo intro page plus the overlay it opens. The demo
 * application only mounts when the overlay is open, so none of the demo
 * internals are server-rendered or shipped into the initial page markup.
 */
export default function DemoLauncher({ demo, steps, children }: DemoLauncherProps) {
  const [open, setOpen] = useState(false);
  const launchRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    launchRef.current?.focus();
  };

  return (
    <div className="demo-launch">
      <div className="hero-actions demo-launch-actions">
        <button
          type="button"
          className="btn btn-primary"
          ref={launchRef}
          onClick={() => setOpen(true)}
        >
          Launch the {demo.name} demo <span className="arrow" aria-hidden="true">↗</span>
        </button>
        <p className="demo-launch-note">
          Runs in your browser · sample data · no signup
        </p>
      </div>
      {open ? (
        <DemoWindow demo={demo} steps={steps} onClose={close}>
          {children}
        </DemoWindow>
      ) : null}
    </div>
  );
}
