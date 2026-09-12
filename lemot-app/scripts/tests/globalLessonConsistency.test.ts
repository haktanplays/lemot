/**
 * Global lesson-consistency guard (Product Polish, third implementation PR).
 *
 * Locks the cross-lesson corrections from the consolidated review: F-04 (repeated
 * and inconsistent Weave feedback), F-05/F-17 (Fill prompt grammar), F-07 (L1 Say
 * It), F-08 (Goal/Recap title collisions), F-09/F-14 (competing metaphors and
 * recap notation), F-10/F-12 (lecture opening and archetype runs), F-13
 * (ifCorrectButFlat opener drift), F-16 (Goal-title punctuation), F-20 (canDo).
 *
 * Presentation only: this suite asserts copy, ordering and label shape. It
 * asserts NOTHING about evaluator outcomes, evidence class, mastery or identity
 * beyond checking that identity did not move.
 *
 * Pure tsx: structured lesson data plus node:fs reads of the four learner-facing
 * components whose copy is centralized. No React Native / Expo layer is loaded.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import type { Lesson, WeaveScreen } from "../../content/lessonTypes";
import { reviewProductionQuality } from "../../content/lessons/productionQuality";

const APP_ROOT = process.cwd();
const src = (rel: string) => readFileSync(join(APP_ROOT, rel), "utf8");

/** Authored lessons this PR governs. L0 renders from app/lesson-zero.tsx. */
const AUTHORED = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10);
/** Every registered lesson up to L10, including the L0 fixture. */
const THROUGH_L10 = V1_LESSONS.filter((l) => l.number <= 10);

const EXCLUDE_KEYS = new Set([
  "id",
  "type",
  "insightType",
  "weaveType",
  "validationMode",
  "targetItemIds",
  "evidenceTargetItemIds",
  "weakPointTags",
  "itemId",
  "answer",
  "supportRole",
  "learningErrorTag",
]);

function learnerStrings(node: unknown, out: string[]): void {
  if (typeof node === "string") {
    out.push(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const v of node) learnerStrings(v, out);
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (EXCLUDE_KEYS.has(k)) continue;
      learnerStrings(v, out);
    }
  }
}

/**
 * Flattened on purpose: a weave inside an activity chain is still a weave the
 * learner produces. Reading only top-level screens would let a lesson lose its
 * open summit simply by chaining it, which is precisely the regression the
 * scaffolding guards exist to prevent.
 */
const weavesOf = (l: Lesson): WeaveScreen[] =>
  flattenLessonScreens(l).filter((s): s is WeaveScreen => s.type === "weave");

const goalOf = (l: Lesson) =>
  flattenLessonScreens(l).find(
    (s) => (s.payload as { insightType?: string }).insightType === "lesson-goal",
  ) as { payload: { title?: string } } | undefined;

const recapOf = (l: Lesson) =>
  flattenLessonScreens(l).find((s) => s.type === "recap") as
    | { payload: { title?: string; lines: string[]; nextLabel?: string } }
    | undefined;

// ── Part A: feedback ───────────────────────────────────────────────────────

