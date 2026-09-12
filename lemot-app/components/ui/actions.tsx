import type { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { P, RADIUS, SPACE } from "@/constants/theme";

/**
 * Action hierarchy primitives for the lesson frame (UI Slice 1).
 *
 * PrimaryAction  - the single progression action (Check / Continue / Keep and
 *                  compare). Brick red, full width, calm; never celebratory.
 * QuietAction    - optional secondary action (Try again). Paper surface with a
 *                  hairline border; clearly available, never competing.
 * LinkAction     - tertiary text link (optional help, quiet shortcuts).
 *
 * Presentation only: labels and handlers come from the caller, so existing
 * learner copy and semantics pass through unchanged.
 */

function ActionShell({
  onPress,
  disabled,
  background,
  borderColor,
  children,
  topGap,
}: {
  onPress: () => void;
  disabled?: boolean;
  background: string;
  borderColor?: string;
  children: ReactNode;
  topGap?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        width: "100%",
        borderRadius: RADIUS.action,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: SPACE.xs + 2,
        paddingVertical: 13,
        backgroundColor: background,
        borderWidth: borderColor ? 1 : 0,
        borderColor,
        opacity: disabled ? 0.5 : 1,
        marginTop: topGap ? SPACE.sm : 0,
      }}
    >
      {children}
    </Pressable>
  );
}

export function PrimaryAction({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <ActionShell onPress={onPress} disabled={disabled} background={P.red}>
      <Text style={{ color: P.paper, fontSize: 15, fontWeight: "600" }}>
        {label}
      </Text>
    </ActionShell>
  );
}

export function QuietAction({
  label,
  onPress,
  disabled = false,
  topGap = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  topGap?: boolean;
}) {
  return (
    <ActionShell
      onPress={onPress}
      disabled={disabled}
      background={P.paper}
      borderColor={P.border}
      topGap={topGap}
    >
      <Text style={{ color: P.ink, fontSize: 15, fontWeight: "600" }}>
        {label}
      </Text>
    </ActionShell>
  );
}

export function LinkAction({
  label,
  onPress,
  align = "center",
}: {
  label: string;
  onPress: () => void;
  align?: "left" | "center";
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      style={{
        alignSelf: align === "center" ? "center" : "flex-start",
        padding: SPACE.xs + 2,
      }}
    >
      <Text
        style={{
          color: P.ink2,
          fontSize: 14,
          textDecorationLine: "underline",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
