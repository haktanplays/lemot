/**
 * Exercise Pool — Lesson 2: Être (slim)
 *
 * Created 2026-05-08 (Prompt 4) to give Lesson Practice tab Weave-styled
 * variety for L2. Loader (`LessonPractice.tsx`) consumes pool fillFG
 * directly; lesson.fillBlanks/quiz fall back automatically when omitted.
 *
 * Slim by design: 6 fillFG (Weave-style) + 2 fillBlanks (full French).
 * No new quiz items — keeps the L2 lesson's existing 8-item quiz authoritative
 * via fallback in LessonPractice.tsx:48.
 *
 * Style: guided transformation, sentence-level, clean fr field for TTS.
 */
import type { FillItem } from "@/lib/types";

export const fillFG2: FillItem[] = [
  {
    s: "I [___] tired today.",
    a: "suis",
    o: ["suis", "es", "est", "sommes"],
    ctx: "End of a long workday. Tell a friend how you feel.",
    fr: "Je suis fatigué aujourd'hui.",
    diff: "easy",
  },
  {
    s: "She [___] a doctor in Paris.",
    a: "est",
    o: ["est", "suis", "sont", "es"],
    ctx: "Talking about your friend's profession.",
    fr: "Elle est médecin à Paris.",
    diff: "easy",
  },
  {
    s: "We [___] very happy.",
    a: "sommes",
    o: ["sommes", "êtes", "sont", "suis"],
    ctx: "After good news shared with friends.",
    fr: "Nous sommes très contents.",
    diff: "easy",
  },
  {
    s: "Are [___] ready?",
    a: "vous",
    o: ["vous", "tu", "nous", "ils"],
    ctx: "Asking your group politely before leaving the hotel.",
    fr: "Vous êtes prêts ?",
    diff: "easy",
  },
  {
    s: "He is French and I [___] American.",
    a: "suis",
    o: ["suis", "es", "est", "sont"],
    ctx: "Comparing nationalities at a meet-and-greet.",
    fr: "Il est français et je suis américain.",
    diff: "medium",
  },
  {
    s: "It's no big [___].",
    a: "grave",
    o: ["grave", "bon", "vrai", "pas"],
    ctx: "Reassuring someone after a small mistake.",
    fr: "C'est pas grave.",
    diff: "easy",
  },
];

export const fillBlanks2: FillItem[] = [
  {
    s: "Je ___ étudiant.",
    a: "suis",
    o: ["suis", "es", "est", "sommes"],
    ctx: "Introducing yourself at university.",
    diff: "easy",
  },
  {
    s: "Vous ___ américains ?",
    a: "êtes",
    o: ["êtes", "sommes", "sont", "es"],
    ctx: "A French host asking your travel group.",
    diff: "easy",
  },
];
