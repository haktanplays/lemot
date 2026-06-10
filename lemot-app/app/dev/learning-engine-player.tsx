/**
 * Dev-only INTERACTIVE renderer slice for the learning-engine fixtures.
 *
 * This is a dev experiment, NOT the live lesson renderer. It mounts a dev-only
 * selectable fixture (L1 / L11 / L12 / L14 / L15 / L16 / L18 — default L1) and makes five
 * operations interactive — `recognition`
 * (tap-to-reveal), `fill` and `register_switch` (type-and-check against a
 * normalized target), `context_chain` (a per-step type-and-check stepper), and
 * `build` (assemble item tiles in order — surface text resolved from the item
 * registry; the answer is checked as a tile sequence, not by parsing targetText).
 * A `build` with no tiles still renders read-only.
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
import { router, Redirect } from "expo-router";
import { PRODUCT_STAGE } from "@/config/productStage";
import {
  L1_CONTENT_FIXTURE,
  L11_CONTENT_FIXTURE,
  L12_CONTENT_FIXTURE,
  L14_CONTENT_FIXTURE,
  L15_CONTENT_FIXTURE,
  L16_CONTENT_FIXTURE,
  L18_CONTENT_FIXTURE,
  checkAnswer,
  type ExerciseBlueprint,
  type RawItem,
} from "@/content/learning-engine";

type RecognitionEx = Extract<ExerciseBlueprint, { operation: "recognition" }>;
type FillEx = Extract<ExerciseBlueprint, { operation: "fill" }>;
type ContextChainEx = Extract<ExerciseBlueprint, { operation: "context_chain" }>;
type RegisterSwitchEx = Extract<
  ExerciseBlueprint,
  { operation: "register_switch" }
>;
type BuildEx = Extract<ExerciseBlueprint, { operation: "build" }>;

/** Item-id → registry item, for resolving tile surface text (`text.fr`). */
type ItemMap = Record<string, RawItem>;

/**
 * Dev-only fixture menu. Lets this one player mount L1 / L11 / L12 / L14 / L15 / L16 / L18 so
 * each lesson's interactive exercises (incl. build tiles) can be smoked without a
 * separate screen. These are validateable fixtures, not the live lesson runtime.
 */
const FIXTURES = [
  { id: "L1", fixture: L1_CONTENT_FIXTURE },
  { id: "L11", fixture: L11_CONTENT_FIXTURE },
  { id: "L12", fixture: L12_CONTENT_FIXTURE },
  { id: "L14", fixture: L14_CONTENT_FIXTURE },
  { id: "L15", fixture: L15_CONTENT_FIXTURE },
  { id: "L16", fixture: L16_CONTENT_FIXTURE },
  { id: "L18", fixture: L18_CONTENT_FIXTURE },
] as const;
type FixtureId = (typeof FIXTURES)[number]["id"];

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

/**
 * build — assemble item tiles in order, then check the assembled SEQUENCE
 * against the answer tiles (tiles with answerIndex, sorted). Surface text is
 * resolved from the item registry; targetText is never parsed. Local state only.
 */
