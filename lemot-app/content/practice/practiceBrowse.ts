import type { MasterySnapshot } from "../learning-engine/mastery";
import { TODAYS_SET_MAX } from "../learning-engine/practice-selector";
import type { PracticePoolPath } from "../learning-engine/practice-pool";
import {
  seedIsLawfulFor,
  type PracticeSessionAction,
} from "./practicePlanner";
import type { PracticeSeed } from "./practiceTypes";

/**
 * The four ways a learner walks their own practice inventory.
 *
 * WHY THIS EXISTS. The measured funnel: 632 authored seeds, 251 of them lawful
 * for a learner who has walked L0-L6, and a Hub that served exactly one session
 * of eight. The learner met 3.2% of what they were entitled to and reasonably
 * concluded that was the product. The missing piece was never routing — it was
 * a door.
 *
 * `practiceCatalogue.ts` owns ORDER and PAGES. This owns WHICH SEEDS, and it is
 * deliberately the same kind of module: pure, clockless, no storage, and
 * NARROWING ONLY. Nothing here can widen a pool or make an unreachable seed
 * reachable — every mode starts from `seedIsLawfulFor`, so a browse door can
 * never smuggle in language the learner has not lawfully reached.
 *
 * The division of labour with the session planner is the product decision:
 *
 *   DAILY REVIEW   Cairn chooses.
 *   PRACTICE       You choose.
 *
 * The planner still owns the bounded session and is untouched. This owns
 * browsing, and the two now sit side by side rather than one standing in for
 * the whole of Practice.
 */
export type BrowseMode = "byLesson" | "freestyle" | "refresh" | "justBeyond";

export const BROWSE_MODES: readonly BrowseMode[] = Object.freeze([
  "byLesson",
  "freestyle",
  "refresh",
  "justBeyond",
]);

/**
 * Surfaces where the learner GENERATES French rather than selecting it.
 *
 * The same line the planner draws, restated here rather than imported, because
 * the planner's copy is a session-variety heuristic and this one is a browse
 * ordering rule; coupling them would mean a change to one silently reshapes the
 * other.
 */
const PRODUCTION_SURFACES: ReadonlySet<string> = new Set(["typed", "context", "dictation"]);

export type BrowseInput = {
  mode: BrowseMode;
  seeds: readonly PracticeSeed[];
  snapshot: MasterySnapshot;
  reachedItems: ReadonlySet<string>;
  reachedLessons: ReadonlySet<string>;
  /** Required by `byLesson`; ignored by every other mode. */
  lessonId?: string | null;
};

/** Everything the learner may lawfully be shown. The ceiling for every mode. */
export function lawfulSeeds(
  seeds: readonly PracticeSeed[],
  reachedItems: ReadonlySet<string>,
  reachedLessons: ReadonlySet<string>,
): PracticeSeed[] {
  return seeds.filter((s) => seedIsLawfulFor(s, reachedItems, reachedLessons));
}

/**
 * The projection tier of an item, as the mastery layer already decided it.
 *
 * Read, never re-derived. `practiceEligibility` is the existing contract for
 * "how settled is this", and Refresh and Just beyond are learner-facing doors
 * onto tiers that already exist rather than a second opinion about the learner.
 */
function tierOf(snapshot: MasterySnapshot, itemId: string): string {
  return snapshot.items[itemId]?.practiceEligibility ?? "none";
}

function targetsAnyTier(
  seed: PracticeSeed,
  snapshot: MasterySnapshot,
  tiers: ReadonlySet<string>,
): boolean {
  return seed.targetItemIds.some((id) => tiers.has(tierOf(snapshot, id)));
}

/** Not settled yet: met but not owned, or owned and gone weak. */
const UNSETTLED: ReadonlySet<string> = new Set(["build", "challenge"]);
/** Already produced independently. The tier with room above it. */
const SETTLED: ReadonlySet<string> = new Set(["stretch"]);

/**
 * The pool behind one browse mode.
 *
 * Lawful first, always, then narrowed. A mode may legitimately come back empty
 * — Refresh with nothing unsettled is a true and good answer — and the UI says
 * so rather than being handed filler.
 */
