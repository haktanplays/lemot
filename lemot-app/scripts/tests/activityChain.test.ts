/**
 * Activity-chain contracts.
 *
 * A chain moves screens one level down in the tree, and the danger is entirely
 * about what stops seeing them. Four guards went blind the moment the first
 * chain shipped -- production counts, acquisition drift, corpus breadth and the
 * screen taxonomy -- because each walked `lesson.screens`. They were repointed
 * at `flattenLessonScreens`, and these tests exist so the next thing that walks
 * screens cannot quietly reintroduce the hole.
 *
 * The other half is evidence. A chain must record exactly what the same screens
 * recorded as separate pages: same ids, same targets, same once-only guards.
 * The chain container itself must record nothing at all.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { qualifyLessonScreenId } from "../../content/lesson-v1-evidence/identity";
import type { ActivityChainScreen, Lesson } from "../../content/lessonTypes";
import { resolvePracticeHubSource } from "../../content/lesson-v1-evidence/practiceHub";
import type { ItemId } from "../../content/learning-engine/types";

const chainsOf = (lesson: Lesson): ActivityChainScreen[] =>
  lesson.screens.filter((s): s is ActivityChainScreen => s.type === "activity-chain");

const ALL_CHAINS: Array<{ lesson: Lesson; chain: ActivityChainScreen }> = V1_LESSONS.flatMap(
  (lesson) => chainsOf(lesson).map((chain) => ({ lesson, chain })),
);

const src = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

describe("chains are shaped like one pedagogical thought", () => {
  test("every chain has between two and four steps", () => {
    // One step is a page pretending to be a chain; five is a quiz.
    for (const { lesson, chain } of ALL_CHAINS) {
      const n = chain.payload.steps.length;
      assert(n >= 2 && n <= 4, `${lesson.id}/${chain.id} has ${n} steps`);
    }
  });

  test("every chain states the moment its steps share", () => {
    for (const { lesson, chain } of ALL_CHAINS) {
      assert(
        chain.payload.intro.trim().length > 0,
        `${lesson.id}/${chain.id} has no shared context`,
      );
    }
  });

  test("steps are real action screens, never nested chains or passive cards", () => {
    const allowed = new Set(["meet-card", "fill-with-traps", "weave", "say-it-your-way"]);
    for (const { lesson, chain } of ALL_CHAINS) {
      for (const step of chain.payload.steps) {
        assert(
          allowed.has(step.type),
          `${lesson.id}/${chain.id}: step ${step.id} is a ${step.type}`,
        );
      }
    }
  });

  test("a chain ends in production, not in a dead-end choice", () => {
    // The whole point of chaining a recognition action is that it FEEDS
    // something. A chain whose last step is a fill has spent the learner's
    // attention and asked them to produce nothing.
    for (const { lesson, chain } of ALL_CHAINS) {
      const last = chain.payload.steps[chain.payload.steps.length - 1];
      assert(
        last.type === "weave" || last.type === "say-it-your-way",
        `${lesson.id}/${chain.id} ends on ${last.type}`,
      );
    }
  });
});

describe("chains keep evidence identity intact", () => {
  test("every step id is unique inside its lesson, and globally qualified", () => {
    // Evidence identity in this repo is lessonId/screenId. Two steps sharing an
    // id would merge two different actions into one exercise identity forever.
    for (const lesson of V1_LESSONS) {
      const ids = flattenLessonScreens(lesson).map((s) => s.id);
      assertEqual(new Set(ids).size, ids.length, `${lesson.id} has a duplicate screen id`);
    }
    const qualified = V1_LESSONS.flatMap((l) =>
      flattenLessonScreens(l).map((s) => qualifyLessonScreenId(l.id, s.id)),
    );
    assertEqual(new Set(qualified).size, qualified.length, "qualified ids collide");
  });

  test("the chain container declares no evidence of its own", () => {
    // It orchestrates. Every event comes from a step.
    for (const { lesson, chain } of ALL_CHAINS) {
      assertEqual(
        chain.evidenceTargetItemIds,
        undefined,
        `${lesson.id}/${chain.id} declares evidence targets`,
      );
    }
  });

  test("every chain is built through the builder, not hand-declared", () => {
    // `targetItemIds` on a container exists only so treatment validation still
    // covers material one level down. Two hand-written lists that must agree
    // forever is a drift waiting to happen, and it fails quietly in the worse
    // direction. Deriving them makes them one list.
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const body = src(`content/lessons/v1/lesson-${String(n).padStart(3, "0")}.ts`);
      assert(
        !body.includes('type: "activity-chain"'),
        `lesson-${n} hand-writes a chain literal instead of calling activityChain()`,
      );
    }
  });

  test("a chain's declared targets are exactly its steps' targets", () => {
    // targetItemIds on the container exists only so treatment validation, which
    // walks the union, still covers material that moved one level down. If it
    // drifts from the steps it is worse than absent: it would validate a
    // treatment nobody uses and miss one somebody does.
    for (const { lesson, chain } of ALL_CHAINS) {
      const fromSteps = new Set(
        chain.payload.steps.flatMap((s) => s.targetItemIds ?? []),
      );
      const declared = new Set(chain.targetItemIds ?? []);
      for (const id of fromSteps) {
        assert(
          declared.has(id),
          `${lesson.id}/${chain.id} does not declare step target ${id}`,
        );
      }
      for (const id of declared) {
        assert(
          fromSteps.has(id),
          `${lesson.id}/${chain.id} declares ${id}, which no step targets`,
        );
      }
    }
  });

  test("every step target is declared by its lesson", () => {
    // The defect class repaired in L3, L4 and L10: a target the lesson never
    // declares cannot resolve a treatment and throws at play time. Nesting must
    // not become a way to smuggle one in.
    for (const lesson of V1_LESSONS) {
      const declared = new Set(lesson.learningItems.map((i) => i.id));
      for (const screen of flattenLessonScreens(lesson)) {
        for (const id of screen.targetItemIds ?? []) {
          assert(declared.has(id), `${lesson.id}/${screen.id} targets undeclared ${id}`);
        }
      }
    }
  });
});

describe("the chain container records nothing and advances honestly", () => {
  // Source-level, because this repo has no component test renderer. These are
  // the two behaviours that would silently corrupt the event log.
  const component = src("components/lesson-v1/screens/ActivityChain.tsx");

  test("it calls the session only through its steps", () => {
    // Every session call in the file must be inside renderStep, passing the
    // STEP screen. A call taking the chain screen would attribute a step's
    // evidence to the container.
    const calls = component.match(/session\.record\w+\(([^,]+),/g) ?? [];
    assert(calls.length > 0, "the chain wires evidence at all");
    for (const call of calls) {
      assert(
        call.includes("(step"),
        `a session call does not pass the step screen: ${call}`,
      );
    }
    assert(
      !/session\.record\w+\(\s*screen/.test(component),
      "the chain must never record against its own screen",
    );
  });

  test("it emits nothing when advancing or re-rendering", () => {
    // Advancing is local state. If advance() ever recorded, every step boundary
    // would mint an event the learner did not earn.
    const advance = component.slice(
      component.indexOf("const advance ="),
      component.indexOf("return ("),
    );
    assert(!/session\./.test(advance), "advance() must not touch the session");
    assert(!/useEffect/.test(component), "no effect may fire evidence on mount or re-render");
  });

  test("the lesson advances only from the last step", () => {
    const advance = component.slice(
      component.indexOf("const advance ="),
      component.indexOf("return ("),
    );
    assert(
      /if \(isLast\)/.test(advance) && /onContinue\(\)/.test(advance),
      "onContinue is reached only under isLast",
    );
    assert(
      advance.indexOf("isLast") < advance.indexOf("onContinue()"),
      "the last-step guard precedes the lesson advance",
    );
  });

  test("it re-implements no grading", () => {
    for (const banned of ["evaluateWeaveAnswer", "isCorrect", "normalizeAnswer", "expectedAnswers"]) {
      assert(
        !component.includes(banned),
        `the chain references ${banned}; grading belongs to the step components`,
      );
    }
  });
});

describe("nesting cannot hide content from validation", () => {
  test("flattenLessonScreens lifts every step out of every chain", () => {
    for (const lesson of V1_LESSONS) {
      const flat = flattenLessonScreens(lesson);
      assert(
        !flat.some((s) => s.type === "activity-chain"),
        `${lesson.id}: a chain survived flattening`,
      );
      for (const chain of chainsOf(lesson)) {
        for (const step of chain.payload.steps) {
          assert(
            flat.some((s) => s.id === step.id),
            `${lesson.id}: step ${step.id} is invisible after flattening`,
          );
        }
      }
    }
  });

  test("the validators that judge learner work walk the flattened list", () => {
    // Every one of these went blind the moment a chain shipped, and each failed
    // silently rather than loudly: the guard simply stopped seeing screens.
    // Two of them are the strongest safety rules in the repo -- PR-06 decides
    // what the append-only event log records forever, and canon V3/V4 is what
    // stops a lesson grading French it never taught. The regression is trivial
    // to reintroduce and invisible when it happens, so the list is pinned.
    for (const rel of [
      "content/lessons/productionQuality.ts",
      "content/lessons/acquisitionDemandDrift.ts",
      "content/lessons/acquisitionDemands.ts",
      "content/lessons/lessonStructure.ts",
      "content/lesson-v1-evidence/practiceHub.ts",
      "content/identity/payloadRegistry.ts",
      "scripts/lessonEvidenceRules.ts",
      "scripts/canonRules.ts",
      "scripts/shippedErrorTags.ts",
    ]) {
      const body = src(rel);
      assert(
        body.includes("flattenLessonScreens"),
        `${rel} still walks lesson.screens and would miss chain steps`,
      );
    }
  });

  test("a chained screen is still reachable as a Practice Hub source", () => {
    // The behavioural half of the rule above, and the one that matters most to
    // the learner: chaining must never delete practice. `chunk-merci` is
    // assessed only by PM-009, which now lives inside an L1 chain -- if the
    // resolver walked top-level screens it would return null here and the item
    // would silently drop out of the Hub.
    const source = resolvePracticeHubSource("chunk-merci" as ItemId, "stretch", V1_LESSONS);
    assert(source !== null, "chunk-merci resolves to an authored source");
    const owner = V1_LESSONS.find((l) => l.id === source!.lesson.id)!;
    assert(
      flattenLessonScreens(owner).includes(source!.screen),
      "the resolved screen is the authored object itself, chained or not",
    );
    assert(
      !owner.screens.includes(source!.screen),
      "precondition: this source really is nested, so the test proves something",
    );
  });
});
