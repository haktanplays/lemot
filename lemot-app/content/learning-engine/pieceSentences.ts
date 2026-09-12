import { V1_LESSONS } from "@/content/lessons/v1";
import { flattenLessonScreens } from "@/content/lessons/lessonStructure";
import type { Lesson } from "@/content/lessonTypes";

/**
 * The sentences a piece has actually appeared in, for lessons the learner has
 * reached.
 *
 * Mon Lexique could already say where a piece was met and what it travels with,
 * and both are true, but neither shows the learner the thing they remember: the
 * sentence they were looking at when they used it. "je voudrais" means far more
 * beside "Je voudrais un café, s'il vous plaît." than beside a definition.
 *
 * THREE RULES, all of them about not lying.
 *
 *   Authored, never generated. A sentence appears here only if a lesson really
 *   shows it. Nothing is assembled from the piece plus a plausible noun, and no
 *   variant is inferred from a pattern.
 *
 *   Reach-bounded. `reachedLessonIds` is the learner's own footprint, and a
 *   sentence from a lesson they have not opened is future content — showing it
 *   would leak the curriculum and make Mon Lexique a preview instead of a
 *   record.
 *
 *   Surface match only. A piece belongs to a sentence when the sentence
 *   contains its exact French, folded for case and spacing. No stemming, no
 *   fuzzy matching: a near-miss here would attach a learner's memory to a
 *   sentence they never saw.
 *
 * Pure and clock-free. The caller supplies the reach set; this module reads no
 * storage, no snapshot and no time.
 */

export type PieceSentence = {
  fr: string;
  en: string;
  /** Learner-facing lesson title, for "from Survival Kit". */
  lessonTitle: string;
  lessonId: string;
};

const fold = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Sentence-bearing surfaces, in the order a learner meets them.
 *
 * Showcase lines and meet cards only. Both are places a WHOLE sentence is put
 * in front of the learner with its meaning beside it, which is what makes a
 * usable memory hook. Weave answers and fill options are deliberately excluded:
 * an expected answer is a thing the learner was asked to produce, not a
 * sentence the lesson showed them, and the distinction matters for a surface
 * whose whole job is to be a record of what they met.
 */
function sentencesOfLesson(lesson: Lesson): { fr: string; en: string }[] {
  const out: { fr: string; en: string }[] = [];
  for (const screen of lesson.screens) {
    if (screen.type !== "showcase") continue;
    for (const cluster of screen.payload.clusters) {
      for (const s of cluster.sentences) out.push({ fr: s.fr, en: s.en });
    }
  }
  for (const screen of flattenLessonScreens(lesson)) {
    if (screen.type !== "meet-card") continue;
    const p = screen.payload as { fr?: string; en?: string };
    if (typeof p.fr === "string" && typeof p.en === "string") {
      out.push({ fr: p.fr, en: p.en });
    }
  }
  return out;
}

/**
 * Every sentence containing `surface`, from reached lessons, deduplicated.
 *
 * A sentence equal to the piece itself is dropped: "Bonjour." is not a sentence
 * that shows the learner where "Bonjour" has been, it is the piece again.
 */
export function sentencesForPiece(
  surface: string,
  reachedLessonIds: ReadonlySet<string>,
  limit = 3,
): PieceSentence[] {
  const needle = fold(surface);
  if (needle.length === 0) return [];

  const seen = new Set<string>();
  const out: PieceSentence[] = [];
  for (const lesson of V1_LESSONS) {
    if (!reachedLessonIds.has(lesson.id)) continue;
    for (const { fr, en } of sentencesOfLesson(lesson)) {
      const folded = fold(fr);
      if (!folded.includes(needle)) continue;
      // Punctuation-insensitive equality: "Bonjour." is the piece, not a use.
      if (folded.replace(/[.!?,;:]/g, "").trim() === needle) continue;
      if (seen.has(folded)) continue;
      seen.add(folded);
      out.push({ fr, en, lessonTitle: lesson.title, lessonId: lesson.id });
      if (out.length >= limit) return out;
    }
  }
  return out;
}
