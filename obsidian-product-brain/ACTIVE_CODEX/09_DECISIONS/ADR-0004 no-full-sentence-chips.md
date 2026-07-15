---
title: "ADR-0004 No full-sentence chips; formula chunks & noun packages allowed"
aliases: ["ADR-0004", "No full-sentence chip", "Chip taxonomy decision"]
type: decision
domain: learning
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-07-05
source_of_truth: ["docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: []
related: ["[[Chip Taxonomy]]", "[[ADR-0005 whole-first-unpack-later]]", "[[ADR-0003 weave-primary-production-mechanic]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, learning, chip, anti-memorization]
---

# ADR-0004 — No full-sentence chips; formula chunks & noun packages allowed

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
Chip taksonomisi, derslerin tüm bir cümleyi/soruyu tek "sahiplenilen parça" olarak kaçak sokmasını engellemeli.

## Decision
Bir **CHIP** = sahiplenilen/desteklenen bir üretim parçası. **Tam-cümle chip yok, tam-soru chip yok.** İzin verilenler: **formula/survival-formula** chunk'ları (`je ne comprends pas`) ve **noun packages** (`un café`, `une question` — cinsiyet bir kural değil, paket olarak girer). `PROTECTED_CHUNKS` 2'de donmuş (`je ne suis pas`, `ce n'est pas`); model/anchor cümleleri "model-answer-only, asla chip değil".

## Why
Anti-ezber; üretimi kompozisyonel tutmak; content factory'yi (drill türetme) korumak — cümle chip'i türetmeyi bozar.

## Alternatives Considered
- Cümle/soru-düzeyi chip'ler — reddedildi.
- Yalnızca tek kelime chip'leri — çok katı; formula chunk ve noun package ile dengelendi.

## Rejected Alternatives
Tam-cümle chip, tam-soru chip, cinsiyeti bir "kural" olarak öğretmek (paket yerine).

## Consequences
L1–L15 chip audit **hiçbir tam-cümle-chip ihlali bulmadı**. KNOWN_GAPS #5: `piecesUsed ≠ sentence` kuralını zorlayan v1 pedagoji lint'i henüz IMPLEMENTED değil (açık loop).

## Implementation References
LESSON_FLOW_CANON §1.5, §2 (surface taxonomy); `L1_L15_CHIP_INVENTORY_AUDIT` §2; `PROTECTED_CHUNKS` (2 frozen); Payload Economy v0 `SURVIVAL_FORMULAS` lint set ([[ADR-0024 cairn-v1-precedence-chain]] çevresindeki Payload Economy).

## Verification
Source-inspected: L1–L15 chip audit (0 ihlal). Lint enforcement PLANNED (KNOWN_GAPS #5).

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-04.

## Related
[[Chip Taxonomy]] · [[ADR-0005 whole-first-unpack-later]] · [[ADR-0022 hub-derived-drills]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
