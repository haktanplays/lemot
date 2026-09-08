/**
 * L1-L10 production budget measurement.
 *
 * Reporting only. Never imported by the app, never asserts: it measures what
 * the product currently IS so budgets can be set against reality rather than
 * against a tidy number.
 *
 * The counting taxonomy is the point of this file. A sentence practised through
 * five interactions is ONE surface, not five, and `Je voudrais un café` beside
 * `Je voudrais un thé` is one architecture with two payloads. Reporting those
 * as five and two is how a thin corpus looks finished.
 */
import { V1_LESSONS } from "../content/lessons/v1";
import { ITEM_REGISTRY } from "../content/itemRegistry";
import { flattenLessonScreens } from "../content/lessons/lessonStructure";
import { LocalRepository } from "../content/learning-engine/repository/local";
import { createLearningEngineRuntime } from "../content/learning-engine/runtime";
import { scoreEvents } from "../content/learning-engine/mastery";
import { selectMonLexiqueEntries } from "../content/learning-engine/mon-lexique";
import { makeRegisteredEventSurface } from "../content/identity/payloadRegistry";
import {
  choiceInteraction,
  typedAttemptInteraction,
} from "../content/lesson-v1-evidence/interactions";
import { PRACTICE_SEEDS } from "../content/practice/seeds";
import { PRACTICE_MOMENTS } from "../content/practice/practiceMoments";
import type { Lesson, LessonScreen, LearningItem } from "../content/lessonTypes";

const L = V1_LESSONS.filter((l) => l.number >= 1 && l.number <= 10).sort(
  (a, b) => a.number - b.number,
);
const ITEMS = ITEM_REGISTRY as unknown as Record<string, LearningItem>;

// ── counting taxonomy helpers ───────────────────────────────────────────────

/** The architecture of a sentence: its shape with lexical payload removed. */
function architectureOf(fr: string): string {
  return fr
    .toLowerCase()
    .replace(/[.?!,]/g, "")
    .split(/\s+/)
    .map((w) => (LEXICAL_PAYLOAD.has(w) ? "<payload>" : w))
    .join(" ");
}

/** Words that are payload rather than structure, for architecture collapsing. */
const LEXICAL_PAYLOAD = new Set([
  "café", "thé", "croissant", "eau", "sandwich", "gâteau",
  "faim", "soif", "idée", "question", "pause", "problème",
  "madame", "monsieur",
]);

