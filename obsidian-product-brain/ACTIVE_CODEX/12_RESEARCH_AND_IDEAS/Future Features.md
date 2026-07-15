---
title: Future Features
aliases: [Gelecek Özellikler, Planned Features, Deferred Features]
type: research
domain: product
status: idea
canon_status: proposed
implementation_status: not-started
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/KNOWN_GAPS.md", "docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/ROADMAP.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Sprint_12_Plan_2026-05-16.md"]
related: ["[[Idea Index]]", "[[Deferred Decisions]]", "[[Monetization and Scope Boundaries]]", "[[AI Role and Guardrails]]", "[[Mon Lexique]]"]
tags: [idea, research, product, deferred]
---

# Future Features

<!-- gh-toc -->

## İçindekiler

- [Paywall / Campfire (~L24)](#paywall-campfire-l24)
- [Word Graph](#word-graph)
- [Mon Lexique runtime + 6-band UI](#mon-lexique-runtime-6-band-ui)
- [Audio / TTS / shadowing layer](#audio-tts-shadowing-layer)
- [AI activation package](#ai-activation-package)
- [Remote sync / tester cohort (bağlamsal)](#remote-sync-tester-cohort-bağlamsal)
- [Kaynak içe aktarımı (Open Questions / Backlog / Tech-Privacy / Sprint 12)](#kaynak-içe-aktarımı-open-questions-backlog-tech-privacy-sprint-12)
- [Ortak kural](#ortak-kural)
- [İlgili Notlar](#ilgili-notlar)

> [!warning] Hepsi **PLANNED veya DEFERRED** — hiçbiri dev-apk scope'unda değil, hiçbiri "hemen yapılacak".
> Her özellik bir **eve** (Rule 5) ve bir statüye bağlı. Bir agent bunları kanon/hazır sanmamalı;
> çoğunun kodu ya yok ya var-ama-bağlı-değil.

## Paywall / Campfire (~L24)
- **Ev:** Monetization / post-L20 journey. **Statü:** DEFERRED/PROPOSED (Taş 5 sonrası ayrı karar gate).
- Cairn: **Campfire ~L24** soft gate, L1–L20 free. Legacy "L14 / $12.99" **SUPERSEDED**. Paywall kodu karantinada
  (`FEATURES.paywall=false`), RevenueCat public-beta'da eklenir. Campfire = sahiplenilen envanterden + error tracking'den
  practice üreten "gather-round" anı (hardcoded değil, D-37). (Hafif gerilim: spec §66.3 pozisyonu validation-sonrası yeniden karar.)
- Ana ev: [[Monetization and Scope Boundaries]] · karar D-30. [DEFERRED]

## Word Graph
- **Ev:** Post-beta. **Statü:** DEFERRED.
- Adjacency / connected knowledge katmanı (Mon Lexique'in ötesinde). Mon Lexique canonical item-ID convention'a hizalanır;
  Word Graph edge zenginliği açık karar. Ana ev: [[Mon Lexique]] · [[Registry Architecture]]. [DEFERRED/post-beta]

## Mon Lexique runtime + 6-band UI
- **Ev:** Learning system (selector wiring + UI). **Statü:** DEFERRED (kod var, dev-apk'te gizli/bağlı değil).
- Mon Lexique = itemId-driven, `MasterySnapshot`'tan **selector-derived VIEW** (ayrı wordbook DEĞİL). P4.1–P4.6 code-side
  complete; runtime dev-apk'te gizli (`monLexique` flag off). Lexique Memory selector wiring + constant tuning + 6-band UI = açık iş.
- Ana ev: [[Mon Lexique]] · KNOWN_GAPS #2. Karar D-24/D-35. [DEFERRED/not-wired]

## Audio / TTS / shadowing layer
- **Ev:** Cross-cutting content (Faz 6). **Statü:** DEFERRED (KNOWN_GAPS #1).
- Kayıtlı human audio pipeline + early shadowing (D-37 free-tier sözünün parçası). Bugün TTS yalnızca French-only,
  placeholder speech yok (Weave placeholder'ları konuşmaz). Recorded pipeline ertelendi. Ana ev: [[Read and Listen]] · [[Interaction Patterns]]. [DEFERRED]

## AI activation package
- **Ev:** AI Architecture (server + client + privacy). **Statü:** DEFERRED (D-33).
- AI çekirdek değil; **dormant.** Aktivasyon için tam paket gerekir: auth-light identity, server-side quota,
  günlük token tavanı, rate limit, routing kararı, fallback doğrulama, privacy/consent yüzeyi. AI learner-critical
  grading'de asla; unauthenticated endpoint yok. Edge Functions hardened (PR-C) ama **enabled değil** (`aiEnabled` yalnız sandbox).
  `ai_assisted` error id'leri v0'da fire etmez. Ana ev: [[AI Role and Guardrails]] · [[AI Architecture]]. KNOWN_GAPS #6/#8/#9. [DEFERRED]

## Remote sync / tester cohort (bağlamsal)
- **Ev:** Architecture (Supabase `le_*`/`learning_*` şeması). **Statü:** PROPOSED (design-only, unbuilt).
- Additive `le_*` tablolar (`tester_profiles`/`tester_consents`/`learning_events` raw mirror), owner-scoped RLS,
  consent-gated ingest, idempotent `client_event_id`, no client `service_role`. Legacy `profiles`/`user_progress`/`user_errors`'a
  asla dokunmaz. Deploy operator-only. Ana ev: [[Sync Architecture]] · [[Privacy and Data Deletion]]. Karar D-40. [PROPOSED]

## Kaynak içe aktarımı (Open Questions / Backlog / Tech-Privacy / Sprint 12)

> [!warning] **Sprint 12 planı SUPERSEDED — aktif scope DEĞİL.** Kaynak `Sprint_12_Plan_2026-05-16.md` notunun
> kendisi başında "Status: Superseded. Do not use as current canon" der. Burada yalnız **niyet/köken** özeti tutulur;
> güncel repo kanonu (HEAD #196, learning-engine) bağlayıcıdır. Bir agent bunu yapılacak iş sanmamalı.

### Sprint 12 niyeti (2026-05-16, tarihsel — özet)
- **North Star:** Legacy Dev APK ders sistemini **yeniden yazmadan**, yanına **tipli içerik motoru iskelesi** kurmak;
  bir feature flag arkasında (`FEATURES.v1LessonEngine`, sandbox-only) **v1 Lesson 0 + Lesson 1 (Je suis)** uçtan uca kanıtlamak.
- **Kapsam dışı (o zaman):** 24 legacy dersi migrate etmek, Campfire/RevenueCat, Word Graph, 9-section public player, Mon Lexique Basic UI.
- **Mimari kabuk:** ayrı `content/` namespace, ayrı `/v1-lesson/[id]` route, `lm7_v1_*` storage namespace, tek flag — legacy `data/`/`components/sections/` **dokunulmadan**.
- **D1–D6 kilitleri (tarihsel):** D1 ayrı route; D2 Mon Lexique yalnız storage/hook (UI Sprint 13); D3 sandbox-only, tester'a açılmaz; D4 legacy sunset = yalnız "Sprint 15/16 review checkpoint", silme taahhüdü değil; D5 Daily Review Sprint 13'e; D6 v1 L0/L1 içeriği user onayı olmadan final değil.
- **Not:** Bu köken, bugünkü **learning-engine** foundation'ının erken tohumudur; ama kaynak SHA'ları (`658a321`, `df4d074`, `622c43b`), "MMKV" ifadesi (aslında `expo-sqlite/kv-store`) ve WS numaraları **bayat/tarihsel**. Güncel durum için [[03 Current State]] · [[05 Open Loops]].

## Ortak kural
> [!warning] Bir özellik buradan çıkıp yapılacaksa: önce **Operator kararı** (ADR'ye taşı), sonra bir **ev** doğrula,
> sonra dev-apk scope'unu ihlal etmediğini kontrol et ([[Dev APK Scope]]). "Kod var" ≠ "bağlı" ≠ "sevkedildi".

## İlgili Notlar
- [[Idea Index]] · [[Deferred Decisions]] · [[Product Context Pack]]
- [[Monetization and Scope Boundaries]] · [[Mon Lexique]] · [[AI Role and Guardrails]] · [[Sync Architecture]]
