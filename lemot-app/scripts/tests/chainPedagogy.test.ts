/**
 * A chain step must not hand over the next step's answer.
 *
 * The multi-step deadlock was a runtime bug and is fixed. This is the
 * pedagogical half of the same screen: eleven step pairs offered the finished
 * sentence as a clickable option and then, one screen later, asked the learner
 * to type it. L7's own comments called the second of those "the lesson's
 * summit, and its least-scaffolded screen" while the learner had read the
 * answer moments earlier, in the same scene, with the same wording.
 *
 * The line drawn here is between two shapes that look alike and are not:
 *
 *   SLOT FILL then production   the learner supplies a missing word, sees the
 *                               sentence come together, and then produces it.
 *                               That is teach then scaffold then produce, and
 *                               teach-before-ask REQUIRES it. Allowed.
 *
 *   WHOLE-SENTENCE CHOICE then  the learner picks the finished sentence from a
 *   the same sentence typed     list and copies it out. Nothing is retrieved.
 *                               Not allowed.
 *
 * So the rule is narrow on purpose: it forbids the copy, not the ladder.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";

const norm = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[.!?,;:«»"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

type Step = { id: string; type: string; payload: Record<string, unknown> };

/** What the learner must produce or choose on this step. */
function answerOf(step: Step): string {
  const p = step.payload as Record<string, any>;
  if (step.type === "weave") return String((p.expectedAnswers ?? [])[0] ?? "");
  if (step.type === "say-it-your-way") return String(p.modelAnswer ?? "");
  if (step.type === "fill-with-traps") {
    const id = (p.answer ?? [])[0];
    const opt = (p.options ?? []).find((o: { id: string }) => o.id === id);
    return String((opt as { text?: string })?.text ?? "");
  }
  return "";
}

/** Text this step puts in front of the learner as a finished, correct answer. */
function handsOver(step: Step): string[] {
  const p = step.payload as Record<string, any>;
  const out: string[] = [];
  if (step.type === "fill-with-traps") {
    const id = (p.answer ?? [])[0];
    const opt = (p.options ?? []).find((o: { id: string }) => o.id === id);
    const text = (opt as { text?: string })?.text;
    if (text) out.push(text);
  }
  const reveal = (p.reveal ?? {}) as Record<string, string>;
  for (const key of ["short", "natural", "modelAnswer"]) {
    if (reveal[key]) out.push(reveal[key]);
  }
  return out;
}

/** A blank inside a printed sentence, rather than a menu of finished answers. */
function isSlotFill(step: Step): boolean {
  const p = step.payload as Record<string, unknown>;
  return p.sentenceBefore !== undefined || p.sentenceAfter !== undefined;
}

const PATH = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);

describe("a chain step never hands over the next step's answer", () => {
  test("no production step types what the step before it displayed", () => {
    const offences: string[] = [];
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        if (screen.type !== "activity-chain") continue;
        const steps = (screen.payload as { steps: Step[] }).steps;
        for (let i = 1; i < steps.length; i += 1) {
          const step = steps[i];
          if (step.type !== "weave" && step.type !== "say-it-your-way") continue;
          const target = norm(answerOf(step));
          if (target.split(" ").length < 2) continue;
          const before = steps[i - 1];
          // The scaffold ladder is allowed; only the copy is not.
          if (isSlotFill(before)) continue;
          if (handsOver(before).map(norm).includes(target)) {
            offences.push(
              `${lesson.id}/${screen.id}: ${before.id} displays "${answerOf(step)}" and ${step.id} then asks for it`,
            );
          }
        }
      }
    }
    assert(offences.length === 0, offences.join("\n"));
  });

  test("the ladder itself is still there, so this rule did not just delete it", () => {
    // A guard that forbids everything is not a guard. Slot fill into scaffolded
    // production is the shape the path is built on, and it must still exist.
    let ladders = 0;
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        if (screen.type !== "activity-chain") continue;
        const steps = (screen.payload as { steps: Step[] }).steps;
        for (let i = 1; i < steps.length; i += 1) {
          if (steps[i].type === "weave" && isSlotFill(steps[i - 1])) ladders += 1;
        }
      }
    }
    assert(ladders >= 4, `only ${ladders} scaffold-then-produce ladders left on the path`);
  });
});
