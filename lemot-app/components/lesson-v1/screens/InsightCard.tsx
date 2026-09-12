import { View, Text } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { P, RADIUS, SPACE, frenchLineHeight, frenchSerif } from "@/constants/theme";
import { Kicker } from "@/components/ui/editorial";
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
      <Kicker text={INSIGHT_LABELS[payload.insightType]} gap="sm" />

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
              {ex.derivation ? (
                <DerivationLine derivation={ex.derivation} />
              ) : ex.frame ? (
                <FrameLine frame={ex.frame} />
              ) : ex.pieces && ex.pieces.length > 0 ? (
                /* The same chips the lesson draws. A card that says words
                   travel together has to show them travelling. */
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}>
                  {ex.pieces.map((piece, k) => (
                    <PieceChip key={`${piece}-${k}`} text={piece} />
                  ))}
                </View>
              ) : (
                ex.fr && (
                  <Text
                    style={{
                      color: P.ink,
                      ...frenchSerif(17),
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
/**
 * Where a piece of French came from, in three steps.
 *
 * `le café` → `à + le` → `au café`. The middle step is the whole point: it is
 * the only place the learner sees that something HAPPENED, rather than that
 * French chose a shape. It is drawn quietly (the outcome is what they will
 * use), and the outcome takes the piece treatment, because that is what it is.
 *
 * Wraps rather than scrolls: three short French spans and two arrows fit on a
 * phone, and a derivation that ran off the edge would hide its own conclusion.
 */
function DerivationLine({
  derivation,
}: {
  derivation: { from: string; via: string; to: string };
}) {
  const arrow = { color: P.ink3, fontSize: 14, lineHeight: frenchLineHeight(14) };
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: SPACE.sm }}
    >
      <Text style={{ color: P.ink2, ...frenchSerif(16) }}>{derivation.from}</Text>
      <Text style={arrow}>→</Text>
      {/* The operation, not French to reuse: upright and quiet, so it never
          reads as a phrase the learner should be able to say. */}
      <Text style={{ color: P.ink3, fontSize: 14, lineHeight: 20 }}>{derivation.via}</Text>
      <Text style={arrow}>→</Text>
      <PieceChip text={derivation.to} />
    </View>
  );
}

function FrameLine({ frame }: { frame: SplitFrame }) {
  const serif = frenchSerif(17);
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
