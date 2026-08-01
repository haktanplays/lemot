/**
 * Fixture → canonical item compatibility boundary (PR-01) — pure, no I/O.
 *
 * `content/learning-engine/items.ts` carries 59 colon-namespaced FIXTURE ids
 * (`chunk:bonjour`) that share no string with the 54 canonical shipped ids
 * (`chunk-bonjour`). Those fixtures are validation input for the engine's
 * contract experiment; they are NOT a second canonical registry and their ids
 * must never become learner-history keys.
 *
 * This module is a MIGRATION/FIXTURE BOUNDARY, not an alternate identity
 * system. It is read-only, exhaustively explicit, and covers only the exact L1
 * pilot overlaps. Every rule below exists because the cheap alternative is
 * dangerous:
 *
 *  - NEVER derive a mapping by swapping ":" for "-". `chunk:s-il-vous-plait`
 *    maps to `chunk-sil-vous-plait` — the slugs genuinely differ, so any
 *    separator rewrite would silently miss it and, worse, would "succeed" on
 *    other ids by coincidence.
 *  - NEVER map by surface text. `noun_phrase:un-cafe` reads "un café" and so
 *    does canonical `chunk-un-cafe`, yet canonical ALSO ships `noun-cafe` and
 *    the shipped L0/L1 payloads reference `noun-cafe` for that same package.
 *    Acquisition ownership is genuinely split, so the pair is left UNMAPPED
 *    (see {@link AMBIGUOUS_FIXTURE_ITEM_IDS}) rather than guessed.
 *  - NEVER chain. A mapping target must itself be canonical, never another key.
 *
 * Persisted identity after resolution is ALWAYS the canonical shipped id
 * (ADR-0012 / YASA 2). An unmapped fixture id fails persistence validation
 * loudly instead of leaking into mastery, Mon Lexique, or selector state.
 */
import type { ItemId } from "../itemRegistry";
import {
  CANONICAL_ITEM_ID_SET,
  UnknownCanonicalItemError,
  isCanonicalItemId,
} from "./canonicalItems";

/**
 * Explicit, exact semantic equivalences for the L1 pilot overlap only.
 *
 * A pair earns a row here only after comparing learner-facing French, identity
 * granularity, pedagogical role, acquisition ownership, type, and meaning —
 * never slug resemblance. Deliberately NOT exhaustive over the fixture set:
 * L2+/L7+ fixture identities are out of scope for this PR (no broad curriculum
 * migration), and unmapped ids simply fail the persistence guard.
 */
export const FIXTURE_ITEM_ALIASES: Readonly<Record<string, ItemId>> =
  Object.freeze({
    // fr "Bonjour" ≡ "Bonjour"; both a whole opener chunk, active at L1.
    "chunk:bonjour": "chunk-bonjour",
    // fr "je voudrais" ≡ "je voudrais"; both the polite-request spine chunk.
    "chunk:je-voudrais": "chunk-je-voudrais",
    // fr "s'il vous plaît" ≡ "s'il vous plaît"; both the whole politeness
    // landing. NOTE the differing slugs (`s-il` vs `sil`) — proof that this map
    // must stay explicit and can never be generated.
    "chunk:s-il-vous-plait": "chunk-sil-vous-plait",
    // fr "merci" ≡ "merci"; both the whole thanks chunk.
    "chunk:merci": "chunk-merci",
    // fr "au revoir" ≡ "au revoir"; both the whole close chunk.
    "chunk:au-revoir": "chunk-au-revoir",
  });

/**
 * Fixture ids whose canonical counterpart is genuinely AMBIGUOUS. Recorded, not
 * mapped — resolving them is a curriculum decision, not a code decision.
 *
 * `noun_phrase:un-cafe` ("un café", one package) faces two shipped canonical
 * identities: `noun-cafe` (type noun, text "café" — the id the shipped L0/L1
 * payloads actually attach to the "un café" tile) and `chunk-un-cafe` (type
 * chunk, text "un café" — the package). That split is the known dual-identity
 * debt; picking either here would silently decide acquisition ownership.
 */
export const AMBIGUOUS_FIXTURE_ITEM_IDS: readonly string[] = Object.freeze([
  "noun_phrase:un-cafe",
]);

/**
 * L1 fixture ids with NO canonical counterpart at all. They stay unmapped and
 * unpersistable; registering them is a later, French-QA-gated content PR.
 *
 *  - `chunk:je-veux` — no `je veux` identity is shipped canonically.
 *  - `culture_piece:bonjour-first` — no canonical culture identity class exists.
 *  - `sound_pattern:nasal-on` — canonical ships `sound-elision` / `sound-liaison`
 *    only; nasal-on is a different sound fact, not a rename of either.
 */
