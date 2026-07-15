---
title: Historical Prompt Logs
aliases: [Prompt Logs, Ham Prompt Kayıtları, Discussion Logs]
type: source-record
domain: history
status: active
canon_status: historical
implementation_status: not-started
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/MASTER_PIPELINE_v1.2.1.md", "docs/CLOUD_SYNC_QUEUE.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[History Index]]", "[[Missing Source Inputs]]", "[[Source Ledger]]", "[[Prompt Writing Standards]]"]
supersedes: []
superseded_by: []
tags: [history, prompt-logs, source-record]
---

# Historical Prompt Logs

> [!warning] **Bu not, içeriği İÇERMEZ — nerede olduğunu işaret eder.** Le Mot /
> Cairn'in ham prompt ve tartışma loglarının (ChatGPT orchestration, karar
> müzakereleri, prompt pack taslakları) **çoğu repoda yoktur**; operator'ın yerel
> Obsidian vault'unda / `~/Desktop` altında yaşar. Bu içerikleri **uydurma** →
> [[Missing Source Inputs]].

## Neden çoğu log repoda yok?

MASTER_PIPELINE'ın rol ayrımı gereği:
- **ChatGPT / Product Orchestrator** ürün-seviyesi prompt yazar, kanon çözer,
  sprint scope küçültür, test checklist üretir.
- **Claude Code** repo okur, kod yazar, PR hazırlar.
- **Operator / Jamo** onaylar, rebuild/deploy eder, ve **Obsidian + mempalace**
  karar senkronunu yürütür.

Cloud session'lar Obsidian/mempalace'e **yazmaz**; bunun yerine
`docs/CLOUD_SYNC_QUEUE.md`'ye "Sync Queue" satırı ekler; operator sonra drain
eder. Sonuç: müzakerenin ham metni operator tarafında kalır, repoya yalnızca
**sonuç kararlar** (STATUS, ROADMAP, canon dokümanları) ve **Sync Queue satırları**
düşer.

## Repoda gerçekten bulunan "log-benzeri" izler

> [!historical] Aşağıdakiler ham prompt logu **değil**, ama karar/tartışma izinin
> repoya düşmüş kısımlarıdır (kaynak olarak kullanılabilir):

- `docs/STATUS.md` — güncel execution state; "Operator decisions" K1–K6 kayıtları.
- `docs/ROADMAP.md` + `CAIRN_ROADMAP_202607.md` — "Açık Karar Kaydı" blokları,
  YASA gerekçeleri.
- `docs/CLOUD_SYNC_QUEUE.md` — PENDING satırlar (Payload Economy, Product Q&A,
  PR'lar #1–#10, #39) = operator'a devredilen durable kararların kuyruğu.
- `docs/status/*`, `docs/workstreams/*`, `docs/audits/*` — checkpoint ve
  workstream notları (founder-self-learning P0–P5, boundary-recognition UI
  decision, progress-bridge decision vb.).
- `docs/CAIRN_PRODUCT_ANSWERS_2026_07.md` — founder Q&A (2026-07-04); bir
  müzakerenin **damıtılmış** çıktısı, ham log değil.

## Operator vault'ta olup repoda OLMAYANLAR (uydurma)

> [!open-loop] Aşağıdakiler operator-side canon; içerikleri repoda doğrulanamaz →
> [[Missing Source Inputs]], [[05 Open Loops]].

- v1 Canon TOP (2026-05-16 Tier B locked), Q1–Q6 / D1–D6 locked decisions.
- `LeMot - User Journey.md` (v6 pending), `LeMot.md` sprint status.
- Tasarım Envanteri.md (ekran sınıflandırması).
- `LeMot_Product_Canon_Merged_2026-05-11.md` (operator vault kopyası; repoda
  yalnızca "PARTIALLY HARVESTED" özeti yansıyor — bkz. [[Superseded Specs]]).
- L1–L5 Proofreading.md, Notes Archive Index.md, PROMPT LOG dosyaları.
- Mempalace drawer/knowledge-graph kayıtları (cloud'da bağlı değil).

## Kural

> [!canon] Bir prompt/tartışma logunun içeriğine ihtiyaç varsa ve repoda yoksa:
> **UNKNOWN de, uydurma.** Operator'dan iste ya da Sync Queue'ya import item ekle.
> Prompt yazım standardı (güncel): [[Prompt Writing Standards]].

## Related Notes
- Yukarı: [[00 Le Mot Holy Codex]] · [[History Index]]
- Kaynak zinciri: [[Missing Source Inputs]] · [[Source Ledger]] · [[08 Source of Truth Map]]
- Kardeş: [[Superseded Specs]] · [[Historical Canon Map]]
