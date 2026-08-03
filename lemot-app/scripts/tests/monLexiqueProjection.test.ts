/**
 * PR-09 — Real Mon Lexique projection with Supported-path visibility.
 *
 * The claim under test: a canonical item that earns qualifying independent or
 * Supported production evidence appears in the real Mon Lexique surface,
 * derived from the SHARED mastery snapshot through the existing pure selector —
 * with honest, learner-safe claim context, weak-status precedence, no write, no
 * event, and no second vocabulary ledger anywhere.
 *
 * HONEST SCOPE NOTE. As throughout this repo, there is no React component test
 * renderer (none was added for this PR). The selector, registry adaptation,
 * runtime read projection, reducer integration and the navigation-settlement
 * gate are tested BEHAVIOURALLY; the route, card, provider and completion-view
 * wiring are verified at the SOURCE level only, and those tests say so.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent } from "./helpers";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
} from "../../content/learning-engine/events";
import { ATTRIBUTION_SOURCES } from "../../content/learning-engine/evidence-context";
import {
  MASTERY_SNAPSHOT_VERSION,
  emptyProductionEvidence,
  scoreEvents,
  type ItemMastery,
  type MasterySnapshot,
} from "../../content/learning-engine/mastery";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import {
  LM_LE_EVENTS_KEY,
  LocalRepository,
} from "../../content/learning-engine/repository/local";
import {
  createLearningEngineRuntime,
  createLearningRuntimeOwner,
  type LearningEngineRuntime,
} from "../../content/learning-engine/runtime";
import type {
  EventSurfaceResolver,
  LearningSessionController,
} from "../../content/learning-engine/session-controller";
import type { LearningRepository } from "../../content/learning-engine/repository/types";
import {
  choiceInteraction,
  meetExposureInteraction,
  openAttemptInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import {
  selectMonLexiqueEntries,
  type MonLexiqueEntry,
} from "../../content/learning-engine/mon-lexique";
import {
  MON_LEXIQUE_BAND_COPY,
  MON_LEXIQUE_BANDS,
  resolveMonLexiqueBand,
  usedSuccessfullyToday,
} from "../../components/learning-engine/monLexiqueCopy";
import { createSettledNavigationGate } from "../../components/lesson-v1/settledNavigation";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { V1_LESSONS } from "../../content/lessons/v1";
import type {
  FillWithTrapsScreen,
  Lesson,
  MeetCardScreen,
  SayItYourWayScreen,
  WeaveScreen,
} from "../../content/lessonTypes";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");
const codeOf = (src: string): string =>
  src
    .split("\n")
    .filter(
      (l) =>
        !l.trim().startsWith("*") && !l.trim().startsWith("//") && !l.trim().startsWith("/*"),
    )
    .join("\n");

const NOW = 1_800_000_000_000;
const lesson001 = V1_LESSONS.find((l) => l.id === "v1-lesson-001") as Lesson;
const fillScreen = lesson001.screens.find(
  (s) => s.id === "s03-fill-polite-verb",
) as FillWithTrapsScreen;
const weaveScreen = lesson001.screens.find(
  (s) => s.id === "s04-weave-cafe-order",
) as WeaveScreen;
const meetScreen = lesson001.screens.find(
  (s) => s.type === "meet-card",
) as MeetCardScreen;
const sayItScreen = lesson001.screens.find(
  (s) => s.type === "say-it-your-way",
) as SayItYourWayScreen;

const LESSON_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "lesson_path",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

function runtimeWith(repo: LearningRepository): LearningEngineRuntime {
  return createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => `sess-${Math.random().toString(36).slice(2, 8)}`,
  });
}

function controllerOn(
  runtime: LearningEngineRuntime,
  lesson: Lesson,
): LearningSessionController {
  let t = 0;
  let n = 0;
  return runtime.createSessionController({
    lessonId: lesson.id,
    contentVersion: lesson.version,
    resolveEventSurface: LESSON_SURFACE,
    now: () => NOW + (t += 1_000),
    makeClientEventId: () => `evt-lex-${(n += 1)}`,
  });
}

function session(kv = makeFakeKv()) {
  const runtime = runtimeWith(new LocalRepository(kv));
  return { kv, runtime, controller: controllerOn(runtime, lesson001) };
}

async function project(runtime: LearningEngineRuntime): Promise<MonLexiqueEntry[]> {
  return selectMonLexiqueEntries({
    items: ITEM_REGISTRY,
    snapshot: await runtime.readMasterySnapshot(),
  });
}

/**
 * HONEST FIXTURE NOTE. Supported production requires a screen that DECLARES a
 * constitutive package (`supportRole: "constitutive"`), and no shipped screen
 * does yet — the exact pilot payloads are PR-07, gated on French QA. So the
 * Supported path is exercised through the same synthetic-fixture pattern PR-06
 * established for PM-011: a synthetic weave payload targeting the REAL
 * canonical item (`noun-cafe`) inside a shipped-lesson wrapper, so runtime,
 * controller, reducer, selector and the shipped item registry are all real.
 */
