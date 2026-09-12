import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { P, SPACE } from "@/constants/theme";

/**
 * The editorial vocabulary V4-B is built out of.
 *
 * ── WHAT THIS FILE IS FOR ───────────────────────────────────────────────────
 *
 * V4-B's stated purpose is to fix the "fazla kutulu" feeling — too many boxes.
 * It does that with two moves, repeated everywhere: a section is labelled by a
 * small tracked KICKER rather than a heading, and a block is separated by
 * HAIRLINES above and below rather than by being put in a card.
 *
 * Both were already in Cairn, hand-rolled. Measured before this file existed:
 * forty-nine kicker-shaped Texts across four different letter-spacings, and
 * seventy-five surfaces reaching for a paper background to mark a block. So
 * these are not new inventions; they are the name for something the product
 * was already doing inconsistently.
 *
 * Presentation only. Every one of these takes its text from the caller and
 * owns no state, no copy and no behaviour.
 */

/**
 * A section label: small, tracked, upper-case.
 *
 * `tone` is the whole of the design's colour logic for labels. `quiet` is the
 * ordinary case and recedes. `active` is the accent, and V4-B spends it on one
 * thing at a time — the block the learner is being offered right now. If two
 * active kickers are ever on screen together, one of them is wrong.
 *
 * 1.8 points is V4-B's 0.18em resolved at 10px. React Native's letterSpacing
 * is absolute, so the ratio has to be applied here rather than expressed.
 */
export function Kicker({
  text,
  tone = "quiet",
  align = "left",
  gap = "none",
}: {
  text: string;
  tone?: "quiet" | "active";
  align?: "left" | "right";
  /**
   * Room between the label and the thing it labels.
   *
   * Layout in a typography primitive needs a reason, and this is it: a kicker
   * is never the last thing in a block, and React Native has no margin
   * collapse, so every one of the nineteen sites this replaced was carrying
   * its own marginBottom. Naming the two sizes that were actually in use is
   * how they stop being nineteen independent numbers.
   */
  gap?: "none" | "xs" | "sm" | "md";
}) {
  return (
    <Text
      style={{
        marginBottom:
          gap === "md" ? SPACE.md : gap === "sm" ? SPACE.sm : gap === "xs" ? SPACE.xs : 0,
        color: tone === "active" ? P.accent : P.ink3,
        fontSize: 10,
        lineHeight: 14,
        letterSpacing: 1.8,
        textTransform: "uppercase",
        fontWeight: tone === "active" ? "600" : "500",
        textAlign: align,
      }}
    >
      {text}
    </Text>
  );
}

/**
 * The line opposite a kicker: a quiet fact about the block it labels.
 *
 * Baseline-aligned with the kicker rather than centred, because the two are
 * read as one line and a centred pair drifts apart as soon as the meta is a
 * different size.
 */
export function KickerRow({
  kicker,
  meta,
  tone = "quiet",
}: {
  kicker: string;
  meta?: string;
  tone?: "quiet" | "active";
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: SPACE.md,
      }}
    >
      <Kicker text={kicker} tone={tone} />
      {meta !== undefined && (
        <Text style={{ color: P.ink3, fontSize: 11, lineHeight: 14 }}>
          {meta}
        </Text>
      )}
    </View>
  );
}

/**
 * A block set apart by hairlines rather than by a card.
 *
 * This is the single most characteristic thing about V4-B, and the reason it
 * reads as calmer than what Cairn shipped before: the block keeps the page's
 * own background and is bounded by one rule above and one below. Nothing is
 * raised, nothing is tinted, nothing is rounded, and there is no border down
 * the sides. The content is what you see; the container is almost not there.
 *
 * NO HORIZONTAL PADDING, deliberately. In the design the rules run edge to
 * edge, which only works on a page that does not inset its own content. Cairn's
 * pages currently do inset (the Journey scrolls at px-5), so a block that
 * padded again would sit its rules two gutters in from the edge and look like a
 * narrower card. Leaving the horizontal to the page means this reads correctly
 * in both, and a page that later goes full-bleed gets the design's version for
 * free.
 *
 * `edge` exists because consecutive anchor blocks would otherwise draw two
 * rules where the design draws one: a run of them should be `top` for each and
 * `both` for the last.
 */
export function AnchorBlock({
  children,
  edge = "both",
}: {
  children: ReactNode;
  edge?: "both" | "top" | "bottom" | "none";
}) {
  const top = edge === "both" || edge === "top";
  const bottom = edge === "both" || edge === "bottom";
  return (
    <View
      style={{
        paddingTop: SPACE.lg,
        paddingBottom: SPACE.lg,
        borderTopWidth: top ? 1 : 0,
        borderTopColor: P.border,
        borderBottomWidth: bottom ? 1 : 0,
        borderBottomColor: P.border,
      }}
    >
      {children}
    </View>
  );
}
