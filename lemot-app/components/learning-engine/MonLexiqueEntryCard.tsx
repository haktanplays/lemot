import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";
import {
  MON_LEXIQUE_STATUS_COPY,
  PRODUCTION_CLAIM_COPY,
} from "./monLexiqueCopy";

/**
 * Mon Lexique entry card (P4.3, claim context added in PR-09) — pure,
 * learner-facing presentation.
 *
 * Renders ONE selector-produced `MonLexiqueEntry` as a calm row: the French
 * surface, its meaning, a gentle membership chip, and — when the evidence
 * supports one — a small production-claim line. It does NOT select, derive, or
 * write anything — no `LocalRepository`, no `scoreEvents`, no mastery import;
 * the caller hands it a ready entry. No press action, no navigation, no
 * interaction at all.
 *
 * Two SEPARATE concepts, never collapsed into one mutable label:
 *  - membership: `added` → "Collected", `weak` → "Needs another look";
 *  - claim context: independent / Supported copy from the pure copy module;
 *    `none` renders no line. A weak entry keeps its earned claim line — the
 *    reducer's weak status does not erase scoped production history.
 *
 * Learner-safe: it shows ONLY `fr` / `en` / the two calm copy lines. It NEVER
 * renders `itemId`, raw `dueAt` / `lastSeenAt` / `lastProducedAt`,
 * `practiceEligibility`, `needsPractice` as a flag, weakTags, precisionTags,
 * counters, assistance detail, JSON, operation labels, bucket names, or
 * validator language.
 */
export function MonLexiqueEntryCard({ entry }: { entry: MonLexiqueEntry }) {
  const isWeak = entry.status === "weak";
  return (
    <View style={row}>
      <View style={textCol}>
        <Text style={fr}>{entry.fr}</Text>
        <Text style={en}>{entry.en}</Text>
        {entry.productionClaim !== "none" ? (
          <Text style={claim}>
            {PRODUCTION_CLAIM_COPY[entry.productionClaim]}
          </Text>
        ) : null}
      </View>
      <Text style={[chip, isWeak ? chipWeak : chipAdded]}>
        {MON_LEXIQUE_STATUS_COPY[entry.status]}
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
const claim: TextStyle = {
  color: P.ink3,
  fontSize: 11,
  lineHeight: 15,
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
