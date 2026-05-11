import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { P } from "@/constants/theme";
import { kvStorage } from "@/lib/storage";

const SEEN_HOW_WEAVE_KEY = "lm7_seen_how_weave_works";

type Card = {
  title: string;
  body: string;
  example?: string;
};

const CARDS: Card[] = [
  {
    title: "You do not need perfect French yet.",
    body: "Use the French pieces you know. Leave the rest in English.",
  },
  {
    title: "Keep the thought moving.",
    body: 'If you know "bonjour" and "je voudrais", use them. The missing parts can stay in English for now.',
    example: "Bonjour, je voudrais a coffee, please.",
  },
  {
    title: "Le Mot will show the natural French.",
    body: "After you try, you will see how the sentence lands in French.",
    example: "Bonjour, je voudrais un café, s'il vous plaît.",
  },
];

export default function HowWeaveWorksScreen() {
  const [idx, setIdx] = useState(0);
  const card = CARDS[idx];
  const isLast = idx === CARDS.length - 1;
  const isFirst = idx === 0;

  // Hardware back must not exit before the flag is persisted; Home would
  // otherwise re-route here on the next open and trap the user. Carousel
  // back moves to the previous card; first card swallows the press.
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (idx > 0) {
        setIdx(idx - 1);
      }
      return true;
    });
    return () => sub.remove();
  }, [idx]);

  const handleContinue = () => {
    if (!isLast) {
      setIdx(idx + 1);
      return;
    }
    try {
      kvStorage.setItem(SEEN_HOW_WEAVE_KEY, "true");
    } catch (e) {
      console.warn("[HowWeaveWorks] failed to save flag", e);
    }
    router.replace("/lesson/1");
  };

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        {/* Progress dots */}
        <View style={dotsRow}>
          {CARDS.map((_, i) => (
            <View
              key={i}
              style={{
                ...dotBase,
                backgroundColor: i === idx ? P.red : P.border,
                width: i === idx ? 24 : 8,
              }}
            />
          ))}
        </View>

        {/* Card content */}
        <View style={cardContainer}>
          <Text style={titleStyle}>{card.title}</Text>
          <Text style={bodyStyle}>{card.body}</Text>
          {card.example && (
            <View style={exampleBox}>
              <Text style={exampleStyle}>{card.example}</Text>
            </View>
          )}
        </View>

        {/* Buttons */}
        <View style={{ width: "100%", gap: 10, marginTop: 32 }}>
          <Pressable onPress={handleContinue} style={primaryBtn}>
            <Text style={primaryBtnText}>
              {isLast ? "Start Lesson 1" : "Continue"}
            </Text>
            <ArrowRight size={16} color="#fff" />
          </Pressable>
          {!isFirst && (
            <Pressable
              onPress={() => setIdx(idx - 1)}
              style={secondaryBtn}
            >
              <ArrowLeft size={14} color={P.ink2} />
              <Text style={secondaryBtnText}>Back</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const dotsRow = {
  flexDirection: "row" as const,
  justifyContent: "center" as const,
  gap: 6,
  marginBottom: 40,
};

const dotBase = {
  height: 8,
  borderRadius: 4,
};

const cardContainer = {
  flex: 1,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  paddingHorizontal: 8,
};

const titleStyle = {
  fontSize: 24,
  fontWeight: "700" as const,
  color: P.ink,
  textAlign: "center" as const,
  marginBottom: 16,
  lineHeight: 32,
};

const bodyStyle = {
  fontSize: 16,
  color: P.ink2,
  textAlign: "center" as const,
  lineHeight: 24,
  marginBottom: 20,
};

const exampleBox = {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: P.paper,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: P.border,
  marginTop: 8,
};

const exampleStyle = {
  fontSize: 15,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  textAlign: "center" as const,
  lineHeight: 22,
};

const primaryBtn = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  gap: 8,
  paddingVertical: 14,
  borderRadius: 12,
  backgroundColor: P.red,
};

const primaryBtnText = {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600" as const,
};

const secondaryBtn = {
  flexDirection: "row" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  gap: 6,
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
};

const secondaryBtnText = {
  color: P.ink2,
  fontSize: 14,
  fontWeight: "500" as const,
};
