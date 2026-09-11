import { ITEM_REGISTRY } from "../../content/itemRegistry";
const reg = ITEM_REGISTRY as unknown as Record<string, any>;
const want = ["chunk-ca-va","adj-fatigue","adj-content","chunk-je-suis-pret","chunk-une-minute",
"adverb-comment","chunk-vous-etes-pret","chunk-vous-etes","pronoun-vous","chunk-merci-beaucoup",
"word-ici","chunk-je-suis","adj-desole","chunk-en-retard","word-la","word-ne","word-pas",
"grammar-negation","chunk-ne-pas","adj-pret","chunk-bien","chunk-ca-va-bien"];
for (const id of want) {
  const it = reg[id];
  console.log(id.padEnd(24), it ? `${String(it.type).padEnd(12)} "${it.display ?? it.fr ?? ""}"  ${it.mastery ?? ""}` : "— ABSENT");
}
console.log("\nall ids containing 'pret','fatig','desol','retard','ne-','negat','ca-va','comment','bien':");
for (const [id, it] of Object.entries(reg)) {
  if (/pret|fatig|desol|retard|negat|ca-va|comment|bien|\bne\b|pas/.test(id))
    console.log("  ", id.padEnd(26), String((it as any).type).padEnd(12), `"${(it as any).display ?? ""}"`);
}