export function browsePool(input: BrowseInput): PracticeSeed[] {
  const { mode, seeds, snapshot, reachedItems, reachedLessons } = input;
  const lawful = lawfulSeeds(seeds, reachedItems, reachedLessons);

  if (mode === "freestyle") return lawful;

  if (mode === "byLesson") {
    const lessonId = input.lessonId ?? null;
    if (lessonId === null) return [];
    return lawful.filter((s) => s.originLessonId === lessonId);
  }

  if (mode === "refresh") {
    return lawful.filter((s) => targetsAnyTier(s, snapshot, UNSETTLED));
  }

  // JUST BEYOND, and the honest limits of it.
  //
  // The corpus carries no frontier or "supported" flag, and this pass does not
  // invent one. What it does carry is `difficulty: "hard"`, which is an
  // authored CONTRACT rather than a label: a hard seed is context-only, no
  // translation, and the lawfulness checker fails any hard seed whose own
  // prompt leaks the answer. A scene in English with no crutch, in French the
  // learner has already reached, is exactly "just beyond" — and it needs no
  // future grammar, because lawfulness still gates every piece.
  //
  // Seeds whose targets the learner already produces independently come first,
  // since the same hard seed is a different experience depending on whether the
  // language under it is settled.
  const hard = lawful.filter((s) => s.difficulty === "hard");
  const settled = hard.filter((s) => targetsAnyTier(s, snapshot, SETTLED));
  const rest = hard.filter((s) => !targetsAnyTier(s, snapshot, SETTLED));
  return [...settled, ...rest];
}

/**
 * One representative seed per mode, for the entry's live examples.
 *
 * The entry shows real cards rather than describing modes, because "Just
 * beyond" means nothing until you see what it would actually ask of you. Takes
 * the FIRST seed of each already-ordered pool, so it inherits the catalogue's
 * determinism instead of sampling.
 */
export function browseTasters(
  pools: Readonly<Record<BrowseMode, readonly PracticeSeed[]>>,
  modes: readonly BrowseMode[] = BROWSE_MODES,
): { mode: BrowseMode; seed: PracticeSeed }[] {
  const out: { mode: BrowseMode; seed: PracticeSeed }[] = [];
  const used = new Set<string>();
  for (const mode of modes) {
    const seed = (pools[mode] ?? []).find((s) => !used.has(s.id));
    if (!seed) continue;
    used.add(seed.id);
    out.push({ mode, seed });
  }
  return out;
}

/**
 * How much work a seed asks for, in a word a learner already understands.
 *
 * Derived from the authored surface, not from a new taxonomy: the corpus
 * already distinguishes choosing from writing from rebuilding from listening,
 * and §11 of the brief is explicit that a second taxonomy must not be invented
 * where one exists. Internal names (`typed`, `context`, `challenge`) never
 * reach the learner; this is the projection that keeps them out.
 */
export function seedShape(seed: PracticeSeed): "write" | "say" | "piece" | "listen" | "choose" {
  if (seed.audio) return "listen";
  if (seed.surface === "build") return "piece";
  if (seed.surface === "context") return "say";
  if (PRODUCTION_SURFACES.has(seed.surface)) return "write";
  return "choose";
}

/**
 * The tier→path mapping, for a run launched from a browse card.
 *
 * `path` is internal session-variety metadata that no learner sees, and a
 * browse card has no plan behind it, so it is read from the same projection the
 * planner reads rather than guessed. `build` is the honest default: a seed
 * whose language the snapshot knows nothing about is language being built.
 */
function pathOf(snapshot: MasterySnapshot, itemId: string): PracticePoolPath {
  const tier = tierOf(snapshot, itemId);
  if (tier === "stretch") return "stretch";
  if (tier === "challenge") return "challenge";
  return "build";
}

/**
 * A run that starts where the learner tapped.
 *
 * Tapping a card is not "do this one thing and stop" — that would make the
 * catalogue a list of dead ends — so the run continues through the browse order
 * from that card. It is still BOUNDED, by the same canon ceiling the planner
 * respects: browse widens what a learner can reach, and must not quietly turn
 * one sitting into ninety questions.
 */
export function browseRun(
  pool: readonly PracticeSeed[],
  startIndex: number,
  snapshot: MasterySnapshot,
  max: number = TODAYS_SET_MAX,
): PracticeSessionAction[] {
  const from = Math.max(0, Math.min(Math.trunc(startIndex), Math.max(0, pool.length - 1)));
  return pool.slice(from, from + Math.max(1, max)).map((seed) => {
    const itemId = seed.targetItemIds[0] ?? "";
    return { seed, itemId, path: pathOf(snapshot, itemId) };
  });
}
