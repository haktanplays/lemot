/**
 * LocalRepository (P1.2) — on-device `LearningRepository` over `kvStorage`.
 *
 * Append-only event persistence for the Founder Self-Learning Build: events are
 * written locally first (always), in append order, de-duplicated by
 * `clientEventId`. Pending/synced bookkeeping is exposed for a future remote
 * drain (P6/P7). Everything downstream (mastery, etc.) reads back via this repo.
 *
 * Hard boundaries (P1.2):
 *  - Implements the P1.1 `LearningRepository` interface; NO RemoteRepository,
 *    NO Supabase, NO network, NO AI, NO React, NO UI.
 *  - Persists FULL `LearningEvent`s only — it does NOT stamp a
 *    `LearningEventDraft`, does NOT generate `clientEventId`, does NOT set
 *    `timestamp`, does NOT call `Date.now()`, and does NOT mutate the input
 *    event. Identity/time are the caller's responsibility (a later step).
 *  - All keys live under the `lm_le_` namespace; it never reads or writes the
 *    live-v7 keys (`lm7`, `lm7_srs`) or any other existing storage key.
 *
 * Storage seam: by default the real `kvStorage` (from `lib/storage.ts`) is
 * loaded LAZILY on first use. Lazy on purpose — so importing this module, and
 * tests that inject their own adapter, never pull in the native
 * `expo-sqlite` / `react-native` storage layer. Tests pass an in-memory `KvLike`.
 */
import type { LearningEvent } from "../events";
import type { LearningRepository } from "./types";
import { migrateEventLogToCurrent } from "../event-migration";
import { InvalidLearningEventError, validateLearningEvent } from "../event-envelope";
import { backupCorruptValue, corruptBackupKey } from "../../../lib/safeStorage";
import { privacyResetEpoch, isPersistSuppressed } from "../../../lib/privacyResetEpoch";

/** Minimal storage surface this repository needs. The app's `kvStorage` satisfies it. */
export type KvLike = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
};

/** Namespaced keys — must never collide with live-v7 `lm7` / `lm7_srs`. */
export const LM_LE_EVENTS_KEY = "lm_le_events";
export const LM_LE_SNAPSHOT_KEY = "lm_le_snapshot";
/** Where a corrupt event log is preserved for recovery (never overwritten). */
export const LM_LE_EVENTS_CORRUPT_KEY = corruptBackupKey(LM_LE_EVENTS_KEY);

/**
 * Thrown when an append is refused because the on-disk event log is corrupt.
 * The raw blob is preserved under `LM_LE_EVENTS_CORRUPT_KEY`; the original key is
 * left untouched (fail-closed) so nothing recoverable is destroyed. Callers
 * already tolerate a rejected append (the session controller's serialized chain
 * surfaces an error status and keeps draining).
 */
export class CorruptEventLogError extends Error {
  constructor(public readonly key: string) {
    super(`event log at "${key}" is corrupt; append refused to avoid data loss`);
    this.name = "CorruptEventLogError";
  }
}

/**
 * Thrown when the event log is well-formed JSON but carries a schema this build
 * cannot read (e.g. a newer version written by a later app build, or an event
 * that fails v1 structural validation). DISTINCT from
 * {@link CorruptEventLogError}: the bytes are fine, our support for them is not.
 * Fail-closed per YASA 1 — the original key is never overwritten or cleared.
 */
export class UnsupportedEventLogError extends Error {
  constructor(
    public readonly key: string,
    public readonly reason: string,
    public readonly index: number,
  ) {
    super(
      `event log at "${key}" is unsupported (event #${index}: ${reason}); ` +
        `refusing to read or overwrite it`,
    );
    this.name = "UnsupportedEventLogError";
  }
}

