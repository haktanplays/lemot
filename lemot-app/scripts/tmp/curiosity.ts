import { V1_LESSONS } from "../../content/lessons/v1";
import { showcaseSentencesOf } from "../../content/lessons/showcaseClassification";
const FAMILIES = ["sound","cognate","notice","structure","usage","compare","inDepth"] as const;
let total = 0;
const perFamily: Record<string, number> = {};
console.log("lesson  sentences  withDepth  families");
for (const l of V1_LESSONS.filter(x => x.number >= 1 && x.number <= 10)) {
  const ss = showcaseSentencesOf(l);
  const withDepth = ss.filter(s => s.depth && Object.values(s.depth).some(Boolean));
  const fams = new Set<string>();
  for (const s of withDepth) for (const f of FAMILIES) if ((s.depth as any)?.[f]) { fams.add(f); perFamily[f]=(perFamily[f]??0)+1; }
  total += withDepth.length;
  console.log(`L${String(l.number).padEnd(2)}     ${String(ss.length).padEnd(9)} ${String(withDepth.length).padEnd(10)} ${[...fams].join(", ")}`);
}
console.log(`\ntotal sentences with depth on L1-L10: ${total}`);
console.log("per family:", perFamily);
