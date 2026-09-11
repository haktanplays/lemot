/**
 * L0 — the first taste.
 *
 * L0 is not Lesson 1 and not a step on the path. It is the one lesson a learner
 * meets before the Journey exists, and its job is to get them to one real
 * French success and to let them discover how Cairn teaches by using it.
 *
 * Before this pass there were TWO L0s: an authored eight-screen lesson that no
 * learner could reach, and a 988-line bespoke onboarding screen with its own
 * layout, its own beat machine and its own boolean answer matcher. The bespoke
 * one is what first use actually ran, which meant the single screen whose job
 * is "show the learner what this product does" was the one screen that could
 * not use chunk pills, chunk tap, Look Closer, the hint ladder, or the
 * answer-verdict grading contract.
 *
 * These tests hold the shape that fixed it: one L0, played by the ordinary
 * engine, reachable from first use and from nowhere else.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { scaffoldWordsForScreen } from "./l0HybridScaffold";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { lesson000 } from "../../content/lessons/v1/lesson-000";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { isFirstTasteLesson, isV1LessonInStageScope } from "../../config/productStage";
import { componentEvidence } from "../../content/lesson-v1-evidence/answerComponents";
import { showcasePieces, pieceLabel } from "../../content/lessons/showcasePieces";
import {
  classifyShowcaseSentence,
  showcaseSentencesOf,
} from "../../content/lessons/showcaseClassification";
import { PRACTICE_SEEDS } from "../../content/practice/seeds";
import type { ShowcaseScreen, WeaveScreen,
  PatternReelScreen,
} from "../../content/lessonTypes";

const src = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const screens = flattenLessonScreens(lesson000);
const ORDER = "Bonjour, je voudrais un café, s'il vous plaît.";

// ── A. CONTENT ──────────────────────────────────────────────────────────────

describe("the first taste teaches three pieces and one sentence", () => {
  test("the core language is exactly the café order", () => {
    for (const id of ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"]) {
      assert(
        lesson000.learningItems.some((i) => i.id === id),
        `L0 must own ${id}`,
      );
    }
    assertEqual(
      lesson000.canDo,
      "Order a coffee politely in a French café.",
      "the promise the first taste makes",
    );
  });

  test("each piece is met on its own before the sentence exists", () => {
    // "je voudrais" used to arrive fused to "un café" as one sentence, which
    // teaches a line instead of a piece. That is still the rule.
    //
    // What changed: "un café" is no longer met on a CARD. The restored arc
    // introduces it in the bridge's reveal, because a first taste that teaches
    // the missing piece up front has nothing left to reveal. So the assertion
    // is about the two pieces the learner carries INTO the bridge.
    const meetFrench = screens
      .filter((s) => s.type === "meet-card")
      .map((s) => String((s.payload as { fr?: string }).fr ?? ""));
    assert(meetFrench.includes("Bonjour."), "the greeting is met alone");
    assert(meetFrench.includes("je voudrais"), "the ask is met alone");
    assert(
      !meetFrench.includes("un café"),
      "un café must arrive in the bridge's reveal, or the bridge reveals nothing",
    );
    for (const fr of meetFrench) {
      assert(
        fr !== "Je voudrais un café.",
        "no meet card may hand over the assembled sentence",
      );
    }
  });

  test("the first taste carries no assembly Showcase", () => {
    // It used to, and the reasoning was good: Showcase renders chips, makes them
    // tappable and carries Look Closer. But the old cognate-first arc had no
    // such beat, and the founder's trim is explicit that newer beats do not
    // survive merely because they exist. Chip tap and Look Closer are met in
    // L1's Showcase instead, one lesson later, where there is room for them.
    assert(
      screens.every((s) => s.type !== "showcase"),
      "the first taste is the old arc, and the old arc had no assembly beat",
    );
  });

  test("the productions are a bridge, a turn of the same handle, and a rebuild", () => {
    // This used to assert ONE production, on the reasoning that a first taste
    // which tests twice is a test. The founder restored the older arc, where
    // the first two asks are not tests at all: they EXPECT the learner's own
    // English for the piece they do not have, so nothing can be got wrong. The
    // rule that matters is the one kept below — only the last ask is in French
    // the learner has been shown.
    const production = screens.filter(
      (s) => s.type === "weave" || s.type === "say-it-your-way",
    );
    assertEqual(production.length, 3, "bridge, tea, rebuild");
    for (const p of production) {
      assertEqual(p.type, "weave", "no open production in the first taste; that starts in L1");
    }
    const [bridge, tea, rebuild] = production as WeaveScreen[];
    for (const hybrid of [bridge, tea]) {
      assert(
        scaffoldWordsForScreen(hybrid.id).length > 0,
        `${hybrid.id} must be a declared hybrid, or it is asking for untaught French`,
      );
    }
    assertEqual(
      scaffoldWordsForScreen(rebuild.id).length,
      0,
      "the last ask is the real one: full French, no scaffold",
    );
    assertEqual(rebuild.payload.weaveType, "supported", "and it stays heavily supported");
  });

  test("the arc is short enough to be a taste", () => {
    // TIGHTENED, not widened. The old cognate-first arc was six beats and this
    // is seven: the one addition is the tea ask. Everything the engine rebuild
    // had added on top — a meet card for un café, the assembly Showcase, the
    // recognition fill and s'il vous plaît — is gone, because none of it was
    // part of the experience being restored.
    //
    // The two opening meet cards are the only place the count exceeds the old
    // arc's shape, and that is the engine: a meet card shows ONE piece, where
    // the old screen listed both. Seven is the number to defend.
    assert(
      screens.length >= 6 && screens.length <= 8,
      `${screens.length} beats: the first taste is the old six-beat arc plus the tea ask`,
    );
  });

  test("nothing in L0 asks for French it has not taught", () => {
    // A teaching encounter, not a registry lookup: "un" belongs to the package
    // "un café" the learner meets on a card, and the registry stores the noun
    // as "café". What matters is whether the word was put in front of them.
    const met = new Set<string>();
    // Weaves contribute their REVEAL only, and only to the screens after them:
    // the model answer beside the learner's own line is where the bridge puts
    // "un café" in front of them. The per-screen check below runs before this
    // is added, so no weave can satisfy itself.
    const addWords = (text: unknown): void => {
      if (typeof text !== "string") return;
      for (const w of text.toLowerCase().replace(/[.,!?]/g, " ").split(/\s+/)) {
        if (w) met.add(w);
      }
    };
    for (const s of screens) {
      if (s.type === "weave") continue;
      const p = s.payload as { fr?: string; sentenceBefore?: string; sentenceAfter?: string };
      const bits = [p.fr, p.sentenceBefore, p.sentenceAfter];
      for (const cluster of (s.payload as { clusters?: { sentences: { fr: string }[] }[] }).clusters ?? []) {
        for (const sentence of cluster.sentences) bits.push(sentence.fr);
      }
      for (const o of (s.payload as { options?: { text: string }[] }).options ?? []) bits.push(o.text);
      for (const b of bits) {
        if (typeof b !== "string") continue;
        for (const w of b.toLowerCase().replace(/[.,!?]/g, " ").split(/\s+/)) if (w) met.add(w);
      }
    }
    for (const ask of screens) {
      if (ask.type !== "weave") continue;
      const asked = String((ask as WeaveScreen).payload.expectedAnswers?.[0] ?? "");
      // The bridge screens deliberately expect the learner's own English for
      // the piece they do not have yet. Those words are declared, and they are
      // the only ones exempt: every French word is still checked.
      const scaffold = scaffoldWordsForScreen(ask.id);
      for (const word of asked.toLowerCase().replace(/[.,!?]/g, " ").split(/\s+/).filter(Boolean)) {
        if (scaffold.includes(word)) continue;
        assert(met.has(word), `${ask.id} asks for "${word}", which L0 never showed`);
      }
      addWords((ask as WeaveScreen).payload.reveal?.modelAnswer);
    }
  });

  test("the softener is not in the first taste at all", () => {
    // s'il vous plaît was never part of the cognate-first arc, whose target
    // sentence is exactly "Bonjour, je voudrais un café." Carrying it cost a
    // fourth declared piece, its own beat, and a longer sentence, for a
    // softener nobody needs to order a coffee. L1 teaches it properly.
    assert(
      !(lesson000.acquisitionDemandItemIds ?? []).includes("chunk-sil-vous-plait"),
      "the softener is L1's, not the first taste's",
    );
    for (const s of screens) {
      assert(
        !(s.targetItemIds ?? []).includes("chunk-sil-vous-plait"),
        `${s.id} still reaches for the softener`,
      );
    }
    const weaves = screens.filter((s) => s.type === "weave") as WeaveScreen[];
    const rebuild = weaves[weaves.length - 1];
    assertEqual(
      rebuild.payload.expectedAnswers?.[0],
      "Bonjour, je voudrais un café.",
      "the old arc's target sentence, unchanged",
    );
  });

  test("no future lesson leaks into the first taste", () => {
    const laterOnly = new Set<string>();
    for (const l of V1_LESSONS) {
      if (l.number <= 0) continue;
      for (const item of l.learningItems) laterOnly.add(item.id);
    }
    for (const item of lesson000.learningItems) {
      // A piece L0 owns may legitimately recur later; what must not happen is
      // L0 targeting something it does not own.
      assert(item.id.length > 0, "declared");
    }
    for (const s of screens) {
      for (const id of s.targetItemIds ?? []) {
        assert(
          lesson000.learningItems.some((i) => i.id === id),
          `${s.id} targets ${id}, which L0 does not own`,
        );
      }
    }
    assert(laterOnly.size > 0, "later lessons exist");
  });
});

// ── B. FIRST-USE FLOW ───────────────────────────────────────────────────────

describe("first use reaches L0, and only first use does", () => {
  const home = src("app/(tabs)/index.tsx");
  const route = src("app/lesson-zero.tsx");
  const lessonRoute = src("app/v1-lesson/[id].tsx");

  test("a clean install is sent to the first taste", () => {
    assert(home.includes('router.replace("/lesson-zero"'), "first use redirects");
    assert(home.includes("hasFinishedFirstTaste"), "gated on the first-use flag");
  });

  test("the first taste is played by the ordinary engine", () => {
    assert(route.includes("LessonRendererV1"), "no second engine");
    assert(route.includes("getV1LessonByNumber(0)"), "and it plays L0");
  });

  test("L0 is playable but is not a step on the path", () => {
    assert(!isV1LessonInStageScope(0), "never in the Journey or the By-lesson picker");
    assert(isFirstTasteLesson(0), "but admitted by the lesson route");
    assert(!isFirstTasteLesson(1), "and nothing else claims to be the first taste");
    assert(
      lessonRoute.includes("isFirstTasteLesson"),
      "the route is what admits it, so the slice stays untouched",
    );
  });

  test("finishing hands the learner to Lesson 1, not to a home they have not met", () => {
    const renderer = src("components/lesson-v1/LessonRendererV1.tsx");
    assert(renderer.includes('lesson.phase === "first-step"'), "keyed on declared content");
    assert(renderer.includes('label="Begin"'), "the first taste continues into the path");
    assert(
      renderer.includes("getV1LessonByNumber(1)"),
      "and Lesson 1 is where it continues to",
    );
  });
});

// ── C + D. PERSISTENCE ──────────────────────────────────────────────────────

describe("first use happens once", () => {
  const route = src("app/lesson-zero.tsx");

  test("the flag means finished, and only the last screen writes it", () => {
    // Device smoke, 2026-09-10: written on ENTRY instead, a learner who met
    // Bonjour and put the phone down came back to the Journey with the first
    // taste gone — L0 is not a step on the path, so gone for good. Written on
    // completion, the redirect keeps sending them back and the ordinary cursor
    // resumes them at the beat they left.
    const flag = src("lib/firstUse.ts");
    assert(flag.includes("lm7_seen_lesson_zero"), "one flag, in one place");
    assert(
      !route.includes("markFirstTasteFinished") && !route.includes("useEffect"),
      "the route does not write it on mount",
    );
    const renderer = src("components/lesson-v1/LessonRendererV1.tsx");
    const completion = renderer.slice(renderer.indexOf("const isComplete"));
    assert(
      completion.includes("markFirstTasteFinished()"),
      "the completion effect is what writes it",
    );
    assert(
      completion.indexOf('lesson.phase === "first-step"') <
        completion.indexOf("markFirstTasteFinished()"),
      "and only for the first taste",
    );
  });

  test("an interrupted first run is resumed, not replayed and not lost", () => {
    const home = src("app/(tabs)/index.tsx");
    assert(
      home.includes("!hasFinishedFirstTaste()"),
      "home redirects while the first taste is unfinished",
    );
    const renderer = src("components/lesson-v1/LessonRendererV1.tsx");
    assert(
      renderer.includes("resumeIndexFor"),
      "and the cursor puts them back on the beat they left",
    );
  });

  test("the opening beat offers no way out of the only entry point", () => {
    // Confirmed on device before the fix: one tap on the chevron at beat 1
    // landed on a Journey the learner had never met.
    const renderer = src("components/lesson-v1/LessonRendererV1.tsx");
    assert(
      renderer.includes('lesson.phase !== "first-step" || screenIndex > 0'),
      "no back affordance on the first taste's first screen",
    );
    assert(renderer.includes("{onBack ? ("), "the chevron is not drawn when there is no target");
  });

  test("where the learner was inside L0 is remembered by the ordinary cursor", () => {
    const renderer = src("components/lesson-v1/LessonRendererV1.tsx");
    assert(renderer.includes("resumeIndexFor"), "L0 resumes like any lesson");
    assert(!route.includes("useState<Step>"), "and not by a bespoke beat machine");
  });

  test("no bespoke first-use grader survives", () => {
    for (const gone of ["acceptsRebuild", "acceptsCoffeeRemainder", "lessonZeroAnswers"]) {
      assert(!route.includes(gone), `first use must not carry ${gone}`);
    }
  });
});

// ── C. GRADING ──────────────────────────────────────────────────────────────

describe("the first win is real, and a wrong answer is never praised", () => {
  const ev = (text: string, matched = false) => componentEvidence(text, [ORDER], matched);

  test("unrelated text is a mismatch and evidences nothing", () => {
    const r = ev("Aaa");
    assertEqual(r.verdict, "mismatch", "the first thing a learner types must not be praised blindly");
    assert(!r.meaningEvidenced, "and must not claim their meaning landed");
  });

  test("French-looking but wrong is still wrong", () => {
    const r = ev("Merci, au revoir");
    assertEqual(r.verdict, "mismatch", "looking like French is not doing the task");
    assert(!r.meaningEvidenced, "no meaning claim");
  });

  test("a partial order is partial, and says so without contradicting itself", () => {
    const r = ev("Bonjour.");
    assertEqual(r.verdict, "partial", "a real piece is recognised");
    assert(!r.meaningEvidenced, "but half an order is not the whole meaning");
  });

  test("the full order is accepted", () => {
    const r = ev(ORDER, true);
    assertEqual(r.verdict, "full", "the whole order is the whole answer");
    assert(r.meaningEvidenced, "an exact match evidences meaning");
  });

  test("the short order is accepted too, so the first win is forgiving", () => {
    const weave = screens.find((s) => s.type === "weave") as WeaveScreen;
    const accepted = [
      ...(weave.payload.expectedAnswers ?? []),
      ...(weave.payload.acceptedAlternatives ?? []),
    ].map((a) => a.toLowerCase());
    assert(
      accepted.includes("bonjour, je voudrais un café."),
      "stopping at the coffee is still a success",
    );
  });
});

// ── E. MASTERY HONESTY ──────────────────────────────────────────────────────

describe("L0 evidence stays honest", () => {
  test("the watched surface grades nothing and claims nothing", () => {
    // Was the assembly Showcase; it is the familiar-words reel now. Same
    // contract, and the same reason: watching is not producing.
    const reel = screens.find((s) => s.type === "pattern-reel");
    assert(reel !== undefined, "the reel is the first taste's watched surface");
    assertEqual(reel!.targetItemIds, undefined, "a reel declares no targets");
    assertEqual(
      (reel as { evidenceTargetItemIds?: unknown }).evidenceTargetItemIds,
      undefined,
      "and emits no evidence: reading is not learning",
    );
  });

  test("only screens the learner acts on claim anything", () => {
    // The general form of the rule above, so a future watched beat cannot
    // quietly arrive carrying targets.
    for (const s of screens) {
      if (s.type === "meet-card" || s.type === "weave") continue;
      assertEqual(s.targetItemIds, undefined, `${s.id} claims targets it cannot earn`);
    }
  });

  test("revealing a piece is not the learner producing it", () => {
    // The bridge SHOWS "un café" in its model answer — that is how the first
    // taste has always taught it — but it credits only the piece the learner
    // actually brought, which is je voudrais. Crediting the revealed word would
    // turn reading the answer into evidence of producing it.
    const bridge = screens.find((s) => s.id === "s08-weave-hybrid-order") as WeaveScreen;
    assert(bridge !== undefined, "the bridge is authored");
    assertEqual(
      bridge.evidenceTargetItemIds?.join(","),
      "chunk-je-voudrais",
      "only the piece the learner carried in",
    );
    assert(
      bridge.payload.reveal.modelAnswer?.includes("un café"),
      "even though un café is right there in the reveal",
    );
  });
});

// ── F. BOUNDARY ─────────────────────────────────────────────────────────────

describe("the slice boundary still holds", () => {
  test("no lesson or seed beyond L10", () => {
    assertEqual(
      V1_LESSONS.filter((l) => l.number > 10 && isV1LessonInStageScope(l.number)).length,
      0,
      "no L11 lesson in scope",
    );
    const beyond = (PRACTICE_SEEDS as unknown as { originLessonId: string }[]).filter(
      (s) => Number(s.originLessonId.slice(-3)) > 10,
    );
    assertEqual(beyond.length, 0, "no L11 seed");
  });

  test("L0 contributes no Practice seeds", () => {
    // Practice outputs what the Journey taught. L0 is the taste before the
    // path, so it seeds nothing, and the By-lesson picker never offers it.
    const fromL0 = (PRACTICE_SEEDS as unknown as { originLessonId: string }[]).filter(
      (s) => s.originLessonId === "v1-lesson-000",
    );
    assertEqual(fromL0.length, 0, "L0 seeds nothing: Practice outputs what the Journey taught");
  });
});

// ── H. WHAT THE DEVICE SHOWED ───────────────────────────────────────────────
//
// Everything below was found by playing L0 from a wiped store on an iPhone 17
// Pro, not by reading the code. Each one is here so it cannot come back.

describe("the first taste never claims something the learner did not do", () => {
  const renderer = src("components/lesson-v1/LessonRendererV1.tsx");

  test("the closing line checks whether the order actually landed", () => {
    // It read "You just ordered a coffee in French." unconditionally. Typing
    // Aaa, being told to compare with the model, and then being congratulated
    // for ordering a coffee is the same untruth the answer verdict was fixed
    // to stop telling, moved one screen later.
    const closing = renderer.slice(renderer.indexOf("function CompletionView"));
    assert(closing.includes("orderLanded"), "the completion view knows the outcome");
    const claimAt = closing.indexOf("You just ordered a coffee in French.");
    assert(claimAt > 0, "the earned line still exists");
    assert(
      closing.lastIndexOf("orderLanded", claimAt) > closing.indexOf("isFirstTaste", 0),
      "and it sits behind the check, not beside it",
    );
  });

  test("only a full verdict earns it — an evidenced near-miss does not", () => {
    assert(
      renderer.includes('facts.evaluation.evidence.verdict === "full"'),
      "the renderer reads the verdict the Weave already produced",
    );
    assert(
      !renderer.includes("meaningEvidenced"),
      "meaning evidenced is enough to be understood, not enough to have ordered",
    );
    // The contract behind that choice, exercised directly.
    const full = componentEvidence(ORDER, [ORDER], true);
    assertEqual(full.verdict, "full", "the model answer is full");
    const nonsense = componentEvidence("Aaa", [ORDER], false);
    assert(nonsense.verdict !== "full", "nonsense is never full");
    assert(!nonsense.meaningEvidenced, "and evidences nothing");
  });

  test("the recap names what the lesson showed, not what the learner produced", () => {
    const recap = lesson000.screens.find((s) => s.type === "recap");
    assert(recap !== undefined && recap.type === "recap", "L0 ends on a recap");
    const lines = recap.type === "recap" ? recap.payload.lines : [];
    assert(
      lines.some((l) => l.includes("saw three pieces become one real sentence")),
      "the assembly line is bound to the Showcase, which happened for everyone",
    );
    assert(
      !lines.some((l) => /you put .* together/i.test(l)),
      "no recap line may assert the one production that may have missed",
    );
  });

  test("the last two screens do not both say Begin", () => {
    const recap = lesson000.screens.find((s) => s.type === "recap");
    const label = recap?.type === "recap" ? recap.payload.nextLabel : undefined;
    assert(label !== "Begin", "the closing screen is the one that begins the path");
    assert(renderer.includes('label="Begin"'), "and it still does");
  });
});

describe("the blank reads as a blank, not as a typo", () => {
  test("no gap is left in front of a comma or a full stop", () => {
    // Rendered "Bonjour, je voudrais ____ ." on the first taste's only
    // recognition beat, because the blank carried its own padding spaces.
    const fill = src("components/lesson-v1/screens/FillWithTraps.tsx");
    assert(fill.includes("function blankRun("), "spacing is decided, not hardcoded");
    assert(!fill.includes('{"  ____  "}'), "the padded literal is gone from the render");
  });

  test("a blank followed by a word keeps its room", () => {
    // Half the corpus writes the tail as "un café." with no leading space and
    // relies on the blank for it, so the room may only be dropped before
    // punctuation.
    const tails = V1_LESSONS.flatMap((l) => flattenLessonScreens(l))
      .filter((s) => s.type === "fill-with-traps")
      .map((s) => (s.type === "fill-with-traps" ? s.payload.sentenceAfter : undefined))
      .filter((t): t is string => typeof t === "string" && t !== "");
    assert(tails.length > 0, "there are fills to check");
    assert(
      tails.some((t) => /^[a-zà-ÿ]/i.test(t)),
      "at least one tail starts with a word and needs the room kept",
    );
  });
});

describe("the first taste is the cognate-first one again", () => {
  // The founder's report: the newer L0 was worse than the older cognate-first
  // L0. It was — the rebuild onto the lesson engine kept the arc and lost the
  // two beats that made it land. These pin the restored ones.

  test("the familiar-words reel is back, and it is the old one", () => {
    const reel = screens.find((s) => s.type === "pattern-reel");
    assert(reel !== undefined, "the reel is the beat that says you are not starting from zero");
    const payload = (reel as PatternReelScreen).payload;
    assert(payload.stem === undefined, "L0's reel is the two-column one, not a pattern reveal");
    assert(payload.rows.length >= 6, "a reel of three words is a list, not a reel");
    // The exact pairs the old lesson-zero carried, café included: it echoes the
    // word the bridge has just taught, which is why it was chosen.
    const fr = payload.rows.map((r) => r.fr);
    for (const word of ["restaurant", "important", "possible", "café"]) {
      assert(fr.includes(word), `the reel lost "${word}"`);
    }
  });

  test("the reel lands after the learner has produced something, never before", () => {
    // "Look what you already know" is an observation about what just happened.
    // In front of the first production it is a promise, and a promise is the
    // thing the old arc deliberately did not make.
    const reelAt = screens.findIndex((s) => s.type === "pattern-reel");
    const firstProduction = screens.findIndex((s) => s.type === "weave");
    assert(reelAt > firstProduction, "the reel must follow the first ask");
  });

  test("the bridge reveals the missing piece rather than pre-teaching it", () => {
    // The whole mechanism: if "un café" is taught before the bridge, there is
    // no "only the part you did not have yet changed" left to show.
    const bridgeAt = screens.findIndex((s) => s.id === "s08-weave-hybrid-order");
    assert(bridgeAt >= 0, "the bridge is authored");
    // No meet card introduces it, anywhere. The reveal is the teaching
    // encounter, which is what the old arc did and what makes the bridge work.
    assert(
      screens.every(
        (s) => s.type !== "meet-card" || !(s.targetItemIds ?? []).includes("noun-cafe"),
      ),
      "a meet card for un café would leave the bridge nothing to reveal",
    );
    const bridge = screens[bridgeAt] as WeaveScreen;
    assertEqual(
      bridge.payload.reveal.modelAnswer,
      "Bonjour, je voudrais un café.",
      "and the reveal is where the French arrives",
    );
  });

  test("both bridges accept the learner's own language and the full French", () => {
    for (const id of ["s08-weave-hybrid-order", "s09-weave-hybrid-tea"]) {
      const w = screens.find((s) => s.id === id) as WeaveScreen;
      assert(w !== undefined, `${id} is authored`);
      const expected = String(w.payload.expectedAnswers?.[0] ?? "");
      const scaffold = scaffoldWordsForScreen(id);
      assert(
        scaffold.some((word) => expected.toLowerCase().includes(word)),
        `${id} should EXPECT the hybrid, not merely tolerate it`,
      );
      // A learner who reaches further than asked is never marked wrong for it.
      const alts = w.payload.acceptedAlternatives ?? [];
      assert(
        alts.some((a) => /café|thé/.test(a)),
        `${id} must also accept the full French`,
      );
    }
  });
});
