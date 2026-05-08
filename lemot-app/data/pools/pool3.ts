/**
 * Exercise Pool — Lesson 3: Yes / No / You / Negation (slim)
 *
 * Created 2026-05-08 (Prompt 4). 6 fillFG (Weave-style) + 2 fillBlanks.
 * No new quiz items — lesson.quiz is authoritative via fallback.
 *
 * Style: guided transformation around the negation sandwich, tu/vous
 * choice, and the unique French `si` (yes-to-a-negative).
 */
import type { FillItem } from "@/lib/types";

export const fillFG3: FillItem[] = [
  {
    s: "Yes, [___] thanks.",
    a: "non",
    o: ["non", "oui", "si", "pas"],
    ctx: "A waiter offers more wine. You're done.",
    fr: "Non, merci.",
    diff: "easy",
  },
  {
    s: "Are [___] French?",
    a: "tu",
    o: ["tu", "vous", "il", "je"],
    ctx: "Casual chat with someone your age.",
    fr: "Tu es français ?",
    diff: "easy",
  },
  {
    s: "[___], I am French!",
    a: "Si",
    o: ["Si", "Oui", "Non", "Pas"],
    ctx: "Someone says you're not French — but you are. Contradict the negative.",
    fr: "Si, je suis français !",
    diff: "easy",
  },
  {
    s: "I never eat meat. Je ne mange [___] de viande.",
    a: "jamais",
    o: ["jamais", "pas", "rien", "plus"],
    ctx: "Explaining your diet at dinner.",
    fr: "Je ne mange jamais de viande.",
    diff: "easy",
  },
  {
    s: "I don't understand. Je [___] comprends pas.",
    a: "ne",
    o: ["ne", "pas", "non", "rien"],
    ctx: "Negation sandwich — the missing piece before the verb.",
    fr: "Je ne comprends pas.",
    diff: "easy",
  },
  {
    s: "Are you (formal) [___]?",
    a: "prêt",
    o: ["prêt", "fatigué", "français", "content"],
    ctx: "A guide checks if your group is ready to start the tour.",
    fr: "Vous êtes prêt ?",
    diff: "easy",
  },
];

export const fillBlanks3: FillItem[] = [
  {
    s: "Tu n'es pas fatigué ? — ___, je suis très fatigué !",
    a: "Si",
    o: ["Si", "Oui", "Non", "Pas"],
    ctx: "Contradicting a negative question — only French has this one-word answer.",
    diff: "medium",
  },
  {
    s: "Je ne mange ___ de pain.",
    a: "plus",
    o: ["plus", "jamais", "rien", "pas"],
    ctx: "You've had enough bread already. 'No more.'",
    diff: "medium",
  },
];
