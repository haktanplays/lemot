/**
 * L18 lesson contract fixture (v0.1) — Futur Proche Doorway / Strong Preview.
 *
 * A tense/gateway boundary lesson: it owns a narrow, chunk-first near-future
 * doorway — «aller + known chunk» ("je vais faire ça" / "on va faire ça",
 * active) scaffolded by the already-known aller movement chunks ("je vais" /
 * "on va", supported carry-in) — and deliberately keeps the full futur simple,
 * the near-future↔simple-future contrast, complex time expressions, and the
 * y + future pronoun chain as recognition-only hooks that must never be
 * production targets. This is a fixture — not wired into the live renderer.
 *
 * Carry-in note: «chunk:je-vais» / «chunk:on-va» are owned here as supported
 * carry-in but are defined once in L14_ITEMS (not re-authored) — see index.ts.
 */
import type { LessonContract } from "../types";

export const L18_CONTRACT: LessonContract = {
  id: "L18",
  title: "Futur Proche Doorway / Strong Preview",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L18.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Talk about the near future with the «aller + known chunk» doorway («je vais faire ça» / «on va faire ça»), scaffolded by the known «je vais» / «on va», without opening the simple future or the near-future↔simple-future contrast.",
    notGoal: [
      "the full futur simple system (je ferai, j'irai…)",
      "near-future vs simple-future contrast",
      "complex time expressions",
      "y + future pronoun chains (e.g. «je vais y aller»)",
      "broad future / pronoun-placement system",
    ],
  },
  items: {
    activeNew: ["chunk:je-vais-faire-ca", "chunk:on-va-faire-ca"],
    // Already-known aller movement chunks, reused as near-future scaffolding.
    // Defined in L14_ITEMS, not re-authored here.
    supported: ["chunk:je-vais", "chunk:on-va"],
    recognitionOnly: [
      "grammar_piece:futur-simple-system",
      "chunk:je-ferai",
      "chunk:j-irai",
      "grammar_piece:vais-faire-vs-ferai",
      "grammar_piece:complex-time-expressions",
      "chunk:je-vais-y-aller",
      "error_pattern:futur-proche-vs-simple-confusion",
    ],
    recycled: [],
  },
  production: {
    // Only the near-future «aller + chunk» doorway may be produced. The «je vais»
    // / «on va» carry-in stays supported/scaffolded (recognizable, not a
    // standalone L18 production target).
    allowedProduction: ["chunk:je-vais-faire-ca", "chunk:on-va-faire-ca"],
    // Future-system hooks the validator must keep out of production targets.
    blockedProduction: [
      "grammar_piece:futur-simple-system",
      "chunk:je-ferai",
      "chunk:j-irai",
      "grammar_piece:vais-faire-vs-ferai",
      "grammar_piece:complex-time-expressions",
      "chunk:je-vais-y-aller",
      "error_pattern:futur-proche-vs-simple-confusion",
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
