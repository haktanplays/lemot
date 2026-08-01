/**
 * Learner-safe Stats projection (PR-10) — pure, deterministic, RN-free.
 *
 * `selectLearningStats(events)` folds the validated `LearningEvent` history into
 * one small, honest learning summary. Stats is a PROJECTION of the ONE learning
 * spine — never primary state, never a second store, and NEVER telemetry:
 * per the D-3 boundary (decided in PR-02), `TelemetryStore` remains local
 * content-debugging / product-funnel data and is not a learning history. This
 * module does not import it, and nothing here reads or writes storage at all.
 *
 * Hard boundaries: no storage, no React, no network, no AI, no clock, no
 * telemetry, no mutation of the input. Same event list in → same projection
 * out. The caller (the runtime's explicit read) supplies events that already
 * passed repository validation/migration; no cached snapshot is trusted —
 * item-level state is re-derived through the existing pure `scoreEvents`.
 *
 * What the output deliberately is:
 *  - COUNTS ONLY. No raw events, ids, timestamps, learner answers, error tags,
 *    weak tags, assistance objects, attribution, admissibility reasons or
 *    per-item counters ever leave this function.
 *  - Activity distinguished from ownership: a recognition MOMENT is practice
 *    activity, not proof of learning; independent/supported PIECES come from
 *    the reducer's scoped production claims.
 *  - Assistance is neutral: hints, replays and slow playback are counted as
 *    facts about how the learner worked, never as failure, and never with the
 *    mechanism attached.
 *
 * What the output deliberately is NOT (non-inference, §17): no accuracy, no
 * success rate, no percentages, no streak, no XP, no level, no time-spent, no
 * pronunciation quality, no per-item mastery score. Those concepts have no
 * field here, so they cannot be rendered by mistake.
 */
import type { EvidenceClass, LearningEvent, LearningPlacement } from "./events";
import { isAssessedEvent } from "./events";
import { MASTERY_BEARING_ADMISSION_STATUSES } from "./evidence-context";
import { deriveProductionClaim, scoreEvents } from "./mastery";

export const LEARNING_STATS_VERSION = "learning-stats-v0.1" as const;

/**
 * The learner-safe summary. Every field is a plain count (plus the version pin
 * and one boolean) — freezing the result makes accidental downstream mutation
 * loud instead of silent.
 */
export type LearningStatsProjection = {
  version: typeof LEARNING_STATS_VERSION;
  /** True when at least one learner-visible metric below is non-zero. */
  hasActivity: boolean;

  // ── moments (event-level activity) ────────────────────────────────────────
  practiceMoments: number;
  recognitionMoments: number;
  independentPracticeMoments: number;
  supportedPracticeMoments: number;
  openAttempts: number;
  practiceHubMoments: number;

  // ── pieces (distinct canonical items; only the COUNT leaves) ──────────────
  piecesPracticed: number;
  recognitionPieces: number;
  independentPieces: number;
  supportedPieces: number;
  readyToRevisitPieces: number;
  crossSurfacePieces: number;

  // ── neutral assistance facts ──────────────────────────────────────────────
  hintMoments: number;
  replayCount: number;
  slowPlaybackMoments: number;
};

/**
 * Evidence classes that make an admitted assessed event a PRACTICE MOMENT.
 * Exposure, audio exposure, comparison-only reveals, ungraded open attempts,
 * self-reports and `no_mastery_evidence` are deliberately absent — they are
 * contact or communication, not assessed practice.
 */
const PRACTICE_EVIDENCE: ReadonlySet<EvidenceClass> = new Set<EvidenceClass>([
  "recognition",
  "recall",
  "controlled_production",
  "supported_production",
  "self_correction",
]);

/** The final evidence class is authoritative — never the operation or PF level. */
const INDEPENDENT_EVIDENCE: ReadonlySet<EvidenceClass> = new Set<EvidenceClass>([
  "recall",
  "controlled_production",
]);

/**
 * Admission statuses whose ASSISTANCE facts are trustworthy. Wider than the
 * mastery-bearing set on purpose: a non-assessed exposure (`no_evidence`)
 * legitimately carries real replay / slow-playback facts. Quarantined and
 * unresolved events are excluded everywhere — their capture context is exactly
 * what is in doubt.
 */
const ASSISTANCE_TRUST_STATUSES: ReadonlySet<string> = new Set([
  "admitted",
  "legacy_admitted",
  "no_evidence",
]);

/**
 * Project the event history into the learner-safe summary.
 *
 * The spine guarantees unique `clientEventId`s (idempotent append), but the
 * selector still de-duplicates defensively — first occurrence wins — so a
 * replayed log can never double-count a moment, mirroring the reducer's own
 * idempotency for item-level state.
 */
