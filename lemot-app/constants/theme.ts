export const P = {
  bg: "#FAF9F7",
  paper: "#FFFFFF",
  ink: "#2C2825",
  ink2: "#6B6560",
  ink3: "#A39E99",
  red: "#C0392B",
  rl: "#FBEAE8",
  rb: "#F0C9C4",
  green: "#27AE60",
  gl: "#E8F5E9",
  amber: "#E67E22",
  al: "#FFF8E1",
  purple: "#7C3AED",
  pl: "#F3E5F5",
  border: "#E8E5E1",
  sh: "0 1px 4px rgba(44,40,37,0.06)",
} as const;

// UI Slice 1 foundation tokens - additive, consumed by components/ui and the
// lesson frame. The palette above is untouched; these only name the spacing
// rhythm and radius pair the lesson surfaces already use informally, so new
// presentation code stops re-inventing raw numbers.
export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const RADIUS = {
  // Cards and inputs.
  card: 12,
  // Small nested surfaces (hint cloze, example blocks).
  inner: 8,
  // Chips, pills, round affordances.
  pill: 999,
} as const;

// Home motivation rotation — 3 layers interleaved so the daily index
// naturally cycles through proverb → soft reflection → path reflection.
// Reward / cheerleader / pressure tones are intentionally absent
// (no XP, no streak, no "keep going", no "great job"). Tone is passive
// mirror: sit beside the learner, do not push.
const MOTIV_PROVERBS = [
  "Petit à petit, l'oiseau fait son nid.",
  "On ne voit bien qu'avec le cœur.",
  "Le temps fait toute chose.",
];

const MOTIV_SOFT_REFLECTIONS = [
  "Some French is starting to feel less distant.",
  "A few pieces are becoming familiar.",
  "Little by little, the language starts to answer back.",
];

const MOTIV_PATH_REFLECTIONS = [
  "The path is quieter when you return to it gently.",
  "You do not need to rush what is becoming yours.",
  "You are not behind. You are on the path.",
];

export const MOTIV = MOTIV_PROVERBS.flatMap((p, i) => [
  p,
  MOTIV_SOFT_REFLECTIONS[i],
  MOTIV_PATH_REFLECTIONS[i],
]);

/**
 * Vertical room for a line of French.
 *
 * French carries accents above (é, è, ê, à, ç) and descenders below (j, g, p,
 * q, y), and the product sets French in italic serif, which swings furthest of
 * all. A Text with no lineHeight inherits a default sized for Latin text
 * without accents, and inside a pill with tight vertical padding the tops of
 * accents and the tails of J and j get shaved. The founder saw it first on
 * "J'ai"; it was never a J problem.
 *
 * 1.45x is enough for an italic serif accent stack without making chips loose.
 */
export function frenchLineHeight(fontSize: number): number {
  return Math.round(fontSize * 1.45);
}
