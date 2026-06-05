/**
 * Graded-attempt duplicate guard (H-1) — pure helper.
 *
 * Graded cards (fill / build / register_switch / context_chain) must record at
 * most ONE learning event per unchanged answer: rapid repeated "Check" on the
 * same answer would otherwise inflate the event log and distort mastery (e.g.
 * mashing a wrong answer 3× → false "weak"). Cards keep a ref of the last
 * RECORDED fingerprint and only hand the attempt up when the new fingerprint
 * differs.
 *
 * `fingerprintAnswer` makes the comparison stable against meaningless whitespace
 * (leading/trailing + collapsed internal runs) while preserving case and accents
 * — so fixing a capital or an accent is a genuinely new answer that may record
 * again. It is NOT a grading normalizer (that is `grade()`); it only decides
 * "is this the same submission as the one I just recorded?".
 */
export function fingerprintAnswer(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}
