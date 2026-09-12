/**
 * French needs vertical room, everywhere it is set.
 *
 * The founder saw "J'ai" clipped and reported it as a J problem. It is not: a
 * Text with no lineHeight inherits a default sized for unaccented Latin, and
 * French runs accents above (é è ê à ç) and descenders below (j g p q y) — in
 * italic serif, which swings furthest. Any shared renderer that sets French
 * without a lineHeight will shave something eventually.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { frenchLineHeight, frenchItalicLineHeight } from "../../constants/theme";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

/** Renderers that put French on screen for the learner. */
const FRENCH_RENDERERS = [
  "components/ui/PieceChip.tsx",
  "components/lesson-v1/screens/Showcase.tsx",
  // Added by the L0-L1 founder batch: the reel is a new French surface, and the
  // rest were already rendering French without this file watching them.
  "components/lesson-v1/screens/PatternReel.tsx",
  "components/lesson-v1/screens/NaturalReveal.tsx",
  "components/ui/StandingSurface.tsx",
  // Added by the L3 batch. The founder reported J clipping a SECOND time, and
  // these four were where the sentences he named actually render: the meet
  // card shows "Je ne suis pas ici." and "Je ne comprends pas." and was outside
  // every check in this file. AnswerReveal was setting italic with no line
  // height at all.
  "components/lesson-v1/screens/MeetCard.tsx",
  "components/lesson-v1/screens/FillWithTraps.tsx",
  "components/lesson-v1/screens/AnswerReveal.tsx",
  "components/ui/SceneCard.tsx",
  "components/lesson-v1/screens/InsightCard.tsx",
];

/**
 * Surfaces that must not assemble the italic-serif style by hand.
 *
 * The first pass fixed four renderers and the defect came back, because every
 * renderer was building the same style from parts and each one could be wrong
 * on its own. There is now one factory, and these are the files required to use
 * it — which is what makes the NEXT Android finding a one-line change rather
 * than another audit.
 */
const MUST_USE_SHARED = [
  "components/ui/PieceChip.tsx",
  "components/ui/SceneCard.tsx",
  "components/ui/StandingSurface.tsx",
  "components/lesson-v1/screens/MeetCard.tsx",
  "components/lesson-v1/screens/FillWithTraps.tsx",
  "components/lesson-v1/screens/AnswerReveal.tsx",
  "components/lesson-v1/screens/NaturalReveal.tsx",
  "components/lesson-v1/screens/InsightCard.tsx",
];

describe("shared French renderers leave room for accents and descenders", () => {
  test("the rule is generous enough for an italic serif accent stack", () => {
    assert(frenchLineHeight(14) >= 20, "14pt French needs at least 20pt of line");
    assert(frenchLineHeight(12) >= 17, "12pt French needs at least 17pt of line");
    assertEqual(frenchLineHeight(20), 29, "the ratio should be stable and predictable");
  });

  test("every Text that sets a fontSize in a French renderer also sets a lineHeight", () => {
    for (const rel of FRENCH_RENDERERS) {
      const src = read(rel);
      // Each style block that names fontSize must name lineHeight nearby.
      const blocks = src.split("fontSize:").slice(1);
      for (const [i, block] of blocks.entries()) {
        const window = block.slice(0, 160);
        assert(
          window.includes("lineHeight"),
          `${rel}: fontSize #${i + 1} has no lineHeight, so French can clip there`,
        );
      }
    }
  });

  test("piece chips are not padded so tightly that a descender meets the border", () => {
    const chip = read("components/ui/PieceChip.tsx");
    assert(
      !chip.includes("SPACE.sm - 1"),
      "the chip's vertical padding was reduced below the shared step; J and j clip there",
    );
  });
});

describe("the glyphs that actually caused the report", () => {
  test("the regression strings are all ordinary French this product ships", () => {
    // Kept as a written record of what to look at on device: these are the
    // shapes that clip first.
    const strings = ["Je", "J'ai", "J'y vais", "je", "g", "p", "q", "y", "é", "è", "ê", "à", "ç"];
    for (const s of strings) assert(s.length > 0, "regression string must be non-empty");
    assertEqual(strings.length, 13, "keep the founder's list intact");
  });
});

// ── THE FLOOR, MEASURED ─────────────────────────────────────────────────────

/**
 * The tests above check that a line height EXISTS. These check that it is big
 * enough, which is a different failure and the one that actually shipped:
 * `StandingSurface` set 20px French on a lineHeight of 28 when the floor for
 * 20px is 29. It had a line height; it was simply a copy of the helper's output
 * for a different size, and a copied number does not move when the rule does.
 */
const CLASS_SIZES: Readonly<Record<string, number>> = {
  "text-sm": 14,
  "text-base": 16,
  "text-lg": 18,
  "text-xl": 20,
};

type FrenchBlock = { file: string; size: number; lineHeight: number };

/**
 * Italic-serif blocks with a LITERAL line height, and the size beside them.
 *
 * A block that calls `frenchLineHeight` is skipped on purpose: it already
 * follows the rule, and it is what this test wants people to write.
 */
function literalItalicBlocks(file: string, src: string): FrenchBlock[] {
  const lines = src.split("\n");
  const out: FrenchBlock[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].includes('fontStyle: "italic"')) continue;
    const text = lines.slice(Math.max(0, i - 6), i + 8).join("\n");
    if (text.includes("frenchLineHeight(")) continue;
    const lh = /lineHeight:\s*(\d+)/.exec(text);
    if (lh === null) continue;
    let size: number | null = null;
    const fs = /fontSize:\s*(\d+)/.exec(text);
    if (fs !== null) size = Number(fs[1]);
    else {
      for (const [cls, px] of Object.entries(CLASS_SIZES)) {
        if (text.includes(cls)) {
          size = px;
          break;
        }
      }
    }
    if (size === null) continue;
    out.push({ file, size, lineHeight: Number(lh[1]) });
  }
  return out;
}

