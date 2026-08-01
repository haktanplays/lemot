/**
 * PR-05 — learning runtime ownership and shipped lesson-path wiring.
 *
 * Before this PR every consumer that wanted to record learning built its own
 * `new LocalRepository()`. The fixture sandbox hook did it inline; the shipped
 * lesson path would have had to do the same, giving the app two repositories,
 * two privacy-reset acknowledgement epochs, and a storage handle living inside a
 * React component. PR-05 makes the repository something a runtime OWNS and a
 * controller RECEIVES, and it removes the controller's hardcoded
 * `engine_fixture_sandbox` placement — which would have made every shipped-lesson
 * event claim to come from the sandbox.
 *
 * HONEST SCOPE NOTE. This repository ships no React component test renderer and
 * PR-05 does not add one. So the React layers — `LearningEngineProvider`, the
 * lesson-local session provider, the renderer wrapper — are verified at the
 * SOURCE level (structure, imports, absence of emission calls), NOT by mounting
 * them. Everything below that is genuinely behavioural: the runtime factory, the
 * reset-generation owner, the controller's resolver contract and the
 * no-repository-call guarantees all run against a call-counting fake repository.
 * Where a test only inspects source, its name and message say so.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { makeFakeKv, TEST_SANDBOX_SURFACE } from "./helpers";
import type { LearningEvent } from "../../content/learning-engine/events";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
} from "../../content/learning-engine/events";
import {
  ASSISTANCE_CAPTURES,
  ATTRIBUTION_SOURCES,
} from "../../content/learning-engine/evidence-context";
import { MASTERY_SNAPSHOT_VERSION } from "../../content/learning-engine/mastery";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import type { LearningRepository } from "../../content/learning-engine/repository/types";
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
  AttemptEvidenceContext,
  EventSurfaceResolver,
} from "../../content/learning-engine/session-controller";
import { resolveTreatmentForItem } from "../../content/learning-engine/treatment-resolver";
import type { ExerciseBlueprint, LessonContract } from "../../content/learning-engine/types";
import {
  __resetPrivacyResetEpochForTest,
  bumpPrivacyResetEpoch,
} from "../../lib/privacyResetEpoch";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");

/** Strip comments so a deliberate mention in prose never trips a source guard. */
const codeOf = (src: string): string =>
  src
    .split("\n")
    .filter((l) => !l.trim().startsWith("*") && !l.trim().startsWith("//") && !l.trim().startsWith("/*"))
    .join("\n");

// ── fakes ───────────────────────────────────────────────────────────────────

type CountingRepository = LearningRepository & {
  calls: string[];
  appended: LearningEvent[];
};

function makeCountingRepository(): CountingRepository {
  const appended: LearningEvent[] = [];
  const calls: string[] = [];
  return {
    calls,
    appended,
    async appendEvent(event) {
      calls.push("appendEvent");
      appended.push(event);
    },
    async getPending() {
      calls.push("getPending");
      return [];
    },
    async markSynced() {
      calls.push("markSynced");
    },
    async readAllEvents() {
      calls.push("readAllEvents");
      return [...appended];
    },
  };
}

