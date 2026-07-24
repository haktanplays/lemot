---
title: Open Loops
aliases: [Open Loops, Açık Döngüler, Açık İşler]
type: index
domain: meta
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-18
last_reviewed: 2026-07-18
source_of_truth: ["docs/STATUS.md", "docs/KNOWN_GAPS.md", "docs/audits/2026-07-09-loop-audit-v2.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Open_Questions.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Backlog_and_Deferred.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tech_and_Privacy_Decisions.md"]
related: ["[[03 Current State]]", "[[04 Current Priorities]]", "[[Deferred Decisions]]", "[[Needs Verification]]", "[[Contradictions]]"]
tags: [index, open-loop, tracker]
---

# Open Loops — açık döngü izleyicisi

> [!open-loop] Bu not, **çözülmemiş** her şeyi tek yerde tutar: bekleyen kararlar,
> operator blocker'ları, doğrulanmamış iddialar, teknik borç. Kapanan bir döngüyü
> **silme** — statüsünü CLOSED yap ve kapatan kaynağa link ver.

## 1. Operator-only blocker'lar (kod tarafı hazır, insan bekliyor)

> [!warning] Bulut oturumu bunlar açıkken **"tamamlandı" diyemez** (Rule 11).

| # | Blocker | Statü | Not |
|---|---|---|---|
| O1 | Fiziksel cihaz smoke (güncel main, Lesson Zero yeni akış) | OPEN | [[03 Current State]] |
| O2 | EAS preview build (`preview` profili, `lemot-app/`) | OPEN | operator-only |
| O3 | EAS env var push / doğrulama | OPEN | |
| O4 | Supabase Edge Function deploy + secrets doğrulama | OPEN | |
| O5 | G3 Supabase email confirmation | OPEN | env-taşıyan build öncesi zorunlu |
| O6 | Build ID / link kaydı | OPEN | Test Checklist / LeMot.md |
| O7 | Merged branch temizliği + `docs/CLOUD_SYNC_QUEUE.md` drain | OPEN | |
| O8 | Güncel main'de validation yeniden çalıştırma + sayım | OPEN | [[Test Strategy]] |

## 2. Bekleyen ürün/tasarım kararları

| # | Karar | Statü | Ana not |
|---|---|---|---|
| D1 | **L1 nihai chip listesi** (31 → ~34–35; 3–4 ekleme) | OPEN | [[L1 Survival Kit]] |
| D2 | Seçili spine'ların L1-aktif vs ghost/seed dağılımı | OPEN | [[L1 Survival Kit]] · [[Chip Coverage Matrix]] |
| D3 | Cairn paywall pozisyonu (Campfire ~L24 vs §66.3 "post-validation re-decide") | OPEN | [[Monetization and Scope Boundaries]] · [[Contradictions]] |
| D4 | AI activation package (rate-limit, cost, edge auth vs no-auth product) | OPEN | [[AI Architecture]] |
| D5 | Audio / TTS layer kararı | OPEN | [[Future Features]] |
| D6 | Mon Lexique runtime wiring | DEFERRED | [[Mon Lexique]] |
| D7 | Content-factory pilot (Faz 6, ~174/180 ders) | OPEN | [[Content Production Workflow]] |
| D8 | İki roadmap uzlaştırma (CAIRN_ROADMAP vs ROADMAP "Five Stones") | OPEN | [[Commit and Milestone Timeline]] |
| D9 | Deferred canon Faz B–D (meet/insight/recap etkileşimleri) | DEFERRED | [[Lesson Flow]] |
| D10 | Deferred validators V1/V2/V6–V9 | DEFERRED | [[Validation Gates]] |

## 3. Audit "C-series" açık kalemleri (privacy/sync)

| # | Kalem | Statü |
|---|---|---|
| C1 | Cloud silme yolu yok (deletion DEFERRED) | OPEN → [[Privacy and Data Deletion]] |
| C2 | Corrupt-PII orphan | OPEN |
| C3 | Edge guard gap | OPEN |
| C4 / B5 | Sync merge test edilmemiş | OPEN → [[Sync Architecture]] |
| C14 | Android backup davranışı | OPEN |

## 4. Doğrulama gerektirenler (UNKNOWN)

Tam liste: [[Needs Verification]]. Öne çıkanlar:
- **PR #197** canlı durumu (17 unresolved thread, head `fd22c40`; brief'e göre paused, merged değil). [[03 Current State]]
- Güncel main'de test sayıları (246 vs 262/613 bayat).
- `ici` / `faim` R3 identity gap (registry itemId yok). [[L1 Survival Kit]]
- 54 vs 56 item-id drift'in güncel değeri. [[Registry Architecture]]

