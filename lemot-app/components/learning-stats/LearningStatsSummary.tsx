import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { LearningStatsProjection } from "@/content/learning-engine/learning-stats";
import { LEARNING_STATS_COPY } from "./learningStatsCopy";

/**
 * Learning summary — DUMB, learner-facing presentation.
 *
 * Receives ONE already-safe `LearningStatsProjection` and renders a single calm
 * section of four label + count rows, using the SAME four bands as Mon Lexique.
 * It derives no mastery, reads no event, no repository, no telemetry; it writes
 * nothing, navigates nowhere, and has no per-metric interaction. All copy comes
 * from the pure copy module — no charts, percentages, streaks, XP, levels,
 * badges, rankings, goals, time-spent claims, accuracy, dates, item lists or
 * failure styling.
 *
 * `summaryHasContent` is the emptiness rule for THIS surface: the projection's
 * own `hasActivity` also turns true for activity none of these four rows can
 * show (a replay, an open attempt), which would render a wall of zeros. The
 * caller uses this helper so an all-zero section is never displayed.
 */
export function summaryHasContent(stats: LearningStatsProjection): boolean {
  return (
    stats.independentPieces > 0 ||
    stats.supportedPieces > 0 ||
    stats.recognitionPieces > 0 ||
    stats.readyToRevisitPieces > 0
  );
}

export function LearningStatsSummary({
  stats,
}: {
  stats: LearningStatsProjection;
}) {
  const c = LEARNING_STATS_COPY;

  return (
    <View style={page}>
      <View style={heading}>
        <Text style={sectionTitle}>{c.sectionTitle}</Text>
        <Text style={sectionSubtitle}>{c.sectionSubtitle}</Text>
      </View>
      <View style={card}>
        <Row label={c.yours} value={stats.independentPieces} />
        <Row label={c.becomingYours} value={stats.supportedPieces} />
        <Row label={c.metThis} value={stats.recognitionPieces} />
        <Row label={c.worthAnotherLook} value={stats.readyToRevisitPieces} />
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <View style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </View>
  );
}

const page: ViewStyle = { gap: 12 };
const heading: ViewStyle = { gap: 4 };
const sectionTitle: TextStyle = {
  color: P.ink,
  fontSize: 18,
  lineHeight: 24,
  fontFamily: "Newsreader",
};
const sectionSubtitle: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  lineHeight: 18,
  fontFamily: "Outfit",
};
const card: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  paddingHorizontal: 14,
  paddingVertical: 4,
};
const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 8,
};
const rowLabel: TextStyle = {
  color: P.ink2,
  fontSize: 14,
  lineHeight: 19,
  fontFamily: "Outfit",
  flexShrink: 1,
};
const rowValue: TextStyle = {
  color: P.ink,
  fontSize: 16,
  fontFamily: "Outfit",
  marginLeft: 12,
};
