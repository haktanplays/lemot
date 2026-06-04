import { useRef, useState } from "react";
import { View, Text, Pressable, type ViewStyle, type TextStyle } from "react-native";
import { P } from "@/constants/theme";
import type { ExerciseBlueprint, RawItem } from "@/content/learning-engine";

/**
 * Learner-facing "A form for later" card (P3.8) — the soft boundary preview.
 *
 * Some lessons SHOW a form the learner is not yet asked to produce (e.g. the L12
 * inversion / «qu'est-ce que» hooks). The engine models these as ordinary
 * `recognition` exercises whose targets are recognition-only + blocked from
 * production — the validator already guarantees they are never production
 * targets. This card renders that boundary as a calm preview, NOT a failure and
 * NOT a normal graded card.
 *
 * Hard learner-UI boundary (per docs/status/boundary-recognition-ui-decision.md):
 * it shows ONLY a fixed, reassuring scaffold plus the French form itself, resolved
 * from the item registry (`items[id].text.fr`). It deliberately does NOT echo the
 * fixture's raw `prompt` / `displayAnswer` or the item's `text.en`, because those
 * strings carry lesson ids ("L12") and grammar jargon ("inversion") — a leak the
 * decision forbids. A clean meaning gloss would need a future, safe presentation
 * field, so the gloss is intentionally omitted for now (recognize-only is enough).
 *
 * The card does NOT call `grade()`, NEVER asks the learner to produce the form,
 * and does NOT import `LocalRepository` or mastery. If the learner taps the calm
 * acknowledge, it fires the SAME recognition-reveal path as RecognitionCard,
 * exactly once — no new event shape, no new operation, nothing on mere render.
 *
 * The `recognition`-vs-boundary decision lives in the pure, unit-testable
 * `isBoundaryLaterForm` (content/learning-engine/boundary.ts); the shell calls it
 * to choose this card over RecognitionCard.
 */
type RecognitionEx = Extract<ExerciseBlueprint, { operation: "recognition" }>;

export function BoundaryLaterFormCard({
  exercise,
  items,
  onAcknowledge,
}: {
  exercise: RecognitionEx;
  items: Record<string, RawItem>;
  /** Called once, when the learner acknowledges (reuses the recognition-reveal path). */
  onAcknowledge?: () => void;
}) {
  const [acknowledged, setAcknowledged] = useState(false);
  // Acknowledge records at most once for the card's lifetime.
  const hasAcknowledged = useRef(false);

  // Learner-safe French form(s); never leak a raw item id into the UI.
  const forms = exercise.targetItemIds
    .map((id) => items[id]?.text.fr ?? "…")
    .filter((s) => s.length > 0);

  const acknowledge = () => {
    if (!hasAcknowledged.current) {
      hasAcknowledged.current = true;
      onAcknowledge?.();
    }
    setAcknowledged(true);
  };

  return (
    <View style={card}>
      <Text style={kicker}>A form for later</Text>

      {forms.length > 0 ? (
        <View style={formBox}>
          {forms.map((fr, i) => (
            <Text key={`form-${i}`} style={formText}>
              {fr}
            </Text>
          ))}
        </View>
      ) : null}

      <Text style={body}>
        You may see this form. We won&rsquo;t build it yet — today we&rsquo;ll use
        the simpler path. You only need to recognize it for now.
      </Text>

      {acknowledged ? (
        <Text style={done}>Noted — just recognize it for now.</Text>
      ) : (
        <Pressable onPress={acknowledge} style={softBtn}>
          <Text style={softBtnText}>Got it</Text>
        </Pressable>
      )}
    </View>
  );
}

const card: ViewStyle = {
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.bg,
  padding: 20,
  gap: 12,
};
const kicker: TextStyle = {
  color: P.purple,
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: "Outfit",
  textTransform: "uppercase",
};
const formBox: ViewStyle = {
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  paddingHorizontal: 14,
  paddingVertical: 12,
  gap: 4,
};
const formText: TextStyle = {
  color: P.ink,
  fontSize: 18,
  lineHeight: 26,
  fontFamily: "Newsreader",
};
const body: TextStyle = {
  color: P.ink2,
  fontSize: 15,
  lineHeight: 23,
  fontFamily: "Newsreader",
};
const softBtn: ViewStyle = {
  alignSelf: "flex-start",
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 18,
  paddingVertical: 8,
};
const softBtnText: TextStyle = {
  color: P.ink2,
  fontSize: 14,
  fontFamily: "Outfit",
};
const done: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  fontFamily: "Outfit",
};
