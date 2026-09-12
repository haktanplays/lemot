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
import type {
  LearningItem,
  Lesson,
  LessonScreen,
  NaturalAlternative,
  ScreenType,
} from "../lessonTypes";
import { alternativeStrings } from "./naturalAlternatives";

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
  "pattern-reel": true,
  "activity-chain": true,
  showcase: true,
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
  code: "SCREEN-TYPE"
    | "ITEM-REFERENCE"
    | "DOUBLED-NEGATION"
    | "SPLIT-FRAME-EMPTY"
    | "SPLIT-FRAME-DRIFT"
    | "PIECES-DRIFT";
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
      // An alternative may be a bare string or a labelled variant. The scanner
      // wants the French either way; `when` is English and never scanned.
      for (const s of alternativeStrings(
        reveal.naturalAlternatives as (string | NaturalAlternative)[],
      )) {
        out.push(s);
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

  // Flattened: a chained weave's `suggestedPieces` and a chained meet-card's
  // `highlights` are item reference sites like any other, and an unregistered
  // id there ships silently exactly as it would on a top-level screen.
  for (const screen of flattenLessonScreens(lesson)) {
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
  // Flattened: the French inside a chain step is French the learner reads.
  for (const screen of flattenLessonScreens(lesson)) {
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

/**
 * GUARD D — a drawn split frame really is the sentence it claims to be.
 *
 * The frame renders its parts, not `fr`, so the two can drift: edit the sentence
 * and the picture underneath keeps showing the old one, silently and
 * convincingly. Reassembling the parts and comparing is the whole check.
 *
 * It also refuses a frame whose halves are adjacent. A frame with nothing
 * between them is not a frame, it is a chunk drawn to look like one, and
 * "je ne suis pas" as a single unit is precisely the misunderstanding this
 * screen family exists to prevent.
 */
export function reviewSplitFrames(lesson: Lesson): LessonStructureDiagnostic[] {
  const found: LessonStructureDiagnostic[] = [];
  const fold = (v: string) =>
    v.normalize("NFC").toLowerCase().replace(/\s+/g, " ").replace(/\s+([.,!?])/g, "$1").trim();

  for (const screen of flattenLessonScreens(lesson)) {
    if (screen.type !== "insight-card") continue;
    for (const example of screen.payload.examples ?? []) {
      const frame = example.frame;
      if (frame === undefined) continue;
      const at = { lessonId: lesson.id, screenId: screen.id };

      if (frame.inside.trim().length === 0) {
        found.push({
          code: "SPLIT-FRAME-EMPTY",
          ...at,
          message: `${lesson.id}/${screen.id}: a frame with nothing inside it is a chunk, not a frame`,
        });
        continue;
      }

      const rebuilt = [frame.lead, frame.open, frame.inside, frame.close, frame.trail]
        .filter((part): part is string => typeof part === "string" && part.length > 0)
        .join(" ");
      // The open half may elide onto what follows it (ce n' est -> ce n'est),
      // so the comparison drops the space the parts are authored with.
      const tight = (v: string) => fold(v).replace(/'\s+/g, "'");
      if (example.fr === undefined || tight(rebuilt) !== tight(example.fr)) {
        found.push({
          code: "SPLIT-FRAME-DRIFT",
          ...at,
          message: `${lesson.id}/${screen.id}: frame draws ${JSON.stringify(rebuilt)} but the example is ${JSON.stringify(example.fr ?? "")}`,
        });
      }
    }

    // Same rule for a package breakdown: the chips ARE what the learner reads,
    // so they may not drift from the sentence the example claims to show. A
    // card teaching that words travel together cannot afford to draw a unit
    // that is not the one it named.
    for (const example of screen.payload.examples ?? []) {
      const pieces = example.pieces;
      if (pieces === undefined || pieces.length === 0) continue;
      const at = { lessonId: lesson.id, screenId: screen.id };
      const rebuilt = pieces.join(" ");
      const tight = (v: string) =>
        fold(v).replace(/'\s+/g, "'").replace(/\s+([.,!?])/g, "$1");
      if (example.fr === undefined || tight(rebuilt) !== tight(example.fr)) {
        found.push({
          code: "PIECES-DRIFT",
          ...at,
          message: `${lesson.id}/${screen.id}: pieces draw ${JSON.stringify(rebuilt)} but the example is ${JSON.stringify(example.fr ?? "")}`,
        });
      }
    }
  }
  return found;
}

/** All four structural guards over one lesson, in a stable order. */
export function reviewLessonStructure(
  lesson: Lesson,
  registry?: Readonly<Record<string, LearningItem>>,
): LessonStructureDiagnostic[] {
  return [
    ...reviewSupportedScreenTypes(lesson),
    ...reviewLessonItemReferences(lesson, registry),
    ...reviewDoubledNegation(lesson),
    ...reviewSplitFrames(lesson),
  ];
}

/**
 * Every learner-facing screen in a lesson, with activity-chain steps lifted out
 * of their container.
 *
 * A chain is a page, not an action: its steps are real screens that grade and
 * record exactly as they would standing alone. Anything reasoning about what a
 * lesson ASKS OF THE LEARNER -- production counts, acquisition drift, target
 * treatment, corpus breadth -- must therefore see the steps, or moving a screen
 * into a chain would silently hide it from validation. Anything reasoning about
 * NAVIGATION should keep using `lesson.screens`.
 *
 * Order is play order: the chain container is dropped and replaced in place by
 * its steps, because the container itself is never an action.
 */
export function flattenLessonScreens<S extends { type: string }>(lesson: {
  screens?: readonly S[];
}): S[] {
  const out: S[] = [];
  for (const screen of lesson.screens ?? []) {
    if (screen.type === "activity-chain") {
      // Generic in the screen type so the structural `CanonLesson` view in
      // scripts/canonRules.ts flattens through this same function rather than
      // growing a second copy of the rule. The cast is the price of that: a
      // generic S cannot be narrowed by `.type`, and every step of a chain is
      // by construction one of the screen shapes S already covers.
      const steps = (screen as { payload?: { steps?: readonly S[] } }).payload?.steps ?? [];
      out.push(...steps);
      continue;
    }
    out.push(screen);
  }
  return out;
}
