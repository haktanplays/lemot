import { View, Text } from "react-native";
import { P, frenchSerif } from "@/constants/theme";
import type { AnswerRevealPayload } from "@/content/lessonTypes";

type Variant = "neutral" | "correct" | "incorrect";

const VARIANT_STYLES: Record<
  Variant,
  { bg: string; border: string; accent: string }
> = {
  neutral: { bg: P.paper, border: P.border, accent: P.ink2 },
  correct: { bg: P.gl, border: P.green, accent: P.green },
  incorrect: { bg: P.rl, border: P.red, accent: P.red },
};

export function AnswerReveal({
  reveal,
  variant = "neutral",
}: {
  reveal: AnswerRevealPayload;
  variant?: Variant;
}) {
  const styles = VARIANT_STYLES[variant];

  return (
    <View
      className="rounded-xl border mt-3"
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
        padding: 14,
      }}
    >
      <Text className="text-sm" style={{ color: styles.accent }}>
        {reveal.short}
      </Text>
      {reveal.explanation && (
        <Text className="text-sm mt-2" style={{ color: P.ink }}>
          {reveal.explanation}
        </Text>
      )}
      {reveal.natural && (
        <Text
          className="mt-2"
          // Italic at 14px with NO line height at all: it inherited a default
          // sized for unaccented Latin, which is the exact shape of the defect
          // the founder keeps seeing on J.
          style={{ color: P.ink2, ...frenchSerif(14) }}
        >
          {reveal.natural}
        </Text>
      )}
    </View>
  );
}
