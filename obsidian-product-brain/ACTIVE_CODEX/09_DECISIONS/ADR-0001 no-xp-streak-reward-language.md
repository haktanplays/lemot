---
title: "ADR-0001 No XP / streak / reward language"
aliases: ["ADR-0001", "Banned copy", "No gamification language"]
type: decision
domain: product
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-04-23
source_of_truth: ["CLAUDE.md", "docs/MASTER_PIPELINE_v1.2.1.md"]
code_refs: []
related: ["[[ADR-0002 calm-passive-mirror-mentor-tone]]", "[[ADR-0003 weave-primary-production-mechanic]]", "[[Copy and Tone]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, product, copy, banned-language]
---

# ADR-0001 — No XP / streak / reward language

> [!decision] Status: **ACTIVE** (LOCKED 2026-04-23, UX.1)

## Context
Ürün, sakin ve premium bir **mentor** tonu hedefliyor; Duolingo tarzı engagement/ödül döngüleri değil. Gamification baskısı, öğrenci güvenini ve premium hissi zedeliyor.

## Decision
Şu dil **statik VE üretilen (AI) tüm kopyada** yasak: `streak`, `XP`, `level up`, `achievement`, `amazing`, `perfect score`, `goal complete` ve "come back tomorrow" (yarın geri gel) baskısı. Yalnızca **milestone display** ve sade bir **Daily Review sayacı** serbest; "streak" yerine **"days on the path"** (patikadaki günler) kullanılır.

## Why
Gamification baskısını ortadan kaldırmak; öğrenci güvenini ve premium/sakin seyahat hissini korumak. Le Mot "generic engagement" için değil, üretim-hazırlığı ve doğal Fransızca için optimize eder.

## Alternatives Considered
- Milestone display + sade sayaç (SEÇİLDİ).
- Hafif "streak lite" — reddedildi (yasak dilin arka kapıdan dönüşü).

## Rejected Alternatives
Duolingo ödül mekanikleri, leaderboard, sosyal özellikler, XP/level ödül dili. Bkz. `MASTER_PIPELINE_v1.2.1.md` §9 Rule 3 ("streak, XP, level up, achievement, amazing, perfect score, goal complete, come back tomorrow pressure").

## Consequences
Copy guard'lar (#101, #110) ve her freeze-checkpoint / founder-self-learning Codex checklist kriteri (kriter 6) bunu denetler. `streak` kolonu `schema.sql`'den düşürüldü (ama deployed DB'de kalabilir — bu, streak'in UI'ya döndüğü anlamına gelmez).

## Implementation References
Copy guards #101, #110; `Sprint12_PRC_passive_mirror_copy_cleanup` ("You got it" rozeti kaldırıldı, "Unlocked!"→"Added.").

## Verification
Source-inspected: audit checklist kriteri her dev-apk freeze-checkpoint'te tekrar kontrol edilir. Cihaz-doğrulama: Round 1 emülatör smoke banned-copy sızıntısı P0.

## Supersedes / Superseded By
Supersedes: v7 gamification dili (HISTORICAL). Superseded by: —

## Source Evidence
`06_decisions_history.md` D-01; `CLAUDE.md` (UX.1 locked 2026-04-23); `MASTER_PIPELINE_v1.2.1.md` §9 Rule 3.

## Related
[[ADR-0002 calm-passive-mirror-mentor-tone]] · [[Copy and Tone]] · [[Non-Goals]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
