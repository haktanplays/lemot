/**
 * A result screen should leave the learner with one useful thought.
 *
 * The founder's words for the old behaviour were "Correct. Empty screen." He
 * was describing 50 of the 62 result screens on L1-L10: the reveal rendered a
 * verdict, a model answer and then stopped, because `reveal.explanation` — the
 * "Why it works" note the surface has always been able to show — was authored
 * almost nowhere.
 *
 * The same screens are where the curiosity layer had gone missing. Sound,
 * cognate, usage and culture notes were authored in quantity, but ALL of them
 * lived in Showcase `depth`, behind an optional "Look closer" on the first
 * screen of a lesson. A learner who taps Continue sees none of it, which is
 * exactly what the founder reported after playing the early lessons.
 *
 * So the fix was not a new mechanism. It was authoring the mechanism that
 * already existed, on the path the learner actually walks. These rules keep it
 * a micro-insight rather than a lecture, and stop it decaying into filler.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

type Result = { lesson: Lesson; screen: LessonScreen; note: string | undefined };

function resultScreens(lesson: Lesson): Result[] {
  const out: Result[] = [];
  for (const screen of flattenLessonScreens(lesson)) {
    if (screen.type !== "weave" && screen.type !== "say-it-your-way") continue;
    const reveal = (screen.payload as { reveal?: { explanation?: string } }).reveal;
    out.push({ lesson, screen, note: reveal?.explanation });
  }
  return out;
}

const EARLY = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 3);
const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);

/** Sentences, counted the way a reader counts them. */
const sentenceCount = (s: string) => s.split(/[.!?]+\s+|[.!?]+$/).filter((x) => x.trim()).length;

describe("the lessons the founder walked end with something to keep", () => {
  for (const lesson of EARLY) {
    test(`L${lesson.number} leaves no result screen blank`, () => {
      const blank = resultScreens(lesson).filter((r) => !r.note || r.note.trim().length === 0);
      assert(
        blank.length === 0,
        `these end on a verdict and nothing else:\n${blank.map((r) => `  ${r.screen.id}`).join("\n")}`,
      );
    });
  }

  test("the corpus as a whole moved, not just three lessons", () => {
    const all = PATH.flatMap(resultScreens);
    const withNote = all.filter((r) => r.note && r.note.trim().length > 0);
    // Was 12 of 62. This is a ratchet on the direction of travel, not a quota:
    // L4-L10 are deliberately still short of L1-L3 and are the next pass.
    assert(
      withNote.length >= 28,
      `only ${withNote.length} of ${all.length} result screens carry a note`,
    );
  });
});

describe("a micro-insight stays micro", () => {
  const all = PATH.flatMap(resultScreens).filter((r) => r.note);

  test("one thought, not a grammar chapter", () => {
    const long = all.filter((r) => sentenceCount(r.note as string) > 3);
    assert(
      long.length === 0,
      `these read as documentation rather than a note:\n${long
        .map((r) => `  ${r.lesson.id}/${r.screen.id}: ${sentenceCount(r.note as string)} sentences`)
        .join("\n")}`,
    );
  });

  test("it never just repeats the answer back", () => {
    // "No redundant paraphrase of the answer." A note whose whole content is
    // the model sentence teaches nothing the screen above it did not.
    const fold = (s: string) =>
      s.normalize("NFC").toLowerCase().replace(/[.!?,;:«»"'’]/g, " ").replace(/\s+/g, " ").trim();
    for (const r of all) {
      const p = r.screen.payload as { expectedAnswers?: string[]; modelAnswer?: string };
      const answers = [...(p.expectedAnswers ?? []), p.modelAnswer].filter(
        (a): a is string => typeof a === "string" && a.length > 0,
      );
      for (const answer of answers) {
        assert(
          fold(r.note as string) !== fold(answer),
          `${r.lesson.id}/${r.screen.id}: the note is the answer again`,
        );
      }
    }
  });

  test("no praise, no scoring, no reward language", () => {
    const BANNED = ["well done", "great", "perfect", "amazing", "nice work", "correct!", "excellent"];
    for (const r of all) {
      const lower = (r.note as string).toLowerCase();
      for (const word of BANNED) {
        assert(!lower.includes(word), `${r.lesson.id}/${r.screen.id} congratulates instead of teaching`);
      }
    }
  });

  test("a lesson does not tell the learner the same thing twice", () => {
    // "Avoid repeating the same insight several times in one session."
    for (const lesson of PATH) {
      const notes = resultScreens(lesson)
        .map((r) => r.note)
        .filter((n): n is string => typeof n === "string");
      const seen = new Set(notes.map((n) => n.trim().toLowerCase()));
      assert(
        seen.size === notes.length,
        `${lesson.id} repeats a micro-insight across its result screens`,
      );
    }
  });
});

describe("curiosity reaches the learner without a detour", () => {
  // The audit's finding, kept as a standing check. Showcase depth is good
  // content in a place the normal path does not go: it is on one screen, and
  // collapsed. It stays — Look Closer is the right home for the long version —
  // but it may not be the ONLY home, or the layer is invisible again.
  const FAMILIES = ["sound", "cognate", "notice", "structure", "usage", "compare", "inDepth"] as const;

  test("the depth corpus still exists and is still worth surfacing", () => {
    let items = 0;
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        if (screen.type !== "showcase") continue;
        for (const cluster of screen.payload.clusters) {
          for (const s of cluster.sentences) {
            for (const f of FAMILIES) if (s.depth?.[f]) items += 1;
          }
        }
      }
    }
    assert(items >= 50, `only ${items} depth notes authored; the layer has been thinned`);
  });

  test("the early lessons put curiosity on the walked path too", () => {
    // Specifically: a learner who never opens Look Closer must still meet
    // sound, meaning-origin and usage notes. Checked by content, not by count —
    // each of these three lessons must carry at least one result note that is
    // not purely structural.
    const STRUCTURAL = /\b(ne|pas|goes|sits|between|halves|shape|engine)\b/i;
    for (const lesson of EARLY) {
      const notes = resultScreens(lesson)
        .map((r) => r.note)
        .filter((n): n is string => typeof n === "string");
      assert(
        notes.some((n) => !STRUCTURAL.test(n)),
        `L${lesson.number} teaches only structure on its result screens; sound, origin and usage are the texture that went missing`,
      );
    }
  });

  test("no curiosity note is a graded surface", () => {
    // A micro-insight must never become another thing to get right. It is read
    // after the verdict, it names no target, and viewing it changes nothing.
    for (const lesson of PATH) {
      for (const r of resultScreens(lesson)) {
        if (!r.note) continue;
        const lower = r.note.toLowerCase();
        assert(
          !lower.includes("?") || !/\b(which|what|choose|pick|select)\b/.test(lower),
          `${lesson.id}/${r.screen.id}: the note asks the learner a question instead of telling them something`,
        );
      }
    }
  });
});
