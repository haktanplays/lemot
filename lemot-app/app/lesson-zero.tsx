import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Volume2, Check, ArrowRight } from "lucide-react-native";
import { P } from "@/constants/theme";
import { Btn } from "@/components/Btn";
import { useSpeech } from "@/hooks/useSpeech";
import { norm } from "@/lib/normalize";
import { kvStorage } from "@/lib/storage";

const SEEN_LESSON_ZERO_KEY = "lm7_seen_lesson_zero";

type Step =
  | "mcq"
  | "mcq_feedback"
  | "weave_reveal"
  | "full_listen"
  | "comprehension"
  | "comprehension_feedback"
  | "build"
  | "build_feedback"
  | "write"
  | "write_feedback"
  | "final";

const MCQ_OPTIONS = ["suis", "veux", "voudrais", "comprends"];
const MCQ_CORRECT = "voudrais";

const COMP_OPTIONS = ["Greeting", "Ordering coffee", "Asking direction"];
const COMP_CORRECT = "Ordering coffee";

const TARGET_TILES = ["Bonjour", "Je", "voudrais", "un", "café"];
const TARGET_BUILD = TARGET_TILES.join(" ");
const FRENCH_SENTENCE = "Bonjour, je voudrais un café.";

const WRITE_ACCEPTED = [
  "bonjour je voudrais un cafe",
  "bonjour, je voudrais un cafe",
  "bonjour je voudrais un café",
  "bonjour, je voudrais un café",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function LessonZeroScreen() {
  const { say } = useSpeech();
  const [step, setStep] = useState<Step>("mcq");

  // MCQ
  const [mcqPick, setMcqPick] = useState<string | null>(null);

  // Comprehension
  const [compPick, setCompPick] = useState<string | null>(null);

  // Build — tiles addressed by index into a stable shuffled list
  const shuffledTiles = useMemo(() => shuffle(TARGET_TILES), []);
  const [placed, setPlaced] = useState<number[]>([]);
  const buildArrangement = placed.map((i) => shuffledTiles[i]).join(" ");
  const buildCorrect = buildArrangement === TARGET_BUILD;

  // Write
  const [writeInput, setWriteInput] = useState("");
  const writeCorrect = WRITE_ACCEPTED.some(
    (a) => norm(a) === norm(writeInput)
  );

  const finish = () => {
    // Persist BEFORE navigation so Home's mount-time check sees the flag
    // and does not redirect back into lesson-zero.
    try {
      kvStorage.setItem(SEEN_LESSON_ZERO_KEY, "true");
    } catch (e) {
      console.warn("[LessonZero] Failed to save first-use flag:", e);
    }
    router.replace("/lesson/1");
  };

  // ─── Step renders ───

  const renderMcq = () => (
    <View style={center}>
      <Text style={titleStyle}>Tap the polite verb.</Text>
      <Text style={sentenceStyle}>&quot;I ___ a coffee&quot;</Text>
      <View style={{ width: "100%", gap: 10, marginTop: 24 }}>
        {MCQ_OPTIONS.map((opt) => (
          <Pressable
            key={opt}
            onPress={() => {
              setMcqPick(opt);
              setStep("mcq_feedback");
            }}
            style={optionStyle}
          >
            <Text style={optionTextStyle}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderMcqFeedback = () => {
    const isCorrect = mcqPick === MCQ_CORRECT;
    return (
      <View style={center}>
        {isCorrect && <Badge label="You got it" />}
        <Text style={titleStyle}>
          Correct answer:{" "}
          <Text style={{ fontStyle: "italic" }}>voudrais</Text>
        </Text>
        <Text style={hintStyle}>
          In French, politeness lives in the verb.
        </Text>
        <Btn onPress={() => setStep("weave_reveal")}>Continue</Btn>
      </View>
    );
  };

  const renderWeaveReveal = () => (
    <View style={center}>
      <Text style={sentenceStyle}>&quot;I voudrais a coffee&quot;</Text>
      <Text style={hintStyle}>You already know more than you think.</Text>
      <Btn onPress={() => setStep("full_listen")}>Continue</Btn>
    </View>
  );

  const renderFullListen = () => (
    <View style={center}>
      <Text style={sentenceStyle}>
        &quot;Bonjour, je voudrais un café&quot;
      </Text>
      <Pressable onPress={() => say(FRENCH_SENTENCE)} style={listenStyle}>
        <Volume2 size={16} color={P.ink2} />
        <Text style={{ color: P.ink2, fontSize: 14, fontWeight: "600" }}>
          Listen
        </Text>
      </Pressable>
      <Btn onPress={() => setStep("comprehension")}>Continue</Btn>
    </View>
  );

  const renderComprehension = () => (
    <View style={center}>
      <Text style={titleStyle}>What are you doing?</Text>
      <View style={{ width: "100%", gap: 10, marginTop: 16 }}>
        {COMP_OPTIONS.map((opt) => (
          <Pressable
            key={opt}
            onPress={() => {
              setCompPick(opt);
              setStep("comprehension_feedback");
            }}
            style={optionStyle}
          >
            <Text style={optionTextStyle}>{opt}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderComprehensionFeedback = () => {
    const isCorrect = compPick === COMP_CORRECT;
    return (
      <View style={center}>
        {isCorrect && <Badge label="Right" />}
        <Text style={titleStyle}>
          You&apos;re{" "}
          <Text style={{ fontStyle: "italic" }}>ordering coffee</Text>.
        </Text>
        <Btn onPress={() => setStep("build")}>Continue</Btn>
      </View>
    );
  };

  const renderBuild = () => (
    <View style={center}>
      <Text style={titleStyle}>Build the sentence.</Text>

      {/* Placed tiles (the sentence so far) */}
      <View style={placedTrayStyle}>
        {placed.length === 0 && (
          <Text style={{ color: P.ink3, fontSize: 13 }}>
            Tap tiles below…
          </Text>
        )}
        {placed.map((i) => (
          <Pressable
            key={i}
            onPress={() => setPlaced(placed.filter((x) => x !== i))}
            style={tilePlacedStyle}
          >
            <Text style={tileTextStyle}>{shuffledTiles[i]}</Text>
          </Pressable>
        ))}
      </View>

      {/* Available tiles */}
      <View style={tileRowStyle}>
        {shuffledTiles.map((t, i) => {
          if (placed.includes(i)) return null;
          return (
            <Pressable
              key={i}
              onPress={() => setPlaced([...placed, i])}
              style={tileAvailStyle}
            >
              <Text style={tileTextStyle}>{t}</Text>
            </Pressable>
          );
        })}
      </View>

      <Btn
        onPress={() => setStep("build_feedback")}
        disabled={placed.length !== TARGET_TILES.length}
      >
        Check
      </Btn>
    </View>
  );

  const renderBuildFeedback = () => (
    <View style={center}>
      {buildCorrect && <Badge label="Built" />}
      <Text style={sentenceStyle}>
        &quot;Bonjour, je voudrais un café&quot;
      </Text>
      <Btn onPress={() => setStep("write")}>Continue</Btn>
    </View>
  );

  const renderWrite = () => (
    <View style={center}>
      <Text style={titleStyle}>Type it yourself.</Text>
      <Text style={hintStyle}>Greet + order coffee.</Text>
      <TextInput
        value={writeInput}
        onChangeText={setWriteInput}
        placeholder="Bonjour..."
        placeholderTextColor={P.ink3}
        autoCapitalize="none"
        autoCorrect={false}
        style={inputStyle}
      />
      <Btn
        onPress={() => setStep("write_feedback")}
        disabled={writeInput.trim().length === 0}
      >
        Check
      </Btn>
    </View>
  );

  const renderWriteFeedback = () => (
    <View style={center}>
      {writeCorrect && <Badge label="Nailed it" />}
      <Text style={sentenceStyle}>
        &quot;Bonjour, je voudrais un café&quot;
      </Text>
      <Btn onPress={() => setStep("final")}>Continue</Btn>
    </View>
  );

  const renderFinal = () => (
    <View style={center}>
      <Text style={finalTitleStyle}>Used. Not memorized.</Text>
      <Text style={finalSubStyle}>You just built real French.</Text>
      <Btn onPress={finish}>
        <Text className="text-white text-sm font-semibold">
          Start Lesson 1
        </Text>
        <ArrowRight size={16} color="white" />
      </Btn>
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case "mcq":
        return renderMcq();
      case "mcq_feedback":
        return renderMcqFeedback();
      case "weave_reveal":
        return renderWeaveReveal();
      case "full_listen":
        return renderFullListen();
      case "comprehension":
        return renderComprehension();
      case "comprehension_feedback":
        return renderComprehensionFeedback();
      case "build":
        return renderBuild();
      case "build_feedback":
        return renderBuildFeedback();
      case "write":
        return renderWrite();
      case "write_feedback":
        return renderWriteFeedback();
      case "final":
        return renderFinal();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {renderStep()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <View style={badgeStyle}>
      <Check size={14} color={P.green} />
      <Text style={{ color: P.green, fontSize: 12, fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}

// ─── Styles ───

const center = {
  flex: 1,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

const titleStyle = {
  fontSize: 18,
  fontWeight: "600" as const,
  color: P.ink,
  textAlign: "center" as const,
  marginBottom: 12,
};

const sentenceStyle = {
  fontSize: 24,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  textAlign: "center" as const,
  marginBottom: 16,
  lineHeight: 32,
};

const hintStyle = {
  fontSize: 14,
  color: P.ink2,
  textAlign: "center" as const,
  marginBottom: 24,
  lineHeight: 20,
};

const optionStyle = {
  width: "100%" as const,
  paddingVertical: 14,
  borderRadius: 12,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  alignItems: "center" as const,
};

const optionTextStyle = {
  fontSize: 16,
  color: P.ink,
  fontWeight: "500" as const,
};

const listenStyle = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  gap: 6,
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 8,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  marginBottom: 24,
};

const badgeStyle = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  gap: 4,
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 12,
  backgroundColor: P.green + "15",
  marginBottom: 12,
};

const placedTrayStyle = {
  minHeight: 64,
  width: "100%" as const,
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center" as const,
  gap: 8,
  padding: 12,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  borderRadius: 12,
  marginTop: 16,
  marginBottom: 16,
};

const tileRowStyle = {
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  gap: 8,
  width: "100%" as const,
  justifyContent: "center" as const,
};

const tileAvailStyle = {
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: P.paper,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: P.border,
};

const tilePlacedStyle = {
  paddingHorizontal: 12,
  paddingVertical: 8,
  backgroundColor: P.red + "15",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: P.red + "40",
};

const tileTextStyle = {
  color: P.ink,
  fontSize: 15,
  fontWeight: "500" as const,
};

const inputStyle = {
  width: "100%" as const,
  padding: 14,
  fontSize: 16,
  borderRadius: 12,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
  color: P.ink,
  marginBottom: 8,
};

const finalTitleStyle = {
  fontSize: 26,
  fontWeight: "700" as const,
  color: P.ink,
  textAlign: "center" as const,
  marginBottom: 12,
};

const finalSubStyle = {
  fontSize: 15,
  color: P.ink2,
  textAlign: "center" as const,
  marginBottom: 32,
  lineHeight: 22,
};
