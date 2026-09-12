/**
 * The lesson remembers what it taught, and refuses what it did not.
 *
 * THE DEFECT. A lesson holds one hard-coded answer and a few hand-written
 * alternatives, so by L6 a learner who owns a dozen expressions is graded
 * against three of them. Closing with "Au revoir." where the model says
 * "Merci, au revoir." reads as a miss. The resolver widens what the existing
 * grader accepts, using French the learner demonstrably has.
 *
 * THE DANGER, which is the larger half of these rules. Widening acceptance is
 * how a lesson starts teaching bad French: "Pardon, je n'ai pas compris."
 * means almost exactly what L6's repair beat wants and is built on a tense
 * nobody has taught. Meaning similarity is not reachability, and every gate
 * here fails closed.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import {
  EXPRESSION_CAPABILITIES,
  EXPRESSION_BY_ID,
} from "../../content/expression/expressionCapabilities";
import { COMMUNICATIVE_INTENTS } from "../../content/expression/communicativeIntent";
import {
  firstLessonIndex,
  resolveEligibleExpressions,
  derivedAlternativeSurfaces,
} from "../../content/expression/resolveExpressions";
import type { Lesson, SayItYourWayScreen, WeaveScreen } from "../../content/lessonTypes";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const codeOf = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const FIRST = firstLessonIndex(V1_LESSONS as Lesson[]);

/** Every item a learner who has walked L0..n owns. Derived, never listed. */
function reachedThrough(n: number): Set<string> {
  const out = new Set<string>();
  for (const lesson of V1_LESSONS) {
    if (lesson.number > n) continue;
    for (const item of lesson.learningItems ?? []) out.add(item.id);
  }
  return out;
}
const R6 = reachedThrough(6);
const R10 = reachedThrough(10);

function surfaces(result: ReturnType<typeof resolveEligibleExpressions>): string[] {
  return derivedAlternativeSurfaces(result).sort();
}
function reasonFor(
  result: ReturnType<typeof resolveEligibleExpressions>,
  id: string,
): string | undefined {
  return result.rejected.find((r) => r.id === id)?.reason;
}

/** The L6 closing: a first meeting at a door, nothing said about coming back. */
const L6_CLOSING = {
  intent: "close-interaction",
  scene: ["formalRegister"],
  reached: R6,
  lessonScope: 6,
  primary: "Merci, au revoir.",
  reuse: true,
  firstLesson: FIRST,
} as const;

describe("the table is a capability layer, not a synonym list", () => {
  test("every capability is made of real registry items", () => {
    for (const c of EXPRESSION_CAPABILITIES) {
      assert(c.itemIds.length > 0, `${c.id} is made of nothing`);
      for (const id of c.itemIds) {
        assert(
          Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, id),
          `${c.id} references unknown item "${id}"`,
        );
      }
    }
  });

  test("no capability carries its own reachability", () => {
    // §23: avoid three sources saying when an expression becomes lawful. The
    // curriculum already knows; a hand-written earliest lesson would be a
    // second answer that goes stale the first time a lesson moves.
    const src = codeOf(read("content/expression/expressionCapabilities.ts"));
    for (const banned of ["earliestLesson", "firstLesson", "lessonNumber", "reachedIn"]) {
      assert(!src.includes(banned), `the table must not restate reachability: ${banned}`);
    }
    for (const c of EXPRESSION_CAPABILITIES) {
      for (const id of c.itemIds) {
        assert(FIRST.has(id), `${c.id} uses "${id}", which no lesson teaches`);
      }
    }
  });

  test("every intent in the vocabulary is used by something", () => {
    for (const intent of COMMUNICATIVE_INTENTS) {
      assert(
        EXPRESSION_CAPABILITIES.some((c) => c.intents.includes(intent)),
        `"${intent}" is a name with no content behind it`,
      );
    }
  });

  test("one intent has many expressions and one expression has many intents", () => {
    const closers = EXPRESSION_CAPABILITIES.filter((c) =>
      c.intents.includes("close-interaction"),
    );
    assert(closers.length >= 4, `only ${closers.length} ways to close`);
    assert(
      EXPRESSION_CAPABILITIES.some((c) => c.intents.length > 1),
      "no expression does more than one job",
    );
  });

  test("the closing family is differentiated by scene, not flattened", () => {
    // The whole case for this layer. All four can close; they are not
    // interchangeable, and the table has to say why.
    assert(EXPRESSION_BY_ID["expr:au-revoir"]!.requires === undefined, "au revoir is unmarked");
    assert(
      EXPRESSION_BY_ID["expr:a-bientot"]!.requires?.includes("likelySeeAgainSoon"),
      "à bientôt claims you will meet again",
    );
    assert(
      EXPRESSION_BY_ID["expr:bonne-journee"]!.requires?.includes("serviceEncounter"),
      "bonne journée is a service parting",
    );
  });
});

