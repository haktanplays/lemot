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
export { L1_ITEMS, L14_ITEMS, L15_ITEMS } from "./items";
export { L1_CONTRACT } from "./lessons/L1.contract";
export { L1_EXERCISES } from "./lessons/L1.exercises";
export { L14_CONTRACT } from "./lessons/L14.contract";
export { L14_EXERCISES } from "./lessons/L14.exercises";
export { L15_CONTRACT } from "./lessons/L15.contract";
export { L15_EXERCISES } from "./lessons/L15.exercises";
export { validateContent, formatReport } from "./validate";

import { PRESETS } from "./presets";
import { L1_ITEMS, L14_ITEMS, L15_ITEMS } from "./items";
import { L1_CONTRACT } from "./lessons/L1.contract";
import { L1_EXERCISES } from "./lessons/L1.exercises";
import { L14_CONTRACT } from "./lessons/L14.contract";
import { L14_EXERCISES } from "./lessons/L14.exercises";
import { L15_CONTRACT } from "./lessons/L15.contract";
import { L15_EXERCISES } from "./lessons/L15.exercises";
import type { ValidationInput } from "./types";

/** L1 fixture only — kept intact for L1-scoped consumers. */
export const L1_CONTENT_FIXTURE: ValidationInput = {
  items: L1_ITEMS,
  presets: PRESETS,
  contracts: [L1_CONTRACT],
  exercises: L1_EXERCISES,
};

/** L14 fixture only — the y-light / place-pronoun boundary lesson. */
export const L14_CONTENT_FIXTURE: ValidationInput = {
  items: L14_ITEMS,
  presets: PRESETS,
  contracts: [L14_CONTRACT],
  exercises: L14_EXERCISES,
};

/** L15 fixture only — the devoir/falloir-light obligation boundary lesson. */
export const L15_CONTENT_FIXTURE: ValidationInput = {
  items: L15_ITEMS,
  presets: PRESETS,
  contracts: [L15_CONTRACT],
  exercises: L15_EXERCISES,
};

/**
 * Aggregate of every lesson fixture — one shared item registry, all contracts,
 * all exercises. The validator runner checks this so a single pass covers L1,
 * L14, and L15 together.
 */
export const LEARNING_ENGINE_FIXTURE: ValidationInput = {
  items: { ...L1_ITEMS, ...L14_ITEMS, ...L15_ITEMS },
  presets: PRESETS,
  contracts: [L1_CONTRACT, L14_CONTRACT, L15_CONTRACT],
  exercises: [...L1_EXERCISES, ...L14_EXERCISES, ...L15_EXERCISES],
};
