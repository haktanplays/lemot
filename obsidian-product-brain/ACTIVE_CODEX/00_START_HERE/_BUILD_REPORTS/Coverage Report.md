---
title: Coverage Report
type: source-record
domain: meta
status: canonical
created: 2026-07-14
last_updated: 2026-07-17
last_reviewed: 2026-07-17
tags: [build-report]
---

# Coverage Report — v0.1

MASTER_FILE_INDEX'te planlanan her not yazıldı. Kapsama:

| Alan | Planlanan | Yazılan | Not |
|---|---|---|---|
| START_HERE | 10 + legend | ✅ 11 | + 6 build report |
| Product | 10 | ✅ 10 | |
| Learning System | 18 | ✅ 18 | Chip Taxonomy crown |
| Exercises | 20 | ✅ 20 | her egzersiz + 3 matris + anti-patterns |
| Syllabus | 27 | ✅ 27 | L0–L17 + L18-L24 + framework |
| Matrices | 13 | ✅ 13 | Spec-to-Runtime dâhil |
| Architecture | 14 | ✅ 14 | Runtime Content crown |
| Design | 16 | ✅ 16 | |
| Implementation | 15 | ✅ 15 | Spec Runtime Divergences crown |
| Decisions | 6 + ADR | ✅ 31 | 25 ADR + 6 index |
| Operations | 13 | ✅ 13 | promotion rules dâhil |
| Agent Context | 10 | ✅ 10 | Do Not Assume crown |
| Research/Ideas | 7 | ✅ 7 | |
| History | 10 | ✅ 10 | |
| Source Ledger | 6 | ✅ 6 | 46 kaynak satırı |
| Gaps | 5 | ✅ 5 | Contradictions crown |
| Templates | 9 | ✅ 9 | |

## Konu kapsaması (prompt §1 soruları)
Holy Codex'in "bu soruların hepsini cevaplar" listesindeki her madde bir ana
nota bağlandı ve o notta cevaplandı: ürün/söz/felsefe, ders akışı, Weave, chip
taxonomy (cümle-neden-chip-değil dâhil), L0≠L1, spine L1→L24, mastery/error/
lexique/daily-review, self-producing engine (aktif-mi ayrımı ile), veri akışı,
sync/privacy/deletion, product stage/flags, tasarım/V4, karar gerekçeleri,
açık/ertelenmiş fikirler, spec↔runtime uzlaşması, rol-bazlı okuma.

## Statü dağılımı (gözlem)
Notların büyük çoğunluğu `canon_status: canonical`; `implementation_status`
çoğunlukla `partial` veya `spec-only/fixture-only` (çünkü sevkedilen yüzey B
motorların çoğunu bağlamıyor); `verification_status` yalnızca Round 1 L0–L6
için `device-verified`, gerisi `source-inspected`/`unit-tested`. Bu, ürünün
gerçek olgunluğunun dürüst yansımasıdır.

## Yapısal kapsam güncellemesi — 2026-07-17

> [!warning] **Yapısal kapsam ≠ implementasyon derinliği.** Aşağıdaki sayım "ana
> ev var mı" (structural coverage) sorusunu ölçer; "politika/spec tamamlandı mı"
> (implementation depth) sorusunu **DEĞİL.** Her politika/spec'in tamamlandığı iddia edilmez.

Güncel Markdown-not sayısı (bu pass sonrası, ölçülen): **`ACTIVE_CODEX/` altında 249 not.**

| Alan | v0.1 | Şimdi | Değişim |
|---|---|---|---|
| Architecture | 14 | 15 | + Legal Compliance and Data Governance (skeleton) |
| Research/Ideas | 7 | 8 | + Measurement and Experimentation (skeleton) |
| Operations | 13 | 14 | + French Linguistic QA (skeleton) |

- Bu pass, üç eksik **yapısal ana ev** kurdu (legal/veri-yönetişimi, ölçüm/deney, Fransızca dil-QA).
  Her üçü de `status: skeleton`, `canon_status: provisional` — **iskelet, çözülmüş politika değil.**
- Ayrıca v0.2 online pass'i +2 not eklemişti (Naming and Brand Registry, Roadmap Crosswalk);
  v0.1 244 → 249 farkı bununla uzlaşır (244 + 2 + 3 = 249).
- **Derinlik boşlukları hâlâ açık:** hukuki kararlar, ölçüm şema/eşik/export derinliği ve
  Fransızca inceleyici/süreç kanıtı **OPEN** — bkz. [[Missing Documentation]] (MD12–MD15).
