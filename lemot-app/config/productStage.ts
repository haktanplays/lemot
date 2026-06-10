// Product stage and feature flag scaffold.
// Source of truth: docs/DEV_APK_MVP_CANON.md
// Switch PRODUCT_STAGE to test different runtime configs.

export type ProductStage = "sandbox" | "dev-apk" | "public-beta";

const VALID_PRODUCT_STAGES: readonly ProductStage[] = [
  "sandbox",
  "dev-apk",
  "public-beta",
];

// Fail-closed fallback. A missing or invalid env must NOT resolve to "sandbox":
// sandbox turns on every future/full-product surface, so a tester APK built
// without EXPO_PUBLIC_PRODUCT_STAGE (or with a typo) would silently ship the
// full sandbox surface. "dev-apk" is the most restricted real stage, so an
// unconfigured or mistyped build ships the minimal tester surface instead.
const FAIL_CLOSED_STAGE: ProductStage = "dev-apk";

/**
 * Resolve the active product stage from env, fail-closed.
 *
 * A valid explicit value ("sandbox" | "dev-apk" | "public-beta") is honored.
 * Anything else (missing or invalid) falls back to FAIL_CLOSED_STAGE rather than
 * "sandbox". To run sandbox locally, set EXPO_PUBLIC_PRODUCT_STAGE=sandbox
 * explicitly; EAS preview sets dev-apk; a future public beta sets public-beta.
 */
export function resolveProductStage(value: string | undefined): ProductStage {
  if (
    value !== undefined &&
    (VALID_PRODUCT_STAGES as readonly string[]).includes(value)
  ) {
    return value as ProductStage;
  }
  return FAIL_CLOSED_STAGE;
}

/**
 * Current product stage.
 *
 * - "sandbox": internal emulator / dev testing — every feature flag on,
 *   nothing locked. Must be requested explicitly via
 *   EXPO_PUBLIC_PRODUCT_STAGE=sandbox; it is no longer the fallback (fail-closed).
 * - "dev-apk": controlled external MVP testing — bare minimum surface
 *   for the first-3-minutes hook. No paywall, no Chat tab, no Graph,
 *   no Carnet. In-lesson AI (Say It Your Way + Mini Conversation) is
 *   gated by `aiLesson`, kept ON in dev-apk because those sections are
 *   integral parts of every lesson — only the standalone Chat tab is
 *   hidden via `aiChat`. This is what the tester APK ships with.
 * - "public-beta": future monetized beta — paywall + RevenueCat live,
 *   selected post-MVP features unlocked.
 */
export const PRODUCT_STAGE: ProductStage = resolveProductStage(
  process.env.EXPO_PUBLIC_PRODUCT_STAGE
);

// `aiChat` controls the standalone Chat tab visibility.
// `aiLesson` controls the in-lesson AI sections (Say It Your Way + Mini
// Conversation). They are intentionally separate so we can keep the Chat
// tab hidden in dev-apk while still letting lesson AI run — those
// sections are part of every lesson, not an optional bonus surface.
// `v1LessonEngine` is a WS.3 scaffold flag for the v1 typed content engine.
// Not consumed anywhere in Sprint 12 yet — gates the future v1 surface only.
export const FEATURES_BY_STAGE = {
  // Internal emulator / dev testing — everything on for full sandbox exploration.
  sandbox: {
    paywall: false,
    revenueCat: false,
    aiChat: true,
    aiLesson: true,
    wordGraph: true,
    monLexique: true,
    leCarnet: true,
    practice: true,
    v1LessonEngine: true,
  },
  // Controlled external MVP testing — minimal surface, no paywall.
  "dev-apk": {
    paywall: false,
    revenueCat: false,
    aiChat: false,
    aiLesson: true,
    wordGraph: false,
    monLexique: false,
    leCarnet: false,
    // Practice tab hidden in dev-apk: it surfaces legacy scenario and
    // flashcard material beyond the Dev APK first-user path. Sandbox and
    // public-beta keep practice=true.
    practice: false,
    v1LessonEngine: false,
  },
  // Future monetized beta — paywall + RevenueCat live, selected features open.
  "public-beta": {
    paywall: true,
    revenueCat: true,
    aiChat: true,
    aiLesson: true,
    wordGraph: false,
    monLexique: true,
    leCarnet: false,
    practice: true,
    v1LessonEngine: false,
  },
} as const;

export const FEATURES = FEATURES_BY_STAGE[PRODUCT_STAGE];

// LEGACY TEST BUILD — frozen for Dev APK (Tier B locked 2026-05-16).
// Filter assumes 24-lesson syllabus (L1-L24, L1=Survival Kit). v1 Canon §5 has
// a different L1-L150 syllabus (L1=Je suis, paywall L24+Campfire, 150 core).
// Dev APK SHIPS WITH LIMIT=5 AS-IS — limit semantics change Sprint 12 when
// v1 syllabus migration happens. See:
//   ~/Desktop/ObsidianVault/01 Projeler/LeMot/Canon Merge Report 2026-05-16.md
export const DEV_APK_LESSON_LIMIT = 5;
