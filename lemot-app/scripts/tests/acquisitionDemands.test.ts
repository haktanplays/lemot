/**
 * Lesson acquisition-demand contract (AD-001..AD-005) + the shipped L0–L17 map.
 *
 * `acquisitionDemandItemIds` is the authored SOURCE OF TRUTH for active-new, so
 * the map is asserted as exact arrays: an extra, missing or reordered id changes
 * what a lesson claims to newly teach, and none of that may drift silently.
 *
 * No active-new counter and no journey-role budget check live here. The two
 * axes are pinned together only to prove they stay independent — L0 declares
 * four demands while carrying no journey role at all.
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  collectLessonItemIds,
  countLessonsDeclaringDemands,
  totalAcquisitionDemands,
  validateAcquisitionDemands,
} from "../../content/lessons/acquisitionDemands";
import { validateAcquisitionComponents } from "../../content/identity/acquisitionComponents";
import { validateAcquisitionLinks } from "../../content/identity/acquisitionLinks";
import { V1_LESSONS } from "../../content/lessons/v1";
import { getItem } from "../../content/itemRegistry";
import type { Lesson } from "../../content/lessonTypes";

/** The ratified L0–L17 declaration map. */
const RATIFIED: Record<string, readonly string[]> = {
  "v1-lesson-000": [
    "chunk-bonjour",
    "chunk-je-voudrais",
    "noun-cafe",
    "chunk-sil-vous-plait",
  ],
  "v1-lesson-001": ["chunk-merci"],
  "v1-lesson-002": ["chunk-je-suis"],
  "v1-lesson-003": ["chunk-je-ne-suis-pas", "chunk-ce-n-est-pas", "chunk-non"],
  "v1-lesson-004": ["chunk-j-ai"],
  "v1-lesson-005": ["chunk-un-cafe", "chunk-une-question"],
  "v1-lesson-006": ["chunk-au-revoir"],
  "v1-lesson-007": ["chunk-je-vais"],
  "v1-lesson-008": ["chunk-c-est-ou"],
  "v1-lesson-009": ["chunk-faire-une-pause"],
  "v1-lesson-010": [],
  "v1-lesson-011": ["chunk-je-peux"],
  "v1-lesson-012": ["chunk-est-ce-que"],
  "v1-lesson-013": [],
  "v1-lesson-014": ["word-y-place", "chunk-on-y-va"],
  "v1-lesson-015": ["chunk-il-faut"],
  // L16 is Integration: PRJ-015 IC-006 binds its active-new to zero.
  "v1-lesson-016": [],
  // L17 is Standard: three ratified demands, inside the 1-4 band and inside
  // PRJ-015 IC-002's normal 1-3 target.
  "v1-lesson-017": ["chunk-ca-va", "adj-fatigue", "adj-content"],
};

/** Minimal synthetic lesson carrying one declaration and one reference site. */
const lesson = (over: object): Lesson =>
  ({ id: "v1-lesson-999", screens: [], learningItems: [], ...over }) as unknown as Lesson;

/** A screen that merely references ids, so AD-005 is satisfied. */
const refScreen = (...ids: string[]) =>
  ({ id: "s00", type: "meet-card", targetItemIds: ids, payload: {} }) as never;

