/**
 * PR-08 — Practice Hub selector integration and return leg.
 *
 * The claim under test: an item that entered the shared mastery snapshot
 * through a lesson can RETURN through the Practice Hub — same canonical item
 * identity, same authored payload identity, same event/mastery spine — with
 * only the placement changing to `practice_hub`. The Hub is a projection: it
 * owns no store, schedules nothing of its own, and can never quietly become a
 * second curriculum.
 *
 * HONEST SCOPE NOTE. As throughout this repo, there is no React component test
 * renderer. The pure selector, source resolver, runtime read projection,
 * controller and reducer are tested BEHAVIOURALLY; the route/component wiring
 * (what the Hub screen renders, which callback goes where) is verified at the
 * SOURCE level only, and those tests say so.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, TEST_SANDBOX_SURFACE } from "./helpers";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
  isAssessedEvent,
} from "../../content/learning-engine/events";
import { ATTRIBUTION_SOURCES } from "../../content/learning-engine/evidence-context";
import {
  MASTERY_SNAPSHOT_VERSION,
  createEmptyMasterySnapshot,
  scoreEvents,
  type MasterySnapshot,
} from "../../content/learning-engine/mastery";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import {
  LM_LE_EVENTS_KEY,
  LocalRepository,
} from "../../content/learning-engine/repository/local";
import {
  createLearningEngineRuntime,
  createLearningRuntimeOwner,
  type LearningEngineRuntime,
} from "../../content/learning-engine/runtime";
import type {
  EventSurfaceResolver,
  LearningSessionController,
} from "../../content/learning-engine/session-controller";
import type { LearningRepository } from "../../content/learning-engine/repository/types";
import {
  choiceInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import {
  PRACTICE_DUE_COPY,
  PRACTICE_RETURN_COPY,
  resolvePracticeHubSource,
  selectPracticeHubSet,
} from "../../content/lesson-v1-evidence/practiceHub";
import { TODAYS_SET_MAX, TODAYS_SET_MIN } from "../../content/learning-engine/practice-selector";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { V1_LESSONS } from "../../content/lessons/v1";
import type {
  FillWithTrapsScreen,
  Lesson,
  WeaveScreen,
} from "../../content/lessonTypes";
import type { ItemId } from "../../content/learning-engine/types";
import {
  __resetPrivacyResetEpochForTest,
  bumpPrivacyResetEpoch,
} from "../../lib/privacyResetEpoch";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");
const codeOf = (src: string): string =>
  src
    .split("\n")
    .filter(
      (l) =>
        !l.trim().startsWith("*") && !l.trim().startsWith("//") && !l.trim().startsWith("/*"),
    )
    .join("\n");

const NOW = 1_800_000_000_000;
const lesson000 = V1_LESSONS.find((l) => l.id === "v1-lesson-000") as Lesson;
const lesson001 = V1_LESSONS.find((l) => l.id === "v1-lesson-001") as Lesson;

const LESSON_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "lesson_path",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});
const HUB_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "practice_hub",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

type CountingRepository = LearningRepository & { calls: string[] };
function makeCountingRepository(kv = makeFakeKv()): CountingRepository {
  const inner = new LocalRepository(kv);
  const calls: string[] = [];
  return {
    calls,
    appendEvent: (e) => (calls.push("appendEvent"), inner.appendEvent(e)),
    getPending: () => (calls.push("getPending"), inner.getPending()),
    markSynced: (ids) => (calls.push("markSynced"), inner.markSynced(ids)),
    readAllEvents: () => (calls.push("readAllEvents"), inner.readAllEvents()),
  };
}

function runtimeWith(repo: LearningRepository): LearningEngineRuntime {
  return createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => `sess-${Math.random().toString(36).slice(2, 8)}`,
  });
}

function controllerOn(
  runtime: LearningEngineRuntime,
  lesson: Lesson,
  surface: EventSurfaceResolver,
): LearningSessionController {
  let t = 0;
  let n = 0;
  return runtime.createSessionController({
    lessonId: lesson.id,
    contentVersion: lesson.version,
    resolveEventSurface: surface,
    now: () => NOW + (t += 1_000),
    makeClientEventId: () => `evt-${surface === HUB_SURFACE ? "hub" : "lesson"}-${(n += 1)}`,
  });
}

/**
 * Record one clean lesson-path PRODUCTION of `chunk-je-voudrais` via L1's weave.
 * Production (not a choice) on purpose: recognition success projects to Build,
 * while the return-leg scenarios below need the produced→Stretch path.
 */
async function seedLessonHistory(runtime: LearningEngineRuntime) {
  const weave = lesson001.screens.find(
    (s) => s.id === "s04-weave-cafe-order",
  ) as WeaveScreen;
  const c = controllerOn(runtime, lesson001, LESSON_SURFACE);
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, weave, {
      text: weave.payload.expectedAnswers[0],
      hintRung: 0,
      constitutiveSupportRendered: false,
    }),
  );
  await c.flush();
}

