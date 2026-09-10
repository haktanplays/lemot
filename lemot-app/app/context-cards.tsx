/**
 * Context Cards — the INPUT surface.
 *
 * Nothing here is asked, typed, scored or marked. There is no correct answer on
 * this screen because there is no question on it: a card shows a piece of
 * French the learner has not been taught, in a situation that makes them want
 * it, next to an engine they already own.
 *
 * A set only appears once its engine is genuinely the learner's, so this can
 * never become a vocabulary list bolted onto the side of the path. Opening a
 * card records EXPOSURE, in its own store, which is the weakest honest record
 * there is and can never reach a production metric. See
 * `lib/contextCardExposure.ts` for why that separation is structural.
 *
 * Not a tab. The shell stays as it is, and this is reached from Journey.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Volume2 } from "lucide-react-native";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import { useSpeech } from "@/hooks/useSpeech";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { reachedItemIds } from "@/content/practice/practicePlanner";
import { QuietState } from "@/components/ui/StandingSurface";
import {
  availableContextCardSets,
  type ContextCard,
  type ContextCardSet,
} from "@/content/context-cards/cards";
import {
  privacyResetEpoch,
  readContextCardExposure,
  recordCardMet,
  type ContextCardExposure,
} from "@/lib/contextCardExposure";

type State =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; sets: ContextCardSet[] };

export default function ContextCardsRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const { say } = useSpeech();
  const [state, setState] = useState<State>({ phase: "loading" });
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [met, setMet] = useState<ContextCardExposure>({});
  const loadToken = useRef(0);
  // The epoch this screen has acknowledged, so a write started before a privacy
  // reset cannot resurrect what the user deleted.
  const epoch = useRef(privacyResetEpoch());

  const load = useCallback(() => {
    const token = ++loadToken.current;
    setState({ phase: "loading" });
    runtime
      .readPracticeReach()
      .then(({ snapshot }) => {
        if (loadToken.current !== token) return;
        setState({ phase: "ready", sets: availableContextCardSets(reachedItemIds(snapshot)) });
        setMet(readContextCardExposure());
      })
      .catch(() => {
        if (loadToken.current === token) setState({ phase: "error" });
      });
  }, [runtime]);

  useEffect(() => {
    epoch.current = privacyResetEpoch();
    load();
    return () => {
      loadToken.current += 1;
    };
  }, [load, generation]);

  const open = useCallback(
    (card: ContextCard) => {
      const next = openCardId === card.id ? null : card.id;
      setOpenCardId(next);
      // Meeting is the act. Opening a card is when the French is actually in
      // front of the learner, so that is when exposure is true.
      if (next !== null) setMet(recordCardMet(card.id, Date.now(), epoch.current));
    },
    [openCardId],
  );

  const sets = state.phase === "ready" ? state.sets : [];
  const metCount = useMemo(
    () => sets.flatMap((s) => s.cards).filter((c) => met[c.id] !== undefined).length,
    [sets, met],
  );

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SPACE.sm,
          paddingHorizontal: SPACE.xl,
          paddingBottom: SPACE.md,
        }}
      >
        <Pressable onPress={() => router.back()} hitSlop={12} accessibilityRole="button" accessibilityLabel="Back">
          <ChevronLeft size={22} color={P.ink2} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: P.ink, fontFamily: "serif", fontSize: 22, lineHeight: 30 }}>
            Context Cards
          </Text>
          <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 19 }}>
            A little more French, for sentences you can already say.
          </Text>
        </View>
      </View>

      {state.phase === "loading" && <QuietState tone="waiting" text={"Looking at what you can already say…"} />}
      {state.phase === "error" && (
        <QuietState text="Context Cards are resting for a moment. Come back shortly." />
      )}
      {state.phase === "ready" && sets.length === 0 && (
        <QuietState
          text={
            "These open up as your sentences do. Finish a lesson or two and there will be somewhere to put the new words."
          }
        />
      )}

      {state.phase === "ready" && sets.length > 0 && (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: SPACE.xl,
            paddingTop: SPACE.sm,
            paddingBottom: SPACE.xxl,
          }}
        >
          {/* Nothing is scored, so this is the only number on the screen, and
              it counts meetings rather than achievements. */}
          <Text style={{ color: P.ink3, fontSize: 13, lineHeight: 20, marginBottom: SPACE.lg }}>
            {metCount === 0
              ? "Nothing met yet. Tap anything that looks useful."
              : `You have met ${metCount} of these so far. Nothing here is tested.`}
          </Text>

          {sets.map((set) => (
            <View key={set.id} style={{ marginBottom: SPACE.xxl }}>
              <Text style={{ color: P.ink3, fontSize: 12, letterSpacing: 0.3 }}>{set.label}</Text>
              <Text
                style={{
                  color: P.ink,
                  fontFamily: "serif",
                  fontSize: 17,
                  lineHeight: frenchLineHeight(17),
                  marginTop: 2,
                }}
              >
                {set.engine}
              </Text>
              <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21, marginTop: SPACE.sm }}>
                {set.intro}
              </Text>

              <View style={{ marginTop: SPACE.md }}>
                {set.cards.map((card, i) => {
                  const isOpen = openCardId === card.id;
                  const seen = met[card.id] !== undefined;
                  return (
                    <View
                      key={card.id}
                      style={{
                        borderTopWidth: i === 0 ? 0 : 1,
                        borderTopColor: P.border,
                        paddingVertical: SPACE.sm + 2,
                      }}
                    >
                      <Pressable
                        onPress={() => open(card)}
                        accessibilityRole="button"
                        accessibilityState={{ expanded: isOpen }}
                        accessibilityLabel={`${card.cue} ${isOpen ? "Hide" : "Show"} the French`}
                      >
                        <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
                          {card.cue}
                        </Text>
                        {!isOpen && (
                          <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 18, marginTop: 2 }}>
                            {seen ? "Met" : "Tap to see the French"}
                          </Text>
                        )}
                      </Pressable>

                      {isOpen && (
                        <View style={{ marginTop: SPACE.sm, gap: SPACE.sm - 2 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: SPACE.sm }}>
                            <Text
                              style={{
                                color: P.ink,
                                fontFamily: "serif",
                                fontSize: 20,
                                lineHeight: frenchLineHeight(20),
                              }}
                            >
                              {card.fr}
                            </Text>
                            <Pressable
                              onPress={() => say(card.fr)}
                              hitSlop={10}
                              accessibilityRole="button"
                              accessibilityLabel={`Listen to ${card.fr}`}
                            >
                              <Volume2 size={15} color={P.ink3} />
                            </Pressable>
                          </View>
                          <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>{card.en}</Text>
                          {Boolean(card.sound) && (
                            <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 18 }}>
                              {card.sound}
                            </Text>
                          )}
                          {card.example !== undefined && (
                            <View
                              style={{
                                backgroundColor: P.paper,
                                borderRadius: 8,
                                paddingHorizontal: SPACE.sm,
                                paddingVertical: SPACE.sm - 2,
                              }}
                            >
                              <Text
                                style={{
                                  color: P.ink,
                                  fontFamily: "serif",
                                  fontSize: 15,
                                  lineHeight: frenchLineHeight(15),
                                }}
                              >
                                {card.example.fr}
                              </Text>
                              <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 18 }}>
                                {card.example.en}
                              </Text>
                            </View>
                          )}
                          {Boolean(card.note) && (
                            <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 19 }}>
                              {card.note}
                            </Text>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          ))}

          <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 19 }}>
            Met is not learned, and nothing here will be asked of you. These words become yours
            through the lessons that teach them.
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
