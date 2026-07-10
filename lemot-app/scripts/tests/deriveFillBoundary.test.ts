/**
 * PR-E2 — derive-fill whole-word boundary matching (audit B8).
 *
 * `deriveFill` used a boundary-free `indexOf`, so a short surface like "on" was
 * blanked INSIDE a larger word ("Bonjour" → "B___jour"). The blank must land only
 * on a whole-word/token-boundary occurrence (Unicode-letter-aware), deterministic
 * on the first valid occurrence, and fail closed when the surface appears only
 * inside a larger word.
 *
 * Pure/deterministic derivation — no storage/AI/React. Synthetic registries keep
 * the boundary cases explicit and independent of shipped content.
 */
import { describe, test, assert, assertEqual } from "./harness";
import type { FillWithTrapsScreen, LearningItem } from "../../content/lessonTypes";
import { deriveDrill } from "../../content/learning-engine/derive-drill";

const NOW = 1_720_000_000_000;

/** Minimal derivable pronoun item (type ∈ DERIVABLE_TYPES, examples present). */
function item(id: string, text: string, exampleFr: string): LearningItem {
  return {
    id,
    type: "pronoun",
    text,
    status: "active",
    en: `${text}-en`,
    exampleFr,
    exampleEn: `${text} example`,
  };
}

/** Registry from the target plus a distinct same-type trap candidate. */
function reg(target: LearningItem): Record<string, LearningItem> {
  const trap = item("trap-elle", "elle", "Elle arrive demain");
  return { [target.id]: target, [trap.id]: trap };
}

const derive = (registry: Record<string, LearningItem>, itemId: string) =>
  deriveDrill({ itemId, screenType: "fill-with-traps", registry, now: NOW });

/** Derive a fill and narrow it to the fill payload, asserting it is one. */
function fillPayload(
  registry: Record<string, LearningItem>,
  itemId: string,
): FillWithTrapsScreen["payload"] {
  const screen = derive(registry, itemId);
  assert(screen !== null && screen.type === "fill-with-traps", `${itemId}: expected a fill screen`);
  return (screen as FillWithTrapsScreen).payload;
}

describe("PR-E2 B8 — derive-fill whole-word boundary matching", () => {
  test("1. a standalone token blanks correctly", () => {
    const p = fillPayload(reg(item("p-on", "on", "On y va")), "p-on");
    assert(p.options.find((o) => o.isCorrect)!.text === "on", "correct option is the surface");
    // "On y va" → blank at index 0 → nothing before, "y va" after.
    assert((p.sentenceBefore ?? "") === "", "nothing before a leading blank");
    assert((p.sentenceAfter ?? "").includes("y va"), "remainder trails the blank");
  });

  test("2. the target is NOT blanked inside a larger word (skips in-word, finds the standalone)", () => {
    const p = fillPayload(reg(item("p-on", "on", "Bonjour, on y va")), "p-on");
    // The in-word "on" inside "Bonjour" (index 1) is skipped; the standalone "on"
    // is blanked, so "Bonjour" survives intact in the sentence-before.
    assert((p.sentenceBefore ?? "").includes("Bonjour"), "in-word 'on' (Bonjour) is left intact");
    assert(!(p.sentenceAfter ?? "").includes("jour"), "the word 'Bonjour' is never split by the blank");
  });

  test("3. a punctuation-adjacent target still blanks", () => {
    // "c'est bon": "est" sits against an apostrophe (a non-word char) → boundary.
    const p = fillPayload(reg(item("v-est", "est", "c'est bon")), "v-est");
    assert(p.options.find((o) => o.isCorrect)!.text === "est", "correct option is the surface");
    assert((p.sentenceBefore ?? "").includes("c'"), "punctuation-adjacent prefix is preserved");
    assert((p.sentenceAfter ?? "").includes("bon"), "remainder trails the blank");
  });

  test("4. multiple occurrences blank the first deterministically", () => {
    const registry = reg(item("p-la", "la", "la la la"));
    const a = derive(registry, "p-la");
    const b = derive(registry, "p-la");
    assert(a !== null && b !== null, "both derive");
    assertEqual(a, b, "same input → identical drill (deterministic)");
    const p = fillPayload(registry, "p-la");
    // First occurrence at index 0 → nothing before, "la la" after.
    assert((p.sentenceBefore ?? "") === "", "first (leftmost) occurrence is blanked");
    assert((p.sentenceAfter ?? "") === "la la", "the other two occurrences remain");
  });

  test("5. fail closed when the target appears ONLY inside a larger word", () => {
    const screen = derive(reg(item("p-on", "on", "Bonjour")), "p-on");
    assertEqual(screen, null, "'on' only inside 'Bonjour' must fail closed (no in-word blank)");
  });
});
