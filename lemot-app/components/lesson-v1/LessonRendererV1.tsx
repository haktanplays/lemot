import { useEffect, useRef, useState } from "react";
import { getV1LessonByNumber } from "@/content/lessons/v1";
import { kvStorage } from "@/lib/storage";
import {
  LESSON_CURSOR_KEY,
  backTarget,
  parseCursor,
  resumeIndexFor,
  resumeStepFor,
  serializeCursor,
} from "@/content/lessons/lessonCursor";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { PrimaryAction, LinkAction } from "@/components/ui/actions";
import { P, SPACE } from "@/constants/theme";
import { useApp } from "@/providers/AppProvider";
import type { Lesson, LessonScreen } from "@/content/lessonTypes";
import { ActivityChain } from "@/components/lesson-v1/screens/ActivityChain";
import { Showcase } from "@/components/lesson-v1/screens/Showcase";
import { MeetCard } from "./screens/MeetCard";
import { InsightCard } from "./screens/InsightCard";
import { FillWithTraps } from "./screens/FillWithTraps";
import { Weave } from "./screens/Weave";
import { NaturalReveal } from "./screens/NaturalReveal";
import { SayItYourWayV1 } from "./screens/SayItYourWayV1";
import { RecapCard } from "./screens/RecapCard";
import {
  LessonV1LearningSessionProvider,
  useLessonV1LearningSession,
  type LessonV1LearningSession,
} from "./LessonV1LearningSessionProvider";
import {
  createSettledNavigationGate,
  type SettledNavigationGate,
} from "./settledNavigation";

// Minimal completion marker. The v1 engine has its own screen taxonomy, so
// we reuse one existing legacy section key (completion-only, no scoring) to
// record that the lesson was finished. This keeps lp(lesson.number) > 0 so
// Home / Daily Review / Progress no longer read as fully empty after the
// dev-apk smoke path. Full v1 progress mapping is a later workstream.
const V1_COMPLETION_SECTION_KEY = "read_listen";

/**
 * The lesson subtree runs inside a learning session (PR-05) and, since PR-06,
 * the four Wave A screen primitives report their interactions through it.
 *
 * The legacy `mk()` completion marker below keeps its existing, SEPARATE
 * meaning: it records that the learner reached the end of the flow. Finishing a
 * lesson is not evidence that anything was learned, so it emits no learning
 * event and is never reinterpreted as one.
 */
export function LessonRendererV1({ lesson }: { lesson: Lesson }) {
  return (
    <LessonV1LearningSessionProvider
      key={`${lesson.id}:${lesson.version}`}
      lesson={lesson}
    >
      <LessonRendererV1Inner lesson={lesson} />
    </LessonV1LearningSessionProvider>
  );
}

function LessonRendererV1Inner({ lesson }: { lesson: Lesson }) {
  const { mk } = useApp();
  const session = useLessonV1LearningSession();
  // Resume where the learner left off. Read once, on mount: a lesson that
  // re-read the cursor on every render would fight the learner's own paging.
  const [screenIndex, setScreenIndex] = useState(() =>
    resumeIndexFor(lesson.id, lesson.screens.length, parseCursor(kvStorage.getItem(LESSON_CURSOR_KEY))),
  );
  const screen = lesson.screens[screenIndex];
  // Chain step, read once on mount from the same stored cursor.
  const [chainStep, setChainStep] = useState(() => {
    const c = parseCursor(kvStorage.getItem(LESSON_CURSOR_KEY));
    const s = lesson.screens[resumeIndexFor(lesson.id, lesson.screens.length, c)];
    if (!s || s.type !== "activity-chain") return 0;
    return resumeStepFor(s.id, s.payload.steps.length, c);
  });
  const goNext = () => {
    setChainStep(0);
    setScreenIndex((n) => n + 1);
  };
  const goBack = () => {
    const target = backTarget(screenIndex);
    if (target.kind === "page") {
      setChainStep(0);
      setScreenIndex(target.index);
      return;
    }
    exitToPrevious();
  };

  // Keep the stored position in step with the visible one. Backgrounding, a
  // tab, or a push and pop all unmount this component; the record is what
  // survives them.
  useEffect(() => {
    if (screenIndex < lesson.screens.length) {
      const current = lesson.screens[screenIndex];
      const chain =
        current?.type === "activity-chain" && chainStep > 0
          ? { chainScreenId: current.id, stepIndex: chainStep }
          : {};
      kvStorage.setItem(
        LESSON_CURSOR_KEY,
        serializeCursor({ lessonId: lesson.id, screenIndex, ...chain }),
      );
    }
  }, [lesson.id, screenIndex, chainStep, lesson.screens]);

  // Persist exactly once when the learner reaches the end of the flow.
  // The ref guard prevents re-writes if mk's identity changes on re-render.
  const isComplete = screenIndex >= lesson.screens.length;
  const persisted = useRef(false);
  useEffect(() => {
    if (isComplete && !persisted.current) {
      persisted.current = true;
      mk(lesson.number, V1_COMPLETION_SECTION_KEY);
      // Finished: there is no position left to hold. Reopening should start the
      // lesson, not drop the learner back on the completion screen.
      kvStorage.removeItem(LESSON_CURSOR_KEY);
    }
  }, [isComplete, mk, lesson.number]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: P.bg }}
    >
      {screen ? (
        <View style={{ flex: 1 }}>
          <LessonHeader
            title={lesson.title}
            current={screenIndex + 1}
            total={lesson.screens.length}
            onBack={goBack}
          />
          {/* Key the active screen by screenIndex so each step mounts a fresh
              instance. Without this, two consecutive same-type screens (e.g.
              Weave -> Weave) reuse one component instance and its local state
              bleeds across (next screen appears pre-filled / already revealed).
              The key only changes on step advance, so typing within a screen
              (screenIndex unchanged) preserves state. */}
          <View key={screenIndex} style={{ flex: 1 }}>
            {pickScreen(screen, goNext, session, chainStep, setChainStep)}
          </View>
        </View>
      ) : (
        <CompletionView lesson={lesson} />
      )}
    </SafeAreaView>
  );
}

