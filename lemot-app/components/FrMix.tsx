import { Text } from "react-native";
import { P } from "@/constants/theme";

interface FrMixProps {
  text: string;
}

/**
 * Highlights French words wrapped in *asterisks* within instructional text.
 * e.g., "The word *bonjour* means hello" → "bonjour" is styled in red italic.
 */
export function FrMix({ text }: FrMixProps) {
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <Text className="text-sm text-lm-ink2 leading-6">
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <Text
            key={i}
            style={{
              fontFamily: "serif",
              fontStyle: "italic",
              color: P.red,
              fontWeight: "600",
            }}
          >
            {p.slice(1, -1)}
          </Text>
        ) : (
          <Text key={i}>{p}</Text>
        )
      )}
    </Text>
  );
}
