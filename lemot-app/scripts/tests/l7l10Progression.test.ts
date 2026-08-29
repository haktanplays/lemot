/**
 * L7-L10 progression and rhythm guard (Product Polish, second implementation PR).
 *
 * The consolidated review found that scaffolding REVERSED after L6: L6 reached
 * `open`, then L7-L10 ran entirely on `supported`, three of them shared one
 * eight-screen shape, and L10 opened with two explanations before any French.
 * This suite locks the repair so a later content pass cannot silently undo it.
 *
 * What `weaveType` actually is (verified, not inferred from the names): it is an
 * AUTHORING/DISPLAY label. Evidence class comes from whether support was really
 * rendered (`supportRole: "constitutive"`), not from the tier — see
 * waveAEmission.test.ts "weaveType 'supported' alone does not create Supported
 * evidence". Its one runtime effect is that `open` suppresses the "Say this:"
 * label (weaveCopy.shouldShowWeaveTargetLabel), so open prompts must stand alone
 * as directives. Re-tiering therefore changes intent and display, never evidence.
 *
 * Pure tsx: lesson data + a node:fs read of the Home route to confirm the
 * visibility cap is untouched. No React Native / Expo / device layer is loaded.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import type { Lesson, LessonScreen, WeaveScreen } from "../../content/lessonTypes";
import { reviewProductionQuality } from "../../content/lessons/productionQuality";

const APP_ROOT = process.cwd();

const byNumber = (n: number): Lesson => {
  const l = V1_LESSONS.find((x) => x.number === n);
  assert(l, `lesson ${n} is not registered`);
  return l as Lesson;
};

const L6 = byNumber(6);
const TARGETS = [7, 8, 9, 10].map(byNumber);

/** Least support -> most independence. Index is the independence level. */
const TIER_ORDER = ["supported", "mid", "context", "open"] as const;
const tierIndex = (t: string) => TIER_ORDER.indexOf(t as (typeof TIER_ORDER)[number]);

const weavesOf = (l: Lesson): WeaveScreen[] =>
  l.screens.filter((s): s is WeaveScreen => s.type === "weave");

const ceilingOf = (l: Lesson): number =>
  Math.max(...weavesOf(l).map((w) => tierIndex(w.payload.weaveType)));

/** Learner-visible strings only: identifier/enum keys are skipped. */
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

// ── Visibility ─────────────────────────────────────────────────────────────

describe("L7-L10 visibility", () => {
  test("the Journey path includes L7-L10 inside the full L1-L24 range", () => {
    const home = readFileSync(join(APP_ROOT, "app/(tabs)/index.tsx"), "utf8");
    assert(
      home.includes("l.number >= 1 && l.number <= 24"),
      "L1-L24 is the visible range, so L7-L10 are inside it",
    );
    assert(
      !home.includes("l.number <= 6") && !home.includes("l.number <= 10"),
      "the old L1-L6 and L1-L10 caps are gone, not left beside the new one",
    );
  });

  test("all four lessons stay registered with their numbers and prerequisites", () => {
    for (const l of TARGETS) {
      assertEqual(l.id, `v1-lesson-0${l.number.toString().padStart(2, "0")}`, "lesson id");
      assert(l.screens.length > 0, `${l.id} has screens`);
    }
    assertEqual(byNumber(7).prerequisites.join(","), "v1-lesson-006", "L7 prerequisite");
    assertEqual(byNumber(8).prerequisites.join(","), "v1-lesson-007", "L8 prerequisite");
    assertEqual(byNumber(9).prerequisites.join(","), "v1-lesson-008", "L9 prerequisite");
    assertEqual(byNumber(10).prerequisites.join(","), "v1-lesson-009", "L10 prerequisite");
  });
});

// ── Screen structure ───────────────────────────────────────────────────────

