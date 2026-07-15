---
title: "ADR-0005 Whole-first, unpack-later (meet-card model)"
aliases: ["ADR-0005", "Whole first unpack later", "Meet-card model"]
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
related: ["[[Whole First, Unpack Later]]", "[[Meet]]", "[[ADR-0004 no-full-sentence-chips]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, learning, meet-card]
---

# ADR-0005 — Whole-first, unpack-later (meet-card model)

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
Bir canonical cümle öğrenciye ilk kez nasıl tanıtılmalı: parçalar önce mi, bütün mü?

## Decision
**meet-card** canonical cümleyi **bütün** olarak gösterir; öğrenci chip'lere dokunarak onu ayrıştırır (touch = highlight + audio). Continue, **tüm chip'lere ≥1 dokunuş** sonrası aktifleşir — bu bir **davet, kilit değil** (invite, not lock).

## Why
Anlamı önce bir bütün olarak yerleştirmek, sonra mekaniği "unpack" etmek; öğrenmeyi bağlam-önce yapar (input before output).

## Alternatives Considered
- Parça-parça inşa edip sonra birleştirme — reddedildi (bütün-anlam kaybı).
- Zorunlu kilit (tüm dokunuşlar tamamlanmadan ilerlenemez) — reddedildi (davet modeli tercih edildi).

## Rejected Alternatives
Parçalardan başlayıp bütüne çıkma; Continue'yu sert bir gate yapma.

## Consequences
meet-card bugün statik bir Continue ekranı; per-screen interaction (dokunuşla decompose) **Faz B PLANNED**. [[ADR-0004 no-full-sentence-chips]] ile tutarlı: bütün cümle model-answer, chip değil.

## Implementation References
LESSON_FLOW_CANON §1.2; 7 frozen v1 ekran tipinde `MeetCard` (`content/lessonTypes.ts`).

## Verification
Source-inspected. Per-screen interaction PLANNED (Faz B), henüz VERIFIED değil.

## Supersedes / Superseded By
Supersedes: — · Superseded by: —

## Source Evidence
`06_decisions_history.md` D-05.

## Related
[[Whole First, Unpack Later]] · [[Meet]] · [[Lesson Anatomy]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
