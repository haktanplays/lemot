---
title: Interaction Patterns
aliases: [Interaction Patterns, Etkileşim Kalıpları, UI Patterns]
type: design-spec
domain: design
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/components/lesson-v1/LessonRendererV1.tsx", "lemot-app/content/lessonTypes.ts", "docs/DEV_APK_SMOKE_TEST_CHECKLIST.md"]
code_refs: ["lemot-app/components/lesson-v1/LessonRendererV1.tsx:27-47", "lemot-app/app/(tabs)/index.tsx:29-32"]
test_refs: ["lemot-app/scripts/tests/componentCopyGuard.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Lesson Player]]", "[[Motion and Animation]]", "[[Accessibility]]", "[[Copy and Tone]]", "[[Weave]]"]
tags: [design, interaction, partial]
---

# Interaction Patterns

> [!canon] Purpose — Ekranlar arası ve ekran-içi tekrarlanan etkileşim kalıpları: ilerleme, grade+lock, reveal, sıralı kilit, ve "ceremony yok" prensibi.

## Executive Summary

Cairn'in etkileşim gramerinin çekirdeği **sakin ve düşük-ödüllü**dür. Dört ana kalıp IMPLEMENTED: (1) tek-yönlü ekran ilerlemesi (`screenIndex`, Continue), (2) grade + lock (Fill trap'leri cevabı derecelendirip kilitler), (3) input → check → reveal (Weave), (4) sıralı kilit (L(n+1), L(n) bitince açılır). Hiçbiri puan/yüzde/streak göstermez.

## Current Canon

- Ders ilerlemesi `screenIndex` üzerinden tek tek; son ekrandan sonra completion (`LessonRendererV1.tsx:27-33`).
- Ders tamamlama tek işaret (`{number}-read_listen=true`), "no scoring, no ceremony" (`index.tsx:29-32`).
- Sıralı kilit: Home L1–L6, `l.number <= 6` cap (bkz. [[Home and Journey]]).

## Kalıplar

### 1. Ekran ilerlemesi (Continue)

Meet/Insight/Recap bugün statik "Continue" ekranları; kullanıcı okur, ilerler. Per-screen etkileşim Faz B PLANNED. Bkz. [[Lesson Player]].

### 2. Grade + lock

`FillWithTraps`: kullanıcı boşluğu doldurur, cevap derecelendirilir ve **kilitlenir** (tekrar denenemez). Round 1 §6: "Fill traps grade + lock."

### 3. Input → check → reveal (Weave)

Weave ekranı: Fransızca iskeleti tamamla (input) → kontrol (check) → doğal cevabı göster (reveal). **Açık Weave'ler notlanmaz** (öğrenci-kanıtı, ceza değil). Ardışık Weave ekranları metin/state taşımaz (checklist §6). Detay: [[Weave]].

### 4. Sıralı kilit

Bir ders bitmeden sonraki açılmaz; kilit ikonu (`Lock`, `index.tsx:6`) ile gösterilir. Puan eşiği değil, sadece tamamlama.

### 5. Say It Your Way — model-cevap

Serbest üretim → model cevap gösterimi. dev-apk'ta AI-network kapalı; deterministik fallback. Ceza yok, model doğal Fransızca. Bkz. [[Say It Your Way]].

## Guardrails

- **Ceremony yok:** doğru cevapta konfeti/"amazing"/ses ödülü yok; sakin onay. Copy guard testi banned kelimeleri engeller (`componentCopyGuard.test.ts:44-59`). Bkz. [[Copy and Tone]].
- Near-miss (noktalama/aksan/yazım) **yumuşak sinyal**, asla failure — engine tarafında da böyle (near-miss precision). Bkz. [[Mastery Model]].
- Geri tuşu ölü uca düşürmez (checklist §10); klavye input'u bloklamaz.

## Known Gaps

- Meet/Insight/Recap etkileşimi bugün pasif (Continue); zenginleşme Faz B PLANNED.
- Motion/geçiş kalıpları ayrı notta: [[Motion and Animation]] (repo'da az kanıt → çoğu UNKNOWN).

## Related Notes

- [[Lesson Player]] · [[Motion and Animation]] · [[Accessibility]] · [[Copy and Tone]] · [[Weave]] · [[Say It Your Way]]