describe("Weave feedback presentation is one stable shape", () => {
  test("the checked state renders verdict, then the model, then one observation", () => {
    const weave = src("components/lesson-v1/screens/Weave.tsx");
    const reveal = src("components/lesson-v1/screens/NaturalReveal.tsx");
    // Verdict is the note block, rendered before NaturalRevealView.
    const verdictAt = weave.indexOf("{note.text}");
    const revealAt = weave.indexOf("<NaturalRevealView");
    assert(verdictAt > 0 && revealAt > 0, "both blocks render");
    assert(verdictAt < revealAt, "verdict comes before the model/observation card");
    // Inside the reveal, the model card precedes the observation blocks.
    const modelAt = reveal.indexOf("A natural version");
    const ifCorrectAt = reveal.indexOf("{reveal.ifCorrect}");
    const noticesAt = reveal.indexOf("notices.map");
    assert(modelAt > 0, "the model card is labelled");
    assert(modelAt < ifCorrectAt, "model precedes the ifCorrect observation");
    assert(modelAt < noticesAt, "model precedes the notice observation");
  });

  test("the model card label is 'A natural version'", () => {
    assert(
      src("components/lesson-v1/screens/NaturalReveal.tsx").includes("A natural version"),
      "canonical model label",
    );
  });

  test("no learner-facing 'model answer' anywhere", () => {
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/NaturalReveal.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
    ]) {
      const body = src(rel).replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
      assert(!/model answer/i.test(body), `${rel} still says "model answer"`);
    }
    for (const l of THROUGH_L10) {
      const out: string[] = [];
      learnerStrings(l.screens, out);
      for (const s of out) {
        assert(!/model answer/i.test(s), `${l.id}: ${JSON.stringify(s)}`);
      }
    }
  });

  test("the canonical compare helper says 'the model'", () => {
    assert(
      src("components/lesson-v1/screens/Weave.tsx").includes('"Compare with the model."'),
      "verdict helper uses the canonical noun",
    );
  });

  test("every ifCorrectButFlat opens with 'Right.'", () => {
    for (const l of THROUGH_L10) {
      for (const w of weavesOf(l)) {
        const flat = w.payload.reveal.ifCorrectButFlat;
        if (flat === undefined) continue;
        assert(
          flat.startsWith("Right."),
          `${l.id}/${w.id} opener drifted: ${JSON.stringify(flat)}`,
        );
      }
    }
  });

  test("the ungrammatical repeated observation is gone", () => {
    for (const l of THROUGH_L10) {
      const out: string[] = [];
      learnerStrings(l.screens, out);
      for (const s of out) {
        assert(
          !s.includes("A native joins the pieces this way"),
          `${l.id} still carries the banned line`,
        );
      }
    }
  });

  test("no observation is reused, inside a lesson or across L0-L10", () => {
    const seen = new Map<string, string>();
    for (const l of THROUGH_L10) {
      for (const w of weavesOf(l)) {
        const obs = w.payload.reveal.ifUnderstandableButWrong;
        if (!obs) continue;
        const prev = seen.get(obs);
        assert(
          prev === undefined,
          `${l.id}/${w.id} repeats the observation already used at ${prev}`,
        );
        seen.set(obs, `${l.id}/${w.id}`);
      }
    }
  });

  test("every weave can fill all three blocks without an empty slot", () => {
    for (const l of THROUGH_L10) {
      for (const w of weavesOf(l)) {
        const r = w.payload.reveal;
        assert(r.modelAnswer, `${l.id}/${w.id} has no model`);
        assert(r.ifCorrect, `${l.id}/${w.id} has no exact-match observation`);
        assert(r.ifCorrectButFlat, `${l.id}/${w.id} has no alternative-match observation`);
        assert(
          r.ifUnderstandableButWrong,
          `${l.id}/${w.id} has no no-match observation`,
        );
      }
    }
  });
});

// ── Part B: fill prompts ───────────────────────────────────────────────────

describe("Fill prompts stand alone and start from intention", () => {
  test("no bare UI-blank prompt in L1-L10", () => {
    for (const l of AUTHORED) {
      for (const s of flattenLessonScreens(l)) {
        if (s.type !== "fill-with-traps") continue;
        const p = (s.payload as { prompt: string }).prompt;
        assert(
          !/what fits the empty space/i.test(p),
          `${l.id}/${s.id}: ${JSON.stringify(p)}`,
        );
      }
    }
  });

  test("no prompt depends on the previous screen", () => {
    for (const l of AUTHORED) {
      for (const s of flattenLessonScreens(l)) {
        if (s.type !== "fill-with-traps") continue;
        const p = (s.payload as { prompt: string }).prompt.trim();
        assert(!/^and\b/i.test(p), `${l.id}/${s.id} opens with a dependent "And"`);
        assert(p.endsWith("?") || p.endsWith("."), `${l.id}/${s.id} has no closing question`);
      }
    }
  });

  test("options, answers and trapReasons still exist on every fill", () => {
    for (const l of AUTHORED) {
      for (const s of flattenLessonScreens(l)) {
        if (s.type !== "fill-with-traps") continue;
        const p = s.payload as {
          options: { id: string; isCorrect?: boolean; trapReason?: string }[];
          answer: string[];
        };
        assert(p.options.length >= 2, `${l.id}/${s.id} lost its options`);
        assert(p.answer.length >= 1, `${l.id}/${s.id} lost its answer`);
        for (const o of p.options) {
          if (o.isCorrect) continue;
          assert(o.trapReason, `${l.id}/${s.id} distractor ${o.id} lost its trapReason`);
        }
      }
    }
  });
});

