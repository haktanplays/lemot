---
title: Source of Truth Map
aliases: [Source of Truth, Precedence, Truth Map, Kaynak Otoritesi]
type: index
domain: meta
status: canonical
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-26
last_reviewed: 2026-07-26
source_of_truth: ["CLAUDE.md", "docs/STATUS.md", "docs/README.md", "docs/MASTER_PIPELINE_v1.2.1.md"]
related: ["[[CAIRN_PROJECT_CANON_MAP_v1.0]]", "[[06 Canon and Status Legend]]", "[[Source Ledger]]", "[[Contradictions]]", "[[00 Le Mot Holy Codex]]"]
scope_amended_by: "Cairn Project Canon Map v1.0 — founder decision Q1 (2026-07-26)"
tags: [index, precedence, truth]
---

# Source of Truth Map

> [!important] **Scope amended 2026-07-26.**
> **Global, cross-domain routing is governed by the Cairn Project Canon Map v1.0**
> (`docs/canon/CAIRN_PROJECT_CANON_MAP_v1.0.md`).
>
> **Bu not current-build execution scope'u yönetir:** şu an ne inşa ediliyor, aktif branch/release
> neye dokunabilir, ve hangi kaynak **mevcut implementation gerçeğini** bildirir.
>
> **"Cairn ne olmalı?"** türü sorular Project Canon Map üzerinden **Canonical domain owner**'a
> yönlendirilmelidir (Product Brain v1.0 · Content Bible v1.0 · Social Layer Charter v1.0 ·
> gelecekteki Canonical owner'lar).
>
> **Bu not hiçbir implementation authority vermez.**

> [!canon] "En yeni tarih otomatik kazanır" kuralı **tek başına yanlıştır.**
> Otorite katmana göre belirlenir: hangi kaynak hangi katmanı kontrol eder?

## Otorite sırası — current-build execution scope (yüksek → düşük)

1. Repo'daki açık **locked/current canon** (`CLAUDE.md`, `docs/STATUS.md`, `docs/DEV_APK_MVP_CANON.md`)
2. Mevcut **kaynak kod** ve kayıtlı runtime davranışı
3. Mevcut **testler** ve validator'lar
4. Merged **implementation raporları** / STATUS / handoff dokümanları
5. Mevcut **planlama/spec** dokümanları (Cairn v1.0 spec, LESSON_FLOW_CANON, learning-engine-v1)
6. **Tarihsel** ürün notları ve eski handoff'lar
7. **Prompt logları**, brainstorm, ham tartışma, arşiv alternatifleri

## Çatışma kuralı

> **Newer active canon > current codebase canon > older active canon > design reference > archive.**
> Ama katman farkına dikkat: bir spec (katman 5) bir runtime gerçeğini (katman 2)
> ezmez; ikisi çelişiyorsa **spec plandır, kod gerçektir** — sapmayı
> [[Spec Runtime Divergences]]'e yaz.

## Cairn current-build zinciri (yalnızca current-build execution scope için bağlayıcı)

```
CLAUDE.md → docs/STATUS.md → docs/DEV_APK_MVP_CANON.md → Cairn v1.0 spec
```

> [!warning] Bu zincir **global product/canon precedence zinciri DEĞİLDİR** ve
> **Product Brain v1.0, Content Bible v1.0, Social Layer Charter v1.0, Project Canon Map v1.0**
> veya gelecekteki Canonical domain owner'ların etrafından dolaşmak için kullanılamaz.

- Şu an **inşa edilen** bir şey için: current-build canon (STATUS + DEV_APK_MVP_CANON)
  Cairn v1.0 spec'i **yener** (spec intent'tir, build authority değil).
- v0.1 Cairn docs (`CAIRN_PRODUCT_DEFINITION_v0.1`, `CAIRN_PRODUCT_SYSTEM_MAP_v0.1`)
  = **SUPERSEDED reference.** [[Superseded Specs]].

## Katman → hangi soru için hangi kaynak

| Soru | Otorite kaynağı |
|---|---|
| "Ürün ne yapmalı?" | **Product Brain v1.0** (Project Canon Map üzerinden) |
| "Ders nasıl yazılmalı?" | **Content Bible v1.0** |
| "Bir kavram ne zaman tanıtılmalı?" | **Curriculum Bible** — `DEPENDENCY — DOCUMENT NOT YET AUTHORED` → dur ve bildir |
| "Kanıt/mastery ne sayılır?" | **Mastery & Evidence Bible** — `DEPENDENCY — DOCUMENT NOT YET AUTHORED` → dur ve bildir |
| "Sosyal etkileşim?" | **Social Layer Charter v1.0** |
| "Teknik/system kararı?" | ilgili kabul edilmiş **ADR**'ler (kendi domain'i içinde) |
| "Şu an ne çalışıyor?" | kaynak kod + testler + STATUS.md + implementation evidence |
| "Current-build scope nedir?" | **STATUS.md + DEV_APK_MVP_CANON.md** |
| "Doğrulandı mı?" | testler + cihaz smoke (STATUS) |
| "Ders akışı spec ↔ runtime karşılaştırması?" | LESSON_FLOW_CANON_v1 (spec) ↔ `LessonRendererV1` (kod) |
| "Bu karar neydi?" | [[Decision Index]] + status/* checkpoint'ları |
| "Tarihçe?" | [[90 History Index]] |

## Bilinen stale tuzaklar

> [!warning] Bunları güncel sanma (kaynak: MASTER_PIPELINE §2.5 + kanıt):
> - **CLAUDE.md gövdesindeki v7 24-lesson / L14 paywall / XP-streak** dili aktif değil — banner bunu söyler.
> - **Merged Product Canon 2026-05-11** top-level aktif kanon değil (PARTIALLY HARVESTED).
> - **STATUS.md "7 lessons"** `91f1b04` bayat snapshot'ı (gerçek: 16 dosya).
> - **Sprint 11 recommended shape** aktif sprint planı değil.

Tam kaynak envanteri: [[Source Ledger]]. Çelişkiler: [[Contradictions]].
İki roadmap'in (Five Stones ↔ Faz 0–7) hangisi hangi soruyu kontrol eder: [[Roadmap Crosswalk]].
