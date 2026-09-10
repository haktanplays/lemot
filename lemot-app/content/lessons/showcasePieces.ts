/**
 * Showcase piece breakdown: which reusable pieces a sentence is built from.
 *
 * "Sentence first. Pieces always visible." The learner should see that
 * "Je voudrais un café." is not one memorised line but two pieces they already
 * own, either of which can be swapped. That claim is only honest if the pieces
 * are REAL registry items, so this segments against the canonical registry
 * rather than splitting on whitespace: "je voudrais" · "un café", never
 * "je" · "voudrais" · "un" · "café".
 *
 * Longest match wins, which is what keeps protected chunks intact — "s'il vous
 * plaît" is one piece because it is one item, not three words.
 *
 * TWO RULES MAKE THE BOUNDARIES HONEST, and both came from watching the screen
 * rather than reading the code:
 *
 * 1. THE SAME FRENCH ALWAYS BREAKS THE SAME WAY. Longest-match alone gave
 *    "Je suis ici." → je suis · ici but "Bonjour, je suis ici." → Bonjour ·
 *    je suis ici, because the big chunk only lost to its parts when it happened
 *    to be the whole line. One L2 screen showed both, so the learner was told
 *    that "je suis ici" is two pieces and one piece at the same time. Now any
 *    matched item that fully decomposes into two or more known pieces is
 *    replaced by them, wherever it appears. A protected chunk is protected by
 *    NOT decomposing — "s'il vous plaît" holds because "s'il" and "plaît" are
 *    not items, which is a fact about the registry rather than a special case.
 *
 * 2. THE CHIPS ARE THE SENTENCE, TAKEN APART. A breakdown that does not rebuild
 *    the line is not a breakdown; it is a sentence with words quietly missing.
 *    "Vous avez du thé ?" used to render as vous avez · thé, and "du" — the one
 *    word a learner would ask about — simply vanished. A coverage ratio let
 *    that through. Exact reconstruction does not: a line that cannot be
 *    rebuilt from its pieces gets no breakdown at all, and
 *    `showcaseClassification` then forces the author to say why it is flat.
 *
 * Pure and deterministic. No lesson state, no runtime, no evidence.
 */
import { ITEM_REGISTRY } from "../itemRegistry";

/** Pieces a learner is never shown as a piece: meta, sound and contrast entries. */
const NON_SURFACE_TYPES = new Set(["grammar-nugget", "sound-pattern", "micro-contrast"]);

const fold = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.,!?;:«»"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type Entry = { key: string; display: string; itemId: string };

/** Registry texts, longest first, so "un café" beats "café". */
const LEXICON: Entry[] = Object.entries(ITEM_REGISTRY)
  .filter(([, it]) => !NON_SURFACE_TYPES.has((it as { type: string }).type))
  .map(([itemId, it]) => {
    const display = String((it as { text: string }).text).trim();
    return { key: fold(display), display, itemId };
  })
  .filter((e) => e.key.length > 0)
  .sort((a, b) => b.key.length - a.key.length);

export type ShowcasePiece = { text: string; itemId: string };

/**
 * How a piece is written on a chip.
 *
 * A chip is a FRAGMENT, not a sentence, so it carries neither a sentence-initial
 * capital nor the sentence's final punctuation. Ninety-four of the ninety-five
 * surface items are already stored lowercase and "Bonjour" is the lone
 * exception, while two items ("c'est où ?") carry a question mark in their own
 * text. Left alone, one screen showed "je suis" and "Je suis" as chips two lines
 * apart, and another showed a chip that ended in a question mark inside a
 * sentence that was not a question.
 *
 * Only the FIRST character is lowercased: an interior capital would be there for
 * a reason (a name), and touching it would be a spelling error.
 */
export function pieceLabel(text: string): string {
  const trimmed = text.trim().replace(/\s*[.?!]+$/u, "");
  return trimmed.length === 0 ? trimmed : trimmed[0].toLowerCase() + trimmed.slice(1);
}

