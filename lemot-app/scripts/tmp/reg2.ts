import { ITEM_REGISTRY } from "../../content/itemRegistry";
const reg = ITEM_REGISTRY as unknown as Record<string, any>;
for (const id of ["chunk-ca-va","chunk-je-ne-suis-pas","grammar-ne-pas-sandwich","chunk-desole",
  "chunk-je-suis-pret","chunk-vous-etes-pret","adj-fatigue","adj-content","chunk-merci-beaucoup",
  "adverb-comment","chunk-une-minute","chunk-je-suis","verb-etre"]) {
  console.log(JSON.stringify({ id, ...reg[id] }, null, 1).replace(/\n\s*/g, " "));
  console.log("");
}
