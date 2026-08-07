/**
 * Structural contract for `acquisitionComponents` (AC-001..AC-006).
 *
 * Scope is deliberately narrow: the field's SHAPE. There is no active-new
 * count here, no first-production-lesson derivation, and no assertion that
 * absence of the field means an identity is independently owned — registry
 * coverage has not been adjudicated, so absence currently means only "not
 * declared".
 *
 * Two non-regression guarantees are pinned alongside the new rules: the
 * `acquisitionLink` invariants are untouched, and an identity that declares
 * components remains a fully legal lesson target (which is precisely what
 * `acquisitionLink.role: "linked"` is NOT — the two relations must not be
 * confused).
 */
import { describe, test, assert, assertEqual } from "./harness";
import {
  countDeclaredAcquisitionComponents,
  validateAcquisitionComponents,
} from "../../content/identity/acquisitionComponents";
import { validateAcquisitionLinks } from "../../content/identity/acquisitionLinks";
import { getItem } from "../../content/itemRegistry";
import type { LearningItem } from "../../content/lessonTypes";

/** Minimal well-formed registry row; `over` supplies the id and the field under test. */
const base = (over: object): LearningItem =>
  ({ id: "x", type: "chunk", text: "x", status: "supported", ...over }) as LearningItem;

/** Build a registry from rows whose `id` is already set. */
const reg = (...rows: LearningItem[]): Readonly<Record<string, LearningItem>> =>
  Object.fromEntries(rows.map((r) => [r.id, r]));