describe("acquisitionDemands — shipped L0–L17 map", () => {
  test("every lesson declares exactly its ratified demands", () => {
    assertEqual(
      V1_LESSONS.map((l) => l.id).sort(),
      Object.keys(RATIFIED).sort(),
      "the shipped lesson set matches the ratified map",
    );
    for (const l of V1_LESSONS) {
      assertEqual(
        l.acquisitionDemandItemIds,
        RATIFIED[l.id],
        `${l.id} declares exactly its ratified demands`,
      );
    }
  });

  test("total declared demands across v1 is 24", () => {
    // 21 through L16 (Integration contributed 0) + L17's three.
    assertEqual(totalAcquisitionDemands(V1_LESSONS), 24, "current-v1 regression total");
  });

  test("migration is complete — all 18 lessons declare the field", () => {
    assertEqual(V1_LESSONS.length, 18, "18 shipped lessons");
    assertEqual(
      countLessonsDeclaringDemands(V1_LESSONS),
      18,
      "none is left unadjudicated",
    );
    for (const l of V1_LESSONS) {
      assert(
        l.acquisitionDemandItemIds !== undefined,
        `${l.id} must not be left in migration state`,
      );
    }
  });

  test("L10, L13 and L16 declare an explicit empty array, not an omission", () => {
    for (const id of ["v1-lesson-010", "v1-lesson-013", "v1-lesson-016"]) {
      const l = V1_LESSONS.find((x) => x.id === id);
      assert(l?.acquisitionDemandItemIds !== undefined, `${id} declares the field`);
      assertEqual(l?.acquisitionDemandItemIds, [], `${id} is adjudicated zero`);
    }
  });

  test("L0 carries four demands despite having no journey role", () => {
    // Two independent axes. Acquisition demand is never inferred from the
    // absence of a journey role: L0 is pre-curriculum, not empty.
    const l0 = V1_LESSONS.find((l) => l.number === 0);
    assertEqual(l0?.journeyRole, undefined, "L0 sits outside the five roles");
    assertEqual(l0?.acquisitionDemandItemIds?.length, 4, "and still teaches four things");
  });

  test("L7 declares one demand; à la maison stays supported material", () => {
    const l7 = V1_LESSONS.find((l) => l.number === 7);
    assertEqual(l7?.acquisitionDemandItemIds, ["chunk-je-vais"], "je vais carries the demand");
    assert(
      !(l7?.acquisitionDemandItemIds ?? []).includes("chunk-a-la-maison"),
      "the destination is supported, not a second demand",
    );
  });
});

