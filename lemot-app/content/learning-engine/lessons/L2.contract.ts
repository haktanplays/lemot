/**
 * L2 lesson contract fixture (v0.1) — «Je suis» / "I am here".
 *
 * The first-run-equivalent engine version of v1 Lesson 1's core: a narrow
 * «je suis + ici» location doorway. It owns three active chunks (the «je suis»
 * opener, the place word «ici», and the whole phrase «je suis ici») and may
 * produce all three. It deliberately does NOT open the full être paradigm, être
 * for identity/profession, any place beyond «ici», open production, or free
 * conversation. This is a fixture — not wired into the live renderer.
 */
import type { LessonContract } from "../types";

export const L2_CONTRACT: LessonContract = {
  id: "L2",
  title: "Je suis, I am here",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L2.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo: "Say where you are with «je suis» + a place: «Je suis ici.»",
    notGoal: [
      "the full être paradigm (tu es / il est / nous sommes…)",
      "être for identity or profession",
      "places other than «ici»",
      "open production",
      "free conversation",
    ],
  },
  items: {
    activeNew: ["chunk:je-suis", "chunk:ici", "chunk:je-suis-ici"],
    supported: [],
    recognitionOnly: [],
    recycled: [],
  },
  production: {
    allowedProduction: ["chunk:je-suis", "chunk:ici", "chunk:je-suis-ici"],
    blockedProduction: [],
    allowedOperations: ["recognition", "fill", "build", "context_chain"],
    blockedOperations: ["open_production", "free_conversation"],
  },
  supportFade: {
    promptFadeMax: "PF2",
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
