---
title: Current Priorities
aliases: [Current Priorities, Öncelikler, Sıradaki İş]
type: index
domain: meta
status: active
canon_status: provisional
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/ROADMAP.md", "docs/CAIRN_ROADMAP_202607.md"]
related: ["[[03 Current State]]", "[[05 Open Loops]]", "[[Current Task Context]]"]
tags: [index, priorities]
---

# Current Priorities — 2026-07-14

> [!warning] Bayat olabilir. Kaynak: `docs/STATUS.md` + roadmap'ler + bu oturumun brief'i.

## Şu anki aktif odak
1. **L1 chip redesign** — 31 → ~34–35 nesne; L0-carryover reddedildi; nihai liste açık. → [[L1 Survival Kit]] · [[05 Open Loops]] D1/D2.
2. **Bu Obsidian Product Brain'i kurmak** (şu anki iş) — kalıcı kurumsal hafıza.
3. **Round 1 closeout gate + operatör cihaz smoke** (güncel main, yeni Lesson Zero). → [[Smoke Test Playbook]] · [[05 Open Loops]] O1.

## Sonra (sırayla, kanona göre)
- Round 1 sonuçları gelince: bir sonraki track kararı (L7+ içerik açılışı vs learning-engine migration adımı). Slice dışında hiçbir şey Round 1 sonuçlarından önce haklı değil (STATUS.md).
- İki roadmap uzlaştırma (CAIRN_ROADMAP Faz 0–7 vs ROADMAP "Five Stones"). → [[05 Open Loops]] D8.
- Content Factory (Faz 6, ~174/180 ders) — gerçek darboğaz. → [[Content Production Workflow]].

## "Hard no" (şu an genişletme yasak)
v1 feature/polish genişletme, Home/Daily Review/Progress rewrite, V4-B implementation,
Practice/Chat genişletme, Mon Lexique runtime, yeni ders mekaniği, Round 1 L1–L6 dışı
içerik, paywall işi. Tam liste: [[03 Current State]] · [[Non-Goals]].

## Operatör kritik yolu
[[05 Open Loops]] O1–O8: cihaz smoke → EAS build → env/Supabase deploy → build ID kaydı.
Bunlar açıkken hiçbir şey "shipped" değil.
