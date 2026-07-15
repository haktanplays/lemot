---
title: Watchlist
aliases: [İzleme Listesi, Risk Watch, Chip Watchlist]
type: research
domain: syllabus
status: idea
canon_status: proposed
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md", "docs/audits/l1_l15_chip_inventory/risk_review.csv", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Learning_Engine_and_Exercise_Types.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Syllabus_Delta_Log.md"]
related: ["[[Idea Index]]", "[[Chip Coverage Matrix]]", "[[L1 Survival Kit]]", "[[Chip Taxonomy]]", "[[Current Task Context]]"]
tags: [idea, research, watchlist, risk]
---

# Watchlist

> [!warning] L1–L15 chip audit (2026-07, `84a5b8e`) **risk review**'undan çıkan izleme kalemleri.
> Hiçbiri **onaylanmış değil** — hepsi **WATCH-ONLY / PROPOSED**. Bir agent bunları kanon gibi uygulamaz;
> bir chip/registry değişimi bir **canon kararıdır, lint istisnası değildir.** Audit verdict: `CLEAN_WITH_REVIEW_ITEMS`.

## İzleme kalemleri (audit R1–R12 + spine narrowness)

| Kalem | Tür | Severity | Ne izleniyor / kural |
|---|---|---|---|
| **`ici` / `faim` identity gap (R3)** | REVIEW | orta | Chip olarak üretiliyor ama **registry item'ı yok** → mastery event'i hiçbir şeye bağlanmıyor. `word-ici` / `noun-faim` sonra eklenmeli. **Yeni chip'te bu deseni tekrarlama.** [DEFERRED fix] |
| **`oui` demotion candidate (R2)** | REVIEW | orta | `chunk-oui` `status=active` ama post-L3 passive/trap kanonuyla çelişiyor → recognition/passive'e demotion adayı. (D-36 v0'da rehabilitation locked; wiring bekliyor.) [PROPOSED] |
| **`on y va` chip pressure (R5)** | WATCH | — | Frozen formula-only; herhangi bir `on + y + verb` **yeni bilinçli doorway** olmalı, genelleme değil. [CANONICAL guard] |
| **`j'y vais` chip pressure (R6)** | WATCH | — | Cümle formu chip'lerden lint ile dışlanmış; onu chip yapmak bir **canon kararı**, lint muafiyeti değil. [CANONICAL guard] |
| **Negative-composition debt (R7)** | WATCH | — | `je ne peux pas` (composed), `je n'y vais pas` (deferred), `je ne vais pas` (never shown) hepsi `ne ___ pas` frame'ine biner. İzle. [CANONICAL guard] |
| **`m'aider` object-pronoun seed (R8)** | WATCH | — | Gelecek doorway (`t'aider`/`l'aider`, `me/te/lui donner`); `m'` frozen kalır (`Il faut m'aider` L15'te doğru şekilde kaçınıldı). [DEFERRED doorway] |
| **Infinitive-family growth (R9)** | WATCH | — | `verb-aider`+`verb-aller` gibi modal-infinitive seti **kapalı, ders-başına-onaylı** tut; bulk-add yok. [CANONICAL guard] |
| **Legacy clause chunks (R1)** | REVIEW | düşük | `chunk-je-suis-ici` / `chunk-j-ai-faim` / `chunk-j-ai-une-question` — legacy olarak tut, deseni **replike etme**; recap'ler atomize eder. [HISTORICAL] |
| **11 dormant registry item (R4)** | REVIEW | düşük | Present ama hiç referans edilmemiş (`pronoun-je/tu/vous`, `verb-etre`, `sound-liaison`, vb.) — zararsız; registry pass'te annotate/triage. [DEFERRED] |
| **est-ce que intonation split (R10)** / **L13 fill frame reuse (R11)** / **sentence-level fill options L4/L6 (R12)** | OK / REVIEW-LOW | düşük | Çoğunlukla dokümante/tutarlı; R12 legacy stil, atom/frame option tercih et. |

## Spine narrowness — 4 fonksiyonel boşluk (izle, düzeltme onaylanmadı)
Darlık **payload'da, spine'da değil** (~1.5 payload/engine). Boşluklar:
1. Survival Kit'te **repair pair shipped değil** ama L13 owned varsayar (spec-vs-shipped tutarsızlık).
2. **oui paradox** — yes/no sorabiliyor, "evet" cevaplayamıyor.
3. **excusez-moi** Future'da park, her L8+ sahne ister.
4. **state/feeling gap** (`fatigué` / `j'ai soif`) birden çok spec ister, hiçbiri shipped.
Öneriler **R-A** (L1–L5 payload enrichment, smoke-bearing) · **R-B** (repair-kit canon) · **R-C** (oui rehab) ·
**R-D** (registry hygiene pass) · **R-E** (named landing slots) — **hepsi Haktan onayı bekliyor.** [PROPOSED]

## Neden bu not var
Bu kalemler **L1 chip redesign**'ı besliyor (→ [[Current Task Context]]) ama **hiçbiri final liste değil.**
L1 chip listesi bilinçli olarak açık (~34–35 hedef, 31 aday, 3–4 eklenecek). Bir agent buradan bir chip'i
"eklenecek" diye almamalı — Operator kararı gerekir. Önerilen sonraki adım: **registry hygiene pass (R1–R4)**
kendi reviewed PR'ı olarak, herhangi bir content batch'ten ayrı.

## Kaynak içe aktarımı (Learning Engine Taxonomy, 2026-06-29 vault)

> [!info] Kaynak: `Learning_Engine_and_Exercise_Types.md` §10 (Deferred Engine Questions) + `Syllabus_Delta_Log.md` Round 1.1 deltaları. **Hepsi WATCH-ONLY / deferred** — hiçbiri onaylanmış değil; bir chip/registry/validator değişimi **canon kararıdır, lint istisnası değil.**

| Kalem | Tür | Ne izleniyor / kural |
|---|---|---|
| **`pret` / `prête` gender-variant** | REVIEW (deferred) | Erken öğrenci için `pret`/`prête` nasıl temsil edilmeli? `Je suis prêt` L2'de **recognition-level** eklendi; gender/adjective agreement (`prêt`/`prête`) sonraya ertelendi (premature aktif gereksinim yaratmamak için). Product call bekliyor. [DEFERRED] |
| **"What was Weave?" reminder card** | WATCH (deferred) | Erken metacognitive hatırlatma bir **exposure card mı, recap reminder mı, yoksa hiç kart mı** olmalı? **Yalnız tester kanıtı confusion gösterirse** eklenecek. Bugün YOK. [DEFERRED] |
| **chip / `piecesUsed` validator metric** | WATCH (teknik fikir) | Chip / `piecesUsed` coverage bir **validator metriği** olmalı mı? Bugün recap `piecesUsed` mastery kanıtı olmadan **doğrulanmış sayılmaz** (Reflection/Recap ölçüm kuralı). Öneri düzeyinde. [PROPOSED] |

> [!note] `pret/prête` ve "What was Weave?" kalemleri `Syllabus_Delta_Log.md` Round 1.1'de de **deferred** olarak kayıtlı. Bu, üstündeki spine-narrowness "state/feeling gap" ve R2 `oui` demotion gibi diğer WATCH kalemleriyle aynı disiplinde: Operator kararı gerekir.

## İlgili Notlar
- [[Idea Index]] · [[L1 Survival Kit]] · [[Current Task Context]]
- [[Chip Coverage Matrix]] · [[Chip Taxonomy]] · [[Registry Usage Matrix]] · [[Registry Architecture]]
