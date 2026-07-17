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
last_updated: 2026-07-16
last_reviewed: 2026-07-16
source_of_truth: ["docs/STATUS.md", "docs/ROADMAP.md", "docs/CAIRN_ROADMAP_202607.md"]
related: ["[[03 Current State]]", "[[05 Open Loops]]", "[[Current Task Context]]"]
tags: [index, priorities]
---

# Current Priorities — 2026-07-16

> [!warning] Bayat olabilir. Kaynak: `docs/STATUS.md` + roadmap'ler. Tam açık-iş
> defteri [[05 Open Loops]]'tadır; burası **operasyonel öncelik** katmanıdır (defter değil).

## Current Gate Board

Five Stones kapıları (soru metinleri `docs/ROADMAP.md`'den birebir; uydurulmadı).
Kapı sorusuna "evet" denmeden sonraki taş açılmaz. Eşleme: [[Roadmap Crosswalk]].

| Gate / Stone | One-sentence question | Status | Required evidence | Next action | Source |
|---|---|---|---|---|---|
| **▶ Taş 0 — İkinci Smoke (AKTİF)** | "L7-L15'li haliyle sıkıcılık gitti mi?" | **PENDING (aktif kapı)** | Founder + 1-2 kişi telefonda oynar; telemetri started→completed hunisi | **Operatör device-day** → [[Smoke Test Playbook]] · [[05 Open Loops]] O1 | ROADMAP.md Taş 0 |
| Taş 1 — Ders Deneyimi İskeleti | "Ders 'phrasebook değil, üretiyorum' hissi veriyor mu?" | Taş 0'a bağlı | ~8 PR + founder smoke | Taş 0 kapanınca | ROADMAP.md Taş 1 |
| Taş 2 — Dış Tester Kapısı | "Bu APK'yı tanımadığım birine verebilir miyim?" | Bloke (güvenlik+hukuk) | privacy/AI-hardening/disclosure/hub | Taş 1 kapanınca | ROADMAP.md Taş 2 |
| Taş 3 — Tester Turu + Telemetri | "Hook kriterleri tutuyor mu?" | Not started | telemetri-güdümlü fix; yeni özellik yasak | Taş 2 kapanınca | ROADMAP.md Taş 3 |
| Taş 4 — Beta Cilası + Mağaza | "Play Store kapalı beta'ya koymaya utanır mıyım?" | Not started | ~9 PR (audio, retrofit dalga 2, store) | Taş 3 kapanınca | ROADMAP.md Taş 4 |
| Taş 5 — Deployment | "Kapalı beta metrikleri açık kapıyı hak ediyor mu?" | Not started | kapalı→açık beta metrikleri | Taş 4 kapanınca | ROADMAP.md Taş 5 |

> [!canon] **Operasyonel kural:** **Device-day → Taş 0 sorusunu kanıtla cevapla →
> ANCAK ondan sonra başka bir geniş Codex genişletmesine izin ver.** (Bkz.
> [[Product Risks]] Live Premortem tripwire.) Product Brain işi artık **sınırsız
> bir aktivite değil**; device-day öncesi yalnız düzeltme / risk-altındaki-kararı-koruma / bounded pass.

## Şu anki aktif odak (öncelik sırası düzeltildi)

1. **▶ Round 1 closeout gate + operatör cihaz smoke (Taş 0)** — **karar-taşıyan bir sonraki kapı.** Güncel main, yeni Lesson Zero. → [[Smoke Test Playbook]] · [[05 Open Loops]] O1.
2. **L1 chip redesign** — 31 → ~34–35 nesne; L0-carryover reddedildi; nihai liste açık (device-day'i bloke etmez). → [[L1 Survival Kit]] · [[05 Open Loops]] D1/D2.
3. **Product Brain: yalnız BOUNDED bakım** — düzeltme / risk-altındaki founder kararını koruma / onaylı bounded pass. **Geniş genişletme device-day sonrasına ertelendi** (Live Premortem tripwire). → [[Product Risks]].

## Five Hottest Open Gates

[[05 Open Loops]] defterinden bağımlılık + karar değerine göre seçilen 5 (defter tekrarlanmaz):

| Gate | Ana ev | Statü |
|---|---|---|
| Fiziksel device-day / güncel-main smoke | [[05 Open Loops]] O1 · [[Smoke Test Playbook]] | OPEN (aktif kapı) — source-supported |
| İki roadmap uzlaştırma | [[05 Open Loops]] D8 · [[Roadmap Crosswalk]] | OPEN — source-supported |
| Native-speaker French QA | [[Missing Source Inputs]] (L1-L5 Proofreading) · [[Content Production Workflow]] | OPEN — **founder-reported / provisional** (repo kaynağı kısmî) |
| Legal identity / data-controller kararı | [[Privacy and Data Deletion]] · ROADMAP Taş 2 disclosure | OPEN — source-supported (KVKK/GDPR + Taş 2) |
| Paywall / AI-cost gate | [[Monetization and Scope Boundaries]] (D3) · [[AI Architecture]] (D4) | OPEN — source-supported |

## Recent Locked Decisions

Device-day / tester / deployment için en ilgili 5 kilitli karar ([[Active Decisions]]'ta
zaten var; ikinci defter değil, yeniden numaralandırma yok, otomatik üretim iddiası yok):

- [[ADR-0007 v1-temporary-dev-apk-skin-engine-foundation|ADR-0007]] — v1 geçici smoke skini; engine temeli.
- [[ADR-0017 product-stage-fail-closed-dev-apk|ADR-0017]] — product-stage fail-closed → dev-apk.
- [[ADR-0015 k2-device-day-order|ADR-0015]] — K2 device-day landing order (device-day gate'i doğrudan destekler).
- [[ADR-0022 hub-derived-drills|ADR-0022]] — hub egzersizleri türetilmiş (fabrikanın ilk ürünü).
- [[ADR-0023 privacy-local-first-consent-gated-remote|ADR-0023]] — privacy local-first / consent-gated remote.

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
