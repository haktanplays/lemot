import type { Milestone } from "@/lib/types";

export const MILESTONES: Milestone[] = [
  {
    ids: [1, 2, 3, 4, 5],
    title: "Basic Communicator",
    desc: "You can greet, introduce yourself, say no, express feelings, and use articles.",
    icon: "🏔️",
  },
  {
    ids: [6, 7, 8, 9, 10, 11],
    title: "Independent Speaker",
    desc: "You can make plans, ask questions, order food, and build compound sentences.",
    icon: "⛰️",
  },
  {
    ids: [12, 13, 14, 15, 16, 17],
    title: "Confident Conversationalist",
    desc: "You can describe people, ask any question, use pronouns, give directions, and express obligation.",
    icon: "🗻",
  },
  {
    ids: [18, 19, 20, 21, 22, 23, 24],
    title: "Natural Expression",
    desc: "You can conjugate verbs, talk about the past, express opinions, and tell stories.",
    icon: "🏁",
  },
];

/** Lesson IDs that are free (no subscription required) */
export const FREE_LESSON_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/** Monthly subscription price */
export const PAYWALL_PRICE = "$12.99/mo";
