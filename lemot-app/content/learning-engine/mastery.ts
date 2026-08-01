/**
 * Mastery reducer (P2.2) — pure deterministic projection of the event log.
 *
 * `scoreEvent(snapshot, event)` folds one `LearningEvent` into a
 * `MasterySnapshot`; `scoreEvents` folds a list. Mastery is a PROJECTION of the
 * append-only event log (never primary state), so re-running the reducer over
 * the same events reproduces the same snapshot — on-device (for UI later) or
 * server-side (for the dashboard later).
 *
 * Hard boundaries (P2.2): pure functions only.
 *  - No `Date.now()` (time comes from `event.timestamp`), no storage, no
 *    network, no React, no AI.
 *  - Does NOT mutate the input snapshot or event (returns fresh objects).
 *  - Idempotent by `clientEventId` (re-applying a processed event is a no-op).
 *  - Does NOT touch the repository / its `unknown` snapshot type, storage, the
 *    renderer, the validator, or content. Reuses `ItemId` / `PromptFadeLevel`
 *    from ./types and `LearningEvent` / `ErrorTagCode` from ./events.
 */
import type { ItemId, PromptFadeLevel } from "./types";
import type {
  AssessedLearningEvent,
  ErrorTagCode,
  EvidenceClass,
  LearningEvent,
} from "./events";
import { isAssessedEvent } from "./events";
import { MASTERY_BEARING_ADMISSION_STATUSES } from "./evidence-context";

/**
 * Snapshot schema version (bump when the shape changes).
 *
 * v0.3 (PR-04) adds the scoped `production` evidence block. A v0.2 snapshot is
 * REJECTED rather than migrated: it records only an undifferentiated
 * `productionSuccess`, so the independent / supported / self-correction split
 * cannot be reconstructed from it without inventing history. Mastery is a
 * projection (ADR-0009 / I-1, I-2) — a scoring-policy change re-derives from the
 * append-only log, it never migrates a cache.
 */
export const MASTERY_SNAPSHOT_VERSION = "mastery-v0.3";

/** An item is "weak" at this many production fails, or this many of one error tag. */
export const WEAK_THRESHOLD = 3;

/** Leitner box → days until next due. Box 0 = due immediately. */
export const LEITNER_INTERVAL_DAYS = [0, 1, 3, 7, 30] as const;

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_LEITNER_BOX = LEITNER_INTERVAL_DAYS.length - 1; // 4

/** Prompt-fade levels in order; index 0..3 maps to PF0..PF3. */
const PF_LEVELS: readonly PromptFadeLevel[] = ["PF0", "PF1", "PF2", "PF3"];
const MAX_PF_INDEX = PF_LEVELS.length - 1; // 3
const pfIndexOf = (level: PromptFadeLevel): number => {
  const i = PF_LEVELS.indexOf(level);
  return i < 0 ? 0 : i;
};

export type MonLexiqueStatus = "hidden" | "added" | "weak";
export type PracticeEligibility = "none" | "build" | "stretch" | "challenge";

/** Attempt tallies for ONE evidence channel. `attempts >= success + failure`. */
export type EvidenceOutcomeCounts = {
  attempts: number;
  success: number;
  failure: number;
};

/** The three production evidence channels, kept apart forever. */
export type ProductionChannel = "independent" | "supported" | "selfCorrection";

/**
 * Scoped production evidence (PR-04, D-8 decided: separate counters).
 *
 * A single `productionScope: "supported" | "independent"` label was rejected
 * because one item legitimately accumulates a MIXED history — two supported
 * attempts, one supported success, a later independent success, a
 * self-correction — and any single mutable label must overwrite or collapse part
 * of that. Three independent channels lose nothing.
 *
 * FQ-3 / I-26: assistance changes what a success PROVES, not whether it
 * happened. Every channel therefore keeps its own full history; none is a
 * discount applied to another.
 */
export type ProductionEvidenceCounts = {
  independent: EvidenceOutcomeCounts;
  supported: EvidenceOutcomeCounts;
  selfCorrection: EvidenceOutcomeCounts;
};

/**
 * What the scoped counters can currently support as a production claim.
 *
 * DERIVED, never stored: a stored label is a second source of truth that can
 * drift from the counters it claims to summarize (FQ-5 / I-34 — the counters
 * are the semantic truth). This is a SCOPED PRODUCTION claim for Mon Lexique and
 * Practice, not a universal mastery ladder (I-35).
 */
