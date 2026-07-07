/**
 * Lesson Flow Canon §11 — mechanizable validator subset contracts (V3/V4/V5).
 *
 * The exposure ("recognition") tier promise is one-directional: future
 * surfaces may be SEEN but never asked back. V3 catches exposure items in
 * answer positions, V4 catches them in owned-only zones (§2.2 ASLA list),
 * V5 warns when a lesson overspends its insight-card budget. These tests
 * lock the synthetic behavior AND that the real 16 lessons are clean.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  checkCanonRules,
  SURFACE_TYPES,
  INSIGHT_BUDGET_MAX,
  type CanonItem,
  type CanonLesson,
} from "../canonRules";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { V1_LESSONS } from "../../content/lessons/v1";

const REGISTRY: Record<string, CanonItem> = {
  "chunk-owned": { id: "chunk-owned", type: "chunk", text: "je voudrais", status: "active" },
  "noun-supported": { id: "noun-supported", type: "noun", text: "un thé", status: "supported" },
  "chunk-future": { id: "chunk-future", type: "chunk", text: "on y va", status: "recognition" },
  "grammar-meta": {
    id: "grammar-meta",
    type: "grammar-nugget",
    text: "ne ___ pas",
    status: "recognition",
  },
};

function lesson(id: string, screens: CanonLesson["screens"]): CanonLesson {
  return { id, screens };
}

describe("canon rules V3/V4/V5 (Lesson Flow Canon §11)", () => {
  test("real v1 lessons + real registry produce zero errors", () => {
    const findings = checkCanonRules(V1_LESSONS, ITEM_REGISTRY);
    assertEqual(
      findings.filter((f) => f.severity === "error"),
      [],
      "shipped lessons must respect the exposure-tier promise",
    );
  });

  test("real v1 lessons stay inside the insight budget (no V5 warnings)", () => {
    const findings = checkCanonRules(V1_LESSONS, ITEM_REGISTRY);
    assertEqual(
      findings.filter((f) => f.code === "insight_budget"),
      [],
      `no shipped lesson may carry more than ${INSIGHT_BUDGET_MAX} insight cards`,
    );
  });

  test("V3: exposure-tier item as REQUIRED weave piece is an error", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "weave",
            payload: {
              suggestedPieces: [
                { text: "je voudrais", itemId: "chunk-owned", required: true },
                { text: "on y va", itemId: "chunk-future", required: true },
              ],
            },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings.length, 1, "exactly the future piece is flagged");
    assertEqual(findings[0].code, "future_as_answer", "V3 code");
    assertEqual(findings[0].severity, "error", "V3 is a hard error");
    assert(findings[0].message.includes("chunk-future"), "message names the item");
  });

  test("V3: exposure-tier surface as the CORRECT fill option is an error (case-insensitive)", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "fill-with-traps",
            payload: {
              options: [
                { id: "a", text: "On y va", isCorrect: true },
                { id: "b", text: "je voudrais", isCorrect: false },
              ],
            },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings.length, 1, "only the correct option is answer material");
    assertEqual(findings[0].code, "future_as_answer", "V3 code");
  });

  test("V3: exposure-tier surface as a WRONG option (trap) is allowed", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "fill-with-traps",
            payload: {
              options: [
                { id: "a", text: "je voudrais", isCorrect: true },
                { id: "b", text: "on y va", isCorrect: false },
              ],
            },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings, [], "a trap only asks recognition, never production");
  });

  test("V4: exposure-tier item in the chip tray (non-required piece) is an error", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "weave",
            payload: {
              suggestedPieces: [{ text: "on y va", itemId: "chunk-future" }],
            },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings.length, 1, "the tray chip is flagged");
    assertEqual(findings[0].code, "future_in_forbidden_zone", "V4 code");
    assertEqual(findings[0].severity, "error", "V4 is a hard error");
  });

  test("V4: exposure-tier item highlighted on a meet-card is an error", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "meet-card",
            payload: {
              highlights: [
                { text: "je voudrais", itemId: "chunk-owned" },
                { text: "on y va", itemId: "chunk-future" },
              ],
            },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings.length, 1, "only the future highlight is flagged");
    assertEqual(findings[0].code, "future_in_forbidden_zone", "V4 code");
  });

  test("V4: exposure-tier surface in recap piecesUsed is an error", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "recap",
            payload: { piecesUsed: ["je voudrais", "on y va"] },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings.length, 1, '"Yours now" may only list owned surfaces');
    assertEqual(findings[0].code, "future_in_forbidden_zone", "V4 code");
  });

  test("meta types (grammar-nugget etc.) are exempt even at recognition status", () => {
    assert(!SURFACE_TYPES.has("grammar-nugget"), "meta type must not be a surface type");
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "weave",
            payload: {
              suggestedPieces: [{ text: "ne ___ pas", itemId: "grammar-meta", required: true }],
            },
          },
          {
            id: "s2",
            type: "recap",
            payload: { piecesUsed: ["ne ___ pas"] },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings, [], "the approved ne___pas frame chip stays legal (PR #168 canon)");
  });

  test("owned and supported items never trigger V3/V4", () => {
    const findings = checkCanonRules(
      [
        lesson("l-x", [
          {
            id: "s1",
            type: "weave",
            payload: {
              suggestedPieces: [
                { text: "je voudrais", itemId: "chunk-owned", required: true },
                { text: "un thé", itemId: "noun-supported" },
              ],
            },
          },
          {
            id: "s2",
            type: "recap",
            payload: { piecesUsed: ["je voudrais", "un thé"] },
          },
        ]),
      ],
      REGISTRY,
    );
    assertEqual(findings, [], "the rules only constrain the exposure tier");
  });

  test(`V5: more than ${INSIGHT_BUDGET_MAX} insight cards warns; at budget stays silent`, () => {
    const insight = (id: string) => ({ id, type: "insight-card", payload: {} });
    const atBudget = checkCanonRules(
      [lesson("l-ok", [insight("i1"), insight("i2"), insight("i3")])],
      REGISTRY,
    );
    assertEqual(atBudget, [], "exactly at budget is fine");

    const over = checkCanonRules(
      [lesson("l-over", [insight("i1"), insight("i2"), insight("i3"), insight("i4")])],
      REGISTRY,
    );
    assertEqual(over.length, 1, "one warning per overspent lesson");
    assertEqual(over[0].code, "insight_budget", "V5 code");
    assertEqual(over[0].severity, "warning", "budget overspend warns, does not block");
    assert(over[0].message.includes("4"), "message carries the actual count");
  });

  test("findings are deterministic and emitted in lesson/screen order", () => {
    const lessons: CanonLesson[] = [
      lesson("l-1", [
        { id: "s1", type: "recap", payload: { piecesUsed: ["on y va"] } },
        {
          id: "s2",
          type: "weave",
          payload: { suggestedPieces: [{ text: "on y va", itemId: "chunk-future" }] },
        },
      ]),
      lesson("l-2", [
        {
          id: "s1",
          type: "meet-card",
          payload: { highlights: [{ text: "on y va", itemId: "chunk-future" }] },
        },
      ]),
    ];
    const first = checkCanonRules(lessons, REGISTRY);
    assertEqual(first, checkCanonRules(lessons, REGISTRY), "same input, same output");
    assertEqual(
      first.map((f) => `${f.lessonId}/${f.screenId}`),
      ["l-1/s1", "l-1/s2", "l-2/s1"],
      "stable lesson/screen ordering",
    );
  });
});
