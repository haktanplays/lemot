import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { MonLexiqueEntry } from "@/content/learning-engine/mon-lexique";
import { MonLexiqueEntryCard } from "./MonLexiqueEntryCard";

/**
 * Mon Lexique learner shell (P4.3) — DUMB, learner-facing presentation.
 *
 * Receives already-selected, learner-safe `entries` (the orchestration layer —
 * `LearnerRendererShell` — runs the pure `selectMonLexiqueEntries` and hands them
 * down) and renders them as a calm section, or a calm empty state when there are
 * none. It owns no store, derives nothing, writes no events, calls no
 * `scoreEvents`, and never touches `LocalRepository`.
 *
 * No Word Graph, no notes/notebook, no Practice Pool / Daily Review, no
 * gamification / streak / XP language (P4.3 scope).
 */
export function MonLexiqueShell({ entries }: { entries: MonLexiqueEntry[] }) {
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
