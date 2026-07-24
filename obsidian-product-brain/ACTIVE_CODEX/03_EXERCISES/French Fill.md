---
title: French Fill
aliases: [French Fill, fill_fr, FrenchFill, Weave Fill, fill_fg, WeaveFill]
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
source_of_truth: ["lemot-app/components/sections/FrenchFill.tsx", "lemot-app/components/sections/WeaveFill.tsx", "lemot-app/constants/sections.ts"]
code_refs: ["lemot-app/components/sections/FrenchFill.tsx", "lemot-app/components/sections/WeaveFill.tsx", "lemot-app/constants/sections.ts:48-60", "lemot-app/app/(tabs)/index.tsx:149"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Fill]]", "[[Multiple Choice]]"]
tags: [exercise, fill, mcq, legacy, dev-apk-hidden]
---

# French Fill

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

> [!canon] Purpose — boşluklu bir cümlede doğru Fransızca kelimeyi seçme MCQ'su. İki legacy kardeş: **Weave Fill** (`fill_fg`, EN+FR karışık cümle, FR kelime seç) ve **French Fill** (`fill_fr`, tamamen Fransızca cümle, seç).

> [!historical] impl_status: **legacy-active (dev-apk-HIDDEN)**. v1'de karşılığı [[Fill]] (`fill-with-traps`). SUPERSEDED tester yönü.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Şıklardan doğru Fransızca kelimeyi seçer.

## Input Contract
`items[]` her biri `{ blank cümle, opts[], a: doğru }`. Prop: `items, onComplete(score,total), onError, say`.

## Output Contract
`onComplete(score,total)` + `onError` → `logErr`.

## Correctness Rule
`opt === item.a` (`FrenchFill.tsx` / `WeaveFill.tsx`).

## Evidence Produced
score/total (thr **.7**, `sections.ts:48-60`: fill_fg .7, fill_fr .7) + legacy weak-spot. Bkz. [[Exercise Evidence Matrix]].

## Error Types
`correct`, `wrong_item` (seçim; yazım hatası yok). Engine emit yok. Bkz. [[Exercise Error Matrix]].

## Scoring
thr .7; eşiğin altında "Try Again", "Continue Anyway" mümkün ama section mastered işaretlenmez.

## Feedback
Doğru/yanlış işaretleme.

## Suitable Use
- **Weave Fill:** EN+FR bağlamda tek FR kelimeyi seçtirme (Weave'e köprü recognition).
- **French Fill:** tamamen Fransızca cümlede boşluk doldurma (daha zor, İngilizce dayanak yok).

## Unsuitable Use
> [!warning] Anti-pattern: future-form doğru şık (V3); "What does X mean?" çeviri quizi.

## Difficulty Controls
İngilizce dayanak var/yok (Weave Fill vs French Fill), distraktör benzerliği, şık sayısı.

## Example Payload
> [!example]
```json
{ "section": "fill_fr",
  "items": [ { "s": "Je ___ un café.", "opts": ["voudrais","suis","ai"], "a": "voudrais" } ] }
```

## Example Learner Interaction
sec 3: `Je ___ un café.` → voudrais/suis/ai → seç → skor.

## Runtime Component
`lemot-app/components/sections/FrenchFill.tsx` (sec 3, `fill_fr`); `lemot-app/components/sections/WeaveFill.tsx` (sec 2, `fill_fg`).

## Tests
Doğrudan test UNKNOWN. → [[Needs Verification]].

## Known Risks
- Dev-apk-hidden; v1 [[Fill]] ile pedagojik çakışma (trap-based tek ekrana konsolide oldu).

## Related Exercises
[[Fill]] · [[Multiple Choice]] · [[Build]] · [[Write]]
</content>
