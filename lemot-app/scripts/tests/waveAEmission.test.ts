/**
 * PR-06 — Wave A lesson renderer / learning-event integration.
 *
 * The shipped lesson path can now report what the learner did. The risk this
 * suite guards is not "does an event appear" but "does the event tell the
 * truth": that a frame word around a blank is not credited as recognition, that
 * a register trap is a register miss and not a defect, that a hinted success is
 * not filed as independent production, that an ungraded attempt never becomes a
 * grade, and that finishing a lesson is still not evidence of learning.
 *
 * HONEST SCOPE NOTE. This repository ships no React component test renderer and
 * PR-06 does not add one. Everything below the component boundary — the pure
 * adapters, the shared typed evaluation, the controller, the repository, the
 * mastery and Mon Lexique projections — is tested BEHAVIOURALLY. The React
 * callback wiring itself (which prop goes to which screen, when a handler fires)
 * is verified at the SOURCE level only, and those tests say so in their names.
 *
 * CONTENT BOUNDARY. PM-009 and PM-011 are proven as RENDERER CAPABILITIES using
 * synthetic fixtures built from already-shipped French and existing canonical
 * item ids. Their exact final learner-facing payloads are NOT registered here —
 * that is PR-07, gated on human French QA.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { LearningEvent } from "../../content/learning-engine/events";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
  isAssessedEvent,
} from "../../content/learning-engine/events";
import { ATTRIBUTION_SOURCES } from "../../content/learning-engine/evidence-context";
import { validateLearningEvent } from "../../content/learning-engine/event-envelope";
import {
  MASTERY_SNAPSHOT_VERSION,
  createEmptyMasterySnapshot,
  deriveProductionClaim,
  scoreEvents,
} from "../../content/learning-engine/mastery";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import { selectMonLexiqueEntries } from "../../content/learning-engine/mon-lexique";
import { LocalRepository } from "../../content/learning-engine/repository/local";
import { createLearningEngineRuntime } from "../../content/learning-engine/runtime";
import type { EventSurfaceResolver } from "../../content/learning-engine/session-controller";
import {
  LessonEvidenceTargetError,
  qualifyLessonScreenId,
  resolveEvidenceTargetItemIds,
} from "../../content/lesson-v1-evidence/identity";
import {
  LessonTreatmentError,
  resolveLessonTreatmentForItem,
} from "../../content/lesson-v1-evidence/treatment";
import { evaluateTypedAnswer } from "../../content/lesson-v1-evidence/typedEvaluation";
import {
  choiceInteraction,
  gradeChoice,
  meetExposureInteraction,
  openAttemptInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import { checkLessonEvidenceRules } from "../lessonEvidenceRules";
import { V1_LESSONS } from "../../content/lessons/v1";
import { getItems } from "../../content/itemRegistry";
import type {
  FillWithTrapsScreen,
  Lesson,
  MeetCardScreen,
  SayItYourWayScreen,
  WeaveScreen,
} from "../../content/lessonTypes";
import type { ItemId, RawItem } from "../../content/learning-engine/types";

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

const lesson000 = V1_LESSONS.find((l) => l.id === "v1-lesson-000") as Lesson;
const lesson001 = V1_LESSONS.find((l) => l.id === "v1-lesson-001") as Lesson;

const LESSON_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "lesson_path",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

function makeSession(kv = makeFakeKv()) {
  const repo = new LocalRepository(kv);
  let t = 0;
  let n = 0;
  const controller = createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => "sess-test",
  }).createSessionController({
    lessonId: "v1-lesson-001",
    contentVersion: "v1",
    resolveEventSurface: LESSON_SURFACE,
    now: () => (t += 1_000),
    makeClientEventId: () => `evt-${(n += 1)}`,
  });
  return { repo, controller, kv };
}

const screenOf = <T,>(lesson: Lesson, id: string): T =>
  lesson.screens.find((s) => s.id === id) as unknown as T;

// ── SYNTHETIC renderer-capability fixtures ──────────────────────────────────
//
// Built from ALREADY-SHIPPED French and EXISTING canonical item ids. They are
// never added to a lesson file, never registered, and never learner-reachable.

/** PM-009 capability: typed recall as a Weave configuration (D-6). */
const pm009Fixture: WeaveScreen = {
  id: "syn-typed-recall-merci",
  type: "weave",
  targetItemIds: ["chunk-merci"],
  payload: {
    weaveType: "mid",
    prompt: "Write it in French: thank you",
    // No suggestedPieces. No hintCloze. No constitutive support. Typed recall.
    expectedAnswers: ["Merci"],
    acceptedAlternatives: ["Merci !"],
    reveal: { modelAnswer: "Merci" },
  },
};

/** PM-011 capability: a visible, constitutive supplied package. */
const pm011Fixture: WeaveScreen = {
  id: "syn-supported-package",
  type: "weave",
  targetItemIds: ["noun-cafe"],
  payload: {
    weaveType: "supported",
    prompt: "Write it in French: a coffee",
    suggestedPieces: [
      { text: "un café", itemId: "noun-cafe", supportRole: "constitutive" },
    ],
    expectedAnswers: ["un café"],
    reveal: { modelAnswer: "un café" },
  },
};

