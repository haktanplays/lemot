---
title: Mon Lexique UI
aliases: [Mon Lexique UI, Carnet, Le Carnet, Kelime Defteri UI, Mon Lexique]
type: design-spec
domain: design
status: not-surfaced
canon_status: provisional
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/config/productStage.ts", "docs/MASTER_PIPELINE_v1.2.1.md", "docs/CONTENT_FACTORY_CONTRACT.md"]
code_refs: ["lemot-app/config/productStage.ts:77-127"]
related: ["[[00 Le Mot Holy Codex]]", "[[Mon Lexique]]", "[[Navigation Model]]", "[[Feature Flags Map]]", "[[Product Stages and Feature Flags]]", "[[Design Inventory]]"]
tags: [design, mon-lexique, carnet, runtime-deferred, dev-apk-hidden]
---

# Mon Lexique UI

> [!warning] impl_status: **runtime-deferred / not-surfaced.** Mon Lexique (a.k.a. "Le Carnet") bir UI yüzeyi olarak dev-apk'ta yoktur; ilgili flag'ler (`monLexique`, `leCarnet`) dev-apk'ta **false**. Engine tarafında `monLexiqueStatus` (hidden/added/weak) mantığı vardır ama bu bir *veri* katmanıdır, sevkedilen bir *ekran* değil.

## Executive Summary

Mon Lexique = öğrencinin toplanmış kelime/chip defteri fikri. **UI olarak sevkedilmedi.** Görünürlük flag'leri: `monLexique` → sandbox true, dev-apk false, public-beta true; `leCarnet` → yalnızca sandbox true, dev-apk & public-beta false (`productStage.ts:77-127`). Yani en olgun aşamada bile (public-beta) `monLexique` açık ama `leCarnet` kapalı — iki isim/aşama farkı var, ekran tasarımı henüz kanonik değil.

Engine katmanında `monLexiqueStatus: hidden | added | weak` sınıflaması mevcut (mastery snapshot türevi) — bu UI değil, veri. Pedagojik model: [[Mon Lexique]].

## Current Canon

- **Dev APK'ta out-of-scope / gizli** (MASTER_PIPELINE Rule 8): "Dev APK: out of scope / hidden unless explicitly reactivated." Flag: `productStage.ts` dev-apk `monLexique:false, leCarnet:false` (satır 96-98).
- **Tier B lock:** 3-tier split uygulanır; MVP/base = "learner notebook + gathered items"; sonra derin AI; post-beta = Word Graph adjacency (MASTER_PIPELINE Rule 8).
- Content Factory §6: Mon Lexique 6-band UI **Faz 6A out-of-scope** (`docs/CONTENT_FACTORY_CONTRACT.md`).

## How It Works (bugün)

- Sevkedilen UI yok. Deep-link'le ulaşılabilir sandbox/founder yüzeyi de checklist §5'te "no Mon Lexique" ile dışlanır.
- Veri tarafı: `monLexiqueStatus` (hidden/added/weak) engine snapshot'ında hesaplanır; canonical item-ID konvansiyonuna hizalanır. Ama ekrana bağlı değil. Bkz. [[Mon Lexique]] · [[Mastery Model]].

## Guardrails

- MASTER_PIPELINE: "Any Mon Lexique task must state which tier it touches" (Rule 8). Belirsiz "bucket" olarak ele alınamaz.
- Word Graph adjacency **post-beta** — bu notta scope dışı.

## Known Gaps

- Mon Lexique ekran tasarımı (6-band UI) henüz kanonik/implemented değil → PROPOSED/PLANNED.
- Ekran-durum kataloğu operatör-vault "Tasarım Envanteri"nde olabilir, repo'da tam yok → [[Missing Source Inputs]] · [[Design Inventory]].
- `monLexique` vs `leCarnet` iki flag'inin nihai anlam farkı netleştirilmeli → [[Needs Verification]].

## Related Notes

- [[Mon Lexique]] · [[Navigation Model]] · [[Feature Flags Map]] · [[Product Stages and Feature Flags]] · [[Design Inventory]]
