import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
for (const l of V1_LESSONS.filter(x=>x.number>=1&&x.number<=3)) {
  console.log(`\n=== L${l.number}`);
  for (const s of flattenLessonScreens(l)) {
    if (s.type !== "weave" && s.type !== "say-it-your-way") continue;
    const p = s.payload as any;
    const r = p.reveal;
    const ans = (p.expectedAnswers ?? [p.modelAnswer]).filter(Boolean).join(" | ");
    console.log(`${r?.explanation ? "HAS " : "GAP "} ${s.id.padEnd(32)} ${ans}`);
    if (r?.explanation) console.log(`        "${r.explanation.slice(0,100)}"`);
  }
}
