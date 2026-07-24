---
title: Implementation Ledger
aliases: [Feature Ledger, Master Implementation Ledger, Kod Ledger]
type: implementation-ledger
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/", "docs/STATUS.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/PR_and_Smoke_Log.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Agent_Handoff.md"]
code_refs:
  - "lemot-app/components/lesson-v1/LessonRendererV1.tsx"
  - "lemot-app/config/productStage.ts"
  - "lemot-app/content/learning-engine/"
test_refs: ["lemot-app/scripts/tests/run.ts"]
related:
  - "[[00 Le Mot Holy Codex]]"
  - "[[Implementation Overview]]"
  - "[[Module Ownership Map]]"
  - "[[Spec Runtime Divergences]]"
  - "[[Test Strategy]]"
tags: [implementation, ledger]
---

# Implementation Ledger

Up: [[Implementation Overview]] · Wiring: [[Module Ownership Map]] · Test: [[Test Strategy]]

> [!implemented] Bu not **"ne KODLANDI"** sorusunu kanıtla cevaplar: her ana özellik için
> kod referansı, test referansı, `impl_status`, `verify_status` ve getiren PR. Statü sözlüğü
> [[06 Canon and Status Legend]]. "Kodlandı ≠ bağlı ≠ cihazda doğrulandı."

## Ana özellik ledger'ı

| Parça | Kod referansı | Test referansı | impl_status | verify_status | PR / commit |
|---|---|---|---|---|---|
| Surface B renderer (v1) | `components/lesson-v1/LessonRendererV1.tsx:8-38` | `v1LessonStructure.test.ts` | implemented (shipped) | device-verified (L0–L6, emülatör) | #136 `8cefe81` |
| v1 ders içeriği L0–L6 | `content/lessons/v1/lesson-000..006.ts` | `v1LessonStructure`, `lessonZeroAnswers.test.ts` | implemented | device-verified | #119–#142 |
| v1 ders içeriği L7–L15 | `content/lessons/v1/lesson-007..015.ts` | `v1LessonStructure` | implemented ama Home-gated (compact) | unit-tested | `4debc25`/`4d74219`/`84a5b8e` |
| Weave copy/branding + target salience | `components/lesson-v1/screens/Weave.tsx`, `weaveCopy.ts` | `weaveCopy.test.ts` | implemented (Round 1.2) | **code-validated, NOT device-verified** | #155 `5f27eee` |
| Say It Your Way onay adımı | `components/lesson-v1/screens/SayItYourWayV1.tsx` | — | implemented (Round 1.1) | device-verified @`8cfdce75` | #152 `5f967ec` |
| L3 recap `piecesUsed` (passive `oui` kaldırıldı) | `content/lessons/v1/lesson-003.ts` | `v1LessonStructure` | implemented (Round 1.2) | code-validated, NOT device-verified | #156 `2df3469` |
| Home path + linear unlock | `app/(tabs)/index.tsx:149-176,364` | `devApkScope.test.ts` | implemented | device-verified | Round 1 |
| Product-stage + FEATURES | `config/productStage.ts:14-146` | `productStageResolution.test.ts`, `devApkScope.test.ts` | implemented (fail-closed) | unit-tested | #104 |
| Item Registry (54) | `content/itemRegistry.ts:3,702-714` | `shippedItemIds.test.ts` | implemented | unit-tested | learning-engine v0.1 |
| YASA 2 itemId manifest | `scripts/shippedItemIds.ts`, `shipped-item-ids.json` | `shippedItemIds.test.ts` | implemented (build-enforced) | unit-tested | #177 `fd3d29b` |
| YASA 3 error-tag manifest | `scripts/shippedErrorTags.ts`, `shipped-error-tags.json` | `shippedErrorTags.test.ts` | implemented | unit-tested | #186 |
| YASA 1 migration rails | `content/learning-engine/migrations.ts` | `migrations.test.ts` | implemented (rails-only, 0 gerçek migration) | unit-tested | #178 `0513d19` |
| Deterministik grader | `content/learning-engine/grade.ts:1-30` | `grade.test.ts` | implemented-tested-only (surface C) | unit-tested | P0–P2 |
| Mastery reducer/snapshot | `content/learning-engine/mastery.ts` | `mastery*.test.ts`, `nearMissMasteryTiming.test.ts` | tested-only (non-test importer yok) | unit-tested | P3 `8a37fca` |
| Mastery precision policy | `content/learning-engine/mastery.ts` | `nearMissMasteryTiming.test.ts` | tested-only | unit-tested | `203f817` |
| Mon Lexique / Practice Pool | `content/learning-engine/{mon-lexique,practice-pool}.ts` | `selectors*.test.ts` | implemented-tested-only (sandbox `/learn`) | unit-tested | #60–#65 `aa0aa37` |
| deriveDrill + practice selector | `content/learning-engine/derive-drill.ts` | `deriveDrill.test.ts`, `deriveFillBoundary.test.ts` | tested-only | unit-tested | #179 `691cde3` |
| Lexique Memory (derived) | `content/learning-engine/lexique-memory.ts` | `lexiqueMemory.test.ts` | tested-only | unit-tested | `1743f07` |
| Carryover selector v0 | `content/learning-engine/carryover-selector.ts` | `carryover.test.ts` | tested-only | unit-tested | `03c29ea` |
| LocalRepository (event log) | `content/learning-engine/repository/local.ts:14-52` | `localRepository.test.ts` | implemented-tested-only | unit-tested | P0–P2 |
| Telemetry v0 | `content/learning-engine/telemetry.ts` | `telemetry.test.ts` | implemented-tested-only + tooling | unit-tested | `ae793a3` |
| Event compaction v0 | (compaction module) | `compaction.test.ts` | tested-only (unwired) | unit-tested | `015f343` |
| Local privacy inventory/reset | `local-privacy-inventory.ts:1-70`, `AppProvider.tsx:227-231` | `localPrivacyCompleteness`, `privacyResetBarrier.test.ts` | **implemented-and-wired** | integration-tested | #196 `02f9f7a` (PR-H) |
| Corrupt-storage quarantine | `lib/safeStorage.ts`, `useStorage.ts:56-113` | `safeStorage.test.ts` | implemented | unit-tested | #188 (PR-A) |
| Atomic blob store | `lib/blobStore.ts`, `useStorage.ts:24-33,116-160` | `blobStore.test.ts` | implemented | unit-tested | #190 (B6) |
| Cloud sync (Supabase) | `hooks/useProgressSync.ts`, `AppProvider.tsx:120-197` | (C4: merge helpers untested) | implemented code-side (deploy operator-only) | source-inspected | #10 era |
| Auth (email + anon) | `hooks/useAuth.ts:18-34`, `AuthProvider.tsx` | `noSupabaseAuthGuard.test.ts` | implemented code-side | source-inspected | #115 |
| Secure auth token storage | `lib/secureAuthStorage.ts`, `supabase.ts:16-42` | `secureAuthStorage.test.ts` | implemented | unit-tested | #192 (B19) |
| AI edge functions | `supabase/functions/{ai-chat,ai-evaluate,ai-error}` | `aiContract.test.ts` | implemented code-side, **dormant** (deploy operator-only) | source-inspected | #113/#114/#191 |
| Server-side AI rate limit | `_shared/ratelimit.ts:14-38` | `aiContract.test.ts` | implemented (fail-closed) | source-inspected | #191 (B4) |