export type ProductionClaim = "none" | "supported" | "independent";

/** Where one admitted observation lands. `none` = it moves no item counter. */
export type MasteryChannel = ProductionChannel | "recognition" | "none";

export type ItemMastery = {
  itemId: ItemId;
  seenCount: number;
  recognitionAttempts: number;
  recognitionSuccess: number;
  recognitionFailure: number;
  /**
   * Aggregate production totals — COMPATIBILITY AND COARSE REPORTING ONLY.
   *
   * Since PR-04 these are derived sums, never the semantic answer to
   * "did the learner produce this independently?", "does Mon Lexique own it?",
   * or "is this Supported or independent?". Ask `production` (and
   * `deriveProductionClaim`) for that. Invariant, enforced by
   * `aggregateProduction` on every write:
   *
   *   productionAttempts = independent.attempts + supported.attempts + selfCorrection.attempts
   *   productionSuccess  = independent.success  + supported.success  + selfCorrection.success
   *   productionFailure  = independent.failure  + supported.failure  + selfCorrection.failure
   */
  productionAttempts: number;
  productionSuccess: number;
  productionFailure: number;
  /** Scoped production evidence — the semantic owner of the three channels. */
  production: ProductionEvidenceCounts;
  wrongCount: number;
  skipCount: number;
  /**
   * Precision signals for meaning-PRESERVING slips (punctuation_only /
   * accent_only). Tracked but never counted as failure. `spelling_near_miss`
   * is NOT a precision signal (audit B7) — it accrues weakness instead; see
   * `scoreEvent` and docs/status/founder-self-learning-mastery-precision-policy.md.
   */
  precisionCount: number;
  precisionTags: Partial<Record<ErrorTagCode, number>>;
  lastSeenAt: number | null;
  lastProducedAt: number | null;
  weakTags: Partial<Record<ErrorTagCode, number>>;
  isWeak: boolean;
  promptFadeLevel: PromptFadeLevel;
  leitnerBox: number;
  dueAt: number | null;
  monLexiqueStatus: MonLexiqueStatus;
  practiceEligibility: PracticeEligibility;
};

export type MasterySnapshot = {
  version: string;
  items: Record<ItemId, ItemMastery>;
  processedClientEventIds: string[];
  updatedAt: number | null;
};

/**
 * Route one admitted observation to its mastery channel.
 *
 * The EVENT'S evidence class is the routing authority. Until PR-04 the reducer
 * classified production vs recognition by `operation` (a `PRODUCTION_OPS` set of
 * fill / build / register_switch / context_chain). That was the wrong owner:
 * the same screen operation can carry different evidence (a `build` whose event
 * says `recognition` IS recognition evidence; a typed attempt with a visible
 * tray is `supported_production`), and PR-03 already resolves the true class —
 * assistance-scoped, ceiling-clamped — before the event is written. The reducer
 * consumes that answer instead of re-deriving a contradictory one from the
 * screen. Operation no longer influences counting at all.
 *
 * `none` covers every class that carries no item-level mastery claim: exposure,
 * audio exposure, comparison-only, self-report, the ungraded open production
 * attempt (W1), and `no_mastery_evidence`. They move nothing. There is
 * deliberately no "other production" bucket — a structurally impossible assessed
 * combination must fail validation upstream, not land in a miscellaneous pile.
 */
export function masteryChannelForEvidenceClass(
  evidenceClass: EvidenceClass,
): MasteryChannel {
  switch (evidenceClass) {
    case "recall":
    case "controlled_production":
      return "independent";
    case "supported_production":
      return "supported";
    case "self_correction":
      return "selfCorrection";
    case "recognition":
      return "recognition";
    case "exposure":
    case "audio_exposure":
    case "comparison_only":
    case "open_production_attempt":
    case "self_report":
    case "no_mastery_evidence":
      return "none";
  }
}

const zeroCounts = (): EvidenceOutcomeCounts => ({
  attempts: 0,
  success: 0,
  failure: 0,
});

/** A fresh, all-zero scoped production block. Every channel is always present. */
export function emptyProductionEvidence(): ProductionEvidenceCounts {
  return {
    independent: zeroCounts(),
    supported: zeroCounts(),
    selfCorrection: zeroCounts(),
  };
}