/** A lesson wrapper for the synthetic screens — never exported, never shipped. */
const syntheticLesson: Lesson = {
  ...lesson001,
  id: "syn-lesson",
  screens: [pm009Fixture, pm011Fixture],
  learningItems: getItems(["chunk-merci", "noun-cafe"]),
};

const REGISTRY: Record<ItemId, RawItem> = {
  "chunk-merci": { text: { fr: "Merci", en: "Thank you" } },
  "noun-cafe": { text: { fr: "un café", en: "a coffee" } },
} as unknown as Record<ItemId, RawItem>;

// ── identity and targeting ──────────────────────────────────────────────────

describe("qualified screen identity", () => {
  test("qualification is deterministic and content-free", () => {
    assertEqual(
      qualifyLessonScreenId("v1-lesson-000", "s00-meet-bonjour"),
      "v1-lesson-000/s00-meet-bonjour",
      "stable",
    );
    assertEqual(
      qualifyLessonScreenId("v1-lesson-000", "s00-meet-bonjour"),
      qualifyLessonScreenId("v1-lesson-000", "s00-meet-bonjour"),
      "same inputs, same output",
    );
    const id = qualifyLessonScreenId("v1-lesson-001", "s01");
    assert(!/L1-PM-\d+/.test(id), "no planning id");
    assert(!/[À-ÿ]/.test(id), "no French surface text");
  });

  test("bare screen ids DO repeat across lessons — which is why qualification exists", () => {
    const bare = V1_LESSONS.flatMap((l) => l.screens.map((s) => s.id));
    const repeated = bare.filter((id, i) => bare.indexOf(id) !== i);
    assert(repeated.length > 0, "the collision this rule guards against is real, not theoretical");
  });

  test("qualified ids are unique across every current V1 lesson", () => {
    const qualified = V1_LESSONS.flatMap((l) =>
      l.screens.map((s) => qualifyLessonScreenId(l.id, s.id)),
    );
    assertEqual(new Set(qualified).size, qualified.length, "no collision after qualification");
    assert(qualified.length > 50, "the whole registry was actually scanned");
  });
});

describe("canonical evidence targeting", () => {
  const meet = screenOf<MeetCardScreen>(lesson000, "s00-meet-bonjour");

  test("absent override falls back to the full target list", () => {
    assertEqual(
      resolveEvidenceTargetItemIds(meet).join(","),
      (meet.targetItemIds ?? []).join(","),
      "default is targetItemIds",
    );
  });

  test("the L0 choice screen scopes evidence to the assessed slot only", () => {
    const fill = screenOf<FillWithTrapsScreen>(lesson000, "s03-fill-je-voudrais-blank");
    assertEqual(
      (fill.targetItemIds ?? []).join(","),
      "chunk-je-voudrais,noun-cafe",
      "the screen still INVOLVES the frame",
    );
    assertEqual(
      resolveEvidenceTargetItemIds(fill).join(","),
      "noun-cafe",
      "but only the chosen noun receives evidence",
    );
  });

  test("a non-subset override is rejected", () => {
    let caught: unknown = null;
    try {
      resolveEvidenceTargetItemIds({
        ...meet,
        evidenceTargetItemIds: ["chunk-merci"],
      } as MeetCardScreen);
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof LessonEvidenceTargetError, "must reject a non-subset target");
  });

  test("a duplicated or empty override is rejected", () => {
    for (const bad of [["chunk-bonjour", "chunk-bonjour"], []]) {
      let caught: unknown = null;
      try {
        resolveEvidenceTargetItemIds({
          ...meet,
          targetItemIds: ["chunk-bonjour"],
          evidenceTargetItemIds: bad,
        } as MeetCardScreen);
      } catch (e) {
        caught = e;
      }
      assert(caught instanceof LessonEvidenceTargetError, `must reject ${JSON.stringify(bad)}`);
    }
  });

  test("an unknown id and a FIXTURE alias are both rejected from the shipped path", () => {
    for (const bad of ["not-a-real-item", "chunk:s-il-vous-plait"]) {
      let caught: unknown = null;
      try {
        resolveEvidenceTargetItemIds({
          ...meet,
          targetItemIds: [bad],
        } as MeetCardScreen);
      } catch (e) {
        caught = e;
      }
      assert(
        caught instanceof LessonEvidenceTargetError,
        `"${bad}" must never reach the shipped event log`,
      );
    }
  });
});

describe("shipped-lesson treatment resolution", () => {
  test("the lesson's own authored status decides the treatment", () => {
    assertEqual(
      resolveLessonTreatmentForItem("chunk-merci" as ItemId, lesson001),
      "active",
      "an active lesson item",
    );
  });

  test("an unstated target fails closed rather than defaulting to active", () => {
    let caught: unknown = null;
    try {
      resolveLessonTreatmentForItem("chunk-bonsoir" as ItemId, lesson001);
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof LessonTreatmentError, "guessing would manufacture a claim");
  });

  test("a duplicated lesson item record is ambiguous, not resolved by first-match", () => {
    const dup: Lesson = {
      ...lesson001,
      learningItems: [...lesson001.learningItems, lesson001.learningItems[0]],
    };
    let caught: unknown = null;
    try {
      resolveLessonTreatmentForItem(dup.learningItems[0].id as ItemId, dup);
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof LessonTreatmentError, "ambiguity must be loud");
  });
});

