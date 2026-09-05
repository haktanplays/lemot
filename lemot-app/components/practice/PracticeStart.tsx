import { View, Text, ScrollView } from "react-native";
import { P, SPACE } from "@/constants/theme";
import { PrimaryAction } from "@/components/ui/actions";
import { previewLine } from "@/content/practice/practiceCopy";
import type { PracticeSessionAction } from "@/content/practice/practicePlanner";

/**
 * The Practice entry.
 *
 * One headline, one honest line about the session, one button. No mode menu,
 * no difficulty picker, no lesson picker and no Build/Stretch/Challenge choice
 * — deciding which of those a learner needs is the selector's job, and asking
 * them to choose would be asking them to do the part they cannot do.
 */
export function PracticeStart({
  actions,
  onStart,
}: {
  actions: readonly PracticeSessionAction[];
  onStart: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.xxl,
          paddingBottom: SPACE.xxl,
        }}
      >
        <Text
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontSize: 28,
            lineHeight: 36,
          }}
        >
          Keep the French moving.
        </Text>
        <Text
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            marginTop: SPACE.md,
          }}
        >
          This is built from the French you have already used. Nothing here is new.
        </Text>

        <View
          style={{
            marginTop: SPACE.xxl,
            paddingTop: SPACE.lg,
            borderTopWidth: 1,
            borderTopColor: P.border,
          }}
        >
          <Text style={{ color: P.ink3, fontSize: 12, letterSpacing: 0.3 }}>
            TODAY
          </Text>
          <Text
            style={{
              color: P.ink,
              fontSize: 17,
              lineHeight: 25,
              marginTop: SPACE.sm,
            }}
          >
            {previewLine(actions)}
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: SPACE.xl,
          paddingBottom: SPACE.xl,
          paddingTop: SPACE.md,
        }}
      >
        <PrimaryAction label="Start practice" onPress={onStart} />
      </View>
    </View>
  );
}