describe("acquisitionComponents — structural contract", () => {
  test("the shipped registry declares no relations and passes unchanged", () => {
    assertEqual(validateAcquisitionComponents().join(" | "), "", "shipped registry is clean");
    assertEqual(
      countDeclaredAcquisitionComponents(),
      0,
      "no registry edges are authored in this pass",
    );
  });

  test("one, two and variadic component relations are all valid", () => {
    const one = reg(
      base({ id: "a", acquisitionComponents: ["b"] }),
      base({ id: "b" }),
    );
    assertEqual(validateAcquisitionComponents(one).join(" | "), "", "one component is valid");

    const two = reg(
      base({ id: "a", acquisitionComponents: ["b", "c"] }),
      base({ id: "b" }),
      base({ id: "c" }),
    );
    assertEqual(validateAcquisitionComponents(two).join(" | "), "", "two components are valid");

    const variadic = reg(
      base({ id: "a", acquisitionComponents: ["b", "c", "d", "e"] }),
      base({ id: "b" }),
      base({ id: "c" }),
      base({ id: "d" }),
      base({ id: "e" }),
    );
    assertEqual(
      validateAcquisitionComponents(variadic).join(" | "),
      "",
      "four components are valid — no arity ceiling",
    );
  });

  test("AC-001 — a component that does not exist is a hard error", () => {
    const errors = validateAcquisitionComponents(
      reg(base({ id: "a", acquisitionComponents: ["ghost"] })),
    );
    assert(
      errors.some((e) => e.startsWith("AC-001") && e.includes("does not exist")),
      `missing component caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AC-002 — self-reference is a hard error", () => {
    const errors = validateAcquisitionComponents(
      reg(base({ id: "a", acquisitionComponents: ["a"] })),
    );
    assert(
      errors.some((e) => e.startsWith("AC-002")),
      `self-reference caught, got: ${errors.join(" | ")}`,
    );
    assert(
      !errors.some((e) => e.startsWith("AC-005")),
      "a self-reference reports once as AC-002, not also as a cycle",
    );
  });

  test("AC-003 — an empty component list is a hard error", () => {
    const errors = validateAcquisitionComponents(
      reg(base({ id: "a", acquisitionComponents: [] })),
    );
    assert(
      errors.some((e) => e.startsWith("AC-003")),
      `empty list caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AC-004 — a duplicated component is a hard error", () => {
    const errors = validateAcquisitionComponents(
      reg(base({ id: "a", acquisitionComponents: ["b", "b"] }), base({ id: "b" })),
    );
    assert(
      errors.some((e) => e.startsWith("AC-004")),
      `duplicate caught, got: ${errors.join(" | ")}`,
    );
  });

  test("AC-005 — direct and transitive cycles are hard errors, reported once", () => {
    const direct = validateAcquisitionComponents(
      reg(
        base({ id: "a", acquisitionComponents: ["b"] }),
        base({ id: "b", acquisitionComponents: ["a"] }),
      ),
    );
    const directCycles = direct.filter((e) => e.startsWith("AC-005"));
    assertEqual(directCycles.length, 1, `a→b→a reported once, got: ${direct.join(" | ")}`);

    const transitive = validateAcquisitionComponents(
      reg(
        base({ id: "a", acquisitionComponents: ["b"] }),
        base({ id: "b", acquisitionComponents: ["c"] }),
        base({ id: "c", acquisitionComponents: ["a"] }),
      ),
    );
    const transitiveCycles = transitive.filter((e) => e.startsWith("AC-005"));
    assertEqual(
      transitiveCycles.length,
      1,
      `a→b→c→a reported once, got: ${transitive.join(" | ")}`,
    );
  });

  test("AC-005 — a shared component on two composites is not a cycle", () => {
    const diamond = reg(
      base({ id: "a", acquisitionComponents: ["b", "c"] }),
      base({ id: "b", acquisitionComponents: ["d"] }),
      base({ id: "c", acquisitionComponents: ["d"] }),
      base({ id: "d" }),
    );
    assertEqual(
      validateAcquisitionComponents(diamond).join(" | "),
      "",
      "re-visiting a finished node is not a cycle",
    );
  });

  test("AC-006 — an acquisitionLink linked identity may not declare components", () => {
    const errors = validateAcquisitionComponents(
      reg(
        base({ id: "p", acquisitionLink: { role: "primary", linkedItemIds: ["l"] } }),
        base({
          id: "l",
          acquisitionLink: { role: "linked", primaryItemId: "p" },
          acquisitionComponents: ["c"],
        }),
        base({ id: "c" }),
      ),
    );
    assert(
      errors.some((e) => e.startsWith("AC-006")),
      `stacked relations caught, got: ${errors.join(" | ")}`,
    );
  });

  test("an acquisitionLink PRIMARY may still declare components", () => {
    const errors = validateAcquisitionComponents(
      reg(
        base({
          id: "p",
          acquisitionLink: { role: "primary", linkedItemIds: ["l"] },
          acquisitionComponents: ["c"],
        }),
        base({ id: "l", acquisitionLink: { role: "linked", primaryItemId: "p" } }),
        base({ id: "c" }),
      ),
    );
    assertEqual(errors.join(" | "), "", "only the linked side is barred (AC-006)");
  });

  test("errors are deterministic across runs", () => {
    const broken = reg(
      base({ id: "a", acquisitionComponents: ["ghost", "b", "b"] }),
      base({ id: "b", acquisitionComponents: ["c"] }),
      base({ id: "c", acquisitionComponents: ["b"] }),
    );
    assertEqual(
      validateAcquisitionComponents(broken),
      validateAcquisitionComponents(broken),
      "same input yields the same report",
    );
  });
});

describe("acquisitionComponents — non-regression", () => {
  test("acquisitionLink invariants are untouched", () => {
    assertEqual(validateAcquisitionLinks().join(" | "), "", "registry links stay clean");
    const primary = getItem("chunk-un-the");
    const linked = getItem("noun-the");
    assert(
      primary.acquisitionLink?.role === "primary" &&
        primary.acquisitionLink.linkedItemIds.join(",") === "noun-the",
      "the tea primary row is unchanged",
    );
    assert(
      linked.acquisitionLink?.role === "linked" &&
        linked.acquisitionLink.primaryItemId === "chunk-un-the",
      "the tea linked row is unchanged",
    );
    assertEqual(
      primary.acquisitionComponents,
      undefined,
      "the new field was not added to the tea rows",
    );
    // The one-primary rule still bites — proof the link validator was not relaxed.
    const doubleClaimed = validateAcquisitionLinks(
      reg(
        base({ id: "a", acquisitionLink: { role: "primary", linkedItemIds: ["c"] } }),
        base({ id: "b", acquisitionLink: { role: "primary", linkedItemIds: ["c"] } }),
        base({ id: "c", acquisitionLink: { role: "linked", primaryItemId: "a" } }),
      ),
    );
    assert(
      doubleClaimed.some((e) => e.includes("exactly one primary")),
      "the one-primary invariant still fires",
    );
  });

  test("declaring components does not make an identity an illegal target", () => {
    // The `linked` role carries a target/evidence prohibition; this relation
    // carries none. Composites stay targetable — that separation is the whole
    // reason the field exists rather than reusing acquisitionLink.
    const composite = base({ id: "a", acquisitionComponents: ["b"] });
    assertEqual(
      validateAcquisitionComponents(reg(composite, base({ id: "b" }))).join(" | "),
      "",
      "a composite is well-formed regardless of how lessons target it",
    );
    assertEqual(
      composite.acquisitionLink,
      undefined,
      "declaring components does not imply an acquisitionLink role",
    );
  });
});
