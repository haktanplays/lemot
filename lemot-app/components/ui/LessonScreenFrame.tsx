import { useEffect, useState, type ReactNode } from "react";
import {
  Dimensions,
  Keyboard,
  ScrollView,
  View,
  type KeyboardEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { P, SPACE } from "@/constants/theme";

/**
 * LessonScreenFrame - the one layout contract for every lesson screen family.
 *
 * Structure: a scrollable content region above a pinned footer action zone.
 *
 * - CONTENT scrolls; long L23/L24 payloads never push the primary action out
 *   of reach, and short screens simply leave quiet paper below the content.
 * - FOOTER is pinned below the scroll region and rides above the keyboard.
 *   Under Android edge-to-edge the manifest's adjustResize no longer shrinks
 *   the window, so the IME would otherwise cover the footer (observed on
 *   device). The frame therefore tracks the real keyboard height from the
 *   Keyboard events and insets the whole frame by it — measured, never a
 *   hardcoded device height. Check / Continue / Keep and compare stay visible
 *   while typing, with no keyboard choreography.
 * - The footer is presentation only. It renders whatever action node the
 *   screen passes in; it owns no behavior, no state, and no copy.
 *
 * Screens with no active primary action (for example fill-with-traps before a
 * choice is made) pass no footer and the frame renders content only.
 */
export function LessonScreenFrame({
  children,
  footer,
  taskAnchor,
}: {
  children: ReactNode;
  footer?: ReactNode;
  /**
   * A compact restatement of the task, shown ONLY while the keyboard is open.
   *
   * With the IME up, the instruction the learner is answering can sit above the
   * viewport, so they end up typing while trying to remember what was asked.
   * This keeps the ask in view without duplicating the header: it appears when
   * the keyboard does and disappears with it, so a screen with no keyboard is
   * unchanged.
   */
  taskAnchor?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const [keyboardOverlap, setKeyboardOverlap] = useState(0);

  useEffect(() => {
    // Occlusion is measured from where the IME actually starts on the SCREEN,
    // not from its reported height: under edge-to-edge the two differ by the
    // gesture-bar strip the keyboard draws over, and the reported height alone
    // left the primary action clipped on device. `screen` (not `window`) is the
    // right frame of reference here — `screenY` is absolute, so subtracting a
    // window height that excludes the system bars yields zero.
    const apply = (e: KeyboardEvent) => {
      const screenHeight = Dimensions.get("screen").height;
      setKeyboardOverlap(Math.max(0, screenHeight - e.endCoordinates.screenY));
    };
    const show = Keyboard.addListener("keyboardDidShow", apply);
    // The IME can grow or shrink while already open (Android's suggestion strip
    // toggles as the learner types), so the frame follows the live frame too.
    const change = Keyboard.addListener("keyboardDidChangeFrame", apply);
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOverlap(0),
    );
    return () => {
      show.remove();
      change.remove();
      hide.remove();
    };
  }, []);

  // With the keyboard up the inset is already spent above; with it down the
  // footer sits above the gesture bar.
  const footerBottomPad =
    keyboardOverlap > 0 ? SPACE.md : Math.max(SPACE.md, insets.bottom);

  return (
    <View
      style={{ flex: 1, backgroundColor: P.bg, paddingBottom: keyboardOverlap }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: SPACE.xl,
          paddingBottom: SPACE.xxl,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
      {taskAnchor != null && keyboardOverlap > 0 && (
        <View
          style={{
            paddingHorizontal: SPACE.xl,
            paddingVertical: SPACE.sm,
            borderTopWidth: 1,
            borderTopColor: P.border,
            backgroundColor: P.paper,
          }}
        >
          {taskAnchor}
        </View>
      )}
      {footer != null && (
        <View
          style={{
            paddingHorizontal: SPACE.xl,
            paddingTop: SPACE.md,
            paddingBottom: footerBottomPad,
            borderTopWidth: 1,
            borderTopColor: P.border,
            backgroundColor: P.bg,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  );
}
