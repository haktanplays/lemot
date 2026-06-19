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
import { describe, test, assert } from "./harness";
import {
  acceptsCoffeeRemainder,
  acceptsRebuild,
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
