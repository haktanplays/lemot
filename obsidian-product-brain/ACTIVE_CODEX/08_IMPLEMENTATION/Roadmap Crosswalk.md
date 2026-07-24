---
title: Roadmap Crosswalk
aliases: [Roadmap Crosswalk, Yol Haritası Çapraz Eşleme, Five Stones vs Faz 0-7]
type: implementation-ledger
domain: implementation
status: active
canon_status: provisional
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-16
last_updated: 2026-07-16
last_reviewed: 2026-07-16
source_of_truth: ["docs/ROADMAP.md", "docs/CAIRN_ROADMAP_202607.md", "docs/STATUS.md", "docs/KNOWN_GAPS.md"]
related: ["[[Commit and Milestone Timeline]]", "[[08 Source of Truth Map]]", "[[Product Risks]]", "[[04 Current Priorities]]", "[[05 Open Loops]]"]
tags: [implementation, roadmap, crosswalk]
---

# Roadmap Crosswalk

> [!canon] İki canlı yol haritası var; **hiçbiri diğerini sessizce supersede etmez.**
> **`ROADMAP.md` (Five Stones / Taş 0–5)** = deployment/validation sırası (daha yeni,
> 2026-07-05). **`CAIRN_ROADMAP_202607.md` (Faz 0–7)** = engine/product construction
> haritası. Bu not ikisini **eşler**, birini iptal etmez. Çözülmemiş çakışmalar →
> [[05 Open Loops]] D8 / [[Product Risks]] R7.

> [!warning] Kaynak hiçbir yerde biri diğerini "supersede" demez. README `ROADMAP.md`'yi
> aktif sprint spec listeler; `CAIRN_ROADMAP_202607.md`'yi listelemez ama iptal de etmez.
> Yetki katmanı: **spec/karar için** [[08 Source of Truth Map]] precedence; **build state
> için** STATUS.md.

## Operating rule (ajanlar için)

- **Five Stones (Taş 0–5)**, açıkça aktif olduğu yerde **güncel validation/deployment
  sırasını kontrol eder** (device smoke → tester → beta).
- **Faz 0–7**, daha geniş **engine/product construction** haritası olarak kalır (motor
  parçaları, karar kapıları, içerik fabrikası).
- Bu crosswalk **ikisini de supersede etmez**; yalnız eşler.
- Çözülmemiş çakışmalar **OPEN** kalır → [[05 Open Loops]] D8.
- **Bir görev başlamadan önce ajan neyi okur:** deployment/validation işi → `ROADMAP.md`
  (Taş) + STATUS; motor/spec/mastery/error/factory işi → `CAIRN_ROADMAP_202607.md` (Faz) +
  ilgili spec. Emin değilse [[08 Source of Truth Map]].

## Crosswalk tablosu

