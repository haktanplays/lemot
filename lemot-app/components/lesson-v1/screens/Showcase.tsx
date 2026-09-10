import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2, Plus, Minus } from "lucide-react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { pieceItemId, pieceLabel, showcasePieces } from "@/content/lessons/showcasePieces";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import type { ShowcaseScreen, ShowcaseSentence, ShowcaseDepth } from "@/content/lessonTypes";

/**
 * The lesson's opening language world.
 *
 * This is a BREADTH surface, and deliberately the only lesson screen that
 * reports nothing. It grades nothing, it has no correct answer, and it emits no
 * evidence: reading a list is not learning, and crediting it would hand the
 * mastery layer — and later Practice Hub — a learner who looks competent purely
 * for having scrolled. Everything the lesson actually claims is claimed by the
 * screens after this one.
 *
 * Sentence first, pieces always visible, depth on demand. The piece line is not
 * behind a tap because it carries the central claim of the product: the
 * sentence is not a line to memorise, it is pieces the learner already owns and
 * can swap. Hiding that would leave a gallery of sentences.
 *
 * The authoring roles (core / supported / exposure) are NOT rendered. They are
 * how the content decides what the lesson must go on to teach; showing the
 * learner a taxonomy would turn a calm first page into a syllabus.
 */
export function Showcase({
  screen,
  onContinue,
}: {
  screen: ShowcaseScreen;
  onContinue: () => void;
}) {
  const { say } = useSpeech();
  const { intro, clusters } = screen.payload;

  return (
    <LessonScreenFrame
      footer={<PrimaryAction label="Continue" onPress={onContinue} />}
    >
      <Text
        style={{ color: P.ink2, fontSize: 15, lineHeight: 23, marginBottom: SPACE.lg }}
      >
        {intro}
      </Text>

      {clusters.map((cluster, ci) => (
        <View key={cluster.label} style={{ marginTop: ci === 0 ? 0 : SPACE.lg }}>
          <Text
            style={{ color: P.ink3, fontSize: 12, lineHeight: 17, letterSpacing: 0.3, marginBottom: SPACE.sm }}
          >
            {cluster.label}
          </Text>

          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: P.border,
              backgroundColor: P.paper,
              overflow: "hidden",
            }}
          >
            {cluster.sentences.map((sentence, si) => (
              <Line
                key={sentence.fr}
                sentence={sentence}
                first={si === 0}
                onSay={() => say(sentence.fr)}
                onSayPiece={(text) => say(text)}
              />
            ))}
          </View>
        </View>
      ))}
    </LessonScreenFrame>
  );
}

