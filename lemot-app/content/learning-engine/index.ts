/**
 * Executable content contract (v0.1) — public surface.
 *
 * Safe, side-effect-free re-exports of the L1 and L14 contract fixtures and the
 * validator. This is the only intended entry point. Importing it does NOT touch
 * the live lesson renderer (content/lessons/v1, content/lessonTypes), so the
 * existing lesson user-facing flow is unaffected.
 *
 * Use it for: validation (scripts/validateContent.ts), debug inspection, or a
 * future contract-driven rendering path.
 */
export * from "./types";
export { PRESETS, resolvePreset, isKnownPreset } from "./presets";
export {
  SHARED_ITEMS,
  L1_ITEMS,
  L2_ITEMS,
  L11_ITEMS,
  L12_ITEMS,
  L14_ITEMS,
  L15_ITEMS,
  L18_ITEMS,
} from "./items";
export { L1_CONTRACT } from "./lessons/L1.contract";
export { L1_EXERCISES } from "./lessons/L1.exercises";
export { L2_CONTRACT } from "./lessons/L2.contract";
export { L2_EXERCISES } from "./lessons/L2.exercises";
export { L11_CONTRACT } from "./lessons/L11.contract";
export { L11_EXERCISES } from "./lessons/L11.exercises";
export { L12_CONTRACT } from "./lessons/L12.contract";
export { L12_EXERCISES } from "./lessons/L12.exercises";
export { L14_CONTRACT } from "./lessons/L14.contract";
export { L14_EXERCISES } from "./lessons/L14.exercises";
export { L15_CONTRACT } from "./lessons/L15.contract";
export { L15_EXERCISES } from "./lessons/L15.exercises";
export { L16_CONTRACT } from "./lessons/L16.contract";
export { L16_EXERCISES } from "./lessons/L16.exercises";
export { L18_CONTRACT } from "./lessons/L18.contract";
export { L18_EXERCISES } from "./lessons/L18.exercises";
export { validateContent, formatReport } from "./validate";
export { mergeItemMapsStrict } from "./registry";
export type { NamedItemMap } from "./registry";
export { normalizeAnswer, checkAnswer } from "./answer-check";

import { PRESETS } from "./presets";
import {
  SHARED_ITEMS,
  L1_ITEMS,
  L2_ITEMS,
  L11_ITEMS,
  L12_ITEMS,
  L14_ITEMS,
  L15_ITEMS,
  L18_ITEMS,
} from "./items";
import { L1_CONTRACT } from "./lessons/L1.contract";
import { L1_EXERCISES } from "./lessons/L1.exercises";
import { L2_CONTRACT } from "./lessons/L2.contract";
import { L2_EXERCISES } from "./lessons/L2.exercises";
import { L11_CONTRACT } from "./lessons/L11.contract";
import { L11_EXERCISES } from "./lessons/L11.exercises";
import { L12_CONTRACT } from "./lessons/L12.contract";
import { L12_EXERCISES } from "./lessons/L12.exercises";
import { L14_CONTRACT } from "./lessons/L14.contract";
import { L14_EXERCISES } from "./lessons/L14.exercises";
import { L15_CONTRACT } from "./lessons/L15.contract";
import { L15_EXERCISES } from "./lessons/L15.exercises";
import { L16_CONTRACT } from "./lessons/L16.contract";
import { L16_EXERCISES } from "./lessons/L16.exercises";
import { L18_CONTRACT } from "./lessons/L18.contract";
import { L18_EXERCISES } from "./lessons/L18.exercises";
import { mergeItemMapsStrict } from "./registry";
import type { ValidationInput } from "./types";

/** L1 fixture only — kept intact for L1-scoped consumers. */
export const L1_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([{ name: "L1_ITEMS", items: L1_ITEMS }]),
  presets: PRESETS,
  contracts: [L1_CONTRACT],
  exercises: L1_EXERCISES,
};

/**
 * L2 fixture only — the «je suis + ici» location doorway (first-run-equivalent
 * core of v1 Lesson 1). Defines its own three active chunks; no SHARED carry-in.
 */
export const L2_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([{ name: "L2_ITEMS", items: L2_ITEMS }]),
  presets: PRESETS,
  contracts: [L2_CONTRACT],
  exercises: L2_EXERCISES,
};

/**
 * L11 fixture only — Pouvoir-light (ability / permission / help). Its two base
 * clauses («je-peux-faire-ca» / «vous-pouvez-m-aider») live in SHARED_ITEMS
 * (first taught here, reused by L12), merged in strictly so the standalone
 * fixture validates clean with each id defined exactly once.
 */
export const L11_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([
    { name: "SHARED_ITEMS", items: SHARED_ITEMS },
    { name: "L11_ITEMS", items: L11_ITEMS },
  ]),
  presets: PRESETS,
  contracts: [L11_CONTRACT],
  exercises: L11_EXERCISES,
};

