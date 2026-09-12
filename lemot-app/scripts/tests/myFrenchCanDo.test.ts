/**
 * My French claims only what the learner has actually done.
 *
 * ── THE CLAIM THIS PINS DOWN ───────────────────────────────────────────────
 *
 * "My journey" listed a lesson's canDo line for every id in
 * `reachedLessonIds`, which the runtime documents as "lesson ids with real
 * learner evidence" — one event is enough. So opening Lesson 5, answering a
 * single thing and closing the app earned the learner Lesson 5's full promise,
 * in the lesson's own confident words.
 *
 * The rule is now the lesson's own definition of what it installs, checked
 * against the engine's own answer to "did they produce this?".
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { createEmptyMasterySnapshot, emptyProductionEvidence } from "../../content/learning-engine/mastery";
import type { ItemMastery, MasterySnapshot } from "../../content/learning-engine/mastery";
import { lessonCanDoIsEarned, selectCanDoLines } from "../../content/my-french/canDo";
import type { Lesson } from "../../content/lessonTypes";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const lessons = V1_LESSONS as unknown as Lesson[];

/** A snapshot in which the named items have been produced, and nothing else. */
function producedSnapshot(
  produced: readonly string[],
  channel: "independent" | "supported" = "independent",
): MasterySnapshot {
  const snapshot = createEmptyMasterySnapshot();
  const items: Record<string, ItemMastery> = {};
  for (const itemId of produced) {
    const production = emptyProductionEvidence();
    production[channel].attempts = 1;
    production[channel].success = 1;
    items[itemId] = { itemId, production } as unknown as ItemMastery;
  }
  return { ...snapshot, items };
}

/** A lesson that declares demands, for the rule tests. */
const withDemands = lessons.find(
  (l) => (l.acquisitionDemandItemIds ?? []).length >= 2 && typeof (l as { canDo?: string }).canDo === "string",
)!;

describe("a canDo line has to be earned", () => {
  test("a learner who has produced nothing is told nothing", () => {
    const lines = selectCanDoLines({ lessons, snapshot: createEmptyMasterySnapshot() });
    assert(lines.length === 0, `${lines.length} lines were claimed with no evidence at all`);
  });

  test("touching a lesson is not doing what it promises", () => {
    // The defect, restated as a test: evidence EXISTS for this lesson (one of
    // its demands has been produced) and the claim must still not be made.
    const demands = withDemands.acquisitionDemandItemIds ?? [];
    const partial = producedSnapshot(demands.slice(0, demands.length - 1));
    assert(
      !lessonCanDoIsEarned(withDemands, partial),
      `${withDemands.id} claimed its whole ability on partial evidence`,
    );
  });

  test("producing everything it teaches earns it", () => {
    const whole = producedSnapshot(withDemands.acquisitionDemandItemIds ?? []);
    assert(lessonCanDoIsEarned(withDemands, whole), `${withDemands.id} refused earned evidence`);
    const lines = selectCanDoLines({ lessons: [withDemands], snapshot: whole });
    assert(lines.length === 1, "the earned line must appear");
    assert(
      lines[0].text === String((withDemands as { canDo?: string }).canDo),
      "and it must be the lesson's own words, unchanged",
    );
  });

  test("supported production counts", () => {
    // A learner who produced the French with the lesson's own scaffolding in
    // front of them did produce it. Demanding `independent` would empty the
    // journey for most of A1 and would quietly redefine the lesson's promise
    // as something harder than the lesson taught.
    const supported = producedSnapshot(withDemands.acquisitionDemandItemIds ?? [], "supported");
    assert(lessonCanDoIsEarned(withDemands, supported), "supported production is production");
  });

  test("a lesson that declares nothing claims nothing", () => {
    // "Every demand is met" is vacuously true of an empty list. L10 declares
    // none today, being the capstone, and must not be handed a free claim by a
    // quantifier.
    const silent = lessons.filter((l) => (l.acquisitionDemandItemIds ?? []).length === 0);
    assert(silent.length > 0, "expected at least one lesson with no declared demands");
    for (const lesson of silent) {
      assert(
        !lessonCanDoIsEarned(lesson, createEmptyMasterySnapshot()),
        `${lesson.id} claimed an ability it never declared`,
      );
      // And not even when everything in the product has been produced.
      const everything = producedSnapshot(
        lessons.flatMap((l) => l.acquisitionDemandItemIds ?? []),
      );
      assert(
        !lessonCanDoIsEarned(lesson, everything),
        `${lesson.id} claimed an ability it never declared, on full evidence`,
      );
    }
  });

  test("the order is the lessons', not the evidence's", () => {
    const all = producedSnapshot(lessons.flatMap((l) => l.acquisitionDemandItemIds ?? []));
    const lines = selectCanDoLines({ lessons, snapshot: all });
    const order = lines.map((l) => l.lessonId);
    const authored = lessons.filter((l) => order.includes(l.id)).map((l) => l.id);
    assert(
      order.join(",") === authored.join(","),
      "the journey must read in the order the lessons were authored",
    );
  });
});

describe("the surface no longer reads reach", () => {
  const route = codeOf(read("app/(tabs)/my-french.tsx"));

  test("reachedLessonIds is gone from the journey", () => {
    assert(
      !route.includes("reachedLessonIds"),
      "touching a lesson must not be able to earn a claim again",
    );
    assert(route.includes("selectCanDoLines"), "the claim comes from the pure selector");
  });

  test("nothing on the screen invents a number", () => {
    // Every section here is a reflection of evidence that already exists. A
    // rate, a percentage or a projection would be a claim nobody measured.
    for (const invented of ["Math.round(", "percent", "%`", "average", "estimate", "predict"]) {
      assert(!route.includes(invented), `My French must not compute ${invented}`);
    }
  });

  test("and it is still not a profile", () => {
    // Word boundaries, not substrings: an unanchored /xp/i matches the `expo`
    // in an import line and reports gamification that is not there.
    for (const banned of ["streak", "XP", "level", "score", "badge", "rank"]) {
      assert(
        !new RegExp(`\\b${banned}\\b`, "i").test(route),
        `My French must not carry ${banned}`,
      );
    }
  });
});