// ── Part C: L1 Say It ──────────────────────────────────────────────────────

describe("L1 Say It is a scene, not a checklist", () => {
  const l1 = V1_LESSONS.find((l) => l.number === 1)!;
  const sayIt = flattenLessonScreens(l1).find((s) => s.id === "s08-sayit-cafe-order") as {
    payload: { situation: string; communicativeGoal: string; modelAnswer?: string };
  };

  test("the situation is a real moment", () => {
    const words = sayIt.payload.situation.trim().split(/\s+/).length;
    assert(words >= 8, `situation is too thin to be a scene: ${sayIt.payload.situation}`);
    assert(
      !/^this is your order/i.test(sayIt.payload.situation),
      "the product-voice framing is gone",
    );
  });

  test("the goal is at most 10 words and at most two requirements", () => {
    const goal = sayIt.payload.communicativeGoal;
    const words = goal.trim().split(/\s+/).length;
    assert(words <= 10, `goal is ${words} words: ${goal}`);
    const requirements = goal.split(/,| and | then /i).filter((x) => x.trim().length > 0);
    assert(requirements.length <= 2, `goal carries ${requirements.length} requirements: ${goal}`);
  });

  test("the preferred answer is unchanged", () => {
    assertEqual(
      sayIt.payload.modelAnswer,
      "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
      "answer behaviour untouched",
    );
  });
});

// ── Part D: rhythm ─────────────────────────────────────────────────────────

describe("rhythm corrections in L2, L3, L5 and L6", () => {
  const seq = (n: number) => V1_LESSONS.find((l) => l.number === n)!.screens.map((s) => s.type);

  // The L2 adjacency rule is RETIRED. Separating two identical demands does not
  // make them two demands; PQ-3 names the real problem and reports L2's pair as
  // known content debt. Policing the same intent two different ways is worse
  // than policing it once, well.
  test("L2's two productions are no longer equivalent (PQ-3 clear)", () => {
    // s04 asks for "Je suis ici."; s05 now asks for "Excusez-moi, je suis ici."
    // Same engine, different moment — which is what L2 claims and previously
    // could not demonstrate.
    const warnings = reviewProductionQuality(V1_LESSONS).filter((d) => d.code === "PQ-3");
    assertEqual(warnings.length, 0, "no duplicate production demands");
  });

  test("L3 has no run of three weaves", () => {
    const t = seq(3);
    for (let i = 2; i < t.length; i++) {
      assert(
        !(t[i] === "weave" && t[i - 1] === "weave" && t[i - 2] === "weave"),
        "three consecutive weaves remain",
      );
    }
  });

  test("L5 has no run of three fills", () => {
    const t = seq(5);
    for (let i = 2; i < t.length; i++) {
      assert(
        !(
          t[i] === "fill-with-traps" &&
          t[i - 1] === "fill-with-traps" &&
          t[i - 2] === "fill-with-traps"
        ),
        "three consecutive fills remain",
      );
    }
  });

  test("L6 does not open Goal then a second explanation", () => {
    // Opening contract moved by the language-world rebuild: Showcase, then the
    // goal card, then French. The property under test is unchanged -- the goal
    // must not be followed by a second explanation screen.
    const t = seq(6);
    assertEqual(t[0], "showcase", "language world first");
    assertEqual(t[1], "insight-card", "goal second");
    assert(t[2] !== "insight-card", "the lecture opening is gone");
  });

  test("every lesson keeps Showcase first, Goal second, Recap last, and no three identical in a row", () => {
    for (const l of AUTHORED) {
      const pages = l.screens.map((s) => s.type);
      assertEqual(pages[0], "showcase", `${l.id} opens on its language world`);
      assertEqual(pages[1], "insight-card", `${l.id} states its goal second`);
      assertEqual(pages[pages.length - 1], "recap", `${l.id} closes on the recap`);
      // Sameness is judged on ACTIONS, not pages. The rule protects the learner
      // from three identical-feeling screens in a row, and "activity-chain" is
      // not something the learner feels -- what they feel is the meet, the
      // choice and the production inside it. Three consecutive chains that each
      // hold a different sequence are varied; three consecutive meet-cards are
      // not, whether or not a chain happens to contain them.
      const t = flattenLessonScreens(l).map((s) => s.type);
      for (let i = 2; i < t.length; i++) {
        assert(
          !(t[i] === t[i - 1] && t[i] === t[i - 2]),
          `${l.id}: three consecutive ${t[i]}`,
        );
      }
    }
  });

  // The exact per-lesson production-count lock is RETIRED. It froze layout:
  // any legitimate re-authoring failed it, and a count never distinguished a
  // real ladder from repetition. PQ-2 guards the structure instead; counts are
  // reported (never contracted) in scripts/tests/productionQuality.test.ts.
  test("every authored lesson still demands unsupplied generation (PQ-2)", () => {
    assertEqual(
      reviewProductionQuality(AUTHORED).filter((d) => d.code === "PQ-2"),
      [],
      "reordering never removed a lesson's retrieval floor",
    );
  });
});

