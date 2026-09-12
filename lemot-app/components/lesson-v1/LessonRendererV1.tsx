import { useEffect, useRef, useState } from "react";
import { getV1LessonByNumber } from "@/content/lessons/v1";
import { kvStorage } from "@/lib/storage";
import {
  LESSON_CURSOR_KEY,
  backTarget,
  backwardEntryStep,
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
import { markFirstTasteFinished } from "@/lib/firstUse";
import { useApp } from "@/providers/AppProvider";
import { useReachedItemIds } from "@/hooks/useReachedItemIds";
import { useExpressionReuse } from "@/hooks/useExpressionReuse";
import { piecesUsedInSession } from "@/content/lesson-v1-evidence/lessonUse";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import type { SayItYourWayScreen, WeaveScreen } from "@/content/lessonTypes";
import { itemIdForPiece, recapLinkTarget } from "@/content/lessons/recapBridge";
import type { Lesson, LessonScreen } from "@/content/lessonTypes";
import { ActivityChain } from "@/components/lesson-v1/screens/ActivityChain";
import { Showcase } from "@/components/lesson-v1/screens/Showcase";
import { PatternReel } from "@/components/lesson-v1/screens/PatternReel";
import { Kicker } from "@/components/ui/editorial";
import { useLessonStepPractice } from "@/hooks/useLessonStepPractice";
import { LessonStepPractice } from "@/components/lesson-v1/LessonStepPractice";
import type { PracticeSeed } from "@/content/practice/practiceTypes";
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
  // What Mon Lexique would actually show this learner, so the recap can offer
  // to open only the pieces that are really there. Undefined until it answers,
  // which means nothing links — the safe direction.
  const reachedItemIds = useReachedItemIds();
  // Which reached French may lawfully answer a screen that opted in. Resolved
  // here, at the wiring layer, because it is a question about the learner and
  // the screen must not be able to ask it. Returns strings; nothing else.
  const derivedAlternativesFor = useExpressionReuse(lesson);
  const linkablePieces =
    reachedItemIds === undefined
      ? undefined
      : (
          lesson.screens.find((s: LessonScreen) => s.type === "recap")?.payload as
            | { piecesUsed?: string[] }
            | undefined
        )?.piecesUsed?.filter((piece) => recapLinkTarget(piece, reachedItemIds) !== null);
  const session = useLessonV1LearningSession();
  // What the learner actually produced or chose in THIS sitting, for the recap.
  // Derived here, at the wiring layer, from the session's own events: the recap
  // may not ask what the learner did, so it is told, in display strings. An
  // empty result is a real answer (they landed nothing) and is passed through
  // as such, so the screen can choose a heading it can stand behind.
  const usedPieces = piecesUsedInSession(session.state.events, ITEM_REGISTRY);
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
  // ONE MORE GO AT A MISSED STEP.
  //
  // 632 practice seeds were authored for L1-L10 and none of them could be
  // reached from inside a lesson: a learner who missed the thing the lesson
  // exists to teach saw the model, tapped Continue, and never met the item
  // again. The pure policy decides whether there is a lawful, different way at
  // it; this only decides when to ask and what to draw.
  //
  // The ask happens on LEAVING the step, not on the wrong answer itself. A
  // learner who has just been told they were wrong is reading the model, and
  // putting a second offer on that screen competes with the one thing there
  // worth reading.
  const { offerFor, noteOffered } = useLessonStepPractice(lesson);
  // Which screens were answered and did not land, this sitting. A ref, because
  // recording a miss must not re-render the screen the learner is reading.
  const missed = useRef<Set<string>>(new Set());
  const [offer, setOffer] = useState<PracticeSeed | null>(null);
  const advance = () => {
    setChainStep(0);
    setScreenIndex((n) => n + 1);
  };
  const goNext = () => {
    const current = lesson.screens[screenIndex];
    if (current !== undefined && missed.current.has(current.id)) {
      missed.current.delete(current.id);
      const seed = offerFor(current);
      if (seed !== null) {
        noteOffered(seed.id);
        setOffer(seed);
        return;
      }
    }
    advance();
  };
  // Did the first taste's one production actually land?
  //
  // The closing screen claims a specific act -- "you just ordered a coffee in
  // French" -- and a claim that specific has to be a fact. A learner who typed
  // nonsense saw the model and moved on; telling them they ordered a coffee is
  // the same untruth the answer verdict was fixed to stop telling, moved one
  // screen later. The Weave already grades itself, so the renderer only has to
  // remember the answer. Nothing else reads this, and no other lesson sets it.
  const [orderLanded, setOrderLanded] = useState(false);
  // The first taste's opening beat has nothing behind it. Home is not a place
  // the learner has been yet — it is the screen that sent them here, and it
  // will send them straight back while first use is unfinished. A chevron
  // there is either a bounce or, if first use were ever marked done on entry,
  // a one-way door out of a lesson that is not on the path. So it is simply
  // not drawn. Every later beat keeps its ordinary one-page-back.
  const canLeaveFromHere = lesson.phase !== "first-step" || screenIndex > 0;
  const goBack = !canLeaveFromHere
    ? null
    : () => {
        // Back undoes the last thing the learner SAW, and inside a chain that
        // is a step, not a page. Measured in pages it skipped every step of the
        // exercise at once; and because it also reset the step to 0, arriving
        // on a previous chain opened it at step 1 rather than where the learner
        // actually left it. Both came from this one call site.
        const target = backTarget(
          screenIndex,
          screen?.type === "activity-chain" ? chainStep : 0,
        );
        if (target.kind === "step") {
          setChainStep(target.stepIndex);
          return;
        }
        if (target.kind === "page") {
          const previous = lesson.screens[target.index];
          setChainStep(
            backwardEntryStep(
              previous?.type === "activity-chain" ? previous.payload.steps.length : null,
            ),
          );
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
      // The first taste is over only once it is reached. Until then the home
      // redirect keeps sending the learner back here, and the cursor above
      // resumes them at the beat they left — an interrupted first run is
      // continued, never repeated and never lost.
      if (lesson.phase === "first-step") {
        markFirstTasteFinished();
      }
    }
  }, [isComplete, mk, lesson.number, lesson.phase]);

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
            {offer !== null ? (
              <LessonStepPractice
                seed={offer}
                lesson={lesson}
                onDone={() => {
                  setOffer(null);
                  advance();
                }}
              />
            ) : pickScreen(
              screen,
              goNext,
              session,
              chainStep,
              setChainStep,
              () => setOrderLanded(true),
              () => missed.current.add(screen.id),
              linkablePieces,
              usedPieces,
              derivedAlternativesFor,
            )}
          </View>
        </View>
      ) : (
        <CompletionView lesson={lesson} orderLanded={orderLanded} />
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
  /**
   * One authored page back, or out of the lesson when already at the first.
   * `null` when there is genuinely nowhere behind this screen, in which case
   * no back affordance is drawn rather than one that leads out of the app's
   * only entry point.
   */
  onBack: (() => void) | null;
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
      {onBack ? (
        <Pressable
          onPress={onBack}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={{ padding: SPACE.xs }}
        >
          <ChevronLeft size={22} color={P.ink2} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <Kicker text={`part ${current} of ${total}`} gap="xs" />
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
  /** Called when a typed production is graded as landing. Weave only. */
  onProductionLanded: () => void,
  /** Called when a typed production is graded as NOT landing. Weave only. */
  onProductionMissed: () => void,
  /**
   * Which recap chips may be drawn as links, as display strings. The reached
   * set itself stays out of here and out of the screen: what crosses this
   * boundary is a presentational fact, not learner state.
   */
  linkablePieces?: readonly string[],
  /** What the learner actually used this sitting, as display strings. */
  usedPieces?: readonly string[],
  /**
   * Resolved expression reuse, as a lookup over screens. Same boundary as
   * `linkablePieces`: strings crossing into a screen, never learner state.
   */
  derivedAlternativesFor?: (
    screen: WeaveScreen | SayItYourWayScreen,
  ) => readonly string[] | undefined,
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
          stepIndex={chainStep}
          onStepChange={onChainStep}
          derivedAlternativesFor={derivedAlternativesFor}
        />
      );
    // Breadth surface: no evidence callback by design. See Showcase.tsx.
    case "showcase":
      return <Showcase screen={screen} onContinue={onContinue} />;
    // Same contract as a showcase: it is watched, not answered, so it takes no
    // evidence callback and claims no target.
    case "pattern-reel":
      return <PatternReel screen={screen} onContinue={onContinue} />;
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
          onChoice={(facts) => {
            session.recordChoiceAttempt(screen, facts);
            // Whether the option was the right one is a fact already sitting in
            // the authored payload, so reading it here is not a second grader —
            // and the screen still learns nothing about what happens next.
            const chosen = screen.payload.options.find((o) => o.id === facts.optionId);
            if (chosen?.isCorrect !== true) onProductionMissed();
          }}
        />
      );
    case "weave":
      return (
        <Weave
          screen={screen}
          onContinue={onContinue}
          derivedAlternatives={derivedAlternativesFor?.(screen)}
          onTypedAttempt={(facts) => {
            // `full` is exact OR an authored accepted alternative, and nothing
            // less. A partial answer evidences meaning, which is enough to be
            // told the meaning landed -- not enough to be told the coffee was
            // ordered.
            if (facts.evaluation.evidence.verdict === "full") {
              onProductionLanded();
            } else {
              // A surface fact — this answer did not land — and nothing more.
              // The screen still knows nothing about practice, about the pool,
              // or about what the lesson will do next.
              onProductionMissed();
            }
            session.recordTypedAttempt(screen, {
              text: facts.text,
              hintRung: facts.hintRung,
              constitutiveSupportRendered: facts.constitutiveSupportRendered,
              derivedAlternatives: facts.derivedAlternatives,
            });
          }}
        />
      );
    case "say-it-your-way":
      return (
        <SayItYourWayV1
          screen={screen}
          onContinue={onContinue}
          derivedAlternatives={derivedAlternativesFor?.(screen)}
          onOpenAttempt={(facts) => session.recordOpenAttemptAndReveal(screen, facts)}
        />
      );
    case "natural-reveal":
      return <NaturalReveal screen={screen} onContinue={onContinue} />;
    case "recap":
      return (
        <RecapCard
          screen={screen}
          onContinue={onContinue}
          linkablePieces={linkablePieces}
          usedPieces={usedPieces}
          onOpenPiece={(piece) => {
            // Resolved here, at the wiring layer, because it is a question
            // about the learner and the screen must not be able to ask it.
            const itemId = itemIdForPiece(piece);
            if (itemId === null) return;
            router.push(
              `/(tabs)/mon-lexique?item=${encodeURIComponent(itemId)}` as never,
            );
          }}
        />
      );
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
function CompletionView({
  lesson,
  orderLanded,
}: {
  lesson: Lesson;
  /** First taste only: whether the one production was produced. */
  orderLanded: boolean;
}) {
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
          ? orderLanded
            ? "You just ordered a coffee in French."
            : "Bonjour, je voudrais un café."
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
          ? orderLanded
            ? "Three pieces, and they will keep coming back. The path starts here."
            : "That is the sentence. You have met all three pieces of it, and they will keep coming back. The path starts here."
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
