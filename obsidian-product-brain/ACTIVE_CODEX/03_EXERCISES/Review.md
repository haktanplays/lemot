---
title: Review
aliases: [Recap, recap, RecapCard, Stay with It, Lesson End]
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
source_of_truth: ["lemot-app/content/lessonTypes.ts:166-171", "lemot-app/components/lesson-v1/screens/RecapCard.tsx", "docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: ["lemot-app/components/lesson-v1/screens/RecapCard.tsx", "lemot-app/content/lessonTypes.ts:166-171", "lemot-app/components/sections/Review.tsx", "lemot-app/utils/reviewScore.ts"]
test_refs: ["lemot-app/__tests__/v1LessonStructure.test.ts", "lemot-app/__tests__/reviewScore.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Daily Review]]", "[[Insight and Notice]]", "[[Chip Taxonomy]]"]
tags: [exercise, recap, review, consolidation, v1-active, legacy]
---

# Review

<!-- gh-toc -->

## İçindekiler

- [İki farklı "Review"](#iki-farklı-review)
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

> [!canon] Purpose — dersin kapanış konsolidasyonu. v1 runtime'ı `recap` ekranı: "**taşını sen diz**" (place your own stone) — kullanılan parçaları listeler (§9.1). Canon isimlendirme reframe'inde "Review → **Stay with It / Lesson End**".

> [!implemented] impl_status: **v1: implemented (active)** = `RecapCard.tsx` (static). **legacy: legacy-active (dev-apk-hidden)** = `sections/Review.tsx` — gerçek karışık gözden-geçirme egzersizi (listen / odd-one-out / context / fill_ctx / weave-blanks), skorlanır.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## İki farklı "Review"

| | v1 Recap (aktif) | legacy Review section (gizli) |
|---|---|---|
| Rol | konsolidasyon, cevapsız | karışık skorlu gözden-geçirme |
| Correctness | yok | per-type; weave-blank `norm==` |
| Skor | yok | thr .7, `reviewTotalScorable` payda |

## Learner Action
- **v1 Recap:** okur, "Pieces you used" chip satırını görür, **Continue**.
- **legacy:** listen/odd-one-out/context/fill/weave-blank alt-egzersizlerini yapar.

## Input Contract
- v1 `RecapPayload` (`lessonTypes.ts:166-171`): `title?`, `lines[]`, `piecesUsed?`, `nextLabel?`.
- legacy: `items[]` karışık tipli.

## Output Contract
- v1: yok.
- legacy: `onComplete(score,total)` + `logErr`.

## Correctness Rule
- v1: N/A.
- legacy: alt-tipe göre; weave-blank `norm(a)===norm(input)`.

## Evidence Produced
- v1: yok (konsolidasyon).
- legacy: score (thr .7) + weak-spot; per-blank payda (`reviewScore.ts`, audit B11). Bkz. [[Exercise Evidence Matrix]].

## Error Types
v1: yok. legacy: alt-tipe göre karışık (bkz. [[Exercise Error Matrix]]).

## Scoring
v1: yok. legacy: review thr .7 (`sections.ts`), per-blank denominator.

## Feedback
v1: yok (static kutlama-siz özet). legacy: alt-egzersiz feedback'i.

## Suitable Use
v1 Recap: ders sonu "ne kullandın" özeti, sıradaki sahneye 1 satır köprü. legacy Review: karışık retrieval pratiği.

## Unsuitable Use
> [!warning] Anti-pattern: `piecesUsed` chip'leri **atomik** olmalı — cümle/clause chip **hata**. İki guard: (a) sentence-chip heuristic `v1LessonStructure.test.ts:66-76,372-390` (SUBJECT_START + ≥3 token + terminal punctuation; PROTECTED_CHUNKS = {je ne suis pas, ce n'est pas}); (b) exposure-tier surface piecesUsed'da = **V4 error** (canonRules). Ayrıca kutlama/streak dili yasak.

## Difficulty Controls
v1: `lines[]` ve `piecesUsed[]` seçimi. legacy: alt-egzersiz karışımı.

## Example Payload
> [!example]
```json
{ "type": "recap",
  "payload": { "title": "Your survival kit",
    "lines": ["You can greet, ask politely, and thank."],
    "piecesUsed": ["Bonjour", "je voudrais", "un café", "s'il vous plaît", "merci"],
    "nextLabel": "Next: Être" } }
```

## Example Learner Interaction
L1 son ekran: recap "Your survival kit" + kullanılan parçalar chip satırı → Continue.

## Runtime Component
`lemot-app/components/lesson-v1/screens/RecapCard.tsx` (payload `lessonTypes.ts:166-171`). Legacy: `lemot-app/components/sections/Review.tsx` (+ `utils/reviewScore.ts`).

## Tests
`v1LessonStructure.test.ts` recap has lines (358-370), piecesUsed atomic (372-390). Legacy: `reviewScore.test.ts` (per-blank payda).

## Known Risks
- Canon'un "tap to collect your pieces" etkileşimi v1'de yok → static (Faz B PLANNED).
- SRS announcement / end-of-lesson §9.1 ritüeli PLANNED, bu ekran değil. → [[Daily Review]].

## Related Exercises
[[Insight and Notice]] · [[Daily Review]] · [[Natural Reveal]] · [[Chip Taxonomy]]
</content>
