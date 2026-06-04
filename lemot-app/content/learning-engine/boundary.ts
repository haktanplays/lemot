/**
 * Boundary "later form" classifier (P3.8) — pure, framework-agnostic.
 *
 * Identifies the recognition exercises a lesson SHOWS but never asks the learner
 * to produce (e.g. the L12 inversion / «qu'est-ce que» hooks), so the learner
 * renderer can present them as soft "A form for later" cards instead of normal
 * reveals (see docs/status/boundary-recognition-ui-decision.md).
 *
 * This is a NARROW, temporary P3.8 bridge over STABLE EXISTING fields — NOT a
 * schema change. A dedicated `presentationHint` marker on the engine objects
 * remains a future, separately-reviewed schema change (per the boundary
 * decision); until then we re-derive intent from the contract here. No
 * react-native import, so it stays unit-testable with `tsx`.
 */
import type { ExerciseBlueprint, LessonContract } from "./types";

/**
 * A `recognition` exercise is a soft boundary "later form" card when every item
 * it targets sits in BOTH the contract's `recognitionOnly` and
 * `blockedProduction` sets — i.e. the lesson shows the form but the validator
 * forbids ever producing it. Non-recognition operations are never boundary
 * cards; an empty / unknown target set is treated as not-boundary (safe default).
 */
export function isBoundaryLaterForm(
  ex: ExerciseBlueprint,
  contract: LessonContract,
): boolean {
  if (ex.operation !== "recognition") return false;
  const ids = ex.targetItemIds;
  if (!Array.isArray(ids) || ids.length === 0) return false;
  const recognitionOnly = new Set(contract.items.recognitionOnly);
  const blocked = new Set(contract.production.blockedProduction);
  return ids.every((id) => recognitionOnly.has(id) && blocked.has(id));
}