/**
 * L12 fixture only — the «est-ce que» yes/no question wrapper. Its two base
 * clauses («je-peux-faire-ca» / «vous-pouvez-m-aider») are L11 carry-in and now
 * live in SHARED_ITEMS (no longer redefined in L12_ITEMS), merged in strictly so
 * the standalone fixture still resolves them with each id defined exactly once.
 */
export const L12_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([
    { name: "SHARED_ITEMS", items: SHARED_ITEMS },
    { name: "L12_ITEMS", items: L12_ITEMS },
  ]),
  presets: PRESETS,
  contracts: [L12_CONTRACT],
  exercises: L12_EXERCISES,
};

/**
 * L14 fixture only — the y-light / place-pronoun boundary lesson. Its aller
 * carry-in («je-vais» / «on-va») comes from SHARED_ITEMS, merged in strictly.
 */
export const L14_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([
    { name: "SHARED_ITEMS", items: SHARED_ITEMS },
    { name: "L14_ITEMS", items: L14_ITEMS },
  ]),
  presets: PRESETS,
  contracts: [L14_CONTRACT],
  exercises: L14_EXERCISES,
};

/** L15 fixture only — the devoir/falloir-light obligation boundary lesson. */
export const L15_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([{ name: "L15_ITEMS", items: L15_ITEMS }]),
  presets: PRESETS,
  contracts: [L15_CONTRACT],
  exercises: L15_EXERCISES,
};

/**
 * L16 fixture only — Integration + A Small Moment (Pause & Ask). Pure
 * recombination: L16 defines NO items of its own, so this standalone fixture
 * merges the source maps that DEFINE the chunks it reuses — SHARED_ITEMS
 * (je-peux-faire-ca / vous-pouvez-m-aider), L11_ITEMS (je-peux-faire-une-pause-q),
 * L12_ITEMS (est-ce-que-je-peux-faire-ca / est-ce-que-vous-pouvez-m-aider), and
 * L15_ITEMS (il-faut-faire-une-pause). Each id is still defined exactly once
 * across those maps, so the duplicate-id guard holds; their unreferenced hooks
 * come along harmlessly (the validator only checks referenced items). L14/L18 are
 * deliberately NOT merged — L16 reopens no y-light / futur scope.
 */
export const L16_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([
    { name: "SHARED_ITEMS", items: SHARED_ITEMS },
    { name: "L11_ITEMS", items: L11_ITEMS },
    { name: "L12_ITEMS", items: L12_ITEMS },
    { name: "L15_ITEMS", items: L15_ITEMS },
  ]),
  presets: PRESETS,
  contracts: [L16_CONTRACT],
  exercises: L16_EXERCISES,
};

/**
 * L18 fixture only — the futur-proche doorway boundary lesson. Its aller
 * carry-in («je-vais» / «on-va») now comes from SHARED_ITEMS (no longer reached
 * out of L14_ITEMS), merged in strictly so the standalone fixture validates
 * clean (no unknown_item_id) with the carry-in defined exactly once.
 */
export const L18_CONTENT_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([
    { name: "SHARED_ITEMS", items: SHARED_ITEMS },
    { name: "L18_ITEMS", items: L18_ITEMS },
  ]),
  presets: PRESETS,
  contracts: [L18_CONTRACT],
  exercises: L18_EXERCISES,
};

/**
 * Aggregate of every lesson fixture — one shared item registry, all contracts,
 * all exercises. The validator runner checks this so a single pass covers L1,
 * L11, L12, L14, L15, L16, and L18 together. L16 adds no item map — it is a pure
 * integration fixture over items already defined by the other maps.
 *
 * `mergeItemMapsStrict` HARD-FAILS at import if any item id is defined in more
 * than one map (e.g. a lesson accidentally redefining a SHARED_ITEMS carry-in),
 * so a duplicate id fails `npm run validate:content` instead of silently winning.
 */
export const LEARNING_ENGINE_FIXTURE: ValidationInput = {
  items: mergeItemMapsStrict([
    { name: "SHARED_ITEMS", items: SHARED_ITEMS },
    { name: "L1_ITEMS", items: L1_ITEMS },
    { name: "L2_ITEMS", items: L2_ITEMS },
    { name: "L11_ITEMS", items: L11_ITEMS },
    { name: "L12_ITEMS", items: L12_ITEMS },
    { name: "L14_ITEMS", items: L14_ITEMS },
    { name: "L15_ITEMS", items: L15_ITEMS },
    { name: "L18_ITEMS", items: L18_ITEMS },
  ]),
  presets: PRESETS,
  contracts: [
    L1_CONTRACT,
    L2_CONTRACT,
    L11_CONTRACT,
    L12_CONTRACT,
    L14_CONTRACT,
    L15_CONTRACT,
    L16_CONTRACT,
    L18_CONTRACT,
  ],
  exercises: [
    ...L1_EXERCISES,
    ...L2_EXERCISES,
    ...L11_EXERCISES,
    ...L12_EXERCISES,
    ...L14_EXERCISES,
    ...L15_EXERCISES,
    ...L16_EXERCISES,
    ...L18_EXERCISES,
  ],
};
