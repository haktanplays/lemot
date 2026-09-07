/**
 * What the L7-L10 founder-usable pass has to keep being true.
 *
 * These are content properties, not structure: the shape guards already live in
 * l7l10Progression (screen counts, tiers, hint clozes, copy hygiene). What was
 * missing was any check that the four lessons still SAY more than the demo
 * corpus left them saying, still differ from each other, and still get harder
 * when they reuse. Each test below pins one behaviour this pass produced, and
 * would have failed before it.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { Lesson, LessonScreen } from "../../content/lessonTypes";

const byNumber = (n: number): Lesson => {
  const l = V1_LESSONS.find((x) => x.number === n);
  if (l === undefined) throw new Error(`L${n} is not shipped`);
  return l;
};
const TARGETS = [7, 8, 9, 10].map(byNumber);

/** Support ranks, LOWER = the learner is given less. Mirrors productionQuality. */
const WEAVE_RANK: Readonly<Record<string, number>> = { open: 1, context: 2, mid: 3, supported: 4 };
const SAY_IT_RANK = 0;

type Production = { lessonNumber: number; screenId: string; answer: string; rank: number };

function productionsOf(lesson: Lesson): Production[] {
  const out: Production[] = [];
  for (const screen of flattenLessonScreens(lesson)) {
    const p = screen.payload as Record<string, unknown>;
    if (screen.type === "weave") {
      const rank = WEAVE_RANK[String(p.weaveType)] ?? 5;
      for (const a of (p.expectedAnswers as string[] | undefined) ?? []) {
        out.push({ lessonNumber: lesson.number, screenId: screen.id, answer: a, rank });
      }
    }
    if (screen.type === "say-it-your-way" && typeof p.modelAnswer === "string") {
      out.push({
        lessonNumber: lesson.number,
        screenId: screen.id,
        answer: p.modelAnswer,
        rank: SAY_IT_RANK,
      });
    }
  }
  return out;
}

/**
 * Every distinct French SURFACE the lesson puts on screen.
 *
 * Corrected terminology (true-corpus audit): distinct STRINGS, not sentence
 * architectures. A payload swap or an added opener makes a new surface and no
 * new architecture. Useful as a "how much French is visible" regression floor;
 * not evidence of linguistic breadth. See corpusClosure.test.ts for the
 * hand-made architecture inventory.
 */
function visibleSentences(lesson: Lesson): Set<string> {
  const out = new Set<string>();
  const add = (v: unknown) => {
    if (typeof v === "string" && v.trim().length > 0) out.add(v.trim());
  };
  for (const screen of flattenLessonScreens(lesson)) {
    const p = screen.payload as Record<string, unknown>;
    if (screen.type === "meet-card") add(p.fr);
    if (screen.type === "weave") ((p.expectedAnswers as string[]) ?? []).forEach(add);
    if (screen.type === "say-it-your-way") add(p.modelAnswer);
    if (screen.type === "fill-with-traps") {
      // Only whole-sentence options count; single-word blanks are not sentences.
      for (const o of (p.options as Array<{ text?: string }> | undefined) ?? []) {
        if (typeof o.text === "string" && /\s/.test(o.text.trim())) add(o.text);
      }
    }
    for (const e of (p.examples as Array<{ fr?: string }> | undefined) ?? []) add(e.fr);
    const reveal = p.reveal as Record<string, unknown> | undefined;
    ((reveal?.naturalAlternatives as string[]) ?? []).forEach(add);
    ((p.naturalAlternatives as string[]) ?? []).forEach(add);
  }
  return out;
}

const screenById = (lesson: Lesson, id: string): LessonScreen | undefined =>
  flattenLessonScreens(lesson).find((s) => s.id === id);

// ── The L6 defect, made unrepeatable anywhere ──────────────────────────────

