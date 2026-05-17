export type MatchResult = "exact" | "alternative" | "none";

export function normalize(value: string): string {
  return value
    .replace(/[‘’]/g, "'")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\.+$/, "");
}

export function matchExpected(
  input: string,
  expectedAnswers: string[],
  acceptedAlternatives?: string[]
): MatchResult {
  const normInput = normalize(input);
  if (normInput === "") return "none";

  if (expectedAnswers.some((e) => normalize(e) === normInput)) {
    return "exact";
  }

  if (
    acceptedAlternatives !== undefined &&
    acceptedAlternatives.some((a) => normalize(a) === normInput)
  ) {
    return "alternative";
  }

  return "none";
}
