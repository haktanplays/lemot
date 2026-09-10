/**
 * My French — the personal learning layer.
 *
 * NOT a profile. No name, no avatar, no bio, no streak, no score, nothing
 * shared and nothing sent anywhere. Two questions about what the learner wants
 * French for, three honest reflections of what the app has actually observed,
 * and the real data controls.
 *
 * Every number on this screen comes from evidence that already exists. Nothing
 * here invents a metric, and nothing here is a reward: the sections say what
 * the learner has done and what is still moving, in the same calm vocabulary
 * Mon Lexique uses.
 *
 * The preferences reach exactly one thing -- the ORDER of Context Card sets --
 * and never the curriculum. What French you meet when is a teaching decision,
 * and a toggle is not qualified to make it.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { P, SPACE, frenchLineHeight } from "@/constants/theme";
import { SurfaceHeader, QuietState } from "@/components/ui/StandingSurface";
import { PrivacyDataControls } from "@/components/learning-engine/PrivacyDataControls";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { ITEM_REGISTRY } from "@/content/itemRegistry";
import { V1_LESSONS } from "@/content/lessons/v1";
import {
  FRENCH_CONTEXTS,
  FRENCH_CONTEXT_COPY,
  FRENCH_FOCUSES,
  FRENCH_FOCUS_COPY,
  EMPTY_PREFS,
  withContextToggled,
  withFocus,
  type MyFrenchPrefs,
} from "@/content/my-french/prefs";
import {
  privacyResetEpoch,
  readMyFrenchPrefs,
  writeMyFrenchPrefs,
} from "@/lib/myFrenchPrefs";

/** Sound evidence: near misses where the meaning survived and the form did not. */
const SOUND_TAGS = new Set(["accent_only", "spelling_near_miss"]);

type Observed = {
  /** Pieces whose slips have been about the sound rather than the meaning. */
  sounds: { fr: string; itemId: string }[];
  /** Pieces that have not settled yet. */
  revisit: number;
  /** What the learner can do, in their own terms, from finished lessons. */
  canDo: string[];
};

type State = { phase: "loading" } | { phase: "error" } | ({ phase: "ready" } & Observed);

