/**
 * Learning runtime factory (PR-05) — pure, framework-free ownership of the
 * repository → controller boundary.
 *
 * The problem this solves: before PR-05 every consumer that wanted to record
 * learning did `new LocalRepository()` itself. The fixture sandbox hook did it
 * inline, and the shipped lesson path would have had to do the same — giving the
 * app two independent repositories, two independent privacy-reset acknowledgement
 * epochs, and a storage handle sitting inside a React component. This module
 * makes the repository something a runtime OWNS and a controller RECEIVES, and
 * makes it structurally impossible for UI code to reach the storage layer:
 * `LearningEngineRuntime` has exactly one method, and it returns a controller.
 *
 * Hard boundaries: no React, no React Native, no Expo, no Expo Router, no
 * storage-key knowledge, no cloud, no Supabase, no AI, no event emission, no
 * repository read or write, and no clock read merely to construct the runtime.
 * Constructing a runtime touches nothing; constructing a controller touches
 * nothing. Only a deliberate `recordGradedAttempt` / `recordRecognitionReveal`
 * reaches storage — and PR-05 wires no caller that does.
 *
 * The runtime does NOT own the reset barrier; `lib/privacyResetEpoch` does. What
 * it owns is the consequence: a `LocalRepository` captures its epoch at
 * construction and self-suppresses afterwards, so a reset must produce a NEW
 * repository and therefore a NEW runtime. `createLearningRuntimeOwner` below is
 * that generation counter, kept here (framework-free) so it is unit-testable
 * without a React renderer.
 */
import type { DeviceInfo } from "./events";
import type { LearningRepository } from "./repository/types";
import { scoreEvents, type MasterySnapshot } from "./mastery";
import {
  LearningSessionController,
  type EventSurfaceResolver,
  type SessionControllerOptions,
  type SessionState,
} from "./session-controller";
import { subscribePrivacyReset } from "../../lib/privacyResetEpoch";

/**
 * What a caller must state to get a controller. Everything the RUNTIME owns —
 * repository, session id, app build, device info — is deliberately absent: a
 * caller cannot supply, override or read them.
 */
export type RuntimeSessionOptions = {
  lessonId: string;
  contentVersion: string;
  /** REQUIRED: where this session's events happen (sandbox vs lesson path). */
  resolveEventSurface: EventSurfaceResolver;
  onUpdate?: (state: SessionState) => void;
  /** Injectable clock, for deterministic tests. Default is the controller's. */
  now?: SessionControllerOptions["now"];
  /** Injectable client-event id factory, for deterministic tests. */
  makeClientEventId?: SessionControllerOptions["makeClientEventId"];
};

/**
 * The app-level learning runtime.
 *
 * Two members, by design: a controller factory (the only write path) and one
 * read-side projection. There is no `repository`, no `appendEvent`, no
 * `readAllEvents`, no storage key and no KV handle on this type, so a React
 * component holding a runtime cannot reach persistence even by accident — a
 * surface can ask "what does the learner's history add up to?" and nothing else.
 */
export type LearningEngineRuntime = {
  createSessionController(options: RuntimeSessionOptions): LearningSessionController;
  /**
   * Rebuild the current `MasterySnapshot` from the full event log.
   *
   * READ-ONLY and explicit: constructing the runtime, the provider or a
   * controller still reads nothing — only this call does. It goes through the
   * repository's existing validation/migration read path (never the cached
   * snapshot key, which nothing writes), folds with the pure `scoreEvents`
   * reducer, and returns a current `mastery-v0.3` projection. The event log
   * remains authoritative; the returned snapshot is a derived value, not state.
   *
   * Deliberately NOT returned: the raw event array. A read-side surface gets the
   * projection, not the history — exporting history is the privacy layer's job.
   */
  readMasterySnapshot(): Promise<MasterySnapshot>;
};

export type LearningRuntimeMetadata = {
  /** Build identifier stamped on every event this runtime's controllers emit. */
  appBuild: string;
  /** Structured device facets — platform / OS / Expo runtime only. */
  deviceInfo: DeviceInfo;
};

export type CreateLearningRuntimeOptions = LearningRuntimeMetadata & {
  repository: LearningRepository;
  /**
   * Session-id factory. Injectable so tests are deterministic; the production
   * default is founder-local and never calls the event clock.
   */
  makeSessionId?: () => string;
};

/**
 * Founder-local session id.
 *
 * A monotonic counter plus a random suffix — NOT a remote-grade UUID, and
 * deliberately not the lesson id (two sessions on the same lesson must be
 * distinguishable). It does not read the clock, so merely creating a runtime or
 * a controller stays clock-free; the controller owns the only allowed clock.
 */