const supportedWeave: WeaveScreen = {
  id: "syn-supported-cafe",
  type: "weave",
  targetItemIds: ["noun-cafe"],
  payload: {
    weaveType: "supported",
    prompt: "Write it in French: a coffee",
    suggestedPieces: [
      { text: "un café", itemId: "noun-cafe", supportRole: "constitutive" },
    ],
    expectedAnswers: ["un café"],
    reveal: { modelAnswer: "un café" },
  },
};
const supportedLesson: Lesson = {
  ...lesson001,
  screens: [...lesson001.screens, supportedWeave],
};

const supportedAttempt = (c: LearningSessionController) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(supportedLesson, supportedWeave, {
      text: "un café",
      hintRung: 0,
      constitutiveSupportRendered: true,
    }),
  );
const independentAttempt = (c: LearningSessionController) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, weaveScreen, {
      text: weaveScreen.payload.expectedAnswers[0],
      hintRung: 0,
      constitutiveSupportRendered: false,
    }),
  );
const failedTypedAttempt = (c: LearningSessionController) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, weaveScreen, {
      text: "completely unrelated words",
      hintRung: 0,
      constitutiveSupportRendered: false,
    }),
  );

/** Full ItemMastery fixture for pure ordering tests (mirrors emptyItem). */
function mast(itemId: string, over: Partial<ItemMastery> = {}): ItemMastery {
  return {
    itemId,
    seenCount: 0,
    recognitionAttempts: 0,
    recognitionSuccess: 0,
    recognitionFailure: 0,
    productionAttempts: 0,
    productionSuccess: 0,
    productionFailure: 0,
    production: emptyProductionEvidence(),
    wrongCount: 0,
    skipCount: 0,
    precisionCount: 0,
    precisionTags: {},
    lastSeenAt: null,
    lastProducedAt: null,
    weakTags: {},
    isWeak: false,
    promptFadeLevel: "PF0",
    leitnerBox: 0,
    dueAt: null,
    monLexiqueStatus: "hidden",
    practiceEligibility: "none",
    ...over,
  };
}
function snap(...items: ItemMastery[]): MasterySnapshot {
  const map: Record<string, ItemMastery> = {};
  for (const it of items) map[it.itemId] = it;
  return { version: "test", items: map, processedClientEventIds: [], updatedAt: null };
}

// ── Part D: registry compatibility ──────────────────────────────────────────

describe("mon lexique registry compatibility (both authored forms)", () => {
  const added = (id: string) => mast(id, { monLexiqueStatus: "added" });

  test("the nested fixture form (text.fr / text.en) still resolves", () => {
    const out = selectMonLexiqueEntries({
      items: { a: { text: { fr: "bonjour", en: "hello" } } },
      snapshot: snap(added("a")),
    });
    assertEqual(out.length, 1, "included");
    assertEqual(out[0].fr, "bonjour", "fr from text.fr");
    assertEqual(out[0].en, "hello", "en from text.en");
  });

  test("the shipped flat form (fr / en) resolves", () => {
    const out = selectMonLexiqueEntries({
      items: { a: { fr: "merci", en: "thank you", text: "merci" } },
      snapshot: snap(added("a")),
    });
    assertEqual(out[0].fr, "merci", "fr from flat fr");
    assertEqual(out[0].en, "thank you", "en from flat en");
  });

  test("the flat form falls back to a string `text` for French", () => {
    const out = selectMonLexiqueEntries({
      items: { a: { text: "voici", en: "here is" } },
      snapshot: snap(added("a")),
    });
    assertEqual(out[0].fr, "voici", "string text is the French surface");
  });

  test("a missing or empty learner surface excludes the entry — never fuzzy", () => {
    const out = selectMonLexiqueEntries({
      items: {
        noEn: { fr: "oui", text: "oui" },
        emptyFr: { fr: "", en: "yes", text: "" },
        malformedNested: { text: { fr: 3, en: "x" } },
        // "missing" has no registry entry at all
      },
      snapshot: snap(added("noEn"), added("emptyFr"), added("malformedNested"), added("missing")),
    });
    assertEqual(out.length, 0, "no entry without a full, honest surface");
  });

  test("the selector stays pure: same input → same output, inputs unmutated", () => {
    const items = { a: { fr: "un café", en: "a coffee", text: "un café" } };
    const snapshot = snap(added("a"));
    const before = JSON.stringify({ items, snapshot });
    const one = JSON.stringify(selectMonLexiqueEntries({ items, snapshot }));
    const two = JSON.stringify(selectMonLexiqueEntries({ items, snapshot }));
    assertEqual(one, two, "deterministic");
    assertEqual(JSON.stringify({ items, snapshot }), before, "no input mutation");
  });

  test("canonical itemId remains the only join key — no surface lookup by text", () => {
    const src = codeOf(read("content/learning-engine/mon-lexique.ts"));
    for (const banned of ["toLowerCase", "normalize(", "includes(fr", "indexOf(fr"]) {
      assert(!src.includes(banned), `no fuzzy matching: ${banned}`);
    }
  });
});

