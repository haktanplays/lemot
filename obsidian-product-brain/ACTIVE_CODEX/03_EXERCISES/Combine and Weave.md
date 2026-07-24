---
title: Combine and Weave
aliases: [Combine+Weave, combine_fg, CombineWeave]
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
source_of_truth: ["lemot-app/components/sections/CombineWeave.tsx", "lemot-app/constants/sections.ts"]
code_refs: ["lemot-app/components/sections/CombineWeave.tsx", "lemot-app/components/sections/CombineWeave.tsx:276-322", "lemot-app/constants/sections.ts:48-60"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Weave]]", "[[Write]]", "[[Say It Your Way]]"]
tags: [exercise, weave, combine, production, legacy, dev-apk-hidden]
---

# Combine and Weave

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

> [!canon] Purpose — legacy 2-fazlı üretim (sec 7, `combine_fg`): **Combine** (ipuçtan tam Fransızca cümle yaz, 3-deneme cap) → **Weave** (karışık EN+FR yaz, bulunan bilinen FR kelimeler sayılır).

> [!historical] impl_status: **legacy-active (dev-apk-HIDDEN)**. v1'de üretim yükü tek [[Weave]] ekranına konsolide oldu; `cI2` state Combine ve Say It arasında paylaşılırdı (legacy, CLAUDE.md). SUPERSEDED tester yönü.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
İki faz, ikisi de serbest yazım: (1) hint'ten tam FR cümle; (2) karışık dil cümlesi.

## Input Contract
`items[]` her biri `{ hint, accept[], + weave hedefi, known FR kelimeler }`. Prop: `items, onComplete, onError, say`.

## Output Contract
Combined score; Weave paydası = Σ bilinen kelime. `logErr`.

## Correctness Rule
- **Combine:** `accept.some(a => norm(a) === norm(input))`, **3-deneme cap**.
- **Weave:** per-word inclusion — `norm(input).includes(norm(knownWord))` sayımı.

## Evidence Produced
Combined score; Weave denom = Σ known words. Son item double-count önlemesi (`CombineWeave.tsx:276-322`). Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yazım tipi karışık: `correct`, `accepted_variant`, `missing_word`, `extra_word`, `meaning_shift`, `spelling_near_miss`, `empty_or_skip`. Engine emit yok. Bkz. [[Exercise Error Matrix]].

## Scoring
Combine: `combine_fg` thr **.6** (`sections.ts:48-60`); Weave fazı per-word oran.

## Feedback
Combine: 3-deneme, sonra doğru gösterilir. Weave: bulunan bilinen kelimeler işaretlenir.

## Suitable Use
İpuçtan tam cümle üretme + ardından serbest karışık dil üretimi (Weave'in legacy iki-adımlı hâli).

## Unsuitable Use
> [!warning] Anti-pattern: **Weave fazını tasarlanmış çeviri egzersizi** yapmak (§16). Weave onarımı/reconstruction REJECTED. Bkz. [[Weave]], [[Exercise Anti-Patterns]].

## Difficulty Controls
`accept[]` genişliği, hint detayı, bilinen kelime sayısı, deneme cap.

## Example Payload
> [!example]
```json
{ "section": "combine_fg",
  "items": [ { "hint": "ask for a coffee politely",
    "accept": ["Je voudrais un café","Je voudrais un café s'il vous plaît"],
    "knownWords": ["café","voudrais"] } ] }
```

## Example Learner Interaction
sec 7: (Combine) hint → "Je voudrais un café" yaz → accept eşleşir → (Weave) "I would like un café please" → bulunan FR kelimeler sayılır.

## Runtime Component
`lemot-app/components/sections/CombineWeave.tsx` (sec 7, `combine_fg`).

## Tests
Doğrudan test UNKNOWN (double-count fix audit-referenced). → [[Needs Verification]].

## Known Risks
- Dev-apk-hidden; iki fazlı akış v1'de tek Weave ekranıyla değişti.
- `cI2` paylaşımlı state (legacy) transition bug riski taşırdı.

## Related Exercises
[[Weave]] · [[Write]] · [[Say It Your Way]] · [[Build]]
</content>
