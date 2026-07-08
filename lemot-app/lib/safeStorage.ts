/**
 * Corruption-safe JSON storage helpers (PR-A, audit B2/B3).
 *
 * The bug these guard against: a load path that treats invalid/partial JSON as
 * a clean empty state, then lets the next write overwrite the still-recoverable
 * raw blob. These helpers make that impossible without changing the happy path:
 * valid data loads exactly as before; corrupt data is preserved under a
 * non-overwriting backup key so nothing is silently destroyed.
 *
 * Pure and React-free by design — usable from hooks (`lm7` / `lm7_srs`) and from
 * the learning-engine repository (`lm_le_events`), and testable through an
 * injected in-memory KV. Uses only the app's existing storage primitives.
 */

/** Minimal storage surface these helpers need. The app's `kvStorage` satisfies it. */
export type MinimalKv = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
};

/** Result of a corruption-aware load. `corrupt` means "raw existed but was unusable". */
export type SafeLoadResult<T> =
  | { kind: "missing" }
  | { kind: "valid"; value: T }
  | { kind: "corrupt"; raw: string };

/** Deterministic, inspectable backup key for a corrupt value under `key`. */
export function corruptBackupKey(key: string): string {
  return `${key}__corrupt`;
}

/** True for a non-null, non-array object (the shape `lm7` / `lm7_srs` expect). */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Load and classify a JSON value. Never throws:
 *  - `missing`  → key absent or empty (first-run).
 *  - `valid`    → parsed and passed `isValid`.
 *  - `corrupt`  → unparseable OR failed `isValid`; carries the raw string so the
 *                 caller can preserve it.
 */
export async function safeLoadJson<T>(
  store: MinimalKv,
  key: string,
  isValid: (parsed: unknown) => boolean,
): Promise<SafeLoadResult<T>> {
  const raw = await store.getItem(key);
  if (raw == null || raw === "") return { kind: "missing" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { kind: "corrupt", raw };
  }
  // `isValid` is a coarse usability gate (e.g. "is a plain object"); callers read
  // fields defensively, so a partial-but-usable object is intentionally accepted.
  return isValid(parsed) ? { kind: "valid", value: parsed as T } : { kind: "corrupt", raw };
}

/**
 * Preserve a corrupt `raw` value under `corruptBackupKey(key)` with debug
 * metadata (original key, reason, timestamp). Non-overwriting: if a backup
 * already exists it is kept and nothing is written (`wrote: false`), so the
 * first-captured corruption is never clobbered by a later one.
 *
 * `now` is injectable for deterministic tests; it defaults to `Date.now()`.
 * This is an I/O-layer diagnostic timestamp, not an engine event timestamp.
 */
export async function backupCorruptValue(
  store: MinimalKv,
  key: string,
  raw: string,
  reason: string,
  now: number = Date.now(),
): Promise<{ backupKey: string; wrote: boolean }> {
  const backupKey = corruptBackupKey(key);
  const existing = await store.getItem(backupKey);
  if (existing != null) return { backupKey, wrote: false };
  const payload = JSON.stringify({ key, reason, savedAt: now, raw });
  await store.setItem(backupKey, payload);
  return { backupKey, wrote: true };
}

/**
 * Load `key`; on corrupt data, back up the raw blob (non-overwriting) and report
 * `corrupt: true` WITHOUT touching the original key. The original stays intact
 * so a later, deliberate valid write can replace it — a clean-empty auto-save
 * must not. Returns `value: null` for missing/corrupt.
 */
export async function loadOrQuarantine<T>(
  store: MinimalKv,
  key: string,
  isValid: (parsed: unknown) => boolean,
  reason: string,
  now?: number,
): Promise<{ value: T | null; corrupt: boolean }> {
  const res = await safeLoadJson<T>(store, key, isValid);
  if (res.kind === "corrupt") {
    await backupCorruptValue(store, key, res.raw, reason, now);
    return { value: null, corrupt: true };
  }
  return { value: res.kind === "valid" ? res.value : null, corrupt: false };
}