// ── Parts E, F, I: titles, canDo, punctuation ──────────────────────────────

describe("Goal states the contract, Recap states the result", () => {
  const normalize = (t: string) =>
    t.toLowerCase().replace(/[^a-z ]/g, "").replace(/\b(a|the|your|one)\b/g, "").replace(/\s+/g, " ").trim();

  test("no Goal/Recap title pair collides after normalization", () => {
    for (const l of AUTHORED) {
      const g = goalOf(l)?.payload.title ?? "";
      const r = recapOf(l)?.payload.title ?? "";
      assert(g.length > 0 && r.length > 0, `${l.id} is missing a title`);
      assert(
        normalize(g) !== normalize(r),
        `${l.id} repeats its goal title as the recap: ${JSON.stringify(g)} / ${JSON.stringify(r)}`,
      );
    }
  });

  test("recap titles are not all the same shape", () => {
    const titles = AUTHORED.map((l) => recapOf(l)!.payload.title ?? "");
    const youCan = titles.filter((t) => /^you can\b/i.test(t)).length;
    assert(youCan < titles.length, "recap titles must keep some variety");
  });

  test("Goal titles carry no terminal punctuation; explanatory insight titles may", () => {
    for (const l of AUTHORED) {
      const g = goalOf(l)!.payload.title ?? "";
      assert(
        !/[.!?]$/.test(g.trim()),
        `${l.id} goal title must stay unpunctuated: ${JSON.stringify(g)}`,
      );
    }
  });
});