// ── shared typed evaluation ─────────────────────────────────────────────────

describe("shared typed evaluation drives UI and event together", () => {
  const evaluate = (text: string) =>
    evaluateTypedAnswer({
      userAnswer: text,
      expectedAnswers: ["Merci"],
      acceptedAlternatives: ["Merci !"],
    });

  test("an exact normalized match is UI exact and event correct", () => {
    const e = evaluate("Merci");
    assertEqual(e.match, "exact", "UI");
    assertEqual(e.grade.result, "correct", "event");
  });

  test("the authored accepted boundary decides Merci / Merci. / Merci !", () => {
    // "Merci." — the trailing period is harmless orthography the existing
    // normalizer folds, so it stays an exact match (unchanged behaviour).
    assertEqual(evaluate("Merci.").match, "exact", "period folds");
    assertEqual(evaluate("Merci.").grade.result, "correct", "and the event agrees");
    // "Merci !" — "!" is meaning-bearing and does NOT fold; it counts only
    // because THIS payload authored it as an accepted alternative.
    assertEqual(evaluate("Merci !").match, "alternative", "authored alternative");
    assertEqual(evaluate("Merci !").grade.result, "accepted_variant", "and the event agrees");
  });

  test("an unauthored exclamation is not silently accepted", () => {
    const strict = evaluateTypedAnswer({ userAnswer: "Merci !", expectedAnswers: ["Merci"] });
    assert(strict.match === "none", "without an authored alternative it does not match");
    assert(
      strict.grade.result !== "correct" && strict.grade.result !== "accepted_variant",
      "and the event never resurrects a success the UI refused",
    );
  });

  test("a no-match answer is diagnosed by the deterministic engine", () => {
    const e = evaluate("Merci beaucoup");
    assertEqual(e.match, "none", "UI");
    assertEqual(e.grade.result, "extra_word", "event carries a real diagnosis");
    assertEqual(e.grade.errorTags.join(","), "extra_word", "tags mirror the result");
  });

  test("an empty answer is a skip, not a wrong answer", () => {
    assertEqual(evaluate("   ").grade.result, "empty_or_skip", "skip");
  });

  test("the event grader can never overturn a UI match", () => {
    for (const text of ["Merci", "Merci.", "Merci !", "merci"]) {
      const e = evaluate(text);
      const success = e.grade.result === "correct" || e.grade.result === "accepted_variant";
      assertEqual(success, e.match !== "none", `"${text}": UI and event agree on success`);
    }
  });
});

// ── choice / register trap ──────────────────────────────────────────────────

describe("choice and register-trap grading", () => {
  const fillL1 = screenOf<FillWithTrapsScreen>(lesson001, "s03-fill-polite-verb");

  test("the correct option grades as correct", () => {
    assertEqual(gradeChoice(fillL1, "opt-voudrais").result, "correct", "correct");
  });

  test("an ordinary wrong option defaults to wrong_item", () => {
    assertEqual(gradeChoice(fillL1, "opt-suis").result, "wrong_item", "conservative default");
  });

  test("the je veux option is a REGISTER miss, not a defect", () => {
    assertEqual(
      gradeChoice(fillL1, "opt-veux").result,
      "wrong_register",
      "real French, wrong register",
    );
  });

  test("a register miss stays learner-attributed and admitted", async () => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(choiceInteraction(lesson001, fillL1, { optionId: "opt-veux" }));
    await controller.flush();
    const e = (await repo.readAllEvents())[0];
    assert(isAssessedEvent(e), "assessed");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "learner",
      "the learner produced it — no ninth 'authored trap' source exists",
    );
    assertEqual(e.admissibility.status, "admitted", "admitted");
    assertEqual(e.evidenceClass, "recognition", "recognition evidence");
    assertEqual(e.result, "wrong_register", "narrowly tagged");
  });

  test("one register miss does not create weakness", async () => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(choiceInteraction(lesson001, fillL1, { optionId: "opt-veux" }));
    await controller.flush();
    const snap = scoreEvents(await repo.readAllEvents());
    const m = snap.items["chunk-je-voudrais"];
    assertEqual(m.isWeak, false, "one miss is below the unchanged threshold");
    assertEqual(m.wrongCount, 1, "but it IS recorded");
  });

  test("only the scoped evidence target receives counters", async () => {
    const fillL0 = screenOf<FillWithTrapsScreen>(lesson000, "s03-fill-je-voudrais-blank");
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(choiceInteraction(lesson000, fillL0, { optionId: "opt-cafe" }));
    await controller.flush();
    const snap = scoreEvents(await repo.readAllEvents());
    assertEqual(Object.keys(snap.items).join(","), "noun-cafe", "only the chosen noun");
    assertEqual(snap.items["noun-cafe"].recognitionSuccess, 1, "recognition success");
    assertEqual(
      snap.items["chunk-je-voudrais"],
      undefined,
      "the printed frame gets no credit for a word the learner never chose",
    );
  });

  test("a choice emits exactly one event", async () => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fillL1, { optionId: "opt-voudrais" }),
    );
    await controller.flush();
    assertEqual((await repo.readAllEvents()).length, 1, "one selection, one event");
  });
});

