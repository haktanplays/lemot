import { View, Text, ScrollView } from "react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import type {
  NaturalRevealPayload,
  NaturalRevealScreen,
} from "@/content/lessonTypes";

const NOTICE_KEYS = [
  "ifCorrectButFlat",
  "ifUnderstandableButWrong",
  "ifWrongStructure",
  "ifTooDirect",
  "ifMissingTargetPiece",
  "ifBetterThanExpected",
] as const;

export function NaturalRevealView({
  reveal,
}: {
  reveal: NaturalRevealPayload;
}) {
  const notices = NOTICE_KEYS.map((k) => reveal[k]).filter(
    (v): v is string => typeof v === "string" && v.length > 0
  );
  const alternatives = reveal.naturalAlternatives ?? [];

  return (
    <View>
      {reveal.modelAnswer && (
        <View
          className="rounded-xl border"
          style={{
            backgroundColor: P.paper,
            borderColor: P.border,
            padding: 14,
          }}
        >
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            A natural version
          </Text>
          <Text
            className="text-base"
            style={{
              color: P.ink,
              fontFamily: "serif",
              fontStyle: "italic",
              lineHeight: 24,
            }}
          >
            {reveal.modelAnswer}
          </Text>
        </View>
      )}

      {reveal.ifCorrect && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.gl,
            borderColor: P.green,
            padding: 12,
          }}
        >
          <Text className="text-sm" style={{ color: P.green }}>
            {reveal.ifCorrect}
          </Text>
        </View>
      )}

      {notices.length > 0 && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            Notice
          </Text>
          {notices.map((note, i) => (
            <Text
              key={i}
              className="text-sm"
              style={{ color: P.ink2, marginTop: i === 0 ? 0 : 4 }}
            >
              {note}
            </Text>
          ))}
        </View>
      )}

      {alternatives.length > 0 && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            {alternatives.length === 1 ? "Another way" : "Other ways"}
          </Text>
          {alternatives.map((alt, i) => (
            <Text
              key={i}
              className="text-sm"
              style={{
                color: P.ink,
                fontFamily: "serif",
                fontStyle: "italic",
                marginTop: i === 0 ? 0 : 4,
              }}
            >
              {alt}
            </Text>
          ))}
        </View>
      )}

      {reveal.explanation && (
        <View
          className="rounded-xl border mt-3"
          style={{
            backgroundColor: P.bg,
            borderColor: P.border,
            padding: 12,
          }}
        >
          <Text className="text-xs mb-1" style={{ color: P.ink3 }}>
            Why it works
          </Text>
          <Text
            className="text-sm"
            style={{ color: P.ink2, lineHeight: 20 }}
          >
            {reveal.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

export function NaturalReveal({
  screen,
  onContinue,
}: {
  screen: NaturalRevealScreen;
  onContinue: () => void;
}) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: P.bg }}
      contentContainerStyle={{ padding: 20 }}
    >
      <NaturalRevealView reveal={screen.payload} />
      <Btn onPress={onContinue}>
        <Text style={{ color: P.paper, fontSize: 15 }}>Continue</Text>
      </Btn>
    </ScrollView>
  );
}
