import { View, Text, ScrollView } from "react-native";
import { P, SPACE } from "@/constants/theme";
import { PrimaryAction, QuietAction } from "@/components/ui/actions";
import { closingNote, workedOnLines } from "@/content/practice/practiceCopy";
import type { PracticeSessionAction } from "@/content/practice/practicePlanner";

/**
 * The end of a practice session.
 *
 * NOT "6/8 correct". A score is the one thing a learner can read as a verdict,
 * and the honest product claim after five minutes of practice is not a
 * percentage — it is the French that came back. So the summary lists exactly
 * what was worked on, derived from the session that actually ran, and the only
 * closing note is a calm "worth another look" when something was genuinely
 * missed. No mastery claim, no praise the evidence does not support.
 */
export function PracticeComplete({
  actions,
  missCount,
  onDone,
  onAgain,
}: {
  actions: readonly PracticeSessionAction[];
  missCount: number;
  onDone: () => void;
  onAgain: (() => void) | null;
}) {
  const lines = workedOnLines(actions);
  const note = closingNote(missCount);

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
          That is enough for now.
        </Text>
        <Text
          style={{ color: P.ink2, fontSize: 15, lineHeight: 23, marginTop: SPACE.md }}
        >
          You brought back:
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

        {note !== null && (
          <Text
            style={{ color: P.ink3, fontSize: 14, lineHeight: 21, marginTop: SPACE.lg }}
          >
            {note}
          </Text>
        )}
      </ScrollView>

      <View
        style={{ paddingHorizontal: SPACE.xl, paddingBottom: SPACE.xl, paddingTop: SPACE.md }}
      >
        <PrimaryAction label="Done" onPress={onDone} />
        {onAgain !== null && (
          <View style={{ marginTop: SPACE.sm }}>
            <QuietAction label="Another set" onPress={onAgain} />
          </View>
        )}
      </View>
    </View>
  );
}
