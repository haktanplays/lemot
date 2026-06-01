/**
 * Dev-only INTERACTIVE renderer slice (v0) for the learning-engine L1 fixture.
 *
 * This is a dev experiment, NOT the live lesson renderer. It mounts ONLY the L1
 * contract fixture and makes four operations interactive — `recognition`
 * (tap-to-reveal), `fill` and `register_switch` (type-and-check against a
 * normalized target), and `context_chain` (a per-step type-and-check stepper).
 * `build` renders as a read-only card for now (needs tile data).
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
type ContextChainEx = Extract<ExerciseBlueprint, { operation: "context_chain" }>;
type RegisterSwitchEx = Extract<
  ExerciseBlueprint,
  { operation: "register_switch" }
>;

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

/** Shared green/amber verdict box for the type-and-check operations. */
function ResultBox({
  correct,
  successText,
  expected,
}: {
  correct: boolean;
  successText: string;
  expected?: string;
}) {
  return (
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
        {correct ? successText : "Not a match yet."}
      </Text>
      {!correct && expected ? (
        <Text className="mt-1 font-outfit text-xs text-lm-ink3">
          expected: {expected}
        </Text>
      ) : null}
    </View>
  );
}

/** context_chain — one step at a time; type/check each, then complete. */
function ContextChainCard({ ex }: { ex: ContextChainEx }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState(false);

  const steps = ex.steps;
  const step = steps[idx];
  const isLast = idx >= steps.length - 1;
  const correct = step ? checkAnswer(input, step.answer) : false;
  const showResult = checked && input.trim().length > 0;

  const advance = () => {
    if (isLast) {
      setCompleted(true);
    } else {
      setIdx(idx + 1);
      setInput("");
      setChecked(false);
    }
  };

  if (completed) {
    return (
      <CardShell ex={ex}>
        <View className="rounded-xl border border-lm-green bg-lm-green-light p-3">
          <Text className="font-outfit text-sm text-lm-green">
            Complete — all {steps.length} steps done.
          </Text>
          {ex.targetText ? (
            <Text className="mt-1 font-newsreader text-base text-lm-ink">
              {ex.targetText}
            </Text>
          ) : null}
        </View>
      </CardShell>
    );
  }

  return (
    <CardShell ex={ex}>
      <Text className="mb-1 font-outfit text-xs font-semibold text-lm-ink2">
        Step {idx + 1} / {steps.length}
      </Text>
      {step ? (
        <Text className="mb-2 font-newsreader text-base text-lm-ink">
          {step.prompt}
        </Text>
      ) : null}
      <TextInput
        value={input}
        onChangeText={(text) => {
          setInput(text);
          setChecked(false);
        }}
        placeholder="Type this step…"
        autoCapitalize="none"
        autoCorrect={false}
        className="rounded-xl border border-lm-border bg-lm-bg px-3 py-2 font-newsreader text-lg text-lm-ink"
      />
      <View className="mt-2 flex-row gap-2">
        <Pressable
          onPress={() => setChecked(true)}
          className="self-start rounded-full border border-lm-red px-4 py-1.5"
        >
          <Text className="font-outfit text-sm text-lm-red">Check</Text>
        </Pressable>
        {showResult && correct ? (
          <Pressable
            onPress={advance}
            className="self-start rounded-full border border-lm-green px-4 py-1.5"
          >
            <Text className="font-outfit text-sm text-lm-green">
              {isLast ? "Finish" : "Next step"}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {showResult ? (
        <ResultBox
          correct={correct}
          successText="Step matches — continue."
          expected={step?.answer}
        />
      ) : null}
    </CardShell>
  );
}

/** register_switch — read the too-direct form, type the polite form, check it. */
function RegisterSwitchCard({ ex }: { ex: RegisterSwitchEx }) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);

  const correct = checkAnswer(input, ex.politeForm);
  const showResult = checked && input.trim().length > 0;

  return (
    <CardShell ex={ex}>
      <View className="mb-2 rounded-xl border border-lm-border bg-lm-bg p-3">
        <Text className="font-outfit text-xs text-lm-ink3">too direct</Text>
        <Text className="mt-0.5 font-newsreader text-base text-lm-ink2">
          {ex.directForm}
        </Text>
      </View>
      <Text className="mb-1 font-outfit text-xs text-lm-ink3">
        Type the polite form:
      </Text>
      <TextInput
        value={input}
        onChangeText={(text) => {
          setInput(text);
          setChecked(false);
        }}
        placeholder="Type the polite form…"
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
        <ResultBox
          correct={correct}
          successText="Matches the polite form."
          expected={ex.politeForm}
        />
      ) : null}
    </CardShell>
  );
}

/** build — shown read-only in v0 (needs tile data). */
function ReadOnlyCard({ ex }: { ex: ExerciseBlueprint }) {
  return (
    <CardShell ex={ex}>
      <Badge label="read-only in v0" tone="neutral" />
      {ex.targetText ? (
        <Text className="mt-2 font-newsreader text-base text-lm-ink2">
          {ex.targetText}
        </Text>
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
    case "context_chain":
      return <ContextChainCard ex={ex} />;
    case "register_switch":
      return <RegisterSwitchCard ex={ex} />;
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
            (reveal), fill, context chain (stepper), and register switch (type /
            check) are interactive; build is read-only for now (needs tile data).
            Local state only — nothing is saved.
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
