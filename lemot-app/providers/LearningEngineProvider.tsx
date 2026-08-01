/**
 * App-level learning runtime provider (PR-05).
 *
 * ONE owner of the learning repository for the whole app. Everything that wants
 * to record learning asks this provider for a controller; nothing else
 * constructs a `LocalRepository`, and nothing outside this file can reach one —
 * the context value exposes a runtime whose only method returns a controller.
 *
 * Privacy-reset safety is the reason this is a provider rather than a module
 * singleton. A `LocalRepository` captures the reset epoch when it is built and
 * permanently suppresses its own writes once that epoch is superseded. Keeping
 * one forever would therefore silently discard genuinely NEW activity after a
 * reset until the app restarted. `createLearningRuntimeOwner` rebuilds the
 * repository (and the runtime around it) on every reset, and consumers re-key
 * their controllers off the generation number.
 *
 * Hard boundaries: no Supabase, no auth, no network, no remote sync, no event
 * emission, and no repository read merely because the provider mounted. Mounting
 * this provider touches storage zero times.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import type { DeviceInfo } from "@/content/learning-engine/events";
import { LocalRepository } from "@/content/learning-engine/repository/local";
import {
  createLearningRuntimeOwner,
  type LearningEngineRuntime,
  type LearningRuntimeGeneration,
} from "@/content/learning-engine/runtime";

/**
 * Build identifier stamped on every event.
 *
 * The founder-specified ladder is "native build version ?? Expo app version ??
 * unknown". The native build version needs `expo-application`, which this app
 * does not depend on and which PR-05 does not add — so the ladder starts at the
 * Expo app version. If `expo-application` is added later, its
 * `nativeBuildVersion` belongs at the front of this expression.
 */
function resolveAppBuild(): string {
  return Constants.expoConfig?.version ?? "unknown";
}

/**
 * Structured device facets — platform, OS version, Expo runtime.
 *
 * These are the EXISTING `DeviceInfo` fields on the event schema, not a new
 * privacy category. Deliberately absent: advertising identifiers, device name,
 * hardware serial, IP-derived location, account id, email, and any free-form
 * diagnostic text.
 */
function resolveDeviceInfo(): DeviceInfo {
  const expoRuntime = Constants.expoRuntimeVersion;
  return {
    platform: Platform.OS,
    osVersion: String(Platform.Version),
    ...(expoRuntime ? { expoRuntime } : {}),
  };
}

const LearningEngineContext = createContext<LearningRuntimeGeneration | null>(null);

export function LearningEngineProvider({ children }: { children: ReactNode }) {
  // The owner is built once per mount. `useState`'s lazy initialiser is what
  // keeps ordinary re-renders from rebuilding the repository — a new repository
  // on every render would churn reset-epoch acknowledgement for no reason.
  const [owner] = useState(() =>
    createLearningRuntimeOwner({
      createRepository: () => new LocalRepository(),
      appBuild: resolveAppBuild(),
      deviceInfo: resolveDeviceInfo(),
    }),
  );
  const [generation, setGeneration] = useState<LearningRuntimeGeneration>(() =>
    owner.current(),
  );

  useEffect(() => {
    // Subscribe AFTER mount, then re-read: a reset that landed between the lazy
    // initialiser and this effect would otherwise be missed.
    const unsubscribe = owner.subscribe(setGeneration);
    setGeneration(owner.current());
    return () => {
      unsubscribe();
      owner.dispose();
    };
  }, [owner]);

  return (
    <LearningEngineContext.Provider value={generation}>
      {children}
    </LearningEngineContext.Provider>
  );
}

/**
 * The app runtime plus its generation.
 *
 * Throws outside the provider rather than returning a silent fallback: a
 * fallback runtime would write learner events to a repository nobody owns.
 */
export function useLearningEngineRuntime(): {
  runtime: LearningEngineRuntime;
  generation: number;
} {
  const value = useContext(LearningEngineContext);
  if (value === null) {
    throw new Error(
      "useLearningEngineRuntime must be used inside <LearningEngineProvider>",
    );
  }
  return useMemo(
    () => ({ runtime: value.runtime, generation: value.generation }),
    [value],
  );
}
