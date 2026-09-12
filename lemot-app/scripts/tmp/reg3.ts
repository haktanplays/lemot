import { ITEM_REGISTRY } from "../../content/itemRegistry";
const reg = ITEM_REGISTRY as unknown as Record<string, any>;
for (const id of ["chunk-je-ne-comprends-pas","chunk-je-ne-suis-pas","chunk-ce-n-est-pas","grammar-ne-pas-sandwich","word-ici","chunk-non","chunk-non-merci","verb-comprendre"]) {
  const it = reg[id];
  console.log(id, it ? JSON.stringify({type:it.type,text:it.text,status:it.status,meaning:it.meaning},null,0) : "ABSENT");
  console.log("");
}
