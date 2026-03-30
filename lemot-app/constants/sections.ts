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

// Lesson chunks — split 11 sections into 3 digestible parts (~7-8 min each)
export interface ChunkDef {
  id: number;
  name: string;
  sub: string;
  icon: string; // lucide icon name
  sections: number[]; // section indices
}

export const CHUNKS: ChunkDef[] = [
  {
    id: 0,
    name: "Learn",
    sub: "Read, listen, and discover patterns",
    icon: "BookOpen",
    sections: [0, 1, 2, 3], // Read & Listen, Patterns, Weave Fill, French Fill
  },
  {
    id: 1,
    name: "Practice",
    sub: "Build, write, and test yourself",
    icon: "Dumbbell",
    sections: [4, 5, 6], // Build, Write, Quiz
  },
  {
    id: 2,
    name: "Produce",
    sub: "Combine, speak, and review",
    icon: "Mic",
    sections: [7, 8, 9, 10], // Combine+Weave, Say It, Mini Conv, Review
  },
];
