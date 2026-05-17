import { View, Text, ScrollView } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type { RecapScreen } from "@/content/lessonTypes";

export function RecapCard({
  screen,
  onContinue,
}: {
  screen: RecapScreen;
  onContinue: () => void;
}) {
  const { payload } = screen;
  const pieces = payload.piecesUsed ?? [];
  const buttonLabel = payload.nextLabel ?? "Continue";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
        A small recap
      </Text>

      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 16,
        }}
      >
        {payload.title && (
          <Text
            className="text-base mb-2"
            style={{
              color: P.ink,
              fontFamily: "serif",
            }}
          >
            {payload.title}
          </Text>
        )}

        {payload.lines.map((line, i) => (
          <Text
            key={i}
            className="text-sm"
            style={{
              color: P.ink2,
              lineHeight: 22,
              marginTop: i === 0 ? 0 : 6,
            }}
          >
            {line}
          </Text>
        ))}
      </View>

      {pieces.length > 0 && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs mb-2" style={{ color: P.ink3 }}>
            Pieces you used
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {pieces.map((p, i) => (
              <View
                key={`${p}-${i}`}
                className="rounded-full"
                style={{
                  backgroundColor: P.paper,
                  borderWidth: 1,
                  borderColor: P.border,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text className="text-xs" style={{ color: P.ink2 }}>
                  {p}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <Btn onPress={onContinue}>
        <Text style={{ color: P.paper, fontSize: 15 }}>{buttonLabel}</Text>
      </Btn>
    </ScrollView>
  );
}
