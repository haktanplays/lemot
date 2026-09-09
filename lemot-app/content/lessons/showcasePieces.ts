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
 * plaît" is one piece because it is one item, not three words. As small
 * structural forms become real items, they start appearing here on their own,
 * which is the intended consequence rather than a side effect.
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
 * Segment a French sentence into known pieces.
 *
 * Returns [] when the sentence does not break into at least two known pieces.
 * A single-piece sentence has no breakdown worth showing — rendering "Bonjour"
 * as its own lone chip under "Bonjour." is noise, not teaching — and a sentence
 * we cannot segment honestly gets nothing rather than a guess.
 */
export function showcasePieces(fr: string): ShowcasePiece[] {
  const first = segment(fr, new Set());
  if (first.pieces.length >= 2) return finish(first);

  // The sentence IS one item, e.g. "Je suis ici." resolves whole to
  // chunk-je-suis-ici. That is true and useless here: L2 teaches exactly that
  // it is "je suis" plus "ici", and its own meet-card shows those two chips.
  // So when the whole line collapses to a single item, look again without it
  // and prefer the decomposition the lesson is actually making.
  if (first.pieces.length === 1) {
    const deeper = segment(fr, new Set([first.pieces[0].itemId]));
    if (deeper.pieces.length >= 2) return finish(deeper);
  }
  return [];
}

function finish(r: { pieces: ShowcasePiece[]; covered: number; length: number }): ShowcasePiece[] {
  if (r.pieces.length < 2) return [];
  // Require the pieces to actually account for most of the sentence, so a line
  // that happens to contain one known chunk plus unmodelled French is not
  // presented as if the learner already owns all of it.
  if (r.covered / r.length < 0.7) return [];
  return r.pieces;
}

function segment(fr: string, exclude: ReadonlySet<string>) {
  const folded = fold(fr);
  const length = folded.replace(/\s/g, "").length || 1;
  if (folded.length === 0) return { pieces: [] as ShowcasePiece[], covered: 0, length };

  const out: ShowcasePiece[] = [];
  let cursor = 0;
  let covered = 0;

  while (cursor < folded.length) {
    if (folded[cursor] === " ") {
      cursor += 1;
      continue;
    }
    const rest = folded.slice(cursor);
    const hit = LEXICON.find(
      (e) =>
        !exclude.has(e.itemId) &&
        rest.startsWith(e.key) &&
        (rest.length === e.key.length || rest[e.key.length] === " "),
    );
    if (hit) {
      out.push({ text: hit.display, itemId: hit.itemId });
      cursor += hit.key.length;
      covered += hit.key.length;
      continue;
    }
    // Unknown span: skip the word. It is not invented as a piece, and it counts
    // against coverage so a half-understood sentence does not get a breakdown.
    const next = folded.indexOf(" ", cursor);
    cursor = next === -1 ? folded.length : next;
  }

  return { pieces: out, covered, length };
}
