---
title: Deferred Decisions
aliases: [Ertelenmiş Kararlar, Deferred ADRs]
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
source_of_truth: ["SOURCE_ARCHIVE/AVAILABLE_INPUTS/Backlog_and_Deferred.md"]
related: ["[[Decision Index]]", "[[Active Decisions]]", "[[05 Open Loops]]", "[[00 Le Mot Holy Codex]]"]
tags: [index, decision, deferred]
---

# ⏸️ Deferred Decisions

> [!open-loop] Karar/yön **kabul edildi** ama **uygulama veya nihai konum ertelendi**. Bunlar açık döngülerle bağlantılıdır → [[05 Open Loops]]. Ana dizin: [[Decision Index]].

## Nihai konumu ertelenmiş ADR'ler
- [[ADR-0025 paywall-campfire-l24]] — **DEFERRED/PROPOSED.** Legacy L14/$12.99 SUPERSEDED; açık beta ücretsiz; paywall yerleşimi Taş 5 sonrası ayrı karar. Çalışan yön: Campfire ~L24 (L1–L20 free), ama §66.3 post-validation yeniden-karar der (hafif gerilim).

## ACTIVE ADR'lerin ertelenmiş alt-bileşenleri
- [[ADR-0023 privacy-local-first-consent-gated-remote]] — local katman IMPLEMENTED; **remote sync + cloud deletion DEFERRED** (audit C1; `le_*`/learning-engine tabloları PROPOSAL, D-40; deploy operator-only).
- [[ADR-0016 boundary-recognition-later-form-ui]] — karar ACTIVE ama `presentationHint`/`later_form` **schema marker DEFERRED** (ayrı incelenecek).
- [[ADR-0021 mastery-precision-near-miss-not-failure]] — foundation ACTIVE; **staged strictness DEFERRED** (L60/L70+ bandları, monolingual faz, `accentCriticality`).

## Henüz ayrı ADR açılmamış, canon'da DEFERRED kararlar
> Bunlar `06_decisions_history.md`'de kayıtlı; implementasyon Faz'lara ertelenmiş. İleride kendi ADR'lerini alabilirler.

| Karar | D-# | Ertelendiği yer |
|---|---|---|
| Instruction Weave = thermostat (english→french instruction dili) | D-26 | Faz D (birikmiş lexique verisi gerekir) |
| Readiness Gate (integration derslerine scoped, fail-open) | D-27 | Faz C / Taş 4 PR 19 |
| Unified hint / struggle ladder | D-28 | Taş 1 PR 5 / Faz B |
| Deterministic engine first; AI dormant supporting layer | D-33 | AI activation package (Faz 5 §66.2) — tamamen unbuilt |
| Lexique Memory numeric contract wiring & tuning | D-35 | Faz 4 sonrası wiring DEFERRED |
| meet/insight/recap per-screen interactions | — | Faz B |
| Audio / listening (recorded pipeline) | — | Faz 6 (KNOWN_GAPS #1) |

## Kaynak içe aktarımı (Open Questions / Backlog / Tech-Privacy / Sprint 12)

> [!open-loop] `Backlog_and_Deferred.md` "Standing Deferred Areas" listesinden içe aktarılan **duran ertelenmiş alanlar**.
> Bunlar aktif scope **değildir**; yalnız gözden geçirilmiş bir workstream veya güncel-build kanon güncellemesiyle terfi eder.
> Güncel repo kanonunu (HEAD #196) **geçersiz kılmaz** — vault'un mevcut DEFERRED kayıtlarıyla örtüşür/pekiştirir.

| Alan | Statü | Vault'taki ana ev |
|---|---|---|
| L7+ implementasyonu + Home görünürlük artışı | DEFERRED | [[05 Open Loops]] (D1/D2) |
| Mon Lexique runtime entegrasyonu | DEFERRED | [[Mon Lexique]] · [[Future Features]] (D-24/D-35) |
| Practice / Chat genişletme | DEFERRED | [[Future Features]] |
| Paywall / RevenueCat | DEFERRED | [[ADR-0025 paywall-campfire-l24]] · [[Monetization and Scope Boundaries]] |
| Word Graph learner surface | DEFERRED (post-beta) | [[Future Features]] · [[Registry Architecture]] |
| V4-B geniş görsel redesign | DEFERRED | [[Future Features]] |
| Generic AI chat / geniş konuşma modu | DEFERRED | [[AI Role and Guardrails]] (D-33) |

> [!note] Kaynak `Backlog_and_Deferred.md` içindeki Round 1.1/1.2 kalemleri (örn. `pret`/`prête`, "What was Weave?"
> kartı, chip validator, Android TTS) bir **karar/açık-soru** taşıdığından [[05 Open Loops]] "Kaynak içe aktarımı"
> bölümüne yerleştirildi; buradaki tablo yalnız **kararı verilmiş ama uygulaması ertelenmiş** duran alanları tutar.

## Related
[[05 Open Loops]] · [[Known Gaps]] · [[Rejected Decisions]] · [[Superseded Decisions]] · [[Decision Index]]