// ── Parts B/C: truthful band copy ───────────────────────────────────────────

/** A viewing instant well after the fixtures' event timestamps. */
const VIEW_NOW = NOW + 30 * 86_400_000;

describe("band copy is calm, claim-level and singular", () => {
  test("the exact learner copy — four bands, no more", () => {
    assertEqual(MON_LEXIQUE_BAND_COPY.yours, "Yours", "yours");
    assertEqual(MON_LEXIQUE_BAND_COPY.becoming, "Becoming yours", "becoming");
    assertEqual(MON_LEXIQUE_BAND_COPY.met, "You’ve met this", "met");
    assertEqual(MON_LEXIQUE_BAND_COPY.revisit, "Worth another look", "revisit");
    assertEqual(Object.keys(MON_LEXIQUE_BAND_COPY).length, 4, "exactly four bands");
    assertEqual(MON_LEXIQUE_BANDS.length, 4, "the ordered list agrees");
  });

  test("the retired vocabulary is gone from the learner surface", () => {
    const all = Object.values(MON_LEXIQUE_BAND_COPY).join(" ").toLowerCase();
    for (const retired of [
      "collected",
      "needs another look",
      "growing with support",
      "used independently",
      "recognition",
      "supported",
      "independent",
      "mastered",
      "due",
    ]) {
      assert(!all.includes(retired), `retired band word survived: "${retired}"`);
    }
  });

  test("no copy asserts an assistance mechanism or a judgment", () => {
    const all = Object.values(MON_LEXIQUE_BAND_COPY).join(" ");
    for (const banned of [
      "hint",
      "help",
      "copied",
      "tray",
      "alone",
      "weak",
      "failed",
      "mastery",
      "evidence",
      "score",
      "assisted",
      "ownership",
    ]) {
      assert(
        !all.toLowerCase().includes(banned),
        `band copy must not contain "${banned}"`,
      );
    }
  });

  test("the band mapper is a pure presentation map over status + claim", () => {
    const base = { lastProducedAt: null };
    assertEqual(
      resolveMonLexiqueBand(
        { ...base, status: "added", productionClaim: "independent" },
        VIEW_NOW,
      ),
      "yours",
      "independent → Yours",
    );
    assertEqual(
      resolveMonLexiqueBand(
        { ...base, status: "added", productionClaim: "supported" },
        VIEW_NOW,
      ),
      "becoming",
      "supported → Becoming yours",
    );
    assertEqual(
      resolveMonLexiqueBand(
        { ...base, status: "added", productionClaim: "none" },
        VIEW_NOW,
      ),
      "met",
      "no production claim → You’ve met this",
    );
    assertEqual(
      resolveMonLexiqueBand(
        { ...base, status: "weak", productionClaim: "none" },
        VIEW_NOW,
      ),
      "revisit",
      "weak → Worth another look",
    );
  });

  test("a piece successfully used TODAY never reads as Worth another look", () => {
    const morning = new Date(2026, 6, 2, 9, 30).getTime();
    const evening = new Date(2026, 6, 2, 21, 15).getTime();
    const nextDay = new Date(2026, 6, 3, 9, 30).getTime();

    assert(
      usedSuccessfullyToday({ lastProducedAt: morning }, evening),
      "same local day counts as today",
    );
    assert(
      !usedSuccessfullyToday({ lastProducedAt: morning }, nextDay),
      "the next day is not today",
    );
    assert(
      !usedSuccessfullyToday({ lastProducedAt: null }, evening),
      "never produced is never today",
    );

    const weakButUsedToday = {
      status: "weak" as const,
      productionClaim: "supported" as const,
      lastProducedAt: morning,
    };
    assertEqual(
      resolveMonLexiqueBand(weakButUsedToday, evening),
      "becoming",
      "same-day success falls back to the earned band, not to revisit",
    );
    assertEqual(
      resolveMonLexiqueBand(weakButUsedToday, nextDay),
      "revisit",
      "the suppression is same-day only — it never hides the state forever",
    );
    // Suppression is DISPLAY only: the mapper reads nothing but the three
    // entry fields, so mastery, eligibility and scheduling cannot move.
    const mapper = codeOf(read("components/learning-engine/monLexiqueCopy.ts"));
    for (const banned of [
      "practiceEligibility",
      "dueAt",
      "leitnerBox",
      "scoreEvent",
      "LocalRepository",
      "setItem",
      "Date.now",
    ]) {
      assert(!mapper.includes(banned), `the band mapper must not touch ${banned}`);
    }
  });
});

// ── Part K: Supported-path connected proof ──────────────────────────────────

