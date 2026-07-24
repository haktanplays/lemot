---
title: Documentation Workflow
aliases: [Doc Sync, P.6, Documentation Sync, CLOUD_SYNC_QUEUE, Dokümantasyon Akışı]
type: workflow
domain: ops
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/MASTER_PIPELINE_v1.2.1.md", "docs/CLOUD_SYNC_QUEUE.md", "docs/STATUS.md", "docs/README.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Development Workflow]]", "[[Obsidian to Git Promotion Rules]]", "[[PR Discipline]]", "[[Agent Collaboration]]", "[[Incident and Blocker Handling]]", "[[Implementation Ledger]]"]
supersedes: []
superseded_by: []
tags: [workflow, docs, sync-queue, ops]
---

# Documentation Workflow

<!-- gh-toc -->

## İçindekiler

- [Executive Summary](#executive-summary)
- [Why It Exists](#why-it-exists)
- [Current Canon](#current-canon)
- [Failure Modes](#failure-modes)
- [Examples](#examples)
- [Runtime Implementation](#runtime-implementation)
- [Known Gaps](#known-gaps)
- [Open Questions](#open-questions)
- [Decision History](#decision-history)
- [Related Notes](#related-notes)

> [!canon] Purpose — Kod/karar değiştikten sonra **hangi dokümanın** güncelleneceği (P.6) ve cloud'un neyi doğrudan yazıp neyi **Sync Queue**'ye kuyruklayacağı.

## Executive Summary

MASTER_PIPELINE **P.6 Documentation Sync**: anlamlı bir PR'dan sonra **yalnızca değişeni** güncelle. Repo-yazılabilir docs cloud'da doğrudan yazılır (`CLAUDE.md`, `docs/DEV_APK_MVP_CANON.md`, workstream spec'leri, `docs/STATUS.md`). Operator-vault docs (Obsidian: LeMot.md, User Journey, Tasarım Envanteri) cloud'da yazılamaz → `docs/CLOUD_SYNC_QUEUE.md`'ye satır kuyruklanır, operatör drain eder. `docs/STATUS.md` **tek sprint-durum kaynağıdır** (eski "Sprint 10/11/12" dili bayat).

## Why It Exists

Doküman driftti en büyük hastalık: kod davranışı değişip doküman güncellenmezse ajan yanlış canon'a göre çalışır. Ayrıca cloud, operatör Desktop'ına erişemez; bu yüzden Obsidian/mempalace işini **queue** üzerinden köprüler. Bu not P.6'yı operasyonelleştirir; ters yön (Obsidian → Git) için [[Obsidian to Git Promotion Rules]].

## Current Canon

### Doc update decision (P.6)
| Ne değişti | Nereyi güncelle |
|---|---|
| Kod davranışı | `CLAUDE.md` / repo project note |
| Canon kararı (cloud-side) | `docs/*` + operator-vault için Sync Queue satırı |
| Canon kararı (operator-only) | **Sadece** Sync Queue satırı |
| Screen state | Tasarım Envanteri (Sync Queue) |
| Test path | `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` (veya vault canon ise Sync Queue) |
| Eski not değişti | Notes Archive Index (Sync Queue) |
| Pipeline'ın kendisi | `docs/MASTER_PIPELINE_v1.2.1.md` (+ `CLAUDE.md` `@` ref) |

> [!canon] **Yalnızca değişeni güncelle.** Görev docs içermiyorsa Claude docs güncellemez (P.3 kuralı). `docs/STATUS.md` = tek sprint-durum kaynağı (D1 fix).

### CLOUD_SYNC_QUEUE mekaniği
```mermaid
flowchart LR
  A["Cloud PR / karar"] --> B{"Repo-yazılabilir mi?"}
  B -->|Evet| C["docs/* doğrudan güncelle"]
  B -->|Hayır (Obsidian/mempalace/EAS/Supabase/APK/fiziksel)| D["CLOUD_SYNC_QUEUE satırı<br/>Status: PENDING"]
  D --> E["Operator drain → Status: DONE"]
```
Row template alanları: Date / Cloud branch / Decision-change / Source PR-commit / Obsidian target / Mempalace action / Operator action / Status / Operator notes. Kurallar: kaynak-of-truth değil (worklist); feature backlog değil (workstreams kullan); code review yerine geçmez; aynı karar iki kez kuyruklanırsa ikincisi `See row N` + `SUPERSEDED`; pending satır asla sessizce silinmez.

### P.7 durable-decision kuralı
Kilitlenen karar / deprecate / reclassify / sprint sonu → Sync Queue satırı (cloud). mempalace çağrısı yok. Output: Decision / Status (LOCKED/OPEN/ARCHIVE/SUPERSEDED) / Source / Affected files / Next action / "queued in CLOUD_SYNC_QUEUE.md row N".

## Failure Modes
- **Drift** → kod değişti, doküman değişmedi; ajan yanlış canon okur.
- **Cloud'un vault'a yazmaya çalışması** → MASTER_PIPELINE ihlali; Sync Queue şart.
- **Aynı kararı çift-kuyruklamak** → SUPERSEDED + `See row N` ile önlenir.
- **Pending satırın sessizce silinmesi** → yasak; drain'de DONE'a çevrilir.

## Examples
> [!example]
> 2026-07-04 Product Q&A canon (`CAIRN_PRODUCT_ANSWERS_2026_07.md`) kilitlendi: cloud repo'ya yazdı ama Obsidian (User Journey decision log) + mempalace (learner profile / true Weave / reveal window / Campfire) için `Status: PENDING` satırı kuyrukladı — operatör drain edecek. Aynı desen Payload Economy row'unda.

## Runtime Implementation
### Code References
Süreç kanonu. `docs/CLOUD_SYNC_QUEUE.md` (worklist + template), `docs/STATUS.md` (sprint state), `docs/README.md` (navigation + Git-vs-Obsidian sınırı), `docs/workstreams/` (spec'ler).
### Product-Stage Availability
Tüm stage'lerde bağlayıcı.

## Known Gaps
- CLOUD_SYNC_QUEUE'da açık PENDING satırlar: Payload Economy, Product Q&A canon, PRs #1–#10, #39 (operator Obsidian/mempalace sync bekliyor).

## Open Questions
> [!open-loop] Operator-vault "Test Checklist.md" ile repo checklist tek-kaynak kararı; L1-L5 Proofreading vs repo retrospective. → [[05 Open Loops]]

## Decision History
- STATUS.md tek sprint-durum kaynağı (D1). Cloud Mode Addendum Sync Queue köprüsü. P.6/P.7 doc-sync kuralları.

## Related Notes
[[Development Workflow]] · [[Obsidian to Git Promotion Rules]] · [[Agent Collaboration]] · [[Implementation Ledger]] · [[Incident and Blocker Handling]] · [[00 Le Mot Holy Codex]]
