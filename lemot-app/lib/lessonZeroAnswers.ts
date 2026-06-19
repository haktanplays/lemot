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

/**
 * Beat 5 (rebuild) recall support: reflective and progressive.
 *
 * Lists only the canonical sentence pieces the learner has NOT yet produced,
 * always in sentence order: Bonjour -> je voudrais -> un -> café. Detection
 * reuses `norm`, so case, accents and punctuation are ignored and "cafe" counts
 * as "café". It is token/phrase based, so a substring inside a larger word never
 * counts ("une" is not "un") and a bare "voudrais" never satisfies the full
 * "je voudrais" chunk.
 *
 * Progressive by miss count, so the nudge opens gently and only widens if the
 * learner keeps missing:
 *   - fewer than 2 misses: no chips (the caller shows only the calm nudge);
 *   - exactly the 2nd miss: at most the first two still-missing pieces;
 *   - 3rd miss and later: every still-missing piece.
 *
 * Returns display strings in canonical order. An empty array means "show no
 * chips": too few misses, or every piece is already present. A wrong answer
 * that still contains all four pieces must never be laid out as the answer.
 */
const REBUILD_PIECES: ReadonlyArray<{
  display: string;
  present: (tokens: readonly string[]) => boolean;
}> = [
  { display: "Bonjour", present: (t) => t.includes("bonjour") },
  {
    display: "je voudrais",
    present: (t) => hasAdjacentTokens(t, ["je", "voudrais"]),
  },
  { display: "un", present: (t) => t.includes("un") },
  { display: "café", present: (t) => t.includes("cafe") },
];

/** True if `phrase` appears as consecutive entries inside `tokens`. */
function hasAdjacentTokens(
  tokens: readonly string[],
  phrase: readonly string[]
): boolean {
  for (let i = 0; i + phrase.length <= tokens.length; i += 1) {
    let matched = true;
    for (let j = 0; j < phrase.length; j += 1) {
      if (tokens[i + j] !== phrase[j]) {
        matched = false;
        break;
      }
    }
    if (matched) return true;
  }
  return false;
}

export function rebuildHintPieces(input: string, missCount: number): string[] {
  if (missCount < 2) return [];
  const tokens = norm(input)
    .split(" ")
    .filter((t) => t.length > 0);
  const missing = REBUILD_PIECES.filter((p) => !p.present(tokens)).map(
    (p) => p.display
  );
  return missCount === 2 ? missing.slice(0, 2) : missing;
}
