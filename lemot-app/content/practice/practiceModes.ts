/**
 * Three ways into Practice, over ONE pool.
 *
 * Freestyle, Errors and By lesson are selection strategies, not three exercise
 * databases: each narrows the same authored seed corpus and hands it to the
 * same planner, so a seed can never be lawful in one mode and unlawful in
 * another, and nothing has to be authored twice.
 *
 * A note on the entry screen this feeds. Practice deliberately shipped with no
 * mode menu, on the reasoning that choosing what to practise is the selector's
 * job and asking the learner to do it is asking them to do the part they
 * cannot. That reasoning still holds and is why Freestyle stays the default
 * action: the other two are quiet secondary entries for a learner who has
 * arrived with an intention, not a fork placed in front of every session.
 *
 * Pure. No storage, no clock, no runtime.
 */
import type { MasterySnapshot } from "../learning-engine/mastery";
import type { PracticeSeed } from "./practiceTypes";

export type PracticeMode = "freestyle" | "errors" | "byLesson";

/** Items the mastery layer already considers weak. Not a second error store. */
export function weakItemIds(snapshot: MasterySnapshot): Set<string> {
  const out = new Set<string>();
  for (const [itemId, m] of Object.entries(snapshot.items)) {
    if (m.isWeak) out.add(itemId);
  }
  return out;
}

/**
 * The pool for a mode.
 *
 * Narrowing only. Nothing here can widen the corpus or make an unreachable
 * seed reachable: lawfulness is still the planner's to enforce, so a mode
 * cannot smuggle in untaught production.
 */
export function seedsForMode(
  mode: PracticeMode,
  input: {
    seeds: readonly PracticeSeed[];
    snapshot: MasterySnapshot;
    lessonId?: string | null;
  },
): PracticeSeed[] {
  const { seeds, snapshot, lessonId } = input;
  if (mode === "errors") {
    const weak = weakItemIds(snapshot);
    if (weak.size === 0) return [];
    return seeds.filter((s) => s.targetItemIds.some((id) => weak.has(id)));
  }
  if (mode === "byLesson") {
    if (!lessonId) return [];
    return seeds.filter((s) => s.originLessonId === lessonId);
  }
  return [...seeds];
}

/**
 * Whether Errors has anything real to offer.
 *
 * Used to show a calm empty state instead of inventing work: a learner with
 * nothing outstanding should be told so, not handed filler.
 */
export function hasErrorsToPractise(
  snapshot: MasterySnapshot,
  seeds: readonly PracticeSeed[],
): boolean {
  return seedsForMode("errors", { seeds, snapshot }).length > 0;
}
