/**
 * L11 lesson contract fixture (v0.1) — Pouvoir-light (Ability / Permission / Help).
 *
 * Archetype: narrow modal doorway. It owns a fixed set of «je peux» / «vous
 * pouvez» chunks for ability, permission, and help/repeat requests, and
 * deliberately keeps the conditional («je pourrais», «vous pourriez»), the full
 * pouvoir paradigm, the possibility/probability nuance, and pouvoir
 * over-generalization as recognition-only hooks that must never be production
 * targets. No conjugation beyond the fixed chunks, no politeness ladder, no
 * possibility nuance. The two base clauses it owns active —
 * «chunk:je-peux-faire-ca» / «chunk:vous-pouvez-m-aider» — live in SHARED_ITEMS
 * (first taught here, carried into L12 as supported). This is a fixture — not
 * wired into the live renderer.
 */
import type { LessonContract } from "../types";

export const L11_CONTRACT: LessonContract = {
  id: "L11",
  title: "Pouvoir-light — Ability / Permission / Help",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L11.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Make simple ability, permission, and help requests with fixed «je peux» / «vous pouvez» chunks (« je peux faire ça », « je ne peux pas faire ça », « je peux faire ça ? », « vous pouvez m'aider »), without the conditional, the full pouvoir paradigm, or possibility nuance.",
    notGoal: [
      "the full pouvoir paradigm (tu peux / il peut / nous pouvons / ils peuvent)",
      "conditional / politeness forms (je pourrais, vous pourriez)",
      "probability / possibility nuance («it may be possible / it can happen»)",
      "past or future pouvoir",
      "the subjunctive",
      "the broad object-pronoun system",
      "open / free conversation",
    ],
  },
  items: {
    // The two SHARED base clauses (je-peux-faire-ca / vous-pouvez-m-aider) are
    // owned active HERE; L11 first teaches them. The other four are L11_ITEMS.
    activeNew: [
      "chunk:je-peux-faire-ca",
      "chunk:je-ne-peux-pas-faire-ca",
      "chunk:je-peux-faire-ca-q",
      "chunk:je-peux-faire-une-pause-q",
      "chunk:vous-pouvez-m-aider",
      "chunk:vous-pouvez-repeter",
    ],
    supported: [],
    // Future pouvoir systems L11 may show but never asks the learner to build.
    recognitionOnly: [
      "chunk:je-pourrais",
      "chunk:vous-pourriez",
      "grammar_piece:pouvoir-full-paradigm",
      "grammar_piece:pouvoir-possibility-nuance",
      "error_pattern:pouvoir-overgeneralization",
    ],
    recycled: [],
  },
  production: {
    // Only the fixed «je peux» / «vous pouvez» chunks may be produced in L11.
    allowedProduction: [
      "chunk:je-peux-faire-ca",
      "chunk:je-ne-peux-pas-faire-ca",
      "chunk:je-peux-faire-ca-q",
      "chunk:je-peux-faire-une-pause-q",
      "chunk:vous-pouvez-m-aider",
      "chunk:vous-pouvez-repeter",
    ],
    // Recognition-only pouvoir hooks the validator must keep out of production
    // targets (conditional, full paradigm, possibility nuance, over-generalization).
    blockedProduction: [
      "chunk:je-pourrais",
      "chunk:vous-pourriez",
      "grammar_piece:pouvoir-full-paradigm",
      "grammar_piece:pouvoir-possibility-nuance",
      "error_pattern:pouvoir-overgeneralization",
    ],
    // register_switch is deliberately omitted — it would invite a politeness
    // ladder toward the conditional (pourrais / pourriez), which L11 must not open.
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
