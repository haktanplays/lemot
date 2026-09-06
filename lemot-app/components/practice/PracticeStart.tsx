import { View, Text, ScrollView } from "react-native";
import { P, SPACE } from "@/constants/theme";
import { PrimaryAction } from "@/components/ui/actions";
import {
  PRACTICE_UI_COPY,
  previewLine,
  territoryLine,
} from "@/content/practice/practiceCopy";
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
          {PRACTICE_UI_COPY.startHeadline}
        </Text>
        <Text
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            marginTop: SPACE.md,
          }}
        >
          {PRACTICE_UI_COPY.startBlurb}
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
            {PRACTICE_UI_COPY.startTodayLabel}
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
          {/*
            What the session is ABOUT, in capabilities rather than French — a
            preview that printed the sentences would make the first half of
            every session a reading exercise.
          */}
          {territoryLine(actions).length > 0 && (
            <Text
              style={{
                color: P.ink2,
                fontSize: 14,
                lineHeight: 22,
                marginTop: SPACE.md,
              }}
            >
              {territoryLine(actions)}
            </Text>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: SPACE.xl,
          paddingBottom: SPACE.xl,
          paddingTop: SPACE.md,
        }}
      >
        <PrimaryAction label={PRACTICE_UI_COPY.startAction} onPress={onStart} />
      </View>
    </View>
  );
}
