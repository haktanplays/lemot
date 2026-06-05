/**
 * Local privacy / consent state model (P5.2) — pure, RN-free, storage-free.
 *
 * A small local FOUNDATION for the consent model described in
 * docs/status/founder-self-learning-privacy-kvkk-gdpr-architecture-note.md.
 * It defines the consent modes, the versioned `PrivacyState`, and pure transition
 * helpers — WITHOUT enabling any remote sync, persistence, or UI.
 *
 * Hard boundaries (P5.2):
 *  - Pure: no `Date.now` (callers pass `timestamp`), no storage / `kvStorage` /
 *    `LocalRepository`, no React, no network, no AI, no Supabase.
 *  - Does NOT mutate the input state (every helper returns a fresh object).
 *  - Remote sync is OFF by default and stays OFF until an explicit, version-matched
 *    consent is granted. Founder-local mode never implies tester sync; tester and
 *    account consents are independent (granting one does not grant the other).
 *  - Persisting `PrivacyState` and any disclosure/export/delete UI are LATER steps
 *    (P5.3 / P5.4); nothing here reads or writes storage.
 */

/** The three consent modes from the privacy note (§5). */
export type ConsentMode = "founder_local" | "tester_cohort" | "account_sync";

/** Bump when the `PrivacyState` SHAPE changes. */
export const PRIVACY_STATE_VERSION = "privacy-v0.1";

/**
 * Consent text versions. Bump a value when the corresponding disclosure/consent
 * WORDING changes — a stale recorded version then no longer satisfies the sync
 * gates below, so the learner is re-prompted (re-consent on policy change).
 */
export const CURRENT_LOCAL_DISCLOSURE_VERSION = "local-disclosure-v1";
export const CURRENT_TESTER_CONSENT_VERSION = "tester-consent-v1";
export const CURRENT_ACCOUNT_SYNC_CONSENT_VERSION = "account-sync-consent-v1";

/** A single consent block: whether granted, under which version, and when. */
export type ConsentBlock = {
  consented: boolean;
  version: string | null;
  consentedAt: number | null;
};

/** A local "the learner has seen the founder-local disclosure" block. */
export type LocalDisclosureBlock = {
  seen: boolean;
  version: string | null;
  seenAt: number | null;
};

/**
 * Local privacy/consent state. A pure value object — the source of truth for what
 * the learner has been shown and what they have consented to. Persistence is a
 * later step (P5.3/P5.4); this PR only models + transitions it.
 */
export type PrivacyState = {
  version: string;
  localDisclosure: LocalDisclosureBlock;
  testerRemoteSync: ConsentBlock;
  accountSync: ConsentBlock;
  updatedAt: number | null;
};

const emptyConsent = (): ConsentBlock => ({
  consented: false,
  version: null,
  consentedAt: null,
});

/** Fresh state: nothing seen, nothing consented, all remote sync denied. */
export function createEmptyPrivacyState(): PrivacyState {
  return {
    version: PRIVACY_STATE_VERSION,
    localDisclosure: { seen: false, version: null, seenAt: null },
    testerRemoteSync: emptyConsent(),
    accountSync: emptyConsent(),
    updatedAt: null,
  };
}

/** Record that the founder-local disclosure was seen (does NOT enable any sync). */
export function markLocalDisclosureSeen(
  state: PrivacyState,
  timestamp: number,
): PrivacyState {
  return {
    ...state,
    localDisclosure: {
      seen: true,
      version: CURRENT_LOCAL_DISCLOSURE_VERSION,
      seenAt: timestamp,
    },
    updatedAt: timestamp,
  };
}

/** Grant tester-cohort remote-sync consent (records current version + time). */
export function grantTesterRemoteSyncConsent(
  state: PrivacyState,
  timestamp: number,
): PrivacyState {
  return {
    ...state,
    testerRemoteSync: {
      consented: true,
      version: CURRENT_TESTER_CONSENT_VERSION,
      consentedAt: timestamp,
    },
    updatedAt: timestamp,
  };
}

/** Revoke tester-cohort consent → tester sync becomes impossible. */
export function revokeTesterRemoteSyncConsent(
  state: PrivacyState,
  timestamp: number,
): PrivacyState {
  return {
    ...state,
    testerRemoteSync: emptyConsent(),
    updatedAt: timestamp,
  };
}

/** Grant account-sync consent (independent of tester consent). */
export function grantAccountSyncConsent(
  state: PrivacyState,
  timestamp: number,
): PrivacyState {
  return {
    ...state,
    accountSync: {
      consented: true,
      version: CURRENT_ACCOUNT_SYNC_CONSENT_VERSION,
      consentedAt: timestamp,
    },
    updatedAt: timestamp,
  };
}

/** Revoke account-sync consent → account sync becomes impossible. */
export function revokeAccountSyncConsent(
  state: PrivacyState,
  timestamp: number,
): PrivacyState {
  return {
    ...state,
    accountSync: emptyConsent(),
    updatedAt: timestamp,
  };
}

/**
 * Whether tester-cohort events may sync remotely. Requires an active consent
 * recorded under the CURRENT tester consent version — a stale version (after a
 * wording bump) returns false so the learner re-consents first.
 */
export function canSyncTesterEvents(state: PrivacyState): boolean {
  return (
    state.testerRemoteSync.consented === true &&
    state.testerRemoteSync.version === CURRENT_TESTER_CONSENT_VERSION
  );
}

/** Whether account-mode events may sync remotely (current-version consent only). */
export function canSyncAccountEvents(state: PrivacyState): boolean {
  return (
    state.accountSync.consented === true &&
    state.accountSync.version === CURRENT_ACCOUNT_SYNC_CONSENT_VERSION
  );
}
