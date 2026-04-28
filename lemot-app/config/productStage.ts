// Product stage and feature flag scaffold.
// Source of truth: docs/DEV_APK_MVP_CANON.md
// Switch PRODUCT_STAGE to test different runtime configs.

export type ProductStage = "sandbox" | "dev-apk" | "public-beta";

/**
 * Current product stage.
 *
 * - "sandbox": internal emulator / dev testing — every feature flag on,
 *   nothing locked. Default for local development so you can exercise
 *   the full UX in the emulator.
 * - "dev-apk": controlled external MVP testing — bare minimum surface
 *   for the first-3-minutes hook. No paywall, no AI/Graph/Carnet.
 *   This is what the tester APK ships with.
 * - "public-beta": future monetized beta — paywall + RevenueCat live,
 *   selected post-MVP features unlocked.
 */
export const PRODUCT_STAGE: ProductStage = "sandbox";

const FEATURES_BY_STAGE = {
  // Internal emulator / dev testing — everything on for full sandbox exploration.
  sandbox: {
    paywall: false,
    revenueCat: false,
    aiChat: true,
    wordGraph: true,
    monLexique: true,
    leCarnet: true,
    practice: true,
  },
  // Controlled external MVP testing — minimal surface, no paywall.
  "dev-apk": {
    paywall: false,
    revenueCat: false,
    aiChat: false,
    wordGraph: false,
    monLexique: false,
    leCarnet: false,
    practice: true,
  },
  // Future monetized beta — paywall + RevenueCat live, selected features open.
  "public-beta": {
    paywall: true,
    revenueCat: true,
    aiChat: true,
    wordGraph: false,
    monLexique: true,
    leCarnet: false,
    practice: true,
  },
} as const;

export const FEATURES = FEATURES_BY_STAGE[PRODUCT_STAGE];

export const DEV_APK_LESSON_LIMIT = 5;