const contract = {
  id: "l1",
  title: "L1",
  contractSchemaVersion: "1",
  versions: {
    contentVersion: "c",
    lessonVersion: "l",
    itemRegistryVersion: "i",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: { canDo: "x", notGoal: [] },
  items: { activeNew: ["new-a"], supported: [], recognitionOnly: [], recycled: [] },
  production: {
    allowedProduction: [],
    blockedProduction: [],
    allowedOperations: [],
    blockedOperations: [],
  },
  supportFade: { promptFadeMax: "PF0" },
  answerPolicy: {
    defaultValidationMode: "exact-or-alternative",
    allowAlternatives: true,
    aiMayExplain: false,
    aiMayOverride: false,
  },
  sourceHygiene: {
    origin: "original",
    thirdPartySourceDerived: false,
    disallowedDerivative: false,
    sourceRisk: "none",
    reviewStatus: "passed",
  },
} as unknown as LessonContract;

const attemptContext = (): AttemptEvidenceContext => ({
  promptLevel: "PF0",
  assistance: {
    capture: "known",
    constitutive: [],
    hintRung: 0,
    retryIndex: 0,
    selfCorrection: false,
    priorAnswerExposure: "none",
    accessibility: { replayCount: 0, slowPlayback: false },
  },
  opportunity: {
    authored: true,
    prerequisitesSafe: true,
    evaluator: "approved_deterministic",
    learnerAuthorship: "verified",
    requiredConstitutiveSupport: [],
    qualityIncident: null,
  },
  treatmentFor: (id) => resolveTreatmentForItem(id, contract),
});

const exercise = (id = "ex-1"): ExerciseBlueprint => ({
  id,
  lessonId: "l1",
  operation: "fill",
  targetItemIds: ["new-a"],
  targetText: "x",
});

const runtimeWith = (repo: LearningRepository, over: Record<string, unknown> = {}) =>
  createLearningEngineRuntime({
    repository: repo,
    appBuild: "test-build-1.2.3",
    deviceInfo: { platform: "test-os", osVersion: "42", expoRuntime: "rt-9" },
    ...over,
  });

/** Deterministic controller options for a runtime-created controller. */
const sessionOpts = (over: Record<string, unknown> = {}) => {
  let t = 0;
  let n = 0;
  return {
    lessonId: "l1",
    contentVersion: "c",
    resolveEventSurface: TEST_SANDBOX_SURFACE,
    now: () => (t += 1_000),
    makeClientEventId: () => `evt-${(n += 1)}`,
    ...over,
  };
};

// ── Part A: runtime factory ─────────────────────────────────────────────────

describe("learning runtime factory", () => {
  test("creating the runtime performs no repository call", () => {
    const repo = makeCountingRepository();
    runtimeWith(repo);
    assertEqual(repo.calls.length, 0, "constructing a runtime must touch nothing");
  });

  test("creating a session controller performs no repository call", () => {
    const repo = makeCountingRepository();
    runtimeWith(repo).createSessionController(sessionOpts());
    assertEqual(repo.calls.length, 0, "a controller reads and writes nothing until used");
  });

  test("two controllers from one runtime share the injected repository", async () => {
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    const a = runtime.createSessionController(sessionOpts());
    const b = runtime.createSessionController(sessionOpts());
    a.recordGradedAttempt({
      exercise: exercise("ex-a"),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: attemptContext(),
    });
    b.recordGradedAttempt({
      exercise: exercise("ex-b"),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: attemptContext(),
    });
    await a.flush();
    await b.flush();
    assertEqual(repo.appended.length, 2, "both controllers wrote to the SAME repository");
  });

  test("two controllers receive distinct session ids", async () => {
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    const ids: string[] = [];
    for (const exId of ["ex-a", "ex-b"]) {
      const c = runtime.createSessionController(sessionOpts());
      c.recordGradedAttempt({
        exercise: exercise(exId),
        userAnswer: "x",
        expectedAnswer: "x",
        gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
        context: attemptContext(),
      });
      await c.flush();
    }
    for (const e of repo.appended) ids.push(e.sessionId);
    assertEqual(ids.length, 2, "two events");
    assert(ids[0] !== ids[1], "two sessions must be distinguishable");
    assert(
      ids.every((id) => id !== "l1"),
      "the session id must never be the lesson id",
    );
  });

  test("an injected session-id factory is respected", async () => {
    const repo = makeCountingRepository();
    let n = 0;
    const runtime = runtimeWith(repo, { makeSessionId: () => `fixed-${(n += 1)}` });
    const c = runtime.createSessionController(sessionOpts());
    c.recordGradedAttempt({
      exercise: exercise(),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: attemptContext(),
    });
    await c.flush();
    assertEqual(repo.appended[0].sessionId, "fixed-1", "injected factory used");
  });

  test("app build and device info reach the emitted event", async () => {
    const repo = makeCountingRepository();
    const c = runtimeWith(repo).createSessionController(sessionOpts());
    c.recordGradedAttempt({
      exercise: exercise(),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: attemptContext(),
    });
    await c.flush();
    const e = repo.appended[0];
    assertEqual(e.appBuild, "test-build-1.2.3", "appBuild propagated");
    assertEqual(e.deviceInfo.platform, "test-os", "platform propagated");
    assertEqual(e.deviceInfo.osVersion, "42", "osVersion propagated");
    assertEqual(e.deviceInfo.expoRuntime, "rt-9", "expoRuntime propagated");
  });

  // PR-05 pinned the surface to exactly one factory method. PR-08 deliberately
  // added ONE read-side projection (`readMasterySnapshot`), so the enumeration
  // grew — but the intent is unchanged and still enforced: no raw repository,
  // no write method, no raw event access is reachable from a runtime.
  test("the runtime exposes the factory + read projection and nothing else", () => {
    const runtime: LearningEngineRuntime = runtimeWith(makeCountingRepository());
    assertEqual(
      Object.keys(runtime).sort().join(","),
      "createSessionController,readMasterySnapshot",
      "exactly the controller factory and the explicit mastery read",
    );
    for (const forbidden of [
      "repository",
      "repo",
      "appendEvent",
      "readAllEvents",
      "writeSnapshot",
      "readSnapshot",
      "store",
    ]) {
      assert(
        !(forbidden in (runtime as unknown as Record<string, unknown>)),
        `"${forbidden}" must not be reachable from the runtime`,
      );
    }
  });

  test("the runtime module imports no framework layer", () => {
    const src = read("content/learning-engine/runtime.ts");
    for (const banned of ["react", "react-native", "expo-", "@supabase"]) {
      assert(!src.includes(`from "${banned}`), `runtime.ts must not import ${banned}`);
    }
  });
});

// ── Part B: explicit event-surface resolver ─────────────────────────────────

describe("event surface resolver", () => {
  const surfaceOf = async (resolver: EventSurfaceResolver) => {
    const repo = makeCountingRepository();
    const c = runtimeWith(repo).createSessionController(
      sessionOpts({ resolveEventSurface: resolver }),
    );
    c.recordGradedAttempt({
      exercise: exercise("ex-surface"),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: attemptContext(),
    });
    await c.flush();
    return repo.appended[0];
  };

  test("the controller source carries no hidden sandbox fallback any more", () => {
    const code = codeOf(read("content/learning-engine/session-controller.ts"));
    assert(
      !code.includes('placement: "engine_fixture_sandbox"'),
      "the sandbox placement must live with the sandbox, not inside the shared controller",
    );
    assert(
      !code.includes("private surfaceContext"),
      "the private hardcoded resolver must be gone",
    );
    assert(
      code.includes("resolveEventSurface: EventSurfaceResolver"),
      "the resolver is a required option",
    );
  });

  test("the sandbox resolver produces engine_fixture_sandbox", async () => {
    const e = await surfaceOf(TEST_SANDBOX_SURFACE);
    assertEqual(e.placement, "engine_fixture_sandbox", "sandbox placement");
    assertEqual(e.payloadId, "ex-surface", "payload id comes from the exercise id");
    assertEqual(e.evId, null, "no EV identity is registered yet");
    assertEqual(e.sentenceId, null, "no sentence identity is registered yet");
    assertEqual(e.sequence, null, "no sequence orchestration exists yet");
  });

  test("a lesson-path resolver produces lesson_path", async () => {
    const lessonSurface: EventSurfaceResolver = (ex) => ({
      placement: "lesson_path",
      evId: null,
      payloadId: ex.id,
      sentenceId: null,
      sequence: null,
    });
    const e = await surfaceOf(lessonSurface);
    assertEqual(e.placement, "lesson_path", "shipped lesson placement");
    assertEqual(e.payloadId, "ex-surface", "payload id from the authored screen id");
    assertEqual(e.evId, null, "EV identity stays null until PR-07 registers one");
    assertEqual(e.sentenceId, null, "sentence identity stays null until PR-07");
  });

  test("the resolver is used for NON-assessed construction too", async () => {
    const repo = makeCountingRepository();
    const seen: string[] = [];
    const resolver: EventSurfaceResolver = (ex) => {
      seen.push(ex.id);
      return {
        placement: "lesson_path",
        evId: null,
        payloadId: ex.id,
        sentenceId: null,
        sequence: null,
      };
    };
    const c = runtimeWith(repo).createSessionController(
      sessionOpts({ resolveEventSurface: resolver }),
    );
    c.recordRecognitionReveal({
      exercise: { ...exercise("ex-reveal"), operation: "recognition", displayAnswer: "hi" },
      context: attemptContext(),
    });
    await c.flush();
    assertEqual(seen.join(","), "ex-reveal", "the reveal path calls the resolver");
    assertEqual(repo.appended[0].placement, "lesson_path", "and uses its answer");
  });

  test("the resolver never has to be inferred from the operation", async () => {
    // Same operation, two placements — proof the controller reads the resolver
    // rather than deriving a surface from the exercise shape.
    const a = await surfaceOf(TEST_SANDBOX_SURFACE);
    const b = await surfaceOf((ex) => ({
      placement: "lesson_path",
      evId: null,
      payloadId: ex.id,
      sentenceId: null,
      sequence: null,
    }));
    assertEqual(a.operation, b.operation, "identical operation");
    assert(a.placement !== b.placement, "different placement, decided by the caller");
  });
});

// ── Part D: privacy-reset-safe runtime replacement ──────────────────────────

describe("runtime ownership across a privacy reset", () => {
  /** An injectable reset channel keeps these tests off the global epoch. */
  function fakeResetChannel() {
    const listeners = new Set<() => void>();
    return {
      subscribe: (l: () => void) => {
        listeners.add(l);
        return () => listeners.delete(l);
      },
      fire: () => {
        for (const l of [...listeners]) l();
      },
      size: () => listeners.size,
    };
  }

  const ownerWith = (channel: ReturnType<typeof fakeResetChannel>, created: number[]) =>
    createLearningRuntimeOwner({
      createRepository: () => {
        created.push(created.length + 1);
        return makeCountingRepository();
      },
      appBuild: "b",
      deviceInfo: { platform: "test" },
      subscribeToReset: channel.subscribe,
    });

  test("the generation is stable without a reset", () => {
    const channel = fakeResetChannel();
    const created: number[] = [];
    const owner = ownerWith(channel, created);
    const first = owner.current();
    assertEqual(owner.current().generation, first.generation, "same generation");
    assert(owner.current().runtime === first.runtime, "same runtime object");
    assertEqual(created.length, 1, "exactly one repository was built");
    owner.dispose();
  });

  test("a reset signal creates a new repository and a new runtime generation", () => {
    const channel = fakeResetChannel();
    const created: number[] = [];
    const owner = ownerWith(channel, created);
    const before = owner.current();
    channel.fire();
    const after = owner.current();
    assertEqual(after.generation, before.generation + 1, "generation advanced");
    assert(after.runtime !== before.runtime, "a fresh runtime object");
    assertEqual(created.length, 2, "a FRESH repository — the old one is permanently stale");
    owner.dispose();
  });

  test("repeated resets produce distinct generations deterministically", () => {
    const channel = fakeResetChannel();
    const created: number[] = [];
    const owner = ownerWith(channel, created);
    const seen = [owner.current().generation];
    for (let i = 0; i < 3; i += 1) {
      channel.fire();
      seen.push(owner.current().generation);
    }
    assertEqual(seen.join(","), "0,1,2,3", "monotonic, one per reset");
    assertEqual(created.length, 4, "one repository per generation");
    owner.dispose();
  });

  test("subscribers are notified with the new generation", () => {
    const channel = fakeResetChannel();
    const created: number[] = [];
    const owner = ownerWith(channel, created);
    const notified: number[] = [];
    const unsubscribe = owner.subscribe((next) => notified.push(next.generation));
    channel.fire();
    channel.fire();
    assertEqual(notified.join(","), "1,2", "each reset notified once");
    unsubscribe();
    channel.fire();
    assertEqual(notified.join(","), "1,2", "unsubscribed consumers stop hearing");
    owner.dispose();
  });

  test("dispose removes the reset subscription — no listener leak", () => {
    const channel = fakeResetChannel();
    const created: number[] = [];
    const owner = ownerWith(channel, created);
    assertEqual(channel.size(), 1, "subscribed on creation");
    owner.dispose();
    assertEqual(channel.size(), 0, "unsubscribed on dispose");
    channel.fire();
    assertEqual(created.length, 1, "a disposed owner builds nothing further");
  });

  test("a faulty consumer cannot break the reset path", () => {
    const channel = fakeResetChannel();
    const created: number[] = [];
    const owner = ownerWith(channel, created);
    owner.subscribe(() => {
      throw new Error("consumer blew up");
    });
    let reached = 0;
    owner.subscribe(() => {
      reached += 1;
    });
    channel.fire();
    assertEqual(reached, 1, "the second consumer still heard the reset");
    assertEqual(owner.current().generation, 1, "and the runtime still advanced");
    owner.dispose();
  });

  test("the pre-reset repository stays write-suppressed while the new one writes", async () => {
    // The real barrier, so the actual LocalRepository stale-writer rule is proven
    // rather than modelled. Restored afterwards so no later test inherits an epoch.
    try {
      const kv = makeFakeKv();
      const owner = createLearningRuntimeOwner({
        createRepository: () => new LocalRepository(kv),
        appBuild: "b",
        deviceInfo: { platform: "test" },
      });

      const stale = owner.current().runtime.createSessionController(sessionOpts());
      bumpPrivacyResetEpoch();
      kv.map.delete(LM_LE_EVENTS_KEY); // the reset cleared learner data

      stale.recordGradedAttempt({
        exercise: exercise("ex-stale"),
        userAnswer: "x",
        expectedAnswer: "x",
        gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
        context: attemptContext(),
      });
      await stale.flush();
      assert(
        !kv.map.has(LM_LE_EVENTS_KEY),
        "an old controller's late write must not recreate the cleared key",
      );

      assertEqual(owner.current().generation, 1, "the owner rebuilt on the reset");
      const fresh = owner.current().runtime.createSessionController(sessionOpts());
      fresh.recordGradedAttempt({
        exercise: exercise("ex-fresh"),
        userAnswer: "x",
        expectedAnswer: "x",
        gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
        context: attemptContext(),
      });
      await fresh.flush();
      const stored = JSON.parse(kv.map.get(LM_LE_EVENTS_KEY) as string) as LearningEvent[];
      assertEqual(stored.length, 1, "genuinely new post-reset activity writes — no restart needed");
      assertEqual(stored[0].exerciseId, "ex-fresh", "and it is the NEW event, not the stale one");
      owner.dispose();
    } finally {
      __resetPrivacyResetEpochForTest();
    }
  });

  test("no new storage key is introduced by the runtime layer", () => {
    const src = read("content/learning-engine/runtime.ts") + read("providers/LearningEngineProvider.tsx");
    assert(!/"lm_[a-z_]+"/.test(src), "the runtime layer names no storage key at all");
  });
});

// ── Part C/E: provider structure (SOURCE-LEVEL — not a mount) ───────────────

describe("provider structure (source-level inspection, not a component mount)", () => {
  test("the root layout mounts exactly one LearningEngineProvider", () => {
    const src = read("app/_layout.tsx");
    assertEqual(
      (src.match(/<LearningEngineProvider>/g) ?? []).length,
      1,
      "exactly one opening tag",
    );
    assertEqual(
      (src.match(/<\/LearningEngineProvider>/g) ?? []).length,
      1,
      "exactly one closing tag",
    );
  });

  test("the learning provider sits inside the existing Auth/App provider tree", () => {
    const src = read("app/_layout.tsx");
    const auth = src.indexOf("<AuthProvider>");
    const app = src.indexOf("<AppProvider>");
    const learning = src.indexOf("<LearningEngineProvider>");
    assert(auth >= 0 && app >= 0 && learning >= 0, "all three are present");
    assert(auth < app && app < learning, "Auth → App → Learning nesting");
  });

  test("no route re-provides the learning runtime", () => {
    const offenders: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx$/.test(entry.name) && full !== join(APP_ROOT, "app/_layout.tsx")) {
          if (read(full.slice(APP_ROOT.length + 1)).includes("<LearningEngineProvider>")) {
            offenders.push(full);
          }
        }
      }
    };
    walk(join(APP_ROOT, "app"));
    assertEqual(offenders.join(", "), "", "only the root layout provides it");
  });

  test("the provider imports no auth, Supabase, network or remote repository", () => {
    const src = read("providers/LearningEngineProvider.tsx");
    for (const banned of ["supabase", "AuthProvider", "RemoteRepository", "fetch("]) {
      assert(!src.includes(banned), `the learning provider must not reference ${banned}`);
    }
  });

  test("the provider reads only structured device facets", () => {
    // Comment-stripped: the provider's own doc block NAMES the excluded fields.
    const src = codeOf(read("providers/LearningEngineProvider.tsx"));
    for (const banned of [
      "advertisingId",
      "deviceName",
      "getIosIdForVendorAsync",
      "androidId",
      "serial",
      "email",
      "userId",
    ]) {
      assert(!src.includes(banned), `${banned} is not an allowed metadata source`);
    }
    assert(src.includes("Platform.OS"), "platform is read from the platform module");
    assert(src.includes("Platform.Version"), "os version is read from the platform module");
  });
});

