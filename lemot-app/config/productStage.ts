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
// `aiEnabled` is the AI master switch: when false, lib/ai's Edge Function
// helpers fail closed to deterministic fallbacks and make NO network call,
// regardless of Supabase env. This keeps the dev-apk tester build AI-closed
// even if Supabase env is later injected for auth/progress sync.
export const FEATURES_BY_STAGE = {
  // Internal emulator / dev testing — everything on for full sandbox exploration.
  sandbox: {
    paywall: false,
    revenueCat: false,
    aiChat: true,
    aiLesson: true,
    aiEnabled: true,
    wordGraph: true,
    monLexique: true,
    leCarnet: true,
    practice: true,
    // Daily Review + Progress visible for full internal exploration.
    dailyReview: true,
    progress: true,
    v1LessonEngine: true,
  },
  // Controlled external MVP testing — minimal surface, no paywall.
  "dev-apk": {
    paywall: false,
    revenueCat: false,
    aiChat: false,
    aiLesson: true,
    // AI master switch OFF for the Round-1 tester build: no AI network calls
    // even if Supabase env exists. In-lesson AI sections fall back deterministically.
    aiEnabled: false,
    wordGraph: false,
    monLexique: false,
    leCarnet: false,
    // Practice tab hidden in dev-apk: it surfaces legacy scenario and
    // flashcard material beyond the Dev APK first-user path. Sandbox and
    // public-beta keep practice=true.
    practice: false,
    // Daily Review hidden in dev-apk: it draws from the legacy flashcard pool
    // (untaught vocabulary) and v1 Round 1 has no review surface. Progress
    // hidden: stats.tsx renders the legacy 24-lesson syllabus. Both are scope
    // control for the Round 1 tester surface, not monetization.
    dailyReview: false,
    progress: false,
    v1LessonEngine: false,
  },
  // Future monetized beta — paywall + RevenueCat live, selected features open.
  "public-beta": {
    paywall: true,
    revenueCat: true,
    aiChat: true,
    aiLesson: true,
    // Public-beta AI stays OFF until the AI-enabled beta gate is explicitly
    // cleared in a later PR (after E2 console stripping, server-side hardening,
    // rate limits, and privacy/data-handling notes). AI fails closed by default
    // outside sandbox.
    aiEnabled: false,
    wordGraph: false,
    monLexique: true,
    leCarnet: false,
    practice: true,
    // Daily Review + Progress visible in the future monetized beta.
    dailyReview: true,
    progress: true,
    v1LessonEngine: false,
  },
} as const;

export const FEATURES = FEATURES_BY_STAGE[PRODUCT_STAGE];

/**
 * Highest v1 lesson the ordinary Journey exposes, per stage.
 *
 * This is a BUILD SLICE BOUNDARY, not a course ending and not a paywall.
 *
 * The v1 path runs L1-L24 under one linear unlock, so finishing L10 opened L11
 * exactly as finishing L6 opened L7. That is correct for the product and wrong
 * for the founder APK: L1-L10 is the slice that went through the production
 * budget, and a diligent tester who finished it walked straight out of the
 * densest content in the build into L11-L24 at the old density. The sharpest
 * quality drop sat exactly where the most careful tester would reach it.
 *
 * So dev-apk stops at the end of the finished slice. Nothing is deleted, no
 * entitlement system exists, and no lesson is marked premium or locked-forever:
 * the ceiling moves when the content behind it is ready. Sandbox and public-beta
 * keep the full authored path, so this changes one stage and no semantics.
 *
 * Finishing L10 in dev-apk lands on the path's existing "walked the whole path
 * for now" state. That copy is deliberate: for now, not for good.
 */
export const V1_PATH_MAX_LESSON_BY_STAGE: Record<ProductStage, number> = {
  sandbox: 24,
  "dev-apk": 10,
  "public-beta": 24,
};

export const V1_PATH_MAX_LESSON = V1_PATH_MAX_LESSON_BY_STAGE[PRODUCT_STAGE];

/**
 * Whether a v1 lesson number is inside the current stage's slice.
 *
 * Used by the path AND by the direct route, so a deep link cannot reach past
 * the boundary the Journey draws. Out of scope fails into the route's existing
 * "not ready yet" state rather than a new screen, because from the tester's
 * side that is exactly what is true.
 */
export function isV1LessonInStageScope(lessonNumber: number): boolean {
  return lessonNumber >= 1 && lessonNumber <= V1_PATH_MAX_LESSON;
}

// LEGACY TEST BUILD — frozen for Dev APK (Tier B locked 2026-05-16).
// Filter assumes 24-lesson syllabus (L1-L24, L1=Survival Kit). v1 Canon §5 has
// a different L1-L150 syllabus (L1=Je suis, paywall L24+Campfire, 150 core).
// Dev APK SHIPS WITH LIMIT=5 AS-IS — limit semantics change Sprint 12 when
// v1 syllabus migration happens. See:
//   ~/Desktop/ObsidianVault/01 Projeler/LeMot/Canon Merge Report 2026-05-16.md
export const DEV_APK_LESSON_LIMIT = 5;