function BuildCard({ ex, items }: { ex: BuildEx; items: ItemMap }) {
  const tiles = ex.tiles ?? [];
  const surface = (id: string): string => items[id]?.text.fr ?? id;

  // Correct answer = answer tiles (answerIndex defined) sorted by answerIndex.
  const answerIds = tiles
    .filter((t) => t.answerIndex !== undefined)
    .slice()
    .sort((a, b) => (a.answerIndex as number) - (b.answerIndex as number))
    .map((t) => t.itemId);

  // `picked` holds indices into `tiles` (display order) in the order tapped.
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const pickedIds = picked.map((i) => tiles[i].itemId);
  const correct =
    pickedIds.length === answerIds.length &&
    pickedIds.every((id, i) => id === answerIds[i]);
  const showResult = checked && picked.length > 0;
  const available = tiles.map((_, i) => i).filter((i) => !picked.includes(i));
  const expected = answerIds.map(surface).join(" ");

  return (
    <CardShell ex={ex}>
      <Text className="mb-1 font-outfit text-xs text-lm-ink3">your answer</Text>
      <View className="min-h-[44px] flex-row flex-wrap gap-2 rounded-xl border border-lm-border bg-lm-bg p-2">
        {picked.length === 0 ? (
          <Text className="font-outfit text-sm text-lm-ink3">
            tap tiles below…
          </Text>
        ) : (
          picked.map((tileIdx, pos) => (
            <Pressable
              key={`picked-${tileIdx}`}
              onPress={() => {
                setPicked(picked.filter((_, p) => p !== pos));
                setChecked(false);
              }}
              className="rounded-lg border border-lm-purple bg-lm-purple-light px-3 py-1.5"
            >
              <Text className="font-newsreader text-base text-lm-ink">
                {surface(tiles[tileIdx].itemId)}
              </Text>
            </Pressable>
          ))
        )}
      </View>

      <Text className="mb-1 mt-3 font-outfit text-xs text-lm-ink3">tiles</Text>
      <View className="flex-row flex-wrap gap-2">
        {available.map((i) => (
          <Pressable
            key={`tile-${i}`}
            onPress={() => {
              setPicked([...picked, i]);
              setChecked(false);
            }}
            className="rounded-lg border border-lm-border bg-lm-paper px-3 py-1.5"
          >
            <Text className="font-newsreader text-base text-lm-ink">
              {surface(tiles[i].itemId)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-3 flex-row gap-2">
        <Pressable
          onPress={() => setChecked(true)}
          className="self-start rounded-full border border-lm-red px-4 py-1.5"
        >
          <Text className="font-outfit text-sm text-lm-red">Check</Text>
        </Pressable>
        {picked.length > 0 ? (
          <Pressable
            onPress={() => {
              setPicked([]);
              setChecked(false);
            }}
            className="self-start rounded-full border border-lm-border px-4 py-1.5"
          >
            <Text className="font-outfit text-sm text-lm-ink2">Reset</Text>
          </Pressable>
        ) : null}
      </View>

      {showResult ? (
        <ResultBox
          correct={correct}
          successText="Built correctly."
          expected={expected}
        />
      ) : null}
    </CardShell>
  );
}

/** build without tiles — shown read-only (e.g. L14/L15/L18 in this slice). */
function ReadOnlyCard({ ex }: { ex: ExerciseBlueprint }) {
  return (
    <CardShell ex={ex}>
      <Badge label="read-only for now" tone="neutral" />
      {ex.targetText ? (
        <Text className="mt-2 font-newsreader text-base text-lm-ink2">
          {ex.targetText}
        </Text>
      ) : null}
      {ex.operation === "build" ? (
        <Text className="mt-1 font-outfit text-xs text-lm-ink3">
          build has no tiles in this fixture — read-only here.
        </Text>
      ) : null}
    </CardShell>
  );
}

function ExerciseCard({ ex, items }: { ex: ExerciseBlueprint; items: ItemMap }) {
  switch (ex.operation) {
    case "recognition":
      return <RecognitionCard ex={ex} />;
    case "fill":
      return <FillCard ex={ex} />;
    case "context_chain":
      return <ContextChainCard ex={ex} />;
    case "register_switch":
      return <RegisterSwitchCard ex={ex} />;
    case "build":
      // Interactive only when the build carries tiles; otherwise read-only.
      return ex.tiles && ex.tiles.length > 0 ? (
        <BuildCard ex={ex} items={items} />
      ) : (
        <ReadOnlyCard ex={ex} />
      );
    default:
      return <ReadOnlyCard ex={ex} />;
  }
}

export default function LearningEnginePlayerScreen() {
  // Sandbox + dev guard (defense in depth): this internal debug route resolves
  // by deep link in any build. It renders only in the sandbox stage AND a dev
  // build, so dev-apk, public-beta, and any release-like build (even sandbox
  // stage) redirect to Home. Mirrors the read-only preview guard and the
  // FEATURES-gated Practice/Chat tab redirects.
  if (!(PRODUCT_STAGE === "sandbox" && __DEV__)) {
    return <Redirect href={"/" as never} />;
  }

  // Dev-only local fixture selection (default L1). Switching fixtures re-keys the
  // cards below so each card's local state (revealed / input / picked tiles)
  // resets cleanly. No persistence.
  const [selectedId, setSelectedId] = useState<FixtureId>("L1");
  const active = FIXTURES.find((f) => f.id === selectedId) ?? FIXTURES[0];
  const contract = active.fixture.contracts[0];
  const exercises = active.fixture.exercises;
  const items = active.fixture.items;

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
            (reveal), fill, register switch (type / check), context chain
            (stepper), and build (assemble tiles) are interactive; a build with no
            tiles stays read-only. Local state only — nothing is saved.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="mb-1 font-outfit text-xs text-lm-ink3">fixture</Text>
          <View className="flex-row flex-wrap gap-2">
            {FIXTURES.map((f) => {
              const isActive = f.id === selectedId;
              return (
                <Pressable
                  key={f.id}
                  onPress={() => setSelectedId(f.id)}
                  className={`rounded-full border px-4 py-1.5 ${
                    isActive
                      ? "border-lm-red bg-lm-red-light"
                      : "border-lm-border bg-lm-paper"
                  }`}
                >
                  <Text
                    className={`font-outfit text-sm ${
                      isActive ? "text-lm-red" : "text-lm-ink2"
                    }`}
                  >
                    {f.id}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
          <ExerciseCard key={`${selectedId}-${ex.id}`} ex={ex} items={items} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
