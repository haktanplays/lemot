/**
 * L1 lesson contract fixture (v0.1).
 *
 * A contract constrains what L1 owns, what it may produce, and what it must
 * not. The validator enforces these constraints against the item registry and
 * the exercise blueprints. This is a fixture — not wired into the live
 * renderer.
 */
import type { LessonContract } from "../types";

export const L1_CONTRACT: LessonContract = {
  id: "L1",
  title: "Survival Kit",
  contractSchemaVersion: "lesson-contract-v0.1",
  versions: {
    contentVersion: "founder-0.1.0",
    lessonVersion: "L1.contract.v0.1",
    itemRegistryVersion: "unversioned",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: {
    canDo:
      "Greet someone and make a simple, polite café request: \"Bonjour, je voudrais un café, s'il vous plaît.\"",
    notGoal: [
      "full conditional grammar",
      "full vouloir paradigm",
      "open restaurant conversation",
      "advanced polite alternatives such as 'je pourrais avoir...'",
      "broad article / gender system",
    ],
  },
  items: {
    activeNew: [
      "chunk:bonjour",
      "chunk:je-voudrais",
      "chunk:s-il-vous-plait",
      "noun_phrase:un-cafe",
    ],
    supported: ["chunk:je-veux", "chunk:merci", "chunk:au-revoir"],
    recognitionOnly: ["culture_piece:bonjour-first", "sound_pattern:nasal-on"],
    recycled: [],
  },
  production: {
    allowedProduction: [
      "chunk:bonjour",
      "chunk:je-voudrais",
      "chunk:s-il-vous-plait",
      "noun_phrase:un-cafe",
      "chunk:je-veux",
      "chunk:merci",
      "chunk:au-revoir",
    ],
    blockedProduction: [
      "culture_piece:bonjour-first",
      "sound_pattern:nasal-on",
    ],
    allowedOperations: [
      "recognition",
      "fill",
      "build",
      "register_switch",
      "context_chain",
    ],
    blockedOperations: ["free_conversation", "open_production"],
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
