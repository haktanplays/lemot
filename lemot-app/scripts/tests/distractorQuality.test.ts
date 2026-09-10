/**
 * A distractor must compete, not decorate.
 *
 * Founder feedback: some choices were obviously wrong, with the correct answer
 * long and situationally perfect while the alternatives were short and
 * unrelated. That lets a learner pick correctly without reading any French,
 * which scores as knowledge and teaches nothing.
 */
import { describe, test, assert } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";

const words = (s: string) => s.trim().split(/\s+/).length;

/**
 * Known and accepted: `est-ce que` is simply a longer form than the answers it
 * competes with, and a length-matched wrong option would mean authoring French
 * that is not French. Listed rather than silently excluded.
 */
const ACCEPTED_LENGTH_TELLS = new Set(["s18-fill-which-question"]);

describe("choices compete on meaning, not on length", () => {
  test("the correct answer is not the obviously longest option", () => {
    const offenders: string[] = [];
    for (const l of V1_LESSONS as any[]) {
      if (l.number < 1 || l.number > 10) continue;
      for (const s of flattenLessonScreens(l) as any[]) {
        if (s.type !== "fill-with-traps") continue;
        if (ACCEPTED_LENGTH_TELLS.has(s.id)) continue;
        const opts: any[] = s.payload.options ?? [];
        const correct = opts.find((o) => o.isCorrect);
        const wrong = opts.filter((o) => !o.isCorrect);
        if (!correct || wrong.length === 0) continue;
        const cw = words(correct.text);
        const longestWrong = Math.max(...wrong.map((o) => words(o.text)));
        if (cw >= 3 && cw - longestWrong >= 2) offenders.push(`L${l.number}/${s.id}`);
      }
    }
    assert(
      offenders.length === 0,
      `the correct answer can be picked by length alone on: ${offenders.join(", ")}`,
    );
  });

  test("every distractor explains why it is wrong", () => {
    for (const l of V1_LESSONS as any[]) {
      if (l.number < 1 || l.number > 10) continue;
      for (const s of flattenLessonScreens(l) as any[]) {
        if (s.type !== "fill-with-traps") continue;
        for (const o of (s.payload.options ?? []) as any[]) {
          if (o.isCorrect) continue;
          assert(
            typeof o.trapReason === "string" && o.trapReason.trim().length > 0,
            `${l.id}/${s.id}: "${o.text}" is wrong without saying why`,
          );
        }
      }
    }
  });
});
