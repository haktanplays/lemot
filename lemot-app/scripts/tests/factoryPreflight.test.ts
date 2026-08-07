/**
 * Factory V0 — lesson-contract pre-flight (CF-001..CF-005).
 *
 * The load-bearing test here is the L16 fixture. Its spec's chosen reading opens
 * on `Je suis fatigué.` and no `fatigué` identity exists, so pre-flight must
 * BLOCK. It must not swap in an owned word and carry on: the earlier dry run
 * did exactly that by hand, which was useful as an experiment and would be
 * wrong as automated behaviour, because substituting a word changes what the
 * lesson teaches.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  formatPreflightReport,
  preflightLessonContract,
  type LessonContract,
} from "../../content/factory/lessonContract";

const base = (over: Partial<LessonContract>): LessonContract => ({
  lessonId: "v1-lesson-900",
  number: 900,
  version: "v1",
  canDo: "…",
  whyItExists: "…",
  primaryArchetype: "chunk-natural-speech",
  journeyRole: "doorway",
  acquisitionDemandItemIds: ["chunk-merci"],
  recycledItemIds: [],
  requiredItemIds: [],
  prohibited: [],
  authoringBrief: "…",
  ...over,
});

const codes = (c: LessonContract) =>
  preflightLessonContract({ contract: c }).diagnostics.map((d) => d.code);

/**
 * The real L16 contract, reconstructed from
 * docs/syllabus/L16-integration-small-moment-seed.compact-spec.md.
 *
 * Fixture only — this creates no lesson, no registry identity, and no shipped
 * content. `adj-fatigue` is named because the spec's chosen reading requires it.
 */
const L16_CONTRACT: LessonContract = {
  lessonId: "v1-lesson-016",
  number: 16,
  version: "v1",
  canDo:
    "I can read a small human situation in French, understand it, and respond simply — " +
    "recombining what I can already do in one calm moment.",
  whyItExists:
    "The rhythm beat after L14 (y) and L15 (obligation). Zero new grammar systems, zero new " +
    "architecture verbs: the skill is chaining owned engines into one after-class moment, plus " +
    "one bounded A Small Moment seed (present-only, known-items-only read + one scaffolded " +
    "model-answer-only response).",
  primaryArchetype: "review-integration",
  secondaryArchetype: "chunk-natural-speech",
  journeyRole: "integration",
  // PRJ-015 IC-002 names L16 directly: its "active (meta)" phen: entries never
  // count, so the lesson is 0. The spec's own "Active - new: 3" is a planning
  // figure in a table headed "planning targets, not validators".
  acquisitionDemandItemIds: [],
  recycledItemIds: [
    "chunk-il-faut",
    "chunk-je-dois",
    "chunk-est-ce-que",
    "chunk-je-peux",
    "chunk-vous-pouvez",
    "chunk-m-aider",
    "chunk-j-y-vais",
    "chunk-on-y-va",
    "chunk-faire-une-pause",
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-merci",
    "chunk-au-revoir",
    "chunk-sil-vous-plait",
  ],
  requiredItemIds: [
    // The A Small Moment read, per the spec's chosen variant B'.
    "adj-fatigue", // `Je suis fatigué.` — DOES NOT EXIST in the registry.
    "chunk-je-suis",
    "chunk-il-faut",
    "chunk-faire-une-pause",
    "chunk-je-vais",
    "chunk-a-la-maison",
  ],
  prohibited: [
    "live AI evaluation, free chat, personalization",
    "Mini Mission / Mini Conversation revival",
    "advice / coaching register (tu devrais, il faudrait)",
    "new emotional vocabulary (L17 owns feelings)",
    "past or future in the reading",
    "il faut que + subjunctive",
    "y + modal chains (je dois y aller, je peux y aller)",
    "productive object pronouns beyond the frozen vous pouvez m'aider",
  ],
  authoringBrief:
    "After class. Someone is tired, takes a break, then heads home. The spine is read → " +
    "understand → respond simply. The read is <=3 lines, present-only, built entirely from " +
    "owned material; the response is one short scaffolded line with a deterministic " +
    "model-answer reveal. Integration weighting: Weave It / Say It Your Way carry the lesson; " +
    "Meet It and Why This Works stay light.",
  forwardHook:
    "Exactly one recognition-only forward hook. The spec prefers an L17 feelings hook carried " +
    "by owned `fatigué` — which is blocked by the same missing identity — so the L18 " +
    "futur-proche preview (je vais + owned infinitive) is the available alternative.",
  openDecisions: [
    {
      code: "L16-FATIGUE-IDENTITY",
      description:
        "The spec's chosen reading requires `fatigué`, which has no canonical identity. " +
        "Create the identity, or change the authored reading. Until then the lesson's own " +
        "known-items-only rule and its chosen first line cannot both hold. This also blocks " +
        "the spec's preferred L17 feelings forward hook.",
    },
  ],
};

