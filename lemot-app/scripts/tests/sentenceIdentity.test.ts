/**
 * Sentence identity tests (PR-01).
 *
 * All fixtures here are TEST-LOCAL and synthetic. No production French is
 * registered by this PR, and none of the 30 authored L1 seeds appears — the
 * registration path is proven without shipping content.
 */
import { describe, test, assert, assertEqual } from "./harness";
import type {
  SentenceId,
  SentenceRecord,
} from "../../content/identity/sentenceIdentity";
import {
  assertSentenceId,
  buildSentenceRegistry,
  isSentenceId,
  validateSentenceRecord,
} from "../../content/identity/sentenceIdentity";
import { SENTENCE_REGISTRY } from "../../content/identity/sentenceRegistry";

/** Minimal synthetic record; every field overridable per test. */
function makeRecord(over: Partial<SentenceRecord> = {}): SentenceRecord {
  return {
    id: "sent:l01-test-surface" as SentenceId,
    preferredSurface: "Test surface.",
    acceptedAlternatives: [],
    itemIds: ["chunk-bonjour"],
    spans: [{ text: "Test", treatment: "active", itemId: "chunk-bonjour" }],
    provenance: "newly-authored",
    lessonEligibility: ["v1-lesson-001"],
    frenchQa: "pending",
    status: "active",
    ...over,
  };
}

const hasError = (errors: readonly string[], needle: string): boolean =>
  errors.some((e) => e.includes(needle));

describe("sentence id format", () => {
  test("valid sent:l01-* id passes", () => {
    assert(isSentenceId("sent:l01-je-voudrais-un-cafe"), "valid id must pass");
    assert(isSentenceId("sent:l10-a"), "single-segment slug is valid");
    assertEqual(
      assertSentenceId("sent:l01-je-voudrais-un-cafe"),
      "sent:l01-je-voudrais-un-cafe",
      "assert should echo",
    );
  });

  test("invalid prefix fails", () => {
    for (const id of ["chunk:l01-x", "sentence:l01-x", "l01-x", "sent-l01-x", "sent:"]) {
      assert(!isSentenceId(id), `"${id}" must be rejected`);
    }
  });

  test("malformed lesson prefix fails", () => {
    for (const id of ["sent:l1-x", "sent:l001-x", "sent:lNN-x", "sent:x-y", "sent:L01-x"]) {
      assert(!isSentenceId(id), `"${id}" must be rejected`);
    }
  });

  test("uppercase, accents, apostrophes and whitespace fail", () => {
    for (const id of [
      "sent:l01-Je-Voudrais",
      "sent:l01-je-voudrais-un-café",
      "sent:l01-s'il-vous-plait",
      "sent:l01-je voudrais",
      "sent:l01- je-voudrais",
    ]) {
      assert(!isSentenceId(id), `"${id}" must be rejected`);
    }
  });

  test("edge and double hyphens fail", () => {
    for (const id of ["sent:l01-", "sent:l01--x", "sent:l01-x-", "sent:l01-x--y"]) {
      assert(!isSentenceId(id), `"${id}" must be rejected`);
    }
  });

  test("assertSentenceId throws on a malformed id", () => {
    let threw = false;
    try {
      assertSentenceId("sent:bad");
    } catch {
      threw = true;
    }
    assert(threw, "assertSentenceId must throw on a malformed id");
  });
});

