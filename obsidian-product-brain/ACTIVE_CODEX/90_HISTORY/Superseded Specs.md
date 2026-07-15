---
title: Superseded Specs
aliases: [Superseded Documents, Değiştirilmiş Spec'ler, Archive Specs]
type: historical
domain: history
status: active
canon_status: superseded
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/README.md", "docs/audits/2026-07-08-final-loop-audit.md", "docs/audits/2026-07-09-loop-audit-v2.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[History Index]]", "[[Historical Canon Map]]", "[[Superseded Decisions]]", "[[Known Gaps]]"]
supersedes: []
superseded_by: []
tags: [history, superseded, specs, audits]
---

# Superseded Specs

> [!historical] Bu not, artık **birincil kaynak olmayan** spec/doküman ve audit'leri
> tek yerde toplar. Her madde `superseded_by` ile güncel karşılığına bağlanır.
> Hiçbiri fiziksel silinmedi — reading-guide banner ile korunuyor. **Aktif diye
> okuma.**

## 1. Cairn v0.1 dokümanları — SUPERSEDED by v1.0

> [!historical] superseded_by: Cairn v1.0 spec → [[Product Vision]], [[System Architecture]].

- `CAIRN_PRODUCT_DEFINITION_v0.1.md` — vizyon referansı. Top-line **SUPERSEDED
  (2026-07-02)** banner taşır.
- `CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` — sistem-index referansı. Aynı banner.
- İkisi de `CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` tarafından gömüldü:
  "The v0.1 Cairn docs … are superseded by this document." v1.0 "v0.1/v0.2/v0.3
  synthesis docs"ları da supersede eder.
- **Nüans:** v0.1 hâlâ **directionally aligned** (yön olarak uyumlu) — örn. "fear
  of speaking" promise'i, "mistakes are data" felsefesi güncel yönle çelişmez;
  ama **çatışma halinde v1.0 kazanır** ve v0.1 build authority değildir.

## 2. Cairn v1.0 spec'in kendi iç-superseded bölümleri

