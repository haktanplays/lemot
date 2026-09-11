import { V1_LESSONS } from "../../content/lessons/v1";
import { flattenLessonScreens } from "../../content/lessons/lessonStructure";
const WANT = ["chunk-ca-va","chunk-je-ne-suis-pas","grammar-ne-pas-sandwich","chunk-desole",
  "chunk-je-suis-pret","chunk-vous-etes-pret","adj-fatigue","adj-content","chunk-merci-beaucoup",
  "adverb-comment","chunk-une-minute"];
for (const id of WANT) {
  const rows: string[] = [];
  for (const l of V1_LESSONS) {
    const inItems = (l.learningItems ?? []).some((i: any) => i.itemId === id);
    const demand = (l.acquisitionDemandItemIds ?? []).includes(id);
    const screens = flattenLessonScreens(l).filter((s) => {
      const j = JSON.stringify(s);
      return j.includes(`"${id}"`);
    });
    if (inItems || screens.length) {
      rows.push(`  ${l.id}${demand ? " [DEMAND]" : ""}${inItems ? " items" : ""} ${screens.map((s) => s.id + "(" + s.type + ")").join(" ")}`);
    }
  }
  console.log(`${id}\n${rows.join("\n") || "  (nowhere)"}`);
}
