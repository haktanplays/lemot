import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";
import {
  MON_LEXIQUE_BAND_COPY,
  type MonLexiqueBand,
} from "./monLexiqueCopy";

/**
 * Mon Lexique entry card — pure, learner-facing presentation.
 *
 * Renders ONE selector-produced `MonLexiqueEntry` as a calm row: the French
 * surface, its meaning, and ONE band chip. It does NOT select, derive, or write
 * anything — no `LocalRepository`, no `scoreEvents`, no mastery import, no
 * clock; the caller hands it a ready entry and the already-resolved band. No
 * press action, no navigation, no interaction at all.
 *
 * One label, not two: the earlier membership chip + claim line pair read as two
 * verdicts about the same word. The band ("Yours", "Becoming yours", "You’ve
 * met this", "Worth another look") is the whole statement.
 *
 * Learner-safe: it shows ONLY `fr` / `en` / the band copy. It NEVER renders
 * `itemId`, raw `dueAt` / `lastSeenAt` / `lastProducedAt`, `practiceEligibility`,
 * `needsPractice` as a flag, weakTags, precisionTags, counters, assistance
 * detail, JSON, operation labels, bucket names, or validator language.
 */
export function MonLexiqueEntryCard({
  entry,
  band,
}: {
  entry: MonLexiqueEntry;
  band: MonLexiqueBand;
}) {
  return (
    <View style={row}>
      <View style={textCol}>
        <Text style={fr}>{entry.fr}</Text>
        <Text style={en}>{entry.en}</Text>
      </View>
      <Text style={[chip, BAND_CHIP_STYLE[band]]}>
        {MON_LEXIQUE_BAND_COPY[band]}
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
  flexShrink: 0,
};

/** Calm, non-graded colouring: settled green, working amber, quiet grey. */
const BAND_CHIP_STYLE: Readonly<Record<MonLexiqueBand, TextStyle>> = {
  yours: { color: P.green, borderColor: P.green },
  becoming: { color: P.ink2, borderColor: P.border },
  met: { color: P.ink3, borderColor: P.border },
  revisit: { color: P.amber, borderColor: P.amber },
};
