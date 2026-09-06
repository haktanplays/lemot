/**
 * Practice product audit — reporting only, no assertions.
 *
 * Answers the questions a passing test suite cannot: how much of the pool a
 * real learner ever meets, whether a second session differs from the first,
 * and whether territories produce distinguishable sessions.
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
import {
  planPracticeSession,
  reachedLessonIds,
  type PracticeSessionAction,
} from "../content/practice/practicePlanner";
import {
  PRACTICE_HUB_SURFACE,
  practiceBuildAttempt,
  practiceChoiceAttempt,
  practiceTypedAttempt,
} from "../content/practice/practiceInteractions";
import { PRACTICE_SESSION_LESSON_ID } from "../content/practice/practiceIdentity";
import { territoryLabels } from "../content/practice/practiceCopy";
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

async function learner(lessonNumbers: number[], missIds: string[] = []) {
  const repo = new LocalRepository(memoryKv() as never);
  const runtime = createLearningEngineRuntime({
    repository: repo, appBuild: "audit", deviceInfo: { platform: "audit" },
    makeSessionId: () => "s",
  });
  const miss = new Set(missIds);
  let t = 0;
  for (const n of lessonNumbers) {
    const lesson = V1_LESSONS.find((l) => l.number === n) as Lesson;
    const c = runtime.createSessionController({
      lessonId: lesson.id, contentVersion: lesson.version,
      resolveEventSurface: makeRegisteredEventSurface("lesson_path"),
      now: () => NOW + (t += 1000), makeClientEventId: () => `e-${t}`,
    });
    for (const screen of flattenLessonScreens(lesson)) {
      if (screen.type === "fill-with-traps") {
        const o = miss.has(screen.id)
          ? screen.payload.options.find((x) => !x.isCorrect)
          : screen.payload.options.find((x) => x.isCorrect);
        if (o) c.recordGradedAttempt(choiceInteraction(lesson, screen, { optionId: o.id }));
      } else if (screen.type === "weave") {
        c.recordGradedAttempt(typedAttemptInteraction(lesson, screen, {
          text: miss.has(screen.id) ? "zzz" : screen.payload.expectedAnswers[0],
          hintRung: 0, constitutiveSupportRendered: false,
        }));
      }
    }
    await c.flush();
  }
  return { repo, runtime };
}

async function state(repo: LocalRepository) {
  const events = await repo.readAllEvents();
  const seedHistory = new Map<string, number>();
  for (const e of events) {
    const id = (e as { exerciseId?: string }).exerciseId;
    if (typeof id === "string" && id.startsWith("practice/")) {
      const seedId = id.slice("practice/".length);
      const at = (e as { timestamp?: number }).timestamp ?? 0;
      if (at >= (seedHistory.get(seedId) ?? -1)) seedHistory.set(seedId, at);
    }
  }
  return { snapshot: scoreEvents(events), lessons: reachedLessonIds(events), seedHistory };
}

async function plan(repo: LocalRepository, now: number, budget = 6) {
  const s = await state(repo);
  return planPracticeSession({
    snapshot: s.snapshot, reachedLessons: s.lessons, seedHistory: s.seedHistory,
    items: ITEMS, lessons: V1_LESSONS, seeds: PRACTICE_SEEDS, now, budget,
  });
}

/** Play a planned session correctly, writing real practice evidence. */
async function play(repo: LocalRepository, actions: readonly PracticeSessionAction[], now: number) {
  const runtime = createLearningEngineRuntime({
    repository: repo, appBuild: "audit", deviceInfo: { platform: "audit" },
    makeSessionId: () => `p-${now}`,
  });
  let t = 0;
  const c = runtime.createSessionController({
    lessonId: PRACTICE_SESSION_LESSON_ID, contentVersion: "practice-pool-v1",
    resolveEventSurface: PRACTICE_HUB_SURFACE,
    now: () => now + (t += 1000), makeClientEventId: () => `pe-${now}-${t}`,
  });
  for (const a of actions) {
    const origin = V1_LESSONS.find((l) => l.id === a.seed.originLessonId) as Lesson;
    if (a.seed.exercise.type === "fill-with-traps") {
      const correct = a.seed.exercise.payload.options.find((o) => o.isCorrect);
      if (correct) c.recordGradedAttempt(practiceChoiceAttempt(a.seed, origin, { optionId: correct.id }));
    } else if (a.seed.exercise.type === "practice-build") {
      const order = a.seed.exercise.payload.tiles
        .map((tile, i) => ({ tile, i }))
        .filter((x) => x.tile.answerIndex !== undefined)
        .sort((x, y) => (x.tile.answerIndex as number) - (y.tile.answerIndex as number))
        .map((x) => x.i);
      c.recordGradedAttempt(practiceBuildAttempt(a.seed, origin, { picked: order }));
    } else {
      c.recordGradedAttempt(practiceTypedAttempt(a.seed, origin, {
        text: a.seed.exercise.payload.expectedAnswers[0],
        hintRung: 0, constitutiveSupportRendered: false,
      }));
    }
  }
  await c.flush();
}