describe("CASE A — a generic goodbye", () => {
  const result = resolveEligibleExpressions(L6_CLOSING);

  test("au revoir is valid", () => {
    assert(surfaces(result).includes("Au revoir."), `derived: ${surfaces(result).join(" | ")}`);
  });

  test("the model itself is never offered as an alternative", () => {
    assert(
      !surfaces(result).includes("Merci, au revoir."),
      "the primary must not come back as another way of saying it",
    );
    assert(reasonFor(result, "expr:merci-au-revoir") === "is-the-primary", "and it says why");
  });

  test("à bientôt and bonne journée are refused", () => {
    const derived = surfaces(result);
    assert(!derived.includes("À bientôt."), "à bientôt claims a reunion nobody promised");
    assert(!derived.includes("Bonne journée."), "bonne journée claims a service parting");
  });

  test("they are refused for reachability BEFORE context, and would be refused by either", () => {
    // Both are L7. At L6 the honest first answer is "the learner does not have
    // this", and the scene test never has to run. The next case proves the
    // context gate independently, on a learner who owns them.
    assert(reasonFor(result, "expr:a-bientot") === "unreached", "reach decides first");
    const owned = resolveEligibleExpressions({
      ...L6_CLOSING,
      reached: R10,
      lessonScope: 10,
    });
    assert(
      reasonFor(owned, "expr:a-bientot") === "context",
      "and with it reached, the scene still refuses it",
    );
    assert(reasonFor(owned, "expr:bonne-journee") === "context", "same for bonne journée");
  });
});

describe("CASE B — the scene says you will meet again soon", () => {
  const result = resolveEligibleExpressions({
    ...L6_CLOSING,
    reached: R10,
    lessonScope: 10,
    scene: ["formalRegister", "likelySeeAgainSoon"],
  });

  test("à bientôt becomes valid", () => {
    assert(surfaces(result).includes("À bientôt."), `derived: ${surfaces(result).join(" | ")}`);
  });

  test("bonne journée does not come with it", () => {
    // One scene fact does not unlock a family. Each expression asks for its own.
    assert(!surfaces(result).includes("Bonne journée."), "a different claim, still unmet");
    assert(reasonFor(result, "expr:bonne-journee") === "context", "and still for context");
  });
});

describe("CASE C — a daytime service departure", () => {
  const result = resolveEligibleExpressions({
    ...L6_CLOSING,
    reached: R10,
    lessonScope: 10,
    scene: ["formalRegister", "serviceEncounter", "daytime"],
  });

  test("bonne journée becomes valid", () => {
    assert(surfaces(result).includes("Bonne journée."), `derived: ${surfaces(result).join(" | ")}`);
  });

  test("and à bientôt does not", () => {
    assert(!surfaces(result).includes("À bientôt."), "nothing said you would be back");
  });

  test("half the requirement is not the requirement", () => {
    const nightShop = resolveEligibleExpressions({
      ...L6_CLOSING,
      reached: R10,
      lessonScope: 10,
      scene: ["serviceEncounter"],
    });
    assert(
      !surfaces(nightShop).includes("Bonne journée."),
      "a service encounter after dark is not a good day to wish anyone",
    );
  });

  test("the same expression is not globally valid once it is valid once", () => {
    // The rule §4 exists for. Validity is a property of (expression, scene),
    // and nothing here caches it onto the expression.
    const again = resolveEligibleExpressions(L6_CLOSING);
    assert(!surfaces(again).includes("Bonne journée."), "the earlier scene did not license this one");
  });
});

