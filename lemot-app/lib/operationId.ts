/**
 * Deletion operation-id generation (PR-I1, audit C1).
 *
 * `delete_my_synced_learning_data(p_op_id uuid)` and
 * `user_sync_delete_operations.operation_id` are Postgres `uuid` columns, so the
 * client-side operation id MUST be a valid RFC4122 UUID — a non-UUID string would
 * make the delete RPC unreachable. Source: `expo-crypto`'s `randomUUID()`
 * (guaranteed RFC4122 v4 across iOS / Android / web), loaded LAZILY so this
 * module stays importable in the pure Node test harness (which injects its own
 * source). There is deliberately NO non-UUID fallback: if the source ever
 * produces a malformed value, generation THROWS (fail closed) rather than
 * sending an id the server would reject later.
 */

/** RFC4122 v4 shape: version nibble `4`, variant nibble `8|9|a|b`. */
export const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuidV4(value: string): boolean {
  return UUID_V4_PATTERN.test(value);
}

type UuidSource = () => string;

let source: UuidSource | null = null;

/**
 * Generate a validated UUIDv4 operation id. Loads `expo-crypto` on first use
 * (tests inject a source instead). Throws — never falls back to a non-UUID —
 * when the source produces anything that is not RFC4122 v4.
 */
export async function makeOperationId(): Promise<string> {
  if (!source) {
    const Crypto = await import("expo-crypto");
    source = () => Crypto.randomUUID();
  }
  const id = source();
  if (!isUuidV4(id)) {
    throw new Error("uuid source produced a non-UUIDv4 operation id");
  }
  return id;
}

/** TEST-ONLY: inject/clear the uuid source (the harness cannot load expo-crypto). */
export function __setUuidSourceForTest(next: UuidSource | null): void {
  source = next;
}