describe("supported-path proof (real runtime → reducer → selector)", () => {
  test("a Supported production success surfaces the item with the Supported claim", async () => {
    const { kv, runtime, controller } = session();
    supportedAttempt(controller);
    await controller.flush();

    const snapshot = await runtime.readMasterySnapshot();
    const cafe = snapshot.items["noun-cafe"];
    assertEqual(cafe.production.supported.success, 1, "supported channel credited");
    assertEqual(cafe.production.independent.success, 0, "independent counters remain zero");
    assertEqual(cafe.production.independent.attempts, 0, "no independent attempt invented");

    const entries = await project(runtime);
    const entry = entries.find((e) => e.itemId === "noun-cafe") as MonLexiqueEntry;
    assertEqual(entry.itemId, "noun-cafe", "exactly the same canonical item id");
    assertEqual(entry.status, "added", "added membership");
    assertEqual(entry.productionClaim, "supported", "supported claim");
    assertEqual(entry.fr, "café", "the registry surface, not event text");
    assertEqual(
      MON_LEXIQUE_BAND_COPY[resolveMonLexiqueBand(entry, VIEW_NOW)],
      "Becoming yours",
      "the learner sees one band, not a mechanism",
    );
    assertEqual(
      [...kv.map.keys()].join(","),
      LM_LE_EVENTS_KEY,
      "no separate Mon Lexique key or store was written",
    );
  });

  test("later independent production upgrades the claim without losing history", async () => {
    const { kv, runtime, controller } = session();
    supportedAttempt(controller);
    independentAttempt(controller);
    await controller.flush();

    const snapshot = await runtime.readMasterySnapshot();
    const cafe = snapshot.items["noun-cafe"];
    assertEqual(cafe.production.supported.success, 1, "Supported history preserved");
    assertEqual(cafe.production.independent.success, 1, "independent success recorded");

    const entries = await project(runtime);
    const cafeEntries = entries.filter((e) => e.itemId === "noun-cafe");
    assertEqual(cafeEntries.length, 1, "still exactly one entry — no duplicate");
    assertEqual(cafeEntries[0].productionClaim, "independent", "the strongest claim shown");
    assertEqual(
      [...kv.map.keys()].join(","),
      LM_LE_EVENTS_KEY,
      "no direct Mon Lexique mutation occurred anywhere",
    );
  });
});

// ── Part L: independent-path proof ──────────────────────────────────────────

describe("independent-path proof", () => {
  test("a clean typed lesson attempt yields the independent claim and copy", async () => {
    const { runtime, controller } = session();
    independentAttempt(controller);
    await controller.flush();

    const entries = await project(runtime);
    const entry = entries.find((e) => e.itemId === "noun-cafe") as MonLexiqueEntry;
    assertEqual(entry.productionClaim, "independent", "independent claim");
    assert(entry.productionClaim !== "supported", "no Supported label appears");
    assertEqual(
      MON_LEXIQUE_BAND_COPY[resolveMonLexiqueBand(entry, VIEW_NOW)],
      "Yours",
      "independent band copy",
    );
    const rendered = JSON.stringify(entry);
    assert(!rendered.includes("attempts"), "no raw counters on the entry");
  });
});

// ── Parts A/J: exclusions — what never enters ───────────────────────────────