describe("reachability and scope are separate ceilings", () => {
  test("a reached expression from a later lesson stays out of an earlier one", () => {
    // A learner replaying L6 after finishing L7 HAS à bientôt. Offering it
    // inside a lesson that claims to use nothing new would still be a lie
    // about the lesson.
    const replay = resolveEligibleExpressions({
      ...L6_CLOSING,
      reached: R10,
      lessonScope: 6,
      scene: ["formalRegister", "likelySeeAgainSoon"],
    });
    assert(!surfaces(replay).includes("À bientôt."), "scope holds even when reach does not");
    assert(reasonFor(replay, "expr:a-bientot") === "beyond-lesson-scope", "and names the ceiling");
  });

  test("unreached language is refused however well it fits the job", () => {
    const nothing = resolveEligibleExpressions({
      ...L6_CLOSING,
      reached: new Set<string>(),
    });
    assert(surfaces(nothing).length === 0, "a learner with nothing is offered nothing");
    assert(reasonFor(nothing, "expr:au-revoir") === "unreached", "including the unmarked goodbye");
  });
});

describe("a piece is not an answer", () => {
  test("every token reached does not make a fragment an utterance", () => {
    const repair = resolveEligibleExpressions({
      intent: "ask-to-repeat",
      scene: ["misunderstandingOccurred", "formalRegister"],
      reached: R6,
      lessonScope: 6,
      primary: "Je ne comprends pas. Vous pouvez répéter ?",
      reuse: true,
      firstLesson: FIRST,
    });
    assert(
      !surfaces(repair).includes("vous pouvez"),
      "a frame is substructure, not a way of asking someone to repeat",
    );
    assert(
      reasonFor(repair, "expr:piece-vous-pouvez") === "not-an-utterance",
      "and the refusal says which rule refused it",
    );
    assert(
      surfaces(repair).includes("Vous pouvez répéter ?"),
      "while the whole question is a real path",
    );
  });
});

