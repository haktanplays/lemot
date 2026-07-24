---
title: Design Context Pack
aliases: [Design Pack, Tasarım Paketi]
type: handoff
domain: design
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/constants/theme.ts", "lemot-app/tailwind.config.js", "docs/MASTER_PIPELINE_v1.2.1.md", "docs/obsidian/lemot-obsidian-customization-v0.md"]
related: ["[[Canonical Context Pack]]", "[[Design System Overview]]", "[[Cairn Brand Direction]]", "[[Copy and Tone]]", "[[V4 Studies Disposition]]"]
tags: [agent, context, design]
---

# Design Context Pack

<!-- gh-toc -->

## İçindekiler

- [Palet — P objesi (IMPLEMENTED)](#palet-p-objesi-implemented)
- [Fontlar (CANONICAL)](#fontlar-canonical)
- [Görsel yön: calm / premium / mountain-journey](#görsel-yön-calm-premium-mountain-journey)
- [Cairn markası (CANONICAL, göç ediyor)](#cairn-markası-canonical-göç-ediyor)
- [Yasaklı copy (kodda + kanonda enforce)](#yasaklı-copy-kodda-kanonda-enforce)
- [Boundary / recognition-only UI (D-22)](#boundary-recognition-only-ui-d-22)
- [V4-B "asymmetrical breath" (SELECTED ama DEFERRED — Rule 9)](#v4-b-asymmetrical-breath-selected-ama-deferred-rule-9)
- [Navigasyon / dev-apk yüzeyi](#navigasyon-dev-apk-yüzeyi)
- [web/next özel uyarı](#webnext-özel-uyarı)
- [İlgili Notlar](#ilgili-notlar)

> [!canon] UI/görsel/copy işi yapan ajanın bağlam paketi. Non-gamification burada **taste değil,
> ürün kimliği**. Ana evi: [[Design System Overview]].

## Palet — `P` objesi (IMPLEMENTED)
Kaynak: `lemot-app/constants/theme.ts` (`P`), Tailwind `lm-*` namespace'e mirror. Anahtarlar:
`bg #FAF9F7` (parchment) · `paper #FFFFFF` · `ink #2C2825` (asla saf `#000` değil) · `ink2 #6B6560` ·
`ink3 #A39E99` · `red #C0392B` (brick, primary accent/error) · `green #27AE60` (correct/active canon) ·
`amber #E67E22` (in-progress/trail) · `purple #7C3AED` (gate/special) · `border #E8E5E1`.
Ana evi: [[Visual Language]].

## Fontlar (CANONICAL)
**Newsreader** (serif) — French text / başlık. **Outfit** (sans) — UI / body / English.
`app/_layout.tsx`'te yüklenir. Ana evi: [[Visual Language]].

## Görsel yön: calm / premium / mountain-journey
Bir ekranı okumak nabzı **düşürmeli**. Marka metafor sözlüğü: **trail, campfire, summit, fog, river, stone**.
`theme.ts` `MOTIV` rotasyonu kodda enforce: ödül/cheerleader/baskı tonları **kasıtlı olarak yok**;
ton = **passive mirror** (Fransız atasözleri + yumuşak yansımalar). Ana evi: [[Motion and Animation]] · [[Home and Journey]].

## Cairn markası (CANONICAL, göç ediyor)
"Le Mot → Cairn." Cairn = patika işaretleyen taş yığını — mevcut dağ/patika/zirve metaforuyla sürekli.
Content Factory dokümanları zaten "Cairn dersleri" der. Ana evi: [[Cairn Brand Direction]].

## Yasaklı copy (kodda + kanonda enforce)
`XP` · `streak` · `level up` · `achievement` · `amazing` · `perfect score` · `goal complete` ·
"come back tomorrow" baskısı. Feedback = passive mirror ("Not a match yet."); Natural Reveal
**açıklar, cezalandırmaz**; boundary kartları asla failure gibi render edilmez; "Unlocked!" → "Added."
Ana evi: [[Copy and Tone]] · [[ADR-0001 no-xp-streak-reward-language]] · [[ADR-0002 calm-passive-mirror-mentor-tone]].

## Boundary / recognition-only UI (D-22)
Recognition-only "boundary" objeler geçerli motor objesidir ama learner UI onları **soft "later form" /
"not yet" kartı** olarak render eder: lesson/exercise ID gizli, `recognition` badge gizli,
`boundary`/`recognitionOnly`/`blockedProduction` sözcükleri yok, inline (modal değil). Copy:
"A form for later… we won't build this form yet." `presentationHint`/`later_form` schema marker'ı **DEFERRED**.
Ana evi: [[Interaction Patterns]] · [[Lesson Player]].

## V4-B "asymmetrical breath" (SELECTED ama DEFERRED — Rule 9)
V4-B tercih edilen görsel yön; **global V4-B redesign Dev APK smoke / internal-test feedback'e kadar ertelendi.**
Reactivation sinyali: kullanıcı **açıkça** "V4-B'yi aç/yeniden başlat" demeden açılmaz. **İlgisiz işe V4-B
token refactor'u sızdırma.** Ana evi: [[V4 Studies Disposition]].

## Navigasyon / dev-apk yüzeyi
dev-apk'te tab bar yalnızca **Journey**; Chat/Practice/Progress flag'lerle gizli. Progress ekranı hâlâ
legacy 24-lesson yüzeyi gösterir (Round 1 scope dışı). Ana evi: [[Navigation Model]] · [[Progress]].

## web/next özel uyarı
Le Mot web/landing kodunda `next/image` `fill` prop'unu kırılgan `position:absolute` container'da kullanma
(parent boyutu açık ve test edilmedikçe). Ana evi: [[Design System Overview]].

## İlgili Notlar
- [[Canonical Context Pack]] · [[Product Context Pack]]
- [[Design System Overview]] · [[Cairn Brand Direction]] · [[Copy and Tone]] · [[V4 Studies Disposition]]
