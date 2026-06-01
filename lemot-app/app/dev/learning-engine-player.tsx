/**
 * Dev-only INTERACTIVE renderer slice (v0) for the learning-engine L1 fixture.
 *
 * This is a dev experiment, NOT the live lesson renderer. It mounts ONLY the L1
 * contract fixture and makes two operations interactive — `recognition`
 * (tap-to-reveal) and `fill` (type-and-check against a normalized targetText).
 * `build` / `register_switch` / `context_chain` render as read-only cards for now.
 *
 * Hard boundaries (kept deliberately):
 *  - Imports ONLY React / React Native, Expo Router, and @/content/learning-engine.
 *  - No live lesson runtime (content/lessons/v1, components/lesson-v1, itemRegistry).
 *  - No AI, no network, no TTS / audio.
 *  - Local component state only — no persistence, no mastery, no events.
 *
 * Hidden route: reachable only by deep link at /dev/learning-engine-player. It is
 * NOT in the tab bar and is NOT linked from Home. Do not wire it into public
 * navigation.
 */
import { useState, type ReactNode } from "react";
import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  L1_CONTENT_FIXTURE,
  checkAnswer,
  type ExerciseBlueprint,
} from "@/content/learning-engine";

type RecognitionEx = Extract<ExerciseBlueprint, { operation: "recognition" }>;
type FillEx = Extract<ExerciseBlueprint, { operation: "fill" }>;

type Tone = "neutral" | "green" | "amber" | "red" | "purple";

const TONE: Record<Tone, { box: string; text: string }> = {
  neutral: { box: "bg-lm-paper border-lm-border", text: "text-lm-ink2" },
  green: { box: "bg-lm-green-light border-lm-green", text: "text-lm-green" },
  amber: { box: "bg-lm-amber-light border-lm-amber", text: "text-lm-amber" },
  red: { box: "bg-lm-red-light border-lm-red-border", text: "text-lm-red" },
  purple: { box: "bg-lm-purple-light border-lm-purple", text: "text-lm-purple" },
};