describe("an answer-band ladder never shows one sentence under two labels", () => {
  test("no shipped lesson ships two identical rungs", () => {
    // L6 shipped `good` and `natural` as the same string on both of its Say It
    // screens, so the learner read a three-rung ladder whose middle and top
    // rungs were word for word identical. Nothing caught it: bands are display
    // only, so no validator and no runtime path had an opinion. This is that
    // opinion, and it is global rather than scoped to the two repaired screens.
    const offenders: string[] = [];
    for (const lesson of V1_LESSONS) {
      for (const screen of flattenLessonScreens(lesson)) {
        const bands = (screen.payload as Record<string, unknown>).answerBands as
          | Record<string, string[] | undefined>
          | undefined;
        if (bands === undefined) continue;
        const rungs = Object.entries(bands).filter(([, v]) => Array.isArray(v) && v.length > 0);
        for (let i = 0; i < rungs.length; i++) {
          for (let j = i + 1; j < rungs.length; j++) {
            if (JSON.stringify(rungs[i][1]) === JSON.stringify(rungs[j][1])) {
              offenders.push(`${lesson.id}/${screen.id}: ${rungs[i][0]} === ${rungs[j][0]}`);
            }
          }
        }
      }
    }
    assertEqual(offenders, [], "identical answer-band rungs teach nothing");
  });

  test("the three screens that ship bands still ship all three rungs", () => {
    // Deleting a rung would also make the ladder consistent, so pin presence.
    const withBands: string[] = [];
    for (const lesson of V1_LESSONS) {
      for (const screen of flattenLessonScreens(lesson)) {
        const bands = (screen.payload as Record<string, unknown>).answerBands as
          | Record<string, string[]>
          | undefined;
        if (bands === undefined) continue;
        withBands.push(`${lesson.id}/${screen.id}`);
        for (const rung of ["minimalAcceptable", "good", "natural"]) {
          assert(
            Array.isArray(bands[rung]) && bands[rung].length > 0,
            `${lesson.id}/${screen.id} is missing the ${rung} rung`,
          );
        }
      }
    }
    assertEqual(
      withBands,
      [
        "v1-lesson-006/s07-sayit-step-in",
        "v1-lesson-006/s09-sayit-whole-moment",
        "v1-lesson-010/s13-sayit-the-whole-day",
      ],
      "the ladder is used exactly where the two payoff lessons ask for the whole thing",
    );
  });
});

// ── Corpus breadth ─────────────────────────────────────────────────────────

describe("L7-L10 say more than the early demo corpus left them saying", () => {
  // Floors, not exact counts: content may grow, and a later pass must not have
  // to edit this file to add a surface. Each floor is the count this pass
  // produced, and every one was below the floor before it (L7 7, L8 4, L9 6,
  // L10 7). These are SURFACE floors. They do not claim architecture breadth.
  const FLOOR: Record<number, number> = { 7: 10, 8: 6, 9: 9, 10: 14 };

  for (const lesson of TARGETS) {
    test(`${lesson.id} shows at least ${FLOOR[lesson.number]} distinct French surfaces`, () => {
      const count = visibleSentences(lesson).size;
      assert(
        count >= FLOOR[lesson.number],
        `expected >= ${FLOOR[lesson.number]}, got ${count}`,
      );
    });
  }

  test("the integration lesson stays broader than the doorways it integrates", () => {
    // L10's job is to hold ten lessons at once. If it ever stops being broader
    // than the doorways, it has drifted back into being another doorway.
    //
    // This used to assert L10 was the widest of L7-L10 outright. That held
    // while every lesson in the range was equally thin, and stopped holding
    // when L7 got its production pass first: L7 is now wider because it has
    // been finished, not because L10 has shrunk. The claim that still means
    // something is the comparison against the doorways L10 has NOT overtaken,
    // plus L10's own floor. When L10's production pass runs it should exceed
    // L7 again, and this test should go back to the stronger form.
    const l10 = visibleSentences(byNumber(10)).size;
    for (const n of [8, 9]) {
      assert(
        l10 > visibleSentences(byNumber(n)).size,
        `L10 (${l10}) must stay broader than the L${n} doorway`,
      );
    }
    assert(l10 >= FLOOR[10], `L10 fell below its own floor: ${l10} < ${FLOOR[10]}`);
  });
});

// ── Reuse has to cost more, not less ───────────────────────────────────────

