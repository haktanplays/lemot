---
title: Exercise Matrix
aliases: [Exercise Matrix]
type: architecture
domain: exercise
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["content/lessonTypes.ts", "components/lesson-v1/"]
related: ["[[Exercise System Overview]]", "[[Exercise Selection Matrix]]", "[[Error Matrix]]", "[[Lesson Flow]]"]
tags: [matrix, exercise]
---

# Exercise Matrix

> Cross-cutting egzersiz yetenek matrisi (kanonik). Egzersiz-içi detay matrisleri
> [[Exercise Selection Matrix]] / [[Exercise Evidence Matrix]] / [[Exercise Error Matrix]]'te.

| Egzersiz | Recognition | Recall | Controlled prod. | Free prod. | Audio | Ana hata tipleri | Runtime (surface) |
|---|---|---|---|---|---|---|---|
| [[Meet]] | ✅ | — | — | — | (planned) | — | MeetCard.tsx (static, B) |
| [[Insight and Notice]] | ✅ | — | — | — | — | — | InsightCard.tsx (static, B) |
| [[Fill]] / [[Multiple Choice]] | ✅ | ✅ | — | — | — | trap-reason | FillWithTraps.tsx (B) |
| [[Weave]] | — | ✅ | ✅ | ⚠️ open (ungraded) | — | word-order, missing-piece | Weave.tsx (B) |
| [[Say It Your Way]] | — | — | — | ✅ (ungraded) | — | — (never grades) | SayItYourWayV1.tsx (B) |
| [[Natural Reveal]] | ✅ | — | — | — | — | — | NaturalReveal.tsx (B) |
| [[Review]] | ✅ | — | — | — | — | — | RecapCard.tsx (B) |
| [[Read and Listen]] | ✅ | — | — | — | ✅ | — | legacy sections (hidden) |
| [[Build]] | — | ✅ | ✅ | — | — | order | legacy (hidden) |
| [[French Fill]] | ✅ | ✅ | — | — | — | — | legacy (hidden) |
| [[Combine and Weave]] | — | ✅ | ✅ | — | — | — | legacy (hidden) |
| [[Write]] | — | — | — | ✅ | — | — | legacy (hidden) |
| [[Mini Conversation]] | — | — | ✅ | ✅ | — | — | legacy (hidden, AI) |
| [[Daily Review]] | ✅ | ✅ | — | — | — | — | overlay (dailyReview=false) |

Surface B = sevkedilen v1 renderer. "hidden" = legacy 11-section, dev-apk gizli.

> [!warning] v1 renderer egzersizleri **LearningEvent üretmiyor** → "Ana hata
> tipleri" sütunu şu an yalnızca UI feedback'i (FillWithTraps trapReason);
> ErrorTagCode telemetrisi motor yüzeyinde (C). [[Error Matrix]] · [[Error Tracking System]].
