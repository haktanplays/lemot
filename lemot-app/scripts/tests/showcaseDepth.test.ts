/**
 * Showcase: sentence first, pieces always visible, depth on demand.
 *
 * The piece line carries the product's central claim — that a sentence is
 * reusable pieces rather than a line to memorise — so these guards protect the
 * two ways that claim can become a lie: a piece the learner does not actually
 * own, and a protected chunk chopped into fragments that mean nothing on their
 * own.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { showcasePieces } from "../../content/lessons/showcasePieces";
import type { ShowcaseSentence } from "../../content/lessonTypes";

const PATH = (V1_LESSONS as any[]).filter((l) => l.number >= 1 && l.number <= 10);
function sentences(): { lesson: number; s: ShowcaseSentence }[] {
  const out: { lesson: number; s: ShowcaseSentence }[] = [];
  for (const l of PATH)
    for (const sc of flattenLessonScreens(l) as any[]) {
      if (sc.type !== "showcase") continue;
      for (const c of sc.payload.clusters) for (const s of c.sentences) out.push({ lesson: l.number, s });
    }
  return out;
}

describe("Showcase pieces are real, owned pieces", () => {
  test("every derived piece resolves to a canonical registry item", () => {
    // The whole point of the piece line is that these are things the learner
    // owns. A piece that is not an item would be an invented word.
    const texts = new Set(
      Object.values(ITEM_REGISTRY).map((i) => String((i as { text: string }).text).toLowerCase()),
    );
    for (const { s } of sentences())
      for (const p of showcasePieces(s.fr))
        assert(texts.has(p.text.toLowerCase()), `"${p.text}" in "${s.fr}" is not a registry item`);
  });

  test("protected chunks are never split into fragments", () => {
    // "s'il vous plaît" is one item and one sound. Three chips reading s'il /
    // vous / plaît would teach a decomposition French speakers do not make.
    for (const { s } of sentences()) {
      const pieces = showcasePieces(s.fr).map((p) => p.text.toLowerCase());
      for (const frag of ["s'il", "vous plaît", "voudrais", "comprends"])
        assert(!pieces.includes(frag), `"${s.fr}" was split into the fragment "${frag}"`);
    }
  });

  test("a breakdown is either useful or absent, never a single lone chip", () => {
    for (const { s } of sentences()) {
      const n = showcasePieces(s.fr).length;
      assert(n === 0 || n >= 2, `"${s.fr}" produced exactly one piece, which teaches nothing`);
    }
  });

  test("the segmenter refuses a sentence it cannot mostly account for", () => {
    // Negative control. Real French, but built from words this product has no
    // items for: it must decline rather than present one known chunk as if the
    // learner owned the whole line.
    assertEqual(showcasePieces("Bonjour, je cherche la bibliothèque municipale.").length, 0,
      "segmenter claimed a sentence made mostly of unmodelled French");
    assertEqual(showcasePieces("Bonjour.").length, 0, "a one-item line needs no breakdown");
    assert(showcasePieces("Je voudrais un café.").length >= 2, "a real composition must break down");
  });
});

describe("Showcase depth is optional, specific and honest", () => {
  test("no depth card is present but empty", () => {
    for (const { s } of sentences()) {
      if (!s.depth) continue;
      for (const [k, v] of Object.entries(s.depth))
        assert(typeof v === "string" && v.trim().length > 0, `${s.fr}: depth.${k} is present but empty`);
    }
  });

  test("depth stays the exception, not the default", () => {
    // If most lines carried depth the screen would be a textbook page, which is
    // the failure this whole layer is shaped to avoid.
    const all = sentences();
    const withDepth = all.filter(({ s }) => s.depth !== undefined).length;
    assert(withDepth > 0, "no sentence carries depth, so the layer ships dead");
    assert(
      withDepth < all.length / 2,
      `depth on ${withDepth}/${all.length} sentences is a wall, not a disclosure`,
    );
  });

  test("written pronunciation stays a learner-readable cue, not IPA", () => {
    // The house convention is the one the registry already used for liaison:
    // lowercase hyphenated syllables an English speaker can read aloud.
    for (const { s } of sentences()) {
      const sound = s.depth?.sound;
      if (!sound) continue;
      assert(!/[ɑɛøœəʁʃʒŋɲɥʌðθˈˌ]/.test(sound), `${s.fr}: "${sound}" uses IPA symbols`);
      assert(!/\/|\[|\]/.test(sound), `${s.fr}: "${sound}" uses phonetic delimiters`);
      // The property that matters is that the cue is broken into readable
      // units, not that a hyphen specifically appears: "zhay FAN" is two words
      // and already syllable-readable. Requiring a hyphen was the wrong rule.
      assert(
        /[-\s]/.test(sound.trim()) && sound.trim().split(/[-\s]+/).length >= 2,
        `${s.fr}: "${sound}" is one undivided blob, so it cannot be read aloud`,
      );
    }
  });
});
