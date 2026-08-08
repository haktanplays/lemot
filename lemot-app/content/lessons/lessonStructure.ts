/**
 * v1 lesson structural rules — the single source of truth.
 *
 * EXTRACTED, NOT AUTHORED. All three rules below previously lived inline in
 * `scripts/tests/v1LessonStructure.test.ts` and are reproduced here unchanged:
 * same supported screen types, same three item-reference sites, same negation
 * regex, same French-string collection, same messages. Nothing became legal or
 * illegal by moving.
 *
 * Why they moved: they are the last deterministic candidate-level guards the
 * Content Factory could not run. Like the learner-copy and chip-taxonomy rules
 * before them, they only ever walked `V1_LESSONS`, so a lesson that is not in
 * `V1_LESSONS` yet was invisible to them — which is every generated candidate,
 * at exactly the moment the check matters most.
 *
 * The item-reference rule is the anti-hallucination guard: screen-level
 * `targetItemIds` and payload `itemId`s are plain strings, NOT compile-checked
 * (unlike `learningItems`), so a typo or an invented id ships silently. It is
 * checked against the real registry, never against TypeScript string typing.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import type { LearningItem, Lesson, LessonScreen, ScreenType } from "../lessonTypes";

/**
 * Runtime enumeration of the screen types the v1 renderer can render, derived
 * from the canonical `ScreenType` union rather than restated beside it: adding
 * a member to the union is a compile error here until this map is updated.
 *
 * Must stay in step with the renderer's `pickScreen` cases
 * (`LessonRendererV1.tsx`). The renderer itself is not imported — that would
 * pull React Native into a pure-tsx path.
 */
const SUPPORTED_SCREEN_TYPE_MAP: Record<ScreenType, true> = {
  "meet-card": true,
  "insight-card": true,
  "fill-with-traps": true,
  weave: true,
  "say-it-your-way": true,
  "natural-reveal": true,
  recap: true,
};

export const SUPPORTED_SCREEN_TYPES: ReadonlySet<string> = new Set(
  Object.keys(SUPPORTED_SCREEN_TYPE_MAP),
);

/** "ne ne", "pas pas" and similar doubled negation tokens in French strings. */
export const REPEATED_NEGATION = /\b(ne\s+ne|pas\s+pas|n'\s*n')\b/i;

export type LessonStructureDiagnostic = {
  code: "SCREEN-TYPE" | "ITEM-REFERENCE" | "DOUBLED-NEGATION";
  lessonId: string;
  screenId: string;
  message: string;
};

/** Collect the French-facing strings worth scanning for doubled negation. */
export function frenchStrings(screen: LessonScreen): string[] {
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

/** GUARD A — every authored screen type is one the shipped renderer handles. */
export function reviewSupportedScreenTypes(lesson: Lesson): LessonStructureDiagnostic[] {
  const found: LessonStructureDiagnostic[] = [];
  for (const screen of lesson.screens) {
    if (SUPPORTED_SCREEN_TYPES.has(screen.type)) continue;
    found.push({
      code: "SCREEN-TYPE",
      lessonId: lesson.id,
      screenId: screen.id,
      message: `${lesson.id}/${screen.id}: unsupported screen type "${screen.type}"`,
    });
  }
  return found;
}

/**
 * GUARD B — every canonical item reference resolves in the registry.
 *
 * Reference sites are exactly the three the shipping guard covers:
 * `screen.targetItemIds`, payload `highlights[].itemId`, payload
 * `suggestedPieces[].itemId`. No broader reference crawling is attempted here.
 */
export function reviewLessonItemReferences(
  lesson: Lesson,
  registry: Readonly<Record<string, LearningItem>> = ITEM_REGISTRY as Readonly<
    Record<string, LearningItem>
  >,
): LessonStructureDiagnostic[] {
  const found: LessonStructureDiagnostic[] = [];
  const known = new Set(Object.keys(registry));
  const check = (id: string, where: string, screenId: string): void => {
    if (known.has(id)) return;
    found.push({
      code: "ITEM-REFERENCE",
      lessonId: lesson.id,
      screenId,
      message: `${where}: itemId "${id}" is not in ITEM_REGISTRY`,
    });
  };

  for (const screen of lesson.screens) {
    const where = `${lesson.id}/${screen.id}`;
    for (const id of screen.targetItemIds ?? []) {
      check(id, `${where} targetItemIds`, screen.id);
    }
    const p = screen.payload as Record<string, unknown>;
    if (Array.isArray(p.highlights)) {
      for (const h of p.highlights as { itemId?: string }[]) {
        if (h.itemId) check(h.itemId, `${where} highlights`, screen.id);
      }
    }
    if (Array.isArray(p.suggestedPieces)) {
      for (const piece of p.suggestedPieces as { itemId?: string }[]) {
        if (piece.itemId) check(piece.itemId, `${where} suggestedPieces`, screen.id);
      }
    }
  }
  return found;
}

/**
 * GUARD C — no doubled negation token in French-facing strings.
 *
 * Deliberately narrow: this is the shipped regex, not a French linter. Legal
 * negation (`je ne suis pas`, `ce n'est pas`) is untouched; only an adjacent
 * repeat of the same token is flagged.
 */
export function reviewDoubledNegation(lesson: Lesson): LessonStructureDiagnostic[] {
  const found: LessonStructureDiagnostic[] = [];
  for (const screen of lesson.screens) {
    for (const s of frenchStrings(screen)) {
      if (!REPEATED_NEGATION.test(s)) continue;
      found.push({
        code: "DOUBLED-NEGATION",
        lessonId: lesson.id,
        screenId: screen.id,
        message: `${lesson.id}/${screen.id}: repeated negation token in ${JSON.stringify(s)}`,
      });
    }
  }
  return found;
}

/** All three structural guards over one lesson, in a stable order. */
export function reviewLessonStructure(
  lesson: Lesson,
  registry?: Readonly<Record<string, LearningItem>>,
): LessonStructureDiagnostic[] {
  return [
    ...reviewSupportedScreenTypes(lesson),
    ...reviewLessonItemReferences(lesson, registry),
    ...reviewDoubledNegation(lesson),
  ];
}
