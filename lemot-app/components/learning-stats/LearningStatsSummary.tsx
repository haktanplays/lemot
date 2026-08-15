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
      {/*
        The same four band words Mon Lexique groups by, in the same order, as
        quiet hairline rows rather than a boxed panel. Reading the same
        vocabulary in the same shape is what makes this a mirror of Mon Lexique
        instead of a second place where progress gets reported.
      */}
      <View style={rows}>
        <Row label={c.yours} value={stats.independentPieces} first />
        <Row label={c.becomingYours} value={stats.supportedPieces} />
        <Row label={c.metThis} value={stats.recognitionPieces} />
        <Row label={c.worthAnotherLook} value={stats.readyToRevisitPieces} />
      </View>
    </View>
  );
}

function Row({
  label,
  value,
  first = false,
}: {
  label: string;
  value: number;
  first?: boolean;
}) {
  return (
    <View style={[row, first ? null : dividedRow]}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </View>
  );
}

const page: ViewStyle = { gap: 20 };
const heading: ViewStyle = { gap: 6 };
const sectionTitle: TextStyle = {
  color: P.ink,
  fontSize: 21,
  lineHeight: 29,
  fontFamily: "Newsreader",
};
const sectionSubtitle: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  lineHeight: 19,
  fontFamily: "Outfit",
};
const rows: ViewStyle = {};
const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 14,
};
const dividedRow: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: P.border,
};
const rowLabel: TextStyle = {
  color: P.ink2,
  fontSize: 15,
  lineHeight: 21,
  fontFamily: "Outfit",
  flexShrink: 1,
};
const rowValue: TextStyle = {
  color: P.ink,
  fontSize: 17,
  fontFamily: "Newsreader",
  marginLeft: 12,
};
