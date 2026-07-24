---
title: Lesson Status Matrix
aliases: [Lesson Status, Ders Durum Matrisi, Runtime Status Matrix]
type: system-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/content/lessons/v1/index.ts", "lemot-app/app/(tabs)/index.tsx", "docs/architecture/l0-l24-founder-build-matrix-v0.md", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
code_refs: ["lemot-app/content/lessons/v1/lesson-000.ts:192", "lemot-app/content/lessons/v1/lesson-015.ts:201-203", "lemot-app/app/(tabs)/index.tsx"]
related: ["[[00 Le Mot Holy Codex]]", "[[Syllabus Overview]]", "[[Spec to Runtime Matrix]]", "[[Runtime Content Architecture]]"]
tags: [syllabus, matrix, runtime-status]
---

# Lesson Status Matrix

> [!canon] Purpose — L0–L17 için **"authored ≠ registered ≠ visible ≠ specced"** ayrımını tek tabloda tutar. Bu, "runtime status per lesson" sorusunun tek ana evi. Spine anlatısı → [[Syllabus Overview]]; spec↔runtime çapraz kontrolü → [[Spec to Runtime Matrix]].

## Executive Summary

> [!implemented] Çalışan tree, `docs/STATUS.md`'in `91f1b04` snapshot'ından **daha ileri**. `content/lessons/v1/` artık `lesson-000.ts`…`lesson-015.ts` (**16 dosya**) taşır, hepsi `V1_LESSONS`'ta kayıtlı (`lesson-000.ts:192` id `"v1-lesson-000"`; `lesson-015.ts:201,203` id `"v1-lesson-015"`, `number: 15`). Ama Home yalnız `number <= 6`'yı gösterir (`app/(tabs)/index.tsx`; `L07-compact-doorway.compact-spec.md:96-99`). Yani **authored = L0–L15**, **visible = L0–L6**, **L16–L17 spec-only**. **[IMPLEMENTED + CANONICAL]**

## The status vocabulary

- **VIS** = authored + registered + **learner-visible** (`v1-lesson-000..006`).
- **REG** = authored + registered ama **Home-gated** (görünmez; `number <= 6` cap).
- **SPEC** = yalnız compact-spec + gate-review; **runtime dosyası yok**.
- Doc type: **full PILOT spec** (L1–L11) · **compact-spec** (L12–L17) · **gate-review** (L12/L14/L15/L16/L17 öncesi).

## Matrix — L0 → L17

| L | Title | Doc type | Runtime status | Visible? | Key focus |
|---|---|---|---|---|---|
| **L0** | [[L0 The First Step]] | matrix row (locked) | **VIS** `v1-lesson-000` | ✅ | café onboarding tadımı; «Bonjour, je voudrais un café.» |
| **L1** | [[L1 Survival Kit]] | full PILOT spec | **VIS** `v1-lesson-001` | ✅ | ilk tam sosyal döngü; 2-full-cycle-engine istisnası |
| **L2** | [[L2 Être]] | full PILOT spec | **VIS** `v1-lesson-002` | ✅ | architecture-verb `je suis`; identity/`c'est` |
| **L3** | [[L3 Non]] | full PILOT spec | **VIS** `v1-lesson-003` | ✅ | `ne…pas` üretken; yes/no intonation; tu/vous |
| **L4** | [[L4 J'ai]] | full PILOT spec | **VIS** `v1-lesson-004` | ✅ | avoir; `j'ai faim/soif/besoin de`; être↔avoir |
| **L5** | [[L5 Un Une]] | full PILOT spec | **VIS** `v1-lesson-005` | ✅ | `un/une` aktif; `le/la` supported; M1 kapanış |
| **L6** | [[L6 Un Petit Moment]] | full PILOT spec | **VIS** `v1-lesson-006` | ✅ | Foundation Integration; 0 yeni gramer |
| **L7** | [[L7 Je Vais]] | full spec SUPERSEDED + compact ACCEPTED-BLOCKED | **REG** `v1-lesson-007` (compact) | ❌ | aller/movement — sevkte 2 frozen chunk doorway |
| **L8** | [[L8 Location Questions]] | full PILOT spec | **REG** `v1-lesson-008` | ❌ | tek soru sözcüğü `où`; homograph IDs |
| **L9** | [[L9 Faire Une Pause]] | full PILOT spec | **REG** `v1-lesson-009` | ❌ | split-sense `faire une pause` |
| **L10** | [[L10 Integration]] | full PILOT spec | **REG** `v1-lesson-010` | ❌ | Integration; 0 yeni gramer; pouvoir hook |
| **L11** | [[L11 Pouvoir]] | full PILOT spec (patches applied `a198310`) | **REG** `v1-lesson-011` | ❌ | split-sense pouvoir = help/permission |
| **L12** | [[L12 Est-ce Que]] | compact-spec + gate-review (patches `728353d`) | **REG** `v1-lesson-012` | ❌ | `est-ce que` yes/no wrapper |
| **L13** | [[L13 Integration]] | compact-spec (patches `dd138a4`) | **REG** `v1-lesson-013` | ❌ | Integration; can-do zinciri; `j'y vais` hook |
| **L14** | [[L14 Y]] | compact-spec + gate-review (applied `2f3c94d`) | **REG** `v1-lesson-014` | ❌ | place-`y`; `j'y vais`/`on y va` |
| **L15** | [[L15 Devoir Falloir]] | compact-spec + gate-review (applied `b04ab00`) | **REG** `v1-lesson-015` | ❌ | `il faut` primary / `je dois` supported |
| **L16** | [[L16 Integration and Small Moment]] | compact-spec + gate-review (applied `f47d62f`) | **SPEC** (no file) | ❌ | Integration + A Small Moment seed |
| **L17** | [[L17 Human Context and Feelings]] | compact-spec + gate-review (applied `6b9506f`, merge `f09c0fd`) | **SPEC** (no file) | ❌ | `Ça va?` + `content(e)`; band-map override |

> **L18–L24** matris satırında değil; roadmap intent → [[L18-L24 Roadmap]].

## Audit cross-reference

> [!implemented] **L1–L15 Chip Inventory Audit (2026-07)** base main `84a5b8e` (post PR #169), "all 16 lessons, 80 chips" (`audit:41`), verdict **`CLEAN_WITH_REVIEW_ITEMS`** (`:240`). Registry sayıları kaynağa göre değişir — audit **52 item / 41 used / 11 dormant** (`:135`); `ITEM_REGISTRY` frozen **54 item**; `shipped-item-ids.json` **56 id** (54-vs-56 drift gerçek). Her kaynağın kendi sayısını cite et, tek sayıya zorlama. → [[Registry Usage Matrix]].

## Failure Modes
> [!warning] **STATUS.md "7 lessons" stale** (`91f1b04` snapshot). Çalışan tree 16 dosya taşıyor. Bir okuyucu STATUS.md'i canon sanarsa L7–L15'in var olduğunu kaçırır. → [[Spec Runtime Divergences]].

## Known Gaps
- L16/L17 runtime dosyası yok — spec-to-runtime boşluğu. → [[Spec to Runtime Matrix]].
- L7 full spec ile shipped compact arasında sapma (SUPERSEDED). → [[L7 Je Vais]].

## Related Notes
[[Syllabus Overview]] · [[Spec to Runtime Matrix]] · [[Runtime Content Architecture]] · [[Registry Usage Matrix]] · [[Lesson Matrix]]
