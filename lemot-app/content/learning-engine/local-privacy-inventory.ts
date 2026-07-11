/**
 * Central local privacy inventory (PR-H, audit C2 / C5 / C6).
 *
 * One source of truth for EVERY local, app-owned learner/privacy storage key, so
 * a device-local "reset my data" removes all of it and a device-local export
 * includes all of it — the two can never drift again. Before this, the reset /
 * export primitives (`privacy-data.ts`, `privacy-local.ts`) each carried their own
 * partial key list, so `lm7` / `lm7_srs` and every `${key}__corrupt` quarantine
 * blob (which hold RAW learner answers) were orphaned by both paths.
 *
 * Scope is strictly LOCAL + app-owned learner/privacy data:
 *  - IN: `lm7` (progress + errors + daily review), `lm7_srs` (SRS/mastery),
 *    the learning-engine keys (`lm_le_events`, `lm_le_snapshot`,
 *    `lm_le_telemetry`), the local privacy state, and the `__corrupt`
 *    quarantine sibling of every quarantined key.
 *  - OUT: the Supabase auth token (`sb-*` — clearing it would sign the user out,
 *    not a learner-data operation), onboarding flags (`lm7_seen_*` — UX flags,
 *    not learner data / PII), and ALL cloud rows. Cloud deletion is audit **C1**
 *    and remains FUTURE work — nothing here touches Supabase / the network.
 *
 * Pure + harness-testable: no React / native imports at module load; the real
 * `kvStorage` is loaded lazily only when no `store` is injected (tests inject an
 * in-memory KV). Preserves the PR-A corrupt-storage contract — it only ever
 * REMOVES the quarantine blobs (on an explicit reset) or READS them (on export);
 * it never overwrites a live key with empty data.
 */
import { corruptBackupKey } from "../../lib/safeStorage";
import { LM_LE_EVENTS_KEY, LM_LE_SNAPSHOT_KEY } from "./repository/local";
import { LM_LE_TELEMETRY_KEY } from "./telemetry";
import { LM_LE_PRIVACY_STATE_KEY } from "./privacy-local";
import type { LearningRepository } from "./repository/types";
import {
  exportLocalLearningData,
  type LocalLearningDataExport,
  type TelemetryReadable,
} from "./privacy-data";

/** Live v7 progress blob. Mirrors `STORAGE_KEY` in `hooks/useStorage.ts`. */
export const LM7_PROGRESS_KEY = "lm7";
/** Leitner SRS / mastery blob. Mirrors `SRS_KEY` in `hooks/useSRS.ts`. */
export const LM7_SRS_KEY = "lm7_srs";

/**
 * Primary local learner/privacy keys — the app-owned data a device-local delete
 * must remove and a device-local export must include.
 */
export const LOCAL_PRIVACY_PRIMARY_KEYS = [
  LM7_PROGRESS_KEY,
  LM7_SRS_KEY,
  LM_LE_EVENTS_KEY,
  LM_LE_SNAPSHOT_KEY,
  LM_LE_TELEMETRY_KEY,
  LM_LE_PRIVACY_STATE_KEY,
] as const;

/**
 * Keys that get a `${key}__corrupt` quarantine sibling via `safeStorage` (PR-A).
 * Those backups hold the RAW blob (learner given-answers / event log), so a
 * complete reset must delete them and a complete export must include them (C2).
 */
export const LOCAL_PRIVACY_QUARANTINED_KEYS = [
  LM7_PROGRESS_KEY,
  LM7_SRS_KEY,
  LM_LE_EVENTS_KEY,
] as const;

/** The `${key}__corrupt` backup keys (audit C2). */
export const LOCAL_PRIVACY_CORRUPT_KEYS: readonly string[] =
  LOCAL_PRIVACY_QUARANTINED_KEYS.map(corruptBackupKey);

/**
 * Every local learner/privacy key a complete reset/export must cover, in a
 * deterministic order: primary keys first, then their corrupt-quarantine blobs.
 */
export const ALL_LOCAL_PRIVACY_KEYS: readonly string[] = [
  ...LOCAL_PRIVACY_PRIMARY_KEYS,
  ...LOCAL_PRIVACY_CORRUPT_KEYS,
];

