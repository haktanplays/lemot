/**
 * L12 lesson contract fixture (v0.1) — Est-ce que / Yes-No Question Wrapper.
 *
 * Archetype: narrow question wrapper / gateway grammar. It owns ONE move —
 * placing «est-ce que» in front of an already-owned clause to make a yes/no
 * question — plus the base clauses that sit inside the wrapper (supported). It
 * deliberately keeps inversion questions, «qu'est-ce que», and the full
 * question-word system as recognition-only hooks that must never be production
 * targets. No question formation beyond the frozen wrapper, no inversion, no
 * y/en. This is a fixture — not wired into the live renderer.
 */
import type { LessonContract } from "../types";

export const L12_CONTRACT: LessonContract = {
  id: "L12",
  title: "Est-ce que / Yes-No Question Wrapper",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L12.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Ask simple yes/no questions by placing «est-ce que» in front of an already-owned clause (« est-ce que je peux faire ça ? », « est-ce que vous pouvez m'aider ? »), without inversion, question words, or «qu'est-ce que».",
    notGoal: [
      "inversion questions (peux-tu… ?)",
      "«qu'est-ce que…» information questions",
      "question words (comment / pourquoi / quand / qui / que / combien)",
      "«où + est-ce que» place questions",
      "y / en questions",
      "the full pouvoir paradigm",
      "open / free conversation",
    ],
  },
  items: {
    // Active: the «est-ce que + clause» wrapper, incl. the bare marker.
    activeNew: [
      "chunk:est-ce-que",
      "chunk:est-ce-que-je-peux-faire-ca",
      "chunk:est-ce-que-tu-peux-faire-ca",
      "chunk:est-ce-que-vous-pouvez-m-aider",
    ],
    // Already-owned base clauses that sit inside the wrapper. These are L11
    // (Pouvoir-light) carry-in proxies — supported here only to assemble/contrast
    // the est-ce que wrapper, NOT broad L12 pouvoir ownership.
    supported: ["chunk:je-peux-faire-ca", "chunk:vous-pouvez-m-aider"],
    // Future question systems L12 may show but never asks the learner to build.
    recognitionOnly: [
      "grammar_piece:inversion-questions",
      "chunk:peux-tu-faire-ca",
      "chunk:qu-est-ce-que",
      "grammar_piece:question-words",
      "error_pattern:est-ce-que-inversion-mix",
    ],
    recycled: [],
  },
  production: {
    // Only the «est-ce que» wrapper (marker + frozen wrapped questions) and the
    // owned base clauses inside it may be produced in L12. The supported base
    // clauses are producible here ONLY as wrapper-building / contrast material;
    // L12 does NOT open the broad pouvoir paradigm.
    allowedProduction: [
      "chunk:est-ce-que",
      "chunk:est-ce-que-je-peux-faire-ca",
      "chunk:est-ce-que-tu-peux-faire-ca",
      "chunk:est-ce-que-vous-pouvez-m-aider",
      "chunk:je-peux-faire-ca",
      "chunk:vous-pouvez-m-aider",
    ],
    // Question systems the validator must keep out of production targets
    // (inversion, «qu'est-ce que», question words, mixed-form error).
    blockedProduction: [
      "grammar_piece:inversion-questions",
      "chunk:peux-tu-faire-ca",
      "chunk:qu-est-ce-que",
      "grammar_piece:question-words",
      "error_pattern:est-ce-que-inversion-mix",
    ],
    allowedOperations: [
      "recognition",
      "fill",
      "build",
      "register_switch",
      "context_chain",
    ],
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
