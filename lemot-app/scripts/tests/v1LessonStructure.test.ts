/**
 * v1 lesson structural validator (Round 1 slice spec, PR B).
 *
 * `validate:content` covers only the learning-engine fixture; v1 lessons have
 * no structural guard. Screen-level `targetItemIds` and payload `itemId`
 * references are plain strings (NOT compile-checked, unlike `learningItems`),
 * so a typo ships silently. This test walks every registered lesson in
 * `V1_LESSONS` so each future content PR (L1-L6) is born guarded.
 *
 * Pure tsx: the v1 content import graph is data + types only (no React
 * Native / Expo / device layer is loaded).
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

const REGISTRY_IDS = new Set(Object.keys(ITEM_REGISTRY));

// Must match the renderer's pickScreen cases (LessonRendererV1.tsx).
const SUPPORTED_SCREEN_TYPES = new Set([
  "meet-card",
  "insight-card",
  "fill-with-traps",
  "weave",
  "say-it-your-way",
  "natural-reveal",
  "recap",
]);

// "ne ne", "pas pas" and similar doubled negation tokens in French strings.
const REPEATED_NEGATION = /\b(ne\s+ne|pas\s+pas|n'\s*n')\b/i;

function assertItemId(id: string, where: string): void {
  assert(
    REGISTRY_IDS.has(id),
    `${where}: itemId "${id}" is not in ITEM_REGISTRY`,
  );
}

/** Collect the French-facing strings worth scanning for doubled negation. */
function frenchStrings(screen: LessonScreen): string[] {
  const out: string[] = [];
  const p = screen.payload as Record<string, unknown>;
  for (const key of ["fr", "natural", "modelAnswer"]) {
    if (typeof p[key] === "string") out.push(p[key] as string);
  }
  const reveal = p.reveal as Record<string, unknown> | undefined;
  if (reveal) {
    for (const key of ["modelAnswer", "natural", "short"]) {
      if (typeof reveal[key] === "string") out.push(reveal[key] as string);
    }
    if (Array.isArray(reveal.naturalAlternatives)) {
      for (const s of reveal.naturalAlternatives) {
        if (typeof s === "string") out.push(s);
      }
    }
  }
  for (const key of ["expectedAnswers", "acceptedAlternatives"]) {
    if (Array.isArray(p[key])) {
      for (const s of p[key] as unknown[]) {
        if (typeof s === "string") out.push(s);
      }
    }
  }
  return out;
}

function endsWithQuestionMark(s: string): boolean {
  return s.trim().endsWith("?");
}

describe("v1 lesson structure", () => {
  test("lesson ids and numbers are present, unique, and sequential", () => {
    assert(V1_LESSONS.length > 0, "V1_LESSONS is empty");
    const ids = new Set<string>();
    const numbers = new Set<number>();
    for (const lesson of V1_LESSONS) {
      assert(!!lesson.id, "a lesson is missing its id");
      assert(!ids.has(lesson.id), `duplicate lesson id: ${lesson.id}`);
      ids.add(lesson.id);
      assert(
        Number.isInteger(lesson.number),
        `${lesson.id}: lesson number must be an integer`,
      );
      assert(
        !numbers.has(lesson.number),
        `duplicate lesson number: ${lesson.number}`,
      );
      numbers.add(lesson.number);
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++) {
      assert(
        sorted[i] === sorted[i - 1] + 1,
        `lesson numbers are not sequential: gap between ${sorted[i - 1]} and ${sorted[i]}`,
      );
    }
  });

  test("lesson prerequisites resolve to registered lessons", () => {
    const ids = new Set(V1_LESSONS.map((l) => l.id));
    for (const lesson of V1_LESSONS) {
      for (const pre of lesson.prerequisites) {
        assert(
          ids.has(pre),
          `${lesson.id}: prerequisite "${pre}" is not a registered lesson`,
        );
      }
    }
  });

  for (const lesson of V1_LESSONS) {
    registerLessonTests(lesson);
  }
});

