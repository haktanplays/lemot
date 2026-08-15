import { View, Text } from "react-native";
import { P, RADIUS, SPACE } from "@/constants/theme";

/**
 * SceneCard - the moment the learner has stepped into (UI Slice 4).
 *
 * Presentation only: it renders a situation string the caller already decided
 * to show. No parsing, no payload knowledge, no interaction, no state.
 *
 * It is deliberately NOT a bordered card. A full card would out-weigh the
 * expression target that follows it, and the scene must stay subordinate to
 * "what do I want to say?". The left accent borrows the FeedbackBand language
 * established in Slice 3, so the expressive half of the lesson reads as one
 * family: a quiet warm surface that marks the text as staged, not as chrome.
 *
 * Editorial serif italic, not UI sans: the scene is something you read, not an
 * instruction you execute. It must never look like exam instructions, a chat
 * message, or a warning box.
 *
 * No fixed height and no inner scroll: L23's scene runs past 350 characters and
 * has to grow inside the frame's own ScrollView rather than trap a nested one.
 */
export function SceneCard({ kicker, text }: { kicker?: string; text: string }) {
  return (
    <View
      style={{
        backgroundColor: P.paper,
        borderLeftWidth: 2,
        borderLeftColor: P.border,
        borderTopRightRadius: RADIUS.inner,
        borderBottomRightRadius: RADIUS.inner,
        paddingHorizontal: SPACE.md,
        paddingVertical: SPACE.md,
      }}
    >
      {kicker && (
        <Text
          style={{
            color: P.ink3,
            fontSize: 12,
            letterSpacing: 0.4,
            marginBottom: SPACE.xs,
          }}
        >
          {kicker}
        </Text>
      )}
      <Text
        style={{
          color: P.ink2,
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: 15,
          lineHeight: 24,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
