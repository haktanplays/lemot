---
title: Registry Map
aliases: [Item Registry Map, ITEM_REGISTRY, Registry Envanteri]
type: architecture
domain: architecture
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/content/itemRegistry.ts", "lemot-app/scripts/shipped-item-ids.json", "lemot-app/scripts/shipped-error-tags.json"]
code_refs:
  - "lemot-app/content/itemRegistry.ts:3"
  - "lemot-app/content/itemRegistry.ts:702-714"
  - "lemot-app/scripts/shippedItemIds.ts:1-40"
  - "lemot-app/scripts/validateContent.ts:37-56"
test_refs: ["lemot-app/scripts/tests/shippedItemIds.test.ts", "lemot-app/scripts/tests/shippedErrorTags.test.ts"]
related:
  - "[[00 Le Mot Holy Codex]]"
  - "[[Implementation Overview]]"
  - "[[Registry Architecture]]"
  - "[[Registry Usage Matrix]]"
  - "[[Spec Runtime Divergences]]"
tags: [implementation, registry, items, yasa]
---

# Registry Map

Up: [[Implementation Overview]] · Mimari: [[Registry Architecture]] · Kullanım: [[Registry Usage Matrix]]

> [!implemented] `content/itemRegistry.ts` (715 satır) tek donmuş object literal
> `ITEM_REGISTRY = { ... } as const satisfies Record<string, LearningItem>`
> (`:3`, `:702`) — surface B/C içeriğinin atomik envanteri. Item = öğrencinin
> sahiplendiği/desteklendiği üretim parçası; her biri **değişmez id** ile anahtarlanır.

## Registry gövdesi — 54 item

Doğrulanan sayı: **54 item** (54 top-level anahtar / 54 `id:` alanı).

| Tür dağılımı | Adet |
|---|---|
| chunk | 34 |
| noun | 5 |
| pronoun | 4 |
| verb | 3 |
| grammar-nugget | 3 |
| adverb | 2 |
| sound-pattern | 2 |
| micro-contrast | 1 |
| **Toplam** | **54** |

| Status dağılımı | Adet |
|---|---|
| active | 32 |
| supported | 16 |
| recognition | 6 |

Accessors: `ItemId = keyof typeof ITEM_REGISTRY` (`:704`), `getItem`, `hasItem`
(type guard), `getItems` (`:706-714`); `content/index.ts` üzerinden re-export.
`relatedItemIds` hafif word-graph adjacency kurar; `weakPointTags`
(`content/weakPointTags.ts`) item'ı error taksonomisine bağlar.

## itemId immutability — YASA 2 / K3 (build-enforced)

> [!implemented] Bir itemId sevkedilince **sonsuza dek donar** — rename yok,
> delete-and-recreate yok (rename = yetim öğrenci-kanıtı). Bkz.
> [[Decision Index|D-14]], [[Decision Index|D-18]].

- `scripts/shipped-item-ids.json` = **56 kayıtlı id** + saf checker `scripts/shippedItemIds.ts`.
- `validate:content` HARD-FAIL:
  - shipped id registry'den eksik/rename ise (`validateContent.ts:37-46`);
  - **K3 (çift yönlü):** registry id'si manifest'te kayıtsız ise.
- Büyüme yalnız kasıtlı: `manifest:add` — "there is NO auto-sync by design"
  (`shippedItemIds.ts:10-12`).

### ⚠️ 54-vs-56 item-id drift

> [!warning] Manifest **56 id** listeler ama canlı registry object **54 anahtar** taşır.
> K3 çift-yönlü kontrolü tam da bu drift'i yüzeye çıkarmak için var. `validate:content`'in
> şu an geçip geçmediği **UNKNOWN** (read-only geçişte çalıştırılmadı). Üçüncü bir sayı da
> dolaşımda: L1_L15 chip audit kendi zamanında **52 item / 41 used / 11 dormant** saymıştı.
> **Kural: her kaynağın kendi sayısını cite et, tek sayıya zorlama.** Detay:
> [[Spec Runtime Divergences]], [[Registry Usage Matrix]], [[Contradictions]].

| Kaynak | Sayı | Anlam |
|---|---|---|
| `itemRegistry.ts` canlı object | **54** | runtime top-level anahtar |
| `shipped-item-ids.json` manifest | **56** | dondurulmuş sevk kaydı |
| L1_L15 chip inventory audit | **52 / 41 used / 11 dormant** | audit anındaki sayım |

## Error-tag manifesti — YASA 3

Kardeş manifest `shipped-error-tags.json` (**30 tag**) + `shippedErrorTags.ts`
error-tag sözlüğünü dondurur ("YASA 3", `validateContent.ts:48-56`; iki-yönlü:
shipped tag kullanımdan düşerse ERROR, kayıtsız yeni tag ERROR). Bkz.
[[Decision Index|D-15]].

> [!warning] Tag sayısında da kaynak-farkı var: `shipped-error-tags.json` = **30**;
> decisions history YASA 3 satırı "**54 tags frozen**" der; error taksonomisi ayrıca
> **16-value ErrorTagCode union** + **27-value WEAK_POINT_TAGS** taşır. Her sayı farklı
> katmanı ölçer — cite the source. Detay [[Error Tracking System]].

## Wiring

Registry hem surface C engine fixtures'ının item kaynağıdır (`content/learning-engine/*`,
`mergeItemMapsStrict` duplicate id'de hard-fail — `index.ts:174-178`) hem de authored v1
derslerinin `learningItems[]` referans hedefidir. Manifest + validator ise **build-time**
koruma (runtime değil).

## Known Gaps

- 54/56 drift kapatılmadı; `validate:content` yeşil mi UNKNOWN → [[Needs Verification]].
- L1 chip listesi **kasıtlı olarak final değil** (~34–35 hedef obje, 31 aday, 3–4 eklenecek) —
  registry sayısı bu yüzden hareket edecek; final listeyi **uydurma** (bkz. Holy Codex load-bearing).

## Related Notes

[[Registry Architecture]] · [[Registry Usage Matrix]] · [[Chip Taxonomy]] · [[Error Tracking System]] · [[Test Strategy]]