| Five Stones item | Cairn Faz 0–7 karşılığı | Core question | Start gate | Completion evidence | Current status | Conflict / ambiguity | Authoritative source |
|---|---|---|---|---|---|---|---|
| **Taş 0 — İkinci Smoke** (device) | Doğrudan Faz yok (Faz = construction; bu validation gate) | "L7-L15'li haliyle sıkıcılık gitti mi?" | Mevcut build telefonda oynanabilir | Founder + 1-2 kişi device play; telemetri lesson_started→completed hunisi | **PENDING** (operatör device-day) | Five Stones'ta gate; Faz 0-7'de device-smoke fazı yok | ROADMAP.md Taş 0 + STATUS |
| **Taş 1 — Ders Deneyimi İskeleti** (~8 PR) | Faz 1 (§29 cleanup) + Faz 2 (guardrail lint) + lesson-v1 UI kısmı | "Ders 'phrasebook değil, üretiyorum' hissi veriyor mu?" | Taş 0 kapısı geçildi | 8 PR (natural-reveal, build+repair tipleri, hint ladder, ders-sonu+SRS, edge, meet/insight etkileşim) + founder smoke | PARTIAL (natural-reveal L1-L3 PR #180 device pass bekliyor; Faz 1/2 kısmen) | Sıra farkı: Faz "önce engine (3-4)"; Five Stones "önce lesson-experience skeleton" | ROADMAP.md Taş 1 |
| **Taş 2 — Dış Tester Kapısı: Güvenlik+Hukuk** (~7 PR) | Faz 5 kararları (AI/privacy/monetization) + Faz 7 release kısmı | "Bu APK'yı tanımadığım birine verebilir miyim?" | Taş 1 kapısı | EAS env banner, ai-chat hardening, delete+export (PR #196/#197 alanı), disclosure, email confirm, Practice Hub v0, feedback kanalı | PARTIAL (privacy PR-H #196 merged; #197 paused; hub v0 açık) | Privacy iş Five Stones Taş 2 PR 11; Faz'da Faz 5 kararı + Faz 7 release — iki eksende dağılmış | ROADMAP.md Taş 2 |
| **Taş 3 — Tester Turu + Telemetri** | Faz 6 Telemetry v0 + içerik iterasyonu | "Hook kriterleri tutuyor mu?" (72s ikinci açılış · L1→L2 · hatırlanan cümle) | Taş 2 kapısı (APK dış tester'da) | Yeni özellik PR'ı YASAK; yalnız telemetri-güdümlü fix; 2-3 hafta kutu | NOT STARTED | Faz 6 "content marathon" ile Taş 3 "telemetry loop" örtüşür ama Faz sırası farklı | ROADMAP.md Taş 3 |
| **Taş 4 — Beta Cilası + Mağaza** (~9 PR) | Faz 6 (retrofit dalga 2, içerik) + Faz 7 (release/store) | "Play Store kapalı beta'ya koymaya utanır mıyım?" | Taş 3 kapısı | audio pipeline, aksan çubuğu, Comeback, Readiness Gate, L1 UI Faz 2, retrofit dalga 2, %-French metrik, prod profil + legacy temizlik, store varlıkları + Cairn marka taraması | NOT STARTED | Retrofit dalga 2 (L4-L15) hem Taş 4 PR 21 hem Faz 6; audio/paywall Faz 5'te ertelendi | ROADMAP.md Taş 4 |
| **Taş 5 — Deployment** (operasyon) | Faz 7 release hattı + public-beta stage | "Kapalı beta metrikleri açık kapıyı hak ediyor mu?" | Taş 4 kapısı | Play Console kapalı → açık beta; ertelemeler: exposure selector/instruction weave, paywall, iOS | NOT STARTED | Paywall yeri "Taş 5 sonrası" (ROADMAP) ↔ "Campfire ~L24" (Answers) → [[Monetization and Scope Boundaries]] | ROADMAP.md Taş 5 |

Semboller/statü kaynak: STATUS.md (build state), ROADMAP.md (Taş sırası), CAIRN_ROADMAP (Faz durumu: Faz 0-5 büyük ölçüde DONE, Faz 6 IN PROGRESS, Faz 7 NOT STARTED).

## Nerede genuinely hizalılar / nerede ayrışırlar

- **Hizalı:** ikisi de content-factory'yi gerçek darboğaz sayar; ikisi de audio/AI/paywall'ı **erteler**; ikisi de local-first + YASA 1/2/3'ü anayasa kabul eder; ikisi de dış-tester öncesi güvenlik+hukuk kapısı ister.
- **Farklı eksen:** Faz 0-7 = **ne inşa edilir** (engine → mastery → error → factory); Five Stones = **ne zaman doğrulanır/sevkedilir** (device → tester → beta). Biri "construction", diğeri "validation/deployment".
- **Sıra farkı:** Faz "önce motor (3-4), sonra içerik (6)"; Five Stones "önce lesson-experience skeleton (Taş 1), sonra tester (Taş 3)". Motor Faz'ları büyük ölçüde bitti; şu an aktif olan **Five Stones deployment sırası** (Taş 0 device gate).

## Decision Completeness Check (targeted pointer check)

> [!warning] Kural: listeyi tam göstermek için **yeni ADR uydurulmadı**; STATUS/ROADMAP'in
> zaten sahip olduğu kararlar **yeniden yazılmadı.** Yalnız pointer eksikliği raporlanır.

| Item | Exact source | Active Decisions points to it? | ADR exists? | Only pointer missing? |
|---|---|---|---|---|
| **K4** (karpathy.md import) | STATUS.md K4 | Evet (karpathy geçiyor) | **ADR-0010** (engine-purity contract) özü kapsar; K4 import-eylemi STATUS'un | Import-eylemi için ayrı ADR gereksiz; öz ADR-0010'da |
| **K6** (deriveDrill şablon copy tonu) | STATUS.md K6 + ROADMAP Taş 2 PR 14 | Hayır | **Yok** | **Pointer eksik** — STATUS/ROADMAP sahibi; ADR uydurma |
| **Exercise/screen-type freeze (~10)** | ROADMAP Taş 1 PR 3 + Açık Karar Kaydı ("tip seti donması ~10") | Kısmen (Decision Index dolaylı) | **Yok** | **Pointer eksik** — ROADMAP sahibi; [[Runtime Lesson Map]]/[[Exercise System Overview]] runtime 7-tip tarafını tutar |
| **Retrofit wave strategy** (Dalga 1/2) | ROADMAP Taş 1/4 + Açık Karar Kaydı | Evet (Decision Index) | **Yok** | Pointer var (Decision Index); ROADMAP sahibi |
| **First factory product = error-driven drill** (deriveDrill + practice selector v0, PR #179) | ROADMAP Açık Karar Kaydı + STATUS #179 | Evet | **ADR-0022** (hub-derived drills) | **Tam** — ek pointer gerekmiyor |
| **Tester data return/export path** | ROADMAP Taş 2 kapısı (tester_cohort consent VEYA export→WhatsApp) | Hayır | **Yok** | **Pointer eksik** — ROADMAP sahibi; [[Privacy and Data Deletion]] export tarafını tutar |

**Özet:** yalnız **first factory product** tam (ADR-0022). **K4** özü ADR-0010'da. **K6,
exercise-type freeze, tester-export** = pointer-eksik (STATUS/ROADMAP sahibi, ADR
uydurulmayacak). **Retrofit** = Decision Index'te pointer var.

> [!open-loop] Roadmap çakışmaları ve pointer eksikleri **OPEN** → [[05 Open Loops]] D8.
