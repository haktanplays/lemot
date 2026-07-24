---
title: Daily Review
aliases: [Daily Review, DailyReviewOverlay, genReviewItems]
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
source_of_truth: ["lemot-app/components/DailyReviewOverlay.tsx", "lemot-app/app/(tabs)/index.tsx", "lemot-app/config/productStage.ts"]
code_refs: ["lemot-app/components/DailyReviewOverlay.tsx", "lemot-app/app/(tabs)/index.tsx:89-123", "lemot-app/components/DailyReviewOverlay.tsx:106-148", "lemot-app/components/DailyReviewOverlay.tsx:140", "lemot-app/config/productStage.ts:105"]
test_refs: ["lemot-app/__tests__/devApkScope.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Review]]", "[[Review and Recycling System]]", "[[Exercise Anti-Patterns]]"]
tags: [exercise, daily-review, srs, legacy, dev-apk-hidden]
---

# Daily Review

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

> [!canon] Purpose — Home ekranında günlük 5-kelime hedefi, weak-spot öncelikli, modal MCQ overlay. Canon niyeti: **sadece ulaşılan derslerden** çeken sakin bir retrieval önerisi, asla "come back tomorrow" / streak baskısı.

> [!historical] impl_status: **legacy-active ama `FEATURES.dailyReview=false` (dev-apk-HIDDEN)** (`productStage.ts:105`). Legacy flashcard havuzundan (`data/flashcards` `FLASH`) çeker — v1 Round 1'in review yüzeyi yok. Canon SRS announcement / §9.1 ritüeli **PLANNED**, bu değil.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]] · Sistem: [[Review and Recycling System]]

## Learner Action
Modal içinde MCQ cevaplar; günlük 5-kelime hedefine ilerler.

## Input Contract
`genReviewItems(count, weakSpots, maxEligibleLesson)` (`DailyReviewOverlay.tsx:106-148`): `FLASH` havuzundan çeker, `lessonId <= maxEligibleLesson` (asla gelecek-ders içeriği; güvenli fallback `lessonId===1`).

## Output Contract
`dr:{date,count}` (legacy `lm7`). Engine kanıtı yok.

## Correctness Rule
MCQ seçim doğruluğu; soru formu `What does "X" mean?` (`:140`).

## Evidence Produced
Günlük sayaç (`lm7` `dr`). Bkz. [[Exercise Evidence Matrix]].

## Error Types
`correct`, `wrong_item`. Engine emit yok.

## Scoring
Günlük hedef sayacı (5 kelime), weak-spot önceliklendirme.

## Feedback
Doğru/yanlış modal içi.

## Suitable Use
Ulaşılan içerikten sakin günlük retrieval (canon niyeti). Weak-spot önce.

## Unsuitable Use
> [!warning] Anti-pattern: Bu, ürün pozisyonunun **reddettiği** "flashcard What-does-X-mean" kalıbının ta kendisi (`:140`). Yalnızca `FEATURES.dailyReview=false` bayrağı arkasında tutuluyor. Streak / "come back tomorrow" dili yasak. Bkz. [[Exercise Anti-Patterns]].

## Difficulty Controls
`count` (5), `weakSpots` önceliği, `maxEligibleLesson` kapsamı.

## Example Payload
> [!example]
```json
{ "count": 5, "weakSpots": ["café"], "maxEligibleLesson": 6,
  "item": { "q": "What does \"café\" mean?", "opts": ["coffee","water","tea"], "a": "coffee" } }
```

## Example Learner Interaction
Home kartı "Daily Review" → modal → `What does "café" mean?` → coffee → sonraki → 5/5. (dev-apk'te bu kart görünmez.)

## Runtime Component
`lemot-app/components/DailyReviewOverlay.tsx` (+ `app/(tabs)/index.tsx:89-123`).

## Tests
`devApkScope.test.ts` (gating). `genReviewItems` üstünde doğrudan test UNKNOWN.

## Known Risks
- Anti-pattern flashcard formatı; sadece bayrak arkasında.
- Canon: Daily Review nihayet engine mastery/review projeksiyonlarını kullanmalı (legacy `lm7` yerine) — PLANNED. → [[Review and Recycling System]], [[05 Open Loops]].

## Related Exercises
[[Review]] · [[Review and Recycling System]] · [[Multiple Choice]] · [[Mastery Model]]
</content>
