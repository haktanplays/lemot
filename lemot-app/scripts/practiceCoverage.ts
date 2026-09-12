/**
 * Where 632 authored practice seeds go, and how many reach a learner.
 *
 * The founder reports a corpus in the hundreds and sees a handful of options.
 * Both halves are true, and this prints the funnel between them so the gap is
 * evidence rather than an impression.
 *
 * DEVELOPMENT DIAGNOSTIC. Nothing here is learner-facing, no count is ever
 * rendered in the product, and none of this is a quota — it is a report on what
 * the serving path currently does.
 */
import { PRACTICE_SEEDS } from "../content/practice/seeds";
import { V1_LESSONS } from "../content/lessons/v1";
import { seedIsLawfulFor } from "../content/practice/practicePlanner";
import { seedsForMode } from "../content/practice/practiceModes";
import { TODAYS_SET_MAX } from "../content/learning-engine/practice-selector";
import type { PracticeSeed } from "../content/practice/practiceTypes";

/** A learner who has walked L0 through L6, with every item those lessons teach. */
function reachedThrough(lastLesson: number) {
  const lessons = V1_LESSONS.filter((l) => l.number <= lastLesson);
  const items = new Set<string>();
  for (const lesson of lessons) {
    for (const item of lesson.learningItems ?? []) items.add(item.id);
  }
  return { items, lessons: new Set(lessons.map((l) => l.id)) };
}

const seeds = PRACTICE_SEEDS as readonly PracticeSeed[];
const through6 = reachedThrough(6);
const through10 = reachedThrough(10);

const lawful6 = seeds.filter((s) => seedIsLawfulFor(s, through6.items, through6.lessons));
const lawful10 = seeds.filter((s) => seedIsLawfulFor(s, through10.items, through10.lessons));

console.log("PRACTICE SEED FUNNEL\n");
console.log(`authored .................... ${seeds.length}`);
console.log(`lawful after L0-L6 .......... ${lawful6.length}`);
console.log(`lawful after L0-L10 ......... ${lawful10.length}`);
console.log(`served per session (max) .... ${TODAYS_SET_MAX}`);
console.log("");

// What each existing mode can actually reach for an L0-L6 learner.
console.log("REACHABLE PER MODE (L0-L6 learner, before the session cap)");
const emptySnapshot = { version: "v1", items: {}, processedClientEventIds: [], updatedAt: null };
for (const mode of ["freestyle", "errors", "byLesson"] as const) {
  if (mode === "byLesson") {
    for (const lesson of V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 6)) {
      const pool = seedsForMode(mode, { seeds: lawful6, snapshot: emptySnapshot as never, lessonId: lesson.id });
      console.log(`  byLesson ${lesson.title.padEnd(18)} ${pool.length}`);
    }
    continue;
  }
  const pool = seedsForMode(mode, { seeds: lawful6, snapshot: emptySnapshot as never, lessonId: null });
  console.log(`  ${mode.padEnd(28)} ${pool.length}`);
}

// Seeds with no route at all for a learner who has finished the shipped path.
const orphans = seeds.filter((s) => !lawful10.includes(s));
console.log(`\nNO ROUTE even after L0-L10: ${orphans.length}`);
const byLesson = new Map<string, number>();
for (const o of orphans) byLesson.set(o.originLessonId, (byLesson.get(o.originLessonId) ?? 0) + 1);
for (const [k, v] of [...byLesson].sort()) console.log(`  ${k}  ${v}`);

// The headline: how much of what a learner is entitled to they can ever see.
const pct = ((TODAYS_SET_MAX / lawful6.length) * 100).toFixed(1);
console.log(`\nOne session shows at most ${TODAYS_SET_MAX} of ${lawful6.length} lawful seeds (${pct}%).`);
