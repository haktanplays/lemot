import { View, Text, Pressable, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { PracticePoolItem } from "@/content/learning-engine/practice-pool";

/**
 * Practice Pool item row (P4.5 + P4.6) — pure, learner-facing presentation.
 *
 * Renders ONE selector-produced `PracticePoolItem` as a calm line: the French
 * surface and, if present, its meaning. When `onPress` is provided (the
 * orchestration layer found a reusable exercise) the row is tappable; otherwise
 * it is a plain, non-interactive row. It selects/derives/writes nothing — no
 * `LocalRepository`, no `scoreEvents`, no mastery import, and it never builds or
 * routes events itself (tapping only calls `onPress`).
 *
 * Learner-safe: shows ONLY `fr` / `en`. When `fr` is missing it renders a neutral
 * placeholder ("…") and NEVER the raw `itemId`. It never renders `dueAt`,
 * `isDue`, `needsPractice`, `practiceEligibility`, weakTags, precisionTags,
 * counters, JSON, operation labels, bucket names, or validator language.
 */
export function PracticePoolItemRow({
  item,
  onPress,
}: {
  item: PracticePoolItem;
  /** Provided only when a reusable exercise exists → row becomes tappable. */
  onPress?: () => void;
}) {
  const fr = item.fr && item.fr.length > 0 ? item.fr : "…";
  const body = (
    <>
      <Text style={frText}>{fr}</Text>
      {item.en ? <Text style={enText}>{item.en}</Text> : null}
    </>
  );
  return onPress ? (
    <Pressable onPress={onPress} style={row}>
      {body}
    </Pressable>
  ) : (
    <View style={row}>{body}</View>
  );
}

const row: ViewStyle = {
  borderRadius: 10,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  paddingHorizontal: 12,
  paddingVertical: 8,
  gap: 2,
};
const frText: TextStyle = {
  color: P.ink,
  fontSize: 16,
  lineHeight: 22,
  fontFamily: "Newsreader",
};
const enText: TextStyle = {
  color: P.ink2,
  fontSize: 12,
  lineHeight: 17,
  fontFamily: "Outfit",
};