function Line({
  sentence,
  first,
  onSay,
  onSayPiece,
}: {
  sentence: ShowcaseSentence;
  first: boolean;
  onSay: () => void;
  onSayPiece: (text: string) => void;
}) {
  const [open, setOpen] = useState(false);
  // Which chip the learner tapped, if any. One at a time: the reveal is a small
  // answer to "what is this piece", not a panel that accumulates.
  const [openPiece, setOpenPiece] = useState<number | null>(null);
  // Authored pieces win, but they are rarely authored: deriving from the
  // canonical registry is what keeps the breakdown honest as items change.
  // Either way the chip keeps the item id where there is one, because that is
  // what it has to say when the learner taps it.
  const pieces: { text: string; itemId?: string }[] = sentence.pieces
    ? sentence.pieces.map((text) => ({ text, itemId: pieceItemId(text) }))
    : showcasePieces(sentence.fr);
  const depth = sentence.depth;
  const hasDepth = depth !== undefined && Object.values(depth).some(Boolean);

  return (
    <View
      style={{
        paddingHorizontal: SPACE.md,
        paddingVertical: SPACE.sm + 2,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: P.border,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: SPACE.sm }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 17, lineHeight: 25 }}>
            {sentence.fr}
          </Text>
          <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 19, marginTop: 2 }}>
            {sentence.en}
          </Text>

          {/* The chips look tappable because they are round, raised and sized
              like buttons. Until now they were not, which is an affordance
              writing a cheque the screen does not honour: a learner taps the
              piece they do not recognise and nothing happens. Tapping now
              answers the small question the chip raises -- what is this piece,
              and what does it sound like -- and nothing bigger. Look Closer
              still owns the sentence; this owns the piece. */}
          {pieces.length >= 2 && (
            <View style={{ marginTop: SPACE.sm }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                {pieces.map((piece, i) => {
                  const active = openPiece === i;
                  return (
                    <Pressable
                      key={`${piece.text}-${i}`}
                      onPress={() => setOpenPiece(active ? null : i)}
                      accessibilityRole="button"
                      accessibilityState={{ expanded: active }}
                      accessibilityLabel={`What is ${pieceLabel(piece.text)}`}
                      hitSlop={4}
                      style={{
                        backgroundColor: active ? P.rb : P.rl,
                        borderWidth: 1,
                        borderColor: P.rb,
                        borderRadius: 9999,
                        paddingHorizontal: 9,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{ fontSize: 12, lineHeight: frenchLineHeight(12), color: P.ink2 }}
                      >
                        {pieceLabel(piece.text)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {openPiece !== null && pieces[openPiece] !== undefined && (
                <PieceReveal piece={pieces[openPiece]} onSay={onSayPiece} />
              )}
            </View>
          )}
        </View>

        <Pressable
          onPress={onSay}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Listen to ${sentence.fr}`}
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: P.bg,
            borderWidth: 1,
            borderColor: P.border,
            marginTop: 2,
          }}
        >
          <Volume2 size={16} color={P.ink2} />
        </Pressable>
      </View>

      {hasDepth && (
        <Pressable
          onPress={() => setOpen((v) => !v)}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityState={{ expanded: open }}
          accessibilityLabel={open ? `Hide detail for ${sentence.fr}` : `Look closer at ${sentence.fr}`}
          style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: SPACE.sm }}
        >
          {open ? <Minus size={12} color={P.ink3} /> : <Plus size={12} color={P.ink3} />}
          <Text style={{ fontSize: 12, lineHeight: 17, color: P.ink3 }}>
            {open ? "Close" : "Look closer"}
          </Text>
        </Pressable>
      )}

      {hasDepth && open && <Depth depth={depth as ShowcaseDepth} />}
    </View>
  );
}

/**
 * What one piece is, and nothing more.
 *
 * The founder's line: chunk tap is "understand this piece", Look Closer is
 * "understand this sentence". So this stays small on purpose -- the English,
 * a way to hear it alone, and one example if the registry has one. No grammar
 * dump, no modal, and no navigation away from the lesson.
 *
 * A piece the registry does not model (the deliberate fillers: soif, madame,
 * croissant) still answers the other half of the question, because hearing a
 * fragment on its own is exactly what a learner taps a chip for.
 */
function PieceReveal({
  piece,
  onSay,
}: {
  piece: { text: string; itemId?: string };
  onSay: (text: string) => void;
}) {
  const item = piece.itemId
    ? (ITEM_REGISTRY as Record<string, { en?: string; exampleFr?: string; exampleEn?: string }>)[
        piece.itemId
      ]
    : undefined;
  return (
    <View
      style={{
        marginTop: SPACE.sm,
        backgroundColor: P.bg,
        borderRadius: 8,
        paddingHorizontal: SPACE.sm,
        paddingVertical: SPACE.sm - 2,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: SPACE.sm }}>
        <Text
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontSize: 14,
            lineHeight: frenchLineHeight(14),
          }}
        >
          {pieceLabel(piece.text)}
        </Text>
        <Pressable
          onPress={() => onSay(piece.text)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Listen to ${pieceLabel(piece.text)}`}
        >
          <Volume2 size={14} color={P.ink3} />
        </Pressable>
      </View>
      {Boolean(item?.en) && (
        <Text style={{ color: P.ink2, fontSize: 13, lineHeight: 20, marginTop: 1 }}>
          {item?.en}
        </Text>
      )}
      {Boolean(item?.exampleFr) && (
        <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 19, marginTop: SPACE.sm - 4 }}>
          {item?.exampleFr}
          {item?.exampleEn ? `  ${item.exampleEn}` : ""}
        </Text>
      )}
    </View>
  );
}

/**
 * Look Closer, in three weights rather than one.
 *
 * Every category used to render as an identical paragraph, so a card with six
 * of them was a wall the learner had to read in order to find out whether any
 * of it mattered. The point of depth is that the important part lands in
 * seconds.
 *
 *   short points   Sound, Cognate, Notice, Structure, Usage. One line each.
 *   Compare        set in its own inset, because a contrast the learner has to
 *                  find inside a paragraph is not a contrast.
 *   In depth       collapsed. It is the long one, it is optional by design, and
 *                  open by default it swamped everything above it.
 *
 * Absent categories render nothing, which is the normal case: most lines carry
 * one or two.
 */
function Depth({ depth }: { depth: ShowcaseDepth }) {
  const [deepOpen, setDeepOpen] = useState(false);
  const shortPoints: [string, string | undefined][] = [
    ["Sound", depth.sound],
    ["Cognate", depth.cognate],
    ["Notice", depth.notice],
    ["Structure", depth.structure],
    ["Usage", depth.usage],
  ];
  return (
    <View
      style={{
        marginTop: SPACE.sm,
        paddingLeft: SPACE.sm + 2,
        borderLeftWidth: 2,
        borderLeftColor: P.border,
        gap: SPACE.sm,
      }}
    >
      {shortPoints
        .filter(([, body]) => Boolean(body))
        .map(([label, body]) => (
          <View key={label}>
            <Text style={{ fontSize: 11, lineHeight: 16, color: P.ink3, letterSpacing: 0.3 }}>{label}</Text>
            <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20, marginTop: 1 }}>
              {body}
            </Text>
          </View>
        ))}

      {Boolean(depth.compare) && (
        <View
          style={{
            backgroundColor: P.bg,
            borderRadius: 8,
            paddingHorizontal: SPACE.sm,
            paddingVertical: SPACE.sm - 2,
          }}
        >
          <Text style={{ fontSize: 11, lineHeight: 16, color: P.ink3, letterSpacing: 0.3 }}>
            Compare
          </Text>
          <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20, marginTop: 1 }}>
            {depth.compare}
          </Text>
        </View>
      )}

      {Boolean(depth.inDepth) && (
        <View>
          <Pressable
            onPress={() => setDeepOpen((v) => !v)}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityState={{ expanded: deepOpen }}
            accessibilityLabel={deepOpen ? "Hide the longer explanation" : "Read the longer explanation"}
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          >
            {deepOpen ? <Minus size={11} color={P.ink3} /> : <Plus size={11} color={P.ink3} />}
            <Text style={{ fontSize: 11, lineHeight: 16, color: P.ink3, letterSpacing: 0.3 }}>
              In depth
            </Text>
          </Pressable>
          {deepOpen && (
            <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20, marginTop: SPACE.sm - 2 }}>
              {depth.inDepth}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
