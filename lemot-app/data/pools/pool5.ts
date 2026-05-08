/**
 * Exercise Pool — Lesson 5: Articles / Le, La, Les (slim)
 *
 * Created 2026-05-08 (Prompt 4). 6 fillFG (Weave-style) + 2 fillBlanks.
 * No new quiz items — lesson.quiz is authoritative via fallback.
 *
 * Style: definite (le/la/l'/les) + indefinite (un/une/des) articles in
 * sentence-level contexts. Article choice forces gender + elision
 * recognition without isolated drilling.
 */
import type { FillItem, TypedWeaveItem } from "@/lib/types";

export const typedWeave5: TypedWeaveItem[] = [
  {
    prompt: "the book",
    target: "le livre",
    fr: "le livre",
    accepted: ["le livre"],
    diff: "easy",
  },
  {
    prompt: "a house",
    target: "une maison",
    fr: "une maison",
    accepted: ["une maison"],
    diff: "easy",
  },
  {
    prompt: "the children",
    target: "les enfants",
    fr: "les enfants",
    accepted: ["les enfants"],
    diff: "easy",
  },
  {
    prompt: "I have a house",
    target: "J'ai une maison.",
    fr: "J'ai une maison.",
    accepted: ["j'ai une maison", "jai une maison"],
    diff: "easy",
  },
  {
    prompt: "The man looks at the school",
    target: "L'homme regarde l'école.",
    fr: "L'homme regarde l'école.",
    accepted: [
      "l'homme regarde l'école",
      "l'homme regarde l'ecole",
      "lhomme regarde lecole",
    ],
    diff: "medium",
  },
  {
    prompt: "The children like animals",
    target: "Les enfants aiment les animaux.",
    fr: "Les enfants aiment les animaux.",
    accepted: ["les enfants aiment les animaux"],
    diff: "medium",
  },
];

export const fillFG5: FillItem[] = [
  {
    s: "[___] book is on the table.",
    a: "Le",
    o: ["Le", "La", "Les", "Un"],
    ctx: "'Livre' is masculine — pick the article that matches.",
    fr: "Le livre est sur la table.",
    diff: "easy",
  },
  {
    s: "I have [___] house in Paris.",
    a: "une",
    o: ["une", "un", "des", "la"],
    ctx: "Maison is feminine. Indefinite article needed.",
    fr: "J'ai une maison à Paris.",
    diff: "easy",
  },
  {
    s: "[___] children are at school.",
    a: "Les",
    o: ["Les", "Le", "La", "Des"],
    ctx: "Plural definite — same form for masculine and feminine.",
    fr: "Les enfants sont à l'école.",
    diff: "easy",
  },
  {
    s: "[___] man is reading.",
    a: "L'",
    o: ["L'", "Le", "La", "Les"],
    ctx: "Homme starts with a vowel sound — le/la collapses to l'.",
    fr: "L'homme lit.",
    diff: "easy",
  },
  {
    s: "I'd like [___] coffee, please.",
    a: "un",
    o: ["un", "une", "le", "des"],
    ctx: "Café is masculine. Asking for one of many.",
    fr: "Je voudrais un café, s'il vous plaît.",
    diff: "easy",
  },
  {
    s: "She has [___] friends in Paris.",
    a: "des",
    o: ["des", "les", "un", "une"],
    ctx: "Plural indefinite — English drops 'some' but French requires it.",
    fr: "Elle a des amis à Paris.",
    diff: "medium",
  },
];

export const fillBlanks5: FillItem[] = [
  {
    s: "C'est ___ bon restaurant.",
    a: "un",
    o: ["un", "une", "le", "des"],
    ctx: "Restaurant is masculine. 'A good restaurant.'",
    diff: "easy",
  },
  {
    s: "___ enfants aiment ___ animaux.",
    a: "Les",
    blanks: ["Les", "les"],
    blankOpts: [
      ["Les", "Le", "Des"],
      ["les", "le", "des"],
    ],
    ctx: "Both blanks are plural definite. Same article — capitalized only at sentence start.",
    diff: "medium",
  },
];
