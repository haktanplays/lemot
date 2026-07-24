---
title: Exercise Evidence Matrix
aliases: [Kanıt Matrisi, Evidence Produced Matrix]
type: system-spec
domain: exercise
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["cairn_build/evidence/03_exercises.md", "lemot-app/content/learning-engine/events.ts", "lemot-app/content/learning-engine/mastery.ts"]
code_refs: ["lemot-app/components/lesson-v1/LessonRendererV1.tsx:23,36-40", "lemot-app/app/lesson/[id].tsx:284-303", "lemot-app/content/learning-engine/events.ts:107-134"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Exercise Selection Matrix]]", "[[Exercise Error Matrix]]", "[[Error Tracking System]]", "[[Mastery Model]]"]
tags: [exercise, matrix]
---

# Exercise Evidence Matrix

> [!canon] Her egzersiz hangi **mastery sinyalini** üretir ve **LearningEvent** emit eder mi? Kritik gerçek önden: **v1 runtime hiç LearningEvent emit etmez.** Engine event modeli (`lm_le_events`) yalnız sandbox'ta çalışır; legacy ise `logErr()` ile ayrı bir weak-spot izleyiciye yazar.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]] · İlgili: [[Error Tracking System]], [[Mastery Model]]

## Matris

| Egzersiz | Ürettiği mastery/kanıt sinyali | LearningEvent emit? | Runtime kanıt hedefi |
|---|---|:---:|---|
| Meet | canon: `item_seen` (discovery, düşük ağırlık); runtime: yok | **Hayır** | — |
| Insight and Notice | canon: seen/exposure state; runtime: yok | **Hayır** | — |
| Read and Listen | completion only (thr 0) | Hayır | legacy `lm7` section marker |
| Multiple Choice | correct/incorrect boolean | **Hayır (v1)** / legacy: score+`logErr` | lokal |
| Fill | correct/incorrect boolean (`answer.includes(id)`) | **Hayır (v1)** | lokal, telemetri yok |
| French Fill | score/total (thr .7) + `logErr(word,section,…)` | Hayır (engine event yok) | legacy weak-spot |
| Build | score/total (thr .7) + `logErr` | Hayır | legacy weak-spot |
| Weave | `MatchResult` (exact/alternative/none) | **Hayır** — open Weave ungraded (W1) | lokal |
| Combine and Weave | combined score; Weave fazı per-word inclusion | Hayır + `logErr` | legacy weak-spot |
| Write | score/total (thr .6) + `logErr` | Hayır | legacy weak-spot |
| Say It Your Way | öğrenci metni saklanır; opsiyonel AI notu (gated OFF) | **Hayır** — asla gradelemez | lokal karşılaştırma |
| Mini Conversation | completion (`canFinish` ≥3 tur) | Hayır | dev-apk'te null render |
| Review (Recap) | yok (consolidation); legacy Review: score thr .7 + `logErr` | Hayır | — / legacy weak-spot |
| Daily Review | `dr:{date,count}` (lm7); günlük 5-kelime hedefi | Hayır | legacy `lm7` |
| Natural Reveal | yok (feedback/reveal surface) | Hayır | — |
| **engine grader** (`grade()`, sandbox) | `result: ErrorTagCode` → `MasterySnapshot` (counters+Leitner+PF) | **Evet (sandbox-only)** | `lm_le_events` |

## Nasıl okunur

- **İki store disjoint (CANONICAL):** v1 completion marker `lm7` yazar (`{number}-read_listen:true`, `LessonRendererV1.tsx:23,36-40`); engine renderer `lm_le_events` yazar; ikisi birbirini okumaz. "The main integration blocker." Bkz. [[Storage Architecture]], [[Data Flow]].
- **Legacy kanıt yolu:** `logErr(word,section,given,correct,lessonId)` (`app/lesson/[id].tsx:284-303`) = legacy weak-spot tracker, engine `ErrorTagCode` taksonomisinden **ayrı**.
- **Engine kanıt yolu (sandbox):** `LearningEvent` (`events.ts:107-134`) `result: ErrorTagCode` + `errorTags[]` + `clientEventId` taşır; `scoreEvents()` bunları `MasterySnapshot` sayaçlarına katlar (`seenCount, wrongCount, productionSuccess…, weakTags, precisionCount`). `WEAK_THRESHOLD=3`, Leitner `[0,1,3,7,30]`, PF0–PF3. Bkz. [[Mastery Model]].
- **Evidence weighting** (EXERCISE_CANON §2 bantları) bir **mastery-v0.3 PROPOSAL**; sevkedilen `mastery-v0.2` frozen. Telemetri v0.2 event listesi PROPOSAL. (PROPOSED/DEFERRED)

> [!warning] Bu matrisin en önemli mesajı: bugün sevkedilen dev-APK yüzeyi (v1) **öğrenme kanıtı üretmez**. Zengin kanıt sistemi gerçek koddur ama sandbox'ta kilitlidir. → [[05 Open Loops]].

## Related Notes

[[Error Tracking System]] · [[Mastery Model]] · [[Self-Producing Engine]] · [[Exercise Error Matrix]]
</content>
