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
export { L1_ITEMS, L14_ITEMS, L15_ITEMS, L18_ITEMS } from "./items";
export { L1_CONTRACT } from "./lessons/L1.contract";
export { L1_EXERCISES } from "./lessons/L1.exercises";
export { L14_CONTRACT } from "./lessons/L14.contract";
export { L14_EXERCISES } from "./lessons/L14.exercises";
export { L15_CONTRACT } from "./lessons/L15.contract";
export { L15_EXERCISES } from "./lessons/L15.exercises";
export { L18_CONTRACT } from "./lessons/L18.contract";
export { L18_EXERCISES } from "./lessons/L18.exercises";
export { validateContent, formatReport } from "./validate";

import { PRESETS } from "./presets";
import { L1_ITEMS, L14_ITEMS, L15_ITEMS, L18_ITEMS } from "./items";
import { L1_CONTRACT } from "./lessons/L1.contract";
import { L1_EXERCISES } from "./lessons/L1.exercises";
import { L14_CONTRACT } from "./lessons/L14.contract";
import { L14_EXERCISES } from "./lessons/L14.exercises";
import { L15_CONTRACT } from "./lessons/L15.contract";
import { L15_EXERCISES } from "./lessons/L15.exercises";
import { L18_CONTRACT } from "./lessons/L18.contract";
import { L18_EXERCISES } from "./lessons/L18.exercises";
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
 * L18 fixture only — the futur-proche doorway boundary lesson.
 *
 * Shared carry-in: «chunk:je-vais» / «chunk:on-va» are defined once in
 * L14_ITEMS, not re-authored in L18_ITEMS. This standalone fixture pulls them by
 * reference so it validates clean on its own (no unknown_item_id), while the
 * aggregate below stays free of duplicate ids. This is the minimal stand-in for
 * a proper shared/carry-in registry layer.
 */
export const L18_CONTENT_FIXTURE: ValidationInput = {
  items: {
    "chunk:je-vais": L14_ITEMS["chunk:je-vais"],
    "chunk:on-va": L14_ITEMS["chunk:on-va"],
    ...L18_ITEMS,
  },
  presets: PRESETS,
  contracts: [L18_CONTRACT],
  exercises: L18_EXERCISES,
};

/**
 * Aggregate of every lesson fixture — one shared item registry, all contracts,
 * all exercises. The validator runner checks this so a single pass covers L1,
 * L14, L15, and L18 together.
 *
 * No duplicate ids: L18_ITEMS deliberately does NOT redefine «chunk:je-vais» /
 * «chunk:on-va» (they come from L14_ITEMS), so this spread has no key collision.
 */
export const LEARNING_ENGINE_FIXTURE: ValidationInput = {
  items: { ...L1_ITEMS, ...L14_ITEMS, ...L15_ITEMS, ...L18_ITEMS },
  presets: PRESETS,
  contracts: [L1_CONTRACT, L14_CONTRACT, L15_CONTRACT, L18_CONTRACT],
  exercises: [
    ...L1_EXERCISES,
    ...L14_EXERCISES,
    ...L15_EXERCISES,
    ...L18_EXERCISES,
  ],
};