/**
 * The ONE place aggregate production totals are computed.
 *
 * Deriving them from the channels (rather than incrementing both in parallel
 * branches) makes drift structurally impossible: there is no code path that can
 * move an aggregate without moving the channel it summarizes.
 */
export function aggregateProduction(
  p: ProductionEvidenceCounts,
): EvidenceOutcomeCounts {
  return {
    attempts: p.independent.attempts + p.supported.attempts + p.selfCorrection.attempts,
    success: p.independent.success + p.supported.success + p.selfCorrection.success,
    failure: p.independent.failure + p.supported.failure + p.selfCorrection.failure,
  };
}

/**
 * The strongest production claim the scoped counters currently support.
 *
 * A self-correction success alone yields `none`: a revision after seeing one's
 * own error is real evidence of repair, but it establishes neither independent
 * first-pass production nor Mon Lexique ownership (§16 — repair reduces urgency,
 * it does not make the item strong).
 *
 * When both Supported and independent successes exist the claim is
 * `independent` — the strongest thing actually demonstrated — while BOTH
 * channels keep their full history underneath. Nothing is overwritten.
 */
export function deriveProductionClaim(p: ProductionEvidenceCounts): ProductionClaim {
  if (p.independent.success > 0) return "independent";
  if (p.supported.success > 0) return "supported";
  return "none";
}

/** Thrown when a caller hands the reducer a snapshot it cannot safely extend. */
export class UnsupportedMasterySnapshotVersionError extends Error {
  readonly version: string;
  constructor(version: string) {
    super(
      `mastery: snapshot version "${version}" is not ${MASTERY_SNAPSHOT_VERSION} — ` +
        `rebuild from the event log rather than migrating a derived cache`,
    );
    this.name = "UnsupportedMasterySnapshotVersionError";
    this.version = version;
  }
}

function assertCurrentSnapshotVersion(snapshot: MasterySnapshot): void {
  if (snapshot.version !== MASTERY_SNAPSHOT_VERSION) {
    throw new UnsupportedMasterySnapshotVersionError(snapshot.version);
  }
}

export function createEmptyMasterySnapshot(): MasterySnapshot {
  return {
    version: MASTERY_SNAPSHOT_VERSION,
    items: {},
    processedClientEventIds: [],
    updatedAt: null,
  };
}

function emptyItem(itemId: ItemId): ItemMastery {
  return {
    itemId,
    seenCount: 0,
    recognitionAttempts: 0,
    recognitionSuccess: 0,
    recognitionFailure: 0,
    productionAttempts: 0,
    productionSuccess: 0,
    productionFailure: 0,
    production: emptyProductionEvidence(),
    wrongCount: 0,
    skipCount: 0,
    precisionCount: 0,
    precisionTags: {},
    lastSeenAt: null,
    lastProducedAt: null,
    weakTags: {},
    isWeak: false,
    promptFadeLevel: "PF0",
    leitnerBox: 0,
    dueAt: null,
    monLexiqueStatus: "hidden",
    practiceEligibility: "none",
  };
}

/**
 * Record the event as processed WITHOUT touching item mastery.
 *
 * The decided idempotency policy (PR-02, extended by PR-03): a no-op event IS
 * added to `processedClientEventIds` and MAY advance `updatedAt`, so replaying
 * the append-only log stays stable and the event is never reprocessed. The log
 * remains authoritative; the projection simply learns nothing from it.
 */
function noOp(snapshot: MasterySnapshot, event: LearningEvent): MasterySnapshot {
  return {
    version: snapshot.version,
    items: snapshot.items,
    processedClientEventIds: [...snapshot.processedClientEventIds, event.clientEventId],
    updatedAt: event.timestamp,
  };
}

const isSuccess = (r: ErrorTagCode): boolean =>
  r === "correct" || r === "accepted_variant";

/**
 * Meaning-PRESERVING slips (PR-B1 leniency): punctuation_only / accent_only.
 * Soft precision signals — never a failure, never weaken the item, never step
 * the leitner box or prompt-fade down.
 *
 * `spelling_near_miss` is deliberately NOT here (audit B7): FR minimal pairs
 * (un/on, le/la, et/est) surface as `spelling_near_miss` but are meaning-
 * distinct, so mastery must not treat them as harmless — see `scoreEvent`.
 */
