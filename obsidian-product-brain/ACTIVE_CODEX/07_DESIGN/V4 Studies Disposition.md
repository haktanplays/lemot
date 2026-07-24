---
title: V4 Studies Disposition
aliases: [V4 Studies Disposition, V4-B, Asymmetrical Breath, V4 Studies]
type: decision
domain: design
status: deferred
canon_status: proposed
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/MASTER_PIPELINE_v1.2.1.md", "obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tasarim_Envanteri.md", "obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Visual_Design_Canon.md"]
code_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Design System Overview]]", "[[Visual Language]]", "[[Design Inventory]]", "[[Deferred Decisions]]", "[[Missing Source Inputs]]"]
tags: [design, v4b, deferred, proposed]
---

# V4 Studies Disposition

> [!decision] **V4-B "asymmetrical breath" = SELECTED (tercih edilen görsel yön) ama global redesign DEFERRED.** Dev APK smoke / internal-test geri bildirimi öncesine kadar açılmaz; yeniden aktivasyon **yalnızca açık operatör sinyaliyle** olur. Bkz. [[Deferred Decisions]].

## Executive Summary

"V4 Studies" = uygulamanın görsel redesign araştırması (V4 Studies spec + V4 standalone HTML + V4 source JSX). İçinden **V4-B "asymmetrical breath"** yönü *seçildi* (preferred). Ancak **global V4-B redesign ertelendi**: Dev APK smoke ve iç-test geri bildirimi gelene kadar uygulanmaz. Bu, hem statü hem de bir tuzak-uyarısıdır: agent'lar V4-B token refactor'ını alakasız işlere sızdıramaz.

Statü özeti: **PROPOSED / DEFERRED, implementation_status: not-started.**

## Current Canon

Kaynak `docs/MASTER_PIPELINE_v1.2.1.md` (§2 "Design source", Rule 9, stale-trap list):

- **"V4-B asymmetrical breath is the preferred direction. Global V4-B redesign waits until Dev APK smoke / internal test feedback unless explicitly reactivated."** (Rule 9)
- **Reaktivasyon sinyali (CANONICAL):** "V4-B is reactivated only when the user explicitly says to open/restart V4-B implementation after Dev APK smoke/internal test feedback."
- **Tuzak-uyarısı:** "Do not sneak a V4-B token refactor into unrelated work" (Rule 9); "Do not schedule V4-B global redesign inside Sprint 12 unless explicitly requested" (stale-trap list).
- **Design source ≠ scope:** "Design source is not automatically implementation scope… V4-B asymmetrical breath is selected, but global V4-B redesign is deferred" (§2 "Design source").

## Why It Exists (neden ertelendi)

Cairn'in şu anki önceliği Dev APK Round 1 smoke ve içerik-fabrikası; görsel redesign bu doğrulamadan *önce* yapılırsa boşa harcanmış iş riski var. Karar: önce mevcut palet/tipografi ([[Visual Language]]) ile smoke al, sonra geri bildirimle V4-B'yi aç.

## Guardrails

- V4-B bir Sprint 12 / mevcut işe **karıştırılamaz** — ayrı, açık-onaylı bir iş olmalı.
- "Do not combine syllabus rewrite with V4-B visual refactor" (MASTER_PIPELINE §14).
- Mevcut palet/font IMPLEMENTED kalır; V4-B onları değiştirene kadar canon budur → [[Visual Language]].

## Decision History

- Karar sınıfı: **DEFERRED** (tercih edildi, ertelendi). Merkezi kayıt: [[Deferred Decisions]].
- İlgili his yönü: "asymmetrical breath" = asimetrik boşluk/ritim; detay spec operatör-vault V4 Studies'te.

## Kaynak içe aktarımı (Tasarım Envanteri + Visual Design Canon)

> [!source] İçe aktarılan: `Tasarim_Envanteri.md` (2026-05-11 "V4 Disposition + Merged Canon overlay") + `Visual_Design_Canon.md` (aktif görsel kanon). Bu pass V4 varyant seçimini ve halftone reddini kaynaktan teyit eder. V4 Studies HTML'in kendisi (görsel kaynak) repo'ya alınmadı.

### V4 varyant seçimi: V4-B locked [SOURCE — SELECTED]

`Tasarim_Envanteri.md` Home satırı (§2): *"Home — base layout (V4-A/B/C/D variants tasarlandı, **V4-B seçildi**)."* Dört varyant (V4-A / V4-B / V4-C / V4-D) tasarlandı, **V4-B "asymmetrical breath" tercih edildi.** Bu, Codex'in mevcut pozisyonuyla tutarlı: **SELECTED ama global redesign DEFERRED** (Rule 9). Envanterdeki "V4-B seçildi/locked" ifadeleri *görsel-yön tercihini* kaydeder, implementasyon onayını değil.

### V4-D halftone: REJECTED [SOURCE — DEPRECATED]

`Tasarim_Envanteri.md` §18 (Edge states): *"Halftone dot pattern overlay — printed-feel visual treatment — **[DEPRECATED — V4-D variant rejected; V4-B locked]**; halftone treatment optional Sprint 12+ visual polish."* Yani **V4-D halftone yönü reddedildi**; V4-B ile çeliştiği için. Halftone en fazla Sprint 12+ opsiyonel görsel cila olarak kalabilir, çekirdek yön değil. `Visual_Design_Canon.md` bu reddi destekler: "No clutter, childish reward theatre… Do not solve saturation by simply fading all color."

### 2026-05-11 disposition overlay [SOURCE]

Envanter, 2026-05-11'de her item'a bir V4 Disposition + Merged Canon sınıflandırma bayrağı ekledi (VALID / REDESIGN / DEPRECATED / NEW / ARCHIVE / VALID — Sprint 12+). Bu overlay, V4 tasarımlarının hangilerinin canon-uyumlu (implement edilebilir), hangilerinin taxonomy/streak/XP nedeniyle yeniden tasarım gerektirdiğini işaretler. Kod-tarafı V4 disposition'ları (§19.H): `aiLesson` defensive guard (V4.FLAG.1), MOTIV 3-katman rotasyon (V4.MOTIV.1), LessonOutro stats removal → passive mirror (V4.OUTRO.1). Sınıflandırma detayı: [[Design Inventory]].

### Guardrail

- V4-B *seçim* onaylı; V4-B *global implementasyon* değil. Envanterdeki ☑'ler tasarım kanıtıdır, scope kararı değil. Reaktivasyon yalnızca açık operatör sinyaliyle → [[Deferred Decisions]].

## Known Gaps

- V4 Studies spec / standalone HTML / source JSX repo'da commit'li değil → [[Missing Source Inputs]]. HTML **~18MB** (repo'ya alınmadı, "held back"); bu pass'te *tasarım gerçekleri* envanterden ingest edildi ama görsel içerik satır-seviyesinde doğrulanamıyor.
- "asymmetrical breath"in somut token/layout kuralları (asimetrik boşluk oranları, hairline border değerleri, circle-glyph status) bu pass'te bilinmiyor → [[Needs Verification]].

## Related Notes

- [[Design System Overview]] · [[Visual Language]] · [[Design Inventory]] · [[Deferred Decisions]] · [[Missing Source Inputs]]