describe("canDo is a short imperative capability line", () => {
  const NON_IMPERATIVE = new Set(["you", "i", "we", "it", "the", "your", "a"]);
  const BANNED = /\busing\s+(ne\b|j'ai|je\b)|ne\s*\.\.\.\s*pas|\bj'ai\b/i;

  test("every canDo is at most 10 words", () => {
    for (const l of AUTHORED) {
      const n = l.canDo.trim().split(/\s+/).length;
      assert(n <= 10, `${l.id} canDo is ${n} words: ${l.canDo}`);
    }
  });

  test("every canDo opens imperatively", () => {
    for (const l of AUTHORED) {
      const first = l.canDo.trim().split(/\s+/)[0].replace(/[^A-Za-z']/g, "").toLowerCase();
      assert(!NON_IMPERATIVE.has(first), `${l.id} canDo is not imperative: ${l.canDo}`);
    }
  });

  test("no canDo carries grammar notation or a French form as the objective", () => {
    for (const l of AUTHORED) {
      assert(!BANNED.test(l.canDo), `${l.id} canDo names a grammatical form: ${l.canDo}`);
    }
  });
});

// ── Part G: recaps and metaphors ───────────────────────────────────────────

describe("recaps name capabilities, not structure", () => {
  const RETIRED = /\b(sibling|cargo|sandwich|wrapper)\b/i;

  test("no retired metaphor in any L1-L10 learner string", () => {
    for (const l of AUTHORED) {
      const out: string[] = [];
      learnerStrings(l.screens, out);
      for (const s of out) {
        assert(!RETIRED.test(s), `${l.id}: ${JSON.stringify(s)}`);
      }
    }
  });

  test("recap lines carry no formula notation", () => {
    for (const l of AUTHORED) {
      for (const line of recapOf(l)!.payload.lines) {
        assert(!line.includes(" + "), `${l.id}: ${JSON.stringify(line)}`);
        assert(!/ne\s*\.\.\.\s*pas/i.test(line), `${l.id}: ${JSON.stringify(line)}`);
      }
    }
  });

  test("no recap line is reused verbatim across lessons", () => {
    const seen = new Map<string, string>();
    for (const l of AUTHORED) {
      for (const line of recapOf(l)!.payload.lines) {
        const prev = seen.get(line);
        assert(prev === undefined, `${l.id} repeats ${prev}'s recap line: ${JSON.stringify(line)}`);
        seen.set(line, l.id);
      }
    }
  });

  test("recap nextLabel stays 'Continue'", () => {
    for (const l of AUTHORED) {
      assertEqual(recapOf(l)!.payload.nextLabel, "Continue", `${l.id} nextLabel`);
    }
  });
});

// ── Part H and I: labels ───────────────────────────────────────────────────

describe("hint and header labels are consistent", () => {
  test("'Need a hint?' is the entry hint label on every surface that offers one", () => {
    // app/lesson-zero.tsx is no longer in this list: first use renders the
    // lesson engine now and offers no hint of its own, so requiring the label
    // there would require it to grow a second hint system to satisfy a test
    // about not having two of them.
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
    ]) {
      assert(src(rel).includes("Need a hint?"), `${rel} uses the canonical hint label`);
    }
  });

  test("no synonym of the entry hint label survives", () => {
    // The synonym ban still covers first use: it must not reintroduce one.
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
      "app/lesson-zero.tsx",
    ]) {
      const body = src(rel);
      assert(!/Need an idea\?/.test(body), `${rel} still says "Need an idea?"`);
      assert(!/Need a nudge\?/.test(body), `${rel} still says "Need a nudge?"`);
    }
  });

  test("the practice header is not shouted", () => {
    for (const rel of [
      "components/practice-hub/PracticeHubPractice.tsx",
      "components/learning-engine/PracticePoolPracticePanel.tsx",
    ]) {
      const body = src(rel);
      assert(body.includes("Practice this piece"), `${rel} keeps the header text`);
      assert(
        !/textTransform:\s*"uppercase"/.test(body),
        `${rel} still uppercases the practice header`,
      );
    }
  });

  test("PM-009 stays an intentionally unscaffolded checkpoint", () => {
    const l1 = V1_LESSONS.find((l) => l.number === 1)!;
    const pm009 = flattenLessonScreens(l1).find((s) => s.id === "s10-weave-merci-thanks") as WeaveScreen;
    assertEqual(
      (pm009.payload.suggestedPieces ?? []).length,
      0,
      "no support pieces were added",
    );
    assertEqual(pm009.payload.hintCloze, undefined, "no cloze was added");
  });

  test("L7-L10 hint coverage from the previous PR is intact", () => {
    for (const l of V1_LESSONS.filter((x) => x.number >= 7 && x.number <= 10)) {
      for (const w of weavesOf(l)) {
        if (w.payload.weaveType === "supported") continue;
        assert(
          typeof w.payload.hintCloze === "string" && w.payload.hintCloze.length > 0,
          `${l.id}/${w.id} lost its cloze`,
        );
      }
    }
  });
});

// ── Regression ─────────────────────────────────────────────────────────────

