/**
 * Area 1 — privacy.ts pure consent model.
 *
 * Guarantees: remote sync is denied by default, disclosure never enables any
 * sync, tester and account consents are independent, helpers are pure (no
 * mutation, no `Date.now`), and the version constants are recorded.
 */
import { describe, test, assert, assertEqual, clone } from "./harness";
import {
  PRIVACY_STATE_VERSION,
  CURRENT_LOCAL_DISCLOSURE_VERSION,
  CURRENT_TESTER_CONSENT_VERSION,
  CURRENT_ACCOUNT_SYNC_CONSENT_VERSION,
  createEmptyPrivacyState,
  markLocalDisclosureSeen,
  grantTesterRemoteSyncConsent,
  revokeTesterRemoteSyncConsent,
  grantAccountSyncConsent,
  revokeAccountSyncConsent,
  canSyncTesterEvents,
  canSyncAccountEvents,
} from "../../content/learning-engine/privacy";

describe("Area 1 — privacy.ts consent model", () => {
  test("createEmptyPrivacyState denies all remote sync by default", () => {
    const s = createEmptyPrivacyState();
    assert(canSyncTesterEvents(s) === false, "tester sync must be denied");
    assert(canSyncAccountEvents(s) === false, "account sync must be denied");
    assert(s.localDisclosure.seen === false, "disclosure must be unseen");
    assert(s.testerRemoteSync.consented === false, "tester consent must be false");
    assert(s.accountSync.consented === false, "account consent must be false");
  });

  test("markLocalDisclosureSeen records disclosure version + timestamp", () => {
    const s = markLocalDisclosureSeen(createEmptyPrivacyState(), 4242);
    assert(s.localDisclosure.seen === true, "seen must be true");
    assertEqual(
      s.localDisclosure.version,
      CURRENT_LOCAL_DISCLOSURE_VERSION,
      "disclosure version must be recorded",
    );
    assert(s.localDisclosure.seenAt === 4242, "seenAt must be the passed timestamp");
    assert(s.updatedAt === 4242, "updatedAt must be the passed timestamp");
  });

  test("local disclosure does not enable tester sync", () => {
    const s = markLocalDisclosureSeen(createEmptyPrivacyState(), 1);
    assert(canSyncTesterEvents(s) === false, "tester sync must stay denied");
  });

  test("local disclosure does not enable account sync", () => {
    const s = markLocalDisclosureSeen(createEmptyPrivacyState(), 1);
    assert(canSyncAccountEvents(s) === false, "account sync must stay denied");
  });

  test("grantTesterRemoteSyncConsent enables tester sync only", () => {
    const s = grantTesterRemoteSyncConsent(createEmptyPrivacyState(), 7);
    assert(canSyncTesterEvents(s) === true, "tester sync must be enabled");
    assert(canSyncAccountEvents(s) === false, "account sync must stay denied");
    assertEqual(
      s.testerRemoteSync.version,
      CURRENT_TESTER_CONSENT_VERSION,
      "tester consent version must be recorded",
    );
    assert(s.testerRemoteSync.consentedAt === 7, "consentedAt must be the passed timestamp");
  });

  test("revokeTesterRemoteSyncConsent disables tester sync", () => {
    const granted = grantTesterRemoteSyncConsent(createEmptyPrivacyState(), 7);
    const revoked = revokeTesterRemoteSyncConsent(granted, 9);
    assert(canSyncTesterEvents(revoked) === false, "tester sync must be denied after revoke");
    assert(revoked.testerRemoteSync.consented === false, "consent flag must reset");
    assert(revoked.testerRemoteSync.version === null, "consent version must reset");
  });

  test("grantAccountSyncConsent enables account sync only", () => {
    const s = grantAccountSyncConsent(createEmptyPrivacyState(), 7);
    assert(canSyncAccountEvents(s) === true, "account sync must be enabled");
    assert(canSyncTesterEvents(s) === false, "tester sync must stay denied");
    assertEqual(
      s.accountSync.version,
      CURRENT_ACCOUNT_SYNC_CONSENT_VERSION,
      "account consent version must be recorded",
    );
  });

  test("revokeAccountSyncConsent disables account sync", () => {
    const granted = grantAccountSyncConsent(createEmptyPrivacyState(), 7);
    const revoked = revokeAccountSyncConsent(granted, 9);
    assert(canSyncAccountEvents(revoked) === false, "account sync must be denied after revoke");
    assert(revoked.accountSync.consented === false, "consent flag must reset");
  });

  test("tester consent and account sync consent remain separate", () => {
    let s = grantTesterRemoteSyncConsent(createEmptyPrivacyState(), 1);
    s = grantAccountSyncConsent(s, 2);
    assert(canSyncTesterEvents(s) === true && canSyncAccountEvents(s) === true, "both enabled");
    const s2 = revokeTesterRemoteSyncConsent(s, 3);
    assert(canSyncTesterEvents(s2) === false, "tester revoked");
    assert(canSyncAccountEvents(s2) === true, "account must remain enabled when tester revoked");
  });

  test("helpers do not mutate the input state", () => {
    const base = createEmptyPrivacyState();
    const before = clone(base);
    markLocalDisclosureSeen(base, 1);
    grantTesterRemoteSyncConsent(base, 1);
    revokeTesterRemoteSyncConsent(base, 1);
    grantAccountSyncConsent(base, 1);
    revokeAccountSyncConsent(base, 1);
    assertEqual(base, before, "input state must be unchanged after every helper");
  });

  test("helpers do not call Date.now (timestamp must be passed in)", () => {
    const original = Date.now;
    // Any read of wall-clock time inside a helper would throw here.
    Date.now = () => {
      throw new Error("Date.now must not be called by pure privacy helpers");
    };
    try {
      const base = createEmptyPrivacyState();
      markLocalDisclosureSeen(base, 1);
      grantTesterRemoteSyncConsent(base, 1);
      revokeTesterRemoteSyncConsent(base, 1);
      grantAccountSyncConsent(base, 1);
      revokeAccountSyncConsent(base, 1);
    } finally {
      Date.now = original;
    }
  });

  test("version constants are recorded", () => {
    for (const v of [
      PRIVACY_STATE_VERSION,
      CURRENT_LOCAL_DISCLOSURE_VERSION,
      CURRENT_TESTER_CONSENT_VERSION,
      CURRENT_ACCOUNT_SYNC_CONSENT_VERSION,
    ]) {
      assert(typeof v === "string" && v.length > 0, "version constant must be a non-empty string");
    }
    assertEqual(
      createEmptyPrivacyState().version,
      PRIVACY_STATE_VERSION,
      "empty state must carry the current state version",
    );
  });
});
