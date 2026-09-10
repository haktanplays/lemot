/**
 * UI Slice 4 presentation guards: the expression and reveal surfaces.
 *
 * Slice 4 gave the expressive half of the lesson one visual language —
 * scene, expression, comparison, notice, reflection, close. These tests pin the
 * parts of that language that a later edit could quietly undo, and NOTHING
 * about behaviour: the semantics of Say-It, Natural Reveal, Recap, Insight and
 * completion are pinned by waveAEmission / learningRuntimeWiring /
 * navigationStandingSurfaces and are untouched here.
 *
 * Source-scanning by design, in the same idiom as componentCopyGuard: these are
 * presentation facts that live in TSX, not in structured data. Pure Node/tsx —
 * no React Native, no Expo, no device layer.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");

/**
 * Strip comments so an explanatory note can never satisfy or trip a check.
 *
 * Regex-based rather than the line-prefix filter used by the older navigation
 * guards: these files carry `{/* … *\/}` JSX comments whose continuation lines
 * begin with ordinary prose, and a line filter leaves that prose in the scan.
 * The banned-vocabulary checks below describe exactly the language they forbid,
 * so a stripper that misses a comment body fails on its own documentation.
 */
const codeOf = (src: string): string =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const SAY_IT = "components/lesson-v1/screens/SayItYourWayV1.tsx";
const REVEAL = "components/lesson-v1/screens/NaturalReveal.tsx";
const INSIGHT = "components/lesson-v1/screens/InsightCard.tsx";
const RECAP = "components/lesson-v1/screens/RecapCard.tsx";
const WEAVE = "components/lesson-v1/screens/Weave.tsx";
const RENDERER = "components/lesson-v1/LessonRendererV1.tsx";
const SCENE_CARD = "components/ui/SceneCard.tsx";

const FAMILY = [SAY_IT, REVEAL, INSIGHT, RECAP, RENDERER, SCENE_CARD];

describe("the expressive half of the lesson shares one visual language", () => {
  test("Say-It stages its situation through the shared SceneCard", () => {
    const src = codeOf(read(SAY_IT));
    assert(
      src.includes('from "@/components/ui/SceneCard"'),
      "Say-It imports the shared scene treatment",
    );
    assert(
      /<SceneCard text=\{payload\.situation\}/.test(src),
      "the authored situation is what the scene renders",
    );
  });

  test("the scene grows with its text instead of boxing it", () => {
    const src = codeOf(read(SCENE_CARD));
    assert(!/height:\s*\d/.test(src), "no fixed height, so L23 can run long");
    assert(!src.includes("ScrollView"), "no nested scroll inside the frame");
    assert(
      !src.includes("numberOfLines"),
      "the scene is never truncated away from the learner",
    );
  });

  test("pieces are the same PieceChip wherever French is handed over", () => {
    for (const rel of [SAY_IT, RECAP, WEAVE]) {
      const src = codeOf(read(rel));
      assert(
        src.includes('from "@/components/ui/PieceChip"') &&
          src.includes("<PieceChip"),
        `${rel}: reuses the shared piece chip`,
      );
    }
  });

  test("no surface re-rolls its own chip out of raw palette values", () => {
    for (const rel of [SAY_IT, RECAP]) {
      const src = codeOf(read(rel));
      assert(
        !src.includes("borderRadius: 9999") && !src.includes('"rounded-full"'),
        `${rel}: bespoke pill markup is gone`,
      );
      assert(
        !src.includes("P.rl") && !src.includes("P.rb"),
        `${rel}: no verdict tint on a surface that grades nothing`,
      );
    }
  });
});

