import { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { ArrowRight, Sparkles, Check, X } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { norm } from "@/lib/normalize";
import { evaluateSayIt } from "@/lib/ai";
import type { SayItItem } from "@/lib/types";

interface SayItYourWayProps {
  items: SayItItem[];
  onComplete: () => void;
}

/**
 * Section 8: Say It Your Way
 *
 * Free-write response to situation prompts. The learner writes in French
 * with no hints -- only a situation and target words to guide them.
 * AI evaluates the response and checks target word usage.
 */
export function SayItYourWay({ items, onComplete }: SayItYourWayProps) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const current = items[index < items.length ? index : 0];

  /** Check which target words appear in the user's text */
  function getUsedWords(): boolean[] {
    return current.target.map((w) => norm(input).includes(norm(w)));
  }

  /** Submit text for AI evaluation */
  async function handleSubmit() {
    if (input.trim().length < 3 || loading) return;

    setLoading(true);
    try {
      const result = await evaluateSayIt(input, current.situation, current.target);
      setFeedback(result);
    } catch {
      setFeedback(
        "Well done for writing in French! Try to use the target words naturally in your sentences."
      );
    }
    setLoading(false);
  }

  /** Advance to next item or finish */
  function handleContinue() {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setInput("");
      setFeedback(null);
    } else {
      onComplete();
    }
  }

  const usedFlags = getUsedWords();

  return (
    <ScrollView>
      {/* Header */}
      <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
        Say It Your Way {index + 1}/{items.length}
      </Text>
      <Text className="text-xs mb-3" style={{ color: P.ink2 }}>
        No hints -- express yourself freely in French!
      </Text>

      <View
        className="rounded-2xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        {/* Situation prompt */}
        <View
          className="rounded-xl mb-4"
          style={{
            padding: 14,
            backgroundColor: P.al,
            borderLeftWidth: 3,
            borderLeftColor: P.amber,
          }}
        >
          <Text
            className="text-sm"
            style={{ color: "#92400E", lineHeight: 22 }}
          >
            <Text className="font-bold">Situation: </Text>
            {current.situation}
          </Text>
        </View>

        {/* Target words */}
        <View className="mb-2">
          <Text className="text-xs mb-1.5" style={{ color: P.ink3 }}>
            Target words:
          </Text>
          <View className="flex-row flex-wrap gap-1.5">
            {current.target.map((w, i) => (
              <View
                key={w}
                className="rounded-md"
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  backgroundColor: feedback
                    ? usedFlags[i]
                      ? P.gl
                      : P.rl
                    : P.pl,
                }}
              >
                <Text
                  className="text-xs"
                  style={{
                    fontFamily: "serif",
                    fontStyle: "italic",
                    color: feedback
                      ? usedFlags[i]
                        ? P.green
                        : P.red
                      : P.purple,
                  }}
                >
                  {w}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Text input */}
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Write your response in French..."
          placeholderTextColor={P.ink3}
          editable={!feedback && !loading}
          multiline
          textAlignVertical="top"
          className="rounded-xl mt-2"
          style={{
            minHeight: 100,
            padding: 12,
            borderWidth: 1.5,
            borderColor: feedback ? P.green : P.border,
            fontFamily: "serif",
            fontSize: 15,
            color: P.ink,
            backgroundColor: feedback ? "#FAFFF8" : P.paper,
            lineHeight: 22,
          }}
        />

        {/* Feedback area */}
        {feedback && (
          <View className="mt-3">
            {/* Words used breakdown */}
            <View
              className="rounded-xl mb-2 border"
              style={{
                padding: 14,
                backgroundColor: P.gl,
                borderColor: P.green,
              }}
            >
              <Text
                className="text-xs font-bold mb-1.5"
                style={{ color: P.green }}
              >
                Words Used
              </Text>
              <View className="flex-row flex-wrap gap-1">
                {current.target.map((w, i) => (
                  <View
                    key={w}
                    className="flex-row items-center rounded-md"
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      backgroundColor: usedFlags[i] ? P.green : P.rl,
                    }}
                  >
                    <Text
                      className="text-xs"
                      style={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        color: usedFlags[i] ? "#fff" : P.red,
                      }}
                    >
                      {w}
                    </Text>
                    {usedFlags[i] ? (
                      <Check
                        size={10}
                        color="#fff"
                        strokeWidth={2}
                        style={{ marginLeft: 3 }}
                      />
                    ) : (
                      <X
                        size={10}
                        color={P.red}
                        strokeWidth={2}
                        style={{ marginLeft: 3 }}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* AI feedback */}
            <View
              className="rounded-xl border"
              style={{
                padding: 14,
                backgroundColor: "#F0F9FF",
                borderColor: "#BAE6FD",
              }}
            >
              <Text
                className="text-xs font-bold mb-1"
                style={{ color: "#0369A1" }}
              >
                Feedback
              </Text>
              <Text
                className="text-sm"
                style={{ color: P.ink2, lineHeight: 22 }}
              >
                {feedback}
              </Text>
            </View>
          </View>
        )}

        {/* Submit button */}
        {!feedback && !loading && input.trim().length > 2 && (
          <Btn onPress={handleSubmit}>
            <Text className="text-white text-sm font-semibold">Evaluate</Text>
            <Sparkles size={14} color="#fff" />
          </Btn>
        )}

        {/* Loading indicator */}
        {loading && (
          <Text
            className="text-xs text-center mt-3"
            style={{ color: P.ink3 }}
          >
            Evaluating...
          </Text>
        )}

        {/* Continue button */}
        {feedback && (
          <Btn
            onPress={handleContinue}
            color={P.green}
          >
            <Text className="text-white text-sm font-semibold">
              {index < items.length - 1 ? "Next Situation" : "Done"}
            </Text>
            <ArrowRight size={15} color="#fff" />
          </Btn>
        )}
      </View>
    </ScrollView>
  );
}