function registerLessonTests(lesson: Lesson): void {
  const L = lesson.id;

  test(`${L}: screen ids are present and unique`, () => {
    assert(lesson.screens.length > 0, `${L}: lesson has no screens`);
    const seen = new Set<string>();
    for (const screen of lesson.screens) {
      assert(!!screen.id, `${L}: a screen is missing its id`);
      assert(!seen.has(screen.id), `${L}: duplicate screen id ${screen.id}`);
      seen.add(screen.id);
    }
  });

  test(`${L}: screen types are supported by the v1 renderer`, () => {
    for (const screen of lesson.screens) {
      assert(
        SUPPORTED_SCREEN_TYPES.has(screen.type),
        `${L}/${screen.id}: unsupported screen type "${screen.type}"`,
      );
    }
  });

  test(`${L}: every referenced itemId exists in ITEM_REGISTRY`, () => {
    for (const screen of lesson.screens) {
      const where = `${L}/${screen.id}`;
      for (const id of screen.targetItemIds ?? []) {
        assertItemId(id, `${where} targetItemIds`);
      }
      const p = screen.payload as Record<string, unknown>;
      if (Array.isArray(p.highlights)) {
        for (const h of p.highlights as { itemId?: string }[]) {
          if (h.itemId) assertItemId(h.itemId, `${where} highlights`);
        }
      }
      if (Array.isArray(p.suggestedPieces)) {
        for (const piece of p.suggestedPieces as { itemId?: string }[]) {
          if (piece.itemId) {
            assertItemId(piece.itemId, `${where} suggestedPieces`);
          }
        }
      }
    }
  });

  test(`${L}: fill-with-traps screens are answerable`, () => {
    for (const screen of lesson.screens) {
      if (screen.type !== "fill-with-traps") continue;
      const where = `${L}/${screen.id}`;
      const p = screen.payload;
      assert(p.options.length > 0, `${where}: fill has no options`);
      const optionIds = new Set<string>();
      let correctCount = 0;
      for (const opt of p.options) {
        assert(!!opt.id, `${where}: an option is missing its id`);
        assert(
          !!opt.text && opt.text.trim().length > 0,
          `${where}: option "${opt.id}" has empty text`,
        );
        assert(!optionIds.has(opt.id), `${where}: duplicate option id ${opt.id}`);
        optionIds.add(opt.id);
        if (opt.isCorrect) correctCount += 1;
      }
      assert(correctCount > 0, `${where}: fill has no correct option`);
      assert(p.answer.length > 0, `${where}: fill has an empty answer array`);
      for (const answerId of p.answer) {
        assert(
          optionIds.has(answerId),
          `${where}: answer id "${answerId}" is not among the options`,
        );
        const opt = p.options.find((o) => o.id === answerId);
        assert(
          opt?.isCorrect === true,
          `${where}: answer id "${answerId}" points at an option not marked isCorrect`,
        );
      }
      assert(
        !!p.reveal && !!p.reveal.short && p.reveal.short.trim().length > 0,
        `${where}: fill is missing a reveal with a short answer`,
      );
    }
  });

  test(`${L}: weave screens have answers and a deterministic reveal`, () => {
    for (const screen of lesson.screens) {
      if (screen.type !== "weave") continue;
      const where = `${L}/${screen.id}`;
      const p = screen.payload;
      assert(
        p.expectedAnswers.length > 0,
        `${where}: weave has no expectedAnswers`,
      );
      for (const ans of p.expectedAnswers) {
        assert(
          ans.trim().length > 0,
          `${where}: weave has an empty expected answer`,
        );
      }
      const r = p.reveal;
      assert(!!r, `${where}: weave has no reveal payload`);
      assert(
        !!(r.modelAnswer || r.explanation || r.ifCorrect),
        `${where}: weave reveal has no modelAnswer, explanation, or ifCorrect branch`,
      );
    }
  });

  test(`${L}: question-form weave answers carry a no-question-mark alternative`, () => {
    // The v1 normalizer strips trailing periods but NOT "?", so an expected
    // answer ending in "?" must have at least one variant without it.
    for (const screen of lesson.screens) {
      if (screen.type !== "weave") continue;
      const where = `${L}/${screen.id}`;
      const p = screen.payload;
      const hasQuestionForm = p.expectedAnswers.some(endsWithQuestionMark);
      if (!hasQuestionForm) continue;
      const all = [...p.expectedAnswers, ...(p.acceptedAlternatives ?? [])];
      assert(
        all.some((s) => !endsWithQuestionMark(s) && s.trim().length > 0),
        `${where}: question-form expected answer needs an accepted alternative without "?"`,
      );
    }
  });

  test(`${L}: model-answer-only say-it screens have a modelAnswer`, () => {
    for (const screen of lesson.screens) {
      if (screen.type !== "say-it-your-way") continue;
      const where = `${L}/${screen.id}`;
      const p = screen.payload;
      if (p.validationMode === "model-answer-only") {
        assert(
          !!p.modelAnswer && p.modelAnswer.trim().length > 0,
          `${where}: model-answer-only say-it has no modelAnswer`,
        );
      }
    }
  });

  test(`${L}: recap screens have lines`, () => {
    for (const screen of lesson.screens) {
      if (screen.type !== "recap") continue;
      const where = `${L}/${screen.id}`;
      assert(
        screen.payload.lines.length > 0,
        `${where}: recap has no lines`,
      );
      for (const line of screen.payload.lines) {
        assert(line.trim().length > 0, `${where}: recap has an empty line`);
      }
    }
  });

  test(`${L}: no repeated negation tokens in French strings`, () => {
    for (const screen of lesson.screens) {
      for (const s of frenchStrings(screen)) {
        assert(
          !REPEATED_NEGATION.test(s),
          `${L}/${screen.id}: repeated negation token in ${JSON.stringify(s)}`,
        );
      }
    }
  });
}
