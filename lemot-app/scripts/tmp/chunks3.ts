import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
import { knownPieces } from "../../content/lessons/showcasePieces";
const L = V1_LESSONS.find((l) => l.number === 3)!;
console.log("=== surfaces that CAN show chunks and what they declare ===");
for (const s of flattenLessonScreens(L)) {
  const p = s.payload as any;
  if (s.type === "meet-card") {
    const hl = (p.highlights ?? []).map((h: any) => `${h.text}<${h.itemId}>`);
    console.log(`meet   ${s.id.padEnd(30)} "${p.fr}"\n         highlights: ${hl.join(" | ") || "NONE"}`);
    console.log(`         registry would segment: ${knownPieces(p.fr).map(x=>x.text).join(" | ") || "(none)"}`);
  }
  if (s.type === "insight-card") {
    const ex = (p.examples ?? []).map((e: any) => e.fr).filter(Boolean);
    console.log(`insight ${s.id.padEnd(29)} "${p.title}"\n         examples: ${ex.join(" | ") || "NONE"}`);
    for (const e of ex) console.log(`           "${e}" -> ${knownPieces(e).map((x:any)=>x.text).join(" | ") || "(none)"}`);
  }
}
