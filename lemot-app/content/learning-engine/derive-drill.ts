/**
 * Deterministic drill derivation — the content factory's first product
 * (docs/ROADMAP.md hub derivation decision = B: hub exercises are DERIVED
 * from item + screen-type templates, never hand-written, never AI).
 *
 * House rules:
 *  - Pure and deterministic: same input → same output, always. No clock
 *    reads (`now` is part of the contract for symmetry with the selector
 *    family, but derivation is deliberately time-independent so identical
 *    drills stay identical across days), no storage, no network, no AI.
 *  - Fail-closed: any combination this template cannot turn into a VALID
 *    payload returns null. A half-built payload is never emitted.
 *  - Output is a real `LessonScreen` (fill-with-traps or weave), so the
 *    existing renderer and content rules apply unchanged — typecheck is the
 *    schema proof, and the drill tests assert the structural invariants the
 *    content validator enforces on authored lessons.
 *
 * Chip canon honored: a weave chip is never a full sentence, so items whose
 * surface carries terminal punctuation are not weave-derivable (fail-closed)
 * — the shipped survival formulas are the only exception class and they are
 * lesson material, not hub derivation targets in v0.
 */
import type { FillWithTrapsScreen, LearningItem, WeaveScreen } from "../lessonTypes";

export type DrillScreenType = "fill-with-traps" | "weave";
export type DerivedDrill = FillWithTrapsScreen | WeaveScreen;

export type DeriveDrillInput = {
  itemId: string;
  screenType: DrillScreenType;
  /** Optional grading-outcome hint; deterministically rotates trap order. */
  errorTag?: string;
  registry: Readonly<Record<string, LearningItem>>;
  /** Explicit clock per house rules; derivation itself is time-independent. */
  now: number;
};

/** Item types whose surfaces are producible drill material. */
const DERIVABLE_TYPES = new Set([
  "chunk",
  "noun",
  "verb",
  "adjective",
  "pronoun",
  "adverb",
  "word",
]);

const TERMINAL_PUNCTUATION = /[.!?]\s*$/;

/**
 * A "word" character for token-boundary purposes: any Unicode letter, combining
 * mark (decomposed accents), or number. French accented letters (é, à, ç, œ…)
 * are letters, so a boundary is only where the neighbour is NOT one of these.
 */
const WORD_CHAR = /[\p{L}\p{M}\p{N}]/u;
const isWordChar = (ch: string | undefined): boolean =>
  ch !== undefined && WORD_CHAR.test(ch);

/**
 * Index of the FIRST whole-word/token-boundary occurrence of `needle` in
 * `haystack` (case-insensitive), or -1 when it only ever appears INSIDE a larger
 * word. A match qualifies only when the character immediately before and after it
 * is not a Unicode word character — so a short surface like "on" never blanks
 * inside "Bonjour" (audit B8). Deterministic: scans left-to-right and returns the
 * first boundary-valid position; fail-closed (-1) if none exists.
 */
function firstWholeWordIndex(haystack: string, needle: string): number {
  if (needle.length === 0) return -1;
  const hay = haystack.toLowerCase();
  const need = needle.toLowerCase();
  for (let from = 0; from <= hay.length - need.length; ) {
    const at = hay.indexOf(need, from);
    if (at < 0) return -1;
    const before = at > 0 ? hay[at - 1] : undefined;
    const after = at + need.length < hay.length ? hay[at + need.length] : undefined;
    if (!isWordChar(before) && !isWordChar(after)) return at;
    from = at + 1;
  }
  return -1;
}

/** Deterministic ascii-ish slug for ids ("s'il vous plaît" -> "s-il-vous-plait"). */
function slug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deterministic small hash for trap-order rotation. */
function tinyHash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i += 1) h = (h * 31 + text.charCodeAt(i)) % 997;
  return h;
}

function isDerivableItem(item: LearningItem | undefined): item is LearningItem {
  return Boolean(
    item &&
      DERIVABLE_TYPES.has(item.type) &&
      typeof item.text === "string" &&
      item.text.trim().length > 0 &&
      typeof item.exampleFr === "string" &&
      item.exampleFr.trim().length > 0 &&
      typeof item.exampleEn === "string" &&
      item.exampleEn.trim().length > 0,
  );
}

/**
 * Deterministic trap candidates: relatedItemIds first (authored proximity),
 * then remaining same-type items sorted by id. Only derivable items with a
 * distinct, non-sentence surface qualify.
 */
function trapCandidates(
  item: LearningItem,
  registry: Readonly<Record<string, LearningItem>>,
): LearningItem[] {
  const seen = new Set<string>([item.id]);
  const out: LearningItem[] = [];
  const consider = (candidate: LearningItem | undefined) => {
    if (!isDerivableItem(candidate)) return;
    if (seen.has(candidate.id)) return;
    if (candidate.text.trim().toLowerCase() === item.text.trim().toLowerCase()) return;
    if (TERMINAL_PUNCTUATION.test(candidate.text)) return;
    seen.add(candidate.id);
    out.push(candidate);
  };
  for (const id of item.relatedItemIds ?? []) consider(registry[id]);
  for (const id of Object.keys(registry).sort()) {
    if (registry[id]?.type === item.type) consider(registry[id]);
  }
  return out;
}

