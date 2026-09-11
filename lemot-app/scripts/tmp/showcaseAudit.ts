import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";

const norm = (s: string) =>
  s.normalize("NFC").toLowerCase().replace(/[.!?,;:«»"']/g, " ").replace(/\s+/g, " ").trim();

function strings(v: unknown, key = "", out: [string, string][] = []): [string, string][] {
  if (typeof v === "string") { out.push([key, v]); return out; }
  if (Array.isArray(v)) { for (const x of v) strings(x, key, out); return out; }
  if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) strings(x, k, out);
  return out;
}

// Keys that mean the learner DID something, vs keys that are prose about it.
const ACTIVE = new Set([
  "expectedAnswers", "acceptedAlternatives", "modelAnswer", "modelAnswers",
  "text", "hintCloze", "sentenceBefore", "sentenceAfter", "fr", "answers",
]);

for (const n of [1, 2]) {
  const lesson = V1_LESSONS.find((l) => l.number === n)!;
  const screens = flattenLessonScreens(lesson);
  console.log(`\n${"=".repeat(78)}\n${lesson.id}  ${screens.length} screens\n${"=".repeat(78)}`);

  const items: { fr: string; en: string; role: string; cluster: string }[] = [];
  for (const sc of screens.filter((s) => s.type === "showcase")) {
    for (const c of (sc.payload as any).clusters ?? []) {
      for (const s of c.sentences ?? []) items.push({ fr: s.fr, en: s.en, role: s.role, cluster: c.label });
    }
  }
  console.log(`${items.length} showcase sentences\n`);

  let cluster = "";
  for (const it of items) {
    if (it.cluster !== cluster) { cluster = it.cluster; console.log(`\n── ${cluster}`); }
    const key = norm(it.fr);
    const uses: string[] = [];
    for (const s of screens) {
      if (s.type === "showcase") continue;
      const hits = strings(s.payload).filter(([k, v]) => norm(v).includes(key));
      if (hits.length === 0) continue;
      const active = hits.some(([k]) => ACTIVE.has(k));
      uses.push(`${active ? "ACT" : "   "} ${s.id}(${s.type})`);
    }
    const flag = uses.length === 0 ? "  ⚠ ORPHAN" : uses.some((u) => u.startsWith("ACT")) ? "" : "  ⚠ prose-only";
    console.log(`\n  [${it.role}] "${it.fr}"${flag}`);
    for (const u of uses) console.log(`        ${u}`);
  }
}