/** A snapshot with chosen eligibility rows, built through the REAL reducer. */
async function snapshotFromLessonWork(runtime: LearningEngineRuntime): Promise<MasterySnapshot> {
  return runtime.readMasterySnapshot();
}

// ── Part A: runtime read projection ─────────────────────────────────────────

describe("runtime read projection", () => {
  test("runtime and controller creation still read nothing", () => {
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    controllerOn(runtime, lesson001, LESSON_SURFACE);
    assertEqual(repo.calls.length, 0, "zero repository calls until an explicit read");
  });

  test("an explicit snapshot read reads exactly once and writes nothing", async () => {
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    const snap = await runtime.readMasterySnapshot();
    assertEqual(repo.calls.join(","), "readAllEvents", "one validated read, no write");
    assertEqual(snap.version, MASTERY_SNAPSHOT_VERSION, "current mastery-v0.3");
    assertEqual(Object.keys(snap.items).length, 0, "empty log → empty projection");
  });

  test("the read is deterministic and idempotent over the same history", async () => {
    const kv = makeFakeKv();
    const runtime = runtimeWith(new LocalRepository(kv));
    await seedLessonHistory(runtime);
    const a = await runtime.readMasterySnapshot();
    const b = await runtime.readMasterySnapshot();
    assertEqual(JSON.stringify(a), JSON.stringify(b), "same history → same snapshot");
  });

  test("a future-version persisted event fails per existing repository policy", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: JSON.stringify([{ schemaVersion: 99, clientEventId: "x" }]),
    });
    const snap = await runtimeWith(new LocalRepository(kv)).readMasterySnapshot();
    // The repository reads an unsupported log as empty (fail-closed, preserved);
    // the projection reflects that rather than inventing rows.
    assertEqual(Object.keys(snap.items).length, 0, "unsupported log → empty projection");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY)?.includes("99"), true, "bytes preserved");
  });

  test("no snapshot cache is written by the read", async () => {
    const kv = makeFakeKv();
    const runtime = runtimeWith(new LocalRepository(kv));
    await seedLessonHistory(runtime);
    await runtime.readMasterySnapshot();
    assertEqual(
      [...kv.map.keys()].sort().join(","),
      "lm_le_events",
      "the event log stays the only key — no cached projection",
    );
  });

  test("neither the raw repository nor a raw event array is exposed", async () => {
    const runtime = runtimeWith(makeCountingRepository());
    for (const forbidden of ["repository", "readAllEvents", "appendEvent", "writeSnapshot"]) {
      assert(
        !(forbidden in (runtime as unknown as Record<string, unknown>)),
        `${forbidden} is not reachable`,
      );
    }
    const snap = await runtime.readMasterySnapshot();
    assert(!("events" in (snap as unknown as Record<string, unknown>)), "no raw event array");
  });
});

// ── Parts C/D: Hub selector ─────────────────────────────────────────────────

