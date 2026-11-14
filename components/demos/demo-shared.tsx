"use client";

import { createContext, useContext } from "react";
import type { DemoInfo } from "@/lib/demos/registry";

/**
 * Shared context for the demo window. The demo applications live in a keyed
 * subtree that remounts on reset, so everything that must survive a reset
 * (the active view, the tour) lives in the window above them.
 */
export type DemoWindowApi = {
  demo: DemoInfo;
  /** Which top-level view of the demo application is shown. */
  activeView: string;
  setView: (view: string) => void;
  /** Increments on "Reset demo" to remount the application pristine. */
  resetKey: number;
};

export const DemoWindowContext = createContext<DemoWindowApi | null>(null);

export function useDemoWindow(): DemoWindowApi {
  const context = useContext(DemoWindowContext);
  if (!context) {
    throw new Error("useDemoWindow must be used inside a DemoWindow");
  }
  return context;
}