export function selectLearningStats(
  events: readonly LearningEvent[],
): LearningStatsProjection {
  const seenEventIds = new Set<string>();

  let practiceMoments = 0;
  let recognitionMoments = 0;
  let independentPracticeMoments = 0;
  let supportedPracticeMoments = 0;
  let openAttempts = 0;
  let practiceHubMoments = 0;
  let hintMoments = 0;
  let replayCount = 0;
  let slowPlaybackMoments = 0;

  const practicedItems = new Set<string>();
  const placementsByItem = new Map<string, Set<LearningPlacement>>();

  for (const event of events) {
    if (seenEventIds.has(event.clientEventId)) continue;
    seenEventIds.add(event.clientEventId);

    const admission = event.admissibility.status;

    // ── neutral assistance facts (admitted / legacy_admitted / no_evidence) ─
    if (
      ASSISTANCE_TRUST_STATUSES.has(admission) &&
      event.assistance.capture === "known"
    ) {
      const a = event.assistance;
      // One event is one hint moment, whatever the rung. The rung itself is
      // deliberately not exposed or summed.
      if (a.hintRung > 0) hintMoments += 1;
      const replays = a.accessibility.replayCount;
      if (Number.isFinite(replays) && replays > 0) replayCount += replays;
      if (a.accessibility.slowPlayback === true) slowPlaybackMoments += 1;
    }

    // ── genuine open-production attempts (communicative reach, ungraded) ────
    if (
      !isAssessedEvent(event) &&
      event.evidenceClass === "open_production_attempt" &&
      event.primitive === "production"
    ) {
      openAttempts += 1;
      continue;
    }

    // ── trusted assessed practice moments ───────────────────────────────────
    if (!isAssessedEvent(event)) continue;
    if (!MASTERY_BEARING_ADMISSION_STATUSES.has(admission)) continue;
    if (!PRACTICE_EVIDENCE.has(event.evidenceClass)) continue;

    practiceMoments += 1;
    if (event.evidenceClass === "recognition") recognitionMoments += 1;
    if (INDEPENDENT_EVIDENCE.has(event.evidenceClass)) {
      independentPracticeMoments += 1;
    }
    if (event.evidenceClass === "supported_production") {
      supportedPracticeMoments += 1;
    }
    if (event.placement === "practice_hub") practiceHubMoments += 1;

    for (const itemId of event.itemIds) {
      practicedItems.add(itemId);
      let placements = placementsByItem.get(itemId);
      if (!placements) {
        placements = new Set<LearningPlacement>();
        placementsByItem.set(itemId, placements);
      }
      placements.add(event.placement);
    }
  }

  // ── piece-level state from the existing reducer (same admission gates) ───
  const snapshot = scoreEvents([...events]);
  let recognitionPieces = 0;
  let independentPieces = 0;
  let supportedPieces = 0;
  let readyToRevisitPieces = 0;
  for (const itemId of Object.keys(snapshot.items)) {
    const m = snapshot.items[itemId];
    if (m.recognitionAttempts > 0) recognitionPieces += 1;
    const claim = deriveProductionClaim(m.production);
    if (claim === "independent") independentPieces += 1;
    else if (claim === "supported") supportedPieces += 1;
    if (m.isWeak) readyToRevisitPieces += 1;
  }

  let crossSurfacePieces = 0;
  for (const placements of placementsByItem.values()) {
    if (placements.size >= 2) crossSurfacePieces += 1;
  }

  const hasActivity =
    practiceMoments > 0 ||
    recognitionMoments > 0 ||
    independentPracticeMoments > 0 ||
    supportedPracticeMoments > 0 ||
    openAttempts > 0 ||
    practiceHubMoments > 0 ||
    practicedItems.size > 0 ||
    recognitionPieces > 0 ||
    independentPieces > 0 ||
    supportedPieces > 0 ||
    readyToRevisitPieces > 0 ||
    crossSurfacePieces > 0 ||
    hintMoments > 0 ||
    replayCount > 0 ||
    slowPlaybackMoments > 0;

  return Object.freeze({
    version: LEARNING_STATS_VERSION,
    hasActivity,
    practiceMoments,
    recognitionMoments,
    independentPracticeMoments,
    supportedPracticeMoments,
    openAttempts,
    practiceHubMoments,
    piecesPracticed: practicedItems.size,
    recognitionPieces,
    independentPieces,
    supportedPieces,
    readyToRevisitPieces,
    crossSurfacePieces,
    hintMoments,
    replayCount,
    slowPlaybackMoments,
  });
}
