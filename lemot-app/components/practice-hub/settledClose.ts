/**
 * Practice-Hub settled-close gate (PR-08 correction) — pure, framework-free.
 *
 * The race this closes: `recordGradedAttempt()` returns void and QUEUES
 * append → readAllEvents → scoreEvents; the reused screens reveal Continue the
 * moment the answer callback returns. A fast Continue therefore used to reach
 * the parent's `onClose` — and its immediate `readMasterySnapshot()` rebuild —
 * before the append had settled, producing a stale Hub set right after a
 * successful attempt.
 *
 * The gate enforces one ordering for EVERY Hub exit:
 *
 *   answer queued → controller queue settles (flush) → parent onClose → rebuild
 *
 * Closing before any answer completes immediately, because an idle controller's
 * queue is already settled. `flush()` resolves after success AND caught-error
 * settlement alike, so on failure the parent still rebuilds — from the
 * authoritative unchanged log. Nothing here fabricates success, mutates the Hub
 * set, or touches a repository.
 *
 * Narrow by intent: this is a Practice-Hub close gate, not an async framework.
 */

export type SettledCloseGate = {
  /**
   * Request a close that fires only after the captured controller settles.
   * Repeated taps while a request is pending are absorbed; one request invokes
   * the parent callback at most once, and only while the captured identity is
   * still current and the owner is still active.
   */
  requestSettledClose(): void;
};

export function createSettledCloseGate(args: {
  /** The CAPTURED controller's settlement boundary. */
  flush: () => Promise<void>;
  /** The identity this gate was created for (generation::lesson::screen). */
  identity: string;
  /** The owner's CURRENT identity — compared at completion time. */
  currentIdentity: () => string;
  /** False once the owner unmounted; a late completion then does nothing. */
  isActive: () => boolean;
  /** The parent close callback. Never invoked more than once per request. */
  onClose: () => void;
}): SettledCloseGate {
  let pending = false;
  return {
    requestSettledClose() {
      if (pending) return; // dedupe Continue/Close double-taps
      pending = true;
      // `flush()` never rejects (the controller catches queue errors and keeps
      // draining), but a defensive catch keeps a future regression from leaving
      // the gate permanently stuck.
      args
        .flush()
        .catch(() => {})
        .then(() => {
          pending = false;
          // An obsolete gate — privacy reset, a newly selected source, or an
          // unmounted owner — must not close the CURRENT card. The old queue is
          // deliberately not cancelled; the stale-writer barrier already owns
          // the safety of its writes.
          if (!args.isActive()) return;
          if (args.currentIdentity() !== args.identity) return;
          args.onClose();
        });
    },
  };
}
