/**
 * Lesson Flow Canon §11 — mechanizable validator subset (V3, V4, V5).
 *
 * Ownership/exposure layer: the registry ALREADY distinguishes tiers via
 * `LearningItem.status` ("active" | "supported" | "recognition" |
 * "recycled") — "recognition" is the exposure tier ("seen, not yours yet").
 * No schema change: these rules read the existing field.
 *
 * Scope guard: the exposure rules apply only to SURFACE item types
 * (producible French surfaces). Meta/teaching types (sound-pattern,
 * grammar-nugget, micro-contrast, culture-bite) are exempt — they are
 * concepts, not future surfaces, and one of them (grammar-ne-pas-sandwich,
 * recognition status) legitimately supplies the approved `ne ___ pas`
 * frame chip per the PR #168 composition canon.
 *
 * Rules (canon §11):
 *  V3 future_as_answer        ERROR   exposure-tier item in an answer
 *                                     position (required weave piece, or a
 *                                     fill's correct option carrying the
 *                                     item's surface)
 *  V4 future_in_forbidden_zone ERROR  exposure-tier item in owned-only
 *                                     zones (§2.2 ASLA list): chip tray
 *                                     (any suggested piece), meet-card
 *                                     highlights, recap piecesUsed
 *  V5 insight_budget          WARNING more than 3 insight-card screens in
 *                                     one lesson
 *
 * Pure and deterministic: findings are emitted in lesson/screen order.
 */
import type { LearningItem } from "../content/lessonTypes";

export type CanonFinding = {
  code: "future_as_answer" | "future_in_forbidden_zone" | "insight_budget";
  severity: "error" | "warning";
  lessonId: string;
  screenId?: string;
  message: string;
};

/**
 * Structural subset these rules actually read. Real `Lesson`/`LearningItem`
 * values are assignable as-is; tests can build minimal fixtures.
 */
export type CanonItem = Pick<LearningItem, "id" | "type" | "text" | "status">;
export type CanonScreen = { id: string; type: string; payload: Record<string, unknown> };
export type CanonLesson = { id: string; screens: readonly CanonScreen[] };

/** Producible surface types; meta/teaching types are exempt from V3/V4. */
export const SURFACE_TYPES: ReadonlySet<string> = new Set([
  "chunk",
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "idiom",
  "preposition",
  "connector",
  "cognate",
  "faux-ami",
]);

export const INSIGHT_BUDGET_MAX = 3;

function isExposureTier(item: CanonItem | undefined): item is CanonItem {
  return Boolean(item && item.status === "recognition" && SURFACE_TYPES.has(item.type));
}

export function checkCanonRules(
  lessons: readonly CanonLesson[],
  registry: Readonly<Record<string, CanonItem>>,
): CanonFinding[] {
  const findings: CanonFinding[] = [];
  // Exposure-tier surfaces by lowercased text, for the itemId-less zones
  // (fill options, recap piecesUsed).
  const exposureByText = new Map<string, CanonItem>();
  for (const item of Object.values(registry)) {
    if (isExposureTier(item)) exposureByText.set(item.text.trim().toLowerCase(), item);
  }
  const exposureById = (id: unknown): CanonItem | undefined => {
    const item = typeof id === "string" ? registry[id] : undefined;
    return isExposureTier(item) ? item : undefined;
  };

  for (const lesson of lessons) {
    let insightCount = 0;

    for (const screen of lesson.screens) {
      const p = screen.payload ?? {};
      if (screen.type === "insight-card") insightCount += 1;

      for (const piece of (p.suggestedPieces as Array<Record<string, unknown>> | undefined) ?? []) {
        const item = exposureById(piece.itemId);
        if (!item) continue;
        if (piece.required === true) {
          findings.push({
            code: "future_as_answer",
            severity: "error",
            lessonId: lesson.id,
            screenId: screen.id,
            message: `V3 future_as_answer: exposure-tier item "${item.id}" is a REQUIRED piece in ${lesson.id}/${screen.id} — future surfaces are never answer material (canon §2.3)`,
          });
        } else {
          findings.push({
            code: "future_in_forbidden_zone",
            severity: "error",
            lessonId: lesson.id,
            screenId: screen.id,
            message: `V4 future_in_forbidden_zone: exposure-tier item "${item.id}" sits in the chip tray of ${lesson.id}/${screen.id} (canon §2.2 forbidden zone)`,
          });
        }
      }

      for (const option of (p.options as Array<Record<string, unknown>> | undefined) ?? []) {
        if (option.isCorrect !== true || typeof option.text !== "string") continue;
        const item = exposureByText.get(option.text.trim().toLowerCase());
        if (item) {
          findings.push({
            code: "future_as_answer",
            severity: "error",
            lessonId: lesson.id,
            screenId: screen.id,
            message: `V3 future_as_answer: exposure-tier surface "${item.text}" ("${item.id}") is the correct fill option in ${lesson.id}/${screen.id}`,
          });
        }
      }

      if (screen.type === "meet-card") {
        for (const highlight of (p.highlights as Array<Record<string, unknown>> | undefined) ?? []) {
          const item = exposureById(highlight.itemId);
          if (item) {
            findings.push({
              code: "future_in_forbidden_zone",
              severity: "error",
              lessonId: lesson.id,
              screenId: screen.id,
              message: `V4 future_in_forbidden_zone: exposure-tier item "${item.id}" is highlighted on a meet-card in ${lesson.id}/${screen.id} (Meet It is a §2.2 forbidden zone)`,
            });
          }
        }
      }

      for (const chip of (p.piecesUsed as unknown[] | undefined) ?? []) {
        if (typeof chip !== "string") continue;
        const item = exposureByText.get(chip.trim().toLowerCase());
        if (item) {
          findings.push({
            code: "future_in_forbidden_zone",
            severity: "error",
            lessonId: lesson.id,
            screenId: screen.id,
            message: `V4 future_in_forbidden_zone: exposure-tier surface "${item.text}" ("${item.id}") appears in recap piecesUsed of ${lesson.id}/${screen.id} ("Yours now" is a §2.2 forbidden zone)`,
          });
        }
      }
    }

    if (insightCount > INSIGHT_BUDGET_MAX) {
      findings.push({
        code: "insight_budget",
        severity: "warning",
        lessonId: lesson.id,
        message: `V5 insight_budget: ${lesson.id} carries ${insightCount} insight-card screens (budget ${INSIGHT_BUDGET_MAX}) — most insights belong at level 1-2, not on their own screen (canon §1.4)`,
      });
    }
  }

  return findings;
}
