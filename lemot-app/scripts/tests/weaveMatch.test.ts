/**
 * v1 Weave typed-answer normalization + matching (Round 1 PR B2, ISS-7).
 *
 * Locks the deterministic, lenient matcher used by the Weave screen
 * (components/lesson-v1/screens/normalizeAnswer.ts). Harmless orthography
 * (case, extra spaces, internal commas, periods, accents) must NOT block a
 * correct answer, while meaning-bearing marks stay significant: "?" and "!"
 * are preserved, and a missing apostrophe is NOT silently accepted.
 *
 * Pure tsx: the module is string-only (no React Native / Expo / device deps).
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  normalize,
  matchExpected,
} from "../../components/lesson-v1/screens/normalizeAnswer";

describe("weave normalize", () => {
  test("lowercases", () => {
    assertEqual(normalize("BONJOUR"), normalize("bonjour"), "case folded");
  });

  test("collapses and trims whitespace", () => {
    assertEqual(normalize("  je   suis  ici "), "je suis ici", "spaces collapsed");
  });

  test("ignores internal commas", () => {
    assertEqual(
      normalize("Bonjour, je voudrais"),
      normalize("Bonjour je voudrais"),
      "comma ignored",
    );
  });

  test("ignores trailing and internal periods", () => {
    assertEqual(normalize("Je suis ici."), normalize("Je suis ici"), "trailing period");
    assertEqual(normalize("c.a.d"), normalize("cad"), "internal periods");
  });

  test("folds French accents", () => {
    assertEqual(normalize("café"), normalize("cafe"), "café -> cafe");
    assertEqual(normalize("plaît"), normalize("plait"), "plaît -> plait");
    assertEqual(normalize("très"), normalize("tres"), "très -> tres");
  });

  test("keeps ? significant", () => {
    assert(
      normalize("vous etes ici ?") !== normalize("vous etes ici"),
      "question mark distinguishes a question from a statement",
    );
  });

  test("keeps ! significant", () => {
    assert(normalize("oui !") !== normalize("oui"), "exclamation preserved");
  });

  test("folds smart apostrophe to straight", () => {
    assertEqual(normalize("s’il"), normalize("s'il"), "curly vs straight apostrophe");
  });

  test("does NOT accept a missing apostrophe", () => {
    assert(normalize("sil") !== normalize("s'il"), "missing apostrophe is not folded away");
  });

  test("empty / whitespace normalizes to empty", () => {
    assertEqual(normalize("   "), "", "whitespace-only is empty");
    assertEqual(normalize(""), "", "empty stays empty");
  });

  test("is idempotent", () => {
    for (const s of ["CAFÉ", "  Bonjour, je voudrais. ", "s’il vous plaît", "vous etes ici ?"]) {
      assertEqual(normalize(normalize(s)), normalize(s), `idempotent for ${JSON.stringify(s)}`);
    }
  });
});

describe("weave matchExpected", () => {
  const cafe = "Bonjour, je voudrais un café, s'il vous plaît.";

  test("exact despite case, comma, accent, trailing period", () => {
    assertEqual(matchExpected("bonjour je voudrais un café s'il vous plaît", [cafe]), "exact", "no comma + lowercase");
    assertEqual(matchExpected("Bonjour je voudrais un cafe s'il vous plait.", [cafe]), "exact", "unaccented");
    assertEqual(matchExpected("BONJOUR, JE VOUDRAIS UN CAFE, S'IL VOUS PLAIT", [cafe]), "exact", "uppercase + unaccented");
  });

  test("missing apostrophe is not a full pass", () => {
    assertEqual(
      matchExpected("bonjour je voudrais un cafe sil vous plait", [cafe]),
      "none",
      "missing apostrophe in sil -> none (no near-miss category yet)",
    );
  });

  test("a genuine different shape is accepted only via acceptedAlternatives", () => {
    const expected = ["Ce n'est pas ici."];
    const alts = ["Ce n est pas ici."]; // explicit author-accepted missing-apostrophe shape
    assertEqual(matchExpected("ce n est pas ici", expected, alts), "alternative", "space form via alternative");
    assertEqual(matchExpected("ce n est pas ici", expected), "none", "without the alternative -> none");
  });

  test("question form: ? required stays significant", () => {
    const expected = ["Vous êtes ici ?"];
    const altNoQ = ["Vous êtes ici"]; // structural guard requires a no-? alternative
    assertEqual(matchExpected("vous etes ici ?", expected), "exact", "with ? -> exact");
    assertEqual(matchExpected("vous etes ici", expected, altNoQ), "alternative", "no ? -> only the accepted (softer) variant");
    assertEqual(matchExpected("vous etes ici", expected), "none", "no ? and no alternative -> none");
  });

  test("empty input is none", () => {
    assertEqual(matchExpected("   ", [cafe]), "none", "whitespace-only -> none");
  });
});