describe("a line height that exists is not yet a line height that fits", () => {
  const blocks = FRENCH_RENDERERS.flatMap((f) => literalItalicBlocks(f, read(f)));

  test("no italic French surface sits under the floor", () => {
    const tight = blocks
      .filter((b) => b.lineHeight < frenchLineHeight(b.size))
      .map(
        (b) =>
          `${b.file}: ${b.size}px on lineHeight ${b.lineHeight}, floor is ${frenchLineHeight(b.size)}`,
      );
    assert(tight.length === 0, `accents and J tails get shaved here:\n${tight.join("\n")}`);
  });

  test("the scanner finds a tight literal, and steps over a computed one", () => {
    // Guard on the guard, against a fixture rather than against the corpus.
    // It used to assert that some real block sat above the floor, which held
    // only while literal line heights still existed — and the point of this
    // work was to remove them. A guard whose sentinel dies when the defect is
    // fixed stops watching at exactly the wrong moment.
    const tight = `<Text style={{ fontStyle: "italic", fontSize: 20, lineHeight: 28 }}>`;
    const computed = `<Text style={{ fontStyle: "italic", fontSize: 20, lineHeight: frenchLineHeight(20) }}>`;
    const found = literalItalicBlocks("fixture.tsx", tight);
    assertEqual(found.length, 1, "a literal line height must be visible to the scan");
    assertEqual(found[0].size, 20, "the size beside it must be read, not guessed");
    assert(found[0].lineHeight < frenchLineHeight(found[0].size), "28 is under the floor for 20px");
    assertEqual(
      literalItalicBlocks("fixture.tsx", computed).length,
      0,
      "a block that follows the rule is not the scan's business",
    );
  });

  test("no French surface is left setting its own line height by hand", () => {
    // Stronger than the floor, and the state this batch actually reached: a
    // literal that is correct today still does not move when frenchLineHeight
    // does. The floor test above remains the net for whatever is added next.
    assertEqual(
      blocks.length,
      0,
      `these still copy a number instead of the rule:\n${blocks
        .map((b) => `${b.file}: ${b.size}px on ${b.lineHeight}`)
        .join("\n")}`,
    );
    assert(
      FRENCH_RENDERERS.some((f) => read(f).includes("frenchLineHeight(")),
      "no renderer calls the shared rule — check the list still names real files",
    );
  });

  test("the model answer computes its line height rather than copying a number", () => {
    // It read 28, which happens to be right for 19px. Correct today is still a
    // literal: it does not follow the rule when the rule changes. It now goes
    // through the shared factory, which is the same requirement one level up.
    assert(
      read("components/lesson-v1/screens/NaturalReveal.tsx").includes("frenchSerif(19)"),
      "the largest French on the screen must follow the shared rule",
    );
  });
});


// ── ONE STYLE, ONE PLACE ────────────────────────────────────────────────────

describe("italic French is assembled in exactly one place", () => {
  test("no watched renderer hand-rolls the italic serif style", () => {
    const offenders = MUST_USE_SHARED.filter((rel) => read(rel).includes('fontStyle: "italic"'));
    assert(
      offenders.length === 0,
      `these build the style from parts instead of calling frenchSerif:\n${offenders.join("\n")}`,
    );
  });

  test("every one of them actually calls the factory", () => {
    // The guard on the guard: a file that simply stopped rendering French would
    // pass the check above for the wrong reason.
    for (const rel of MUST_USE_SHARED) {
      assert(
        read(rel).includes("frenchSerif("),
        `${rel} is listed as a French surface but never calls the shared style`,
      );
    }
  });

  test("italic gets a taller line box than upright", () => {
    // The founder reported clipping again after every surface was already at
    // 1.45x, which means the ratio was not the whole story. Italic serif swings
    // furthest in both directions at once.
    assert(
      frenchItalicLineHeight(20) > frenchLineHeight(20),
      "italic must reserve more vertical room than upright French",
    );
    assert(frenchItalicLineHeight(14) >= 21, "14pt italic French needs at least 21pt of line");
  });

  test("the Android knob is set explicitly, not left to the platform default", () => {
    // includeFontPadding tells Android to reserve the font's own declared ascent
    // and descent. The default is true today but differs across RN
    // architectures, and a glyph this close to its bounds should not depend on
    // which one is running.
    assert(
      read("constants/theme.ts").includes("includeFontPadding: true"),
      "the shared French style must state includeFontPadding rather than inherit it",
    );
  });

  test("no French surface sets a line height that a class silently owns", () => {
    // MeetCard set className="text-lg" and lineHeight: 28 — the size lived in a
    // class, the line box lived in a number, and nothing connected them. Change
    // the class and the box stops fitting, silently.
    for (const rel of MUST_USE_SHARED) {
      const src = read(rel);
      for (const m of src.matchAll(/className="[^"]*text-(sm|base|lg|xl)[^"]*"/g)) {
        const after = src.slice(src.indexOf(m[0]), src.indexOf(m[0]) + 260);
        assert(
          !/lineHeight:\s*\d/.test(after),
          `${rel}: a text-size class sits next to a literal line height (${m[0]})`,
        );
      }
    }
  });
});
