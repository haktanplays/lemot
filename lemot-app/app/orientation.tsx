import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PrimaryAction, LinkAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { P, SPACE, frenchSerif } from "@/constants/theme";
import { markOrientationSeen } from "@/lib/firstUse";
import { useReduceMotion } from "@/hooks/useReduceMotion";

/**
 * What this app is, in four cards, once.
 *
 * The founder's finding: after the first taste the learner is dropped into a
 * product with a Journey, pink boxes inside sentences, Mon Lexique, Practice
 * and My French, and nothing has said what any of it is. The tabs read as
 * unrelated features, and the pieces — which by now are the product's main
 * visual language — have never been explained at all.
 *
 * NOT A TOUR. No spotlights, no overlay, no "step 2 of 8", nothing pointing at
 * a live UI element. Those break on every screen size and trap people, and
 * §19's instruction was to prefer Cairn's own editorial surfaces. So this is
 * four cards on the ordinary paper background, with Skip visible on every one
 * of them, sized so a normal reader is through it in about half a minute.
 *
 * My French is deliberately ABSENT. Explaining a section that has no data yet
 * teaches nothing and costs a card; it belongs to a contextual tip on the day
 * the learner has patterns to look at.
 */

type Beat = {
  kicker: string;
  title: string;
  lines: string[];
  /** The pieces beat draws its own middle; the others are copy only. */
  demo?: "pieces";
};

/**
 * The copy. Kept as data rather than JSX so it can be read as a script — this
 * is thirty seconds of someone's first impression of the product, and it
 * should be possible to check the whole of it at a glance.
 */
const BEATS: Beat[] = [
  {
    kicker: "Your path",
    title: "This is your path.",
    lines: [
      "Lessons move you forward, one small moment of French at a time.",
      "What you meet along the way stays with you.",
    ],
  },
  {
    kicker: "Pieces",
    title: "French travels in pieces.",
    lines: [
      "A piece is not always one word. It is a bit of French worth keeping together, because you can use it again somewhere else.",
    ],
    demo: "pieces",
  },
  {
    kicker: "Mon Lexique",
    title: "Where your French is kept.",
    lines: [
      "The pieces and sentences you meet and use are kept in Mon Lexique.",
      "Not a dictionary. A record of what you have met, and what is starting to become yours.",
    ],
  },
  {
    kicker: "Practice",
    title: "Calling it back.",
    lines: [
      "When something has been quiet for a while, Practice brings it back and asks you to use it again.",
      "That is the whole loop: meet it, use it, keep it, use it again.",
    ],
  },
];

/**
 * The one thing this screen actually has to teach.
 *
 * A sentence the learner produced in their first taste, taken apart into the
 * pieces the product has been drawing around them ever since, and then shown
 * refilling. The claim is made by the picture: the first two pieces hold still
 * down the column and the last one changes.
 *
 * Deliberately NOT one box per word. "je voudrais" is two words and one piece,
 * "s'il vous plaît" is three, and a learner who leaves here believing a box is
 * a word will be wrong about every chunk in the course.
 */
const SENTENCE = "Je voudrais un café, s'il vous plaît.";
const PIECES = ["je voudrais", "un café", "s'il vous plaît"];
const REUSE = ["un café", "un thé", "un croissant"];

function PiecesDemo({ reduceMotion }: { reduceMotion: boolean }) {
  // Revealed on tap rather than on a timer. A learner reading at their own
  // speed should not have the point made before they have read the sentence,
  // and a learner with reduce-motion on gets the same control rather than a
  // lesser version of the screen.
  const [opened, setOpened] = useState(reduceMotion);
  return (
    <View style={{ marginTop: SPACE.lg }}>
      <Text style={{ color: P.ink, ...frenchSerif(19) }}>{SENTENCE}</Text>

      {!opened && (
        <View style={{ marginTop: SPACE.md }}>
          <LinkAction label="Show me the pieces" align="left" onPress={() => setOpened(true)} />
        </View>
      )}

      {opened && (
        <View style={{ marginTop: SPACE.lg }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}>
            {PIECES.map((piece) => (
              <PieceChip key={piece} text={piece} />
            ))}
          </View>

          <Text
            style={{
              color: P.ink2,
              fontSize: 15,
              lineHeight: 23,
              marginTop: SPACE.lg,
            }}
          >
            Three pieces. Keep the first two and change the last one, and you have
            ordered something else.
          </Text>

          <View style={{ marginTop: SPACE.md, gap: SPACE.sm }}>
            {REUSE.map((thing) => (
              <View
                key={thing}
                style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}
              >
                <PieceChip text="je voudrais" />
                <PieceChip text={thing} />
              </View>
            ))}
          </View>

          <Text
            style={{
              color: P.ink3,
              fontSize: 13,
              lineHeight: 19,
              marginTop: SPACE.md,
            }}
          >
            One piece stayed. One piece changed.
          </Text>
        </View>
      )}
    </View>
  );
}

export default function OrientationScreen() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReduceMotion();
  const beat = BEATS[index];
  const isLast = index === BEATS.length - 1;

  // Both exits write the same flag. Skipping is a decision, not an accident,
  // and a learner who skips must not be shown this again on the next launch.
  const leave = () => {
    markOrientationSeen();
    router.replace("/(tabs)" as never);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: P.bg }} edges={["top", "bottom"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: SPACE.xl, paddingBottom: SPACE.xxl }}
      >
        <Text
          style={{
            color: P.ink3,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 0.4,
            marginBottom: SPACE.sm,
          }}
        >
          {beat.kicker}
        </Text>

        <Text
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontSize: 25,
            lineHeight: 34,
          }}
        >
          {beat.title}
        </Text>

        {beat.lines.map((line, i) => (
          <Text
            key={i}
            style={{
              color: P.ink2,
              fontSize: 15,
              lineHeight: 23,
              marginTop: i === 0 ? SPACE.lg : SPACE.sm,
            }}
          >
            {line}
          </Text>
        ))}

        {beat.demo === "pieces" && <PiecesDemo reduceMotion={reduceMotion} />}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.md,
          paddingBottom: SPACE.md,
          borderTopWidth: 1,
          borderTopColor: P.border,
          backgroundColor: P.bg,
          gap: SPACE.sm,
        }}
      >
        <PrimaryAction
          label={isLast ? "Start" : "Continue"}
          onPress={isLast ? leave : () => setIndex((i) => i + 1)}
        />
        {/* Present on every card, including the last. An exit that appears only
            at the start is one the learner has to gamble on. */}
        {!isLast && <LinkAction label="Skip" align="center" onPress={leave} />}
      </View>
    </SafeAreaView>
  );
}
