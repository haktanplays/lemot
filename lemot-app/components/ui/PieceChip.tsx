import { View, Text } from "react-native";
import { P, RADIUS, frenchSerif } from "@/constants/theme";

/**
 * PieceChip — one piece of French, in the one visual language Cairn uses for
 * pieces.
 *
 * Visual only: it renders a piece the caller already decided to show, and it
 * changes no interaction. Pieces are NOT tappable here, NOT answer choices, and
 * NOT draggable — they are small pieces of French the learner may lean on, and
 * subordinate to the learner's own input.
 *
 * ── WHY IT IS PINK NOW ──────────────────────────────────────────────────────
 *
 * It used to be white paper with a grey hairline, which made it the odd one
 * out: MeetCard's highlights, the Showcase's breakdown chips and FillWithTraps
 * all draw a piece as pale pink with a rose border, and the learner meets those
 * first. The founder read the recap's white pills as filters or tags rather
 * than as the same objects the lesson had been handing them all along, and they
 * were right to — two treatments for one concept is two concepts, whatever the
 * code calls them. The same canonical piece should look recognisably like the
 * same object wherever it appears.
 *
 * ── GEOMETRY ────────────────────────────────────────────────────────────────
 *
 * Width follows content — "merci" has no business being as wide as "s'il vous
 * plaît" — capped at the row so a long chunk wraps instead of pushing past its
 * container. Padding is tight (10/3) because a piece is a word or two and a
 * generous pill around two syllables reads as a button. The label, when there
 * is one, is capped at one line: a label that cannot be said in a few words is
 * doing too much work, and the fix is a shorter label, not a taller pill.
 */
export function PieceChip({ text, label }: { text: string; label?: string }) {
  return (
    <View
      style={{
        backgroundColor: P.rl,
        borderWidth: 1,
        borderColor: P.rb,
        borderRadius: RADIUS.pill,
        // Tight. The old SPACE.md/SPACE.sm box was half again as wide as the
        // French inside it, which is what turned a row of short pieces into a
        // row of balloons.
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignSelf: "flex-start",
        // Width follows content, and never more than the row. Without the cap a
        // long chunk pushes the pill past its container instead of wrapping.
        maxWidth: "100%",
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
          style={{ color: P.ink3, fontSize: 11, lineHeight: 15, marginTop: 1 }}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </View>
  );
}
