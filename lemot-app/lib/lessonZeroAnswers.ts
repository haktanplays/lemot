/**
 * Lesson Zero answer acceptance.
 *
 * Two fixed predicates for the single first-run coffee scene. This is local to
 * the Lesson Zero flow, NOT a general-purpose answer engine: it hard-codes the
 * one scenario and exposes no configuration. It lives in a pure (string-only)
 * module so the acceptance rules can be unit-tested without loading the React
 * Native / Expo layer.
 *
 * Reuses the existing `norm` so accent folding, case, punctuation and
 * whitespace tolerance stay identical to the rest of the app.
 */
import { norm } from "./normalize";

/**
 * Beat 2 (active weave): after the fixed "Bonjour, je voudrais" stem, the
 * learner supplies the English remainder. We do NOT grade English article
 * choice; we only require that the thing they want, coffee, is present as its
 * own normalized word.
 *
 * Passes: "coffee", "a coffee", "one coffee", "some coffee", "a cup of coffee",
 * "coffee please". Rejects: empty, and tokens that merely contain the letters
 * (e.g. "coffeetable"), because the word must stand on its own.
 */
export function acceptsCoffeeRemainder(input: string): boolean {
  return norm(input).split(" ").includes("coffee");
}

/**
 * Beat 5 (rebuild): the learner types the whole natural sentence. `norm` folds
 * case, accents, punctuation and whitespace, so the bare and accented/comma
 * forms collapse together. The "s'il vous plaît" close is the one accepted
 * natural lengthening; nothing else is broadened.
 */
const REBUILD_ACCEPTED = [
  "Bonjour, je voudrais un café.",
  "Bonjour, je voudrais un café, s'il vous plaît.",
];

export function acceptsRebuild(input: string): boolean {
  const normalized = norm(input);
  if (normalized.length === 0) return false;
  return REBUILD_ACCEPTED.some((accepted) => norm(accepted) === normalized);
}