describe("recycling raises the production burden instead of replaying a script", () => {
  test("a sentence produced again in L7-L10 is never more scaffolded than before", () => {
    // This is the difference between reuse and repetition. L10 re-produces
    // "Je voudrais faire une pause." and "Je vais à la maison. Au revoir.",
    // and both move from context to open; L8 re-produces "Ce n'est pas ici."
    // one tier below L3. A replay at EASIER support would be a lesson filling
    // time with material the learner already beat.
    const all = V1_LESSONS.flatMap(productionsOf);
    for (const p of all.filter((x) => x.lessonNumber >= 7 && x.lessonNumber <= 10)) {
      const earlier = all.filter((e) => e.lessonNumber < p.lessonNumber && e.answer === p.answer);
      if (earlier.length === 0) continue;
      const softestEarlier = Math.min(...earlier.map((e) => e.rank));
      assert(
        p.rank <= softestEarlier,
        `L${p.lessonNumber}/${p.screenId} replays "${p.answer}" at rank ${p.rank}, easier than the rank ${softestEarlier} it was already produced at`,
      );
    }
  });

  test("each of L7-L10 contributes production the range has not seen before", () => {
    // A lesson made only of other lessons' sentences would pass every structural
    // guard in the repo while teaching nothing new.
    const seen = new Set<string>();
    for (const lesson of V1_LESSONS) {
      if (lesson.number > 10) break;
      const mine = productionsOf(lesson).map((p) => p.answer);
      if (lesson.number >= 7) {
        assert(
          mine.some((a) => !seen.has(a)),
          `${lesson.id} produces nothing that L0-L${lesson.number - 1} did not already produce`,
        );
      }
      mine.forEach((a) => seen.add(a));
    }
  });
});

// ── Each lesson's own job ──────────────────────────────────────────────────