describe("practice hub selector", () => {
  const setFor = async (runtime: LearningEngineRuntime, budget = 5) =>
    selectPracticeHubSet({
      snapshot: await snapshotFromLessonWork(runtime),
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW + 10_000_000,
      budget,
    });

  test("a never-seen item is excluded — the set starts from the snapshot", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    const set = await setFor(runtime);
    assertEqual(set.entries.length, 0, "empty history → empty hub");
  });

  test("a produced item returns with ready_to_stretch and calm copy", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    await seedLessonHistory(runtime);
    const set = await setFor(runtime);
    const entry = set.entries.find((e) => e.itemId === "chunk-je-voudrais");
    assert(entry !== undefined, "the produced item came back");
    assertEqual(entry!.path, "stretch", "reducer-owned path");
    assertEqual(entry!.reason, "ready_to_stretch", "derived only from the path");
    assertEqual(entry!.fr, "je voudrais", "learner-safe French");
    assertEqual(entry!.en, "I would like", "learner-safe English");
  });

  test("reason mapping is exactly path-owned and copy is calm", () => {
    assertEqual(PRACTICE_RETURN_COPY.keep_building, "A useful piece to keep active.", "build");
    assertEqual(
      PRACTICE_RETURN_COPY.ready_to_stretch,
      "You’ve used this before. Try it once more.",
      "stretch",
    );
    assertEqual(
      PRACTICE_RETURN_COPY.needs_another_look,
      "This one could use another calm pass.",
      "challenge",
    );
    for (const text of [
      ...Object.values(PRACTICE_RETURN_COPY),
      PRACTICE_DUE_COPY,
    ]) {
      for (const banned of ["weak", "fail", "incorrect", "mistake", "score", "overdue", "mastery"]) {
        assert(
          !text.toLowerCase().includes(banned),
          `"${text}" must not contain "${banned}"`,
        );
      }
    }
  });

  test("the due fact is preserved separately from the reason", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    await seedLessonHistory(runtime);
    const set = await setFor(runtime);
    const entry = set.entries.find((e) => e.itemId === "chunk-je-voudrais")!;
    assertEqual(typeof entry.isDue, "boolean", "a scheduling fact, not a reason");
  });

  test("the budget clamps through the existing 5–8 rules and a shorter set is fine", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    await seedLessonHistory(runtime);
    const tiny = await setFor(runtime, 1);
    assertEqual(tiny.requested, TODAYS_SET_MIN, "clamped up to 5");
    const huge = await setFor(runtime, 99);
    assertEqual(huge.requested, TODAYS_SET_MAX, "clamped down to 8");
    assert(tiny.entries.length <= tiny.requested, "the set may be shorter than requested");
  });

  test("no duplicate item and deterministic order", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    await seedLessonHistory(runtime);
    const a = await setFor(runtime);
    const b = await setFor(runtime);
    assertEqual(
      a.entries.map((e) => e.itemId).join(","),
      b.entries.map((e) => e.itemId).join(","),
      "same inputs → same order",
    );
    assertEqual(
      new Set(a.entries.map((e) => e.itemId)).size,
      a.entries.length,
      "no duplicates",
    );
  });

  test("the output type exposes no counters, weak tags or raw mastery", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    await seedLessonHistory(runtime);
    const set = await setFor(runtime);
    const entry = set.entries[0] as unknown as Record<string, unknown>;
    assertEqual(
      Object.keys(entry).sort().join(","),
      "en,fr,isDue,itemId,path,reason,source",
      "exactly the learner-safe fields",
    );
    for (const banned of ["weakTags", "wrongCount", "errorTags", "productionSuccess", "counters"]) {
      assert(!(banned in entry), `${banned} never reaches the hub entry`);
    }
  });

  test("an item with no safe reusable source is excluded, not displayed broken", async () => {
    // chunk-merci exists in the registry, but give it history WITHOUT any
    // fill/weave screen targeting it in the lessons list we pass.
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    await seedLessonHistory(runtime);
    const snapshot = await snapshotFromLessonWork(runtime);
    const set = selectPracticeHubSet({
      snapshot,
      items: ITEM_REGISTRY,
      lessons: [], // no lessons → no authored sources at all
      now: NOW,
      budget: 5,
    });
    assertEqual(set.entries.length, 0, "nothing practisable → nothing shown");
  });
});

// ── Part E: source resolver ─────────────────────────────────────────────────