let sessionSeq = 0;
export function makeLocalSessionId(): string {
  sessionSeq += 1;
  return `lm-sess-${sessionSeq.toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Build a runtime around ONE repository.
 *
 * Pure apart from constructing objects: no repository call happens here, and
 * none happens when a controller is later created. `repository` is captured in
 * the closure and never re-exposed.
 */
export function createLearningEngineRuntime(
  opts: CreateLearningRuntimeOptions,
): LearningEngineRuntime {
  const { repository, appBuild, deviceInfo } = opts;
  const makeSessionId = opts.makeSessionId ?? makeLocalSessionId;

  return {
    createSessionController(options: RuntimeSessionOptions): LearningSessionController {
      return new LearningSessionController({
        repository,
        sessionId: makeSessionId(),
        lessonId: options.lessonId,
        contentVersion: options.contentVersion,
        appBuild,
        deviceInfo,
        resolveEventSurface: options.resolveEventSurface,
        onUpdate: options.onUpdate,
        now: options.now,
        makeClientEventId: options.makeClientEventId,
      });
    },
    async readMasterySnapshot(): Promise<MasterySnapshot> {
      // `readAllEvents` is the validated/migrated read boundary (v1 → v2 → v3,
      // fail-closed on anything unreadable). The events never leave this closure.
      return scoreEvents(await repository.readAllEvents());
    },
  };
}

// ── privacy-reset-safe runtime ownership ────────────────────────────────────

/**
 * One runtime plus the generation it belongs to.
 *
 * `generation` is what React consumers depend on: when it changes, every
 * controller built from the previous runtime is stale and must be replaced.
 * Comparing generations is cheaper and clearer than comparing runtime object
 * identity, and it survives memoisation.
 */
export type LearningRuntimeGeneration = {
  generation: number;
  runtime: LearningEngineRuntime;
};

export type LearningRuntimeOwner = {
  /** The current generation. Stable until a privacy reset lands. */
  current(): LearningRuntimeGeneration;
  /** Subscribe to generation changes. Returns an unsubscribe function. */
  subscribe(listener: (next: LearningRuntimeGeneration) => void): () => void;
  /** Stop listening for privacy resets. Idempotent. */
  dispose(): void;
};

export type CreateLearningRuntimeOwnerOptions = LearningRuntimeMetadata & {
  /**
   * Build a FRESH repository. Called once per generation — never reused across
   * a reset, because a `LocalRepository` captures the reset epoch at
   * construction and permanently suppresses its own writes afterwards.
   */
  createRepository: () => LearningRepository;
  makeSessionId?: () => string;
  /** Injectable for tests; defaults to the real privacy-reset barrier. */
  subscribeToReset?: (listener: () => void) => () => void;
};

/**
 * Own the app-level runtime across privacy resets.
 *
 * On `bumpPrivacyResetEpoch()` the previous `LocalRepository` becomes a stale
 * writer and silently drops every future write — correct, and exactly why the
 * app must not keep using it: without replacement, genuinely NEW post-reset
 * activity would be discarded until an app restart. So a reset builds a fresh
 * repository (which captures the new epoch) and a fresh runtime around it.
 *
 * What this deliberately does NOT do: it never re-acknowledges the old
 * repository's epoch, never reuses an old controller against a new repository,
 * never cancels the old controller's queued work (the stale-writer barrier owns
 * that safety), and never introduces a second reset mechanism.
 */
export function createLearningRuntimeOwner(
  opts: CreateLearningRuntimeOwnerOptions,
): LearningRuntimeOwner {
  const subscribeToReset = opts.subscribeToReset ?? subscribePrivacyReset;
  const listeners = new Set<(next: LearningRuntimeGeneration) => void>();

  const build = (generation: number): LearningRuntimeGeneration => ({
    generation,
    runtime: createLearningEngineRuntime({
      repository: opts.createRepository(),
      appBuild: opts.appBuild,
      deviceInfo: opts.deviceInfo,
      makeSessionId: opts.makeSessionId,
    }),
  });

  let state = build(0);
  let unsubscribe: (() => void) | null = subscribeToReset(() => {
    state = build(state.generation + 1);
    for (const listener of listeners) {
      try {
        listener(state);
      } catch {
        /* a faulty consumer must never break the reset path */
      }
    }
  });

  return {
    current: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose() {
      unsubscribe?.();
      unsubscribe = null;
      listeners.clear();
    },
  };
}