// ── Meet exposure ───────────────────────────────────────────────────────────

describe("Meet exposure", () => {
  const meet = screenOf<MeetCardScreen>(lesson000, "s00-meet-bonjour");

  test("it emits one non-assessed exposure event with no mastery movement", async () => {
    const { repo, controller } = makeSession();
    controller.recordExposure(meetExposureInteraction(lesson000, meet, { ttsPlayCount: 0 }));
    await controller.flush();
    const events = await repo.readAllEvents();
    assertEqual(events.length, 1, "one event");
    const e = events[0];
    assert(!isAssessedEvent(e), "non-assessed");
    assertEqual(e.primitive, "exposure", "exposure primitive");
    assertEqual(e.evidenceClass, "exposure", "exposure evidence");
    assertEqual(e.outcome, "completed_unassessed", "outcome");
    assertEqual(e.userAnswer, null, "nothing was answered");
    assertEqual(validateLearningEvent(e).join(" | "), "", "valid v3");

    const snap = scoreEvents(events);
    assertEqual(Object.keys(snap.items).length, 0, "meeting a form moves no counter");
  });

  test("replay count is conservative: the first play is not a replay", () => {
    for (const [plays, expected] of [[0, 0], [1, 0], [3, 2]] as const) {
      const { context } = meetExposureInteraction(lesson000, meet, { ttsPlayCount: plays });
      const a = context.assistance;
      assertEqual(
        a.capture === "known" ? a.accessibility.replayCount : -1,
        expected,
        `${plays} plays → ${expected} replays`,
      );
    }
  });

  test("the screen reports on CONTINUE, not on mount, and guards a double tap", () => {
    // Source-level: the component cannot be mounted in this harness.
    const src = codeOf(read("components/lesson-v1/screens/MeetCard.tsx"));
    assert(src.includes("const handleContinue"), "emission is bound to Continue");
    assert(src.includes("onPress={handleContinue}"), "and the button uses it");
    assert(src.includes("reported.current"), "a double tap cannot emit twice");
    assert(!src.includes("useEffect"), "no emit-on-mount effect exists");
  });
});

// ── typed production: hint and constitutive support ────────────────────────

describe("typed production assistance capture", () => {
  const weaveOf = (screen: WeaveScreen, lesson: Lesson) => async (facts: {
    text: string;
    hintRung: 0 | 1 | 2;
    constitutiveSupportRendered: boolean;
  }) => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(typedAttemptInteraction(lesson, screen, facts));
    await controller.flush();
    return (await repo.readAllEvents())[0];
  };

  test("a no-hint attempt keeps its independent production claim", async () => {
    const e = await weaveOf(pm009Fixture, syntheticLesson)({
      text: "Merci",
      hintRung: 0,
      constitutiveSupportRendered: false,
    });
    assertEqual(e.evidenceClass, "controlled_production", "independent");
    const a = e.assistance;
    assertEqual(a.capture === "known" ? a.hintRung : -1, 0, "rung 0 persisted");
  });

  test("hint rung 1 scopes the attempt to Supported", async () => {
    const e = await weaveOf(pm009Fixture, syntheticLesson)({
      text: "Merci",
      hintRung: 1,
      constitutiveSupportRendered: false,
    });
    assertEqual(e.evidenceClass, "supported_production", "help changes what it proves");
    assertEqual(e.assistance.capture === "known" ? e.assistance.hintRung : -1, 1, "actual rung");
  });

  test("hint rung 2 scopes the attempt to Supported and persists rung 2", async () => {
    const e = await weaveOf(pm009Fixture, syntheticLesson)({
      text: "Merci",
      hintRung: 2,
      constitutiveSupportRendered: false,
    });
    assertEqual(e.evidenceClass, "supported_production", "supported");
    assertEqual(e.assistance.capture === "known" ? e.assistance.hintRung : -1, 2, "rung 2");
  });

  test("an optional tray is NOT constitutive support", async () => {
    const e = await weaveOf(pm009Fixture, syntheticLesson)({
      text: "Merci",
      hintRung: 1,
      constitutiveSupportRendered: false,
    });
    const a = e.assistance;
    assertEqual(
      a.capture === "known" ? a.constitutive.length : -1,
      0,
      "asking for a hint is help, not a supplied package",
    );
  });

  test("weaveType 'supported' alone does not create Supported evidence", async () => {
    // A supported-TYPE weave whose pieces are ordinary optional hints, unused.
    const optionalPieces: WeaveScreen = {
      ...pm011Fixture,
      payload: {
        ...pm011Fixture.payload,
        suggestedPieces: [{ text: "un café", itemId: "noun-cafe" }],
      },
    };
    const e = await weaveOf(optionalPieces, syntheticLesson)({
      text: "un café",
      hintRung: 0,
      constitutiveSupportRendered: false,
    });
    assertEqual(
      e.evidenceClass,
      "controlled_production",
      "the authored weaveType label is not proof that support was visible",
    );
  });

  test("a visible constitutive package scopes to Supported", async () => {
    const e = await weaveOf(pm011Fixture, syntheticLesson)({
      text: "un café",
      hintRung: 0,
      constitutiveSupportRendered: true,
    });
    assertEqual(e.evidenceClass, "supported_production", "supported");
    const a = e.assistance;
    assertEqual(
      a.capture === "known" ? a.constitutive.join(",") : "?",
      "supplied_package",
      "the package is recorded as constitutive support",
    );
  });

  test("a declared package that was NOT rendered is a UI-flow quarantine", async () => {
    const e = await weaveOf(pm011Fixture, syntheticLesson)({
      text: "un café",
      hintRung: 0,
      constitutiveSupportRendered: false,
    });
    assertEqual(e.admissibility.status, "quarantined", "quarantined");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "ui_flow",
      "the learner was asked for something the screen never gave them",
    );
    assertEqual(e.evidenceClass, "no_mastery_evidence", "and it proves nothing");
    const snap = scoreEvents([e]);
    assertEqual(Object.keys(snap.items).length, 0, "no counter moves");
  });

  test("one Check emits exactly one event", async () => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(
      typedAttemptInteraction(syntheticLesson, pm009Fixture, {
        text: "Merci",
        hintRung: 0,
        constitutiveSupportRendered: false,
      }),
    );
    await controller.flush();
    assertEqual((await repo.readAllEvents()).length, 1, "one Check, one event");
  });

  test("the screen emits on Check only — Continue reports nothing", () => {
    const src = codeOf(read("components/lesson-v1/screens/Weave.tsx"));
    const check = src.indexOf("const handleCheck");
    const emit = src.indexOf("onTypedAttempt?.(");
    assert(check >= 0 && emit > check, "the single emission sits inside handleCheck");
    assert(
      /<Btn onPress=\{onContinue\}>/.test(src),
      "Continue still calls only onContinue",
    );
  });
});

