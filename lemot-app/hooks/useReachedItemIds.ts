import { useEffect, useState } from "react";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import { selectMonLexiqueEntries } from "@/content/learning-engine/mon-lexique";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";

/**
 * The items Mon Lexique would actually show this learner, right now.
 *
 * The recap needs this to decide which of its chips may offer to open an
 * entry. It reads the SAME projection Mon Lexique reads, rather than guessing
 * from the lesson's declared items, because those two can disagree: a lesson
 * names what it teaches, and Mon Lexique holds what the learner has reached.
 * Linking on the first would offer entries that are not there yet.
 *
 * Returns undefined until it has an answer, and stays undefined if the read
 * fails. Both mean "do not link anything" at the call site, which is the safe
 * direction: a chip that never offered costs nothing, and a chip that offers
 * and then opens an empty screen is the defect this hook exists to avoid.
 */
export function useReachedItemIds(): ReadonlySet<string> | undefined {
  const { runtime, generation } = useLearningEngineRuntime();
  const [reached, setReached] = useState<ReadonlySet<string> | undefined>(undefined);

  useEffect(() => {
    let active = true;
    // Privacy reset changes `generation`, so a stale snapshot from before the
    // wipe can never be adopted by a later render.
    setReached(undefined);
    runtime
      .readMasterySnapshot()
      .then((snapshot) => {
        if (!active) return;
        const entries = selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot });
        setReached(new Set(entries.map((e) => e.itemId)));
      })
      .catch(() => {
        // Left undefined on purpose. Nothing links, nothing breaks.
      });
    return () => {
      active = false;
    };
  }, [runtime, generation]);

  return reached;
}
