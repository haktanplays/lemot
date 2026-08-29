/**
 * Showcase contracts for L1-L10.
 *
 * The Showcase is the only lesson screen that shows the learner language
 * without asking for anything, which makes it the easiest surface to abuse:
 * padding it with lexical swaps would inflate every breadth report while
 * teaching nothing, and letting an exposure line become a graded answer would
 * quietly demand French the lesson never taught. Both are checked here.
 *
 * What is NOT here: any attempt to judge semantic uniqueness automatically. A
 * classifier that guessed whether two sentences are "the same idea" would be
 * wrong often and trusted anyway. The wrapper/lexical checks below are the
 * mechanical part; the judgment part lives in authoring and in the hand-made
 * architecture inventory in corpusClosure.test.ts.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import type { Lesson, ShowcaseScreen, ShowcaseSentence } from "../../content/lessonTypes";

const PATH: readonly Lesson[] = V1_LESSONS.filter(
  (l) => l.number >= 1 && l.number <= 10,
).sort((a, b) => a.number - b.number);

const showcaseOf = (lesson: Lesson): ShowcaseScreen | undefined =>
  lesson.screens.find((s): s is ShowcaseScreen => s.type === "showcase");

const rowsOf = (lesson: Lesson): ShowcaseSentence[] =>
  showcaseOf(lesson)?.payload.clusters.flatMap((c) => c.sentences) ?? [];

const norm = (t: string): string =>
  t
    .replace(/[‘’]/g, "'")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,!?;:]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/** Politeness/opener/closer wrappers that must never create apparent breadth. */
const WRAPPERS = [
  "bonjour",
  "excusez-moi",
  "merci",
  "s'il vous plait",
  "au revoir",
  "oui",
  "non",
  "pardon",
];

/** A sentence stripped of its wrappers, for the anti-inflation check. */
function core(sentence: string): string {
  let out = norm(sentence);
  for (const w of WRAPPERS) {
    out = out.split(w).join(" ");
  }
  return out.replace(/\s+/g, " ").trim();
}

describe("every L1-L10 lesson opens on a language world", () => {
  for (const lesson of PATH) {
    test(`${lesson.id} has a showcase, and it is the first screen`, () => {
      const showcase = showcaseOf(lesson);
      assert(showcase !== undefined, `${lesson.id} has no showcase`);
      assertEqual(lesson.screens[0].type, "showcase", `${lesson.id} opens on it`);
    });
  }

  test("no lesson ships more than one showcase", () => {
    for (const lesson of PATH) {
      const count = lesson.screens.filter((s) => s.type === "showcase").length;
      assertEqual(count, 1, `${lesson.id} ships ${count} showcases`);
    }
  });
});

describe("showcase breadth is real, not padded", () => {
  // Fifteen is the floor the rebuild was given. It is a floor and not a target:
  // a lesson may show more where its world supports it, and L6/L10 do.
  const FLOOR = 15;

  for (const lesson of PATH) {
    test(`${lesson.id} shows at least ${FLOOR} sentences`, () => {
      const n = rowsOf(lesson).length;
      assert(n >= FLOOR, `${lesson.id} shows ${n}`);
    });
  }

  test("no showcase repeats a sentence", () => {
    for (const lesson of PATH) {
      const seen = new Set<string>();
      for (const row of rowsOf(lesson)) {
        const key = norm(row.fr);
        assert(!seen.has(key), `${lesson.id} repeats "${row.fr}"`);
        seen.add(key);
      }
    }
  });

  test("no showcase is mostly the same sentence wearing different wrappers", () => {
    // The anti-inflation check, mechanised as far as it honestly can be: strip
    // bonjour / excusez-moi / merci / s'il vous plaît / oui / non, and count
    // what is left. If a 16-line showcase collapses to four distinct cores, it
    // was padded with politeness, not built.
    for (const lesson of PATH) {
      const rows = rowsOf(lesson);
      const cores = new Set(rows.map((r) => core(r.fr)).filter((c) => c.length > 0));
      assert(
        cores.size >= Math.ceil(rows.length * 0.6),
        `${lesson.id}: ${rows.length} rows collapse to ${cores.size} distinct cores once wrappers are removed`,
      );
    }
  });
});

