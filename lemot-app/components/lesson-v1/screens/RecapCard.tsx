import { View, Text, Pressable } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { P, SPACE } from "@/constants/theme";
import type { RecapScreen } from "@/content/lessonTypes";


export function RecapCard({
  screen,
  onContinue,
  linkablePieces,
  onOpenPiece,
}: {
  screen: RecapScreen;
  onContinue: () => void;
  /**
   * The chips that are tappable, as the display strings this screen already
   * shows. PRESENTATIONAL ONLY, and deliberately so: an earlier version took
   * the learner's reached item ids and resolved them here, which handed a
   * screen that emits nothing a private view of Mon Lexique state. The wiring
   * guard was right to refuse it. Whether a piece is kept is a question about
   * the learner; this screen only needs to know which chips to draw as links.
   */
  linkablePieces?: readonly string[];
  onOpenPiece?: (piece: string) => void;
}) {
  const { payload } = screen;
  const pieces = payload.piecesUsed ?? [];
  const buttonLabel = payload.nextLabel ?? "Continue";

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label={buttonLabel} onPress={onContinue} />}
    >
      {/* A calm mirror of what passed through the learner's hands. No box, no
          tally, no checklist: a kicker, an editorial title, quiet lines, and
          the pieces themselves laid out with room to breathe. The chips are the
          same PieceChip the lesson used to hand them out, so seeing them again
          reads as recognition rather than as a score. */}
      <Text
        style={{
          color: P.ink3,
          fontSize: 12,
          letterSpacing: 0.4,
          marginBottom: SPACE.sm,
        }}
      >
        A small recap
      </Text>

      {payload.title && (
        <Text
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontSize: 21,
            lineHeight: 29,
            marginBottom: SPACE.lg,
          }}
        >
          {payload.title}
        </Text>
      )}

      {payload.lines.map((line, i) => (
        <Text
          key={i}
          style={{
            color: P.ink2,
            fontSize: 15,
            lineHeight: 23,
            marginTop: i === 0 ? 0 : SPACE.sm,
          }}
        >
          {line}
        </Text>
      ))}

      {pieces.length > 0 && (
        <View style={{ marginTop: SPACE.xxl }}>
          <View
            style={{
              height: 1,
              backgroundColor: P.border,
              marginBottom: SPACE.lg,
            }}
          />
          {/* RENAMED, because the old heading made a claim this screen cannot
              check. `piecesUsed` is authored per lesson: it is what the LESSON
              worked, not what the learner produced, and the recap deliberately
              receives no learner state (the wiring guard forbids it, for good
              reasons). So a learner who skipped past a screen was still told
              they had used its piece. The list is unchanged and still true;
              only the sentence over it is, now, also true. */}
          <Text
            style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.md }}
          >
            The pieces in this one
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}
          >
            {/* The bridge the founder asked for, and the restraint it needs.
                A chip opens its Mon Lexique entry only when the string is a
                real registry piece AND the learner has reached it. Everything
                else stays exactly the chip it was: no affordance, no dead tap,
                and no invented entry to make the row look uniform. */}
            {pieces.map((p, i) => {
              const linkable = Boolean(onOpenPiece) && (linkablePieces ?? []).includes(p);
              if (!linkable) return <PieceChip key={`${p}-${i}`} text={p} />;
              return (
                <Pressable
                  key={`${p}-${i}`}
                  onPress={() => onOpenPiece?.(p)}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${p} in Mon Lexique`}
                >
                  <PieceChip text={p} label="kept" />
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

    </LessonScreenFrame>
  );
}
