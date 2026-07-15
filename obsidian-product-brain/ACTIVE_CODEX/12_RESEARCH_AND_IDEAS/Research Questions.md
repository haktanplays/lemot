---
title: Research Questions
aliases: [Araştırma Soruları, Open Questions, Pedagogy Questions]
type: research
domain: meta
status: idea
canon_status: proposed
implementation_status: not-started
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/architecture/l0-l24-founder-build-matrix-v0.md", "docs/KNOWN_GAPS.md", "docs/canon/LESSON_FLOW_CANON_v1.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Open_Questions.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tech_and_Privacy_Decisions.md"]
related: ["[[Idea Index]]", "[[05 Open Loops]]", "[[Difficulty and Cognitive Load]]", "[[Level and Band Map]]", "[[Experiments]]"]
tags: [idea, research, open-question]
---

# Research Questions

> [!warning] **Açık pedagoji ve mimari soruları — cevaplanmadı.** Bunlar fikir değil, **karar/araştırma gerektiren
> boşluklar**. Bir agent bunlara bir cevap **uydurmamalı**; ilgili karar açılana kadar ilgili open-loop'a bağlı kalır.

## Pedagoji

1. **Futur-proche free-tier tuning** — L18 preview'i ne kadar güçlü olmalı? Band map'in **#1 açık riski** (paywall pozisyonu DEĞİL, o settled). Futur proche = free PREVIEW / paid-zone owned. → [[Level and Band Map]] · [[L18-L24 Roadmap]]. [OPEN]
2. **Completion strictness** — bir dersin/section'ın "tamamlandı" tanımı nedir? Completion'ın canonical **birimi** ne? (D6, founder-build matrix). → [[Mastery Model]] · [[05 Open Loops]]. [OPEN]
3. **L21–L23 içeriği** — açık karar D2. Adaylar: review/Time-light expansion, human-context expansion, Campfire on-ramp. Hiçbiri seçilmedi. → [[L18-L24 Roadmap]]. [UNKNOWN]
4. **Repair-kit canon** — repair pair (`je ne comprends pas` / `vous pouvez répéter ?`) nereye, hangi statüde girer? L13 onu owned varsayıyor ama shipped değil (spec-vs-shipped tutarsızlık). Audit R-B. → [[Watchlist]]. [OPEN]
5. **Difficulty spike L2–L3** — retrospektif iki ~42-item dersi ve L3'ün 3-skill bundle'ını flag'ledi. Yeniden dengeleme gerekli mi? → [[Difficulty and Cognitive Load]]. [OPEN]
6. **A Small Moment granularity** — reading-passage'ı `sent:l16-…` linkli parçalardan compose et; `read:`/`passage:` prefix'i **henüz coin etme**. Ritüel `phen:a-small-moment-seed` olarak temsil edilir. Doğru granülerlik açık. → [[Vocabulary Progression]]. [OPEN]

## Mimari / veri

7. **Progress bridge** — Home/Progress/Daily Review `lm7`'den engine projeksiyonlarına ne zaman/nasıl geçer? Daily Review ne zaman available olur? Progress legacy 24-lesson/264-section taksonomisini ne zaman bırakır? → [[Data Flow]] · [[05 Open Loops]]. [OPEN]
8. **itemId runtime separator** — colon (`chunk:je-voudrais`) vs mevcut hyphen (`chunk-je-voudrais`); `itemRegistry.ts` migration zamanlaması (post-smoke). D7. → [[Registry Architecture]]. [OPEN]
9. **`userAnswer` redaction** — remote şemada raw answer text (HIGH PII) redaction politikası açık. → [[Privacy and Data Deletion]]. [OPEN]
10. **Cloud deletion path** — synced kullanıcı için local "reset" = sahte silme (C1, KVKK/GDPR). DELETE RLS + client delete path gerekir. → [[Privacy and Data Deletion]]. [OPEN]
11. **İki roadmap uzlaşması** — `CAIRN_ROADMAP_202607.md` (Faz 0–7) vs `ROADMAP.md` ("Five Stones") açıkça uzlaştırılmadı. → [[Commit and Milestone Timeline]] · [[03 Current State]]. [OPEN]

## Kaynak içe aktarımı (Open Questions / Backlog / Tech-Privacy / Sprint 12)

> [!warning] 2026-05/2026-06 özel `Open_Questions.md` + `Tech_and_Privacy_Decisions.md` notlarından içe aktarılan
> **açık teknik bilinmeyenler**. Cevaplanmadı; güncel repo kanonunu (HEAD #196) geçersiz kılmaz. Ayrıntılı takip ve
> "sonraki karar sahibi" etiketleri [[05 Open Loops]] "Kaynak içe aktarımı" bölümündedir.

12. **Android TTS çok-cihaz güvenilirliği** — tek cihazda (2026-06-29) OK; geniş cihaz yelpazesinde platform-spesifik davranış açık. TTS güvene merkezi. → [[05 Open Loops]] Q-IN5. [OPEN]
13. **AI feedback guardrail'ları** — AI sandbox'tan çıkmadan önce hangi hallucination/fallback kısıtları zorunlu (görülmemiş form öğretmeme, scope uydurmama)? → [[AI Role and Guardrails]] · [[05 Open Loops]] Q-IN6. [OPEN]
14. **chip / `piecesUsed` validator metriği** — kapsam bir build-time validator metriği olmalı mı (missing-chip regresyon koruması)? Runtime değil, tooling. → [[Validation Gates]] · [[05 Open Loops]] Q-IN7. [OPEN]
15. **Backend platformu (Cloudflare vs Supabase)** — validation gerçek gereksinim yaratana dek kilitlenmez. → [[Privacy and Data Deletion]] · [[05 Open Loops]] Q-IN8. [OPEN]
16. **Analytics event schema** — hangi olaylar, hangi şema, amaca-yönelik/gözetim-değil sınırıyla. → [[05 Open Loops]] Q-IN9. [OPEN]
17. **Account / auth timing** — hesap/kimlik ne zaman devreye girer (privacy/consent yüzeyini tetikler). → [[Privacy and Data Deletion]] · [[05 Open Loops]] Q-IN10. [OPEN]
18. **Tester consent wording + data retention** — rıza metni ve saklama politikası; KVKK/GDPR ile bağlı. → [[Privacy and Data Deletion]] · [[05 Open Loops]] Q-IN11/Q-IN12. [OPEN]

> [!note] `pret`/`prête` treatment, "What was Weave?" kartı ve repeated-answer nudge **pedagoji/ürün** soruları
> olduğundan [[05 Open Loops]] (Q-IN1–Q-IN4) altında; buraya yalnız **teknik/mimari bilinmeyenler** taşındı.

## Nasıl kapatılır
Bir soru cevaplandığında: Operator kararı → ADR ([[Decision Index]]) veya deferred nota taşı → burada `resolved`
işaretle ve karara link ver. Cevabı vault içine yaymadan önce ana evi güncelle.

## İlgili Notlar
- [[Idea Index]] · [[Experiments]] · [[Watchlist]]
- [[05 Open Loops]] · [[Deferred Decisions]] · [[Level and Band Map]]
