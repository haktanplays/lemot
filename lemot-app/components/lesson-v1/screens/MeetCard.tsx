import { View, Text, ScrollView, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import type { MeetCardScreen } from "@/content/lessonTypes";

export function MeetCard({
  screen,
  onContinue,
}: {
  screen: MeetCardScreen;
  onContinue: () => void;
}) {
  const { say } = useSpeech();
  const { payload } = screen;
  const highlights = payload.highlights ?? [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      {payload.title && (
        <Text className="text-xs mb-3" style={{ color: P.ink3 }}>
          {payload.title}
        </Text>
      )}

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 18,
        }}
      >
        <View className="flex-row items-start gap-3">
          <View className="flex-1">
            <Text
              className="text-lg"
              style={{
                color: P.ink,
                fontFamily: "serif",
                fontStyle: "italic",
                lineHeight: 28,
              }}
            >
              {payload.fr}
            </Text>
            {payload.en && (
              <Text
                className="text-sm mt-2"
                style={{ color: P.ink2 }}
              >
                {payload.en}
              </Text>
            )}
          </View>
          {payload.tts && (
            <Pressable
              onPress={() => {
                void say(payload.fr);
              }}
              hitSlop={8}
              style={{
                padding: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: P.border,
                backgroundColor: P.bg,
              }}
            >
              <Volume2 size={18} color={P.ink2} />
            </Pressable>
          )}
        </View>

        {highlights.length > 0 && (
          <View className="flex-row flex-wrap gap-2 mt-4">
            {highlights.map((h, i) => (
              <View
                key={`${h.text}-${i}`}
                className="rounded-full"
                style={{
                  backgroundColor: P.rl,
                  borderWidth: 1,
                  borderColor: P.rb,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text
                  className="text-xs"
                  style={{ color: P.ink2 }}
                >
                  {h.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Btn onPress={onContinue}>
        <Text style={{ color: P.paper, fontSize: 15 }}>Continue</Text>
      </Btn>
    </ScrollView>
  );
}