describe("acquisitionDemands — structural contract", () => {
  test("the shipped declarations pass AD-001..AD-005", () => {
    assertEqual(validateAcquisitionDemands(V1_LESSONS).join(" | "), "", "shipped map is clean");
  });

  test("AD-001 — an unknown item id is a hard error", () => {
    const errors = validateAcquisitionDemands([
      lesson({ acquisitionDemandItemIds: ["ghost"], screens: [refScreen("ghost")] }),
    ]);
    assert(
      errors.some((e) => e.startsWith("AD-001")),
      `unknown id caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AD-002 — a duplicated demand is a hard error", () => {
    const errors = validateAcquisitionDemands([
      lesson({
        acquisitionDemandItemIds: ["chunk-merci", "chunk-merci"],
        screens: [refScreen("chunk-merci")],
      }),
    ]);
    assert(
      errors.some((e) => e.startsWith("AD-002")),
      `duplicate caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AD-003 — an acquisition-covered whole may not be declared", () => {
    const errors = validateAcquisitionDemands([
      lesson({
        acquisitionDemandItemIds: ["chunk-j-ai-faim"],
        screens: [refScreen("chunk-j-ai-faim")],
      }),
    ]);
    assert(
      errors.some((e) => e.startsWith("AD-003")),
      `covered whole caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AD-004 — an acquisitionLink linked identity may not be declared", () => {
    const errors = validateAcquisitionDemands([
      lesson({ acquisitionDemandItemIds: ["noun-the"], screens: [refScreen("noun-the")] }),
    ]);
    assert(
      errors.some((e) => e.startsWith("AD-004")),
      `linked identity caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AD-005 — a demand the lesson never references is a hard error", () => {
    const errors = validateAcquisitionDemands([
      lesson({ acquisitionDemandItemIds: ["chunk-merci"], screens: [refScreen("chunk-bonjour")] }),
    ]);
    assert(
      errors.some((e) => e.startsWith("AD-005")),
      `unreachable demand caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AD-005 — every structured reference site satisfies reachability", () => {
    // learningItems, targets, narrowed evidence targets, suggested pieces and
    // card highlights all count. No screen type is privileged.
    const ids = collectLessonItemIds(
      lesson({
        learningItems: [{ id: "a" }],
        screens: [
          { id: "s0", type: "meet-card", targetItemIds: ["b"], payload: {} },
          {
            id: "s1",
            type: "weave",
            targetItemIds: ["c"],
            evidenceTargetItemIds: ["c"],
            payload: { suggestedPieces: [{ text: "x", itemId: "d" }] },
          },
          { id: "s2", type: "meet-card", payload: { highlights: [{ text: "y", itemId: "e" }] } },
        ] as never,
      }),
    );
    assertEqual([...ids].sort(), ["a", "b", "c", "d", "e"], "all five sites collected");
  });

  test("[] is valid and undefined is legacy-valid", () => {
    assertEqual(
      validateAcquisitionDemands([lesson({ acquisitionDemandItemIds: [] })]).join(" | "),
      "",
      "adjudicated zero is valid",
    );
    assertEqual(
      validateAcquisitionDemands([lesson({})]).join(" | "),
      "",
      "absence is legacy-valid, not an error",
    );
  });

  test("an acquisitionLink PRIMARY identity is structurally legal", () => {
    assertEqual(
      validateAcquisitionDemands([
        lesson({
          acquisitionDemandItemIds: ["chunk-un-the"],
          screens: [refScreen("chunk-un-the")],
        }),
      ]).join(" | "),
      "",
      "only the linked side is barred (AD-004)",
    );
  });

  test("supported / recognition status does not invalidate a declaration", () => {
    // IC-002 counts a promotion from supported or recognition to active, and
    // registry status is descriptive metadata — never an accounting authority.
    assertEqual(getItem("word-ici").status, "supported", "precondition: supported item");
    assertEqual(
      validateAcquisitionDemands([
        lesson({ acquisitionDemandItemIds: ["word-ici"], screens: [refScreen("word-ici")] }),
      ]).join(" | "),
      "",
      "a promotion is structurally legal",
    );
  });
});

describe("acquisitionDemands — non-regression", () => {
  test("no acquisition-covered composite is declared anywhere", () => {
    const COVERED = [
      "chunk-j-ai-faim",
      "chunk-j-ai-une-question",
      "chunk-j-y-vais",
      "chunk-je-suis-ici",
      "chunk-non-merci",
    ];
    assertEqual(validateAcquisitionComponents().join(" | "), "", "the five relations still pass");
    for (const l of V1_LESSONS) {
      for (const id of COVERED) {
        assert(
          !(l.acquisitionDemandItemIds ?? []).includes(id),
          `${l.id} must not declare covered whole ${id}`,
        );
      }
    }
  });

  test("acquisitionLink is unchanged and noun-the is never declared", () => {
    assertEqual(validateAcquisitionLinks().join(" | "), "", "registry links stay clean");
    assertEqual(getItem("chunk-un-the").acquisitionLink?.role, "primary", "tea primary intact");
    assertEqual(getItem("noun-the").acquisitionLink?.role, "linked", "tea linked intact");
    for (const l of V1_LESSONS) {
      assert(
        !(l.acquisitionDemandItemIds ?? []).includes("noun-the"),
        `${l.id} must not declare the linked sub-identity`,
      );
    }
    // chunk-un-the is a legal primary but is constitutive support in L1, so it
    // is deliberately not declared there.
    const l1 = V1_LESSONS.find((l) => l.number === 1);
    assert(
      !(l1?.acquisitionDemandItemIds ?? []).includes("chunk-un-the"),
      "L1 declares merci only",
    );
  });

  test("journey roles are unchanged by this pass", () => {
    const roles = V1_LESSONS.map((l) => l.journeyRole);
    assertEqual(
      roles,
      [
        undefined,
        "standard",
        "standard",
        "standard",
        "standard",
        "standard",
        "integration",
        "doorway",
        "doorway",
        "doorway",
        "integration",
        "doorway",
        "doorway",
        "integration",
        "doorway",
        "doorway",
        "integration",
        "standard",
      ],
      "the ratified role map is untouched",
    );
  });
});