// ── D-6: typed recall is a Weave configuration ─────────────────────────────

describe("D-6 — typed recall reuses Weave", () => {
  test("no new typed screen type was created", () => {
    const types = read("content/lessonTypes.ts");
    for (const banned of ["TypedRecallScreen", "TextExerciseScreen", '"typed-recall"']) {
      assert(!types.includes(banned), `${banned} must not exist — D-6 reuses Weave`);
    }
    const screens = readdirSync(join(APP_ROOT, "components/lesson-v1/screens"));
    assert(
      !screens.some((f) => /TypedRecall|TextExercise/.test(f)),
      "no new renderer file either",
    );
  });

  test("a typed-recall Weave works with no pieces and no cloze", () => {
    assertEqual(pm009Fixture.payload.suggestedPieces, undefined, "no tray");
    assertEqual(pm009Fixture.payload.hintCloze, undefined, "no cloze");
    const input = typedAttemptInteraction(syntheticLesson, pm009Fixture, {
      text: "Merci",
      hintRung: 0,
      constitutiveSupportRendered: false,
    });
    assertEqual(input.exercise.operation, "fill", "an ordinary Weave blueprint");
    assertEqual(input.gradeResult.result, "correct", "graded deterministically");
  });
});

// ── open production ─────────────────────────────────────────────────────────

describe("open production: attempt then reveal, never a grade", () => {
  const sayIt = screenOf<SayItYourWayScreen>(lesson000, lesson000.screens.filter((s) => s.type === "say-it-your-way")[0].id);

  const run = async () => {
    const { repo, controller } = makeSession();
    const { attempt, reveal } = openAttemptInteraction(lesson000, sayIt, {
      text: "Bonjour, je voudrais un café.",
      ideaPiecesShown: false,
      revisionCount: 0,
      modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
    });
    controller.recordOpenProductionAttempt(attempt);
    controller.recordComparisonReveal(reveal);
    await controller.flush();
    return { events: await repo.readAllEvents() };
  };

  test("exactly two events, in order", async () => {
    const { events } = await run();
    assertEqual(events.length, 2, "two events");
    assertEqual(events[0].primitive, "production", "attempt first");
    assertEqual(events[0].evidenceClass, "open_production_attempt", "ungraded attempt");
    assertEqual(events[1].primitive, "reveal", "reveal second");
    assertEqual(events[1].evidenceClass, "comparison_only", "comparison only");
  });

  test("both are non-assessed and carry no correctness claim", async () => {
    const { events } = await run();
    for (const e of events) {
      assert(!isAssessedEvent(e), "non-assessed");
      assertEqual((e as { result?: unknown }).result, undefined, "no result");
      assertEqual((e as { errorTags?: unknown }).errorTags, undefined, "no error tags");
      assertEqual(
        (e as { normalizedAnswer?: unknown }).normalizedAnswer,
        undefined,
        "no normalized answer",
      );
      assertEqual(e.outcome, "completed_unassessed", "outcome");
      assertEqual(
        e.attribution.status,
        "not_applicable",
        "nothing is attributed to the learner — there was nothing to attribute",
      );
      assertEqual(validateLearningEvent(e).join(" | "), "", "valid v3");
    }
  });

  test("the raw attempt is stored on the attempt event only", async () => {
    const { events } = await run();
    assertEqual(events[0].userAnswer, "Bonjour, je voudrais un café.", "attempt keeps the text");
    assertEqual(events[1].userAnswer, null, "the reveal is not a second copy of it");
    assertEqual(
      events[1].expectedAnswer,
      "Bonjour, je voudrais un café, s'il vous plaît.",
      "the model is stored for comparison",
    );
  });

  test("no item mastery moves, and the model difference never creates weakness", async () => {
    const { events } = await run();
    const snap = scoreEvents(events);
    assertEqual(Object.keys(snap.items).length, 0, "no item row at all");
    assertEqual(snap.processedClientEventIds.length, 2, "but both were processed");
  });

  test("replay is idempotent", async () => {
    const { events } = await run();
    const once = scoreEvents(events);
    const twice = scoreEvents(events, once);
    assertEqual(JSON.stringify(twice), JSON.stringify(once), "stable");
  });

  test("PM-014 is never marked as self-correction (that is PM-015)", () => {
    const { attempt } = openAttemptInteraction(lesson000, sayIt, {
      text: "x",
      ideaPiecesShown: true,
      revisionCount: 2,
      modelAnswer: null,
    });
    const a = attempt.context.assistance;
    assertEqual(a.capture === "known" ? a.selfCorrection : true, false, "not a repair");
    assertEqual(a.capture === "known" ? a.hintRung : -1, 1, "idea pieces are rung 1 help");
    assertEqual(a.capture === "known" ? a.retryIndex : -1, 2, "revisions counted, not judged");
    assertEqual(
      a.capture === "known" ? a.priorAnswerExposure : "?",
      "none",
      "the model appears only AFTER committing",
    );
  });

  test("the screen emits on Keep and compare only, and AI never enters evidence", () => {
    const src = codeOf(read("components/lesson-v1/screens/SayItYourWayV1.tsx"));
    const keep = src.indexOf("const handleKeepAndCompare");
    const emit = src.indexOf("onOpenAttempt?.(");
    assert(keep >= 0 && emit > keep, "the emission is inside handleKeepAndCompare");
    const tryAgain = src.slice(src.indexOf("const handleTryAgain"), keep);
    assert(!tryAgain.includes("onOpenAttempt"), "Try again emits nothing");
    const check = src.slice(src.indexOf("const handleCheck"), src.indexOf("const handleTryAgain"));
    assert(!check.includes("onOpenAttempt"), "Check (confirm step) emits nothing");
    // The reported facts are text / pieces / revisions / model — no AI field.
    const facts = src.slice(emit, emit + 300);
    assert(!/\bai\b|feedback/.test(facts), "AI output is not among the reported facts");
  });
});

