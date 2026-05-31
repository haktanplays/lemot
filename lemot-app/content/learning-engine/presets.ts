/**
 * Item presets (v0.1).
 *
 * A preset is a small bundle of default behaviors an item inherits. It keeps
 * raw items lightweight: most items only need an id, text, and a preset name.
 * The resolver is intentionally tiny — this fixture proves the pattern, not a
 * full preset engine.
 */
import type { PresetDefinition, PresetId } from "./types";

export const PRESETS: Record<PresetId, PresetDefinition> = {
  early_active_chunk: {
    id: "early_active_chunk",
    ownership: "active",
    lessonProduction: true,
    contextCards: true,
    monLexiqueVisible: true,
    practicePool: true,
    oldItemBudget: "reduced_weight",
  },
  contextual_noun_phrase: {
    id: "contextual_noun_phrase",
    ownership: "active",
    lessonProduction: true,
    contextCards: true,
    monLexiqueVisible: true,
    practicePool: true,
    oldItemBudget: "reduced_weight",
  },
  culture_social_ritual: {
    id: "culture_social_ritual",
    ownership: "recognitionOnly",
    lessonProduction: false,
    contextCards: true,
    monLexiqueVisible: true,
    practicePool: false,
    oldItemBudget: "minimal_weight",
  },
  sound_pattern: {
    id: "sound_pattern",
    ownership: "recognitionOnly",
    lessonProduction: false,
    contextCards: true,
    monLexiqueVisible: false,
    practicePool: false,
    oldItemBudget: "minimal_weight",
  },
};

export function resolvePreset(id: PresetId): PresetDefinition {
  return PRESETS[id];
}

export function isKnownPreset(id: string): id is PresetId {
  return id in PRESETS;
}
