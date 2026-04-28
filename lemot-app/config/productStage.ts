// Product stage and feature flag scaffold.
// Source of truth: docs/DEV_APK_MVP_CANON.md
// Switch PRODUCT_STAGE to test different runtime configs.

export type ProductStage = "sandbox" | "dev-apk" | "public-beta";

const VALID_PRODUCT_STAGES: readonly ProductStage[] = [
  "sandbox",
  "dev-apk",
  "public-beta",
];

/**
 * Resolve the active product stage from env. Local dev defaults to "sandbox";
 * EAS preview profile sets EXPO_PUBLIC_PRODUCT_STAGE=dev-apk; a future
 * public beta profile would set "public-beta". Any missing / invalid value
 * falls back to "sandbox" so emulator runs never break on a typo.
 */
function resolveProductStage(value: string | undefined): ProductStage {
  if (
    value !== undefined &&
    (VALID_PRODUCT_STAGES as readonly string[]).includes(value)
  ) {
    return value as ProductStage;
  }
  return "sandbox";
}

/**
 * Current product stage.
 *
 * - "sandbox": internal emulator / dev testing — every feature flag on,
 *   nothing locked. Default when no env is set.
 * - "dev-apk": controlled external MVP testing — bare minimum surface
 *   for the first-3-minutes hook. No paywall, no AI/Graph/Carnet.
 *   This is what the tester APK ships with.
 * - "public-beta": future monetized beta — paywall + RevenueCat live,
 *   selected post-MVP features unlocked.
 */
export const PRODUCT_STAGE: ProductStage = resolveProductStage(
  process.env.EXPO_PUBLIC_PRODUCT_STAGE
);

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
