/**
 * A recap shows back pieces, and a piece has to be a real one.
 *
 * The founder read "je" off an L4 recap where the lesson had taught "je suis",
 * and asked whether that was a projection bug or a geometry bug. It was
 * neither, in the end: L4 authors "je suis" and the recap renderer passes the
 * authored string straight through. But the question was the right one, because
 * two ways of producing that exact symptom did exist.
 *
 * The first is authoring. `piecesUsed` is hand-written per lesson and nothing
 * checked it against the registry, so a lesson could list a slice of a chunk
 * and the recap would show it back as a boundary the learner had used. L9 was
 * doing it with "une pause".
 *
 * The second is the chip. PieceChip capped French at one line, and truncating
 * French is not a cosmetic loss: cut "je suis" and what remains is "je", which
 * is a different piece the learner also owns. That is fixed in the component;
 * this file guards the authoring half, which is the half canon owns.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { knownPieces } from "../../content/lessons/showcasePieces";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);
const fold = (s: string) => s.normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();

/** Every surface form the registry calls a piece. */
const CANONICAL = new Set(
  Object.values(ITEM_REGISTRY as unknown as Record<string, { text?: string }>)
    .map((i) => fold(String(i.text ?? "")))
    .filter((t) => t.length > 0),
);

type Row = { lesson: string; piece: string };

function recapPieces(): Row[] {
  const out: Row[] = [];
  for (const lesson of PATH) {
    for (const screen of flattenLessonScreens(lesson)) {
      if (screen.type !== "recap") continue;
      for (const piece of (screen.payload as { piecesUsed?: string[] }).piecesUsed ?? []) {
        out.push({ lesson: lesson.id, piece });
      }
    }
  }
  return out;
}

describe("recap pieces are pieces the registry knows", () => {
  const rows = recapPieces();

  test("the recaps are really being read", () => {
    assert(rows.length >= 30, `only ${rows.length} recap pieces found across L1-L10`);
  });

  test("every one resolves to a canonical surface", () => {
    const strays = rows.filter((r) => !CANONICAL.has(fold(r.piece)));
    assert(
      strays.length === 0,
      `these are shown back as pieces the learner used, and the registry has no such piece:\n${strays
        .map((r) => `  ${r.lesson}: "${r.piece}"`)
        .join("\n")}`,
    );
  });

  test("none of them is a chunk cut in half", () => {
    // The "une pause" class: a string that LOOKS like a piece because it is a
    // run of words from one, but that the segmenter breaks apart — so it is not
    // a boundary anything travels on.
    const split = rows.filter((r) => knownPieces(r.piece).length > 1);
    assert(
      split.length === 0,
      `these come apart, so they are not single pieces:\n${split
        .map((r) => `  ${r.lesson}: "${r.piece}" -> ${knownPieces(r.piece).map((p) => p.text).join(" | ")}`)
        .join("\n")}`,
    );
  });

  test("a lesson does not show the same piece back twice", () => {
    for (const lesson of PATH) {
      for (const screen of flattenLessonScreens(lesson)) {
        if (screen.type !== "recap") continue;
        const pieces = ((screen.payload as { piecesUsed?: string[] }).piecesUsed ?? []).map(fold);
        assert(
          new Set(pieces).size === pieces.length,
          `${lesson.id} lists a piece twice in its recap`,
        );
      }
    }
  });
});

describe("a chip cannot show a piece it was not given", () => {
  const chip = readFileSync(join(process.cwd(), "components/ui/PieceChip.tsx"), "utf8");

  test("French is not capped at one line", () => {
    // The correctness half. "je suis" truncated to "je" is not a degraded chip;
    // it is a different chunk, and the learner owns both.
    const french = chip.slice(chip.indexOf("frenchSerif(14)") - 200, chip.indexOf("frenchSerif(14)") + 120);
    assert(
      !french.includes("numberOfLines"),
      "the French line must be allowed to wrap rather than be cut into another piece",
    );
  });

  test("the label may still be capped, because it is a hint and not the piece", () => {
    assert(chip.includes("numberOfLines={1}"), "the English label still caps at one line");
  });

  test("width follows content and stops at the row", () => {
    assert(chip.includes('maxWidth: "100%"'), "a long piece must wrap inside the row, not overflow it");
    assert(chip.includes('alignSelf: "flex-start"'), "a chip must not stretch to fill its row");
  });
});
