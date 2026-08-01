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
import type { ExerciseBlueprint, ItemId, PromptFadeLevel } from "./types";
import type {
  CurriculumTreatment,
  DeviceInfo,
  ErrorTagCode,
  EvidenceClass,
  LearningEvent,
  LearningEventPrimitive,
  LearningEventSequence,
  LearningPlacement,
} from "./events";
import type { SentenceId } from "../identity/sentenceIdentity";
import type { LearningRepository } from "./repository/types";
import type {
  AssistanceSnapshot,
  EvidenceOpportunityContext,
} from "./evidence-context";
import { createLearningEvent } from "./event-envelope";
import { resolveEvidenceAdmission } from "./evidence-admission";
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

/**
 * The authored context an attempt needs before it can become evidence.
 *
 * PR-03: the controller no longer invents ANY of this. It used to hardcode
 * `promptLevel: "PF0"` and stamp `legacy_unknown` on every target — hidden
 * defaults that quietly decided what an attempt could prove. The integration
 * layer now states the facts explicitly, and the controller resolves and
 * persists them.
 *
 * `treatmentFor` is a resolver rather than an array so the controller can apply
 * it AFTER the context-chain bounding rule has decided the final target list,
 * keeping treatments index-aligned with `itemIds` by construction.
 */
export type AttemptEvidenceContext = {
  /** The prompt-fade level actually in effect — never assumed. */
  promptLevel: PromptFadeLevel;
  /** What assistance was present at the exact moment of the attempt. */
  assistance: AssistanceSnapshot;
  /** The authored opportunity + evaluation path behind this attempt. */
  opportunity: EvidenceOpportunityContext;
  /** Authored treatment of one target, read from the lesson contract. */
  treatmentFor: (itemId: ItemId) => CurriculumTreatment;
};

/**
 * WHERE an event happened, and which authored artefacts it points at.
 *
 * Until PR-05 the controller answered this itself, hardcoding
 * `placement: "engine_fixture_sandbox"`. That was defensible while the fixture
 * sandbox was the only caller; the moment the SAME controller became reachable
 * from the shipped lesson path it became a lie waiting to be recorded — every
 * shipped-lesson event would have claimed to come from the sandbox.
 *
 * The integration layer states it explicitly instead. The controller never
 * infers placement from `operation`, sentence identity from target text, or EV
 * identity from screen type.
 */
export type EventSurfaceContext = {
  placement: LearningPlacement;
  /** Exercise Variation Inventory id (`EV-###`), or null when none is registered. */
  evId: string | null;
  /** The authored payload this attempt rendered, or null. */
  payloadId: string | null;
  /** Canonical sentence identity, or null when none is registered. */
  sentenceId: SentenceId | null;
  /** Multi-step orchestration membership, or null for a standalone attempt. */
  sequence: LearningEventSequence | null;
};

/**
 * Resolve the surface context for one exercise.
 *
 * Required on every controller — there is deliberately NO default. A default
 * would silently reintroduce the sandbox placement for whichever caller forgot
 * to supply one, which is exactly the bug this contract removes.
 */
export type EventSurfaceResolver = (
  exercise: ExerciseBlueprint,
) => EventSurfaceContext;