describe("nothing identity-bearing moved", () => {
  test("L7-L10 screen counts and tier sequences match the founder-usable pass", () => {
    // Snapshot, not contract. It was taken while L7-L10 were out of scope; the
    // L7-L10 founder-usable pass owns them, so it moves here exactly as the
    // L1-L3 and L1-L6 passes moved their own ranges. Every lesson now REACHES
    // open, so the ceiling no longer regresses anywhere between L6 and L10.
    // Moved again by the corpus-closure pass, which added an answer-shaped
    // choice and a French-context production to L7/L8/L9. L10 is untouched:
    // its reconciliation was accepted-alternatives only, by design.
    const EXPECTED: Record<number, { screens: number; tiers: string }> = {
      // Page counts fell where single-action screens collapsed into chains;
      // the TIER strings are unchanged, which is the point -- chaining moved
      // pages, not production.
      // Moved by the L7 production pass, which added a destinations chain and
      // a closing chain. The tier string GAINED its easy rung: the locked
      // ladder wants a first unsupported production of new material to be
      // given its exact meaning, and L7 had none.
      7: { screens: 12, tiers: "supported,mid,context,mid,mid,open,open" },
      // Moved by the authorised weave-contract correction. No screen moved and
      // no prompt changed except one answer leak in L9; what changed is that
      // five tiers stopped claiming to withhold something the prompt was
      // already handing over. "Ask where it is" names a communicative job, not
      // a situation, and `mid` is the rung for that.
      8: { screens: 13, tiers: "mid,mid,open,mid,open,open" },
      // L9's first production became a MEANING TRANSFER in the founder UX
      // pass: L3-L10 contained none at all, so every weave after L2 handed the
      // learner a scene and asked them to produce. Giving the meaning makes it
      // supported on the locked ladder. The screen count is unchanged, which
      // is the property this snapshot is for: the operation changed, not the
      // shape of the lesson.
      9: { screens: 12, tiers: "supported,open,open,open" },
      // L8 and L10 each gained one page in the curiosity pass: the intonation
      // card and the closing-merci card. Note what did NOT move — both TIER
      // strings are identical, because a curiosity card is not a production.
      // That is the property this snapshot is actually for.
      // L10 lost ONE page in the founder UX pass: the whole-day textbox, whose
      // model concatenated five sentences the learner had already produced
      // beat by beat in their own scenes. Removing it is the capstone fix, not
      // a trim. The tier string is unchanged, which is the property this
      // snapshot is for: the remaining productions did not move.
      10: { screens: 12, tiers: "mid,open,open,open" },
    };
    for (const [n, exp] of Object.entries(EXPECTED)) {
      const l = V1_LESSONS.find((x) => x.number === Number(n))!;
      assertEqual(l.screens.length, exp.screens, `${l.id} screen count`);
      assertEqual(
        weavesOf(l).map((w) => w.payload.weaveType).join(","),
        exp.tiers,
        `${l.id} tier sequence`,
      );
    }
  });

  test("registered pilot payload screens still exist with their evidence surface", () => {
    const l1 = V1_LESSONS.find((l) => l.number === 1)!;
    const pm009 = flattenLessonScreens(l1).find((s) => s.id === "s10-weave-merci-thanks")!;
    const pm011 = flattenLessonScreens(l1).find((s) => s.id === "s11-weave-the-order")!;
    assertEqual(
      JSON.stringify((pm009 as { targetItemIds?: string[] }).targetItemIds),
      JSON.stringify(["chunk-merci"]),
      "PM-009 evidence surface",
    );
    assertEqual(
      JSON.stringify((pm011 as { evidenceTargetItemIds?: string[] }).evidenceTargetItemIds),
      JSON.stringify(["chunk-un-the"]),
      "PM-011 evidence surface",
    );
  });

  test("every qualified screen id across the registry is still unique", () => {
    const qualified = V1_LESSONS.flatMap((l) =>
      flattenLessonScreens(l).map((s) => `${l.id}/${s.id}`),
    );
    assertEqual(new Set(qualified).size, qualified.length, "no collision");
  });

  test("the Journey visibility cap is the stage's slice, not a hardcoded range", () => {
    // The authored path is still L1-L24 and the sandbox ceiling still says so.
    // What changed is where the number lives: the founder APK stops at the end
    // of the finished slice, so the screen asks the stage instead of deciding.
    assert(
      src("app/(tabs)/index.tsx").includes("isV1LessonInStageScope"),
      "the path screen must filter through the stage-scope predicate",
    );
    assert(
      !src("app/(tabs)/index.tsx").includes("l.number <= 24"),
      "a hardcoded range beside the predicate would be a second source of truth",
    );
  });
});

