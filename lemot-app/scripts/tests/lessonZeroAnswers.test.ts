/**
 * Lesson Zero answer-acceptance guard.
 *
 * Locks the two pure predicates behind the redesigned first-run flow:
 *   - acceptsCoffeeRemainder: English remainder in the active weave (beat 2)
 *   - acceptsRebuild: the full natural French sentence (beat 5)
 *
 * Pure tsx: the module is string-only (reuses `norm`), no React Native / Expo
 * / device deps.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  acceptsCoffeeRemainder,
  acceptsRebuild,
  rebuildHintPieces,
} from "../../lib/lessonZeroAnswers";

describe("lesson zero: english remainder acceptance", () => {
  const PASS = [
    "coffee",
    "a coffee",
    "one coffee",
    "some coffee",
    "a cup of coffee",
    "coffee please",
    "Coffee",
    "  a   Coffee!  ",
  ];
  for (const value of PASS) {
    test(`accepts ${JSON.stringify(value)}`, () => {
      assert(acceptsCoffeeRemainder(value), `should accept ${JSON.stringify(value)}`);
    });
  }

  const REJECT = ["", "   ", "coffeetable", "tea", "please", "a drink"];
  for (const value of REJECT) {
    test(`rejects ${JSON.stringify(value)}`, () => {
      assert(!acceptsCoffeeRemainder(value), `should reject ${JSON.stringify(value)}`);
    });
  }
});

describe("lesson zero: full french rebuild acceptance", () => {
  const PASS = [
    "Bonjour, je voudrais un café.",
    "bonjour je voudrais un cafe",
    "BONJOUR, JE VOUDRAIS UN CAFÉ",
    "  Bonjour je voudrais un café  ",
    "Bonjour, je voudrais un café, s'il vous plaît.",
    "bonjour je voudrais un cafe sil vous plait",
  ];
  for (const value of PASS) {
    test(`accepts ${JSON.stringify(value)}`, () => {
      assert(acceptsRebuild(value), `should accept ${JSON.stringify(value)}`);
    });
  }

  const REJECT = ["", "bonjour", "je voudrais un cafe", "bonjour je voudrais un the"];
  for (const value of REJECT) {
    test(`rejects ${JSON.stringify(value)}`, () => {
      assert(!acceptsRebuild(value), `should reject ${JSON.stringify(value)}`);
    });
  }
});

describe("lesson zero: rebuild recall nudge (reflective + progressive)", () => {
  // Fewer than two misses never show chips, whatever the input.
  for (const misses of [0, 1]) {
    test(`miss ${misses}: no chips`, () => {
      assertEqual(
        rebuildHintPieces("random text", misses),
        [],
        `miss ${misses} should show no chips`,
      );
    });
  }

  // 2nd miss: at most the first two still-missing pieces, canonical order.
  const SECOND_MISS: [string, string[]][] = [
    ["random unrelated text", ["Bonjour", "je voudrais"]],
    ["bonjour", ["je voudrais", "un"]],
    ["je voudrais", ["Bonjour", "un"]],
    ["bonjour je voudrais", ["un", "café"]],
    ["bonjour je voudrais un", ["café"]],
    ["cafe", ["Bonjour", "je voudrais"]],
    ["café", ["Bonjour", "je voudrais"]],
    ["un cafe", ["Bonjour", "je voudrais"]],
    // A bare "voudrais" must NOT satisfy the "je voudrais" chunk.
    ["voudrais", ["Bonjour", "je voudrais"]],
    // All four pieces present but the answer is still wrong -> no chips.
    ["bonjour je voudrais un cafe extra", []],
  ];
  for (const [input, expected] of SECOND_MISS) {
    test(`2nd miss ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
      assertEqual(rebuildHintPieces(input, 2), expected, `2nd miss for ${JSON.stringify(input)}`);
    });
  }

  // 3rd miss and later: every still-missing piece, canonical order.
  const THIRD_MISS: [string, string[]][] = [
    ["random unrelated text", ["Bonjour", "je voudrais", "un", "café"]],
    ["bonjour", ["je voudrais", "un", "café"]],
    ["je voudrais", ["Bonjour", "un", "café"]],
    ["bonjour je voudrais", ["un", "café"]],
    ["bonjour je voudrais un", ["café"]],
    ["cafe", ["Bonjour", "je voudrais", "un"]],
    ["un cafe", ["Bonjour", "je voudrais"]],
    // "une" is not the token "un"; substrings inside larger words never count.
    ["une", ["Bonjour", "je voudrais", "un", "café"]],
    // All four pieces present but still wrong -> no chips, never the sentence.
    ["bonjour je voudrais un cafe extra", []],
  ];
  for (const [input, expected] of THIRD_MISS) {
    test(`3rd miss ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
      assertEqual(rebuildHintPieces(input, 3), expected, `3rd miss for ${JSON.stringify(input)}`);
    });
    // "3rd and later": the 5th miss behaves identically to the 3rd.
    test(`5th miss ${JSON.stringify(input)} matches 3rd`, () => {
      assertEqual(rebuildHintPieces(input, 5), expected, `5th miss for ${JSON.stringify(input)}`);
    });
  }
});
