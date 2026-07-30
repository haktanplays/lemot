/**
 * Test bootstrap (registered FIRST in run.ts).
 *
 * PR-I1's learner-mutation gate FAILS CLOSED until the local deletion-control
 * records (pending-erase marker + remote-erase recovery marker) hydrate and
 * prove clean — exactly what the app does at provider mount. Suites that
 * exercise unrelated code write through the gated persisters
 * (LocalRepository, TelemetryStore, storage models), so this bootstrap performs
 * the same clean local hydration the app performs, opening the gate for them.
 * Gate-specific suites reset and re-hydrate their own state (and restore this
 * clean baseline in their cleanup tests).
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import { hydrateCloudEraseGuard } from "../../lib/cloudEraseGuard";
import { probeRemoteEraseRecovery } from "../../lib/remoteEraseRecovery";
import { isLearnerMutationBlocked } from "../../lib/learnerMutationGate";

describe("bootstrap — hydrate deletion-control records to a clean baseline", () => {
  test("pre-hydration the gate is CLOSED; clean local hydration opens it", async () => {
    assert(isLearnerMutationBlocked(), "before hydration, learner mutations fail closed");
    await hydrateCloudEraseGuard(makeFakeKv());
    await probeRemoteEraseRecovery(makeFakeKv());
    assert(!isLearnerMutationBlocked(), "clean local markers → gate open for all suites");
  });
});
