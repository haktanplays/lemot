/**
 * Learner-facing Stats copy (PR-10) — pure, framework-free, testable.
 *
 * The ONLY learner-visible vocabulary for the Stats summary. Everything here is
 * calm activity language: no accuracy, no success rate, no percentages, no
 * streaks, no XP, no levels, no time-spent claims, no mastery scores, no error
 * counts, no "weak"/"failed" wording — those concepts have no copy because the
 * projection has no field for them.
 *
 * Support use (hints, replays, slow listening) is framed NEUTRALLY: how the
 * learner worked, never a shortfall. "Ready for another pass" is the calm
 * surface for the reducer's internal weakness state — the internal word never
 * reaches the learner.
 */

export const LEARNING_STATS_COPY = Object.freeze({
  title: "Learning in motion",
  intro: "A calm view of the French you’ve been practising.",
  empty: "Your learning summary will grow as you practise.",
  error: "Your summary is resting for a moment. Come back shortly.",

  sectionFrenchInUse: "French in use",
  sectionPracticeActivity: "Practice activity",
  sectionSupportUsed: "Support used",

  independentPieces: "Used independently",
  supportedPieces: "Growing with support",
  recognitionMoments: "Recognition practice",
  readyToRevisitPieces: "Ready for another pass",

  practiceMoments: "Practice moments",
  openAttempts: "Open attempts",
  practiceHubMoments: "Practice Hub returns",
  crossSurfacePieces: "Used in more than one place",

  hintMoments: "Hints opened",
  replayCount: "Replays",
  slowPlaybackMoments: "Slow listening",
});
