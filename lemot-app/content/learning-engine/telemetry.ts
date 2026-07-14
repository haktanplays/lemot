/**
 * Telemetry v0 (Faz 6A Slice B) — LOCAL-ONLY content-debugging telemetry.
 *
 * Contract: docs/CONTENT_FACTORY_CONTRACT.md §4. Purpose is content debugging
 * for the factory loop (where learners drop, what gets seen/produced) — NOT
 * analytics, NOT engagement tracking, NOT a second mastery pipeline.
 *
 * Hard boundaries:
 *  - LOCAL-ONLY: no network, no Supabase, no remote drain, no sync fields.
 *  - NO RAW LEARNER FREE-TEXT: the event shape has no text field, and the
 *    constructor REJECTS any unknown/forbidden key at runtime (defense in
 *    depth against a caller smuggling `userAnswer` etc.).
 *  - Telemetry NEVER updates mastery. The LearningEvent spine (events.ts /
 *    mastery.ts) is a separate, untouched system.
 *  - Deterministic: `eventId` and `timestamp` are EXPLICIT caller inputs —
 *    no Date.now(), no randomness (house rule).
 *  - Storage seam mirrors LocalRepository: injected KvLike for tests, lazy
 *    real kvStorage otherwise, own `lm_le_telemetry` namespace key.
 */
import type { KvLike } from "./repository/local";
import { privacyResetEpoch, isPersistSuppressed } from "../../lib/privacyResetEpoch";
import { isLearnerMutationBlocked } from "../../lib/learnerMutationGate";

/** Bump when the event shape changes. Every event carries it. */
export const TELEMETRY_SCHEMA_VERSION = 1;

/** Namespaced storage key — never collides with lm7/lm7_srs/lm_le_events. */
export const LM_LE_TELEMETRY_KEY = "lm_le_telemetry";

/** The 15 v0 event types (contract §4). repair_* are named FUTURE events. */
export const TELEMETRY_EVENT_TYPES = [
  "lesson_started",
  "screen_seen",
  "item_seen",
  "item_recognized",
  "item_produced",
  "answer_submitted",
  "answer_compared",
  "weave_attempted",
  "exposure_seen",
  "micro_logic_seen",
  "sound_note_seen",
  "chunk_unpack_seen",
  "lesson_completed",
  "lexique_opened",
  "mon_lexique_entry_opened",
] as const;

export type TelemetryEventType = (typeof TELEMETRY_EVENT_TYPES)[number];

const TYPE_SET: ReadonlySet<string> = new Set(TELEMETRY_EVENT_TYPES);

/** Where the event was emitted from (coarse, non-personal). */
export type TelemetrySource = "lesson-runner" | "mon-lexique" | "dev" | "test";

/**
 * One local telemetry event. Deliberately has NO field that can carry
 * learner free text — outcomes ride as short structured tags only.
 */
export type TelemetryEvent = {
  eventId: string;
  type: TelemetryEventType;
  version: number;
  timestamp: number;
  source: TelemetrySource;
  lessonId?: string;
  screenId?: string;
  itemId?: string;
  exerciseId?: string;
  /** Structured, non-personal outcome tag (e.g. a verdict/result code). */
  resultTag?: string;
};

export type CreateTelemetryEventInput = {
  eventId: string;
  type: TelemetryEventType;
  timestamp: number;
  source: TelemetrySource;
  lessonId?: string;
  screenId?: string;
  itemId?: string;
  exerciseId?: string;
  resultTag?: string;
};

const ALLOWED_INPUT_KEYS: ReadonlySet<string> = new Set([
  "eventId",
  "type",
  "timestamp",
  "source",
  "lessonId",
  "screenId",
  "itemId",
  "exerciseId",
  "resultTag",
]);

/** Free-text-ish keys we reject BY NAME even though the type forbids them. */
const FORBIDDEN_KEYS: ReadonlySet<string> = new Set([
  "userAnswer",
  "answerText",
  "rawText",
  "text",
  "freeText",
  "input",
  "transcript",
]);

/** resultTag must stay a short machine tag, never sentence-like free text. */
const RESULT_TAG_RE = /^[a-z0-9_.-]{1,64}$/i;

/**
 * Build one telemetry event. Deterministic: identical input → identical
 * event. Throws on unknown type, missing required fields, forbidden or
 * unknown keys, and free-text-shaped resultTag. Returns a frozen object.
 */
