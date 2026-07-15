---
title: Spec to Runtime Matrix
aliases: [Spec-Runtime, Spec to Runtime]
type: architecture
domain: meta
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "docs/canon/LESSON_FLOW_CANON_v1.md", "docs/learning-engine-v1.md"]
related: ["[[Spec Runtime Divergences]]", "[[Runtime Content Architecture]]", "[[08 Source of Truth Map]]", "[[05 Open Loops]]"]
tags: [matrix, divergence]
---

# Spec to Runtime Matrix

> [!canon] Bu, vault'un **en yüksek değerli** matrisidir: bir spec/kanonun kodda
> gerçekten karşılığı var mı, yoksa yalnızca doküman mı? Detaylı anlatım:
> [[Spec Runtime Divergences]].

| Sistem / karar | Canon kaynağı | Runtime kaynağı | Eşleşme | Sapma | Aksiyon |
|---|---|---|---|---|---|
| Ders akışı (screen types) | LESSON_FLOW_CANON_v1 (7 frozen tip) | `content/lessonTypes.ts` + `LessonRendererV1` | ✅ | Meet/Insight/Recap statik; per-screen etkileşim Faz B | [[Lesson Flow]] |
| Chip taxonomy (12 tip) | chip-taxonomy-v0.3 | registry tek `status` enum (active/supported/recognition/recycled) | ⚠️ kısmi | Zengin taxonomy yalnızca V3/V4 validator'da okunur | [[Chip Taxonomy]] |
| Production ladder (5 state) | learning-engine-v1 spec | runtime 3 değer | ⚠️ | `transformed`/`expected` planning-only | [[Mastery Model]] |
| Mastery / events | mastery-precision + engine spec | `learning-engine/*` (sandbox) | ⚠️ | **v1 renderer event ÜRETMİYOR**; iki disjoint store (`lm7` vs `lm_le_events`) | [[Self-Producing Engine]] · [[Storage Architecture]] |
| Canon validators V1–V9 | LESSON_FLOW_CANON §11 | `scripts/canonRules.ts` | ⚠️ | Yalnızca V3/V4/V5 mekanize; V1/V2/V6–V9 deferred | [[Validation Gates]] |
| itemId immutability | YASA 2 | `shipped-item-ids.json` + validate:content | ✅ | 54 (registry) vs 56 (manifest) drift | [[Registry Architecture]] |
| Lesson scope (L1–L5) | DEV_APK_MVP_CANON §2 + `DEV_APK_LESSON_LIMIT=5` | Home `number<=6`, 16 dosya L0–L15 | ⚠️ | Runtime L0–L6 görünür; canon metni geride | [[Runtime Lesson Map]] |
| Paywall | Cairn Q&A "Campfire ~L24" | yok (dev-apk paywall=false) | n/a | Legacy L14 SUPERSEDED; §66.3 re-decide çelişkisi | [[Monetization and Scope Boundaries]] |
| AI routing | legacy tablo (Gemini/Haiku) | provider zinciri Gemini→Gemini→Groq→Mistral | ❌ | Claude yok; stack dormant (auth mismatch) | [[AI Architecture]] |
| Practice Hub / yeni kartlar | Cairn spec / LESSON_FLOW_CANON | yok | ❌ | Tamamı PLANNED (hub-first) | [[Practice]] |
| Mon Lexique | chip-lexique-lifecycle-v0.3 | engine `mon-lexique` (tested-only), UI gizli | ❌ (shipped) | dev-apk monLexique=false; runtime deferred | [[Mon Lexique]] |

Semboller: ✅ eşleşiyor · ⚠️ kısmi/kaymış · ❌ spec var runtime yok.

> [!open-loop] Her ⚠️/❌ satırı bir açık döngü besler → [[05 Open Loops]].
