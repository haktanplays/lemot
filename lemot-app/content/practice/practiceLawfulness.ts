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
import { expectedTileSequence } from "../../components/learning-engine/buildSequence";

export type PracticeLawfulnessFinding = {
  code:
    | "PRACTICE-BUILD"
    | "PRACTICE-SURFACE"
    | "PRACTICE-AUDIO"
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
    } else if (seed.exercise.type === "practice-build") {
      reviewBuildTiles(seed, add);
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


/** Everything the learner can read before committing an answer. */
function shownBeforeAnswering(seed: PracticeSeed): string {
  const p = seed.exercise.payload as Record<string, unknown>;
  const parts: string[] = [];
  for (const key of ["prompt", "context", "hintCloze", "sentenceBefore", "sentenceAfter"]) {
    if (typeof p[key] === "string") parts.push(p[key] as string);
  }
  for (const option of (p.options as { text?: string }[] | undefined) ?? []) {
    if (option.text) parts.push(option.text);
  }
  for (const piece of (p.suggestedPieces as { text?: string }[] | undefined) ?? []) {
    if (piece.text) parts.push(piece.text);
  }
  for (const tile of (p.tiles as { text?: string }[] | undefined) ?? []) {
    if (tile.text) parts.push(tile.text);
  }
  return fold(parts.join(" "));
}

type Add = (
  code: PracticeLawfulnessFinding["code"],
  seedId: string,
  message: string,
) => void;

/**
 * Reconstruction checks.
 *
 * The one that matters most is the LAST: the answer tiles, in answer order,
 * must actually spell the sentence the reveal shows. Without it a build could
 * be gradeable and still teach the wrong line — the learner would assemble one
 * thing and be told they had written another.
 */
function reviewBuildTiles(seed: PracticeSeed, add: Add): void {
  if (seed.exercise.type !== "practice-build") return;
  const { tiles, targetText } = seed.exercise.payload;

  const answer = tiles.filter((t) => t.answerIndex !== undefined);
  if (answer.length < 2) {
    add(
      "PRACTICE-BUILD",
      seed.id,
      `has ${answer.length} answer tile(s) — a reconstruction needs pieces to order`,
    );
  }
  const indices = answer.map((t) => t.answerIndex as number).sort((a, b) => a - b);
  for (let i = 0; i < indices.length; i += 1) {
    if (indices[i] !== i) {
      add("PRACTICE-BUILD", seed.id, `answer indices are not 0..n-1: ${indices.join(",")}`);
      break;
    }
  }
  for (const tile of tiles) {
    if (tile.text.trim().length === 0) {
      add("PRACTICE-BUILD", seed.id, `tile for "${tile.itemId}" has no surface`);
    }
    if (!Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, tile.itemId)) {
      add("PRACTICE-BUILD", seed.id, `tile names unregistered item "${tile.itemId}"`);
    }
  }
  // Distractors must be distinguishable: a duplicate surface would make two
  // different taps produce the same visible line, one of them graded wrong.
  const surfaces = tiles.map((t) => t.text.trim().toLowerCase());
  if (new Set(surfaces).size !== surfaces.length) {
    add("PRACTICE-BUILD", seed.id, "two tiles show the same text — the answer is ambiguous");
  }
  if (expectedTileSequence(tiles.map((t) => ({
    itemId: t.itemId as never,
    ...(t.answerIndex !== undefined ? { answerIndex: t.answerIndex } : {}),
  }))).length !== answer.length) {
    add("PRACTICE-BUILD", seed.id, "the shipped grader disagrees about the answer sequence");
  }

  // The assembled line must BE the line the reveal shows.
  const assembled = fold(
    answer
      .slice()
      .sort((a, b) => (a.answerIndex as number) - (b.answerIndex as number))
      .map((t) => t.text)
      .join(" "),
  );
  if (assembled !== fold(targetText)) {
    add(
      "PRACTICE-BUILD",
      seed.id,
      `tiles assemble "${assembled}", but the reveal shows "${fold(targetText)}"`,
    );
  }
}

/**
 * Surface honesty.
 *
 * The planner varies sessions by `surface`, so a mislabelled seed would buy
 * apparent variety with none of the real thing. Each label is therefore checked
 * against the shape that makes it true, and the listening labels are checked
 * hardest: a listening exercise that prints its own French is a reading
 * exercise with a speaker icon.
 */
export function reviewPracticeSurfaces(
  seeds: readonly PracticeSeed[],
): PracticeLawfulnessFinding[] {
  const out: PracticeLawfulnessFinding[] = [];
  const add: Add = (code, seedId, message) => out.push({ code, seedId, message });

  for (const seed of seeds) {
    const kind = seed.exercise.type;
    const audio = seed.audio;

    switch (seed.surface) {
      case "build":
        if (kind !== "practice-build") add("PRACTICE-SURFACE", seed.id, "build without tiles");
        break;
      case "choice":
      case "fill":
        if (kind !== "fill-with-traps") {
          add("PRACTICE-SURFACE", seed.id, `${seed.surface} is not a choice exercise`);
        } else {
          const framed =
            seed.exercise.payload.sentenceBefore !== undefined ||
            seed.exercise.payload.sentenceAfter !== undefined;
          if (seed.surface === "fill" && !framed) {
            add("PRACTICE-SURFACE", seed.id, "fill prints no sentence to complete");
          }
          if (seed.surface === "choice" && framed) {
            add("PRACTICE-SURFACE", seed.id, "choice prints a sentence frame — that is a fill");
          }
        }
        break;
      case "typed":
      case "context":
        if (kind !== "weave") add("PRACTICE-SURFACE", seed.id, `${seed.surface} is not typed`);
        else if (seed.surface === "context" && seed.exercise.payload.weaveType !== "open") {
          add("PRACTICE-SURFACE", seed.id, "context production must be open-tier");
        }
        break;
      case "listen":
        if (kind !== "fill-with-traps") add("PRACTICE-SURFACE", seed.id, "listen is not a choice");
        break;
      case "dictation":
        if (kind !== "weave") add("PRACTICE-SURFACE", seed.id, "dictation is not typed");
        break;
    }

    const listening = seed.surface === "listen" || seed.surface === "dictation";
    if (listening && (audio === undefined || audio.trim().length === 0)) {
      add("PRACTICE-AUDIO", seed.id, "a listening surface with nothing to hear");
    }
    if (!listening && audio !== undefined) {
      add("PRACTICE-AUDIO", seed.id, "audio on a surface that is not a listening one");
    }
    if (audio === undefined) continue;

    // Only what is on screen BEFORE the learner answers can leak. A reveal
    // naming the sentence afterwards is the point of a reveal.
    const shown = shownBeforeAnswering(seed);
    const spoken = fold(audio);
    if (seed.surface === "dictation") {
      const expected = seed.exercise.type === "weave" ? seed.exercise.payload.expectedAnswers : [];
      if (!expected.some((a) => fold(a) === spoken)) {
        add("PRACTICE-AUDIO", seed.id, "dictation expects something other than what is spoken");
      }
    }
    if (shown.includes(spoken)) {
      add("PRACTICE-AUDIO", seed.id, "the exercise prints the French it is about to speak");
    }
  }
  return out;
}
