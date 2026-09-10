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
import type { ShowcaseScreen, WeaveScreen } from "../../content/lessonTypes";

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
    // teaches a line instead of a piece.
    const meetFrench = screens
      .filter((s) => s.type === "meet-card")
      .map((s) => String((s.payload as { fr?: string }).fr ?? ""));
    assert(meetFrench.includes("je voudrais"), "the ask is met alone");
    assert(meetFrench.includes("un café"), "the thing is met alone");
    for (const fr of meetFrench) {
      assert(
        fr !== "Je voudrais un café.",
        "no meet card may hand over the assembled sentence",
      );
    }
  });

  test("the assembly beat shows the pieces rather than one memorised line", () => {
    const showcase = screens.find((s) => s.type === "showcase") as ShowcaseScreen | undefined;
    assert(showcase !== undefined, "L0 needs the screen that renders chips");
    const line = showcaseSentencesOf(lesson000)[0];
    assert(line !== undefined, "and one sentence in it");
    const pieces = showcasePieces(line.fr).map((p) => pieceLabel(p.text));
    assertEqual(
      pieces.join(" · "),
      "bonjour · je voudrais · un café",
      "the learner sees the three pieces they just met",
    );
    assertEqual(
      classifyShowcaseSentence(line),
      "BREAKDOWN_PRESENT",
      "the first sentence a learner ever sees must not be flat",
    );
  });

  test("there is exactly one production screen", () => {
    // A first taste that tests twice is a test. Open production starts in L1.
    const production = screens.filter(
      (s) => s.type === "weave" || s.type === "say-it-your-way",
    );
    assertEqual(production.length, 1, "one ask, heavily supported");
    assertEqual(production[0].type, "weave", "and it is the scaffolded one");
    assertEqual(
      (production[0] as WeaveScreen).payload.weaveType,
      "supported",
      "at the most supported tier there is",
    );
  });

  test("the arc is short enough to be a taste", () => {
    assert(
      screens.length >= 5 && screens.length <= 8,
      `${screens.length} beats: a first taste is roughly five to eight`,
    );
  });

  test("nothing in L0 asks for French it has not taught", () => {
    const weave = screens.find((s) => s.type === "weave") as WeaveScreen;
    const asked = String(weave.payload.expectedAnswers?.[0] ?? "");
    // A teaching encounter, not a registry lookup: "un" belongs to the package
    // "un café" the learner meets on a card, and the registry stores the noun
    // as "café". What matters is whether the word was put in front of them.
    const met = new Set<string>();
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
    for (const word of asked.toLowerCase().replace(/[.,!?]/g, " ").split(/\s+/).filter(Boolean)) {
      assert(met.has(word), `the first production asks for "${word}", which L0 never showed`);
    }
  });

  test("the softener is taught before it is used, and never required", () => {
    const met = screens.some(
      (s) => s.type === "meet-card" && (s.targetItemIds ?? []).includes("chunk-sil-vous-plait"),
    );
    assert(met, "a declared piece needs a teaching encounter");
    const weave = screens.find((s) => s.type === "weave") as WeaveScreen;
    const svp = (weave.payload.suggestedPieces ?? []).find(
      (p) => p.itemId === "chunk-sil-vous-plait",
    );
    assert(svp !== undefined, "it is offered on the tray");
    assert(svp?.required !== true, "but a first order without it is still a success");
    assert(
      (weave.payload.acceptedAlternatives ?? []).some((a) => !a.includes("plaît")),
      "the short order is accepted in full",
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
    assert(home.includes("lm7_seen_lesson_zero"), "gated on the first-use flag");
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

  test("the flag is written on entry, so an interrupted first run does not repeat", () => {
    // Deferring the flag to completion is exactly what makes a learner who put
    // the phone down mid-sentence get onboarding again from the top.
    assert(route.includes("markFirstUseSeen"), "there is one place that writes it");
    assert(
      route.includes("useEffect(() => {\n    markFirstUseSeen();\n  }, []);"),
      "written on mount, not on completion",
    );
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
  test("the assembly beat grades nothing and claims nothing", () => {
    const showcase = screens.find((s) => s.type === "showcase") as ShowcaseScreen;
    assertEqual(showcase.targetItemIds, undefined, "a Showcase declares no targets");
    assertEqual(
      (showcase as { evidenceTargetItemIds?: unknown }).evidenceTargetItemIds,
      undefined,
      "and emits no evidence: reading is not learning",
    );
  });

  test("the recognition beat credits the slot, not the frame it was shown", () => {
    const fill = screens.find((s) => s.type === "fill-with-traps");
    assert(fill !== undefined, "the light recognition beat exists");
    assertEqual(
      (fill as { evidenceTargetItemIds?: string[] }).evidenceTargetItemIds?.join(","),
      "noun-cafe",
      "only the chosen noun receives evidence",
    );
    assert(
      (fill?.targetItemIds ?? []).includes("chunk-je-voudrais"),
      "even though the frame is on screen",
    );
  });

  test("meeting a piece is not producing it", () => {
    const meetTargets = screens
      .filter((s) => s.type === "meet-card")
      .flatMap((s) => s.targetItemIds ?? []);
    assert(meetTargets.includes("chunk-sil-vous-plait"), "the softener is met");
    const weave = screens.find((s) => s.type === "weave") as WeaveScreen;
    const required = (weave.payload.suggestedPieces ?? [])
      .filter((p) => p.required === true)
      .map((p) => p.itemId);
    assert(
      !required.includes("chunk-sil-vous-plait"),
      "being met does not make it something the learner must produce",
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
