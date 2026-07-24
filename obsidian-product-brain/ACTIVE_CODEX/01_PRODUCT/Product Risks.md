---
title: Product Risks
aliases: [Product Risks, Ürün Riskleri, Riskler, Traps]
type: product-canon
domain: product
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-16
last_reviewed: 2026-07-16
source_of_truth: ["docs/KNOWN_GAPS.md", "docs/CAIRN_ROADMAP_202607.md", "docs/ROADMAP.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Known Gaps]]", "[[Monetization and Scope Boundaries]]", "[[Non-Goals]]", "[[05 Open Loops]]"]
supersedes: []
superseded_by: []
tags: [product, risks, gaps, canon]
---

# Product Risks

<!-- gh-toc -->

## İçindekiler

- [Amaç](#amaç)
- [Live Premortem](#live-premortem)
- [R1 — Legacy-revival tuzağı (yüksek)](#r1-legacy-revival-tuzağı-yüksek)
- [R2 — Mastery-formula drift ("spec'in en büyük drift deliği")](#r2-mastery-formula-drift-specin-en-büyük-drift-deliği)
- [R3 — AI stack pratikte ölü (gap #8)](#r3-ai-stack-pratikte-ölü-gap-8)
- [R4 — Content-factory darboğazı](#r4-content-factory-darboğazı)
- [R5 — Local-first veri-kaybı (KABUL EDİLDİ)](#r5-local-first-veri-kaybı-kabul-edildi)
- [R6 — Release engineering / crash görünürlüğü yok](#r6-release-engineering-crash-görünürlüğü-yok)
- [R7 — İki canlı roadmap reconcile edilmemiş (meta)](#r7-iki-canlı-roadmap-reconcile-edilmemiş-meta)
- [R8 — Paywall konumu belirsiz (meta)](#r8-paywall-konumu-belirsiz-meta)
- [R9 — Item-ID convention split (cross-doc spec riski)](#r9-item-id-convention-split-cross-doc-spec-riski)
- [R10 — Mon Lexique surfacing riski](#r10-mon-lexique-surfacing-riski)
- [R11 — Spec-vs-reality: Dev APK ders kapsamı](#r11-spec-vs-reality-dev-apk-ders-kapsamı)
- [Risk matrisi (özet)](#risk-matrisi-özet)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Bu not, `KNOWN_GAPS.md` (14 gap) + evidence sweep'teki yapısal
> divergence'ları tek yerde toplar. Amaç: "neyi bozabiliriz / neyi henüz bilmiyoruz"
> sorusunu dürüstçe cevaplamak. Operasyonel gap ledger'ı [[Known Gaps]].

## Amaç

Ürün-seviyesi riskleri kaydeder; teknik gap envanterinin ([[Known Gaps]]) ürün-etkisi
katmanıdır. Açık kararlar [[05 Open Loops]] ve [[Deferred Decisions]]'ta izlenir.

## Live Premortem

> [!warning] Canlı premortem — en gürültülü güncel başarısızlık modu tek yerde.
> (Ayrı bir Premortem notu **oluşturulmadı**; burada yaşar.)

### Current loudest failure mode
**Dokümantasyon ve mimari işi, cihaz doğrulamasının (device validation) yerine geçmeye başlar.**

### Why it is loud now
- Product Brain **birden çok kapsamlı dokümantasyon pass'i** aldı (v0.1 build + kaynak ingestion + status reconciliation + bu pass).
- **Güncel-main fiziksel cihaz doğrulaması hâlâ operatör kapısı** (Taş 0, pending) → [[03 Current State]] · [[05 Open Loops]] O1.
- Ürün **"hissi" (feel) dokümanla settle edilemez** — yalnız gerçek cihazda.
- **Device-day öncesi geniş Codex genişletmesinin karar değeri azalıyor** (declining decision value).

### Tripwire
> [!canon] **Device-day kanıtı gelmeden geniş Product Brain genişletmesi YOK.**
> İzinli istisnalar: (1) **factual error düzeltmek**; (2) **risk altındaki bir founder
> kararını korumak**; (3) **tam olarak bu bounded pass'i tamamlamak.**

### Exit condition
- Fiziksel **device-day tamamlandı**;
- **Taş 0'ın core question'ı kanıtla cevaplandı** ("L7-L15'li haliyle sıkıcılık gitti mi?");
- Bulgular uygun **runtime/test notlarına** kaydedildi ([[Smoke Test Playbook]] · [[Device Verification Matrix]]).

### Current risk owner
Founder / operatör.

### Last reviewed
2026-07-16.

> [!open-loop] **Full historical premortem source: NOT YET INGESTED.** Tarihsel
> dokuz-maddelik premortem'in kesin kaynağı yok → **uydurulmadı.** Kaynak boşluğu
> olarak kaydedildi ([[Missing Source Inputs]]); ayrı geniş dokümantasyon workstream'i **açılmadı.**

## R1 — Legacy-revival tuzağı (yüksek)

> [!warning] Legacy paywall (L14/$12.99) + 24-lesson kodu repo'da hâlâ duruyor;
> "an agent could accidentally revive it." (`CAIRN_ROADMAP_202607.md:139-140`, KNOWN_GAPS #12).
> Mitigasyon: quarantine banner'ları + `devApkScope`/`componentCopyGuard` testleri.
> İlgili: [[Monetization and Scope Boundaries]], [[Non-Goals]].

## R2 — Mastery-formula drift ("spec'in en büyük drift deliği")

> [!warning] "Lexique Memory's 25+ fields named but formula-less. Without formulas,
> two agents each write two different but spec-compliant mastery systems."
> (`CAIRN_ROADMAP_202607.md:88`). Mitigasyon: §65 numeric contract + Faz 4B/4C pure
> modülleri (KNOWN_GAPS #2). Kalan risk: runtime wiring + tuning. Bkz. [[Mastery Model]].

## R3 — AI stack pratikte ölü (gap #8)

> [!warning] Edge function'lar `supabase.auth.getUser()` ile auth ister; ürün no-auth /
> local-only → "AI stack is effectively uncallable." Routing chain'de Claude yok
> (Gemini→Gemini→Groq→Mistral). Rate limit yok → auth açıldığı gün cost risk.
> (`CAIRN_ROADMAP_202607.md:132-136`; `...v1_0.md:5122-5131`; KNOWN_GAPS #8,#9).
> `aiEnabled=false` bu riski şimdilik dormant tutuyor. Bkz. [[AI Role and Guardrails]].

## R4 — Content-factory darboğazı

> [!warning] ~180 dersin ~174'ü yazılmamış; "engine will finish long before content...
> writing 180 lessons without telemetry is blind flight." (`CAIRN_ROADMAP_202607.md:148-158,169`).
> Telemetry spec'li ama implement edilmemiş (KNOWN_GAPS #14). Pilot L7-L9'a kilitli.
> Bkz. [[Syllabus Overview]], [[Content Selection]].

## R5 — Local-first veri-kaybı (KABUL EDİLDİ)

> [!warning] "Lose the phone, lose the progress" — MVP için ACCEPTED (≤L6'da saatler,
> ay değil). (`...v1_0.md:5205-5216`). Bulut silme DEFERRED (KNOWN_GAPS'e göre). YASA 1
> migration zorunluluğu bunu kısmen korur (`ROADMAP.md:14-22`). Bkz. [[Storage Architecture]],
> [[Privacy and Data Deletion]].

## R6 — Release engineering / crash görünürlüğü yok

> [!warning] Yalnızca `preview` EAS profili var; prod pipeline yok (KNOWN_GAPS #10),
> Sentry yok → sıfır crash görünürlüğü (KNOWN_GAPS #11). Dış tester öncesi açık.
> Faz 7'de çözülecek. (`KNOWN_GAPS.md:139-151`).

## R7 — İki canlı roadmap reconcile edilmemiş (meta)

> [!open-loop] `CAIRN_ROADMAP_202607.md` (engine-first, Faz 0-7) ve `ROADMAP.md`
> (deployment-first, Five Stones, daha yeni 2026-07-05) örtüşür ama farklı sıralar
> (engine wiring vs "önce lesson-experience skeleton"). Hiçbir doküman hangisinin
> supersede ettiğini açıkça söylemiyor; README `ROADMAP.md`'yi aktif sprint spec
> listeler ama `CAIRN_ROADMAP_202607.md`'yi değil. UNKNOWN: bir sonraki PR için hangisi
> yetkili. **Eşleme + operating rule:** [[Roadmap Crosswalk]]. Bkz. [[05 Open Loops]] D8.

## R8 — Paywall konumu belirsiz (meta)

> [!open-loop] "L24 Campfire" (Answers, kilitli gibi) vs "undecided, post-validation"
> (§66.3 / ROADMAP). Reconcilable okuma: mekanik kilitli, sınır+fiyat değil. Tam ele
> alış: [[Monetization and Scope Boundaries]].

## R9 — Item-ID convention split (cross-doc spec riski)

> [!warning] Runtime kebab `chunk-je-vais` vs syllabus `prefix:slug` `chunk:je-vais`
> (`SYSTEM_MAP_v0.1.md:155-157`). Cross-doc spec'lerin yanlış eşleşme riski. Bkz.
> [[Registry Architecture]], [[Spec Runtime Divergences]].

## R10 — Mon Lexique surfacing riski

> [!warning] Çok boyutlu mastery "stats dashboard'a dönüşmeden" gösterilmeli;
> §49.3 "must never show raw scores" (`...v1_0.md:3742-3753`;
> `CAIRN_PRODUCT_DEFINITION_v0.1.md:196-197`). Bkz. [[Mon Lexique]], [[Learner Experience Principles]].

## R11 — Spec-vs-reality: Dev APK ders kapsamı

> [!warning] Canon "L1-L5" + `LIMIT=5` vs runtime "L0-L6". Sabit LEGACY işaretli ama
> hâlâ kodda. Bir ajan `DEV_APK_LESSON_LIMIT`'e güvenirse yanılabilir. Ana ev:
> [[Dev APK Scope]], [[Spec Runtime Divergences]].

## Risk matrisi (özet)

| # | Risk | Statü | Mitigasyon / Ana ev |
|---|---|---|---|
| R1 | Legacy-revival | Mitige (quarantine+test) | [[Non-Goals]] |
| R2 | Mastery drift | Contract var, wiring açık | [[Mastery Model]] |
| R3 | AI stack ölü | Dormant (aiEnabled=false) | [[AI Role and Guardrails]] |
| R4 | Content darboğazı | STARTED, pilot L7-L9 | [[Syllabus Overview]] |
| R5 | Local data-loss | ACCEPTED (MVP) | [[Storage Architecture]] |
| R6 | Release/crash görünürlüğü | OPEN (Faz 7) | [[Known Gaps]] |
| R7 | İki roadmap | OPEN | [[05 Open Loops]] |
| R8 | Paywall konumu | OPEN | [[Monetization and Scope Boundaries]] |
| R9 | Item-ID split | OPEN | [[Registry Architecture]] |
| R10 | Mon Lexique surfacing | OPEN | [[Mon Lexique]] |
| R11 | Dev APK kapsam divergence | Flagged LEGACY | [[Dev APK Scope]] |

## İlgili Notlar

- Üst indeks: [[00 Le Mot Holy Codex]]
- [[Known Gaps]] — 14-gap operasyonel envanter
- [[Monetization and Scope Boundaries]] — R1/R8 evi
- [[Non-Goals]] — R1 yasak listesi
- [[05 Open Loops]] — açık kararlar