export function createTelemetryEvent(
  input: CreateTelemetryEventInput,
): TelemetryEvent {
  for (const key of Object.keys(input)) {
    if (FORBIDDEN_KEYS.has(key)) {
      throw new Error(`telemetry: forbidden free-text field "${key}"`);
    }
    if (!ALLOWED_INPUT_KEYS.has(key)) {
      throw new Error(`telemetry: unknown field "${key}"`);
    }
  }
  if (typeof input.eventId !== "string" || input.eventId.length === 0) {
    throw new Error("telemetry: eventId is required");
  }
  if (!TYPE_SET.has(input.type)) {
    throw new Error(`telemetry: unknown event type "${input.type}"`);
  }
  if (typeof input.timestamp !== "number" || !Number.isFinite(input.timestamp)) {
    throw new Error("telemetry: numeric timestamp is required");
  }
  if (typeof input.source !== "string" || input.source.length === 0) {
    throw new Error("telemetry: source is required");
  }
  if (input.resultTag !== undefined && !RESULT_TAG_RE.test(input.resultTag)) {
    throw new Error("telemetry: resultTag must be a short machine tag");
  }
  return Object.freeze({
    eventId: input.eventId,
    type: input.type,
    version: TELEMETRY_SCHEMA_VERSION,
    timestamp: input.timestamp,
    source: input.source,
    ...(input.lessonId !== undefined ? { lessonId: input.lessonId } : {}),
    ...(input.screenId !== undefined ? { screenId: input.screenId } : {}),
    ...(input.itemId !== undefined ? { itemId: input.itemId } : {}),
    ...(input.exerciseId !== undefined ? { exerciseId: input.exerciseId } : {}),
    ...(input.resultTag !== undefined ? { resultTag: input.resultTag } : {}),
  });
}

// ── Local store (append/read only — deliberately NO drain/sync surface) ────

export class TelemetryStore {
  private readonly injectedStore?: KvLike;
  private defaultStorePromise?: Promise<KvLike>;
  /**
   * PR-H reset write-barrier: epoch captured at construction. After an explicit
   * local-privacy reset, a stale pre-reset store's `appendEvent` is suppressed so
   * it can't re-create the cleared `lm_le_telemetry` key. (There is currently no
   * production `appendEvent` caller — this is defense-in-depth for when telemetry
   * is wired.) Reads are never suppressed.
   */
  private readonly ackEpoch = privacyResetEpoch();

  constructor(store?: KvLike) {
    this.injectedStore = store;
  }

  private async store(): Promise<KvLike> {
    if (this.injectedStore) return this.injectedStore;
    if (!this.defaultStorePromise) {
      this.defaultStorePromise = import("../../lib/storage").then(
        (m) => m.kvStorage as KvLike,
      );
    }
    return this.defaultStorePromise;
  }

  private async readRaw(): Promise<TelemetryEvent[]> {
    const store = await this.store();
    const raw = await store.getItem(LM_LE_TELEMETRY_KEY);
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as TelemetryEvent[]) : [];
    } catch {
      return [];
    }
  }

  /** Append one event; duplicate eventIds are ignored (idempotent). */
  async appendEvent(event: TelemetryEvent): Promise<void> {
    if (isPersistSuppressed(this.ackEpoch)) return; // PR-H reset write-barrier
    // PR-I1: no NEW learner state while a deletion / recovery is pending.
    if (isLearnerMutationBlocked()) return;
    const store = await this.store();
    const events = await this.readRaw();
    if (events.some((e) => e.eventId === event.eventId)) return;
    events.push(event);
    await store.setItem(LM_LE_TELEMETRY_KEY, JSON.stringify(events));
  }

  /** All events in append order. */
  async readAllEvents(): Promise<TelemetryEvent[]> {
    return this.readRaw();
  }
}

// ── Content-debugging summaries (pure, over an event list) ─────────────────

export type LessonFunnelRow = { started: number; completed: number };

/** lesson_started / lesson_completed counts per lessonId. */
export function lessonCompletionCounts(
  events: TelemetryEvent[],
): Record<string, LessonFunnelRow> {
  const out: Record<string, LessonFunnelRow> = {};
  for (const e of events) {
    if (!e.lessonId) continue;
    if (e.type !== "lesson_started" && e.type !== "lesson_completed") continue;
    const row = (out[e.lessonId] ??= { started: 0, completed: 0 });
    if (e.type === "lesson_started") row.started += 1;
    else row.completed += 1;
  }
  return out;
}

/** screen_seen counts per lessonId → screenId (drop-off reads as the falloff). */
export function perScreenSeenCounts(
  events: TelemetryEvent[],
): Record<string, Record<string, number>> {
  const out: Record<string, Record<string, number>> = {};
  for (const e of events) {
    if (e.type !== "screen_seen" || !e.lessonId || !e.screenId) continue;
    const lesson = (out[e.lessonId] ??= {});
    lesson[e.screenId] = (lesson[e.screenId] ?? 0) + 1;
  }
  return out;
}

export type ItemActivityRow = { seen: number; recognized: number; produced: number };

/** item_seen / item_recognized / item_produced counts per itemId. */
export function itemActivityCounts(
  events: TelemetryEvent[],
): Record<string, ItemActivityRow> {
  const out: Record<string, ItemActivityRow> = {};
  for (const e of events) {
    if (!e.itemId) continue;
    if (
      e.type !== "item_seen" &&
      e.type !== "item_recognized" &&
      e.type !== "item_produced"
    ) {
      continue;
    }
    const row = (out[e.itemId] ??= { seen: 0, recognized: 0, produced: 0 });
    if (e.type === "item_seen") row.seen += 1;
    else if (e.type === "item_recognized") row.recognized += 1;
    else row.produced += 1;
  }
  return out;
}

/** weave_attempted counts per lessonId. */
export function weaveAttemptCounts(
  events: TelemetryEvent[],
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const e of events) {
    if (e.type !== "weave_attempted" || !e.lessonId) continue;
    out[e.lessonId] = (out[e.lessonId] ?? 0) + 1;
  }
  return out;
}
