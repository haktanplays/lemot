import { View, Text } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, RADIUS, SPACE, frenchLineHeight } from "@/constants/theme";
import type {
  InsightCardScreen,
  InsightType,
  SplitFrame,
} from "@/content/lessonTypes";

const INSIGHT_LABELS: Record<InsightType, string> = {
  "sound-writing": "Sound / Writing",
  "grammar-nugget": "Why this works",
  "micro-contrast": "Small difference",
  "culture-bite": "Natural use",
  "faux-ami": "False friend",
  cognate: "Pattern link",
  "lesson-goal": "Your goal",
};

export function InsightCard({
  screen,
  onContinue,
}: {
  screen: InsightCardScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const examples = payload.examples ?? [];

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={onContinue} />}
    >
      {/* A small thing worth noticing, not an unlock and not a grammar chapter.
          The card-inside-a-card stack is gone: a kicker, an editorial title, a
          hairline and quiet body carry the whole screen, and the examples sit
          as flat rows so the French in them stays the thing you look at. */}
      <Text
        style={{
          color: P.ink3,
          fontSize: 12,
          letterSpacing: 0.4,
          marginBottom: SPACE.sm,
        }}
      >
        {INSIGHT_LABELS[payload.insightType]}
      </Text>

      <Text
        style={{
          color: P.ink,
          fontFamily: "serif",
          fontSize: 21,
          lineHeight: 29,
        }}
      >
        {payload.title}
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: P.border,
          marginTop: SPACE.lg,
          marginBottom: SPACE.lg,
        }}
      />

      <Text style={{ color: P.ink2, fontSize: 15, lineHeight: 23 }}>
        {payload.body}
      </Text>

      {examples.length > 0 && (
        <View style={{ marginTop: SPACE.xl }}>
          {examples.map((ex, i) => (
            <View
              key={i}
              style={{
                marginTop: i === 0 ? 0 : SPACE.lg,
                paddingTop: i === 0 ? 0 : SPACE.lg,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: P.border,
              }}
            >
              {ex.frame ? (
                <FrameLine frame={ex.frame} />
              ) : (
                ex.fr && (
                  <Text
                    style={{
                      color: P.ink,
                      fontFamily: "serif",
                      fontStyle: "italic",
                      fontSize: 17,
                      lineHeight: frenchLineHeight(17),
                    }}
                  >
                    {ex.fr}
                  </Text>
                )
              )}
              {ex.en && (
                <Text
                  style={{
                    color: P.ink2,
                    fontSize: 14,
                    lineHeight: 21,
                    marginTop: SPACE.xs,
                  }}
                >
                  {ex.en}
                </Text>
              )}
              {ex.note && (
                <Text
                  style={{
                    color: P.ink3,
                    fontSize: 12,
                    lineHeight: 18,
                    marginTop: SPACE.sm,
                  }}
                >
                  {ex.note}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

    </LessonScreenFrame>
  );
}

/**
 * One sentence drawn as the move it is: two halves, and what they closed around.
 *
 * The learner's eye has to be able to do the comparison the body describes, so
 * only three things are marked and everything else stays quiet. The halves take
 * weight and colour; the thing between them takes a box; the words either side
 * stay ordinary. Line them up under each other and the picture makes the
 * argument on its own — the box moves, the halves never do.
 *
 * Deliberately NOT chips. A PieceChip means "this travels together and you can
 * reuse it", which is exactly what ne and pas do not do: they only ever appear
 * apart. Borrowing the chip's visual language here would say the opposite of
 * what the screen is teaching, so the frame gets its own, quieter one.
 *
 * Wraps rather than scrolls. Je ne comprends pas is short, but the frame has to
 * survive a long `inside` and a large font scale, and a clipped negation would
 * be silent.
 */
function FrameLine({ frame }: { frame: SplitFrame }) {
  const serif = {
    fontFamily: "serif" as const,
    fontStyle: "italic" as const,
    fontSize: 17,
    lineHeight: frenchLineHeight(17),
  };
  const half = { ...serif, color: P.ink, fontWeight: "600" as const };
  const quiet = { ...serif, color: P.ink3 };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: 6,
      }}
    >
      {frame.lead ? <Text style={quiet}>{frame.lead}</Text> : null}
      <Text style={half}>{frame.open}</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: P.border,
          backgroundColor: P.paper,
          borderRadius: RADIUS.inner,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}
      >
        <Text style={{ ...serif, color: P.ink }}>{frame.inside}</Text>
      </View>
      <Text style={half}>{frame.close}</Text>
      {frame.trail ? <Text style={quiet}>{frame.trail}</Text> : null}
    </View>
  );
}