describe("reusable authored source resolution", () => {
  test("the resolved screen is the ORIGINAL object by reference", () => {
    const source = resolvePracticeHubSource("chunk-je-voudrais" as ItemId, "stretch", V1_LESSONS);
    assert(source !== null, "resolved");
    const owner = V1_LESSONS.find((l) => l.id === source!.lesson.id)!;
    assert(
      owner.screens.includes(source!.screen),
      "the very screen object from the lesson registry — never a copy",
    );
  });

  test("evidenceTargetItemIds takes precedence — a printed frame word is not matched", () => {
    // L0's choice screen prints chunk-je-voudrais around the blank but assesses
    // only noun-cafe. It must never be selected FOR chunk-je-voudrais.
    const source = resolvePracticeHubSource("chunk-je-voudrais" as ItemId, "build", [lesson000]);
    if (source !== null) {
      assert(
        source.screen.id !== "s03-fill-je-voudrais-blank",
        "the narrowed choice screen is not a je-voudrais opportunity",
      );
    }
  });

  test("build prefers a choice screen; stretch and challenge prefer Weave", () => {
    const build = resolvePracticeHubSource("chunk-je-voudrais" as ItemId, "build", V1_LESSONS);
    assert(build !== null, "build source exists");
    assertEqual(build!.screen.type, "fill-with-traps", "build leads with recognition");

    const stretch = resolvePracticeHubSource("chunk-je-voudrais" as ItemId, "stretch", V1_LESSONS);
    assert(stretch !== null, "stretch source exists");
    assertEqual(stretch!.screen.type, "weave", "stretch leads with production");

    const challenge = resolvePracticeHubSource(
      "chunk-je-voudrais" as ItemId,
      "challenge",
      V1_LESSONS,
    );
    assert(challenge !== null, "challenge source exists");
    assertEqual(challenge!.screen.type, "weave", "challenge leads with production");
  });

  test("a recognition-treated item never gets a production screen", () => {
    // Synthetic: a lesson that declares the item recognition-only but authored a
    // weave targeting it. The resolver must refuse the unsafe upgrade.
    const weave: WeaveScreen = {
      id: "syn-weave",
      type: "weave",
      targetItemIds: ["chunk-merci"],
      payload: {
        weaveType: "mid",
        prompt: "Write it in French: thank you",
        expectedAnswers: ["Merci"],
        reveal: { modelAnswer: "Merci" },
      },
    };
    const lesson: Lesson = {
      ...lesson001,
      id: "syn-recognition-lesson",
      screens: [weave],
      learningItems: [
        { id: "chunk-merci", type: "chunk", text: "Merci", status: "recognition" },
      ],
    };
    assertEqual(
      resolvePracticeHubSource("chunk-merci" as ItemId, "stretch", [lesson]),
      null,
      "recognition material is never converted into unscaffolded production",
    );
  });

  test("a supported item gets a Weave only when the screen supplies the piece", () => {
    const bare: WeaveScreen = {
      id: "syn-weave-bare",
      type: "weave",
      targetItemIds: ["chunk-merci"],
      payload: {
        weaveType: "mid",
        prompt: "Write it in French: thank you",
        expectedAnswers: ["Merci"],
        reveal: { modelAnswer: "Merci" },
      },
    };
    const supplied: WeaveScreen = {
      ...bare,
      id: "syn-weave-supplied",
      payload: {
        ...bare.payload,
        suggestedPieces: [{ text: "Merci", itemId: "chunk-merci" }],
      },
    };
    const lessonOf = (screens: WeaveScreen[]): Lesson => ({
      ...lesson001,
      id: "syn-supported-lesson",
      screens,
      learningItems: [
        { id: "chunk-merci", type: "chunk", text: "Merci", status: "supported" },
      ],
    });
    assertEqual(
      resolvePracticeHubSource("chunk-merci" as ItemId, "stretch", [lessonOf([bare])]),
      null,
      "supported material never becomes independent recall",
    );
    const ok = resolvePracticeHubSource("chunk-merci" as ItemId, "stretch", [
      lessonOf([supplied]),
    ]);
    assertEqual(ok?.screen.id, "syn-weave-supplied", "supplied package → safe");
  });

  test("an undeclared (ghost-like) target resolves no source", () => {
    const lesson: Lesson = {
      ...lesson001,
      id: "syn-ghost-lesson",
      screens: lesson001.screens,
      learningItems: [], // nothing declared — every treatment resolution fails
    };
    assertEqual(
      resolvePracticeHubSource("chunk-je-voudrais" as ItemId, "build", [lesson]),
      null,
      "an untaught demand is never manufactured",
    );
  });

  test("model/reveal screens are never candidates — only fill and weave", () => {
    for (const lesson of V1_LESSONS) {
      for (const path of ["build", "stretch", "challenge"] as const) {
        for (const item of lesson.learningItems) {
          const source = resolvePracticeHubSource(item.id as ItemId, path, [lesson]);
          if (source !== null) {
            assert(
              source.screen.type === "fill-with-traps" || source.screen.type === "weave",
              "only the two connected Wave A primitives are reusable",
            );
          }
        }
      }
    }
  });
});

// ── Part I: PM-023 connected return-leg proof ───────────────────────────────

