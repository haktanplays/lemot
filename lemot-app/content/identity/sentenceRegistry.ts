/**
 * THE production sentence registry (PR-07) — data only.
 *
 * One authoritative export, built through the PR-01 validation path in
 * ./sentenceIdentity.ts. Exactly TWO records ship here — the PM-009 and PM-011
 * pilot sentences — and nothing else: no reserve surface ("Bonjour, je voudrais
 * un thé." stays unregistered), no seed 008, no rescue/scene/reveal sentence,
 * and no bulk seed pool. Draft-local `L1-SE-###` handles remain documentation
 * ids and never appear here.
 *
 * French-QA truth: both records carry `founder_waived_provisional` — the
 * founder explicitly deferred the pre-registration human French-QA gate and
 * accepted the risk. NO named-human approval exists for these surfaces; the
 * prior AI review is provisional evidence only, and one comprehensive human QA
 * pass over the assembled learner surface remains mandatory before any
 * public / content-complete release. Nothing here may ever claim `approved`
 * without that named human review.
 *
 * Audio: absent on purpose — no audio identity exists before the audio-gated
 * PR-11.
 */
import {
  buildSentenceRegistry,
  type SentenceId,
  type SentenceRecord,
  type SentenceRegistry,
} from "./sentenceIdentity";

/** PM-009 — seed 009. Punctuation alternatives only; one identity. */
const SENT_L01_MERCI: SentenceRecord = {
  id: "sent:l01-merci" as SentenceId,
  preferredSurface: "Merci.",
  acceptedAlternatives: ["Merci", "Merci !"],
  itemIds: ["chunk-merci"],
  spans: [{ text: "Merci", itemId: "chunk-merci", treatment: "active" }],
  provenance: "shipped-payload",
  lessonEligibility: ["v1-lesson-001"],
  frenchQa: "founder_waived_provisional",
  status: "active",
};

/** PM-011 — seed 007 (SC-4). The Supported tea-package sentence. */
const SENT_L01_TEA_ORDER: SentenceRecord = {
  id: "sent:l01-je-voudrais-un-the-sil-vous-plait" as SentenceId,
  preferredSurface: "Je voudrais un thé, s'il vous plaît.",
  acceptedAlternatives: [],
  itemIds: ["chunk-je-voudrais", "chunk-un-the", "chunk-sil-vous-plait"],
  spans: [
    { text: "Je voudrais", itemId: "chunk-je-voudrais", treatment: "active" },
    { text: "un thé", itemId: "chunk-un-the", treatment: "supported" },
    { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", treatment: "active" },
  ],
  provenance: "newly-authored",
  lessonEligibility: ["v1-lesson-001"],
  frenchQa: "founder_waived_provisional",
  status: "active",
};

const PRODUCTION_SENTENCE_RECORDS: readonly SentenceRecord[] = [
  SENT_L01_MERCI,
  SENT_L01_TEA_ORDER,
];

const built = buildSentenceRegistry(PRODUCTION_SENTENCE_RECORDS);
if (built.errors.length > 0) {
  // Fail closed at module initialisation: a registry that cannot validate must
  // never be half-adopted by a lesson path that already imported it.
  throw new Error(
    `sentence registry failed validation:\n${built.errors.map((e) => `  - ${e}`).join("\n")}`,
  );
}

/** The one authoritative production sentence registry. */
export const SENTENCE_REGISTRY: SentenceRegistry = built.registry;
