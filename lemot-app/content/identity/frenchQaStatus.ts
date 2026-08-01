/**
 * Shared French-QA status vocabulary (PR-07) — pure, no data.
 *
 * One vocabulary for items AND sentences, so "who may see this French, and on
 * whose authority?" has exactly one answer everywhere.
 *
 * The founder explicitly DEFERRED the pre-registration human French-QA gate and
 * accepted the risk of continuing: registered pilot content may be internally
 * reachable before any named human has reviewed it. That decision must stay
 * visible in the type system, so this module distinguishes:
 *
 *  - `approved` — NAMED-HUMAN French approval only. Nothing else ever means
 *    this, and no PR-07 record carries it (no human review has happened).
 *  - `founder_waived_provisional` — internally reachable under the founder's
 *    explicit risk acceptance. The prior AI review remains provisional
 *    linguistic evidence, never attestation. NOT public/content-complete ready;
 *    the final comprehensive human QA pass remains mandatory before release.
 *  - `pending` — authored but not reachable by a learner.
 *  - `rejected` — reviewed and refused; never reachable.
 *
 * Provisional is deliberately NOT synonymous with approved: the two helpers
 * below answer different questions and only `approved` answers the first one.
 */

export type FrenchQaStatus =
  | "pending"
  | "founder_waived_provisional"
  | "approved"
  | "rejected";

export const FRENCH_QA_STATUSES = [
  "pending",
  "founder_waived_provisional",
  "approved",
  "rejected",
] as const;

const _statusesValid: readonly FrenchQaStatus[] = FRENCH_QA_STATUSES;
void _statusesValid;
type MissingStatuses = Exclude<FrenchQaStatus, (typeof FRENCH_QA_STATUSES)[number]>;
const _allListed: MissingStatuses extends never ? true : never = true;
void _allListed;

/** True ONLY for named-human approval. A founder waiver never satisfies this. */
export function isHumanFrenchApproved(status: FrenchQaStatus): boolean {
  return status === "approved";
}

/**
 * True when the surface may reach a learner in the INTERNAL pilot: either a
 * human approved it, or the founder explicitly waived the gate for it.
 * `pending` and `rejected` are never reachable.
 */
export function isInternalPilotFrenchReachable(status: FrenchQaStatus): boolean {
  return status === "approved" || status === "founder_waived_provisional";
}
