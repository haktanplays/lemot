/**
 * L15 lesson contract fixture (v0.1) — Devoir/Falloir-light Obligation Doorway.
 *
 * A boundary lesson: it owns a narrow, chunk-first obligation doorway —
 * impersonal «il faut + infinitive» (active) and personal «je dois + infinitive»
 * (supported devoir-light) — and deliberately keeps the subjunctive after
 * «il faut que», the full devoir paradigm, conditional advice ("je devrais"),
 * and softened obligation ("il faudrait que") as recognition-only hooks that
 * must never be production targets. This is a fixture — not wired into the live
 * renderer.
 */
import type { LessonContract } from "../types";

export const L15_CONTRACT: LessonContract = {
  id: "L15",
  title: "Devoir/Falloir-light Obligation Doorway",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L15.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Express simple obligation with the «il faut + infinitive» doorway, and personally with the supported «je dois + infinitive», without opening the subjunctive, the full devoir paradigm, or conditional advice.",
    notGoal: [
      "«il faut que» + subjunctive",
      "the full devoir paradigm (je dois / tu dois / il doit / nous devons…)",
      "conditional advice (je devrais)",
      "«il faudrait que» softened obligation",
      "negative obligation nuances",
      "broad modal / subjunctive system",
    ],
  },
  items: {
    activeNew: ["chunk:il-faut-faire-ca", "chunk:il-faut-faire-une-pause"],
    // Personal devoir-light doorway, carried as supported (not the full paradigm).
    supported: ["chunk:je-dois", "chunk:je-dois-faire-ca"],
    recognitionOnly: [
      "grammar_piece:il-faut-que-subjunctive",
      "chunk:il-faut-que-j-aille",
      "grammar_piece:devoir-full-paradigm",
      "chunk:je-devrais",
      "grammar_piece:il-faudrait-que",
      "error_pattern:il-faut-que-indicative",
    ],
    recycled: [],
  },
  production: {
    // Only the «il faut + infinitive» doorway and the bound «je dois faire ça»
    // may be produced in L15. Standalone «je dois» stays supported/scaffolded
    // (owned + recognizable) but is NOT a standalone production target.
    allowedProduction: [
      "chunk:il-faut-faire-ca",
      "chunk:il-faut-faire-une-pause",
      "chunk:je-dois-faire-ca",
    ],
    // Recognition-only obligation hooks the validator must keep out of
    // production targets (subjunctive, full devoir, conditional advice).
    blockedProduction: [
      "grammar_piece:il-faut-que-subjunctive",
      "chunk:il-faut-que-j-aille",
      "grammar_piece:devoir-full-paradigm",
      "chunk:je-devrais",
      "grammar_piece:il-faudrait-que",
      "error_pattern:il-faut-que-indicative",
    ],
    allowedOperations: ["recognition", "fill", "build", "context_chain"],
    blockedOperations: ["open_production", "free_conversation"],
  },
  supportFade: {
    promptFadeMax: "PF1",
  },
  answerPolicy: {
    defaultValidationMode: "expected-bank",
    allowAlternatives: true,
    aiMayExplain: true,
    aiMayOverride: false,
  },
  sourceHygiene: {
    origin: "original",
    thirdPartySourceDerived: false,
    disallowedDerivative: false,
    sourceRisk: "none",
    reviewStatus: "passed",
  },
};
