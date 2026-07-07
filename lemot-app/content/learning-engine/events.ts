/**
 * Learning-engine event types (P1.1) — pure types, no runtime.
 *
 * The append-only `LearningEvent` is the spine of the Founder Self-Learning
 * Build: everything downstream (mastery, Mon Lexique, Practice Pool, Daily
 * Review, dashboard analytics) is a PROJECTION of the event log, never primary
 * state. This file defines the event shape and the deterministic grading
 * outcome vocabulary (`ErrorTagCode`) only — no storage, no repository, no
 * reducer, no UI. Those land in later steps (P1.2 LocalRepository, P2 grade /
 * mastery).
 *
 * Hard boundaries (P1.1):
 *  - Types only. No runtime side effects, no `Date.now()`, no storage, no
 *    network, no React, no AI.
 *  - Reuses `ItemId` / `OperationId` / `PromptFadeLevel` from ./types.ts.
 *
 * `ErrorTagCode` is the GRADING outcome vocabulary (per the architecture note
 * §7 / the Sprint13 SW.1 workstream). It is intentionally distinct from the
 * validator's `FindingCode` (content authoring) in ./types.ts — they describe
 * different things (a learner's answer vs. a content defect).
 */
import type { ItemId, OperationId, PromptFadeLevel } from "./types";

/**
 * Deterministic grading outcome for a single learner answer. One code is the
 * PRIMARY `result`; additional cheap signals may ride along in `errorTags`.
 * `meaning_shift` / `incorrect_but_understandable` are deliberately COARSE
 * fallback heuristics — the only codes a future AI layer may later refine,
 * never override (deterministic engine first). Computed by P2's `grade()`.
 */
export type ErrorTagCode =
  | "correct"
  | "accepted_variant"
  | "punctuation_only"
  | "accent_only"
  | "spelling_near_miss"
  | "wrong_item"
  | "wrong_order"
  | "missing_word"
  | "extra_word"
  | "wrong_register"
  | "meaning_shift"
  | "blocked_form_used"
  | "recognition_only_form_used"
  | "overproduction_unseen_form"
  | "incorrect_but_understandable"
  | "empty_or_skip";

/**
 * Runtime mirror of `ErrorTagCode` (YASA 3 rails). Both directions are
 * compile-time locked below: removing a code from the type breaks the
 * array's element check; removing it from the array breaks the
 * exhaustiveness check. The shipped-error-tags manifest freezes these
 * values forever — learner evidence references them by string.
 */
export const ERROR_TAG_CODES = [
  "correct",
  "accepted_variant",
  "punctuation_only",
  "accent_only",
  "spelling_near_miss",
  "wrong_item",
  "wrong_order",
  "missing_word",
  "extra_word",
  "wrong_register",
  "meaning_shift",
  "blocked_form_used",
  "recognition_only_form_used",
  "overproduction_unseen_form",
  "incorrect_but_understandable",
  "empty_or_skip",
] as const;

// Every array member is a valid ErrorTagCode…
const _codesAreValid: readonly ErrorTagCode[] = ERROR_TAG_CODES;
void _codesAreValid;
// …and every ErrorTagCode is in the array (exhaustive).
type MissingErrorTagCodes = Exclude<ErrorTagCode, (typeof ERROR_TAG_CODES)[number]>;
const _allCodesListed: MissingErrorTagCodes extends never ? true : never = true;
void _allCodesListed;

/** Local sync state of an event. Remote phase (P6/P7) drains "pending". */
export type LearningEventSyncStatus = "pending" | "synced";

/** Minimal device / build provenance captured with each event. */
export type DeviceInfo = {
  platform: string;
  osVersion?: string;
  expoRuntime?: string;
};

/** Per-event local sync metadata. `origin` is "local" for device-emitted events. */
export type LearningEventSync = {
  status: LearningEventSyncStatus;
  origin: "local";
  queuedAt: number;
};

/**
 * One immutable, append-only learning event. `clientEventId` (a device-generated
 * UUID) is the idempotency key / spine for offline replay and de-duplicated
 * remote ingestion. `result` (one code) drives the mastery reducer; `errorTags`
 * (many) feed analytics. `userAnswer` is raw learner text — its storage is a
 * privacy concern disclosed in consent (later phases).
 */
export type LearningEvent = {
  clientEventId: string;
  sessionId: string;
  lessonId: string;
  exerciseId: string;
  operation: OperationId;
  itemIds: ItemId[];
  promptLevel: PromptFadeLevel;
  attemptNumber: number;
  userAnswer: string | null;
  expectedAnswer: string | null;
  normalizedAnswer: string | null;
  result: ErrorTagCode;
  errorTags: ErrorTagCode[];
  timestamp: number;
  contentVersion: string;
  appBuild: string;
  deviceInfo: DeviceInfo;
  sync: LearningEventSync;
};

/**
 * The fields a caller supplies when an answer is graded, BEFORE the local
 * repository stamps the append-only bookkeeping (`clientEventId`, `timestamp`,
 * `sync`). A convenience for P1.2+/P3 wiring — the repository fills the rest.
 * Kept here so the event shape has one home; nothing consumes it yet.
 */
export type LearningEventDraft = Omit<
  LearningEvent,
  "clientEventId" | "timestamp" | "sync"
>;
