/**
 * Learner-facing learning-summary copy — pure, framework-free, testable.
 *
 * The ONLY learner-visible vocabulary for the summary. Everything here is calm
 * activity language: no accuracy, no success rate, no percentages, no streaks,
 * no XP, no levels, no time-spent claims, no mastery scores, no error counts,
 * no "weak"/"failed" wording — those concepts have no copy because the
 * projection has no field for them.
 *
 * ONE section only. The previous surface also printed an engine-counter block
 * (Practice moments · Open attempts · Practice Hub returns · Used in more than
 * one place) and a support block (Hints opened · Replays · Slow listening).
 * Those were reducer bookkeeping shown to a learner, and no rename fixes that —
 * they are gone from the learner surface rather than relabelled. The projection
 * still computes every field; the summary simply stops displaying them.
 *
 * The four rows use the SAME four bands as Mon Lexique, so one word means one
 * thing everywhere in the product.
 */

export const LEARNING_STATS_COPY = Object.freeze({
  /** The screen title, and the name of the header action that opens it. */
  title: "Learning summary",

  /** The one section. */
  sectionTitle: "Learning in motion",
  sectionSubtitle: "A calm view of the French you’ve been practising.",

  empty: "Nothing to show yet. This fills in as you use French.",
  error: "Your summary is resting for a moment. Come back shortly.",

  /** Row labels — the Mon Lexique bands, in the same strongest-first order. */
  yours: "Yours",
  becomingYours: "Becoming yours",
  metThis: "You’ve met this",
  worthAnotherLook: "Worth another look",
});
