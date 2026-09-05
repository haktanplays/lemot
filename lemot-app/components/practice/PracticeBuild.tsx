import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction, QuietAction } from "@/components/ui/actions";
import { P, SPACE } from "@/constants/theme";
import { gradeBuildSequence } from "@/components/learning-engine/buildSequence";
import type { PracticeBuildScreen } from "@/content/practice/practiceTypes";

/**
 * Reconstruct an owned sentence from its pieces.
 *
 * WHY THIS IS NOT A WORD PUZZLE. The tiles are canonical ITEMS, not words: "Je
 * ne comprends pas." is one chunk and so would be one tile, which is why it is
 * never built. A build only exists where the pieces are genuinely separate
 * things the learner owns — greeting + placement + request — so the work is
 * ordering a MOMENT, not spelling a sentence out of fragments.
 *
 * Grading is the shipped `gradeBuildSequence`: an item-sequence comparison,
 * never a string rebuild. Punctuation therefore cannot block a correct answer,
 * and "right pieces, wrong order" stays a distinct, honest outcome rather than
 * being flattened into plain wrong.
 */
export function PracticeBuild({
  screen,
  onContinue,
  onAttempt,
}: {
  screen: PracticeBuildScreen;
  onContinue: () => void;
  onAttempt?: (facts: { picked: number[] }) => void;
}) {
  const { prompt, context, tiles, targetText, reveal } = screen.payload;
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<null | { correct: boolean; order: boolean }>(
    null,
  );

  const available = tiles.map((_, i) => i).filter((i) => !picked.includes(i));

  const check = () => {
    if (checked !== null) return; // one graded attempt per screen
    const graded = gradeBuildSequence({ tiles, picked });
    setChecked({
      correct: graded.result === "correct",
      order: graded.result === "wrong_order",
    });
    onAttempt?.({ picked });
  };

  const tileStyle = (placed: boolean) => ({
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.sm + 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: placed ? P.border : P.border,
    backgroundColor: placed ? P.paper : P.bg,
  });

  return (
    <LessonScreenFrame
      footer={
        checked === null ? (
          <PrimaryAction
            label="Check"
            onPress={check}
            disabled={picked.length === 0}
          />
        ) : (
          <PrimaryAction label="Continue" onPress={onContinue} />
        )
      }
    >
      {context !== undefined && (
        <Text
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            fontStyle: "italic",
            marginBottom: SPACE.md,
          }}
        >
          {context}
        </Text>
      )}
      <Text style={{ color: P.ink, fontSize: 20, lineHeight: 28, fontWeight: "600" }}>
        {prompt}
      </Text>

      {/* The line being assembled. Empty reads as an invitation, not an error. */}
      <View
        style={{
          minHeight: 76,
          marginTop: SPACE.lg,
          padding: SPACE.md,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: P.border,
          backgroundColor: P.paper,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: SPACE.sm,
          alignItems: "flex-start",
        }}
      >
        {picked.length === 0 ? (
          <Text style={{ color: P.ink3, fontSize: 14, lineHeight: 21 }}>
            Tap the pieces in order.
          </Text>
        ) : (
          picked.map((tileIndex, slot) => (
            <Pressable
              key={`${tileIndex}-${slot}`}
              onPress={() =>
                checked === null &&
                setPicked((current) => current.filter((_, s) => s !== slot))
              }
              accessibilityRole="button"
              accessibilityLabel={`Remove ${tiles[tileIndex].text}`}
              style={tileStyle(true)}
            >
              <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 17 }}>
                {tiles[tileIndex].text}
              </Text>
            </Pressable>
          ))
        )}
      </View>

      {checked === null && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: SPACE.sm,
            marginTop: SPACE.lg,
          }}
        >
          {available.map((tileIndex) => (
            <Pressable
              key={tileIndex}
              onPress={() => setPicked((current) => [...current, tileIndex])}
              accessibilityRole="button"
              accessibilityLabel={`Add ${tiles[tileIndex].text}`}
              style={tileStyle(false)}
            >
              <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 17 }}>
                {tiles[tileIndex].text}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {checked === null && picked.length > 0 && (
        <View style={{ marginTop: SPACE.lg }}>
          <QuietAction label="Start again" onPress={() => setPicked([])} />
        </View>
      )}

      {checked !== null && (
        <View style={{ marginTop: SPACE.xl }}>
          <Text
            style={{
              color: checked.correct ? P.green : P.ink2,
              fontSize: 15,
              lineHeight: 23,
            }}
          >
            {checked.correct
              ? "Correct."
              : checked.order
                ? "All the right pieces — they go in a different order."
                : "Not quite."}
          </Text>
          <View
            style={{
              marginTop: SPACE.md,
              padding: SPACE.md,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: P.border,
              backgroundColor: P.paper,
            }}
          >
            <Text style={{ color: P.ink3, fontSize: 13 }}>The whole line</Text>
            <Text
              style={{
                color: P.ink,
                fontFamily: "serif",
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 26,
                marginTop: 2,
              }}
            >
              {targetText}
            </Text>
          </View>
          <Text
            style={{ color: P.ink2, fontSize: 14, lineHeight: 21, marginTop: SPACE.md }}
          >
            {checked.correct ? reveal.ifCorrect : (reveal.ifWrong ?? reveal.ifCorrect)}
          </Text>
        </View>
      )}
    </LessonScreenFrame>
  );
}
