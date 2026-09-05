/**
 * Plan a session for a synthetic learner and print it.
 *
 * Reporting only. Exists so the session metrics this phase is judged on can be
 * reproduced instead of asserted.
 */
import { V1_LESSONS } from "../content/lessons/v1";
import { ITEM_REGISTRY } from "../content/itemRegistry";
import { flattenLessonScreens } from "../content/lessons/lessonStructure";
import { LocalRepository } from "../content/learning-engine/repository/local";
import { createLearningEngineRuntime } from "../content/learning-engine/runtime";
import { scoreEvents } from "../content/learning-engine/mastery";
import { makeRegisteredEventSurface } from "../content/identity/payloadRegistry";
import {
  choiceInteraction,
  typedAttemptInteraction,
} from "../content/lesson-v1-evidence/interactions";
import { PRACTICE_SEEDS } from "../content/practice/seeds";
import { planPracticeSession, reachedLessonIds } from "../content/practice/practicePlanner";
import { previewLine } from "../content/practice/practiceCopy";
import type { Lesson, LearningItem } from "../content/lessonTypes";

const NOW = 1_800_000_000_000;
const DAY = 86_400_000;
const ITEMS = ITEM_REGISTRY as Readonly<Record<string, LearningItem>>;

function memoryKv() {
  const store = new Map<string, string>();
  return {
    getItem: async (k: string) => store.get(k) ?? null,
    setItem: async (k: string, v: string) => void store.set(k, v),
    removeItem: async (k: string) => void store.delete(k),
  };
}

async function learner(lessonNumbers: number[], missScreenIds: readonly string[] = []) {
  const miss = new Set(missScreenIds);
  const repo = new LocalRepository(memoryKv() as never);
  const runtime = createLearningEngineRuntime({
    repository: repo,
    appBuild: "probe",
    deviceInfo: { platform: "probe" },
    makeSessionId: () => "s",
  });
  let t = 0;
  for (const n of lessonNumbers) {
    const lesson = V1_LESSONS.find((l) => l.number === n) as Lesson;
    const controller = runtime.createSessionController({
      lessonId: lesson.id,
      contentVersion: lesson.version,
      resolveEventSurface: makeRegisteredEventSurface("lesson_path"),
      now: () => NOW + (t += 1000),
      makeClientEventId: () => `e-${t}`,
    });
    for (const screen of flattenLessonScreens(lesson)) {
      if (screen.type === "fill-with-traps") {
        const wanted = miss.has(screen.id)
          ? screen.payload.options.find((o) => !o.isCorrect)
          : screen.payload.options.find((o) => o.isCorrect);
        if (wanted) {
          controller.recordGradedAttempt(
            choiceInteraction(lesson, screen, { optionId: wanted.id }),
          );
        }
      } else if (screen.type === "weave") {
        controller.recordGradedAttempt(
          typedAttemptInteraction(lesson, screen, {
            text: miss.has(screen.id) ? "zzz" : screen.payload.expectedAnswers[0],
            hintRung: 0,
            constitutiveSupportRendered: false,
          }),
        );
      }
    }
    await controller.flush();
  }
  const events = await repo.readAllEvents();
  return { snapshot: scoreEvents(events), lessons: reachedLessonIds(events) };
}

async function show(
  label: string,
  lessonNumbers: number[],
  missScreenIds: readonly string[] = [],
) {
  const l = await learner(lessonNumbers, missScreenIds);
  const plan = planPracticeSession({
    snapshot: l.snapshot,
    reachedLessons: l.lessons,
    items: ITEMS,
    lessons: V1_LESSONS,
    seeds: PRACTICE_SEEDS,
    now: NOW + DAY * 40,
    budget: 6,
  });
  console.log(`\n=== ${label} — ${plan.actions.length} actions`);
  console.log(`preview: "${previewLine(plan.actions)}"`);
  for (const [i, a] of plan.actions.entries()) {
    const family = ITEMS[a.itemId]?.type ?? "?";
    console.log(
      `  ${i + 1}. ${a.seed.surface.padEnd(10)} ${a.seed.operation.padEnd(9)}` +
        ` ${a.seed.difficulty.padEnd(7)} ${family.padEnd(8)} L${Number(
          a.seed.originLessonId.slice(-3),
        )}  ${a.seed.id}`,
    );
  }
  const surfaces = new Set(plan.actions.map((a) => a.seed.surface));
  console.log(`  surfaces: ${surfaces.size} (${[...surfaces].join(", ")})`);
}

/** Which reducer path each reached item sits on, and what that makes reachable. */
async function paths(label: string, lessonNumbers: number[], missScreenIds: string[] = []) {
  const l = await learner(lessonNumbers, missScreenIds);
  const tally: Record<string, number> = {};
  for (const m of Object.values(l.snapshot.items)) {
    tally[m.practiceEligibility] = (tally[m.practiceEligibility] ?? 0) + 1;
  }
  console.log(`\n--- ${label} item paths: ${JSON.stringify(tally)}`);
  // Sweep several session budgets to see everything the state can reach.
  const seen = new Set<string>();
  for (let budget = 5; budget <= 8; budget += 1) {
    for (const plan of [
      planPracticeSession({
        snapshot: l.snapshot, reachedLessons: l.lessons, items: ITEMS,
        lessons: V1_LESSONS, seeds: PRACTICE_SEEDS, now: NOW + DAY * 40, budget,
      }),
    ]) {
      for (const a of plan.actions) seen.add(a.seed.surface);
    }
  }
  console.log(`    surfaces reachable across budgets 5-8: ${[...seen].sort().join(", ")}`);
}

async function main() {
  await show("L1 only", [1]);
  await show("L1-L4", [1, 2, 3, 4]);
  await show("L1-L10 mixed", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // A learner who is actually learning: some things landed, some did not.
  await paths("all-correct L1-L10", [1,2,3,4,5,6,7,8,9,10]);
  await paths("L1-L3 only", [1,2,3]);
  await show("L1-L6, some misses", [1, 2, 3, 4, 5, 6], [
    "s03-fill-polite-verb",
    "s02-fill-verb-in-sandwich",
    "s05-weave-j-ai-faim",
    "s02-fill-have-not-be",
  ]);
}
void main();
