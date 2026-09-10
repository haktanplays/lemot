/**
 * Nothing is required as output before it has had a teaching encounter.
 *
 * Founder example: "Désolé, je dois partir." Good French is not the bar. The
 * learner is asked to produce it in L7, and until this pass the only place
 * "désolé" had ever appeared was a line in that lesson's Showcase.
 *
 * Showcase does not count, and the codebase already says why: it is a BREADTH
 * surface, it grades nothing and emits no evidence, because reading a list is
 * not learning. A word met only there has been seen, not taught. Declaring an
 * item in `learningItems` does not count either -- that is bookkeeping, not an
 * encounter the learner has.
 *
 * What counts is a screen where the learner meets the piece with something said
 * about it: a meet card, an insight card, or a fill whose reveal explains the
 * form. After that, recombination is fair game, which is the other half of the
 * rule: teach the pieces, then ask for the combination. This checks the pieces,
 * never the whole sentence, so it cannot be satisfied by drilling finished
 * lines.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";

const norm = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.!?,;:«»"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Words put in front of the learner with something said about them. */
function taughtWords(screen: { type: string; payload: Record<string, never> }): string[] {
  const teaching = new Set(["meet-card", "insight-card", "fill-with-traps"]);
  if (!teaching.has(screen.type)) return [];
  const p = screen.payload;
  const bits: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string" && v.trim()) bits.push(v);
  };
  push(p.fr);
  push(p.title);
  push(p.body);
  for (const h of (p.highlights ?? []) as { text?: string }[]) push(h.text);
  for (const e of (p.examples ?? []) as { fr?: string; note?: string }[]) {
    push(e.fr);
    push(e.note);
  }
  for (const o of (p.options ?? []) as { text?: string }[]) push(o.text);
  const reveal = (p.reveal ?? {}) as Record<string, string>;
  for (const k of ["short", "natural", "explanation"]) push(reveal[k]);
  return bits.flatMap((b) => norm(b).split(" ")).filter(Boolean);
}

/** French the learner MUST produce on this screen. */
function requiredFrench(screen: { type: string; payload: Record<string, never> }): string {
  const p = screen.payload;
  if (screen.type === "weave") return String((p.expectedAnswers ?? [])[0] ?? "");
  if (screen.type === "say-it-your-way") return String(p.modelAnswer ?? "");
  return "";
}

describe("teach the pieces before asking for them", () => {
  test("no required production contains French the learner has never met", () => {
    const met = new Set<string>();
    const offences: string[] = [];

    for (const lesson of [...V1_LESSONS].sort((a, b) => a.number - b.number)) {
      if (lesson.number < 0 || lesson.number > 10) continue;

      // Within a lesson, order matters: a screen can only lean on what came
      // before it, which is why this walks the flattened sequence rather than
      // gathering the lesson's vocabulary first.
      for (const screen of flattenLessonScreens(lesson)) {
        const s = screen as unknown as { type: string; payload: Record<string, never> };
        const fr = requiredFrench(s);
        if (fr) {
          const missing = norm(fr)
            .split(" ")
            .filter((w) => w && !met.has(w));
          if (missing.length > 0) {
            offences.push(
              `${lesson.id}/${(screen as { id: string }).id} requires "${fr}" but never taught: ${missing.join(", ")}`,
            );
          }
        }
        for (const w of taughtWords(s)) met.add(w);
      }
    }

    assert(offences.length === 0, offences.join("\n"));
  });

  test("the rule is about pieces, not about drilling whole sentences", () => {
    // If this ever needed every REQUIRED SENTENCE to have been shown first, it
    // would be enforcing memorisation -- the exact thing the brief forbids. So
    // it must be possible to be asked for a combination never displayed, and
    // the path must actually contain some.
    let novelCombinations = 0;
    const shown = new Set<string>();
    for (const lesson of [...V1_LESSONS].sort((a, b) => a.number - b.number)) {
      if (lesson.number < 0 || lesson.number > 10) continue;
      for (const screen of flattenLessonScreens(lesson)) {
        const s = screen as unknown as { type: string; payload: Record<string, never> };
        const fr = requiredFrench(s);
        if (fr && !shown.has(norm(fr))) novelCombinations += 1;
        for (const w of taughtWords(s)) shown.add(w);
        if (fr) shown.add(norm(fr));
      }
    }
    assert(
      novelCombinations >= 20,
      `only ${novelCombinations} productions ask for a combination the learner has not been shown`,
    );
  });
});
