---
title: Fill
aliases: [Fill With Traps, fill-with-traps, FillWithTraps]
type: exercise-spec
domain: exercise
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/content/lessonTypes.ts:105-118", "lemot-app/components/lesson-v1/screens/FillWithTraps.tsx"]
code_refs: ["lemot-app/components/lesson-v1/screens/FillWithTraps.tsx", "lemot-app/components/lesson-v1/screens/FillWithTraps.tsx:16,22-23,60,90,115-128", "lemot-app/components/lesson-v1/screens/AnswerReveal.tsx", "lemot-app/content/lessonTypes.ts:105-118"]
test_refs: ["lemot-app/__tests__/v1LessonStructure.test.ts", "lemot-app/scripts/canonRules.ts:96-126"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Multiple Choice]]", "[[French Fill]]", "[[Natural Reveal]]", "[[Exercise Anti-Patterns]]"]
tags: [exercise, fill, recognition, v1-active]
---

# Fill

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

> [!canon] Purpose — pedagojik-yazılı distraktörlerle (trap'ler) rehberli **recognition/discrimination**: cümledeki boşluğa doğru parçayı seç, neden yanlış olduğunu öğren.

> [!implemented] impl_status: **implemented (v1 active dev-apk)**. Bu bileşen aynı zamanda [[Multiple Choice]]'ın v1 runtime'ıdır — tek `fill-with-traps` ekranı ikisini de karşılar.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Tek şık seçer (single-select; `selectedId`, `FillWithTraps.tsx:16`). Seçimden sonra şıklar kilitlenir (`:90`), tek deneme, sonra Continue.

## Input Contract
`FillWithTrapsPayload` (`lessonTypes.ts:105-118`): `prompt`, `sentenceBefore?/After?`, `blankCount?`, `options[]{id,text,isCorrect,trapReason?}`, `answer: string[]` (option id'leri), `reveal: AnswerRevealPayload`.

## Output Contract
`correct`/`incorrect` boolean (lokal). **LearningEvent yok** (v1 renderer telemetri yazmaz).

## Correctness Rule
`payload.answer.includes(selected.id)` (`:22-23`) — **option id üstünde küme üyeliği**, metin değil.

## Evidence Produced
Runtime: sadece lokal boolean; kanıt/telemetri üretmez. Bkz. [[Exercise Evidence Matrix]].

## Error Types
Kavramsal: `correct`, `wrong_item`. Yazım hatası doğuramaz (seçim). Runtime emit yok. Bkz. [[Exercise Error Matrix]].

## Scoring
Tek deneme, skorlanmaz (v1). Legacy MCQ karşılıkları thr .7 skorlar — bkz. [[Multiple Choice]], [[French Fill]].

## Feedback
`AnswerReveal` (`AnswerReveal.tsx`): correct=yeşil / incorrect=kırmızı + `reveal.short/explanation/natural`. Yanlış + `trapReason` varsa ek **nötr** not kutusu (`:115-128`) — tuzağın neden çekici olduğunu anlatır.

## Suitable Use
Doğru formu benzer görünen yanlıştan ayırt ettirmek (`voudrais` vs `veux` vs `suis`). Trap'ler tahmin edilebilir hatayı önceden yakalar.

## Unsuitable Use
> [!warning] Anti-pattern: **future/exposure form CORRECT şıkta = V3 error** (`canonRules.ts:96-126`). Yanlış-trap olarak future serbest (`canonRules.test.ts:80-121`). Ayrıca "What does X mean?" tarzı çeviri quizi değil — bağlam içinde form seçimi.

## Difficulty Controls
Trap şık sayısı/kalitesi, `trapReason` varlığı, `blankCount` (typed ama runtime tek boşluk render eder: `{"  ____  "}`, `:60`).

## Example Payload
> [!example]
```json
{ "type": "fill-with-traps",
  "payload": { "prompt": "Which word keeps the request polite?",
    "options": [ {"id":"a","text":"voudrais","isCorrect":true},
      {"id":"b","text":"veux","isCorrect":false,"trapReason":"grammatical but blunt"},
      {"id":"c","text":"suis","isCorrect":false,"trapReason":"wrong verb"} ],
    "answer": ["a"], "reveal": { "short": "voudrais = soft, polite request." } } }
```

## Example Learner Interaction
L1 ekran 5: "Which word keeps the request polite?" → voudrais/veux/suis. Seç → reveal → Continue.

## Runtime Component
`lemot-app/components/lesson-v1/screens/FillWithTraps.tsx` (+ `AnswerReveal.tsx`).

## Tests
`v1LessonStructure.test.ts` "fill-with-traps screens are answerable" (259-301): options boş değil, ≥1 correct, answer id'leri ∈ options & isCorrect, `reveal.short` var.

## Known Risks
- Canon multi-blank (`blankCount`) typed ama runtime tek boşluk/tek seçim (IMPLEMENTED quirk).
- Kanıt üretmez → weak-spot izleme yok (v1). → [[Exercise Evidence Matrix]].

## Related Exercises
[[Multiple Choice]] · [[French Fill]] · [[Weave Fill|French Fill]] · [[Natural Reveal]] · [[Build]]
</content>