// Leave the lesson safely: back if there is history, else home.
function exitToPrevious() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/(tabs)");
  }
}

// Quiet top frame for active lesson screens only. Back affordance, editorial
// lesson title, and a calm passive position. No XP, level, streak, score, or
// percent. Just where you are. Not rendered on the completion view.
function LessonHeader({
  title,
  current,
  total,
  onBack,
}: {
  title: string;
  current: number;
  total: number;
  /** One authored page back, or out of the lesson when already at the first. */
  onBack: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: SPACE.sm,
        paddingHorizontal: SPACE.lg,
        paddingTop: SPACE.md,
        paddingBottom: SPACE.lg,
        borderBottomWidth: 1,
        borderBottomColor: P.border,
        backgroundColor: P.bg,
      }}
    >
      <Pressable
        onPress={onBack}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        style={{ padding: SPACE.xs }}
      >
        <ChevronLeft size={22} color={P.ink2} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text
          className="text-xs"
          style={{ color: P.ink3, marginBottom: 3, letterSpacing: 0.4 }}
        >
          {`part ${current} of ${total}`}
        </Text>
        <Text
          className="text-lg"
          style={{
            color: P.ink,
            fontFamily: "serif",
            fontStyle: "italic",
            lineHeight: 26,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
}

/**
 * Dispatch one screen, handing the four Wave A primitives a UI-facts callback.
 *
 * The callbacks carry surface facts only — an option id, a typed string, a play
 * count. No screen receives the controller, the repository, an evidence class,
 * an attribution, an admissibility state, Mon Lexique state or any mastery
 * mutation. Insight, standalone Natural Reveal and Recap emit nothing at all.
 */
function pickScreen(
  screen: LessonScreen,
  onContinue: () => void,
  session: LessonV1LearningSession,
  chainStep: number,
  onChainStep: (step: number) => void,
) {
  switch (screen.type) {
    // Orchestration only: it grades nothing and records nothing itself. Every
    // event comes from a step, through the same session methods used below.
    case "activity-chain":
      return (
        <ActivityChain
          screen={screen}
          onContinue={onContinue}
          session={session}
          initialStep={chainStep}
          onStepChange={onChainStep}
        />
      );
    // Breadth surface: no evidence callback by design. See Showcase.tsx.
    case "showcase":
      return <Showcase screen={screen} onContinue={onContinue} />;
    case "meet-card":
      return (
        <MeetCard
          screen={screen}
          onContinue={onContinue}
          onExposure={(facts) => session.recordMeetExposure(screen, facts)}
        />
      );
    case "insight-card":
      return <InsightCard screen={screen} onContinue={onContinue} />;
    case "fill-with-traps":
      return (
        <FillWithTraps
          screen={screen}
          onContinue={onContinue}
          onChoice={(facts) => session.recordChoiceAttempt(screen, facts)}
        />
      );
    case "weave":
      return (
        <Weave
          screen={screen}
          onContinue={onContinue}
          onTypedAttempt={(facts) =>
            session.recordTypedAttempt(screen, {
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
          screen={screen}
          onContinue={onContinue}
          onOpenAttempt={(facts) => session.recordOpenAttemptAndReveal(screen, facts)}
        />
      );
    case "natural-reveal":
      return <NaturalReveal screen={screen} onContinue={onContinue} />;
    case "recap":
      return <RecapCard screen={screen} onContinue={onContinue} />;
    default: {
      const _exhaustive: never = screen;
      return null;
    }
  }
}

// Completion view: standalone card with no lesson header. Only the completion
// message and the return actions.
//
// One primary action, one quiet shortcut. This surface used to carry three
// equal underlined links to the standing surfaces, because those surfaces were
// reachable from nowhere else. They are permanent tabs now, so completion no
// longer has to act as their gateway: Back to Home is the single primary
// action, and Open Mon Lexique remains as the one calm shortcut to the words
// the learner just used.
//
// Settlement barrier: the final lesson screen may queue its learning event and
// land here before that event has settled, so the projection shortcut routes
// through one settled-navigation gate — tap → session settles → navigate →
// destination reads a settled log. Opening it is navigation only: not learning
// evidence, no event. Back to Home stays direct and unchanged — it reads no
// projection.
function CompletionView({ lesson }: { lesson: Lesson }) {
  const session = useLessonV1LearningSession();
  // Latest-session ref: the gate is created once per completion view, but must
  // always settle the CURRENT session (a privacy reset swaps the controller).
  const sessionRef = useRef(session);
  sessionRef.current = session;
  // Alive flag: a settlement that lands after unmount must not navigate late.
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const gate = useRef<SettledNavigationGate | null>(null);
  if (gate.current === null) {
    gate.current = createSettledNavigationGate({
      whenSettled: () => sessionRef.current.whenSettled(),
      isActive: () => mounted.current,
    });
  }
  const openProjection = gate.current.requestSettledNavigation;

  // Milestone lessons read their role from the metadata the content already
  // declares. Nothing is derived from the number, the title or the screen mix,
  // and the role changes presentation only: same view, same actions, same
  // settlement. Currently L20 and L24 carry it.
  const isMilestone = lesson.journeyRole === "milestone";
  // The first taste closes differently, and reads that from the phase the
  // content already declares rather than from a sixth journey role -- L0's
  // status is absence of a role, which is ratified (JR-004). It is the only
  // lesson finished before the Journey exists, so "Lesson 0" is a number that
  // means nothing to the learner and "Back to Home" points at a screen they
  // have never seen. It closes on what they can now say, and on Lesson 1.
  const isFirstTaste = lesson.phase === "first-step";
  const lessonOne = getV1LessonByNumber(1);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: P.bg,
        paddingHorizontal: SPACE.xl,
        paddingVertical: SPACE.xxl,
        justifyContent: "center",
      }}
    >
      {/* A quiet landing rather than a card on a page. The closing line is the
          only thing with weight, whitespace does the rest, and the two actions
          sit well below it so the screen ends calmly. No badge, no tally, no
          celebration: finishing is acknowledged, never rewarded. */}
      {isMilestone && (
        <View
          style={{
            height: 1,
            width: 48,
            backgroundColor: P.ink3,
            marginBottom: SPACE.xl,
          }}
        />
      )}
      <Text
        style={{
          color: P.ink,
          fontFamily: "serif",
          fontStyle: "italic",
          fontSize: isMilestone ? 26 : 22,
          lineHeight: isMilestone ? 36 : 31,
        }}
      >
        {isFirstTaste
          ? "You just ordered a coffee in French."
          : `You reached the end of Lesson ${lesson.number}.`}
      </Text>
      <Text
        style={{
          color: P.ink2,
          fontSize: 15,
          lineHeight: 23,
          marginTop: SPACE.md,
        }}
      >
        {isFirstTaste
          ? "Three pieces, and they will keep coming back. The path starts here."
          : "A small French shape is now familiar."}
      </Text>
      <View style={{ marginTop: isMilestone ? 44 : 36 }}>
        {isFirstTaste ? (
          <PrimaryAction
            label="Begin"
            onPress={() =>
              openProjection(() =>
                lessonOne
                  ? router.replace(`/v1-lesson/${lessonOne.id}` as never)
                  : router.replace("/(tabs)" as never),
              )
            }
          />
        ) : (
          <PrimaryAction label="Back to Home" onPress={exitToPrevious} />
        )}
      </View>
      {/* The one secondary shortcut. Typed-route casts are the narrow bridge
          the house rules allow for routes Metro has not regenerated types
          for yet.

          Absent on the first taste: a learner who has finished one lesson has
          no lexique worth opening and has never heard the name, so offering it
          here would be the product explaining itself. */}
      {!isFirstTaste && (
        <View style={{ marginTop: SPACE.sm }}>
          <LinkAction
            label="Open Mon Lexique"
            onPress={() =>
              openProjection(() => router.push("/mon-lexique" as never))
            }
          />
        </View>
      )}
    </View>
  );
}
