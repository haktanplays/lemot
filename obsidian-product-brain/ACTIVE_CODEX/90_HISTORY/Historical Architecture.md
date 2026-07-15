---
title: Historical Architecture
aliases: [Eski Mimari, Legacy Runtime Architecture]
type: historical
domain: history
status: active
canon_status: historical
implementation_status: legacy-unreachable
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["CLAUDE.md", "docs/STATUS.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[History Index]]", "[[System Architecture]]", "[[Runtime Content Architecture]]", "[[Storage Architecture]]"]
supersedes: []
superseded_by: ["[[System Architecture]]", "[[Runtime Content Architecture]]", "[[Learning Engine Architecture]]"]
tags: [history, architecture, runtime, storage]
---

# Historical Architecture

> [!historical] Bu not, eski **runtime ve altyapı** kararlarını kaydeder (legacy
> 24-lesson runtime, eski storage şeması, model-routing). Güncel mimari için
> [[System Architecture]] ve [[Runtime Content Architecture]]'a git.

## 1. Legacy 24-lesson runtime (Runtime A) — legacy-unreachable

> [!historical] superseded_by: [[Runtime Content Architecture]].
- Eski v7 akışı: `data/lessons` → `SECS` array → 11-section renderer. Bugün bu
  **Runtime A** olarak biliniyor: HISTORICAL, dev-apk'te **gizli**, `LEGACY — DO
  NOT BUILD ON THIS` banner'ı taşıyor (`data/lessons/*`, `flashcards.ts`,
  `milestones.ts`).
- Üç paralel runtime'dan biri (kritik ayrım):

| Sistem | Ne | Statü |
|---|---|---|
| **A. Legacy 24-lesson** | `data/lessons` → `SECS` | HISTORICAL, gizli |
| **B. Static authored v1** | `content/lessons/v1/*`, 7 ekran tipi, `LessonRendererV1` | **CURRENT — sevkedilen dev-apk yüzeyi** |
| **C. Learning-engine** | `content/learning-engine/*` saf motorlar | sandbox/founder-gated |

Güncel ayrım: [[Runtime Content Architecture]], [[Runtime Lesson Map]].

## 2. Eski storage şeması — kısmen tarihsel

> [!historical] v7 storage yapısı: `expo-sqlite/kv-store` (native) / `localStorage`
> (web) / `window.storage` (artifact). Ana anahtar `lm7`, yapı `{p, err, dr:
> {date, count}}`. **`xp` + `streak` alanları Sprint commit `a883b2a`'de
> kaldırıldı**; SRS anahtarı `lm7_srs` (Leitner 5-box, aralıklar [0,1,3,7,30]).
- **Migration borcu:** `streak` kolonu `schema.sql`'den düşürüldü ama **deployed
  Supabase DB'de hâlâ olabilir** (migration public-beta'ya ertelendi). Buradan
  "streak UI'a geri dönüyor" sonucu **çıkarma**.
- Güncel storage: legacy `lm7` hâlâ Home/Progress/Daily Review'ı besliyor; ama
  learning-engine kendi append-only `lm_le_events` log'unu source of truth
  yapıyor. İki store **disjoint** ("main integration blocker"). Detay:
  [[Storage Architecture]], [[Data Flow]].

## 3. Model-routing tablosu — SPEC-VS-REALITY drift (HISTORICAL)

> [!historical] `CLAUDE.md` legacy tablosu (standalone için):

| Task | Model | Why |
|---|---|---|
| Exercise generation | Gemini 2.5 Flash-Lite | Cheapest |
| AI Chat | Gemini 2.5 Flash | Better dialogue |
| Error analysis | **Claude Haiku** | Better reasoning |

> Gerçek `_shared/providers.ts` zinciri: Gemini 2.5 Flash → Gemini 2.5 Pro →
> Groq Llama 3.3 → Mistral Small — **Claude yok**. Tablo D2 doc-sync tuzağı; AI
> dormant olduğu için moot. Güncel: [[AI Architecture]].

## 4. Sprint 10 Backend & AI — kısmen tarihsel

> [!historical] v7 Sprint 10: Supabase client, Auth hook/provider/screen, DB
> schema deployed (3 tablo + RLS), progress sync, home'da Sign In butonu. Bloker
> notu: "Supabase email confirmation Dashboard'da kapatılmalı." Bu blok bugün
> büyük ölçüde **dormant/deferred** (dev-apk AI-closed, auth-light identity
> unbuilt). Legacy tablolar (`profiles`/`user_progress`/`user_errors`) event-
> sourced Lexique Memory ile **uyumsuz** ilan edildi; asla sync target olmayacak
> (KNOWN_GAPS #13). Güncel: [[Supabase]], [[Sync Architecture]], [[Authentication]].

## 5. Güncel mimariye köprü

> [!canon] Güncel makro mimari: **events = source of truth; her şey projection**
> (mastery matrix, Mon Lexique, Practice Pool, Daily Review). Deterministik motor
> önce; AI açıklar ama asla override etmez. `LearningRepository` interface app ile
> storage arasında (`LocalRepository` kvStorage / `RemoteRepository` Supabase).
> Karpathy engine-purity contract: pure, deterministic, explicit `now`, explicit
> fail (fail-closed). Detay: [[Learning Engine Architecture]], [[Self-Producing Engine]],
> [[Failure and Recovery Model]].

## Related Notes
- Yukarı: [[00 Le Mot Holy Codex]] · [[History Index]]
- Güncel karşılıklar: [[System Architecture]] · [[Runtime Content Architecture]] · [[Storage Architecture]] · [[AI Architecture]]
- Kardeş: [[Historical Designs]] · [[Superseded Specs]]