describe("factory preflight — passing contracts", () => {
  test("a Doorway contract inside its budget is generation-ready", () => {
    const result = preflightLessonContract({
      contract: base({ requiredItemIds: ["chunk-merci", "chunk-bonjour"] }),
    });
    assertEqual(result.diagnostics, [], "no diagnostics");
    assert(result.generationReady, "generation-ready");
    assertEqual(result.requiredIdentitiesPresent, 2, "both identities exist");
  });

  test("a zero-demand Integration contract is generation-ready", () => {
    const result = preflightLessonContract({
      contract: base({
        lessonId: "v1-lesson-901",
        journeyRole: "integration",
        acquisitionDemandItemIds: [],
        recycledItemIds: ["chunk-merci"],
        requiredItemIds: ["chunk-merci"],
      }),
    });
    assert(result.generationReady, `expected ready, got ${JSON.stringify(result.diagnostics)}`);
    assertEqual(result.acquisitionDemandCount, 0, "explicit zero");
  });

  test("recycled and supported material does not inflate acquisition demand", () => {
    const result = preflightLessonContract({
      contract: base({
        journeyRole: "integration",
        acquisitionDemandItemIds: [],
        recycledItemIds: ["chunk-merci", "chunk-bonjour", "chunk-je-suis"],
        supportedItemIds: ["word-ici"],
        recognitionItemIds: ["chunk-au-revoir"],
        requiredItemIds: ["chunk-merci"],
      }),
    });
    assertEqual(result.acquisitionDemandCount, 0, "only demands count");
    assert(result.generationReady, "recycled/supported/recognition are free");
  });
});

describe("factory preflight — blockers", () => {
  test("CF-001 — an unknown required identity blocks", () => {
    const result = preflightLessonContract({
      contract: base({ requiredItemIds: ["chunk-merci", "adj-fatigue"] }),
    });
    const cf1 = result.diagnostics.filter((d) => d.code === "CF-001");
    assertEqual(cf1.length, 1, "one missing identity");
    assertEqual(cf1[0].subject, "adj-fatigue", "names the missing id");
    assertEqual(result.missingIdentities, ["adj-fatigue"], "reported for the founder");
    assert(!result.generationReady, "not generation-ready");
  });

  test("CF-002 — an acquisition-covered whole may not be a demand", () => {
    assert(
      codes(base({ acquisitionDemandItemIds: ["chunk-j-ai-faim"] })).includes("CF-002"),
      "covered whole blocked",
    );
  });

  test("CF-002 — a linked-only identity may not be a demand", () => {
    assert(
      codes(base({ acquisitionDemandItemIds: ["noun-the"] })).includes("CF-002"),
      "linked-only blocked",
    );
  });

  test("CF-002 — an unknown demand id blocks", () => {
    assert(codes(base({ acquisitionDemandItemIds: ["ghost"] })).includes("CF-002"), "unknown id");
  });

  test("CF-003 — a role-budget conflict blocks", () => {
    assert(
      codes(
        base({
          journeyRole: "integration",
          acquisitionDemandItemIds: ["chunk-merci"],
          requiredItemIds: [],
        }),
      ).includes("CF-003"),
      "integration is 0",
    );
    assert(
      codes(base({ journeyRole: "doorway", acquisitionDemandItemIds: [] })).includes("CF-003"),
      "doorway needs 1-2",
    );
  });

  test("CF-004 — one identity may not hold two contractual roles", () => {
    const result = preflightLessonContract({
      contract: base({
        acquisitionDemandItemIds: ["chunk-merci"],
        recycledItemIds: ["chunk-merci"],
      }),
    });
    const cf4 = result.diagnostics.filter((d) => d.code === "CF-004");
    assertEqual(cf4.length, 1, "one contradiction");
    assert(cf4[0].message.includes("acquisition demand AND recycled"), cf4[0].message);
  });

  test("CF-004 — undeclared buckets are not invented", () => {
    const result = preflightLessonContract({
      contract: base({ acquisitionDemandItemIds: ["chunk-merci"], recycledItemIds: [] }),
    });
    assertEqual(
      result.diagnostics.filter((d) => d.code === "CF-004"),
      [],
      "absent supported/recognition lists are simply not checked",
    );
  });

  test("CF-005 — an open founder decision blocks generation-readiness", () => {
    const result = preflightLessonContract({
      contract: base({
        openDecisions: [{ code: "X-1", description: "unresolved scope question" }],
      }),
    });
    const cf5 = result.diagnostics.filter((d) => d.code === "CF-005");
    assertEqual(cf5.length, 1, "surfaced");
    assertEqual(cf5[0].severity, "founder-decision", "its own class, not a technical error");
    assert(!result.generationReady, "a contract with an open decision is never ready");
  });
});

