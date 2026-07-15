---
title: Module Ownership Map
aliases: [Learning Engine Wiring Map, Module Wiring, Modül Sahipliği]
type: architecture
domain: architecture
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/content/learning-engine/", "lemot-app/providers/AppProvider.tsx"]
code_refs:
  - "lemot-app/content/learning-engine/index.ts:1-13"
  - "lemot-app/content/learning-engine/grade.ts:1-30"
  - "lemot-app/content/learning-engine/repository/local.ts:14-38"
  - "lemot-app/content/learning-engine/local-privacy-inventory.ts:1-70"
  - "lemot-app/providers/AppProvider.tsx:227-231"
test_refs: ["lemot-app/scripts/tests/run.ts"]
related:
  - "[[00 Le Mot Holy Codex]]"
  - "[[Implementation Overview]]"
  - "[[Learning Engine Architecture]]"
  - "[[Self-Producing Engine]]"
  - "[[Spec Runtime Divergences]]"
tags: [implementation, learning-engine, wiring, modules]
---

# Module Ownership Map

Up: [[Implementation Overview]] · Mimari: [[Learning Engine Architecture]] · Motor: [[Self-Producing Engine]]

> [!warning] Bu not, `08_IMPLEMENTATION`'ın en yanıltıcı-riskli sorusunu cevaplar:
> **learning-engine modülleri gerçekten runtime'a bağlı mı, yoksa sadece test mi geçiyor?**
> Cevap: **neredeyse tümü ya founder-sandbox-only UI (surface C) ya da tested-only.**
> Tek istisna `local-privacy-inventory` — sevkedilen bir provider'a bağlanan tek engine modülü.

`content/learning-engine/index.ts` kendini "Executable content contract (v0.1)" olarak
tanımlar; import'u "does NOT touch the live lesson renderer … the existing lesson
user-facing flow is unaffected" (`index.ts:1-13`).

## Modül wiring tablosu

| Modül | Non-test import yeri | Wiring statüsü |
|---|---|---|
| `grade.ts` (deterministik grader) | `components/learning-engine/{FillCard,ContextChainCard,RegisterSwitchCard}.tsx`, `buildSequence.ts` | IMPLEMENTED-tested-only (yalnız surface C bileşenleri; dev-apk'te yok) |
| `answer-check.ts` (normalize/checkAnswer) | `ContextChainCard.tsx` + engine index export | IMPLEMENTED-tested-only |
| `session-controller.ts` | `components/learning-engine/{FillCard,ContextChainCard,BuildCard,RegisterSwitchCard,useLearningEngineSession.ts}` | IMPLEMENTED-tested-only (surface C loop) |
| `mon-lexique.ts` | `LearnerRendererShell`, `MonLexiqueEntryCard`, `MonLexiqueShell` | IMPLEMENTED-tested-only (yalnız sandbox `/learn`) |
| `practice-pool.ts` | `PracticePoolShell`, `PracticePoolItemRow`, `LearnerRendererShell` | IMPLEMENTED-tested-only |
| `boundary.ts` | `LearnerRendererShell` | IMPLEMENTED-tested-only |
| `mastery.ts` (mastery reducer/snapshot) | **yalnız testler** | tested-only (non-test importer yok) |
| `practice-selector.ts` | **yalnız testler** | tested-only |
| `carryover-selector.ts` | **yalnız testler** | tested-only |
| `lexique-memory.ts` | **yalnız testler** | tested-only |
| `derive-drill.ts` | **yalnız testler** | tested-only |
| `migrations.ts` | **yalnız testler** | tested-only |
| `error-engine.ts` | `scripts/shippedErrorTags.ts` + testler | tested-only / build tooling |
| `telemetry.ts` | `PrivacyDataControls.tsx` (surface C) + `scripts/telemetryReport.ts` + testler | IMPLEMENTED-tested-only + build tooling |
| `repository/local.ts` (`LocalRepository`) | `session-controller` + privacy inventory + testler | IMPLEMENTED-tested-only (append-only event log) |
| **`local-privacy-inventory.ts`** | **`providers/AppProvider.tsx`** + `PrivacyDataControls` + testler | **✅ IMPLEMENTED-and-wired (sevkedilen provider'a ulaşan TEK modül)** |

## Üç kova — görsel

```mermaid
flowchart TD
  subgraph T[tested-only: non-test importer YOK]
    M[mastery.ts]:::t
    PS[practice-selector.ts]:::t
    CS[carryover-selector.ts]:::t
    LM[lexique-memory.ts]:::t
    DD[derive-drill.ts]:::t
    MG[migrations.ts]:::t
  end
  subgraph C[surface C only: sandbox founder UI]
    G[grade.ts]:::c
    AC[answer-check.ts]:::c
    SC[session-controller.ts]:::c
    ML[mon-lexique.ts]:::c
    PP[practice-pool.ts]:::c
    BD[boundary.ts]:::c
  end
  subgraph S[shipped provider'a bağlı]
    LPI[local-privacy-inventory.ts]:::s
  end
  LPI --> AP["AppProvider.resetLocalData() :227-231"]
  classDef t fill:#eee,stroke:#999
  classDef c fill:#ffe8cc,stroke:#E67E22
  classDef s fill:#d7f5df,stroke:#27AE60
```

## Neden `local-privacy-inventory` özel

`AppProvider.resetLocalData()` (`AppProvider.tsx:227-231`) önce privacy reset epoch'unu
bump'lar, sonra `resetAllLocalPrivacyData()`'yi çağırır
(`local-privacy-inventory.ts`). Bu, engine namespace'i (`lm_le_*`) + `lm7`/`lm7_srs` +
`${key}__corrupt` sibling'larını **tek envanterden** siler/export eder — delete ve export'un
"asla drift edememesi" için tek-kaynak (`local-privacy-inventory.ts:1-70`). Yani engine'in
bu parçası sevkedilen privacy akışında **gerçekten çalışır** (P5/PR-H).

## Engine izolasyon kontratı

- Engine persistence ayrı `lm_le_*` namespace'inde; "never reads or writes the live-v7 keys
  `lm7`/`lm7_srs`" (`repository/local.ts:14-38`). İki-store ayrımı → [[Technical Debt]].
- `grade.ts` = **pure, AI-free, storage-free, clock-free** deterministik grader
  ("deterministic engine first; AI may explain later but never overrides", `grade.ts:1-30`).
  Karpathy purity kontratı ([[Decision Index|D-12]]).

## Known Gaps

- Tüm karar/mastery motoru (mastery/selectors/lexique/derive) **hiçbir sevkedilen yüzeye
  bağlı değil** — "main integration blocker" ([[Technical Debt]], KNOWN_GAPS #2).
- `migrations.ts`/compaction unwired (C12); telemetry reset/export'a bağlı ama quarantine
  eksik (C9) → [[Known Gaps]].

## Related Notes

[[Learning Engine Architecture]] · [[Self-Producing Engine]] · [[Mastery Model]] · [[Storage Architecture]] · [[Spec Runtime Divergences]]