function deriveFill(
  item: LearningItem,
  registry: Readonly<Record<string, LearningItem>>,
  errorTag: string | undefined,
): FillWithTrapsScreen | null {
  const sentence = item.exampleFr!; // guaranteed by isDerivableItem
  // Whole-word/token-boundary match so a short surface (e.g. "on") is never
  // blanked inside a larger word (e.g. "Bonjour" → "B___jour"). Fail-closed when
  // the surface only appears in-word (audit B8).
  const at = firstWholeWordIndex(sentence, item.text);
  if (at < 0) return null; // the surface does not live in its own example as a whole word
  const before = sentence.slice(0, at).trim();
  const after = sentence.slice(at + item.text.length).trim();
  if (before.length === 0 && after.length === 0) return null; // nothing left to anchor the blank

  const candidates = trapCandidates(item, registry);
  if (candidates.length === 0) return null; // a fill without a trap teaches nothing
  const rotation = errorTag ? tinyHash(errorTag) % candidates.length : 0;
  const rotated = [...candidates.slice(rotation), ...candidates.slice(0, rotation)];
  const traps = rotated.slice(0, 2);

  const correctId = `opt-${slug(item.text)}`;
  const options = [
    { id: correctId, text: item.text, isCorrect: true },
    ...traps.map((t) => ({
      id: `opt-${slug(t.text)}`,
      text: t.text,
      isCorrect: false,
      trapReason: `${t.text} means ${t.en ?? "something else"}. This sentence needs ${item.text}.`,
    })),
  ];
  if (new Set(options.map((o) => o.id)).size !== options.length) return null; // id collision

  return {
    id: `drill-fill-${slug(item.id)}${errorTag ? `-${slug(errorTag)}` : ""}`,
    type: "fill-with-traps",
    targetItemIds: [item.id],
    ...(item.weakPointTags ? { weakPointTags: [...item.weakPointTags] } : {}),
    payload: {
      prompt: "What fits the empty space?",
      ...(before ? { sentenceBefore: before } : {}),
      ...(after ? { sentenceAfter: after } : {}),
      blankCount: 1,
      options,
      answer: [correctId],
      reveal: {
        short: item.text,
        explanation: item.meaning ?? `${item.text} = ${item.en ?? item.text}.`,
        natural: item.exampleFr,
      },
    },
  };
}

function deriveWeave(item: LearningItem): WeaveScreen | null {
  if (TERMINAL_PUNCTUATION.test(item.text)) return null; // sentence surfaces are never chips
  const answer = item.exampleFr!.trim(); // guaranteed by isDerivableItem
  // One calm sentence only: multi-sentence examples make an unfair free target.
  if (/[.!?]\s+\S/.test(answer)) return null;
  if (answer.length > 90) return null;

  const acceptedAlternatives = answer.endsWith("?")
    ? [answer.slice(0, -1).trim()] // CI rule: question-form answers accept a no-? variant
    : undefined;

  return {
    id: `drill-weave-${slug(item.id)}`,
    type: "weave",
    targetItemIds: [item.id],
    ...(item.weakPointTags ? { weakPointTags: [...item.weakPointTags] } : {}),
    payload: {
      weaveType: "supported",
      prompt: `Write it in French: ${item.exampleEn}`,
      context: "A quick practice rep. Use the piece you own.",
      suggestedPieces: [
        {
          text: item.text,
          itemId: item.id,
          required: true,
          ...(item.en ? { label: item.en } : {}),
        },
      ],
      expectedAnswers: [answer],
      ...(acceptedAlternatives ? { acceptedAlternatives } : {}),
      reveal: {
        modelAnswer: answer,
        ifCorrect: "That is the shape. Same piece, working again.",
        ifUnderstandableButWrong: `Your meaning lands. A native builds it around ${item.text}.`,
        ifMissingTargetPiece: `Build it around ${item.text}.`,
      },
      validationMode: "exact-or-alternative",
    },
  };
}

/**
 * Derive one valid drill screen for (itemId, screenType), or null when the
 * combination cannot produce a valid payload (fail-closed; never partial).
 */
export function deriveDrill(input: DeriveDrillInput): DerivedDrill | null {
  const item = input.registry[input.itemId];
  if (!isDerivableItem(item)) return null;
  if (input.screenType === "fill-with-traps") {
    return deriveFill(item, input.registry, input.errorTag);
  }
  if (input.screenType === "weave") {
    return deriveWeave(item);
  }
  return null; // unknown screen type: fail-closed
}