describe("PM-023 connected proof: lesson → hub → same item, same spine", () => {
  test("the full return leg holds on one shared repository", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    const runtime = runtimeWith(repo);

    // 1. Lesson-path production for a canonical item.
    await seedLessonHistory(runtime);

    // 2–3. Rebuild the snapshot and select the hub set.
    const snapshot = await runtime.readMasterySnapshot();
    const set = selectPracticeHubSet({
      snapshot,
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW + 10_000,
      budget: 5,
    });

    // 4–5. The same canonical item returns, with learner-safe copy.
    const entry = set.entries.find((e) => e.itemId === "chunk-je-voudrais");
    assert(entry !== undefined, "the item that entered through the lesson came back");
    assertEqual(entry!.reason, "ready_to_stretch", "learner-safe reason");

    // 6. An existing authored screen resolved by reference.
    const { lesson, screen } = entry!.source;
    assert(
      V1_LESSONS.find((l) => l.id === lesson.id)!.screens.includes(screen),
      "authored screen, by reference",
    );

    // 7–8. Complete it through a controller with placement practice_hub.
    const hub = controllerOn(runtime, lesson, HUB_SURFACE);
    assert(screen.type === "weave", "stretch resolved to a weave");
    hub.recordGradedAttempt(
      typedAttemptInteraction(lesson, screen as WeaveScreen, {
        text: (screen as WeaveScreen).payload.expectedAnswers[0],
        hintRung: 0,
        constitutiveSupportRendered: false,
      }),
    );
    await hub.flush();

    // 9. The new event tells the truth about identity AND placement.
    const events = await repo.readAllEvents();
    assertEqual(events.length, 2, "lesson event + hub event, one log");
    const hubEvent = events[1];
    assertEqual(hubEvent.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "v3");
    assert(hubEvent.itemIds.includes("chunk-je-voudrais"), "same canonical item id");
    assertEqual(
      hubEvent.payloadId,
      `${lesson.id}/${screen.id}`,
      "the ORIGINAL qualified payload id",
    );
    assertEqual(hubEvent.lessonId, lesson.id, "original lesson id");
    assertEqual(hubEvent.contentVersion, lesson.version, "original lesson version");
    assertEqual(hubEvent.placement, "practice_hub", "hub placement");
    assert(isAssessedEvent(hubEvent), "assessed");
    assertEqual(
      hubEvent.attribution.status === "resolved" ? hubEvent.attribution.source : "?",
      "learner",
      "learner-attributed",
    );
    assertEqual(hubEvent.admissibility.status, "admitted", "admitted");
    assertEqual(hubEvent.evidenceClass, "controlled_production", "clean typed production");

    // 10–12. Same item row accumulates; no second identity appears.
    const after = scoreEvents(events);
    const m = after.items["chunk-je-voudrais"];
    assertEqual(m.production.independent.success, 2, "lesson + hub accumulate on ONE row");
    assert(
      !Object.keys(after.items).some((id) => id.includes("practice")),
      "no practice-local item identity was minted",
    );

    // 13. No legacy or Practice-local store was written.
    assertEqual(
      [...kv.map.keys()].sort().join(","),
      "lm_le_events",
      "the shared event log is the only storage touched",
    );
  });

  test("a hub choice attempt also lands on the shared spine", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    const runtime = runtimeWith(repo);
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    const hub = controllerOn(runtime, lesson001, HUB_SURFACE);
    hub.recordGradedAttempt(choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }));
    await hub.flush();
    const e = (await repo.readAllEvents())[0];
    assertEqual(e.placement, "practice_hub", "hub placement");
    assertEqual(e.evidenceClass, "recognition", "choice stays recognition evidence");
  });
});

// ── Part J: projection refresh rules ────────────────────────────────────────

describe("hub projection refresh is reducer-owned", () => {
  test("a challenge item stays challenge until the reducer says otherwise", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    const runtime = runtimeWith(repo);
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    const c = controllerOn(runtime, lesson001, LESSON_SURFACE);
    for (let i = 0; i < 3; i += 1) {
      c.recordGradedAttempt(choiceInteraction(lesson001, fill, { optionId: "opt-suis" }));
    }
    await c.flush();
    const snap = await runtime.readMasterySnapshot();
    assertEqual(
      snap.items["chunk-je-voudrais"].practiceEligibility,
      "challenge",
      "reducer decided challenge",
    );
    const set = selectPracticeHubSet({
      snapshot: snap,
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW,
      budget: 5,
    });
    const entry = set.entries.find((e) => e.itemId === "chunk-je-voudrais");
    assertEqual(entry?.reason, "needs_another_look", "calm challenge reason");
    // The Hub never promotes/demotes: only a new reducer run over new events
    // can change the path. Recomputing over the same log changes nothing.
    const again = selectPracticeHubSet({
      snapshot: await runtime.readMasterySnapshot(),
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW,
      budget: 5,
    });
    assertEqual(
      again.entries.find((e) => e.itemId === "chunk-je-voudrais")?.reason,
      "needs_another_look",
      "no hub-local promotion",
    );
  });
});

// ── Part K: privacy and reset ───────────────────────────────────────────────

describe("hub privacy and reset", () => {
  test("reset: stale reads and writes stay out; fresh generation works", async () => {
    try {
      const kv = makeFakeKv();
      const owner = createLearningRuntimeOwner({
        createRepository: () => new LocalRepository(kv),
        appBuild: "b",
        deviceInfo: { platform: "test" },
      });
      const staleRuntime = owner.current().runtime;
      await seedLessonHistory(staleRuntime);
      assert((await staleRuntime.readMasterySnapshot()).items["chunk-je-voudrais"] !== undefined, "seeded");

      bumpPrivacyResetEpoch();
      kv.map.delete(LM_LE_EVENTS_KEY); // the reset cleared learner data

      // A stale hub controller's late write cannot recreate the cleared key.
      const staleHub = controllerOn(staleRuntime, lesson001, HUB_SURFACE);
      const fill = lesson001.screens.find(
        (s) => s.id === "s03-fill-polite-verb",
      ) as FillWithTrapsScreen;
      staleHub.recordGradedAttempt(
        choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }),
      );
      await staleHub.flush();
      assert(!kv.map.has(LM_LE_EVENTS_KEY), "stale hub write suppressed");

      // The fresh generation reads the cleared state and can practice anew.
      const fresh = owner.current().runtime;
      assert(fresh !== staleRuntime, "new runtime generation");
      const freshSnap = await fresh.readMasterySnapshot();
      assertEqual(Object.keys(freshSnap.items).length, 0, "post-reset hub state is empty");
      await seedLessonHistory(fresh);
      const after = await fresh.readMasterySnapshot();
      assert(after.items["chunk-je-voudrais"] !== undefined, "fresh attempts work, no restart");
      owner.dispose();
    } finally {
      __resetPrivacyResetEpochForTest();
    }
  });

  test("a hub attempt is included in export and removed by reset (same key)", async () => {
    const kv = makeFakeKv();
    const runtime = runtimeWith(new LocalRepository(kv));
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    const hub = controllerOn(runtime, lesson001, HUB_SURFACE);
    hub.recordGradedAttempt(choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }));
    await hub.flush();
    assert(
      (kv.map.get(LM_LE_EVENTS_KEY) ?? "").includes('"practice_hub"'),
      "hub events live in lm_le_events — the key privacy export/reset already owns",
    );
    assertEqual([...kv.map.keys()].join(","), "lm_le_events", "no new storage key");
  });
});

