/**
 * Registered authored-payload identity (PR-07) — pure, data + resolution.
 *
 * The bridge that lets a REAL lesson screen carry a REAL sentence and EV
 * identity on its events. Keyed by the existing qualified lesson-screen
 * identity (`lessonId/screenId`) — the payload id events already record — so
 * nothing about event identity changes shape; two fields that were honestly
 * null (`evId`, `sentenceId`) now resolve for exactly the registered payloads.
 *
 * Exactly TWO payloads are registered: PM-009 (EV-030 → sent:l01-merci) and
 * PM-011 (EV-040 → sent:l01-je-voudrais-un-the-sil-vous-plait). `sourcePairing`
 * is DOCUMENTATION PROVENANCE ONLY — an `L1-PM-###` handle never becomes a
 * payloadId, exerciseId, clientEventId, evId or sentenceId.
 *
 * Resolution is by exact registered key only: no French-text lookup, no
 * screen-type inference, no item-id inference, no prompt matching, no
 * screen-order guessing, and no fallback identity for unregistered screens —
 * they keep `evId: null` / `sentenceId: null` exactly as before.
 */
import type { SentenceId, SentenceRecord } from "./sentenceIdentity";
import { SENTENCE_REGISTRY } from "./sentenceRegistry";
import {
  isInternalPilotFrenchReachable,
  type FrenchQaStatus,
} from "./frenchQaStatus";
import { ITEM_REGISTRY } from "../itemRegistry";
import type { LearningItem, Lesson } from "../lessonTypes";
import { qualifyLessonScreenId } from "../lesson-v1-evidence/identity";

export type RegisteredLessonPayload = {
  /** The qualified lesson-screen identity events already use. */
  payloadId: string;
  /** Exercise Variation Inventory id (`EV-###`). */
  evId: string;
  sentenceId: SentenceId;
  /** Documentation provenance only — never a runtime identifier. */
  sourcePairing: "L1-PM-009" | "L1-PM-011";
  status: "active";
};

export const REGISTERED_LESSON_PAYLOADS: readonly RegisteredLessonPayload[] =
  Object.freeze([
    Object.freeze({
      payloadId: "v1-lesson-001/s10-weave-merci-thanks",
      evId: "EV-030",
      sentenceId: "sent:l01-merci" as SentenceId,
      sourcePairing: "L1-PM-009" as const,
      status: "active" as const,
    }),
    Object.freeze({
      payloadId: "v1-lesson-001/s11-weave-the-order",
      evId: "EV-040",
      sentenceId: "sent:l01-je-voudrais-un-the-sil-vous-plait" as SentenceId,
      sourcePairing: "L1-PM-011" as const,
      status: "active" as const,
    }),
  ]);

const BY_PAYLOAD_ID: ReadonlyMap<string, RegisteredLessonPayload> = new Map(
  REGISTERED_LESSON_PAYLOADS.map((p) => [p.payloadId, p]),
);

export type RegisteredPayloadIdentity = {
  evId: string;
  sentenceId: SentenceId;
};

/**
 * Resolve the registered EV + sentence identity for one payload id, or null
 * for every unregistered screen. Exact-key lookup only.
 */
export function resolveRegisteredPayloadIdentity(
  payloadId: string,
): RegisteredPayloadIdentity | null {
  const record = BY_PAYLOAD_ID.get(payloadId);
  if (!record) return null;
  return { evId: record.evId, sentenceId: record.sentenceId };
}

/**
 * One event-surface resolver implementation for BOTH learning surfaces.
 *
 * Placement stays caller-owned (`lesson_path` in the lesson bridge,
 * `practice_hub` in the Hub) while identity resolution is shared, so the SAME
 * payload carries the SAME EV/sentence identity wherever the attempt happens.
 * `sequence` stays null — no multi-step orchestration exists.
 */
export function makeRegisteredEventSurface(
  placement: "lesson_path" | "practice_hub",
) {
  return (exercise: { id: string }) => {
    const identity = resolveRegisteredPayloadIdentity(exercise.id);
    return {
      placement,
      evId: identity?.evId ?? null,
      payloadId: exercise.id,
      sentenceId: identity?.sentenceId ?? null,
      sequence: null,
    };
  };
}

const EV_ID_PATTERN = /^EV-\d{3}$/;
const PLANNING_HANDLE = /L1-PM-\d+/;

/**
 * Validate the payload registry against the actual shipped lessons. Findings,
 * not throws, so the content validator can print all of them at once.
 */
