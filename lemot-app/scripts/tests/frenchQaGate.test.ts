/**
 * What the French-QA status actually gates, pinned so nobody assumes more.
 *
 * The vocabulary says `pending` content is "authored but not reachable by a
 * learner". That is enforced for registered SENTENCES — `payloadRegistry`
 * refuses a payload whose sentence is pending or rejected — and it is NOT
 * enforced for registry ITEMS, which no runtime path consults at all.
 *
 * This is not a hole somebody left open by accident; it is the boundary the
 * two registries were built with, and item-level QA has always been a
 * provenance record rather than a render gate. Writing it down matters because
 * the gap is invisible and the wrong half is intuitive: a reader who sees
 * twenty `pending` items in a shipped lesson will reasonably assume either that
 * the lesson is blocked or that the status is meaningless, and neither is true.
 *
 * The consequence to keep in view: a lesson whose items are unreviewed still
 * renders, which is right for development preview and is NOT a release
 * clearance. Anything that turns this into a release gate is a founder call
 * about the release path, not an authoring change, so this test pins today's
 * behaviour rather than changing it.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import {
  isInternalPilotFrenchReachable,
  isHumanFrenchApproved,
} from "../../content/identity/frenchQaStatus";

type Row = { frenchQa?: string };
const REGISTRY = ITEM_REGISTRY as unknown as Record<string, Row>;

describe("French QA status means exactly what it says", () => {
  test("a waiver is never an attestation", () => {
    assert(
      !isHumanFrenchApproved("founder_waived_provisional" as never),
      "a founder waiver must never satisfy human approval",
    );
    assert(
      isHumanFrenchApproved("approved" as never),
      "only approved is approval",
    );
  });

  test("pending and rejected are never internally reachable", () => {
    for (const status of ["pending", "rejected"] as const) {
      assert(
        !isInternalPilotFrenchReachable(status as never),
        `${status} must not be internally reachable`,
      );
    }
  });

  test("the L7 production items are pending, and no waiver is claimed for them", () => {
    // Twenty-five items across two tranches, authored by an agent with no
    // named-human review and no recorded founder decision. If this list ever shows a waiver, check that a
    // decision was actually made rather than assumed from the neighbours.
    const L7_AUTHORED = [
      "chunk-de-rien", "chunk-encore-merci", "chunk-bonne-nuit",
      "chunk-bon-week-end", "chunk-bon-voyage",
      "chunk-au-cafe", "chunk-au-travail", "chunk-au-restaurant", "chunk-a-la-gare",
      "chunk-a-l-hotel", "chunk-bonne-soiree", "chunk-bonne-journee", "chunk-a-demain",
      "chunk-a-bientot", "chunk-a-tout-a-l-heure", "chunk-je-pars", "chunk-je-dois-partir",
      "chunk-merci-beaucoup", "chunk-desole", "chunk-une-autre-fois", "chunk-peut-etre",
      "adverb-maintenant", "adverb-plus-tard", "adverb-ce-soir", "adverb-demain",
    ];
    for (const id of L7_AUTHORED) {
      assertEqual(REGISTRY[id]?.frenchQa, "pending", `${id} French QA status`);
    }
  });

  test("item-level QA gates provenance, not rendering — and that is the boundary", () => {
    // The honest statement of today's behaviour. Items carrying an unreachable
    // status still ship inside their lesson, because nothing in the render path
    // reads item-level `frenchQa`; the enforced gate lives in the sentence
    // registry. Turning this into a release gate is a founder decision about
    // the release path, not an authoring change.
    const unreachable = Object.entries(REGISTRY).filter(
      ([, row]) =>
        row.frenchQa !== undefined &&
        !isInternalPilotFrenchReachable(row.frenchQa as never),
    );
    assert(
      unreachable.length > 0,
      "there is unreviewed content in the registry, and this test exists to keep it visible",
    );
    assertEqual(
      unreachable.length,
      36,
      "the two L7 tranches plus the L1-L10 breadth pass are the whole of the " +
        "currently un-cleared item inventory; no human has reviewed any of it",
    );
  });
});
