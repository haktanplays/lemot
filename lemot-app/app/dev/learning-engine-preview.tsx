/**
 * Dev-only, read-only preview of the merged learning-engine contract fixtures
 * (content/learning-engine). This is NOT the live lesson renderer and NOT an
 * interactive exercise engine — it only displays each lesson fixture + its
 * validator output so we can judge whether the contract shape is renderer-
 * friendly.
 *
 * Hidden route: reachable only by deep link at /dev/learning-engine-preview.
 * It is NOT in the tab bar and is NOT linked from Home. Do not wire it into
 * public navigation.
 *
 * Colon ids (e.g. "chunk:bonjour") are canonical inside learning-engine and are
 * used here only as React list keys and display text — never as Expo Router
 * dynamic route segments — so no id encoding/sanitizing is required.
 */
import { useMemo, type ReactNode } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  L1_CONTENT_FIXTURE,
  L12_CONTENT_FIXTURE,
  L14_CONTENT_FIXTURE,
  L15_CONTENT_FIXTURE,
  L18_CONTENT_FIXTURE,
  validateContent,
  formatReport,
  type RawItem,
  type ValidationInput,
} from "@/content/learning-engine";

const FIXTURES: ValidationInput[] = [
  L1_CONTENT_FIXTURE,
  L12_CONTENT_FIXTURE,
  L14_CONTENT_FIXTURE,
  L15_CONTENT_FIXTURE,
  L18_CONTENT_FIXTURE,
];

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

function Section({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <View className="mb-4 rounded-2xl border border-lm-border bg-lm-paper p-4">
      <Text className="font-outfit text-base font-semibold text-lm-ink">
        {title}
      </Text>
      {subtitle ? (
        <Text className="mb-2 mt-0.5 font-outfit text-xs text-lm-ink3">
          {subtitle}
        </Text>
      ) : (
        <View className="mb-2" />
      )}
      {children}
    </View>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View className="mt-1 flex-row flex-wrap">
      <Text className="font-outfit text-xs font-semibold text-lm-ink2">
        {label}:{" "}
      </Text>
      <Text className="flex-1 font-outfit text-xs text-lm-ink2">{value}</Text>
    </View>
  );
}

type BucketKey = "activeNew" | "supported" | "recognitionOnly" | "recycled";

const BUCKETS: { key: BucketKey; tone: Tone }[] = [
  { key: "activeNew", tone: "green" },
  { key: "supported", tone: "amber" },
  { key: "recognitionOnly", tone: "purple" },
  { key: "recycled", tone: "neutral" },
];

function hygieneTone(item: RawItem): Tone {
  const h = item.sourceHygiene;
  if (h.disallowedDerivative || h.reviewStatus === "blocked") return "red";
  if (h.reviewStatus === "pending") return "amber";
  return "green";
}