/** Discriminated read of the raw event log. */
type EventLogRead =
  | { kind: "empty" }
  | {
      kind: "events";
      events: LearningEvent[];
      /** True when at least one event was upgraded from v1 in memory. */
      migratedAny: boolean;
    }
  | { kind: "corrupt"; raw: string }
  | { kind: "unsupported"; reason: string; index: number };

export class LocalRepository implements LearningRepository {
  private readonly injectedStore?: KvLike;
  private defaultStorePromise?: Promise<KvLike>;
  /**
   * PR-H reset write-barrier: the local-privacy reset epoch captured when this
   * repository was CREATED. If an explicit privacy reset bumps the epoch after
   * that, every write method becomes a no-op — a stale pre-reset
   * repository/controller can never re-create the cleared `lm_le_*` keys. A
   * repository created after the reset (normal remount) captures the new epoch
   * and writes normally. Reads are never suppressed.
   */
  private readonly ackEpoch = privacyResetEpoch();

  /**
   * @param store optional storage adapter (used by tests). When omitted, the
   *   real `kvStorage` is lazily imported on first access.
   */
  constructor(store?: KvLike) {
    this.injectedStore = store;
  }

  /** True when an unacknowledged privacy reset makes this writer stale (PR-H). */
  private isStaleWriter(): boolean {
    return isPersistSuppressed(this.ackEpoch);
  }

  private async store(): Promise<KvLike> {
    if (this.injectedStore) return this.injectedStore;
    if (!this.defaultStorePromise) {
      this.defaultStorePromise = import("../../../lib/storage").then(
        (m) => m.kvStorage as KvLike,
      );
    }
    return this.defaultStorePromise;
  }

  /**
   * Classify the raw event log without mutating storage:
   *  - `empty`       → key absent/blank (first-run).
   *  - `events`      → a valid JSON array, migrated IN MEMORY to the current
   *                    envelope version (mixed v1/v2 logs are handled per event).
   *  - `corrupt`     → unparseable OR parsed-but-not-an-array; carries the raw blob.
   *  - `unsupported` → valid JSON array, unreadable schema (future version or a
   *                    malformed event). Fail-closed; storage untouched.
   *
   * Reading NEVER rewrites the key: a v1 log stays v1 on disk until the next
   * legitimate append persists the normalized array (K1 — "absent reads as v1,
   * stored data never rewritten just to stamp the field").
   */
  private async readEventLog(): Promise<EventLogRead> {
    const store = await this.store();
    const raw = await store.getItem(LM_LE_EVENTS_KEY);
    if (raw == null || raw === "") return { kind: "empty" };
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { kind: "corrupt", raw };
    }
    if (!Array.isArray(parsed)) return { kind: "corrupt", raw };

