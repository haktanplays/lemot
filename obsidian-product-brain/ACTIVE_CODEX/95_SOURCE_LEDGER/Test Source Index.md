---
title: Test Source Index
aliases: [Test Index, Validators Index, Test Kaynak Dizini]
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
source_of_truth: ["lemot-app/scripts/"]
test_refs: ["lemot-app/scripts/tests/run.ts", "lemot-app/scripts/validateContent.ts", "lemot-app/scripts/validatePools.ts", "lemot-app/scripts/canonRules.ts"]
related: ["[[Source Ledger]]", "[[Code Source Index]]", "[[Test Coverage Matrix]]", "[[Validation Gates]]", "[[Needs Verification]]"]
tags: [source, meta, test, index]
---

# Test Source Index

> [!implemented] Cairn'in doğrulama iskeleti: **pure Node/tsx** ile çalışan 42-dosyalık
> engine runner + 3 validator + manifest'ler + copy guard'lar. **Cihaz/Expo katmanı
> yüklenmez** — storage'a dokunan her modül in-memory KV adaptörü kullanır. Bu, "no
> gamification" ve "itemId/error-tag immutability" gibi kanonun **mekanik olarak** nasıl
> uygulandığıdır. HEAD = `02f9f7a`. Kod tarafı için [[Code Source Index]].

## 4-komutluk CI zinciri (KNOWN_GAPS "sağlıklı, dokunma")

```
npm run typecheck          # tsc --noEmit
npm run validate:content   # engine fixture + YASA 2/3 + canon V3/V4/V5
npm run validate:pools     # legacy data/lessons + data/pools
npm run test:learning-engine  # 42-dosya pure runner
```

## `test:learning-engine` — 42-dosya runner

| Dosya | Amaç |
|---|---|
| `scripts/tests/run.ts` | 42 `*.test.ts`'i import edip `harness.ts` (`describe`) ile çalıştıran özel runner; RN/Expo yüklenmez | 
| `scripts/tests/harness.ts` / `helpers.ts` | Minimal test harness + in-memory KV/yardımcılar |

