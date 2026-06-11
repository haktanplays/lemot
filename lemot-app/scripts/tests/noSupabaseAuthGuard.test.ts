/**
 * No-Supabase auth guard (Round 1 audit finding R1-1).
 *
 * In a build without Supabase env (the Round 1 dev-apk), `supabaseReady` is
 * false and sign in / sign up cannot work. Two source-level guards keep a
 * tester away from that dead end:
 *   1. Home renders the Sign In / Account entry only when `supabaseReady`.
 *      That entry is also the only opener of the Account modal.
 *   2. app/auth.tsx redirects to Home when `!supabaseReady`, covering deep
 *      links and restored navigation state.
 *
 * `lib/supabase` cannot be imported in this pure-tsx harness (it pulls
 * lib/storage, which loads expo-sqlite), so this guard asserts the source
 * wiring directly, in the same file-scan style as componentCopyGuard.test.ts.
 * It checks only the two load-bearing facts, not exact JSX shape.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const APP_ROOT = process.cwd();
const read = (rel: string) => readFileSync(join(APP_ROOT, rel), "utf8");

describe("no-Supabase auth guard", () => {
  test("Home gates the Sign In / Account entry on supabaseReady", () => {
    const src = read("app/(tabs)/index.tsx");
    assert(
      src.includes('import { supabaseReady } from "@/lib/supabase"'),
      "Home must import supabaseReady from @/lib/supabase",
    );
    assert(
      /\{supabaseReady && \(/.test(src),
      "Home must render the Sign In / Account entry only when supabaseReady",
    );
  });

  test("auth route redirects when Supabase is not configured", () => {
    const src = read("app/auth.tsx");
    assert(
      src.includes('import { supabaseReady } from "@/lib/supabase"'),
      "auth route must import supabaseReady from @/lib/supabase",
    );
    assert(
      /if \(!supabaseReady\) \{[\s\S]{0,40}return <Redirect/.test(src),
      "auth route must redirect when !supabaseReady",
    );
  });
});