describe("L7-L10 screen structure matches the Content Bible lesson shape", () => {
  for (const l of TARGETS) {
    const types = l.screens.map((s) => s.type);

    // Band widened by the corpus-closure pass (11-14 -> 11-17): L7/L8/L9 each
    // gained an answer-shaped choice and a French-context production, and L8 --
    // the thinnest lesson on the whole path at six sentences -- needed the most.
    // The band still exists so an unbounded lesson fails.
    test(`${l.id}: 11-20 rendered screens`, () => {
      // Raised by the Showcase page, and again by L8, which now introduces two
      // architectures (c'est ou and est-ce que) and is legitimately the longest
      // doorway on the path.
      assert(
        l.screens.length >= 11 && l.screens.length <= 20,
        `expected 11-20, got ${l.screens.length}`,
      );
    });

    test(`${l.id}: estimatedMinutes inside 7-10`, () => {
      assert(
        l.estimatedMinutes >= 7 && l.estimatedMinutes <= 10,
        `expected 7-10, got ${l.estimatedMinutes}`,
      );
    });

    test(`${l.id}: Showcase first, Goal second, Recap last`, () => {
    // OPENING CONTRACT, changed by the language-world rebuild: every L1-L10
    // lesson now opens on its Showcase -- the language world it is about -- and
    // the goal card follows it. The old contract put a syllabus line first
    // ("Main pieces: je suis, ici."), which is a large part of why the early
    // path read as grammar atoms rather than French worth entering.
      assertEqual(types[0], "showcase", "opens on the language world");
      assertEqual(types[1], "insight-card", "the goal card follows it");
      assertEqual(
        (l.screens[1] as { payload: { insightType?: string } }).payload.insightType,
        "lesson-goal",
        "specifically the lesson goal",
      );
      assertEqual(types[types.length - 1], "recap", "closes on the recap");
    });

    test(`${l.id}: French contact by screen 3, and no lecture opening`, () => {
      // The Showcase is already French contact; this keeps the goal card from
      // being followed by a SECOND explanation before anything is met.
      assertEqual(types[2], "meet-card", "screen 3 puts French in front of the learner");
      assert(types[2] !== "insight-card", "Goal must not be followed by another explanation");
    });

    // "3-5 production actions" RETIRED — no replacement number. PQ-2 asks the
    // question that band was reaching for: does the lesson ever require
    // unsupplied generation?
    test(`${l.id}: demands genuine unsupplied generation (PQ-2)`, () => {
      assertEqual(
        reviewProductionQuality([l]).filter((d) => d.code === "PQ-2"),
        [],
        "retrieval floor satisfied",
      );
    });

    test(`${l.id}: no three consecutive screens share an archetype`, () => {
      for (let i = 2; i < types.length; i++) {
        assert(
          !(types[i] === types[i - 1] && types[i] === types[i - 2]),
          `three consecutive ${types[i]} at index ${i - 2}`,
        );
      }
    });
  }

  test("L7, L8 and L9 no longer share one archetype sequence", () => {
    const seqs = [7, 8, 9].map((n) => byNumber(n).screens.map((s) => s.type).join(","));
    assertEqual(new Set(seqs).size, 3, "all three sequences must differ");
  });

  test("no two consecutive lessons L7-L10 share a full sequence", () => {
    const seqs = TARGETS.map((l) => l.screens.map((s) => s.type).join(","));
    for (let i = 1; i < seqs.length; i++) {
      assert(seqs[i] !== seqs[i - 1], `lessons ${i + 6} and ${i + 7} share a sequence`);
    }
  });
});

// ── Scaffolding progression ────────────────────────────────────────────────

