/**
 * L16 lesson contract fixture (v0.1) — Integration + A Small Moment Seed.
 *
 * Archetype: integration / recombination. L16 introduces NO new items — it
 * recombines already-owned chunks from L11 (pouvoir-light), L12 (est-ce que
 * wrapper), and L15 (il faut), plus the SHARED carry-in, into a tight "pause &
 * ask" human situation. The "A Small Moment" seed is expressed with the existing
 * `context_chain` operation (read situation → recognize need → controlled
 * response with fixed model answers). There is deliberately NO open production,
 * NO free conversation, NO AI evaluation, and NO new operation or schema: the
 * boundaries are enforced structurally via `blockedOperations` and fixed answers,
 * not as language items. This is a fixture — not wired into the live renderer.
 *
 * Scope guard: L16 excludes L14 y-light («j'y vais» / «on y va») and introduces
 * no new obligation form — it only reuses the already-known «il faut faire une
 * pause», so it does not reopen L14/L15 scope.
 */
import type { LessonContract } from "../types";

export const L16_CONTRACT: LessonContract = {
  id: "L16",
  title: "Integration — A Small Moment (Pause & Ask)",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L16.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Read a short everyday situation, recognize what is needed, and give a controlled response by recombining known «je peux» / «est-ce que» / «il faut» chunks — e.g. realizing you need a break and asking for one.",
    notGoal: [
      "new grammar system",
      "new architecture verb",
      "open production",
      "free conversation",
      "AI evaluation",
      "Natural Reveal implementation",
      "new tense / aspect",
      "the subjunctive",
      "the conditional",
      "broad pronoun system",
      "full A Small Moment engine",
      "broad feelings / social-language expansion",
    ],
  },
  items: {
    // Pure integration: nothing is newly introduced in L16.
    activeNew: [],
    // Already-owned chunks the learner is scaffolded to PRODUCE in L16.
    supported: [
      "chunk:je-peux-faire-une-pause-q",
      "chunk:est-ce-que-je-peux-faire-ca",
      "chunk:il-faut-faire-une-pause",
      "chunk:vous-pouvez-m-aider",
    ],
    // Earlier chunks reactivated for recognition / context (not produced here).
    recycled: ["chunk:je-peux-faire-ca", "chunk:est-ce-que-vous-pouvez-m-aider"],
    recognitionOnly: [],
  },
  production: {
    // Only the four supported chunks may be produced; all are already owned.
    allowedProduction: [
      "chunk:je-peux-faire-une-pause-q",
      "chunk:est-ce-que-je-peux-faire-ca",
      "chunk:il-faut-faire-une-pause",
      "chunk:vous-pouvez-m-aider",
    ],
    // No recognition-only boundary forms in L16 — the "no open chat / no AI"
    // boundaries are enforced by blockedOperations + fixed model answers, not as
    // language items. Nothing to block from production.
    blockedProduction: [],
    // register_switch omitted — no justified polite ladder here without new items.
    allowedOperations: ["recognition", "fill", "build", "context_chain"],
    // Structurally forbids the A Small Moment from becoming open chat / free output.
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
