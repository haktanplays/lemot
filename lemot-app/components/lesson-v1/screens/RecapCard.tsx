import { View, Text, Pressable } from "react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { PieceChip } from "@/components/ui/PieceChip";
import { P, SPACE } from "@/constants/theme";
import type { RecapScreen } from "@/content/lessonTypes";
import { Kicker } from "@/components/ui/editorial";


export function RecapCard({
  screen,
  onContinue,
  linkablePieces,
  onOpenPiece,
  usedPieces,
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
  /**
   * The French this learner actually produced or chose in this sitting,
   * derived from the session's own events at the wiring layer.
   *
   * `undefined` means the derivation was not available, not that nothing was
   * used, so the screen falls back to the lesson's authored list under a
   * heading that claims nothing about the learner. Present and non-empty is
   * the only case that may say "you used".
   *
   * Display strings, like `linkablePieces`: the screen still cannot ask what
   * the learner owns, and still emits nothing.
   */
  usedPieces?: readonly string[];
}) {
  const { payload } = screen;
  // A learner who landed nothing gets the lesson's own inventory rather than an
  // empty row — and, crucially, gets the heading that goes with it.
  const derived = usedPieces !== undefined && usedPieces.length > 0;
  const pieces = derived ? (usedPieces as readonly string[]) : (payload.piecesUsed ?? []);
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
      <Kicker text="A small recap" gap="sm" />

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
          {/* THE HEADING FOLLOWS THE LIST, and never the other way round.
              "Pieces you used" is a claim about the learner, so it may only
              appear over pieces derived from what the learner actually did.
              When the derivation is unavailable, or when they landed nothing,
              the screen shows the lesson's authored inventory and says so. An
              earlier version of this screen said "you used" over the authored
              list unconditionally, which is the drift this split closes. */}
          <Text
            style={{ color: P.ink3, fontSize: 12, marginBottom: SPACE.md }}
          >
            {derived ? "Pieces you used" : "The pieces in this one"}
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
