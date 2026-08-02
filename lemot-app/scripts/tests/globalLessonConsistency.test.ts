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
import type { Lesson, WeaveScreen } from "../../content/lessonTypes";

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

const weavesOf = (l: Lesson): WeaveScreen[] =>
  l.screens.filter((s): s is WeaveScreen => s.type === "weave");

const goalOf = (l: Lesson) =>
  l.screens.find(
    (s) => (s.payload as { insightType?: string }).insightType === "lesson-goal",
  ) as { payload: { title?: string } } | undefined;

const recapOf = (l: Lesson) =>
  l.screens.find((s) => s.type === "recap") as
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
      for (const s of l.screens) {
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
      for (const s of l.screens) {
        if (s.type !== "fill-with-traps") continue;
        const p = (s.payload as { prompt: string }).prompt.trim();
        assert(!/^and\b/i.test(p), `${l.id}/${s.id} opens with a dependent "And"`);
        assert(p.endsWith("?") || p.endsWith("."), `${l.id}/${s.id} has no closing question`);
      }
    }
  });

  test("options, answers and trapReasons still exist on every fill", () => {
    for (const l of AUTHORED) {
      for (const s of l.screens) {
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
  const sayIt = l1.screens.find((s) => s.id === "s08-sayit-cafe-order") as {
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

  test("L2 no longer renders its two equivalent productions consecutively", () => {
    const ids = V1_LESSONS.find((l) => l.number === 2)!.screens.map((s) => s.id);
    const a = ids.indexOf("s04-weave-je-suis-ici");
    const b = ids.indexOf("s05-weave-call-and-respond");
    assert(b - a > 1, "the reflection must sit between the two weaves");
    assertEqual(ids[a + 1], "s06-insight-shape-noticed", "the existing reflection sits between");
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
    const t = seq(6);
    assertEqual(t[0], "insight-card", "goal first");
    assert(t[1] !== "insight-card", "the lecture opening is gone");
  });

  test("every lesson keeps Goal first, Recap last, and no three identical in a row", () => {
    for (const l of AUTHORED) {
      const t = l.screens.map((s) => s.type);
      assertEqual(t[0], "insight-card", `${l.id} opens on the goal card`);
      assertEqual(t[t.length - 1], "recap", `${l.id} closes on the recap`);
      for (let i = 2; i < t.length; i++) {
        assert(
          !(t[i] === t[i - 1] && t[i] === t[i - 2]),
          `${l.id}: three consecutive ${t[i]}`,
        );
      }
    }
  });

  test("production counts are unchanged by the reordering", () => {
    const EXPECTED: Record<number, number> = {
      1: 5, 2: 3, 3: 4, 4: 3, 5: 3, 6: 5, 7: 3, 8: 3, 9: 3, 10: 4,
    };
    for (const l of AUTHORED) {
      const n = l.screens.filter(
        (s) => s.type === "weave" || s.type === "say-it-your-way",
      ).length;
      assertEqual(n, EXPECTED[l.number], `${l.id} production count`);
    }
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
    for (const rel of [
      "components/lesson-v1/screens/Weave.tsx",
      "components/lesson-v1/screens/SayItYourWayV1.tsx",
      "app/lesson-zero.tsx",
    ]) {
      assert(src(rel).includes("Need a hint?"), `${rel} uses the canonical hint label`);
    }
  });

  test("no synonym of the entry hint label survives", () => {
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
    const pm009 = l1.screens.find((s) => s.id === "s10-weave-merci-thanks") as WeaveScreen;
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
  test("L7-L10 screen counts, production counts and tiers are unchanged", () => {
    const EXPECTED: Record<number, { screens: number; tiers: string }> = {
      7: { screens: 11, tiers: "mid,context" },
      8: { screens: 11, tiers: "context,context" },
      9: { screens: 11, tiers: "context,open" },
      10: { screens: 11, tiers: "context,open,open" },
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
    const pm009 = l1.screens.find((s) => s.id === "s10-weave-merci-thanks")!;
    const pm011 = l1.screens.find((s) => s.id === "s11-weave-the-order")!;
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
    const qualified = V1_LESSONS.flatMap((l) => l.screens.map((s) => `${l.id}/${s.id}`));
    assertEqual(new Set(qualified).size, qualified.length, "no collision");
  });

  test("the Home visibility cap is untouched", () => {
    assert(
      src("app/(tabs)/index.tsx").includes("l.number >= 1 && l.number <= 6"),
      "no visibility change in this PR",
    );
  });
});
