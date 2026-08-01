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
import type { ItemId, OperationId, PromptFadeLevel } from "./types";
import type { AssessedLearningEvent, ErrorTagCode, LearningEvent } from "./events";
import { isAssessedEvent } from "./events";
import { MASTERY_BEARING_ADMISSION_STATUSES } from "./evidence-context";

/** Snapshot schema version (bump when the shape changes). */
export const MASTERY_SNAPSHOT_VERSION = "mastery-v0.2";

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

export type ItemMastery = {
  itemId: ItemId;
  seenCount: number;
  recognitionAttempts: number;
  recognitionSuccess: number;
  recognitionFailure: number;
  productionAttempts: number;
  productionSuccess: number;
  productionFailure: number;
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
 * Operations that require the learner to PRODUCE. Mirrors the validator's set.
 * Everything else (recognition, and defensively any reveal / non-production op)
 * is treated as recognition-like for counting.
 */
const PRODUCTION_OPS: ReadonlySet<OperationId> = new Set<OperationId>([
  "fill",
  "build",
  "register_switch",
  "context_chain",
]);

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
 */
export function scoreEvent(
  snapshot: MasterySnapshot,
  event: LearningEvent,
): MasterySnapshot {
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

  const items: Record<ItemId, ItemMastery> = { ...snapshot.items };
  const isProduction = PRODUCTION_OPS.has(event.operation);
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
    };

    m.seenCount += 1;
    m.lastSeenAt = event.timestamp;

    let box = m.leitnerBox;
    let pf = pfIndexOf(m.promptFadeLevel);

    if (isProduction) {
      m.productionAttempts += 1;
      if (success) {
        m.productionSuccess += 1;
        m.lastProducedAt = event.timestamp;
        box = Math.min(box + 1, MAX_LEITNER_BOX);
        pf = Math.min(pf + 1, MAX_PF_INDEX);
      } else if (precision) {
        // Meaning-preserving slip — soft, not a failure or a success. Box /
        // prompt-fade stay put; no wrongCount / productionFailure / weakTags.
        m.precisionCount += 1;
        addPrecisionTags(m.precisionTags, event);
      } else if (spellingNearMiss) {
        // Meaning-distinct minimal pair: no positive credit, no hard demotion,
        // but not harmless — accrue weakness so repeats reach Challenge. (B7)
        addWeakTags(m.weakTags, event);
      } else if (skip) {
        m.skipCount += 1;
      } else {
        m.productionFailure += 1;
        m.wrongCount += 1;
        box = Math.max(0, box - 1);
        pf = Math.max(0, pf - 1);
        addWeakTags(m.weakTags, event);
      }
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

    // Mon Lexique: weak overrides added; recognition alone never auto-adds.
    m.monLexiqueStatus = m.isWeak
      ? "weak"
      : m.productionSuccess > 0
        ? "added"
        : "hidden";

    // Practice eligibility (deterministic): weak → challenge; produced → stretch;
    // otherwise seen/recognized → build; never-seen → none.
    m.practiceEligibility = m.isWeak
      ? "challenge"
      : m.productionSuccess > 0
        ? "stretch"
        : m.recognitionSuccess > 0 || m.seenCount > 0
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

/** Fold a list of events in array order. Deterministic; tolerates duplicates (scoreEvent is idempotent). */
export function scoreEvents(
  events: LearningEvent[],
  initialSnapshot?: MasterySnapshot,
): MasterySnapshot {
  return events.reduce(
    (snap, event) => scoreEvent(snap, event),
    initialSnapshot ?? createEmptyMasterySnapshot(),
  );
}
