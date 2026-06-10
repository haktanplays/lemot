/**
 * Dev APK feature-scope guard (inventory findings F2 / F4).
 *
 * Locks the intended `FEATURES` map for PRODUCT_STAGE="dev-apk" so a future
 * config edit cannot accidentally expose future/full-product surfaces
 * (paywall, standalone Chat, Word Graph, Mon Lexique, Le Carnet, RevenueCat)
 * in the Dev APK tester build.
 *
 * `config/productStage.ts` does not export the per-stage map, but it resolves
 * the active stage from `EXPO_PUBLIC_PRODUCT_STAGE` at module-evaluation time.
 * Nothing else in this test graph imports that module, so forcing the env var
 * and then dynamically importing it yields the dev-apk-resolved `FEATURES`
 * without any config change. Pure tsx: the config module only reads
 * `process.env`, so NO React Native / Expo / device layer is loaded.
 */
import { describe, test, assert } from "./harness";

describe("dev-apk feature scope", () => {
  test("future-product surfaces stay disabled in dev-apk", async () => {
    const prev = process.env.EXPO_PUBLIC_PRODUCT_STAGE;
    process.env.EXPO_PUBLIC_PRODUCT_STAGE = "dev-apk";
    try {
      const config = await import("../../config/productStage");

      assert(
        config.PRODUCT_STAGE === "dev-apk",
        `stage forcing failed: expected PRODUCT_STAGE "dev-apk", got "${config.PRODUCT_STAGE}"`,
      );

      const f = config.FEATURES;
      assert(f.paywall === false, "dev-apk: paywall must be false");
      assert(f.revenueCat === false, "dev-apk: revenueCat must be false");
      assert(f.aiChat === false, "dev-apk: aiChat must be false");
      assert(f.wordGraph === false, "dev-apk: wordGraph must be false");
      assert(f.monLexique === false, "dev-apk: monLexique must be false");
      assert(f.leCarnet === false, "dev-apk: leCarnet must be false");
      assert(
        f.v1LessonEngine === false,
        "dev-apk: v1LessonEngine must stay false (no global engine flip)",
      );
    } finally {
      if (prev === undefined) {
        delete process.env.EXPO_PUBLIC_PRODUCT_STAGE;
      } else {
        process.env.EXPO_PUBLIC_PRODUCT_STAGE = prev;
      }
    }
  });
});