describe("mon lexique exclusions (no blacklist — structure does the work)", () => {
  test("recognition success alone does not enter", async () => {
    const { runtime, controller } = session();
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fillScreen, { optionId: "opt-voudrais" }),
    );
    await controller.flush();
    assertEqual((await project(runtime)).length, 0, "recognition alone never adds (I-10)");
  });

  test("exposure alone does not enter", async () => {
    const { runtime, controller } = session();
    controller.recordExposure(
      meetExposureInteraction(lesson001, meetScreen, { ttsPlayCount: 2 }),
    );
    await controller.flush();
    assertEqual((await project(runtime)).length, 0, "meeting a form is not owning it");
  });

  test("a non-assessed open attempt plus its reveal does not enter", async () => {
    const { runtime, controller } = session();
    const { attempt, reveal } = openAttemptInteraction(lesson001, sayItScreen, {
      text: "Bonjour, un café.",
      ideaPiecesShown: false,
      revisionCount: 0,
      modelAnswer: sayItScreen.payload.modelAnswer ?? null,
    });
    controller.recordOpenProductionAttempt(attempt);
    controller.recordComparisonReveal(reveal);
    await controller.flush();
    assertEqual((await project(runtime)).length, 0, "reaching for language ≠ ownership");
  });

  test("a self-correction success alone does not enter and sets no claim", () => {
    const s = scoreEvents([
      makeEvent({
        result: "correct",
        evidenceClass: "self_correction",
        evidenceCeiling: "self_correction",
        itemIds: ["chunk-merci"],
        operation: "fill",
        primitive: "production",
      }),
    ]);
    assertEqual(s.items["chunk-merci"].production.selfCorrection.success, 1, "recorded");
    assertEqual(s.items["chunk-merci"].monLexiqueStatus, "hidden", "not added");
    const out = selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot: s });
    assertEqual(out.length, 0, "repair reduces urgency; it does not add ownership");
  });

  test("precision-only evidence does not enter", () => {
    const s = scoreEvents([
      makeEvent({
        result: "accent_only",
        evidenceClass: "controlled_production",
        evidenceCeiling: "controlled_production",
        itemIds: ["noun-cafe"],
        operation: "fill",
        primitive: "production",
      }),
    ]);
    assertEqual(s.items["noun-cafe"].monLexiqueStatus, "hidden", "precision is soft");
    assertEqual(
      selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot: s }).length,
      0,
      "no precision→added path",
    );
  });

  test("the je veux register trap never becomes its own entry", async () => {
    const { runtime, controller } = session();
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fillScreen, { optionId: "opt-veux" }),
    );
    await controller.flush();

    const snapshot = await runtime.readMasterySnapshot();
    assertEqual(
      Object.keys(snapshot.items).join(","),
      "chunk-je-voudrais",
      "the miss lands on the TARGET's history — the trap owns nothing",
    );
    const target = snapshot.items["chunk-je-voudrais"];
    assertEqual(target.recognitionFailure, 1, "a recognition failure for the target");
    assertEqual(target.weakTags.wrong_register, 1, "tagged as register, not grammar");
    const entries = await project(runtime);
    assertEqual(entries.length, 0, "one miss is well below weakness — nothing shows");
    assert(
      !entries.some((e) => e.fr === "je veux"),
      "no entry ever carries the trap surface",
    );
  });

  test("ghost/model surfaces cannot be minted: they resolve to no canonical item", () => {
    const registryItems: ReadonlyArray<{ fr?: string; text?: unknown }> =
      Object.values(ITEM_REGISTRY);
    const surfaces = registryItems.flatMap((i) => [
      i.fr ?? "",
      typeof i.text === "string" ? i.text : "",
    ]);
    for (const ghost of ["madame", "monsieur", "croissant", "voilà", "beaucoup"]) {
      assert(
        !surfaces.some((s) => s.toLowerCase() === ghost),
        `"${ghost}" is input/reveal material only — no canonical registry surface`,
      );
    }
  });

  test("no blacklist implementation exists in the selector", () => {
    const src = codeOf(read("content/learning-engine/mon-lexique.ts"));
    for (const word of ["je veux", "madame", "monsieur", "croissant", "voilà", "beaucoup"]) {
      assert(!src.includes(word), `exclusion is structural, never a hardcoded "${word}"`);
    }
  });

  test("an added item missing from the registry is excluded, not guessed", () => {
    const out = selectMonLexiqueEntries({
      items: ITEM_REGISTRY,
      snapshot: snap(mast("item-not-in-any-registry", { monLexiqueStatus: "added" })),
    });
    assertEqual(out.length, 0, "unresolvable registry item → excluded");
  });
});

// ── Part M: weak-status precedence ──────────────────────────────────────────

describe("weak precedence keeps claims honest", () => {
  test("weak-only: visible as weak, claim none, no production line", async () => {
    const { runtime, controller } = session();
    for (let i = 0; i < 3; i += 1) {
      controller.recordGradedAttempt(
        choiceInteraction(lesson001, fillScreen, { optionId: "opt-suis" }),
      );
    }
    await controller.flush();

    const entries = await project(runtime);
    const entry = entries.find((e) => e.itemId === "chunk-je-voudrais") as MonLexiqueEntry;
    assertEqual(entry.status, "weak", "reducer weakness surfaces");
    assertEqual(entry.productionClaim, "none", "no fabricated production claim");
    assertEqual(
      MON_LEXIQUE_BAND_COPY[resolveMonLexiqueBand(entry, VIEW_NOW)],
      "Worth another look",
      "one calm band, and only one",
    );
  });

  test("weak status does not erase an earned Supported claim", async () => {
    const { runtime, controller } = session();
    supportedAttempt(controller);
    for (let i = 0; i < 3; i += 1) failedTypedAttempt(controller);
    await controller.flush();

    const entries = await project(runtime);
    const entry = entries.find((e) => e.itemId === "noun-cafe") as MonLexiqueEntry;
    assertEqual(entry.status, "weak", "weak wins the membership chip");
    assertEqual(entry.productionClaim, "supported", "the scoped claim survives weakness");
  });

  test("ordering: weak first, then recency of production, nulls last, id tie-break", () => {
    const out = selectMonLexiqueEntries({
      items: {
        w: { fr: "w", en: "w", text: "w" },
        oldA: { fr: "a", en: "a", text: "a" },
        newB: { fr: "b", en: "b", text: "b" },
        nullA: { fr: "na", en: "na", text: "na" },
        nullB: { fr: "nb", en: "nb", text: "nb" },
      },
      snapshot: snap(
        mast("nullB", { monLexiqueStatus: "added" }),
        mast("newB", { monLexiqueStatus: "added", lastProducedAt: 2_000 }),
        mast("w", { monLexiqueStatus: "weak", isWeak: true }),
        mast("oldA", { monLexiqueStatus: "added", lastProducedAt: 1_000 }),
        mast("nullA", { monLexiqueStatus: "added" }),
      ),
    });
    assertEqual(
      out.map((e) => e.itemId).join(","),
      "w,newB,oldA,nullA,nullB",
      "deterministic selector ordering is preserved",
    );
  });
});

// ── Part E/O: reset and privacy (behavioural, through the runtime owner) ────

