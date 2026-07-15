---
title: Unmapped Ideas
aliases: [Yersiz Fikirler, Homeless Ideas, Unplaced Concepts]
type: open-loop
domain: meta
status: active
canon_status: proposed
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md", "docs/CAIRN_PRODUCT_ANSWERS_2026_07.md", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
related: ["[[Idea Inbox]]", "[[Future Features]]", "[[Missing Documentation]]", "[[Unknowns]]", "[[Deferred Decisions]]", "[[05 Open Loops]]"]
tags: [gap, idea, unmapped]
---

# Unmapped Ideas

<!-- gh-toc -->

## İçindekiler

- [I1 — Campfire Mode iç mekaniği](#i1-campfire-mode-iç-mekaniği)
- [I2 — A Small Moment](#i2-a-small-moment)
- [I3 — Instruction Weave (thermostat, not ladder)](#i3-instruction-weave-thermostat-not-ladder)
- [I4 — Word Graph](#i4-word-graph)
- [I5 — Spine narrowness R-A…R-E (Haktan bekliyor)](#i5-spine-narrowness-r-ar-e-haktan-bekliyor)
- [I6 — excusez-moi & state/feeling gap](#i6-excusez-moi-statefeeling-gap)
- [I7 — Staged mastery strictness](#i7-staged-mastery-strictness)
- [I8 — Additive remote schema (cohort tables)](#i8-additive-remote-schema-cohort-tables)
- [I9 — Post-beta genişleme fikirleri (Dev APK OUT-of-scope listesi)](#i9-post-beta-genişleme-fikirleri-dev-apk-out-of-scope-listesi)
- [I10 — Learner profil sonuçları (nerd hobbyist)](#i10-learner-profil-sonuçları-nerd-hobbyist)
- [I11 — Meet/Insight/Recap interaction upgrade (Faz B)](#i11-meetinsightrecap-interaction-upgrade-faz-b)
- [Nasıl kullanılır](#nasıl-kullanılır)
- [İlgili notlar](#ilgili-notlar)

> [!open-loop] Kaynaklar arasında geçen ama henüz **net bir evine (lesson / Daily Review /
> Practice Pool / Mon Lexique / post-beta / archive) oturmamış** fikirler. MASTER_PIPELINE
> Rule 5: "Every new feature needs a home." Buradakiler o evi bekliyor. Olgunlaşınca
> [[Idea Inbox]] / [[Future Features]] / ilgili spec'e taşınır.

## I1 — Campfire Mode iç mekaniği
Locked: L24'te paywall; ödemeyen learner "Campfire Mode"a girer — kendi owned words + error
tracking'ten GENERATED practice loop (C1 locked, hardcoded değil). Ama **ekran akışı, kaç
tur, hangi egzersiz tipleri, generation kaynağı** tanımsız. Ev: paid-zone/post-Campfire.
→ [[Monetization and Scope Boundaries]], [[Self-Producing Engine]].

## I2 — A Small Moment
Retention/usefulness ritüeli (chatbot DEĞİL); L16'da model-answer-only seed, ~L19 recurrence.
`phen:a-small-moment-seed` olarak temsil (yeni `read:`/`passage:` prefix'i coin ETME). Tam
lifecycle + reading-passage granularity açık (ID convention §12 open decision). Ev: integration
dersleri + reading. → [[Integration Lesson Logic]], [[L16 Integration and Small Moment]].

## I3 — Instruction Weave (thermostat, not ladder)
Uygulamanın kendi talimat sesi lexique-temperature ile Frenchleşir (english-guided → french-led),
soğursa geri döner (Comeback Mode). CANONICAL (D-26) ama implementation Faz D'ye ertelendi
(biriken lexique verisi gerekli). Ev: instruction/copy katmanı. → [[Copy and Tone]], [[Deferred Decisions]].

## I4 — Word Graph
`relatedItemIds` hafif adjacency var; tam Word Graph **post-beta**. Mon Lexique adjacency
görünümü, edge richness açık (ID convention open decision). Ev: post-beta Mon Lexique. → [[Mon Lexique]].

## I5 — Spine narrowness R-A…R-E (Haktan bekliyor)
Chip audit önerileri: R-A L1-L5 payload enrichment (smoke-bearing), R-B repair-kit canon,
R-C oui rehabilitation, R-D registry hygiene pass, R-E named landing slots. Hepsi PROPOSED,
operator kararı bekliyor. Ev: content batch (ayrı reviewed PR). → [[Chip Coverage Matrix]], [[Unknowns]] U9.

## I6 — excusez-moi & state/feeling gap
Spine narrowness: `excusez-moi` her L8+ sahnesi ister ama Future'a park edilmiş; `fatigué`/
`j'ai soif` birçok spec ister, hiçbiri ship etmemiş. Nereye/hangi derse gireceği açık. Ev:
payload enrichment. → [[Vocabulary Progression]].

## I7 — Staged mastery strictness
Near-miss'in ileri band'larda (L60/L70+), monolingual faz, yüksek promptFade, item maturity,
gelecek `accentCriticality` ile partial/full failure'a promote edilmesi — DOCUMENTED, NOT
IMPLEMENTED. Ev: mastery engine ileri sürüm. → [[Mastery Model]], [[Deferred Decisions]].

## I8 — Additive remote schema (cohort tables)
`le_*`/`learning_*` yeni tablolar (`testers`, `cohorts`, `learning_events` idempotent,
derived snapshot'lar); legacy `profiles`/`user_progress`/`user_errors`'a asla dokunma;
tek idempotent `ingest-events` Edge Function. PROPOSAL (design-only, unimplemented). Ev:
tester-cohort backend. → [[Sync Architecture]], [[Supabase]].

## I9 — Post-beta genişleme fikirleri (Dev APK OUT-of-scope listesi)
Word Graph, Dream Journal, Active Reading, Le Carnet, full Mon Lexique, advanced adaptive
engine — Dev APK canon "what not to build yet". Post-beta feature adayları, ev bekliyor. → [[Future Features]], [[Non-Goals]].

## I10 — Learner profil sonuçları (nerd hobbyist)
Founder Q&A: learner = mechanics-first nerd hobbyist (LearnCraft-inspired). Sonuç: insight
kartları "bir çentik daha derine" (yine conjugation tablosu yok), transaction-urgency düşer,
mechanics doorways (pronouns, mood logic) yükselir. Bu yönün **hangi derslere nasıl** uygulanacağı
henüz syllabus'a tam işlenmemiş. Ev: syllabus revizyonu. → [[Learning Philosophy]], [[Grammar Progression]].

## I11 — Meet/Insight/Recap interaction upgrade (Faz B)
Canon her ekranın "konuşmasını" ister (meet-card chip-tap to activate, recap tap-to-collect);
runtime'da statik Continue. Payload-level interaction upgrade Faz B PLANNED ama tasarım/scope
açık. Ev: v1 screen payload evrimi. → [[Meet]], [[Review]], [[Missing Documentation]] MD7.

## Nasıl kullanılır
Bir fikir bir eve oturunca (bir lesson spec'i, feature notu, ADR): oraya taşı, `related` ile
bağla, buradan çıkar. Bir fikir reddedilirse → [[Rejected Decisions]].

## İlgili notlar
- [[Idea Inbox]] · [[Future Features]] · [[Lesson Mechanics Ideas]]
- [[Missing Documentation]] · [[Unknowns]] · [[Deferred Decisions]] · [[05 Open Loops]]
