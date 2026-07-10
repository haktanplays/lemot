/**
 * Learner session controller (P3.6 + P3.7) — event creation, SERIALIZED local
 * append, and local MasterySnapshot derivation.
 *
 * Framework-agnostic core for the learner renderer. It turns a card result into a
 * full `LearningEvent` and appends it to a `LearningRepository` through an
 * INTERNAL PROMISE CHAIN, so concurrent card actions can never interleave a
 * read-modify-write on the underlying store (the P0–P2 audit's hard requirement:
 * `LocalRepository` writes must be serialized). UI components call this
 * controller — they must NEVER call `repository.appendEvent` directly.
 *
 * P3.7 closes the local loop: once an append SETTLES inside the serialized queue,
 * the controller reads ALL events back (`readAllEvents`), folds them with the pure
 * `scoreEvents()` reducer into a `MasterySnapshot`, and emits the new snapshot
 * through `onUpdate`. Reading after the append settles (never before) keeps the
 * derived snapshot consistent with what was just written, and reusing the
 * serialized `tail` keeps the read ordered behind its own write.
 *
 * Boundaries (P3.7):
 *  - The derived `MasterySnapshot` lives only in caller state. NO Mon Lexique /
 *    Practice Pool / Daily Review surfaces, NO Supabase / RemoteRepository /
 *    network / AI, NO snapshot persistence (the local snapshot is recomputed from
 *    events each time, so `writeSnapshot` is not called here).
 *  - The ONE allowed impurity is event construction time: `now()` (default
 *    `Date.now`) stamps `timestamp` / `queuedAt`. `grade()`, the mastery reducer,
 *    and the repository stay pure — they never call `Date.now`.
 *  - `now` and `makeClientEventId` are injectable so the serialization + derivation
 *    can be unit-tested deterministically with a fake repository.
 */
import type { ExerciseBlueprint, ItemId } from "./types";
import type { DeviceInfo, ErrorTagCode, LearningEvent } from "./events";
import type { LearningRepository } from "./repository/types";
import { scoreEvents, type MasterySnapshot } from "./mastery";

/** Minimal grade-result shape the controller needs (a `GradeResult` satisfies it). */
export type GradeResultLike = {
  result: ErrorTagCode;
  errorTags: ErrorTagCode[];
  normalizedAnswer: string | null;
};

/** Payload a graded learner card hands up on each Check. */
export type GradedAttemptPayload = {
  userAnswer: string | null;
  expectedAnswer: string | null;
  gradeResult: GradeResultLike;
};
/** Handler a graded card receives from the shell (shell adds the exercise). */
export type GradedAttemptHandler = (payload: GradedAttemptPayload) => void;

export type RecordGradedAttemptInput = GradedAttemptPayload & {
  exercise: ExerciseBlueprint;
};
export type RecordRecognitionRevealInput = {
  exercise: ExerciseBlueprint;
};

/** Where the local save/derive loop currently is, for a calm learner hint. */
export type SessionStatus = "idle" | "saving" | "saved" | "error";

/**
 * Observable session state the controller emits through `onUpdate`. The derived
 * `MasterySnapshot` is held here (and, by the caller, in React state) — it is a
 * pure projection of the locally stored events, never a persisted source.
 */
export type SessionState = {
  status: SessionStatus;
  /** Latest snapshot derived from ALL local events after the last settled append. */
  latestSnapshot: MasterySnapshot | null;
  /**
   * All local events behind `latestSnapshot`, in append order. Surfaced so a
   * caller can run a pure projection (e.g. `selectLessonProgress`) without its
   * own storage read. Same array the snapshot was derived from; never mutated.
   */
  events: readonly LearningEvent[];
  /** Event count behind `latestSnapshot` (for founder-local sanity, not a learner label). */
  lastEventCount: number;
  /** Event-time of the last settled save (controller clock), or null before the first. */
  lastSavedAt: number | null;
};

export type SessionControllerOptions = {
  repository: LearningRepository;
  sessionId: string;
  lessonId: string;
  contentVersion: string;
  appBuild?: string;
  deviceInfo?: DeviceInfo;
  /** Injectable clock — the ONE allowed impurity (event timestamps). Default `Date.now`. */
  now?: () => number;
  /** Injectable id factory. Default is a founder-local id (NOT a remote-grade UUID). */
  makeClientEventId?: (timestamp: number) => string;
  /** Notified whenever session state changes (saving → saved / error). */
  onUpdate?: (state: SessionState) => void;
};

/**
 * Founder-local client-event id. Good enough to de-duplicate within a single
 * device's session; it is NOT the final remote-grade UUID strategy (that lands
 * with the remote phase). Uses the event timestamp + a random suffix so it does
 * not call `Date.now` a second time.
 */
export function makeLocalClientEventId(timestamp: number): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `lm-${timestamp.toString(36)}-${rand}`;
}

export class LearningSessionController {
  private readonly repo: LearningRepository;
  private readonly sessionId: string;
  private readonly lessonId: string;
  private readonly contentVersion: string;
  private readonly appBuild: string;
  private readonly deviceInfo: DeviceInfo;
  private readonly now: () => number;
  private readonly makeClientEventId: (timestamp: number) => string;
  private readonly onUpdate?: (state: SessionState) => void;

  /** Serialized write queue — every append chains off the previous one. */
  private tail: Promise<void> = Promise.resolve();
  /** Per-exercise attempt counter (increments on each recorded action). */
  private readonly attempts = new Map<string, number>();
  /** Last emitted state; the snapshot lives here until React state mirrors it. */
  private current: SessionState = {
    status: "idle",
    latestSnapshot: null,
    events: [],
    lastEventCount: 0,
    lastSavedAt: null,
  };

