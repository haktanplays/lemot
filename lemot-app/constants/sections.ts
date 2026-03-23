export const SECS = [
  "read_listen",
  "patterns",
  "fill_cross",
  "fill_fr",
  "fill_write",
  "build",
  "quiz",
  "combine_cross",
  "say_it",
  "mini_conv",
  "review",
] as const;

export const SEC_NAMES = [
  "Read & Listen",
  "Patterns",
  "Crossing Fill",
  "French Fill",
  "Write",
  "Build",
  "Quiz",
  "Combine",
  "Say It",
  "Mini Chat",
  "Review",
] as const;

// Icon names as strings — resolved to lucide components at render time
export const SEC_ICONS = [
  "Headphones",
  "Lightbulb",
  "Type",
  "Pen",
  "Pen",
  "Layers",
  "Target",
  "Globe",
  "Sparkles",
  "MessageCircle",
  "RefreshCw",
] as const;

export type SectionKey = (typeof SECS)[number];
