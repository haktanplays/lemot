---
title: Learning Engine Context Pack
aliases: [Engine Pack, Motor Paketi, Learning Engine Pack]
type: handoff
domain: learning
status: active
canon_status: canonical
implementation_status: partial
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/engineering/karpathy.md", "docs/canon/LESSON_FLOW_CANON_v1.md", "docs/ROADMAP.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
related: ["[[Canonical Context Pack]]", "[[Learning Engine Architecture]]", "[[Mastery Model]]", "[[Error Tracking System]]", "[[Self-Producing Engine]]"]
tags: [agent, context, learning-engine]
---

# Learning Engine Context Pack

<!-- gh-toc -->

## İçindekiler

- [Kuzey yıldızı (D-11)](#kuzey-yıldızı-d-11)
- [Engine-purity sözleşmesi (D-12, test-locked)](#engine-purity-sözleşmesi-d-12-test-locked)
- [Mastery modeli (D-23, foundation IMPLEMENTED/tested; wiring DEFERRED)](#mastery-modeli-d-23-foundation-implementedtested-wiring-deferred)
- [Error tracking (D-15)](#error-tracking-d-15)
- [Lexique Memory (D-35, ACTIVE contract + pure impl; wiring/tuning DEFERRED)](#lexique-memory-d-35-active-contract-pure-impl-wiringtuning-deferred)
- [Repository katmanı](#repository-katmanı)
- [Storage ayrımı (main integration blocker)](#storage-ayrımı-main-integration-blocker)
- [Deterministik drill derivation (D-25, shipped #179)](#deterministik-drill-derivation-d-25-shipped-179)
- [Kanon ama IMPLEMENTATION ertelenmiş (dikkat: motor var ≠ bağlı)](#kanon-ama-implementation-ertelenmiş-dikkat-motor-var-bağlı)
- [Ekran bütçesi (D-29, LOCKED)](#ekran-bütçesi-d-29-locked)
- [İlgili Notlar](#ilgili-notlar)

> [!warning] Bu paketteki her şey **runtime C** hakkında: `content/learning-engine/*`.
> Bu motor **gerçek koddur ama sevkedilen dev-apk yüzeyine BAĞLI DEĞİL** — sandbox/founder-gated,
> çoğunlukla unit-tested. Bir motor modülünün var olması, kullanıcının onu yaşadığı anlamına gelmez.
> Ana evi: [[Learning Engine Architecture]].

## Kuzey yıldızı (D-11)
"Components render. Engines decide. Contracts constrain. **Events remember.** AI explains but never overrides."
Append-only `learning_event` log = **source of truth**; mastery/Mon Lexique/Practice Pool/Daily Review/dashboard
hepsi **projeksiyon**. Scoring policy değişimi **re-derive eder, migrate etmez**. Ana evi: [[Self-Producing Engine]] · [[Data Flow]].

## Engine-purity sözleşmesi (D-12, test-locked)
Her modül: **PURE** (storage/network/React/AI/gizli state yok) · **DETERMINISTIC** (tie'lar açık) ·
**EXPLICIT now** (clock parametre; `Date.now()`/`Math.random()` motor içinde YOK) ·
**FAIL-CLOSED** (null/"unsupported", veri dokunulmaz, sessiz kayıp yok). Triple validation yeşil olmadan PR yok:
`typecheck` · `validate:content` · `test:learning-engine`. Motor mantığı testleriyle **aynı PR'da** gelir.

## Mastery modeli (D-23, foundation IMPLEMENTED/tested; wiring DEFERRED)
Saf `scoreEvents()` → `MasterySnapshot`. `WEAK_THRESHOLD=3`. Leitner box interval `[0,1,3,7,30]`.
Prompt-fade PF0–PF3. `monLexiqueStatus`: hidden/added/weak. **Challenge = weak-only**; precision-only item Build-only.
**Near-miss precision** (`punctuation_only`/`accent_only`/`spelling_near_miss`) = **soft signal**:
`precisionCount`/`precisionTags` yazar; wrongCount artırmaz; `isWeak` yapmaz; Leitner box/prompt-fade düşürmez;
Mon Lexique'e otomatik eklemez. Staged strictness (L60/L70+, monolingual) **DEFERRED**. `MASTERY_SNAPSHOT_VERSION`: `v0.2` (her koşuda recompute, migration yok).

## Error tracking (D-15)
**16-değerli `ErrorTagCode`** union; `weakTags`/`precisionTags`/`resultTag` = learner-evidence key'leri;
**27-değerli `WEAK_POINT_TAGS`**. Error tag'ler content factory'nin sipariş dili (error→tag→drill) VE öğrenci
kanıtının referans anahtarı. YASA 3: shipped tag rename/silme yasak (54/30 frozen, kaynağa göre). Ana evi: [[Error Tracking System]] · [[Error Matrix]].

## Lexique Memory (D-35, ACTIVE contract + pure impl; wiring/tuning DEFERRED)
`mastery-v0.2` reducer üzerinde **derived** katman (reducer değişimi/migration/yeni event YOK).
18-alan contract, exponential-saturation strength, iki-bucket decay (5d/14d), refresh eşiği 0.50,
carryover cap'leri 3/2/2/1 + target-share ≥ 0.50, intrinsic 8-state lifecycle. Test-pinned:
strength(P=3) ≈ 0.6988 (< STRONG 0.70 → Known için P=3+R=1 veya P=4). Ana evi: [[Mon Lexique]] · [[Review and Recycling System]].

## Repository katmanı
`LearningRepository` interface app ↔ storage arasında oturur: `LocalRepository` (kvStorage) /
`RemoteRepository` (Supabase, unbuilt). Ana evi: [[Storage Architecture]] · [[Sync Architecture]].

## Storage ayrımı (main integration blocker)
`lm_le_events` (SoT) + `lm_le_snapshot` + `lm_le_privacy_state` vs legacy `lm7`/`lm7_srs` — **disjoint**.
Home/Progress/Daily Review hâlâ `lm7` okur. Karar (D-10): engine projeksiyonlarını (`selectLessonProgress`)
oku; **sahte `lm7` bridge marker YAZMA**. Ana evi: [[Data Flow]].

## Deterministik drill derivation (D-25, shipped #179)
Hub egzersizleri **DERIVED** (item + screen-type template → deterministik "chip'i fill formuna dök"),
elle statik değil. `deriveDrill` fail-closed + practice selector v0 (order: SRS-due → weakest tag →
upcoming integration need → variety). **Evidence weight ≠ selection weight** (ayrı modüller, asla karışmaz).
Ana evi: [[Self-Producing Engine]] · [[Content Selection]].

## Kanon ama IMPLEMENTATION ertelenmiş (dikkat: motor var ≠ bağlı)
- **Instruction Weave = thermostat** (ladder değil) → Faz D. (D-26)
- **Readiness Gate** (integration-scoped, fail-open) → Faz C. (D-27)
- **Unified hint/struggle ladder** → Faz B / Taş 1 PR 5. (D-28)
- **Meet/Insight/Recap per-screen etkileşim** → Faz B PLANNED. (bugün statik Continue)
Ana evi: [[Lesson Flow]] · [[Deferred Decisions]].

## Ekran bütçesi (D-29, LOCKED)
Toplam **11–14 ekran** (uncounted screen yok): 9–11 action + 2–3 insight-card. Micro-action 15–25;
per-screen action 1–3 (cap 4); 7–10 dk; **1–4 yeni active chip (değişmez müfredat disiplini)**. Ana evi: [[Lesson Flow]] · [[Difficulty and Cognitive Load]].

## İlgili Notlar
- [[Canonical Context Pack]] · [[Architecture Context Pack]] · [[Syllabus Context Pack]]
- [[Learning Engine Architecture]] · [[Mastery Model]] · [[Error Tracking System]] · [[Self-Producing Engine]]
