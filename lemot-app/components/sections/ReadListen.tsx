import { View, Text, Pressable, ScrollView } from "react-native";
import { Volume2, ArrowRight } from "lucide-react-native";
import { FrText } from "@/components/FrText";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { Example } from "@/lib/types";

interface ReadListenProps {
  examples: Example[];
  onComplete: () => void;
  say: (text: string) => void;
}

/**
 * Section 0: Read & Listen
 *
 * Displays example cards with interactive French text (tap for definitions),
 * English translation, Franglais bridge sentence, and a listen button.
 * Input-first: the learner reads and listens before any exercises.
 */
export function ReadListen({ examples, onComplete, say }: ReadListenProps) {
  return (
    <View>
      <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
        Tap any French word to see its meaning. Notice the Franglais bridge
        below each sentence.
      </Text>

      {examples.map((ex, i) => (
        <View
          key={i}
          className="rounded-xl mb-2 border"
          style={{
            backgroundColor: P.paper,
            borderColor: P.border,
            padding: 14,
          }}
        >
          <View className="flex-row items-start gap-2">
            <View className="flex-1">
              {/* French sentence */}
              <View className="flex-row flex-wrap items-center">
                <Text
                  className="text-base"
                  style={{
                    fontFamily: "serif",
                    fontStyle: "italic",
                    lineHeight: 24,
                    color: P.ink,
                  }}
                >
                  {"« "}
                </Text>
                <FrText text={ex.fr} />
                <Text
                  className="text-base"
                  style={{
                    fontFamily: "serif",
                    fontStyle: "italic",
                    lineHeight: 24,
                    color: P.ink,
                  }}
                >
                  {" »"}
                </Text>
              </View>

              {/* English translation */}
              <Text className="text-xs mt-1" style={{ color: P.ink3 }}>
                {ex.en}
              </Text>

              {/* Franglais bridge */}
              {ex.bridge ? (
                <View
                  className="rounded-md mt-1.5 self-start"
                  style={{
                    backgroundColor: P.pl,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                  }}
                >
                  <Text
                    className="text-xs italic"
                    style={{ color: P.purple }}
                  >
                    Bridge: {ex.bridge}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Listen button */}
            <Pressable
              onPress={() => say(ex.fr)}
              className="rounded-lg items-center justify-center"
              style={{
                width: 32,
                height: 32,
                backgroundColor: P.rl,
                flexShrink: 0,
              }}
            >
              <Volume2 size={14} color={P.red} strokeWidth={1.5} />
            </Pressable>
          </View>
        </View>
      ))}

      <Btn onPress={onComplete}>
        <Text className="text-white text-sm font-semibold">Next</Text>
        <ArrowRight size={15} color="#fff" />
      </Btn>
    </View>
  );
}