export const FIXTURE_ONLY_ITEM_IDS: readonly string[] = Object.freeze([
  "chunk:je-veux",
  "culture_piece:bonjour-first",
  "sound_pattern:nasal-on",
]);

/**
 * Fixture ids whose surface looks close to a canonical id but whose GRANULARITY
 * differs, so they are not equivalents: `chunk:vous-pouvez-repeter`
 * ("vous pouvez répéter", a whole request, fixture-introduced at L11) vs
 * canonical `chunk-vous-pouvez` ("vous pouvez", the pouvoir piece alone).
 */
export const CONFLICTING_GRANULARITY_FIXTURE_ITEM_IDS: readonly string[] =
  Object.freeze(["chunk:vous-pouvez-repeter"]);

/** Thrown when a non-canonical, unresolvable id reaches a persistence boundary. */
export class NonCanonicalPersistenceError extends Error {
  readonly id: string;
  constructor(id: string, context?: string) {
    super(
      `refusing to persist non-canonical item id "${id}"` +
        (context ? ` (${context})` : "") +
        ". Learner history is keyed by shipped canonical ids (ADR-0012). Add an " +
        "explicit fixture alias only for an exact semantic equivalent, or register " +
        "the identity canonically — never fall back to the raw string.",
    );
    this.name = "NonCanonicalPersistenceError";
    this.id = id;
  }
}

/**
 * Integrity of the alias table itself, computed once at module load so a bad
 * edit fails at import time (the same "loud at construction" idiom as
 * `mergeItemMapsStrict`). Checks: unique keys (guaranteed by the object
 * literal, re-asserted for intent), every target canonical, no chains, no
 * cycles, no key that is itself canonical, and no ambiguous id mapped.
 */
function assertAliasTableIntegrity(): void {
  const keys = Object.keys(FIXTURE_ITEM_ALIASES);
  const keySet = new Set(keys);

  for (const key of keys) {
    const target = FIXTURE_ITEM_ALIASES[key];
    if (!CANONICAL_ITEM_ID_SET.has(target)) {
      throw new Error(
        `fixture alias "${key}" targets "${target}", which is not in ITEM_REGISTRY`,
      );
    }
    if (keySet.has(target)) {
      throw new Error(
        `fixture alias "${key}" targets "${target}", which is itself an alias key — chains are forbidden`,
      );
    }
    if (target === key) {
      throw new Error(`fixture alias "${key}" is a self-cycle`);
    }
    if (isCanonicalItemId(key)) {
      throw new Error(
        `fixture alias key "${key}" is already a canonical id — canonical ids must not be aliased`,
      );
    }
  }

  for (const ambiguous of AMBIGUOUS_FIXTURE_ITEM_IDS) {
    if (keySet.has(ambiguous)) {
      throw new Error(
        `"${ambiguous}" is recorded as ambiguous granularity and must not be mapped`,
      );
    }
  }
}

assertAliasTableIntegrity();

/** True when `id` has an explicit exact-equivalent canonical alias. */
export function hasFixtureAlias(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(FIXTURE_ITEM_ALIASES, id);
}

/**
 * Resolve a fixture id to its canonical equivalent, or `null` when no explicit
 * alias exists. Never guesses: no separator conversion, no surface-text lookup,
 * no fuzzy matching.
 */
export function resolveFixtureItemId(id: string): ItemId | null {
  return hasFixtureAlias(id) ? FIXTURE_ITEM_ALIASES[id] : null;
}

/**
 * Resolve any id — canonical or aliased fixture — to a canonical `ItemId`.
 * Throws {@link UnknownCanonicalItemError} when neither applies.
 */
export function toCanonicalItemId(id: string, context?: string): ItemId {
  if (isCanonicalItemId(id)) return id;
  const resolved = resolveFixtureItemId(id);
  if (resolved !== null) return resolved;
  throw new UnknownCanonicalItemError(id, context);
}

/**
 * PART D — the canonical persistence guard.
 *
 * The single check every future persistence path (events, mastery keys, Mon
 * Lexique state, selector state) should call before writing an item id. Not
 * wired into event emission in this PR: `LearningEvent` is untouched here and
 * changes in PR-02.
 *
 *  - canonical id → returned unchanged;
 *  - explicitly aliased fixture id → resolved to its canonical id;
 *  - anything else (fixture-only, ambiguous, conflicting granularity, arbitrary
 *    string) → throws. No silent fallback.
 */
export function assertPersistableItemId(id: string, context?: string): ItemId {
  if (isCanonicalItemId(id)) return id;
  const resolved = resolveFixtureItemId(id);
  if (resolved !== null) return resolved;
  throw new NonCanonicalPersistenceError(id, context);
}

/** Convenience: resolve a list, failing on the first unpersistable id. */
export function assertPersistableItemIds(
  ids: readonly string[],
  context?: string,
): ItemId[] {
  return ids.map((id) => assertPersistableItemId(id, context));
}
