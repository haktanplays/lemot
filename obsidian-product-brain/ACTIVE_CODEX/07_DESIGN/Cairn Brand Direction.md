---
title: Cairn Brand Direction
aliases: [Cairn Brand Direction, Marka Yönü, Le Mot to Cairn, Cairn Rebrand]
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
source_of_truth: ["CLAUDE.md", "docs/CONTENT_FACTORY_CONTRACT.md", "docs/obsidian/lemot-obsidian-customization-v0.md", "docs/obsidian/Home - Le Mot.dashboard-draft.md", "obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Visual_Design_Canon.md"]
code_refs: ["lemot-app/constants/theme.ts:20-47", "lemot-app/constants/journey.ts:52-72"]
related: ["[[00 Le Mot Holy Codex]]", "[[Design System Overview]]", "[[Visual Language]]", "[[Copy and Tone]]", "[[Home and Journey]]", "[[Product Vision]]"]
tags: [design, brand, cairn, canonical]
---

# Cairn Brand Direction

> [!canon] Purpose — Ürünün "Le Mot" (legacy v7) → "Cairn" marka geçişini ve markanın taşıdığı his/metafor sistemini kayıt altına alır.

## Executive Summary

Marka **Le Mot → Cairn** olarak yeniden adlandırılıyor. Bir *cairn*, dağ yolunu işaretleyen üst üste dizilmiş taş yığınıdır — mevcut dağ/iz/zirve metaforuyla doğrudan devamlıdır. His üç kelimeyle sabit: **sakin, premium, dağa tırmanış yolculuğu.** Bu bir zevk tercihi değil, ürün kimliğidir: oyunlaştırma (XP/streak/ödül) markaya aykırıdır ve canon-wide yasaktır.

Kod tabanı dizini hâlâ `lemot-app`; runtime ekranlarda hâlâ "Le Mot" izleri var. Yeniden adlandırma **kısmen** — canon/factory-era dokümanlarında "Cairn" aktif isim, kodda geçiş sürüyor. [PARTIAL]

## Why It Exists

