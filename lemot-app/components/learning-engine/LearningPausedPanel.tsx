import type { ReactNode } from "react";
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";

/**
 * Calm, PRESENTATION-ONLY "learning is paused" panel (PR-I1, Codex P2 —
 * r3566344629). Rendered wherever a progress-producing surface must stop being
 * interactive while the learner-mutation gate is closed (pending deletion,
 * remote-erase recovery, or blocked/foreign/unreadable control state), so a
 * learner never appears to advance while durable writes are being rejected.
 *
 * It renders copy, an optional back action, and optional children (e.g. the
 * privacy controls) — NO storage access, NO Supabase, NO mutation-gate or
 * privacy-operation logic, and no navigation beyond the supplied callback.
 */
export const LEARNING_PAUSED_MESSAGE =
  "Learning is paused while your data request is being completed. Nothing new can be saved right now — it will reopen automatically when the request finishes.";

export function LearningPausedPanel({
  message,
  onGoHome,
  children,
}: {
  message?: string;
  onGoHome?: () => void;
  children?: ReactNode;
}) {
  return (
    <View style={panel}>
      <Text style={title}>Learning is paused</Text>
      <Text style={body}>{message ?? LEARNING_PAUSED_MESSAGE}</Text>
      {onGoHome ? (
        <Pressable onPress={onGoHome} style={btn}>
          <Text style={btnText}>Back to Home</Text>
        </Pressable>
      ) : null}
      {children}
    </View>
  );
}

const panel: ViewStyle = {
  backgroundColor: P.paper,
  borderColor: P.border,
  borderWidth: 1,
  borderRadius: 12,
  padding: 20,
  marginVertical: 16,
  gap: 10,
};
const title: TextStyle = { fontSize: 15, fontWeight: "700", color: P.ink };
const body: TextStyle = { fontSize: 13, lineHeight: 19, color: P.ink2 };
const btn: ViewStyle = {
  marginTop: 6,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: P.border,
  paddingVertical: 10,
  alignItems: "center",
};
const btnText: TextStyle = { fontSize: 13, fontWeight: "600", color: P.ink };
