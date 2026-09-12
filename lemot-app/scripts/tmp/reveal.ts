import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
let withExpl = 0, total = 0;
for (const l of V1_LESSONS.filter(x=>x.number>=1&&x.number<=10)) {
  let le = 0, lt = 0;
  for (const s of flattenLessonScreens(l)) {
    if (s.type !== "weave" && s.type !== "say-it-your-way") continue;
    const r = (s.payload as any).reveal;
    lt++; if (r?.explanation) le++;
  }
  withExpl += le; total += lt;
  console.log(`L${String(l.number).padEnd(2)} ${le}/${lt} result screens carry a "Why it works" note`);
}
console.log(`\nL1-L10: ${withExpl} of ${total}`);
