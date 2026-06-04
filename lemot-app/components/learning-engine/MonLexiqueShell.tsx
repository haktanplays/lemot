import { useMemo } from "react";
import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { RawItem } from "@/content/learning-engine";
import type { MasterySnapshot } from "@/content/learning-engine/mastery";
import {
  selectMonLexiqueEntries,
  type MonLexiqueEntry,
} from "@/content/learning-engine/mon-lexique";
import { MonLexiqueEntryCard } from "./MonLexiqueEntryCard";

/**
 * Mon Lexique learner shell (P4.3) — calm, label-free view of collected words.
 *
 * SELECTION lives here (the shell layer), not in the entry cards: it derives
 * learner-safe entries with the pure `selectMonLexiqueEntries({ items, snapshot })`
 * and hands each to a presentation-only `MonLexiqueEntryCard`. Mon Lexique is a
 * VIEW over the item registry + derived `MasterySnapshot` — it owns no store,
 * writes no events, calls no `scoreEvents`, and touches no `LocalRepository`.
 *
 * When there is no snapshot yet (or no added/weak items), it shows a calm empty
 * state. No Word Graph, no notes/notebook, no Practice Pool / Daily Review, no
 * gamification / streak / XP language (P4.3 scope).
 */
export function MonLexiqueShell({
  items,
  snapshot,
}: {
  items: Record<string, RawItem>;
  /** Latest derived snapshot (from the session). Null before the first event. */
  snapshot: MasterySnapshot | null;
}) {
  const entries: MonLexiqueEntry[] = useMemo(
    () => (snapshot ? selectMonLexiqueEntries({ items, snapshot }) : []),
    [items, snapshot],
  );

  return (
    <View style={section}>
      <Text style={title}>Mon Lexique</Text>
      {entries.length === 0 ? (
        <Text style={empty}>Your words will appear here as you use them.</Text>
      ) : (
        <View style={list}>
          {entries.map((entry) => (
            <MonLexiqueEntryCard key={entry.itemId} entry={entry} />
          ))}
        </View>
      )}
    </View>
  );
}

const section: ViewStyle = {
  gap: 10,
  borderTopWidth: 1,
  borderTopColor: P.border,
  paddingTop: 14,
};
const title: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
};
const empty: TextStyle = {
  color: P.ink3,
  fontSize: 14,
  lineHeight: 20,
  fontFamily: "Newsreader",
};
const list: ViewStyle = { gap: 8 };
