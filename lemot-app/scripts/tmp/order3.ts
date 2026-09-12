import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
const L = V1_LESSONS.find((l) => l.number === 3)!;
flattenLessonScreens(L).forEach((s, i) => {
  const p = s.payload as any;
  const ctx = String(p.title ?? p.context ?? p.situation ?? p.prompt ?? p.fr ?? "").slice(0, 56);
  const ans = (p.expectedAnswers ?? (p.modelAnswer ? [p.modelAnswer] : [])).join(" | ");
  console.log(`${String(i).padStart(2)} ${s.id.padEnd(30)} ${s.type.padEnd(16)} ${ctx}`);
  if (ans) console.log(`      -> ${ans}`);
});
