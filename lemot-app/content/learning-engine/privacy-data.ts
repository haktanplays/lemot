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
 *    (`lm_le_events`, `lm_le_snapshot`, `lm_le_telemetry`). It NEVER touches legacy
 *    `lm7` / `lm7_srs` or any unrelated key, and does not "clear all storage".
 *  - No `Date.now` (caller passes `exportedAt`), no network, no AI, no Supabase,
 *    no `RemoteRepository`. Does not mutate the repository or its events.
 *  - Export is deterministic for the same events + timestamp.
 *
 * B9 (audit): a "delete my data" must leave NO orphaned behavior trail, and an
 * export must be complete, so the local telemetry log (`lm_le_telemetry`) is
 * included on BOTH paths — cleared on reset, and carried (as its own section) on
 * export. Telemetry stays local-only; nothing here uploads or drains it.
 */
import type { LearningEvent } from "./events";
import type { LearningRepository } from "./repository/types";
import { scoreEvents, type MasterySnapshot } from "./mastery";
import { LM_LE_EVENTS_KEY, LM_LE_SNAPSHOT_KEY } from "./repository/local";
import { LM_LE_TELEMETRY_KEY, type TelemetryEvent } from "./telemetry";

export const LOCAL_LEARNING_DATA_EXPORT_VERSION = "local-learning-export-v0.2";
export type LocalLearningDataExportVersion =
  typeof LOCAL_LEARNING_DATA_EXPORT_VERSION;

/**
 * Minimal read surface for the local telemetry log. The learning-engine
 * `TelemetryStore` satisfies it; export accepts it by interface so this module
 * never imports the storage layer and stays harness-testable.
 */
export type TelemetryReadable = {
  readAllEvents(): TelemetryEvent[] | Promise<TelemetryEvent[]>;
};

/**
 * A JSON-serializable snapshot of the learner's local data — the event log (the
 * source of truth) plus the derived `MasterySnapshot` recomputed from it and the
 * local telemetry log. It is a value object the caller may stringify; this module
 * does NOT write a file.
 */
export type LocalLearningDataExport = {
  exportVersion: LocalLearningDataExportVersion;
  /** Caller-provided export time (no `Date.now` here). */
  exportedAt: number;
  eventCount: number;
  events: LearningEvent[];
  /** Derived from `events` via `scoreEvents` — recomputable, not primary state. */
  snapshot: MasterySnapshot;
  /**
   * Local telemetry log (B9). Always present so a "delete my data" export is
   * verifiably complete; it is an explicit empty section when no telemetry
   * reader is provided or none was recorded.
   */
  telemetryEventCount: number;
  telemetry: TelemetryEvent[];
};

/**
 * Build a local export from a `LearningRepository`. Reads all events (corrupt
 * storage fails safely to `[]` via `LocalRepository`), folds the deterministic
 * `MasterySnapshot`, includes the local telemetry log (B9 — always a section,
 * empty when no reader is passed), and returns a JSON-serializable object. Does
 * not mutate the repository, its events, or the telemetry log. Excludes legacy
 * `lm7`/`lm7_srs` and raw storage blobs (it only ever reads the learning event
 * log + telemetry through their interfaces).
 */
export async function exportLocalLearningData(args: {
  repository: LearningRepository;
  exportedAt: number;
  telemetry?: TelemetryReadable;
}): Promise<LocalLearningDataExport> {
  const events = await args.repository.readAllEvents();
  const snapshot = scoreEvents(events);
  const telemetry = args.telemetry ? await args.telemetry.readAllEvents() : [];
  return {
    exportVersion: LOCAL_LEARNING_DATA_EXPORT_VERSION,
    exportedAt: args.exportedAt,
    eventCount: events.length,
    events,
    snapshot,
    telemetryEventCount: telemetry.length,
    telemetry,
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
  LM_LE_TELEMETRY_KEY,
] as const;

/**
 * Erase ONLY the learning-engine local data (`lm_le_events`, `lm_le_snapshot`,
 * `lm_le_telemetry`).
 *
 * Narrow and explicit by design: it removes exactly these learning keys and
 * nothing else — never legacy `lm7`/`lm7_srs`, never unrelated keys, never a
 * blanket clear. The telemetry log is included (B9) so a reset leaves no orphaned
 * behavior trail. Idempotent: removing an absent key is a no-op, so repeated calls
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