/**
 * Every known piece in a French string, ungated — the GRADING view.
 *
 * Deliberately the COARSE segmentation: longest match, never decomposed. The
 * display view below is finer, and the asymmetry is the point rather than
 * drift. A finer component is easier to hit by accident, and grading credit is
 * the direction where an accident does damage: split "non merci" into its parts
 * and a learner who answers "Merci, à bientôt" to "turn the offer down, then
 * say where you are heading" is credited with a component of a refusal they
 * never made. That is the exact class of false positive this batch exists to
 * remove.
 *
 * So display may be finer than grading; grading may never be finer than
 * display. Showing a seam the grader scores as part of a larger whole is
 * strict, and strict is safe. The reverse over-credits.
 */
export function knownPieces(fr: string): ShowcasePiece[] {
  return segment(fr, new Set(), false).pieces;
}

/**
 * Segment a French sentence into the pieces the learner is shown.
 *
 * Returns [] unless the pieces both number at least two AND rebuild the
 * sentence exactly. A single-piece sentence has no breakdown worth showing —
 * rendering "Bonjour" as its own lone chip under "Bonjour." is noise, not
 * teaching — and a partial breakdown is worse than none, because the words it
 * drops are exactly the ones the learner cannot account for.
 */
export function showcasePieces(fr: string): ShowcasePiece[] {
  const { pieces } = segment(fr, new Set(), true);
  if (pieces.length < 2) return [];
  if (fold(pieces.map((p) => p.text).join(" ")) !== fold(fr)) return [];
  return pieces;
}

/**
 * The pieces of one item's own text, when it fully decomposes into others.
 *
 * Memoised, and computed under an ancestor set so a cycle in the registry
 * (an item whose text contains itself) cannot recurse forever. `null` means
 * "this item is atomic as far as the learner is concerned", which is how a
 * protected chunk stays whole.
 */
const DECOMPOSITION = new Map<string, ShowcasePiece[] | null>();

function decompose(entry: Entry, ancestors: ReadonlySet<string>): ShowcasePiece[] | null {
  const cached = DECOMPOSITION.get(entry.itemId);
  if (cached !== undefined && ancestors.size === 0) return cached;

  const nextAncestors = new Set(ancestors);
  nextAncestors.add(entry.itemId);
  const { pieces } = segment(entry.display, nextAncestors, true);
  const usable =
    pieces.length >= 2 && fold(pieces.map((p) => p.text).join(" ")) === fold(entry.display)
      ? pieces
      : null;

  if (ancestors.size === 0) DECOMPOSITION.set(entry.itemId, usable);
  return usable;
}

function segment(fr: string, ancestors: ReadonlySet<string>, decomposeParts: boolean) {
  const folded = fold(fr);
  const out: ShowcasePiece[] = [];
  if (folded.length === 0) return { pieces: out };

  let cursor = 0;
  while (cursor < folded.length) {
    if (folded[cursor] === " ") {
      cursor += 1;
      continue;
    }
    const rest = folded.slice(cursor);
    const hit = LEXICON.find(
      (e) =>
        !ancestors.has(e.itemId) &&
        rest.startsWith(e.key) &&
        (rest.length === e.key.length || rest[e.key.length] === " "),
    );
    if (hit) {
      // Rule 1: prefer the parts, wherever this item appears. Display only —
      // see `knownPieces` for why grading stays on the whole.
      const parts = decomposeParts ? decompose(hit, ancestors) : null;
      if (parts) out.push(...parts);
      else out.push({ text: hit.display, itemId: hit.itemId });
      cursor += hit.key.length;
      continue;
    }
    // Unknown span: skip the word. It is never invented as a piece, and its
    // absence is what makes the reconstruction check fail, which is the point.
    const next = folded.indexOf(" ", cursor);
    cursor = next === -1 ? folded.length : next;
  }

  return { pieces: out };
}
