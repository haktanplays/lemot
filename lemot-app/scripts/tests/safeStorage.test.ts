/**
 * PR-A (audit B2/B3) — corruption-safe storage helpers.
 *
 * Guarantees for `lib/safeStorage`: valid data loads unchanged; corrupt data is
 * classified as corrupt, preserved under a non-overwriting backup key, and the
 * ORIGINAL key is never touched by the load path — so a following save can never
 * silently clobber a still-recoverable blob. Missing keys read as first-run.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  safeLoadJson,
  loadOrQuarantine,
  backupCorruptValue,
  corruptBackupKey,
  isPlainObject,
} from "../../lib/safeStorage";

const KEY = "lm7";
const BACKUP = corruptBackupKey(KEY);

describe("PR-A — safeStorage corruption handling", () => {
  test("valid JSON object loads unchanged and writes no backup", async () => {
    const stored = JSON.stringify({ p: { "1-x": true }, err: [], dr: { date: "d", count: 2 } });
    const store = makeFakeKv({ [KEY]: stored });
    const res = await safeLoadJson(store, KEY, isPlainObject);
    assert(res.kind === "valid", "well-formed object must load as valid");
    const { value, corrupt } = await loadOrQuarantine(store, KEY, isPlainObject, "r");
    assert(!corrupt, "valid data is not corrupt");
    assertEqual(value, JSON.parse(stored), "valid value round-trips unchanged");
    assert(store.map.get(BACKUP) === undefined, "no backup key on the happy path");
    assertEqual(store.map.get(KEY), stored, "original key left byte-identical");
  });

  test("missing key reads as first-run (missing), no backup, no write", async () => {
    const store = makeFakeKv();
    const res = await safeLoadJson(store, KEY, isPlainObject);
    assert(res.kind === "missing", "absent key is missing, not corrupt");
    const { value, corrupt } = await loadOrQuarantine(store, KEY, isPlainObject, "r");
    assert(value === null && !corrupt, "missing → null value, not corrupt");
    assert(store.map.size === 0, "missing load writes nothing");
  });

  test("unparseable JSON is corrupt; raw is backed up and the original is NOT clobbered", async () => {
    const raw = "{ this is not json";
    const store = makeFakeKv({ [KEY]: raw });
    const { value, corrupt } = await loadOrQuarantine(store, KEY, isPlainObject, "lm7-invalid");
    assert(corrupt && value === null, "unparseable data is corrupt");
    // Original key preserved verbatim — the load path must never destroy it.
    assertEqual(store.map.get(KEY), raw, "corrupt original key must be preserved, not overwritten");
    // Raw preserved (with metadata) under the deterministic backup key.
    const backup = store.map.get(BACKUP);
    assert(backup !== undefined, "corrupt raw must be backed up");
    const parsed = JSON.parse(backup as string);
    assertEqual(parsed.raw, raw, "backup preserves the exact raw blob");
    assert(parsed.reason === "lm7-invalid", "backup records the reason");
    assert(parsed.key === KEY, "backup records the original key");
    assert(typeof parsed.savedAt === "number", "backup records a timestamp");
  });

  test("valid JSON of the wrong shape (array) is treated as corrupt and preserved", async () => {
    const raw = JSON.stringify([1, 2, 3]);
    const store = makeFakeKv({ [KEY]: raw });
    const { corrupt } = await loadOrQuarantine(store, KEY, isPlainObject, "lm7-shape");
    assert(corrupt, "an array is not the object shape lm7/lm7_srs expect");
    assertEqual(store.map.get(KEY), raw, "original preserved");
    assert(store.map.get(BACKUP) !== undefined, "raw backed up");
  });

  test("backup is non-overwriting: the first captured corruption is kept", async () => {
    const store = makeFakeKv({ [KEY]: "first-corrupt" });
    const a = await backupCorruptValue(store, KEY, "first-corrupt", "one", 111);
    assert(a.wrote, "first backup is written");
    const b = await backupCorruptValue(store, KEY, "second-corrupt", "two", 222);
    assert(!b.wrote, "second backup must not overwrite the first");
    const parsed = JSON.parse(store.map.get(BACKUP) as string);
    assertEqual(parsed.raw, "first-corrupt", "the first-captured corruption survives");
    assertEqual(parsed.savedAt, 111, "the first backup's metadata is retained");
  });

  test("clean-empty save after corrupt load does not clobber (guard semantics)", async () => {
    // Mirrors the hook guard: after a corrupt load the original + backup exist,
    // and an empty/default save is skipped while a meaningful one is allowed.
    const raw = "corrupt-blob";
    const store = makeFakeKv({ [KEY]: raw });
    const { corrupt } = await loadOrQuarantine(store, KEY, isPlainObject, "lm7-invalid");
    let corruptUnrecovered = corrupt;

    const guardedSave = async (value: Record<string, unknown>, meaningful: boolean) => {
      if (corruptUnrecovered && !meaningful) return; // skip clean-empty clobber
      if (meaningful) corruptUnrecovered = false;
      await store.setItem(KEY, JSON.stringify(value));
    };

    await guardedSave({}, false); // empty first-run default → must be skipped
    assertEqual(store.map.get(KEY), raw, "empty save must not overwrite corrupt original");
    await guardedSave({ p: { "1-x": true } }, true); // real progress → recovery write
    assert(store.map.get(KEY) !== raw, "meaningful save replaces the corrupt original");
    assert(!corruptUnrecovered, "recovery clears the guard");
    // Backup of the original corruption remains available for inspection.
    assert(store.map.get(BACKUP) !== undefined, "original corruption stays recoverable in backup");
  });
});