describe("scaffolding builds from L6 instead of reverting", () => {
  test("no L7-L10 lesson consists entirely of Supported weaves", () => {
    for (const l of TARGETS) {
      const tiers = weavesOf(l).map((w) => w.payload.weaveType);
      assert(
        !tiers.every((t) => t === "supported"),
        `${l.id} is all supported: ${tiers.join(", ")}`,
      );
    }
  });

  test("every lesson reaches at least Context", () => {
    for (const l of TARGETS) {
      assert(
        ceilingOf(l) >= tierIndex("context"),
        `${l.id} ceiling is ${TIER_ORDER[ceilingOf(l)]}, below context`,
      );
    }
  });

  test("no ceiling regresses more than one tier from the previous lesson", () => {
    const chain = [L6, ...TARGETS];
    for (let i = 1; i < chain.length; i++) {
      const prev = ceilingOf(chain[i - 1]);
      const cur = ceilingOf(chain[i]);
      assert(
        cur >= prev - 1,
        `${chain[i].id} drops from ${TIER_ORDER[prev]} to ${TIER_ORDER[cur]}`,
      );
    }
  });

  test("L10 includes Open, and its final weave is Open", () => {
    const l10 = byNumber(10);
    const weaves = weavesOf(l10);
    assert(
      weaves.some((w) => w.payload.weaveType === "open"),
      "L10 must contain genuine open production",
    );
    assertEqual(
      weaves[weaves.length - 1].payload.weaveType,
      "open",
      "the day's final major weave is open, no more scaffolded than L6's summit",
    );
  });

  test("no weave in L7-L10 carries constitutive support, so evidence class is unchanged", () => {
    for (const l of TARGETS) {
      for (const w of weavesOf(l)) {
        const constitutive = (w.payload.suggestedPieces ?? []).filter(
          (p) => p.supportRole === "constitutive",
        );
        assertEqual(constitutive.length, 0, `${l.id}/${w.id} declares constitutive support`);
      }
    }
  });
});

// ── Hints ──────────────────────────────────────────────────────────────────

describe("hint coverage across L7-L10", () => {
  test("every Mid, Context and Open weave has a non-empty authored cloze", () => {
    for (const l of TARGETS) {
      for (const w of weavesOf(l)) {
        if (w.payload.weaveType === "supported") continue;
        const cloze = w.payload.hintCloze;
        assert(
          typeof cloze === "string" && cloze.trim().length > 0,
          `${l.id}/${w.id} (${w.payload.weaveType}) has no hintCloze`,
        );
      }
    }
  });

  test("no cloze hands over the full expected answer", () => {
    const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
    for (const l of TARGETS) {
      for (const w of weavesOf(l)) {
        const cloze = w.payload.hintCloze;
        if (!cloze) continue;
        assert(cloze.includes("___"), `${l.id}/${w.id} cloze has no blank`);
        for (const expected of w.payload.expectedAnswers) {
          assert(
            norm(cloze) !== norm(expected),
            `${l.id}/${w.id} cloze equals the answer`,
          );
        }
      }
    }
  });

  test("every suggested piece resolves to a registered item", () => {
    for (const l of TARGETS) {
      for (const screen of l.screens) {
        const pieces =
          (screen.payload as { suggestedPieces?: { text: string; itemId?: string }[] })
            .suggestedPieces ?? [];
        for (const p of pieces) {
          assert(p.text.trim().length > 0, `${l.id}/${screen.id} has an empty piece`);
          if (p.itemId !== undefined) {
            assert(
              Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, p.itemId),
              `${l.id}/${screen.id} piece ${p.itemId} is not registered`,
            );
          }
        }
      }
    }
  });

  test("no linked-only item is named as a target or evidence target", () => {
    const linked = Object.values(ITEM_REGISTRY)
      .filter((i) => (i as { acquisitionLink?: { role?: string } }).acquisitionLink?.role === "linked")
      .map((i) => (i as { id: string }).id);
    assert(linked.length > 0, "precondition: at least one linked-only item exists");
    for (const l of TARGETS) {
      for (const s of l.screens) {
        const ids = [
          ...((s as { targetItemIds?: string[] }).targetItemIds ?? []),
          ...((s as { evidenceTargetItemIds?: string[] }).evidenceTargetItemIds ?? []),
        ];
        for (const id of ids) {
          assert(!linked.includes(id), `${l.id}/${s.id} names linked-only ${id}`);
        }
      }
    }
  });

  test("no suggested piece splits a protected chunk", () => {
    // The negation frames are canon-protected: they may appear whole, never as
    // a fragment offered as support.
    const PROTECTED = ["je ne suis pas", "ce n'est pas"];
    for (const l of TARGETS) {
      for (const screen of l.screens) {
        const pieces =
          (screen.payload as { suggestedPieces?: { text: string }[] }).suggestedPieces ?? [];
        for (const p of pieces) {
          const t = p.text.trim().toLowerCase();
          for (const chunk of PROTECTED) {
            assert(
              !(chunk.includes(t) && t !== chunk),
              `${l.id}/${screen.id} offers "${p.text}", a fragment of "${chunk}"`,
            );
          }
        }
      }
    }
  });
});