> [!warning] v1.0 spec'in **içinde** de tarih var: **§48–64 win over §31–47**;
> **§47 superseded by §64**. Eski sentez bölümleri fiziksel silinmedi, reading-
> guide banner ile "§48–64 kazanır" denerek korundu (KNOWN_GAPS #7). v1.0'ın
> kendisi de "intent layer"dır — güncel build için Dev APK canon + STATUS kazanır
> ([[08 Source of Truth Map]]).

## 3. Merged Product Canon 2026-05-11 — PARTIALLY HARVESTED

> [!historical] superseded_by: v1 Canon TOP / [[Product Vision]] / [[Historical Canon Map]].
- **Durum: kısmen hasat edildi, tamamen atılmadı.** Kabul: MC.1 / MC.2 / MC.4 /
  MC.5 / MC.6. Değişen: MC.3 revised · MC.7 re-homed · MC.8 re-mapped. İptal:
  MC.9 cancelled (2026-05-16 Tier B lock ile).
- Kural: **aktif kararlar için okunmaz.** Ham kopya operator vault'ta →
  [[Missing Source Inputs]].

## 4. Eski sprint planları — SUPERSEDED

> [!historical] `docs/STATUS.md`-tabanlı sprint state kazanır → [[Sprint Timeline]].
- "Sprint 10 / 11 / 12" dili ve `SPRINT_11_PLAN.md` **stale**; `docs/STATUS.md`
  tek sprint-state kaynağı (D1 fix). CLAUDE.md'nin "Sprint 10 IN PROGRESS"
  ifadesi D1 staleness tuzağıydı.
- Sprint 11 reframe (11-section → 9) hiç uygulanmadı → [[Historical User Journeys]].
- Erken 5-ders Round-1 draft (Je suis / C'est / Non / J'ai / integration) →
  L1–L6 spine tarafından superseded → [[Historical Syllabus]].
- Fail-open sandbox stage fallback → fail-closed → dev-apk (#104) tarafından
  superseded → [[Product Stages and Feature Flags]].

## 5. İki loop audit dokümanı — nokta-atışı review'lar, kendileri kod fix'lemez

Bu iki audit **spec değil**, belirli bir commit'te alınmış **review fotoğrafıdır**;
bulguları güncel [[Known Gaps]] / [[Technical Debt]]'e reconcile edildi. Audit
dokümanları tarihseldir (bir anın kaydı), bulgu envanteri kısmen açık kalır.

### 5.1 — 2026-07-08 Final 2-round loop audit
> [!historical] Kaynak: `docs/audits/2026-07-08-final-loop-audit.md`.
- **Ne:** 20-lens security/correctness/reliability review, tüm `lemot-app` (286
  dosya); iki round parallel audit (9 audit) + manuel backend/security pas; ~20
  bulgu el-doğrulama; false-positive filtre; KNOWN_GAPS ile reconcile. "Saturated".
- **Bulgular:** 24 issue **B1–B24** (HIGH: B1 BuildSentence double-count, B2 `lm7`
  corrupt→silent reset, B3 event-log corrupt→destroyed, B4 server-side AI rate-
  limit yok / open LLM relay [latent], B22 shipped content ≈unvalidated / canonRules
  dead code). Temiz/güçlü: 3 tabloda RLS doğru, `service_role` yok, injection sink
  yok, fail-closed stage, yüksek kaliteli v1 content data.
- **Plan:** PR-A…PR-G önerildi. **Sadece PR-A (B2+B3 data-loss hardening) uygulandı**;
  gerisi sıralanıp açık bırakıldı.

### 5.2 — 2026-07-09 Loop audit v2
> [!historical] Kaynak: `docs/audits/2026-07-09-loop-audit-v2.md`.
- **Ne:** İkinci tam loop audit, `main @ 4b68f4c` (post #188–#193). 8 parallel lens
  (5 tamamlandı, 4 session-cap'te öldü ama convergence ile kapsandı); B1–B24'ü
  atlayıp son merge'lenen koda vurması söylendi. HIGH/MED saturated; LOW-tail deferred.
- **B1–B24 reconciliation:** **24'ten 15'i düzeltildi** (#188–#194). Açık kalan:
  B5, B10, B13, B14, B17, B18, B20, B24 (+ B22 residual). PR-E engine-correctness
  slice **COMPLETE** (B7/B12 #193; B8/B23 #194).
- **Net-new C-series (C1–C30):** HIGH — **C1** cloud-data deletion path yok (synced
  user için local "reset" = false erasure, KVKK/GDPR), **C2** `__corrupt` blob'lar
  reset+export'ta ham PII orphan eder (B9'u reopen eder), **C3** edge validation/
  rate-limit test-guard yok, **C4** cloud-merge modül-private + untested +
  `hasPulled` user değişince reset olmuyor (B5). MED: C5–C15 kümesi. Engineering
  scorecard: genel **B+**.
- **Plan:** PR-H…PR-O sıralandı; audit kendisi kod fix uygulamaz. (Sonrası: PR-H/
  #196 local reset/export coverage indi; PR-E complete doğrulandı.)

## 6. Diğer superseded izler

> [!historical]
- **v7 24-lesson / 11-section / L14 paywall / "for English speakers"** — legacy,
  CLAUDE.md gövdesinde "for reference"; superseded_by [[Historical Syllabus]],
  [[Historical User Journeys]].
- **`streak` kolonu** — `schema.sql`'den düşürüldü ama deployed DB'de olabilir
  (migration public-beta'ya deferred); "streak UI'a döner" çıkarımı yapma.
- **Model-routing tablosu (Claude Haiku)** — gerçek provider zinciriyle çelişir →
  [[Historical Architecture]].

## Related Notes
- Yukarı: [[00 Le Mot Holy Codex]] · [[History Index]]
- Güncel karşılıklar: [[Known Gaps]] · [[Technical Debt]] · [[Superseded Decisions]] · [[Product Vision]]
- Kardeş: [[Historical Canon Map]] · [[Historical Syllabus]] · [[Historical Prompt Logs]]