"Le Mot" ("kelime") ürünün ne yaptığını anlatmıyordu; jenerik. "Cairn" ürünün *nasıl* öğrettiğini anlatır: yolda ilerledikçe arkanda taş bırakırsın (öğrenilen chip'ler), bir sonraki taş yolu işaretler. Marka = pedagojinin görsel özeti.

## Current Canon

- **CLAUDE.md banner (CANONICAL):** "Long-term Cairn product/build intent lives in `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md`… execution order `docs/CAIRN_ROADMAP_202607.md`." Precedence: `CLAUDE.md → docs/STATUS.md → docs/DEV_APK_MVP_CANON.md → Cairn v1.0 spec`.
- **Content Factory Contract** zaten "the remaining Cairn lessons" ve "Does it still feel like Cairn? (chips + memory + meaning, not phrasebook)" diye konuşur (`docs/CONTENT_FACTORY_CONTRACT.md`). [CANONICAL]
- **Ürün özü:** "premium French production engine — not a generic AI tutor"; "reusable sentence engines"; killer trinity **Weave · Say It Your Way · Natural Reveal** (`docs/obsidian/Home - Le Mot.dashboard-draft.md`). Bkz. [[Weave System]] · [[Product Promise]].

## Metafor Sözlüğü

Markanın çalışma kelime dağarcığı (obsidian-customization §1): **trail (iz), campfire (kamp ateşi), summit (zirve), fog (sis), river (nehir), stone (taş).**

- **Campfire** ~L24 = yumuşak-paywall / "etrafına toplan" anı (bkz. [[Monetization and Scope Boundaries]]).
- Yolculuk görselleri bu metaforu somutlaştırır: tırmanış → zirve (Weave → tam Fransızca dönüşü) → iniş → rehber olma (`constants/journey.ts:52-72`). Detay: [[Home and Journey]].
- Vault için önerilen semantik renk token'ları da bu sözlükten türetildi: `--lm-summit`, `--lm-trail`, `--lm-campfire`, `--lm-fog`, `--lm-river`, `--lm-stone` (obsidian-customization §2, PROPOSED).

## His Kontratı (CANONICAL, zevk değil kimlik)

- "The vault should feel the way the app feels: **premium, calm, human, and on a journey up a mountain.** Reading a note should lower the heart rate, not raise it." (obsidian-customization §1) — uygulamanın hissini referans alır.
- Ton kodla enforce edilir: `theme.ts:20-24` MOTIV yorumu — "Reward / cheerleader / pressure tones are intentionally absent… Tone is passive mirror: sit beside the learner, do not push." Detay: [[Copy and Tone]].
- Oyunlaştırma = FORBIDDEN (XP/streak/level-up/achievement/"amazing"/"perfect score"): `CLAUDE.md` "Do NOT" listesi, `MASTER_PIPELINE` Rule 3, agent constitution §4. [REJECTED/FORBIDDEN]

## Kaynak içe aktarımı (Tasarım Envanteri + Visual Design Canon)

> [!source] İçe aktarılan: `Visual_Design_Canon.md` (aktif görsel kanon) — cairn/iz-işareti markasını görsel-yön tarafından bağımsız olarak pekiştirir. Marka metaforu artık yalnızca kelime dağarcığı değil, aktif görsel kanonla çapalı.

### İz-işareti (cairn) markası, görsel kanondan [SOURCE — CANONICAL]

`Visual_Design_Canon.md` "Current Visual Direction" markanın çekirdek görselini doğrudan tanımlar ve bu notun cairn tezini destekler:

- **Dağcı / yol / cairn (trail-marker / işaret taşı) metaforu** görsel yönün merkezidir — marka adının ("Cairn" = yolu işaretleyen taş yığını) birebir görsel karşılığı.
- **Uzak dağ** (aspirasyon) + **yola yakın küçük ama görünür cairn** (bir sonraki işaret taşı) — pedagojinin görsel özeti: yolda ilerledikçe bırakılan taşlar (öğrenilen chip'ler) sonraki adımı işaretler. Bkz. [[#Why It Exists]].
- **Premium illüstrasyon tonu + "calm learning, not noisy gamification."** Bu, His Kontratı'nı ([[#His Kontratı (CANONICAL, zevk değil kimlik)]]) görsel katmanda teyit eder: oyunlaştırma markaya aykırı, canon-wide yasak.

### Metafor sözlüğü ile hizalama [SOURCE]

Görsel kanonun cairn/stone/summit/trail dili, bu notun [[#Metafor Sözlüğü]] öğeleriyle (trail, campfire, summit, fog, river, stone) örtüşür — aynı çalışma-kelime dağarcığı iki kaynakta ortak. İllüstrasyon kuralı "cairn görünür ama abartısız" marka ölçeğini de belirler: taş yığını fark edilir ama sahneyi ezmez. Görsel-dil detayı (palet, tipografi, illüstrasyon kuralları): [[Visual Language]].

> [!note] `Visual_Design_Canon.md` frontmatter'ında `related_notes` içinde hâlâ "Le Mot - User Journey" ve legacy inventory geçer; marka adı geçişi ([[#Known Gaps]]) devam ediyor. Görsel yön Cairn'e uyumlu, kod/dosya adları henüz değil. [PARTIAL]

## Known Gaps

- Kod tabanında "Le Mot" → "Cairn" tam yeniden adlandırma tamamlanmadı (dizin `lemot-app`, bazı runtime string'leri hâlâ Le Mot). Görünür isim değişimi ayrı bir iş → [[Technical Debt]].
- Cairn v1.0 spec dosyaları (`CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` vb.) bu evidence pass'inde okunmadı → [[Missing Source Inputs]].

## Related Notes

- [[Design System Overview]] · [[Visual Language]] · [[Home and Journey]] · [[Copy and Tone]] · [[Product Vision]] · [[Product Promise]]
- İsim kararı + rakip mezarlığı + kanıt zinciri: [[Naming and Brand Registry]] (bu not görsel/metaforu tutar, isim kararı orada).
