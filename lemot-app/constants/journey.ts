/**
 * Journey Image Mapping
 *
 * Maps lesson progress to mountain journey illustrations.
 * The hiker climbs, summits (Weave ends → full French), descends through
 * increasingly green terrain, and finally becomes a mentor.
 *
 * Special triggers:
 * - Milestone completion → image transitions at 1→2, 2→3, 3→4, 6 (camp)
 * - "Take a Break" button → always shows image 6 (camp)
 * - Summit (image 8) = Weave → full French transition point
 */

/* eslint-disable @typescript-eslint/no-var-requires */
export const JOURNEY_IMAGES = {
  1: require("@/assets/journey/1.png"),
  2: require("@/assets/journey/2.png"),
  3: require("@/assets/journey/3.png"),
  4: require("@/assets/journey/4.png"),
  5: require("@/assets/journey/5.png"),
  6: require("@/assets/journey/6.png"),
  7: require("@/assets/journey/7.png"),
  8: require("@/assets/journey/8.png"),
  9: require("@/assets/journey/9.png"),
  10: require("@/assets/journey/10.png"),
  11: require("@/assets/journey/11.png"),
  12: require("@/assets/journey/12.png"),
  13: require("@/assets/journey/13.png"),
  14: require("@/assets/journey/14.png"),
} as const;

/** Camp image — shown on milestone completion + "Take a Break" */
export const CAMP_IMAGE = 6;

/** Summit image — Weave → full French transition */
export const SUMMIT_IMAGE = 8;

/** Mentor image — C1 level, guide others */
export const MENTOR_IMAGE = 14;

interface JourneyPhase {
  image: keyof typeof JOURNEY_IMAGES;
  label: string;
  subtitle: string;
}

/**
 * Lesson ranges for each journey phase.
 * For the current 24 lessons (A1), only phases 1-4 are active.
 * Phases 5-14 are defined for the 80-lesson roadmap (A2→C1).
 */
const JOURNEY_PHASES: { maxLesson: number; phase: JourneyPhase }[] = [
  // TIRMANIS — A1
  { maxLesson: 5,  phase: { image: 1,  label: "Setting Off",        subtitle: "The mountain awaits" } },
  { maxLesson: 11, phase: { image: 2,  label: "First Cairn",        subtitle: "You left your mark" } },
  { maxLesson: 17, phase: { image: 3,  label: "Crossing the Bridge", subtitle: "No turning back" } },
  { maxLesson: 24, phase: { image: 4,  label: "The Steep Climb",    subtitle: "The hardest part" } },
  // DIK TIRMANIS — A2
  { maxLesson: 30, phase: { image: 5,  label: "Through the Storm",  subtitle: "Perseverance" } },
  { maxLesson: 35, phase: { image: 6,  label: "Base Camp",          subtitle: "Rest and reflect" } },
  { maxLesson: 40, phase: { image: 7,  label: "Approaching Summit", subtitle: "Almost there" } },
  // ZIRVE
  { maxLesson: 41, phase: { image: 8,  label: "The Summit",         subtitle: "You think in French now" } },
  // INIS — B1-B2
  { maxLesson: 50, phase: { image: 9,  label: "The Descent Begins", subtitle: "Barren but steady" } },
  { maxLesson: 55, phase: { image: 10, label: "Green Returns",      subtitle: "It's getting easier" } },
  { maxLesson: 60, phase: { image: 11, label: "River & Wildlife",   subtitle: "Discovering freely" } },
  { maxLesson: 65, phase: { image: 12, label: "The Easy Path",      subtitle: "Language flows naturally" } },
  // VARIS — B2-C1
  { maxLesson: 75, phase: { image: 13, label: "Village in Sight",   subtitle: "Among people again" } },
  { maxLesson: 80, phase: { image: 14, label: "The Guide",          subtitle: "Now you show the way" } },
];

/**
 * Returns the journey phase for a given completed lesson count.
 * Uses the highest completed lesson ID to determine phase.
 */
export function getJourneyPhase(highestCompletedLesson: number): JourneyPhase {
  for (const { maxLesson, phase } of JOURNEY_PHASES) {
    if (highestCompletedLesson <= maxLesson) {
      return phase;
    }
  }
  // Beyond L80 — mentor phase
  return JOURNEY_PHASES[JOURNEY_PHASES.length - 1].phase;
}

/**
 * Returns the journey image source for a given lesson.
 * Special case: isOnBreak=true always returns camp image.
 */
export function getJourneyImage(
  highestCompletedLesson: number,
  isOnBreak = false
) {
  if (isOnBreak) return JOURNEY_IMAGES[CAMP_IMAGE];
  const phase = getJourneyPhase(highestCompletedLesson);
  return JOURNEY_IMAGES[phase.image];
}
