import { useState } from "react";
import { Text, Pressable, View } from "react-native";
import { DICT } from "@/data/dictionary";
import { P } from "@/constants/theme";

interface FrTextProps {
  text: string;
  onWordPress?: (word: string) => void;
}

/**
 * Interactive French text with tap-to-reveal word definitions.
 * Words found in DICT get a dotted underline; tapping shows a tooltip.
 */
export function FrText({ text }: FrTextProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const words = text.split(/(\s+|[.,!?;:«»])/);

  return (
    <View className="flex-row flex-wrap relative">
      {words.map((w, i) => {
        const clean = w
          .toLowerCase()
          .replace(/[.,!?;:«»'"]/g, "")
          .trim();
        const hint = DICT[clean];

        if (!clean || !hint) {
          return (
            <Text
              key={i}
              className="text-base text-lm-ink"
              style={{ fontFamily: "serif" }}
            >
              {w}
            </Text>
          );
        }

        const isActive = activeIdx === i;

        return (
          <View key={i} style={{ position: "relative" }}>
            <Pressable
              onPress={() => setActiveIdx(isActive ? null : i)}
            >
              <Text
                className="text-base"
                style={{
                  fontFamily: "serif",
                  color: isActive ? P.red : P.ink,
                  borderBottomWidth: 1,
                  borderBottomColor: isActive ? P.red : P.border,
                  borderStyle: isActive ? "solid" : "dotted",
                }}
              >
                {w}
              </Text>
            </Pressable>

            {isActive && (
              <View
                className="absolute -top-10 left-0 px-3 py-1.5 rounded-lg z-50"
                style={{
                  backgroundColor: P.ink,
                  minWidth: 100,
                }}
              >
                <Text className="text-xs text-white font-bold">
                  {clean}
                  <Text className="font-normal opacity-50"> · </Text>
                  <Text className="font-normal">{hint}</Text>
                </Text>
                {hint.includes("\u2248") && (
                  <Text className="text-[10px] text-white opacity-60">
                    cognate
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
