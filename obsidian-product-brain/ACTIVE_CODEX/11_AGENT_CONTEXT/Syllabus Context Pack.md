---
title: Syllabus Context Pack
aliases: [Syllabus Pack, Müfredat Paketi]
type: handoff
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/lesson-spec-template-v1.1.md", "docs/syllabus/lesson-archetype-templates-v1.md", "docs/architecture/l0-l24-founder-build-matrix-v0.md", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
related: ["[[Canonical Context Pack]]", "[[Syllabus Overview]]", "[[Lesson Status Matrix]]", "[[Chip Taxonomy]]", "[[Content Production Workflow]]"]
tags: [agent, context, syllabus]
---

# Syllabus Context Pack

<!-- gh-toc -->

## İçindekiler

- [Spine durumu (L0 → L24)](#spine-durumu-l0-l24)
- [Authored ≠ visible (en önemli sayı gerçeği)](#authored-visible-en-önemli-sayı-gerçeği)
- [L0 ≠ L1 (D-06)](#l0-l1-d-06)
- [Round 1 spine (D-07, LOCKED)](#round-1-spine-d-07-locked)
- [Chip kuralı (D-04)](#chip-kuralı-d-04)
- [Split-sense açılış (büyük fiiller için tekrarlı desen)](#split-sense-açılış-büyük-fiiller-için-tekrarlı-desen)
- [On kanon ders bölümü (spine)](#on-kanon-ders-bölümü-spine)
- [Integration ritmi](#integration-ritmi)
- [itemId convention (v0.1, PLANNING-ONLY)](#itemid-convention-v01-planning-only)
- [L1–L15 chip audit (verdict: CLEAN_WITH_REVIEW_ITEMS)](#l1l15-chip-audit-verdict-cleanwithreviewitems)
- [Content Factory (D-25, CANONICAL v0.1)](#content-factory-d-25-canonical-v01)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] Ders/chip/L-numarası işi yapan ajanın bağlam paketi. **Spec'ler planlama kanonudur**
> ("hiçbir kod/flag/runtime değişimi yetkilendirmez") — bir runtime dosyasının var olması, spec'in
> tam içeriğinin sevkedildiği anlamına gelmez. Ana evi: [[Syllabus Overview]].

## Spine durumu (L0 → L24)
- **L0–L5 LOCKED** (tam lesson-spec'ler).
- **L6–L17 documented** (spec / compact-spec + gate-review).
- **L18–L20 provisional** (band map Option C).
- **L21–L23 unspecified** (açık karar D2).
- **L24 Campfire** landmark (~soft gate). Ana evi: [[Level and Band Map]] · [[L18-L24 Roadmap]].

## Authored ≠ visible (en önemli sayı gerçeği)
`content/lessons/v1/` = **16 dosya L0–L15**, hepsi `V1_LESSONS`'da kayıtlı ve valide.
**Learner-visible: L0–L6.** L7–L15 **kayıtlı ama Home-gated** (`app/(tabs)/index.tsx` filtre
`number >= 1 && number <= 6`). L7–L15 **compact/de-scoped** yöne inşa edildi, tam spec'lere değil.
L16–L17 **spec-only** (dosya yok). STATUS.md "7 ders" = bayat. Ana evi: [[Runtime Lesson Map]] · [[Lesson Status Matrix]].

## L0 ≠ L1 (D-06)
L0 = **first-use bridge**, mastery değil, "Lesson 1" değil. Sadece bridge exposure (bonjour /
je voudrais un café / s'il vous plaît / merci); request sistemini **öğretmez** (onu L1 sahiplenir).
Numaralı spine **L1'de** başlar. L0 = hardcoded `app/lesson-zero.tsx`. Ana evi: [[L0 The First Step]].

## Round 1 spine (D-07, LOCKED)
L1 Survival Kit · L2 Être · L3 Non (ne…pas / yes-no intonation / tu-vous) · L4 J'ai (avoir-state) ·
L5 Un/une (article packages) · L6 Un petit moment (integration payoff). L7 (Aller) Round 1 dışı, sonraki.
Sert kısıtlar: L3 intonation-only (inversion yok); L5 packages-only (plural/partitive/gender-rule yok). Ana evi: [[Syllabus Design Rules]].

## Chip kuralı (D-04)
**CHIP = sahiplenilen üretim parçası.** **Full-sentence chip YOK, full-question chip YOK.**
İzinli: formula/survival-formula chunk'ları (`je ne comprends pas`) + noun *paketleri* (`un café`;
gender kural değil paket olarak girer). `PROTECTED_CHUNKS` 2'de donuk (`je ne suis pas`, `ce n'est pas`).
Model/anchor cümleler = "model-answer-only, asla chip". Ana evi: [[Chip Taxonomy]] · [[Whole First, Unpack Later]].

## Split-sense açılış (büyük fiiller için tekrarlı desen)
Bir dar anlamı sahiplen, komşuları ertele: L7 aller=movement, L9 faire=small-action, L11 pouvoir=help/permission,
L15 devoir/falloir=light obligation. Ana evi: [[Grammar Progression]] · [[Phenomena Progression]].

## On kanon ders bölümü (spine)
**Meet It → Notice the Pieces → Why This Works → Try It → Weave It → Shape It → Say It Your Way →
Natural Reveal → Stay With It → Lesson End.** "Use It" yalnızca iç şemsiye etiket; **Mini Mission'ı diriltme.**
Ana evi: [[Lesson Flow]] · [[Lesson Anatomy]].

## Integration ritmi
2 yeni engine → 1 integration (L11–L12→L13; L14–L15→L16; L17–L18→L19). Asla >2 ardışık yeni-engine.
Integration: A~0–4 active-new (çoğu recycled). Preview-hook = **ownership DEĞİL** (recognition-only). Ana evi: [[Integration Lesson Logic]].

## itemId convention (v0.1, PLANNING-ONLY)
Going-forward `prefix:slug` (`chunk:je-voudrais`); runtime bugün provisional `type-slug` (`chunk-je-voudrais`).
ASCII-only slug (`café→cafe`, `j'ai→j-ai`); homograph sense-suffix (`word:ou-where` vs `word:ou-or`;
`word:y-place`, `chunk:il-y-a` ayrı). Migration = post-smoke açık karar. Ana evi: [[Vocabulary Progression]].

## L1–L15 chip audit (verdict: CLEAN_WITH_REVIEW_ITEMS)
80 chip / 16 ders: **sıfır ihlal** (full-sentence/question/protected-chunk). Sayılar: registry **52 row**,
**41 used** (26 active/11 supported/4 recognition), **11 dormant**. Açık review/watch item'ları (R1–R12) →
[[Watchlist]]. Spine narrowness: darlık **payload'da, spine'da değil** (~1.5 payload/engine); 4 fonksiyonel boşluk
(repair pair, oui paradox, excusez-moi, state/feeling gap) — R-A…R-E öneriler **Haktan onayı bekliyor**. Ana evi: [[Chip Coverage Matrix]] · [[Watchlist]].

## Content Factory (D-25, CANONICAL v0.1)
Batch = bir Unit dilimi (asla tüm syllabus). Varsayılan 3 ders (pilot), kanıtlanınca ~6. VALIDATOR-FIRST.
**İlk pilot L7–L9 ONLY** (LOCKED). ~174 dersi tek seferde üretme. Ana evi: [[Content Production Workflow]] · [[Syllabus Production Workflow]].

## İlgili Notlar
- [[Canonical Context Pack]] · [[Learning Engine Context Pack]] · [[Product Context Pack]]
- [[Syllabus Overview]] · [[Lesson Status Matrix]] · [[Chip Taxonomy]] · [[Watchlist]]