describe("privacy reset empties the real projection", () => {
  test("reset → empty; new learning after reset reappears; no new key ever", async () => {
    let fire: () => void = () => {};
    const kvs: ReturnType<typeof makeFakeKv>[] = [];
    const owner = createLearningRuntimeOwner({
      appBuild: "test",
      deviceInfo: { platform: "test" },
      createRepository: () => {
        const kv = makeFakeKv();
        kvs.push(kv);
        return new LocalRepository(kv);
      },
      makeSessionId: () => "sess-reset",
      subscribeToReset: (listener) => {
        fire = listener;
        return () => {};
      },
    });

    const gen0 = owner.current();
    const c0 = controllerOn(gen0.runtime, lesson001);
    supportedAttempt(c0);
    await c0.flush();
    assertEqual((await project(gen0.runtime)).length > 0, true, "visible before reset");

    fire();
    const gen1 = owner.current();
    assert(gen1.generation > gen0.generation, "a fresh generation");
    assertEqual((await project(gen1.runtime)).length, 0, "empty after reset — no restart");

    const c1 = controllerOn(gen1.runtime, lesson001);
    independentAttempt(c1);
    await c1.flush();
    const after = await project(gen1.runtime);
    assertEqual(after.length > 0, true, "new post-reset learning reappears normally");

    for (const kv of kvs) {
      for (const key of kv.map.keys()) {
        assertEqual(key, LM_LE_EVENTS_KEY, "the event log is the only key — ever");
      }
    }
    owner.dispose();
  });
});

// ── Part I: completion projection-navigation settlement ─────────────────────

/** A repository whose appendEvent blocks until manually released. */
function makeBlockedRepository(kv = makeFakeKv()) {
  const inner = new LocalRepository(kv);
  let release: (() => void) | null = null;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  const repo: LearningRepository = {
    appendEvent: async (e) => {
      await blocked;
      return inner.appendEvent(e);
    },
    getPending: () => inner.getPending(),
    markSynced: (ids) => inner.markSynced(ids),
    readAllEvents: () => inner.readAllEvents(),
  };
  return { repo, kv, release: () => release?.() };
}

const microtasks = async (n = 20) => {
  for (let i = 0; i < n; i += 1) await Promise.resolve();
};

describe("settled-navigation gate — projection links wait for the lesson queue", () => {
  test("navigation waits for a queued typed attempt, then the destination sees it", async () => {
    const { repo, release } = makeBlockedRepository();
    const runtime = runtimeWith(repo);
    const controller = controllerOn(runtime, lesson001);
    let navigated = 0;
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => true,
    });

    independentAttempt(controller); // the "final lesson screen" event, still queued
    gate.requestSettledNavigation(() => {
      navigated += 1;
    });
    await microtasks();
    assertEqual(navigated, 0, "no navigation while the append is still in flight");

    release();
    await controller.flush();
    await microtasks();
    assertEqual(navigated, 1, "navigated exactly once, after settlement");

    // The destination's read now includes the final lesson event.
    const entries = await project(runtime);
    assert(
      entries.some((e) => e.itemId === "noun-cafe"),
      "the destination projection contains the just-recorded attempt",
    );
  });

  test("a queued choice attempt is also awaited", async () => {
    const { repo, kv, release } = makeBlockedRepository();
    const runtime = runtimeWith(repo);
    const controller = controllerOn(runtime, lesson001);
    let navigated = 0;
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => true,
    });
    controller.recordGradedAttempt(
      choiceInteraction(lesson001, fillScreen, { optionId: "opt-voudrais" }),
    );
    gate.requestSettledNavigation(() => {
      navigated += 1;
    });
    await microtasks();
    assertEqual(navigated, 0, "blocked while queued");
    release();
    await controller.flush();
    await microtasks();
    assertEqual(navigated, 1, "then exactly one navigation");
    assertEqual((await runtime.readMasterySnapshot()).updatedAt !== null, true, "event landed");
    assertEqual([...kv.map.keys()].join(","), LM_LE_EVENTS_KEY, "no other key");
  });

  test("no attempt → navigates promptly and writes nothing", async () => {
    const kv = makeFakeKv();
    const runtime = runtimeWith(new LocalRepository(kv));
    const controller = controllerOn(runtime, lesson001);
    let navigated = 0;
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => true,
    });
    gate.requestSettledNavigation(() => {
      navigated += 1;
    });
    await microtasks();
    assertEqual(navigated, 1, "an idle queue settles immediately");
    assertEqual(kv.map.size, 0, "navigation emitted nothing");
  });

  test("duplicate taps collapse — the first destination wins, once", async () => {
    const { repo, release } = makeBlockedRepository();
    const controller = controllerOn(runtimeWith(repo), lesson001);
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => true,
    });
    const hits: string[] = [];
    independentAttempt(controller);
    gate.requestSettledNavigation(() => hits.push("practice-hub"));
    gate.requestSettledNavigation(() => hits.push("mon-lexique"));
    gate.requestSettledNavigation(() => hits.push("practice-hub"));
    release();
    await controller.flush();
    await microtasks();
    assertEqual(hits.join(","), "practice-hub", "one navigation, first tap wins");
  });

  test("an unmounted completion view never navigates late", async () => {
    const { repo, release } = makeBlockedRepository();
    const controller = controllerOn(runtimeWith(repo), lesson001);
    let active = true;
    let navigated = 0;
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => active,
    });
    independentAttempt(controller);
    gate.requestSettledNavigation(() => {
      navigated += 1;
    });
    active = false; // unmount before settlement
    release();
    await controller.flush();
    await microtasks();
    assertEqual(navigated, 0, "late settlement cannot navigate a dead view");
  });

  test("append failure still settles, still navigates — log unchanged", async () => {
    const kv = makeFakeKv();
    const inner = new LocalRepository(kv);
    const failing: LearningRepository = {
      appendEvent: async () => {
        throw new Error("disk full");
      },
      getPending: () => inner.getPending(),
      markSynced: (ids) => inner.markSynced(ids),
      readAllEvents: () => inner.readAllEvents(),
    };
    const runtime = runtimeWith(failing);
    const controller = controllerOn(runtime, lesson001);
    let navigated = 0;
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => true,
    });
    independentAttempt(controller);
    gate.requestSettledNavigation(() => {
      navigated += 1;
    });
    await controller.flush();
    await microtasks();
    assertEqual(navigated, 1, "the learner is never trapped on completion");
    assertEqual((await failing.readAllEvents()).length, 0, "nothing fabricated");
  });
});

