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

/** Minimal storage surface this repository needs. The app's `kvStorage` satisfies it. */
export type KvLike = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
};

/** Namespaced keys — must never collide with live-v7 `lm7` / `lm7_srs`. */
export const LM_LE_EVENTS_KEY = "lm_le_events";
export const LM_LE_SNAPSHOT_KEY = "lm_le_snapshot";

export class LocalRepository implements LearningRepository {
  private readonly injectedStore?: KvLike;
  private defaultStorePromise?: Promise<KvLike>;

  /**
   * @param store optional storage adapter (used by tests). When omitted, the
   *   real `kvStorage` is lazily imported on first access.
   */
  constructor(store?: KvLike) {
    this.injectedStore = store;
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

  /** Read the event list; any read/parse failure fails safely to `[]`. */
  private async readEvents(): Promise<LearningEvent[]> {
    const store = await this.store();
    const raw = await store.getItem(LM_LE_EVENTS_KEY);
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as LearningEvent[]) : [];
    } catch {
      return [];
    }
  }

  private async writeEvents(events: LearningEvent[]): Promise<void> {
    const store = await this.store();
    await store.setItem(LM_LE_EVENTS_KEY, JSON.stringify(events));
  }

  /** Append one event unless its `clientEventId` is already present (idempotent). */
  async appendEvent(event: LearningEvent): Promise<void> {
    const events = await this.readEvents();
    if (events.some((e) => e.clientEventId === event.clientEventId)) return;
    events.push(event);
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
    const store = await this.store();
    await store.setItem(LM_LE_SNAPSHOT_KEY, JSON.stringify(snapshot));
  }
}