/** Minimal storage surface: read + remove. The app's `kvStorage` satisfies it. */
export type KvFullLike = {
  getItem(key: string): string | null | Promise<string | null>;
  removeItem(key: string): void | Promise<void>;
};

/**
 * Remove EVERY local learner/privacy key on this device — primary keys AND their
 * `__corrupt` quarantine blobs (audit C2/C5). Idempotent: removing an absent key
 * is a no-op. Local-only; it never touches the Supabase auth token, onboarding
 * flags, or any cloud row (cloud deletion is C1, future work).
 *
 * NOTE: this clears on-device STORAGE only. Live in-memory state is reset
 * separately by the runtime barrier: `AppProvider.resetLocalData` bumps the
 * reset epoch (which notifies mounted stores like `useStorage` / `useSRS` to
 * clear their in-memory data and re-acknowledge) and suppresses stale writers,
 * so no app restart is needed — see `PrivacyDataControls` and `privacyResetEpoch`.
 */
export async function resetAllLocalPrivacyData(args?: {
  store?: KvFullLike;
}): Promise<void> {
  const store = args?.store ?? (await loadKvStore());
  for (const key of ALL_LOCAL_PRIVACY_KEYS) {
    await store.removeItem(key);
  }
}

/**
 * Read the raw stored value of every PRESENT local privacy key, keyed by storage
 * key — the complete on-device footprint for a data-subject export (audit C6),
 * including `__corrupt` quarantine blobs (C2). Absent/empty keys are omitted.
 * Read-only: it never mutates storage.
 */
export async function collectLocalPrivacyBlobs(args?: {
  store?: KvFullLike;
}): Promise<Record<string, string>> {
  const store = args?.store ?? (await loadKvStore());
  const out: Record<string, string> = {};
  for (const key of ALL_LOCAL_PRIVACY_KEYS) {
    const raw = await store.getItem(key);
    if (raw != null && raw !== "") out[key] = raw;
  }
  return out;
}

async function loadKvStore(): Promise<KvFullLike> {
  const mod = await import("../../lib/storage");
  return mod.kvStorage as KvFullLike;
}

export const LOCAL_PRIVACY_EXPORT_VERSION = "local-privacy-export-v1";

/**
 * A COMPLETE device-local data-subject export (audit C6): the structured
 * learning-engine export (events + derived snapshot + telemetry) PLUS the raw
 * stored value of every present local privacy key — `lm7` progress, `lm7_srs`,
 * the learning-engine keys, the privacy state, and any `__corrupt` quarantine
 * blob (C2). `deviceKeys` is authoritative and complete; `learning` is a
 * convenience structured view (its events/telemetry also appear raw under
 * `deviceKeys`). Cloud rows are NOT included — that is audit C1, future work.
 */
export type LocalPrivacyExport = {
  exportVersion: typeof LOCAL_PRIVACY_EXPORT_VERSION;
  exportedAt: number;
  learning: LocalLearningDataExport;
  deviceKeys: Record<string, string>;
  deviceKeyCount: number;
};

/**
 * Build a complete device-local export. Combines {@link exportLocalLearningData}
 * (structured, corrupt-safe) with {@link collectLocalPrivacyBlobs} (raw values of
 * the full key inventory). Local-only, no network; `store` is injectable for
 * tests.
 */
export async function exportAllLocalPrivacyData(args: {
  repository: LearningRepository;
  exportedAt: number;
  telemetry?: TelemetryReadable;
  store?: KvFullLike;
}): Promise<LocalPrivacyExport> {
  const learning = await exportLocalLearningData({
    repository: args.repository,
    exportedAt: args.exportedAt,
    telemetry: args.telemetry,
  });
  const deviceKeys = await collectLocalPrivacyBlobs({ store: args.store });
  return {
    exportVersion: LOCAL_PRIVACY_EXPORT_VERSION,
    exportedAt: args.exportedAt,
    learning,
    deviceKeys,
    deviceKeyCount: Object.keys(deviceKeys).length,
  };
}