// ── Learner-facing copy ────────────────────────────────────────────────────

describe("L7-L10 learner copy carries no implementation language", () => {
  test("no learner-facing lesson number", () => {
    for (const l of TARGETS) {
      const out: string[] = [];
      learnerStrings(l.screens, out);
      for (const s of out) {
        assert(
          !/\bL\d{1,2}\b/.test(s),
          `${l.id} learner copy names a lesson index: ${JSON.stringify(s)}`,
        );
      }
    }
  });

  test("no bare UI-blank fill prompt", () => {
    for (const l of TARGETS) {
      for (const s of l.screens) {
        if (s.type !== "fill-with-traps") continue;
        const prompt = (s.payload as { prompt: string }).prompt;
        assert(
          prompt.trim() !== "What fits the empty space?",
          `${l.id}/${s.id} still uses the bare UI-blank prompt`,
        );
        assert(
          !/what fits the empty space/i.test(prompt),
          `${l.id}/${s.id} still refers to the UI blank: ${JSON.stringify(prompt)}`,
        );
      }
    }
  });

  test("canDo is imperative and at most 10 words", () => {
    const NON_IMPERATIVE_OPENERS = new Set(["you", "i", "we", "it", "the", "your", "a"]);
    for (const l of TARGETS) {
      const words = l.canDo.trim().split(/\s+/);
      assert(words.length <= 10, `${l.id} canDo is ${words.length} words: ${l.canDo}`);
      const first = words[0].replace(/[^A-Za-z']/g, "").toLowerCase();
      assert(
        !NON_IMPERATIVE_OPENERS.has(first),
        `${l.id} canDo does not open imperatively: ${l.canDo}`,
      );
    }
  });

  test("recaps carry no formula notation and no retired metaphor", () => {
    const RETIRED = /\b(sibling|cargo|sandwich|wrapper)\b/i;
    for (const l of TARGETS) {
      const recap = l.screens.find((s) => s.type === "recap");
      assert(recap, `${l.id} has a recap`);
      const lines = (recap as { payload: { lines: string[] } }).payload.lines;
      const joined = lines.join(" ");
      assert(!joined.includes(" + "), `${l.id} recap uses formula notation`);
      assert(!/ne\s*\.\.\.\s*pas/i.test(joined), `${l.id} recap uses ne...pas shorthand`);
      assert(!RETIRED.test(joined), `${l.id} recap uses a retired metaphor`);
    }
  });

  test("no retired metaphor family anywhere in L7-L10 learner copy", () => {
    const RETIRED = /\b(sibling|cargo|sandwich|wrapper)\b/i;
    for (const l of TARGETS) {
      const out: string[] = [];
      learnerStrings(l.screens, out);
      for (const s of out) {
        assert(!RETIRED.test(s), `${l.id} uses a retired metaphor: ${JSON.stringify(s)}`);
      }
    }
  });
});

// ── Preview truthfulness ───────────────────────────────────────────────────

describe("the L10 recognition preview stays non-productive", () => {
  const l10 = byNumber(10);
  const preview = l10.screens.find((s) => s.id === "s06-meet-preview-help");

  test("it is still a meet card and opens with the preview convention", () => {
    assert(preview, "the preview screen is present");
    assertEqual(preview!.type, "meet-card", "no new preview primitive");
    const title = (preview as { payload: { title?: string } }).payload.title ?? "";
    assert(
      title.startsWith("Just listen."),
      `preview title must open with the convention, got ${JSON.stringify(title)}`,
    );
  });

  test("its pieces are never produced, suggested, or claimed", () => {
    const previewItems = ["chunk-vous-pouvez", "chunk-m-aider"];
    for (const s of l10.screens) {
      if (s.id === "s06-meet-preview-help") continue;
      const ids = [
        ...((s as { targetItemIds?: string[] }).targetItemIds ?? []),
        ...((s as { evidenceTargetItemIds?: string[] }).evidenceTargetItemIds ?? []),
      ];
      for (const item of previewItems) {
        assert(!ids.includes(item), `${s.id} targets preview item ${item}`);
      }
      const pieces =
        (s.payload as { suggestedPieces?: { itemId?: string }[] }).suggestedPieces ?? [];
      for (const p of pieces) {
        assert(
          !previewItems.includes(p.itemId ?? ""),
          `${s.id} offers preview item ${p.itemId} as support`,
        );
      }
    }
    const recap = l10.screens.find((s) => s.type === "recap");
    const chips = (recap as { payload: { piecesUsed?: string[] } }).payload.piecesUsed ?? [];
    for (const chip of chips) {
      assert(
        !/vous pouvez|m'aider/i.test(chip),
        `the recap claims the preview piece: ${chip}`,
      );
    }
  });
});

// ── Identity regression ────────────────────────────────────────────────────

describe("L7-L10 identity is untouched", () => {
  // Every screen id that existed before this PR, with the evidence surface it
  // carried. New screens are additive; nothing here may drift.
  const PRESERVED: Record<string, Record<string, string[] | null>> = {
    "v1-lesson-007": {
      "s00-goal-je-vais": null,
      "s01-meet-je-vais-a-la-maison": ["chunk-je-vais", "chunk-a-la-maison"],
      "s02-insight-je-vais-frozen": ["chunk-je-vais"],
      "s03-fill-je-vais-blank": ["chunk-je-vais"],
      "s04-weave-heading-home": ["chunk-je-vais", "chunk-a-la-maison"],
      "s05-weave-close-the-moment": ["chunk-je-vais", "chunk-a-la-maison"],
      "s06-sayit-take-your-leave": ["chunk-je-vais", "chunk-a-la-maison"],
      "s07-recap-heading-home": null,
    },
    "v1-lesson-008": {
      "s00-goal-ou": null,
      "s01-meet-c-est-ou": ["chunk-c-est-ou", "adverb-ou-where"],
      "s02-insight-ou-frozen": ["chunk-c-est-ou"],
      "s03-fill-c-est-blank": ["adverb-ou-where", "chunk-c-est-ou"],
      "s04-weave-ask-where": ["chunk-c-est-ou", "adverb-ou-where"],
      "s05-weave-answer-here": ["chunk-c-est"],
      "s06-sayit-find-the-room": ["chunk-c-est-ou"],
      "s07-recap-ou": null,
    },
    "v1-lesson-009": {
      "s00-goal-pause": null,
      "s01-meet-faire-une-pause": ["chunk-faire-une-pause", "chunk-je-voudrais"],
      "s02-insight-voudrais-carries-actions": ["chunk-faire-une-pause"],
      "s03-fill-faire-blank": ["chunk-faire-une-pause"],
      "s04-weave-ask-for-a-break": ["chunk-faire-une-pause", "chunk-je-voudrais"],
      "s05-weave-break-politely": ["chunk-faire-une-pause"],
      "s06-sayit-long-afternoon": ["chunk-faire-une-pause"],
      "s07-recap-pause": null,
    },
    "v1-lesson-010": {
      "s00-goal-integration": null,
      "s01-insight-three-engines": ["chunk-je-suis", "chunk-je-voudrais", "chunk-je-vais"],
      "s02-weave-arrive-ask-where": ["chunk-c-est-ou", "adverb-ou-where"],
      "s03-fill-engine-chooser": ["chunk-je-vais"],
      "s04-weave-midday-break": ["chunk-faire-une-pause", "chunk-je-voudrais"],
      "s05-weave-close-the-day": ["chunk-je-vais", "chunk-a-la-maison"],
      "s06-meet-preview-help": ["chunk-vous-pouvez", "chunk-m-aider"],
      "s07-sayit-take-your-leave": ["chunk-je-vais", "chunk-a-la-maison"],
      "s08-recap-full-day": null,
    },
  };

  test("every pre-existing screen id is still present", () => {
    for (const [lessonId, screens] of Object.entries(PRESERVED)) {
      const lesson = V1_LESSONS.find((l) => l.id === lessonId)!;
      const ids = new Set(lesson.screens.map((s) => s.id));
      for (const id of Object.keys(screens)) {
        assert(ids.has(id), `${lessonId}/${id} was removed or renamed`);
      }
    }
  });

  test("every pre-existing evidence surface is unchanged", () => {
    for (const [lessonId, screens] of Object.entries(PRESERVED)) {
      const lesson = V1_LESSONS.find((l) => l.id === lessonId)!;
      for (const [id, targets] of Object.entries(screens)) {
        const screen = lesson.screens.find((s) => s.id === id) as LessonScreen & {
          targetItemIds?: string[];
        };
        assertEqual(
          JSON.stringify(screen.targetItemIds ?? null),
          JSON.stringify(targets),
          `${lessonId}/${id} targetItemIds drifted`,
        );
      }
    }
  });

  test("new screen ids are unique across every registered lesson", () => {
    for (const lesson of V1_LESSONS) {
      const ids = lesson.screens.map((s) => s.id);
      assertEqual(new Set(ids).size, ids.length, `${lesson.id} has a duplicate screen id`);
    }
    const qualified = V1_LESSONS.flatMap((l) => l.screens.map((s) => `${l.id}/${s.id}`));
    assertEqual(new Set(qualified).size, qualified.length, "qualified ids collide");
  });

  test("L7-L10 add no new ACQUISITION, however much they recycle", () => {
    // This replaces a frozen learningItems COUNT. The count was a snapshot
    // proving one earlier PR was additive; it is not the pedagogical invariant,
    // and freezing it would forbid exactly the recycling the founder-usable
    // expansion is made of. The invariant that actually matters is the
    // journey-role demand budget: a doorway may claim 1-2 new items, an
    // integration lesson none. Recycled items are free — they were acquired
    // earlier and are declared here only so the lesson can state a treatment.
    const EXPECTED_DEMANDS: Record<string, number> = {
      "v1-lesson-007": 1,
      // est-ce que pulled forward from L12; doorway band is 1-2.
      "v1-lesson-008": 2,
      "v1-lesson-009": 1,
      "v1-lesson-010": 0,
    };
    for (const l of TARGETS) {
      assertEqual(
        (l.acquisitionDemandItemIds ?? []).length,
        EXPECTED_DEMANDS[l.id],
        `${l.id} acquisition demand count`,
      );
      for (const item of l.learningItems) {
        assert(
          Object.prototype.hasOwnProperty.call(ITEM_REGISTRY, item.id),
          `${l.id} names unregistered item ${item.id}`,
        );
      }
      // Every declared demand must actually be one of the lesson's items.
      for (const id of l.acquisitionDemandItemIds ?? []) {
        assert(
          l.learningItems.some((i) => i.id === id),
          `${l.id} demands ${id} without declaring it`,
        );
      }
    }
  });
});
