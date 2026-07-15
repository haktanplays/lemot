---
title: Exercise Selection Matrix
aliases: [Seçim Matrisi, Which Exercise For What]
type: system-spec
domain: exercise
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["cairn_build/evidence/03_exercises.md", "docs/canon/LESSON_FLOW_CANON_v1.md"]
code_refs: ["lemot-app/content/lessonTypes.ts:40-47", "lemot-app/constants/sections.ts"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Exercise Evidence Matrix]]", "[[Exercise Error Matrix]]"]
tags: [exercise, matrix]
---

# Exercise Selection Matrix

> [!canon] Hangi öğrenme amacı için hangi egzersiz? Sütunlar bir öğrenme-hedefi spektrumudur: **recognition** (tanıma) → **recall** (hatırlama) → **controlled production** (kontrollü üretim) → **free production** (serbest üretim). `●` = birincil amaç, `○` = ikincil/destek, `—` = uygun değil.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Matris

| Egzersiz | Recognition | Recall | Controlled prod. | Free prod. | Runtime | Ana Not |
|---|:---:|:---:|:---:|:---:|---|---|
| Meet | ● (discovery) | — | — | — | v1 active | [[Meet]] |
| Insight and Notice | ● (discovery) | — | — | — | v1 active | [[Insight and Notice]] |
| Read and Listen | ● (input) | — | — | — | legacy-active | [[Read and Listen]] |
| Multiple Choice | ● | ○ | — | — | v1 (fill-with-traps) + legacy | [[Multiple Choice]] |
| Fill | ● (discrimination) | ○ | — | — | v1 active | [[Fill]] |
| French Fill | ● | ○ | — | — | legacy-active | [[French Fill]] |
| Build | — | ○ | ● (assemble) | — | legacy-active | [[Build]] |
| Weave | — | ○ | ● | ● (open weaves) | v1 active | [[Weave]] |
| Combine and Weave | — | ○ | ● | ○ | legacy-active | [[Combine and Weave]] |
| Write | — | ● (from memory) | ○ | — | legacy-active | [[Write]] |
| Say It Your Way | — | — | ○ | ● | v1 active | [[Say It Your Way]] |
| Mini Conversation | — | — | ○ | ● (dialogue) | legacy, AI-gated | [[Mini Conversation]] |
| Review (Recap) | ○ | ○ | — | — | v1 active (consolidation) | [[Review]] |
| Daily Review | ● | ○ | — | — | dev-apk-hidden | [[Daily Review]] |
| Natural Reveal | ● (reveal/W2 recognition) | — | — | — | v1 active (feedback surface) | [[Natural Reveal]] |

## Okuma notları (evidence-grounded)

- **Meet / Insight / Read & Listen = discovery** (`LESSON_FLOW_CANON_v1.md` §1.3): "no wrong, no score". Cevap üretmezler; recognition sütununda ama assessment değil.
- **Fill / Multiple Choice** aynı runtime bileşenidir (`FillWithTraps.tsx`, tek-seçim). v1'de "Fill" ile "Multiple Choice" **aynı ekran tipinin** iki adı; ayrım pedagojik: Fill = cümle boşluğu, MC = discrimination/spot-the-mistake. Legacy'de gerçekten ayrı MCQ bileşenleri var (Quiz, WeaveFill, FrenchFill, Patterns quickRecall).
- **Weave** hem controlled (supported/mid weaveType) hem free (open weaveType) üretim yapabilir; open Weave **gradesiz** (W1). Bkz. [[Weave]].
- **Write** = bellekten yazma → recall birincil (`WriteSection.tsx`, thr .6).
- **Say It Your Way / Mini Conversation** = tek serbest üretim yüzeyleri; SayIt hiç gradelemez, Mini Conversation AI-gated (dev-apk'te null render).
- **Natural Reveal** bir egzersiz değil, bir **feedback/reveal yüzeyi**; recognition sütununda çünkü W2 penceresinde ileri Fransızca'yı recognition-only gösterir.
- **Review (Recap)** üretim yeni kanıt üretmez; consolidation ("taşını sen diz"). Legacy `Review.tsx` mixed-section (listen/odd-one-out/fill/weave-blank) gerçek recognition+recall karışımıdır — bkz. [[Review]].

## Bilinmeyenler

- Practice-Hub (Build/Stretch/Challenge) seçim-ağırlıklı üretim spektrumu PLANNED; runtime yok → UNKNOWN. [[05 Open Loops]].

## Related Notes

[[Exercise Evidence Matrix]] · [[Exercise Error Matrix]] · [[Content Selection]] · [[Difficulty and Cognitive Load]]
</content>
