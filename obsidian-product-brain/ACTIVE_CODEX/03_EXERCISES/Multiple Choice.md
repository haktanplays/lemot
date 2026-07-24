---
title: Multiple Choice
aliases: [MCQ, Quiz, Spot the Mistake, quickRecall]
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
source_of_truth: ["lemot-app/components/lesson-v1/screens/FillWithTraps.tsx", "lemot-app/components/sections/Quiz.tsx"]
code_refs: ["lemot-app/components/lesson-v1/screens/FillWithTraps.tsx:22-23", "lemot-app/components/sections/Quiz.tsx", "lemot-app/components/sections/Patterns.tsx", "lemot-app/constants/sections.ts:48-60"]
test_refs: ["lemot-app/__tests__/v1LessonStructure.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Fill]]", "[[French Fill]]", "[[Daily Review]]"]
tags: [exercise, mcq, recognition, v1-active, legacy]
---

# Multiple Choice

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

> [!canon] Purpose — tek-doğru seçimli **recognition/discrimination**. İki gövdesi var: (1) v1'de `fill-with-traps` bileşeninin kendisi bir MCQ'dir; (2) legacy'de gerçek ayrı MCQ bileşenleri (`Quiz`, `Patterns` quickRecall, `WeaveFill`, `FrenchFill`).

> [!implemented] impl_status: **v1: implemented (active)** — MCQ runtime'ı = `FillWithTraps.tsx`. **legacy: legacy-active (dev-apk-hidden)** — `sections/Quiz.tsx` "SPOT THE MISTAKE" dâhil negatif MCQ.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]] · Birincil v1 gövdesi: [[Fill]]

## Learner Action
Şıklardan **birini** seçer. Legacy Quiz'de bazı sorular negatif ("SPOT THE MISTAKE"), keyword highlight'lı.

## Input Contract
- **v1:** `FillWithTrapsPayload` (bkz. [[Fill]]).
- **legacy Quiz:** `items[]` (soru, şıklar, `a` doğru cevap), `sections/Quiz.tsx`.

## Output Contract
- v1: correct/incorrect boolean, telemetri yok.
- legacy: `onComplete(score,total)` + `onError(...)` → `logErr`.

## Correctness Rule
- v1: `payload.answer.includes(selected.id)` (`FillWithTraps.tsx:22-23`).
- legacy: `selected === item.a` (`Quiz.tsx`).

## Evidence Produced
v1: yok. legacy: `score/total` (thr .7, `sections.ts` quiz=.7) + weak-spot `logErr`. Bkz. [[Exercise Evidence Matrix]].

## Error Types
`correct`, `wrong_item`. Runtime engine emit yok. Bkz. [[Exercise Error Matrix]].

## Scoring
- v1: skorlanmaz.
- legacy: quiz thr .7; Patterns quickRecall completion; WeaveFill/FrenchFill thr .7.

## Feedback
v1: `AnswerReveal`. legacy: doğru/yanlış işaretleme, keyword highlight.

## Suitable Use
Ayırt etme (benzer formlar), negatif farkındalık ("hatayı yakala"), pattern quickRecall.

## Unsuitable Use
> [!warning] Anti-pattern: "What does X mean?" çeviri quizi (ürün reddediyor; yalnız [[Daily Review]] arkasında). Decision Probe'un MCQ'da bitmesi (WARN). Future-form doğru şık (V3 error).

## Difficulty Controls
Şık sayısı, distraktör benzerliği, pozitif vs negatif soru formu.

## Example Payload
> [!example]
```json
{ "section": "quiz",
  "items": [ { "q": "SPOT THE MISTAKE", "opts": ["Je suis un café", "Je voudrais un café"],
    "a": "Je voudrais un café" } ] }
```

## Example Learner Interaction
legacy Quiz: "SPOT THE MISTAKE" → iki cümle → yanlış olanı değil doğru olanı seç → skor.

## Runtime Component
- v1: `lemot-app/components/lesson-v1/screens/FillWithTraps.tsx`.
- legacy: `lemot-app/components/sections/Quiz.tsx`, `Patterns.tsx` (quickRecall).

## Tests
v1: `v1LessonStructure.test.ts` (fill-with-traps answerable). legacy: doğrudan test görülmedi (UNKNOWN).

## Known Risks
- v1 "Fill" ve "Multiple Choice" tek bileşen — kavramsal ayrım payload otoritesinde, ekran tipinde değil.
- legacy MCQ'lar dev-apk-hidden; tester yönü değil. → [[Exercise System Overview]].

## Related Exercises
[[Fill]] · [[French Fill]] · [[Review]] · [[Daily Review]]
</content>
