import { View, Text, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, SPACE } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import type { ShowcaseScreen } from "@/content/lessonTypes";

/**
 * The lesson's opening language world.
 *
 * This is a BREADTH surface, and deliberately the only lesson screen that
 * reports nothing. It grades nothing, it has no correct answer, and it emits no
 * evidence: reading a list is not learning, and crediting it would hand the
 * mastery layer — and later Practice Hub — a learner who looks competent purely
 * for having scrolled. Everything the lesson actually claims is claimed by the
 * screens after this one.
 *
 * The authoring roles (core / supported / exposure) are NOT rendered. They are
 * how the content decides what the lesson must go on to teach; showing the
 * learner a taxonomy would turn a calm first page into a syllabus.
 */
export function Showcase({
  screen,
  onContinue,
}: {
  screen: ShowcaseScreen;
  onContinue: () => void;
}) {
  const { say } = useSpeech();
  const { intro, clusters } = screen.payload;

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={onContinue} />}
    >
      <Text
        style={{
          color: P.ink2,
          fontSize: 15,
          lineHeight: 23,
          marginBottom: SPACE.lg,
        }}
      >
        {intro}
      </Text>

      {clusters.map((cluster, ci) => (
        <View key={cluster.label} style={{ marginTop: ci === 0 ? 0 : SPACE.lg }}>
          <Text
            style={{
              color: P.ink3,
              fontSize: 12,
              letterSpacing: 0.3,
              marginBottom: SPACE.sm,
            }}
          >
            {cluster.label}
          </Text>

          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: P.border,
              backgroundColor: P.paper,
              overflow: "hidden",
            }}
          >
            {cluster.sentences.map((sentence, si) => (
              <View
                key={sentence.fr}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: SPACE.sm,
                  paddingHorizontal: SPACE.md,
                  paddingVertical: SPACE.sm + 2,
                  borderTopWidth: si === 0 ? 0 : 1,
                  borderTopColor: P.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: P.ink,
                      fontFamily: "serif",
                      fontSize: 17,
                      lineHeight: 25,
                    }}
                  >
                    {sentence.fr}
                  </Text>
                  <Text
                    style={{
                      color: P.ink3,
                      fontSize: 13,
                      lineHeight: 19,
                      marginTop: 2,
                    }}
                  >
                    {sentence.en}
                  </Text>
                </View>

                <Pressable
                  onPress={() => say(sentence.fr)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Listen to ${sentence.fr}`}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: P.bg,
                    borderWidth: 1,
                    borderColor: P.border,
                    marginTop: 2,
                  }}
                >
                  <Volume2 size={16} color={P.ink2} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      ))}
    </LessonScreenFrame>
  );
}
