/**
 * Normalize user input for flexible answer comparison.
 * Strips accents, punctuation, extra whitespace, and lowercases.
 */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[?!.,;:'"«»\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
