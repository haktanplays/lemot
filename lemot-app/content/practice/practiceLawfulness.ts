/**
 * Static checks over the practice pool — pure, deterministic, no clock.
 *
 * These answer the questions the shipped lesson validators answer for lessons,
 * because a practice seed is a graded exercise and deserves exactly the same
 * suspicion. Two of them are the load-bearing ones:
 *
 *  - PRACTICE-TREATMENT. An item its lesson treats as `recognition` may be
 *    RECOGNISED but never demanded as production. That is the rule
 *    `screenIsSafeForItem` already applies on the lesson side, restated for
 *    seeds so exposure-tier language cannot become a typed answer.
 *
 *  - PRACTICE-LEAK. A `hard` seed is context-only by contract. If its own
 *    context or prompt contains the answer, it is an easy seed wearing a hard
 *    label, and the difficulty ladder silently stops meaning anything.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import { resolveLessonTreatmentForItem } from "../lesson-v1-evidence/treatment";
import type { ItemId } from "../learning-engine/types";
import type { Lesson } from "../lessonTypes";
import type { PracticeSeed } from "./practiceTypes";

export type PracticeLawfulnessFinding = {
  code:
    | "PRACTICE-ID"
    | "PRACTICE-ITEM"
    | "PRACTICE-TARGET-UNDECLARED"
    | "PRACTICE-TREATMENT"
    | "PRACTICE-REQUIRED"
    | "PRACTICE-LESSON"
    | "PRACTICE-SHAPE"
    | "PRACTICE-LEAK";
  seedId: string;
  message: string;
};

/** Normalise for the leakage comparison only. Never used for grading. */
function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’]/g, "'")
    .replace(/[.,!?;:«»"]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function reviewPracticeSeeds(
  seeds: readonly PracticeSeed[],
  lessons: readonly Lesson[],
): PracticeLawfulnessFinding[] {
  const out: PracticeLawfulnessFinding[] = [];
  const byLessonId = new Map(lessons.map((l) => [l.id, l]));
  const seen = new Set<string>();
  const add = (code: PracticeLawfulnessFinding["code"], seedId: string, message: string) =>
    out.push({ code, seedId, message });

  for (const seed of seeds) {
    if (seen.has(seed.id)) add("PRACTICE-ID", seed.id, "duplicate seed id");
    seen.add(seed.id);
    if (seed.exercise.id !== seed.id) {
      add("PRACTICE-ID", seed.id, `exercise id "${seed.exercise.id}" does not match the seed id`);
    }

    const lesson = byLessonId.get(seed.originLessonId);
    if (!lesson) {
      add("PRACTICE-LESSON", seed.id, `origin lesson "${seed.originLessonId}" is not registered`);
      continue;
    }

    for (const id of seed.requiredItemIds) {
      if (!Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, id)) {
        add("PRACTICE-ITEM", seed.id, `required item "${id}" is not in ITEM_REGISTRY`);
      }
    }
    if (seed.targetItemIds.length === 0) {
      add("PRACTICE-SHAPE", seed.id, "declares no targets — the attempt would demonstrate nothing");
    }

    for (const id of seed.targetItemIds) {
      if (!Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, id)) {
        add("PRACTICE-ITEM", seed.id, `target "${id}" is not in ITEM_REGISTRY`);
        continue;
      }
      if (!seed.requiredItemIds.includes(id)) {
        add(
          "PRACTICE-REQUIRED",
          seed.id,
          `target "${id}" is not listed as required — eligibility would not gate it`,
        );
      }
      let treatment: string;
      try {
        treatment = resolveLessonTreatmentForItem(id as ItemId, lesson);
      } catch {
        add(
          "PRACTICE-TARGET-UNDECLARED",
          seed.id,
          `origin lesson "${lesson.id}" declares no treatment for target "${id}"`,
        );
        continue;
      }
      if (treatment === "recognition" && seed.exercise.type !== "fill-with-traps") {
        add(
          "PRACTICE-TREATMENT",
          seed.id,
          `"${id}" is recognition-tier in ${lesson.id} but this seed demands production`,
        );
      }
    }

    // Shape: the graders assume these, so state them rather than trust them.
    if (seed.exercise.type === "fill-with-traps") {
      const p = seed.exercise.payload;
      const correct = p.options.filter((o) => o.isCorrect);
      if (correct.length !== 1) {
        add("PRACTICE-SHAPE", seed.id, `has ${correct.length} correct options, expected exactly 1`);
      }
      for (const option of p.options) {
        if (!option.isCorrect && !option.trapReason?.trim()) {
          add("PRACTICE-SHAPE", seed.id, `trap "${option.id}" has no reason`);
        }
      }
      if (p.answer.length !== 1 || p.answer[0] !== correct[0]?.id) {
        add("PRACTICE-SHAPE", seed.id, "answer does not name the single correct option");
      }
    } else {
      const p = seed.exercise.payload;
      if (p.expectedAnswers.length === 0) {
        add("PRACTICE-SHAPE", seed.id, "weave expects no answer");
      }
      // Leakage: a hard seed must not print its own answer.
      if (seed.difficulty === "hard") {
        const shown = fold(`${p.prompt} ${p.context ?? ""} ${p.hintCloze ?? ""}`);
        for (const answer of p.expectedAnswers) {
          if (shown.includes(fold(answer))) {
            add(
              "PRACTICE-LEAK",
              seed.id,
              `hard seed prints its own answer (${JSON.stringify(answer)}) in the prompt or context`,
            );
          }
        }
      }
    }
  }
  return out;
}
