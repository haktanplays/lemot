// Product stage and feature flag scaffold.
// Source of truth: docs/DEV_APK_MVP_CANON.md
// This file is not yet wired into runtime — consumers will be added in later steps.

export const PRODUCT_STAGE = "dev-apk" as const;

export const FEATURES = {
  paywall: false,
  revenueCat: false,
  aiChat: false,
  wordGraph: false,
  monLexique: false,
  leCarnet: false,
  practice: true,
} as const;

export const DEV_APK_LESSON_LIMIT = 5;
