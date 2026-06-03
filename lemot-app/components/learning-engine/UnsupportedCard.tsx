import { View, Text, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";

/**
 * Learner-safe placeholder for exercise kinds not yet rendered (P3.3).
 *
 * build / register_switch / context_chain are not implemented until later P3
 * PRs. This card shows a calm placeholder and NEVER names the operation, ids,
 * or any engine internals.
 */
export function UnsupportedCard() {
  return (
    <View style={card}>
      <Text style={text}>Another kind of card will appear here soon.</Text>
    </View>
  );
}

const card: ViewStyle = {
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  padding: 20,
};
const text: TextStyle = {
  color: P.ink2,
  fontSize: 16,
  lineHeight: 24,
  fontFamily: "Newsreader",
};
