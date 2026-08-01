/**
 * Sentence identity foundation (PR-01) — pure types + validation, no records.
 *
 * D-4 (fixed for this PR): sentences are a NEW identity layer, so they may use
 * the documented colon convention (`sent:lNN-slug`, docs/syllabus/
 * canonical-item-id-convention-v0.1.md §3/§4). This does NOT authorize touching
 * shipped item ids, which stay hyphen-style and immutable (ADR-0012).
 *
 * Accepted orthographic/punctuation alternatives belong to the SENTENCE record,
 * never to separately registered sentence ids and never to an exercise payload:
 * a payload may narrow what it accepts for one action, but the canonical surface
 * and its alternatives have exactly one home.
 *
 * Deliberately NOT in this PR: any production sentence record, the 30 authored
 * L1 seeds, learner-visible French, and the audio manifest. `audioId` is
 * reserved as an optional field so the later audio PR does not reshape the type.
 * Draft-local `L1-SE-###` handles are documentation ids and never become
 * runtime sentence ids.
 */
import type { ItemId } from "../itemRegistry";
import { isCanonicalItemId } from "./canonicalItems";

/**
 * A validated sentence identity. Branded so a bare string cannot be passed
 * where a checked id is required — the compiler enforces the validation step.
 */
export type SentenceId = string & { readonly __brand: "SentenceId" };

/**
 * `sent:` + `lNN` lesson prefix + lowercase ASCII kebab slug.
 * No accents, no apostrophes, no whitespace, no uppercase, no double/edge hyphen.
 */
export const SENTENCE_ID_PATTERN = /^sent:l\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Where a sentence surface came from — provenance is mandatory, never inferred. */
export type SentenceProvenance =
  | "shipped-payload"
  | "lesson-spec"
  | "legacy-adapted"
  | "newly-authored";

/**
 * Human French-QA state. `approved` is the ONLY value that may reach a learner;
 * this PR registers nothing, so nothing is approved by it.
 */
export type SentenceFrenchQaStatus = "pending" | "approved" | "rejected";

/** Lifecycle. A deprecated id is retired forever — never reused (ADR-0012 spirit). */
export type SentenceStatus = "active" | "deprecated";

/**
 * Treatment of one span of the sentence. Named locally on purpose: the engine's
 * `Ownership` vocabulary describes an item's lesson bucket, which is a related
 * but distinct question. Reconciling the two is a later PR, not a silent merge.
 */
export type SpanTreatment =
  | "active"
  | "supported"
  | "recognition"
  | "ghost"
  | "meta";

/** One treated span of the preferred surface, optionally carrying an item identity. */
export type SentenceSpan = {
  /** Exact substring of the preferred surface this span covers. */
  readonly text: string;
  /** Canonical item this span realises, when it carries one. */
  readonly itemId?: ItemId;
  readonly treatment: SpanTreatment;
};

/** One registered sentence. The single home of a canonical surface + its alternatives. */
export type SentenceRecord = {
  readonly id: SentenceId;
  /** The one canonical rendering. Never empty. */
  readonly preferredSurface: string;
  /**
   * Orthographic / punctuation variants accepted as the same sentence. Never
   * separate ids; never a repeat of the preferred surface.
   */
  readonly acceptedAlternatives: readonly string[];
  /** Canonical item ids this sentence contains. */
  readonly itemIds: readonly ItemId[];
  /** Treatment composition, so validators can prove no demand exceeds treatment. */
  readonly spans: readonly SentenceSpan[];
  readonly provenance: SentenceProvenance;
  /** Lesson ids this sentence may be used in (prerequisite safety). */
  readonly lessonEligibility: readonly string[];
  readonly frenchQa: SentenceFrenchQaStatus;
  readonly status: SentenceStatus;
  /** Reserved for the later audio PR. No manifest exists yet. */
  readonly audioId?: string;
};

/** True when `id` is syntactically a valid sentence id. */
export function isSentenceId(id: string): id is SentenceId {
  return SENTENCE_ID_PATTERN.test(id);
}