describe("a card that describes a derivation draws one", () => {
  // From the six-behaviours duplicate audit: the Derivation Ladder had a
  // field, a renderer and two validators, and was used in exactly one lesson
  // out of twenty-five. Three insight-cards said "X becomes Y" in prose and
  // then drew X and Y as two flat rows, leaving the becoming to the reader.
  //
  // This pins the two that are genuinely one form built from another. The
  // others that matched the prose sweep are deliberately NOT here: L8's is
  // intonation (nothing merges), L12's is a wrapper around an unchanged
  // sentence, and L15's is two different constructions side by side. A
  // derivation that derives nothing is a picture of a rule that did not happen.
  const ELISIONS: readonly [string, string, string][] = [
    ["v1-lesson-004", "s04-insight-jai-elision", "j'ai"],
    ["v1-lesson-011", "s06-insight-m-aider", "m'aider"],
  ];

  for (const [lessonId, screenId, outcome] of ELISIONS) {
    test(`${lessonId} shows the step that produces ${outcome}`, () => {
      const lesson = (V1_LESSONS as unknown as { id: string; screens: unknown[] }[]).find(
        (l) => l.id === lessonId,
      );
      assert(lesson !== undefined, `${lessonId} is missing`);
      let found: { from: string; via: string; to: string } | undefined;
      const walk = (node: unknown): void => {
        if (Array.isArray(node)) {
          for (const child of node) walk(child);
          return;
        }
        if (node === null || typeof node !== "object") return;
        const record = node as Record<string, unknown>;
        if (record.id === screenId) {
          const examples = (record.payload as { examples?: { derivation?: typeof found }[] })
            ?.examples;
          for (const example of examples ?? []) {
            if (example.derivation !== undefined) found = example.derivation;
          }
        }
        for (const value of Object.values(record)) walk(value);
      };
      walk(lesson!.screens);
      assert(found !== undefined, `${lessonId}/${screenId} describes a step it does not draw`);
      assert(found!.to === outcome, `it produces "${found!.to}" rather than "${outcome}"`);
      assert(
        found!.from !== found!.to,
        "a derivation whose outcome equals its input has derived nothing",
      );
      assert(
        /vowel/i.test(found!.via),
        "the via must say what actually triggers the elision, not just name it",
      );
    });
  }

  test("the ladder is no longer a single lesson's trick", () => {
    // The audit's finding, kept measurable: four instances, all in L7.
    let lessonsWithADerivation = 0;
    for (const lesson of V1_LESSONS as unknown as { screens: unknown[] }[]) {
      let has = false;
      const walk = (node: unknown): void => {
        if (Array.isArray(node)) {
          for (const child of node) walk(child);
          return;
        }
        if (node === null || typeof node !== "object") return;
        const record = node as Record<string, unknown>;
        if (record.derivation !== undefined) has = true;
        for (const value of Object.values(record)) walk(value);
      };
      walk(lesson.screens);
      if (has) lessonsWithADerivation++;
    }
    assert(
      lessonsWithADerivation >= 3,
      `only ${lessonsWithADerivation} lesson(s) draw a derivation`,
    );
  });
});