describe("meaning similarity is not reachability", () => {
  test("the repair phrasing L6 shows but never taught can never be derived", () => {
    // §14, by name. "Pardon, je n'ai pas compris." means almost exactly what
    // L6's repair beat wants. It is built on a tense nobody has taught, and it
    // appears on the L6 showcase as exposure only. It has no capability record,
    // so there is no path by which the resolver could ever offer it — the
    // refusal is structural rather than a judgement that could be relaxed.
    assert(
      !EXPRESSION_CAPABILITIES.some((c) => /n'ai pas compris/i.test(c.surface)),
      "an expression nobody has taught must not be capable of anything",
    );
    for (const scene of [
      ["misunderstandingOccurred", "formalRegister"],
      [],
    ] as const) {
      const r = resolveEligibleExpressions({
        intent: "signal-not-understood",
        scene,
        reached: R10,
        lessonScope: 10,
        primary: "Je ne comprends pas.",
        reuse: true,
        firstLesson: FIRST,
      });
      assert(
        !surfaces(r).some((x) => /n'ai pas compris/i.test(x)),
        "not at L6, not at L10, not with every fact granted",
      );
    }
  });

  test("grammar rides with the item, so scope catches it too", () => {
    // Every capability is spelled out in canonical items, and an item is the
    // unit a lesson teaches. There is no surface here whose grammar could be
    // newer than the items it is made of.
    for (const c of EXPRESSION_CAPABILITIES) {
      const taught = c.itemIds.map((id) => FIRST.get(id));
      assert(
        taught.every((n) => typeof n === "number"),
        `${c.id} is made of something no lesson teaches`,
      );
    }
  });
});

describe("the author outranks the resolver", () => {
  test("no intent means nothing derived", () => {
    const r = resolveEligibleExpressions({ ...L6_CLOSING, intent: undefined });
    assert(surfaces(r).length === 0, "a screen that named no job gets no widening");
  });

  test("reuse off means nothing derived, whatever else is authored", () => {
    const r = resolveEligibleExpressions({ ...L6_CLOSING, reuse: false });
    assert(surfaces(r).length === 0, "opt-in, always");
    assert(r.rejected.length === 0, "and it does not even consider the table");
  });

  test("authored alternatives survive untouched", () => {
    const r = resolveEligibleExpressions({
      ...L6_CLOSING,
      authoredAlternatives: ["Merci, au revoir", "Merci. Au revoir."],
    });
    assert(r.authored.length === 2, "the author's list is returned as written");
    assert(
      !surfaces(r).some((d) => r.authored.includes(d)),
      "and nothing derived duplicates it",
    );
  });

  test("an explicit exclusion beats the resolver's judgement", () => {
    const r = resolveEligibleExpressions({
      ...L6_CLOSING,
      exclusions: ["expr:au-revoir"],
    });
    assert(!surfaces(r).includes("Au revoir."), "the author said no");
    assert(reasonFor(r, "expr:au-revoir") === "excluded", "and the reason is the author");
  });

  test("the primary is never rewritten", () => {
    const r = resolveEligibleExpressions(L6_CLOSING);
    assert(r.primary === "Merci, au revoir.", "the model is the model");
  });
});

describe("the resolver decides nothing about the learner", () => {
  test("it is pure: no clock, no storage, no network, no AI", () => {
    for (const rel of [
      "content/expression/resolveExpressions.ts",
      "content/expression/expressionCapabilities.ts",
      "content/expression/communicativeIntent.ts",
    ]) {
      const code = codeOf(read(rel));
      for (const banned of [
        "Date.now",
        "Math.random",
        "fetch(",
        "AsyncStorage",
        "kvStorage",
        "useState",
        "react",
        "react-native",
        "anthropic",
        "openai",
      ]) {
        assert(!code.includes(banned), `${rel} must not use ${banned}`);
      }
    }
  });

  test("it mutates no mastery and records no evidence", () => {
    const code = codeOf(read("content/expression/resolveExpressions.ts"));
    for (const banned of [
      "recordEvent",
      "appendEvent",
      "MasterySnapshot",
      "practiceEligibility",
      "leitnerBox",
      "dueAt",
      "isWeak",
    ]) {
      assert(!code.includes(banned), `the resolver must not touch ${banned}`);
    }
    // It takes a plain set of ids. It cannot see a snapshot to mutate.
    const before = new Set(R6);
    resolveEligibleExpressions(L6_CLOSING);
    assert(before.size === R6.size, "the reached set came back the size it went in");
  });

  test("it imports no UI and no Practice module", () => {
    for (const rel of [
      "content/expression/resolveExpressions.ts",
      "content/expression/expressionCapabilities.ts",
    ]) {
      const code = read(rel);
      for (const banned of ["@/components", "components/", "practice/", "Practice"]) {
        assert(!code.includes(`from "${banned}`), `${rel} must not import ${banned}`);
      }
      assert(!/practiceCatalogue|practiceBrowse|PracticeCard/.test(code), `${rel} is Practice-free`);
    }
  });

  test("the lesson screen never receives the learner's reached set", () => {
    // The boundary a previous pass broke by passing reachedItemIds into
    // RecapCard. Resolution is a question about the learner; screens get
    // strings.
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
    ]) {
      const code = codeOf(read(rel));
      for (const banned of [
        "useReachedItemIds",
        "resolveEligibleExpressions",
        "EXPRESSION_CAPABILITIES",
        "readMasterySnapshot",
      ]) {
        assert(!code.includes(banned), `${rel} must not reach for ${banned}`);
      }
      assert(code.includes("derivedAlternatives"), `${rel} receives resolved strings`);
    }
    const renderer = codeOf(read("components/lesson-v1/LessonRendererV1.tsx"));
    assert(renderer.includes("useExpressionReuse"), "the wiring layer resolves");
  });

  test("reuse reads the reach line that already exists", () => {
    // §23: avoid a third answer to "has the learner got this". Mon Lexique's
    // projection means "is this becoming yours" and needs production success;
    // Practice's means "has the learner met this". Reuse needs the second, and
    // uses Practice's rather than inventing one — L6 teaches au revoir two
    // screens before it asks for it, and the stricter line would have made the
    // closing unable to offer the French the lesson had just given.
    const hook = codeOf(read("hooks/useExpressionReuse.ts"));
    assert(
      hook.includes('from "@/content/practice/practicePlanner"'),
      "reach comes from the existing Practice line",
    );
    assert(!hook.includes("selectMonLexiqueEntries"), "and not from the Mon Lexique projection");
    assert(!/const REACHED|function isReached/.test(hook), "and nothing new was defined");
  });

  test("what the screen graded is what the event records", () => {
    // The recorded grade is computed a SECOND time from the screen and the
    // text. A derived set the event did not know about would say "That works."
    // on screen and write down a miss.
    const interactions = codeOf(read("content/lesson-v1-evidence/interactions.ts"));
    assert(
      interactions.includes("evaluateWeaveAnswer(screen, facts.text, facts.derivedAlternatives)"),
      "the event grades against the same set the screen did",
    );
    for (const rel of [
      "components/lesson-v1/LessonRendererV1.tsx",
      "components/lesson-v1/screens/ActivityChain.tsx",
    ]) {
      assert(
        codeOf(read(rel)).includes("derivedAlternatives: facts.derivedAlternatives"),
        `${rel} passes the graded set into the recorded attempt`,
      );
    }
  });
});