// ── Part F: sandbox hook migration (source-level + behavioural resolver) ────

describe("sandbox hook migration", () => {
  test("the hook no longer constructs a repository", () => {
    // Comments are stripped: this file's own header explains that PR-05 REMOVED
    // `new LocalRepository()`, and a naive scan would read that prose as code.
    const code = codeOf(read("components/learning-engine/useLearningEngineSession.ts"));
    assert(!code.includes("new LocalRepository"), "the hook must not own storage any more");
    assert(
      !code.includes("repository/local"),
      "and must not import the local repository module at all",
    );
    assert(
      code.includes("useLearningEngineRuntime"),
      "it obtains a controller from the app runtime instead",
    );
  });

  test("the hook states the sandbox placement explicitly", () => {
    const code = codeOf(read("components/learning-engine/useLearningEngineSession.ts"));
    assert(
      code.includes('placement: "engine_fixture_sandbox"'),
      "the sandbox declares its own placement now that the controller has no default",
    );
    assert(code.includes("resolveEventSurface"), "and passes it to the controller");
  });

  test("the hook recreates its controller when the runtime generation changes", () => {
    const code = codeOf(read("components/learning-engine/useLearningEngineSession.ts"));
    assert(code.includes("generation"), "generation participates in controller identity");
    assert(
      !code.includes("controllerRef.current === null"),
      "the old capture-forever ref would survive a privacy reset",
    );
  });

  test("the fixture attempt context is unchanged", () => {
    const code = codeOf(read("components/learning-engine/useLearningEngineSession.ts"));
    assert(code.includes('promptLevel: "PF0"'), "PF0 observation unchanged");
    assert(code.includes('capture: "known"'), "known assistance unchanged");
    assert(code.includes("resolveTreatmentForItem"), "fixture treatment resolution unchanged");
  });
});

