import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2, Plus, Minus } from "lucide-react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import {
  pieceItemId,
  pieceLabel,
  showcasePieces,
  wholeSentencePiece,
} from "@/content/lessons/showcasePieces";
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
            {cluster.sentences.map((sentence, si) => {
              // Where the lesson's own material ends and the breadth begins.
              // Authored `exposure` lines are a trailing block in every cluster
              // in the shipped curriculum (a guard proves it), so this is one
              // boundary per cluster rather than a badge per line.
              const opensExposure =
                sentence.role === "exposure" &&
                (si === 0 || cluster.sentences[si - 1]?.role !== "exposure");
              return (
                <View key={sentence.fr}>
                  {opensExposure && <ExposureBoundary first={si === 0} />}
                  <Line
                    sentence={sentence}
                    // The boundary already drew the rule, so the line under it
                    // is first in its own block. Without this the caption gets
                    // a second hairline immediately beneath it.
                    first={si === 0 || opensExposure}
                    onSay={() => say(sentence.fr)}
                    onSayPiece={(text) => say(text)}
                  />
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </LessonScreenFrame>
  );
}

/**
 * The line between what this lesson gives you and what it only shows you.
 *
 * WHAT `exposure` ACTUALLY MEANS, measured rather than assumed. It is the
 * showcase's demand ceiling — "may be seen and heard, may NEVER be a required
 * graded answer" — and 69 lines across L1-L10 carry it. It is NOT "taught in a
 * later lesson": twenty-odd of those sentences contain canonical items no
 * lesson ever declares, and several core lines DO contain later items. So the
 * label promises nothing about arrival, because for most of these nothing is
 * arriving. It says the one thing that is true of all sixty-nine.
 *
 * Restrained on purpose. Not a badge, not a lock, not disabled-grey, not a
 * reward: the learner reads these lines exactly as before, and now knows why
 * they are not being asked to hold on to them.
 */
function ExposureBoundary({ first }: { first: boolean }) {
  return (
    <View
      style={{
        paddingHorizontal: SPACE.md,
        paddingTop: first ? SPACE.sm + 2 : SPACE.md,
        paddingBottom: SPACE.xs,
        borderTopWidth: first ? 0 : 1,
        borderTopColor: P.border,
      }}
    >
      <Text
        style={{ color: P.ink3, fontSize: 11, lineHeight: 16, letterSpacing: 0.4 }}
      >
        Worth noticing
      </Text>
      <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 18, marginTop: 1 }}>
        Nothing here is asked of you. Read them and move on.
      </Text>
    </View>
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
  // A LINE THAT IS ITSELF ONE PIECE.
  //
  // "Bonjour.", "Merci.", "Au revoir." have no breakdown, so the chip row below
  // is correctly empty for them — and the consequence, on a surface whose whole
  // purpose is to show reusable material, was that the three expressions a
  // beginner most needs to recognise as PIECES were the only three rendered as
  // flat text. Repeating the line as a lone chip underneath would be noise, so
  // the line itself takes the piece treatment instead: same pale pink, same
  // tap, same reveal, one object rather than two.
  const whole = pieces.length < 2 ? wholeSentencePiece(sentence.fr) : undefined;
  const tappable: { text: string; itemId?: string }[] = whole ? [whole] : pieces;
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
          {whole ? (
            <Pressable
              onPress={() => setOpenPiece(openPiece === 0 ? null : 0)}
              accessibilityRole="button"
              accessibilityState={{ expanded: openPiece === 0 }}
              accessibilityLabel={`What is ${pieceLabel(whole.text)}`}
              hitSlop={4}
              style={{
                alignSelf: "flex-start",
                backgroundColor: openPiece === 0 ? P.rb : P.rl,
                borderWidth: 1,
                borderColor: P.rb,
                borderRadius: 9999,
                paddingHorizontal: 12,
                paddingVertical: 3,
              }}
            >
              <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 17, lineHeight: 25 }}>
                {sentence.fr}
              </Text>
            </Pressable>
          ) : (
            <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 17, lineHeight: 25 }}>
              {sentence.fr}
            </Text>
          )}
          <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 19, marginTop: 2 }}>
            {sentence.en}
          </Text>

          {/* The other half of the exposure system, closing. A line the learner
              was shown earlier and told nothing was being asked of them now
              says so, once, quietly. The claim is checked against canon by
              `reviewShowcaseProvenance`; nothing here can invent a memory. */}
          {sentence.seenBefore ? (
            // Upright, not italic. Italic is how Cairn marks French, and this
            // line is English support prose about French; setting it in italic
            // made the typography guard read it as a French surface, which was
            // the guard being right about what italic means here.
            <Text
              style={{ color: P.ink3, fontSize: 12, lineHeight: 18, marginTop: 4 }}
            >
              {sentence.seenBefore}
            </Text>
          ) : null}

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
              {openPiece !== null && tappable[openPiece] !== undefined && (
                <PieceReveal piece={tappable[openPiece]} onSay={onSayPiece} />
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
    /*
      SPACING IS THE HIERARCHY HERE.

      The founder likes this content and did not want it cut; what he read as a
      documentation wall was the geometry. Every category was one gap apart from
      the next, and each label sat one pixel above its own body, so six entries
      arrived as a single block of small grey text with bold-ish words in it. A
      reader could not tell where one point ended and the next began.

      Two changes, no new system. The gap BETWEEN points is now larger than the
      gap INSIDE one, which is the whole of what makes a list read as a list.
      And the deeper layer gets a rule above it, so "In depth" is visibly a
      different tier rather than a sixth paragraph.
    */
    <View
      style={{
        marginTop: SPACE.sm,
        paddingLeft: SPACE.sm + 2,
        borderLeftWidth: 2,
        borderLeftColor: P.border,
        gap: SPACE.md,
      }}
    >
      {shortPoints
        .filter(([, body]) => Boolean(body))
        .map(([label, body]) => (
          <View key={label}>
            <Text
              style={{
                fontSize: 11,
                lineHeight: 16,
                color: P.ink3,
                letterSpacing: 0.3,
                marginBottom: 3,
              }}
            >
              {label}
            </Text>
            <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20 }}>
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
          <Text
            style={{
              fontSize: 11,
              lineHeight: 16,
              color: P.ink3,
              letterSpacing: 0.3,
              marginBottom: 3,
            }}
          >
            Compare
          </Text>
          <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20 }}>
            {depth.compare}
          </Text>
        </View>
      )}

      {Boolean(depth.inDepth) && (
        <View style={{ borderTopWidth: 1, borderTopColor: P.border, paddingTop: SPACE.md }}>
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
            <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20, marginTop: SPACE.sm }}>
              {depth.inDepth}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
