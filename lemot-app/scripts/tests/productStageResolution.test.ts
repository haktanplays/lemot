/**
 * Fail-closed product stage resolution (audit finding OF-2 / PR-D).
 *
 * `resolveProductStage` must never fall back to "sandbox" for a missing or
 * invalid `EXPO_PUBLIC_PRODUCT_STAGE`, because sandbox exposes every
 * future/full-product surface. A tester APK built without the env var (or with
 * a typo) must ship the minimal dev-apk surface, not the full sandbox surface.
 *
 * These tests call the pure resolver directly with different inputs, and read
 * the resolved fallback stage's feature map directly. Both are env-independent,
 * so no env mutation is needed here.
 *
 * `config/productStage` is imported dynamically INSIDE each test, never at the
 * top level. Importing it at registration time would evaluate and cache the
 * module (resolving `PRODUCT_STAGE` once) before `devApkScope.test` gets to
 * force `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk` and dynamically import it, which
 * would break that guard under a non-default env. Pure tsx: config only reads
 * `process.env`, so NO React Native / Expo / device layer is loaded.
 */
import { describe, test, assert } from "./harness";

describe("product stage resolution (fail closed)", () => {
  test("explicit dev-apk resolves to dev-apk", async () => {
    const { resolveProductStage } = await import("../../config/productStage");
    assert(
      resolveProductStage("dev-apk") === "dev-apk",
      "explicit dev-apk must resolve to dev-apk",
    );
  });

  test("explicit sandbox resolves to sandbox", async () => {
    const { resolveProductStage } = await import("../../config/productStage");
    assert(
      resolveProductStage("sandbox") === "sandbox",
      "explicit sandbox must resolve to sandbox",
    );
  });

  test("missing env does not resolve to sandbox", async () => {
    const { resolveProductStage } = await import("../../config/productStage");
    const stage = resolveProductStage(undefined);
    assert(stage !== "sandbox", `missing env must not resolve to sandbox, got "${stage}"`);
    assert(stage === "dev-apk", `missing env must fail closed to dev-apk, got "${stage}"`);
  });

  test("invalid env does not resolve to sandbox", async () => {
    const { resolveProductStage } = await import("../../config/productStage");
    for (const bad of ["", "SANDBOX", "prod", "dev_apk", "devapk", "xyz"]) {
      const stage = resolveProductStage(bad);
      assert(stage !== "sandbox", `invalid env "${bad}" must not resolve to sandbox, got "${stage}"`);
      assert(stage === "dev-apk", `invalid env "${bad}" must fail closed to dev-apk, got "${stage}"`);
    }
  });

  test("fail-closed fallback disables future-product flags", async () => {
    const { resolveProductStage, FEATURES_BY_STAGE } = await import(
      "../../config/productStage"
    );
    const inputs: (string | undefined)[] = [undefined, "garbage"];
    for (const value of inputs) {
      const stage = resolveProductStage(value);
      const f = FEATURES_BY_STAGE[stage];
      const label = value === undefined ? "missing" : `invalid "${value}"`;
      assert(f.paywall === false, `fallback (${label}): paywall must be false`);
      assert(f.revenueCat === false, `fallback (${label}): revenueCat must be false`);
      assert(f.aiChat === false, `fallback (${label}): aiChat must be false`);
      assert(f.wordGraph === false, `fallback (${label}): wordGraph must be false`);
      assert(f.monLexique === false, `fallback (${label}): monLexique must be false`);
      assert(f.leCarnet === false, `fallback (${label}): leCarnet must be false`);
    }
  });
});