// ── Part L guards: route quarantine and source boundaries ───────────────────

describe("legacy quarantine and hub source boundaries (source-level)", () => {
  const hubFiles = [
    "app/practice-hub.tsx",
    "components/practice-hub/PracticeHubPractice.tsx",
    "content/lesson-v1-evidence/practiceHub.ts",
  ];

  test("the legacy Practice route is untouched and unconnected", () => {
    const legacy = read("app/(tabs)/practice.tsx");
    assert(legacy.includes("useSRS"), "legacy route still uses its frozen stack");
    for (const banned of [
      "useLearningEngineRuntime",
      "readMasterySnapshot",
      "practiceHub",
      "practice-hub",
      "LearningSessionController",
    ]) {
      assert(!legacy.includes(banned), `legacy route must not gain ${banned}`);
    }
  });

  test("the new hub imports no legacy stack", () => {
    for (const rel of hubFiles) {
      const code = codeOf(read(rel));
      for (const banned of ["useSRS", "scenarios", "flashcard", "Flashcard", "lm7"]) {
        assert(!code.includes(banned), `${rel} must not reference ${banned}`);
      }
    }
  });

  test("the hub reaches no repository, storage key or raw event builder", () => {
    for (const rel of hubFiles) {
      const code = codeOf(read(rel));
      for (const banned of [
        "LocalRepository",
        "appendEvent",
        "LM_LE_EVENTS_KEY",
        "LM_LE_SNAPSHOT_KEY",
        "createLearningEvent",
        "scoreEvent(",
      ]) {
        assert(!code.includes(banned), `${rel} must not reference ${banned}`);
      }
    }
  });

  test("the hub renders no raw item id and no weakness language", () => {
    const ui = codeOf(read("app/practice-hub.tsx"));
    const itemIdUses = ui.match(/\{entry\.itemId\}/g) ?? [];
    const keyUses = ui.match(/key=\{entry\.itemId\}/g) ?? [];
    assertEqual(
      itemIdUses.length,
      keyUses.length,
      "every itemId use is a React key — none is rendered as text",
    );
    for (const banned of ["weak", "failed", "wrong", "score", "overdue", "mistake"]) {
      assert(
        !new RegExp(`>[^<]*${banned}`, "i").test(ui),
        `no "${banned}" in learner-facing hub copy`,
      );
    }
  });

  test("lesson completion still calls mk() exactly once; the hub link is navigation only", () => {
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    assertEqual(
      (src.match(/mk\(lesson\.number, V1_COMPLETION_SECTION_KEY\)/g) ?? []).length,
      1,
      "legacy completion marker unchanged",
    );
    const completion = src.slice(src.indexOf("function CompletionView"));
    assert(completion.includes('router.push("/practice-hub"'), "the entry link exists");
    assert(!/record[A-Z]/.test(completion), "opening the hub emits nothing");
  });

  test("FEATURES.practice and the legacy tab wiring are unchanged", () => {
    const tabs = read("app/(tabs)/_layout.tsx");
    assert(
      tabs.includes("FEATURES.practice ? undefined : null"),
      "the legacy tab gate is exactly as before",
    );
  });
});

// ── regression ──────────────────────────────────────────────────────────────

