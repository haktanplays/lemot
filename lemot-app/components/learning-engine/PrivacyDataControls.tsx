import { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";
import { LocalRepository } from "@/content/learning-engine/repository/local";
import {
  exportLocalLearningData,
  clearLocalLearningData,
} from "@/content/learning-engine/privacy-data";
import { clearLocalPrivacyState } from "@/content/learning-engine/privacy-local";
import { TelemetryStore } from "@/content/learning-engine/telemetry";

/**
 * Local privacy & data controls (P5.4C) — calm, learner-safe, local-only.
 *
 * The first surface that lets the founder exercise local data rights, wired to
 * the already-merged primitives: `exportLocalLearningData` (P5.3) and
 * `clearLocalLearningData` (P5.3) + `clearLocalPrivacyState` (P5.4A). Everything
 * is on-device — NO remote sync, NO Supabase, NO network, NO file download /
 * Share / clipboard.
 *
 * Self-contained: it owns its own UI state and (for export only) a single scoped
 * `LocalRepository` instance — it does NOT touch the session controller, the
 * lesson flow, or the `LearningRepository` interface.
 *
 * Learner-safe: it shows a small EXPORT SUMMARY (count + when + that a progress
 * summary is included). It NEVER dumps the raw export JSON, raw `userAnswer`,
 * item ids, storage keys, weak/precision tags, counters, or the raw PrivacyState.
 * Reset is two-step (confirm), never one-tap.
 */
type ExportStatus = "idle" | "preparing" | "ready" | "error";
type ResetPhase = "idle" | "confirming" | "resetting" | "done" | "error";

type ExportSummary = {
  eventCount: number;
  exportedAt: number;
  snapshotIncluded: boolean;
};

export function PrivacyDataControls() {
  // Scoped LocalRepository + TelemetryStore for EXPORT reads only (no
  // session-controller use). Telemetry is included so the export is complete (B9).
  const repoRef = useRef<LocalRepository | null>(null);
  if (repoRef.current === null) repoRef.current = new LocalRepository();
  const telemetryRef = useRef<TelemetryStore | null>(null);
  if (telemetryRef.current === null) telemetryRef.current = new TelemetryStore();

  const [exportStatus, setExportStatus] = useState<ExportStatus>("idle");
  const [summary, setSummary] = useState<ExportSummary | null>(null);
  const [resetPhase, setResetPhase] = useState<ResetPhase>("idle");

  const onPrepareExport = () => {
    setExportStatus("preparing");
    void (async () => {
      try {
        const out = await exportLocalLearningData({
          repository: repoRef.current!,
          exportedAt: Date.now(), // UI action boundary; primitive stays pure.
          telemetry: telemetryRef.current!,
        });
        setSummary({
          eventCount: out.eventCount,
          exportedAt: out.exportedAt,
          snapshotIncluded: out.snapshot != null,
        });
        setExportStatus("ready");
      } catch {
        setExportStatus("error");
      }
    })();
  };

  const onResetConfirmed = () => {
    setResetPhase("resetting");
    void (async () => {
      try {
        await clearLocalLearningData();
        await clearLocalPrivacyState();
        setSummary(null);
        setExportStatus("idle");
        setResetPhase("done");
      } catch {
        setResetPhase("error");
      }
    })();
  };

  return (
    <View style={section}>
      <Text style={title}>Privacy &amp; data</Text>
      <Text style={body}>
        Your learning data is stored on this device. Remote sync isn&rsquo;t
        enabled.
      </Text>

      {/* Export */}
      <Pressable
        onPress={exportStatus === "preparing" ? undefined : onPrepareExport}
        disabled={exportStatus === "preparing"}
        style={[btn, exportStatus === "preparing" ? dimmed : null]}
      >
        <Text style={btnText}>
          {exportStatus === "preparing" ? "Preparing…" : "Prepare local export"}
        </Text>
      </Pressable>
      {exportStatus === "ready" && summary ? (
        <Text style={note}>
          Local summary ready: {summary.eventCount}{" "}
          {summary.eventCount === 1 ? "item" : "items"} on this device
          {summary.snapshotIncluded ? ", progress summary included" : ""}.
        </Text>
      ) : null}
      {exportStatus === "error" ? (
        <Text style={errorText}>Couldn&rsquo;t prepare that just now.</Text>
      ) : null}

      {/* Reset */}
      {resetPhase === "confirming" ? (
        <View style={confirmBox}>
          <Text style={body}>
            This clears your local lesson progress, Mon Lexique, Practice Pool
            signals, and the privacy notice on this device. It can&rsquo;t be
            undone.
          </Text>
          <View style={btnRow}>
            <Pressable onPress={onResetConfirmed} style={dangerBtn}>
              <Text style={dangerBtnText}>Yes, reset</Text>
            </Pressable>
            <Pressable onPress={() => setResetPhase("idle")} style={btn}>
              <Text style={btnText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      ) : resetPhase === "resetting" ? (
        <Text style={note}>Clearing…</Text>
      ) : resetPhase === "done" ? (
        <Text style={note}>
          Local data cleared. The privacy notice may appear again next time.
        </Text>
      ) : resetPhase === "error" ? (
        <Text style={errorText}>Couldn&rsquo;t reset just now.</Text>
      ) : (
        <Pressable onPress={() => setResetPhase("confirming")} style={btn}>
          <Text style={btnText}>Reset local learning data</Text>
        </Pressable>
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
const body: TextStyle = {
  color: P.ink2,
  fontSize: 14,
  lineHeight: 21,
  fontFamily: "Newsreader",
};
const note: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  lineHeight: 19,
  fontFamily: "Outfit",
};
const errorText: TextStyle = { color: P.amber, fontSize: 13, fontFamily: "Outfit" };
const btn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 16,
  paddingVertical: 8,
};
const dimmed: ViewStyle = { opacity: 0.5 };
const btnText: TextStyle = { color: P.ink2, fontSize: 14, fontFamily: "Outfit" };
const btnRow: ViewStyle = { flexDirection: "row", gap: 10 };
const confirmBox: ViewStyle = {
  gap: 10,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.amber,
  backgroundColor: P.bg,
  padding: 12,
};
const dangerBtn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.red,
  paddingHorizontal: 16,
  paddingVertical: 8,
};
const dangerBtnText: TextStyle = { color: P.red, fontSize: 14, fontFamily: "Outfit" };
