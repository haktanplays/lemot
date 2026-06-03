/**
 * Learner session controller (P3.6) — event creation + SERIALIZED local append.
 *
 * Framework-agnostic core for the learner renderer. It turns a card result into a
 * full `LearningEvent` and appends it to a `LearningRepository` through an
 * INTERNAL PROMISE CHAIN, so concurrent card actions can never interleave a
 * read-modify-write on the underlying store (the P0–P2 audit's hard requirement:
 * `LocalRepository` writes must be serialized). UI components call this
 * controller — they must NEVER call `repository.appendEvent` directly.
 *
 * Boundaries (P3.6):
 *  - No mastery / scoreEvents (that is P3.7), no Mon Lexique / Practice Pool, no
 *    Supabase / RemoteRepository / network / AI.
 *  - The ONE allowed impurity is event construction time: `now()` (default
 *    `Date.now`) stamps `timestamp` / `queuedAt`. `grade()`, the mastery reducer,
 *    and the repository stay pure — they never call `Date.now`.
 *  - `now` and `makeClientEventId` are injectable so the serialization can be
 *    unit-tested deterministically with a fake repository.
 */
import type { ExerciseBlueprint, ItemId } from "./types";
import type { DeviceInfo, ErrorTagCode, LearningEvent } from "./events";
import type { LearningRepository } from "./repository/types";

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

  /** Serialized write queue — every append chains off the previous one. */
  private tail: Promise<void> = Promise.resolve();
  /** Per-exercise attempt counter (increments on each recorded action). */
  private readonly attempts = new Map<string, number>();

  constructor(opts: SessionControllerOptions) {
    this.repo = opts.repository;
    this.sessionId = opts.sessionId;
    this.lessonId = opts.lessonId;
    this.contentVersion = opts.contentVersion;
    this.appBuild = opts.appBuild ?? "founder-local";
    this.deviceInfo = opts.deviceInfo ?? { platform: "founder-local" };
    this.now = opts.now ?? (() => Date.now());
    this.makeClientEventId = opts.makeClientEventId ?? makeLocalClientEventId;
  }

  /** Record one graded attempt (one event per Check, correct or wrong). */
  recordGradedAttempt(input: RecordGradedAttemptInput): void {
    const timestamp = this.now();
    const errorTags =
      input.gradeResult.errorTags.length > 0
        ? input.gradeResult.errorTags
        : [input.gradeResult.result];
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
    const itemIds: ItemId[] = Array.isArray(args.exercise.targetItemIds)
      ? [...args.exercise.targetItemIds]
      : [];
    return {
      clientEventId: this.makeClientEventId(args.timestamp),
      sessionId: this.sessionId,
      lessonId: this.lessonId,
      exerciseId: args.exercise.id,
      operation: args.exercise.operation,
      itemIds,
      promptLevel: "PF0",
      attemptNumber: this.nextAttempt(args.exercise.id),
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

  private enqueue(event: LearningEvent): void {
    this.tail = this.tail
      .then(() => this.repo.appendEvent(event))
      .catch(() => {
        // Swallow append errors so the serialized chain keeps draining.
        // (Founder-local; observability is added with the remote phase.)
      });
  }
}