    const migrated = migrateEventLogToCurrent(parsed);
    if (migrated.status === "unsupported") {
      return { kind: "unsupported", reason: migrated.reason, index: migrated.index };
    }
    return { kind: "events", events: migrated.events, migratedAny: migrated.migratedAny };
  }

  /**
   * Preserve a corrupt event blob under a non-overwriting backup key. Idempotent
   * (the first captured corruption is kept), and it never touches the original
   * `LM_LE_EVENTS_KEY`, so the recoverable raw value is never destroyed.
   */
  private async quarantineCorruptLog(raw: string): Promise<void> {
    const store = await this.store();
    await backupCorruptValue(
      store,
      LM_LE_EVENTS_KEY,
      raw,
      "event-log-not-array-or-unparseable",
    );
  }

  /**
   * Read the event list for consumers. A valid (possibly empty) log reads as its
   * migrated array. A corrupt log is quarantined (raw preserved) and surfaced as
   * `[]` so downstream derivation stays crash-free — the original blob is NOT
   * erased. An UNSUPPORTED log also reads as `[]` (never a crash, never a silent
   * partial history) and is likewise left completely untouched on disk; appends
   * against it are refused below so nothing overwrites recoverable data.
   */
  private async readEvents(): Promise<LearningEvent[]> {
    const res = await this.readEventLog();
    if (res.kind === "corrupt") {
      await this.quarantineCorruptLog(res.raw);
      return [];
    }
    if (res.kind === "unsupported") return [];
    return res.kind === "events" ? res.events : [];
  }

  private async writeEvents(events: LearningEvent[]): Promise<void> {
    const store = await this.store();
    await store.setItem(LM_LE_EVENTS_KEY, JSON.stringify(events));
  }

  /**
   * Append one event unless its `clientEventId` is already present (idempotent).
   * Fails closed on a corrupt log: the raw blob is backed up and the append is
   * refused (throws `CorruptEventLogError`) rather than overwriting the corrupt
   * original with `[event]` — non-destructive per audit B3.
   */
  async appendEvent(event: LearningEvent): Promise<void> {
    // PR-H: a privacy reset happened after this repository was created — the
    // write is suppressed so a stale writer can't re-create `lm_le_events`.
    if (this.isStaleWriter()) return;

    // The repository is the DURABLE boundary, so it cannot rely on TypeScript
    // alone: a cast, a hand-built object, or a future caller could hand it an
    // invalid event. Validate BEFORE touching storage, so a rejected append
    // leaves the log exactly as it was — including an un-normalized v1 log,
    // which must not be rewritten on behalf of an event we are refusing.
    const issues = validateLearningEvent(event);
    if (issues.length > 0) throw new InvalidLearningEventError(issues);

    const res = await this.readEventLog();
    if (res.kind === "corrupt") {
      await this.quarantineCorruptLog(res.raw);
      throw new CorruptEventLogError(LM_LE_EVENTS_KEY);
    }
    if (res.kind === "unsupported") {
      // Fail-closed: writing here would overwrite a log this build cannot read.
      throw new UnsupportedEventLogError(LM_LE_EVENTS_KEY, res.reason, res.index);
    }
    const events = res.kind === "events" ? res.events : [];
    if (events.some((e) => e.clientEventId === event.clientEventId)) return;
    events.push(event);
    // The array written back is the MIGRATED one, so the first legitimate append
    // after a v1 read is what normalizes storage to an all-v2 log.
    await this.writeEvents(events);
  }

  /** Events still `pending`, in append order. */
  async getPending(): Promise<LearningEvent[]> {
    const events = await this.readEvents();
    return events.filter((e) => e.sync.status === "pending");
  }

  /**
   * Flip matching events to `synced` (by `clientEventId`). Unknown ids are
   * ignored; order is preserved; matched events are replaced with new objects
   * (no in-place mutation), unmatched events are kept as-is.
   */
  async markSynced(clientEventIds: string[]): Promise<void> {
    if (this.isStaleWriter()) return; // PR-H reset write-barrier
    if (clientEventIds.length === 0) return;
    const ids = new Set(clientEventIds);
    const events = await this.readEvents();
    let changed = false;
    const next = events.map((e) => {
      if (ids.has(e.clientEventId) && e.sync.status !== "synced") {
        changed = true;
        return { ...e, sync: { ...e.sync, status: "synced" as const } };
      }
      return e;
    });
    if (changed) await this.writeEvents(next);
  }

  /** All events in append order, for deterministic local mastery derivation. */
  async readAllEvents(): Promise<LearningEvent[]> {
    return this.readEvents();
  }

  /** Cached projection; `null` when absent or unparseable. Typed `unknown` until P2.2. */
  async readSnapshot(): Promise<unknown | null> {
    const store = await this.store();
    const raw = await store.getItem(LM_LE_SNAPSHOT_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return null;
    }
  }

  /** Persist a cached projection as JSON. Typed `unknown` until P2.2. */
  async writeSnapshot(snapshot: unknown): Promise<void> {
    if (this.isStaleWriter()) return; // PR-H reset write-barrier
    const store = await this.store();
    await store.setItem(LM_LE_SNAPSHOT_KEY, JSON.stringify(snapshot));
  }
}