describe("the reveal is a comparison, not an answer key", () => {
  test("no green success box survives in the shared reveal", () => {
    const src = codeOf(read(REVEAL));
    assert(!src.includes("P.gl"), "no filled green success surface");
    assert(
      !src.includes("P.green"),
      "no green verdict colour: the reveal states a natural version, it does not score one",
    );
  });

  test("the natural French is the largest and only lifted surface", () => {
    const src = codeOf(read(REVEAL));
    const model = src.indexOf("A natural version");
    assert(model >= 0, "the payoff kicker is still there");
    // Exactly one bordered card in the whole reveal, and it is the payoff.
    assert(
      (src.match(/borderWidth: 1/g) ?? []).length === 1,
      "one bordered surface only, so the commentary cannot compete with it",
    );
    const fontSizes = [...src.matchAll(/fontSize:\s*(\d+)/g)].map((m) =>
      Number(m[1]),
    );
    const payloadSize = Number(
      src.slice(model).match(/fontSize:\s*(\d+)/)?.[1] ?? "0",
    );
    assert(
      payloadSize > 0 && payloadSize === Math.max(...fontSizes),
      "the natural version is the largest text in the reveal",
    );
  });

  test("reveal block order and mode logic are unchanged", () => {
    const file = codeOf(read(REVEAL));
    // The rendered blocks only. The `hasNotes` precondition above the return
    // names the same conditions, so scanning the whole file would read its
    // order instead of the order the learner actually sees.
    const src = file.slice(file.indexOf("return ("));
    const order = [
      "reveal.modelAnswer &&",
      "showCompareFallback &&",
      "showIfCorrect &&",
      "notices.length > 0 &&",
      "alternatives.length > 0 &&",
      "reveal.explanation &&",
    ].map((needle) => {
      const at = src.indexOf(needle);
      assert(at >= 0, `the reveal still renders: ${needle}`);
      return at;
    });
    for (let i = 1; i < order.length; i += 1) {
      assert(order[i] > order[i - 1], "reveal blocks keep their authored order");
    }
    // Mode resolution lives above the return, so it is checked against the file.
    for (const mode of ["exact", "alternative", "no-match", "general"]) {
      assert(file.includes(`case "${mode}":`), `${mode} mode still resolved`);
    }
  });

  test("the shared reveal still serves both Weave and Say-It", () => {
    for (const rel of [WEAVE, SAY_IT]) {
      assert(
        codeOf(read(rel)).includes("<NaturalRevealView"),
        `${rel}: consumes the shared reveal`,
      );
    }
    assert(
      codeOf(read(WEAVE)).includes("<FeedbackBand"),
      "Weave keeps its own verdict band, which is why the reveal carries none",
    );
  });
});

describe("Say-It stays open production, not a graded exercise", () => {
  test("the expression target outweighs the scene it sits under", () => {
    const src = codeOf(read(SAY_IT));
    const goal = src.indexOf("payload.communicativeGoal");
    const scene = src.indexOf("<SceneCard");
    assert(scene >= 0 && goal > scene, "scene is read first, goal second");
    assert(
      /fontWeight:\s*"600"[\s\S]{0,120}payload\.communicativeGoal/.test(src) ||
        /payload\.communicativeGoal[\s\S]{0,200}fontWeight:\s*"600"/.test(src),
      "the goal carries real weight in the input state",
    );
  });

  test("Say-It gives more room than Weave and no assembly scaffolding", () => {
    const sayIt = codeOf(read(SAY_IT));
    const weave = codeOf(read(WEAVE));
    // Both fields size themselves with a phase ternary, so the active height is
    // the larger operand. Reading one operand positionally would let this pass
    // against a field that has no height at all.
    const heightOf = (src: string, rel: string): number => {
      const expr = src.match(/minHeight:([^,]*),/)?.[1];
      assert(expr !== undefined, `${rel}: the input still declares a minHeight`);
      const found = [...(expr as string).matchAll(/\d+/g)].map((m) =>
        Number(m[0]),
      );
      assert(found.length > 0, `${rel}: minHeight resolves to a number`);
      return Math.max(...found);
    };
    const open = heightOf(sayIt, SAY_IT);
    const guided = heightOf(weave, WEAVE);
    assert(
      open > guided,
      `the free-production field is taller than the guided one (${open} vs ${guided})`,
    );
    assert(
      !sayIt.includes("hintCloze") && !sayIt.includes("hintLevel"),
      "no cloze ladder: Say-It is open expression",
    );
  });

  test("the learner's own words stay visible through compare and reveal", () => {
    const src = codeOf(read(SAY_IT));
    assert(
      src.includes("editable={isInput}"),
      "the field locks after committing rather than disappearing",
    );
    assert(
      /isInput \? "Write your answer in French\." : "You wrote:"/.test(src),
      "the same surface becomes the words the learner kept",
    );
    // The kept text is shown once. A second printed copy under the reveal is
    // what made the old confirm step read as submitting work for marking.
    assert(
      (src.match(/\{text\.trim\(\)\}/g) ?? []).length === 0,
      "the learner's text is not re-printed as a separate quoted block",
    );
  });

  test("every learner-facing string on the screen is preserved", () => {
    const src = read(SAY_IT);
    for (const copy of [
      "Say It Your Way",
      "Need a hint?",
      "Ideas you can use.",
      "Write your answer in French.",
      "You wrote:",
      "Want to try once more, or keep this and compare?",
      "Your answer is saved for comparison.",
      "Looking at your answer",
      "A note on your answer",
      "Compare your answer with the suggested version when available.",
      "You may also see",
      "minimal acceptable",
    ]) {
      assert(src.includes(copy), `Say-It copy preserved: ${copy}`);
    }
  });
});

