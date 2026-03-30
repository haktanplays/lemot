export const SECS = [
  "read_listen",
  "patterns",
  "fill_fg",
  "fill_fr",
  "build",
  "fill_write",
  "quiz",
  "combine_fg",
  "say_it",
  "mini_conv",
  "review",
] as const;

export const SEC_NAMES = [
  "Read & Listen",
  "Patterns",
  "Weave Fill",
  "French Fill",
  "Build",
  "Write",
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
  "Layers",
  "Pen",
  "Target",
  "Globe",
  "Sparkles",
  "MessageCircle",
  "RefreshCw",
] as const;

export type SectionKey = (typeof SECS)[number];