// Distinctness is semantic, not typographic. Two surfaces that differ only by
// punctuation or case are the same thing to say, and must not inflate a count
// this document treats as a production target.
const norm = (s: string) =>
  s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[.!?,;:\u2019']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ── per-lesson measurement ──────────────────────────────────────────────────

type Row = Record<string, unknown>;

function measureLanguage(lesson: Lesson): Row {
  const ids = new Set<string>();
  for (const s of flattenLessonScreens(lesson) as LessonScreen[]) {
    for (const id of (s as { targetItemIds?: string[] }).targetItemIds ?? []) ids.add(id);
  }
  // Showcase declares items too, but ROLE decides ownership. An item shown at
  // exposure is part of the world, not part of what the learner owns, and
  // counting it as eligible was how `chunk-au-revoir` looked like a Mon Lexique
  // hole in L1 when it is simply taught in L6.
  const showcaseByRole: Record<string, Set<string>> = { core: new Set(), supported: new Set(), exposure: new Set() };
  for (const s of flattenLessonScreens(lesson) as LessonScreen[]) {
    if (s.type !== "showcase") continue;
    for (const c of s.payload.clusters) {
      for (const sent of c.sentences) {
        for (const id of sent.itemIds ?? []) {
          (showcaseByRole[sent.role ?? "core"] ?? showcaseByRole.core).add(id);
        }
      }
    }
  }
  // Owned = the lesson actually works it. Showcase-core is corroborating, not
  // sufficient: a sentence can name an item the lesson never asks for.
  const owned = [...ids].filter((id) => ITEMS[id]?.status === "active");
  const all = new Set([...ids, ...showcaseByRole.core, ...showcaseByRole.supported, ...showcaseByRole.exposure]);
  const resolved = [...all].map((id) => ITEMS[id]).filter(Boolean);
  const byStatus: Record<string, number> = {};
  const byType: Record<string, number> = {};
  for (const it of resolved) {
    byStatus[it.status] = (byStatus[it.status] ?? 0) + 1;
    byType[it.type] = (byType[it.type] ?? 0) + 1;
  }
  return {
    owned,
    showcaseCore: [...showcaseByRole.core],
    showcaseExposure: [...showcaseByRole.exposure].length,
    itemsDeclared: all.size,
    itemsResolved: resolved.length,
    unresolved: [...ids].filter((id) => !ITEMS[id]),
    active: byStatus.active ?? 0,
    supported: byStatus.supported ?? 0,
    recognition: byStatus.recognition ?? 0,
    byType,
    ids: [...all],
  };
}

function measureShowcase(lesson: Lesson): Row {
  const screens = (flattenLessonScreens(lesson) as LessonScreen[]).filter(
    (s) => s.type === "showcase",
  );
  const sentences: { fr: string; role: string }[] = [];
  for (const s of screens) {
    if (s.type !== "showcase") continue;
    for (const c of s.payload.clusters) {
      for (const sent of c.sentences) sentences.push({ fr: sent.fr, role: sent.role ?? "core" });
    }
  }
  const roles: Record<string, number> = {};
  for (const s of sentences) roles[s.role] = (roles[s.role] ?? 0) + 1;
  const surfaces = new Set(sentences.map((s) => norm(s.fr)));
  const architectures = new Set(sentences.map((s) => architectureOf(s.fr)));
  return {
    screens: screens.length,
    sentences: sentences.length,
    uniqueSurfaces: surfaces.size,
    duplicates: sentences.length - surfaces.size,
    architectures: architectures.size,
    core: roles.core ?? 0,
    supported: roles.supported ?? 0,
    exposure: roles.exposure ?? 0,
  };
}

const ACTION_TYPES = new Set([
  "weave", "fill-with-traps", "say-it-your-way", "chunk-natural-speech",
  "architecture-verb", "pronoun-particle", "review-integration",
]);
const CARD_TYPES = new Set(["insight-card", "meet-card", "natural-reveal", "showcase", "recap"]);

function measureBody(lesson: Lesson): Row {
  const flat = flattenLessonScreens(lesson) as LessonScreen[];
  const top = lesson.screens as LessonScreen[];
  const chains = top.filter((s) => (s as { type: string }).type === "activity-chain");
  const chainSizes = chains.map(
    (c) => ((c as unknown as { steps: unknown[] }).steps ?? []).length,
  );
  const byType: Record<string, number> = {};
  for (const s of flat) byType[s.type] = (byType[s.type] ?? 0) + 1;

  const weaves = flat.filter((s) => s.type === "weave");
  const weaveByType: Record<string, number> = {};
  for (const w of weaves) {
    if (w.type !== "weave") continue;
    weaveByType[w.payload.weaveType] = (weaveByType[w.payload.weaveType] ?? 0) + 1;
  }
  const insights = flat.filter((s) => s.type === "insight-card");
  const insightKinds: Record<string, number> = {};
  for (const c of insights) {
    if (c.type !== "insight-card") continue;
    const kind = (c.payload as { kind?: string }).kind ?? "unspecified";
    insightKinds[kind] = (insightKinds[kind] ?? 0) + 1;
  }
  return {
    pages: top.length,
    flatScreens: flat.length,
    actions: flat.filter((s) => ACTION_TYPES.has(s.type)).length,
    cards: flat.filter((s) => CARD_TYPES.has(s.type)).length,
    chains: chains.length,
    chain2: chainSizes.filter((n) => n === 2).length,
    chain3: chainSizes.filter((n) => n === 3).length,
    chain4plus: chainSizes.filter((n) => n >= 4).length,
    standalone: top.filter((s) => ACTION_TYPES.has((s as { type: string }).type)).length,
    weaveSupported: weaveByType.supported ?? 0,
    weaveMid: weaveByType.mid ?? 0,
    weaveContext: weaveByType.context ?? 0,
    weaveOpen: weaveByType.open ?? 0,
    fills: byType["fill-with-traps"] ?? 0,
    sayIt: byType["say-it-your-way"] ?? 0,
    insightCards: insights.length,
    insightKinds,
    meetCards: byType["meet-card"] ?? 0,
    naturalReveal: byType["natural-reveal"] ?? 0,
    recap: byType.recap ?? 0,
    payoff: byType["review-integration"] ?? 0,
  };
}

function measureCumulative(lesson: Lesson, priorIds: Set<string>): Row {
  const flat = flattenLessonScreens(lesson) as LessonScreen[];
  let reusing = 0;
  let combos = 0;
  for (const s of flat) {
    const targets = (s as { targetItemIds?: string[] }).targetItemIds ?? [];
    const prior = targets.filter((t) => priorIds.has(t));
    if (prior.length > 0) reusing += 1;
    if (prior.length > 0 && targets.some((t) => !priorIds.has(t))) combos += 1;
  }
  return { screensReusingPrior: reusing, combinationScreens: combos };
}

// ── Practice, per lesson ────────────────────────────────────────────────────

function practiceSurfaceOf(seed: (typeof PRACTICE_SEEDS)[number]): string {
  const p = seed.exercise.payload as Record<string, unknown>;
  if (seed.exercise.type === "practice-build") return String(p.targetText ?? "");
  if (seed.exercise.type === "weave") return String((p.expectedAnswers as string[])?.[0] ?? "");
  const opts = (p.options as { text: string; isCorrect?: boolean }[]) ?? [];
  const correct = opts.find((o) => o.isCorrect);
  const before = String(p.sentenceBefore ?? "");
  const after = String(p.sentenceAfter ?? "");
  return `${before}${correct?.text ?? ""}${after}`.trim();
}

function measurePractice(lesson: Lesson, coreIds: string[]): Row {
  const seeds = PRACTICE_SEEDS.filter((s) => s.originLessonId === lesson.id);
  const surfaces = new Set(seeds.map((s) => norm(practiceSurfaceOf(s))).filter(Boolean));
  const architectures = new Set([...surfaces].map(architectureOf));
  const bySurface: Record<string, number> = {};
  const byOp: Record<string, number> = {};
  for (const s of seeds) {
    bySurface[s.surface] = (bySurface[s.surface] ?? 0) + 1;
    byOp[s.operation] = (byOp[s.operation] ?? 0) + 1;
  }
  const covered = new Set(seeds.flatMap((s) => s.targetItemIds));
  const scenes = PRACTICE_MOMENTS.filter((m) =>
    m.seedIds.some((id) => seeds.some((s) => s.id === id)),
  );
  return {
    seeds: seeds.length,
    uniqueSurfaces: surfaces.size,
    architectures: architectures.size,
    versionsPerArchitecture:
      architectures.size > 0 ? +(surfaces.size / architectures.size).toFixed(2) : 0,
    coveredItems: coveredCount(coreIds, covered),
    uncovered: coreIds.filter((id) => !covered.has(id)),
    bySurface,
    byOp,
    scenes: scenes.length,
    listening: bySurface.listen ?? 0,
    dictation: bySurface.dictation ?? 0,
    build: bySurface.build ?? 0,
    production: (bySurface.typed ?? 0) + (bySurface.context ?? 0) + (bySurface.dictation ?? 0),
    repair: byOp.repair ?? 0,
  };
}

const coveredCount = (ids: string[], covered: Set<string>) =>
  ids.filter((id) => covered.has(id)).length;

// ── Mon Lexique reachability, by actually playing each lesson ───────────────

function memoryKv() {
  const m = new Map<string, string>();
  return {
    getItem: async (k: string) => m.get(k) ?? null,
    setItem: async (k: string, v: string) => void m.set(k, v),
    removeItem: async (k: string) => void m.delete(k),
  };
}

/** Play lessons 1..n cleanly and report what Mon Lexique then holds. */
async function lexiqueAfter(upTo: number) {
  const repo = new LocalRepository(memoryKv() as never);
  const runtime = createLearningEngineRuntime({
    repository: repo,
    appBuild: "budget",
    deviceInfo: { platform: "budget" },
    makeSessionId: () => "budget",
  });
  let t = 0;
  for (const lesson of L.filter((l) => l.number <= upTo)) {
    const c = runtime.createSessionController({
      lessonId: lesson.id,
      contentVersion: lesson.version,
      resolveEventSurface: makeRegisteredEventSurface("lesson_path"),
      now: () => 1_800_000_000_000 + (t += 1000),
      makeClientEventId: () => `b-${t}`,
    });
    for (const s of flattenLessonScreens(lesson) as LessonScreen[]) {
      if (s.type === "fill-with-traps") {
        const o = s.payload.options.find((x) => x.isCorrect);
        if (o) c.recordGradedAttempt(choiceInteraction(lesson, s, { optionId: o.id }));
      } else if (s.type === "weave") {
        c.recordGradedAttempt(
          typedAttemptInteraction(lesson, s, {
            text: s.payload.expectedAnswers[0],
            hintRung: 0,
            constitutiveSupportRendered: false,
          }),
        );
      }
    }
    await c.flush();
  }
  const events = await repo.readAllEvents();
  const snapshot = scoreEvents(events);
  const entries = selectMonLexiqueEntries({ items: ITEMS as never, snapshot });
  return { snapshot, entries };
}

// ── run ─────────────────────────────────────────────────────────────────────

async function run() {
  const rows: Row[] = [];
  const prior = new Set<string>();

  for (const lesson of L) {
    const language = measureLanguage(lesson);
    const showcase = measureShowcase(lesson);
    const body = measureBody(lesson);
    const cumulative = measureCumulative(lesson, new Set(prior));
    const coreIds = language.owned as string[];
    const practice = measurePractice(lesson, coreIds);

    const { entries } = await lexiqueAfter(lesson.number);
    const reachable = new Set(entries.map((e) => e.itemId));
    const lexique = {
      eligible: coreIds.length,
      reachable: coreIds.filter((id) => reachable.has(id)).length,
      missing: coreIds.filter((id) => !reachable.has(id)),
      totalEntries: entries.length,
    };

    rows.push({ lesson: lesson.number, id: lesson.id, title: lesson.title,
      language, showcase, body, cumulative, lexique, practice });
    for (const id of language.ids as string[]) prior.add(id);
  }

  console.log(JSON.stringify(rows, null, 2));
}

void run();
