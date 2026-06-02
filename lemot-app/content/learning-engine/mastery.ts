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
import type { ErrorTagCode, LearningEvent } from "./events";

/** Snapshot schema version (bump when the shape changes). */
export const MASTERY_SNAPSHOT_VERSION = "mastery-v0.1";

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

const isSuccess = (r: ErrorTagCode): boolean =>
  r === "correct" || r === "accepted_variant";

/** Increment weakTags for the failing result + its errorTags, de-duplicated per event. */
function addWeakTags(weakTags: Partial<Record<ErrorTagCode, number>>, event: LearningEvent): void {
  const tags = new Set<ErrorTagCode>([event.result, ...event.errorTags]);
  for (const t of tags) weakTags[t] = (weakTags[t] ?? 0) + 1;
}

/**
 * Fold one event into the snapshot. Idempotent: a `clientEventId` already in
 * `processedClientEventIds` returns the snapshot unchanged.
 *
 * Near-miss tags (`punctuation_only` / `accent_only` / `spelling_near_miss`)
 * are treated as FAILURE for now (they fall in the non-success / non-skip
 * branch → productionFailure/wrongCount++ and a leitner/prompt-fade step down).
 * This is a deliberate, conservative choice; it can be softened later.
 */
export function scoreEvent(
  snapshot: MasterySnapshot,
  event: LearningEvent,
): MasterySnapshot {
  // Idempotency — already processed → unchanged.
  if (snapshot.processedClientEventIds.includes(event.clientEventId)) {
    return snapshot;
  }

  const items: Record<ItemId, ItemMastery> = { ...snapshot.items };
  const isProduction = PRODUCTION_OPS.has(event.operation);
  const success = isSuccess(event.result);
  const skip = event.result === "empty_or_skip";

  for (const itemId of event.itemIds) {
    const prev = items[itemId] ?? emptyItem(itemId);
    const m: ItemMastery = { ...prev, weakTags: { ...prev.weakTags } };

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
    m.dueAt = event.timestamp + LEITNER_INTERVAL_DAYS[box] * DAY_MS;

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
