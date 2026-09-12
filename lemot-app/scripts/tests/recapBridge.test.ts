/**
 * The lesson → Mon Lexique bridge, and the restraint it needs.
 *
 * The founder's ask: the learner should be able to feel "I met it, I used it,
 * Cairn kept it". The recap already says "Pieces you used", so making those
 * chips open their Mon Lexique entry is the shortest honest version of that.
 *
 * The rules below are mostly about NOT doing it. A chip that looks tappable and
 * opens nothing is worse than one that never offered; a chip that opens an
 * invented entry is worse than both, because it tells the learner Mon Lexique
 * holds something it does not. So the bridge is deliberately conservative and
 * fails closed in every direction.
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { itemIdForPiece, recapLinkTarget } from "../../content/lessons/recapBridge";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

describe("a chip resolves to a real piece, or to nothing", () => {
  test("a canonical surface resolves", () => {
    const id = itemIdForPiece("je suis");
    assert(id !== null, "je suis is a registry piece and must resolve");
    assert(id === "chunk-je-suis", `resolved to ${id}`);
  });

  test("case and spacing do not decide it", () => {
    assert(itemIdForPiece("Je Suis") === itemIdForPiece("je suis"), "folding must be stable");
    assert(itemIdForPiece("  je suis ") === itemIdForPiece("je suis"), "padding must not matter");
  });

  test("a string the registry does not know resolves to nothing", () => {
    // The "une pause" class: a run of words out of a real chunk that is not
    // itself a piece. It must not quietly find a neighbour.
    assert(itemIdForPiece("une pause") === null, "a slice of a chunk is not a piece");
    assert(itemIdForPiece("") === null, "empty is not a piece");
    assert(itemIdForPiece("nonsense qqq") === null, "unknown French is not a piece");
  });
});

describe("linking requires the learner to have reached it", () => {
  const reached = new Set(["chunk-je-suis"]);

  test("a reached piece links", () => {
    assert(recapLinkTarget("je suis", reached) === "chunk-je-suis", "this one is really there");
  });

  test("a real piece the learner has not reached does not link", () => {
    // Being canonical is not enough. Mon Lexique shows what the learner has
    // reached, and offering to open anything else lands them on an empty
    // screen with their own word in the URL.
    assert(recapLinkTarget("merci", reached) === null, "not reached, so not offered");
  });

  test("nothing links before anything is reached", () => {
    assert(recapLinkTarget("je suis", new Set()) === null, "an empty set links nothing");
  });

  test("viewing is not owning: the bridge reads state and never writes it", () => {
    const src = read("content/lessons/recapBridge.ts");
    for (const mutation of ["setItem", "record", "mastery", "await", "emit"]) {
      assert(!src.includes(mutation), `the resolver must not ${mutation}`);
    }
  });
});

describe("the recap only offers what it can deliver", () => {
  const recap = read("components/lesson-v1/screens/RecapCard.tsx");

  test("a chip without a target stays an ordinary chip", () => {
    assert(
      /if \(!linkable\) return <PieceChip/.test(recap),
      "an unlinkable piece must render exactly as it did before, with no affordance",
    );
  });

  test("a caller that does not know the learner's state gets no links", () => {
    assert(
      /Boolean\(onOpenPiece\) && \(linkablePieces \?\? \[\]\)/.test(recap),
      "both the handler and the caller's list must be present before anything links",
    );
    // And the screen must never be handed the learner's state to decide for
    // itself. Recap emits nothing; giving it a view of Mon Lexique would be a
    // private channel to learner state that the wiring guard exists to refuse.
    assert(
      !recap.includes("reachedItemIds") && !recap.includes("recapLinkTarget"),
      "the screen must receive a presentational fact, not the reached set",
    );
  });

  test("the reached set is the same projection Mon Lexique uses", () => {
    // Not the lesson's declared items. A lesson names what it teaches; Mon
    // Lexique holds what the learner reached, and linking on the first would
    // offer entries that are not there yet.
    const hook = read("hooks/useReachedItemIds.ts");
    assert(hook.includes("selectMonLexiqueEntries"), "it must read the real projection");
    assert(
      /catch\(\(\) => \{[\s\S]{0,180}\}\)/.test(hook),
      "a failed read must leave the set undefined rather than guess",
    );
  });

  test("Mon Lexique can be opened at a named entry", () => {
    const route = read("app/(tabs)/mon-lexique.tsx");
    assert(route.includes("useLocalSearchParams"), "the tab must accept an item param");
    assert(
      /item\?: string/.test(route),
      "and it must be optional, because every other entry point sends none",
    );
  });
});