const PRECISION_TAGS: ReadonlySet<ErrorTagCode> = new Set<ErrorTagCode>([
  "punctuation_only",
  "accent_only",
]);
const isPrecision = (r: ErrorTagCode): boolean => PRECISION_TAGS.has(r);

/** Increment weakTags for the failing result + its errorTags, de-duplicated per event. */
function addWeakTags(
  weakTags: Partial<Record<ErrorTagCode, number>>,
  event: AssessedLearningEvent,
): void {
  const tags = new Set<ErrorTagCode>([event.result, ...event.errorTags]);
  for (const t of tags) weakTags[t] = (weakTags[t] ?? 0) + 1;
}

/** Record the near-miss subtype(s) carried by a precision event, de-duplicated. */
function addPrecisionTags(
  precisionTags: Partial<Record<ErrorTagCode, number>>,
  event: AssessedLearningEvent,
): void {
  const tags = new Set<ErrorTagCode>([event.result, ...event.errorTags]);
  for (const t of tags) {
    if (PRECISION_TAGS.has(t)) precisionTags[t] = (precisionTags[t] ?? 0) + 1;
  }
}

/**
 * Fold one event into the snapshot. Idempotent: a `clientEventId` already in
 * `processedClientEventIds` returns the snapshot unchanged.
 *
 * `event.result` is classified into five buckets:
 *  - SUCCESS (`correct` / `accepted_variant`): counts success, advances leitner
 *    box + prompt-fade, schedules `dueAt` at the new (further-out) box interval.
 *  - PRECISION (`punctuation_only` / `accent_only`): meaning-preserving slip —
 *    increments `precisionCount` / `precisionTags` and the attempt counter, but
 *    does NOT touch failure counters, weakTags, weakness, success, or the box /
 *    prompt-fade level (PR-B1 leniency).
 *  - SPELLING NEAR-MISS (`spelling_near_miss`): a meaning-distinct minimal pair
 *    (un/on, le/la, et/est). Still a near-miss for UX tone, but mastery gives NO
 *    positive credit; it neither advances nor demotes the box / prompt-fade, and
 *    it accrues weakTags so repeats surface for Challenge (audit B7).
 *  - SKIP (`empty_or_skip`): increments skipCount only; neutral otherwise.
 *  - FAILURE (every other tag): counts failure → wrongCount++, weakTags, and a
 *    leitner / prompt-fade step down.
 *
 * `dueAt` timing (audit B12): SUCCESS and FAILURE (re)schedule at the new box
 * interval; PRECISION, SPELLING NEAR-MISS and SKIP keep the item DUE NOW so it
 * returns for reinforcement instead of disappearing for a full box interval.
 * Staged strictness (lesson band, promptFade, item maturity, future
 * `accentCriticality`) is documented for later, not built here.
 *
 * PR-04 changes WHICH CHANNEL receives a result, never what a result means.
 * Scheduling is deliberately untouched: an admitted Supported success still
 * advances the Leitner box and prompt-fade exactly like an independent one.
 * That is the CURRENT Axis-B mechanical behaviour, retained because no founder
 * rule states a differential — no half-step, no multiplier, no smaller interval,
 * no separate weakness threshold exists to implement (FQ-2 rule 7, FQ-7 / I-37).
 * It is emphatically NOT evidence that Supported and independent production are
 * semantically equivalent: the scoped counters below keep them apart precisely
 * so a later ratified rule has real data to act on.
 */
