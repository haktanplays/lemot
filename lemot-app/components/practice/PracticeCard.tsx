import { View, Text, Pressable } from "react-native";
import { P, SPACE, RADIUS } from "@/constants/theme";
import { catalogueCard } from "@/content/practice/practiceCatalogue";
import { seedShape } from "@/content/practice/practiceBrowse";
import { shapeLabel } from "@/content/practice/practiceCopy";
import type { PracticeSeed } from "@/content/practice/practiceTypes";

/**
 * One browsable practice, as the learner decides whether to do it.
 *
 * IT SHOWS THE REAL THING. The card is built from what the seed already
 * authors — the scene and the job — because a browse surface made of filters
 * and category names asks the learner to choose between labels, and nobody can
 * do that. "Busy counter. Nobody has looked at you yet, and you would like a
 * coffee. / Reach them first, then order." answers the only question a card has
 * to answer: what happens if I tap this. Nothing is generated, and a seed with
 * no scene shows its job alone rather than having one invented for it.
 *
 * NO AUDIO. §22: a card describes the job, in English, and the job is scenery
 * rather than language to learn. Audio belongs to French the learner is meant
 * to hear — the model on a reveal, a dictation prompt inside the exercise —
 * and putting a speaker on every browse row would make it furniture.
 *
 * NO BADGE, NO LEVEL, NO COUNT. The one piece of metadata is the SHAPE of the
 * work ("Write it", "Listen first"), which changes what tapping costs. The
 * seed's difficulty, its operation, its targets and its tier stay internal.
 */
export function PracticeCard({
  seed,
  lessonTitle,
  onPress,
}: {
  seed: PracticeSeed;
  /** The lesson the language came from. Orientation, not a filter chip. */
  lessonTitle?: string;
  onPress: () => void;
}) {
  const { scene, job } = catalogueCard(seed);
  const shape = shapeLabel(seedShape(seed));
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={scene ? `${scene} ${job}` : job}
      style={({ pressed }) => ({
        backgroundColor: P.paper,
        borderWidth: 1,
        borderColor: P.border,
        borderRadius: RADIUS.card,
        paddingHorizontal: SPACE.lg,
        paddingVertical: SPACE.lg,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {scene ? (
        <Text style={{ color: P.ink3, fontSize: 14, lineHeight: 21 }}>{scene}</Text>
      ) : null}
      <Text
        style={{
          color: P.ink,
          fontSize: 16,
          lineHeight: 24,
          marginTop: scene ? SPACE.xs : 0,
        }}
      >
        {job}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SPACE.sm,
          marginTop: SPACE.md,
        }}
      >
        <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 17, letterSpacing: 0.3 }}>
          {shape}
        </Text>
        {lessonTitle ? (
          <>
            <View
              style={{ width: 3, height: 3, borderRadius: 2, backgroundColor: P.border }}
            />
            <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 17 }}>{lessonTitle}</Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}