// ── Part G/H: lesson bridge (source-level) + lifecycle rule (behavioural) ───

describe("shipped lesson bridge", () => {
  const providerSrc = () => read("components/lesson-v1/LessonV1LearningSessionProvider.tsx");

  test("the lesson provider declares the lesson_path placement explicitly", () => {
    const code = codeOf(providerSrc());
    assert(code.includes('placement: "lesson_path"'), "shipped lesson placement");
    assert(code.includes("payloadId: exercise.id"), "payload id from the authored screen id");
    assert(code.includes("evId: null"), "no EV identity invented");
    assert(code.includes("sentenceId: null"), "no sentence identity invented");
    assert(code.includes("sequence: null"), "no sequence invented");
  });

  test("the lesson provider exposes no repository or persistence surface", () => {
    const code = codeOf(providerSrc());
    for (const banned of [
      "LocalRepository",
      "appendEvent",
      "readAllEvents",
      "writeSnapshot",
      "LM_LE_",
      "kvStorage",
    ]) {
      assert(!code.includes(banned), `the lesson bridge must not expose ${banned}`);
    }
  });

  test("the lesson provider uses lesson id and version as controller metadata", () => {
    const code = providerSrc();
    assert(code.includes("lessonId: lesson.id"), "lessonId = lesson.id");
    assert(code.includes("contentVersion: lesson.version"), "contentVersion = lesson.version");
  });

  test("its initial state is genuinely idle and empty", () => {
    const code = providerSrc();
    assert(code.includes('status: "idle"'), "idle");
    assert(code.includes("latestSnapshot: null"), "no snapshot");
    assert(code.includes("events: []"), "no events");
    assert(code.includes("lastEventCount: 0"), "no count");
    assert(code.includes("lastSavedAt: null"), "no save time");
    assert(
      !code.includes('status: "loading"'),
      "no invented loading state for work that has not started",
    );
  });

  test("controller identity is keyed on runtime generation, lesson id and version", () => {
    const code = codeOf(providerSrc());
    assert(
      code.includes("`${generation}::${lesson.id}::${lesson.version}`"),
      "all three participate, so a reset or lesson change replaces the controller",
    );
  });

  test("an obsolete controller's late update cannot overwrite the current state", () => {
    const code = codeOf(providerSrc());
    assert(
      code.includes("held.current?.identity === token"),
      "the callback is guarded by the identity it was created under",
    );
  });

  test("one controller per lesson/runtime identity, behaviourally", () => {
    // The React composition is source-checked above; the RULE it encodes is
    // exercised here against the real runtime.
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    const a = runtime.createSessionController(sessionOpts({ lessonId: "l1" }));
    const b = runtime.createSessionController(sessionOpts({ lessonId: "l1" }));
    const c = runtime.createSessionController(sessionOpts({ lessonId: "l2" }));
    assert(a !== b && b !== c, "each call yields its own controller instance");
    assertEqual(repo.calls.length, 0, "and none of them touched storage");
  });
});