function Badge({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return (
    <View
      className={`self-start rounded-full border px-2 py-0.5 ${TONE[tone].box}`}
    >
      <Text className={`font-outfit text-xs ${TONE[tone].text}`}>{label}</Text>
    </View>
  );
}

function CardShell({
  ex,
  children,
}: {
  ex: ExerciseBlueprint;
  children: ReactNode;
}) {
  return (
    <View className="mb-3 rounded-2xl border border-lm-border bg-lm-paper p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-outfit text-xs text-lm-ink3">{ex.id}</Text>
        <Badge label={ex.operation} tone="purple" />
      </View>
      {ex.prompt ? (
        <Text className="mb-2 font-newsreader text-lg text-lm-ink">
          {ex.prompt}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

/** recognition — tap to reveal the meaning (displayAnswer) or canonical answer. */
function RecognitionCard({ ex }: { ex: RecognitionEx }) {
  const [revealed, setRevealed] = useState(false);
  const answer = ex.displayAnswer ?? ex.targetText ?? "—";
  const answerLabel = ex.displayAnswer ? "meaning" : "answer";

  return (
    <CardShell ex={ex}>
      {revealed ? (
        <View className="rounded-xl border border-lm-green bg-lm-green-light p-3">
          <Text className="font-outfit text-xs text-lm-ink3">{answerLabel}</Text>
          <Text className="mt-0.5 font-newsreader text-lg text-lm-ink">
            {answer}
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={() => setRevealed(true)}
          className="rounded-xl border border-lm-border bg-lm-bg p-3"
        >
          <Text className="text-center font-outfit text-sm text-lm-red">
            Tap to reveal
          </Text>
        </Pressable>
      )}
      {revealed ? (
        <Pressable
          onPress={() => setRevealed(false)}
          hitSlop={8}
          className="mt-2 self-end"
        >
          <Text className="font-outfit text-xs text-lm-ink3">Hide</Text>
        </Pressable>
      ) : null}
    </CardShell>
  );
}

/** fill — type an answer and check it against the normalized targetText. */
function FillCard({ ex }: { ex: FillEx }) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  const correct = checkAnswer(input, ex.targetText);
  const showResult = checked && input.trim().length > 0;

  return (
    <CardShell ex={ex}>
      {ex.blankLabel ? (
        <Text className="mb-1 font-outfit text-xs text-lm-ink3">
          blank: {ex.blankLabel}
        </Text>
      ) : null}
      <TextInput
        value={input}
        onChangeText={(text) => {
          setInput(text);
          setChecked(false);
        }}
        placeholder="Type your answer…"
        autoCapitalize="none"
        autoCorrect={false}
        className="rounded-xl border border-lm-border bg-lm-bg px-3 py-2 font-newsreader text-lg text-lm-ink"
      />
      <Pressable
        onPress={() => setChecked(true)}
        className="mt-2 self-start rounded-full border border-lm-red px-4 py-1.5"
      >
        <Text className="font-outfit text-sm text-lm-red">Check</Text>
      </Pressable>
      {showResult ? (
        <View
          className={`mt-2 rounded-xl border p-3 ${
            correct
              ? "border-lm-green bg-lm-green-light"
              : "border-lm-amber bg-lm-amber-light"
          }`}
        >
          <Text
            className={`font-outfit text-sm ${
              correct ? "text-lm-green" : "text-lm-amber"
            }`}
          >
            {correct ? "Matches the expected answer." : "Not a match yet."}
          </Text>
          {!correct && ex.targetText ? (
            <Text className="mt-1 font-outfit text-xs text-lm-ink3">
              expected: {ex.targetText}
            </Text>
          ) : null}
        </View>
      ) : null}
    </CardShell>
  );
}

/** build / register_switch / context_chain — shown read-only in v0. */
function ReadOnlyCard({ ex }: { ex: ExerciseBlueprint }) {
  return (
    <CardShell ex={ex}>
      <Badge label="read-only in v0" tone="neutral" />
      {ex.targetText ? (
        <Text className="mt-2 font-newsreader text-base text-lm-ink2">
          {ex.targetText}
        </Text>
      ) : null}
      {ex.operation === "register_switch" ? (
        <Text className="mt-1 font-outfit text-xs text-lm-ink3">
          {ex.directForm} → {ex.politeForm}
        </Text>
      ) : null}
      {ex.operation === "context_chain" ? (
        <View className="mt-1">
          {ex.steps.map((step, i) => (
            <Text
              key={`${ex.id}-step-${i}`}
              className="font-outfit text-xs text-lm-ink2"
            >
              {i + 1}. {step.prompt} → {step.answer}
            </Text>
          ))}
        </View>
      ) : null}
      {ex.operation === "build" ? (
        <Text className="mt-1 font-outfit text-xs text-lm-ink3">
          build interaction needs tile data — deferred to a later slice.
        </Text>
      ) : null}
    </CardShell>
  );
}

function ExerciseCard({ ex }: { ex: ExerciseBlueprint }) {
  switch (ex.operation) {
    case "recognition":
      return <RecognitionCard ex={ex} />;
    case "fill":
      return <FillCard ex={ex} />;
    default:
      return <ReadOnlyCard ex={ex} />;
  }
}

export default function LearningEnginePlayerScreen() {
  // Dev-only guard: this route resolves by deep link in any build. Never render
  // the interactive player in production. Mirrors the read-only preview guard.
  if (!__DEV__) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-lm-bg px-6">
        <Text className="text-center font-outfit text-sm text-lm-ink2">
          Developer player is unavailable in this build.
        </Text>
      </SafeAreaView>
    );
  }

  const contract = L1_CONTENT_FIXTURE.contracts[0];
  const exercises = L1_CONTENT_FIXTURE.exercises;

  return (
    <SafeAreaView className="flex-1 bg-lm-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
        {router.canGoBack() ? (
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text className="font-outfit text-sm text-lm-red">‹ Back</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Badge label="DEV ONLY · INTERACTIVE" tone="red" />
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 64 }}
      >
        <View className="mb-4">
          <Text className="font-newsreader text-2xl text-lm-ink">
            Learning-Engine Player · {contract.id}
          </Text>
          <Text className="mt-1 font-outfit text-xs text-lm-ink3">
            Dev-only interactive slice. Not the live lesson renderer. Recognition
            (reveal) and fill (type / check) are interactive; build, register
            switch, and context chain are read-only for now. Local state only —
            nothing is saved.
          </Text>
        </View>

        <View className="mb-4 rounded-2xl border border-lm-border bg-lm-paper p-4">
          <Text className="font-outfit text-xs font-semibold text-lm-ink2">
            canDo
          </Text>
          <Text className="mt-0.5 font-outfit text-sm text-lm-ink2">
            {contract.goal.canDo}
          </Text>
        </View>

        {exercises.map((ex) => (
          <ExerciseCard key={ex.id} ex={ex} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
