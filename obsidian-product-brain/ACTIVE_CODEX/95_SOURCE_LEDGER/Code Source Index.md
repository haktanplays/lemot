---
title: Code Source Index
aliases: [Code Index, lemot-app Index, Kod Kaynak Dizini]
type: source-record
domain: meta
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/"]
code_refs: ["lemot-app/content/itemRegistry.ts", "lemot-app/content/lessonTypes.ts", "lemot-app/config/productStage.ts", "lemot-app/providers/AppProvider.tsx"]
related: ["[[Source Ledger]]", "[[Repository Document Index]]", "[[Test Source Index]]", "[[Runtime Content Architecture]]", "[[Registry Architecture]]", "[[Learning Engine Architecture]]"]
tags: [source, meta, code, index]
---

# Code Source Index

<!-- gh-toc -->

## İçindekiler

- [Üç runtime — hızlı ayrım](#üç-runtime-hızlı-ayrım)
- [İçerik & tipler (content/)](#içerik-tipler-content)
- [Renderer bileşenleri](#renderer-bileşenleri)
- [Hook'lar, lib, provider, config](#hooklar-lib-provider-config)
- [Route'lar (app/)](#routelar-app)
- [Supabase (supabase/)](#supabase-supabase)
- [Scripts (build tooling) → [[Test Source Index]]](#scripts-build-tooling-test-source-index)
- [İlgili notlar](#ilgili-notlar)

> [!implemented] `lemot-app/` içindeki **yük taşıyan kaynak dosyaların/dizinlerin**
> tek-satır amacı + hangi vault notunun onu belgelediği. Kod = "current codebase canon"
> (runtime-truth). Kilitli mimari gerçek: **üç paralel ders runtime'ı** bir arada yaşar —
> A legacy (HISTORICAL/dev-apk-gizli), B static v1 (SHIPPED dev-apk yüzeyi),
> C learning-engine (sandbox/founder-gated). Bir iddiada hangi runtime'dan bahsettiğini
> daima belirt. HEAD = `02f9f7a` (#196).

## Üç runtime — hızlı ayrım

| Runtime | İçerik | Renderer | Route | Erişilebilir | Statü |
|---|---|---|---|---|---|
| A. Legacy 24-ders | `data/lessons` | `LessonPractice` + `SECS` (11-bölüm) | `/lesson/[id]` | sandbox, public-beta (dev-apk'te gizli) | IMPLEMENTED / HISTORICAL |
| B. Static authored v1 | `content/lessons/v1/*` (16 dosya) | `LessonRendererV1` | `/v1-lesson/[id]` | sandbox + dev-apk (Home L1-L6 cap) | IMPLEMENTED (tester yüzeyi) |
| C. Learning-engine | `content/learning-engine/*` | `LearnerRendererShell` / dev player | `/learn/[fixtureId]`, `/dev/*` | sadece sandbox (founder) | tested-only / spec-only |

Detay: [[Runtime Content Architecture]].

## İçerik & tipler (`content/`)

| Dosya/dizin | Amaç | Belgeleyen not |
|---|---|---|
| `content/itemRegistry.ts` | `ITEM_REGISTRY` — donmuş 54-item object literal; `ItemId=keyof`; getItem/hasItem/getItems | [[Registry Architecture]], [[Registry Usage Matrix]] |
| `content/lessonTypes.ts` | Authored-content tip sistemi (330 satır): `LearningItem`, 7 `ScreenType`, `Lesson`, zengin pedagoji enum'ları | [[Lesson Anatomy]], [[Runtime Content Architecture]] |
| `content/weakPointTags.ts` | Donmuş 27-değer `WEAK_POINT_TAGS` listesi (pedagojik zayıflık anahtarları) | [[Error Tracking System]], [[Error Matrix]] |
| `content/index.ts` | Registry + tiplerin re-export barrel'ı | [[Registry Architecture]] |
| `content/lessons/v1/lesson-000..015.ts` (16 dosya) | Runtime B: typed `Lesson` objeleri (L0-L15). L0-L6 görünür, L7-L15 kayıtlı-ama-Home-gated | [[Runtime Lesson Map]], [[Lesson Status Matrix]] |
| `content/lessons/v1/index.ts` | `V1_LESSONS[]` kaydı + `getV1LessonById(id)` | [[Runtime Lesson Map]] |
| `content/learning-engine/index.ts` | Runtime C "Executable content contract (v0.1)"; fixture agregasyonu; `mergeItemMapsStrict` | [[Learning Engine Architecture]] |
| `content/learning-engine/lessons/L{1,2,11,12,14,15,16,18}.{contract,exercises}.ts` | 8 dersin contract + exercises fixture'ları (fixture-only) | [[Learning Engine Architecture]], [[Spec to Runtime Matrix]] |
| `content/learning-engine/grade.ts` | Pure, AI-free, storage-free, clock-free deterministik grader | [[Feedback and Scoring Philosophy]], [[Learning Engine Architecture]] |
| `content/learning-engine/answer-check.ts` | normalize/checkAnswer | [[Feedback and Scoring Philosophy]] |
| `content/learning-engine/mastery.ts` | Counter-derived `MasterySnapshot` reducer; WEAK_THRESHOLD=3; Leitner [0,1,3,7,30]; PF0-3 (tested-only) | [[Mastery Model]], [[Mastery Matrix]] |
| `content/learning-engine/events.ts` | `LearningEvent` şeması + 16-değer `ErrorTagCode` union (donmuş) | [[Error Tracking System]] |
| `content/learning-engine/error-engine.ts` | ErrorTagCode↔FeedbackVerdict köprüsü (Error Engine v0, pure) | [[Error Tracking System]], [[AI Role and Guardrails]] |
| `content/learning-engine/carryover-selector.ts` | Carryover Selector v0 (§65.6); query-time rol, stored mutation değil (tested-only) | [[Spine and Carryover Logic]], [[Review and Recycling System]] |
| `content/learning-engine/lexique-memory.ts` | Lexique Memory v0.1 derived layer (18-field kontrat) (tested-only) | [[Mon Lexique]], [[Review and Recycling System]] |
| `content/learning-engine/mon-lexique.ts` | `selectMonLexiqueEntries` — registry + snapshot üzeri learner-safe projeksiyon | [[Mon Lexique]], [[Mon Lexique UI]] |
| `content/learning-engine/practice-pool.ts` | `selectPracticePoolBuckets` (Build/Stretch/Challenge) | [[Review and Recycling System]], [[Practice]] |
| `content/learning-engine/practice-selector.ts` | "Bugünün seti" seçici (SELECTION weight); scoring yapmaz (tested-only) | [[Content Selection]], [[Review and Recycling System]] |
| `content/learning-engine/derive-drill.ts` | Deterministik drill türetme (content factory ilk ürünü) (tested-only) | [[Self-Producing Engine]], [[Content Production Workflow]] |
| `content/learning-engine/boundary.ts` | `isBoundaryLaterForm` dar sınıflandırıcı ("later form" kartları) | [[Insight and Notice]] (boundary UI) |
| `content/learning-engine/telemetry.ts` | Local-only telemetry v0 (content-debug, engagement değil) | [[Validation Gates]], [[Technical Debt]] |
| `content/learning-engine/compaction.ts` | Event compaction/snapshot v0 (cursor, non-destructive) | [[Storage Architecture]] |
| `content/learning-engine/migrations.ts` | YASA 1 migration rails (infrastructure-only, zero real migration) | [[Storage Architecture]], [[Decision Index]] (D-13) |
| `content/learning-engine/graph.ts` | `buildItemGraph` — pure ownership/prerequisite/carry-in grafiği | [[Registry Architecture]], [[Spine and Carryover Logic]] |
| `content/learning-engine/local-privacy-inventory.ts` | Delete+export single-source-of-truth envanteri (**AppProvider'a bağlı tek engine modülü**) | [[Privacy and Data Deletion]] |
| `content/learning-engine/privacy*.ts`, `privacy-data.ts`, `privacy-local.ts` | Versiyonlu `PrivacyState`, export/reset | [[Privacy and Data Deletion]] |
| `content/learning-engine/repository/local.ts` | `LocalRepository` — append-only `lm_le_events` log; `lm7`'e asla dokunmaz | [[Storage Architecture]], [[Data Flow]] |
| `content/learning-engine/session-controller.ts` | Runtime C oturum döngüsü | [[Learning Engine Architecture]] |
| `content/learning-engine/practice-reuse.ts` / `presets.ts` / `validate.ts` / `items.ts` / `registry.ts` / `types.ts` / `lesson-progress.ts` | Engine yardımcı modülleri (reuse guard, presets, fixture validator, item map, `selectLessonProgress`) | [[Learning Engine Architecture]], [[Data Flow]] |

## Renderer bileşenleri

| Dosya/dizin | Amaç | Belgeleyen not |
|---|---|---|
| `components/lesson-v1/LessonRendererV1.tsx` | Runtime B ana renderer; `screens[]`'i lineer yürütür; tamamlanınca `mk(n,"read_listen")` | [[Lesson Player]], [[Runtime Content Architecture]] |
| `components/lesson-v1/screens/{MeetCard,InsightCard,FillWithTraps,Weave,SayItYourWayV1,NaturalReveal,RecapCard}.tsx` | 7 donmuş v1 ekran tipi | [[Meet]], [[Insight and Notice]], [[Fill]], [[Weave]], [[Say It Your Way]], [[Natural Reveal]], [[Review]] |
| `components/lesson-v1/{normalizeAnswer,weaveCopy}.ts`, `screens/AnswerReveal.tsx` | Weave eşleme (accent-fold, `?` significant), copy temizleme, reveal kartı | [[Weave]], [[Feedback and Scoring Philosophy]] |
| `components/learning-engine/*` (21 dosya) | Runtime C UI: `LearnerRendererShell`, Fill/Build/ContextChain/RegisterSwitch/Recognition/Boundary kartları, Mon Lexique & Practice Pool shell'leri, `PrivacyDataControls` | [[Learning Engine Architecture]], [[Mon Lexique UI]], [[Practice]] |
| `components/sections/*` (11 dosya) | Runtime A legacy 11-bölüm (ReadListen…Review); dev-apk'te gizli | [[Read and Listen]], [[Build]], [[Combine and Weave]], [[Mini Conversation]] |
| `components/{DailyReviewOverlay,MountainMap,LessonPractice,MilestoneCard,GrammarRenderer,MCQ,UnlockCard,...}.tsx` | Legacy/paylaşılan UI (Daily Review overlay, journey haritası, legacy practice sürücüsü) | [[Daily Review]], [[Home and Journey]], [[Progress]] |

## Hook'lar, lib, provider, config

| Dosya | Amaç | Belgeleyen not |
|---|---|---|
| `providers/AppProvider.tsx` | Ana state; `mk`, cloud merge (union/latest), privacy reset epoch; local-privacy-inventory'yi çağırır | [[Data Flow]], [[Sync Architecture]], [[Privacy and Data Deletion]] |
| `providers/AuthProvider.tsx` | Supabase auth sarmalayıcı; anonymous session auto-create | [[Authentication]] |
| `hooks/useStorage.ts` | `lm7` blob (`{p,err,dr}`) + atomic BlobStore slice yazımı + corrupt quarantine | [[Storage Architecture]] |
| `hooks/useSRS.ts` | `lm7_srs` Leitner 5-box (legacy yüzey) | [[Storage Architecture]], [[Review and Recycling System]] |
| `hooks/{useProgressSync,useLessonProgress,useErrors,useAuth,useChat,useSpeech}.ts` | Cloud sync, ders ilerleme, hata log, auth, chat, TTS | [[Sync Architecture]], [[Authentication]], [[AI Architecture]] |
| `lib/storage.ts` | native `expo-sqlite/kv-store` ↔ web `localStorage` seam | [[Storage Architecture]] |
| `lib/{blobStore,safeStorage,privacyResetEpoch,secureAuthStorage}.ts` | Atomic blob, corrupt-quarantine, reset epoch barrier, keychain token chunking | [[Storage Architecture]], [[Privacy and Data Deletion]] |
| `lib/ai.ts` | Edge fonksiyon çağrıları; `aiEnabled && supabaseReady` yoksa deterministik fallback; 15s timeout | [[AI Architecture]], [[Failure and Recovery Model]] |
| `lib/supabase.ts` | `supabaseReady` guard (url+anonKey); client=null ise Sign-In gizli | [[Supabase]], [[Authentication]] |
| `lib/{normalize,looksFrench,lessonZeroAnswers,reviewScore,text}.ts` | Metin normalize, French tespiti, L0 cevapları, review skor denom | [[Feedback and Scoring Philosophy]], [[L0 The First Step]] |
| `config/productStage.ts` | `ProductStage` (sandbox\|dev-apk\|public-beta); fail-closed `dev-apk`; `FEATURES_BY_STAGE`; `DEV_APK_LESSON_LIMIT=5` (legacy) | [[Product Stages and Feature Flags]], [[Feature Stage Matrix]] |
| `constants/{theme,sections,journey}.ts` | `P` palet + `MOTIV` (non-gamified); `SECS/CHUNKS/MASTERY_THRESHOLDS` (legacy); journey verisi | [[Visual Language]], [[Copy and Tone]], [[Lesson Flow]] |

## Route'lar (`app/`)

| Dosya | Amaç | Belgeleyen not |
|---|---|---|
| `app/_layout.tsx` | Entry; `AuthProvider→AppProvider`; font yükleme; Stack | [[Route Architecture]] |
| `app/(tabs)/index.tsx` | Home "Journey"; v1 path L1-L6 filtresi (`number<=6`); daily review kartı | [[Home and Journey]], [[Route Matrix]] |
| `app/(tabs)/{chat,practice,stats}.tsx` | AI Chat / Practice / Progress tab'ları (flag ile gizli) | [[Navigation Model]], [[Feature Stage Matrix]] |
| `app/v1-lesson/[id].tsx` | Runtime B route → `LessonRendererV1` | [[Route Architecture]], [[Lesson Player]] |
| `app/lesson/[id].tsx` | Runtime A legacy route (dev-apk'te boş `visibleLessons`) | [[Route Architecture]] |
| `app/learn/[fixtureId].tsx` | Runtime C founder route (`sandbox && v1LessonEngine`) | [[Route Architecture]], [[Learning Engine Architecture]] |
| `app/dev/{learning-engine-player,learning-engine-preview}.tsx` | Engine debug yüzeyleri (sandbox/__DEV__) | [[Route Architecture]] |
| `app/{lesson-zero,how-weave-works,auth}.tsx` | L0 onboarding bridge, Weave açıklayıcı, Sign in | [[L0 The First Step]], [[Weave System]], [[Authentication]] |

## Supabase (`supabase/`)

| Dosya | Amaç | Belgeleyen not |
|---|---|---|
| `supabase/schema.sql` | RLS-enabled tablolar: `profiles`, `user_progress`, `user_errors`, `ai_usage` + `bump_ai_usage` RPC | [[Supabase]], [[Privacy and Data Deletion]] |
| `supabase/functions/{ai-chat,ai-evaluate,ai-error}/index.ts` | Edge Functions (Deno); server-owned system prompt; maxTokens clamp | [[AI Architecture]] |
| `supabase/functions/_shared/{contract,providers,ratelimit}.ts` | Server contract, provider chain (Gemini→Gemini→Groq→Mistral, no Claude), fail-closed rate limit | [[AI Architecture]], [[Contradictions]] (routing) |

## Scripts (build tooling) → [[Test Source Index]]
`scripts/{validateContent,validatePools,canonRules,shippedItemIds,shippedErrorTags,manifestAdd,manifestAddTag,telemetryReport}.ts` + `scripts/tests/*` + manifest JSON'ları [[Test Source Index]]'te detaylı.

## İlgili notlar
- [[Runtime Content Architecture]] · [[Registry Architecture]] · [[Learning Engine Architecture]]
- [[Source Ledger]] · [[Repository Document Index]] · [[Test Source Index]]
- [[Module Ownership Map]] · [[Route Map]]