const line = (a: PracticeSessionAction, i: number) =>
  `  ${i + 1}.${a.moment ? "*" : " "} ${a.seed.surface.padEnd(10)} ${a.seed.operation.padEnd(9)}` +
  `${a.seed.difficulty.padEnd(7)} ${a.path.padEnd(9)} L${String(Number(a.seed.originLessonId.slice(-3))).padEnd(2)} ${a.seed.id}`;

async function run() {
  // ── consecutive sessions on one history ─────────────────────────────────
  console.log("=== CONSECUTIVE SESSIONS (L1-L6 history, played through) ===");
  const { repo } = await learner([1, 2, 3, 4, 5, 6]);
  for (let i = 0; i < 4; i += 1) {
    const now = NOW + DAY * (40 + i);
    const p = await plan(repo, now);
    console.log(`\n-- session ${i + 1}: ${p.actions.length} actions | territories: ${territoryLabels(p.actions).join(" / ")}`);
    p.actions.forEach((a, n) => console.log(line(a, n)));
    await play(repo, p.actions, now);
  }

  // ── pool reachability ───────────────────────────────────────────────────
  console.log("\n\n=== POOL REACHABILITY (full L1-L10 history) ===");
  const { repo: rich } = await learner([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const seen = new Set<string>();
  const itemPicks: Record<string, number> = {};
  const surfaceCount: Record<string, number> = {};
  const SESSIONS = Number(process.env.SESSIONS ?? 12);
  for (let i = 0; i < SESSIONS; i += 1) {
    const now = NOW + DAY * (40 + i);
    const p = await plan(rich, now);
    for (const a of p.actions) {
      seen.add(a.seed.id);
      itemPicks[a.itemId] = (itemPicks[a.itemId] ?? 0) + 1;
      surfaceCount[a.seed.surface] = (surfaceCount[a.seed.surface] ?? 0) + 1;
    }
    await play(rich, p.actions, now);
  }
  console.log(`sessions: ${SESSIONS}`);
  console.log(`seeds ever offered: ${seen.size} of ${PRACTICE_SEEDS.length}`);
  console.log(`surface mix across 12 sessions: ${JSON.stringify(surfaceCount)}`);
  const never = PRACTICE_SEEDS.filter((s) => !seen.has(s.id));
  const byLesson: Record<string, number> = {};
  for (const s of never) {
    const k = `L${Number(s.originLessonId.slice(-3))}`;
    byLesson[k] = (byLesson[k] ?? 0) + 1;
  }
  console.log(`never offered: ${never.length} — by territory ${JSON.stringify(byLesson)}`);
  const neverSurface: Record<string, number> = {};
  for (const s of never) neverSurface[s.surface] = (neverSurface[s.surface] ?? 0) + 1;
  console.log(`never offered by surface: ${JSON.stringify(neverSurface)}`);

  const allItems = new Set(PRACTICE_SEEDS.flatMap((x) => x.targetItemIds));
  const picked = Object.keys(itemPicks);
  console.log(`\nITEMS: ${picked.length} of ${allItems.size} ever selected`);
  const nevers = [...allItems].filter((i) => !(i in itemPicks));
  console.log(`  never selected (${nevers.length}): ${nevers.join(", ")}`);
  const top = Object.entries(itemPicks).sort((a, b) => b[1] - a[1]).slice(0, 8);
  console.log(`  most-picked: ${top.map(([k, v]) => k + "=" + v).join("  ")}`);
}
void run();

// ── micro-moment reliability ────────────────────────────────────────────────
// Reporting only: how often an eligible session actually receives a scene, and
// whether one scene dominates a learner who practises every day.
async function momentReport(lessons: number[], label: string, count: number) {
  const { repo } = await learner(lessons);
  const tally: Record<string, number> = {};
  const without: string[] = [];
  let carried = 0;

  for (let i = 0; i < count; i += 1) {
    const now = NOW + DAY * (40 + i);
    const p = await plan(repo, now);
    const moment = p.actions.find((a) => a.moment)?.moment;
    if (moment) {
      carried += 1;
      tally[moment.id] = (tally[moment.id] ?? 0) + 1;
    } else {
      without.push(p.actions.map((a) => a.itemId).join(" "));
    }
    await play(repo, p.actions, now);
  }

  console.log(`\n-- ${label}: ${carried} of ${count} sessions carried a scene`);
  console.log(`   which scene: ${JSON.stringify(tally)}`);
  for (const items of without) console.log(`   none, session worked: ${items}`);
}

if (process.env.MOMENTS) {
  void (async () => {
    console.log("=== MICRO-MOMENT RELIABILITY ===");
    await momentReport([1], "L1-only learner", 5);
    await momentReport([1, 2, 3, 4, 5, 6], "mid-path learner", 5);
    await momentReport([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "rich L1-L10 learner", 8);
  })();
}