  constructor(opts: SessionControllerOptions) {
    this.repo = opts.repository;
    this.sessionId = opts.sessionId;
    this.lessonId = opts.lessonId;
    this.contentVersion = opts.contentVersion;
    this.appBuild = opts.appBuild ?? "founder-local";
    this.deviceInfo = opts.deviceInfo ?? { platform: "founder-local" };
    this.now = opts.now ?? (() => Date.now());
    this.makeClientEventId = opts.makeClientEventId ?? makeLocalClientEventId;
    this.onUpdate = opts.onUpdate;
  }

  /** Record one graded attempt (one event per Check, correct or wrong). */
  recordGradedAttempt(input: RecordGradedAttemptInput): void {
    const timestamp = this.now();
    const errorTags =
      input.gradeResult.errorTags.length > 0
        ? input.gradeResult.errorTags
        : [input.gradeResult.result];
    this.emitSaving();
    this.enqueue(
      this.buildEvent({
        exercise: input.exercise,
        timestamp,
        userAnswer: input.userAnswer,
        expectedAnswer: input.expectedAnswer,
        normalizedAnswer: input.gradeResult.normalizedAnswer,
        result: input.gradeResult.result,
        errorTags,
      }),
      timestamp,
    );
  }

  /** Record a recognition reveal (ungraded; no `grade()` call). */
  recordRecognitionReveal(input: RecordRecognitionRevealInput): void {
    const timestamp = this.now();
    const ex = input.exercise;
    const expectedAnswer =
      (ex.operation === "recognition"
        ? ex.displayAnswer ?? ex.targetText
        : ex.targetText) ?? null;
    this.emitSaving();
    this.enqueue(
      this.buildEvent({
        exercise: ex,
        timestamp,
        userAnswer: null,
        expectedAnswer,
        normalizedAnswer: null,
        result: "correct",
        errorTags: ["correct"],
      }),
      timestamp,
    );
  }

  /** Resolves once all queued appends have settled. For tests / teardown. */
  flush(): Promise<void> {
    return this.tail;
  }

  private nextAttempt(exerciseId: string): number {
    const n = (this.attempts.get(exerciseId) ?? 0) + 1;
    this.attempts.set(exerciseId, n);
    return n;
  }

  private buildEvent(args: {
    exercise: ExerciseBlueprint;
    timestamp: number;
    userAnswer: string | null;
    expectedAnswer: string | null;
    normalizedAnswer: string | null;
    result: ErrorTagCode;
    errorTags: ErrorTagCode[];
  }): LearningEvent {
    const attemptNumber = this.nextAttempt(args.exercise.id);
    const allTargets: ItemId[] = Array.isArray(args.exercise.targetItemIds)
      ? [...args.exercise.targetItemIds]
      : [];
    // B23: a context_chain emits ONE graded event per internal step, and every
    // step event carries the exercise's full target set. Crediting every target
    // on every step over-weights mastery (N steps × M targets → each target
    // "mastered" off a single chain). Bound it: attribute the targets only on the
    // chain's FIRST recorded event (attemptNumber 1), so one chain credits each
    // target at most once. Later step events still persist (history, attempt
    // number, result) but carry no item attribution. Every non-chain operation is
    // unchanged — it always carries its full target set.
    const itemIds: ItemId[] =
      args.exercise.operation === "context_chain" && attemptNumber > 1
        ? []
        : allTargets;
    return {
      clientEventId: this.makeClientEventId(args.timestamp),
      sessionId: this.sessionId,
      lessonId: this.lessonId,
      exerciseId: args.exercise.id,
      operation: args.exercise.operation,
      itemIds,
      promptLevel: "PF0",
      attemptNumber,
      userAnswer: args.userAnswer,
      expectedAnswer: args.expectedAnswer,
      normalizedAnswer: args.normalizedAnswer,
      result: args.result,
      errorTags: args.errorTags,
      timestamp: args.timestamp,
      contentVersion: this.contentVersion,
      appBuild: this.appBuild,
      deviceInfo: this.deviceInfo,
      sync: { status: "pending", origin: "local", queuedAt: args.timestamp },
    };
  }

  private enqueue(event: LearningEvent, savedAt: number): void {
    this.tail = this.tail
      .then(() => this.repo.appendEvent(event))
      // Derive ONLY after the append settles, and reuse the serialized tail so
      // the read is ordered behind its own write (never a stale pre-append read).
      .then(() => this.deriveAndNotify(savedAt))
      .catch(() => {
        // Append or derive failed — surface a calm error status, keep the chain
        // draining. (Founder-local; richer observability lands with the remote phase.)
        this.emit({ ...this.current, status: "error" });
      });
  }

  /**
   * Read ALL local events back and fold them into a fresh `MasterySnapshot` with
   * the pure `scoreEvents()` reducer, then emit it. Runs inside the serialized
   * queue, after the triggering append has settled.
   */
  private async deriveAndNotify(savedAt: number): Promise<void> {
    const events = await this.repo.readAllEvents();
    const snapshot = scoreEvents(events);
    this.emit({
      status: "saved",
      latestSnapshot: snapshot,
      events,
      lastEventCount: events.length,
      lastSavedAt: savedAt,
    });
  }

  /** Mark the loop as in-flight without disturbing the last derived snapshot. */
  private emitSaving(): void {
    this.emit({ ...this.current, status: "saving" });
  }

  private emit(next: SessionState): void {
    this.current = next;
    this.onUpdate?.(next);
  }
}
