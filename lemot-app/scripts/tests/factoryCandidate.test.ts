/**
 * Factory V0 — isolated candidate validation.
 *
 * Every candidate here is synthetic. Nothing is added to the shipped lesson set,
 * and no L16 content is created: the facade takes the corpus as an argument
 * precisely so a candidate can be judged without being shipped.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  formatCandidateReport,
  validateFactoryCandidate,
} from "../factory/validateCandidate";
import { V1_LESSONS } from "../../content/lessons/v1";
import { countProductionActions } from "../../content/lessons/productionQuality";
import type { Lesson } from "../../content/lessonTypes";

const weave = (id: string, weaveType: string, expected: string[], prompt: string, targets: string[]) => ({
  id,
  type: "weave",
  targetItemIds: targets,
  payload: {
    weaveType,
    prompt,
    expectedAnswers: expected,
    reveal: { modelAnswer: expected[0] },
  },
});

const sayIt = (id: string, situation: string, targets: string[]) => ({
  id,
  type: "say-it-your-way",
  targetItemIds: targets,
  payload: {
    situation,
    communicativeGoal: "…",
    modelAnswer: "Merci.",
    validationMode: "model-answer-only",
    reveal: { modelAnswer: "Merci." },
  },
});

/** A structurally sound Integration candidate over already-worked material. */
const goodCandidate = (over: Partial<Lesson> = {}): Lesson =>
  ({
    id: "v1-lesson-900",
    version: "v1",
    number: 900,
    title: "Synthetic candidate",
    phase: "first-ascent",
    monolingualMode: "english-guided",
    primaryArchetype: "review-integration",
    journeyRole: "integration",
    acquisitionDemandItemIds: [],
    estimatedMinutes: 5,
    canDo: "…",
    whyItExists: "…",
    prerequisites: [],
    learningItems: [],
    screens: [
      weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
      weave("s1", "context", ["Au revoir !"], "Take your leave.", ["chunk-au-revoir"]),
      sayIt("s2", "The room is emptying and someone waits by the door.", ["chunk-merci"]),
    ],
    ...over,
  }) as unknown as Lesson;

const run = (candidate: Lesson) =>
  validateFactoryCandidate({ candidate, shippedLessons: V1_LESSONS });

describe("factory candidate — passing", () => {
  test("a sound candidate passes every blocking check", () => {
    const r = run(goodCandidate());
    assertEqual(r.blockingErrors, [], `expected clean, got ${JSON.stringify(r.blockingErrors)}`);
    assert(r.candidateValid, "candidateValid");
    assertEqual(r.journeyRoleBudget, "pass", "budget pass");
  });

  test("the meaningful production count comes from the canonical helper", () => {
    const candidate = goodCandidate();
    const r = run(candidate);
    assertEqual(
      r.productionActionCount,
      countProductionActions(candidate),
      "one shared definition, no second count",
    );
    assertEqual(r.productionActionCount, 3, "two weaves + one say-it; fills would not count");
    assertEqual(r.productionSupportRanks, [4, 2, 0], "authored support ranks, in order");
  });
});

