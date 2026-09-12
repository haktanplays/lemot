import { View, Text } from "react-native";
import { P, RADIUS, SPACE, frenchSerif } from "@/constants/theme";

/**
 * PieceChip - a single French support piece within reach (UI Slice 3).
 *
 * Visual only: it renders a piece the caller already decided to show, and it
 * changes no interaction. Pieces are NOT tappable, NOT answer choices, and NOT
 * draggable — they are small pieces of French the learner may lean on. The warm
 * paper surface with a hairline and serif French keeps them tactile and calm,
 * deliberately unlike a quiz option or a reward token, and subordinate to the
 * learner's own input.
 *
 * GEOMETRY. A chip is ONE line of French and, when it has one, ONE line of
 * label. Width follows content — "merci" has no business being as wide as
 * "s'il vous plaît" — but height does not, because a pill that grows downward
 * breaks the row it sits in and the tray stops reading as a set of pieces.
 * Both texts are therefore capped at a single line: long labels are the thing
 * that actually wrapped ("there (the place you named)" is 26 characters at
 * 11px), not the French, whose longest chip is "je ne comprends pas".
 *
 * A capped label that ellipsises is a signal to shorten the LABEL, not to let
 * the pill reflow. Labels are a hint about a piece's job; if one cannot be said
 * in a few words it is doing too much work.
 */
export function PieceChip({ text, label }: { text: string; label?: string }) {
  return (
    <View
      style={{
        backgroundColor: P.paper,
        borderWidth: 1,
        borderColor: P.border,
        borderRadius: RADIUS.pill,
        paddingHorizontal: SPACE.md,
        paddingVertical: SPACE.sm,
        alignSelf: "flex-start",
        // Width follows content, and never more than the row. Without the cap a
        // long chunk pushes the pill past its container instead of wrapping,
        // which is how a piece becomes a balloon.
        maxWidth: "100%",
        // Never taller than its content needs, and never shorter: with both
        // texts capped at one line this is deterministic, so every chip in a
        // tray lands on the same baseline.
        flexShrink: 0,
      }}
    >
      {/* FRENCH IS NEVER TRUNCATED.
          It used to carry numberOfLines={1} like the label below it, and for a
          French chunk that is not a cosmetic degradation: cut "je suis" and the
          chip shows "je", which is a DIFFERENT piece the learner also owns. A
          chip that can silently display the wrong chunk is teaching the wrong
          boundary, and the founder read exactly that off a recap.

          So it wraps instead. The chip grows downward in the rare case that
          needs it, which costs a row of alignment and keeps the piece true. */}
      <Text style={{ color: P.ink, ...frenchSerif(14) }}>{text}</Text>
      {label && (
        <Text
          style={{ color: P.ink3, fontSize: 11, lineHeight: 16, marginTop: 1 }}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </View>
  );
}
