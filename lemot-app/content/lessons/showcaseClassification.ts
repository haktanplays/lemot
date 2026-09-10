/**
 * Every Showcase line is classified, and none is flat by accident.
 *
 * A Showcase line either shows the seams it is made of or it does not, and from
 * the learner's side those two look identical: one is a sentence broken into
 * pieces they can swap, the other is a wall. The difference is supposed to be a
 * teaching decision. It was not — it was whatever the registry happened to know.
 *
 * "Je suis prêt." rendered flat, not because it is one indivisible thing but
 * because "prêt" is not a registry item, while L2's entire claim is that "je
 * suis" is a frame you put things after. "J'ai faim." showed its seam and
 * "J'ai soif." did not, for the same reason and with no teaching difference
 * between them. That is the accidentally flat line this module abolishes.
 *
 * The four classifications, from the outside in:
 *
 *   BREAKDOWN_PRESENT       the line shows its pieces. DERIVED, never declared:
 *                           if a breakdown exists the learner sees it, so there
 *                           is nothing for an author to assert.
 *   WHOLE_FIRST_FORMULA     `flat: "formula"` — the line IS one thing.
 *   INPUT_EXPOSURE          `flat: "exposure"` — the line reaches past what the
 *                           learner owns, so a partial breakdown would claim
 *                           the unowned half is already theirs.
 *   INTENTIONALLY_UNSEGMENTED
 *                           `flat: "unsegmented"` — the seam is real and this
 *                           lesson still wants the whole first.
 *
 * There is no fifth outcome. A line with no breakdown and no declaration is the
 * accident, and it is a hard error.
 *
 * Pure and deterministic: lessons in, findings out. No runtime, no state.
 */
import type { Lesson, ShowcaseSentence, ShowcaseScreen } from "../lessonTypes";
import { showcasePieces } from "./showcasePieces";

export type ShowcaseClass =
  | "BREAKDOWN_PRESENT"
  | "WHOLE_FIRST_FORMULA"
  | "INPUT_EXPOSURE"
  | "INTENTIONALLY_UNSEGMENTED"
  | "UNCLASSIFIED";

export type ShowcaseFinding = {
  code: "SC-001" | "SC-002" | "SC-003" | "SC-004" | "SC-005";
  lessonId: string;
  fr: string;
  message: string;
};

/** Punctuation and case are presentation; the words are the sentence. */
const fold = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.,!?;:«»"…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** The pieces the learner will actually see under this line. */
export function shownPieces(sentence: ShowcaseSentence): string[] {
  return sentence.pieces ?? showcasePieces(sentence.fr).map((p) => p.text);
}

/**
 * How one line classifies.
 *
 * A breakdown wins over any declaration, because the breakdown is what the
 * learner sees; a declaration that contradicts it is stale, which SC-002 catches
 * separately rather than silently honouring.
 */
export function classifyShowcaseSentence(sentence: ShowcaseSentence): ShowcaseClass {
  if (shownPieces(sentence).length >= 2) return "BREAKDOWN_PRESENT";
  switch (sentence.flat) {
    case "formula":
      return "WHOLE_FIRST_FORMULA";
    case "exposure":
      return "INPUT_EXPOSURE";
    case "unsegmented":
      return "INTENTIONALLY_UNSEGMENTED";
    default:
      return "UNCLASSIFIED";
  }
}

/** Every showcase sentence in a lesson, in authored order. */
export function showcaseSentencesOf(lesson: Lesson): ShowcaseSentence[] {
  const out: ShowcaseSentence[] = [];
  for (const screen of lesson.screens) {
    if (screen.type !== "showcase") continue;
    for (const cluster of (screen as ShowcaseScreen).payload.clusters) {
      out.push(...cluster.sentences);
    }
  }
  return out;
}

export function reviewShowcaseClassification(
  lessons: readonly Lesson[],
): ShowcaseFinding[] {
  const findings: ShowcaseFinding[] = [];
  for (const lesson of lessons) {
    for (const sentence of showcaseSentencesOf(lesson)) {
      const shown = shownPieces(sentence);
      const at = { lessonId: lesson.id, fr: sentence.fr };

      if (sentence.pieces !== undefined) {
        if (sentence.pieces.length < 2) {
          findings.push({
            ...at,
            code: "SC-004",
            message:
              "an authored breakdown of fewer than two pieces is a flat line in costume; " +
              "either give it real pieces or declare why it stays whole",
          });
        }
        if (fold(sentence.pieces.join(" ")) !== fold(sentence.fr)) {
          findings.push({
            ...at,
            code: "SC-003",
            message: `authored pieces do not rebuild the sentence: [${sentence.pieces.join(" | ")}]`,
          });
        }
      }

      if (shown.length >= 2) {
        if (sentence.flat !== undefined) {
          findings.push({
            ...at,
            code: "SC-002",
            message: `declared flat "${sentence.flat}" but the line breaks into ${shown.length} pieces`,
          });
        }
        continue;
      }

      if (sentence.flat === undefined) {
        findings.push({
          ...at,
          code: "SC-001",
          message:
            "shows no breakdown and declares no reason. If the seam is real, author " +
            "pieces; if it is not, say so with flat: formula | exposure | unsegmented",
        });
        continue;
      }

      if (sentence.flat === "exposure" && sentence.role !== "exposure") {
        findings.push({
          ...at,
          code: "SC-005",
          message: `flat "exposure" on a ${sentence.role} line: a line the lesson leans on is not exposure`,
        });
      }
    }
  }
  return findings;
}

/** Counts per classification, for the record rather than for a gate. */
export function summarizeShowcaseClassification(
  lessons: readonly Lesson[],
): Record<ShowcaseClass, number> {
  const out: Record<ShowcaseClass, number> = {
    BREAKDOWN_PRESENT: 0,
    WHOLE_FIRST_FORMULA: 0,
    INPUT_EXPOSURE: 0,
    INTENTIONALLY_UNSEGMENTED: 0,
    UNCLASSIFIED: 0,
  };
  for (const lesson of lessons) {
    for (const sentence of showcaseSentencesOf(lesson)) {
      out[classifyShowcaseSentence(sentence)] += 1;
    }
  }
  return out;
}
