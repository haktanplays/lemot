import { useState } from "react";
import { View, Text } from "react-native";
import { P, SPACE } from "@/constants/theme";
import type { ActivityChainScreen, ActivityChainStep } from "@/content/lessonTypes";
import type { LessonV1LearningSession } from "@/components/lesson-v1/LessonV1LearningSessionProvider";
import { MeetCard } from "@/components/lesson-v1/screens/MeetCard";
import { FillWithTraps } from "@/components/lesson-v1/screens/FillWithTraps";
import { Weave } from "@/components/lesson-v1/screens/Weave";
import { SayItYourWayV1 } from "@/components/lesson-v1/screens/SayItYourWayV1";

/**
 * Two to four connected actions presented as ONE lesson page.
 *
 * WHAT THIS DOES NOT DO, deliberately: it does not grade, it does not evaluate,
 * it does not record, and it does not re-implement any exercise. It renders the
 * SAME components a standalone screen would render, with the SAME evidence
 * callbacks, and only takes over one thing — what "Continue" means. Inside a
 * chain, Continue advances to the next step; on the last step it advances the
 * lesson. That is the entire mechanism.
 *
 * Why steps are shown one at a time rather than all at once: every exercise
 * component owns a `LessonScreenFrame` with its own pinned footer, so stacking
 * them would nest scroll regions and stack footers. Sequential disclosure is
 * also what the flow brief asks for — the learner meets one action, completes
 * it, and the next appears — and it keeps the page calm. The shared banner
 * above the step is what makes the sequence read as one moment rather than
 * three unrelated pages.
 *
 * EVIDENCE. Each step is a real screen with its own id, so
 * `qualifyLessonScreenId(lesson.id, step.id)` is unique per action and every
 * event is attributed exactly as it would be standing alone. Advancing is local
 * state; it emits nothing. Re-rendering emits nothing. The components' own
 * once-only guards (Fill reports at selection, Weave at Check, Say It at "Keep
 * and compare") are untouched, so a chain cannot double-count.
 */
export function ActivityChain({
  screen,
  onContinue,
  session,
}: {
  screen: ActivityChainScreen;
  onContinue: () => void;
  session: LessonV1LearningSession;
}) {
  const steps = screen.payload.steps;
  const [index, setIndex] = useState(0);
  const step = steps[Math.min(index, steps.length - 1)];
  const isLast = index >= steps.length - 1;

  // The one behaviour the chain owns. Guarded so a double-tap on a child's
  // Continue cannot skip a step or advance the lesson early.
  const advance = () => {
    if (isLast) {
      onContinue();
      return;
    }
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  return (
    <View style={{ flex: 1, backgroundColor: P.bg }}>
      <View
        style={{
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.md,
          paddingBottom: SPACE.sm,
          borderBottomWidth: 1,
          borderBottomColor: P.border,
        }}
      >
        <Text style={{ color: P.ink3, fontSize: 12, marginBottom: 4 }}>
          {`Step ${index + 1} of ${steps.length}`}
        </Text>
        <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
          {screen.payload.intro}
        </Text>
      </View>

      {/*
        Keyed by step id, and it must stay that way.

        Without a key React reconciles consecutive steps of the SAME type at the
        same position and keeps the child's state. A chain of fill -> fill then
        mounts step 2 already holding step 1's answer, and FillWithTraps refuses
        events once answered, so the options render and nothing can be tapped:
        no selection, no CTA, no way to reach step 3. Seven L1-L10 chains have
        adjacent same-type steps, so this was never one sentence's bug.
      */}
      <View key={step.id} style={{ flex: 1 }}>
        {renderStep(step, advance, session)}
      </View>
    </View>
  );
}

/**
 * Identical wiring to the lesson renderer's own switch. The callbacks are the
 * real session methods, called with the STEP screen, so the interaction
 * builders see exactly what they would see for a standalone screen.
 */
function renderStep(
  step: ActivityChainStep,
  onContinue: () => void,
  session: LessonV1LearningSession,
) {
  switch (step.type) {
    case "meet-card":
      return (
        <MeetCard
          screen={step}
          onContinue={onContinue}
          onExposure={(facts) => session.recordMeetExposure(step, facts)}
        />
      );
    case "fill-with-traps":
      return (
        <FillWithTraps
          screen={step}
          onContinue={onContinue}
          onChoice={(facts) => session.recordChoiceAttempt(step, facts)}
        />
      );
    case "weave":
      return (
        <Weave
          screen={step}
          onContinue={onContinue}
          onTypedAttempt={(facts) =>
            session.recordTypedAttempt(step, {
              text: facts.text,
              hintRung: facts.hintRung,
              constitutiveSupportRendered: facts.constitutiveSupportRendered,
            })
          }
        />
      );
    case "say-it-your-way":
      return (
        <SayItYourWayV1
          screen={step}
          onContinue={onContinue}
          onOpenAttempt={(facts) => session.recordOpenAttemptAndReveal(step, facts)}
        />
      );
    default: {
      const _exhaustive: never = step;
      return null;
    }
  }
}
