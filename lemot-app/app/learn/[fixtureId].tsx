import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { P } from "@/constants/theme";
import { PRODUCT_STAGE, FEATURES } from "@/config/productStage";
import {
  L1_CONTENT_FIXTURE,
  L11_CONTENT_FIXTURE,
  L12_CONTENT_FIXTURE,
  L14_CONTENT_FIXTURE,
  L15_CONTENT_FIXTURE,
  L16_CONTENT_FIXTURE,
  L18_CONTENT_FIXTURE,
  type ValidationInput,
} from "@/content/learning-engine";
import { LearnerRendererShell } from "@/components/learning-engine/LearnerRendererShell";

/**
 * Founder learner-renderer route (Sprint13 SW.2).
 *
 * Sandbox/founder-only surface. It is NOT wired into public navigation and must
 * never render its learner shell in dev-apk / public-beta — a manual deep link
 * in a disallowed stage gets a safe "unavailable" fallback. The dev player
 * (`app/dev/learning-engine-player.tsx`) stays the debug surface.
 *
 * P3.3 scope: gated route + label-free shell rendering recognition + fill cards.
 * `FillCard` may call `grade()` for local, deterministic on-screen feedback.
 * Still NO events, NO LearningEvent creation, NO LocalRepository, NO storage,
 * NO scoreEvents()/mastery, NO network/AI. This route file itself writes nothing
 * — it only gates the stage and loads a fixture.
 */

// Founder gate: only the sandbox stage with the v1 engine flag may render this.
const LEARNER_RENDERER_ENABLED =
  PRODUCT_STAGE === "sandbox" && FEATURES.v1LessonEngine;

// Sandbox-only fixture lookup. The route key is an internal id (e.g. "l11") and
// is never shown to the learner — only the contract's learner-friendly canDo is.
const FIXTURES: Record<string, ValidationInput> = {
  l1: L1_CONTENT_FIXTURE,
  l11: L11_CONTENT_FIXTURE,
  l12: L12_CONTENT_FIXTURE,
  l14: L14_CONTENT_FIXTURE,
  l15: L15_CONTENT_FIXTURE,
  l16: L16_CONTENT_FIXTURE,
  l18: L18_CONTENT_FIXTURE,
};
const DEFAULT_FIXTURE = L11_CONTENT_FIXTURE;

function Fallback({ message }: { message: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: P.bg,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          borderRadius: 12,
          borderWidth: 1,
          backgroundColor: P.paper,
          borderColor: P.border,
          padding: 20,
        }}
      >
        <Text style={{ color: P.ink, fontSize: 16 }}>{message}</Text>
      </View>
    </View>
  );
}

export default function LearnRoute() {
  const { fixtureId } = useLocalSearchParams<{ fixtureId: string }>();

  // Stage gate (module const, not a hook) — safe fallback if reached elsewhere.
  if (!LEARNER_RENDERER_ENABLED) {
    return <Fallback message="This isn't available right now." />;
  }

  const key = (fixtureId ?? "").toLowerCase();
  const fixture = FIXTURES[key] ?? DEFAULT_FIXTURE;
  const contract = fixture.contracts[0];

  if (!contract) {
    return <Fallback message="This lesson isn't ready yet." />;
  }

  return (
    <LearnerRendererShell
      canDo={contract.goal.canDo}
      exercises={fixture.exercises}
      items={fixture.items}
      lessonId={contract.id}
      contentVersion={contract.versions.contentVersion}
    />
  );
}
