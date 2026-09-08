/**
 * The founder APK stops at the end of the finished slice.
 *
 * L1-L10 is the range that went through the production budget. The v1 path runs
 * one linear unlock over L1-L24, so before this boundary existed, finishing L10
 * opened L11 and walked the most diligent tester out of the densest content in
 * the build and into the thinnest. This file pins the boundary, and pins that it
 * is a BUILD boundary: nothing is deleted, no stage but dev-apk is affected, and
 * the unlock rule itself is untouched.
 *
 * Stage resolution happens at module-evaluation time from EXPO_PUBLIC_PRODUCT_STAGE,
 * so per-stage claims read the static map and only the dev-apk claim forces env.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";

// `config/productStage` is imported dynamically INSIDE each test, never at the
// top level. A top-level import evaluates and caches the module — resolving
// PRODUCT_STAGE once — before devApkScope.test can force EXPO_PUBLIC_PRODUCT_STAGE
// and re-import it, which would break that guard from a distance.
const stageConfig = () => import("../../config/productStage");

const src = (rel: string) =>
  readFileSync(join(process.cwd(), rel), "utf8");

/** The path screen's own filter + unlock, replayed over a set of finished numbers. */
function journeyRows(maxLesson: number, done: ReadonlySet<number>) {
  const lessons = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= maxLesson).sort(
    (a, b) => a.number - b.number,
  );
  let prevDone = true;
  return lessons.map((lesson) => {
    const isDone = done.has(lesson.number);
    const available = prevDone;
    prevDone = isDone;
    return { number: lesson.number, done: isDone, available };
  });
}

describe("founder slice boundary", () => {
  test("the dev-apk Journey exposes only L1-L10", async () => {
    const prev = process.env.EXPO_PUBLIC_PRODUCT_STAGE;
    process.env.EXPO_PUBLIC_PRODUCT_STAGE = "dev-apk";
    try {
      const config = await import("../../config/productStage");
      assert(config.PRODUCT_STAGE === "dev-apk", "stage forcing failed");
      assertEqual(config.V1_PATH_MAX_LESSON, 10, "dev-apk slice ceiling moved");

      const rows = journeyRows(config.V1_PATH_MAX_LESSON, new Set());
      assertEqual(rows.length, 10, "dev-apk Journey should show exactly ten rows");
      assertEqual(rows[0].number, 1, "the path must still start at L1");
      assertEqual(rows[rows.length - 1].number, 10, "the path must end at L10");
      assert(
        !rows.some((r) => r.number > 10),
        "a lesson past the slice reached the dev-apk Journey",
      );
    } finally {
      if (prev === undefined) delete process.env.EXPO_PUBLIC_PRODUCT_STAGE;
      else process.env.EXPO_PUBLIC_PRODUCT_STAGE = prev;
    }
  });

  test("finishing L10 does not open L11", async () => {
    const { V1_PATH_MAX_LESSON_BY_STAGE } = await stageConfig();
    // The failure this whole boundary exists to prevent. L11 must not appear as
    // a row at all, so there is nothing for the unlock rule to make available.
    const finishedEverything = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const rows = journeyRows(V1_PATH_MAX_LESSON_BY_STAGE["dev-apk"], finishedEverything);
    assert(
      !rows.some((r) => r.number === 11),
      "L11 appeared on the dev-apk path after L10 was finished",
    );
    assert(
      rows.every((r) => r.done),
      "every row in the slice should read as finished",
    );
    // Which is what puts the path into its existing end state, rather than a
    // new screen: nothing is available and nothing is ahead.
    assert(
      !rows.some((r) => !r.done && r.available),
      "something was still offered after the slice was finished",
    );
  });

  test("L1-L10 progression itself is unchanged", async () => {
    const { V1_PATH_MAX_LESSON_BY_STAGE } = await stageConfig();
    const max = V1_PATH_MAX_LESSON_BY_STAGE["dev-apk"];

    const fresh = journeyRows(max, new Set());
    assert(fresh[0].available, "L1 must be open on a fresh install");
    assert(
      fresh.slice(1).every((r) => !r.available),
      "only L1 may be open before anything is finished",
    );

    // n+1 opens when n is finished, all the way to the ceiling.
    for (let n = 1; n <= max - 1; n += 1) {
      const done = new Set(Array.from({ length: n }, (_, i) => i + 1));
      const rows = journeyRows(max, done);
      const next = rows.find((r) => r.number === n + 1);
      assert(next !== undefined, `L${n + 1} missing from the path`);
      assert(next?.available === true, `finishing L${n} did not open L${n + 1}`);
    }
  });

  test("no other stage is touched", async () => {
    const { V1_PATH_MAX_LESSON_BY_STAGE } = await stageConfig();
    // The boundary is one stage's build scope. Sandbox and public-beta keep the
    // full authored path, so this change cannot quietly become a product rule.
    assertEqual(V1_PATH_MAX_LESSON_BY_STAGE.sandbox, 24, "sandbox lost lessons");
    assertEqual(
      V1_PATH_MAX_LESSON_BY_STAGE["public-beta"],
      24,
      "public-beta lost lessons",
    );
  });

  test("no lesson data was deleted to draw the boundary", () => {
    // A slice boundary hides; it does not remove. The ceiling moves when the
    // content behind it is ready, and that is only possible if it still exists.
    const numbers = V1_LESSONS.map((l) => l.number);
    for (let n = 11; n <= 24; n += 1) {
      assert(numbers.includes(n), `L${n} is missing from the authored corpus`);
    }
  });

  test("the path screen filters through the shared predicate", () => {
    const path = src("app/(tabs)/index.tsx");
    assert(
      path.includes("isV1LessonInStageScope"),
      "the path screen no longer uses the stage-scope predicate",
    );
    assert(
      !/l\.number\s*>=\s*1\s*&&\s*l\.number\s*<=\s*24/.test(path),
      "the path screen still hardcodes a 24-lesson range",
    );
  });

  test("a deep link cannot reach past the boundary", () => {
    // Otherwise the Journey draws a line the URL bar walks straight through.
    const route = src("app/v1-lesson/[id].tsx");
    assert(
      route.includes("isV1LessonInStageScope"),
      "the direct lesson route does not apply the stage scope",
    );
  });

  test("the predicate itself agrees with the resolved ceiling", async () => {
    const { isV1LessonInStageScope } = await stageConfig();
    assert(isV1LessonInStageScope(1), "L1 must always be in scope");
    assert(!isV1LessonInStageScope(0), "L0 is the bridge, never a path lesson");
    assert(!isV1LessonInStageScope(25), "there is no L25 to be in scope");
  });
});