describe("factory candidate — blocking failures", () => {
  test("an illegal acquisition demand blocks", () => {
    const r = run(
      goodCandidate({
        journeyRole: "doorway",
        acquisitionDemandItemIds: ["chunk-j-ai-faim"],
      } as Partial<Lesson>),
    );
    assert(
      r.blockingErrors.some((e) => e.code === "AD-003"),
      `covered whole blocked, got ${JSON.stringify(r.blockingErrors)}`,
    );
    assert(!r.candidateValid, "invalid");
  });

  test("a missing PQ-2 retrieval floor blocks", () => {
    const r = run(
      goodCandidate({
        screens: [
          { id: "s0", type: "meet-card", targetItemIds: ["chunk-merci"], payload: { fr: "Merci." } },
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(
      r.blockingErrors.some((e) => e.code === "PQ-2"),
      `recognition-only blocked, got ${JSON.stringify(r.blockingErrors)}`,
    );
    assert(!r.candidateValid, "invalid");
  });

  test("a journey-role budget breach blocks", () => {
    const r = run(
      goodCandidate({
        journeyRole: "integration",
        acquisitionDemandItemIds: ["chunk-merci"],
      } as Partial<Lesson>),
    );
    assert(
      r.blockingErrors.some((e) => e.code === "JB-002"),
      `integration must be 0, got ${JSON.stringify(r.blockingErrors)}`,
    );
    assertEqual(r.journeyRoleBudget, "fail", "budget fail surfaced separately");
  });
});

describe("factory candidate — advisory only", () => {
  test("PQ-3 duplicate demand warns but does not block", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          weave("s1", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          sayIt("s2", "Someone waits by the door.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(r.warnings.some((w) => w.code === "PQ-3"), "warned");
    assert(r.candidateValid, "still valid — PQ-3 never blocks");
    assert(r.humanReviewRecommended, "but a human should look");
  });

  test("DD author-review is advisory and does not block", () => {
    // A first-time action target nobody declared, in an explicit-zero lesson.
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "context", ["Je suis prêt."], "Say you're ready.", ["chunk-tu-es-pret"]),
          sayIt("s1", "Someone asks if you're ready.", ["chunk-tu-es-pret"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(r.authorReview.some((a) => a.code.startsWith("DD-")), "drift surfaced");
    assert(r.candidateValid, "advisory only");
    assert(r.humanReviewRecommended, "flagged for review");
  });
});

/**
 * Shipping parity. Both classes below were found the hard way: L16, the first
 * factory-produced lesson, passed candidate validation and then failed the
 * repo's shipping guards. Nothing here is L16-specific — the synthetic
 * candidates carry the same CLASS of violation, not its strings.
 */
const recap = (piecesUsed: string[]) => ({
  id: "s-recap",
  type: "recap",
  payload: { title: "You can do it.", lines: ["A line."], piecesUsed },
});

describe("factory candidate — learner copy parity", () => {
  test("an em dash in learner copy blocks the candidate", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you — politely.", ["chunk-merci"]),
          weave("s1", "context", ["Au revoir !"], "Take your leave.", ["chunk-au-revoir"]),
          sayIt("s2", "The room is emptying.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(
      r.blockingErrors.some((e) => e.code === "COPY-GUARD" && e.message.includes("em/en dash")),
      `dash must block, got ${JSON.stringify(r.blockingErrors)}`,
    );
    assert(!r.candidateValid, "the repo would reject this, so the factory must too");
  });

  test("an en dash blocks too, and the message names the guard's own wording", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thanks – now.", ["chunk-merci"]),
          sayIt("s1", "Someone helped you.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    const hit = r.blockingErrors.find((e) => e.code === "COPY-GUARD");
    assert(hit !== undefined, "en dash blocks");
    assert(hit?.source === "learnerCopy", "sourced from the extracted policy, not a factory copy");
  });

  test("a banned gamification term in learner copy blocks the candidate", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Perfect! Say thank you.", ["chunk-merci"]),
          sayIt("s1", "Someone helped you.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(
      r.blockingErrors.some((e) => e.code === "COPY-GUARD" && e.message.includes("banned term")),
      `banned term must block, got ${JSON.stringify(r.blockingErrors)}`,
    );
  });

  test("ordinary punctuation and French hyphens pass", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you, politely.", ["chunk-merci"]),
          weave("s1", "context", ["Au revoir !"], "Pouvez-vous partir ? Take your leave.", [
            "chunk-au-revoir",
          ]),
          sayIt("s2", "The room is emptying.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assertEqual(
      r.blockingErrors.filter((e) => e.code === "COPY-GUARD"),
      [],
      "commas, colons and French hyphenation are not dashes",
    );
    assert(r.candidateValid, "clean copy passes");
  });
});

describe("factory candidate — recap chip parity", () => {
  test("a sentence-like recap chip blocks the candidate", () => {
    // Subject pronoun + 3 tokens: the class that shipped as "on y va" in L16.
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          sayIt("s1", "Someone helped you.", ["chunk-merci"]),
          recap(["merci", "nous allons ici"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(
      r.blockingErrors.some(
        (e) => e.code === "CHIP-TAXONOMY" && e.message.includes("is not atomic"),
      ),
      `non-atomic chip must block, got ${JSON.stringify(r.blockingErrors)}`,
    );
    assert(!r.candidateValid, "the shipped-content validator would reject it");
  });

  test("a chip ending in sentence punctuation blocks the candidate", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          sayIt("s1", "Someone helped you.", ["chunk-merci"]),
          recap(["Merci."]),
        ],
      } as unknown as Partial<Lesson>),
    );
    const hit = r.blockingErrors.find((e) => e.code === "CHIP-TAXONOMY");
    assert(hit !== undefined, "terminal punctuation blocks");
    assert(hit?.source === "chipTaxonomy", "sourced from the extracted policy");
  });

  test("atomic chips and approved protected chunks pass", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          sayIt("s1", "Someone helped you.", ["chunk-merci"]),
          // "je suis" is a two-token spine chip; "je ne suis pas" is protected.
          recap(["merci", "je suis", "je ne suis pas", "y"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assertEqual(
      r.blockingErrors.filter((e) => e.code === "CHIP-TAXONOMY"),
      [],
      "the taxonomy was reused, not re-invented or tightened",
    );
    assert(r.candidateValid, "atomic chips pass");
  });
});

describe("factory candidate — corpus context", () => {
  test("L6's named exception does not go stale during candidate validation", () => {
    // JB-004 reports an exception whose lesson is absent as dead policy, so the
    // facade must pass [...shipped, candidate] rather than the candidate alone.
    const r = run(goodCandidate());
    assert(
      !r.blockingErrors.some((e) => e.code === "JB-004"),
      `L6 exception stayed live, got ${JSON.stringify(r.blockingErrors)}`,
    );
  });

  test("only the candidate's own findings are reported", () => {
    // The shipped corpus carries 7 known DD advisories and 1 PQ-3; none may
    // leak into a candidate's report.
    const r = run(goodCandidate());
    assertEqual(r.warnings, [], "no shipped-lesson warning leaks in");
    assertEqual(r.authorReview, [], "no shipped-lesson advisory leaks in");
    assert(!r.humanReviewRecommended, "a clean candidate needs no review");
  });

  test("the shipped lesson set is not mutated", () => {
    const before = V1_LESSONS.length;
    run(goodCandidate());
    assertEqual(V1_LESSONS.length, before, "candidate was never appended to the corpus");
  });
});

describe("factory candidate — the shipped factory lesson stays clean", () => {
  // L16 is the lesson that exposed both parity gaps. Re-validating the SHIPPED
  // article against the enhanced facade proves the corrections were real fixes
  // and not a loosened rule — if either guard were widened, this would fail.
  const l16 = V1_LESSONS.find((l) => l.id === "v1-lesson-016") as Lesson;
  const priorCorpus = V1_LESSONS.filter((l) => l.id !== "v1-lesson-016");

  test("precondition: L16 ships", () => {
    assert(l16 !== undefined, "v1-lesson-016 is registered");
  });

  test("shipped L16 passes every blocking check, copy and chips included", () => {
    const r = validateFactoryCandidate({ candidate: l16, shippedLessons: priorCorpus });
    assertEqual(r.blockingErrors, [], `expected clean, got ${JSON.stringify(r.blockingErrors)}`);
    assert(r.candidateValid, "candidateValid");
    assertEqual(r.journeyRoleBudget, "pass", "Integration = 0 on the plain band");
    assertEqual(r.acquisitionDemandCount, 0, "acquisitionDemandItemIds is []");
    assertEqual(r.journeyRole, "integration", "role unchanged");
  });

  test("shipped L16 raises no advisory of its own", () => {
    const r = validateFactoryCandidate({ candidate: l16, shippedLessons: priorCorpus });
    assertEqual(r.warnings, [], "no PQ-3 and no canon warning");
    assertEqual(r.authorReview, [], "no DD advisory");
  });
});

describe("factory candidate — report", () => {
  test("errors precede warnings precede author-review, ordering stable", () => {
    const r = run(
      goodCandidate({
        journeyRole: "integration",
        acquisitionDemandItemIds: ["chunk-merci"],
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          weave("s1", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          sayIt("s2", "Someone waits.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    const text = formatCandidateReport(r);
    assert(text.indexOf("  ERROR") < text.indexOf("  WARNING"), "errors first");
    assertEqual(formatCandidateReport(r), text, "stable across calls");
    assert(text.includes("candidateValid: no"), "verdict stated");
  });

  test("candidateValid is independent of humanReviewRecommended", () => {
    const r = run(
      goodCandidate({
        screens: [
          weave("s0", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          weave("s1", "supported", ["Merci."], "Say thank you.", ["chunk-merci"]),
          sayIt("s2", "Someone waits.", ["chunk-merci"]),
        ],
      } as unknown as Partial<Lesson>),
    );
    assert(r.candidateValid && r.humanReviewRecommended, "valid AND worth reading");
  });

  test("the report states that semantic quality is not checked", () => {
    const text = formatCandidateReport(run(goodCandidate()));
    assert(text.includes("remain semantic review"), "no fake quality score is implied");
  });
});