describe("PR-08 changed no frozen contract", () => {
  test("schema, mastery and compaction versions are unchanged", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "event schema");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "mastery");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "compaction");
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "the Canonical eight");
    assertEqual(ERROR_TAG_CODES.length, 16, "frozen tags");
  });

  test("the carryover selector was not conscripted into the hub", () => {
    for (const rel of [
      "content/lesson-v1-evidence/practiceHub.ts",
      "app/practice-hub.tsx",
      "components/practice-hub/PracticeHubPractice.tsx",
    ]) {
      assert(
        !codeOf(read(rel)).includes("carryover"),
        `${rel} must not use the carryover selector — separate projections`,
      );
    }
  });

  test("an empty snapshot still projects an empty hub — nothing at rest", () => {
    const set = selectPracticeHubSet({
      snapshot: createEmptyMasterySnapshot(),
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW,
      budget: 5,
    });
    assertEqual(set.entries.length, 0, "empty");
  });

  test("no new screen type entered the hub", () => {
    // The settlement correction added exactly one PURE close-gate helper.
    // The renderer surface is still the single reuse component — anything
    // beyond these two files means a new hub screen crept in.
    const dir = join(APP_ROOT, "components/practice-hub");
    const files = readdirSync(dir).sort();
    assertEqual(
      files.join(","),
      "PracticeHubPractice.tsx,settledClose.ts",
      "one reuse surface plus the settled-close gate, no new renderer",
    );
    assertEqual(
      files.filter((f) => f.endsWith(".tsx")).join(","),
      "PracticeHubPractice.tsx",
      "the only renderer is the reuse component",
    );
  });
});

// ── settlement correction: close waits for the queue ────────────────────────

import { createSettledCloseGate } from "../../components/practice-hub/settledClose";

/** A repository whose appendEvent blocks until manually released. */
function makeBlockedRepository(kv = makeFakeKv()) {
  const inner = new LocalRepository(kv);
  let release: (() => void) | null = null;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  const repo: LearningRepository = {
    appendEvent: async (e) => {
      await blocked;
      return inner.appendEvent(e);
    },
    getPending: () => inner.getPending(),
    markSynced: (ids) => inner.markSynced(ids),
    readAllEvents: () => inner.readAllEvents(),
  };
  return { repo, kv, release: () => release?.() };
}

const microtasks = async (n = 20) => {
  for (let i = 0; i < n; i += 1) await Promise.resolve();
};

