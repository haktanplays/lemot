/**
 * Lesson-completion projection-navigation gate (PR-09) — pure, framework-free.
 *
 * The race this closes: the final lesson screen's answer action QUEUES its
 * learning event and the renderer advances to the completion view synchronously.
 * A fast tap on a projection link (Practice Hub, Mon Lexique) used to navigate
 * immediately, and the destination's `readMasterySnapshot()` could read the log
 * BEFORE the final lesson event had been appended — a set or lexicon one event
 * short of what the learner just did.
 *
 * The gate enforces one ordering for EVERY projection exit from completion:
 *
 *   tap projection link → lesson controller settles → navigate → destination reads
 *
 * `whenSettled()` resolves after success AND caught-error settlement alike, so
 * a failed append still navigates — the destination reads the authoritative,
 * unchanged log. Nothing here emits an event, retries, or fabricates success.
 * Ordinary Back to Home is deliberately NOT routed through this gate, and no
 * active-lesson Continue awaits persistence — the barrier belongs to projection
 * navigation only.
 *
 * Narrow by intent: a completion-view navigation gate, not an async framework.
 */

export type SettledNavigationGate = {
  /**
   * Navigate to ONE destination after the session settles. Repeated taps while
   * a request is pending are absorbed — whichever link was tapped first wins,
   * and the navigation runs at most once per request. A completion view that
   * has unmounted (`isActive()` false) never navigates late.
   */
  requestSettledNavigation(navigate: () => void): void;
};

export function createSettledNavigationGate(args: {
  /** The session's settlement boundary (the narrow `whenSettled` lifecycle). */
  whenSettled: () => Promise<void>;
  /** False once the owning completion view unmounted. */
  isActive: () => boolean;
}): SettledNavigationGate {
  let pending = false;
  return {
    requestSettledNavigation(navigate: () => void) {
      if (pending) return; // dedupe taps — first destination wins, once
      pending = true;
      // `whenSettled()` never rejects (the controller catches queue errors and
      // keeps draining), but a defensive catch keeps a future regression from
      // leaving the gate permanently stuck.
      args
        .whenSettled()
        .catch(() => {})
        .then(() => {
          pending = false;
          if (!args.isActive()) return;
          navigate();
        });
    },
  };
}
