/**
 * L14 lesson contract fixture (v0.1) — y-light / Place Pronoun Doorway.
 *
 * A boundary lesson: it owns a narrow, chunk-first place-pronoun doorway
 * ("j'y vais" / "on y va") and deliberately keeps the full y/en pronoun system,
 * modal + y + infinitive chains, and the 'en' system as recognition-only hooks
 * that must never be production targets. This is a fixture — not wired into the
 * live renderer.
 */
import type { LessonContract } from "../types";

export const L14_CONTRACT: LessonContract = {
  id: "L14",
  title: "Y-light / Place Pronoun Doorway",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L14.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Use \"j'y vais\" / \"on y va\" as chunk-first place/movement expressions without opening the full y/en pronoun system.",
    notGoal: [
      "full y/en grammar",
      "modal + y + infinitive production (e.g. 'je peux y aller')",
      "object pronoun systems",
      "broad pronoun placement rules",
      "past or future 'y' usage",
    ],
  },
  items: {
    activeNew: ["chunk:j-y-vais", "chunk:on-y-va"],
    supported: ["chunk:je-vais", "chunk:on-va"],
    recognitionOnly: [
      "grammar_piece:y-place-light",
      "grammar_piece:full-y-en-contrast",
      "chunk:je-peux-y-aller",
      "error_pattern:j-en-vais",
    ],
    recycled: [],
  },
  production: {
    // Only the active doorway chunks + aller carry-in may be produced.
    allowedProduction: [
      "chunk:j-y-vais",
      "chunk:on-y-va",
      "chunk:je-vais",
      "chunk:on-va",
    ],
    // Recognition-only hooks the validator must keep out of production targets.
    blockedProduction: [
      "grammar_piece:y-place-light",
      "grammar_piece:full-y-en-contrast",
      "chunk:je-peux-y-aller",
      "error_pattern:j-en-vais",
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
