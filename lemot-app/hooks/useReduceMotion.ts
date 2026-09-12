import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Honour the OS reduce-motion setting, and keep honouring it if it changes.
 *
 * Extracted from PatternReel, which had it as a private function, when the
 * orientation flow needed the same answer. Two copies of an accessibility
 * check is one copy too many: the second one is the one that quietly stops
 * being maintained.
 *
 * Defaults to false and corrects itself on the first async answer, so a screen
 * renders its motion path and settles, rather than flashing the static fallback
 * on every mount.
 */
export function useReduceMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((v) => {
      if (active) setReduceMotion(v);
    });
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", (v) =>
      setReduceMotion(v),
    );
    return () => {
      active = false;
      sub.remove();
    };
  }, []);
  return reduceMotion;
}
