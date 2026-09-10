/**
 * A chain step must not inherit the previous step's state.
 *
 * Founder device repro: L8 "C'est où ?", page 9, Step 2 of 3. The three choices
 * rendered and none could be tapped, so Step 3 was unreachable and the lesson
 * dead-ended. The chain rendered its step without a key, so React reconciled
 * step 2 into step 1's mounted FillWithTraps and kept `selectedId`; that
 * component ignores events once answered, so the screen was already "answered"
 * before the learner saw it.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { V1_LESSONS } from "../../content/lessons/v1";

const CHAIN = readFileSync(join(process.cwd(), "components/lesson-v1/screens/ActivityChain.tsx"), "utf8");

describe("activity chain steps are isolated from each other", () => {
  test("the rendered step is keyed by step identity", () => {
    assert(
      /key=\{step\.id\}/.test(CHAIN),
      "chain steps must be keyed by step id, or same-type steps share state",
    );
  });

  test("every chain with adjacent same-type steps is covered by that key", () => {
    // This is the population the bug could reach. Listing it keeps the guard
    // honest: if a future chain adds an adjacent pair, it is already protected,
    // and if the key is removed this test explains what breaks.
    const risky: string[] = [];
    for (const l of V1_LESSONS as any[]) {
      if (l.number < 1 || l.number > 10) continue;
      for (const s of (l.screens ?? []) as any[]) {
        if (s.type !== "activity-chain") continue;
        const types = s.payload.steps.map((x: any) => x.type);
        if (types.some((t: string, i: number) => i > 0 && t === types[i - 1]))
          risky.push(`L${l.number}/${s.id}`);
      }
    }
    assert(risky.length > 0, "expected chains with adjacent same-type steps to exist");
    assert(
      /key=\{step\.id\}/.test(CHAIN),
      `${risky.length} chains would dead-end without the step key: ${risky.join(", ")}`,
    );
  });

  test("every chain step carries a stable id to key on", () => {
    for (const l of V1_LESSONS as any[]) {
      if (l.number < 1 || l.number > 10) continue;
      for (const s of (l.screens ?? []) as any[]) {
        if (s.type !== "activity-chain") continue;
        const ids = s.payload.steps.map((x: any) => x.id);
        for (const id of ids)
          assert(typeof id === "string" && id.length > 0, `${l.id}/${s.id}: a step has no id to key on`);
        assert(new Set(ids).size === ids.length, `${l.id}/${s.id}: step ids must be unique within a chain`);
      }
    }
  });
});
