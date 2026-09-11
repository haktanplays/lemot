/**
 * The first taste's deliberate English scaffold, in one place.
 *
 * L0's argument is that a learner can already communicate with two French
 * pieces and their own language. Its bridge screens therefore EXPECT a hybrid
 * answer — "Bonjour, je voudrais a coffee." — and show the full French only
 * afterwards, so the reveal can say that the one thing that changed is the one
 * thing they did not have.
 *
 * Two separate guards need to know this: `teachBeforeAsk` (which otherwise
 * reads "coffee" as untaught French) and `firstTaste` (which checks that L0
 * never asks for French it has not shown). They must not drift apart, so the
 * list lives here rather than in either of them.
 *
 * NOT a general licence. English appears in a required answer only on the
 * screens named here, only in L0, and each entry is asserted to be plain
 * English words in `teachBeforeAsk.test.ts`.
 */
export const L0_ENGLISH_SCAFFOLD: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    "v1-lesson-000/s08-weave-hybrid-order": Object.freeze(["a", "coffee"]),
    "v1-lesson-000/s09-weave-hybrid-tea": Object.freeze(["a", "tea"]),
  });

/** The English scaffold words allowed on one screen, by bare screen id. */
export function scaffoldWordsForScreen(screenId: string): readonly string[] {
  return L0_ENGLISH_SCAFFOLD[`v1-lesson-000/${screenId}`] ?? [];
}