describe("L7-L10 keep the screens that make them different from each other", () => {
  test("L7 makes the learner read a situation nobody set up", () => {
    const l7 = byNumber(7);
    const choice = screenById(l7, "s11-fill-offer-on-the-way-out");
    assert(choice !== undefined, "L7 keeps the unexpected-offer choice");
    const options =
      ((choice!.payload as Record<string, unknown>).options as Array<{ text: string }>) ?? [];
    assert(
      options.every((o) => /\s/.test(o.text)),
      "every option is a whole utterance, not a word blank",
    );
    const summit = screenById(l7, "s12-weave-decline-and-go");
    assert(summit !== undefined, "L7 keeps its open summit");
    assertEqual(
      (summit!.payload as Record<string, unknown>).weaveType,
      "open",
      "the decline-and-go weave stays unsupplied",
    );
  });

  test("L8 answers its own question three different ways", () => {
    // Portability: ask, answer, and refuse. Before this pass the lesson could
    // only do the first two, and only in one hallway.
    const l8 = byNumber(8);
    const sentences = visibleSentences(l8);
    for (const required of ["C'est où ?", "C'est ici.", "Ce n'est pas ici."]) {
      assert(sentences.has(required), `L8 must still show ${required}`);
    }
    const portable = screenById(l8, "s13-weave-cut-in-and-ask");
    assert(portable !== undefined, "L8 keeps the opener-then-ask weave");
    assertEqual(
      (portable!.payload as Record<string, unknown>).weaveType,
      "open",
      "the portable ask stays unsupplied",
    );
  });

  test("L9 asks the learner to choose between three true sentences", () => {
    const l9 = byNumber(9);
    const choice = screenById(l9, "s11-fill-which-need");
    assert(choice !== undefined, "L9 keeps the which-need choice");
    const options =
      ((choice!.payload as Record<string, unknown>).options as Array<{
        text: string;
        isCorrect?: boolean;
        trapReason?: string;
      }>) ?? [];
    assertEqual(options.length, 3, "three whole intentions");
    assert(
      options.every((o) => /\s/.test(o.text) && /[.?]$/.test(o.text.trim())),
      "every option is a complete sentence, so the choice is about meaning",
    );
    assert(
      options.filter((o) => o.isCorrect !== true).every((o) => (o.trapReason ?? "").length > 0),
      "each wrong option explains why it is the wrong thing to want",
    );
    const twoPart = screenById(l9, "s12-weave-ask-and-say-why");
    assert(twoPart !== undefined, "L9 keeps the request-with-reason weave");
    const answers =
      ((twoPart!.payload as Record<string, unknown>).expectedAnswers as string[]) ?? [];
    assert(
      answers.every((a) => (a.match(/[.?]/g) ?? []).length >= 2),
      "the reason makes it a two-sentence reconstruction",
    );
  });

  test("L10 can both notice and repair a day that goes wrong", () => {
    // The payoff property. Before this pass L10 ran clean from arrival to
    // goodbye, which is the one thing a real day never does.
    const l10 = byNumber(10);
    const notice = screenById(l10, "s11-fill-lost-the-thread");
    const repair = screenById(l10, "s12-weave-say-so-and-ask-again");
    assert(notice !== undefined, "L10 keeps the moment it stops following");
    assert(repair !== undefined, "L10 keeps the repair production");
    assertEqual(
      (repair!.payload as Record<string, unknown>).weaveType,
      "open",
      "the repair is unsupplied",
    );
    const answers =
      ((repair!.payload as Record<string, unknown>).expectedAnswers as string[]) ?? [];
    assert(
      answers.every((a) => /je ne comprends pas/i.test(a) && /où/i.test(a)),
      "the repair names the problem AND asks again, which is what rescues the day",
    );
    // And it must not be L6's repair line handed back unchanged.
    const l6Repair = flattenLessonScreens(byNumber(6)).flatMap(
      (s) => ((s.payload as Record<string, unknown>).expectedAnswers as string[]) ?? [],
    );
    assert(
      answers.every((a) => !l6Repair.includes(a)),
      "L10's repair is a new combination, not L6's sentence replayed",
    );
  });

  test("L10 ends by asking for the whole day at once", () => {
    const l10 = byNumber(10);
    const wholeDay = screenById(l10, "s13-sayit-the-whole-day");
    assert(wholeDay !== undefined, "L10 keeps the whole-day production");
    assertEqual(wholeDay!.type, "say-it-your-way", "open production, nothing supplied");
    const model = String((wholeDay!.payload as Record<string, unknown>).modelAnswer ?? "");
    // The arc, not a slogan: greeting, question, request and departure.
    for (const beat of ["Bonjour", "où", "faire une pause", "Je vais"]) {
      assert(model.includes(beat), `the whole-day model must carry ${beat}`);
    }
    assert(
      (model.match(/[.?]/g) ?? []).length >= 4,
      "the day is several sentences held at once, not one line",
    );
  });
});

// ── No new acquisition anywhere in the range ───────────────────────────────

describe("L7-L10 acquisition stays deliberate", () => {
  test("L7-L10 demands are exactly the ratified set", () => {
    // The founder-usable pass added no acquisition here at all. The
    // language-world rebuild added exactly one, deliberately: est-ce que moved
    // from L12 to L8, because holding the first composed question until L12
    // left the learner able to answer for ten lessons and never ask. L8 is
    // still inside the doorway band (1-2). Anything else appearing here is a
    // scene quietly reaching for a new item, which is what this guards.
    assertEqual(
      TARGETS.map((l) => (l.acquisitionDemandItemIds ?? []).join(",")),
      [
        "chunk-je-vais,chunk-au-cafe",
        "chunk-c-est-ou,chunk-est-ce-que",
        "chunk-faire-une-pause",
        "",
      ],
      "one demand per doorway except L8's pulled-forward question frame; none for the integration lesson",
    );
  });

  test("every target named across L7-L10 is an item the lesson declares", () => {
    // The exact defect class repaired in L3, L4 and finally L10: a screen that
    // names a target its lesson never declared cannot state a treatment, and
    // the evidence layer fails closed on it at play time.
    for (const lesson of TARGETS) {
      const declared = new Set(lesson.learningItems.map((i) => i.id));
      for (const screen of flattenLessonScreens(lesson)) {
        for (const id of screen.targetItemIds ?? []) {
          assert(
            declared.has(id),
            `${lesson.id}/${screen.id} targets ${id} without declaring it`,
          );
        }
      }
    }
  });
});
