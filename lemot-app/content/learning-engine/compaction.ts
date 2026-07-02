/**
 * Event compaction / snapshot policy v0 (Faz 6A Slice C) — pure, local-only.
 *
 * Policy: docs/CONTENT_FACTORY_CONTRACT.md §5. The local event log can grow
 * unbounded; compaction keeps it bounded WITHOUT losing replayability.
 *
 * Hard boundaries:
 *  - Pure functions only: no storage, no network, no React, no Date.now()
 *    (`now` is an explicit argument), no mutation of inputs.
 *  - v0 NEVER deletes source events. `planCompaction` marks a compaction
 *    point (cursor); every event is retained. Deletion needs a future
 *    explicit safe flag and its own review.
 *  - Snapshots are versioned; an UNKNOWN version is rejected, never silently
 *    migrated.
 *  - Uses the shipped mastery reducer (`scoreEvents`) as-is — compaction
 *    must never change derived mastery (invariant test-locked: snapshot +
 *    remaining events replays to exactly the same MasterySnapshot as
 *    replaying all events).
 *  - Sync-specific compaction is DEFERRED with spec §66.4 — nothing here
 *    knows about pending/synced or any remote.
 */
import type { LearningEvent } from "./events";
import type { MasterySnapshot } from "./mastery";
import { scoreEvents } from "./mastery";

/** Bump when the snapshot shape changes. Unknown versions are rejected. */
export const COMPACTION_SNAPSHOT_VERSION = "compaction-v0.1";

/** Compaction is RECOMMENDED at this many local events (tunable). */
export const COMPACTION_EVENT_THRESHOLD = 1000;

/** Where the snapshot cuts the log. Events after the cursor stay "live". */
export type CompactionCursor = {
  /** Number of events folded into the snapshot. */
  eventCount: number;
  /** Timestamp of the last folded event (null for an empty log). */
  upToEventTimestamp: number | null;
  /** clientEventId of the last folded event (null for an empty log). */
  lastClientEventId: string | null;
};

export type CompactionSnapshot = {
  version: string;
  createdAt: number;
  cursor: CompactionCursor;
  /** Derived, progress-safe state — the reducer projection, not raw UI data. */
  masterySnapshot: MasterySnapshot;
};

export type CompactionPlan = {
  /** True when the log size crosses the threshold. */
  recommend: boolean;
  eventCount: number;
  threshold: number;
  cursor: CompactionCursor;
  /**
   * v0 retention rule: ALL source events are retained (marked compactable,
   * never deleted). Same array content as the input, untouched.
   */
  retainedEvents: LearningEvent[];
};

function cursorFor(events: LearningEvent[]): CompactionCursor {
  const last = events.length > 0 ? events[events.length - 1] : null;
  return {
    eventCount: events.length,
    upToEventTimestamp: last === null ? null : last.timestamp,
    lastClientEventId: last === null ? null : last.clientEventId,
  };
}

/** Pure threshold check. */
export function shouldRecommendCompaction(
  eventCount: number,
  threshold: number = COMPACTION_EVENT_THRESHOLD,
): boolean {
  return eventCount >= threshold;
}

/**
 * Inspect the log and produce a compaction plan. Never mutates or drops
 * events — v0 marks the compaction point and keeps everything replayable.
 */
export function planCompaction(
  events: LearningEvent[],
  threshold: number = COMPACTION_EVENT_THRESHOLD,
): CompactionPlan {
  return {
    recommend: shouldRecommendCompaction(events.length, threshold),
    eventCount: events.length,
    threshold,
    cursor: cursorFor(events),
    retainedEvents: [...events],
  };
}

/**
 * Fold the given events into a versioned snapshot at `now`. The mastery
 * projection is produced by the SHIPPED reducer, unchanged.
 */
export function createSnapshot(
  events: LearningEvent[],
  now: number,
): CompactionSnapshot {
  return {
    version: COMPACTION_SNAPSHOT_VERSION,
    createdAt: now,
    cursor: cursorFor(events),
    masterySnapshot: scoreEvents(events),
  };
}

/**
 * Replay from a snapshot plus the events that arrived after its cursor.
 * Throws on an unknown snapshot version — never silently migrates.
 *
 * Invariant (test-locked): for any split point k,
 *   restoreFromSnapshot(createSnapshot(events[0..k]), events[k..])
 * deep-equals scoreEvents(allEvents). (The reducer is idempotent by
 * clientEventId, so even an overlapping split cannot double-count.)
 */
export function restoreFromSnapshot(
  snapshot: CompactionSnapshot,
  eventsAfterCursor: LearningEvent[],
): MasterySnapshot {
  if (snapshot.version !== COMPACTION_SNAPSHOT_VERSION) {
    throw new Error(
      `compaction: unknown snapshot version "${snapshot.version}" — refusing to restore`,
    );
  }
  return scoreEvents(eventsAfterCursor, snapshot.masterySnapshot);
}
