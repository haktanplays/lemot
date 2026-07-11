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
import { exportAllLocalPrivacyData } from "@/content/learning-engine/local-privacy-inventory";
import { TelemetryStore } from "@/content/learning-engine/telemetry";
import { useApp } from "@/providers/AppProvider";
import { useAuthContext } from "@/providers/AuthProvider";

/**
 * Local privacy & data controls (P5.4C) — calm, learner-safe, local-only.
 *
 * The first surface that lets the founder exercise local data rights, wired to
 * the COMPLETE device-local primitives: `exportAllLocalPrivacyData` and
 * `resetAllLocalPrivacyData` (PR-H, audit C2/C5/C6). Both cover the full local
 * inventory — `lm7` progress, `lm7_srs`, the learning-engine keys, telemetry, the
 * privacy state, and every `__corrupt` quarantine blob. Everything is on-device —
 * NO remote sync, NO Supabase, NO network, NO file download / Share / clipboard.
 * It does NOT delete cloud data (audit C1, future work), and the copy never
 * implies it does.
 *
 * Self-contained: it owns its own UI state and (for export only) a single scoped
 * `LocalRepository` instance — it does NOT touch the session controller, the
 * lesson flow, or the `LearningRepository` interface.
 *
 * Learner-safe: it shows a small EXPORT SUMMARY (counts + when + flags). It NEVER
 * dumps the raw export JSON, raw `userAnswer`, item ids, storage keys,
 * weak/precision tags, counters, or the raw PrivacyState. Reset is two-step
 * (confirm), never one-tap.
 */
type ExportStatus = "idle" | "preparing" | "ready" | "error";
type ResetPhase = "idle" | "confirming" | "resetting" | "done" | "error";
// PR-I1: "delete synced learning data" outcomes, distinct from the local reset.
// The two partial-failure states are kept distinct so the copy is honest about
// whether this device's data was actually cleared.
type SyncDeletePhase =
  | "idle"
  | "confirming"
  | "deleting"
  | "success"
  | "cloud_failed"
  | "local_reset_failed"
  | "guard_finalize_failed";

type ExportSummary = {
  eventCount: number;
  exportedAt: number;
  snapshotIncluded: boolean;
  /** How many on-device data stores the export covers (counts only, no keys). */
  deviceKeyCount: number;
};

