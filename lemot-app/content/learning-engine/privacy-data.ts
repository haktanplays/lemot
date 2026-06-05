/**
 * Local learning-data export / delete primitives (P5.3) — privacy/data-rights.
 *
 * Pure-ish local helpers a FUTURE privacy/settings UI can call to let the learner
 * **export** or **erase** their on-device Founder Self-Learning Build data. No UI,
 * no file download / Share API, no remote upload — just the data operations.
 *
 * Hard boundaries (P5.3):
 *  - Reads events through the `LearningRepository` interface (corrupt-safe via the
 *    existing `LocalRepository`); does NOT add a method to that interface and does
 *    NOT change the session controller.
 *  - Delete is NARROW: it clears ONLY the learning-engine keys
 *    (`lm_le_events`, `lm_le_snapshot`). It NEVER touches legacy `lm7` / `lm7_srs`
 *    or any unrelated key, and does not "clear all storage".
 *  - No `Date.now` (caller passes `exportedAt`), no network, no AI, no Supabase,
 *    no `RemoteRepository`. Does not mutate the repository or its events.
 *  - Export is deterministic for the same events + timestamp.
 */
import type { LearningEvent } from "./events";
import type { LearningRepository } from "./repository/types";
import { scoreEvents, type MasterySnapshot } from "./mastery";
import { LM_LE_EVENTS_KEY, LM_LE_SNAPSHOT_KEY } from "./repository/local";

export const LOCAL_LEARNING_DATA_EXPORT_VERSION = "local-learning-export-v0.1";
export type LocalLearningDataExportVersion =
  typeof LOCAL_LEARNING_DATA_EXPORT_VERSION;

/**
 * A JSON-serializable snapshot of the learner's local data — the event log (the
 * source of truth) plus the derived `MasterySnapshot` recomputed from it. It is a
 * value object the caller may stringify; this module does NOT write a file.
 */
export type LocalLearningDataExport = {
  exportVersion: LocalLearningDataExportVersion;
  /** Caller-provided export time (no `Date.now` here). */
  exportedAt: number;
  eventCount: number;
  events: LearningEvent[];
  /** Derived from `events` via `scoreEvents` — recomputable, not primary state. */
  snapshot: MasterySnapshot;
};

/**
 * Build a local export from a `LearningRepository`. Reads all events (corrupt
 * storage fails safely to `[]` via `LocalRepository`), folds the deterministic
 * `MasterySnapshot`, and returns a JSON-serializable object. Does not mutate the
 * repository or the events. Excludes legacy `lm7`/`lm7_srs` and raw storage blobs
 * (it only ever reads the learning event log through the interface).
 */
export async function exportLocalLearningData(args: {
  repository: LearningRepository;
  exportedAt: number;
}): Promise<LocalLearningDataExport> {
  const events = await args.repository.readAllEvents();
  const snapshot = scoreEvents(events);
  return {
    exportVersion: LOCAL_LEARNING_DATA_EXPORT_VERSION,
    exportedAt: args.exportedAt,
    eventCount: events.length,
    events,
    snapshot,
  };
}

/** Minimal storage surface the delete primitive needs: remove a key. */
export type KvRemovable = {
  removeItem(key: string): void | Promise<void>;
};

/** Learning-engine keys this primitive is allowed to clear — and ONLY these. */
export const LOCAL_LEARNING_DATA_KEYS = [
  LM_LE_EVENTS_KEY,
  LM_LE_SNAPSHOT_KEY,
] as const;

/**
 * Erase ONLY the learning-engine local data (`lm_le_events`, `lm_le_snapshot`).
 *
 * Narrow and explicit by design: it removes exactly the two learning keys and
 * nothing else — never legacy `lm7`/`lm7_srs`, never unrelated keys, never a
 * blanket clear. Idempotent: removing an absent key is a no-op, so repeated calls
 * are safe. A future settings UI wraps this in a confirmation; there is no
 * confirmation here. After this, projections (mastery / Mon Lexique / Practice
 * Pool) recompute from an empty event log.
 *
 * `store` is injectable for tests; in the app it lazily loads the real
 * `kvStorage` (so importing this module never pulls in the native storage layer).
 */
export async function clearLocalLearningData(args?: {
  store?: KvRemovable;
}): Promise<void> {
  const store = args?.store ?? (await loadKvStore());
  for (const key of LOCAL_LEARNING_DATA_KEYS) {
    await store.removeItem(key);
  }
}

async function loadKvStore(): Promise<KvRemovable> {
  const mod = await import("../../lib/storage");
  return mod.kvStorage as KvRemovable;
}
