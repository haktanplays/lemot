---
title: Unresolved Contradiction Report
type: source-record
domain: meta
status: canonical
created: 2026-07-14
tags: [build-report]
---

# Unresolved Contradiction Report — v0.1

En yüksek değerli kaynak çelişkileri. Tam kayıt: [[Contradictions]]. Her biri
için "hangi kaynak şu an hangi katmanı kontrol ediyor" verildi; kaybeden kaynak
silinmedi.

| # | Çelişki | Durum |
|---|---|---|
| C1 | `CLAUDE.md` v7 banner/gövde ↔ `STATUS.md` gerçeği (24-lesson vs L0–L6 v1) | RESOLVED (banner "legacy" der; STATUS kazanır) |
| C2 | Dev APK scope "L1–L5" + `DEV_APK_LESSON_LIMIT=5` ↔ runtime L0–L6 | PARTIAL (runtime kazanır; canon metni geride) |
| C3 | Paywall: Campfire ~L24 ↔ §66.3 "post-validation re-decide" ↔ legacy L14 | **OPEN** (D3) |
| C4 | `STATUS.md` "7 lessons" ↔ 16 dosya (L0–L15) | RESOLVED (working tree kazanır; STATUS bayat snapshot) |
| C5 | İki roadmap: `CAIRN_ROADMAP_202607` (Faz 0–7) ↔ `ROADMAP` (Five Stones) | **OPEN** (D8) |
| C6 | Registry sayımı: 54 (`itemRegistry.ts`) vs 56 (`shipped-item-ids.json`) vs 52 (audit) | **OPEN/borç** (K3 check var) |
| C7 | AI routing tablosu (Gemini/Haiku) ↔ gerçek zincir (Gemini→Gemini→Groq→Mistral, Claude yok) | RESOLVED (kod kazanır; tablo legacy) |
| C8 | Chip taxonomy (12 tip) ↔ runtime tek `status` enum | PARTIAL (spec zengin; runtime dar) |
| C9 | İki disjoint store: `lm7` ↔ `lm_le_events` | OPEN ("ana entegrasyon bloğu") |
| C10 | L7 full spec ↔ compact accepted (blocked) | RESOLVED (compact kazanır; full SUPERSEDED-as-next-PR) |

> [!warning] OPEN olanlar bir açık döngü besliyor → [[05 Open Loops]].
> Bu rapor iddiaları çözmez; **görünür** kılar. Çözüm operatör/karar gerektirir.