// ── L6, the vertical slice ──────────────────────────────────────────────────

const L6 = V1_LESSONS.find((l) => l.number === 6)!;
const L6_SCREENS = flattenLessonScreens(L6 as Lesson);
const production = L6_SCREENS.filter(
  (s): s is WeaveScreen | SayItYourWayScreen =>
    s.type === "weave" || s.type === "say-it-your-way",
);

describe("L6 asks only for French it gave the learner", () => {
  test("every item L6 works has been taught by L6", () => {
    for (const screen of L6_SCREENS) {
      for (const id of screen.targetItemIds ?? []) {
        const taught = FIRST.get(id);
        assert(taught !== undefined, `L6 targets "${id}", which no lesson teaches`);
        assert(taught <= 6, `L6 targets "${id}", first taught in L${taught}`);
      }
    }
  });

  test("no production screen shows French from a later lesson", () => {
    // The measured defect: "Merci beaucoup." (L7) sat in the NATURAL tier of
    // the whole-moment screen, held up as the best version of an answer the
    // learner could not have written.
    const later = ["merci beaucoup", "à bientôt", "bonne journée", "n'ai pas compris"];
    for (const screen of production) {
      const payload = screen.payload as Record<string, unknown>;
      const shown = JSON.stringify([
        payload.expectedAnswers,
        payload.acceptedAlternatives,
        payload.modelAnswer,
        payload.answerBands,
        payload.reveal,
      ]).toLowerCase();
      for (const phrase of later) {
        assert(!shown.includes(phrase), `${screen.id} offers "${phrase}", which is L7`);
      }
    }
  });

  test("a screen that asks for a purpose has a scene that gave one", () => {
    // §27. `J'ai une question.` requires `purposeKnown`, so any screen whose
    // model answer contains it must have established why the learner is there.
    // Otherwise the model carries information the screen withheld.
    const needsPurpose = EXPRESSION_BY_ID["expr:j-ai-une-question"]!;
    assert(needsPurpose.requires?.includes("purposeKnown"), "the requirement is authored");
    for (const screen of production) {
      const payload = screen.payload as Record<string, unknown> & {
        sceneFacts?: readonly string[];
      };
      const model = JSON.stringify([
        payload.expectedAnswers,
        payload.modelAnswer,
        (payload.reveal as { modelAnswer?: string } | undefined)?.modelAnswer,
      ]);
      if (!model.includes("J'ai une question")) continue;
      assert(
        (payload.sceneFacts ?? []).includes("purposeKnown"),
        `${screen.id} asks for a purpose its scene never established`,
      );
    }
  });

  test("the arrival scene says why the learner came", () => {
    const arrival = production.find((s) => s.id === "s03-weave-bonjour-je-suis-ici");
    assert(arrival !== undefined, "the arrival weave is still there");
    const context = (arrival!.payload as { context?: string }).context ?? "";
    assert(/ask/i.test(context), `the scene still withholds the reason: "${context}"`);
  });
});