export function validateRegisteredPayloads(
  lessons: readonly Lesson[],
): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const payload of REGISTERED_LESSON_PAYLOADS) {
    const where = `payload "${payload.payloadId}"`;

    if (seen.has(payload.payloadId)) {
      errors.push(`${where}: duplicate payload id`);
      continue;
    }
    seen.add(payload.payloadId);

    if (!EV_ID_PATTERN.test(payload.evId)) {
      errors.push(`${where}: evId "${payload.evId}" is not an EV-### inventory id`);
    }
    for (const [field, value] of [
      ["payloadId", payload.payloadId],
      ["evId", payload.evId],
      ["sentenceId", payload.sentenceId as string],
    ] as const) {
      if (PLANNING_HANDLE.test(value)) {
        errors.push(
          `${where}: ${field} carries an L1-PM planning handle — provenance never becomes a runtime identifier`,
        );
      }
    }

    const sentence: SentenceRecord | undefined =
      SENTENCE_REGISTRY[payload.sentenceId as string];
    if (!sentence) {
      errors.push(`${where}: unknown sentence id "${payload.sentenceId}"`);
      continue;
    }
    if (!isInternalPilotFrenchReachable(sentence.frenchQa)) {
      errors.push(
        `${where}: sentence "${payload.sentenceId}" has French QA "${sentence.frenchQa}" — ` +
          `pending/rejected content may never become a registered learner payload`,
      );
    }

    // Resolve the payload id to an actual current screen — never by text.
    let found: { lesson: Lesson; screenId: string } | null = null;
    for (const lesson of lessons) {
      for (const screen of lesson.screens) {
        if (qualifyLessonScreenId(lesson.id, screen.id) === payload.payloadId) {
          found = { lesson, screenId: screen.id };
          if (screen.type === "weave") {
            const expected = screen.payload.expectedAnswers[0];
            if (
              expected !== sentence.preferredSurface &&
              !sentence.acceptedAlternatives.includes(expected)
            ) {
              errors.push(
                `${where}: screen expects "${expected}", which is neither the preferred ` +
                  `surface nor an accepted alternative of "${payload.sentenceId}"`,
              );
            }
          } else {
            errors.push(`${where}: resolved screen is not a weave payload`);
          }
        }
      }
    }
    if (!found) {
      errors.push(`${where}: does not resolve to any current lesson screen`);
    } else if (!sentence.lessonEligibility.includes(found.lesson.id)) {
      errors.push(
        `${where}: screen belongs to "${found.lesson.id}", which is not in the ` +
          `sentence's lesson eligibility (${sentence.lessonEligibility.join(", ")})`,
      );
    }
  }

  return errors;
}

// ── QA debt inventory (Part L) ──────────────────────────────────────────────

export type ProvisionalSurfaceInventory = {
  items: readonly { itemId: string; surface: string; frenchQa: FrenchQaStatus }[];
  sentences: readonly {
    sentenceId: string;
    preferredSurface: string;
    frenchQa: FrenchQaStatus;
  }[];
  payloads: readonly {
    payloadId: string;
    evId: string;
    sentenceId: string;
    sourcePairing: string;
  }[];
};

/**
 * List every registered learner surface still awaiting the comprehensive human
 * French-QA pass. Authoring/test utility only — deterministic ordering, static
 * authored data, no learner history, no storage, no React, no network. This is
 * the input inventory for the eventual one-pass QA pack; it does not generate
 * that document.
 */
export function listProvisionalRegisteredSurfaces(): ProvisionalSurfaceInventory {
  const registryItems: readonly LearningItem[] = Object.values(ITEM_REGISTRY);
  const items = registryItems
    .filter((item) => item.frenchQa === "founder_waived_provisional")
    .map((item) => ({
      itemId: item.id,
      surface: item.fr ?? item.text,
      frenchQa: item.frenchQa as FrenchQaStatus,
    }))
    .sort((a, b) => (a.itemId < b.itemId ? -1 : 1));

  const sentences = Object.values(SENTENCE_REGISTRY)
    .filter((s) => s.frenchQa === "founder_waived_provisional")
    .map((s) => ({
      sentenceId: s.id as string,
      preferredSurface: s.preferredSurface,
      frenchQa: s.frenchQa,
    }))
    .sort((a, b) => (a.sentenceId < b.sentenceId ? -1 : 1));

  const payloads = REGISTERED_LESSON_PAYLOADS.filter((p) => {
    const sentence = SENTENCE_REGISTRY[p.sentenceId as string];
    return sentence?.frenchQa === "founder_waived_provisional";
  })
    .map((p) => ({
      payloadId: p.payloadId,
      evId: p.evId,
      sentenceId: p.sentenceId as string,
      sourcePairing: p.sourcePairing as string,
    }))
    .sort((a, b) => (a.payloadId < b.payloadId ? -1 : 1));

  return { items, sentences, payloads };
}
