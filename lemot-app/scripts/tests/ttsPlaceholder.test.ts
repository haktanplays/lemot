/**
 * TTS / audioText placeholder validation (`tts_audio_text_contains_placeholder`).
 *
 * An author leaving a textual placeholder (TODO / TBD / XXX / PLACEHOLDER /
 * {{...}}) — or the original underscore blanks — in
 * `pronunciationProfile.audioText` must fail `validateContent`, otherwise
 * validate:content passes and the app can speak the placeholder out loud.
 *
 * Severity note: the CLI report groups these under "Hard errors"
 * (formatReport label), but the Finding severity vocabulary in code is
 * "error" | "warning" | "info" — these tests assert severity "error".
 */
import { describe, test, assert, clone } from "./harness";
import { validateContent, L2_CONTENT_FIXTURE } from "../../content/learning-engine";
import type { Finding, ValidationInput } from "../../content/learning-engine";

const CODE = "tts_audio_text_contains_placeholder";

/** Clone the L2 fixture and overwrite one item's audioText. */
function withAudioText(audioText: string): ValidationInput {
  const input = clone(L2_CONTENT_FIXTURE);
  const itemWithProfile = Object.values(input.items).find(
    (item) => item.pronunciationProfile !== undefined,
  );
  assert(itemWithProfile, "L2 fixture must have an item with a pronunciationProfile");
  itemWithProfile.pronunciationProfile!.audioText = audioText;
  return input;
}

function placeholderFindings(input: ValidationInput): Finding[] {
  return validateContent(input).filter((f) => f.code === CODE);
}

describe("validateContent › tts_audio_text_contains_placeholder", () => {
  test("baseline: untouched L2 fixture has no placeholder findings", () => {
    assert(
      placeholderFindings(clone(L2_CONTENT_FIXTURE)).length === 0,
      "expected the unmodified L2 fixture to be placeholder-clean",
    );
  });

  // Textual placeholders an author might leave behind — each must be flagged
  // as a severity "error" finding (a "Hard error" in the CLI summary).
  const flagged = [
    "TODO",
    "todo",
    "TBD",
    "XXX",
    "xxx",
    "PLACEHOLDER",
    "{{audio}}",
    "{{ placeholder }}",
    "je suis TODO",
    "TODO audio",
  ];
  for (const audioText of flagged) {
    test(`flags audioText ${JSON.stringify(audioText)}`, () => {
      const findings = placeholderFindings(withAudioText(audioText));
      assert(findings.length > 0, `expected ${JSON.stringify(audioText)} to be flagged`);
      assert(
        findings.every((f) => f.severity === "error"),
        "placeholder findings must use severity \"error\"",
      );
    });
  }

  // Pre-existing underscore behavior must keep failing.
  const underscoreFlagged = ["je ___ ici", "[___]", "___"];
  for (const audioText of underscoreFlagged) {
    test(`still flags underscore placeholder ${JSON.stringify(audioText)}`, () => {
      assert(
        placeholderFindings(withAudioText(audioText)).length > 0,
        `expected ${JSON.stringify(audioText)} to keep failing`,
      );
    });
  }

  // Widened coverage (Cairn Faz 2): the old regex missed single underscores,
  // single-brace/bracket/angle template markers, and FIXME/lorem. Spoken
  // French never legitimately contains `_`, `[`, `{`, or `<`.
  const widenedFlagged = [
    "je _ ici",
    "_",
    "{answer}",
    "[blank]",
    "je suis [ici]",
    "<mot>",
    "FIXME",
    "fixme audio",
    "lorem ipsum",
  ];
  for (const audioText of widenedFlagged) {
    test(`flags widened placeholder ${JSON.stringify(audioText)}`, () => {
      const findings = placeholderFindings(withAudioText(audioText));
      assert(
        findings.length > 0,
        `expected ${JSON.stringify(audioText)} to be flagged`,
      );
      assert(
        findings.every((f) => f.severity === "error"),
        'placeholder findings must use severity "error"',
      );
    });
  }

  // Normal French text must NOT be flagged.
  const clean = [
    "je suis",
    "ici",
    "je suis ici",
    "j'ai une question",
    "s'il vous plaît, un café",
    "euh… je voudrais un café !",
  ];
  for (const audioText of clean) {
    test(`passes normal French audioText ${JSON.stringify(audioText)}`, () => {
      assert(
        placeholderFindings(withAudioText(audioText)).length === 0,
        `expected ${JSON.stringify(audioText)} to pass`,
      );
    });
  }
});