function LessonFixtureView({ fixture }: { fixture: ValidationInput }) {
  const contract = fixture.contracts[0];
  const items = fixture.items;
  const exercises = fixture.exercises;

  const findings = useMemo(() => validateContent(fixture), [fixture]);
  const report = useMemo(() => formatReport(findings), [findings]);
  const counts = useMemo(
    () => ({
      error: findings.filter((f) => f.severity === "error").length,
      warning: findings.filter((f) => f.severity === "warning").length,
      info: findings.filter((f) => f.severity === "info").length,
    }),
    [findings]
  );

  return (
    <View>
      <Text className="mb-2 font-newsreader text-xl text-lm-ink">
        {contract.id} · {contract.title}
      </Text>

      {/* Validator summary */}
      <Section title="Validator report" subtitle="validateContent(fixture)">
        <View className="mb-3 flex-row flex-wrap gap-2">
          <Badge
            label={`Hard errors: ${counts.error}`}
            tone={counts.error ? "red" : "green"}
          />
          <Badge
            label={`Warnings: ${counts.warning}`}
            tone={counts.warning ? "amber" : "neutral"}
          />
          <Badge
            label={`Info: ${counts.info}`}
            tone={counts.info ? "purple" : "neutral"}
          />
        </View>
        <View className="rounded-xl border border-lm-border bg-lm-bg p-3">
          <Text className="font-outfit text-xs leading-5 text-lm-ink2">
            {report}
          </Text>
        </View>
      </Section>

      {/* Contract */}
      <Section title="Contract">
        <Field label="canDo" value={contract.goal.canDo} />
        <Text className="mb-1 mt-3 font-outfit text-xs font-semibold text-lm-ink2">
          notGoal
        </Text>
        {contract.goal.notGoal.map((g) => (
          <Text key={g} className="font-outfit text-xs text-lm-ink2">
            • {g}
          </Text>
        ))}
        <View className="mt-2">
          <Field
            label="promptFadeMax"
            value={contract.supportFade.promptFadeMax}
          />
          <Field
            label="allowedOperations"
            value={contract.production.allowedOperations.join(", ")}
          />
          <Field
            label="blockedOperations"
            value={contract.production.blockedOperations.join(", ")}
          />
          <Field
            label="allowedProduction"
            value={contract.production.allowedProduction.join(", ")}
          />
          <Field
            label="blockedProduction"
            value={contract.production.blockedProduction.join(", ")}
          />
        </View>
      </Section>

      {/* Ownership buckets */}
      <Section title="Ownership buckets">
        {BUCKETS.map(({ key, tone }) => (
          <View key={key} className="mb-2">
            <Text className="mb-1 font-outfit text-xs font-semibold text-lm-ink2">
              {key} ({contract.items[key].length})
            </Text>
            {contract.items[key].length === 0 ? (
              <Text className="font-outfit text-xs text-lm-ink3">—</Text>
            ) : (
              <View className="flex-row flex-wrap gap-1">
                {contract.items[key].map((id) => (
                  <Badge key={id} label={id} tone={tone} />
                ))}
              </View>
            )}
          </View>
        ))}
      </Section>

      {/* Items */}
      <Section title={`Items (${Object.keys(items).length})`}>
        {Object.values(items).map((item) => (
          <View key={item.id} className="mb-3 border-b border-lm-border pb-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-outfit text-xs text-lm-ink3">
                {item.id}
              </Text>
              <Badge
                label={item.sourceHygiene.reviewStatus}
                tone={hygieneTone(item)}
              />
            </View>
            <Text className="mt-0.5 font-newsreader text-lg text-lm-ink">
              {item.text.fr}
            </Text>
            <Text className="font-outfit text-sm text-lm-ink2">
              {item.text.en}
            </Text>
            <View className="mt-1 flex-row flex-wrap items-center gap-2">
              <Badge label={item.preset} tone="neutral" />
              {item.pronunciationProfile?.respelling ? (
                <Text className="font-outfit text-xs text-lm-ink3">
                  {item.pronunciationProfile.respelling}
                </Text>
              ) : null}
            </View>
            {item.tags.length ? (
              <Text className="mt-1 font-outfit text-xs text-lm-ink3">
                {item.tags.join(" · ")}
              </Text>
            ) : null}
          </View>
        ))}
      </Section>

      {/* Exercise blueprints */}
      <Section title={`Exercise blueprints (${exercises.length})`}>
        {exercises.map((ex) => (
          <View key={ex.id} className="mb-3 border-b border-lm-border pb-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-outfit text-xs text-lm-ink3">{ex.id}</Text>
              <Badge label={ex.operation} tone="purple" />
            </View>
            {ex.prompt ? (
              <Text className="mt-1 font-outfit text-sm text-lm-ink">
                {ex.prompt}
              </Text>
            ) : null}
            {ex.targetText ? (
              <Text className="mt-0.5 font-newsreader text-base text-lm-ink2">
                {ex.targetText}
              </Text>
            ) : null}
            {ex.operation === "recognition" && ex.displayAnswer ? (
              <Text className="mt-0.5 font-outfit text-sm text-lm-ink2">
                meaning: {ex.displayAnswer}
              </Text>
            ) : null}
            {ex.operation === "register_switch" ? (
              <Text className="mt-0.5 font-outfit text-xs text-lm-ink3">
                {ex.directForm} → {ex.politeForm}
              </Text>
            ) : null}
            <Text className="mt-1 font-outfit text-xs text-lm-ink3">
              targets: {ex.targetItemIds.join(", ")}
            </Text>
            {ex.operation === "context_chain" ? (
              <View className="mt-1">
                {ex.steps.map((s, i) => (
                  <Text
                    key={`${ex.id}-step-${i}`}
                    className="font-outfit text-xs text-lm-ink2"
                  >
                    {i + 1}. {s.prompt} → {s.answer}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </Section>
    </View>
  );
}

export default function LearningEnginePreviewScreen() {
  // Dev-only guard: even though this route is unlinked, it still resolves by
  // deep link in any build. Never render the fixture preview in production.
  if (!__DEV__) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-lm-bg px-6">
        <Text className="text-center font-outfit text-sm text-lm-ink2">
          Developer preview is unavailable in this build.
        </Text>
      </SafeAreaView>
    );
  }

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
        <Badge label="DEV ONLY · READ ONLY" tone="red" />
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 64 }}
      >
        <View className="mb-4">
          <Text className="font-newsreader text-2xl text-lm-ink">
            Learning-Engine Fixture Preview
          </Text>
          <Text className="mt-1 font-outfit text-xs text-lm-ink3">
            Not the live lesson renderer. No input, no grading, no interaction
            engine. Reflects content/learning-engine fixtures only.
          </Text>
        </View>

        {FIXTURES.map((fixture, i) => (
          <View key={fixture.contracts[0].id}>
            {i > 0 ? <View className="mb-4 mt-2 h-px bg-lm-border" /> : null}
            <LessonFixtureView fixture={fixture} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