describe("sentence record validation", () => {
  test("a well-formed record has no findings", () => {
    assertEqual(validateSentenceRecord(makeRecord()).join(" | "), "", "expected no findings");
  });

  test("empty preferred surface fails", () => {
    const errors = validateSentenceRecord(makeRecord({ preferredSurface: "   " }));
    assert(hasError(errors, "preferredSurface"), "empty surface must be reported");
  });

  test("preferred surface repeated as an alternative fails", () => {
    const errors = validateSentenceRecord(
      makeRecord({ preferredSurface: "Bonjour.", acceptedAlternatives: ["Bonjour."] }),
    );
    assert(hasError(errors, "repeated as an accepted alternative"), "must be reported");
  });

  test("duplicate alternatives fail", () => {
    const errors = validateSentenceRecord(
      makeRecord({ acceptedAlternatives: ["Bonjour !", "Bonjour !"] }),
    );
    assert(hasError(errors, "duplicate accepted alternative"), "must be reported");
  });

  test("unknown item reference fails", () => {
    const errors = validateSentenceRecord(
      makeRecord({ itemIds: ["chunk-does-not-exist" as never] }),
    );
    assert(hasError(errors, "not a canonical ITEM_REGISTRY id"), "must be reported");
  });

  test("a fixture colon id is not an acceptable item reference", () => {
    const errors = validateSentenceRecord(makeRecord({ itemIds: ["chunk:bonjour" as never] }));
    assert(hasError(errors, "not a canonical ITEM_REGISTRY id"), "fixture id must be rejected");
  });

  test("unknown span item reference fails", () => {
    const errors = validateSentenceRecord(
      makeRecord({ spans: [{ text: "x", treatment: "ghost", itemId: "nope" as never }] }),
    );
    assert(hasError(errors, "span item reference"), "must be reported");
  });

  test("a span without an item id is allowed", () => {
    // PR-07 added bidirectional span/item coverage, so the fixture keeps the
    // item-bearing span alongside the unattached meta span — the INTENT under
    // test (unattached spans are valid) is unchanged.
    const errors = validateSentenceRecord(
      makeRecord({
        spans: [
          { text: "Test", treatment: "active", itemId: "chunk-bonjour" },
          { text: ", ", treatment: "meta" },
        ],
      }),
    );
    assertEqual(errors.join(" | "), "", "unattached spans are valid");
  });

  test("span/item coverage is bidirectional (PR-07)", () => {
    const noSpan = validateSentenceRecord(makeRecord({ spans: [] }));
    assert(hasError(noSpan, "has no span realising it"), "unrealised itemId reported");
    const notClaimed = validateSentenceRecord(
      makeRecord({
        itemIds: [],
        spans: [{ text: "Test", treatment: "active", itemId: "chunk-bonjour" }],
      }),
    );
    assert(hasError(notClaimed, "is not listed in itemIds"), "unclaimed span reported");
  });
});

describe("sentence registry construction", () => {
  test("valid records build a registry", () => {
    const built = buildSentenceRegistry([
      makeRecord({ id: "sent:l01-one" as SentenceId }),
      makeRecord({ id: "sent:l01-two" as SentenceId }),
    ]);
    assertEqual(built.errors.join(" | "), "", "expected no errors");
    assertEqual(Object.keys(built.registry).length, 2, "expected two records");
  });

  test("duplicate sentence id fails", () => {
    const built = buildSentenceRegistry([
      makeRecord({ id: "sent:l01-dup" as SentenceId }),
      makeRecord({ id: "sent:l01-dup" as SentenceId }),
    ]);
    assert(hasError(built.errors, "duplicate sentence id"), "must be reported");
    assertEqual(Object.keys(built.registry).length, 0, "a failed build must not be adopted");
  });

  test("a deprecated id cannot be reused in the same construction", () => {
    const built = buildSentenceRegistry([
      makeRecord({ id: "sent:l01-retired" as SentenceId, status: "deprecated" }),
      makeRecord({ id: "sent:l01-retired" as SentenceId, status: "active" }),
    ]);
    assert(hasError(built.errors, "must not be reused"), "reuse must be reported");
  });

  test("a malformed record id fails the build", () => {
    const built = buildSentenceRegistry([makeRecord({ id: "sent:BAD" as SentenceId })]);
    assert(hasError(built.errors, "malformed"), "malformed id must be reported");
    assertEqual(Object.keys(built.registry).length, 0, "a failed build must not be adopted");
  });

  test("accepted alternatives stay properties of one identity", () => {
    const built = buildSentenceRegistry([
      makeRecord({
        id: "sent:l01-alts" as SentenceId,
        preferredSurface: "Bonjour.",
        acceptedAlternatives: ["Bonjour !", "bonjour."],
      }),
    ]);
    assertEqual(built.errors.join(" | "), "", "expected no errors");
    assertEqual(Object.keys(built.registry).length, 1, "alternatives must not create new ids");
    assertEqual(
      built.registry["sent:l01-alts"].acceptedAlternatives.length,
      2,
      "alternatives belong to the record",
    );
  });

  // PR-01 pinned the production registry EMPTY. PR-07 registered exactly the
  // two founder-waived pilot sentences — the pin moves with the truth, and the
  // exact-content assertions live in pilotPayloadRegistration.test.ts.
  test("the production sentence registry holds exactly the two PR-07 pilot records", () => {
    assertEqual(
      Object.keys(SENTENCE_REGISTRY).sort().join(","),
      "sent:l01-je-voudrais-un-the-sil-vous-plait,sent:l01-merci",
      "the two pilot sentences and nothing else",
    );
  });
});
