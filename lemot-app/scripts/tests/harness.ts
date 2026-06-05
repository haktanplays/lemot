/**
 * Minimal dependency-free test harness for the learning-engine guarantees.
 *
 * The repo has no test framework; validators run as plain `tsx` scripts (see
 * scripts/validateContent.ts). These permanent tests follow the same idiom: a
 * tiny synchronous registry + an async runner that prints a concise,
 * deterministic report and exits non-zero on any failure.
 *
 * Pure Node/tsx — NO React Native, NO Expo, NO device deps, NO external test
 * library. Every test that needs storage injects an in-memory adapter, so the
 * native `lib/storage` layer is never loaded.
 */

export type TestFn = () => void | Promise<void>;

type Entry = { group: string; name: string; fn: TestFn };

const entries: Entry[] = [];
let currentGroup = "ungrouped";

/** Register a group of tests; restores the previous group afterwards. */
export function describe(name: string, body: () => void): void {
  const prev = currentGroup;
  currentGroup = name;
  try {
    body();
  } finally {
    currentGroup = prev;
  }
}

/** Register one test under the current group. */
export function test(name: string, fn: TestFn): void {
  entries.push({ group: currentGroup, name, fn });
}

/** Throw with `message` unless `cond` is truthy. */
export function assert(cond: unknown, message: string): asserts cond {
  if (!cond) throw new Error(message);
}

/** Structural deep-equality (arrays + plain objects + primitives). */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a === "object") {
    const aArr = Array.isArray(a);
    if (aArr !== Array.isArray(b)) return false;
    const ao = a as Record<string, unknown>;
    const bo = b as Record<string, unknown>;
    const ak = Object.keys(ao);
    const bk = Object.keys(bo);
    if (ak.length !== bk.length) return false;
    return ak.every((k) => deepEqual(ao[k], bo[k]));
  }
  return false;
}

/** Assert structural deep-equality; on failure prints both sides. */
export function assertEqual(actual: unknown, expected: unknown, message: string): void {
  if (!deepEqual(actual, expected)) {
    throw new Error(
      `${message}\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}`,
    );
  }
}

/** A JSON-safe deep clone, used to prove helpers don't mutate their inputs. */
export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Run all registered tests, print a concise report, and exit(1) on any failure. */
export async function runAll(): Promise<void> {
  let passed = 0;
  const failures: { group: string; name: string; error: string }[] = [];
  let lastGroup = "";

  for (const entry of entries) {
    if (entry.group !== lastGroup) {
      console.log(`\n${entry.group}`);
      lastGroup = entry.group;
    }
    try {
      await entry.fn();
      passed += 1;
      console.log(`  ✓ ${entry.name}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      failures.push({ group: entry.group, name: entry.name, error: message });
      console.log(`  ✗ ${entry.name}`);
    }
  }

  console.log(
    `\nLearning-engine tests: ${passed} passed, ${failures.length} failed, ${entries.length} total`,
  );
  if (failures.length > 0) {
    console.log("\nFailures:");
    for (const f of failures) {
      console.log(`  ✗ ${f.group} › ${f.name}\n    ${f.error}`);
    }
    process.exit(1);
  }
}