## Wiring özeti

Shipped kullanıcı yolu = **surface B** (LessonRendererV1 + v1 içerik + Home + productStage +
`lm7` storage). Learning-engine tarafının neredeyse tamamı **surface C sandbox** veya
**tested-only** — tek istisna `local-privacy-inventory` (AppProvider'a bağlı). Detay:
[[Module Ownership Map]].

## Verification Evidence

- **Device-verified:** L0–L6 runtime (emülatör smoke #136/`8cefe81`, P0–P3 sıfır),
  FROZEN. Ayrıca **Round 1.1 (`8cfdce75`/#154) fiziksel spot-check** (Haktan,
  2026-06-29, TTS OK, blocker yok; Tester 1 L0–L6 olumlu) — ama bu `8cfdce75`'e
  aittir, **güncel HEAD `02f9f7a` (#196)'yı device-verified yapmaz.** Round 1.2
  (#155/#156) ve güncel main'in fiziksel cihaz smoke'u **operator-only, bekliyor**
  (kaynak: `PR_and_Smoke_Log.md`) → [[Device Verification Matrix]], [[Smoke Test Playbook]].
- **Unit-tested:** 42-dosya `test:learning-engine` runner (saf Node, injected KV) →
  [[Test Strategy]]. Son sayım + staleness caveat orada.
- **Source-inspected only:** Supabase/AI/sync (canlı deploy edilmedi; read-only geçiş).

## Known Gaps / Debt

Tam liste [[Known Gaps]] + [[Technical Debt]]. Kritik: karar motoru (mastery/selectors)
sevkedilen yüzeye bağlı değil; iki-store ayrımı; `validate:content`'in 54/56 drift altında
yeşil olup olmadığı UNKNOWN.

## Related Notes

[[Module Ownership Map]] · [[Test Strategy]] · [[Spec Runtime Divergences]] · [[Known Gaps]] · [[PR Map]]