describe("reflection and close stay calm", () => {
  test("Insight reads as an observation, not an unlock", () => {
    const src = read(INSIGHT);
    for (const copy of [
      "Sound / Writing",
      "Why this works",
      "Small difference",
      "Natural use",
      "False friend",
      "Pattern link",
      "Your goal",
    ]) {
      assert(src.includes(copy), `insight kicker preserved: ${copy}`);
    }
    assert(
      !codeOf(src).includes("Modal"),
      "an insight is noticed in place, never announced",
    );
  });

  test("Recap mirrors the lesson without counting it", () => {
    const src = read(RECAP);
    assert(src.includes("A small recap"), "recap kicker preserved");
    assert(src.includes("Pieces you used"), "recap pieces copy preserved");
    const code = codeOf(src);
    assert(
      !/\d+\s*\/\s*\d+/.test(code) && !code.includes(".length}"),
      "no tally of what was got right",
    );
  });

  test("completion reads its milestone role from declared metadata only", () => {
    const src = codeOf(read(RENDERER));
    assert(
      src.includes('lesson.journeyRole === "milestone"'),
      "the role comes from the journey-role axis the content declares",
    );
    for (const derived of [
      "lesson.number === 20",
      "lesson.number === 24",
      "lesson.number >=",
      "primaryArchetype",
    ]) {
      assert(
        !src.includes(derived),
        `the milestone is never inferred from ${derived}`,
      );
    }
  });

  test("completion is a quiet landing with one continuation action", () => {
    const src = read(RENDERER);
    const completion = codeOf(src.slice(src.indexOf("function CompletionView")));
    assert(completion.includes("Back to Home"), "the ordinary primary action");
    assert(completion.includes("Open Mon Lexique"), "the one quiet shortcut");
    // The first taste closes differently -- "Begin", into Lesson 1, with no Mon
    // Lexique shortcut, because a learner one lesson in has no lexique and has
    // never heard the name. So the source now holds TWO primary actions and
    // still renders exactly one: they are the arms of a single ternary inside
    // the single primary slot. Counting the slot is the assertion that survives
    // presentation branching; counting the tag was only ever a proxy for it.
    assert(completion.includes("Begin"), "the first taste continues into the path");
    assert(
      (completion.match(/isFirstTaste \? \(/g) ?? []).length === 1,
      "exactly one primary slot, branched once",
    );
    assert(
      (completion.match(/<PrimaryAction/g) ?? []).length === 2,
      "and exactly two arms in it, never a third action",
    );
    for (const ceremony of [
      "confetti",
      "Confetti",
      "badge",
      "Badge",
      "Animated",
      "Campfire",
      "A1",
    ]) {
      assert(
        !completion.includes(ceremony),
        `no completion ceremony: ${ceremony}`,
      );
    }
  });
});

describe("no reward language entered the expressive surfaces", () => {
  const BANNED = [
    "XP",
    "streak",
    "reward",
    "Unlocked",
    "Perfect",
    "Amazing",
    "achievement",
    "congratulations",
    "well done",
    "great job",
    "accuracy",
    "score",
  ];

  for (const rel of FAMILY) {
    test(`${rel}: carries no reward or scoring vocabulary`, () => {
      const code = codeOf(read(rel));
      for (const word of BANNED) {
        assert(
          !new RegExp(`\\b${word}\\b`, "i").test(code),
          `${rel}: contains banned term "${word}"`,
        );
      }
    });
  }
});
