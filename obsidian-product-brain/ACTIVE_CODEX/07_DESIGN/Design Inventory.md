---
title: Design Inventory
aliases: [Design Inventory, Tasarım Envanteri, Screen States, Ekran Durumları]
type: design-spec
domain: design
status: partial
canon_status: provisional
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tasarim_Envanteri.md", "obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Visual_Design_Canon.md", "docs/DEV_APK_SMOKE_TEST_CHECKLIST.md", "docs/MASTER_PIPELINE_v1.2.1.md", "lemot-app/config/productStage.ts"]
code_refs: ["lemot-app/config/productStage.ts:13-55", "lemot-app/app/(tabs)/index.tsx", "lemot-app/app/+not-found.tsx"]
related: ["[[00 Le Mot Holy Codex]]", "[[Design System Overview]]", "[[Navigation Model]]", "[[V4 Studies Disposition]]", "[[Missing Source Inputs]]", "[[Failure and Recovery Model]]", "[[Needs Verification]]"]
tags: [design, inventory, screen-states, partial]
---

# Design Inventory

> [!info] **GÜNCELLEME 2026-07-14 — "Tasarım Envanteri" artık içe aktarıldı.** Envanterin tam hâli (`SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tasarim_Envanteri.md`) bu oturumda okundu → 155-item özet + sınıflandırma sözlüğü aşağıdaki [[#Kaynak içe aktarımı (Tasarım Envanteri + Visual Design Canon)]] bölümüne işlendi. Önceki "operator-vault, cloud-okunamaz" boşluğu **RESOLVED** → [[Missing Source Inputs]]. **UYARI:** envanter bir *tasarım kaynağıdır*, implementasyon planı değil — kendi başlığı der ki "Mixed historical note … verify against active v0.2 canon before use". Aktif görsel yön [[Visual Language]] + [[V4 Studies Disposition]]'da; V4-B DEFERRED.

> [!warning] Aşağıdaki *repo-doğrulanabilir ekran-durumları* tablosu değişmedi: kodda hangi state'in gerçekten var olduğu hâlâ yalnızca repo'dan doğrulanır. Envanterin 155 satırı "tasarlandı mı" sorusunu yanıtlar, "kod'da var mı" sorusunu değil — bu ikisini karıştırma.

## Executive Summary

"Tasarım Envanteri" = her ekranın ve her ekran-durumunun (empty / loading / error / cap / offline) tasarlanıp tasarlanmadığının kataloğu. MASTER_PIPELINE bunu bir canon kaynağı sayar (§2 "Tasarım Envanteri current classification") ve tasarım-iş şablonu her ekran için "VALID / REDESIGN / NEW / ARCHIVE" statüsü ister (Template A). **Ama katalog repo'da tam yok.** Bu not, envanterin repo-tarafı gölgesidir + operatör-vault'a köprüdür.

## Ekran-durumları: tasarlanmış mı? (repo-doğrulanabilir)

| Durum | Kanıt / Nerede | Statü |
|---|---|---|
| Normal ders akışı | `LessonRendererV1`, 7 ekran tipi | IMPLEMENTED — bkz. [[Lesson Player]] |
| İlk açılış (first-run) | `lesson-zero.tsx` (#139 rebuilt) | IMPLEMENTED |
| Ders tamamlama | CompletionView (`LessonRendererV1`) | IMPLEMENTED |
| 404 / not-found | `app/+not-found.tsx` | IMPLEMENTED (varsayılan) |
| Gate redirect (gizli route → Home) | checklist §9 | IMPLEMENTED |
| Offline / airplane mode | checklist §8: "airplane mode works; fallback never crashes" | PARTIAL — "confusing fallback copy" not edilecek |
| AI cap / rate-limit UI | PR-C server-side cap var; **kullanıcı-yüzü UI** doğrulanmadı | UNKNOWN → [[Needs Verification]] |
| Loading (spinner) | Home `ActivityIndicator` (Lesson Zero redirect'i arkasında) | PARTIAL |
| Empty state (boş liste) | doğrulanmadı | UNKNOWN |
| Error state (jenerik hata) | doğrulanmadı; AI fail fallback string var | UNKNOWN |

> [!warning] "cap state" (AI günlük limit dolduğunda) — sunucu tarafı fail-closed cap **var** (`ai-chat` 20 / `ai-evaluate` 40 / `ai-error` 10, PR-C), ama bunun sakin bir *öğrenci-yüzü ekranı* olarak tasarlanıp tasarlanmadığı repo'dan doğrulanmadı. dev-apk'ta zaten AI kapalı (fallback), bu yüzden cap-UI Round 1'de tetiklenmez. → [[AI Architecture]] · [[Needs Verification]].

## Guardrails (MASTER_PIPELINE Template A)

- Her ekran için statü: VALID / REDESIGN / NEW / ARCHIVE — yalnızca *aktif* durum implement edilir, arşiv/post-MVP durumları değil.
- "Offline / empty / cap states designed" — MASTER_PIPELINE §4C UI tasarım checklist'inde açıkça istenir; repo'da hepsi doğrulanmadı.
- V4-B global redesign bu envantere sızdırılamaz (DEFERRED) → [[V4 Studies Disposition]].

## Kaynak içe aktarımı (Tasarım Envanteri + Visual Design Canon)

> [!source] İçe aktarılan kaynaklar: `Tasarim_Envanteri.md` (operatör-vault ekran/state envanteri, 2026-05-02 oluşturuldu, 2026-05-11 son güncelleme) + `Visual_Design_Canon.md` (aktif görsel kanon). Bunlar 2026-05/2026-06 tasarım kaynak notlarıdır. Envanterin kendi statüsü: *"Mixed historical note … verify against active v0.2 canon before use."* → **design SOURCE, implementation plan DEĞİL.** `Visual_Design_Canon.md` envanterin bayat kısımlarını *supersede eder*.

### 155-item envanter özeti [SOURCE]

`Tasarim_Envanteri.md` toplam **155 ekran/state** kataloglar (☑ = V4 Studies HTML'de tasarımı var · ☐ = yok/yapılacak). Ölçek büyümesi: **V4 ekran sayısı 36 → 71 → 155** olarak ilerledi:

- **36** = ilk V4 Studies kapsamı.
- **71** = 2026-05-08 "V4 Yumuşatma + Mon Lexique pass" (Settings, Notifications, Edge states, GDPR, Paywall ceremony, ek Daily Review, Lesson transitions, Mon Lexique search).
- **155** = 2026-05-11 "V4 Disposition + Merged Canon overlay" — §19 "Sprint 11 Yeni Required States" (**40 NEW state**) Merged Canon (MC.1-9) kararlarından türetildi ve her item'a sınıflandırma bayrağı eklendi.

Kaba dağılım (envanter Özet tablosundan): **68 ☑ tasarlandı / 87 ☐ yapılacak**; sınıflandırma overlay'i ~25 REDESIGN, ~30 VALID, 4 DEPRECATED, ~28 ARCHIVE, 40 NEW.

### Sınıflandırma sözlüğü (legend) [SOURCE — CANONICAL sınıf seti]

Envanterin her item'ına bu bayraklardan biri uygulanır:

| Bayrak | Anlam |
|---|---|
| **[VALID]** | V4'te var + canon-uyumlu, implementasyona hazır |
| **[REDESIGN]** | V4'te var ama Merged Canon kırıyor — yeniden tasarım gerek (taxonomy / streak / XP / level) |
| **[DEPRECATED]** | V4'te var ama post-MVP veya canon dışı (V4-A/C/D variants, halftone) |
| **[NEW]** | V4'te yok, Merged Canon ekliyor (Pieces / How Weave Works / Stay with It variants / Insight Cards) |
| **[ARCHIVE]** | post-MVP scope (Mon Lexique full, Paywall ceremony, Word Graph) |
| **[VALID — Sprint 12+]** | tasarım hazır, implementation public beta sonrasına ertelenmiş |

### Section grupları (18 mevcut + §19) [SOURCE]

| # | Grup | Toplam | Baskın sınıf |
|---|---|---|---|
| 1 | Auth & Onboarding | 4 | 2 VALID, 2 NEW |
| 2 | Home (Journey tab) | 4 | 1 VALID (V4-B locked), 3 NEW |
| 3 | Chat (Parle avec moi) | 9 | sandbox/public-beta scope |
| 4 | Practice (Pratique) | 10 | 6 VALID, 4 NEW |
| 5 | Progress (Tes progrès) | 5+1 | 1 REDESIGN (XP/Streak/Level strip), tab adı "Progress" locked |
| 6 | Lesson Player — Frame | 4 | 4 REDESIGN (taxonomy 11→9) |
| 7 | Lesson Part 1: Learn | 6 | 6 REDESIGN (Meet It / Notice the Pieces / Try It) |
| 8 | Lesson Part 2: Practice | 3 | 3 REDESIGN (Shape It / Weave It / Try It) |
| 9 | Lesson Part 3: Produce | 4 | 4 RE-LABEL (Say It Your Way keep; Mini Chat legacy) |
| 10 | Transitions & Overlays | 11 | 6 REDESIGN (Insight Card reframe + passive-mirror outro) |
| 11 | Daily Review — 4-screen ritüel | 8 | 6 VALID, 1 REDESIGN (streak removal) |
| 12 | Mon Lexique — 3-tier | 7 | 7 ARCHIVE (Sprint 12+); MVP basic notebook ayrı |
| 13 | Paywall | 8 | 8 ARCHIVE (public beta) |
| 14 | Word Graph | 3 | 3 ARCHIVE (post-beta, Q3 lock) |
| 15 | Monolingual L40+ | 5 | 5 ARCHIVE (Wave 3) |
| 16 | L80 & Trail badges | 5 | 5 ARCHIVE (Wave 3) |
| 17 | Settings / Account | 12 | 12 VALID — Sprint 12+ |
| 18 | Sistem & Edge states | 7 | 4 VALID, 3 NEW (+ Halftone DEPRECATED) |
| **19** | **Sprint 11 Yeni Required States** | **40 NEW** | Merged Canon türevi; bkz. alt not |

**Lesson Player detayı (grup 6-10):** V4'te ayrı artboard'lar var ama Sprint 11 taxonomy'si 11 section → 9'a indiriyor (Meet It / Notice the Pieces / Why This Works / Try It / Weave It / Shape It / Use It / Stay with It / Lesson End). → [[Lesson Player]].

**Daily Review 4-screen ritüel (grup 11):** Fragments (poetic intro) → Reading ritual (tap-to-peek) → Recognition (soft cloze) → Outro (gathered, **no scoring** — V4'teki "12 · DAY STREAK" kaldırılıp "12 days on the path"). → [[Daily Review UI]] · [[Copy and Tone]].

**Mon Lexique 3-tier (grup 12):** Basic notebook = MVP · Full 7-screen (Are.na "channels") = Sprint 12+/public beta · Word Graph compatibility = post-beta. → [[Mon Lexique UI]].

**§19 Sprint 11 (40 NEW):** How Weave Works ×3 · Pieces mechanic ×3 · Free Weave + Natural Reveal ×4 · ~~Mini Mission ×5~~ SUPERSEDED (→ Say It Your Way + A Small Moment) · ~~Stay with It ×8~~ RE-HOMED (→ Practice Pool Build + Daily Review + inline Try It traps) · Insight Cards ×7 · Practice expansion ×7 · code-side V4 disposition ×3.

### Reconciliation & guardrail [Codex pozisyonu]

- **Envanter ≠ plan.** 155 satır bir *keşif kataloğudur*; MASTER_PIPELINE §2 Template A "her ekran için VALID/REDESIGN/NEW/ARCHIVE" ister ama implementasyon scope'unu dev-apk canon + STATUS belirler, envanter değil.
- **V4-B DEFERRED.** Envanterdeki "V4-B seçildi / V4-B locked" ifadeleri **görsel yön tercihini** kaydeder; global V4-B redesign hâlâ ertelenmiş → [[V4 Studies Disposition]]. Envanterdeki ☑'ler "tasarlandı" demektir, "implement edilecek" değil.
- **Bayat kısımlar Visual Canon'a tabidir.** Envanter–`Visual_Design_Canon.md` çatışırsa aktif görsel kanon kazanır (halftone/V4-D reddi buradan gelir).
- **Yasak dil hâlâ enforce.** Envanterdeki eski "Unlocked!" / XP / streak / DAY STREAK framing'leri REDESIGN işaretli; koda geri sokulamaz → [[Copy and Tone]].

## Known Gaps / Open Questions

> [!info] **RESOLVED (2026-07-14):** Ekran-durum envanterinin tam sınıflaması artık okundu ve yukarıya işlendi (`Tasarim_Envanteri.md`). Önceki "operatör-vault, import edilmedi" boşluğu kapandı → [[Missing Source Inputs]].

> [!open-loop] Kalan boşluk: envanter "tasarlandı mı" der, ama empty/error/cap ekran-durumlarının *kod'da* gerçekten var olup olmadığı hâlâ UNKNOWN (repo-doğrulama gerektirir). V4 Studies HTML/JSX (18MB, repo'ya alınmadı) satır-seviyesinde doğrulanamıyor. → [[05 Open Loops]] · [[Missing Source Inputs]] · [[Needs Verification]]

## Related Notes

- [[Design System Overview]] · [[Navigation Model]] · [[V4 Studies Disposition]] · [[Failure and Recovery Model]] · [[Missing Source Inputs]]
