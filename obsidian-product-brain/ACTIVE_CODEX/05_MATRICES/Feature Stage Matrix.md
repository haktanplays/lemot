---
title: Feature Stage Matrix
aliases: [Feature Stage Matrix, Feature Flags]
type: architecture
domain: architecture
status: canonical
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["config/productStage.ts"]
related: ["[[Product Stages and Feature Flags]]", "[[Feature Flags Map]]", "[[Product Stage Architecture]]", "[[Route Matrix]]"]
tags: [matrix, stage, flags]
---

# Feature Stage Matrix

> `ProductStage = sandbox | dev-apk | public-beta`. Çözümleme **fail-closed →
> dev-apk**: env eksik/yanlışsa en kısıtlı yüzey açılır. Kaynak: `config/productStage.ts`.
> Anlatım: [[Product Stages and Feature Flags]].

| Feature / flag | sandbox | dev-apk | public-beta | Runtime durumu |
|---|---|---|---|---|
| paywall | ? | ❌ false | ✅ true | public-beta'da açılır ([[Monetization and Scope Boundaries]]) |
| revenueCat | ? | ❌ | ✅ | public-beta only |
| aiChat | ✅ | ❌ | ❌ | dev-apk/public-beta kapalı |
| aiEnabled (master switch) | ✅ | ❌ | ❌ | **dev-apk + public-beta fail-closed** → deterministic fallback |
| aiLesson | ✅ | ✅ true | ? | dev-apk'te açık (ama AI stack dormant) |
| practice | ✅ | ❌ | ? | dev-apk gizli ([[Practice]]) |
| progress | ✅ | ❌ | ? | dev-apk gizli ([[Progress]]) |
| dailyReview | ✅ | ❌ | ? | dev-apk gizli ([[Daily Review UI]]) |
| wordGraph | ✅ | ❌ | ? | post-beta ([[Future Features]]) |
| monLexique | ✅ | ❌ | ? | runtime deferred ([[Mon Lexique]]) |
| v1LessonEngine (/learn) | ✅ | ❌ | ❌ | sandbox+founder only |

? = kaynak özetinde kesin değer verilmedi → [[Needs Verification]] (config/productStage.ts'te doğrula).

> [!warning] `aiLesson=true` olsa da AI **fiilen çağrılamıyor** (edge auth vs
> no-auth product mismatch) → [[AI Architecture]]. "Flag açık" ≠ "özellik çalışıyor".
