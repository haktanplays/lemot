/**
 * PR-I1 — fresh-install emptiness helper (audit C1).
 *
 * `hasLocalLearnerData` decides between the fresh-install generation shortcut
 * (empty → safe auto-acknowledge) and remote-erase recovery (non-empty → require
 * explicit confirmation). It must count any learner-content key — including a
 * single `__corrupt` blob — as data, while privacy/consent metadata alone must
 * NOT make a fresh install look non-empty.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import { corruptBackupKey } from "../../lib/safeStorage";
import {
  LM7_PROGRESS_KEY,
  hasLocalLearnerData,
} from "../../content/learning-engine/local-privacy-inventory";
import { LM_LE_PRIVACY_STATE_KEY } from "../../content/learning-engine/privacy-local";

describe("PR-I1 — hasLocalLearnerData", () => {
  test("truly empty device → false (fresh-install shortcut is safe)", async () => {
    assert((await hasLocalLearnerData({ store: makeFakeKv() })) === false, "empty → no learner data");
  });

  test("primary progress present → true", async () => {
    const kv = makeFakeKv({ [LM7_PROGRESS_KEY]: JSON.stringify({ p: { "1-x": true } }) });
    assert((await hasLocalLearnerData({ store: kv })) === true, "lm7 progress counts as data");
  });

  test("one corrupt learner-data blob → true (NOT considered empty)", async () => {
    const kv = makeFakeKv({ [corruptBackupKey(LM7_PROGRESS_KEY)]: '{"raw":"..."}' });
    assert((await hasLocalLearnerData({ store: kv })) === true, "a __corrupt blob is learner data");
  });

  test("only privacy/consent metadata → false", async () => {
    const kv = makeFakeKv({ [LM_LE_PRIVACY_STATE_KEY]: JSON.stringify({ version: 1 }) });
    assert(
      (await hasLocalLearnerData({ store: kv })) === false,
      "privacy-notice metadata alone must not look like learner progress",
    );
  });
});
