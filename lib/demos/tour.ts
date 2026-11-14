/**
 * Guided tour step definitions. Pure types — data files describe their tours
 * with these, components consume them. No runtime code in this module.
 */

export type TourStep = {
  /** Stable id, e.g. "sv-menu". */
  id: string;
  /** Switch the demo to this top-level view before showing the step. */
  view?: string;
  /**
   * Value of a `data-tour` attribute on an element inside the demo. The
   * tooltip attaches itself to that element. Omit for centered steps.
   */
  target?: string;
  title: string;
  body: string;
  /** Optional "Try it" prompt that invites a small successful action. */
  action?: string;
};
