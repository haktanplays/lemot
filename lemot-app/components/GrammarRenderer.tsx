import { View, Text, Pressable } from "react-native";
import { Lightbulb, Globe, Volume2 } from "lucide-react-native";
import { FrMix } from "./FrMix";
import { P } from "@/constants/theme";
import type { GrammarSection } from "@/lib/types";

interface GrammarRendererProps {
  sections: GrammarSection[];
  onSpeak?: (text: string) => void;
}

export function GrammarRenderer({ sections, onSpeak }: GrammarRendererProps) {
  return (
    <View>
      {sections.map((s, i) => {
        if (s.type === "intro") {
          return (
            <View key={i} className="mb-4">
              <FrMix text={s.text} />
            </View>
          );
        }

        if (s.type === "tip") {
          return (
            <View
              key={i}
              className="rounded-xl mt-3.5 p-3"
              style={{
                backgroundColor: P.al,
                borderLeftWidth: 3,
                borderLeftColor: P.amber,
              }}
            >
              <View className="flex-row gap-2">
                <Lightbulb
                  size={16}
                  color={P.amber}
                  strokeWidth={1.5}
                  style={{ marginTop: 2 }}
                />
                <View className="flex-1">
                  <FrMix text={s.text} />
                </View>
              </View>
            </View>
          );
        }

        if (s.type === "culture") {
          return (
            <View
              key={i}
              className="rounded-xl my-3.5 p-3"
              style={{
                backgroundColor: "#FFF7ED",
                borderLeftWidth: 3,
                borderLeftColor: "#EA580C",
              }}
            >
              <View className="flex-row gap-2">
                <Globe
                  size={16}
                  color="#EA580C"
                  strokeWidth={1.5}
                  style={{ marginTop: 2 }}
                />
                <View className="flex-1">
                  <FrMix text={s.text} />
                </View>
              </View>
            </View>
          );
        }

        if (s.type === "block") {
          return (
            <View key={i} className="my-3.5">
              <Text className="text-xs font-bold text-lm-red tracking-wider mb-2 uppercase">
                {s.label}
              </Text>
              {s.items.map((it, j) => (
                <View
                  key={j}
                  className="rounded-xl mb-1.5 border border-lm-border bg-lm-paper px-3.5 py-2.5"
                >
                  <View className="flex-row justify-between items-baseline gap-3">
                    <Text
                      className="flex-1 text-base font-semibold text-lm-ink italic"
                      style={{ fontFamily: "serif" }}
                    >
                      {it.fr}
                    </Text>
                    <Text className="flex-1 text-xs text-lm-ink3 text-right">
                      {it.en}
                    </Text>
                  </View>
                  {it.note && (
                    <Text className="text-xs text-lm-ink2 mt-1.5 leading-5">
                      {it.note}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          );
        }

        if (s.type === "conjugation") {
          return (
            <View
              key={i}
              className="my-3.5 rounded-xl border border-lm-border overflow-hidden"
            >
              <View className="bg-lm-red-light px-3.5 py-2">
                <Text className="text-xs font-bold text-lm-red tracking-wider uppercase">
                  {s.verb}
                </Text>
              </View>
              {s.rows.map((r, j) => (
                <View
                  key={j}
                  className="flex-row px-3.5 py-2.5 items-center"
                  style={{
                    borderBottomWidth: j < s.rows.length - 1 ? 1 : 0,
                    borderBottomColor: P.border,
                    backgroundColor: j % 2 === 0 ? P.paper : "#FAFAF8",
                  }}
                >
                  <Text className="text-xs text-lm-ink3 font-medium w-16">
                    {r.pr}
                  </Text>
                  <Pressable
                    onPress={() => onSpeak?.(`${r.pr} ${r.conj}`)}
                    className="flex-row items-center gap-1.5 flex-1"
                  >
                    <Text
                      className="text-sm font-semibold text-lm-ink"
                      style={{ fontFamily: "serif" }}
                    >
                      {r.conj}
                    </Text>
                    <Volume2 size={12} color={P.ink3} />
                  </Pressable>
                  <Text className="text-xs text-lm-ink2">{r.en}</Text>
                </View>
              ))}
            </View>
          );
        }

        if (s.type === "etymology") {
          return (
            <View key={i} className="my-3.5">
              <Text className="text-xs font-bold text-lm-purple tracking-wider mb-2 uppercase">
                Word Roots
              </Text>
              {s.pairs.map((pair, j) => (
                <View
                  key={j}
                  className="rounded-xl mb-1.5 px-3.5 py-2.5"
                  style={{ backgroundColor: P.pl }}
                >
                  <View className="flex-row gap-2 items-baseline">
                    <Text
                      className="text-sm font-semibold text-lm-purple"
                      style={{ fontFamily: "serif" }}
                    >
                      {pair.fr}
                    </Text>
                    <Text className="text-xs text-lm-ink3">\u2248</Text>
                    <Text className="text-sm font-medium text-lm-ink">
                      {pair.en}
                    </Text>
                  </View>
                  <Text className="text-xs text-lm-ink2 mt-1 leading-5">
                    {pair.root}
                  </Text>
                </View>
              ))}
            </View>
          );
        }

        if (s.type === "howToSay") {
          return (
            <View key={i} className="my-3.5">
              <Text className="text-xs font-bold text-lm-green tracking-wider mb-2 uppercase">
                Pronunciation Guide
              </Text>
              {s.words.map((w, j) => (
                <Pressable
                  key={j}
                  onPress={() => onSpeak?.(w.fr)}
                  className="rounded-xl mb-1.5 px-3.5 py-2.5 border border-lm-border bg-lm-paper"
                >
                  <View className="flex-row justify-between items-baseline">
                    <Text
                      className="text-sm font-semibold text-lm-ink"
                      style={{ fontFamily: "serif" }}
                    >
                      {w.fr}
                    </Text>
                    <View className="flex-row items-center gap-1.5">
                      <Text className="text-xs text-lm-ink3">
                        {w.phonetic}
                      </Text>
                      <Volume2 size={12} color={P.ink3} />
                    </View>
                  </View>
                  <Text className="text-[10px] text-lm-ink3 mt-0.5">
                    {w.ipa}
                  </Text>
                  <Text className="text-xs text-lm-ink2 mt-1 leading-5">
                    {w.notes}
                  </Text>
                </Pressable>
              ))}
            </View>
          );
        }

        return null;
      })}
    </View>
  );
}
