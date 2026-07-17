---
title: Missing Documentation
aliases: [Eksik Dokümantasyon, Undocumented Topics, Doc Gaps]
type: open-loop
domain: meta
status: active
canon_status: provisional
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-17
last_reviewed: 2026-07-17
source_of_truth: ["docs/KNOWN_GAPS.md", "docs/README.md"]
related: ["[[Missing Source Inputs]]", "[[Unknowns]]", "[[Unmapped Ideas]]", "[[Known Gaps]]", "[[Repository Document Index]]", "[[05 Open Loops]]"]
tags: [gap, missing-doc]
---

# Missing Documentation

<!-- gh-toc -->

## İçindekiler

- [MD1 — v1 pedagogy lint (KNOWN_GAPS #5)](#md1-v1-pedagogy-lint-knowngaps-5)
- [MD2 — Progress-bridge tam spesifikasyonu](#md2-progress-bridge-tam-spesifikasyonu)
- [MD3 — Edge Function iç davranışı (519 LOC unchecked)](#md3-edge-function-iç-davranışı-519-loc-unchecked)
- [MD4 — Storage-key lifecycle tam haritası](#md4-storage-key-lifecycle-tam-haritası)
- [MD5 — Dead code envanteri](#md5-dead-code-envanteri)
- [MD6 — Three-runtime cutover planı](#md6-three-runtime-cutover-planı)
- [MD7 — Deferred canon implementasyon spec'leri](#md7-deferred-canon-implementasyon-specleri)
- [MD8 — Mon Lexique 6-band UI spec](#md8-mon-lexique-6-band-ui-spec)
- [MD9 — Release engineering & crash reporting](#md9-release-engineering-crash-reporting)
- [MD10 — Cloud data deletion (C1) path](#md10-cloud-data-deletion-c1-path)
- [MD11 — Deferred validators V1/V2/V6-V9 spec'i](#md11-deferred-validators-v1v2v6-v9-speci)
- [MD12 — Bu vault'un kendi eksik ana notları](#md12-bu-vaultun-kendi-eksik-ana-notları)
- [MD13 — Legal governance derinliği (kararlar açık)](#md13-legal-governance-derinliği-kararlar-açık)
- [MD14 — Measurement şema/eşik/export derinliği](#md14-measurement-şemaeşikexport-derinliği)
- [MD15 — Fransızca inceleyici/süreç kanıtı](#md15-fransızca-inceleyicisüreç-kanıtı)
- [İlgili notlar](#ilgili-notlar)

> [!open-loop] Repo'da **iyi bir belgesi olmayan** konular. "Kaynak eksik" (o [[Missing Source Inputs]])
> değil, "cevap yok" (o [[Unknowns]]) değil — bunlar var olan ama repo `docs/`'ta düzgün belgelenmemiş
> alanlar. Kod var ama açıklaması yok; ya da karar var ama tek yeri dağınık checkpoint.

## MD1 — v1 pedagogy lint (KNOWN_GAPS #5)
`piecesUsed ≠ sentence` kuralını CI'da uygulayacak v1 pedagoji lint'i **implement edilmedi**;
yön set edildi (Faz 2 kısmen mekanize: V3/V4/V5) ama tam spec/doc yok. → [[Exercise Anti-Patterns]], [[Known Gaps]].

## MD2 — Progress-bridge tam spesifikasyonu
D-10 kararı var (events canonical, sahte `lm7` yok) ama **completion-strictness tanımı**,
canonical completion unit, Daily Review availability kriteri, Progress'in legacy taksonomiyi ne
zaman bırakacağı belgesiz (açık sorular checkpoint'te dağınık). → [[Data Flow]], [[Unknowns]] U7.

## MD3 — Edge Function iç davranışı (519 LOC unchecked)
Loop audit v2 C13: ~519 LOC edge function hiçbir testle korunmuyor; `ai-chat`/`ai-evaluate`/
`ai-error` iç akışı ve fallback davranışı runbook dışında düzgün belgeli değil. → [[AI Architecture]], [[Technical Debt]].

## MD4 — Storage-key lifecycle tam haritası
`lm7` / `lm7_srs` / `lm_le_events` / `lm_le_snapshot` / `lm_le_telemetry` / `lm_le_privacy_state`
+ `__corrupt` sibling'ları + auth token — loop audit v2 bir tablo çizdi ama repo'da tek kanonik
"storage key lifecycle" dokümanı yok. → [[Storage Architecture]].

## MD5 — Dead code envanteri
`ai-error`/`analyzeErrors` dead code, B13 legacy `/lesson/[id]` deep-link guard, B20 `lemot://`
notu — dağınık audit bulguları; tek "known dead code / cleanup" dokümanı yok. → [[Technical Debt]].

## MD6 — Three-runtime cutover planı
A→C veya B→C cutover "future flagged reversible step" (D-09) ama **nasıl/ne zaman** planı yok;
v1→engine migration notes başlangıç, tam cutover playbook değil. → [[Spec Runtime Divergences]], [[Runtime Content Architecture]].

## MD7 — Deferred canon implementasyon spec'leri
Instruction-weave thermostat (Faz D), Readiness Gate (Faz C), unified hint ladder (Faz B),
meet/insight/recap interaction upgrade (Faz B) — hepsi CANONICAL ama **implementasyon spec'i**
(hangi dosya, hangi test, hangi PR sınırı) yok. → [[Deferred Decisions]], [[Lesson Flow]].

## MD8 — Mon Lexique 6-band UI spec
Lexique Memory numeric contract (18-field) var ama learner-facing **6-band UI** ve selector
wiring belgesiz (KNOWN_GAPS #2 "remaining: runtime wiring + tuning"). → [[Mon Lexique UI]].

## MD9 — Release engineering & crash reporting
Prod EAS profili yok (sadece preview), Sentry yok (KNOWN_GAPS #10/#11) — Faz 7 planı başlık
düzeyinde; tam release/crash-reporting dokümanı yok. → [[Release and Build Process]].

## MD10 — Cloud data deletion (C1) path
Local reset var; **cloud silme yolu yok** (audit C1, KVKK/GDPR riski: synced kullanıcı için
"reset" = sahte silme). DELETE RLS policy + client delete path belgesiz/unbuilt. → [[Privacy and Data Deletion]].

## MD11 — Deferred validators V1/V2/V6-V9 spec'i
Mekanize edilmeyen validator'ların (screen_action_count, passive_screen, gate_scope,
exposure_horizon, production_without_ladder, fill_without_recovery) hangi runtime alanı/schema
gerektirdiği tam belgeli değil (canon'da tanım var, implementasyon planı yok). → [[Exercise Anti-Patterns]], [[Test Source Index]].

## MD12 — Bu vault'un kendi eksik ana notları
**Düzeltme (2026-07-17):** Planlanan **birincil (primary) not ağacı artık yapısal olarak mevcut** —
eksik ana ev'ler (legal/veri-yönetişimi, ölçüm/deney, Fransızca dil-QA) bu pass'te iskelet olarak kuruldu
([[Coverage Report]] 2026-07-17). Yani "primary home yok" durumu **büyük ölçüde kapandı**; kalan iş
**yapısal değil derinlik** işidir. **MD1–MD11 derinlik boşlukları hâlâ geçerlidir.** Ayrıca bazı index-adı-var-içerik-yok
notlar sürebilir (bazı 05_MATRICES / 08_IMPLEMENTATION / 11_AGENT_CONTEXT). → [[Repository Document Index]].

## MD13 — Legal governance derinliği (kararlar açık)
[[Legal Compliance and Data Governance]] artık **yapısal ev** olarak var (skeleton), ama **hukuki kararların hiçbiri çözülmedi**:
tüzel kişilik/veri sorumlusu, hukuki dayanak, saklama, yaş politikası, sınır-ötesi, bildirim/şartlar, veri-sahibi talep yolu —
hepsi **OPEN/UNKNOWN** ve Operator + hukuki inceleme kapısı bekler. Uyum **iddia edilmez**. → [[Legal Compliance and Data Governance]], [[Privacy and Data Deletion]].

## MD14 — Measurement şema/eşik/export derinliği
[[Measurement and Experimentation]] artık **yapısal ev** olarak var (skeleton), ama **tam event şeması yok**, **sayısal eşik/hedef yok**,
**export/cohort şeması tanımsız**. İlkeler ve karar-taşıyan deneyler çerçevelendi; şema/eşik/export **derinliği OPEN**. → [[Measurement and Experimentation]], [[ADR-0009 events-source-of-truth]].

## MD15 — Fransızca inceleyici/süreç kanıtı
[[French Linguistic QA]] artık **yapısal ev** olarak var (skeleton), ama **native-speaker inceleyici kimliği/tedariki UNKNOWN**,
QA'nın boru hattındaki tam yeri ve geçme eşiği **OPEN**, otoriter standart kaynağı (`L1-L5 Proofreading.md`) **ingest edilmedi**.
Native-speaker incelemesinin gerçekleştiği **iddia edilmez**. → [[French Linguistic QA]], [[Missing Source Inputs]].

## İlgili notlar
- [[Missing Source Inputs]] · [[Unknowns]] · [[Unmapped Ideas]]
- [[Known Gaps]] · [[Technical Debt]] · [[05 Open Loops]]