// ── Part O: connected event → mastery → Mon Lexique ────────────────────────

describe("connected proof: shipped path → event → mastery → Mon Lexique", () => {
  test("a clean typed recall becomes independent production and Mon Lexique ownership", async () => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(
      typedAttemptInteraction(syntheticLesson, pm009Fixture, {
        text: "Merci",
        hintRung: 0,
        constitutiveSupportRendered: false,
      }),
    );
    await controller.flush();

    const events = await repo.readAllEvents();
    assertEqual(events.length, 1, "exactly one event");
    const e = events[0];
    assertEqual(e.schemaVersion, 3, "v3");
    assertEqual(validateLearningEvent(e).join(" | "), "", "valid");
    assertEqual(e.placement, "lesson_path", "shipped lesson placement");
    assertEqual(e.itemIds.join(","), "chunk-merci", "canonical item id");
    assertEqual(e.payloadId, "syn-lesson/syn-typed-recall-merci", "qualified payload id");
    assertEqual(e.evId, null, "no EV identity invented");
    assertEqual(e.sentenceId, null, "no sentence identity invented");
    assertEqual(e.evidenceClass, "controlled_production", "controlled production");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "learner",
      "learner-attributed",
    );
    assertEqual(e.admissibility.status, "admitted", "admitted");
    const a = e.assistance;
    assertEqual(a.capture === "known" ? a.hintRung : -1, 0, "no hint");
    assertEqual(a.capture === "known" ? a.constitutive.length : -1, 0, "no constitutive support");

    const snap = scoreEvents(events);
    assertEqual(snap.version, MASTERY_SNAPSHOT_VERSION, "mastery v0.3");
    const m = snap.items["chunk-merci"];
    assertEqual(m.production.independent.success, 1, "independent channel");
    assertEqual(m.production.supported.success, 0, "not supported");
    assertEqual(deriveProductionClaim(m.production), "independent", "independent claim");

    const entries = selectMonLexiqueEntries({ items: REGISTRY, snapshot: snap });
    assertEqual(entries.length, 1, "one entry");
    assertEqual(entries[0].itemId, "chunk-merci", "the right item");
    assertEqual(entries[0].status, "added", "eligible");
    assertEqual(entries[0].productionClaim, "independent", "independent claim");
  });

  test("a constitutively supported success takes the Supported path only", async () => {
    const { repo, controller } = makeSession();
    controller.recordGradedAttempt(
      typedAttemptInteraction(syntheticLesson, pm011Fixture, {
        text: "un café",
        hintRung: 0,
        constitutiveSupportRendered: true,
      }),
    );
    await controller.flush();
    const snap = scoreEvents(await repo.readAllEvents());
    const m = snap.items["noun-cafe"];
    assertEqual(m.production.supported.success, 1, "supported channel");
    assertEqual(m.production.independent.success, 0, "independent stays ZERO");
    assertEqual(m.productionSuccess, 1, "aggregate equals the channel sum");
    assertEqual(deriveProductionClaim(m.production), "supported", "supported claim");

    const entries = selectMonLexiqueEntries({ items: REGISTRY, snapshot: snap });
    assertEqual(entries[0].status, "added", "Supported still earns Mon Lexique");
    assertEqual(entries[0].productionClaim, "supported", "and reports the honest claim");
  });

  test("no legacy SRS, Practice, Stats or feature-local store was written", async () => {
    const kv = makeFakeKv();
    const { controller } = makeSession(kv);
    controller.recordGradedAttempt(
      typedAttemptInteraction(syntheticLesson, pm009Fixture, {
        text: "Merci",
        hintRung: 0,
        constitutiveSupportRendered: false,
      }),
    );
    await controller.flush();
    assertEqual(
      [...kv.map.keys()].sort().join(","),
      "lm_le_events",
      "the append-only event log is the ONLY thing the shipped path writes",
    );
  });
});

