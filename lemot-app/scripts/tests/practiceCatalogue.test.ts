/**
 * Every lawful seed can be reached, and no learner is stuck on the same eight.
 *
 * THE MEASUREMENT THIS CAME FROM. 632 seeds are authored. For a learner who has
 * walked L0-L6, 251 are lawful. Zero seeds anywhere lack a route — the premise
 * that the corpus behaves like hidden validation data turned out to be false.
 * What was true is that the Hub only ever served a SESSION, capped at eight
 * actions, so a learner entitled to 251 practices could see 3.2% of them.
 *
 * So the fix is a door, not a routing overhaul, and these rules guard the door:
 * it must reach everything, it must not repeat itself, and it must not hand
 * over anything the learner has not reached.
 */
import { describe, test, assert } from "./harness";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import { V1_LESSONS } from "../../content/lessons/v1";
import { seedIsLawfulFor } from "../../content/practice/practicePlanner";
import {
  catalogueOrder,
  cataloguePage,
  catalogueCard,
} from "../../content/practice/practiceCatalogue";
import type { PracticeSeed } from "../../content/practice/practiceTypes";

const seeds = PRACTICE_SEEDS as readonly PracticeSeed[];

function reachedThrough(lastLesson: number) {
  const lessons = V1_LESSONS.filter((l) => l.number <= lastLesson);
  const items = new Set<string>();
  for (const lesson of lessons) for (const i of lesson.learningItems ?? []) items.add(i.id);
  return { items, lessons: new Set(lessons.map((l) => l.id)) };
}
const r6 = reachedThrough(6);
const lawful6 = seeds.filter((s) => seedIsLawfulFor(s, r6.items, r6.lessons));

describe("the corpus is real and the funnel is what the diagnostic says", () => {
  test("there are hundreds of authored seeds", () => {
    assert(seeds.length >= 600, `only ${seeds.length} seeds authored`);
  });

  test("an L0-L6 learner is entitled to far more than one session", () => {
    assert(lawful6.length >= 200, `only ${lawful6.length} lawful after L6`);
  });

  test("no seed is orphaned once its lesson is reached", () => {
    // The claim the audit was asked to test. It holds: lawfulness is origin
    // lesson plus required items, and every authored seed satisfies both once
    // the learner has walked its lesson.
    const r10 = reachedThrough(10);
    const unreachable = seeds.filter((s) => !seedIsLawfulFor(s, r10.items, r10.lessons));
    assert(
      unreachable.length === 0,
      `${unreachable.length} seeds have no route even after L10:\n${unreachable
        .slice(0, 8)
        .map((s) => `  ${s.id}`)
        .join("\n")}`,
    );
  });
});

describe("browsing reaches the whole pool", () => {
  test("paging through gets to every lawful seed exactly once", () => {
    // The starvation test, done exhaustively rather than by sampling: walk the
    // cursor to the end and check the set that came out equals the set that
    // went in.
    const seen: string[] = [];
    let cursor: number | null = 0;
    let guard = 0;
    while (cursor !== null && guard < 500) {
      const page = cataloguePage(lawful6, "learner-a", cursor);
      for (const s of page.seeds) seen.push(s.id);
      cursor = page.nextCursor;
      guard += 1;
    }
    assert(cursor === null, "paging must terminate");
    assert(
      seen.length === lawful6.length,
      `browse yielded ${seen.length} of ${lawful6.length} lawful seeds`,
    );
    assert(new Set(seen).size === seen.length, "a seed must not appear on two pages");
  });

  test("a page is a page, not the whole corpus dumped at once", () => {
    // §37: this list is rendered on a phone.
    const page = cataloguePage(lawful6, "learner-a");
    assert(page.seeds.length <= 12, `first page holds ${page.seeds.length}`);
    assert(page.total === lawful6.length, "the total behind the page is reported honestly");
  });
});

describe("different learners do not all start at seed one", () => {
  test("the key changes where the pool begins", () => {
    const a = cataloguePage(lawful6, "learner-a").seeds.map((s) => s.id);
    const b = cataloguePage(lawful6, "learner-b").seeds.map((s) => s.id);
    assert(a.join() !== b.join(), "two learners must not open on an identical first page");
  });

  test("the same learner sees a stable order", () => {
    // Variety must not come from randomness, or a learner loses their place
    // every render and no test can assert anything.
    const first = catalogueOrder(lawful6, "learner-a").map((s) => s.id);
    const again = catalogueOrder(lawful6, "learner-a").map((s) => s.id);
    assert(first.join() === again.join(), "browse order must be deterministic");
  });

  test("rotation keeps the pool intact", () => {
    // Rotating rather than shuffling means authored runs stay together AND
    // nothing can be dropped, which is what makes the exhaustive test above
    // meaningful.
    const rotated = catalogueOrder(lawful6, "whoever").map((s) => s.id).sort();
    const original = lawful6.map((s) => s.id).sort();
    assert(rotated.join() === original.join(), "rotation must not add or lose a seed");
  });

  test("an empty pool is handled, not crashed into", () => {
    const page = cataloguePage([], "learner-a");
    assert(
      page.seeds.length === 0 && page.nextCursor === null && page.total === 0,
      "an empty pool must page to nothing rather than throw",
    );
  });
});

describe("browsing cannot hand over unreached French", () => {
  test("nothing from a lesson the learner has not walked appears", () => {
    const reachedLessonIds = r6.lessons;
    for (const seed of catalogueOrder(lawful6, "learner-a")) {
      assert(
        reachedLessonIds.has(seed.originLessonId),
        `${seed.id} comes from ${seed.originLessonId}, which this learner has not reached`,
      );
      for (const required of seed.requiredItemIds) {
        assert(
          r6.items.has(required),
          `${seed.id} requires ${required}, which this learner has not reached`,
        );
      }
    }
  });

  test("the catalogue reads no clock, no storage and no snapshot", () => {
    // Determinism is the whole contract. Variety comes from the caller's key.
    const src = require("node:fs").readFileSync(
      require("node:path").join(process.cwd(), "content/practice/practiceCatalogue.ts"),
      "utf8",
    ) as string;
    const code = src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    for (const impurity of ["Math.random", "Date.now", "kvStorage", "snapshot"]) {
      assert(!code.includes(impurity), `the catalogue must not reach for ${impurity}`);
    }
  });
});

describe("a browse card shows the learner something real", () => {
  test("cards come from what the seed already authored", () => {
    // §4: the learner should see actual things they can do, not a backend
    // category label they have to tap before they understand what practice is.
    let withScene = 0;
    for (const seed of lawful6) {
      const card = catalogueCard(seed);
      assert(card.job.length > 0, `${seed.id} has no job to show`);
      if (card.scene) withScene += 1;
    }
    const ratio = withScene / lawful6.length;
    assert(ratio > 0.5, `only ${(ratio * 100).toFixed(0)}% of cards carry a scene`);
  });

  test("nothing is invented for a seed that authored nothing", () => {
    const bare = { exercise: { payload: {} } } as unknown as PracticeSeed;
    const card = catalogueCard(bare);
    assert(card.scene === null, "a missing scene stays missing rather than being written");
    assert(card.job === "Practise this", "and the job falls back rather than being generated");
  });
});
