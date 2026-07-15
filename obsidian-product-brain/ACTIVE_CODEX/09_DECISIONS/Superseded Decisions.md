---
title: Superseded Decisions
aliases: [Superseded ADRs, Eski Kararlar, Aşılmış Kararlar]
type: index
domain: meta
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
related: ["[[Decision Index]]", "[[Historical Canon Map]]", "[[90 History Index]]", "[[00 Le Mot Holy Codex]]"]
tags: [index, decision, superseded, historical]
---

# 🕰️ Superseded Decisions

> [!historical] Bir zamanlar geçerli olan ama **yerini yeni bir karara bırakan** kararlar. **Silinmez, işaretlenir** (tarihi ezme kuralı). Aktif iş için asla bunları temel alma. Ana dizin: [[Decision Index]] · tarihsel: [[Historical Canon Map]].

## Superseded karar → yerini alan

| Eski karar (SUPERSEDED) | Tarih | Yerini alan | Kaynak |
|---|---|---|---|
| Paywall after **L14**, $12.99/mo | 2026-04-23 | [[ADR-0025 paywall-campfire-l24]] (Cairn: free open beta; Campfire ~L24 çalışan yön, yerleşim DEFERRED) | D-30 |
| **Fail-open** sandbox stage fallback | pre-#104 | [[ADR-0017 product-stage-fail-closed-dev-apk]] (fail-closed → dev-apk) | D-20 |
| "**Franglais**" mekanik adı | pre-Cairn | [[ADR-0003 weave-primary-production-mechanic]] (→ "Weave", #155) | D-03 |
| near-miss = tam failure | pre-`203f817` | [[ADR-0021 mastery-precision-near-miss-not-failure]] (soft signal) | D-23 |
| Elle yazılmış statik hub drill'leri (Option A) | pre-#179 | [[ADR-0022 hub-derived-drills]] (Option B, deriveDrill) | D-25 |
| Legacy v7 aktiflik iddiası (24-lesson, 11-section, "for English speakers") | v7 | [[ADR-0024 cairn-v1-precedence-chain]] (HISTORICAL/quarantined) | D-34 |
| Cairn v0.1 docs (Definition/System Map) | pre-2026-07-02 | [[ADR-0024 cairn-v1-precedence-chain]] (Cairn v1.0 spec, reference-only) | D-34 |
| Earlier 5-lesson Round-1 draft (Je suis/C'est/Non/J'ai/integration) | pre-2026-06 | Round 1 spine L1–L6 (D-07) | D-07 |

## Repo canon'da kayıtlı diğer superseded materyal
> Bunlar ADR-düzeyi kararlar değil ama superseded kabul edilir; ayrıntı: [[Historical Canon Map]], [[Superseded Specs]].
- **Merged Product Canon 2026-05-11** — "PARTIALLY HARVESTED" (MC.1/2/4/5/6 kabul; MC.3 revised, MC.7 re-homed, MC.8 re-mapped, MC.9 cancelled); üst-düzey aktif canon olarak okunmaz.
- **"Sprint 10/11/12" framing + `SPRINT_11_PLAN.md`** — stale; tek sprint-state kaynağı `docs/STATUS.md` (D1 fix).
- **`streak` kolonu** — `schema.sql`'den düşürüldü ama deployed DB'de kalabilir (migration public beta'ya ertelendi); streak'in UI'ya döndüğü çıkarılmamalı.
- **Model-routing tablosu (Claude Haiku)** — implemented sağlayıcılarla (gemini/groq/mistral) çelişir; D2 doc-sync fix.

## Related
[[Historical Canon Map]] · [[90 History Index]] · [[Superseded Specs]] · [[Decision Index]]