describe("what the Showcase shows, the lesson goes on to work", () => {
  /**
   * ── THE MEASUREMENT, AND THE WRONG ONE THAT CAME FIRST ────────────────────
   *
   * The Showcase's claim is that its lines are not a gallery: they are material
   * the lesson goes on to use. Checking that means comparing what is shown
   * against what is later worked, and the first attempt compared the wrong two
   * things — the PIECES a line decomposes into against the lesson's TARGETS.
   *
   * Those are different granularities. A lesson targets chunks; the segmenter
   * decomposes a chunk into its registry constituents. So `noun-faim` inside
   * `chunk-j-ai-faim` read as "shown and never worked", and the measurement
   * reported that 41% of core material was abandoned. It was an artefact.
   *
   * At the granularity the content actually declares — a line's own `itemIds`,
   * which is what the rest of the lesson targets at — 52 of 60 core lines are
   * worked in their own lesson, the other 8 are reprises of earlier lessons,
   * and none is shown and then abandoned.
   *
   * These pin that, so the lifecycle cannot quietly decay.
   */
  type Line = { fr: string; role?: string; itemIds?: string[] };

  const flowOf = (lesson: { screens: unknown[] }): { type?: string; targetItemIds?: string[] }[] => {
    const out: { type?: string; targetItemIds?: string[] }[] = [];
    for (const screen of lesson.screens as { type?: string; payload?: { steps?: unknown[] } }[]) {
      if (screen.type === "activity-chain") {
        for (const step of screen.payload?.steps ?? []) out.push(step as { type?: string });
      } else out.push(screen);
    }
    return out;
  };
  const coreLinesOf = (lesson: { screens: unknown[] }): Line[] => {
    const out: Line[] = [];
    for (const screen of lesson.screens as {
      type?: string;
      payload?: { clusters?: { sentences?: Line[] }[] };
    }[]) {
      if (screen.type !== "showcase") continue;
      for (const cluster of screen.payload?.clusters ?? []) {
        for (const sentence of cluster.sentences ?? []) {
          if ((sentence.role ?? "core") === "core") out.push(sentence);
        }
      }
    }
    return out;
  };

  const corpus = V1_LESSONS as unknown as { id: string; number: number; screens: unknown[] }[];

  /** The earliest lesson NUMBER in which each item is worked as a target. */
  const firstWorkedIn = new Map<string, number>();
  for (const lesson of corpus) {
    for (const step of flowOf(lesson)) {
      if (step.type === "showcase" || step.type === "pattern-reel") continue;
      for (const id of step.targetItemIds ?? []) {
        const seen = firstWorkedIn.get(id);
        if (seen === undefined || seen > lesson.number) firstWorkedIn.set(id, lesson.number);
      }
    }
  }

  test("no core line is shown and then never worked anywhere", () => {
    // The one that would be a real defect: the lesson puts a sentence in front
    // of the learner as its own material and the product never asks for it.
    const orphans: string[] = [];
    for (const lesson of corpus) {
      for (const line of coreLinesOf(lesson)) {
        const ids = line.itemIds ?? [];
        if (ids.length === 0) continue;
        if (!ids.some((id) => firstWorkedIn.has(id))) {
          orphans.push(`${lesson.id} "${line.fr}"`);
        }
      }
    }
    assert(orphans.length === 0, `shown and never worked: ${orphans.join("; ")}`);
  });

  test("a core line is worked in its own lesson, or is a reprise of an earlier one", () => {
    // The third possibility — shown as core here, first worked LATER — is the
    // one that would quietly turn a Showcase into a preview.
    const premature: string[] = [];
    for (const lesson of corpus) {
      const workedHere = new Set<string>();
      for (const step of flowOf(lesson)) {
        if (step.type === "showcase" || step.type === "pattern-reel") continue;
        for (const id of step.targetItemIds ?? []) workedHere.add(id);
      }
      for (const line of coreLinesOf(lesson)) {
        const ids = line.itemIds ?? [];
        if (ids.length === 0 || ids.some((id) => workedHere.has(id))) continue;
        const firsts = ids
          .map((id) => firstWorkedIn.get(id))
          .filter((n): n is number => n !== undefined);
        if (firsts.length > 0 && Math.min(...firsts) >= lesson.number) {
          premature.push(`${lesson.id} "${line.fr}"`);
        }
      }
    }
    assert(premature.length === 0, `core but first worked later: ${premature.join("; ")}`);
  });

  test("most core lines say what they are", () => {
    // A line with no declared itemIds is invisible to the two rules above, so
    // the coverage is itself the guard's own floor. 60 of 78 today; a fall
    // means the checks are silently seeing less of the corpus.
    const all = corpus.flatMap((l) => coreLinesOf(l));
    const declared = all.filter((l) => (l.itemIds ?? []).length > 0);
    assert(all.length > 0, "no core showcase lines found at all");
    assert(
      declared.length >= 60,
      `only ${declared.length} of ${all.length} core lines declare itemIds`,
    );
  });
});
