/**
 * Structural production-quality guards (PQ-2 hard, PQ-3 advisory).
 *
 * The load-bearing assertion in this file is that `fill-with-traps` is NOT
 * meaningful production. Choosing among supplied options is constrained
 * completion, so a lesson made entirely of fills must FAIL the retrieval floor
 * — that is the whole point of the guard, and the reason the three previously
 * conflicting production definitions are consolidated here.
 *
 * No production COUNT is asserted as a contract anywhere. Counts appear only
 * where a test needs a concrete number for its own scenario.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  countProductionActions,
  getProductionActionFingerprint,
  isMeaningfulProductionAction,
  productionActions,
  reviewProductionQuality,
} from "../../content/lessons/productionQuality";
import { V1_LESSONS } from "../../content/lessons/v1";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

const lesson = (id: string, screens: unknown[]): Lesson =>
  ({ id, screens }) as unknown as Lesson;

const weave = (
  id: string,
  weaveType: string,
  expectedAnswers: string[],
  prompt: string,
  pieces: unknown[] = [],
) => ({
  id,
  type: "weave",
  payload: { weaveType, prompt, expectedAnswers, suggestedPieces: pieces },
});

const sayIt = (id: string, situation: string, modelAnswer?: string) => ({
  id,
  type: "say-it-your-way",
  payload: { situation, modelAnswer },
});

const fill = (id: string) => ({ id, type: "fill-with-traps", payload: { options: [] } });
const meet = (id: string) => ({ id, type: "meet-card", payload: {} });

const errorsOf = (l: Lesson) =>
  reviewProductionQuality([l]).filter((d) => d.code === "PQ-2");
const warningsOf = (l: Lesson) =>
  reviewProductionQuality([l]).filter((d) => d.code === "PQ-3");

describe("productionQuality — meaningful production definition", () => {
  test("fill-with-traps is NOT meaningful production", () => {
    assert(
      !isMeaningfulProductionAction(fill("s0") as unknown as LessonScreen),
      "supplied-option selection is constrained completion, not generation",
    );
  });

  test("exposure and explanation screens are not production", () => {
    for (const type of ["meet-card", "insight-card", "natural-reveal", "recap"]) {
      assert(
        !isMeaningfulProductionAction({ id: "s", type } as unknown as LessonScreen),
        `${type} is not production`,
      );
    }
  });

  test("weave and say-it are meaningful production", () => {
    assert(isMeaningfulProductionAction(weave("s", "mid", ["x"], "p") as unknown as LessonScreen), "weave");
    assert(isMeaningfulProductionAction(sayIt("s", "sit") as unknown as LessonScreen), "say-it");
  });

  test("support rank orders open below every weave tier, constitutive worst", () => {
    const l = lesson("v1-lesson-900", [
      weave("s-sup", "supported", ["a"], "p1"),
      weave("s-mid", "mid", ["b"], "p2"),
      weave("s-ctx", "context", ["c"], "p3"),
      weave("s-open", "open", ["d"], "p4"),
      weave("s-const", "open", ["e"], "p5", [
        { text: "x", itemId: "chunk-merci", supportRole: "constitutive" },
      ]),
      sayIt("s-say", "sit"),
    ]);
    assertEqual(
      productionActions(l).map((a) => `${a.screenId}:${a.supportRank}`),
      ["s-sup:4", "s-mid:3", "s-ctx:2", "s-open:1", "s-const:5", "s-say:0"],
      "constitutive support outranks its declared tier",
    );
  });
});

describe("productionQuality — PQ-2 retrieval floor", () => {
  test("PASS — a genuinely generative low-support action satisfies the floor", () => {
    assertEqual(errorsOf(lesson("v1-lesson-900", [meet("s0"), sayIt("s1", "sit")])), [], "say-it suffices");
  });

  test("PASS — scaffolded work followed by low-support generation", () => {
    const l = lesson("v1-lesson-900", [
      meet("s0"),
      fill("s1"),
      weave("s2", "supported", ["je suis ici"], "write it"),
      weave("s3", "context", ["je suis ici"], "say where you are"),
      sayIt("s4", "someone calls your name"),
    ]);
    assertEqual(errorsOf(l), [], "a real ladder passes");
  });

  test("PASS — an unsupplied weave alone satisfies the floor", () => {
    assertEqual(
      errorsOf(lesson("v1-lesson-900", [weave("s0", "open", ["a"], "p")])),
      [],
      "no say-it required, only genuine generation",
    );
  });

  test("FAIL — recognition/exposure only", () => {
    const errs = errorsOf(lesson("v1-lesson-900", [meet("s0"), meet("s1")]));
    assertEqual(errs.length, 1, "no production at all");
    assertEqual(errs[0].severity, "error", "PQ-2 is a hard error");
    assert(errs[0].message.includes("no meaningful production action"), errs[0].message);
  });

  test("FAIL — fill-with-traps only", () => {
    const errs = errorsOf(lesson("v1-lesson-900", [meet("s0"), fill("s1"), fill("s2"), fill("s3")]));
    assertEqual(errs.length, 1, "supplied-option completion cannot satisfy the floor");
  });

  test("FAIL — every production action is constitutively scaffolded", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "open", ["a"], "p1", [
        { text: "x", itemId: "chunk-merci", supportRole: "constitutive" },
      ]),
      weave("s1", "context", ["b"], "p2", [
        { text: "y", itemId: "chunk-bonjour", supportRole: "constitutive" },
      ]),
    ]);
    const errs = errorsOf(l);
    assertEqual(errs.length, 1, "all answers supplied from first render");
    assert(errs[0].message.includes("constitutive support"), errs[0].message);
  });

  test("an optional hint does not make an action constitutively scaffolded", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "supported", ["a"], "p", [
        { text: "x", itemId: "chunk-merci", required: true },
      ]),
    ]);
    assertEqual(errorsOf(l), [], "required != supplied; hint ladders are not constitutive");
  });
});

describe("productionQuality — PQ-3 duplicate demand", () => {
  test("an exact duplicate demand warns", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "supported", ["je suis ici"], "Write it in French: I am here."),
      weave("s1", "supported", ["je suis ici"], "Write it in French: I am here."),
      sayIt("s2", "sit"),
    ]);
    const w = warningsOf(l);
    assertEqual(w.length, 1, "one duplicate pair");
    assertEqual(w[0].severity, "warning", "PQ-3 never blocks");
    assertEqual(w[0].screenIds, ["s0", "s1"], "both screens named");
  });

  test("same answer, changed operation does NOT warn", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "context", ["j'ai faim"], "Write it in French: I am hungry."),
      sayIt("s1", "you have not eaten all morning", "j'ai faim"),
    ]);
    assertEqual(warningsOf(l), [], "typed vs open are different demands");
  });

  test("same answer, changed authored support tier does NOT warn", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "supported", ["je suis ici"], "Write it in French: I am here."),
      weave("s1", "open", ["je suis ici"], "Write it in French: I am here."),
      sayIt("s2", "sit"),
    ]);
    assertEqual(warningsOf(l), [], "support level is a meaningful dimension");
  });

  test("clearly changed task does NOT warn", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "mid", ["je suis ici"], "Write it in French: I am here."),
      weave("s1", "mid", ["je suis ici"], "Someone is looking for you. Answer them."),
      sayIt("s2", "sit"),
    ]);
    assertEqual(warningsOf(l), [], "a different task is a different demand");
  });

  test("fill-with-traps never participates in duplicate detection", () => {
    const l = lesson("v1-lesson-900", [fill("s0"), fill("s1"), sayIt("s2", "sit")]);
    assertEqual(warningsOf(l), [], "fills are not production, so they cannot duplicate one");
  });

  test("punctuation-only and case-only variation still counts as duplicate", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "mid", ["Je suis ici."], "Write it in French: I am here."),
      weave("s1", "mid", ["je suis ici"], "write it in French: I am here"),
      sayIt("s2", "sit"),
    ]);
    assertEqual(warningsOf(l).length, 1, "normalization defeats cosmetic variation");
  });

  test("fingerprints are stable and diagnostics deterministically ordered", () => {
    const l = lesson("v1-lesson-900", [
      weave("s0", "mid", ["a"], "p"),
      weave("s1", "mid", ["a"], "p"),
      sayIt("s2", "sit"),
    ]);
    const [a, b] = productionActions(l);
    assertEqual(
      getProductionActionFingerprint(a),
      getProductionActionFingerprint(b),
      "identical demands share a fingerprint",
    );
    assertEqual(reviewProductionQuality([l]), reviewProductionQuality([l]), "same input, same output");
  });
});

describe("productionQuality — shipped v1", () => {
  const shipped = reviewProductionQuality(V1_LESSONS);

  test("every shipped lesson satisfies the PQ-2 retrieval floor", () => {
    assertEqual(shipped.filter((d) => d.code === "PQ-2"), [], "0 retrieval-floor errors");
  });

  test("PQ-3 baseline is exactly the one known L2 duplicate", () => {
    // Known content debt, deliberately not fixed inside an infrastructure pass.
    // Any NEW duplicate breaks this ratchet; removing L2's requires updating it.
    const warnings = shipped.filter((d) => d.code === "PQ-3");
    assertEqual(warnings.length, 1, "exactly one known duplicate");
    assertEqual(warnings[0].lessonId, "v1-lesson-002", "in L2");
    assertEqual(
      warnings[0].screenIds,
      ["s04-weave-je-suis-ici", "s05-weave-call-and-respond"],
      "the two equivalent productions",
    );
  });

  test("no other shipped lesson produces a PQ-3 finding", () => {
    const lessons = new Set(shipped.filter((d) => d.code === "PQ-3").map((d) => d.lessonId));
    assertEqual([...lessons], ["v1-lesson-002"], "L2 only");
  });

  test("corrected production counts exclude fill-with-traps", () => {
    // Reported, never contracted: no floor, no ceiling, no per-lesson lock.
    // These differ from earlier figures precisely because fills no longer count.
    assertEqual(
      V1_LESSONS.map((l) => countProductionActions(l)),
      [2, 5, 3, 4, 3, 3, 5, 3, 3, 3, 4, 4, 4, 4, 3, 3, 4],
      "L0-L16 meaningful production actions",
    );
    for (const l of V1_LESSONS) {
      assert(
        productionActions(l).every((a) => a.kind === "typed" || a.kind === "open"),
        `${l.id} counts only generative actions`,
      );
    }
  });
});
