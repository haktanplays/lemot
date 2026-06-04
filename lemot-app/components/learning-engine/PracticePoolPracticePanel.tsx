import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import type { ReactNode } from "react";
import { P } from "@/constants/theme";

/**
 * Practice Pool practice panel (P4.6) — DUMB, learner-facing wrapper.
 *
 * A calm inline panel that frames a single reused P3 card. The renderer passes
 * the already-rendered card as `children` (built with the SAME `renderCard` +
 * session callbacks as the main lesson flow), so this panel never resolves an
 * exercise, builds an event, calls `scoreEvents`, or touches `LocalRepository`.
 * It only shows a gentle header, the card, and a Close action. No gamification,
 * no streak/XP, no "challenge failed" language.
 */
export function PracticePoolPracticePanel({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <View style={panel}>
      <View style={headerRow}>
        <Text style={header}>Practice this piece</Text>
        <Pressable onPress={onClose} style={closeBtn}>
          <Text style={closeText}>Close</Text>
        </Pressable>
      </View>
      {children}
    </View>
  );
}

const panel: ViewStyle = {
  gap: 10,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.bg,
  padding: 14,
};
const headerRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};
const header: TextStyle = {
  color: P.ink3,
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
};
const closeBtn: ViewStyle = {
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 14,
  paddingVertical: 6,
};
const closeText: TextStyle = { color: P.ink2, fontSize: 13, fontFamily: "Outfit" };