describe("factory preflight — the L16 fixture", () => {
  const result = preflightLessonContract({ contract: L16_CONTRACT });

  test("L16 is NOT generation-ready, and the reason is the missing identity", () => {
    assert(!result.generationReady, "blocked");
    const cf1 = result.diagnostics.filter((d) => d.code === "CF-001");
    assertEqual(cf1.length, 1, "exactly one missing identity");
    assertEqual(cf1[0].subject, "adj-fatigue", "`fatigué` has no canonical identity");
  });

  test("L16 does NOT block on the active-new budget", () => {
    assertEqual(result.acquisitionDemandCount, 0, "PRJ-015 IC-002 names L16 as 0");
    assertEqual(result.journeyRole, "integration", "Integration band is 0");
    assertEqual(
      result.diagnostics.filter((d) => d.code === "CF-003"),
      [],
      "zero demands satisfy Integration without any exception",
    );
    assertEqual(
      result.diagnostics.filter((d) => d.code === "CF-002"),
      [],
      "an empty demand list is structurally legal",
    );
  });

  test("L16 records the fatigué question as a founder decision", () => {
    const cf5 = result.diagnostics.filter((d) => d.code === "CF-005");
    assertEqual(cf5.length, 1, "recorded, not inferred");
    assertEqual(cf5[0].subject, "L16-FATIGUE-IDENTITY", "named");
  });

  test("preflight substitutes NOTHING — it reports and stops", () => {
    // The dry run's hand-substituted reading (Il faut faire une pause. / Je vais
    // à la maison. / On y va ?) must never become automated behaviour.
    assertEqual(
      result.missingIdentities,
      ["adj-fatigue"],
      "the gap is reported as-is",
    );
    // The real property: no diagnostic OFFERS an alternative identity. (The
    // CF-001 text does contain the word "substitute" — as a prohibition.)
    const cf1 = result.diagnostics.find((d) => d.code === "CF-001");
    const namedIds = [...(cf1?.message.match(/"[a-z0-9-]+"/g) ?? [])];
    assertEqual(namedIds, ['"adj-fatigue"'], "only the missing id is named — no candidate replacement");
    // The contract is returned untouched: nothing was added to requiredItemIds.
    assert(
      L16_CONTRACT.requiredItemIds.includes("adj-fatigue"),
      "the contract still names the identity it needs",
    );
  });
});

describe("factory preflight — report", () => {
  test("blockers are printed before founder decisions, ordering stable", () => {
    const result = preflightLessonContract({
      contract: base({
        requiredItemIds: ["adj-fatigue"],
        openDecisions: [{ code: "X-1", description: "open" }],
      }),
    });
    const text = formatPreflightReport(result);
    assert(text.indexOf("BLOCKER") < text.indexOf("FOUNDER-DECISION"), "blocker first");
    assert(text.includes("generationReady: no"), "readiness stated");
    assertEqual(formatPreflightReport(result), text, "stable across calls");
  });

  test("a ready contract reports generationReady: yes", () => {
    const text = formatPreflightReport(
      preflightLessonContract({ contract: base({ requiredItemIds: ["chunk-merci"] }) }),
    );
    assert(text.includes("generationReady: yes"), text);
  });
});