export default function MyFrenchRoute() {
  const { runtime, generation } = useLearningEngineRuntime();
  const [state, setState] = useState<State>({ phase: "loading" });
  const [prefs, setPrefs] = useState<MyFrenchPrefs>(EMPTY_PREFS);
  const loadToken = useRef(0);
  const epoch = useRef(privacyResetEpoch());

  const load = useCallback(() => {
    const token = ++loadToken.current;
    setState({ phase: "loading" });
    runtime
      .readPracticeReach()
      .then(({ snapshot, reachedLessonIds }) => {
        if (loadToken.current !== token) return;
        const items = Object.values(snapshot.items ?? {});

        const sounds = items
          .filter((m) =>
            [...Object.keys(m.precisionTags ?? {}), ...Object.keys(m.weakTags ?? {})].some((t) =>
              SOUND_TAGS.has(t),
            ),
          )
          .map((m) => ({
            itemId: m.itemId,
            fr: String(
              (ITEM_REGISTRY as Record<string, { text?: string }>)[m.itemId]?.text ?? "",
            ),
          }))
          .filter((s) => s.fr.length > 0)
          .slice(0, 6);

        const reached = new Set(reachedLessonIds);
        const canDo = V1_LESSONS.filter(
          (l) => l.number >= 1 && l.number <= 10 && reached.has(l.id),
        )
          .map((l) => String((l as { canDo?: string }).canDo ?? ""))
          .filter((c) => c.length > 0);

        setState({
          phase: "ready",
          sounds,
          revisit: items.filter((m) => m.isWeak).length,
          canDo,
        });
        setPrefs(readMyFrenchPrefs());
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

  const save = useCallback((next: MyFrenchPrefs) => {
    setPrefs(writeMyFrenchPrefs(next, epoch.current));
  }, []);

  const observed = state.phase === "ready" ? state : null;
  const contextSummary = useMemo(
    () => prefs.contexts.map((c) => FRENCH_CONTEXT_COPY[c]).join(" · "),
    [prefs.contexts],
  );

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: P.bg }}>
      <SurfaceHeader
        title="My French"
        subtitle="What you want it for, and what it has turned into so far."
      />

      {state.phase === "loading" && <QuietState tone="waiting" text={"Looking at your French…"} />}
      {state.phase === "error" && (
        <QuietState text="My French is resting for a moment. Come back shortly." />
      )}

      {observed !== null && (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: SPACE.xl,
            paddingTop: SPACE.lg,
            paddingBottom: SPACE.xxl,
          }}
        >
          <Section
            label="My focus"
            hint="Why French, for you. One answer, and you can change it whenever."
          >
            <Chips
              options={FRENCH_FOCUSES.map((f) => ({ key: f, label: FRENCH_FOCUS_COPY[f] }))}
              isActive={(key) => prefs.focus === key}
              onPress={(key) => save(withFocus(prefs, key as never))}
            />
          </Section>

          <Section
            label="Contexts I care about"
            hint="Where French is going to happen. This puts the matching Context Cards first and changes nothing about your lessons."
          >
            <Chips
              options={FRENCH_CONTEXTS.map((c) => ({ key: c, label: FRENCH_CONTEXT_COPY[c] }))}
              isActive={(key) => prefs.contexts.includes(key as never)}
              onPress={(key) => save(withContextToggled(prefs, key as never))}
            />
            {contextSummary.length > 0 && (
              <Text style={{ color: P.ink3, fontSize: 12, lineHeight: 18, marginTop: SPACE.sm }}>
                {contextSummary}
              </Text>
            )}
          </Section>

          <Section
            label="Sounds I'm working on"
            hint="Only what has actually come up: pieces where your meaning landed and the written form did not quite."
          >
            {observed.sounds.length === 0 ? (
              <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
                Nothing yet. This fills in on its own if a sound starts giving you trouble.
              </Text>
            ) : (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                {observed.sounds.map((s) => (
                  <View
                    key={s.itemId}
                    style={{
                      backgroundColor: P.paper,
                      borderWidth: 1,
                      borderColor: P.border,
                      borderRadius: 9999,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: frenchLineHeight(13),
                        color: P.ink2,
                        fontFamily: "Newsreader",
                      }}
                    >
                      {s.fr}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </Section>

          <Section
            label="Needs another pass"
            hint="French that has not settled yet. It leaves this list on its own once you use it again."
          >
            {observed.revisit === 0 ? (
              <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
                Nothing is waiting for another look right now.
              </Text>
            ) : (
              <>
                <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
                  {observed.revisit === 1
                    ? "One piece is waiting for another look."
                    : `${observed.revisit} pieces are waiting for another look.`}
                </Text>
                <Pressable
                  onPress={() => router.push("/practice-hub?mode=errors" as never)}
                  hitSlop={6}
                  accessibilityRole="button"
                  accessibilityLabel="Practise the French that has not settled yet"
                  style={{ alignSelf: "flex-start", marginTop: SPACE.sm }}
                >
                  <Text style={{ color: P.red, fontSize: 13, lineHeight: 19 }}>
                    Work on these
                  </Text>
                </Pressable>
              </>
            )}
          </Section>

          <Section
            label="My journey"
            hint="What you can do now, in the words the lessons used."
          >
            {observed.canDo.length === 0 ? (
              <Text style={{ color: P.ink2, fontSize: 14, lineHeight: 21 }}>
                This fills in as you finish lessons.
              </Text>
            ) : (
              observed.canDo.map((line, i) => (
                <Text
                  key={line}
                  style={{
                    color: P.ink2,
                    fontSize: 14,
                    lineHeight: 22,
                    marginTop: i === 0 ? 0 : 4,
                  }}
                >
                  {line}
                </Text>
              ))
            )}
          </Section>

          <Section
            label="Preferences and data"
            hint="Everything here stays on this device. There is no account and nothing is sent anywhere."
          >
            {/* The real controls, not a link to a promise. Export and delete
                have existed and worked for some time; until now they were only
                reachable from a preview shell, so no learner could use them. */}
            <PrivacyDataControls />
          </Section>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Section({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: SPACE.xxl }}>
      <Text style={{ color: P.ink3, fontSize: 12, letterSpacing: 0.4 }}>{label}</Text>
      <Text style={{ color: P.ink2, fontSize: 13, lineHeight: 20, marginTop: 2, marginBottom: SPACE.sm }}>
        {hint}
      </Text>
      {children}
    </View>
  );
}

/** A calm multi- or single-select. Selection is a border, never a reward fill. */
function Chips({
  options,
  isActive,
  onPress,
}: {
  options: { key: string; label: string }[];
  isActive: (key: string) => boolean;
  onPress: (key: string) => void;
}) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: SPACE.sm }}>
      {options.map(({ key, label }) => {
        const active = isActive(key);
        return (
          <Pressable
            key={key}
            onPress={() => onPress(key)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={{
              backgroundColor: P.paper,
              borderWidth: 1,
              borderColor: active ? P.ink3 : P.border,
              borderRadius: 9999,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                lineHeight: 19,
                color: active ? P.ink : P.ink2,
                fontWeight: active ? "600" : "400",
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