describe("showcase roles are honest", () => {
  test("every row declares a valid role", () => {
    for (const lesson of PATH) {
      for (const row of rowsOf(lesson)) {
        assert(
          ["core", "supported", "exposure"].includes(row.role),
          `${lesson.id}: "${row.fr}" has role ${JSON.stringify(row.role)}`,
        );
        assert(row.en.trim().length > 0, `${lesson.id}: "${row.fr}" has no meaning`);
      }
    }
  });

  test("every lesson carries core language it will actually teach", () => {
    for (const lesson of PATH) {
      const core = rowsOf(lesson).filter((r) => r.role === "core").length;
      assert(core >= 3, `${lesson.id} declares only ${core} core rows`);
    }
  });

  test("EXPOSURE never becomes a graded answer", () => {
    // The load-bearing rule of the exposure tier. A showcase may enlarge the
    // French world freely precisely BECAUSE nothing in it can be demanded; the
    // moment an exposure line turns up as an expected weave answer, a fill's
    // correct option or a say-it model, the lesson is grading French it never
    // taught.
    for (const lesson of PATH) {
      const exposure = new Set(
        rowsOf(lesson)
          .filter((r) => r.role === "exposure")
          .map((r) => norm(r.fr)),
      );
      if (exposure.size === 0) continue;
      for (const screen of lesson.screens) {
        const p = screen.payload as Record<string, unknown>;
        const graded: string[] = [];
        for (const a of (p.expectedAnswers as string[] | undefined) ?? []) graded.push(a);
        if (typeof p.modelAnswer === "string") graded.push(p.modelAnswer);
        for (const o of (p.options as Array<{ text?: string; isCorrect?: boolean }> | undefined) ??
          []) {
          if (o.isCorrect === true && typeof o.text === "string") graded.push(o.text);
        }
        for (const g of graded) {
          assert(
            !exposure.has(norm(g)),
            `${lesson.id}/${screen.id} grades "${g}", which its showcase marks exposure`,
          );
        }
      }
    }
  });

  test("showcase item references resolve against the registry", () => {
    for (const lesson of PATH) {
      for (const row of rowsOf(lesson)) {
        for (const id of row.itemIds ?? []) {
          assert(
            Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, id),
            `${lesson.id}: "${row.fr}" names unregistered item ${id}`,
          );
        }
      }
    }
  });
});

describe("the showcase claims no evidence", () => {
  test("no showcase declares targets", () => {
    // It grades nothing and reports nothing. Declaring targets would credit the
    // learner for scrolling, and Practice Hub would later receive a learner who
    // looks competent in items they have only read.
    for (const lesson of PATH) {
      const showcase = showcaseOf(lesson);
      if (showcase === undefined) continue;
      assertEqual(showcase.targetItemIds, undefined, `${lesson.id} showcase declares targets`);
      assertEqual(
        showcase.evidenceTargetItemIds,
        undefined,
        `${lesson.id} showcase declares evidence targets`,
      );
    }
  });

  test("the renderer wires showcase without an evidence callback", () => {
    // Source-level, because there is no component test renderer in this repo.
    const { readFileSync } = require("node:fs") as typeof import("node:fs");
    const { join } = require("node:path") as typeof import("node:path");
    const src = readFileSync(
      join(process.cwd(), "components/lesson-v1/LessonRendererV1.tsx"),
      "utf8",
    );
    const at = src.indexOf('case "showcase":');
    assert(at > 0, "the renderer handles showcase");
    const branch = src.slice(at, src.indexOf('case "meet-card":', at));
    assert(
      !/session\.record/.test(branch),
      "the showcase branch must not record learning evidence",
    );
  });
});
