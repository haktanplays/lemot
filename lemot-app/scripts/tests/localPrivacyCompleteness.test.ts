/**
 * PR-H — local privacy completeness (audit C2 / C5 / C6).
 *
 * A device-local reset must remove EVERY local learner/privacy key, and a
 * device-local export must include EVERY one — including `lm7` progress,
 * `lm7_srs`, and the `${key}__corrupt` quarantine blobs that hold raw learner
 * answers (previously orphaned by both paths). Cloud deletion (C1) is out of
 * scope, so the copy must stay device-scoped and never claim cloud deletion.
 *
 * The reset/export helpers run against an injected in-memory KV; the copy check
 * is a source scan (RN components can't render in the pure harness), matching the
 * existing `noSupabaseAuthGuard` / `componentCopyGuard` pattern.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { makeFakeKv, makeEvent } from "./helpers";
import {
  LocalRepository,
  LM_LE_EVENTS_KEY,
  LM_LE_SNAPSHOT_KEY,
} from "../../content/learning-engine/repository/local";
import { TelemetryStore, LM_LE_TELEMETRY_KEY } from "../../content/learning-engine/telemetry";
import { LM_LE_PRIVACY_STATE_KEY } from "../../content/learning-engine/privacy-local";
import {
  LM7_PROGRESS_KEY,
  LM7_SRS_KEY,
  ALL_LOCAL_PRIVACY_KEYS,
  LOCAL_PRIVACY_CORRUPT_KEYS,
  resetAllLocalPrivacyData,
  exportAllLocalPrivacyData,
} from "../../content/learning-engine/local-privacy-inventory";

const LM7_CORRUPT = "lm7__corrupt";
const LM7_SRS_CORRUPT = "lm7_srs__corrupt";
const EVENTS_CORRUPT = "lm_le_events__corrupt";

const SAMPLE_EVENTS = [makeEvent({ clientEventId: "a", result: "correct" })];

/** Keys that are NOT learner/privacy data and must survive a reset. */
const OUT_OF_SCOPE = {
  "sb-projectref-auth-token": "auth-token-value",
  lm7_seen_lesson_zero: "1",
};

function seed() {
  return makeFakeKv({
    [LM7_PROGRESS_KEY]: JSON.stringify({ p: { "1-x": true }, err: [{ g: "bonjour" }], dr: { date: "", count: 0 } }),
    [LM7_SRS_KEY]: JSON.stringify({ box: { "1-x": 2 } }),
    [LM_LE_EVENTS_KEY]: JSON.stringify(SAMPLE_EVENTS),
    [LM_LE_SNAPSHOT_KEY]: "{}",
    [LM_LE_TELEMETRY_KEY]: "[]",
    [LM_LE_PRIVACY_STATE_KEY]: JSON.stringify({ version: 1 }),
    [LM7_CORRUPT]: JSON.stringify({ raw: "corrupt-lm7-with-given-answers" }),
    [LM7_SRS_CORRUPT]: JSON.stringify({ raw: "corrupt-srs" }),
    [EVENTS_CORRUPT]: JSON.stringify({ raw: "corrupt-events-with-userAnswer" }),
    ...OUT_OF_SCOPE,
  });
}

