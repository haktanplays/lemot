/**
 * Acquisition-demand drift review (DD-001..DD-004) — advisory QA only.
 *
 * The detector never decides ownership; it asks questions about an authored
 * declaration. So the load-bearing tests here are the NEGATIVE controls: the
 * shipped corpus contains several shapes that a naive detector would wrongly
 * flag — acquisition-covered composites, an `acquisitionLink` primary supplied
 * as constitutive support, recognition-only forward seeds into the next lesson
 * — and none of them may produce a finding.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  reviewAcquisitionDemandDrift,
  summarizeDrift,
  type DriftDiagnostic,
} from "../../content/lessons/acquisitionDemandDrift";
import { V1_LESSONS } from "../../content/lessons/v1";
import type { Lesson } from "../../content/lessonTypes";

/** Synthetic lesson: only screens + declaration matter to the detector. */
const lesson = (
  id: string,
  acquisitionDemandItemIds: readonly string[] | undefined,
  screens: unknown[],
): Lesson => ({ id, acquisitionDemandItemIds, screens, learningItems: [] }) as unknown as Lesson;

const actionScreen = (ids: string[], pieces: unknown[] = []) =>
  ({ id: "s-act", type: "weave", targetItemIds: ids, payload: { suggestedPieces: pieces } });

const meetScreen = (ids: string[]) =>
  ({ id: "s-meet", type: "meet-card", targetItemIds: ids, payload: {} });

const find = (ds: readonly DriftDiagnostic[], code: string, itemId: string) =>
  ds.find((d) => d.code === code && d.itemId === itemId);

describe("acquisitionDemandDrift — synthetic positive controls", () => {
  test("DD-002 — a first-time action target with no declaration is raised", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["chunk-merci"], [actionScreen(["chunk-merci", "chunk-bonjour"])]),
    ]);
    const hit = find(ds, "DD-002", "chunk-bonjour");
    assert(hit !== undefined, `undeclared novel target raised, got: ${JSON.stringify(ds)}`);
    assertEqual(hit?.severity, "author-review", "advisory, never a hard error");
  });

  test("DD-003 — a declared supported-status item is raised as a promotion", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["word-ici"], [actionScreen(["word-ici"])]),
    ]);
    const hit = find(ds, "DD-003", "word-ici");
    assert(hit !== undefined, `promotion raised, got: ${JSON.stringify(ds)}`);
    assertEqual(hit?.severity, "author-review", "a promotion is legal, never a failure");
  });

  test("DD-004 — an explicit-zero lesson with a novel action target is raised", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", [], [actionScreen(["chunk-merci"])]),
    ]);
    const hit = find(ds, "DD-004", "chunk-merci");
    assert(hit !== undefined, `zero-lesson novelty raised, got: ${JSON.stringify(ds)}`);
    assert(find(ds, "DD-002", "chunk-merci") === undefined, "reported as DD-004, not DD-002");
  });

  test("DD-001 — a declared item never put behind a learner action is raised", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["chunk-merci"], [meetScreen(["chunk-merci"])]),
    ]);
    const hit = find(ds, "DD-001", "chunk-merci");
    assert(hit !== undefined, `weak presentation raised, got: ${JSON.stringify(ds)}`);
    assertEqual(hit?.severity, "warning", "DD-001 is a warning, not author-review");
  });

  test("a declared item worked on an action screen raises nothing", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["chunk-merci"], [actionScreen(["chunk-merci"])]),
    ]);
    assertEqual(ds.length, 0, `clean lesson is silent, got: ${JSON.stringify(ds)}`);
  });

  test("prior action use suppresses DD-002 in a later lesson", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["chunk-merci"], [actionScreen(["chunk-merci"])]),
      lesson("v1-lesson-901", ["chunk-bonjour"], [actionScreen(["chunk-bonjour", "chunk-merci"])]),
    ]);
    assert(find(ds, "DD-002", "chunk-merci") === undefined, "carryover is not novel");
  });

  test("diagnostics are deterministically ordered", () => {
    const set = [
      lesson("v1-lesson-901", [], [actionScreen(["chunk-merci", "chunk-bonjour"])]),
      lesson("v1-lesson-900", [], [actionScreen(["chunk-non", "chunk-oui"])]),
    ];
    const a = reviewAcquisitionDemandDrift(set);
    assertEqual(a, reviewAcquisitionDemandDrift(set), "same input, same output");
    assertEqual(
      a.map((d) => `${d.lessonId}/${d.itemId}`),
      [
        "v1-lesson-900/chunk-non",
        "v1-lesson-900/chunk-oui",
        "v1-lesson-901/chunk-bonjour",
        "v1-lesson-901/chunk-merci",
      ],
      "sorted by lesson, then code, then item",
    );
  });
});

