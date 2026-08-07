/**
 * Acquisition-component coverage validation — pure, structural only.
 *
 * `acquisitionComponents` records that an identity's acquisition
 * responsibility is COMPLETELY carried by the listed component identities, so
 * the whole identity creates no additional acquisition demand merely by
 * existing or by being targeted. It is global/stable registry metadata.
 *
 * This validator checks STRUCTURE, never semantics. It deliberately does NOT
 * infer the relation from multi-token surfaces, sentence shape, idiomaticity,
 * formula class, `status`, or `relatedItemIds` — `au revoir`, `on y va` and the
 * protected negation frames are legitimately independent acquisition units, and
 * `on y va` in particular cannot be decomposed at all because `on` has no
 * identity of its own. Whether a given identity SHOULD carry the field is an
 * authoring judgement; only whether a declared relation is well-formed is
 * mechanical, and only that is enforced here.
 *
 * What this deliberately is NOT: an active-new counter. No first-production
 * lesson is computed, no journey-role budget is checked, and absence of the
 * field is not read as "independently owned" — registry coverage has not been
 * exhaustively adjudicated. Lesson-level acquisition responsibility is a later
 * bounded pass.
 *
 * It also does not touch `acquisitionLink`, which owns a different relation
 * (identity granularity + evidence routing, with a target/evidence prohibition
 * on its `linked` side). The one interaction enforced here is AC-006: the two
 * relations may not be stacked on the same row.
 */
import { ITEM_REGISTRY } from "../itemRegistry";
import type { LearningItem } from "../lessonTypes";

/**
 * How many registry rows currently declare an acquisition-component relation.
 *
 * Reported by the content validator so coverage is visible rather than
 * assumed. A count of 0 is the correct state until edges are adjudicated — it
 * means "nothing declared", never "nothing composite".
 */
export function countDeclaredAcquisitionComponents(
  registry: Readonly<Record<string, LearningItem>> = ITEM_REGISTRY,
): number {
  return Object.values(registry).filter(
    (item) => item.acquisitionComponents !== undefined,
  ).length;
}

/**
 * Structural checks over every declared `acquisitionComponents` relation.
 *
 * Returns a sorted list of human-readable hard errors; an empty array means the
 * declared relations are well-formed. A registry with no declarations at all is
 * valid — the field is optional and currently unpopulated.
 *
 * AC-001 every component id exists · AC-002 no self-reference · AC-003
 * non-empty when present · AC-004 no duplicate components · AC-005 the
 * component graph is acyclic (direct and transitive) · AC-006 an
 * `acquisitionLink.role: "linked"` identity may not also declare components.
 */
export function validateAcquisitionComponents(
  registry: Readonly<Record<string, LearningItem>> = ITEM_REGISTRY,
): string[] {
  const errors: string[] = [];
  const ids = Object.keys(registry).sort();

  for (const id of ids) {
    const components = registry[id].acquisitionComponents;
    if (components === undefined) continue;

    // AC-003 — an empty list claims coverage by nothing at all.
    if (components.length === 0) {
      errors.push(
        `AC-003 "${id}" declares acquisitionComponents with no components — omit the field instead of claiming coverage by nothing`,
      );
    }

    // AC-006 — linked-only identities are evidence-routing granularity and are
    // barred from being ordinary targets, so a coverage claim about them is
    // meaningless. Checked before traversal so a stacked row reports once.
    if (registry[id].acquisitionLink?.role === "linked") {
      errors.push(
        `AC-006 "${id}" is an acquisitionLink "linked" sub-identity and may not also declare acquisitionComponents — the two relations model different things`,
      );
    }

    const seen = new Set<string>();
    for (const componentId of components) {
      // AC-004 — a repeated component says nothing twice.
      if (seen.has(componentId)) {
        errors.push(
          `AC-004 "${id}" lists component "${componentId}" more than once`,
        );
        continue;
      }
      seen.add(componentId);

      // AC-002 — self-coverage is circular by definition.
      if (componentId === id) {
        errors.push(`AC-002 "${id}" lists itself as its own component`);
        continue;
      }

      // AC-001 — a component that does not exist cannot carry anything.
      if (!registry[componentId]) {
        errors.push(
          `AC-001 "${id}" lists component "${componentId}", which does not exist`,
        );
      }
    }
  }

  errors.push(...findComponentCycles(registry, ids));
  return errors;
}

/**
 * AC-005 — report every cycle in the composite → component graph.
 *
 * Iterative depth-first search with an explicit path, so a deep chain cannot
 * overflow the stack. Self-references are left to AC-002 and skipped here to
 * avoid reporting one mistake twice. Each distinct cycle is reported once,
 * keyed by its rotation-normalised member sequence, and the whole walk runs in
 * sorted id order so the output is deterministic.
 */
function findComponentCycles(
  registry: Readonly<Record<string, LearningItem>>,
  ids: readonly string[],
): string[] {
  const errors: string[] = [];
  const reported = new Set<string>();
  const finished = new Set<string>();

  const componentsOf = (id: string): string[] =>
    (registry[id]?.acquisitionComponents ?? [])
      .filter((componentId) => componentId !== id && registry[componentId] !== undefined)
      .slice()
      .sort();

  for (const root of ids) {
    if (finished.has(root)) continue;

    const path: string[] = [];
    const onPath = new Set<string>();
    // Each frame walks one node's components; `next` is the index reached so far.
    const stack: { id: string; next: number; components: string[] }[] = [
      { id: root, next: 0, components: componentsOf(root) },
    ];
    path.push(root);
    onPath.add(root);

    while (stack.length > 0) {
      const frame = stack[stack.length - 1];
      if (frame.next >= frame.components.length) {
        finished.add(frame.id);
        onPath.delete(frame.id);
        path.pop();
        stack.pop();
        continue;
      }

      const componentId = frame.components[frame.next];
      frame.next += 1;

      if (onPath.has(componentId)) {
        const cycle = path.slice(path.indexOf(componentId));
        const key = normaliseCycle(cycle);
        if (!reported.has(key)) {
          reported.add(key);
          errors.push(
            `AC-005 acquisitionComponents cycle: ${[...cycle, componentId].join(" → ")}`,
          );
        }
        continue;
      }
      if (finished.has(componentId)) continue;

      stack.push({
        id: componentId,
        next: 0,
        components: componentsOf(componentId),
      });
      path.push(componentId);
      onPath.add(componentId);
    }
  }

  return errors.sort();
}

/** Rotation-independent key for a cycle, so one loop is reported once. */
function normaliseCycle(cycle: readonly string[]): string {
  let smallest = 0;
  for (let i = 1; i < cycle.length; i += 1) {
    if (cycle[i] < cycle[smallest]) smallest = i;
  }
  return [...cycle.slice(smallest), ...cycle.slice(0, smallest)].join(">");
}