describe("PR-H — local reset removes all local learner/privacy data (C2/C5)", () => {
  test("1. reset removes primary local learner state (lm7 progress + answers)", async () => {
    const kv = seed();
    await resetAllLocalPrivacyData({ store: kv });
    assert(!kv.map.has(LM7_PROGRESS_KEY), "lm7 must be cleared");
  });

  test("2. reset removes SRS / mastery local state (lm7_srs)", async () => {
    const kv = seed();
    await resetAllLocalPrivacyData({ store: kv });
    assert(!kv.map.has(LM7_SRS_KEY), "lm7_srs must be cleared");
  });

  test("3. reset removes learning-event and telemetry records", async () => {
    const kv = seed();
    await resetAllLocalPrivacyData({ store: kv });
    assert(!kv.map.has(LM_LE_EVENTS_KEY), "lm_le_events must be cleared");
    assert(!kv.map.has(LM_LE_TELEMETRY_KEY), "lm_le_telemetry must be cleared");
    assert(!kv.map.has(LM_LE_SNAPSHOT_KEY), "lm_le_snapshot must be cleared");
    assert(!kv.map.has(LM_LE_PRIVACY_STATE_KEY), "lm_le_privacy_state must be cleared");
  });

  test("4. reset removes corrupt-quarantine __corrupt blobs (C2)", async () => {
    const kv = seed();
    await resetAllLocalPrivacyData({ store: kv });
    for (const key of LOCAL_PRIVACY_CORRUPT_KEYS) {
      assert(!kv.map.has(key), `${key} (raw learner PII) must be cleared`);
    }
  });

  test("reset stays device-scoped: auth token and onboarding flags survive", async () => {
    const kv = seed();
    await resetAllLocalPrivacyData({ store: kv });
    assertEqual(kv.map.get("sb-projectref-auth-token"), "auth-token-value", "auth token untouched (not learner data)");
    assertEqual(kv.map.get("lm7_seen_lesson_zero"), "1", "onboarding flag untouched");
    // Everything in the inventory is gone; nothing outside it was removed.
    for (const key of ALL_LOCAL_PRIVACY_KEYS) assert(!kv.map.has(key), `${key} cleared`);
  });
});

describe("PR-H — local export includes all local learner/privacy data (C6)", () => {
  async function runExport(kv: ReturnType<typeof makeFakeKv>) {
    return exportAllLocalPrivacyData({
      repository: new LocalRepository(kv),
      exportedAt: 100,
      telemetry: new TelemetryStore(kv),
      store: kv,
    });
  }

  test("5. export includes primary local learner state (lm7)", async () => {
    const out = await runExport(seed());
    assert(LM7_PROGRESS_KEY in out.deviceKeys, "export deviceKeys must include lm7");
    assert(out.deviceKeys[LM7_PROGRESS_KEY].includes("bonjour"), "raw lm7 blob is carried");
    assert(out.learning.eventCount === 1, "structured learning events are still exported");
  });

  test("6. export includes SRS / mastery local state (lm7_srs)", async () => {
    const out = await runExport(seed());
    assert(LM7_SRS_KEY in out.deviceKeys, "export deviceKeys must include lm7_srs");
  });

  test("7. export includes corrupt-quarantine blobs when present (C2)", async () => {
    const out = await runExport(seed());
    for (const key of LOCAL_PRIVACY_CORRUPT_KEYS) {
      assert(key in out.deviceKeys, `${key} must be included in the export`);
    }
    assert(out.deviceKeyCount === ALL_LOCAL_PRIVACY_KEYS.length, "every present inventory key is counted");
  });

  test("export omits absent keys (only present device data is included)", async () => {
    const kv = makeFakeKv({ [LM7_PROGRESS_KEY]: "{}" }); // only one key present
    const out = await runExport(kv);
    assert(out.deviceKeyCount === 1, "only the present key is exported");
    assert(!(LM7_SRS_KEY in out.deviceKeys), "absent lm7_srs is not fabricated");
  });
});

describe("PR-H — copy is device-scoped and never claims cloud deletion (C5)", () => {
  test("8. PrivacyDataControls copy scopes to this device and does not claim cloud deletion", () => {
    const src = readFileSync(
      join(process.cwd(), "components/learning-engine/PrivacyDataControls.tsx"),
      "utf8",
    );
    assert(src.includes("only affects this device"), "reset copy must scope to this device");
    assert(/not the cloud/.test(src), "reset copy must explicitly say it does not touch the cloud");
    const overclaims = [
      "delete your account",
      "deleted from the cloud",
      "from our servers",
      "deleted everywhere",
      "account deleted",
      "cloud copy",
    ];
    const lower = src.toLowerCase();
    for (const phrase of overclaims) {
      assert(!lower.includes(phrase), `copy must not claim cloud deletion: "${phrase}"`);
    }
  });
});