describe("L6's closing accepts the French the learner has", () => {
  const closing = production.find((s) => s.id === "s08-weave-close-open") as WeaveScreen;

  test("it opted in, and declared its scene", () => {
    assert(closing !== undefined, "the closing weave is still there");
    assert(closing.payload.reuse === true, "reuse is on");
    assert(closing.payload.intent === "close-interaction", "and the job is named");
    for (const absent of ["likelySeeAgainSoon", "serviceEncounter", "daytime"]) {
      assert(
        !(closing.payload.sceneFacts ?? []).includes(absent as never),
        `nothing in this scene establishes ${absent}`,
      );
    }
  });

  test("Merci, au revoir. is still the model", () => {
    assert(closing.payload.expectedAnswers[0] === "Merci, au revoir.", "the anchor is unchanged");
    assert(closing.payload.reveal.modelAnswer === "Merci, au revoir.", "and it is what is shown");
  });

  test("Au revoir. now lands, and the two L7 goodbyes do not", () => {
    const resolved = resolveEligibleExpressions({
      intent: closing.payload.intent,
      scene: closing.payload.sceneFacts,
      reached: R6,
      lessonScope: 6,
      primary: closing.payload.expectedAnswers[0] ?? null,
      authoredAlternatives: closing.payload.acceptedAlternatives,
      exclusions: closing.payload.excludeExpressionIds,
      reuse: true,
      firstLesson: FIRST,
    });
    const derived = surfaces(resolved);
    assert(derived.includes("Au revoir."), `derived: ${derived.join(" | ")}`);
    assert(!derived.includes("À bientôt."), "not reached at L6");
    assert(!derived.includes("Bonne journée."), "not reached at L6");
  });

  test("the prompt does not contradict the paths it now accepts", () => {
    // §20. A prompt that enumerates both beats makes "Au revoir." a
    // half-answer by instruction rather than by French.
    const prompt = closing.payload.prompt.toLowerCase();
    assert(!prompt.includes("thank them and"), `the prompt still hard-codes the model: "${prompt}"`);
  });
});

describe("L6 keeps the claims it makes", () => {
  test("the showcase no longer says nothing is new while showing three new lines", () => {
    const showcase = L6_SCREENS.find((s) => s.type === "showcase");
    const intro = (showcase?.payload as { intro?: string } | undefined)?.intro ?? "";
    assert(intro.length > 0, "the showcase still has an intro");
    assert(
      !/^nothing here is new/i.test(intro.trim()),
      `the claim is still absolute: "${intro}"`,
    );
    // And the lines it is now honest about are still there, still exposure.
    const sentences = (
      (showcase?.payload as { clusters?: { sentences: { fr: string; role?: string }[] }[] })
        ?.clusters ?? []
    ).flatMap((c) => c.sentences);
    for (const fr of ["Bonne journée !", "À bientôt !", "Pardon, je n'ai pas compris."]) {
      const line = sentences.find((x) => x.fr === fr);
      assert(line !== undefined, `${fr} was deleted rather than explained`);
      assert(line!.role === "exposure", `${fr} must stay exposure-tier`);
    }
  });

  test("the recap counts the one new piece", () => {
    const recap = L6_SCREENS.find((s) => s.type === "recap");
    const lines = (recap?.payload as { lines?: string[] } | undefined)?.lines ?? [];
    assert(
      !lines.some((l) => /just the pieces you already built/i.test(l)),
      "au revoir is new in L6, so that line was one chunk short of true",
    );
  });
});
