/**
 * Deterministic drill derivation contracts (roadmap: hub derivation = B).
 *
 * Locks the factory's first product: (a) determinism, (b) schema validity of
 * every derivable real-registry item (the same structural invariants the
 * content rules enforce on authored lessons), (c) fail-closed behavior on
 * every unusable combination, (d) chip canon (no sentence-shaped weave chip).
 */
import { describe, test, assert, assertEqual } from "./harness";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import type { LearningItem } from "../../content/lessonTypes";
import { deriveDrill } from "../../content/learning-engine/derive-drill";

const REGISTRY = ITEM_REGISTRY as unknown as Record<string, LearningItem>;
const NOW = 1_720_000_000_000; // explicit clock; derivation is time-independent
const TERMINAL = /[.!?]\s*$/;

const collapse = (s: string) =>
  s.toLowerCase().replace(/\s+/g, " ").replace(/ ([.,!?;:])/g, "$1").replace(/(['’]) /g, "$1").trim();

describe("drill derivation (deterministic factory v0)", () => {
  test("same input always produces the same output", () => {
    const input = {
      itemId: "chunk-je-voudrais",
      screenType: "fill-with-traps" as const,
      errorTag: "wrong_item",
      registry: REGISTRY,
      now: NOW,
    };
    const first = deriveDrill(input);
    const second = deriveDrill({ ...input });
    assert(first !== null, "known chunk must derive a fill");
    assertEqual(first, second, "identical input must yield identical drills");
    const later = deriveDrill({ ...input, now: NOW + 86_400_000 });
    assertEqual(first, later, "derivation is time-independent by design");
  });

  test("every derivable registry item yields a VALID fill payload", () => {
    let derived = 0;
    for (const itemId of Object.keys(REGISTRY).sort()) {
      const screen = deriveDrill({ itemId, screenType: "fill-with-traps", registry: REGISTRY, now: NOW });
      if (screen === null) continue;
      derived += 1;
      const item = REGISTRY[itemId];
      assert(screen.type === "fill-with-traps", `${itemId}: wrong screen type`);
      const p = screen.payload;
      assertEqual(p.blankCount, 1, `${itemId}: one blank`);
      assert(p.options.length >= 2, `${itemId}: a fill needs the correct option plus >=1 trap`);
      assertEqual(p.options.filter((o) => o.isCorrect).length, 1, `${itemId}: exactly one correct`);
      assertEqual(new Set(p.options.map((o) => o.id)).size, p.options.length, `${itemId}: option ids unique`);
      const correct = p.options.find((o) => o.isCorrect)!;
      assertEqual(p.answer, [correct.id], `${itemId}: answer references the correct option`);
      assertEqual(correct.text, item.text, `${itemId}: the blank is the item's own surface`);
      const rebuilt = collapse(`${p.sentenceBefore ?? ""} ${item.text} ${p.sentenceAfter ?? ""}`);
      assertEqual(rebuilt, collapse(item.exampleFr!), `${itemId}: blank + surface rebuilds the example`);
      assert(p.reveal.short.length > 0 && (p.reveal.natural ?? "").length > 0, `${itemId}: reveal complete`);
      for (const o of p.options) {
        if (!o.isCorrect) {
          assert(!TERMINAL.test(o.text), `${itemId}: trap "${o.text}" is sentence-shaped`);
          assert((o.trapReason ?? "").length > 0, `${itemId}: trap without a reason`);
        }
      }
    }
    assert(derived >= 10, `expected a productive factory, got only ${derived} fills`);
  });

  test("every derivable registry item yields a VALID weave payload", () => {
    let derived = 0;
    for (const itemId of Object.keys(REGISTRY).sort()) {
      const screen = deriveDrill({ itemId, screenType: "weave", registry: REGISTRY, now: NOW });
      if (screen === null) continue;
      derived += 1;
      const item = REGISTRY[itemId];
      assert(screen.type === "weave", `${itemId}: wrong screen type`);
      const p = screen.payload;
      assert(p.expectedAnswers.length === 1 && p.expectedAnswers[0].length > 0, `${itemId}: one expected answer`);
      assert(!/[.!?]\s+\S/.test(p.expectedAnswers[0]), `${itemId}: single calm sentence only`);
      const chip = p.suggestedPieces?.[0];
      assert(chip !== undefined && chip.text === item.text && chip.required === true, `${itemId}: required chip is the item surface`);
      assert(!TERMINAL.test(chip.text), `${itemId}: chip "${chip.text}" is sentence-shaped (chip canon)`);
      if (p.expectedAnswers[0].endsWith("?")) {
        assert(
          (p.acceptedAlternatives ?? []).some((a) => !a.includes("?")),
          `${itemId}: question-form answer needs a no-question-mark alternative (CI rule)`,
        );
      }
      assertEqual(p.validationMode, "exact-or-alternative", `${itemId}: deterministic validation`);
      assert((p.reveal.modelAnswer ?? "").length > 0, `${itemId}: reveal has a model answer`);
    }
    assert(derived >= 10, `expected a productive factory, got only ${derived} weaves`);
  });

  test("fail-closed: unusable combinations return null, never a partial payload", () => {
    const cases: Array<[string, "fill-with-traps" | "weave", string]> = [
      ["no-such-id", "fill-with-traps", "unknown itemId"],
      ["no-such-id", "weave", "unknown itemId"],
      ["micro-je-suis-vs-j-ai", "fill-with-traps", "micro-contrast is not drill material"],
      ["sound-elision", "weave", "sound-pattern is not drill material"],
      ["grammar-etre-identity", "weave", "grammar-nugget is not drill material"],
      ["verb-etre", "fill-with-traps", "surface absent from its own example"],
      ["chunk-c-est-ou", "weave", "sentence-shaped surface never becomes a weave chip"],
    ];
    for (const [itemId, screenType, why] of cases) {
      assertEqual(
        deriveDrill({ itemId, screenType, registry: REGISTRY, now: NOW }),
        null,
        `${itemId}/${screenType}: ${why}`,
      );
    }
    assertEqual(
      deriveDrill({
        itemId: "chunk-je-voudrais",
        screenType: "build" as unknown as "weave",
        registry: REGISTRY,
        now: NOW,
      }),
      null,
      "unknown screen type is fail-closed",
    );
  });

  test("errorTag rotates traps deterministically without breaking validity", () => {
    const base = { itemId: "chunk-je-suis", screenType: "fill-with-traps" as const, registry: REGISTRY, now: NOW };
    const a1 = deriveDrill({ ...base, errorTag: "wrong_item" });
    const a2 = deriveDrill({ ...base, errorTag: "wrong_item" });
    const b = deriveDrill({ ...base, errorTag: "wrong_order" });
    assert(a1 !== null && b !== null, "both variants must derive");
    assertEqual(a1, a2, "same errorTag, same drill");
    assert(a1.type === "fill-with-traps" && b.type === "fill-with-traps", "both are fills");
    assertEqual(a1.payload.options.filter((o) => o.isCorrect).length, 1, "variant A stays valid");
    assertEqual(b.payload.options.filter((o) => o.isCorrect).length, 1, "variant B stays valid");
    assert(a1.id !== b.id, "different errorTags produce distinguishable drill ids");
  });
});
