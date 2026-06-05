/**
 * Local PrivacyState persistence adapter (P5.4A) — narrow, validated, RN-safe.
 *
 * Reads / writes / clears the pure `PrivacyState` (P5.2) on device under a
 * dedicated `lm_le_*` key, so a FUTURE disclosure/settings UI can load and save
 * local privacy choices. It does NOT add UI, does NOT enable remote sync, and
 * does NOT touch the learning event log.
 *
 * Hard boundaries (P5.4A):
 *  - Only this module's key (`lm_le_privacy_state`) is ever read/written/removed.
 *    It never touches `lm_le_events` / `lm_le_snapshot` / `lm7` / `lm7_srs` or any
 *    other key.
 *  - Corrupt / malformed / stale-version stored JSON ALWAYS falls back to
 *    `createEmptyPrivacyState()` — reads never throw on bad storage.
 *  - No `Date.now` (state timestamps come from the caller via privacy.ts helpers),
 *    no network, no AI, no Supabase, no `RemoteRepository`. Does not mutate input.
 *  - The real `kvStorage` is loaded LAZILY only when no `store` is injected, so
 *    importing this module never pulls in the native storage layer (tests inject).
 */
import {
  createEmptyPrivacyState,
  markLocalDisclosureSeen,
  PRIVACY_STATE_VERSION,
  type ConsentBlock,
  type LocalDisclosureBlock,
  type PrivacyState,
} from "./privacy";

/** Dedicated key in the `lm_le_*` namespace; distinct from events/snapshot/legacy. */
export const LM_LE_PRIVACY_STATE_KEY = "lm_le_privacy_state";

/** Minimal storage surface this adapter needs. The app's `kvStorage` satisfies it. */
export type KvFull = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
};

function isConsentBlock(x: unknown): x is ConsentBlock {
  if (typeof x !== "object" || x === null) return false;
  const b = x as Record<string, unknown>;
  return (
    typeof b.consented === "boolean" &&
    (b.version === null || typeof b.version === "string") &&
    (b.consentedAt === null || typeof b.consentedAt === "number")
  );
}

function isLocalDisclosureBlock(x: unknown): x is LocalDisclosureBlock {
  if (typeof x !== "object" || x === null) return false;
  const b = x as Record<string, unknown>;
  return (
    typeof b.seen === "boolean" &&
    (b.version === null || typeof b.version === "string") &&
    (b.seenAt === null || typeof b.seenAt === "number")
  );
}

/**
 * Narrow shape guard. A stored value is trusted only when its version matches the
 * CURRENT `PRIVACY_STATE_VERSION` and every block has the expected primitive
 * shapes; anything else is treated as absent (→ empty state). This is deliberately
 * migration-free: an unknown/stale version safely resets rather than guessing.
 */
function isValidPrivacyState(x: unknown): x is PrivacyState {
  if (typeof x !== "object" || x === null) return false;
  const s = x as Record<string, unknown>;
  return (
    s.version === PRIVACY_STATE_VERSION &&
    isLocalDisclosureBlock(s.localDisclosure) &&
    isConsentBlock(s.testerRemoteSync) &&
    isConsentBlock(s.accountSync) &&
    (s.updatedAt === null || typeof s.updatedAt === "number")
  );
}

/**
 * Read the local `PrivacyState`. Absent key, unparseable JSON, malformed shape,
 * or stale/unknown version all return a fresh `createEmptyPrivacyState()`. Never
 * throws on corrupt storage.
 */
export async function readLocalPrivacyState(args?: {
  store?: KvFull;
}): Promise<PrivacyState> {
  const store = args?.store ?? (await loadKvStore());
  const raw = await store.getItem(LM_LE_PRIVACY_STATE_KEY);
  if (!raw) return createEmptyPrivacyState();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return createEmptyPrivacyState();
  }
  return isValidPrivacyState(parsed) ? parsed : createEmptyPrivacyState();
}

/**
 * Persist a `PrivacyState` under the dedicated key. Does not mutate the input and
 * does not stamp time (callers update timestamps via privacy.ts helpers).
 */
export async function writeLocalPrivacyState(args: {
  state: PrivacyState;
  store?: KvFull;
}): Promise<void> {
  const store = args.store ?? (await loadKvStore());
  await store.setItem(LM_LE_PRIVACY_STATE_KEY, JSON.stringify(args.state));
}

/**
 * Remove ONLY the privacy-state key. Never touches `lm_le_events` /
 * `lm_le_snapshot` / `lm7` / `lm7_srs` or any unrelated key. Idempotent.
 */
export async function clearLocalPrivacyState(args?: {
  store?: KvFull;
}): Promise<void> {
  const store = args?.store ?? (await loadKvStore());
  await store.removeItem(LM_LE_PRIVACY_STATE_KEY);
}

/**
 * Convenience: record that the founder-local disclosure was seen and persist it,
 * returning the updated state. Records disclosure ONLY — never enables remote sync
 * (it reuses `markLocalDisclosureSeen`, which touches no consent block).
 */
export async function markAndPersistLocalDisclosureSeen(args: {
  timestamp: number;
  store?: KvFull;
}): Promise<PrivacyState> {
  const current = await readLocalPrivacyState({ store: args.store });
  const next = markLocalDisclosureSeen(current, args.timestamp);
  await writeLocalPrivacyState({ state: next, store: args.store });
  return next;
}

async function loadKvStore(): Promise<KvFull> {
  const mod = await import("../../lib/storage");
  return mod.kvStorage as KvFull;
}