**Suite grupları** (Pack 05 §9'dan; her satır bir veya birkaç `.test.ts`):

| Grup | Dosyalar | Neyi korur |
|---|---|---|
| Privacy | `privacy`, `privacyLocal`, `privacyData`, `localPrivacyCompleteness`, `privacyResetBarrier` | Versiyonlu PrivacyState, export/reset envanter bütünlüğü, reset epoch barrier |
| Storage | `safeStorage`, `blobStore`, `secureAuthStorage`, `lessonProgress` | Corrupt-quarantine, atomic slice yazımı, keychain chunking |
| Engine | `mastery`, `gradeAnswerCheck`, `selectors`, `carryoverSelector`, `lexiqueMemory`, `boundaryAndDue`, `compaction`, `migrations`, `deriveDrill`, `deriveFillBoundary`, `errorEngine`, `contextChainAdvance`, `contextChainMasteryWeight`, `nearMissMasteryTiming`, `buildSequence`, `practiceSelector` | Mastery counter'ları, deterministik grade, seçiciler, carryover, near-miss timing |
| Contracts | `aiContract`, `reviewScore`, `localRepository`, `telemetry` | Server AI kontratı, review skor denom, append-only log, telemetry v0 |
| Guards | `devApkScope`, `devApkCopyGuard`, `componentCopyGuard`, `productStageResolution`, `noSupabaseAuthGuard`, `ttsPlaceholder`, `weaveMatch`, `weaveCopy`, `v1LessonStructure` | Scope kilidi, yasak dil (streak/XP), fail-closed stage, TTS placeholder, Weave eşleme/copy, v1 yapı |
| Manifests | `shippedItemIds`, `shippedErrorTags`, `canonRules` | YASA 2/3 immutability + canon V3/V4/V5 |
| Content | `lessonZeroAnswers` | L0 cevap doğruluğu |

## Validators

| Script | Ne doğrular | Hard error? |
|---|---|---|
| `scripts/validateContent.ts` | Agregat `LEARNING_ENGINE_FIXTURE`; (a) YASA 2 shipped itemId immutability + **K3 bidirectional**; (b) YASA 3 shipped error-tags; (c) canon V3/V4 (hard) + V5 (warning) `canonRules.ts` üzerinden `V1_LESSONS`'a | Evet, herhangi hard error'da exit 1 |
| `scripts/validatePools.ts` | **Legacy** `data/lessons` + `data/pools`: Weave-fill `fr` varlığı (L1-L5), placeholder/English sızıntısı, çift-negasyon, FlashCard lessonId bütünlüğü | Error blocklar; bazı legacy içerik sadece warning (6 bilinen legacy warning OK) |
| `scripts/canonRules.ts` | Lesson Flow Canon §11 mekanize alt-kümesi: **V3** future_as_answer (hard), **V4** future_in_forbidden_zone (hard), **V5** insight_budget>3 (warn, `INSIGHT_BUDGET_MAX=3`) | V3/V4 hard, V5 warn |

> [!warning] **V1/V2/V6-V9 mekanize DEĞİL** — runtime chain-step, readiness gate ve
> exposure selector henüz kodda olmadığından spec-only. Bkz. [[Exercise Anti-Patterns]].

## Immutability manifest'leri (YASA 2 & 3)

| Dosya | İçerik | İkiz checker |
|---|---|---|
| `scripts/shipped-item-ids.json` | Shipped itemId manifest'i — **56 kayıtlı id** | `scripts/shippedItemIds.ts` (pure); `manifest:add` ile büyür, otomatik sync YOK |
| `scripts/shipped-error-tags.json` | Shipped error-tag manifest'i — **30 tag** (kaynak sayımı 30; ROADMAP/STATUS "54 tags frozen" der) | `scripts/shippedErrorTags.ts`; iki-yönlü hard error; `manifest:add-tag` |

> [!warning] **Sayısal drift'ler (gerçek, doğrulanmamış):**
> - `shipped-item-ids.json` = **56 id** vs canlı `ITEM_REGISTRY` = **54 key**. K3
>   bidirectional check tam da bunu yakalamak için var; ama `validate:content`'in şu an
>   geçip geçmediği bu read-only geçişte **çalıştırılmadı** → [[Needs Verification]].
> - Chip audit `84a5b8e`'de **52 item** saymıştı. 52 vs 54 vs 56: her kaynağın kendi
>   sayısını cite et, birine zorlama → [[Contradictions]] C6.

## Diğer tooling

| Script | Amaç |
|---|---|
| `scripts/manifestAdd.ts` / `manifestAddTag.ts` | Yeni itemId / error-tag'i manifest'e kaydeder (deliberate-only) |
| `scripts/telemetryReport.ts` | `npm run telemetry:report -- <file.json>` — device telemetry log özeti |
| `scripts/tests/canonRules.test.ts` | V3/V4/V5 mekanizasyon testleri (STATUS: 16 ders 0 error/0 warning geçti) |
| `scripts/tests/lessonZeroAnswers.test.ts` | L0 kabul edilen cevaplar |

## Kritik test-boşluğu (audit'lerden)
- v1 renderer **hiç LearningEvent emit etmez** → ErrorTagCode/mastery/telemetry sadece
  engine (sandbox) katmanında; v1 yüzeyinde evidence testi yok (Pack 03 §6).
- C3: edge validation/rate-limit **hiçbir testle korunmuyor** (loop audit v2).
- C11: `useSRS` Leitner çekirdeği untested; C15: 3 ayrışan normalizer.
Detay: [[Technical Debt]], [[Test Coverage Matrix]].

## İlgili notlar
- [[Validation Gates]] · [[Test Coverage Matrix]] · [[Test Strategy]]
- [[Code Source Index]] · [[Source Ledger]]
- [[Needs Verification]] · [[Contradictions]]
