import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { P } from "@/constants/theme";
import { Btn } from "@/components/Btn";
import { kvStorage } from "@/lib/storage";

const SEEN_HOW_WEAVE_KEY = "lm7_seen_how_weave_works";

type Card = {
  title: string;
  body: string;
  example?: string;
};

const CARDS: Card[] = [
  {
    title: "You can start before you know everything.",
    body: "Use the pieces you have. English can hold the space while French grows.",
  },
  {
    title: "Use the French pieces you already have.",
    body: "A mixed sentence is allowed while you are learning.",
    example: "Je voudrais a coffee, s'il vous plaît",
  },
  {
    title: "Then Le Mot shows the natural French version.",
    body: "After you try, you will see how the sentence lands in French.",
    example: "Je voudrais un café, s'il vous plaît.",
  },
];

export default function HowWeaveWorksScreen() {
  const finish = () => {
    // Persist BEFORE navigation so Home's mount-time check sees the flag
    // and does not redirect back into this interstitial.
    try {
      kvStorage.setItem(SEEN_HOW_WEAVE_KEY, "true");
    } catch (e) {
      console.warn("[HowWeaveWorks] Failed to save first-use flag:", e);
    }
    router.replace("/(tabs)" as never);
  };

  return (
    <SafeAreaView className="flex-1 bg-lm-bg">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
          justifyContent: "center",
        }}
      >
        <Text style={headingStyle}>How Weave works</Text>

        <View style={{ gap: 12, marginTop: 8 }}>
          {CARDS.map((card, i) => (
            <View key={i} style={cardStyle}>
              <Text style={cardTitleStyle}>{card.title}</Text>
              <Text style={cardBodyStyle}>{card.body}</Text>
              {card.example && (
                <Text style={exampleStyle}>{card.example}</Text>
              )}
            </View>
          ))}
        </View>

        <Text style={noteStyle}>No score.{"\n"}No correction pressure.</Text>

        <Btn onPress={finish}>Continue</Btn>
      </ScrollView>
    </SafeAreaView>
  );
}

const headingStyle = {
  fontSize: 24,
  fontWeight: "700" as const,
  color: P.ink,
  textAlign: "center" as const,
  marginBottom: 8,
};

const cardStyle = {
  width: "100%" as const,
  padding: 16,
  borderRadius: 12,
  backgroundColor: P.paper,
  borderWidth: 1,
  borderColor: P.border,
};

const cardTitleStyle = {
  fontSize: 16,
  fontWeight: "600" as const,
  color: P.ink,
  marginBottom: 6,
  lineHeight: 22,
};

const cardBodyStyle = {
  fontSize: 14,
  color: P.ink2,
  lineHeight: 20,
};

const exampleStyle = {
  fontSize: 16,
  fontFamily: "Newsreader",
  fontStyle: "italic" as const,
  color: P.ink,
  marginTop: 10,
  lineHeight: 24,
};

const noteStyle = {
  fontSize: 13,
  color: P.ink3,
  textAlign: "center" as const,
  lineHeight: 20,
  marginTop: 20,
};
