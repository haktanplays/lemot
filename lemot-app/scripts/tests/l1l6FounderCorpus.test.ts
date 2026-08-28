/**
 * L1-L6 learner-visible corpus contracts (founder-usable phase).
 *
 * The existing guards check that a lesson is WELL FORMED. None of them checks
 * that it is worth playing, so a lesson could be reduced to four sentences and
 * one repeated production without a single validator objecting — which is
 * precisely the state L2 and L5 were in. These tests protect the learner-facing
 * result of this phase, not its mechanics.
 *
 * Deliberately NOT a new validation subsystem: no new module, no severity
 * taxonomy, no reporting layer. Ratchets over the six lessons the founder
 * actually walks, expressed as floors and pins that may only improve.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { productionActions } from "../../content/lessons/productionQuality";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

const PATH: readonly Lesson[] = V1_LESSONS.filter(
  (l) => l.number >= 1 && l.number <= 6,
).sort((a, b) => a.number - b.number);

/**
 * Normalize a French string the way the shipped Weave matcher does: this is
 * about how many DISTINCT sentences the learner meets, so casing, accents and
 * orthographic punctuation must not inflate the count.
 */
function normalize(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** A full sentence, not a fragment: two or more words. Fragments are chips. */
function isSentence(text: string): boolean {
  return normalize(text).split(" ").filter((w) => w.length > 0).length >= 2;
}

/** Every French sentence the learner can actually SEE while playing a screen. */
function visibleSentences(screen: LessonScreen): string[] {
  const out: string[] = [];
  const p = screen.payload as Record<string, unknown>;
  const push = (v: unknown): void => {
    if (typeof v === "string" && isSentence(v)) out.push(normalize(v));
  };
  switch (screen.type) {
    case "meet-card":
      push(p.fr);
      break;
    case "insight-card":
      for (const e of (p.examples as { fr?: string }[]) ?? []) push(e.fr);
      break;
    case "fill-with-traps":
      for (const o of (p.options as { text?: string }[]) ?? []) push(o.text);
      push((p.reveal as { natural?: string })?.natural);
      break;
    case "weave":
      for (const a of (p.expectedAnswers as string[]) ?? []) push(a);
      push((p.reveal as { modelAnswer?: string })?.modelAnswer);
      break;
    case "say-it-your-way":
      push(p.modelAnswer);
      for (const a of ((p.reveal as { naturalAlternatives?: string[] })?.naturalAlternatives) ?? [])
        push(a);
      break;
    case "natural-reveal":
      push(p.modelAnswer);
      for (const a of (p.naturalAlternatives as string[]) ?? []) push(a);
      break;
    default:
      break;
  }
  return out;
}

const sentencesOf = (lesson: Lesson): Set<string> =>
  new Set(lesson.screens.flatMap(visibleSentences));

/** Screen families in play order, for rhythm assertions. */
const familiesOf = (lesson: Lesson): string[] => lesson.screens.map((s) => s.type);

describe("L1-L6 is a path the founder can actually walk", () => {
  test("the six lessons are present, ordered, and prerequisite-chained", () => {
    assertEqual(
      PATH.map((l) => l.number),
      [1, 2, 3, 4, 5, 6],
      "L1-L6 all shipped",
    );
    for (let i = 1; i < PATH.length; i += 1) {
      assertEqual(
        PATH[i].prerequisites,
        [PATH[i - 1].id],
        `${PATH[i].id} follows ${PATH[i - 1].id}`,
      );
    }
  });

  test("no lesson on the path is thin", () => {
    // Four sentences is a demonstration, not a lesson, and that is what L2 was.
    // Pinned rather than bounded, so a lesson that quietly loses variety fails
    // even while staying above the floor. Measured on the shipped lessons: the
    // same walk over the pre-phase content read [11, 4, 9, 8, 6, 11]. L2 stays
    // the lowest by canon rather than by neglect, since it owns one completion
    // (ici) and one demand and therefore grows by recombination only.
    const counts = PATH.map((l) => sentencesOf(l).size);
    assertEqual(counts, [11, 6, 9, 11, 9, 15], "distinct visible sentences, L1-L6");
    for (const n of counts) assert(n >= 6, `every lesson clears the floor of six, got ${n}`);
  });

  test("every lesson asks the learner to produce, more than once", () => {
    for (const lesson of PATH) {
      const actions = productionActions(lesson);
      assert(
        actions.length >= 3,
        `${lesson.id} has ${actions.length} production actions; the path needs at least three per lesson`,
      );
      const distinctAnswers = new Set(actions.map((a) => a.answers.join("|")));
      assert(
        distinctAnswers.size >= 3,
        `${lesson.id} repeats the same reference answer across its productions`,
      );
    }
  });

  test("every lesson ends with a recap and opens with its goal", () => {
    for (const lesson of PATH) {
      assertEqual(lesson.screens[0].type, "insight-card", `${lesson.id} opens on its goal card`);
      assertEqual(
        lesson.screens[lesson.screens.length - 1].type,
        "recap",
        `${lesson.id} closes on a recap`,
      );
    }
  });
});

describe("L1-L6 lessons do not read as the same template", () => {
  test("each lesson uses at least five screen families", () => {
    for (const lesson of PATH) {
      const families = new Set(familiesOf(lesson));
      assert(
        families.size >= 5,
        `${lesson.id} uses only ${families.size} screen families (${[...families].join(", ")})`,
      );
    }
  });

  test("no lesson runs three screens of the same family back to back", () => {
    // A run of three fills or three weaves is what makes a lesson read as a
    // drill sheet regardless of how good the individual screens are.
    for (const lesson of PATH) {
      const families = familiesOf(lesson);
      for (let i = 2; i < families.length; i += 1) {
        assert(
          !(families[i] === families[i - 1] && families[i] === families[i - 2]),
          `${lesson.id} runs three ${families[i]} screens in a row at index ${i - 2}`,
        );
      }
    }
  });

  test("each lesson carries a low-support production that supplies nothing", () => {
    // PQ-2 already forbids a lesson whose least-scaffolded action is
    // constitutive. This is the stronger claim the phase actually delivered:
    // somewhere in every lesson the learner produces with no tray at all.
    for (const lesson of PATH) {
      const unsupplied = lesson.screens.filter((s) => {
        if (s.type === "say-it-your-way") return true;
        if (s.type !== "weave") return false;
        const pieces = s.payload.suggestedPieces ?? [];
        return s.payload.weaveType === "open" && pieces.every((p) => p.required !== true);
      });
      assert(
        unsupplied.length >= 1,
        `${lesson.id} never asks for French without offering the pieces`,
      );
    }
  });
});

describe("L1-L6 is not dominated by a handful of demo strings", () => {
  test("no single sentence is the expected answer of more than three productions", () => {
    // The stagnation the phase was asked to break: bonjour, je voudrais un
    // café, je suis ici and j'ai une question recurring until the path reads as
    // one scene. Recycling is the point, so this bounds it rather than banning
    // it, and it counts only ANSWERS, never exposure.
    const byAnswer = new Map<string, string[]>();
    for (const lesson of PATH) {
      for (const action of productionActions(lesson)) {
        for (const answer of action.answers) {
          if (answer === "") continue;
          byAnswer.set(answer, [
            ...(byAnswer.get(answer) ?? []),
            `${lesson.id}/${action.screenId}`,
          ]);
        }
      }
    }
    const overused = [...byAnswer.entries()]
      .filter(([, where]) => where.length > 3)
      .map(([answer, where]) => `${answer} (${where.join(", ")})`)
      .sort();
    assertEqual(overused, [], "no answer is asked for more than three times across L1-L6");
  });

  test("the path's sentence corpus keeps growing", () => {
    // Each lesson must contribute something the learner has not already seen.
    // An integration lesson recombines, so its NEW sentences are combinations;
    // a lesson that adds none is a lesson that showed nothing.
    const seen = new Set<string>();
    for (const lesson of PATH) {
      const fresh = [...sentencesOf(lesson)].filter((s) => !seen.has(s));
      assert(
        fresh.length >= 3,
        `${lesson.id} shows only ${fresh.length} sentence(s) the path has not shown already`,
      );
      for (const s of sentencesOf(lesson)) seen.add(s);
    }
    // The whole path's corpus went 40 -> 47 distinct sentences in this phase.
    // The floor sits above the pre-phase figure on purpose: a floor below it
    // would have passed the very state this phase was opened to fix.
    assert(
      seen.size >= 45,
      `L1-L6 shows ${seen.size} distinct French sentences; the path should be wider than that`,
    );
  });
});

describe("the screens this phase added are wired, not just present", () => {
  const screenIds = new Map(PATH.map((l) => [l.id, new Set(l.screens.map((s) => s.id))]));
  const ADDED: Readonly<Record<string, readonly string[]>> = {
    "v1-lesson-002": [
      "s04b-fill-which-engine",
      "s05b-fill-which-opener",
      "s06b-weave-arrive-and-order",
    ],
    "v1-lesson-004": [
      "s06b-fill-opener-for-a-question",
      "s06c-weave-open-here-and-hungry",
      "s07b-natural-reveal-two-engines",
    ],
    "v1-lesson-005": [
      "s02b-fill-un-family",
      "s06b-weave-open-order-and-ask",
      "s07b-natural-reveal-packages",
    ],
    "v1-lesson-006": [
      "s03b-fill-right-room",
      "s05b-fill-did-not-catch-it",
      "s05c-weave-excusez-moi-je-ne-comprends-pas",
    ],
  };

  test("every added screen is still on its lesson", () => {
    for (const [lessonId, ids] of Object.entries(ADDED)) {
      for (const id of ids) {
        assert(screenIds.get(lessonId)?.has(id) === true, `${lessonId}/${id} is missing`);
      }
    }
  });

  test("every fill on the path has exactly one correct option and reasoned traps", () => {
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        if (screen.type !== "fill-with-traps") continue;
        const where = `${lesson.id}/${screen.id}`;
        const correct = screen.payload.options.filter((o) => o.isCorrect);
        assertEqual(correct.length, 1, `${where} has exactly one correct option`);
        assertEqual(
          screen.payload.answer,
          [correct[0].id],
          `${where} answer names the correct option`,
        );
        for (const option of screen.payload.options) {
          if (option.isCorrect) continue;
          assert(
            (option.trapReason ?? "").trim().length > 0,
            `${where} trap "${option.id}" gives the learner no reason`,
          );
        }
        assert(
          (screen.payload.reveal.short ?? "").trim().length > 0,
          `${where} reveals nothing after the answer`,
        );
      }
    }
  });

  test("every weave and say-it on the path can show an answer", () => {
    // A production screen with no model answer renders an empty reveal, which
    // reads to the learner as a broken card rather than as a lesson.
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        const where = `${lesson.id}/${screen.id}`;
        if (screen.type === "weave") {
          assert(
            screen.payload.expectedAnswers.length > 0,
            `${where} expects no answer`,
          );
          assert(
            (screen.payload.reveal.modelAnswer ?? "").trim().length > 0,
            `${where} has no model answer to reveal`,
          );
        }
        if (screen.type === "say-it-your-way") {
          assert(
            (screen.payload.modelAnswer ?? "").trim().length > 0,
            `${where} has no model answer`,
          );
        }
      }
    }
  });

  test("every natural-reveal on the path actually reveals something", () => {
    for (const lesson of PATH) {
      for (const screen of lesson.screens) {
        if (screen.type !== "natural-reveal") continue;
        const p = screen.payload;
        assert(
          (p.explanation ?? "").trim().length > 0 ||
            (p.modelAnswer ?? "").trim().length > 0,
          `${lesson.id}/${screen.id} renders an empty reveal`,
        );
        assert(
          (p.naturalAlternatives ?? []).every((a) => a.trim().length > 0),
          `${lesson.id}/${screen.id} lists an empty alternative`,
        );
      }
    }
  });
});