export type RecordGradedAttemptInput = GradedAttemptPayload & {
  exercise: ExerciseBlueprint;
  context: AttemptEvidenceContext;
};
export type RecordRecognitionRevealInput = {
  exercise: ExerciseBlueprint;
  context: AttemptEvidenceContext;
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
  /**
   * REQUIRED. Where this controller's events happen. No default exists — see
   * {@link EventSurfaceResolver}.
   */
  resolveEventSurface: EventSurfaceResolver;
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
  private readonly resolveEventSurface: EventSurfaceResolver;
  private readonly now: () => number;
  private readonly makeClientEventId: (timestamp: number) => string;
  private readonly onUpdate?: (state: SessionState) => void;

  /** Serialized write queue — every append chains off the previous one. */
  private tail: Promise<void> = Promise.resolve();
  /** Per-exercise attempt counter (increments on each recorded action). */
  private readonly attempts = new Map<string, number>();
  /**
   * B23: context_chain exercise ids that have already been credited ONE success
   * on this controller. Scoped per exercise.id and per controller instance (one
   * lesson session) — it never leaks across exercises (distinct keys) or sessions
   * (a fresh controller starts empty). Used to bound repeated chain successes
   * without dropping later-step failures.
   */
  private readonly chainSuccessCredited = new Set<string>();
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
    this.resolveEventSurface = opts.resolveEventSurface;
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
        context: input.context,
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

  /**
   * Record a recognition reveal (ungraded; no `grade()` call).
   *
   * PR-02 correction: this previously stored `result: "correct"` — a fabricated
   * grade for something the learner was never asked to answer, which the v1
   * reducer then counted as a recognition SUCCESS. It now emits a genuine
   * non-assessed `reveal` event: comparison-only evidence, completed-unassessed
   * outcome, and no grading facets at all (the union leaves nowhere to put one).
   */
  recordRecognitionReveal(input: RecordRecognitionRevealInput): void {
    const timestamp = this.now();
    const ex = input.exercise;
    const expectedAnswer =
      (ex.operation === "recognition"
        ? ex.displayAnswer ?? ex.targetText
        : ex.targetText) ?? null;
    this.emitSaving();
    this.enqueue(
      this.buildNonAssessedEvent({
        exercise: ex,
        context: input.context,
        timestamp,
        primitive: "reveal",
        evidenceClass: "comparison_only",
        expectedAnswer,
      }),
      timestamp,
    );
  }

  /**
   * Record that the learner MET a form. Nothing was asked; nothing was graded.
   *
   * Exposure is the weakest honest record there is: it says the item was on
   * screen, not that anything was understood. The mastery reducer routes
   * `exposure` to no channel at all, so this can never become a counter.
   */
  recordExposure(input: RecordRecognitionRevealInput): void {
    const timestamp = this.now();
    this.emitSaving();
    this.enqueue(
      this.buildNonAssessedEvent({
        exercise: input.exercise,
        context: input.context,
        timestamp,
        primitive: "exposure",
        evidenceClass: "exposure",
        expectedAnswer:
          (input.exercise.operation === "recognition"
            ? input.exercise.displayAnswer
            : input.exercise.targetText) ?? null,
      }),
      timestamp,
    );
  }

  /**
   * Record an UNGRADED open-production attempt (W1).
   *
   * The learner wrote something toward a communicative goal and there is no
   * deterministic answer to compare it against — so the raw text is preserved
   * and NO grading facet exists: no `result`, no `errorTags`, no
   * `normalizedAnswer`. The union makes that structural, not a convention.
   */
  recordOpenProductionAttempt(
    input: RecordRecognitionRevealInput & { userAnswer: string },
  ): void {
    const timestamp = this.now();
    this.emitSaving();
    this.enqueue(
      this.buildNonAssessedEvent({
        exercise: input.exercise,
        context: input.context,
        timestamp,
        primitive: "production",
        evidenceClass: "open_production_attempt",
        userAnswer: input.userAnswer,
        expectedAnswer: null,
      }),
      timestamp,
    );
  }

  /**
   * Record that the learner then SAW a model answer.
   *
   * Comparison, not correction: the model is stored as `expectedAnswer` for
   * later reading, and the difference between it and what the learner wrote is
   * never a verdict. A reveal makes no claim about the learner at all.
   */
  recordComparisonReveal(
    input: RecordRecognitionRevealInput & { modelAnswer?: string | null },
  ): void {
    const timestamp = this.now();
    this.emitSaving();
    this.enqueue(
      this.buildNonAssessedEvent({
        exercise: input.exercise,
        context: input.context,
        timestamp,
        primitive: "reveal",
        evidenceClass: "comparison_only",
        expectedAnswer: input.modelAnswer ?? null,
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

  /**
   * B23: bound context_chain mastery credit WITHOUT dropping later-step failures.
   *
   * A context_chain emits one graded event per step, each carrying the exercise's
   * full target set, so crediting every step over-weights mastery (N steps × M
   * targets → every target "mastered" off one chain). But suppressing every step
   * after the first would silently drop a failure that follows a correct step
   * (the first step would decide the whole chain — audit PR-E2 review P1). So we
   * dedup ONLY repeated SUCCESSES: the first success in a chain attempt carries
   * the targets (one bounded box advance); a later success carries none. Every
   * NON-success outcome (failure / near-miss / precision / skip) ALWAYS carries
   * the targets, so its failure / weakness / reinforcement signal still registers.
   * Non-context_chain operations are unchanged — they always carry their targets.
   *
   * "Success" mirrors the mastery reducer's box-advancing set (correct /
   * accepted_variant); every other tag is a non-success here. Dedup is keyed by
   * exercise.id on this controller (see `chainSuccessCredited`), so it is scoped
   * to the current chain attempt and never leaks across exercises or sessions.
   */
  private boundChainItemIds(
    exercise: ExerciseBlueprint,
    result: ErrorTagCode,
    allTargets: ItemId[],
  ): ItemId[] {
    if (exercise.operation !== "context_chain") return allTargets;
    const isSuccess = result === "correct" || result === "accepted_variant";
    if (!isSuccess) return allTargets; // failures / near-miss / skip always register
    if (this.chainSuccessCredited.has(exercise.id)) return []; // repeat success → no extra credit
    this.chainSuccessCredited.add(exercise.id);
    return allTargets; // first success → one bounded credit
  }

  private buildEvent(args: {
    exercise: ExerciseBlueprint;
    context: AttemptEvidenceContext;
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
    const itemIds = this.boundChainItemIds(args.exercise, args.result, allTargets);
    const targetTreatments = itemIds.map((id) => args.context.treatmentFor(id));
    const primitive: LearningEventPrimitive =
      args.exercise.operation === "build" || args.exercise.operation === "recognition"
        ? "selection"
        : "production";
    const evidenceCeiling: EvidenceClass =
      primitive === "selection" ? "recognition" : "controlled_production";

    // Attribution, admissibility and the final evidence class are RESOLVED from
    // the authored context — never assumed by this controller.
    const admission = resolveEvidenceAdmission({
      assessed: true,
      primitive,
      evidenceCeiling,
      targetTreatments,
      assistance: args.context.assistance,
      opportunity: args.context.opportunity,
    });

    return createLearningEvent({
      assessed: true,
      clientEventId: this.makeClientEventId(args.timestamp),
      sessionId: this.sessionId,
      lessonId: this.lessonId,
      exerciseId: args.exercise.id,
      operation: args.exercise.operation,
      itemIds,
      promptLevel: args.context.promptLevel,
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
      primitive,
      evidenceCeiling,
      evidenceClass: admission.evidenceClass,
      targetTreatments,
      assistance: args.context.assistance,
      attribution: admission.attribution,
      admissibility: admission.admissibility,
      ...this.resolveEventSurface(args.exercise),
    });
  }

  /** Build a genuinely non-assessed event (no grading facets exist on this arm). */
  private buildNonAssessedEvent(args: {
    exercise: ExerciseBlueprint;
    context: AttemptEvidenceContext;
    timestamp: number;
    primitive: Exclude<LearningEventPrimitive, "selection">;
    evidenceClass: EvidenceClass;
    expectedAnswer?: string | null;
    /** Only an open-production attempt has learner text to preserve. */
    userAnswer?: string | null;
  }): LearningEvent {
    const attemptNumber = this.nextAttempt(args.exercise.id);
    const itemIds: ItemId[] = Array.isArray(args.exercise.targetItemIds)
      ? [...args.exercise.targetItemIds]
      : [];
    const targetTreatments = itemIds.map((id) => args.context.treatmentFor(id));
    const admission = resolveEvidenceAdmission({
      assessed: false,
      primitive: args.primitive,
      evidenceCeiling: args.evidenceClass,
      targetTreatments,
      assistance: args.context.assistance,
      opportunity: args.context.opportunity,
    });

    return createLearningEvent({
      assessed: false,
      clientEventId: this.makeClientEventId(args.timestamp),
      sessionId: this.sessionId,
      lessonId: this.lessonId,
      exerciseId: args.exercise.id,
      operation: args.exercise.operation,
      itemIds,
      promptLevel: args.context.promptLevel,
      attemptNumber,
      userAnswer: args.userAnswer ?? null,
      expectedAnswer: args.expectedAnswer ?? null,
      timestamp: args.timestamp,
      contentVersion: this.contentVersion,
      appBuild: this.appBuild,
      deviceInfo: this.deviceInfo,
      sync: { status: "pending", origin: "local", queuedAt: args.timestamp },
      primitive: args.primitive,
      evidenceCeiling: args.evidenceClass,
      evidenceClass: admission.evidenceClass,
      outcome: "completed_unassessed",
      targetTreatments,
      assistance: args.context.assistance,
      attribution: admission.attribution,
      admissibility: admission.admissibility,
      ...this.resolveEventSurface(args.exercise),
    });
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