// ── source-level wiring guards (honest: no component renderer exists) ───────

describe("completion and provider wiring (source-level)", () => {
  test("the session bridge gained exactly one settlement lifecycle, not the controller", () => {
    const src = read("components/lesson-v1/LessonV1LearningSessionProvider.tsx");
    assert(src.includes("whenSettled(): Promise<void>"), "the narrow lifecycle exists");
    assert(
      codeOf(src).includes("whenSettled: () => controller.flush()"),
      "it is the controller's settlement boundary, renamed on purpose",
    );
    assert(
      !/export type LessonV1LearningSession = \{[^}]*controller:/s.test(src),
      "the controller is still not part of the public shape",
    );
    assert(
      !/export type LessonV1LearningSession = \{[^}]*flush\(/s.test(src),
      "no raw flush verb is exposed to screens",
    );
  });

  test("the projection shortcut routes through the settled gate; Back to Home does not", () => {
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    const completion = src.slice(src.indexOf("function CompletionView"));
    assert(
      completion.includes('openProjection(() => router.push("/mon-lexique" as never))'),
      "the Mon Lexique shortcut waits for settlement",
    );
    // Completion now carries ONE shortcut instead of three equal links (the
    // standing surfaces are permanent tabs). The count shrank; the invariant —
    // every projection push is settled — is unchanged.
    assertEqual(
      (completion.match(/router\.push\(/g) ?? []).length,
      (completion.match(/openProjection\(\(\) => router\.push\(/g) ?? []).length,
      "no direct projection push remains outside the settled handler",
    );
    assert(completion.includes("createSettledNavigationGate"), "one gate, created once");
    assert(completion.includes("onPress={exitToPrevious}"), "Back to Home stays direct");
    assert(!/record[A-Z]/.test(completion), "opening a projection emits nothing");
    assertEqual(
      (src.match(/mk\(lesson\.number, V1_COMPLETION_SECTION_KEY\)/g) ?? []).length,
      1,
      "the legacy completion marker still runs exactly once",
    );
  });

  test("active-lesson Continue does not await persistence — the barrier is completion-only", () => {
    // The scan starts AFTER the imports: the renderer body between the inner
    // component and CompletionView is the whole active-lesson path (dispatch,
    // header, goNext), and none of it may touch the settlement machinery.
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    const activePath = src.slice(
      src.indexOf("function LessonRendererV1Inner"),
      src.indexOf("function CompletionView"),
    );
    assert(activePath.length > 0, "the renderer regions were actually located");
    assert(
      !activePath.includes("whenSettled") && !activePath.includes("openProjection"),
      "no lesson-screen path was slowed down",
    );
  });

  test("the navigation gate helper is pure — no imports, no persistence", () => {
    const src = codeOf(read("components/lesson-v1/settledNavigation.ts"));
    assert(!src.includes("import "), "settledNavigation.ts imports nothing");
    assert(!src.includes("require("), "settledNavigation.ts requires nothing");
    for (const banned of ["LocalRepository", "appendEvent", "readAllEvents", "LM_LE_"]) {
      assert(!src.includes(banned), `settledNavigation.ts must not reference ${banned}`);
    }
  });
});

describe("mon lexique route and card (source-level)", () => {
  const route = () => read("app/(tabs)/mon-lexique.tsx");

  test("the route reads through the runtime projection and owns no store", () => {
    const code = codeOf(route());
    assert(code.includes("readMasterySnapshot"), "explicit runtime projection read");
    assert(code.includes("selectMonLexiqueEntries"), "the existing pure selector");
    assert(code.includes("loadToken"), "stale-read token present");
    assert(code.includes("[load, generation]"), "reset generation re-reads the log");
    // ONE orchestration-boundary clock read, and no more. The route was
    // clock-free until same-day display suppression needed a "today"; the
    // selector and the band mapper are still pure, and ordering still comes
    // from the selector's persisted timestamps, never from this clock.
    assertEqual(
      (codeOf(route()).match(/Date\.now\(\)/g) ?? []).length,
      1,
      "exactly one clock read, at the load boundary",
    );
    for (const banned of [
      "LocalRepository",
      "appendEvent",
      "scoreEvent(",
      "scoreEvents",
      "LM_LE_",
      "createSessionController",
      "useSRS",
      "flashcard",
      "Flashcard",
      "lm7",
      "AsyncStorage",
      "monLexiqueStatus",
      "deriveProductionClaim",
    ]) {
      assert(
        !code.includes(banned),
        `app/(tabs)/mon-lexique.tsx must not reference ${banned}`,
      );
    }
    assert(!/record[A-Z]/.test(code), "opening Mon Lexique emits nothing");
  });

  test("the route is read-only: no search, filter, sort, edit or practice action", () => {
    const code = codeOf(route());
    for (const banned of ["TextInput", "onChangeText", ".sort(", "onLongPress", "Swipeable"]) {
      assert(!code.includes(banned), `read-only surface: no ${banned}`);
    }
  });

  test("the route renders the shared card, states, title and calm line", () => {
    const src = route();
    assert(src.includes("MonLexiqueEntryCard"), "the one shared card — no competing card");
    assert(src.includes("Mon Lexique"), "the title");
    assert(
      src.includes("French that has started to stay with you."),
      "the explanatory line",
    );
    assert(src.includes("Your words will appear here as you use them."), "empty state");
    assert(src.includes('"loading"') && src.includes('"error"') && src.includes('"ready"'), "states");
    const itemIdUses = src.match(/\{entry\.itemId\}/g) ?? [];
    const keyUses = src.match(/key=\{entry\.itemId\}/g) ?? [];
    assertEqual(itemIdUses.length, keyUses.length, "itemId is a React key, never text");
  });

  test("the card shows ONE band through the copy map and no internal field", () => {
    const src = read("components/learning-engine/MonLexiqueEntryCard.tsx");
    const code = codeOf(src);
    assert(code.includes("MON_LEXIQUE_BAND_COPY"), "band label from the pure copy map");
    // The band is resolved by the caller: the card reads no status, no claim
    // and no clock, so it cannot invent a second verdict beside the first.
    for (const banned of [
      "entry.status",
      "entry.productionClaim",
      "Date.now",
      "PRODUCTION_CLAIM_COPY",
      "MON_LEXIQUE_STATUS_COPY",
      "entry.itemId",
      "entry.dueAt",
      "entry.lastSeenAt",
      "entry.lastProducedAt",
      "entry.practiceEligibility",
      "entry.needsPractice",
      "wrongCount",
      "weakTags",
      "production.",
      "LocalRepository",
      "scoreEvent",
      "onPress",
    ]) {
      assert(!code.includes(banned), `the card must not use ${banned}`);
    }
    assert(
      !code.includes('from "@/content/learning-engine/mastery"'),
      "no mastery import in the card",
    );
  });

  test("the sandbox preview still uses the same selector, shell and card", () => {
    const shellHost = read("components/learning-engine/LearnerRendererShell.tsx");
    assert(shellHost.includes("selectMonLexiqueEntries"), "same selector");
    assert(shellHost.includes("MonLexiqueShell"), "same shell");
    const shell = read("components/learning-engine/MonLexiqueShell.tsx");
    assert(shell.includes("MonLexiqueEntryCard"), "same card — one implementation");
    assert(
      !read("app/(tabs)/mon-lexique.tsx").includes('"Yours"'),
      "band copy lives only in the pure copy module",
    );
  });
});

// ── regression: PR-09 changed no frozen contract ────────────────────────────

describe("PR-09 changed no frozen contract", () => {
  test("schema, mastery, compaction, attribution and tags are unchanged", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "event schema");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "mastery");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "compaction");
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "the Canonical eight");
    assertEqual(ERROR_TAG_CODES.length, 16, "frozen tags");
  });

  test("the practice hub files were not conscripted into Mon Lexique", () => {
    for (const rel of [
      "content/lesson-v1-evidence/practiceHub.ts",
      "app/(tabs)/practice-hub.tsx",
      "components/practice-hub/PracticeHubPractice.tsx",
    ]) {
      assert(
        !codeOf(read(rel)).includes("selectMonLexiqueEntries"),
        `${rel} stays a separate projection`,
      );
    }
  });

  test("no legacy vocabulary surface gained a connection", () => {
    const src = read("app/(tabs)/mon-lexique.tsx");
    for (const banned of ["dictionary", "scenarios", "useSRS"]) {
      assert(!src.includes(banned), `no legacy ${banned} connection`);
    }
  });
});
