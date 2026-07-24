---
title: Exercise Anti-Patterns
aliases: [Anti-Patterns, Egzersiz Anti-Kalıpları, Validator Errors]
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
source_of_truth: ["docs/canon/LESSON_FLOW_CANON_v1.md", "lemot-app/scripts/canonRules.ts", "CLAUDE.md"]
code_refs: ["lemot-app/scripts/canonRules.ts:96-165", "lemot-app/__tests__/canonRules.test.ts", "lemot-app/__tests__/componentCopyGuard.test.ts", "lemot-app/__tests__/devApkCopyGuard.test.ts"]
test_refs: ["lemot-app/__tests__/canonRules.test.ts", "lemot-app/__tests__/v1LessonStructure.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Weave]]", "[[Say It Your Way]]", "[[Daily Review]]", "[[Feedback and Scoring Philosophy]]"]
tags: [exercise, anti-pattern, canon]
---

# Exercise Anti-Patterns

<!-- gh-toc -->

## İçindekiler

- [Validator ERRORs (EXERCISE_CANON §16)](#validator-errors-exercisecanon-16)
- [Mekanize validators (V3/V4/V5 — IMPLEMENTED canonRules.ts)](#mekanize-validators-v3v4v5-implemented-canonrulests)
- [Somut, sık anti-pattern'ler (canon)](#somut-sık-anti-patternler-canon)
- [Router red flags (CLAUDE.md / EXERCISE_CANON §B)](#router-red-flags-claudemd-exercisecanon-b)
- [Banned copy tokens (FLOW §Rule 3)](#banned-copy-tokens-flow-rule-3)
- [Validator WARNINGs (özet)](#validator-warnings-özet)
- [Known Gaps](#known-gaps)
- [Related Notes](#related-notes)

> [!canon] Cairn egzersiz tasarımının **yapmayacakları**. Kaynak: EXERCISE_CANON §16 + `LESSON_FLOW_CANON_v1.md` §11 (validator V1–V9) + root CLAUDE.md router red flags. Bir kısmı mekanize (V3/V4/V5), çoğu spec-only.

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]]

## Validator ERRORs (EXERCISE_CANON §16)

- **Producing task has no production.** Üretim egzersizi üretim istemiyorsa hata. → [[Say It Your Way]], [[Weave]].
- **Speaking gives praise without target detection.** Konuşma/üretim hedef tespiti olmadan övgü verirse **ERROR** (§16). Bu yüzden [[Say It Your Way]] model-answer-only: asla sahte övgü fabrikatlanmaz.
- **Weave repair as designed translation exercise.** Weave onarımını tasarlanmış çeviri egzersizi gibi kullanmak yasak; "Broken Weave Reconstruction" **REJECTED/removed** (§11 edit 7). → [[Weave]].
- **Reveal-only item treated as active mastery.** Recognition-only "later form" objesi aktif mastery gibi işlenemez. → [[Natural Reveal]].
- **Engine transform to unrelated sentence** (ortak scene/slot/job olmadan).
- **Register shift before tu/vous opened.** tu/vous açılmadan register kayması.
- **(lint) sentence/clause chip** PROTECTED_CHUNKS/SURVIVAL_FORMULAS dışında; negatif fiil cümleciği chip olarak; production hedefinde inverted question; W2 penceresi ötesinde reveal; **açık mixed Weave'i gradelemek**.

## Mekanize validators (V3/V4/V5 — IMPLEMENTED `canonRules.ts`)

| ID | Kod | Sev | Kural | Mekanize? |
|---|---|---|---|---|
| V3 | future_as_answer | ERROR | future/ghost cevap pozisyonunda | **EVET** `canonRules.ts:96-126` |
| V4 | future_in_forbidden_zone | ERROR | future §2.2 forbidden zone'da (chip tray / meet highlight / recap piecesUsed) | **EVET** `canonRules.ts:104-155` |
| V5 | insight_budget | WARN | >3 L3 insight-card/ders | **EVET** `canonRules.ts:158-165` (`INSIGHT_BUDGET_MAX=3`) |
| V1 | screen_action_count | ERROR | ekranda mikro-eylem >4 | spec-only |
| V2 | passive_screen | WARN | etkileşimsiz ekran (Continue hariç) | spec-only |
| V6 | gate_scope | ERROR | readiness gate review-integration dışında | spec-only |
| V7 | exposure_horizon | WARN | Kademe-3 exposure >1/session | spec-only |
| V8 | production_without_ladder | WARN | hint ladder'sız üretim ekranı | spec-only |
| V9 | fill_without_recovery | WARN | trap-reason coach satırsız fill | spec-only |

STATUS.md (2026-07-05): V3/V4/V5 `validate:content` içinde; "Mevcut 16 ders 0 error / 0 warning ile geçti."

## Somut, sık anti-pattern'ler (canon)

> [!warning] **"What does X mean?" flashcard quiz'i.** Ürün pozisyonunun reddettiği tam kalıp. Yalnız [[Daily Review]] arkasında (`FEATURES.dailyReview=false`) kalıyor; `genReviewItems` soru formu `What does "X" mean?` (`DailyReviewOverlay.tsx:140`). Testerlar görmez.

> [!warning] **Placeholder/boşluk seslendirme (TTS).** Weave Fill placeholder'ı okumamalı. Guard: `ttsPlaceholder.test.ts` (IMPLEMENTED). → [[Read and Listen]].

> [!warning] **Future-form cevap olarak.** Öğretilmemiş/gelecek form doğru cevap olamaz (V3). Trap distraktörü olarak yanlış-şık olması serbest (`canonRules.test.ts:80-121`). → [[Fill]].

> [!warning] **Sentence/clause chip.** `piecesUsed` / hint tray atomik olmalı; cümle/clause chip hatadır (V4 + sentence-chip heuristic, `v1LessonStructure.test.ts:66-76,372-390`, PROTECTED_CHUNKS = {je ne suis pas, ce n'est pas}). → [[Review]], [[Chip Taxonomy]].

## Router red flags (CLAUDE.md / EXERCISE_CANON §B)

Duolingo mekanikleri · streak baskısı · XP/level ödül dili · generic chatbot sahneleri · çok erken çok unlock · her derse tam bespoke flow · semantic clustering.

## Banned copy tokens (FLOW §Rule 3)

`streak`, `XP`, `level up`, `achievement`, `amazing`, `perfect score`. Guard: `componentCopyGuard.test.ts` + `devApkCopyGuard.test.ts` (IMPLEMENTED). Calm passive-mirror mentor tonu. → [[Copy and Tone]], [[Feedback and Scoring Philosophy]].

## Validator WARNINGs (özet)

Decision Probe MCQ'da bitiyor · reflecting "why?" eylemsiz soruyor · insight card eylemsiz · card state olabilecek tek-kullanımlık mikro-task · erken derste >1 board card · başarıyı çok-sorunlu mekanikle kesme · örnek kopya dışı ghost item · supported item <2× görünüyor.

## Known Gaps

V1/V2/V6-V9 mekanize değil (runtime chain-step, readiness gate, exposure selector henüz yok). → [[05 Open Loops]].

## Related Notes

[[Exercise System Overview]] · [[Feedback and Scoring Philosophy]] · [[Weave]] · [[Say It Your Way]] · [[Natural Reveal]] · [[AI Role and Guardrails]]
</content>
