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
import { PRACTICE_SEEDS } from "../../content/practice/seeds";

const words = (s: string) => s.trim().split(/\s+/).length;

/**
 * Empty, and kept as a named place rather than deleted: it is where a genuine
 * exception would go if one ever existed. The one entry it used to hold was
 * s18-fill-which-question, whose correct option was the whole finished question
 * "Est-ce que c'est ici ?" against two short ones. That was fixed rather than
 * excused: the screen now asks which OPENER does the job, so the options are
 * "Est-ce que", "C'est ou" and "C'est", and the length tell went with it.
 */
const ACCEPTED_LENGTH_TELLS = new Set<string>([]);

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

/**
 * The per-question rule above catches a blatant outlier. It cannot catch the
 * thing the founder actually felt, which is a HABIT: if the correct answer
 * tends to be the longest one, "pick the longest" becomes a strategy, and a
 * learner can score without reading French at all.
 *
 * Measured across every multiple choice on the path, lessons and Practice
 * together, that strategy used to win 48% of the time against a 33% baseline
 * for three options. Half of the listening questions handed it over: the right
 * answer was a full description ("Greeted, then announced themselves, then
 * ordered.") and the wrong ones were terse ("Ordered straight away.").
 *
 * The bound is deliberately loose. Some length differences are the lesson --
 * est-ce que really is longer than what it competes with, and a length-matched
 * wrong option there would mean inventing French that nobody says. This asks
 * only that length stop being a shortcut.
 */
describe("length is not a strategy", () => {
  const questions: { where: string; options: { text: string; correct: boolean }[] }[] = [];
  for (const l of V1_LESSONS as any[]) {
    if (l.number < 1 || l.number > 10) continue;
    for (const s of flattenLessonScreens(l) as any[]) {
      const opts = s.payload?.options;
      if (!Array.isArray(opts) || opts.length < 2) continue;
      questions.push({
        where: `${l.id}/${s.id}`,
        options: opts.map((o: any) => ({ text: String(o.text), correct: !!o.isCorrect })),
      });
    }
  }
  for (const seed of PRACTICE_SEEDS as any[]) {
    const opts = seed.exercise?.payload?.options;
    if (!Array.isArray(opts) || opts.length < 2) continue;
    questions.push({
      where: seed.id,
      options: opts.map((o: any) => ({ text: String(o.text), correct: !!o.isCorrect })),
    });
  }

  test('"always pick the longest" does not beat guessing by much', () => {
    let wins = 0;
    for (const q of questions) {
      const correct = q.options.find((o) => o.correct);
      if (!correct) continue;
      const lengths = q.options.map((o) => o.text.length);
      const longest = Math.max(...lengths);
      if (correct.text.length === longest && lengths.filter((l) => l === longest).length === 1) {
        wins += 1;
      }
    }
    const rate = wins / questions.length;
    assert(
      rate <= 0.4,
      `picking the longest option wins ${wins}/${questions.length} = ${Math.round(rate * 100)}% ` +
        "of the time; length has become a shortcut past the French",
    );
  });

  test('"always pick the shortest" is not a strategy either', () => {
    let wins = 0;
    for (const q of questions) {
      const correct = q.options.find((o) => o.correct);
      if (!correct) continue;
      const lengths = q.options.map((o) => o.text.length);
      const shortest = Math.min(...lengths);
      if (correct.text.length === shortest && lengths.filter((l) => l === shortest).length === 1) {
        wins += 1;
      }
    }
    const rate = wins / questions.length;
    assert(rate <= 0.4, `picking the shortest option wins ${Math.round(rate * 100)}% of the time`);
  });

  test("every wrong option says why it is wrong", () => {
    // A distractor with no reason cannot teach anything when it is chosen.
    const silent: string[] = [];
    for (const l of V1_LESSONS as any[]) {
      if (l.number < 1 || l.number > 10) continue;
      for (const s of flattenLessonScreens(l) as any[]) {
        for (const o of s.payload?.options ?? []) {
          if (!o.isCorrect && !String(o.trapReason ?? "").trim()) {
            silent.push(`${l.id}/${s.id}: "${o.text}"`);
          }
        }
      }
    }
    assert(silent.length === 0, silent.join("; "));
  });
});
