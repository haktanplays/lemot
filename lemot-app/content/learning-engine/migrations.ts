/**
 * Migration rails (YASA 1, docs/ROADMAP.md) — infrastructure ONLY.
 *
 * Every future schema change to persisted learner data (mastery/compaction
 * snapshot, telemetry log, event log envelope) must ship with a pure,
 * test-locked migration registered here. This module lays the RAILS; it
 * deliberately ships with ZERO real migrations (no current schema changes).
 *
 * House rules honored:
 *  - Pure and deterministic: no clock, no storage, no I/O; same input →
 *    same output. Input is never mutated (the runner deep-clones once).
 *  - Fail-safe on the unknown: an unrecognized or future schemaVersion
 *    returns { status: "unsupported" } with the ORIGINAL data untouched.
 *    User data is NEVER deleted or "reset clean" — in local-first, lost
 *    progress is unrecoverable and a trust death (YASA 1).
 *  - A migration fn that THROWS is a developer bug and propagates loudly;
 *    the runner never converts it into silent data loss.
 *
 * Current persisted-structure version map (verified by migrations.test.ts):
 *  - compaction/mastery snapshot → `version: COMPACTION_SNAPSHOT_VERSION`
 *    (string-tagged; restoreFromSnapshot already rejects unknown versions).
 *  - telemetry log → `version: TELEMETRY_SCHEMA_VERSION` (number).
 *  - learning-event log → carries NO version field today; per YASA 1 rails
 *    it is READ AS v1 (`readSchemaVersion` below). Stored data is not
 *    rewritten to add the field — stamping it is itself a schema change and
 *    will ride the first real event-log migration. The event log is the most
 *    durable layer: snapshots can always be re-derived from it, which makes
 *    "drop snapshot, recompute" the cheap path for most future migrations.
 *  - lexique memory / mon-lexique / practice-pool → pure projections, never
 *    persisted; they have no schema to migrate.
 */

export type MigrationFn = (
  data: Readonly<Record<string, unknown>>,
) => Record<string, unknown>;

export type MigrationResult =
  | {
      status: "ok";
      schemaVersion: number;
      /** Migrated (or already-current) data. Never the input reference. */
      data: Record<string, unknown>;
      /** The `from` versions of the steps that ran, in order (may be empty). */
      applied: number[];
    }
  | {
      status: "unsupported";
      reason: string;
      /** The version we read, or null when unreadable. */
      schemaVersion: number | null;
      /** The ORIGINAL input, byte-for-byte untouched. */
      data: unknown;
    };

/**
 * Read a persisted structure's schema version. A missing field is v1 by
 * definition (pre-rails data predates versioning). A present but non-number
 * field is unreadable → null (callers must treat as unsupported).
 */
export function readSchemaVersion(data: unknown): number | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const v = (data as Record<string, unknown>).schemaVersion;
  if (v === undefined) return 1;
  return typeof v === "number" && Number.isInteger(v) && v >= 1 ? v : null;
}

export type MigrationRegistry = {
  /**
   * Register a pure step from `from` to `to`. Rails are strictly sequential:
   * `to` must equal `from + 1`; duplicate `from` registrations throw
   * (developer error, fail loud at registration time).
   */
  registerMigration(from: number, to: number, fn: MigrationFn): void;
  /** Run all applicable steps. See MigrationResult for the contract. */
  runMigrations(data: unknown): MigrationResult;
  /** Highest registered target version, or 1 when no migrations exist. */
  latestVersion(): number;
};

/** JSON-safe deep clone; persisted data is JSON by definition. */
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function createMigrationRegistry(): MigrationRegistry {
  const steps = new Map<number, { to: number; fn: MigrationFn }>();

  function latestVersion(): number {
    let latest = 1;
    for (const { to } of steps.values()) if (to > latest) latest = to;
    return latest;
  }

  return {
    registerMigration(from, to, fn) {
      if (!Number.isInteger(from) || from < 1) {
        throw new Error(`migrations: invalid from-version ${from}`);
      }
      if (to !== from + 1) {
        throw new Error(
          `migrations: steps must be sequential (${from} -> ${to} rejected; expected ${from} -> ${from + 1})`,
        );
      }
      if (steps.has(from)) {
        throw new Error(`migrations: duplicate step registered for v${from}`);
      }
      steps.set(from, { to, fn });
    },

    runMigrations(data) {
      const version = readSchemaVersion(data);
      if (version === null) {
        return {
          status: "unsupported",
          reason: "data is not an object or carries an unreadable schemaVersion",
          schemaVersion: null,
          data,
        };
      }
      const target = latestVersion();
      if (version > target) {
        return {
          status: "unsupported",
          reason: `schemaVersion ${version} is newer than the highest known version ${target} (future data; refusing to touch it)`,
          schemaVersion: version,
          data,
        };
      }

      let current = clone(data) as Record<string, unknown>;
      const applied: number[] = [];
      let v = version;
      while (v < target) {
        const step = steps.get(v);
        if (!step) {
          return {
            status: "unsupported",
            reason: `no migration registered for v${v} -> v${v + 1} (gap in the rails)`,
            schemaVersion: version,
            data,
          };
        }
        const next = step.fn(current);
        if (!next || typeof next !== "object" || Array.isArray(next)) {
          throw new Error(
            `migrations: step v${v} -> v${step.to} returned a non-object (developer bug)`,
          );
        }
        current = { ...next, schemaVersion: step.to };
        applied.push(v);
        v = step.to;
      }
      if (applied.length === 0) {
        // Already current: still return a clone so callers can never mutate
        // the caller's original through the result.
        return { status: "ok", schemaVersion: v, data: current, applied };
      }
      return { status: "ok", schemaVersion: v, data: current, applied };
    },

    latestVersion,
  };
}

/**
 * The shipped default registry. INTENTIONALLY EMPTY in this PR: WP3 lays
 * rails only. The first real schema change registers its step here and adds
 * the paired "v(n) sample -> v(n+1) -> assert invariants" test.
 */
export const defaultMigrationRegistry: MigrationRegistry = createMigrationRegistry();

export const registerMigration: MigrationRegistry["registerMigration"] = (from, to, fn) =>
  defaultMigrationRegistry.registerMigration(from, to, fn);

export const runMigrations: MigrationRegistry["runMigrations"] = (data) =>
  defaultMigrationRegistry.runMigrations(data);