describe("acquisitionDemandDrift — exclusions", () => {
  test("an acquisition-covered composite is never suggested", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["chunk-j-ai"], [actionScreen(["chunk-j-ai", "chunk-j-ai-faim"])]),
    ]);
    assert(find(ds, "DD-002", "chunk-j-ai-faim") === undefined, "components cover the whole");
  });

  test("an acquisitionLink linked identity is never suggested", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", ["chunk-merci"], [actionScreen(["chunk-merci", "noun-the"])]),
    ]);
    assert(find(ds, "DD-002", "noun-the") === undefined, "linked ids carry no demand");
  });

  test("constitutive support is never suggested", () => {
    // The L1 shape: `un thé` is supplied whole, visible from first render.
    const ds = reviewAcquisitionDemandDrift([
      lesson(
        "v1-lesson-900",
        ["chunk-merci"],
        [
          actionScreen(
            ["chunk-merci", "chunk-un-the"],
            [{ text: "un thé", itemId: "chunk-un-the", supportRole: "constitutive" }],
          ),
        ],
      ),
    ]);
    assert(find(ds, "DD-002", "chunk-un-the") === undefined, "supplied support is not novelty");
  });

  test("recognition scaffolding types are never suggested", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson(
        "v1-lesson-900",
        ["chunk-merci"],
        [actionScreen(["chunk-merci", "grammar-ne-pas-sandwich", "sound-elision"])],
      ),
    ]);
    assert(find(ds, "DD-002", "grammar-ne-pas-sandwich") === undefined, "IC-002 excludes nuggets");
    assert(find(ds, "DD-002", "sound-elision") === undefined, "IC-002 excludes sound items");
  });

  test("recognition-only exposure does not trigger novelty review", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", [], [meetScreen(["chunk-merci"])]),
    ]);
    assertEqual(ds.length, 0, `a meet-card seed is not novelty, got: ${JSON.stringify(ds)}`);
  });

  test("an undeclared lesson is not novelty-reviewed", () => {
    const ds = reviewAcquisitionDemandDrift([
      lesson("v1-lesson-900", undefined, [actionScreen(["chunk-merci"])]),
    ]);
    assert(find(ds, "DD-004", "chunk-merci") === undefined, "undefined is not explicit zero");
  });
});

describe("acquisitionDemandDrift — shipped corpus negative controls", () => {
  const shipped = reviewAcquisitionDemandDrift(V1_LESSONS);

  test("L10 and L13 stay clean — their forward seeds are not drift", () => {
    for (const id of ["v1-lesson-010", "v1-lesson-013"]) {
      assertEqual(
        shipped.filter((d) => d.lessonId === id),
        [],
        `${id} declares [] and its recognition seed must not trigger DD-004`,
      );
    }
  });

  test("L4 composites are never suggested as undeclared demands", () => {
    for (const id of ["chunk-j-ai-faim", "chunk-j-ai-une-question"]) {
      assert(find(shipped, "DD-002", id) === undefined, `${id} is acquisition-covered`);
    }
  });

  test("L14 chunk-j-y-vais is never suggested", () => {
    assert(find(shipped, "DD-002", "chunk-j-y-vais") === undefined, "covered by components");
  });

  test("L1 chunk-un-the is never suggested despite its evidence presence", () => {
    assert(
      shipped.find((d) => d.itemId === "chunk-un-the") === undefined,
      "constitutive support, not a demand",
    );
  });

  test("no DD-001 or DD-003 on the shipped corpus", () => {
    assertEqual(shipped.filter((d) => d.code === "DD-001"), [], "every demand is worked");
    assertEqual(shipped.filter((d) => d.code === "DD-003"), [], "no declared demand is non-active");
  });

  test("current corpus findings are exactly the 7 recorded supported-vs-demand calls", () => {
    // These are real, deliberate founder decisions ("supported / composed, not a
    // demand") that today live only in each lesson's prose. The detector asking
    // about them is correct behaviour, not a bug — and they are NOT fixed here.
    assertEqual(
      shipped.map((d) => `${d.code} ${d.lessonId}/${d.itemId}`),
      [
        "DD-002 v1-lesson-003/chunk-c-est",
        "DD-002 v1-lesson-007/chunk-a-la-maison",
        "DD-002 v1-lesson-008/adverb-ou-where",
        "DD-002 v1-lesson-011/chunk-m-aider",
        "DD-002 v1-lesson-011/chunk-vous-pouvez",
        "DD-002 v1-lesson-015/chunk-je-dois",
        "DD-002 v1-lesson-015/verb-aller",
      ],
      "current-v1 advisory baseline",
    );
    assertEqual(summarizeDrift(shipped), { warnings: 0, authorReviews: 7 }, "all advisory");
  });
});
