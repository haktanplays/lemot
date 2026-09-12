import { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2 } from "lucide-react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, frenchLineHeight, frenchSerif } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import type { MeetCardScreen } from "@/content/lessonTypes";

export function MeetCard({
  screen,
  onContinue,
  onExposure,
}: {
  screen: MeetCardScreen;
  onContinue: () => void;
  /**
   * UI FACTS only (PR-06). Reported once, when the learner CONTINUES — not on
   * mount: a learner who opens the screen and immediately leaves has not
   * completed an exposure, and recording one would overstate what happened.
   */
  onExposure?: (facts: { ttsPlayCount: number }) => void;
}) {
  const { say } = useSpeech();
  const { payload } = screen;
  const highlights = payload.highlights ?? [];
  const playCount = useRef(0);
  const reported = useRef(false);

  const handleContinue = () => {
    // Double-tap guard: Continue can fire twice before the screen unmounts, and
    // two exposure events for one reading would be a lie about the session.
    if (!reported.current) {
      reported.current = true;
      onExposure?.({ ttsPlayCount: playCount.current });
    }
    onContinue();
  };

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={handleContinue} />}
    >
      {payload.title && (
        <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
          {payload.title}
        </Text>
      )}

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
        }}
      >
        <View className="flex-row items-start gap-3">
          <View className="flex-1">
            <Text
              style={{
                color: P.ink,
                // Was className="text-lg" plus a literal lineHeight of 28. The
                // size lived in a class and the line box lived in a number, so
                // nothing connected them: change the class and the line box
                // silently stops fitting. The size is explicit now and the line
                // box is computed from it.
                ...frenchSerif(18),
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
                playCount.current += 1;
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
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 16,
            }}
          >
            {highlights.map((h, i) => (
              <View
                key={`${h.text}-${i}`}
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: P.rl,
                  borderWidth: 1,
                  borderColor: P.rb,
                  borderRadius: 9999,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                {/* French in a pill with 4px of vertical padding and, until
                    now, no line box of its own: it inherited a default sized
                    for unaccented Latin. These are the chips showing "je ne
                    suis pas" and "ici", which is where the founder has been
                    looking. Upright, so the upright floor applies. */}
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: frenchLineHeight(12),
                    color: P.ink2,
                  }}
                >
                  {h.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </LessonScreenFrame>
  );
}