describe("settled-close gate — ordering", () => {
  const attemptOf = (kind: "choice" | "typed") => (c: LearningSessionController) => {
    if (kind === "choice") {
      const fill = lesson001.screens.find(
        (s) => s.id === "s03-fill-polite-verb",
      ) as FillWithTrapsScreen;
      c.recordGradedAttempt(choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }));
    } else {
      const weave = lesson001.screens.find(
        (s) => s.id === "s04-weave-cafe-order",
      ) as WeaveScreen;
      c.recordGradedAttempt(
        typedAttemptInteraction(lesson001, weave, {
          text: weave.payload.expectedAnswers[0],
          hintRung: 0,
          constitutiveSupportRendered: false,
        }),
      );
    }
  };

  for (const kind of ["choice", "typed"] as const) {
    test(`a ${kind} attempt settles BEFORE the parent close and rebuild`, async () => {
      const { repo, kv, release } = makeBlockedRepository();
      const runtime = runtimeWith(repo);
      const controller = controllerOn(runtime, lesson001, HUB_SURFACE);
      let closed = 0;
      const gate = createSettledCloseGate({
        flush: () => controller.flush(),
        identity: "gen0::l1::screen",
        currentIdentity: () => "gen0::l1::screen",
        isActive: () => true,
        onClose: () => {
          closed += 1;
        },
      });

      attemptOf(kind)(controller);
      gate.requestSettledClose(); // the fast Continue
      await microtasks();
      assertEqual(closed, 0, "close must NOT run while the append is still queued");
      assert(!kv.map.has(LM_LE_EVENTS_KEY), "nothing persisted yet either");

      release();
      await controller.flush();
      await microtasks();
      assertEqual(closed, 1, "close runs exactly once, after settlement");

      // The parent rebuild — the step the race used to corrupt — now sees it.
      const snap = await runtime.readMasterySnapshot();
      assert(
        snap.items["chunk-je-voudrais"] !== undefined,
        "the rebuild after close includes the attempt",
      );
      const events = await repo.readAllEvents();
      assertEqual(events.length, 1, "the event is present");
      assertEqual(events[0].placement, "practice_hub", "with its hub placement");
    });
  }

  test("closing with no attempt completes promptly and emits nothing", async () => {
    const { repo, kv } = makeBlockedRepository(); // append stays blocked — and is never needed
    const controller = controllerOn(runtimeWith(repo), lesson001, HUB_SURFACE);
    let closed = 0;
    const gate = createSettledCloseGate({
      flush: () => controller.flush(),
      identity: "id",
      currentIdentity: () => "id",
      isActive: () => true,
      onClose: () => {
        closed += 1;
      },
    });
    gate.requestSettledClose();
    await microtasks();
    assertEqual(closed, 1, "an idle queue is already settled — close runs immediately");
    assertEqual(kv.map.size, 0, "no event, no write");
  });

  test("duplicate Continue/Close taps collapse into one parent close", async () => {
    const { repo, release } = makeBlockedRepository();
    const controller = controllerOn(runtimeWith(repo), lesson001, HUB_SURFACE);
    let closed = 0;
    const gate = createSettledCloseGate({
      flush: () => controller.flush(),
      identity: "id",
      currentIdentity: () => "id",
      isActive: () => true,
      onClose: () => {
        closed += 1;
      },
    });
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }),
    );
    gate.requestSettledClose();
    gate.requestSettledClose(); // double tap while the append is blocked
    gate.requestSettledClose();
    release();
    await controller.flush();
    await microtasks();
    assertEqual(closed, 1, "one request, one close — taps deduplicated");
  });

  test("a stale identity's completion cannot close the current card", async () => {
    const { repo, release } = makeBlockedRepository();
    const controller = controllerOn(runtimeWith(repo), lesson001, HUB_SURFACE);
    let closed = 0;
    let current = "gen0::l1::screenA";
    const gate = createSettledCloseGate({
      flush: () => controller.flush(),
      identity: "gen0::l1::screenA",
      currentIdentity: () => current,
      isActive: () => true,
      onClose: () => {
        closed += 1;
      },
    });
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }),
    );
    gate.requestSettledClose();
    // The learner picked a different source (or a privacy reset advanced the
    // generation) before A settled. A's completion must go nowhere.
    current = "gen1::l1::screenB";
    release();
    await controller.flush();
    await microtasks();
    assertEqual(closed, 0, "an obsolete settlement never closes the new card");
  });

  test("an unmounted owner's completion never invokes the parent", async () => {
    const { repo, release } = makeBlockedRepository();
    const controller = controllerOn(runtimeWith(repo), lesson001, HUB_SURFACE);
    let closed = 0;
    let active = true;
    const gate = createSettledCloseGate({
      flush: () => controller.flush(),
      identity: "id",
      currentIdentity: () => "id",
      isActive: () => active,
      onClose: () => {
        closed += 1;
      },
    });
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }),
    );
    gate.requestSettledClose();
    active = false; // unmounted before settlement
    release();
    await controller.flush();
    await microtasks();
    assertEqual(closed, 0, "a late completion after unmount does nothing");
  });

  test("append failure still settles and still closes — from the unchanged log", async () => {
    const failing: LearningRepository = {
      appendEvent: async () => {
        throw new Error("storage refused");
      },
      getPending: async () => [],
      markSynced: async () => {},
      readAllEvents: async () => [],
    };
    const controller = controllerOn(runtimeWith(failing), lesson001, HUB_SURFACE);
    let closed = 0;
    const gate = createSettledCloseGate({
      flush: () => controller.flush(),
      identity: "id",
      currentIdentity: () => "id",
      isActive: () => true,
      onClose: () => {
        closed += 1;
      },
    });
    const fill = lesson001.screens.find(
      (s) => s.id === "s03-fill-polite-verb",
    ) as FillWithTrapsScreen;
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fill, { optionId: "opt-voudrais" }),
    );
    gate.requestSettledClose();
    await controller.flush();
    await microtasks();
    assertEqual(closed, 1, "flush settles caught errors too — close still runs");
    // No fabricated success: the authoritative log is simply unchanged.
    assertEqual((await failing.readAllEvents()).length, 0, "nothing was invented");
  });
});

describe("settled-close gate — component wiring (source-level)", () => {
  test("Continue and Close both route through the gate, never raw onClose", () => {
    const src = codeOf(read("components/practice-hub/PracticeHubPractice.tsx"));
    assert(src.includes("createSettledCloseGate"), "the gate is created");
    assert(src.includes("controller.flush()"), "and it flushes the captured controller");
    assert(
      src.includes("onPress={requestSettledClose}"),
      "the header Close uses the gate",
    );
    assert(
      src.includes("renderReusedScreen(source, controller, requestSettledClose)"),
      "the reused screen's Continue uses the gate",
    );
    assert(
      !src.includes("onPress={onClose}") &&
        !src.includes("renderReusedScreen(source, controller, onClose)"),
      "no direct UI path to the parent onClose remains",
    );
  });

  test("the gate helper is pure and adds no repository or storage import", () => {
    const src = codeOf(read("components/practice-hub/settledClose.ts"));
    // Stronger than a name blocklist: the gate is fully dependency-free, so
    // ANY import or require (react, expo, repository, storage — anything) is
    // a purity regression.
    assert(!src.includes("import "), "settledClose.ts imports nothing");
    assert(!src.includes("require("), "settledClose.ts requires nothing");
    for (const banned of ["LocalRepository", "appendEvent", "readAllEvents", "LM_LE_"]) {
      assert(!src.includes(banned), `settledClose.ts must not reference ${banned}`);
    }
  });
});