export function scoreEvent(
  snapshot: MasterySnapshot,
  event: LearningEvent,
): MasterySnapshot {
  // PR-04: a snapshot this build cannot safely extend is refused BEFORE anything
  // else, including idempotency — silently returning an unsupported snapshot
  // would let a v0.2 cache flow onward looking like a successful fold.
  assertCurrentSnapshotVersion(snapshot);

  // Idempotency — already processed → unchanged.
  if (snapshot.processedClientEventIds.includes(event.clientEventId)) {
    return snapshot;
  }

  // PR-02 non-assessed guard (the ONLY mastery change in that PR).
  //
  // A v2 exposure / reveal / self-report / issue-report / ungraded open-production
  // event was never graded, so it must move NOTHING: no item row is created, no
  // counter moves, no weak tag, no Leitner box, no prompt-fade step, no Mon
  // Lexique or Practice eligibility change. It is neither a success nor a failure.
  //
  // Idempotency policy (decided, tested): the event IS recorded in
  // `processedClientEventIds` and MAY advance `updatedAt`, so replaying the
  // append-only log is stable and a non-assessed event is never reprocessed.
  // The log stays authoritative; the projection simply learns nothing from it.
  //
  // NOT here: admissibility filtering, learner/system attribution, supported vs
  // independent production, assistance-scoped counters, thresholds, or weights —
  // those are PR-03 / PR-04.
  if (!isAssessedEvent(event)) {
    return noOp(snapshot, event);
  }

  // PR-03 admission gate (the ONLY mastery change in that PR).
  //
  // Correctness is not admissibility (Mastery Bible §6): an assessed event that
  // was quarantined (a content / validator / UI-flow / tone / AI-generator /
  // system / mastery-mapping defect), left unresolved, or marked non-evidentiary
  // must move NOTHING — however correct the answer looked. Persisting
  // `admissibility: quarantined` and then letting the reducer score it as
  // learner success or failure would defeat the entire attribution layer.
  //
  // `admitted` and `legacy_admitted` continue through the existing logic
  // unchanged. Supported-vs-independent representation stays PR-04's question:
  // no new counter, no new snapshot field, no threshold, no weight is added here.
  if (!MASTERY_BEARING_ADMISSION_STATUSES.has(event.admissibility.status)) {
    return noOp(snapshot, event);
  }

  // PR-04 evidence-class routing + defense in depth.
  //
  // A class that carries no item-level mastery claim moves NOTHING — not even
  // `seenCount` — regardless of what the admission state says. The PR-03 gate
  // above should already have caught an inadmissible event, but a malformed or
  // unexpectedly mastery-bearing admission must not be able to push
  // `no_mastery_evidence` (or an ungraded open attempt, or an exposure) into a
  // counter. Two independent guards, same answer.
  const channel = masteryChannelForEvidenceClass(event.evidenceClass);
  if (channel === "none") {
    return noOp(snapshot, event);
  }

  const items: Record<ItemId, ItemMastery> = { ...snapshot.items };
  const success = isSuccess(event.result);
  const precision = isPrecision(event.result);
  const spellingNearMiss = event.result === "spelling_near_miss";
  const skip = event.result === "empty_or_skip";
  // Skip and either kind of near-miss neither advance nor hard-fail the box, so
  // the item must stay due now for reinforcement rather than being pushed out.
  const keepDueNow = precision || spellingNearMiss || skip;

  for (const itemId of event.itemIds) {
    const prev = items[itemId] ?? emptyItem(itemId);
    const m: ItemMastery = {
      ...prev,
      weakTags: { ...prev.weakTags },
      precisionTags: { ...prev.precisionTags },
      production: {
        independent: { ...prev.production.independent },
        supported: { ...prev.production.supported },
        selfCorrection: { ...prev.production.selfCorrection },
      },
    };

    m.seenCount += 1;
    m.lastSeenAt = event.timestamp;

    let box = m.leitnerBox;
    let pf = pfIndexOf(m.promptFadeLevel);

    if (channel !== "recognition") {
      // One production channel — independent, supported or self-correction —
      // chosen by the event's evidence class. The result semantics below are
      // UNCHANGED from v0.2; only which channel receives them is new.
      const ch = m.production[channel];
      ch.attempts += 1;
      if (success) {
        ch.success += 1;
        // Compatibility meaning preserved: the most recent successful
        // production-SHAPED action, whichever channel it came from. Per-channel
        // timestamps are deliberately not introduced here — the scoped counters,
        // not this field, carry claim semantics.
        m.lastProducedAt = event.timestamp;
        box = Math.min(box + 1, MAX_LEITNER_BOX);
        pf = Math.min(pf + 1, MAX_PF_INDEX);
      } else if (precision) {
        // Meaning-preserving slip — soft, not a failure or a success. Box /
        // prompt-fade stay put; no wrongCount / channel failure / weakTags. The
        // attempt still counted, so attempts > success + failure is normal.
        m.precisionCount += 1;
        addPrecisionTags(m.precisionTags, event);
      } else if (spellingNearMiss) {
        // Meaning-distinct minimal pair: no positive credit, no hard demotion,
        // but not harmless — accrue weakness so repeats reach Challenge. (B7)
        addWeakTags(m.weakTags, event);
      } else if (skip) {
        m.skipCount += 1;
      } else {
        ch.failure += 1;
        m.wrongCount += 1;
        box = Math.max(0, box - 1);
        pf = Math.max(0, pf - 1);
        addWeakTags(m.weakTags, event);
      }

      // Aggregates are RE-DERIVED, never incremented in parallel: there is no
      // path that can move a total without moving the channel behind it.
      const agg = aggregateProduction(m.production);
      m.productionAttempts = agg.attempts;
      m.productionSuccess = agg.success;
      m.productionFailure = agg.failure;
    } else {
      m.recognitionAttempts += 1;
      if (success) {
        m.recognitionSuccess += 1;
        box = Math.min(box + 1, MAX_LEITNER_BOX);
        pf = Math.min(pf + 1, MAX_PF_INDEX);
      } else if (precision) {
        // Meaning-preserving slip — soft, not a failure or a success (see above).
        m.precisionCount += 1;
        addPrecisionTags(m.precisionTags, event);
      } else if (spellingNearMiss) {
        // Meaning-distinct minimal pair — no credit, accrues weakness. (B7)
        addWeakTags(m.weakTags, event);
      } else if (skip) {
        m.skipCount += 1;
      } else {
        m.recognitionFailure += 1;
        m.wrongCount += 1;
        box = Math.max(0, box - 1);
        pf = Math.max(0, pf - 1);
        addWeakTags(m.weakTags, event);
      }
    }

    m.leitnerBox = box;
    m.promptFadeLevel = PF_LEVELS[pf];
    // B12: only success/failure (which moved the box) reschedule at the box
    // interval; skip and near-miss keep the item due now for reinforcement.
    m.dueAt = keepDueNow
      ? event.timestamp
      : event.timestamp + LEITNER_INTERVAL_DAYS[box] * DAY_MS;

    m.isWeak =
      m.wrongCount >= WEAK_THRESHOLD ||
      Object.values(m.weakTags).some((c) => (c ?? 0) >= WEAK_THRESHOLD);

    // The scoped claim — NOT the aggregate — drives both surfaces below. The
    // aggregate includes self-correction successes, which establish neither
    // ownership nor a production claim, so using it here would quietly promote
    // a repair into Mon Lexique and into Stretch.
    const claim = deriveProductionClaim(m.production);

    // Mon Lexique: weak overrides added. Either an independent OR a Supported
    // production success adds the item (the decided Supported path). Recognition
    // alone, self-correction alone, ghost exposure, a reveal, a non-assessed
    // action and any non-admitted event never add — they cannot reach here.
    m.monLexiqueStatus = m.isWeak ? "weak" : claim !== "none" ? "added" : "hidden";

    // Practice eligibility (deterministic, in priority order):
    //   1. weak                                   → challenge
    //   2. independent OR Supported success       → stretch
    //   3. self-correction success alone          → build
    //   4. recognition / contact / precision-only → build
    //   5. never seen                             → none
    // 3 and 4 collapse into the same branch because both are "seen, not yet
    // owned"; they are listed apart so the self-correction rule stays explicit.
    m.practiceEligibility = m.isWeak
      ? "challenge"
      : claim !== "none"
        ? "stretch"
        : m.production.selfCorrection.success > 0 ||
            m.recognitionSuccess > 0 ||
            m.seenCount > 0
          ? "build"
          : "none";

    items[itemId] = m;
  }

  return {
    version: snapshot.version,
    items,
    processedClientEventIds: [
      ...snapshot.processedClientEventIds,
      event.clientEventId,
    ],
    updatedAt: event.timestamp,
  };
}

/**
 * Fold a list of events in array order. Deterministic; tolerates duplicates
 * (scoreEvent is idempotent).
 *
 * An explicitly supplied `initialSnapshot` is version-checked up front, so a
 * stale cache is refused even when `events` is empty (where the reduce would
 * otherwise never reach `scoreEvent`). Callers needing the current shape rebuild
 * from the log — the log is authoritative, the snapshot is a derived cache.
 */
export function scoreEvents(
  events: LearningEvent[],
  initialSnapshot?: MasterySnapshot,
): MasterySnapshot {
  if (initialSnapshot !== undefined) assertCurrentSnapshotVersion(initialSnapshot);
  return events.reduce(
    (snap, event) => scoreEvent(snap, event),
    initialSnapshot ?? createEmptyMasterySnapshot(),
  );
}
