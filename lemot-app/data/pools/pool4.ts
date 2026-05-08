/**
 * Exercise Pool — Lesson 4: Avoir / Feelings & Needs (slim)
 *
 * Created 2026-05-08 (Prompt 4). 6 fillFG (Weave-style) + 2 fillBlanks.
 * No new quiz items — lesson.quiz is authoritative via fallback.
 *
 * Style: avoir expressions (j'ai faim, j'ai peur), age (j'ai N ans),
 * and il y a — the four core L4 patterns.
 */
import type { FillItem, TypedWeaveItem } from "@/lib/types";

export const typedWeave4: TypedWeaveItem[] = [
  {
    prompt: "I am hungry (literally: I have hunger)",
    target: "J'ai faim.",
    fr: "J'ai faim.",
    accepted: ["j'ai faim", "jai faim"],
    diff: "easy",
  },
  {
    prompt: "I am thirsty",
    target: "J'ai soif.",
    fr: "J'ai soif.",
    accepted: ["j'ai soif", "jai soif"],
    diff: "easy",
  },
  {
    prompt: "We are cold",
    target: "Nous avons froid.",
    fr: "Nous avons froid.",
    accepted: ["nous avons froid"],
    diff: "easy",
  },
  {
    prompt: "There is a restaurant here",
    target: "Il y a un restaurant ici.",
    fr: "Il y a un restaurant ici.",
    accepted: ["il y a un restaurant ici"],
    diff: "easy",
  },
  {
    prompt: "I need water",
    target: "J'ai besoin d'eau.",
    fr: "J'ai besoin d'eau.",
    accepted: ["j'ai besoin d'eau", "jai besoin d'eau", "j'ai besoin de l'eau"],
    diff: "medium",
  },
  {
    prompt: "They are sleepy",
    target: "Ils ont sommeil.",
    fr: "Ils ont sommeil.",
    accepted: ["ils ont sommeil"],
    diff: "easy",
  },
];

export const fillFG4: FillItem[] = [
  {
    s: "I [___] hungry.",
    a: "ai faim",
    o: ["ai faim", "suis faim", "ai chaud", "suis affamé"],
    ctx: "Mid-afternoon, lunch was too small. Express your hunger the French way.",
    fr: "J'ai faim.",
    diff: "easy",
  },
  {
    s: "She [___] thirty years old.",
    a: "a trente ans",
    o: ["a trente ans", "est trente ans", "a trente", "est trente"],
    ctx: "Sharing a friend's age at dinner.",
    fr: "Elle a trente ans.",
    diff: "easy",
  },
  {
    s: "[___] a restaurant here.",
    a: "Il y a",
    o: ["Il y a", "C'est", "Il est", "Il a"],
    ctx: "Pointing out a place to eat to a tourist.",
    fr: "Il y a un restaurant ici.",
    diff: "easy",
  },
  {
    s: "We [___] cold.",
    a: "avons froid",
    o: ["avons froid", "sommes froid", "ont froid", "avons chaud"],
    ctx: "Outdoor café in October. The wind picks up.",
    fr: "Nous avons froid.",
    diff: "easy",
  },
  {
    s: "He [___] of dogs.",
    a: "a peur",
    o: ["a peur", "est peur", "ont peur", "a chaud"],
    ctx: "Why your friend crossed the street.",
    fr: "Il a peur des chiens.",
    diff: "easy",
  },
  {
    s: "[___] are you?",
    a: "Quel âge",
    o: ["Quel âge", "Comment âge", "Combien âge", "Où âge"],
    ctx: "Asking someone's age politely. French uses 'have' for age.",
    fr: "Tu as quel âge ?",
    diff: "medium",
  },
];

export const fillBlanks4: FillItem[] = [
  {
    s: "J'___ vingt ans.",
    a: "ai",
    o: ["ai", "suis", "es", "as"],
    ctx: "Stating your age — French says 'I have twenty years.'",
    diff: "easy",
  },
  {
    s: "Il y ___ un café ici.",
    a: "a",
    o: ["a", "est", "ai", "as"],
    ctx: "Completing 'there is' — French uses avoir, not être.",
    diff: "easy",
  },
];
