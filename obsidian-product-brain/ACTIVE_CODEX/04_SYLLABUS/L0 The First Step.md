---
title: L0 The First Step
aliases: [L0, Lesson Zero, First Taste, v1-lesson-000]
type: lesson-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: implemented
verification_status: device-verified
lesson_id: v1-lesson-000
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/architecture/l0-l24-founder-build-matrix-v0.md", "content/lessons/v1/lesson-000.ts", "docs/workstreams/round1-founder-learning-slice.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-000.ts", "lemot-app/app/lesson-zero.tsx", "lemot-app/lib/lessonZeroAnswers.ts"]
related: ["[[L1 Survival Kit]]", "[[Syllabus Overview]]", "[[Weave System]]", "[[Home and Journey]]", "[[00 Le Mot Holy Codex]]"]
tags: [syllabus, lesson, l0]
---

# L0 — The First Step (First Taste)

> [!canon] **L0, Lesson 1 DEĞİLDİR.** L0 bir **first-use / ilk-temas köprüsüdür**:
> öğrencinin ürünle ilk teması, Weave'in ne demek olduğunu hissettiği küçük bir
> café sahnesi. Formel **spine/chip sistemi L1'de başlar.** [CANONICAL]

## Neden ayrı bir katman?

L0'ın işi öğretmek değil, **temas ettirmektir.** İlk açılışta öğrenci hemen bir
üretim anına sokulur (rebuild/first-run production flow, #139 ile yeniden inşa
edildi), böylece "bu uygulama bana parçaları kullandırıyor" hissi daha ilk
dakikada oturur. Bu yüzden L0'ın dili L1 ile örtüşse bile, o dil **L1'in carryover
kaynağı sayılmaz** — aksi halde chip muhasebesi (accounting) yanlış katmana bağlanır.

> [!warning] L0'da benzer kelimelerin görünmesi, L1 chip'lerini "L0'dan geldi"
> diye sınıflamak için gerekçe **değildir.** Bu ayrım [[L1 Survival Kit]] redesign
> kararının merkezinde. [CANONICAL]

## Runtime status

> [!implemented] `v1-lesson-000`, `content/lessons/v1/lesson-000.ts`, learner-**VISIBLE**.
> İlk-çalışma zinciri `app/lesson-zero.tsx` + `lib/lessonZeroAnswers.ts` üzerinden.
> #139 first-run flow yeniden inşası + #141 nudge hint cap sonrası mevcut main'de
> Lesson Zero **yeni** akıştır (eski `8cefe81` smoke'u bunu görmedi → operatör
> cihaz smoke'u yeniden kapsamalı). [[03 Current State]].

Not: "How Weave Works" artık otomatik zincirde **değil** (#139). [[Sprint Timeline]].

## Learner Job
İlk temas: Weave hissi + "parçaları kullanıyorum" güveni. Ölçülebilir mastery
hedefi yok; bu bir köprü.

## Exercise Sequence
Café onboarding sahnesi (bkz. `l0-l24-founder-build-matrix-v0.md` L0 satırı,
locked). Üretim-önce yaklaşımı. Ekranlar [[Meet]] / [[Weave]] / [[Natural Reveal]]
ailesinden; kesin sıra `lesson-000.ts`'te.

## Evidence and Mastery
Scored gating yok; tamamlanma tek monotonik marker (`lm7`). [[Mastery Model]].

## Spec-to-Runtime
Founder build matrix'te L0 satırı "locked"; runtime `lesson-000.ts` ile örtüşür.
Sapma bilinmiyor → [[Spec Runtime Divergences]].

## Open / History
- Home completion label (F5): tamamlanınca Home hâlâ "Begin the first lesson"
  diyebiliyor — cihaz smoke'unda gözden geçirilecek. [[05 Open Loops]].
- L0 Round 1 L0–L6 diliminin parçası; runtime frozen. [[Sprint Timeline]].