// ── Part K: the no-emission contract ────────────────────────────────────────

describe("PR-05 is wiring only — nothing emits", () => {
  test("creating runtime, owner and controller emits no event and calls no repository", () => {
    const repo = makeCountingRepository();
    const owner = createLearningRuntimeOwner({
      createRepository: () => repo,
      appBuild: "b",
      deviceInfo: { platform: "test" },
      subscribeToReset: () => () => {},
    });
    owner.current().runtime.createSessionController(sessionOpts());
    assertEqual(repo.calls.length, 0, "no repository method was called");
    assertEqual(repo.appended.length, 0, "no event was emitted");
    owner.dispose();
  });

  test("the lesson renderer emits no learning event", () => {
    const code = codeOf(read("components/lesson-v1/LessonRendererV1.tsx"));
    for (const banned of [
      "recordGradedAttempt",
      "recordRecognitionReveal",
      "appendEvent",
      "LocalRepository",
    ]) {
      assert(!code.includes(banned), `LessonRendererV1 must not call ${banned} in PR-05`);
    }
  });

  // PR-05 asserted the bridge contained NO record call at all. PR-06 legitimately
  // adds them — inside the callbacks it hands to screens. The guarantee still
  // worth holding is the original INTENT: mounting the bridge emits nothing.
  // Structurally, that means no record call may run during provider setup.
  test("the lesson bridge still emits nothing on construction", () => {
    const src = read("components/lesson-v1/LessonV1LearningSessionProvider.tsx");
    const apiStart = src.indexOf("useMemo<LessonV1LearningSession>");
    assert(apiStart > 0, "the narrow API is built in a useMemo");
    const setup = codeOf(src.slice(0, apiStart));
    for (const banned of ["controller.record", "appendEvent("]) {
      assert(
        !setup.includes(banned),
        `"${banned}" must appear only inside the callbacks, never in provider setup`,
      );
    }
    assert(!codeOf(src).includes("useEffect(() => {\n    controller."), "no emit-on-mount effect");
  });

  test("no lesson-v1 screen emits or imports persistence", () => {
    const dir = join(APP_ROOT, "components/lesson-v1/screens");
    const files = readdirSync(dir).filter((f) => /\.tsx?$/.test(f));
    assert(files.length >= 8, "the screen directory was actually scanned");
    for (const f of files) {
      const code = codeOf(readFileSync(join(dir, f), "utf8"));
      for (const banned of [
        "appendEvent",
        "recordGradedAttempt",
        "recordRecognitionReveal",
        "LocalRepository",
        "LearningRepository",
        "LM_LE_EVENTS_KEY",
        "LM_LE_SNAPSHOT_KEY",
        "useLessonV1LearningSession",
      ]) {
        assert(!code.includes(banned), `screens/${f} must not reference ${banned} in PR-05`);
      }
    }
  });

  test("the seven-screen dispatch is unchanged", () => {
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    for (const type of [
      "meet-card",
      "insight-card",
      "fill-with-traps",
      "weave",
      "say-it-your-way",
      "natural-reveal",
      "recap",
    ]) {
      assert(src.includes(`case "${type}":`), `${type} still dispatched`);
    }
  });

  // PR-05 required screens to receive ONLY `screen` + `onContinue`. PR-06
  // deliberately adds one UI-facts callback to each of the four Wave A
  // primitives, so that expectation is expired. The rule that still holds — and
  // is the one that actually matters — is WHAT may be passed: surface facts, and
  // never the controller, the repository, or any evidence decision.
  test("screens receive only surface facts, never learning machinery", () => {
    // Comment-stripped: the dispatcher's own doc block NAMES what may not be
    // passed, and prose must not read as code.
    const src = codeOf(read("components/lesson-v1/LessonRendererV1.tsx"));
    for (const banned of [
      "controller={",
      "repository={",
      "evidenceClass",
      "attribution",
      "admissibility",
      "snapshot={",
      "mastery",
      "monLexique",
    ]) {
      assert(!src.includes(banned), `no screen may receive "${banned}"`);
    }
    // The three non-Wave-A screens keep exactly the original two props.
    for (const quiet of ["InsightCard", "NaturalReveal", "RecapCard"]) {
      assert(
        new RegExp(`<${quiet} screen=\\{screen\\} onContinue=\\{onContinue\\} />`).test(src),
        `${quiet} still receives exactly screen + onContinue`,
      );
    }
  });

  test("the legacy completion marker remains, exactly once and unchanged", () => {
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    assertEqual(
      (src.match(/mk\(lesson\.number, V1_COMPLETION_SECTION_KEY\)/g) ?? []).length,
      1,
      "the legacy marker is still called exactly once",
    );
    assert(
      src.includes('const V1_COMPLETION_SECTION_KEY = "read_listen"'),
      "and its key is unchanged",
    );
    assert(
      !/mk\([^)]*\)[\s\S]{0,200}recordGradedAttempt/.test(src),
      "completion is NOT reinterpreted as learning evidence",
    );
  });
});

