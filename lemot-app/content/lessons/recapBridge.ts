import { ITEM_REGISTRY } from "../itemRegistry";

/**
 * Which recap chip opens a Mon Lexique entry, and which is just a word.
 *
 * The recap already says "Pieces you used" and shows them back; the founder's
 * point is that this is the natural place for the learner to notice that the
 * French is being kept somewhere. Making the chips tappable is the bridge.
 *
 * The rule that matters is the one about NOT doing it. A chip that looks
 * tappable and opens nothing is worse than a chip that never offered, and a
 * chip that opens an invented entry is worse than both — it would tell the
 * learner that Mon Lexique holds something it does not. So a chip links only
 * when two things are true at once: the string resolves to a real registry
 * item, and that item is one the learner has actually reached.
 *
 * Pure, and deliberately kept out of the renderer: "is this a real piece the
 * learner owns?" is a question about content and learner state, and answering
 * it inside a component is how it ends up answered differently in two places.
 */

const fold = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();

/**
 * Registry surface -> itemId, built once.
 *
 * Keyed on the surface form because that is all a recap has: `piecesUsed` is
 * authored as display strings, not ids. A collision would be two items
 * claiming the same French, which the registry does not have and which the
 * content validators would catch before this did.
 */
const BY_SURFACE: ReadonlyMap<string, string> = (() => {
  const map = new Map<string, string>();
  for (const [itemId, item] of Object.entries(
    ITEM_REGISTRY as unknown as Record<string, { text?: string }>,
  )) {
    const text = fold(String(item.text ?? ""));
    if (text.length === 0 || map.has(text)) continue;
    map.set(text, itemId);
  }
  return map;
})();

/** The registry item a recap chip names, or null if it names none. */
export function itemIdForPiece(piece: string): string | null {
  return BY_SURFACE.get(fold(piece)) ?? null;
}

/**
 * The entry a recap chip should open, or null if it should not be tappable.
 *
 * `reached` is the learner's own state — the items Mon Lexique will actually
 * show them. Passing an empty set makes every chip inert, which is the correct
 * behaviour before anything has been reached rather than a degenerate case.
 */
export function recapLinkTarget(
  piece: string,
  reached: ReadonlySet<string>,
): string | null {
  const itemId = itemIdForPiece(piece);
  if (itemId === null) return null;
  return reached.has(itemId) ? itemId : null;
}