// ── Part Q: import and mutation boundaries ─────────────────────────────────

describe("lesson screens cannot reach learning machinery", () => {
  test("no screen imports persistence, mastery or a derived-surface mutator", () => {
    const dir = join(APP_ROOT, "components/lesson-v1/screens");
    const files = readdirSync(dir).filter((f) => /\.tsx?$/.test(f));
    assert(files.length >= 8, "the screen directory was actually scanned");
    for (const f of files) {
      const code = codeOf(readFileSync(join(dir, f), "utf8"));
      for (const banned of [
        "LocalRepository",
        "LearningRepository",
        "LM_LE_EVENTS_KEY",
        "LM_LE_SNAPSHOT_KEY",
        "scoreEvent",
        "scoreEvents",
        "appendEvent",
        "selectMonLexiqueEntries",
        "selectPracticePoolBuckets",
        "useSRS",
        "useLessonV1LearningSession",
        "LearningSessionController",
      ]) {
        assert(!code.includes(banned), `screens/${f} must not reference ${banned}`);
      }
    }
  });

  test("no screen constructs a LearningEvent", () => {
    const dir = join(APP_ROOT, "components/lesson-v1/screens");
    for (const f of readdirSync(dir).filter((n) => /\.tsx?$/.test(n))) {
      const code = codeOf(readFileSync(join(dir, f), "utf8"));
      assert(
        !code.includes("createLearningEvent") && !code.includes("schemaVersion"),
        `screens/${f} must not build an event`,
      );
    }
  });

  test("the provider exposes record functions, not the controller", () => {
    const src = read("components/lesson-v1/LessonV1LearningSessionProvider.tsx");
    assert(
      !/export type LessonV1LearningSession = \{[^}]*controller:/s.test(src),
      "the controller is no longer part of the public shape",
    );
    for (const fn of [
      "recordMeetExposure",
      "recordChoiceAttempt",
      "recordTypedAttempt",
      "recordOpenAttemptAndReveal",
    ]) {
      assert(src.includes(`${fn}(`), `${fn} is part of the narrow API`);
    }
  });
});

// ── content validation ──────────────────────────────────────────────────────

describe("lesson evidence metadata validation", () => {
  test("the shipped lessons pass every PR-06 rule", () => {
    assertEqual(checkLessonEvidenceRules(V1_LESSONS).length, 0, "clean");
  });

  test("a correct option carrying an error tag is rejected", () => {
    const bad = structuredClone(lesson001) as Lesson;
    const screen = bad.screens.find((s) => s.id === "s03-fill-polite-verb") as FillWithTrapsScreen;
    screen.payload.options[0].learningErrorTag = "wrong_item";
    const codes = checkLessonEvidenceRules([bad]).map((f) => f.code);
    assert(codes.includes("choice_tag_on_correct_option"), "rejected");
  });

  test("an incorrect option may not claim success", () => {
    for (const tag of ["correct", "accepted_variant"] as const) {
      const bad = structuredClone(lesson001) as Lesson;
      const screen = bad.screens.find(
        (s) => s.id === "s03-fill-polite-verb",
      ) as FillWithTrapsScreen;
      screen.payload.options[1].learningErrorTag = tag;
      const codes = checkLessonEvidenceRules([bad]).map((f) => f.code);
      assert(codes.includes("choice_tag_claims_success"), `${tag} rejected`);
    }
  });

  test("an unknown error tag is rejected", () => {
    const bad = structuredClone(lesson001) as Lesson;
    const screen = bad.screens.find((s) => s.id === "s03-fill-polite-verb") as FillWithTrapsScreen;
    (screen.payload.options[1] as { learningErrorTag?: string }).learningErrorTag = "not_a_tag";
    const codes = checkLessonEvidenceRules([bad]).map((f) => f.code);
    assert(codes.includes("choice_tag_unknown"), "rejected");
  });

  test("a constitutive piece without a canonical itemId is rejected", () => {
    const noId: Lesson = {
      ...syntheticLesson,
      screens: [
        {
          ...pm011Fixture,
          payload: {
            ...pm011Fixture.payload,
            suggestedPieces: [{ text: "un café", supportRole: "constitutive" }],
          },
        },
      ],
    };
    assert(
      checkLessonEvidenceRules([noId]).some((f) => f.code === "constitutive_piece_without_item"),
      "an unidentifiable package is rejected",
    );

    const badId: Lesson = {
      ...syntheticLesson,
      screens: [
        {
          ...pm011Fixture,
          payload: {
            ...pm011Fixture.payload,
            suggestedPieces: [
              { text: "un café", itemId: "not-real", supportRole: "constitutive" },
            ],
          },
        },
      ],
    };
    assert(
      checkLessonEvidenceRules([badId]).some((f) => f.code === "constitutive_piece_not_canonical"),
      "a non-canonical package item is rejected",
    );
  });

  test("open production may not be routed through deterministic grading", () => {
    const bad = structuredClone(lesson000) as Lesson;
    const sayIt = bad.screens.find((s) => s.type === "say-it-your-way") as SayItYourWayScreen;
    sayIt.payload.validationMode = "exact-or-alternative";
    assert(
      checkLessonEvidenceRules([bad]).some((f) => f.code === "open_production_graded"),
      "an ungraded attempt must never meet a grader",
    );
  });

  test("a non-subset or non-canonical evidence target is rejected", () => {
    const bad = structuredClone(lesson000) as Lesson;
    const fill = bad.screens.find(
      (s) => s.id === "s03-fill-je-voudrais-blank",
    ) as FillWithTrapsScreen;
    fill.evidenceTargetItemIds = ["chunk-merci"];
    const codes = checkLessonEvidenceRules([bad]).map((f) => f.code);
    assert(codes.includes("evidence_target_not_subset"), "rejected");
  });

  test("a duplicated qualified screen id is rejected", () => {
    const a: Lesson = { ...lesson000, screens: [lesson000.screens[0]] };
    assert(
      checkLessonEvidenceRules([a, a]).some((f) => f.code === "duplicate_qualified_screen_id"),
      "two lessons cannot claim one qualified id",
    );
  });
});