// ── Part I: import and ownership boundaries ─────────────────────────────────

describe("repository ownership boundaries", () => {
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") continue;
        walk(full, out);
      } else if (/\.tsx?$/.test(entry.name)) {
        out.push(full);
      }
    }
    return out;
  };

  /**
   * The ONE permitted non-runtime owner.
   *
   * `PrivacyDataControls` builds its own read-only `LocalRepository` to produce a
   * device-local EXPORT. That is privacy/export/reset infrastructure, which is
   * explicitly allowed to reach the repository — it records nothing, appends
   * nothing, and predates PR-05. It is exempted by NAME (never by pattern) so a
   * new offender can never hide behind the same allowance.
   */
  const PRIVACY_INFRA_OWNER = "components/learning-engine/PrivacyDataControls.tsx";

  test("only the provider and the privacy exporter construct a LocalRepository", () => {
    const files = ["app", "components", "providers", "hooks", "lib", "content"].flatMap((d) => {
      try {
        return walk(join(APP_ROOT, d));
      } catch {
        return [];
      }
    });
    // Comment-stripped: runtime.ts and the sandbox hook both DESCRIBE the
    // construction PR-05 removed, and prose must not read as code.
    const constructors = files
      .filter((f) => /new LocalRepository\(/.test(codeOf(readFileSync(f, "utf8"))))
      .map((f) => f.slice(APP_ROOT.length + 1))
      .sort();
    assertEqual(
      constructors.join(", "),
      `${PRIVACY_INFRA_OWNER}, providers/LearningEngineProvider.tsx`,
      "the app-level provider owns the learning repository; the privacy exporter is the one allowed exception",
    );
  });

  test("no lesson or learner screen imports the repository or a storage key", () => {
    const files = [...walk(join(APP_ROOT, "components")), ...walk(join(APP_ROOT, "app"))];
    const offenders: string[] = [];
    for (const f of files) {
      const rel = f.slice(APP_ROOT.length + 1);
      if (rel === PRIVACY_INFRA_OWNER) continue;
      const src = codeOf(readFileSync(f, "utf8"));
      if (
        /from "@\/content\/learning-engine\/repository\/local"/.test(src) ||
        /LM_LE_EVENTS_KEY|LM_LE_SNAPSHOT_KEY/.test(src)
      ) {
        offenders.push(rel);
      }
    }
    assertEqual(offenders.join(", "), "", "no component or route reaches storage directly");
  });
});

// ── regression: nothing else moved ──────────────────────────────────────────

describe("PR-05 changed no evidence or projection contract", () => {
  test("event schema, mastery and compaction versions are unchanged", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "event schema still 3");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "mastery still v0.3");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "compaction still v0.2");
  });

  test("assistance, attribution and error-tag vocabularies are unchanged", () => {
    assertEqual([...ASSISTANCE_CAPTURES].join(","), "known,unknown,legacy_unknown", "assistance");
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "the Canonical eight");
    assertEqual(ERROR_TAG_CODES.length, 16, "frozen taxonomy");
  });

  test("a runtime-created controller still produces fully valid v3 events", async () => {
    const repo = makeCountingRepository();
    const c = runtimeWith(repo).createSessionController(sessionOpts());
    c.recordGradedAttempt({
      exercise: exercise(),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: attemptContext(),
    });
    await c.flush();
    const { validateLearningEvent } = await import(
      "../../content/learning-engine/event-envelope"
    );
    assertEqual(
      validateLearningEvent(repo.appended[0]).join(" | "),
      "",
      "the envelope still validates what the runtime path builds",
    );
    assertEqual(repo.appended[0].admissibility.status, "admitted", "admission still resolved");
  });
});
