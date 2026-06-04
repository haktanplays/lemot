import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { PracticePoolItem } from "@/content/learning-engine/practice-pool";

/**
 * Practice Pool item row (P4.5) — pure, learner-facing presentation.
 *
 * Renders ONE selector-produced `PracticePoolItem` as a calm line: the French
 * surface and, if present, its meaning. It selects/derives/writes nothing — no
 * `LocalRepository`, no `scoreEvents`, no mastery import.
 *
 * Learner-safe: shows ONLY `fr` / `en`. When `fr` is missing it renders a neutral
 * placeholder ("…") and NEVER the raw `itemId`. It never renders `dueAt`,
 * `isDue`, `needsPractice`, `practiceEligibility`, weakTags, precisionTags,
 * counters, JSON, operation labels, bucket names, or validator language.
 */
export function PracticePoolItemRow({ item }: { item: PracticePoolItem }) {
  const fr = item.fr && item.fr.length > 0 ? item.fr : "…";
  return (
    <View style={row}>
      <Text style={frText}>{fr}</Text>
      {item.en ? <Text style={enText}>{item.en}</Text> : null}
    </View>
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
