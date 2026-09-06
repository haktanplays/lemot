import { View, Text, ScrollView } from "react-native";
import { P, SPACE } from "@/constants/theme";
import { PrimaryAction, QuietAction } from "@/components/ui/actions";
import {
  PRACTICE_UI_COPY,
  struggleLines,
  workedOnCapabilities,
  workedOnLines,
} from "@/content/practice/practiceCopy";
import type { PracticeStruggle } from "@/content/practice/practiceCopy";
import type { PracticeSessionAction } from "@/content/practice/practicePlanner";

/**
 * The end of a practice session.
 *
 * NOT "6/8 correct". A score is the one thing a learner can read as a verdict,
 * and the honest product claim after five minutes of practice is not a
 * percentage — it is the French that came back. So the summary lists exactly
 * what was worked on, derived from the session that actually ran.
 *
 * It also says where the learner struggled, which is the half a summary of
 * "what you worked on" cannot carry on its own. That half is bounded hard: at
 * most one named thing plus one clause, drawn only from this session's graded
 * attempts, and absent entirely when the session was clean. No mastery claim,
 * no tally, no praise the evidence does not support, and nothing that reads as
 * a verdict on the learner.
 */
export function PracticeComplete({
  actions,
  struggles,
  onDone,
  onAgain,
}: {
  actions: readonly PracticeSessionAction[];
  struggles: readonly PracticeStruggle[];
  onDone: () => void;
  onAgain: (() => void) | null;
}) {
  const capabilities = workedOnCapabilities(actions);
  const lines = workedOnLines(actions);
  const notes = struggleLines(struggles);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.xxl,
          paddingBottom: SPACE.xxl,
        }}
      >
        <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 26, lineHeight: 34 }}>
          {PRACTICE_UI_COPY.completeHeadline}
        </Text>
        <Text
          style={{ color: P.ink2, fontSize: 15, lineHeight: 23, marginTop: SPACE.md }}
        >
          {PRACTICE_UI_COPY.completeWorkedOn}
        </Text>

        {/*
          Capability first. After five minutes the honest report is what the
          learner can now do, rather than a list of strings or a tally.
        */}
        <View style={{ marginTop: SPACE.md }}>
          {capabilities.map((capability) => (
            <Text
              key={capability}
              style={{
                color: P.ink,
                fontSize: 17,
                lineHeight: 27,
              }}
            >
              {capability}
            </Text>
          ))}
        </View>

        <Text
          style={{ color: P.ink3, fontSize: 13, lineHeight: 20, marginTop: SPACE.xl }}
        >
          {PRACTICE_UI_COPY.completeFrench}
        </Text>

        <View
          style={{
            marginTop: SPACE.lg,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: P.border,
            backgroundColor: P.paper,
            overflow: "hidden",
          }}
        >
          {lines.map((line, i) => (
            <View
              key={line}
              style={{
                paddingHorizontal: SPACE.md,
                paddingVertical: SPACE.sm + 2,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: P.border,
              }}
            >
              <Text
                style={{
                  color: P.ink,
                  fontFamily: "serif",
                  fontSize: 17,
                  lineHeight: 25,
                }}
              >
                {line}
              </Text>
            </View>
          ))}
        </View>

        {/*
          Same quiet type as the rest of the close. A struggle note is
          information, not an alarm, so it never gets a colour of its own.
        */}
        {notes.map((note, i) => (
          <Text
            key={note}
            style={{
              color: P.ink3,
              fontSize: 14,
              lineHeight: 21,
              marginTop: i === 0 ? SPACE.lg : SPACE.xs,
            }}
          >
            {note}
          </Text>
        ))}
      </ScrollView>

      <View
        style={{ paddingHorizontal: SPACE.xl, paddingBottom: SPACE.xl, paddingTop: SPACE.md }}
      >
        <PrimaryAction label={PRACTICE_UI_COPY.completeDone} onPress={onDone} />
        {onAgain !== null && (
          <View style={{ marginTop: SPACE.sm }}>
            <QuietAction label={PRACTICE_UI_COPY.completeAgain} onPress={onAgain} />
          </View>
        )}
      </View>
    </View>
  );
}
