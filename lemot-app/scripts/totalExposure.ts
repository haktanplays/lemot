/**
 * TOTAL learner-facing exposure of each French sentence, L1-L10.
 *
 * Earlier audits counted production moments — where a sentence is the required
 * output. The founder experiences every appearance: Showcase, teaching cards,
 * models, fills, builds, reveals, recaps, chain steps and Practice. A sentence
 * can be produced once and still be read eight times.
 *
 * Reporting only. Evidence for curation, never a quota.
 */
import { V1_LESSONS } from "../content/lessons/v1";
import { flattenLessonScreens } from "../content/lessons/lessonStructure";
import { PRACTICE_SEEDS } from "../content/practice/seeds";

const fam = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[.!?,;:’'"«»]/g, " ").replace(/\s+/g, " ").trim();
const FRENCH = /[àâçéèêëîïôùûü]|\b(je|tu|vous|le|la|les|un|une|au|à|merci|non|oui|bonjour|désolé|pas|est|suis|vais|dois|c|ce|s|il)\b/i;
const looksFrench = (s: string) => FRENCH.test(s) && s.trim().split(/\s+/).length >= 2;

const FR_FIELDS = new Set(["fr", "text", "targetText", "audio", "short", "natural", "modelAnswer"]);
const ARRAY_FR = new Set(["expectedAnswers", "answers", "alternatives", "modelAnswers", "naturalAlternatives"]);
function collect(v: unknown, out: string[] = [], key = ""): string[] {
  if (typeof v === "string") { if (FR_FIELDS.has(key)) out.push(v); return out; }
  if (Array.isArray(v)) { for (const x of v) collect(x, out, ARRAY_FR.has(key) ? "text" : key); return out; }
  if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) collect(x, out, k);
  return out;
}

type Row = { lesson: number; where: string };
const hits = new Map<string, Row[]>();
const add = (raw: string, lesson: number, where: string) => {
  if (!looksFrench(raw)) return;
  const k = fam(raw);
  if (k.length < 6) return;
  hits.set(k, [...(hits.get(k) ?? []), { lesson, where }]);
};

for (const l of V1_LESSONS as any[]) {
  if (l.number < 1 || l.number > 10) continue;
  for (const s of flattenLessonScreens(l) as any[]) {
    const seen = new Set<string>();
    for (const raw of collect(s.payload)) {
      const k = fam(raw);
      if (seen.has(k)) continue;
      seen.add(k);
      add(raw, l.number, s.type);
    }
  }
}
for (const s of PRACTICE_SEEDS as any[]) {
  const n = Number(s.originLessonId.slice(-3));
  if (n < 1 || n > 10) continue;
  const seen = new Set<string>();
  for (const raw of collect(s.exercise.payload)) {
    const k = fam(raw);
    if (seen.has(k)) continue;
    seen.add(k);
    add(raw, n, "practice");
  }
}

const ranked = [...hits.entries()].sort((a, b) => b[1].length - a[1].length);
console.log("=== TOTAL learner-facing exposure, L1-L10 (top 20) ===");
console.log("count  lessons        surfaces                          sentence");
for (const [k, rows] of ranked.slice(0, 20)) {
  const lessons = [...new Set(rows.map((r) => r.lesson))].sort((a, b) => a - b).join(",");
  const kinds = [...new Set(rows.map((r) => r.where))].join("/");
  console.log(
    `${String(rows.length).padStart(5)}  ${lessons.padEnd(14)} ${kinds.slice(0, 33).padEnd(33)} ${k}`,
  );
}
const total = ranked.reduce((a, [, v]) => a + v.length, 0);
console.log(`\ndistinct sentences ${ranked.length} | total appearances ${total} | mean ${(total / ranked.length).toFixed(1)}`);
const heavy = ranked.filter(([, v]) => v.length >= 8).length;
console.log(`sentences appearing 8+ times: ${heavy}`);
