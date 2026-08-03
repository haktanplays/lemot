/**
 * Practice card copy — pure, framework-free, testable.
 *
 * The learner-facing supporting line for one Practice card. It replaces the
 * per-tier status lines the list used to print ("A useful piece to keep
 * active.", "You’ve used this before. Try it once more.", "This one could use
 * another calm pass.", "Ready to revisit today."). Those were the reducer's
 * Build / Stretch / Challenge path and its due flag, read back to the learner —
 * an internal queue state wearing a sentence. A learner does not have a tier.
 *
 * What replaces it is something the learner has actually seen: the human
 * situation the ORIGINAL authored screen already sets up (`WeavePayload.context`
 * — "You step up to the counter and order simply."). It is read BY REFERENCE
 * from the source screen the Hub selector already resolved, so no new content
 * model exists, nothing is copied into Practice storage, and no French, prompt
 * or answer is synthesized here.
 *
 * A recognition screen (`fill-with-traps`) authors a task question, not a
 * scene, so it has no situation to borrow; those cards fall back to one short
 * neutral line. Never a status, a count, a backlog or a verdict.
 */
import type { ReusablePracticeSource } from "@/content/lesson-v1-evidence/practiceHub";

/**
 * Used when the source screen exposes no human situation. Neutral and constant:
 * it says where the piece came from, never how the learner is doing.
 */
export const PRACTICE_NEUTRAL_LINE = "Something you have met before.";

/** The exact resting-state copy for an empty Practice list. */
export const PRACTICE_EMPTY_LINE =
  "Nothing needs your attention right now. Pieces return here after you use them in a lesson.";

/**
 * The supporting line for one card: the authored scene when the source screen
 * has one, otherwise the neutral line. Pure — same source in, same line out.
 */
export function practiceCardLine(source: ReusablePracticeSource): string {
  const { screen } = source;
  if (screen.type === "weave") {
    const context = screen.payload.context;
    if (typeof context === "string" && context.trim().length > 0) {
      return context;
    }
  }
  return PRACTICE_NEUTRAL_LINE;
}
