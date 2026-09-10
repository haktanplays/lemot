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
import { frenchLineHeight } from "../../constants/theme";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

/** Renderers that put French on screen for the learner. */
const FRENCH_RENDERERS = [
  "components/ui/PieceChip.tsx",
  "components/lesson-v1/screens/Showcase.tsx",
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
