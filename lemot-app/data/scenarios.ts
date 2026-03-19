import type { Scenario } from "@/lib/types";

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    label: "At the Caf\u00e9",
    icon: "Coffee",
    desc: "Order drinks",
    starter:
      "Bonjour ! Bienvenue au Caf\u00e9 de la Montagne. Qu'est-ce que je vous sers ?",
  },
  {
    id: "doctor",
    label: "At the Doctor",
    icon: "Stethoscope",
    desc: "Describe symptoms",
    starter:
      "Bonjour, je suis le docteur Martin. Qu'est-ce qui ne va pas ?",
  },
  {
    id: "job",
    label: "Job Interview",
    icon: "Briefcase",
    desc: "Introduce yourself",
    starter:
      "Bonjour, merci d'\u00eatre venu. Pouvez-vous vous pr\u00e9senter ?",
  },
];
