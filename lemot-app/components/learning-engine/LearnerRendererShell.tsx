import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { P } from "@/constants/theme";
import type { ExerciseBlueprint, RawItem } from "@/content/learning-engine";
import { LearnerLessonHeader } from "./LearnerLessonHeader";
import { RecognitionCard } from "./RecognitionCard";
import { FillCard } from "./FillCard";
import { BuildCard } from "./BuildCard";
import { RegisterSwitchCard } from "./RegisterSwitchCard";
import { ContextChainCard } from "./ContextChainCard";
import { UnsupportedCard } from "./UnsupportedCard";

/**
 * Learner renderer shell (P3.5).
 *
 * Calm, premium, LABEL-FREE surface over a learning-engine fixture. It holds the
 * card-progression cursor and renders one card at a time: recognition, fill,
 * build, register_switch, and context_chain ("A small moment") are all
 * interactive (P3.3–P3.5); a tile-less build (and any future/unknown operation)
 * shows a learner-safe placeholder. The exercise id is used only as a React key
 * (never shown). No events, NO LocalRepository, NO scoreEvents()/mastery, NO
 * storage / network / AI — `grade()` (inside the input cards) drives on-screen
 * feedback only.
 */
function renderCard(ex: ExerciseBlueprint, items: Record<string, RawItem>) {
  switch (ex.operation) {
    case "recognition":
      return <RecognitionCard key={ex.id} exercise={ex} />;
    case "fill":
      return <FillCard key={ex.id} exercise={ex} />;
    case "build":
      return ex.tiles && ex.tiles.length > 0 ? (
        <BuildCard key={ex.id} exercise={ex} items={items} />
      ) : (
        <UnsupportedCard key={ex.id} />
      );
    case "register_switch":
      return <RegisterSwitchCard key={ex.id} exercise={ex} />;
    case "context_chain":
      return <ContextChainCard key={ex.id} exercise={ex} />;
    default:
      // Defensive: all current ExerciseBlueprint operations are handled above
      // (so `ex` is `never` here). Guards against a future operation variant.
      return <UnsupportedCard key="unsupported" />;
  }
}

export function LearnerRendererShell({
  canDo,
  exercises,
  items,
}: {
  canDo: string;
  exercises: ExerciseBlueprint[];
  items: Record<string, RawItem>;
}) {
  const [idx, setIdx] = useState(0);
  const total = exercises.length;
  const current = total > 0 ? exercises[idx] : undefined;

  return (
    <View style={screen}>
      <View style={body}>
        <LearnerLessonHeader canDo={canDo} />

        {current ? (
          <>
            <Text style={countText}>
              Card {idx + 1} of {total}
            </Text>

            <View style={{ flex: 1 }}>{renderCard(current, items)}</View>

            <View style={navRow}>
              <Pressable
                disabled={idx === 0}
                onPress={() => setIdx((i) => Math.max(0, i - 1))}
                style={[navBtn, idx === 0 ? dimmed : null]}
              >
                <Text style={navText}>Back</Text>
              </Pressable>
              <Pressable
                disabled={idx >= total - 1}
                onPress={() => setIdx((i) => Math.min(total - 1, i + 1))}
                style={[navBtn, idx >= total - 1 ? dimmed : null]}
              >
                <Text style={navText}>Next</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={placeholderArea}>
            <View style={placeholderCard}>
              <Text style={placeholderKicker}>Coming up</Text>
              <Text style={placeholderBody}>
                Your first card will appear here.
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const screen: ViewStyle = { flex: 1, backgroundColor: P.bg, paddingTop: 64 };
const body: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
  paddingBottom: 24,
  gap: 16,
};
const countText: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  fontFamily: "Outfit",
};
const navRow: ViewStyle = { flexDirection: "row", justifyContent: "space-between" };
const navBtn: ViewStyle = {
  borderRadius: 999,
  borderWidth: 1,
  borderColor: P.border,
  paddingHorizontal: 20,
  paddingVertical: 9,
};
const dimmed: ViewStyle = { opacity: 0.4 };
const navText: TextStyle = { color: P.ink2, fontSize: 14, fontFamily: "Outfit" };
const placeholderArea: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
const placeholderCard: ViewStyle = {
  width: "100%",
  borderRadius: 16,
  borderWidth: 1,
  borderColor: P.border,
  backgroundColor: P.paper,
  padding: 24,
  gap: 6,
};
const placeholderKicker: TextStyle = {
  color: P.ink3,
  fontSize: 13,
  fontFamily: "Outfit",
};
const placeholderBody: TextStyle = {
  color: P.ink2,
  fontSize: 16,
  lineHeight: 24,
  fontFamily: "Newsreader",
};
