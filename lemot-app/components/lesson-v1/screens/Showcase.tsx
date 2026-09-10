import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Volume2, Plus, Minus } from "lucide-react-native";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction } from "@/components/ui/actions";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { pieceLabel, showcasePieces } from "@/content/lessons/showcasePieces";
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
}: {
  sentence: ShowcaseSentence;
  first: boolean;
  onSay: () => void;
}) {
  const [open, setOpen] = useState(false);
  // Authored pieces win, but they are rarely authored: deriving from the
  // canonical registry is what keeps the breakdown honest as items change.
  const pieces = sentence.pieces ?? showcasePieces(sentence.fr).map((p) => p.text);
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

          {pieces.length >= 2 && (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: SPACE.sm }}
            >
              {pieces.map((piece, i) => (
                <View
                  key={`${piece}-${i}`}
                  style={{
                    backgroundColor: P.rl,
                    borderWidth: 1,
                    borderColor: P.rb,
                    borderRadius: 9999,
                    paddingHorizontal: 9,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 12, lineHeight: frenchLineHeight(12), color: P.ink2 }}>
                    {pieceLabel(piece)}
                  </Text>
                </View>
              ))}
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

/** Only the cards this sentence actually has. Absent categories render nothing. */
function Depth({ depth }: { depth: ShowcaseDepth }) {
  const cards: [string, string | undefined][] = [
    ["Sound", depth.sound],
    ["Notice", depth.notice],
    ["Structure", depth.structure],
    ["Usage", depth.usage],
    ["Compare", depth.compare],
    ["In depth", depth.inDepth],
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
      {cards
        .filter(([, body]) => Boolean(body))
        .map(([label, body]) => (
          <View key={label}>
            <Text style={{ fontSize: 11, lineHeight: 16, color: P.ink3, letterSpacing: 0.3 }}>{label}</Text>
            <Text style={{ fontSize: 13, color: P.ink2, lineHeight: 20, marginTop: 1 }}>
              {body}
            </Text>
          </View>
        ))}
    </View>
  );
}