export function PrivacyDataControls() {
  // PR-H: reset routes through the provider so it also clears live in-memory
  // runtime state (not just storage keys), engaging the reset write-barrier so
  // stale state can never re-persist deleted data.
  const {
    resetLocalData,
    deleteSyncedData,
    remoteErasePending,
    confirmRemoteErase,
    pendingDeletion,
  } = useApp();
  // PR-I1: the synced-data delete action only appears for a signed-in, NON-anon
  // account; the remote-erase recovery banner appears when this device discovered
  // its synced data was deleted elsewhere.
  const { user } = useAuthContext();
  const [recoveryBusy, setRecoveryBusy] = useState(false);

  const onConfirmRemoteErase = () => {
    setRecoveryBusy(true);
    void (async () => {
      try {
        await confirmRemoteErase();
      } finally {
        setRecoveryBusy(false);
      }
    })();
  };

  // Scoped LocalRepository + TelemetryStore for EXPORT reads only (no
  // session-controller use). Telemetry is included so the export is complete (B9).
  const repoRef = useRef<LocalRepository | null>(null);
  if (repoRef.current === null) repoRef.current = new LocalRepository();
  const telemetryRef = useRef<TelemetryStore | null>(null);
  if (telemetryRef.current === null) telemetryRef.current = new TelemetryStore();

  const [exportStatus, setExportStatus] = useState<ExportStatus>("idle");
  const [summary, setSummary] = useState<ExportSummary | null>(null);
  const [resetPhase, setResetPhase] = useState<ResetPhase>("idle");
  const [syncDeletePhase, setSyncDeletePhase] = useState<SyncDeletePhase>("idle");

  const onPrepareExport = () => {
    setExportStatus("preparing");
    void (async () => {
      try {
        const out = await exportAllLocalPrivacyData({
          repository: repoRef.current!,
          exportedAt: Date.now(), // UI action boundary; primitive stays pure.
          telemetry: telemetryRef.current!,
        });
        setSummary({
          eventCount: out.learning.eventCount,
          exportedAt: out.exportedAt,
          snapshotIncluded: out.learning.snapshot != null,
          deviceKeyCount: out.deviceKeyCount,
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
        // Clears the FULL local inventory (progress, SRS, learning-engine keys,
        // telemetry, privacy state, every `__corrupt` blob — C2/C5) AND clears
        // live in-memory runtime state behind the reset write-barrier, so stale
        // state cannot silently re-persist the deleted data.
        await resetLocalData();
        setSummary(null);
        setExportStatus("idle");
        setResetPhase("done");
      } catch {
        setResetPhase("error");
      }
    })();
  };

  // PR-I1: run the approved cloud-erase state machine via the provider. On full
  // success the cloud rows are deleted AND the device is cleared (PR-H reuse);
  // partial outcomes are reported honestly and are safe to retry idempotently.
  const onDeleteSyncedConfirmed = () => {
    setSyncDeletePhase("deleting");
    void (async () => {
      try {
        const status = await deleteSyncedData();
        if (status === "success") {
          setSummary(null);
          setExportStatus("idle");
          setSyncDeletePhase("success");
        } else if (status === "local_reset_failed") {
          setSyncDeletePhase("local_reset_failed");
        } else if (status === "guard_finalize_failed") {
          // Device data WAS cleared; only finalization is pending.
          setSummary(null);
          setExportStatus("idle");
          setSyncDeletePhase("guard_finalize_failed");
        } else {
          setSyncDeletePhase("cloud_failed");
        }
      } catch {
        setSyncDeletePhase("cloud_failed");
      }
    })();
  };

  return (
    <View style={section}>
      <Text style={title}>Privacy &amp; data</Text>
      <Text style={body}>
        Your learning data is stored on this device. Export and reset act only on
        this device&rsquo;s data &mdash; they don&rsquo;t change anything in the
        cloud.
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
          Local export ready: {summary.eventCount}{" "}
          {summary.eventCount === 1 ? "learning event" : "learning events"} across{" "}
          {summary.deviceKeyCount}{" "}
          {summary.deviceKeyCount === 1 ? "data store" : "data stores"} on this
          device{summary.snapshotIncluded ? ", progress summary included" : ""}.
        </Text>
      ) : null}
      {exportStatus === "error" ? (
        <Text style={errorText}>Couldn&rsquo;t prepare that just now.</Text>
      ) : null}

      {/* Reset */}
      {resetPhase === "confirming" ? (
        <View style={confirmBox}>
          <Text style={body}>
            This clears all of your data on this device &mdash; lesson progress,
            review schedule, Mon Lexique, Practice Pool signals, saved answers,
            and the privacy notice. It only affects this device, not the cloud,
            and it can&rsquo;t be undone.
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
          Local data cleared on this device. The privacy notice may appear again
          next time.
        </Text>
      ) : resetPhase === "error" ? (
        <Text style={errorText}>Couldn&rsquo;t reset just now.</Text>
      ) : (
        <Pressable onPress={() => setResetPhase("confirming")} style={btn}>
          <Text style={btnText}>Reset local learning data</Text>
        </Pressable>
      )}

      {/* Unfinished deletion (PR-I1) — a durable pending deletion exists. "own":
          this user resumes it from its recorded phase (never repeating a completed
          destructive step). "blocked": it belongs to another account session —
          only that account may complete it; learning + sync stay paused. */}
      {pendingDeletion === "own" && syncDeletePhase === "idle" ? (
        <View style={syncDeleteBlock}>
          <View style={confirmBox}>
            <Text style={body}>
              A deletion of your synced learning data hasn&rsquo;t finished.
              Learning and sync stay paused until it completes.
            </Text>
            <Pressable onPress={onDeleteSyncedConfirmed} style={dangerBtn}>
              <Text style={dangerBtnText}>Finish deletion</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      {pendingDeletion === "blocked" ? (
        <View style={syncDeleteBlock}>
          <Text style={body}>
            A data deletion started on this device under another account session
            hasn&rsquo;t finished. That account needs to complete it before
            learning and sync can resume here.
          </Text>
        </View>
      ) : null}

      {/* Remote-erase recovery (PR-I1) — synced data was deleted on another
          device/account session. This device is NOT auto-wiped: the user must
          explicitly confirm clearing it. */}
      {remoteErasePending ? (
        <View style={syncDeleteBlock}>
          <View style={confirmBox}>
            <Text style={body}>
              Your synced learning data was deleted on another device or account
              session. To keep this device in sync, its learning data needs to be
              cleared too. Nothing on this device is removed until you confirm.
            </Text>
            <Pressable
              onPress={recoveryBusy ? undefined : onConfirmRemoteErase}
              disabled={recoveryBusy}
              style={[dangerBtn, recoveryBusy ? dimmed : null]}
            >
              <Text style={dangerBtnText}>
                {recoveryBusy ? "Clearing…" : "Clear this device"}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {/* Delete synced learning data (PR-I1) — only for a signed-in, NON-anonymous
          account (anonymous deletion is server-rejected; it is PR-I2 scope).
          Distinct from the device-only reset above: this also erases synced rows.
          Hidden while a remote-erase recovery or a pending deletion is showing. */}
      {user && !user.is_anonymous && !remoteErasePending && pendingDeletion === "none" ? (
        <View style={syncDeleteBlock}>
          {syncDeletePhase === "confirming" ? (
            <View style={confirmBox}>
              <Text style={body}>
                This deletes your synced progress and learning errors from the
                cloud, and also clears your learning data on this device. Your
                account stays and you remain signed in. It can&rsquo;t be undone.
              </Text>
              <View style={btnRow}>
                <Pressable onPress={onDeleteSyncedConfirmed} style={dangerBtn}>
                  <Text style={dangerBtnText}>Yes, delete synced data</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSyncDeletePhase("idle")}
                  style={btn}
                >
                  <Text style={btnText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          ) : syncDeletePhase === "deleting" ? (
            <Text style={note}>Deleting synced data&hellip;</Text>
          ) : syncDeletePhase === "success" ? (
            <Text style={note}>
              Synced learning data deleted, and this device&rsquo;s learning data
              was cleared too. You&rsquo;re still signed in.
            </Text>
          ) : syncDeletePhase === "local_reset_failed" ? (
            <View style={confirmBox}>
              <Text style={body}>
                Your synced data was deleted from the cloud, but clearing this
                device didn&rsquo;t finish &mdash; your data is still on this
                device. Sync stays paused until you retry.
              </Text>
              <Pressable onPress={onDeleteSyncedConfirmed} style={dangerBtn}>
                <Text style={dangerBtnText}>Retry device cleanup</Text>
              </Pressable>
            </View>
          ) : syncDeletePhase === "guard_finalize_failed" ? (
            <View style={confirmBox}>
              <Text style={body}>
                Your synced and on-device data were deleted. Finishing up
                &mdash; sync stays paused until it completes.
              </Text>
              <Pressable onPress={onDeleteSyncedConfirmed} style={dangerBtn}>
                <Text style={dangerBtnText}>Finish</Text>
              </Pressable>
            </View>
          ) : syncDeletePhase === "cloud_failed" ? (
            <View style={{ gap: 8 }}>
              <Text style={errorText}>
                Couldn&rsquo;t delete your synced data just now. Nothing was
                confirmed deleted &mdash; you can try again.
              </Text>
              <Pressable onPress={onDeleteSyncedConfirmed} style={btn}>
                <Text style={btnText}>Try again</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => setSyncDeletePhase("confirming")}
              style={btn}
            >
              <Text style={btnText}>Delete synced learning data</Text>
            </Pressable>
          )}
        </View>
      ) : null}
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
const syncDeleteBlock: ViewStyle = {
  gap: 10,
  borderTopWidth: 1,
  borderTopColor: P.border,
  paddingTop: 12,
};
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
