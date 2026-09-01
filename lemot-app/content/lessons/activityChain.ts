import type { ActivityChainScreen, ActivityChainStep } from "../lessonTypes";
import type { WeakPointTag } from "../weakPointTags";

/**
 * Build one activity chain from the steps it holds.
 *
 * Why a builder rather than an object literal: `targetItemIds` on the container
 * exists ONLY so treatment validation -- which walks the union across
 * `screen.targetItemIds` -- still covers material that now sits one level down.
 * Hand-writing it means two lists that must agree forever, and the failure is
 * quiet in the worse direction: a container that under-declares validates a
 * treatment nobody uses and misses one somebody does. Deriving it makes the two
 * lists the same list, so they cannot drift.
 *
 * `weakPointTags` are likewise unioned from the steps unless given explicitly,
 * for the same reason.
 *
 * Everything else about a chain is unchanged: it grades nothing, records
 * nothing, and every event still comes from a step.
 */
export function activityChain(spec: {
  id: string;
  intro: string;
  steps: ActivityChainStep[];
  weakPointTags?: WeakPointTag[];
}): ActivityChainScreen {
  const targets: string[] = [];
  for (const step of spec.steps) {
    for (const id of step.targetItemIds ?? []) {
      if (!targets.includes(id)) targets.push(id);
    }
  }

  const tags: WeakPointTag[] = [];
  for (const tag of spec.weakPointTags ?? spec.steps.flatMap((s) => s.weakPointTags ?? [])) {
    if (!tags.includes(tag)) tags.push(tag);
  }

  return {
    id: spec.id,
    type: "activity-chain",
    ...(targets.length > 0 ? { targetItemIds: targets } : {}),
    ...(tags.length > 0 ? { weakPointTags: tags } : {}),
    payload: { intro: spec.intro, steps: spec.steps },
  };
}
