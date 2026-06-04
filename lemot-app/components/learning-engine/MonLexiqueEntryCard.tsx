import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";

/**
 * Mon Lexique entry card (P4.3) — pure, learner-facing presentation.
 *
 * Renders ONE selector-produced `MonLexiqueEntry` as a calm row: the French
 * surface, its meaning, and a gentle status chip. It does NOT select, derive, or
 * write anything — no `LocalRepository`, no `scoreEvents`, no mastery import; the
 * shell hands it a ready entry.
 *
 * Learner-safe: it shows ONLY `fr` / `en` / a calm status label. It NEVER renders
 * `itemId`, raw `dueAt`, `needsPractice` as a number/flag, weakTags, precisionTags,
 * counters, JSON, operation labels, bucket names, or validator language. Weak
 * entries read as a soft "needs another look", never a punishment.
 */
const STATUS_COPY: Record<MonLexiqueEntry["status"], string> = {
  added: "Collected",
  weak: "Needs another look",
};

export function MonLexiqueEntryCard({ entry }: { entry: MonLexiqueEntry }) {
  const isWeak = entry.status === "weak";
  return (
    <View style={row}>
      <View style={textCol}>
        <Text style={fr}>{entry.fr}</Text>
        <Text style={en}>{entry.en}</Text>
      </View>
      <Text style={[chip, isWeak ? chipWeak : chipAdded]}>
        {STATUS_COPY[entry.status]}
      </Text>
    </View>
  );
}

const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  paddingHorizontal: 14,
  paddingVertical: 10,
};
const textCol: ViewStyle = { flex: 1, gap: 2 };
const fr: TextStyle = {
  color: P.ink,
  fontSize: 17,
  lineHeight: 23,
  fontFamily: "Newsreader",
};
const en: TextStyle = {
  color: P.ink2,
  fontSize: 13,
  lineHeight: 18,
  fontFamily: "Outfit",
};
const chip: TextStyle = {
  fontSize: 11,
  fontFamily: "Outfit",
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 999,
  borderWidth: 1,
  overflow: "hidden",
};
const chipAdded: TextStyle = { color: P.green, borderColor: P.green };
const chipWeak: TextStyle = { color: P.amber, borderColor: P.amber };
