import { useEffect, useState } from "react";
import { availableContextCardSets } from "@/content/context-cards/cards";
import { reachedItemIds } from "@/content/practice/practicePlanner";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";

/**
 * How many Context Card sets the learner could actually open.
 *
 * ── WHY THIS IS A HOOK AND NOT TWO LINES AT THE CALL SITE ──────────────────
 *
 * The Journey draws a door to Context Cards; the Context Cards route decides
 * what is behind it. If those two answer "is there anything there?" with
 * different projections, the door either appears over an empty room or hides a
 * full one — and the app has TWO plausible reach projections that quietly
 * disagree:
 *
 *   reachedItemIds(snapshot)     practiceEligibility !== "none"
 *   selectMonLexiqueEntries(…)   monLexiqueStatus is added|weak, and the
 *                                registry can resolve a surface
 *
 * So this holds the destination's own derivation — the same `readPracticeReach`
 * read, the same `reachedItemIds`, the same `availableContextCardSets` — and
 * the door asks it rather than deriving its own answer. Agreement by
 * construction, not by two files remembering to match.
 *
 * Returns 0 until the read lands, and 0 forever if it fails. Both mean the
 * door is not drawn, which is the safe direction: a door that appears a moment
 * late costs nothing, and one that opens on nothing costs trust.
 */
export function useContextCardDoor(): number {
  const { runtime, generation } = useLearningEngineRuntime();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    setCount(0);
    runtime
      .readPracticeReach()
      .then(({ snapshot }) => {
        if (!active) return;
        setCount(availableContextCardSets(reachedItemIds(snapshot)).length);
      })
      .catch(() => {
        // Left at zero on purpose. No door, nothing broken.
      });
    return () => {
      active = false;
    };
  }, [runtime, generation]);

  return count;
}
