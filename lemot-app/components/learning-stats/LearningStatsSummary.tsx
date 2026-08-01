import type { ReactNode } from "react";
import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { LearningStatsProjection } from "@/content/learning-engine/learning-stats";
import { LEARNING_STATS_COPY } from "./learningStatsCopy";

/**
 * Learning Stats summary (PR-10) — DUMB, learner-facing presentation.
 *
 * Receives ONE already-safe `LearningStatsProjection` and renders three calm
 * sections of label + count rows. It derives no mastery, reads no event, no
 * repository, no telemetry; it writes nothing, navigates nowhere, and has no
 * per-metric interaction. All copy comes from the pure copy module — no
 * charts, percentages, streaks, XP, levels, badges, rankings, goals,
 * time-spent claims, accuracy, dates, item lists or failure styling.
 *
 * The "Support used" section renders only when at least one support fact is
 * non-zero, and frames hints / replays / slow listening neutrally — how the
 * learner worked, never a shortfall.
 */
export function LearningStatsSummary({
  stats,
}: {
  stats: LearningStatsProjection;
}) {
  const c = LEARNING_STATS_COPY;
  const showSupport =
    stats.hintMoments > 0 || stats.replayCount > 0 || stats.slowPlaybackMoments > 0;

  return (
    <View style={page}>
      <Section title={c.sectionFrenchInUse}>
        <Row label={c.independentPieces} value={stats.independentPieces} />
        <Row label={c.supportedPieces} value={stats.supportedPieces} />
        <Row label={c.recognitionMoments} value={stats.recognitionMoments} />
        <Row label={c.readyToRevisitPieces} value={stats.readyToRevisitPieces} />
      </Section>

      <Section title={c.sectionPracticeActivity}>
        <Row label={c.practiceMoments} value={stats.practiceMoments} />
        <Row label={c.openAttempts} value={stats.openAttempts} />
        <Row label={c.practiceHubMoments} value={stats.practiceHubMoments} />
        <Row label={c.crossSurfacePieces} value={stats.crossSurfacePieces} />
      </Section>

      {showSupport ? (
        <Section title={c.sectionSupportUsed}>
          <Row label={c.hintMoments} value={stats.hintMoments} />
          <Row label={c.replayCount} value={stats.replayCount} />
          <Row label={c.slowPlaybackMoments} value={stats.slowPlaybackMoments} />
        </Section>
      ) : null}
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={section}>
      <Text style={sectionTitle}>{title}</Text>
      <View style={card}>{children}</View>
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

const page: ViewStyle = { gap: 18 };
const section: ViewStyle = { gap: 8 };
const sectionTitle: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
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
