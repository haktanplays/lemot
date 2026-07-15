---
title: "ADR-0007 v1 is a temporary Dev APK smoke skin; learning-engine is the foundation"
aliases: ["ADR-0007", "v1 freeze", "learning-engine is the foundation"]
type: decision
domain: architecture
status: active
canon_status: canonical
implementation_status: implemented
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
decision_date: 2026-06-09
source_of_truth: ["docs/workstreams/dev-apk-v1-freeze-checkpoint.md", "docs/STATUS.md", "CLAUDE.md"]
code_refs: ["content/lessons/v1/", "content/learning-engine/"]
related: ["[[ADR-0008 dev-apk-route-contract]]", "[[ADR-0020 progress-bridge-events-canonical]]", "[[Runtime Content Architecture]]", "[[Decision Index]]"]
supersedes: []
superseded_by: []
tags: [decision, adr, architecture, v1, freeze]
---

# ADR-0007 — v1 is a temporary Dev APK smoke skin; learning-engine is the foundation

> [!decision] Status: **ACTIVE** (LOCKED)

## Context
İki paralel ders sistemi (static authored **v1** ve **learning-engine**) kronik teknik borç riski taşıyor. Hangisi geçici, hangisi kalıcı?

## Decision
**v1** (`/v1-lesson/*`) ilk kullanıcı testleri için **geçici bir Dev APK smoke yüzeyi** ve bir **maintenance contract'a donmuş** — yalnızca blocker bug, smoke-path kırılması, banned-copy sızıntısı, first-run/completion kırılması v1'e dokunmayı haklı çıkarır. **`learning-engine` uzun vadeli ürün temelidir.** "İyi fikir, v1 işi demek değildir."

## Why
Geçici smoke yüzeyini genişletmek, kalıcı temeli inşa etme enerjisini çalar ve iki-sistem borcunu büyütür.

## Alternatives Considered
- v1'i asıl ürün olarak büyütmek — reddedildi.
- v1'i hemen learning-engine'e cutover etmek — ertelendi (flagged, reversible; bkz. [[ADR-0008 dev-apk-route-contract]]).

## Rejected Alternatives
v1'de yeni ders mimarisi/mekanik/redesign, Daily Review, Progress veya Mon Lexique.

## Consequences
"Hard no": v1'e feature eklenmez. `content/lessons/v1/` = 16 dosya (L0–L15), L0–L6 learner-visible, L7–L15 registered-but-Home-gated (`index.tsx` number<=6). learning-engine gerçek kod ama sandbox/founder-gated.

## Implementation References
`dev-apk-v1-freeze-checkpoint` §1/§5–§6; `repo-audit-disposition` §8; STATUS "Hard no"; CLAUDE.md banner ("v1 is a temporary Dev APK smoke surface... Do not expand v1").

## Verification
Source-inspected (freeze checkpoint + STATUS). Round 1 v1 yüzeyi device-verified ve FROZEN.

## Supersedes / Superseded By
Supersedes: legacy 24-lesson v7 runtime'ın aktiflik iddiası (HISTORICAL). Superseded by: —

## Source Evidence
`06_decisions_history.md` D-08.

## Related
[[Runtime Content Architecture]] · [[ADR-0008 dev-apk-route-contract]] · [[Dev APK Scope]] · up: [[Decision Index]] · [[00 Le Mot Holy Codex]]
