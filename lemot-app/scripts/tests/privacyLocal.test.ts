/**
 * Area 2 — privacy-local.ts persistence + key isolation.
 *
 * Guarantees: corrupt/stale storage fails safe to empty state, persistence and
 * clear touch ONLY `lm_le_privacy_state`, never `lm_le_events` / `lm_le_snapshot`
 * / `lm7` / `lm7_srs`, and the disclosure-seen helper records disclosure only
 * (never tester/account consent). All via an injected in-memory store.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { createEmptyPrivacyState } from "../../content/learning-engine/privacy";
import {
  LM_LE_PRIVACY_STATE_KEY,
  readLocalPrivacyState,
  writeLocalPrivacyState,
  clearLocalPrivacyState,
  markAndPersistLocalDisclosureSeen,
} from "../../content/learning-engine/privacy-local";

// Unrelated keys that must never be touched by privacy persistence.
const FOREIGN = {
  lm_le_events: "[]",
  lm_le_snapshot: "{}",
  lm7: "legacy-progress",
  lm7_srs: "legacy-srs",
};

describe("Area 2 — privacy-local.ts persistence + key isolation", () => {
  test("empty/missing storage returns an empty PrivacyState", async () => {
    const store = makeFakeKv();
    const s = await readLocalPrivacyState({ store });
    assertEqual(s, createEmptyPrivacyState(), "missing key must return empty state");
  });

  test("corrupt JSON returns an empty PrivacyState without throwing", async () => {
    const store = makeFakeKv({ [LM_LE_PRIVACY_STATE_KEY]: "{not-json" });
    const s = await readLocalPrivacyState({ store });
    assertEqual(s, createEmptyPrivacyState(), "corrupt JSON must fall back to empty state");
  });

  test("stale/unknown version resets safely to empty state", async () => {
    const stale = { ...createEmptyPrivacyState(), version: "privacy-vOLD" };
    const store = makeFakeKv({ [LM_LE_PRIVACY_STATE_KEY]: JSON.stringify(stale) });
    const s = await readLocalPrivacyState({ store });
    assertEqual(s, createEmptyPrivacyState(), "stale version must reset to empty state");
  });

  test("persist writes only lm_le_privacy_state", async () => {
    const store = makeFakeKv();
    await writeLocalPrivacyState({ state: createEmptyPrivacyState(), store });
    assert(store.map.size === 1, "exactly one key must be written");
    assert(store.map.has(LM_LE_PRIVACY_STATE_KEY), "the privacy key must be written");
  });

  test("clearLocalPrivacyState removes only lm_le_privacy_state", async () => {
    const store = makeFakeKv({ ...FOREIGN, [LM_LE_PRIVACY_STATE_KEY]: "{}" });
    await clearLocalPrivacyState({ store });
    assert(!store.map.has(LM_LE_PRIVACY_STATE_KEY), "privacy key must be removed");
  });

  test("privacy persistence does not touch lm_le_events / lm_le_snapshot / lm7 / lm7_srs", async () => {
    const store = makeFakeKv({ ...FOREIGN });
    await writeLocalPrivacyState({ state: createEmptyPrivacyState(), store });
    await clearLocalPrivacyState({ store });
    assertEqual(store.map.get("lm_le_events"), "[]", "lm_le_events must be untouched");
    assertEqual(store.map.get("lm_le_snapshot"), "{}", "lm_le_snapshot must be untouched");
    assertEqual(store.map.get("lm7"), "legacy-progress", "lm7 must be untouched");
    assertEqual(store.map.get("lm7_srs"), "legacy-srs", "lm7_srs must be untouched");
  });

  test("markAndPersistLocalDisclosureSeen changes only localDisclosure + updatedAt, never consent", async () => {
    const store = makeFakeKv();
    const next = await markAndPersistLocalDisclosureSeen({ timestamp: 555, store });
    assert(next.localDisclosure.seen === true, "disclosure must be recorded as seen");
    assert(next.localDisclosure.seenAt === 555, "seenAt must be the passed timestamp");
    assert(next.updatedAt === 555, "updatedAt must be the passed timestamp");
    assert(next.testerRemoteSync.consented === false, "tester consent must stay false");
    assert(next.accountSync.consented === false, "account consent must stay false");
    // And it persisted under exactly the privacy key.
    const reread = await readLocalPrivacyState({ store });
    assertEqual(reread, next, "persisted state must round-trip");
    assert(store.map.size === 1 && store.map.has(LM_LE_PRIVACY_STATE_KEY), "only privacy key persisted");
  });
});