/** Assert + narrow, with a message that names the expected shape. */
export function assertSentenceId(id: string): SentenceId {
  if (!isSentenceId(id)) {
    throw new Error(
      `"${id}" is not a valid sentence id — expected sent:lNN-lowercase-ascii-kebab ` +
        `(e.g. sent:l01-je-voudrais-un-cafe); no accents, apostrophes, whitespace, or uppercase`,
    );
  }
  return id;
}

/**
 * Validate one record in isolation. Returns findings (empty = valid) instead of
 * throwing, so a registry build can report every problem at once.
 */
export function validateSentenceRecord(record: SentenceRecord): string[] {
  const errors: string[] = [];
  const id = record.id as string;

  if (!isSentenceId(id)) {
    errors.push(
      `sentence id "${id}" is malformed — expected sent:lNN-lowercase-ascii-kebab`,
    );
  }

  if (typeof record.preferredSurface !== "string" || record.preferredSurface.trim() === "") {
    errors.push(`sentence "${id}": preferredSurface must be a non-empty string`);
  }

  const seenAlternatives = new Set<string>();
  for (const alt of record.acceptedAlternatives) {
    if (alt.trim() === "") {
      errors.push(`sentence "${id}": accepted alternative must not be empty`);
      continue;
    }
    if (alt === record.preferredSurface) {
      errors.push(
        `sentence "${id}": preferred surface is repeated as an accepted alternative — ` +
          `alternatives are the OTHER renderings of the same sentence`,
      );
    }
    if (seenAlternatives.has(alt)) {
      errors.push(`sentence "${id}": duplicate accepted alternative "${alt}"`);
    }
    seenAlternatives.add(alt);
  }

  for (const itemId of record.itemIds) {
    if (!isCanonicalItemId(itemId)) {
      errors.push(
        `sentence "${id}": item reference "${itemId}" is not a canonical ITEM_REGISTRY id`,
      );
    }
  }

  for (const span of record.spans) {
    if (span.itemId !== undefined && !isCanonicalItemId(span.itemId)) {
      errors.push(
        `sentence "${id}": span item reference "${span.itemId}" is not a canonical ITEM_REGISTRY id`,
      );
    }
  }

  return errors;
}

export type SentenceRegistry = Readonly<Record<string, SentenceRecord>>;

export type SentenceRegistryBuild = {
  readonly registry: SentenceRegistry;
  readonly errors: readonly string[];
};

/**
 * Build a sentence registry deterministically from records.
 *
 * Beyond per-record validation this enforces registry-level identity rules: no
 * duplicate id, and no reuse of an id already registered as `deprecated` — a
 * retired sentence id is never recycled, for the same reason a retired item id
 * is not (orphaned learner references).
 *
 * Returns findings rather than throwing so callers can print all of them; the
 * registry is empty when any error is found, so a broken build can never be
 * half-adopted.
 */
export function buildSentenceRegistry(
  records: readonly SentenceRecord[],
): SentenceRegistryBuild {
  const errors: string[] = [];
  const registry: Record<string, SentenceRecord> = {};
  const deprecated = new Set<string>();

  for (const record of records) {
    const id = record.id as string;
    errors.push(...validateSentenceRecord(record));

    // Deprecated-reuse is checked FIRST: a retired id that reappears is also a
    // duplicate, but "you reused a retired id" is the actionable message and
    // must not be masked by the generic duplicate error.
    if (deprecated.has(id)) {
      errors.push(
        `sentence id "${id}" was registered as deprecated and must not be reused — ` +
          `retired ids are never recycled`,
      );
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(registry, id)) {
      errors.push(`duplicate sentence id "${id}" — each sentence identity is registered once`);
      continue;
    }

    if (record.status === "deprecated") deprecated.add(id);
    registry[id] = record;
  }

  return {
    registry: errors.length > 0 ? Object.freeze({}) : Object.freeze(registry),
    errors: Object.freeze(errors),
  };
}

/**
 * The production sentence registry is intentionally EMPTY in this PR. Records
 * arrive in the French-QA-gated payload PR; the registration and validation
 * path above is fully exercised by test-local fixtures.
 */
export const SENTENCE_REGISTRY: SentenceRegistry = buildSentenceRegistry([]).registry;
