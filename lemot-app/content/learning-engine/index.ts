/**
 * Executable content contract (v0.1) — public surface.
 *
 * Safe, side-effect-free re-exports of the L1 contract fixtures and the
 * validator. This is the only intended entry point. Importing it does NOT
 * touch the live lesson renderer (content/lessons/v1, content/lessonTypes),
 * so the existing L1 user-facing flow is unaffected.
 *
 * Use it for: validation (scripts/validateContent.ts), debug inspection, or a
 * future contract-driven rendering path.
 */
export * from "./types";
export { PRESETS, resolvePreset, isKnownPreset } from "./presets";
export { L1_ITEMS } from "./items";
export { L1_CONTRACT } from "./lessons/L1.contract";
export { L1_EXERCISES } from "./lessons/L1.exercises";
export { validateContent, formatReport } from "./validate";

import { PRESETS } from "./presets";
import { L1_ITEMS } from "./items";
import { L1_CONTRACT } from "./lessons/L1.contract";
import { L1_EXERCISES } from "./lessons/L1.exercises";
import type { ValidationInput } from "./types";

/** The full L1 fixture, ready to hand to `validateContent`. */
export const L1_CONTENT_FIXTURE: ValidationInput = {
  items: L1_ITEMS,
  presets: PRESETS,
  contracts: [L1_CONTRACT],
  exercises: L1_EXERCISES,
};
