import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Btn } from "@/components/Btn";
import { P } from "@/constants/theme";
import { useApp } from "@/providers/AppProvider";
import type { Lesson, LessonScreen } from "@/content/lessonTypes";
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
  const [screenIndex, setScreenIndex] = useState(0);
  const screen = lesson.screens[screenIndex];
  const goNext = () => setScreenIndex((n) => n + 1);

  // Persist exactly once when the learner reaches the end of the flow.
  // The ref guard prevents re-writes if mk's identity changes on re-render.
  const isComplete = screenIndex >= lesson.screens.length;
  const persisted = useRef(false);
  useEffect(() => {
    if (isComplete && !persisted.current) {
      persisted.current = true;
      mk(lesson.number, V1_COMPLETION_SECTION_KEY);
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
          />
          {/* Key the active screen by screenIndex so each step mounts a fresh
              instance. Without this, two consecutive same-type screens (e.g.
              Weave -> Weave) reuse one component instance and its local state
              bleeds across (next screen appears pre-filled / already revealed).
              The key only changes on step advance, so typing within a screen
              (screenIndex unchanged) preserves state. */}
          <View key={screenIndex} style={{ flex: 1 }}>
            {pickScreen(screen, goNext, session)}
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
}: {
  title: string;
  current: number;
  total: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: P.border,
        backgroundColor: P.bg,
      }}
    >
      <Pressable
        onPress={exitToPrevious}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        style={{ padding: 4 }}
      >
        <ChevronLeft size={22} color={P.ink2} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text
          className="text-xs"
          style={{ color: P.ink3, marginBottom: 2 }}
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
) {
  switch (screen.type) {
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
// message and the return action.
function CompletionView({ lesson }: { lesson: Lesson }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: P.bg,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View
        className="rounded-xl border"
        style={{
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        <Text className="text-base mb-2" style={{ color: P.ink }}>
          {`You reached the end of Lesson ${lesson.number}.`}
        </Text>
        <Text className="text-sm" style={{ color: P.ink2 }}>
          A small French shape is now familiar.
        </Text>
        <Btn onPress={exitToPrevious}>
          <Text style={{ color: P.paper, fontSize: 15 }}>Back to Home</Text>
        </Btn>
        {/* Navigation only — opening the Hub is not learning evidence and emits
            no event. (Typed-route cast is the narrow bridge the house rules
            allow for a freshly added route.) */}
        <Pressable
          onPress={() => router.push("/practice-hub" as never)}
          style={{ marginTop: 12, alignSelf: "center", padding: 6 }}
          accessibilityRole="button"
        >
          <Text
            className="text-sm"
            style={{ color: P.ink2, textDecorationLine: "underline" }}
          >
            Practice what came back
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
