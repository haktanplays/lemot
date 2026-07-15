---
title: "ADR-0003 Weave is the primary production mechanic"
aliases: ["ADR-0003", "Weave decision", "Franglais renamed to Weave"]
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
decision_date: 2026-06-05
source_of_truth: ["CLAUDE.md", "docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: []
related: ["[[Weave System]]", "[[ADR-0004 no-full-sentence-chips]]", "[[Natural Reveal]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, learning, weave, production]
---

# ADR-0003 — Weave is the primary production mechanic

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
Ürünün ayırt edici mekaniği: İngilizce + Fransızca karışık cümle yazmak ("weaving"). Bilinen kelimeler Fransızca, bilinmeyenler İngilizce kalır (`je voudrais but pas today`).

## Decision
**Weave** (eski adı **"Franglais"**) çekirdek üretim (production) mekaniğidir. Sahiplenilen Fransızca "engine"lerden iskelet kurulur; **açık (open) weave'ler notlanmaz (ungraded)** → cevap → **Natural Reveal**. Marka "Weave" olarak restore edildi (#155).

## Why
Başka hiçbir uygulama bunu yapmıyor; trademark-distinctive; ezber değil **meaning-first**. Öğrenciyi "bildiğin kadarıyla üret" moduna sokar.

## Alternatives Considered
- "Franglais" adı — trademark-distinctiveness için "Weave" seçildi.
- Tam-Fransızca zorunlu üretim — reddedildi (erken aşamada blok yaratır).

## Rejected Alternatives
Açık weave'leri notlamak (öğrenciyi cezalandırır, üretim iştahını kırar); "Franglais" ismini korumak.

## Consequences
Weave ve Natural Reveal birlikte üretim omurgasını oluşturur; free-tier vaadi ~L10'dan itibaren chip-less kolay açık Say It ([[ADR-0024 cairn-v1-precedence-chain]] kapsamındaki Q&A canon).

## Implementation References
`CLAUDE.md` "Key Differentiator: Weave"; round1-founder-learning-slice §2; CLOUD_SYNC_QUEUE 2026-07-04 "true mixed-language Weave"; branding restore #155.

## Verification
Source-inspected. Weave cloze fix #138 Round 1 smoke'ta doğrulandı.

## Supersedes / Superseded By
Supersedes: "Franglais" adlandırması (HISTORICAL). Superseded by: —

## Source Evidence
`06_decisions_history.md` D-03.

## Related
[[Weave System]] · [[ADR-0004 no-full-sentence-chips]] · [[Natural Reveal]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
