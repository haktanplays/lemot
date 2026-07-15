---
title: Write
aliases: [Write Section, fill_write, WriteSection]
type: exercise-spec
domain: exercise
status: legacy
canon_status: superseded
implementation_status: legacy-active
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/components/sections/WriteSection.tsx", "lemot-app/constants/sections.ts"]
code_refs: ["lemot-app/components/sections/WriteSection.tsx", "lemot-app/components/sections/WriteSection.tsx:47-70", "lemot-app/constants/sections.ts:48-60"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Build]]", "[[Weave]]", "[[Combine and Weave]]"]
tags: [exercise, write, recall, legacy, dev-apk-hidden]
---

# Write

<!-- gh-toc -->

## İçindekiler

- [Learner Action](#learner-action)
- [Input Contract](#input-contract)
- [Output Contract](#output-contract)
- [Correctness Rule](#correctness-rule)
- [Evidence Produced](#evidence-produced)
- [Error Types](#error-types)
- [Scoring](#scoring)
- [Feedback](#feedback)
- [Suitable Use](#suitable-use)
- [Unsuitable Use](#unsuitable-use)
- [Difficulty Controls](#difficulty-controls)
- [Example Payload](#example-payload)
- [Example Learner Interaction](#example-learner-interaction)
- [Runtime Component](#runtime-component)
- [Tests](#tests)
- [Known Risks](#known-risks)
- [Related Exercises](#related-exercises)

> [!canon] Purpose — eksik kelimeyi **bellekten** yazma; recall birincil. Build'dan sonra (zor görev): dizmeden bellekten üretime geçiş.

> [!historical] impl_status: **legacy-active (dev-apk-HIDDEN)** (sec 5, `fill_write`). v1'de karşılığı yazım-tabanlı [[Weave]]/[[Say It Your Way]] (SUPERSEDED tester yönü).

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Eksik kelimeyi klavyeyle yazar (serbest metin).

## Input Contract
`items[]` her biri `{ cümle + boşluk, a: doğru kelime }`. Prop: `items, onComplete, onError, say`.

## Output Contract
`onComplete(score,total)` + `onError` → `logErr`.

## Correctness Rule
`norm(input) === norm(item.a)` — normalize edilmiş metin eşleşmesi.

## Evidence Produced
score/total (thr **.6** — en düşük eşik, çünkü bellekten üretim zor) + weak-spot. Son item double-count önlemesi (`WriteSection.tsx:47-70`). Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yazım tipi: `correct`, `accepted_variant`, `punctuation_only`, `accent_only`, `spelling_near_miss`, `wrong_item`, `empty_or_skip`. Engine emit yok. Bkz. [[Exercise Error Matrix]].

## Scoring
thr .6.

## Feedback
Doğru cevap gösterimi.

## Suitable Use
Aktif üretim eşiği; bellekten tek-kelime hatırlama; Build'dan sonra zorluk artışı.

## Unsuitable Use
> [!warning] Anti-pattern: production task'ta production olmaması (Write zaten üretim). Öğretilmemiş formu cevap beklemek (V3 mantığı).

## Difficulty Controls
Boşluk sayısı, ipucu var/yok, normalize toleransı.

## Example Payload
> [!example]
```json
{ "section": "fill_write",
  "items": [ { "s": "Je ___ un café.", "a": "voudrais" } ] }
```

## Example Learner Interaction
sec 5: `Je ___ un café.` → "voudrais" yaz → norm eşleşme → skor.

## Runtime Component
`lemot-app/components/sections/WriteSection.tsx` (sec 5, `fill_write`).

## Tests
Doğrudan test UNKNOWN (double-count fix audit-referenced). → [[Needs Verification]].

## Known Risks
- Dev-apk-hidden.
- `norm` toleransı Weave'in `normalize()` mantığından (bkz. [[Weave]]) farklı olabilir — iki ayrı normalize yolu.

## Related Exercises
[[Build]] · [[Weave]] · [[Combine and Weave]] · [[Say It Your Way]]
</content>
