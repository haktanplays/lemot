---
title: Phenomena Progression
aliases: [Phenomena Ladder, Sound and Writing, Fenomen İlerlemesi, Homograph Guards]
type: system-spec
domain: syllabus
status: active
canon_status: canonical
implementation_status: spec-only
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/syllabus/lesson-spec-template-v1.1.md", "docs/syllabus/canonical-item-id-convention-v0.1.md", "docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md"]
related: ["[[00 Le Mot Holy Codex]]", "[[Syllabus Overview]]", "[[Syllabus Design Rules]]", "[[Chip Taxonomy]]"]
tags: [syllabus, phenomena, sound, homograph]
---

# Phenomena Progression

> [!canon] Purpose — Dersler boyunca **ses/yazım fenomenleri (phen:/sound:)**, **cognate köprüleri (cog:)** ve **homograph guard'ları** nasıl ilerler. Gramer motorları → [[Grammar Progression]]; itemId konvansiyonu → [[Chip Taxonomy]].

## Executive Summary

Fenomen yükü kasıtlı olarak **çok hafif** tutulur: normal derste **0–1 major + en çok 1 minor** insight; asla telaffuz dersi (`lesson-spec-template-v1.1.md:155`). **[CANONICAL]** Buna karşılık omurga boyunca bir dizi **homograph guard** taşınır ki normalize edilen ID'ler anlamları çakıştırmasın.

## Current Canon — sound/writing guardrail

> [!canon] Normal lesson: 0–1 major + ≤1 minor phenomenon; pronunciation lecture yok (`lesson-spec-template-v1.1.md:155`). L0 melody/politeness recognition; L2 liaison (`sound-liaison`, ama audit'te dormant). **[CANONICAL]**

## Homograph guards (itemId disambiguation)

`canonical-item-id-convention-v0.1.md:32` — normalizasyon anlamları çakıştırırsa **sense-suffix** zorunlu:

| Surface | Ayrık ID'ler | Ders | Neden |
|---|---|---|---|
| `où` / `ou` | `word:ou-where` vs `word:ou-or` | L8 | soru vs bağlaç |
| `la` | `word:la-there` vs `word:la-article` | L8 | zarf vs artikel |
| `y` | `word:y-place` (reserve `word:y-*`); `chunk:il-y-a` **frozen ayrı** | L14 | place-pronoun vs existential |
| `devoir` | `word:devoir-obligation` vs `word:devoir-owe` | L15 | owe-sense açılırsa |
| `ça va` | frozen `chunk:ca-va` — `va` **aller/futur sinyali değil** | L17 | donmuş chunk |
| `il faut` | `chunk:il-faut` (lexeme `word:falloir` yüzeyi) | L15 | invariable |

> [!warning] R5/R6 guard (`audit:296-297`): `on y va` yalnız frozen formül; herhangi bir `on + y + verb` genellemesi yeni bilinçli doorway ister. `j'y vais` sentence-form lint ile chip'ten dışlanır; chip yapmak bir **kanon kararı**, lint istisnası değil.

## Cognate / sound bridges (cog:)

`cog:` prefix'i cognate/kök/ses köprüsü içindir (`canonical-item-id-convention-v0.1.md:40-50`). Örnek pattern: merci ≈ mercy (Weave cognate highlight). → [[Weave System]].

## Deferred / not-a-phenomenon

- `Il faut que · Qu'est-ce que · en · veux` = trap-only leak guard'lar; bu bantta asla correct-option/chip rolü almaz (`audit:157,284`). **[CANONICAL]**
- A-Small-Moment reading passage: şimdilik `phen:a-small-moment-seed`; **`read:`/`passage:` prefix'i henüz coin edilmez** (`canonical-item-id-convention-v0.1.md:449`). → [[L16 Integration and Small Moment]].

## Known Gaps
- Runtime separator (colon vs hyphen) ve homograph metadata-vs-suffix = open decisions (`convention:210-218`). → [[05 Open Loops]].

## Related Notes
[[Syllabus Overview]] · [[Grammar Progression]] · [[Chip Taxonomy]] · [[Syllabus Design Rules]] · [[Weave System]]