// ── the pilot-payload boundary, stated explicitly ──────────────────────────

describe("final pilot payloads remain PR-07 work", () => {
  test("no lesson file contains the synthetic capability fixtures", () => {
    const dir = join(APP_ROOT, "content/lessons/v1");
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".ts"))) {
      const src = readFileSync(join(dir, f), "utf8");
      for (const marker of ["syn-typed-recall-merci", "syn-supported-package", "syn-lesson"]) {
        assert(!src.includes(marker), `${f} must not carry the synthetic fixture ${marker}`);
      }
    }
  });

  // PR-06 pinned the tea identity ABSENT (nothing registered ahead of the QA
  // gate). PR-07 registered it under the recorded founder waiver, so the pin
  // moves with the truth: the identity now exists, explicitly PROVISIONAL —
  // never human-approved — and the exact-registration proofs live in
  // pilotPayloadRegistration.test.ts.
  test("the un thé identity is now registered as founder-waived provisional (PR-07)", () => {
    const registry = read("content/itemRegistry.ts");
    assert(/un thé/.test(registry), "the tea package identity exists");
    const teaRow = registry.slice(registry.indexOf('"chunk-un-the"'));
    assert(
      teaRow.slice(0, teaRow.indexOf("},")).includes("founder_waived_provisional"),
      "and it is provisional, not approved",
    );
  });

  test("no L1-PM planning id became a runtime identity", () => {
    for (const rel of [
      "content/lesson-v1-evidence/identity.ts",
      "content/lesson-v1-evidence/interactions.ts",
      "components/lesson-v1/LessonV1LearningSessionProvider.tsx",
    ]) {
      assert(!/"L1-PM-\d+"/.test(read(rel)), `${rel} mints no planning id`);
    }
  });

  test("no sentence record and no EV id was registered", () => {
    const src =
      read("content/lesson-v1-evidence/interactions.ts") +
      read("components/lesson-v1/LessonV1LearningSessionProvider.tsx");
    assert(!/sentenceId: "/.test(src), "sentence identity stays null");
    assert(!/evId: "EV-/.test(src), "no EV identity is invented");
  });
});

// ── regression ──────────────────────────────────────────────────────────────

describe("PR-06 changed no frozen contract", () => {
  test("schema, mastery and compaction versions are unchanged", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "event schema");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "mastery");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "compaction");
  });

  test("attribution stays at the Canonical eight and error tags at sixteen", () => {
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "eight sources");
    assert(
      !ATTRIBUTION_SOURCES.includes("authored_trap" as never),
      "an authored trap is not a ninth source",
    );
    assertEqual(ERROR_TAG_CODES.length, 16, "frozen taxonomy");
  });

  test("the legacy completion marker is still separate and called exactly once", () => {
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    assertEqual(
      (src.match(/mk\(lesson\.number, V1_COMPLETION_SECTION_KEY\)/g) ?? []).length,
      1,
      "exactly once",
    );
    assert(
      src.includes('const V1_COMPLETION_SECTION_KEY = "read_listen"'),
      "unchanged key",
    );
    const completionBlock = src.slice(src.indexOf("const isComplete"), src.indexOf("return ("));
    assert(
      !/record[A-Z]/.test(completionBlock),
      "reaching the end of a lesson emits NO learning event",
    );
  });

  test("an empty snapshot is still empty — nothing emits at rest", () => {
    assertEqual(Object.keys(createEmptyMasterySnapshot().items).length, 0, "empty");
  });
});