## 5. Bilinen çelişkiler

Tam liste: [[Contradictions]]. Kısaca: CLAUDE.md v7 banner ↔ STATUS gerçeği;
iki roadmap; üç paywall ifadesi; 54/56 id; AI routing tablosu ↔ gerçek sağlayıcı zinciri.

## Kaynak içe aktarımı (Open Questions / Backlog / Tech-Privacy / Sprint 12)

> [!open-loop] 2026-05/2026-06 özel karar/süreç notlarından (`Open_Questions.md`,
> `Backlog_and_Deferred.md`, `Tech_and_Privacy_Decisions.md`) içe aktarılan **açık ürün/teknik sorular**.
> Bunlar açık-döngüleri **zenginleştirir**, güncel repo kanonunu (HEAD #196) **geçersiz kılmaz**.
> Her satır bir "sonraki karar sahibi" ile etiketli: **human-product** / **operator-engineering** / **engineering-tooling**.

### Açık ürün soruları

| # | Soru | Statü | Sonraki karar sahibi | Kaynak |
|---|---|---|---|---|
| Q-IN1 | Erken derslerde `pret` / `prête` (cinsiyet varyantı) öğrenci-yüzü treatment'i | OPEN | human-product | `Open_Questions.md`, `Backlog_and_Deferred.md` |
| Q-IN2 | Erken "What was Weave?" hatırlatma kartı — **yalnız** tester kanıtı Weave kavramının unutulduğunu gösterirse ekle | DEFERRED | human-product (smoke notları sonrası) | `Open_Questions.md`, `Backlog_and_Deferred.md` |
| Q-IN3 | Round 1.1 sonrası **tam olarak hangi dar branch/track** izlenecek | OPEN | human-product | `Open_Questions.md` |
| Q-IN4 | Tekrarlanan-önceki-cevap "salience nudge" (`This looks like your last answer…`) şimdi mi, daha çok tester kanıtı sonrası mı | DECIDED → DEFERRED | human-product (bir sonraki tester sonrası) | `Open_Questions.md`, `Backlog_and_Deferred.md` |

> [!check] Q-IN4 kararı: **şimdilik ertelendi.** Bunun yerine `#155` **salience copy/label** gönderdi
> (görünür `Weave` rozeti, `Say this:` etiketi, baskın hedef anlam, `Your try` input). Detection mantığı
> yeni bir tester dalgasına kadar açılmaz; **evaluator davranışı hiçbir şekilde değişmedi.**

### Açık teknik sorular

| # | Soru | Statü | Sonraki karar sahibi | Kaynak |
|---|---|---|---|---|
| Q-IN5 | Android TTS **çok-cihaz** güvenilirliği (tek cihaz 2026-06-29 spot-check'inde **OK** doğrulandı; geniş kapsam açık) | OPEN | operator-engineering | `Open_Questions.md`, `Backlog_and_Deferred.md`, `Tech_and_Privacy_Decisions.md` |
| Q-IN6 | AI feedback sandbox'tan çıkmadan önce zorunlu guardrail'lar (hallucination/fallback; görülmemiş formu öğretmeme) | OPEN | engineering (+ human-product) | `Open_Questions.md`, `Backlog_and_Deferred.md` |
| Q-IN7 | chip / `piecesUsed` kapsamının **validator metriği** olması (missing-chip regresyonunu önler) | OPEN | engineering-tooling | `Open_Questions.md`, `Backlog_and_Deferred.md` |
| Q-IN8 | Backend platformu: **Cloudflare vs Supabase** (validation gerçek bir gereksinim yaratana dek kilitleme) | OPEN | operator-engineering | `Tech_and_Privacy_Decisions.md` |
| Q-IN9 | Analytics **event schema** | OPEN | operator-engineering | `Tech_and_Privacy_Decisions.md` |
| Q-IN10 | Account / auth **timing** (ne zaman devreye girer) | OPEN | operator-engineering (+ human-product) | `Tech_and_Privacy_Decisions.md` |
| Q-IN11 | Tester **consent wording** (rıza metni) | OPEN | operator-engineering | `Tech_and_Privacy_Decisions.md` |
| Q-IN12 | **Data retention** (veri saklama süresi/politikası) | OPEN | operator-engineering | `Tech_and_Privacy_Decisions.md` |

> [!note] Kaynak-notlarında **başka yerde çözülmüş** sayılanlar (buraya açık olarak taşınmadı):
> Round 1.1 EAS/APK URL recovery, tek-cihaz TTS OK, Weave etiket/layout (`#155`), L3 recap `oui` (`#156`),
> legacy 24-ders/L14 paywall inaktif. Bkz. `Open_Questions.md` "Resolved Elsewhere". Bunlar Cairn HEAD #196
> repo kanonunda zaten ayrı biçimde ele alınmıştır; kaynak SHA'ları (`8cfdce75`/`2df34699`) **bayat**, yalnız köken kaydı.

## 6. Policy-hardening pass (2026-07-18) — kapanan/daralan döngüler

> [!check] Chip/carryover/error-repair/Mon Lexique **policy hardening** pass'i iki açık soruyu **policy olarak** kapattı. Bunlar **authoring/canon** kararlarıdır; **runtime wiring değil** (runtime hâlâ sandbox).

| # | Döngü | Yeni statü | Nasıl |
|---|---|---|---|
| PH1 | "Carryover reach sayısal mı, selection-score mı?" | **CLOSED (policy)** | Hibrit: sayısal horizon default eligibility/density ([[Chip Lifecycle]]); selector içeriden seçer ([[Content Selection]]); evidence/curriculum trigger uzatır/reaktive eder ([[Spine and Carryover Logic]]). |
| PH2 | "Mon Lexique vs Lexique Memory vs Selector" | **CLOSED (policy)** | Pipeline HARD INVARIANT: events→mastery→Lexique Memory→selector→Mon Lexique UI projection. Mon Lexique = learner-safe projeksiyon, kanıt DB değil ([[Mon Lexique]]). |

**Açık kalan (bu pass kapatmaz):** selector coefficient kalibrasyonu · smoke-sonrası eşik tuning (horizon süreleri, repair eşiği = TUNABLE) · **D6 Mon Lexique runtime wiring (DEFERRED)** · v1 renderer LearningEvent yayımı · telemetri kalibrasyonu · final learner-facing status kopya. Bu policy'lerin **mevcut runtime/içerik uyumu UNVERIFIED/PARTIAL** — ayrı retro-audit gerekir.

## 7. Content-safety policy-hardening pass (2026-07-18) — kapanan/daralan döngüler

> [!check] Registry-identity / contextTags / promotion / integration-rhythm / French-QA-gate / TUNABLE-metadata **content-safety policy hardening** pass'i. Kararlar **authoring/canon** policy'sidir; **runtime wiring/validator değil.**

| # | Döngü | Yeni statü | Nasıl |
|---|---|---|---|
| PH3 | tracked chip without registry identity | **CLOSED (policy)** | "No tracked learning item without a canonical registry identity" ([[Registry Architecture]]). |
| PH4 | contextTags free-text ambiguity | **NARROWED (policy)** | controlled vocabulary + fail-closed + new-tag prosedürü ([[Content Selection]]); kanonik tag listesi seed'i **OPEN**. |
| PH5 | exposure-promotion contract absent | **CLOSED (policy)** | 8-koşullu promotion eligibility + activeNew budget consume ([[Chip Lifecycle]]). |
| PH6 | integration rhythm status | **CLOSED (policy)** | ~3 new-engine → review LOCKED DEFAULT + counting + doorway anti-gaming ([[Integration Lesson Logic]]). |
| PH7 | French QA visibility gate | **CLOSED (policy)** | Stage A–D gate + verdict + reviewer record + BLOCKER/MAJOR blocking ([[French Linguistic QA]]); default variety = metropolitan. |
| PH8 | TUNABLE decision trigger absence | **CLOSED (policy)** | her TUNABLE için named review gate + karar-metadata ([[Measurement and Experimentation]]). |
| PH9 | shipped-ID definition belirsizliği | **CLOSED (policy)** | "shipped = learner-facing/evidence rol" (YASA 2 ile uzlaşık, [[Registry Architecture]]). |

**Açık kalan (bu pass kapatmaz):** selector coefficient/empirik kalibrasyon · **exact numeric exposure threshold** · runtime validator implementasyonu · v1 LearningEvent wiring · Practice Hub readiness/runtime · Mon Lexique public launch stage · **French QA staffing modeli** (kanıt yoksa) · legal/privacy/accessibility · kanonik contextTag listesi seed'i. Bu policy'lerin **mevcut runtime/içerik uyumu UNVERIFIED/PARTIAL** — retro-audit ayrı görev. ADR adayları: [[Decision Index]] ADR Promotion Rule (bu pass'te ADR **oluşturulmadı**).

## Kapanış kaydı

> Bir döngü kapandığında: satırı **CLOSED** işaretle, kapatan PR/commit/karar
> notuna link ver, ilgili ADR'yi [[Decision Index]]'te güncelle. Satırı silme.
