/**
 * YASA 1 migration rails (docs/ROADMAP.md) — harness + contracts only.
 *
 * No real migrations exist yet (WP3 ships rails, not schema changes). These
 * tests lock the rails' behavior with SAMPLE registries following the canon
 * pattern: "give a v(n) example -> migrate to v(n+1) -> assert invariants".
 */
import { describe, test, assert, assertEqual, clone } from "./harness";
import {
  createMigrationRegistry,
  defaultMigrationRegistry,
  readSchemaVersion,
} from "../../content/learning-engine/migrations";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import { TELEMETRY_SCHEMA_VERSION } from "../../content/learning-engine/telemetry";

describe("migration rails (YASA 1)", () => {
  test("shipped default registry is EMPTY (rails only, no schema change)", () => {
    assertEqual(
      defaultMigrationRegistry.latestVersion(),
      1,
      "WP3 must ship zero real migrations",
    );
  });

  test("persisted structures carry versions: compaction + telemetry tagged, event log reads as v1", () => {
    assert(
      typeof COMPACTION_SNAPSHOT_VERSION === "string" && COMPACTION_SNAPSHOT_VERSION.length > 0,
      "compaction snapshot must stay version-tagged",
    );
    assertEqual(TELEMETRY_SCHEMA_VERSION, 1, "telemetry log schema version");
    // The learning-event log has no version field today; the rails read it
    // as v1 by definition instead of rewriting stored data.
    assertEqual(readSchemaVersion({ events: [] }), 1, "versionless structure is v1 by assumption");
  });

  test("readSchemaVersion: present integer wins; garbage is unreadable", () => {
    assertEqual(readSchemaVersion({ schemaVersion: 3 }), 3, "explicit version");
    assertEqual(readSchemaVersion(null), null, "null is unreadable");
    assertEqual(readSchemaVersion([1, 2]), null, "arrays are unreadable");
    assertEqual(readSchemaVersion({ schemaVersion: "2" }), null, "string version is unreadable");
    assertEqual(readSchemaVersion({ schemaVersion: 0 }), null, "versions start at 1");
  });

  test("v1 sample -> v2: field renamed, content preserved, input untouched", () => {
    const registry = createMigrationRegistry();
    registry.registerMigration(1, 2, (data) => {
      const { oldName, ...rest } = data as { oldName: string[] };
      return { ...rest, newName: oldName };
    });
    const input = { oldName: ["a", "b"], keep: 42 }; // versionless => v1
    const before = clone(input);
    const result = registry.runMigrations(input);
    assert(result.status === "ok", "v1 -> v2 must succeed");
    assertEqual(result.schemaVersion, 2, "runner stamps the target version");
    assertEqual(result.applied, [1], "exactly the v1 step ran");
    assertEqual(
      result.data,
      { keep: 42, newName: ["a", "b"], schemaVersion: 2 },
      "content preserved under the new shape",
    );
    assertEqual(input, before, "input must never be mutated");
  });

  test("chain v1 -> v2 -> v3 runs in order", () => {
    const registry = createMigrationRegistry();
    registry.registerMigration(1, 2, (d) => ({ ...d, a: true }));
    registry.registerMigration(2, 3, (d) => ({ ...d, b: true }));
    const result = registry.runMigrations({ schemaVersion: 1 });
    assert(result.status === "ok", "chain must succeed");
    assertEqual(result.applied, [1, 2], "both steps in order");
    assertEqual(result.data, { schemaVersion: 3, a: true, b: true }, "both effects present");
  });

  test("already-current data is ok with zero steps (and returned as a safe clone)", () => {
    const registry = createMigrationRegistry();
    registry.registerMigration(1, 2, (d) => ({ ...d }));
    const input = { schemaVersion: 2, payload: { x: 1 } };
    const result = registry.runMigrations(input);
    assert(result.status === "ok", "current data passes through");
    assertEqual(result.applied, [], "no steps ran");
    assertEqual(result.data, input, "content identical");
    assert(result.data !== input, "but never the same reference");
  });

  test("FUTURE version -> unsupported, original data byte-untouched, never deleted", () => {
    const registry = createMigrationRegistry();
    registry.registerMigration(1, 2, (d) => ({ ...d }));
    const input = { schemaVersion: 99, precious: ["progress"] };
    const before = clone(input);
    const result = registry.runMigrations(input);
    assert(result.status === "unsupported", "future data must be refused, not migrated");
    assert(result.data === input, "the ORIGINAL object comes back");
    assertEqual(input, before, "and it was not touched");
    assert(result.reason.includes("newer"), "reason names the future version");
  });

  test("gap in the rails -> unsupported with the original data", () => {
    const registry = createMigrationRegistry();
    registry.registerMigration(2, 3, (d) => ({ ...d })); // v1 step missing
    const input = { schemaVersion: 1, precious: true };
    const result = registry.runMigrations(input);
    assert(result.status === "unsupported", "a gap must refuse, never skip");
    assert(result.data === input, "original data untouched");
    assert(result.reason.includes("gap"), "reason names the gap");
  });

  test("non-object data -> unsupported, untouched", () => {
    const registry = createMigrationRegistry();
    for (const bad of [null, 7, "text", [1]]) {
      const result = registry.runMigrations(bad);
      assert(result.status === "unsupported", `${JSON.stringify(bad)} must be unsupported`);
      assert(result.data === bad, "returned as-is");
    }
  });

  test("registration guards: non-sequential and duplicate steps throw loudly", () => {
    const registry = createMigrationRegistry();
    let threw = false;
    try {
      registry.registerMigration(1, 3, (d) => ({ ...d }));
    } catch {
      threw = true;
    }
    assert(threw, "1 -> 3 must be rejected (rails are sequential)");
    registry.registerMigration(1, 2, (d) => ({ ...d }));
    threw = false;
    try {
      registry.registerMigration(1, 2, (d) => ({ ...d }));
    } catch {
      threw = true;
    }
    assert(threw, "duplicate v1 step must be rejected");
  });

  test("deterministic: identical input twice -> identical result", () => {
    const registry = createMigrationRegistry();
    registry.registerMigration(1, 2, (d) => ({ ...d, stamped: true }));
    const input = { schemaVersion: 1, list: [3, 2, 1] };
    assertEqual(
      registry.runMigrations(clone(input)),
      registry.runMigrations(clone(input)),
      "same input must produce identical output",
    );
  });
});
