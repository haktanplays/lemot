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
const ACTIVE = new Set(["expectedAnswers","acceptedAlternatives","modelAnswer","modelAnswers","text","hintCloze","sentenceBefore","sentenceAfter","fr","answers"]);

for (const n of [1, 2]) {
  const lesson = V1_LESSONS.find((l) => l.number === n)!;
  const items: { fr: string; role: string; cluster: string; ids: string[] }[] = [];
  for (const sc of flattenLessonScreens(lesson).filter((s) => s.type === "showcase"))
    for (const c of (sc.payload as any).clusters ?? [])
      for (const s of c.sentences ?? []) items.push({ fr: s.fr, role: s.role, cluster: c.label, ids: s.itemIds ?? [] });

  console.log(`\n${"=".repeat(76)}\n${lesson.id}\n${"=".repeat(76)}`);
  let cluster = "";
  for (const it of items) {
    if (it.cluster !== cluster) { cluster = it.cluster; console.log(`\n── ${cluster}`); }
    const key = norm(it.fr);
    const inL: string[] = [], later: string[] = [];
    for (const l of V1_LESSONS) {
      for (const s of flattenLessonScreens(l)) {
        if (s.type === "showcase") continue;
        const hits = strings(s.payload).filter(([, v]) => norm(v).includes(key));
        if (!hits.length) continue;
        const a = hits.some(([k]) => ACTIVE.has(k)) ? "ACT" : "   ";
        (l.number === n ? inL : later).push(`${a} L${l.number}/${s.id}(${s.type})`);
      }
    }
    // which later lesson DEMANDS one of its items
    const owners = V1_LESSONS.filter((l) => it.ids.some((i) => (l.acquisitionDemandItemIds ?? []).includes(i)))
      .map((l) => `L${l.number}`);
    console.log(`\n  [${it.role}] "${it.fr}"${owners.length ? `   demanded by ${owners.join(",")}` : ""}`);
    console.log(`      in-lesson : ${inL.length ? inL.join("  ") : "NONE"}`);
    console.log(`      elsewhere : ${later.length ? later.slice(0, 6).join("  ") + (later.length > 6 ? ` (+${later.length - 6})` : "") : "NONE"}`);
  }
}
