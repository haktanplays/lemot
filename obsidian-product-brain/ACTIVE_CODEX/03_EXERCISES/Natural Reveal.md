---
title: Natural Reveal
aliases: [natural-reveal, NaturalReveal, NaturalRevealView]
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
source_of_truth: ["lemot-app/content/lessonTypes.ts:70-81", "lemot-app/components/lesson-v1/screens/NaturalReveal.tsx", "docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/NaturalReveal.tsx", "lemot-app/components/lesson-v1/screens/NaturalReveal.tsx:18", "lemot-app/content/lessonTypes.ts:70-81"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Weave]]", "[[Say It Your Way]]", "[[Exercise Anti-Patterns]]"]
tags: [exercise, natural-reveal, feedback-surface, v1-active, killer-trinity]
---

# Natural Reveal

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

> [!canon] Purpose — "not the expected answer": bir **model + neden işe yarıyor + başka doğal yollar**; dersin duygusal kapanışı. Killer trinity'nin üçüncü ayağı (Weave, Say It, Natural Reveal). W2 look-ahead: revealed Fransızca ~3-4 (max 5-6) ders ileride oturabilir, **recognition-only**.

> [!implemented] impl_status: **implemented (v1 active dev-apk)**. Bir egzersiz değil, bir **feedback/reveal yüzeyi**. Hem gömülü `NaturalRevealView` (Weave & SayIt içinde) hem standalone `NaturalReveal` ekranı olarak export edilir. L1-L3 merge PR #180 **device pass bekliyor** (NOT merged per STATUS).

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Learner Action
Okur, **Continue**. Cevap yok — geri bildirim yüzeyi.

## Input Contract
`NaturalRevealPayload` (`lessonTypes.ts:70-81`): `modelAnswer?`, `ifCorrect?`, `ifCorrectButFlat?`, `ifUnderstandableButWrong?`, `ifWrongStructure?`, `ifTooDirect?`, `ifMissingTargetPiece?`, `ifBetterThanExpected?`, `naturalAlternatives?`, `explanation?`. Ayrıca çağıran `mode: NaturalRevealMode` (`general|exact|alternative|no-match`, `:18`) geçirir.

## Output Contract
Yok (cevap üretmez).

## Correctness Rule
N/A — doğru/yanlış yargısı Weave/SayIt tarafında verilmiş; burada yalnız görüntülenir.

## Evidence Produced
Yok. Bkz. [[Exercise Evidence Matrix]].

## Error Types
Yok (cevapsız). Bkz. [[Exercise Error Matrix]].

## Scoring
Yok.

## Feedback
Mode-driven görüntü: "A natural version" (`modelAnswer`) + branch notice (`ifCorrect`/`ifCorrectButFlat`/`ifUnderstandableButWrong`…) + "Another way(s)" (`naturalAlternatives`) + "Why it works" (`explanation`). Weave'de mode = match sonucu; `none` → `no-match` (nötr compare, kırmızı değil).

## Suitable Use
Bir üretim denemesinden hemen sonra (Weave/SayIt sonrası) doğal modeli göstermek; ileri formu recognition-only tanıtmak (W2 penceresi).

## Unsuitable Use
> [!warning] Anti-pattern: **reveal-only item'ı aktif mastery gibi işlemek** (§16 ERROR); W2 penceresi ötesinde (>5-6 ders ileri) form açığa çıkarmak (lint error). Recognition-only "later form" normal teknik egzersiz gibi render edilmemeli — soft "later form" kartı.

## Difficulty Controls
Hangi branch string'lerinin yazıldığı; `naturalAlternatives` sayısı; `explanation` derinliği; W2 pencere mesafesi.

## Example Payload
> [!example]
```json
{ "modelAnswer": "Je voudrais un café, s'il vous plaît.",
  "ifCorrect": "Exactly how a local would ask.",
  "ifUnderstandableButWrong": "Understood — here's the smoother version.",
  "naturalAlternatives": ["Un café, s'il vous plaît."],
  "explanation": "voudrais softens the request; s'il vous plaît seals politeness." }
```

## Example Learner Interaction
Weave sonrası: öğrenci `Bonjour je voudrais un café` yazdı → mode `exact` → "A natural version: Bonjour, je voudrais un café." + "Why it works" → Continue.

## Runtime Component
`lemot-app/components/lesson-v1/screens/NaturalReveal.tsx` — `NaturalRevealView` (gömülü) + `NaturalReveal` (standalone screen). Kullanan: [[Weave]], [[Say It Your Way]].

## Tests
Doğrudan görülen birim test UNKNOWN; L1-L3 reveal davranışı PR #180 device pass'a bağlı (STATUS). → [[Needs Verification]].

## Known Risks
- L1-L3 merge device pass bekliyor → reveal'in "oturduğu" doğrulanmadı.
- Çok sayıda branch string yazılmazsa reveal generic kalır.

## Related Exercises
[[Weave]] · [[Say It Your Way]] · [[Insight and Notice]] · [[Review]]
</content>
