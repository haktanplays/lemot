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
