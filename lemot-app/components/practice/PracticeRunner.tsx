import { useMemo, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { X, Volume2 } from "lucide-react-native";
import { P, SPACE } from "@/constants/theme";
import { FillWithTraps } from "@/components/lesson-v1/screens/FillWithTraps";
import { Weave } from "@/components/lesson-v1/screens/Weave";
import { evaluateTypedAnswer } from "@/content/lesson-v1-evidence/typedEvaluation";
import { gradeBuildSequence } from "@/components/learning-engine/buildSequence";
import { selectRepairSeed } from "@/content/practice/practiceRepair";
import { TODAYS_SET_MAX } from "@/content/learning-engine/practice-selector";
import type { PracticeSessionAction } from "@/content/practice/practicePlanner";
import type { PracticeStruggle } from "@/content/practice/practiceCopy";
import type { PracticeSeed } from "@/content/practice/practiceTypes";
import type { Lesson } from "@/content/lessonTypes";
import { WEAVE_DICTATION_HELPER } from "@/components/lesson-v1/screens/weaveCopy";
import { PRACTICE_UI_COPY } from "@/content/practice/practiceCopy";
import { useSpeech } from "@/hooks/useSpeech";
import { PracticeBuild } from "./PracticeBuild";
import { usePracticeSession } from "./usePracticeSession";

/** At most this many repair opportunities may be added to one session. */
const MAX_REPAIRS_PER_SESSION = 2;

export type PracticeRunResult = {
  worked: PracticeSessionAction[];
  missCount: number;
  struggles: PracticeStruggle[];
};

/**
 * One practice session, one action at a time.
 *
 * The session shell is Practice's own: its own progress, its own close. It
 * deliberately does not borrow the lesson header, because a learner in Practice
 * is not inside Lesson 4 and should never be told they are.
 *
 * THE REPAIR LOOP, and its limits. After a real miss the runner asks the pool
 * for ONE lawful seed that works the same confusion a different way, and
 * appends it. That is all: there is no re-planning, no scoring, no adaptive
 * scheduler, and the queue is capped twice over (two repairs, and never past
 * the canon session ceiling) so a bad run cannot become an unbounded one.
 * Detecting the miss reuses the authored payload and the shipped typed
 * evaluator — the runner grades nothing of its own.
 */
export function PracticeRunner({
  plannedActions,
  lessons,
  seeds,
  reachedItems,
  reachedLessons,
  sessionKey,
  onFinish,
  onQuit,
}: {
  plannedActions: readonly PracticeSessionAction[];
  lessons: readonly Lesson[];
  seeds: readonly PracticeSeed[];
  reachedItems: ReadonlySet<string>;
  reachedLessons: ReadonlySet<string>;
  sessionKey: string;
  onFinish: (result: PracticeRunResult) => void;
  onQuit: () => void;
}) {
  const session = usePracticeSession(sessionKey);
  const { say } = useSpeech();
  const [actions, setActions] = useState<PracticeSessionAction[]>([...plannedActions]);
  const [index, setIndex] = useState(0);
  const missCount = useRef(0);
  // What was missed, per item, and whether a later action on the same item
  // landed. Recorded here rather than derived afterwards from the snapshot,
  // because the close must describe THIS session and nothing older.
  const struggles = useRef<PracticeStruggle[]>([]);

  /** A graded outcome on one action, in the terms the close needs. */
  const noteOutcome = (
    seed: PracticeSeed,
    itemId: string,
    correct: boolean,
  ) => {
    const existing = struggles.current.find((s) => s.itemId === itemId);
    if (correct) {
      // A repair does not delete the miss; it adds the second fact to it.
      if (existing) existing.repaired = true;
      return;
    }
    missCount.current += 1;
    if (!existing) {
      struggles.current.push({
        itemId,
        seedId: seed.id,
        surface: seed.surface,
        repaired: false,
      });
    } else {
      existing.repaired = false;
    }
  };
  const repairsAdded = useRef(0);
  const lessonById = useMemo(
    () => new Map(lessons.map((l) => [l.id, l])),
    [lessons],
  );

  const action = actions[Math.min(index, actions.length - 1)];
  const origin = lessonById.get(action.seed.originLessonId);
  const isLast = index >= actions.length - 1;

  /** Append one repair for a miss, if the pool has a lawful, different one. */
  const enqueueRepair = (missed: PracticeSeed) => {
    if (repairsAdded.current >= MAX_REPAIRS_PER_SESSION) return;
    if (actions.length >= TODAYS_SET_MAX) return;
    const used = new Set(actions.map((a) => a.seed.id));
    const repair = selectRepairSeed({
      missed,
      seeds,
      reachedItems,
      reachedLessons,
      usedSeedIds: used,
    });
    if (!repair) return;
    repairsAdded.current += 1;
    setActions((current) => [
      ...current,
      { seed: repair, itemId: repair.targetItemIds[0], path: "challenge" },
    ]);
  };

  const advance = () => {
    if (isLast) {
      void session.whenSettled().then(() =>
        onFinish({
          worked: actions,
          missCount: missCount.current,
          struggles: [...struggles.current],
        }),
      );
      return;
    }
    setIndex((i) => Math.min(i + 1, actions.length - 1));
  };

  const body = () => {
    if (!origin) return null; // structurally impossible; a seed names a real lesson
    if (action.seed.exercise.type === "practice-build") {
      const screen = action.seed.exercise;
      return (
        <PracticeBuild
          key={action.seed.id}
          screen={screen}
          onContinue={advance}
          onAttempt={({ picked }) => {
            session.recordBuild(action.seed, origin, { picked });
            const graded = gradeBuildSequence({
              tiles: screen.payload.tiles.map((t) => ({
                itemId: t.itemId as never,
                ...(t.answerIndex !== undefined ? { answerIndex: t.answerIndex } : {}),
              })),
              picked,
            });
            noteOutcome(action.seed, action.itemId, graded.result === "correct");
            if (graded.result !== "correct") {
              enqueueRepair(action.seed);
            }
          }}
        />
      );
    }
    if (action.seed.exercise.type === "fill-with-traps") {
      const screen = action.seed.exercise;
      return (
        <FillWithTraps
          key={action.seed.id}
          screen={screen}
          onContinue={advance}
          onChoice={({ optionId }) => {
            session.recordChoice(action.seed, origin, optionId);
            const chosen = screen.payload.options.find((o) => o.id === optionId);
            noteOutcome(action.seed, action.itemId, chosen?.isCorrect === true);
            if (chosen && !chosen.isCorrect) {
              enqueueRepair(action.seed);
            }
          }}
        />
      );
    }
    const screen = action.seed.exercise;
    return (
      <Weave
        key={action.seed.id}
        screen={screen}
        onContinue={advance}
        helper={action.seed.audio !== undefined ? WEAVE_DICTATION_HELPER : undefined}
        onTypedAttempt={(facts) => {
          session.recordTyped(action.seed, origin, {
            text: facts.text,
            hintRung: facts.hintRung,
            constitutiveSupportRendered: facts.constitutiveSupportRendered,
          });
          const evaluation = evaluateTypedAnswer({
            userAnswer: facts.text,
            expectedAnswers: screen.payload.expectedAnswers,
            acceptedAlternatives: screen.payload.acceptedAlternatives,
          });
          noteOutcome(action.seed, action.itemId, evaluation.grade.result === "correct");
          if (evaluation.grade.result !== "correct") {
            enqueueRepair(action.seed);
          }
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: P.bg }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SPACE.md,
          paddingHorizontal: SPACE.xl,
          paddingTop: SPACE.md,
          paddingBottom: SPACE.sm,
          borderBottomWidth: 1,
          borderBottomColor: P.border,
        }}
      >
        {/*
          Leave sits on the LEFT. The app's floating settings control is pinned
          to the top right and covered this button entirely — it was invisible
          and unreachable for the whole session.
        */}
        <Pressable
          onPress={onQuit}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Leave practice"
        >
          <X size={18} color={P.ink3} />
        </Pressable>
        <Text style={{ color: P.ink3, fontSize: 12 }}>
          {`${index + 1} of ${actions.length}`}
        </Text>
      </View>
      {/*
        A micro-moment frames its steps as one situation. Shown once above the
        action, never restating the step below it.
      */}
      {action.moment !== undefined && (
        <View
          style={{
            paddingHorizontal: SPACE.xl,
            paddingTop: SPACE.md,
            paddingBottom: SPACE.sm,
            borderBottomWidth: 1,
            borderBottomColor: P.border,
          }}
        >
          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
            {action.moment.intro}
          </Text>
        </View>
      )}

      {/*
        The listening affordance. Its presence is what turns a reused Fill or
        Weave into a listening exercise: those seeds print no French, so the
        control above is the only route to the answer. Replay is unlimited and
        deliberately never recorded — how many times someone listens is not
        evidence about what they know.
      */}
      {action.seed.audio !== undefined && (
        <Pressable
          onPress={() => say(action.seed.audio as string)}
          accessibilityRole="button"
          accessibilityLabel="Play the French again"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: SPACE.sm,
            marginHorizontal: SPACE.xl,
            marginTop: SPACE.lg,
            paddingVertical: SPACE.md,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: P.border,
            backgroundColor: P.paper,
          }}
        >
          <Volume2 size={18} color={P.ink2} />
          <Text style={{ color: P.ink, fontSize: 15, fontWeight: "600" }}>
            {PRACTICE_UI_COPY.listenAgain}
          </Text>
        </Pressable>
      )}

      <View style={{ flex: 1 }}>{body()}</View>
    </View>
  );
}
