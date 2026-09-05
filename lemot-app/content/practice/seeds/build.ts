/**
 * Seed constructors — authoring ergonomics only.
 *
 * These build a `PracticeSeed` whose `exercise` is an ordinary v1 screen. They
 * add no behaviour: no grading, no defaults that could hide a missing decision,
 * no inference of operation from screen type. Every pedagogical field
 * (operation, difficulty, owning lesson, required language, targets) is stated
 * at the call site, because those are exactly the fields nobody should be able
 * to get wrong by omission.
 */
import type { ErrorTagCode } from "../../learning-engine/events";
import type { WeaveType } from "../../lessonTypes";
import type { WeakPointTag } from "../../weakPointTags";
import type {
  PracticeBuildTile,
  PracticeDifficulty,
  PracticeOperation,
  PracticeSeed,
  PracticeSurface,
} from "../practiceTypes";

type Common = {
  id: string;
  operation: PracticeOperation;
  difficulty: PracticeDifficulty;
  surface: PracticeSurface;
  lesson: string;
  required: string[];
  targets: string[];
  tags?: WeakPointTag[];
  repairs?: WeakPointTag;
  /** French to speak first. Its presence makes the exercise a listening one. */
  audio?: string;
};

/** A choice with reasoned traps. Recognition work, or a contrast before repair. */
export function fillSeed(
  spec: Common & {
    prompt: string;
    before?: string;
    after?: string;
    correct: { id: string; text: string };
    traps: { id: string; text: string; why: string; tag?: ErrorTagCode }[];
    short: string;
    explanation: string;
  },
): PracticeSeed {
  return {
    id: spec.id,
    operation: spec.operation,
    difficulty: spec.difficulty,
    surface: spec.surface,
    originLessonId: spec.lesson,
    requiredItemIds: spec.required,
    targetItemIds: spec.targets,
    ...(spec.repairs ? { repairsTag: spec.repairs } : {}),
    ...(spec.audio ? { audio: spec.audio } : {}),
    exercise: {
      id: spec.id,
      type: "fill-with-traps",
      targetItemIds: spec.targets,
      ...(spec.tags ? { weakPointTags: spec.tags } : {}),
      payload: {
        prompt: spec.prompt,
        ...(spec.before ? { sentenceBefore: spec.before } : {}),
        ...(spec.after ? { sentenceAfter: spec.after } : {}),
        blankCount: 1,
        options: [
          { id: spec.correct.id, text: spec.correct.text, isCorrect: true },
          ...spec.traps.map((t) => ({
            id: t.id,
            text: t.text,
            isCorrect: false,
            trapReason: t.why,
            ...(t.tag ? { learningErrorTag: t.tag } : {}),
          })),
        ],
        answer: [spec.correct.id],
        reveal: { short: spec.short, explanation: spec.explanation, natural: spec.short },
      },
    },
  };
}

/** Typed production. `weaveType: "open"` suppresses the "Say this:" label. */
export function weaveSeed(
  spec: Common & {
    weaveType: WeaveType;
    prompt: string;
    context?: string;
    answers: string[];
    alternatives?: string[];
    hintCloze?: string;
    pieces?: { text: string; itemId?: string; label?: string }[];
    ifCorrect: string;
    ifWrong?: string;
  },
): PracticeSeed {
  return {
    id: spec.id,
    operation: spec.operation,
    difficulty: spec.difficulty,
    surface: spec.surface,
    originLessonId: spec.lesson,
    requiredItemIds: spec.required,
    targetItemIds: spec.targets,
    ...(spec.repairs ? { repairsTag: spec.repairs } : {}),
    ...(spec.audio ? { audio: spec.audio } : {}),
    exercise: {
      id: spec.id,
      type: "weave",
      targetItemIds: spec.targets,
      ...(spec.tags ? { weakPointTags: spec.tags } : {}),
      payload: {
        weaveType: spec.weaveType,
        prompt: spec.prompt,
        ...(spec.context ? { context: spec.context } : {}),
        ...(spec.pieces ? { suggestedPieces: spec.pieces } : {}),
        expectedAnswers: spec.answers,
        ...(spec.alternatives ? { acceptedAlternatives: spec.alternatives } : {}),
        ...(spec.hintCloze ? { hintCloze: spec.hintCloze } : {}),
        reveal: {
          modelAnswer: spec.answers[0],
          ifCorrect: spec.ifCorrect,
          ...(spec.ifWrong ? { ifUnderstandableButWrong: spec.ifWrong } : {}),
        },
        validationMode: "exact-or-alternative",
      },
    },
  };
}

/**
 * Reconstruct an owned sentence from its pieces.
 *
 * Tiles are ITEMS, not words. "Je ne comprends pas." is one canonical chunk and
 * therefore one tile, so it is never offered as a build — spelling a chunk out
 * of fragments would teach a decomposition the curriculum does not own. Builds
 * exist for CUMULATIVE sentences, where the pieces really are separate things
 * the learner owns and the work is putting a moment back together in order.
 */
export function buildSeed(
  spec: Common & {
    prompt: string;
    context?: string;
    tiles: PracticeBuildTile[];
    target: string;
    ifCorrect: string;
    ifWrong?: string;
  },
): PracticeSeed {
  return {
    id: spec.id,
    operation: spec.operation,
    difficulty: spec.difficulty,
    surface: spec.surface,
    originLessonId: spec.lesson,
    requiredItemIds: spec.required,
    targetItemIds: spec.targets,
    ...(spec.repairs ? { repairsTag: spec.repairs } : {}),
    ...(spec.audio ? { audio: spec.audio } : {}),
    exercise: {
      id: spec.id,
      type: "practice-build",
      targetItemIds: spec.targets,
      ...(spec.tags ? { weakPointTags: spec.tags } : {}),
      payload: {
        prompt: spec.prompt,
        ...(spec.context ? { context: spec.context } : {}),
        tiles: spec.tiles,
        targetText: spec.target,
        reveal: {
          ifCorrect: spec.ifCorrect,
          ...(spec.ifWrong ? { ifWrong: spec.ifWrong } : {}),
        },
      },
    },
  };
}
