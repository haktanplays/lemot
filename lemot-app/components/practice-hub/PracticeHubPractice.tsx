/**
 * Practice Hub attempt surface (PR-08) — one reused authored screen.
 *
 * Renders the ORIGINAL shipped screen component (`FillWithTraps` or `Weave`) for
 * the resolved source, and records the attempt through a controller whose
 * surface resolver stamps `placement: "practice_hub"`. Everything else about the
 * event is identical to the lesson path: same canonical item identity, same
 * qualified payload id (the original lesson/screen), same lesson id and version,
 * same PR-06 orchestration (choice/typed interactions, treatment resolution,
 * assistance capture, deterministic grading), same admission pipeline, same
 * mastery reducer. Only WHERE it happened differs.
 *
 * The screen receives UI-fact callbacks only — no controller, repository,
 * evidence class, attribution, admissibility or mastery mutation. Opening,
 * closing and navigating emit nothing; the screen's existing answer action
 * (choice on selection, Weave on Check) is the single emission point, exactly
 * as in the lesson.
 */
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { P } from "@/constants/theme";
import type {
  EventSurfaceResolver,
  LearningSessionController,
  SessionState,
} from "@/content/learning-engine/session-controller";
import {
  choiceInteraction,
  typedAttemptInteraction,
} from "@/content/lesson-v1-evidence/interactions";
import type { ReusablePracticeSource } from "@/content/lesson-v1-evidence/practiceHub";
import { useLearningEngineRuntime } from "@/providers/LearningEngineProvider";
import { makeRegisteredEventSurface } from "@/content/identity/payloadRegistry";
import {
  createSettledCloseGate,
  type SettledCloseGate,
} from "./settledClose";
import { FillWithTraps } from "@/components/lesson-v1/screens/FillWithTraps";
import { Weave } from "@/components/lesson-v1/screens/Weave";

/**
 * Where a Hub attempt happens. Identity is REUSED, placement is not: the
 * qualified payload id and lesson id stay those of the original authored
 * screen, so mastery accumulates on the same item through the same payload —
 * while the event honestly records that it came back through the Hub. Since
 * PR-07 the SAME shared resolver also carries a registered payload's EV and
 * sentence identity into the Hub unchanged; unregistered screens keep nulls.
 */
const PRACTICE_HUB_SURFACE: EventSurfaceResolver =
  makeRegisteredEventSurface("practice_hub");

/**
 * Render the original authored screen with UI-fact callbacks. A local `screen`
 * binding lets the union narrow properly into each branch's closure.
 */
function renderReusedScreen(
  source: ReusablePracticeSource,
  controller: LearningSessionController,
  onSettledClose: () => void,
) {
  const { lesson, screen } = source;
  if (screen.type === "fill-with-traps") {
    return (
      <FillWithTraps
        screen={screen}
        onContinue={onSettledClose}
        onChoice={(facts) =>
          controller.recordGradedAttempt(choiceInteraction(lesson, screen, facts))
        }
      />
    );
  }
  return (
    <Weave
      screen={screen}
      onContinue={onSettledClose}
      onTypedAttempt={(facts) =>
        controller.recordGradedAttempt(
          typedAttemptInteraction(lesson, screen, {
            text: facts.text,
            hintRung: facts.hintRung,
            constitutiveSupportRendered: facts.constitutiveSupportRendered,
          }),
        )
      }
    />
  );
}

export function PracticeHubPractice({
  source,
  onClose,
}: {
  source: ReusablePracticeSource;
  /**
   * Called when the learner finishes or leaves. Emits nothing by itself, and —
   * since the settlement correction — is reached ONLY through the settled-close
   * gate: the parent's snapshot rebuild always sees the settled event log.
   */
  onClose: () => void;
}) {
  const { runtime, generation } = useLearningEngineRuntime();
  const [, setState] = useState<SessionState | null>(null);

  // Latest-callback ref, so the gate (created once per identity) never invokes
  // a stale parent closure.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Alive flag: a flush that settles after unmount must not call the parent.
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // One controller per source lesson + runtime generation, same stale-token
  // pattern as the lesson provider: a pre-reset controller's late callback must
  // not touch the fresh session, and its writes are already suppressed. The
  // settled-close gate is created ALONGSIDE the controller, so a new identity
  // starts with no inherited pending-close state.
  const identity = `${generation}::${source.lesson.id}::${source.screen.id}`;
  const held = useRef<{
    identity: string;
    controller: LearningSessionController;
    close: SettledCloseGate;
  } | null>(null);
  if (held.current === null || held.current.identity !== identity) {
    const token = identity;
    const controller = runtime.createSessionController({
      lessonId: source.lesson.id,
      contentVersion: source.lesson.version,
      resolveEventSurface: PRACTICE_HUB_SURFACE,
      onUpdate: (next) => {
        if (held.current?.identity === token) setState(next);
      },
    });
    held.current = {
      identity,
      controller,
      close: createSettledCloseGate({
        flush: () => controller.flush(),
        identity: token,
        currentIdentity: () => held.current?.identity ?? "",
        isActive: () => mounted.current,
        onClose: () => onCloseRef.current(),
      }),
    };
  }
  const controller = held.current.controller;
  const requestSettledClose = held.current.close.requestSettledClose;

  useEffect(() => {
    setState(null);
  }, [identity]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: P.border,
        }}
      >
        <Text
          style={{
            color: P.ink3,
            fontSize: 12,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Practice this piece
        </Text>
        <Pressable
          onPress={requestSettledClose}
          hitSlop={8}
          style={{
            borderRadius: 999,
            borderWidth: 1,
            borderColor: P.border,
            paddingHorizontal: 14,
            paddingVertical: 6,
          }}
        >
          <Text style={{ color: P.ink2, fontSize: 13 }}>Close</Text>
        </Pressable>
      </View>
      {renderReusedScreen(source, controller, requestSettledClose)}
    </View>
  );
}
