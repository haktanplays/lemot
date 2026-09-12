import { useState } from "react";
import { View, Text } from "react-native";
import { Weave } from "@/components/lesson-v1/screens/Weave";
import { LessonScreenFrame } from "@/components/ui/LessonScreenFrame";
import { PrimaryAction, LinkAction } from "@/components/ui/actions";
import { Kicker } from "@/components/ui/editorial";
import { usePracticeSession } from "@/components/practice/usePracticeSession";
import { P, SPACE } from "@/constants/theme";
import type { Lesson } from "@/content/lessonTypes";
import type { PracticeSeed } from "@/content/practice/practiceTypes";

/**
 * One more go at the thing the lesson is for.
 *
 * ── WHY THIS EXISTS ────────────────────────────────────────────────────────
 *
 * 632 practice seeds were authored for L1-L10 and, until this, none of them
 * could be reached from inside a lesson. A learner who missed a lesson's own
 * acquisition demand saw the model, tapped Continue, and never met the item
 * again in that sitting. The material to bring it back was already written.
 *
 * ── WHY IT IS AN OFFER AND NOT A GATE ──────────────────────────────────────
 *
 * The same posture as the Journey's resume anchor. A learner who missed a step
 * may be tired, may be about to close the app, may simply want to read on. A
 * product that made them earn the next screen would be a product that punished
 * them for getting something wrong, and this one does not. So: two doors, both
 * one tap, and the one that moves on is always available.
 *
 * There is exactly ONE offer per missed step and never the same seed twice in a
 * sitting. No quota, no counter, no "two more to go" — the policy either has
 * something lawful and different to hand over or it does not.
 *
 * ── WHAT THE EVIDENCE SAYS ─────────────────────────────────────────────────
 *
 * The attempt is real and it is recorded, under `placement:
 * "lesson_step_practice"` and with the seed's id in the `practice/` namespace.
 * Both halves matter: no amount of this can complete a lesson screen (no
 * lesson requires an id under that prefix), and it is not counted as a visit to
 * the Practice tab, which is a number the learner can see.
 */
export function LessonStepPractice({
  seed,
  lesson,
  onDone,
}: {
  seed: PracticeSeed;
  /** The lesson the learner is inside — the origin for treatment resolution. */
  lesson: Lesson;
  onDone: () => void;
}) {
  // Keyed by the seed, so taking two offers in one lesson is two runs rather
  // than one that remembers the first.
  const session = usePracticeSession(`${lesson.id}:${seed.id}`, "lesson-step");
  const [started, setStarted] = useState(false);

  // The policy only ever hands over a weave (see `seedsRenderableInALesson`:
  // the other seed shape has no renderer inside a lesson). Checked rather than
  // asserted, because a caller that widened the filter without widening this
  // component should drop the offer, not render the wrong screen.
  if (seed.exercise.type !== "weave") return null;

  if (!started) {
    return (
      <LessonScreenFrame
        footer={
          <View style={{ gap: SPACE.sm }}>
            <PrimaryAction label="Try it another way" onPress={() => setStarted(true)} />
            <LinkAction label="Move on" align="center" onPress={onDone} />
          </View>
        }
      >
        <Kicker text="Another way in" gap="md" />
        <Text style={{ color: P.ink, fontSize: 17, lineHeight: 26 }}>
          There is another way to come at that one, if you want it.
        </Text>
        <Text
          style={{ color: P.ink2, fontSize: 15, lineHeight: 23, marginTop: SPACE.md }}
        >
          Same French, different question. It takes about a minute, and nothing
          here counts against you.
        </Text>
      </LessonScreenFrame>
    );
  }

  return (
    <Weave
      screen={seed.exercise}
      onContinue={onDone}
      onTypedAttempt={(facts) => {
        session.recordTyped(seed, lesson, {
          text: facts.text,
          hintRung: facts.hintRung,
          constitutiveSupportRendered: facts.constitutiveSupportRendered,
        });
      }}
    />
  );
}
